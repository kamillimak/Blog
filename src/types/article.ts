export type ArticleSection =
  | {
      type: "heading";
      level: 2 | 3;
      text: string;
      id: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "quote";
      text: string;
    }
  | {
      type: "bulletList";
      items: string[];
    }
  | {
      type: "numberedList";
      items: string[];
    }
  | {
      type: "code";
      language: string;
      code: string;
    }
  | {
      type: "imagePlaceholder";
      fileName: string;
      targetPath: string;
      prompt: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
      caption: string;
    }
  | {
      type: "illustration";
      imageKey: string;
      caption: string;
    };

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tool: "Codex" | "Trae" | "Claude" | "AI Studio";
  author: Author;
  publishedAt: string;
  readTime: number; // in minutes
  wordCount: number;
  heroImage: string; // Tailwind bg-gradient or abstract pattern description, or SVG key
  imageAlt: string;
  imageCaption: string;
  accentColor: string; // hex or Tailwind color class prefix e.g. "indigo", "emerald", "amber", "sky"
  featured: boolean;
  tags: string[];
  pullQuote: string;
  sections: ArticleSection[];
  keyTakeaways: string[];
  shareText?: string;
  hashtags?: string[];
  status?: "DRAFT" | "APPROVED";
  sourcePath?: string;
  legacySlug?: string;
}
