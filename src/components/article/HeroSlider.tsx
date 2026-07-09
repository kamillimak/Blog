import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  BriefcaseBusiness,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Code2,
  Globe2,
  Radio,
  Sparkles,
} from "lucide-react";
import { ARTICLES } from "../../data/articles";
import { NEWSROOM_VIDEOS, UNIFIED_NEWS_FEED, type UnifiedNewsItem, type UnifiedNewsKind } from "../../data/newsFeed";
import { formatPolishDate } from "../../utils/article";

type SlideTone = "article" | UnifiedNewsKind;

type HeroSlide = {
  id: string;
  tone: SlideTone;
  label: string;
  title: string;
  description: string;
  publishedAt: string;
  video: string;
  articleSlug?: string;
  targetId?: string;
};

const slideStyles: Record<SlideTone, { badge: string; border: string; ring: string; hover: string; icon: typeof Code2 }> = {
  article: {
    badge: "border-indigo-400 bg-indigo-500 text-white",
    border: "border-indigo-500/70",
    ring: "bg-indigo-500",
    hover: "hover:bg-indigo-600",
    icon: Code2,
  },
  "tech-pl": {
    badge: "border-emerald-400 bg-emerald-500 text-white",
    border: "border-emerald-500/70",
    ring: "bg-emerald-500",
    hover: "hover:bg-emerald-600",
    icon: Radio,
  },
  "tech-world": {
    badge: "border-sky-400 bg-sky-500 text-white",
    border: "border-sky-500/70",
    ring: "bg-sky-500",
    hover: "hover:bg-sky-600",
    icon: Globe2,
  },
  "top3-news": {
    badge: "border-violet-400 bg-violet-500 text-white",
    border: "border-violet-500/70",
    ring: "bg-violet-500",
    hover: "hover:bg-violet-600",
    icon: Sparkles,
  },
  "top3-crime": {
    badge: "border-rose-400 bg-rose-500 text-white",
    border: "border-rose-500/70",
    ring: "bg-rose-500",
    hover: "hover:bg-rose-600",
    icon: AlertTriangle,
  },
  "top3-business": {
    badge: "border-amber-400 bg-amber-500 text-black",
    border: "border-amber-500/70",
    ring: "bg-amber-500",
    hover: "hover:bg-amber-600",
    icon: BriefcaseBusiness,
  },
};

const slideDurationMs = 7000;
const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = useMemo<HeroSlide[]>(() => {
    const article = ARTICLES.find((item) => item.featured) ?? ARTICLES[0];
    const pick = (kind: UnifiedNewsKind) => UNIFIED_NEWS_FEED.find((item) => item.kind === kind);
    const toSlide = (item: UnifiedNewsItem, index: number): HeroSlide => ({
      id: item.id,
      tone: item.kind,
      label: item.label,
      title: item.title,
      description: item.summary,
      publishedAt: item.publishedAt,
      video: NEWSROOM_VIDEOS[(index + 1) % NEWSROOM_VIDEOS.length],
      targetId: `news-feed-${item.id}`,
    });

    return [
      {
        id: `article-${article.id}`,
        tone: "article",
        label: "Artykul",
        title: article.title,
        description: article.description,
        publishedAt: article.publishedAt,
        video: NEWSROOM_VIDEOS[0],
        articleSlug: article.slug,
      },
      ...(["tech-pl", "tech-world", "top3-news", "top3-crime", "top3-business"] as UnifiedNewsKind[])
        .map(pick)
        .filter((item): item is UnifiedNewsItem => Boolean(item))
        .map(toSlide),
    ].slice(0, 6);
  }, []);

  useEffect(() => {
    const slideTimer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, slideDurationMs);

    return () => window.clearTimeout(slideTimer);
  }, [activeIndex, slides.length]);

  const activeSlide = slides[activeIndex];
  const activeStyle = slideStyles[activeSlide.tone];
  const ActiveIcon = activeStyle.icon;
  const move = (direction: number) => setActiveIndex((current) => (current + direction + slides.length) % slides.length);
  const scrollToTarget = () => activeSlide.targetId && document.getElementById(activeSlide.targetId)?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div
      id="hero-slider"
      className={`relative min-h-[460px] w-full max-w-full overflow-hidden border bg-black text-white sm:min-h-[520px] ${activeStyle.border}`}
      aria-roledescription="carousel"
      aria-label="Najwazniejsze materialy"
    >
      <video
        key={activeSlide.video}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        src={assetUrl(activeSlide.video)}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/38 to-black/5" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/78 via-black/25 to-transparent" />

      <div className="relative z-10 flex min-h-[460px] flex-col justify-between p-4 sm:min-h-[520px] sm:p-8 lg:p-10">
        <div className="flex items-center justify-end border-b border-white/15 pb-4 md:justify-between md:pb-5">
          <div className="hidden flex-wrap items-center gap-2 md:flex" aria-label="Kategorie slidera">
            {slides.map((slide, index) => {
              const style = slideStyles[slide.tone];
              const Icon = style.icon;

              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-current={index === activeIndex}
                  className={`inline-flex items-center gap-2 border px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                    index === activeIndex ? style.badge : "border-white/20 bg-black/35 text-white/70 hover:border-white/45 hover:text-white"
                  }`}
                >
                  <Icon size={13} />
                  {slide.label}
                </button>
              );
            })}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
            {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        <div className="grid gap-6 py-7 sm:py-10 lg:grid-cols-12 lg:items-end">
          <div className="max-w-3xl lg:col-span-8">
            <span className={`inline-flex items-center gap-2 border px-2.5 py-1.5 text-[9px] font-black uppercase tracking-widest sm:px-3 sm:text-[10px] ${activeStyle.badge}`}>
              <ActiveIcon size={13} />
              {activeSlide.label}
            </span>
            <h2 className="mt-4 max-w-full text-2xl font-extrabold uppercase leading-[1] tracking-tight text-white sm:mt-5 sm:text-5xl lg:text-6xl">
              {activeSlide.title}
            </h2>
            <p className="mt-4 max-w-2xl text-xs leading-relaxed text-zinc-200 sm:mt-5 sm:text-base">
              {activeSlide.description}
            </p>
          </div>

          <div className="lg:col-span-4 lg:justify-self-end">
            <time dateTime={activeSlide.publishedAt} className="mb-5 flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-zinc-300">
              <Calendar size={13} /> {formatPolishDate(activeSlide.publishedAt)}
            </time>
            {activeSlide.articleSlug ? (
              <Link to={`/articles/${activeSlide.articleSlug}`} className={`inline-flex items-center gap-2 bg-white px-5 py-3 text-[10px] font-black uppercase tracking-widest text-black transition-colors ${activeStyle.hover}`}>
                Czytaj material <ArrowRight size={14} />
              </Link>
            ) : (
              <button type="button" onClick={scrollToTarget} className={`inline-flex items-center gap-2 bg-white px-5 py-3 text-[10px] font-black uppercase tracking-widest text-black transition-colors ${activeStyle.hover}`}>
                Przejdz do sekcji <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-white/15 pt-4">
          <div className="flex min-w-0 flex-1 flex-wrap gap-1.5 sm:gap-2" aria-label="Wybor slajdu">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Slajd ${index + 1}: ${slide.title}`}
                aria-current={index === activeIndex}
                className={`h-2.5 w-6 border border-white/25 transition-colors sm:w-10 ${index === activeIndex ? slideStyles[slide.tone].ring : "bg-white/20"}`}
              />
            ))}
          </div>
          <div className="flex shrink-0 gap-1">
            <button type="button" onClick={() => move(-1)} aria-label="Poprzedni slajd" className="border border-white/20 p-2 text-white hover:border-white">
              <ChevronLeft size={16} />
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Nastepny slajd" className="border border-white/20 p-2 text-white hover:border-white">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
