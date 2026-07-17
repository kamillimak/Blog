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

const extractPublicationDate = (value: string, fallback: string) =>
  value.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? fallback;

const cleanUrl = (value: string) => {
  const url = value.trim();
  return /^https?:\/\//i.test(url) ? url : "";
};

const restrictedSourcePatterns = [
  /https?:\/\/(www\.)?ft\.com\//i,
  /https?:\/\/(www\.)?fbi\.gov\//i,
  /https?:\/\/(www\.)?defense\.gov\/News\/Releases\/?/i,
  /https?:\/\/(www\.)?mckinsey\.com\//i,
  /https?:\/\/(www\.)?microsoft\.com\/en-us\/worklab\//i,
  /https?:\/\/openai\.com\/business\//i,
];

const isRestrictedSourceUrl = (url: string) =>
  restrictedSourcePatterns.some((pattern) => pattern.test(url));

const extractSources = (markdown: string) =>
  [...markdown.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g)]
    .map((match) => ({
      sourceLabel: stripMarkdown(match[1] ?? "Źródło"),
      sourceUrl: cleanUrl(match[2] ?? ""),
    }))
    .filter((source) => source.sourceUrl);

const extractFirstSource = (markdown: string) => {
  const sources = extractSources(markdown);
  const publicSource = sources.find((source) => !isRestrictedSourceUrl(source.sourceUrl));
  const firstSource = sources[0];

  if (publicSource) return publicSource;

  if (firstSource) {
    return {
      sourceLabel: `${firstSource.sourceLabel} (dostęp ograniczony)`,
      sourceUrl: "",
    };
  }

  return {
    sourceLabel: "Źródło niedostępne",
    sourceUrl: "",
  };
};

const findDraftSlug = (sourcePath: string) =>
  DRAFT_ARTICLES.find((article) => article.sourcePath === sourcePath)?.slug;

const parseStatus = (markdown: string): "DRAFT" | "APPROVED" =>
  /\bAPPROVED\b/i.test(markdown) ? "APPROVED" : "DRAFT";

const getVideo = (index: number) => NEWSROOM_VIDEOS[index % NEWSROOM_VIDEOS.length];

const parseDailyBriefing = (path: string): DailyTechBriefing => {
  const markdown = dailyModules[path] ?? "";
  const date = path?.replace(/\\/g, "/").match(/daily-news\/(\d{4}-\d{2}-\d{2})\//)?.[1] ?? "";
  const status = parseStatus(markdown);
  const geoMatch = markdown.match(/Podzia[łl] geograficzny:\s+\*\*Polska\s+(\d+)\s+\/\s+[ŚS]wiat\s+(\d+)\*\*/i);
  const blocks = markdown.split(/^##\s+\d+\.\s+/gm).slice(1);
  const headings = [...markdown.matchAll(/^##\s+\d+\.\s+(.+)$/gm)].map((match) => stripMarkdown(match[1]));
  const draftSlug = findDraftSlug(`content/draft/${date}-daily-news/${date}.md`);

  const items = blocks.map((block, index): UnifiedNewsItem => {
    const category = extractField(block, "Kategoria");
    const isPolish = category.toLowerCase().includes("polska");
    const sourceLabel = extractField(block, "Źródło") || extractField(block, "Zrodlo");
    const sourceUrl = cleanUrl(extractField(block, "URL"));
    const publishedAt = extractPublicationDate(extractField(block, "Data publikacji"), date);

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

const parseDailyBriefings = (): DailyTechBriefing[] =>
  Object.keys(dailyModules)
    .sort((left, right) => right.localeCompare(left))
    .map((path) => parseDailyBriefing(path));

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
  if (kind === "top3-crime") return "Kryminalne użycia AI";
  if (kind === "top3-business") return "Zarabianie z AI";
  return "Newsy ze świata AI";
};

const extractLead = (markdown: string) => {
  const lead = markdown.match(/## Lead\s+([\s\S]*?)(?=\n##\s+)/);
  const paragraph = lead?.[1].trim().split(/\r?\n\s*\r?\n/)[0] ?? "";

  return stripMarkdown(paragraph);
};

const parseTopThreeBriefings = (): TopThreeBriefing[] => {
  const runIds = Array.from(
    new Set(
      Object.keys(topThreeModules)
        .map((path) => path.replace(/\\/g, "/").match(/top-3\/([^/]+)\//)?.[1])
        .filter((runId): runId is string => Boolean(runId)),
    ),
  ).sort((left, right) => right.localeCompare(left));

  return runIds.map((runId) => {
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
  });
};

export const DAILY_TECH_BRIEFINGS = parseDailyBriefings();
export const DAILY_TECH_BRIEFING = DAILY_TECH_BRIEFINGS[0];
export const TOP_THREE_BRIEFINGS = parseTopThreeBriefings();
export const TOP_THREE_BRIEFING = TOP_THREE_BRIEFINGS[0] || { runId: "", date: "", status: "DRAFT", items: [] };

// Filter UNIFIED_NEWS_FEED to contain news only from the last 5 days (2026-07-13 to 2026-07-17)
// and exactly 1 news item per category (kind) for each of these days.
const allowedDates = new Set(["2026-07-17", "2026-07-16", "2026-07-15", "2026-07-14", "2026-07-13"]);

const allParsedItems: UnifiedNewsItem[] = [
  ...DAILY_TECH_BRIEFINGS.flatMap((briefing) => briefing.items),
  ...TOP_THREE_BRIEFINGS.flatMap((briefing) => briefing.items),
];

const sortedAllItems = [...allParsedItems].sort((left, right) => {
  const dateOrder = right.publishedAt.localeCompare(left.publishedAt);
  return dateOrder || right.id.localeCompare(left.id);
});

const filteredItems: UnifiedNewsItem[] = [];
const seenKeys = new Set<string>(); // "YYYY-MM-DD:kind"

for (const item of sortedAllItems) {
  if (allowedDates.has(item.publishedAt)) {
    const key = `${item.publishedAt}:${item.kind}`;
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      filteredItems.push(item);
    }
  }
}

export const UNIFIED_NEWS_FEED: UnifiedNewsItem[] = filteredItems.sort((left, right) => {
  const dateOrder = right.publishedAt.localeCompare(left.publishedAt);
  return dateOrder || right.id.localeCompare(left.id);
});

const dateAtMidnight = (value: string) => new Date(`${value}T00:00:00`);

export const getLiveFeedItems = (today?: Date): UnifiedNewsItem[] => {
  const refDate = today || (UNIFIED_NEWS_FEED.length > 0 ? dateAtMidnight(UNIFIED_NEWS_FEED[0].publishedAt) : new Date());
  const endOfToday = new Date(refDate.getFullYear(), refDate.getMonth(), refDate.getDate());
  const cutoff = new Date(endOfToday);
  cutoff.setDate(cutoff.getDate() - 3);

  const newestByKind = new Map<UnifiedNewsKind, UnifiedNewsItem>();

  UNIFIED_NEWS_FEED.forEach((item) => {
    const publishedAt = dateAtMidnight(item.publishedAt);
    if (publishedAt < cutoff || publishedAt > endOfToday || newestByKind.has(item.kind)) return;

    newestByKind.set(item.kind, item);
  });

  return [...newestByKind.values()].sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
};
