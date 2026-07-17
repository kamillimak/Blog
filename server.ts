import cors from "cors";
import crypto from "crypto";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import nodemailer from "nodemailer";
import path from "path";
import { createServer as createViteServer } from "vite";
import { ARTICLES } from "./src/data/articles";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === "production";
const shouldUseFirestore = () => (isProduction && process.env.USE_FIRESTORE !== "false") || process.env.USE_FIRESTORE === "true";
const pagesOrigin = "https://kamillimak.github.io";
const allowedOrigins = new Set([
  pagesOrigin,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

app.use(express.json({ limit: "16kb" }));
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error("Origin is not allowed by CORS"));
  },
  methods: ["GET", "POST"],
}));

const SUBSCRIPTIONS_FILE = path.join(process.cwd(), "subscriptions.json");
const CONTENT_DIR = path.join(process.cwd(), "content");

function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

function getLocalSubscriptions(): string[] {
  try {
    if (!fs.existsSync(SUBSCRIPTIONS_FILE)) return [];
    const parsed: unknown = JSON.parse(fs.readFileSync(SUBSCRIPTIONS_FILE, "utf-8"));
    return Array.isArray(parsed) ? parsed.filter((entry): entry is string => typeof entry === "string") : [];
  } catch (error) {
    console.error("Error reading subscriptions file:", error);
    return [];
  }
}

function saveLocalSubscription(email: string): boolean {
  const subscriptions = getLocalSubscriptions();
  if (subscriptions.includes(email)) return false;
  subscriptions.push(email);
  fs.writeFileSync(SUBSCRIPTIONS_FILE, JSON.stringify(subscriptions, null, 2), "utf-8");
  return true;
}

function initializeAdmin() {
  if (getApps().length > 0) return;
  const credentialsJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (credentialsJson) {
    initializeApp({ credential: cert(JSON.parse(credentialsJson)) });
    return;
  }
  initializeApp({ projectId: process.env.GOOGLE_CLOUD_PROJECT || "gen-lang-client-0172881890" });
}

async function saveSubscription(email: string): Promise<boolean> {
  if (!shouldUseFirestore()) return saveLocalSubscription(email);

  initializeAdmin();
  const id = crypto.createHash("sha256").update(email).digest("hex");
  const reference = getFirestore().collection("newsletterSubscriptions").doc(id);
  const existing = await reference.get();
  if (existing.exists) return false;

  await reference.set({ email, subscribedAt: new Date().toISOString(), source: "blog" });
  return true;
}

async function getSubscriberEmails(): Promise<string[]> {
  if (!shouldUseFirestore()) return getLocalSubscriptions();

  initializeAdmin();
  const snapshot = await getFirestore().collection("newsletterSubscriptions").get();
  return snapshot.docs
    .map((document) => document.data().email)
    .filter((email): email is string => typeof email === "string" && Boolean(normalizeEmail(email)));
}

function getMarkdownFiles(directory: string): string[] {
  try {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return getMarkdownFiles(entryPath);
      return entry.name.endsWith(".md") ? [entryPath] : [];
    });
  } catch {
    return [];
  }
}

function stripMarkdown(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/[*_`>#-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getRecentNewsletterItems(hours = 24) {
  const now = Date.now();
  const since = now - hours * 60 * 60 * 1000;
  const articleItems = ARTICLES
    .filter((article) => new Date(article.publishedAt).getTime() >= since)
    .map((article) => ({
      title: article.title,
      description: article.description,
      label: `Artykuł · ${article.category}`,
      url: `https://kamillimak.github.io/Blog/#/articles/${article.slug}`,
      date: article.publishedAt,
    }));

  const markdownItems = [
    ...getMarkdownFiles(path.join(CONTENT_DIR, "daily-news")),
    ...getMarkdownFiles(path.join(CONTENT_DIR, "top-3")),
  ]
    .filter((file) => !file.endsWith("README.md"))
    .map((file) => {
      const markdown = fs.readFileSync(file, "utf8");
      const date = markdown.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? "";
      return {
        title: stripMarkdown(markdown.match(/^#\s+(.+)$/m)?.[1] ?? path.basename(file, ".md")),
        description: stripMarkdown(markdown.split(/\r?\n\r?\n/).find((block) => !block.startsWith("#")) ?? ""),
        label: file.includes(`${path.sep}top-3${path.sep}`) ? "TOP 3" : "Newsroom",
        url: "https://kamillimak.github.io/Blog/#/",
        date,
      };
    })
    .filter((item) => {
      const timestamp = new Date(item.date).getTime();
      return Number.isFinite(timestamp) && timestamp >= since;
    })
    .slice(0, 12);

  return [...articleItems, ...markdownItems].sort((left, right) => right.date.localeCompare(left.date));
}

function renderDailyDigestHtml(items: ReturnType<typeof getRecentNewsletterItems>) {
  const list = items
    .map(
      (item) => `
        <tr>
          <td style="padding:18px 0;border-top:1px solid #333">
            <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#a8b084;font-weight:700">${item.label}</div>
            <h2 style="margin:6px 0 8px;font-size:20px;line-height:1.25;color:#f5f2ea">${item.title}</h2>
            <p style="margin:0 0 10px;color:#b8b3a7;line-height:1.55">${item.description || "Nowość z ostatnich 24 godzin na blogu."}</p>
            <a href="${item.url}" style="color:#f5f2ea;font-weight:700;text-transform:uppercase;font-size:12px">Otwórz</a>
          </td>
        </tr>`,
    )
    .join("");

  return `<div style="background:#11110f;color:#f5f2ea;font-family:Arial,sans-serif;padding:32px;max-width:680px;margin:auto">
    <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#a8b084;font-weight:700">AI w praktyce</p>
    <h1 style="font-size:32px;line-height:1.05;margin:0 0 12px">Nowości z ostatnich 24h</h1>
    <p style="color:#b8b3a7;line-height:1.6;margin:0 0 24px">Krótki dzienny digest artykułów, newsów i materiałów AI opublikowanych lub wygenerowanych w ostatniej dobie.</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${list}</table>
    <p style="margin-top:28px;color:#70706b;font-size:12px">Otrzymujesz tę wiadomość, bo zapisano ten adres do newslettera AI w praktyce.</p>
  </div>`;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Nieznany błąd serwera pocztowego";
}

app.post("/api/subscribe", async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  if (!email) {
    return res.status(400).json({ success: false, message: "Proszę podać poprawny adres e-mail." });
  }

  try {
    const isNew = await saveSubscription(email);
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    let emailSent = false;
    let emailError: string | null = null;

    if (isNew && gmailUser && gmailAppPassword) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: gmailUser, pass: gmailAppPassword },
        });
        await transporter.sendMail({
          from: `"AI w praktyce" <${gmailUser}>`,
          to: email,
          subject: "Witaj w Warsztacie AI Coding! Potwierdzenie subskrypcji",
          html: `<div style="background:#121212;color:#fff;font-family:Arial,sans-serif;padding:40px;max-width:600px;margin:auto"><h1>AI w praktyce</h1><p>Dziękujemy za zapisanie się do newslettera. Od teraz będziesz otrzymywać wyselekcjonowane materiały o pracy z AI.</p><p style="color:#10b981"><strong>● SUBSKRYPCJA AKTYWNA</strong></p></div>`,
        });
        emailSent = true;
      } catch (error) {
        console.error("Nodemailer error:", error);
        emailError = getErrorMessage(error);
      }
    }

    return res.json({
      success: true,
      isNew,
      emailSavedLocally: true,
      gmailSent: emailSent,
      gmailError: emailError,
      message: emailSent
        ? "Pomyślnie zapisano do newslettera! Potwierdzenie zostało wysłane."
        : isNew
          ? "Adres został zapisany. Od teraz będziesz otrzymywać dzienny digest z nowościami."
          : "Ten adres e-mail jest już zapisany w naszej bazie.",
    });
  } catch (error) {
    console.error("Subscription error:", error);
    return res.status(500).json({ success: false, message: "Nie udało się zapisać adresu. Spróbuj ponownie później." });
  }
});

app.post("/api/newsletter/daily-digest", async (req, res) => {
  const cronSecret = process.env.CRON_SECRET;
  const providedSecret = req.header("x-cron-secret") || req.header("authorization")?.replace(/^Bearer\s+/i, "");
  if (isProduction && (!cronSecret || providedSecret !== cronSecret)) {
    return res.status(401).json({ success: false, message: "Brak autoryzacji zadania newslettera." });
  }

  try {
    const subscribers = await getSubscriberEmails();
    const items = getRecentNewsletterItems(24);
    const dryRun = req.query.dryRun === "1" || req.body?.dryRun === true;

    if (items.length === 0) {
      return res.json({ success: true, sent: 0, subscribers: subscribers.length, items: 0, message: "Brak nowości z ostatnich 24h." });
    }

    if (dryRun) {
      return res.json({ success: true, dryRun: true, sent: 0, subscribers: subscribers.length, items: items.length });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    if (!gmailUser || !gmailAppPassword) {
      return res.status(503).json({ success: false, message: "Brak konfiguracji Gmail SMTP." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailAppPassword },
    });
    const html = renderDailyDigestHtml(items);

    let sent = 0;
    for (const subscriber of subscribers) {
      await transporter.sendMail({
        from: `"AI w praktyce" <${gmailUser}>`,
        to: subscriber,
        subject: "AI w praktyce: nowości z ostatnich 24h",
        html,
      });
      sent += 1;
    }

    return res.json({ success: true, sent, subscribers: subscribers.length, items: items.length });
  } catch (error) {
    console.error("Daily digest error:", error);
    return res.status(500).json({ success: false, message: "Nie udało się wysłać dziennego newslettera." });
  }
});

// --- SOCIAL MEDIA DISTRIBUTION SYSTEM ---

// Interface for Social Media post status
interface SocialPostStatus {
  slug: string;
  title: string;
  facebookApproved: boolean;
  facebookSent: boolean;
  facebookDraft: string;
  facebookClicks: number;
  linkedinApproved: boolean;
  linkedinSent: boolean;
  linkedinDraft: string;
  linkedinClicks: number;
  generatedAt?: string;
}

const SOCIAL_STATUS_FILE = path.join(process.cwd(), "social_status.json");

function getLocalSocialPosts(): Record<string, SocialPostStatus> {
  try {
    if (!fs.existsSync(SOCIAL_STATUS_FILE)) return {};
    return JSON.parse(fs.readFileSync(SOCIAL_STATUS_FILE, "utf-8")) || {};
  } catch (error) {
    console.error("Error reading social status file:", error);
    return {};
  }
}

function saveLocalSocialPost(post: SocialPostStatus): void {
  const data = getLocalSocialPosts();
  data[post.slug] = post;
  fs.writeFileSync(SOCIAL_STATUS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

async function getSocialPost(slug: string): Promise<SocialPostStatus> {
  if (shouldUseFirestore()) {
    initializeAdmin();
    const doc = await getFirestore().collection("socialPosts").doc(slug).get();
    if (doc.exists) {
      return doc.data() as SocialPostStatus;
    }
  } else {
    const localData = getLocalSocialPosts();
    if (localData[slug]) {
      return localData[slug];
    }
  }

  // Return a default blank status if not found
  const article = ARTICLES.find(a => a.slug === slug);
  return {
    slug,
    title: article ? article.title : slug,
    facebookApproved: false,
    facebookSent: false,
    facebookDraft: "",
    facebookClicks: 0,
    linkedinApproved: false,
    linkedinSent: false,
    linkedinDraft: "",
    linkedinClicks: 0
  };
}

async function saveSocialPost(post: SocialPostStatus): Promise<void> {
  if (shouldUseFirestore()) {
    initializeAdmin();
    await getFirestore().collection("socialPosts").doc(post.slug).set(post);
  } else {
    saveLocalSocialPost(post);
  }
}

async function getAllSocialPosts(): Promise<Record<string, SocialPostStatus>> {
  if (shouldUseFirestore()) {
    initializeAdmin();
    const snapshot = await getFirestore().collection("socialPosts").get();
    const result: Record<string, SocialPostStatus> = {};
    snapshot.forEach(doc => {
      result[doc.id] = doc.data() as SocialPostStatus;
    });
    return result;
  } else {
    return getLocalSocialPosts();
  }
}

let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (genAIClient) return genAIClient;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined in environment variables. Social media generation will run in mock mode.");
    return null;
  }
  genAIClient = new GoogleGenAI({ apiKey });
  return genAIClient;
}

function getFacebookFallback(article: any): string {
  return `🤔 Czy wiesz, jak prawidłowo zacząć pracę z nowymi narzędziami w swoim projekcie? Wiele osób od razu rzuca się do pisania kodu, co często prowadzi do chaosu i błędów w architekturze.

Kluczem do sukcesu jest odpowiednie przygotowanie i poznanie reguł gry.

✍️ Zrób to teraz:
1. Przeanalizuj pliki konfiguracyjne i zasady projektu.
2. Uruchom lokalny serwer i upewnij się, że wszystko działa.
3. Weryfikuj każdy krok automatycznymi testami.

"Prawidłowy onboarding to 80% sukcesu całego projektu."

Stosując te zasady, oszczędzasz godziny debugowania i zyskujesz pełną kontrolę nad kodem.

Sprawdź szczegóły w naszym najnowszym artykule: [LINK_TRACKING]

PS. A jak wygląda Twój proces wchodzenia w nowy kod? Daj znać w komentarzu! 👇

#Antigravity #Onboarding #WebDev #AIWorkflow`;
}

function getLinkedInFallback(article: any): string {
  return `Jak efektywnie wdrożyć asystentów AI w codziennym workflow programistycznym? 🚀

Przedstawiamy praktyczny poradnik wdrażania zaawansowanych narzędzi i orkiestracji procesów w istniejących repozytoriach kodu. Skupiamy się na bezpieczeństwie, kontroli jakości oraz automatyzacji weryfikacji.

Co zyskujesz?
🛠️ Lepszą kontrolę nad jakością kodu
⚡ Szybszy czas wdrożenia nowych funkcji
🔒 Pełne bezpieczeństwo lokalnego środowiska

Rozwiązanie dedykowane jest dla PM-ów, Product Ownerów oraz inżynierów szukających optymalizacji procesów.

👉 Zobacz pełną analizę: [LINK_TRACKING]`;
}

// Social Media API Endpoints

// 1. Get status for all articles
app.get("/api/social/status", async (_req, res) => {
  try {
    const statuses = await getAllSocialPosts();
    const result = ARTICLES.map((article) => {
      const status = statuses[article.slug] || {
        slug: article.slug,
        title: article.title,
        facebookApproved: false,
        facebookSent: false,
        facebookDraft: "",
        facebookClicks: 0,
        linkedinApproved: false,
        linkedinSent: false,
        linkedinDraft: "",
        linkedinClicks: 0,
      };
      return status;
    });
    return res.json({ success: true, posts: result });
  } catch (error) {
    console.error("Error fetching social statuses:", error);
    return res.status(500).json({ success: false, message: "Błąd podczas pobierania statusów." });
  }
});

// 2. Generate drafts for a specific article
app.post("/api/social/generate/:slug", async (req, res) => {
  const { slug } = req.params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) {
    return res.status(404).json({ success: false, message: "Nie znaleziono artykułu." });
  }

  try {
    const status = await getSocialPost(slug);

    // Prompt definitions matching user instructions
    const fbPrompt = `
Jesteś copywriterem tworzącym angażujące posty edukacyjne/marketingowe na Facebooka dla bloga "AI w praktyce".
Wygeneruj gotowy post na podstawie poniższego artykułu.

TYTUŁ: "${article.title}"
PODTYTUŁ: "${article.subtitle}"
OPIS: "${article.description}"
KLUCZOWE WNIOSKI:
${article.keyTakeaways.map(t => `- ${t}`).join('\n')}

Napisz post Facebook dokładnie wg tej struktury:

1. HOOK – 1-2 zdania, obserwacja lub kontrowersyjne stwierdzenie o tym, jak ludzie zwykle robią coś źle/nieoptymalnie. Bezpośredni ton, zwracasz się per "Ty".
2. ROZWINIĘCIE PROBLEMU – 1-2 zdania, czemu to jest ważne / co się dzieje, gdy tego się nie robi.
3. NAGŁÓWEK AKCJI – krótkie polecenie z emoji na początku (np. ✍️ "Zrób to teraz:").
4. LISTA KROKÓW/ZASAD – numerowana, 3-4 punkty, każdy krótki i konkretny (max 1 linia).
5. GOTOWY PRZYKŁAD DO WKLEJENIA – jeśli dotyczy, podaj gotowy prompt/wzór w cudzysłowie, który odbiorca może skopiować 1:1.
6. PODSUMOWANIE WARTOŚCI – 1-2 zdania, co odbiorca zyskuje stosując to (metafora mile widziana, np. "to jest Twój strażnik").
7. ZAPOWIEDŹ KONTYNUACJI (opcjonalnie) – 1 zdanie zapowiadające kolejny post w serii.
8. PS – dodatkowy CTA angażujący (np. prośba o komentarz z własnym przykładem) + emoji.
9. HASHTAGI – 3-5, na końcu, związane z tematem/marką.

ZASADY:
- Ton: potoczny, bezpośredni, "Ty/Twój", krótkie zdania, mogą być urwane.
- Emoji: przy nagłówkach sekcji i akcjach, nie w każdym zdaniu.
- Długość: 100-180 słów (bez hashtagów).
- Zero sztywnego korpo-języka, ma brzmieć jak rada od kogoś kompetentnego, nie jak reklama.
- Pisz po polsku.
- Zamiast linku do artykułu, wstaw DOKŁADNIE tekst: [LINK_TRACKING]
`;

    const liPrompt = `
Jesteś copywriterem B2B tworzącym posty na LinkedIn dla bloga "AI w praktyce".
Wygeneruj gotowy post na podstawie poniższego artykułu.

TYTUŁ: "${article.title}"
PODTYTUŁ: "${article.subtitle}"
OPIS: "${article.description}"
KLUCZOWE WNIOSKI:
${article.keyTakeaways.map(t => `- ${t}`).join('\n')}

Napisz post LinkedIn dokładnie wg tej struktury:

1. HOOK – 1 linia, konkretna obietnica/wartość, zakończona 1 emoji (np. 🚀). Bez clickbaitu.
2. AKAPIT WPROWADZAJĄCY – 2-3 zdania: co to jest, jaki problem rozwiązuje, dlaczego teraz. Ton rzeczowy, biznesowy.
3. NAGŁÓWEK LISTY – krótkie pytanie/zapowiedź (np. "Co zyskujesz?").
4. LISTA KORZYŚCI – 3-5 punktów, każdy zaczyna się od emoji tematycznego (nie 🚀/✅ w kółko, dobieraj emoji do treści punktu) + krótka fraza (3-6 słów), bez rozwlekania.
5. AKAPIT ZAMYKAJĄCY – 1-2 zdania podsumowujące wartość + do kogo to rozwiązanie jest skierowane.
6. CTA + LINK – krótkie wezwanie do działania z emoji (np. 👉) + [LINK_TRACKING].

ZASADY:
- Długość: 90-150 słów łącznie (bez CTA/linku).
- Emoji: oszczędnie, max 1 w hooku, po 1 przy każdym punkcie listy, 1 przy CTA. Zero emoji w środku zdań.
- Ton: profesjonalny, konkretny, zero lania wody, zero wykrzykników.
- Bez hashtagów (chyba że podam inaczej).
- Pisz po polsku, styl B2B.
`;

    const client = getGenAI();
    let fbDraft = getFacebookFallback(article);
    let liDraft = getLinkedInFallback(article);

    if (client) {
      try {
        const fbRes = await client.models.generateContent({
          model: "gemini-2.5-flash",
          contents: fbPrompt,
        });
        if (fbRes.text) fbDraft = fbRes.text.trim();

        const liRes = await client.models.generateContent({
          model: "gemini-2.5-flash",
          contents: liPrompt,
        });
        if (liRes.text) liDraft = liRes.text.trim();
      } catch (err) {
        console.error("Failed to generate with Gemini, using fallback.", err);
      }
    }

    status.facebookDraft = fbDraft;
    status.linkedinDraft = liDraft;
    status.generatedAt = new Date().toISOString();

    await saveSocialPost(status);

    return res.json({ success: true, post: status });
  } catch (error) {
    console.error("Error generating social drafts:", error);
    return res.status(500).json({ success: false, message: "Nie udało się wygenerować postów." });
  }
});

// 3. Send approval email
app.post("/api/social/send-email/:slug", async (req, res) => {
  const { slug } = req.params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) {
    return res.status(404).json({ success: false, message: "Nie znaleziono artykułu." });
  }

  try {
    let status = await getSocialPost(slug);
    
    // Check if drafts need to be generated
    if (!status.facebookDraft || !status.linkedinDraft) {
      return res.status(400).json({ success: false, message: "Proszę najpierw wygenerować wersje robocze." });
    }

    const gmailUser = process.env.GMAIL_USER || "mikolajczykamil@gmail.com";
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const backendUrl = process.env.APP_URL || `${req.protocol}://${req.get("host")}`;

    const fbApproveUrl = `${backendUrl}/api/social/approve?slug=${slug}&channel=facebook`;
    const liApproveUrl = `${backendUrl}/api/social/approve?slug=${slug}&channel=linkedin`;

    const htmlBody = `
      <div style="background-color: #0f172a; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; max-width: 650px; margin: auto; border: 1px solid #1e293b;">
        <h1 style="color: #6366f1; border-bottom: 2px solid #1e293b; padding-bottom: 15px; margin-top: 0;">Panel Zatwierdzania Social Media</h1>
        <p style="color: #94a3b8; font-size: 14px;">Przygotowano propozycje postów dla artykułu: <strong style="color: #f8fafc;">${article.title}</strong></p>
        
        <!-- Facebook Section -->
        <div style="background-color: #1e293b; padding: 20px; margin-top: 25px; border-left: 4px solid #1877f2;">
          <h2 style="color: #1877f2; margin-top: 0; font-size: 18px;">Post na Facebook</h2>
          <pre style="white-space: pre-wrap; font-family: inherit; font-size: 14px; line-height: 1.5; color: #cbd5e1;">${status.facebookDraft}</pre>
          <div style="margin-top: 20px;">
            <a href="${fbApproveUrl}" target="_blank" style="background-color: #1877f2; color: white; padding: 10px 20px; text-decoration: none; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: inline-block;">Zatwierdź Facebook</a>
          </div>
        </div>
        
        <!-- LinkedIn Section -->
        <div style="background-color: #1e293b; padding: 20px; margin-top: 25px; border-left: 4px solid #0a66c2;">
          <h2 style="color: #0a66c2; margin-top: 0; font-size: 18px;">Post na LinkedIn</h2>
          <pre style="white-space: pre-wrap; font-family: inherit; font-size: 14px; line-height: 1.5; color: #cbd5e1;">${status.linkedinDraft}</pre>
          <div style="margin-top: 20px;">
            <a href="${liApproveUrl}" target="_blank" style="background-color: #0a66c2; color: white; padding: 10px 20px; text-decoration: none; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: inline-block;">Zatwierdź LinkedIn</a>
          </div>
        </div>

        <p style="color: #64748b; font-size: 11px; margin-top: 30px; border-top: 1px solid #1e293b; padding-top: 15px;">Wiadomość wygenerowana automatycznie przez system dystrybucji AI w praktyce.</p>
      </div>
    `;

    let emailSent = false;
    if (gmailAppPassword) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailAppPassword },
      });
      await transporter.sendMail({
        from: `"AI w praktyce - Dystrybucja" <${gmailUser}>`,
        to: "mikolajczykamil@gmail.com",
        subject: `Social Media Drafts: ${article.title}`,
        html: htmlBody,
      });
      emailSent = true;
    }

    status.facebookSent = true;
    status.linkedinSent = true;
    await saveSocialPost(status);

    return res.json({
      success: true,
      emailSent,
      message: emailSent
        ? "Wersje robocze zostały wysłane na adres mikolajczykamil@gmail.com."
        : "Wersje robocze zostały wygenerowane i zapisane lokalnie (brak konfiguracji SMTP).",
    });
  } catch (error) {
    console.error("Error sending approval email:", error);
    return res.status(500).json({ success: false, message: "Błąd podczas wysyłania e-maila." });
  }
});

// 4. Approve drafts (displays confirmation page)
app.get("/api/social/approve", async (req, res) => {
  const slug = req.query.slug as string;
  const channel = req.query.channel as string;

  if (!slug || !channel || (channel !== "facebook" && channel !== "linkedin")) {
    return res.status(400).send("Nieprawidłowe parametry akceptacji.");
  }

  try {
    const status = await getSocialPost(slug);
    const backendUrl = process.env.APP_URL || `${req.protocol}://${req.get("host")}`;
    const trackingLink = `${backendUrl}/api/click/${channel}/${slug}`;

    let draftText = "";
    if (channel === "facebook") {
      status.facebookApproved = true;
      draftText = status.facebookDraft;
    } else {
      status.linkedinApproved = true;
      draftText = status.linkedinDraft;
    }

    // Replace [LINK_TRACKING] with the tracking URL
    const postWithLink = draftText.replace(/\[LINK_TRACKING\]/g, trackingLink);

    await saveSocialPost(status);

    const socialMediaIcon = channel === "facebook" ? "📘" : "💼";
    const socialMediaColor = channel === "facebook" ? "#1877f2" : "#0a66c2";
    const targetShareUrl = channel === "facebook" 
      ? `https://www.facebook.com/` 
      : `https://www.linkedin.com/feed/`;

    const htmlResponse = `
      <!DOCTYPE html>
      <html lang="pl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Zatwierdzono Post - ${channel}</title>
        <style>
          body {
            background-color: #09090b;
            color: #f4f4f5;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          .card {
            background-color: #18181b;
            border: 1px solid #27272a;
            border-radius: 8px;
            padding: 30px;
            max-width: 600px;
            width: 100%;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          }
          h1 {
            font-size: 22px;
            margin-top: 0;
            display: flex;
            align-items: center;
            gap: 10px;
            color: ${socialMediaColor};
          }
          .subtitle {
            color: #a1a1aa;
            font-size: 14px;
            margin-bottom: 20px;
          }
          .post-box {
            background-color: #09090b;
            border: 1px solid #27272a;
            padding: 20px;
            border-radius: 4px;
            font-family: inherit;
            font-size: 14px;
            line-height: 1.6;
            white-space: pre-wrap;
            color: #e4e4e7;
            margin-bottom: 20px;
            max-height: 350px;
            overflow-y: auto;
          }
          .btn-container {
            display: flex;
            gap: 12px;
          }
          .btn {
            background-color: ${socialMediaColor};
            color: white;
            border: none;
            padding: 12px 20px;
            font-weight: bold;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
            text-align: center;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1px;
            flex: 1;
            transition: opacity 0.2s;
          }
          .btn:hover {
            opacity: 0.9;
          }
          .btn-secondary {
            background-color: #27272a;
            color: #e4e4e7;
            border: 1px solid #3f3f46;
          }
          .btn-secondary:hover {
            background-color: #3f3f46;
          }
          .success-badge {
            display: inline-block;
            background-color: rgba(16, 185, 129, 0.1);
            border: 1px solid #10b981;
            color: #10b981;
            padding: 4px 10px;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 15px;
          }
          .toast {
            visibility: hidden;
            min-width: 250px;
            background-color: #10b981;
            color: white;
            text-align: center;
            border-radius: 4px;
            padding: 16px;
            position: fixed;
            z-index: 1;
            left: 50%;
            bottom: 30px;
            transform: translateX(-50%);
            font-size: 14px;
            font-weight: bold;
          }
          .toast.show {
            visibility: visible;
            animation: fadein 0.5s, fadeout 0.5s 2.5s;
          }
          @keyframes fadein {
            from {bottom: 0; opacity: 0;}
            to {bottom: 30px; opacity: 1;}
          }
          @keyframes fadeout {
            from {bottom: 30px; opacity: 0;}
            to {bottom: 0; opacity: 0;}
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="success-badge">Zaakceptowano</div>
          <h1>${socialMediaIcon} Post na ${channel === "facebook" ? "Facebook" : "LinkedIn"} zatwierdzony!</h1>
          <div class="subtitle">Skopiuj poniższą treść (zawiera unikalny link trackingowy) i wklej w wybranym kanale społecznościowym.</div>
          
          <div class="post-box" id="postContent">${postWithLink}</div>
          
          <div class="btn-container">
            <button class="btn" onclick="copyText()">Kopiuj Treść</button>
            <a href="${targetShareUrl}" target="_blank" class="btn btn-secondary">Otwórz ${channel === "facebook" ? "Facebook" : "LinkedIn"}</a>
          </div>
        </div>
        
        <div id="toast" class="toast">Skopiowano treść postu do schowka!</div>

        <script>
          function copyText() {
            var content = document.getElementById("postContent").innerText;
            navigator.clipboard.writeText(content).then(function() {
              var toast = document.getElementById("toast");
              toast.className = "toast show";
              setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
            }, function(err) {
              console.error('Błąd podczas kopiowania: ', err);
            });
          }
        </script>
      </body>
      </html>
    `;

    return res.send(htmlResponse);
  } catch (error) {
    console.error("Error approving social post:", error);
    return res.status(500).send("Wystąpił błąd podczas zatwierdzania.");
  }
});

// 5. Track link click and redirect
app.get("/api/click/:channel/:slug", async (req, res) => {
  const { channel, slug } = req.params;

  if (channel !== "facebook" && channel !== "linkedin") {
    return res.status(400).send("Nieprawidłowy kanał.");
  }

  try {
    const status = await getSocialPost(slug);
    
    if (channel === "facebook") {
      status.facebookClicks = (status.facebookClicks || 0) + 1;
    } else {
      status.linkedinClicks = (status.linkedinClicks || 0) + 1;
    }

    await saveSocialPost(status);

    const redirectUrl = `https://kamillimak.github.io/Blog/#/articles/${slug}?utm_source=${channel}&utm_medium=social&utm_campaign=dist`;
    return res.redirect(302, redirectUrl);
  } catch (error) {
    console.error("Error tracking click:", error);
    return res.redirect(302, `https://kamillimak.github.io/Blog/#/articles/${slug}`);
  }
});

// 6. Save edited drafts
app.post("/api/social/save/:slug", async (req, res) => {
  const { slug } = req.params;
  const { facebookDraft, linkedinDraft } = req.body;

  try {
    const status = await getSocialPost(slug);
    
    if (typeof facebookDraft === "string") status.facebookDraft = facebookDraft;
    if (typeof linkedinDraft === "string") status.linkedinDraft = linkedinDraft;

    await saveSocialPost(status);

    return res.json({ success: true, post: status });
  } catch (error) {
    console.error("Error saving edited social drafts:", error);
    return res.status(500).json({ success: false, message: "Nie udało się zapisać zmian." });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", storage: shouldUseFirestore() ? "firestore" : "local" });
});

async function setupApp() {
  if (!isProduction) {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));
  }

  app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
}

setupApp().catch((error) => {
  console.error("Server startup failed:", error);
  process.exitCode = 1;
});
