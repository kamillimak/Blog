import { DRAFT_ARTICLES } from "./draftArticles";

export type UnifiedNewsKind =
  | "tech-pl"
  | "tech-world"
  | "top3-news"
  | "top3-crime"
  | "top3-business";

export interface UnifiedNewsItem {
  id: string;
  kind: UnifiedNewsKind;
  label: string;
  groupLabel: string;
  title: string;
  summary: string;
  sourceLabel: string;
  sourceUrl: string;
  publishedAt: string;
  status: "DRAFT" | "APPROVED";
  video: string;
  draftSlug?: string;
}

export interface DailyTechBriefing {
  date: string;
  status: "DRAFT" | "APPROVED";
  polishCount: number;
  worldCount: number;
  items: UnifiedNewsItem[];
  draftSlug?: string;
}

export interface TopThreeBriefing {
  runId: string;
  date: string;
  status: "DRAFT" | "APPROVED";
  items: UnifiedNewsItem[];
}

const dailyModules = import.meta.glob<string>("../../content/daily-news/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const topThreeModules = import.meta.glob<string>("../../content/top-3/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const NEWSROOM_VIDEOS = [
  "news/backgrounds/tech-news-01.mp4",
  "news/backgrounds/tech-news-02.mp4",
  "news/backgrounds/tech-news-03.mp4",
  "news/backgrounds/tech-news-04.mp4",
  "news/backgrounds/tech-news-05.mp4",
  "news/backgrounds/tech-news-06.mp4",
  "news/backgrounds/tech-news-07.mp4",
  "news/backgrounds/tech-news-08.mp4",
  "news/backgrounds/tech-news-09.mp4",
  "news/backgrounds/tech-news-10.mp4",
];

const stripMarkdown = (value: string) =>
  value
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
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

const getLatestPath = (paths: string[]) =>
  [...paths].sort((left, right) => right.localeCompare(left))[0];

const extractField = (block: string, field: string) => {
  const match = block.match(new RegExp(`- \\*\\*${field}:\\*\\*\\s+(.+)`));
  return stripMarkdown(match?.[1] ?? "");
};

const extractFirstSource = (markdown: string) => {
  const match = markdown.match(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/);

  return {
    sourceLabel: stripMarkdown(match?.[1] ?? "Zrodlo"),
    sourceUrl: match?.[2] ?? "#",
  };
};

const findDraftSlug = (sourcePath: string) =>
  DRAFT_ARTICLES.find((article) => article.sourcePath === sourcePath)?.slug;

const parseStatus = (markdown: string): "DRAFT" | "APPROVED" =>
  /\bAPPROVED\b/i.test(markdown) ? "APPROVED" : "DRAFT";

const getVideo = (index: number) => NEWSROOM_VIDEOS[index % NEWSROOM_VIDEOS.length];

const parseDailyBriefing = (): DailyTechBriefing => {
  const latestPath = getLatestPath(Object.keys(dailyModules));
  const markdown = dailyModules[latestPath] ?? "";
  const date = latestPath?.replace(/\\/g, "/").match(/daily-news\/(\d{4}-\d{2}-\d{2})\//)?.[1] ?? "";
  const status = parseStatus(markdown);
  const geoMatch = markdown.match(/Podzia[łl] geograficzny:\s+\*\*Polska\s+(\d+)\s+\/\s+[ŚS]wiat\s+(\d+)\*\*/i);
  const blocks = markdown.split(/^##\s+\d+\.\s+/gm).slice(1);
  const headings = [...markdown.matchAll(/^##\s+\d+\.\s+(.+)$/gm)].map((match) => stripMarkdown(match[1]));
  const draftSlug = findDraftSlug(`content/draft/${date}-daily-news/${date}.md`);

  const items = blocks.map((block, index): UnifiedNewsItem => {
    const category = extractField(block, "Kategoria");
    const isPolish = category.toLowerCase().includes("polska");
    const sourceLabel = extractField(block, "Źródło") || extractField(block, "Zrodlo");
    const sourceUrl = extractField(block, "URL");
    const publishedAt = extractField(block, "Data publikacji") || date;

    return {
      id: `tech-${date}-${index + 1}`,
      kind: isPolish ? "tech-pl" : "tech-world",
      label: isPolish ? "Tech PL" : "Tech World",
      groupLabel: "Daily tech",
      title: headings[index] ?? `News ${index + 1}`,
      summary: extractField(block, "Podsumowanie"),
      sourceLabel,
      sourceUrl,
      publishedAt,
      status,
      video: getVideo(index),
      draftSlug,
    };
  });

  const polishCount = Number(geoMatch?.[1] ?? items.filter((item) => item.kind === "tech-pl").length);
  const worldCount = Number(geoMatch?.[2] ?? items.filter((item) => item.kind === "tech-world").length);

  return { date, status, polishCount, worldCount, items, draftSlug };
};

const topThreeKind = (fileName: string): UnifiedNewsKind => {
  if (/crime/.test(fileName)) return "top3-crime";
  if (/business/.test(fileName)) return "top3-business";
  return "top3-news";
};

const topThreeLabel = (kind: UnifiedNewsKind) => {
  if (kind === "top3-crime") return "TOP 3 / Crime AI";
  if (kind === "top3-business") return "TOP 3 / AI Money";
  return "TOP 3 / AI News";
};

const topThreeGroupLabel = (kind: UnifiedNewsKind) => {
  if (kind === "top3-crime") return "Kryminalne uzycia AI";
  if (kind === "top3-business") return "Zarabianie z AI";
  return "Newsy ze swiata AI";
};

const extractLead = (markdown: string) => {
  const lead = markdown.match(/## Lead\s+([\s\S]*?)(?=\n##\s+)/);
  const paragraph = lead?.[1].trim().split(/\r?\n\s*\r?\n/)[0] ?? "";

  return stripMarkdown(paragraph);
};

const parseTopThreeBriefing = (): TopThreeBriefing => {
  const runIds = Array.from(
    new Set(
      Object.keys(topThreeModules)
        .map((path) => path.replace(/\\/g, "/").match(/top-3\/([^/]+)\//)?.[1])
        .filter((runId): runId is string => Boolean(runId)),
    ),
  );
  const runId = getLatestPath(runIds);
  const runEntries = Object.entries(topThreeModules)
    .filter(([path]) => path.replace(/\\/g, "/").includes(`/top-3/${runId}/`))
    .filter(([path]) => !path.endsWith("/README.md"))
    .sort(([left], [right]) => left.localeCompare(right));
  const readme = topThreeModules[`../../content/top-3/${runId}/README.md`] ?? "";
  const date = runId?.slice(0, 10) ?? "";
  const status = parseStatus(readme || runEntries[0]?.[1] || "");

  const items = runEntries.map(([path, markdown], index): UnifiedNewsItem => {
    const normalizedPath = path.replace(/\\/g, "/");
    const fileName = normalizedPath.split("/").at(-1) ?? "";
    const kind = topThreeKind(fileName);
    const title = stripMarkdown(markdown.match(/^#\s+(.+)$/m)?.[1] ?? fileName.replace(/\.md$/, ""));
    const { sourceLabel, sourceUrl } = extractFirstSource(markdown);
    const draftSlug = findDraftSlug(`content/draft/${runId}/${fileName}`);

    return {
      id: `top3-${runId}-${slugify(fileName)}`,
      kind,
      label: topThreeLabel(kind),
      groupLabel: topThreeGroupLabel(kind),
      title,
      summary: extractLead(markdown),
      sourceLabel,
      sourceUrl,
      publishedAt: markdown.match(/\*\*Data aktualno[śs]ci:\*\*\s+(\d{4}-\d{2}-\d{2})/)?.[1] ?? date,
      status,
      video: getVideo(index + 5),
      draftSlug,
    };
  });

  return { runId, date, status, items };
};

export const DAILY_TECH_BRIEFING = parseDailyBriefing();
export const TOP_THREE_BRIEFING = parseTopThreeBriefing();
export const UNIFIED_NEWS_FEED: UnifiedNewsItem[] = [
  ...DAILY_TECH_BRIEFING.items,
  ...TOP_THREE_BRIEFING.items,
];
