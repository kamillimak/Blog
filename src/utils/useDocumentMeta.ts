import { useEffect } from "react";

export interface DocumentMetaProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
}

const DEFAULT_TITLE = "Blog technologiczny — Codex · Trae · Claude · AI Studio";
const DEFAULT_DESCRIPTION = "Blog technologiczny Kamila Mikołajczyka o Codex, Trae, Claude, AI Studio, automatyzacjach, AI newsach i praktycznym workflow twórcy AI-native.";
const DEFAULT_CANONICAL = "https://kamillimak.github.io/Blog/";
const DEFAULT_OG_IMAGE = "https://kamillimak.github.io/Blog/images/kamil-mikolajczyk.png";

export function useDocumentMeta(meta: DocumentMetaProps = {}) {
  useEffect(() => {
    const title = meta.title || DEFAULT_TITLE;
    const description = meta.description || DEFAULT_DESCRIPTION;
    const canonical = meta.canonical || DEFAULT_CANONICAL;
    const ogImage = meta.ogImage || DEFAULT_OG_IMAGE;
    const ogType = meta.ogType || "website";

    document.title = title;

    const setMeta = (selector: string, attr: string, val: string) => {
      const el = document.head.querySelector(selector);
      if (el) el.setAttribute(attr, val);
    };

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:image"]', "content", ogImage);
    setMeta('meta[property="og:type"]', "content", ogType);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", ogImage);
    setMeta('link[rel="canonical"]', "href", canonical);
  }, [meta.title, meta.description, meta.canonical, meta.ogImage, meta.ogType]);
}
