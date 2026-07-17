import React, { useState } from "react";
import { Copy, Check, Terminal, Image as ImageIcon } from "lucide-react";
import { ArticleSection } from "../../types/article";
import { ArticleIllustration } from "./ArticleIllustration";

interface ArticleContentProps {
  sections: ArticleSection[];
  textSizeClass?: string; // e.g., "text-base", "text-lg", "text-xl" to support reader size adjustments
}

export function ArticleContent({ sections, textSizeClass = "text-lg" }: ArticleContentProps) {
  // Track copy states for code blocks by index
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({});

  const handleCopyCode = async (codeText: string, index: number) => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopiedStates((prev) => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [index]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div id="article-main-body" className="prose prose-slate max-w-none">
      {sections.map((section, idx) => {
        switch (section.type) {
          case "heading":
            if (section.level === 2) {
              return (
                <h2
                  key={idx}
                  id={section.id}
                  className="font-sans font-extrabold text-2xl sm:text-3xl text-brand-text mt-12 mb-5 tracking-tight border-b border-brand-border pb-2 scroll-mt-24 uppercase"
                >
                  {section.text}
                </h2>
              );
            } else {
              return (
                <h3
                  key={idx}
                  id={section.id}
                  className="font-sans font-bold text-lg sm:text-xl text-brand-text mt-8 mb-4 tracking-tight scroll-mt-24 uppercase"
                >
                  {section.text}
                </h3>
              );
            }

          case "paragraph":
            return (
              <p
                key={idx}
                className={`font-serif text-brand-text leading-relaxed mb-6 whitespace-pre-line ${textSizeClass}`}
              >
                {section.text}
              </p>
            );

          case "quote":
            return (
              <blockquote
                key={idx}
                className="border-l-4 border-brand-text pl-5 py-2 my-8 font-serif italic text-brand-muted bg-brand-featured-bg pr-4 rounded-none"
              >
                <p className={`${textSizeClass} leading-relaxed`}>{section.text}</p>
              </blockquote>
            );

          case "bulletList":
            return (
              <ul
                key={idx}
                className={`list-disc pl-6 mb-6 space-y-2.5 font-serif text-brand-text ${textSizeClass}`}
              >
                {section.items.map((item, sIdx) => (
                  <li key={sIdx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "numberedList":
            return (
              <ol
                key={idx}
                className={`list-decimal pl-6 mb-6 space-y-2.5 font-serif text-brand-text ${textSizeClass}`}
              >
                {section.items.map((item, sIdx) => (
                  <li key={sIdx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ol>
            );

          case "code":
            const isCopied = !!copiedStates[idx];
            return (
              <div
                key={idx}
                className="my-8 rounded-none overflow-hidden border border-brand-border bg-brand-featured-bg font-mono text-xs sm:text-sm"
              >
                {/* Code Window Header */}
                <div className="flex justify-between items-center px-4 py-2 bg-brand-card border-b border-brand-border text-brand-muted">
                  <div className="flex items-center gap-2">
                    <Terminal size={13} className="opacity-80" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{section.language}</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(section.code, idx)}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider hover:text-brand-text transition-colors"
                    aria-label="Skopiuj kod"
                  >
                    {isCopied ? (
                      <>
                        <Check size={11} className="text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Skopiowano!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={11} />
                        <span>Kopiuj</span>
                      </>
                    )}
                  </button>
                </div>
                {/* Code Pre Block */}
                <pre className="p-4 sm:p-5 overflow-x-auto text-brand-text leading-relaxed font-mono">
                  <code>{section.code}</code>
                </pre>
              </div>
            );

          case "imagePlaceholder":
            return (
              <aside
                key={idx}
                id={`image-placeholder-${section.fileName}`}
                className="my-8 border-2 border-dashed border-amber-500/60 bg-amber-500/5 p-5 sm:p-6"
                aria-label={`Placeholder grafiki ${section.fileName}`}
              >
                <div className="flex items-center gap-2 text-amber-600 mb-3">
                  <ImageIcon size={18} />
                  <strong className="text-xs uppercase tracking-widest">DRAFT — brakująca grafika</strong>
                </div>
                <p className="text-xs font-mono text-brand-text mb-2"><strong>Plik:</strong> {section.fileName}</p>
                <p className="text-xs font-mono text-brand-text mb-4 break-all"><strong>Ścieżka:</strong> {section.targetPath}</p>
                <p className="text-sm leading-relaxed text-brand-muted"><strong>Prompt:</strong> {section.prompt}</p>
              </aside>
            );

          case "image":
            return (
              <figure key={idx} id={`article-image-${idx}`} className="my-8 sm:my-10">
                <img
                  src={`${import.meta.env.BASE_URL}${section.src}`}
                  alt={section.alt}
                  width={1600}
                  height={900}
                  className="w-full aspect-video object-cover border border-brand-border bg-brand-surface"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="mt-3 border-l-2 border-amber-500 pl-3 text-xs leading-relaxed text-brand-muted">
                  {section.caption}
                </figcaption>
              </figure>
            );

          case "illustration":
            return (
              <figure key={idx} id={`article-illustration-${idx}`} className="my-8 sm:my-10">
                <ArticleIllustration imageKey={section.imageKey} />
                <figcaption className="mt-3 border-l-2 border-indigo-500 pl-3 text-xs leading-relaxed text-brand-muted">
                  {section.caption}
                </figcaption>
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
