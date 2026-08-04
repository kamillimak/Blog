import fs from 'fs';
import path from 'path';

const stripMarkdown = (value) =>
  value
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^>\s?/gm, "")
    .trim();

const extractField = (block, field) => {
  const match = block.match(new RegExp(`- \\*\\*${field}:\\*\\*\\s+(.+)`));
  return stripMarkdown(match?.[1] ?? "");
};

const extractPublicationDate = (value, fallback) =>
  value.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? fallback;

const parseDailyBriefing = (filePath) => {
  const markdown = fs.readFileSync(filePath, 'utf8');
  const date = filePath.replace(/\\/g, "/").match(/daily-news\/(\d{4}-\d{2}-\d{2})\//)?.[1] ?? "";
  const blocks = markdown.split(/^##\s+\d+\.\s+/gm).slice(1);
  const headings = [...markdown.matchAll(/^##\s+\d+\.\s+(.+)$/gm)].map((match) => stripMarkdown(match[1]));

  return blocks.map((block, index) => {
    const category = extractField(block, "Kategoria");
    const isPolish = category.toLowerCase().includes("polska");
    const publishedAt = extractPublicationDate(extractField(block, "Data publikacji"), date);

    return {
      id: `tech-${date}-${index + 1}`,
      kind: isPolish ? "tech-pl" : "tech-world",
      title: headings[index] ?? `News ${index + 1}`,
      publishedAt,
    };
  });
};

const parseTopThreeBriefings = (dirPath) => {
  // Read all md files in dirPath
  const runId = path.basename(dirPath);
  const date = runId.slice(0, 10);
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md') && f !== 'README.md');
  
  const items = [];
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const markdown = fs.readFileSync(filePath, 'utf8');
    const kind = file.includes('crime') ? 'top3-crime' : (file.includes('business') ? 'top3-business' : 'top3-news');
    const title = stripMarkdown(markdown.match(/^#\s+(.+)$/m)?.[1] ?? file.replace(/\.md$/, ""));
    const publishedAt = markdown.match(/\*\*Data aktualno[śs]ci:\*\*\s+(\d{4}-\d{2}-\d{2})/)?.[1] ?? date;
    
    items.push({
      id: `top3-${runId}-${file.replace(/\.md$/, '')}`,
      kind,
      title,
      publishedAt
    });
  });
  return items;
};

// Find all daily briefings
const dailyNewsDir = 'content/daily-news';
const dailyNewsFiles = [];
if (fs.existsSync(dailyNewsDir)) {
  fs.readdirSync(dailyNewsDir).forEach(dateDir => {
    const fullDateDir = path.join(dailyNewsDir, dateDir);
    if (fs.statSync(fullDateDir).isDirectory()) {
      const file = path.join(fullDateDir, `${dateDir}.md`);
      if (fs.existsSync(file)) {
        dailyNewsFiles.push(file);
      }
    }
  });
}

const allDailyItems = dailyNewsFiles.flatMap(parseDailyBriefing);

// Find all top3 briefings
const top3Dir = 'content/top-3';
const top3Runs = [];
if (fs.existsSync(top3Dir)) {
  fs.readdirSync(top3Dir).forEach(runDir => {
    const fullRunDir = path.join(top3Dir, runDir);
    if (fs.statSync(fullRunDir).isDirectory()) {
      top3Runs.push(fullRunDir);
    }
  });
}
const allTop3Items = top3Runs.flatMap(parseTopThreeBriefings);

const allParsedItems = [...allDailyItems, ...allTop3Items];

const sortedAllItems = [...allParsedItems].sort((left, right) => {
  const dateOrder = right.publishedAt.localeCompare(left.publishedAt);
  return dateOrder || right.id.localeCompare(left.id);
});

// Group and take maximum 2 newest per category
const kinds = ["tech-pl", "tech-world", "top3-news", "top3-crime", "top3-business"];
const filteredItems = [];

for (const kind of kinds) {
  const itemsOfKind = sortedAllItems.filter((item) => item.kind === kind).slice(0, 2);
  filteredItems.push(...itemsOfKind);
}

// Final sort and assign sequential video backgrounds to rotate without repeating
const UNIFIED_NEWS_FEED = filteredItems
  .sort((left, right) => {
    const dateOrder = right.publishedAt.localeCompare(left.publishedAt);
    return dateOrder || right.id.localeCompare(left.id);
  });

console.log('Resulting UNIFIED_NEWS_FEED items (sorted):');
UNIFIED_NEWS_FEED.forEach((item, index) => {
  console.log(`${index + 1}. [${item.publishedAt}] [${item.kind}] - ${item.title}`);
});
