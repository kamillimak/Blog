import React, { useEffect, useState } from "react";
import { List } from "lucide-react";
import { ArticleSection } from "../../types/article";

interface TableOfContentsProps {
  sections: ArticleSection[];
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  
  // Filter for heading sections
  const headings = sections.reduce<TocItem[]>((acc, section) => {
    if (section.type === "heading") {
      acc.push({
        id: section.id,
        text: section.text,
        level: section.level,
      });
    }
    return acc;
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -60% 0px", // Trigger when heading is in the upper part of viewport
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all heading elements on the page
    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => {
      headings.forEach((heading) => {
        const el = document.getElementById(heading.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div id="table-of-contents-widget" className="bg-brand-card border border-brand-border rounded-none p-5">
      <div className="flex items-center gap-2 mb-4 text-brand-text font-sans font-extrabold text-[10px] tracking-widest uppercase">
        <List size={13} className="opacity-80" />
        <span>Spis treści</span>
      </div>
      <nav aria-label="Spis treści artykułu">
        <ul className="space-y-2 font-sans text-[10px] uppercase tracking-wider font-bold">
          {headings.map((heading) => {
            const isActive = heading.id === activeId;
            return (
              <li 
                key={heading.id} 
                style={{ paddingLeft: `${(heading.level - 2) * 10}px` }}
                className="leading-snug"
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetEl = document.getElementById(heading.id);
                    if (targetEl) {
                      targetEl.scrollIntoView({ behavior: "smooth" });
                      setActiveId(heading.id);
                    }
                  }}
                  className={`block transition-[border-color,background-color,color,box-shadow,transform,opacity] duration-200 border-l-2 pl-3 py-1 ${
                    isActive
                      ? "text-brand-text font-extrabold border-brand-text bg-brand-featured-bg -ml-[2px]"
                      : "text-brand-muted hover:text-brand-text border-transparent hover:border-brand-border"
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
