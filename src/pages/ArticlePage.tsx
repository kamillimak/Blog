import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, FileText, CheckCircle, Share2, ZoomIn, ZoomOut, ArrowRight, User } from "lucide-react";
import { ARTICLES } from "../data/articles";
import { ArticleContent } from "../components/article/ArticleContent";
import { TableOfContents } from "../components/article/TableOfContents";
import { ArticleIllustration } from "../components/article/ArticleIllustration";
import { ArticleCard } from "../components/article/ArticleCard";
import { formatPolishDate, getRelatedArticles, copyToClipboard } from "../utils/article";
import { ReadingProgress } from "../components/article/ReadingProgress";

export function ArticlePage() {
  const { slug, period, publication } = useParams<{
    slug?: string;
    period?: string;
    publication?: string;
  }>();
  const navigate = useNavigate();
  const routeSlug = period && publication ? `${period}/${publication}` : slug;

  // Find article
  const article = useMemo(() => {
    return ARTICLES.find((candidate) =>
      candidate.slug === routeSlug || candidate.legacySlug === routeSlug
    );
  }, [routeSlug]);

  // Handle scroll progress
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle text size adjusting (options: 'text-base', 'text-lg', 'text-xl')
  const [textSizeClass, setTextSizeClass] = useState<"text-base" | "text-lg" | "text-xl">("text-lg");

  // Handle share state
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [routeSlug]);

  useEffect(() => {
    if (article?.legacySlug === routeSlug) {
      navigate(`/articles/${article.slug}`, { replace: true });
    }
  }, [article, navigate, routeSlug]);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} — Warsztat AI Coding`;
    }
  }, [article]);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = (window.scrollY / docHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Recommended related article
  const recommendedArticle = useMemo(() => {
    if (!article) return null;
    const related = getRelatedArticles(ARTICLES, article, 1);
    return related[0] || null;
  }, [article]);

  // Handle share link copy
  const handleCopyLink = async () => {
    const currentUrl = window.location.href;
    const success = await copyToClipboard(currentUrl);
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-brand-text">
        <h2 className="text-2xl font-bold uppercase tracking-tight mb-4">Artykuł nie został znaleziony</h2>
        <p className="text-brand-muted mb-6 text-sm">Wpis o podanym adresie URL nie istnieje w naszym warsztacie.</p>
        <Link to="/articles" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-text text-brand-bg hover:bg-brand-sage hover:text-white rounded-none text-xs font-bold uppercase tracking-widest transition-colors">
          <ArrowLeft size={14} />
          Wróć do bazy artykułów
        </Link>
      </div>
    );
  }

  // Map tools to their unique accent colors
  const toolColors = {
    Codex: "text-[#4F46E5]",
    Trae: "text-[#059669]",
    Claude: "text-[#EA580C]",
    "AI Studio": "text-[#0284c7]"
  };

  const accentColor = toolColors[article.tool] || "text-brand-text";

  return (
    <div className="bg-brand-bg min-h-screen pb-24 relative font-sans text-brand-text">
      
      {/* Reading Progress Indicator */}
      <ReadingProgress 
        title={article.title} 
        category={article.category} 
        readTime={article.readTime} 
        scrollProgress={scrollProgress} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Navigation / Back Button */}
        <div className="mb-8">
          <Link 
            to="/articles" 
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-muted hover:text-brand-text transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Wróć do wszystkich artykułów</span>
          </Link>
        </div>

        {/* Article Meta Header */}
        <div className="max-w-4xl mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {article.status === "DRAFT" && (
              <span className="border border-amber-500 bg-amber-500/10 px-2 py-1 text-[10px] font-black tracking-widest text-amber-600 uppercase">
                DRAFT — niezatwierdzony
              </span>
            )}
            <span className={`text-[10px] font-extrabold uppercase tracking-widest ${accentColor}`}>
              {article.tool}
            </span>
            <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest border-b border-brand-border pb-0.5">
              {article.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-tight text-brand-text leading-tight mb-4 uppercase">
            {article.title}
          </h1>
          
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed mb-6 font-sans">
            {article.subtitle}
          </p>

          {/* Author Panel */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-brand-border pt-6">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-none bg-brand-text text-brand-bg font-mono text-xs font-extrabold flex items-center justify-center">
                {article.author.avatar}
              </div>
              <div>
                <span className="block text-xs font-extrabold text-brand-text uppercase tracking-wide leading-none">{article.author.name}</span>
                <span className="block text-[10px] text-brand-muted uppercase tracking-wide mt-1 leading-none">{article.author.role}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-[10px] text-brand-muted font-mono uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="opacity-80" />
                {formatPolishDate(article.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="opacity-80" />
                {article.readTime} min
              </span>
              <span className="flex items-center gap-1.5">
                <FileText size={13} className="opacity-80" />
                {article.wordCount.toLocaleString()} słów
              </span>
            </div>
          </div>
        </div>

        {/* Hero Image Section */}
        <div id="article-hero-media" className="mb-12">
          <ArticleIllustration imageKey={article.heroImage} className="max-h-[480px]" />
          <p className="text-[10px] text-brand-muted uppercase tracking-wider mt-3 font-sans max-w-4xl mx-auto leading-relaxed border-l-2 border-brand-border pl-3">
            {article.imageCaption}
          </p>
        </div>

        {/* Two-Column Responsive Layout for Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Reading Section (Width restricted to optimize readability ~720px) */}
          <main className="lg:col-span-8 max-w-[720px] mx-auto w-full">
            
            {/* Inline Table of Contents for Mobile Only */}
            <div className="block lg:hidden mb-10">
              <TableOfContents sections={article.sections} />
            </div>

            {/* Article Content Render */}
            <ArticleContent sections={article.sections} textSizeClass={textSizeClass} />

            {/* Pull Quote Highlight Box */}
            {article.pullQuote && (
              <div className="my-10 border-y border-brand-border py-8 text-center font-serif italic text-brand-text text-xl sm:text-2xl leading-relaxed max-w-2xl mx-auto px-4">
                "{article.pullQuote}"
              </div>
            )}

            {/* Key Takeaways Section */}
            <section id="key-takeaways" className="my-12 p-6 sm:p-8 rounded-none border border-brand-border bg-brand-card transition-colors">
              <h3 className="font-sans font-extrabold uppercase tracking-tight text-base text-brand-text mb-5 flex items-center gap-2">
                <CheckCircle size={18} className="opacity-80 text-brand-text" />
                Wnioski (Key Takeaways)
              </h3>
              <ul className="space-y-3.5">
                {article.keyTakeaways.map((takeaway, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-3">
                    <span className="text-brand-text font-bold font-mono text-xs mt-0.5">•</span>
                    <p className="text-brand-muted text-xs sm:text-sm leading-relaxed font-sans">{takeaway}</p>
                  </li>
                ))}
              </ul>
            </section>

          </main>

          {/* Sticky Sidebar Section on Desktop */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              
              {/* Table of Contents */}
              <TableOfContents sections={article.sections} />

              {/* Reader Settings Widget */}
              <div id="reader-settings-card" className="bg-brand-card border border-brand-border rounded-none p-5">
                <h4 className="text-[10px] font-extrabold text-brand-text uppercase tracking-widest mb-4 font-sans">Ustawienia czytnika</h4>
                
                {/* Font Size Adjust */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-brand-border">
                  <span className="text-[10px] text-brand-muted uppercase tracking-wider font-bold">Rozmiar tekstu</span>
                  <div className="flex items-center gap-1 bg-brand-featured-bg border border-brand-border rounded-none p-1">
                    <button
                      onClick={() => setTextSizeClass("text-base")}
                      disabled={textSizeClass === "text-base"}
                      className={`p-1.5 rounded-none transition-colors cursor-pointer text-[10px] font-mono tracking-wider ${
                        textSizeClass === "text-base" ? "bg-brand-text text-brand-bg font-extrabold" : "text-brand-muted hover:text-brand-text"
                      }`}
                      title="Zmniejsz tekst"
                    >
                      <ZoomOut size={13} />
                    </button>
                    <button
                      onClick={() => setTextSizeClass("text-lg")}
                      disabled={textSizeClass === "text-lg"}
                      className={`px-2 py-1 rounded-none transition-colors cursor-pointer text-[10px] font-mono tracking-wider font-extrabold ${
                        textSizeClass === "text-lg" ? "bg-brand-text text-brand-bg" : "text-brand-muted hover:text-brand-text"
                      }`}
                      title="Normalny tekst"
                    >
                      <span>NORM</span>
                    </button>
                    <button
                      onClick={() => setTextSizeClass("text-xl")}
                      disabled={textSizeClass === "text-xl"}
                      className={`p-1.5 rounded-none transition-colors cursor-pointer text-[10px] font-mono tracking-wider ${
                        textSizeClass === "text-xl" ? "bg-brand-text text-brand-bg font-extrabold" : "text-brand-muted hover:text-brand-text"
                      }`}
                      title="Powiększ tekst"
                    >
                      <ZoomIn size={13} />
                    </button>
                  </div>
                </div>

                {/* Share Link */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand-text hover:bg-brand-sage text-brand-bg hover:text-white rounded-none text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    <Share2 size={13} />
                    <span>{copiedLink ? "Skopiowano!" : "Kopiuj adres"}</span>
                  </button>
                </div>

              </div>

            </div>
          </aside>

        </div>

        {/* Dynamic Related Article Recommendation */}
        {recommendedArticle && (
          <div id="recommended-section" className="border-t border-brand-border mt-20 pt-12">
            <div className="max-w-4xl mb-8">
              <span className="text-[10px] font-bold tracking-[0.2em] text-brand-muted uppercase font-mono block mb-2">Następny krok</span>
              <h3 className="text-2xl font-sans font-extrabold tracking-tight uppercase text-brand-text">Kolejny polecany wpis</h3>
            </div>
            <div className="max-w-md">
              <ArticleCard article={recommendedArticle} featured={false} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
