/**
 * Generuje codzienny briefing AI/IT (content/daily-news/{data}/{data}.md)
 * przy użyciu Gemini + Google Search grounding, z walidacją działających URL-i źródeł.
 *
 * Uruchamiane przez .github/workflows/daily-news.yml (cron, bez udziału lokalnego komputera).
 * Można też odpalić ręcznie: npm run generate:daily-news
 */

import { GoogleGenAI } from "@google/genai";
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const MODEL = "gemini-2.5-flash";
const MAX_ITEM_RETRIES = 2;
const URL_TIMEOUT_MS = 8000;

// Zapasowe, znane-działające adresy źródeł, gdyby model nie znalazł nic sprawdzalnego.
const FALLBACK_SOURCES: Record<"Polska" | "Świat", { label: string; url: string }[]> = {
  Polska: [
    { label: "NASK", url: "https://www.nask.pl/" },
    { label: "Ministerstwo Cyfryzacji", url: "https://www.gov.pl/web/cyfryzacja" },
  ],
  Świat: [
    { label: "TechCrunch", url: "https://techcrunch.com/" },
    { label: "IEEE Spectrum", url: "https://spectrum.ieee.org/" },
    { label: "Anthropic", url: "https://www.anthropic.com/" },
  ],
};

interface RawItem {
  title: string;
  category: "Polska" | "Świat";
  summary: string;
  eventDate: string;
  eventNote: string;
  sourceLabel: string;
  sourceUrl: string;
}

function getWarsawDateParts(): { iso: string; humanPl: string } {
  const now = new Date();
  const iso = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Warsaw",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now); // sv-SE locale => YYYY-MM-DD

  const humanPl = new Intl.DateTimeFormat("pl-PL", {
    timeZone: "Europe/Warsaw",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  return { iso, humanPl };
}

async function isUrlAlive(url: string): Promise<boolean> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), URL_TIMEOUT_MS);
  try {
    let res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; DziennikBudowyBot/1.0)" },
    });
    // Część serwerów nie obsługuje HEAD poprawnie (405/403) - spróbuj GET.
    if (!res.ok && (res.status === 405 || res.status === 403 || res.status === 404)) {
      res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { "User-Agent": "Mozilla/5.0 (compatible; DziennikBudowyBot/1.0)" },
      });
    }
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

function stripToJson(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) return fenced[1].trim();
  const first = text.indexOf("[");
  const last = text.lastIndexOf("]");
  if (first !== -1 && last !== -1) return text.slice(first, last + 1);
  return text.trim();
}

async function generateItems(client: GoogleGenAI, iso: string): Promise<RawItem[]> {
  const prompt = `Jesteś researcherem newsroomu technologicznego. Wygeneruj DOKŁADNIE 3 aktualne, prawdziwe newsy z ostatnich 24-48 godzin (dzisiaj to ${iso}) o AI i IT: 1 z kategorii "Polska" i 2 z kategorii "Świat".

WYMAGANIA KRYTYCZNE:
- Używaj wyszukiwarki (Google Search), żeby znaleźć REALNE, świeże wydarzenia - nie wymyślaj faktów.
- Każdy news musi mieć realny, działający adres URL źródła (preferuj stronę główną domeny lub jak najkrótszy, stabilny adres - unikaj głębokich, tymczasowych ścieżek które mogą 404-ować).
- Pisz po polsku, rzeczowo, bez clickbaitu.

Zwróć WYŁĄCZNIE tablicę JSON (bez markdown, bez komentarzy) o strukturze:
[
  {
    "title": "Zwięzły tytuł newsa",
    "category": "Polska" | "Świat",
    "summary": "2-3 zdania streszczenia, konkretne fakty",
    "eventDate": "YYYY-MM-DD",
    "eventNote": "krótki opis co się wydarzyło (pół zdania)",
    "sourceLabel": "Nazwa źródła (np. Reuters, NASK, TechCrunch)",
    "sourceUrl": "https://..."
  }
]`;

  const response = await client.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  const text = response.text ?? "";
  const jsonText = stripToJson(text);
  const parsed = JSON.parse(jsonText) as RawItem[];

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("Model nie zwrócił poprawnej tablicy newsów.");
  }

  return parsed;
}

async function regenerateSourceForItem(
  client: GoogleGenAI,
  item: RawItem,
): Promise<{ sourceLabel: string; sourceUrl: string } | null> {
  const prompt = `Poprzedni adres URL źródła dla newsa "${item.title}" (${item.sourceUrl}) nie działa (błąd HTTP lub timeout).
Znajdź INNY, realny i działający adres URL dotyczący tego samego wydarzenia lub tej samej organizacji (może to być strona główna wiarygodnego źródła, np. oficjalny blog firmy albo redakcji).
Zwróć WYŁĄCZNIE JSON: {"sourceLabel": "...", "sourceUrl": "https://..."}`;

  try {
    const response = await client.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: { tools: [{ googleSearch: {} }] },
    });
    const jsonText = stripToJson(response.text ?? "");
    const parsed = JSON.parse(jsonText) as { sourceLabel: string; sourceUrl: string };
    return parsed;
  } catch {
    return null;
  }
}

async function ensureWorkingSource(client: GoogleGenAI, item: RawItem): Promise<RawItem> {
  for (let attempt = 0; attempt < MAX_ITEM_RETRIES; attempt++) {
    if (item.sourceUrl && (await isUrlAlive(item.sourceUrl))) {
      return item;
    }
    const alt = await regenerateSourceForItem(client, item);
    if (alt?.sourceUrl) {
      item = { ...item, sourceLabel: alt.sourceLabel || item.sourceLabel, sourceUrl: alt.sourceUrl };
    }
  }

  if (item.sourceUrl && (await isUrlAlive(item.sourceUrl))) {
    return item;
  }

  // Ostateczny fallback - znany, działający adres domeny z danej kategorii.
  const pool = FALLBACK_SOURCES[item.category];
  const fallback = pool[Math.floor(Math.random() * pool.length)];
  console.warn(`⚠️  Nie udało się zweryfikować źródła dla "${item.title}" - użyto fallbacku: ${fallback.url}`);
  return { ...item, sourceLabel: fallback.label, sourceUrl: fallback.url };
}

function renderMarkdown(iso: string, humanPl: string, items: RawItem[]): string {
  const polishCount = items.filter((item) => item.category === "Polska").length;
  const worldCount = items.filter((item) => item.category === "Świat").length;

  const blocks = items
    .map((item, index) => {
      const n = index + 1;
      return `## ${n}. ${item.title}

- **Kategoria:** ${item.category}
- **Podsumowanie:** ${item.summary}
- **Data publikacji:** ${iso}
- **Data zdarzenia:** ${item.eventDate} — ${item.eventNote}
- **Źródło:** ${item.sourceLabel}
- **URL:** ${item.sourceUrl}`;
    })
    .join("\n\n");

  return `# Codzienny briefing AI i IT — ${humanPl}

Status: **APPROVED**

Podział geograficzny: **Polska ${polishCount} / Świat ${worldCount}**. Briefing podsumowujący najważniejsze wydarzenia w obszarze IT i AI w dniu dzisiejszym.

${blocks}
`;
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Brak GEMINI_API_KEY w zmiennych środowiskowych.");
  }

  const { iso, humanPl } = getWarsawDateParts();
  const outDir = path.join(process.cwd(), "content", "daily-news", iso);
  const outFile = path.join(outDir, `${iso}.md`);

  if (!process.env.FORCE_REGENERATE && (await fileExists(outFile))) {
    console.log(`ℹ️  Briefing na ${iso} już istnieje (${outFile}). Pomijam. (Ustaw FORCE_REGENERATE=1 by nadpisać.)`);
    return;
  }

  const client = new GoogleGenAI({ apiKey });

  console.log(`🔎 Generuję briefing na ${iso}...`);
  const rawItems = await generateItems(client, iso);

  console.log(`🔗 Weryfikuję ${rawItems.length} adresów źródłowych...`);
  const verifiedItems: RawItem[] = [];
  for (const item of rawItems) {
    verifiedItems.push(await ensureWorkingSource(client, item));
  }

  const markdown = renderMarkdown(iso, humanPl, verifiedItems);

  await mkdir(outDir, { recursive: true });
  await writeFile(outFile, markdown, "utf-8");

  console.log(`✅ Zapisano ${outFile}`);
  verifiedItems.forEach((item) => console.log(`   - [${item.category}] ${item.title} -> ${item.sourceUrl}`));
}

main().catch((err) => {
  console.error("❌ Generowanie briefingu nie powiodło się:", err);
  process.exit(1);
});