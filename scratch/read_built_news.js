import fs from 'fs';
import path from 'path';

const jsFile = 'dist/assets/index-D4VccD3j.js';
if (fs.existsSync(jsFile)) {
  const content = fs.readFileSync(jsFile, 'utf8');
  
  // Search for the array containing the news items.
  // We can search for the titles we know: "Nvidia i partnerzy powołują", "Poprawki „Digital Omnibus on AI”", etc.
  const regex = /\[\s*\{\s*id:\s*"tech-[^\]]+\]/g;
  // Let's search for "tech-" or "top3-" inside a JSON-like array
  // Or just find occurrences of the known titles and print their context
  const lines = content.split('\n');
  console.log('Searching for news content in the built bundle...');
  
  // Let's find index-based items
  const matches = content.match(/"id"\s*:\s*"(tech|top3)-\d{4}-\d{2}-\d{2}[^"]*"/g) || [];
  console.log('News IDs found in JS bundle:', matches.length);
  
  // Let's do a simple substring match for the titles
  const titles = [
    "Nvidia i partnerzy powołują",
    "Poprawki",
    "MON zapowiada",
    "Program PERUN",
    "No-Code",
    "Spear-phishing",
    "Autonomiczne agenty",
    "Micro-SaaS",
    "Fake jobs",
    "Wyścig"
  ];
  
  titles.forEach(title => {
    const idx = content.indexOf(title);
    if (idx !== -1) {
      console.log(`Found "${title}" at offset ${idx}:`, content.slice(idx - 100, idx + 100));
    } else {
      console.log(`NOT found: "${title}"`);
    }
  });
} else {
  console.log('JS file not found');
}
