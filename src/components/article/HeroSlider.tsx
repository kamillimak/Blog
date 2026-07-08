import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
import { ARTICLES } from "../../data/articles";
import { AI_TREND_BRIEFING, AI_TREND_BRIEFING_DATE } from "../../data/aiTrendBriefing";
import { AI_NEWS_ITEMS, AI_NEWS_PUBLISHED_AT } from "./DailyBriefing";
import { formatPolishDate } from "../../utils/article";

type HeroSlide = {
  id: string;
  kind: "Artykuł" | "News" | "AI News";
  title: string;
  description: string;
  publishedAt: string;
  articleSlug?: string;
  targetId?: string;
};

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = useMemo<HeroSlide[]>(() => {
    const articles = ARTICLES.filter((article) => article.status !== "DRAFT").slice(0, 2).map((article) => ({
      id: `article-${article.id}`,
      kind: "Artykuł" as const,
      title: article.title,
      description: article.description,
      publishedAt: article.publishedAt,
      articleSlug: article.slug,
    }));
    const trendNews = AI_TREND_BRIEFING[0].items.slice(0, 2).map((item) => ({
      id: `trend-${item.id}`,
      kind: "News" as const,
      title: item.title,
      description: item.summary,
      publishedAt: AI_TREND_BRIEFING_DATE,
      targetId: `trend-news-${item.id}`,
    }));
    const aiNews = AI_NEWS_ITEMS.slice(0, 2).map((item) => ({
      id: `ai-news-slide-${item.id}`,
      kind: "AI News" as const,
      title: item.title,
      description: item.content,
      publishedAt: AI_NEWS_PUBLISHED_AT,
      targetId: `ai-news-${item.id}`,
    }));
    return [...articles, ...trendNews, ...aiNews];
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % slides.length), 7000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[activeIndex];
  const move = (direction: number) => setActiveIndex((activeIndex + direction + slides.length) % slides.length);
  const scrollToTarget = () => activeSlide.targetId && document.getElementById(activeSlide.targetId)?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div id="hero-slider" className="border border-brand-border bg-brand-featured-bg min-h-[430px] flex flex-col" aria-roledescription="carousel" aria-label="Najważniejsze materiały">
      <div className="flex items-center justify-between border-b border-brand-border px-5 py-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Na pierwszym planie</span>
        <span className="font-mono text-[10px] text-brand-muted">{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
      </div>
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-8" aria-live="polite">
        <div>
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-600">
            <Newspaper size={14} /> {activeSlide.kind}
          </span>
          <h2 className="mt-5 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-brand-text">{activeSlide.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-muted line-clamp-4">{activeSlide.description}</p>
        </div>
        <div className="mt-8">
          <time dateTime={activeSlide.publishedAt} className="mb-5 flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-brand-muted">
            <Calendar size={13} /> {formatPolishDate(activeSlide.publishedAt)}
          </time>
          {activeSlide.articleSlug ? (
            <Link to={`/articles/${activeSlide.articleSlug}`} className="inline-flex items-center gap-2 bg-brand-text px-5 py-3 text-[10px] font-black uppercase tracking-widest text-brand-bg hover:bg-orange-600 transition-colors">
              Czytaj materiał <ArrowRight size={14} />
            </Link>
          ) : (
            <button type="button" onClick={scrollToTarget} className="inline-flex items-center gap-2 bg-brand-text px-5 py-3 text-[10px] font-black uppercase tracking-widest text-brand-bg hover:bg-orange-600 transition-colors cursor-pointer">
              Przejdź do newsa <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-brand-border px-4 py-3">
        <div className="flex gap-2" aria-label="Wybór slajdu">
          {slides.map((slide, index) => <button key={slide.id} type="button" onClick={() => setActiveIndex(index)} aria-label={`Slajd ${index + 1}: ${slide.title}`} aria-current={index === activeIndex} className={`h-2 w-2 border border-brand-text transition-colors cursor-pointer ${index === activeIndex ? "bg-brand-text" : "bg-transparent"}`} />)}
        </div>
        <div className="flex gap-1">
          <button type="button" onClick={() => move(-1)} aria-label="Poprzedni slajd" className="p-2 border border-brand-border hover:border-brand-text cursor-pointer"><ChevronLeft size={16} /></button>
          <button type="button" onClick={() => move(1)} aria-label="Następny slajd" className="p-2 border border-brand-border hover:border-brand-text cursor-pointer"><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}
