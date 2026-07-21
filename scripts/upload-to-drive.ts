import fs from "fs";
import path from "path";

const FOLDER_ID = "1TvG50XNx8E7hS_q-0qnsFE-xCPqxJrL0";

const token = process.argv[2] || process.env.GOOGLE_OAUTH_TOKEN || process.env.GDRIVE_ACCESS_TOKEN;

if (!token) {
  console.log("=== SKRYPT WYSYŁKI PLIKÓW DO GOOGLE DRIVE ===");
  console.log("Użycie:");
  console.log("  npx tsx scripts/upload-to-drive.ts <TWOJ_TOKEN_OAUTH_GOOGLE>");
  console.log("");
  console.log("Domyślny folder Docelowy Google Drive:");
  console.log("  https://drive.google.com/drive/folders/1TvG50XNx8E7hS_q-0qnsFE-xCPqxJrL0");
  console.log("");
  console.log("Alternatywnie możesz użyć panelu w Strefie Twórcy (/workspace) w przeglądarce po zalogowaniu się przez Google!");
  process.exit(1);
}

const PUBLIC_DIR = path.resolve("public");

interface MediaItem {
  name: string;
  relativePath: string;
  mimeType: string;
}

const mediaFiles: MediaItem[] = [
  // Google Flow Images
  { name: "codex-agent.jpeg", relativePath: "images/flow/codex-agent.jpeg", mimeType: "image/jpeg" },
  { name: "code-diff.jpeg", relativePath: "images/flow/code-diff.jpeg", mimeType: "image/jpeg" },
  { name: "code-transform.jpeg", relativePath: "images/flow/code-transform.jpeg", mimeType: "image/jpeg" },
  { name: "context-map.jpeg", relativePath: "images/flow/context-map.jpeg", mimeType: "image/jpeg" },
  { name: "gear-pipeline.jpeg", relativePath: "images/flow/gear-pipeline.jpeg", mimeType: "image/jpeg" },
  { name: "share-node.jpeg", relativePath: "images/flow/share-node.jpeg", mimeType: "image/jpeg" },
  { name: "social-cards.jpeg", relativePath: "images/flow/social-cards.jpeg", mimeType: "image/jpeg" },
  { name: "ten-pillars.jpeg", relativePath: "images/flow/ten-pillars.jpeg", mimeType: "image/jpeg" },
  { name: "timeline-roadmap.jpeg", relativePath: "images/flow/timeline-roadmap.jpeg", mimeType: "image/jpeg" },
  { name: "antigravity-core.jpeg", relativePath: "images/flow/antigravity-core.jpeg", mimeType: "image/jpeg" },
  { name: "kamil-mikolajczyk.png", relativePath: "images/kamil-mikolajczyk.png", mimeType: "image/png" },
  // Newsroom background videos
  { name: "tech-news-01.mp4", relativePath: "news/backgrounds/tech-news-01.mp4", mimeType: "video/mp4" },
  { name: "tech-news-02.mp4", relativePath: "news/backgrounds/tech-news-02.mp4", mimeType: "video/mp4" },
  { name: "tech-news-03.mp4", relativePath: "news/backgrounds/tech-news-03.mp4", mimeType: "video/mp4" },
  { name: "tech-news-04.mp4", relativePath: "news/backgrounds/tech-news-04.mp4", mimeType: "video/mp4" },
  { name: "tech-news-05.mp4", relativePath: "news/backgrounds/tech-news-05.mp4", mimeType: "video/mp4" },
  { name: "tech-news-06.mp4", relativePath: "news/backgrounds/tech-news-06.mp4", mimeType: "video/mp4" },
  { name: "tech-news-07.mp4", relativePath: "news/backgrounds/tech-news-07.mp4", mimeType: "video/mp4" },
  { name: "tech-news-08.mp4", relativePath: "news/backgrounds/tech-news-08.mp4", mimeType: "video/mp4" },
  { name: "tech-news-09.mp4", relativePath: "news/backgrounds/tech-news-09.mp4", mimeType: "video/mp4" },
  { name: "tech-news-10.mp4", relativePath: "news/backgrounds/tech-news-10.mp4", mimeType: "video/mp4" },
  { name: "tech-news-11.mp4", relativePath: "news/backgrounds/tech-news-11.mp4", mimeType: "video/mp4" },
  { name: "tech-news-12.mp4", relativePath: "news/backgrounds/tech-news-12.mp4", mimeType: "video/mp4" },
  { name: "tech-news-13.mp4", relativePath: "news/backgrounds/tech-news-13.mp4", mimeType: "video/mp4" },
  { name: "tech-news-14.mp4", relativePath: "news/backgrounds/tech-news-14.mp4", mimeType: "video/mp4" },
  { name: "tech-news-15.mp4", relativePath: "news/backgrounds/tech-news-15.mp4", mimeType: "video/mp4" },
  { name: "tech-news-16.mp4", relativePath: "news/backgrounds/tech-news-16.mp4", mimeType: "video/mp4" },
  { name: "tech-news-17.mp4", relativePath: "news/backgrounds/tech-news-17.mp4", mimeType: "video/mp4" },
  { name: "tech-news-18.mp4", relativePath: "news/backgrounds/tech-news-18.mp4", mimeType: "video/mp4" },
];

async function uploadToDrive() {
  console.log(`Rozpoczynanie wysyłki ${mediaFiles.length} plików mediów do folderu Google Drive ID: ${FOLDER_ID}...`);

  let successCount = 0;
  let errorCount = 0;

  for (const item of mediaFiles) {
    const filePath = path.join(PUBLIC_DIR, item.relativePath);

    if (!fs.existsSync(filePath)) {
      console.warn(`[SKIP] Brak pliku lokalnego: ${item.relativePath}`);
      continue;
    }

    try {
      const fileBuffer = fs.readFileSync(filePath);
      const boundary = "------WebKitFormBoundary7MA4YWxkTrZu0gW";

      const metadata = JSON.stringify({
        name: item.name,
        parents: [FOLDER_ID],
      });

      const body = Buffer.concat([
        Buffer.from(
          `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n`
        ),
        Buffer.from(
          `--${boundary}\r\nContent-Type: ${item.mimeType}\r\n\r\n`
        ),
        fileBuffer,
        Buffer.from(`\r\n--${boundary}--\r\n`),
      ]);

      const res = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": `multipart/related; boundary=${boundary}`,
        },
        body: body,
      });

      if (!res.ok) {
        const text = await res.text();
        console.error(`[ERR ${res.status}] Nie udało się przesłać ${item.name}: ${text}`);
        errorCount++;
      } else {
        const data = await res.json();
        console.log(`[OK] Wygenerowano plik: ${item.name} (Drive ID: ${data.id})`);
        successCount++;
      }
    } catch (err) {
      console.error(`[ERR] Błąd podczas przesyłania ${item.name}:`, err);
      errorCount++;
    }
  }

  console.log("==========================================");
  console.log(`Zakończono wysyłkę! Sukcesy: ${successCount}, Błędy: ${errorCount}`);
}

uploadToDrive();
