import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON body
app.use(express.json());

// Path to store local subscriptions
const SUBSCRIPTIONS_FILE = path.join(process.cwd(), "subscriptions.json");

// Helper to load current subscriptions
function getSubscriptions(): string[] {
  try {
    if (fs.existsSync(SUBSCRIPTIONS_FILE)) {
      const data = fs.readFileSync(SUBSCRIPTIONS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading subscriptions file:", error);
  }
  return [];
}

// Helper to save a subscription
function saveSubscription(email: string): boolean {
  try {
    const list = getSubscriptions();
    if (!list.includes(email)) {
      list.push(email);
      fs.writeFileSync(SUBSCRIPTIONS_FILE, JSON.stringify(list, null, 2), "utf-8");
      return true;
    }
  } catch (error) {
    console.error("Error saving subscription:", error);
  }
  return false;
}

// API Routes
app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({
      success: false,
      message: "Proszę podać poprawny adres e-mail.",
    });
  }

  const isNew = saveSubscription(email);

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  let emailSent = false;
  let emailError = null;

  if (gmailUser && gmailAppPassword) {
    try {
      // Configure Nodemailer transporter for Gmail
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailAppPassword,
        },
      });

      // HTML body with modern dark/light premium style
      const htmlBody = `
        <div style="background-color: #121212; color: #FFFFFF; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; text-align: center; max-width: 600px; margin: 0 auto; border: 1px solid #2D2D2D;">
          <div style="font-weight: 900; letter-spacing: -1px; font-size: 24px; text-transform: uppercase; margin-bottom: 5px;">
            Warsztat AI Coding
          </div>
          <div style="font-family: monospace; font-size: 10px; letter-spacing: 2px; color: #8F9092; text-transform: uppercase; margin-bottom: 30px; border-bottom: 1px solid #2D2D2D; padding-bottom: 20px;">
            Premium Tech Magazine
          </div>
          
          <h1 style="font-size: 22px; font-weight: 800; margin-bottom: 20px; text-transform: uppercase; letter-spacing: -0.5px;">
            Witaj w społeczności inżynierów AI!
          </h1>
          
          <p style="font-size: 14px; line-height: 1.6; color: #A1A1AA; text-align: left; margin-bottom: 30px;">
            Dziękujemy za zapisanie się do newslettera <strong>Warsztat AI Coding</strong>. Od teraz będziesz otrzymywać najbardziej szczegółowe techniczne opracowania, studia przypadków, zaawansowane prompty oraz gotowe wzorce współpracy z autonomicznymi agentami AI takimi jak Codex, Trae i Claude.
          </p>

          <div style="background-color: #1A1A1A; border: 1px solid #2D2D2D; padding: 20px; text-align: left; margin-bottom: 30px;">
            <div style="font-family: monospace; font-size: 11px; color: #8F9092; text-transform: uppercase; margin-bottom: 8px;">Twój status subskrypcji</div>
            <div style="font-size: 14px; font-weight: bold; color: #10B981;">● AKTYWNY (Adres: ${email})</div>
          </div>

          <p style="font-size: 12px; color: #71717A; margin-bottom: 30px;">
            Zastrzegamy sobie prawo do wysyłania wyłącznie merytorycznych, wyselekcjonowanych treści. Zero spamu, czysta wiedza inżynierska.
          </p>

          <hr style="border: 0; border-top: 1px solid #2D2D2D; margin-bottom: 20px;" />

          <p style="font-size: 10px; font-family: monospace; color: #52525B; text-transform: uppercase;">
            React 19 · TypeScript · Tailwind v4 · Warsztat AI Coding
          </p>
        </div>
      `;

      await transporter.sendMail({
        from: `"Warsztat AI Coding" <${gmailUser}>`,
        to: email,
        subject: "Witaj w Warsztacie AI Coding! Potwierdzenie subskrypcji",
        html: htmlBody,
      });

      emailSent = true;
    } catch (err: any) {
      console.error("Nodemailer error:", err);
      emailError = err?.message || "Nieznany błąd serwera pocztowego";
    }
  }

  return res.json({
    success: true,
    isNew,
    emailSavedLocally: true,
    gmailSent: emailSent,
    gmailError: emailError,
    message: emailSent
      ? "Pomyślnie zapisano do newslettera! Potwierdzenie e-mail zostało wysłane."
      : isNew 
        ? "Zapisano e-mail lokalnie. (Uwaga: Brak konfiguracji Gmail SMTP do wysyłki e-maili)."
        : "Ten adres e-mail jest już zapisany w naszej bazie."
  });
});

// Serve health status
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Configure Vite middleware in dev or serve static files in prod
async function setupApp() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupApp();
