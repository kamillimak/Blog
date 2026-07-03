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

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === "production";
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
  if (!isProduction && !process.env.USE_FIRESTORE) return saveLocalSubscription(email);

  initializeAdmin();
  const id = crypto.createHash("sha256").update(email).digest("hex");
  const reference = getFirestore().collection("newsletterSubscriptions").doc(id);
  const existing = await reference.get();
  if (existing.exists) return false;

  await reference.set({ email, subscribedAt: new Date().toISOString(), source: "blog" });
  return true;
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

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", storage: isProduction || process.env.USE_FIRESTORE ? "firestore" : "local" });
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
