import fs from "fs";
import path from "path";
import sharp from "sharp";

const FLOW_DIR = path.resolve("public/images/flow");

async function convertJpegsToWebp() {
  try {
    if (!fs.existsSync(FLOW_DIR)) {
      console.error(`Folder ${FLOW_DIR} nie istnieje.`);
      process.exit(1);
    }

    const files = fs.readdirSync(FLOW_DIR);
    console.log(`Zaleziono ${files.length} plików w katalogu flow.`);

    for (const file of files) {
      if (file.toLowerCase().endsWith(".jpeg") || file.toLowerCase().endsWith(".jpg")) {
        const inputPath = path.join(FLOW_DIR, file);
        const outputName = file.replace(/\.jpe?g$/i, ".webp");
        const outputPath = path.join(FLOW_DIR, outputName);

        console.log(`Konwertowanie: ${file} -> ${outputName}`);
        
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);

        console.log(`Konwersja zakończona sukcesem. Usuwanie pliku źródłowego: ${file}`);
        fs.unlinkSync(inputPath);
      }
    }
    console.log("Wszystkie pliki zostały skonwertowane.");
  } catch (error) {
    console.error("Błąd podczas konwersji:", error);
    process.exit(1);
  }
}

convertJpegsToWebp();
