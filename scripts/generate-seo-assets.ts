import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ARTICLES } from "../src/data/articles";

type SeoItem = {
  slug: string;
  title: string;
  description: string;
  label: string;
  publishedAt: string;
};

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const siteUrl = "https://kamillimak.github.io/Blog";

const ensureDir = (dir: string) => mkdirSync(dir, { recursive: true });

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const stripMarkdown = (value: string) =>
  value
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/[*_`>#-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const truncate = (value: string, maxLength: number) =>
  value.length > maxLength ? `${value.slice(0, maxLength - 1).trim()}…` : value;

const articleSummary = (slug: string) => {
  const article = ARTICLES.find((candidate) => candidate.slug === slug);
  if (!article) return "";

  return article.sections
    .filter((section) => section.type === "paragraph")
    .slice(0, 3)
    .map((section) => `<p>${escapeHtml(section.text)}</p>`)
    .join("\n");
};

const renderOgSvg = (item: SeoItem, tone: "article" | "news") => {
  const accent = tone === "article" ? "#A8B084" : "#DCAE4F";
  const title = escapeHtml(truncate(item.title, 90));
  const description = escapeHtml(truncate(item.description, 140));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#11110F"/>
  <rect x="42" y="42" width="1116" height="546" fill="#F5F2EA"/>
  <rect x="78" y="78" width="1044" height="474" fill="#161616"/>
  <path d="M78 158H1122" stroke="${accent}" stroke-width="6"/>
  <text x="104" y="128" fill="${accent}" font-family="Poppins, Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="4">${escapeHtml(item.label.toUpperCase())}</text>
  <text x="104" y="260" fill="#F5F2EA" font-family="Lora, Georgia, serif" font-size="64" font-weight="700">${title}</text>
  <foreignObject x="104" y="306" width="900" height="150">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Poppins,Arial,sans-serif;font-size:30px;line-height:1.35;color:#B8B3A7">${description}</div>
  </foreignObject>
  <text x="104" y="510" fill="#F5F2EA" font-family="Poppins, Arial, sans-serif" font-size="22" font-weight="700">Blog technologiczny — Codex · Trae · Claude · AI Studio</text>
  <text x="1040" y="510" fill="${accent}" font-family="Poppins, Arial, sans-serif" font-size="28" font-weight="800">KM</text>
</svg>`;
};

const renderHtml = (item: SeoItem, route: "articles" | "news", bodyHtml: string) => {
  const canonical = `${siteUrl}/${route}/${item.slug}/`;
  const ogImage = `${siteUrl}/og/${route}/${item.slug}.svg`;
  const appUrl = `${siteUrl}/#/${route === "articles" ? `articles/${item.slug}` : ""}`;

  return `<!doctype html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(item.title)} — Blog technologiczny</title>
    <meta name="description" content="${escapeHtml(item.description)}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="${route === "articles" ? "article" : "website"}" />
    <meta property="og:title" content="${escapeHtml(item.title)}" />
    <meta property="og:description" content="${escapeHtml(item.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${ogImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(item.title)}" />
    <meta name="twitter:description" content="${escapeHtml(item.description)}" />
    <meta name="twitter:image" content="${ogImage}" />
    <script type="application/ld+json">
      ${JSON.stringify({
        "@context": "https://schema.org",
        "@type": route === "articles" ? "BlogPosting" : "NewsArticle",
        headline: item.title,
        description: item.description,
        datePublished: item.publishedAt,
        image: ogImage,
        mainEntityOfPage: canonical,
        author: { "@type": "Person", name: "Kamil Mikołajczyk" },
        publisher: { "@type": "Person", name: "Kamil Mikołajczyk" },
      })}
    </script>
    <style>
      body{margin:0;background:#fdfdfb;color:#1a1a1a;font-family:Inter,Arial,sans-serif}
      main{max-width:860px;margin:0 auto;padding:56px 20px 80px}
      a{color:#1a1a1a;font-weight:800;text-transform:uppercase;letter-spacing:.08em;font-size:12px}
      h1{font-family:Georgia,serif;font-size:clamp(36px,7vw,72px);line-height:.96;margin:24px 0}
      p{font-size:18px;line-height:1.7;color:#555}
      .label{font-size:11px;font-weight:900;letter-spacing:.18em;text-transform:uppercase;color:#5a5a40}
    </style>
  </head>
  <body>
    <main>
      <div class="label">${escapeHtml(item.label)}</div>
      <h1>${escapeHtml(item.title)}</h1>
      <p>${escapeHtml(item.description)}</p>
      ${bodyHtml}
      <p><a href="${appUrl}">Otwórz interaktywną wersję bloga</a></p>
    </main>
  </body>
</html>`;
};

const getMarkdownFiles = (dir: string): string[] => {
  try {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return getMarkdownFiles(entryPath);
      return entry.name.endsWith(".md") ? [entryPath] : [];
    });
  } catch {
    return [];
  }
};

const readNewsItems = (): SeoItem[] => {
  const files = [...getMarkdownFiles(path.join(rootDir, "content", "daily-news")), ...getMarkdownFiles(path.join(rootDir, "content", "top-3"))];

  return files
    .filter((file) => !file.endsWith("README.md"))
    .slice(-30)
    .map((file) => {
      const markdown = readFileSync(file, "utf8");
      const title = stripMarkdown(markdown.match(/^#\s+(.+)$/m)?.[1] ?? path.basename(file, ".md"));
      const description = truncate(stripMarkdown(markdown.split(/\r?\n\r?\n/).find((block) => !block.startsWith("#")) ?? title), 160);
      const publishedAt = markdown.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? new Date().toISOString().slice(0, 10);
      const slug = slugify(`${publishedAt}-${title}`);

      return { slug, title, description, label: "Newsroom AI", publishedAt };
    });
};

const writeSeoAssets = () => {
  const articleItems: SeoItem[] = ARTICLES.map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    label: `${article.category} · ${article.tool}`,
    publishedAt: article.publishedAt,
  }));
  const newsItems = readNewsItems();

  ensureDir(path.join(distDir, "og", "articles"));
  ensureDir(path.join(distDir, "og", "news"));

  articleItems.forEach((item) => {
    const routeDir = path.join(distDir, "articles", item.slug);
    ensureDir(routeDir);
    writeFileSync(path.join(routeDir, "index.html"), renderHtml(item, "articles", articleSummary(item.slug)), "utf8");
    writeFileSync(path.join(distDir, "og", "articles", `${item.slug}.svg`), renderOgSvg(item, "article"), "utf8");
  });

  newsItems.forEach((item) => {
    const routeDir = path.join(distDir, "news", item.slug);
    ensureDir(routeDir);
    writeFileSync(path.join(routeDir, "index.html"), renderHtml(item, "news", ""), "utf8");
    writeFileSync(path.join(distDir, "og", "news", `${item.slug}.svg`), renderOgSvg(item, "news"), "utf8");
  });

  const sitemapItems = [
    { loc: `${siteUrl}/`, priority: "1.0" },
    { loc: `${siteUrl}/#/articles`, priority: "0.8" },
    { loc: `${siteUrl}/#/privacy`, priority: "0.3" },
    ...articleItems.map((item) => ({ loc: `${siteUrl}/articles/${item.slug}/`, priority: "0.7" })),
    ...newsItems.map((item) => ({ loc: `${siteUrl}/news/${item.slug}/`, priority: "0.5" })),
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapItems
  .map(
    (item) => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${item.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
  writeFileSync(path.join(distDir, "sitemap.xml"), sitemap, "utf8");

  console.log(`Generated ${articleItems.length} article SSG pages, ${newsItems.length} news SSG pages and OG images.`);
};

writeSeoAssets();
