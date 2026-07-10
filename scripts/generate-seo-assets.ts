import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
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
const today = new Date().toISOString().slice(0, 10);

const ensureDir = (dir: string) => mkdirSync(dir, { recursive: true });

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const stripMarkdown = (value: string) =>
  value
    .replace(/^\uFEFF/, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^>\s?/gm, "")
    .replace(/\s+/g, " ")
    .trim();

const transliterate = (value: string) =>
  value
    .replace(/[ąĄ]/g, "a")
    .replace(/[ćĆ]/g, "c")
    .replace(/[ęĘ]/g, "e")
    .replace(/[łŁ]/g, "l")
    .replace(/[ńŃ]/g, "n")
    .replace(/[óÓ]/g, "o")
    .replace(/[śŚ]/g, "s")
    .replace(/[źŹżŻ]/g, "z");

const slugify = (value: string) =>
  transliterate(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const truncate = (value: string, maxLength: number) =>
  value.length > maxLength ? `${value.slice(0, maxLength - 1).trim()}…` : value;

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

const getField = (block: string, field: string) => {
  const match = block.match(new RegExp(`- \\*\\*${field}:\\*\\*\\s+(.+)`, "i"));
  return stripMarkdown(match?.[1] ?? "");
};

const extractLead = (markdown: string) => {
  const lead = markdown.match(/## Lead\s+([\s\S]*?)(?=\n##\s+)/);
  if (lead?.[1]) {
    const paragraph = lead[1].trim().split(/\r?\n\s*\r?\n/)[0] ?? "";
    return stripMarkdown(paragraph);
  }

  const paragraph = markdown
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith("#") && !/^\*\*(Status|Data|Zakres|Uwaga)/i.test(block));

  return stripMarkdown(paragraph ?? "");
};

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
  <text x="104" y="510" fill="#F5F2EA" font-family="Poppins, Arial, sans-serif" font-size="22" font-weight="700">AI w praktyce — Codex · Trae · Claude · AI Studio</text>
  <text x="1040" y="510" fill="${accent}" font-family="Poppins, Arial, sans-serif" font-size="28" font-weight="800">KM</text>
</svg>`;
};

const writeOgImages = async (item: SeoItem, route: "articles" | "news", tone: "article" | "news") => {
  const svg = renderOgSvg(item, tone);
  const targetDir = path.join(distDir, "og", route);
  ensureDir(targetDir);
  writeFileSync(path.join(targetDir, `${item.slug}.svg`), svg, "utf8");
  await sharp(Buffer.from(svg)).png().toFile(path.join(targetDir, `${item.slug}.png`));
};

const renderHtml = (item: SeoItem, route: "articles" | "news", bodyHtml: string) => {
  const canonical = `${siteUrl}/${route}/${item.slug}/`;
  const ogImage = `${siteUrl}/og/${route}/${item.slug}.png`;
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
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
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

const renderHomeSnapshot = () => {
  const featured = ARTICLES.find((article) => article.featured) ?? ARTICLES[0];
  const recentArticles = ARTICLES.slice(0, 6)
    .map((article) => `<li><a href="${siteUrl}/articles/${article.slug}/">${escapeHtml(article.title)}</a></li>`)
    .join("");

  return `<main id="seo-home-snapshot" aria-label="Statyczny snapshot strony głównej">
  <section>
    <p>Blog technologiczny Kamila Mikołajczyka</p>
    <h1>Praktyczne podejście do AI</h1>
    <p>Blog o pracy z Codex, Trae, Claude i AI Studio: od codziennych newsów technologicznych, przez automatyzacje, po konkretne workflow dla osób, które chcą szybciej projektować, wdrażać i opowiadać o produktach AI.</p>
    <p><a href="${siteUrl}/articles/">Czytaj artykuły</a></p>
  </section>
  <section>
    <h2>Polecany artykuł</h2>
    <h3><a href="${siteUrl}/articles/${featured.slug}/">${escapeHtml(featured.title)}</a></h3>
    <p>${escapeHtml(featured.description)}</p>
  </section>
  <section>
    <h2>Najnowsze artykuły</h2>
    <ul>${recentArticles}</ul>
  </section>
</main>`;
};

const injectHomeSnapshot = () => {
  const indexPath = path.join(distDir, "index.html");
  const html = readFileSync(indexPath, "utf8");
  const snapshot = renderHomeSnapshot();
  const style = `<style id="seo-snapshot-style">#seo-home-snapshot{max-width:960px;margin:0 auto;padding:56px 20px 72px;font-family:Inter,Arial,sans-serif;color:#1a1a1a}#seo-home-snapshot h1{font-family:Georgia,serif;font-size:clamp(40px,8vw,84px);line-height:.95;margin:16px 0}#seo-home-snapshot h2{margin-top:40px;font-size:14px;text-transform:uppercase;letter-spacing:.18em}#seo-home-snapshot a{color:#1a1a1a;font-weight:800}#seo-home-snapshot p{font-size:18px;line-height:1.65;color:#555}</style>`;
  const withStyle = html.includes("seo-snapshot-style") ? html : html.replace("</head>", `${style}\n  </head>`);
  const withSnapshot = withStyle.replace('<div id="root"></div>', `<div id="root">\n${snapshot}\n    </div>`);
  writeFileSync(indexPath, withSnapshot, "utf8");
};

const renderArticlesIndex = (items: SeoItem[]) => `<!doctype html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Artykuły — AI w praktyce</title>
    <meta name="description" content="Artykuły o praktycznym wykorzystaniu AI, Codex, Trae, Claude, AI Studio, automatyzacjach i workflow AI-native." />
    <link rel="canonical" href="${siteUrl}/articles/" />
  </head>
  <body>
    <main>
      <h1>Artykuły</h1>
      <p>Praktyczne omówienia narzędzi AI, procesów, automatyzacji i pracy z agentami.</p>
      <ul>
        ${items.map((item) => `<li><a href="${siteUrl}/articles/${item.slug}/">${escapeHtml(item.title)}</a></li>`).join("\n        ")}
      </ul>
      <p><a href="${siteUrl}/#/articles">Otwórz interaktywną listę artykułów</a></p>
    </main>
  </body>
</html>`;

const renderPrivacyIndex = () => `<!doctype html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Polityka prywatności — AI w praktyce</title>
    <meta name="description" content="Informacje o analityce, Consent Mode v2, newsletterze, plikach cookies i kontakcie w sprawach prywatności." />
    <link rel="canonical" href="${siteUrl}/privacy/" />
  </head>
  <body>
    <main>
      <h1>Polityka prywatności</h1>
      <p>Blog może korzystać z Google Analytics 4 z Consent Mode v2. Domyślnie zgoda analityczna jest wyłączona, a użytkownik może zdecydować, czy akceptuje pomiar.</p>
      <p>Newsletter przetwarza adres e-mail potrzebny do obsługi subskrypcji. Kontakt: <a href="mailto:mikolajczykamil@gmail.com">mikolajczykamil@gmail.com</a>.</p>
      <p><a href="${siteUrl}/#/privacy">Otwórz interaktywną politykę prywatności</a></p>
    </main>
  </body>
</html>`;

const writeStaticIndexes = (articleItems: SeoItem[]) => {
  const articlesDir = path.join(distDir, "articles");
  const privacyDir = path.join(distDir, "privacy");
  ensureDir(articlesDir);
  ensureDir(privacyDir);
  writeFileSync(path.join(articlesDir, "index.html"), renderArticlesIndex(articleItems), "utf8");
  writeFileSync(path.join(privacyDir, "index.html"), renderPrivacyIndex(), "utf8");
};

const readTopThreeItems = (files: string[]) =>
  files
    .filter((file) => !file.endsWith("README.md"))
    .map((file) => {
      const markdown = readFileSync(file, "utf8").replace(/^\uFEFF/, "");
      const title = stripMarkdown(markdown.match(/^#\s+(.+)$/m)?.[1] ?? path.basename(file, ".md"));
      const description = truncate(extractLead(markdown) || title, 160);
      const publishedAt = markdown.match(/\*\*Data aktualności:\*\*\s+(\d{4}-\d{2}-\d{2})/)?.[1] ?? file.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? today;
      const slug = slugify(`${publishedAt}-${title}`);

      return { slug, title, description, label: "TOP 3", publishedAt };
    });

const readDailyNewsItems = (files: string[]) =>
  files.flatMap((file) => {
    const markdown = readFileSync(file, "utf8").replace(/^\uFEFF/, "");
    const date = file.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? today;
    const blocks = markdown.split(/^##\s+\d+\.\s+/gm).slice(1);
    const headings = [...markdown.matchAll(/^##\s+\d+\.\s+(.+)$/gm)].map((match) => stripMarkdown(match[1]));

    return blocks.map((block, index) => {
      const title = headings[index] ?? `News ${index + 1}`;
      const description = truncate(getField(block, "Podsumowanie") || extractLead(block) || title, 160);
      const publishedAt = getField(block, "Data publikacji").match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? date;
      const slug = slugify(`${publishedAt}-${title}`);

      return { slug, title, description, label: "Newsroom", publishedAt };
    });
  });

const dedupeItems = (items: SeoItem[]) => {
  const seen = new Map<string, number>();
  return items.map((item) => {
    const count = seen.get(item.slug) ?? 0;
    seen.set(item.slug, count + 1);
    return count === 0 ? item : { ...item, slug: `${item.slug}-${count + 1}` };
  });
};

const readNewsItems = (): SeoItem[] => {
  const dailyFiles = getMarkdownFiles(path.join(rootDir, "content", "daily-news"));
  const topThreeFiles = getMarkdownFiles(path.join(rootDir, "content", "top-3"));
  const items = [...readDailyNewsItems(dailyFiles), ...readTopThreeItems(topThreeFiles)];

  return dedupeItems(items)
    .sort((left, right) => `${right.publishedAt}-${right.slug}`.localeCompare(`${left.publishedAt}-${left.slug}`))
    .slice(0, 30);
};

const writeSeoAssets = async () => {
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

  injectHomeSnapshot();
  writeStaticIndexes(articleItems);

  for (const item of articleItems) {
    const routeDir = path.join(distDir, "articles", item.slug);
    ensureDir(routeDir);
    writeFileSync(path.join(routeDir, "index.html"), renderHtml(item, "articles", articleSummary(item.slug)), "utf8");
    await writeOgImages(item, "articles", "article");
  }

  for (const item of newsItems) {
    const routeDir = path.join(distDir, "news", item.slug);
    ensureDir(routeDir);
    writeFileSync(path.join(routeDir, "index.html"), renderHtml(item, "news", ""), "utf8");
    await writeOgImages(item, "news", "news");
  }

  const sitemapItems = [
    { loc: `${siteUrl}/`, priority: "1.0" },
    { loc: `${siteUrl}/articles/`, priority: "0.8" },
    { loc: `${siteUrl}/privacy/`, priority: "0.3" },
    ...articleItems.map((item) => ({ loc: `${siteUrl}/articles/${item.slug}/`, priority: "0.7" })),
    ...newsItems.map((item) => ({ loc: `${siteUrl}/news/${item.slug}/`, priority: "0.5" })),
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapItems
  .map(
    (item) => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${item.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
  writeFileSync(path.join(distDir, "sitemap.xml"), sitemap, "utf8");

  console.log(`Generated homepage snapshot, ${articleItems.length} article SSG pages, ${newsItems.length} news SSG pages and OG PNG/SVG images.`);
};

await writeSeoAssets();
