import { Article } from "../types/article";

export interface BlogStats {
  totalArticles: number;
  totalReadTime: number;
  totalWordCount: number;
  uniqueToolsCount: number;
}

/**
 * Calculates global stats for the blog
 */
export function getGlobalStats(articles: Article[]): BlogStats {
  const totalArticles = articles.length;
  const totalReadTime = articles.reduce((sum, a) => sum + a.readTime, 0);
  const totalWordCount = articles.reduce((sum, a) => sum + a.wordCount, 0);
  
  const tools = new Set(articles.map((a) => a.tool));
  const uniqueToolsCount = tools.size;

  return {
    totalArticles,
    totalReadTime,
    totalWordCount,
    uniqueToolsCount
  };
}

/**
 * Filters articles based on search query, selected tool, and selected category
 */
export function filterArticles(
  articles: Article[],
  query: string,
  selectedTool: string | null,
  selectedCategory: string | null
): Article[] {
  const normalizedQuery = query.toLowerCase().trim();

  return articles.filter((article) => {
    // 1. Tool Filter
    if (selectedTool && article.tool !== selectedTool) {
      return false;
    }

    // 2. Category Filter
    if (selectedCategory && article.category !== selectedCategory) {
      return false;
    }

    // 3. Search Query Filter
    if (normalizedQuery) {
      const matchTitle = article.title.toLowerCase().includes(normalizedQuery);
      const matchSubtitle = article.subtitle.toLowerCase().includes(normalizedQuery);
      const matchDesc = article.description.toLowerCase().includes(normalizedQuery);
      const matchTags = article.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));
      
      return matchTitle || matchSubtitle || matchDesc || matchTags;
    }

    return true;
  });
}

/**
 * Recommends related articles based on shared tool or category
 */
export function getRelatedArticles(
  articles: Article[],
  currentArticle: Article,
  limit: number = 2
): Article[] {
  return articles
    .filter((a) => a.id !== currentArticle.id)
    .map((a) => {
      let score = 0;
      if (a.tool === currentArticle.tool) score += 3;
      if (a.category === currentArticle.category) score += 2;
      const sharedTags = a.tags.filter((t) => currentArticle.tags.includes(t));
      score += sharedTags.length;
      return { article: a, score };
    })
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.article);
}

/**
 * Simple copy helper
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return false;
  }
}

/**
 * Formats an ISO date string into Polish format e.g. "28 czerwca 2026"
 */
export function formatPolishDate(dateStr: string): string {
  const months = [
    "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
    "lipca", "sierpnia", "września", "października", "listopada", "grudnia"
  ];
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

