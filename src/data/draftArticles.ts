import type { Article, ArticleSection } from "../types/article";
import { DRAFT_MEDIA } from "./draftMedia";

const draftModules = import.meta.glob<string>("../../content/draft/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const AUTHOR = {
  name: "Kamil Mikołajczyk",
  role: "AI-Native Creator & Process Orchestrator",
  avatar: "KM",
};

const stripMarkdown = (value: string) =>
  value
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^>\s?/gm, "")
    .trim();

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const inferCategory = (fileName: string) => {
  if (/(crime|kryminalne)/.test(fileName)) return "Bezpieczeństwo";
  if (/(business|zarabianie)/.test(fileName)) return "Biznes AI";
  return "AI News";
};

const inferTool = (text: string): Article["tool"] => {
  if (/Claude|Anthropic/i.test(text)) return "Claude";
  if (/Codex|OpenAI/i.test(text)) return "Codex";
  return "AI Studio";
};

const inferHero = (category: string) => {
  if (category === "Bezpieczeństwo") return "workflow_hero";
  if (category === "Biznes AI") return "aistudio_hero";
  return "claude_hero";
};

const parseSections = (markdown: string): ArticleSection[] => {
  const blocks = markdown.split(/\r?\n\s*\r?\n/).slice(1);
  const sections: ArticleSection[] = [];

  for (const block of blocks) {
    const value = block.trim();
    if (!value) continue;

    const heading = value.match(/^(##|###)\s+(.+)$/);
    if (heading) {
      sections.push({
        type: "heading",
        level: heading[1] === "##" ? 2 : 3,
        text: stripMarkdown(heading[2]),
        id: slugify(heading[2]),
      });
      continue;
    }

    const bullets = value.split(/\r?\n/).filter((line) => /^[-*]\s+/.test(line));
    if (bullets.length > 1) {
      sections.push({
        type: "bulletList",
        items: bullets.map((line) => stripMarkdown(line.replace(/^[-*]\s+/, ""))),
      });
      continue;
    }

    sections.push({ type: "paragraph", text: stripMarkdown(value) });
  }

  return sections;
};

const createImagePlaceholder = (
  slug: string,
  title: string,
  category: string,
  index: 1 | 2,
): ArticleSection => {
  const suffix = String(index).padStart(2, "0");
  const fileName = `${slug}-${suffix}.webp`;
  const targetPath = `/public/news/drafts/${slug}/${fileName}`;
  const purpose = index === 1 ? "grafika otwierająca artykuł" : "ilustracja śródtekstowa wyjaśniająca główny mechanizm";

  return {
    type: "imagePlaceholder",
    fileName,
    targetPath,
    prompt: `Stwórz ${purpose} do polskojęzycznego artykułu „${title}” w kategorii ${category}. Styl: nowoczesny magazyn technologiczny, realistyczna redakcyjna ilustracja, wysoki kontrast, stonowana paleta z pomarańczowym akcentem, bez logotypów, bez tekstu na obrazie, bez znaków wodnych. Format 16:9, 1600×900 px, WebP. Zapisz jako ${fileName} w ${targetPath}.`,
  };
};

const createDraftArticle = (
  sourcePath: string,
  markdown: string,
  index: number,
  canonicalSlug: string,
): Article => {
  const pathParts = sourcePath.replace(/\\/g, "/").split("/");
  const fileName = pathParts.at(-1) ?? `draft-${index}.md`;
  const runFolder = pathParts.at(-2) ?? "draft";
  const baseName = fileName.replace(/\.md$/, "").replace(/^\d+-/, "");
  const title = stripMarkdown(markdown.match(/^#\s+(.+)$/m)?.[1] ?? baseName);
  const legacySlug = `${runFolder}-${slugify(baseName)}`;
  const category = inferCategory(fileName);
  const media = DRAFT_MEDIA[legacySlug] ?? [];
  const hasCompleteMedia = media.length >= 2;
  const parsedSections = parseSections(markdown);
  const firstParagraph = parsedSections.find((section) => section.type === "paragraph");
  const lead = firstParagraph?.type === "paragraph" ? firstParagraph.text : "Materiał redakcyjny oczekujący na zatwierdzenie.";
  const createMediaSection = (mediaIndex: 0 | 1, placeholderIndex: 1 | 2): ArticleSection => {
    const item = media[mediaIndex];

    if (!item) return createImagePlaceholder(legacySlug, title, category, placeholderIndex);

    return {
      type: "image",
      src: `news/drafts/${legacySlug}/${item.fileName}`,
      alt: item.alt,
      caption: item.caption,
    };
  };
  const firstMedia = createMediaSection(0, 1);
  const secondMedia = createMediaSection(1, 2);
  const insertionPoint = Math.min(2, parsedSections.length);
  const sections = [
    ...parsedSections.slice(0, insertionPoint),
    firstMedia,
    ...parsedSections.slice(insertionPoint),
    secondMedia,
  ];
  const wordCount = stripMarkdown(markdown).split(/\s+/).filter(Boolean).length;

  return {
    id: `draft-${runFolder}-${index + 1}`,
    slug: canonicalSlug,
    title,
    subtitle: hasCompleteMedia
      ? "Materiał roboczy — komplet grafik gotowy, wymaga zatwierdzenia merytorycznego"
      : "Materiał roboczy — wymaga zatwierdzenia merytorycznego i uzupełnienia grafik",
    description: lead.slice(0, 240),
    category,
    tool: inferTool(markdown),
    author: AUTHOR,
    publishedAt: runFolder.slice(0, 10),
    readTime: Math.max(2, Math.ceil(wordCount / 220)),
    wordCount,
    heroImage: inferHero(category),
    imageAlt: `Placeholder grafiki dla artykułu: ${title}`,
    imageCaption: hasCompleteMedia
      ? "DRAFT — dwie grafiki śródtekstowe są gotowe; materiał nadal oczekuje na akceptację treści."
      : "DRAFT — grafika docelowa nie została jeszcze dostarczona.",
    accentColor: category === "Bezpieczeństwo" ? "amber" : category === "Biznes AI" ? "emerald" : "indigo",
    featured: false,
    tags: [category, "DRAFT", "AI"],
    pullQuote: hasCompleteMedia
      ? "Komplet dwóch grafik jest gotowy; materiał nadal oczekuje na formalne zatwierdzenie poprawności treści."
      : "Materiał oczekuje na formalne zatwierdzenie poprawności treści i komplet dwóch grafik.",
    keyTakeaways: hasCompleteMedia ? [
      "Status DRAFT: brak formalnego zatwierdzenia przez agenta odpowiedzialnego za poprawność treści.",
      "Dwie wymagane grafiki są dostępne w docelowych ścieżkach projektu.",
      "Grafiki zastąpiły placeholdery, zachowując podpisy i teksty alternatywne.",
      "Publikację należy zatwierdzić dopiero po końcowej weryfikacji źródeł i treści.",
    ] : [
      "Status DRAFT: brak formalnego zatwierdzenia przez agenta odpowiedzialnego za poprawność treści.",
      "Artykuł nie ma jeszcze dwóch wymaganych grafik.",
      "Prompty, nazwy plików i ścieżki docelowe znajdują się w treści artykułu.",
      "Publikację należy zatwierdzić dopiero po weryfikacji źródeł i podmianie placeholderów.",
    ],
    sections,
    status: "DRAFT",
    sourcePath: sourcePath.replace("../../", ""),
    legacySlug,
  };
};

const sortedDraftModules = Object.entries(draftModules)
  .filter(([path]) => !path.endsWith("/README.md"))
  .sort(([left], [right]) => {
    const leftFolder = left.replace(/\\/g, "/").split("/").at(-2) ?? "";
    const rightFolder = right.replace(/\\/g, "/").split("/").at(-2) ?? "";
    const dateOrder = leftFolder.slice(0, 10).localeCompare(rightFolder.slice(0, 10));

    if (dateOrder !== 0) return dateOrder;

    const leftPriority = leftFolder.includes("daily-news") ? 0 : 1;
    const rightPriority = rightFolder.includes("daily-news") ? 0 : 1;

    return leftPriority - rightPriority || left.localeCompare(right);
  });

const publicationCountByDate = new Map<string, number>();

export const DRAFT_ARTICLES: Article[] = sortedDraftModules.map(([path, markdown], index) => {
  const runFolder = path.replace(/\\/g, "/").split("/").at(-2) ?? "draft";
  const publicationDate = runFolder.slice(0, 10);
  const [year = "0000", month = "00", day = "00"] = publicationDate.split("-");
  const publicationIndex = publicationCountByDate.get(publicationDate) ?? 0;
  publicationCountByDate.set(publicationDate, publicationIndex + 1);

  const period = `${month}${year.slice(-2)}`;
  const publication = publicationIndex === 0 ? day : `${day}.${publicationIndex}`;

  return createDraftArticle(path, markdown, index, `${period}/${publication}`);
});
