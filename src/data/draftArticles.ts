import type { Article, ArticleSection } from "../types/article";

const draftModules = import.meta.glob<string>("../../content/draft/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const AUTHOR = {
  name: "Kamil Mikołajczyk",
  role: "AI-Native Creator & Process Orchestrator",
  avatar: "KM",
};

const stripMarkdown = (value: string) =>
  value
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^>\s?/gm, "")
    .trim();

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const inferCategory = (fileName: string) => {
  if (/(crime|kryminalne)/.test(fileName)) return "Bezpieczeństwo";
  if (/(business|zarabianie)/.test(fileName)) return "Biznes AI";
  return "AI News";
};

const inferTool = (text: string): Article["tool"] => {
  if (/Claude|Anthropic/i.test(text)) return "Claude";
  if (/Codex|OpenAI/i.test(text)) return "Codex";
  return "AI Studio";
};

const inferHero = (category: string) => {
  if (category === "Bezpieczeństwo") return "workflow_hero";
  if (category === "Biznes AI") return "aistudio_hero";
  return "claude_hero";
};

const parseSections = (markdown: string): ArticleSection[] => {
  const blocks = markdown.split(/\r?\n\s*\r?\n/).slice(1);
  const sections: ArticleSection[] = [];

  for (const block of blocks) {
    const value = block.trim();
    if (!value) continue;

    const heading = value.match(/^(##|###)\s+(.+)$/);
    if (heading) {
      sections.push({
        type: "heading",
        level: heading[1] === "##" ? 2 : 3,
        text: stripMarkdown(heading[2]),
        id: slugify(heading[2]),
      });
      continue;
    }

    const bullets = value.split(/\r?\n/).filter((line) => /^[-*]\s+/.test(line));
    if (bullets.length > 1) {
      sections.push({
        type: "bulletList",
        items: bullets.map((line) => stripMarkdown(line.replace(/^[-*]\s+/, ""))),
      });
      continue;
    }

    sections.push({ type: "paragraph", text: stripMarkdown(value) });
  }

  return sections;
};

const createImagePlaceholder = (
  slug: string,
  title: string,
  category: string,
  index: 1 | 2,
): ArticleSection => {
  const suffix = String(index).padStart(2, "0");
  const fileName = `${slug}-${suffix}.webp`;
  const targetPath = `/public/news/drafts/${slug}/${fileName}`;
  const purpose = index === 1 ? "grafika otwierająca artykuł" : "ilustracja śródtekstowa wyjaśniająca główny mechanizm";

  return {
    type: "imagePlaceholder",
    fileName,
    targetPath,
    prompt: `Stwórz ${purpose} do polskojęzycznego artykułu „${title}” w kategorii ${category}. Styl: nowoczesny magazyn technologiczny, realistyczna redakcyjna ilustracja, wysoki kontrast, stonowana paleta z pomarańczowym akcentem, bez logotypów, bez tekstu na obrazie, bez znaków wodnych. Format 16:9, 1600×900 px, WebP. Zapisz jako ${fileName} w ${targetPath}.`,
  };
};

const createDraftArticle = (sourcePath: string, markdown: string, index: number): Article => {
  const pathParts = sourcePath.replace(/\\/g, "/").split("/");
  const fileName = pathParts.at(-1) ?? `draft-${index}.md`;
  const runFolder = pathParts.at(-2) ?? "draft";
  const baseName = fileName.replace(/\.md$/, "").replace(/^\d+-/, "");
  const title = stripMarkdown(markdown.match(/^#\s+(.+)$/m)?.[1] ?? baseName);
  const slug = `${runFolder}-${slugify(baseName)}`;
  const category = inferCategory(fileName);
  const parsedSections = parseSections(markdown);
  const firstParagraph = parsedSections.find((section) => section.type === "paragraph");
  const lead = firstParagraph?.type === "paragraph" ? firstParagraph.text : "Materiał redakcyjny oczekujący na zatwierdzenie.";
  const firstPlaceholder = createImagePlaceholder(slug, title, category, 1);
  const secondPlaceholder = createImagePlaceholder(slug, title, category, 2);
  const insertionPoint = Math.min(2, parsedSections.length);
  const sections = [
    ...parsedSections.slice(0, insertionPoint),
    firstPlaceholder,
    ...parsedSections.slice(insertionPoint),
    secondPlaceholder,
  ];
  const wordCount = stripMarkdown(markdown).split(/\s+/).filter(Boolean).length;

  return {
    id: `draft-${runFolder}-${index + 1}`,
    slug,
    title,
    subtitle: "Materiał roboczy — wymaga zatwierdzenia merytorycznego i uzupełnienia grafik",
    description: lead.slice(0, 240),
    category,
    tool: inferTool(markdown),
    author: AUTHOR,
    publishedAt: runFolder.slice(0, 10),
    readTime: Math.max(2, Math.ceil(wordCount / 220)),
    wordCount,
    heroImage: inferHero(category),
    imageAlt: `Placeholder grafiki dla artykułu: ${title}`,
    imageCaption: "DRAFT — grafika docelowa nie została jeszcze dostarczona.",
    accentColor: category === "Bezpieczeństwo" ? "amber" : category === "Biznes AI" ? "emerald" : "indigo",
    featured: false,
    tags: [category, "DRAFT", "AI"],
    pullQuote: "Materiał oczekuje na formalne zatwierdzenie poprawności treści i komplet dwóch grafik.",
    keyTakeaways: [
      "Status DRAFT: brak formalnego zatwierdzenia przez agenta odpowiedzialnego za poprawność treści.",
      "Artykuł nie ma jeszcze dwóch wymaganych grafik.",
      "Prompty, nazwy plików i ścieżki docelowe znajdują się w treści artykułu.",
      "Publikację należy zatwierdzić dopiero po weryfikacji źródeł i podmianie placeholderów.",
    ],
    sections,
    status: "DRAFT",
    sourcePath: sourcePath.replace("../../", ""),
  };
};

export const DRAFT_ARTICLES: Article[] = Object.entries(draftModules)
  .filter(([path]) => !path.endsWith("/README.md"))
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([path, markdown], index) => createDraftArticle(path, markdown, index));
