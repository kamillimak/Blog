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
    <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#a8b084;font-weight:700">Warsztat AI Coding</p>
    <h1 style="font-size:32px;line-height:1.05;margin:0 0 12px">Nowości z ostatnich 24h</h1>
    <p style="color:#b8b3a7;line-height:1.6;margin:0 0 24px">Krótki dzienny digest artykułów, newsów i materiałów AI opublikowanych lub wygenerowanych w ostatniej dobie.</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${list}</table>
    <p style="margin-top:28px;color:#70706b;font-size:12px">Otrzymujesz tę wiadomość, bo zapisano ten adres do newslettera Warsztat AI Coding.</p>
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
          from: `"Warsztat AI Coding" <${gmailUser}>`,
          to: email,
          subject: "Witaj w Warsztacie AI Coding! Potwierdzenie subskrypcji",
          html: `<div style="background:#121212;color:#fff;font-family:Arial,sans-serif;padding:40px;max-width:600px;margin:auto"><h1>Warsztat AI Coding</h1><p>Dziękujemy za zapisanie się do newslettera. Od teraz będziesz otrzymywać wyselekcjonowane materiały o pracy z AI.</p><p style="color:#10b981"><strong>● SUBSKRYPCJA AKTYWNA</strong></p></div>`,
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
          ? "Adres został zapisany. Wiadomość powitalna jest obecnie wyłączona."
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
        from: `"Warsztat AI Coding" <${gmailUser}>`,
        to: subscriber,
        subject: "Warsztat AI Coding: nowości z ostatnich 24h",
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
