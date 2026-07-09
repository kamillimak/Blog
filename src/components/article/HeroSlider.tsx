import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Code2, Newspaper, Sparkles } from "lucide-react";
import { ARTICLES } from "../../data/articles";
import { AI_TREND_BRIEFING, AI_TREND_BRIEFING_DATE } from "../../data/aiTrendBriefing";
import { AI_NEWS_ITEMS, AI_NEWS_PUBLISHED_AT } from "./DailyBriefing";
import { formatPolishDate } from "../../utils/article";

type SlideKind = "Artykuł" | "Trend" | "TECH";

type HeroSlide = {
  id: string;
  kind: SlideKind;
  label: string;
  title: string;
  description: string;
  publishedAt: string;
  image: string;
  imageAlt: string;
  video?: {
    fhd: string;
    fourK: string;
  };
  articleSlug?: string;
  targetId?: string;
};

type NetworkInformation = {
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  downlink?: number;
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
};

const slideStyles: Record<SlideKind, {
  label: string;
  badge: string;
  border: string;
  gradient: string;
  hover: string;
  ring: string;
  icon: typeof Code2;
}> = {
  Artykuł: {
    label: "Artykuł",
    badge: "bg-indigo-500 text-white border-indigo-400",
    border: "border-indigo-500/70",
    gradient: "bg-[radial-gradient(circle_at_75%_20%,rgba(99,102,241,0.42),transparent_34%),linear-gradient(135deg,#111827_0%,#1e1b4b_52%,#020617_100%)]",
    hover: "hover:bg-indigo-600",
    ring: "bg-indigo-500",
    icon: Code2,
  },
  Trend: {
    label: "Trend",
    badge: "bg-emerald-500 text-white border-emerald-400",
    border: "border-emerald-500/70",
    gradient: "bg-[radial-gradient(circle_at_75%_20%,rgba(16,185,129,0.42),transparent_34%),linear-gradient(135deg,#052e2b_0%,#064e3b_48%,#020617_100%)]",
    hover: "hover:bg-emerald-600",
    ring: "bg-emerald-500",
    icon: Sparkles,
  },
  TECH: {
    label: "TECH",
    badge: "bg-orange-500 text-white border-orange-400",
    border: "border-orange-500/70",
    gradient: "bg-[radial-gradient(circle_at_75%_20%,rgba(249,115,22,0.42),transparent_34%),linear-gradient(135deg,#431407_0%,#7c2d12_48%,#020617_100%)]",
    hover: "hover:bg-orange-600",
    ring: "bg-orange-500",
    icon: Newspaper,
  },
};

const SLIDE_DURATION_MS = 7000;
const VIDEO_PREWARM_LEAD_MS = 1400;

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prewarmIndex, setPrewarmIndex] = useState<number | null>(null);
  const [heroVideoQuality, setHeroVideoQuality] = useState<"fhd" | "4k">("fhd");
  const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

  const slides = useMemo<HeroSlide[]>(() => {
    const article = ARTICLES.find((item) => item.featured) ?? ARTICLES[0];
    const trend = AI_TREND_BRIEFING[0].items[0];
    const tech = AI_NEWS_ITEMS[0];

    return [
      {
        id: `article-${article.id}`,
        kind: "Artykuł",
        label: "Artykuł",
        title: article.title,
        description: article.description,
        publishedAt: article.publishedAt,
        image: "news/hero/article-ai-review.jpeg",
        video: {
          fhd: "news/hero/codex-second-engineer-fhd.mp4",
          fourK: "news/hero/codex-second-engineer-4k.mp4",
        },
        imageAlt: "Programista pracujący z agentem AI podczas przeglądu kodu",
        articleSlug: article.slug,
      },
      {
        id: `trend-${trend.id}`,
        kind: "Trend",
        label: "Trend",
        title: trend.title,
        description: trend.summary,
        publishedAt: AI_TREND_BRIEFING_DATE,
        image: "news/hero/trend-ai-infrastructure.jpeg",
        video: {
          fhd: "news/hero/verify-sources-fhd.mp4",
          fourK: "news/hero/verify-sources-4k.mp4",
        },
        imageAlt: "Ilustracja infrastruktury AI i przepływu danych w centrum obliczeniowym",
        targetId: `trend-news-${trend.id}`,
      },
      {
        id: `tech-${tech.id}`,
        kind: "TECH",
        label: "TECH",
        title: tech.title,
        description: tech.content,
        publishedAt: AI_NEWS_PUBLISHED_AT,
        image: "news/hero/tech-ai-assistant.jpeg",
        video: {
          fhd: "news/hero/tech-fhd.mp4",
          fourK: "news/hero/tech-4k.mp4",
        },
        imageAlt: "Stanowisko pracy z asystentem AI wspierającym programowanie",
        targetId: `ai-news-${tech.id}`,
      },
    ];
  }, []);

  useEffect(() => {
    const nav = navigator as NavigatorWithConnection;
    const connection = nav.connection ?? nav.mozConnection ?? nav.webkitConnection;
    const hasLargeViewport = window.innerWidth * window.devicePixelRatio >= 1800;
    const fastConnection = !connection?.saveData && connection?.effectiveType === "4g" && (connection.downlink ?? 0) >= 8;
    const unknownButLargeScreen = !connection && hasLargeViewport;

    if ((fastConnection && hasLargeViewport) || unknownButLargeScreen) {
      setHeroVideoQuality("4k");
    }
  }, []);

  const activeSlide = slides[activeIndex];
  const prewarmSlide = prewarmIndex === null ? null : slides[prewarmIndex];
  const activeStyle = slideStyles[activeSlide.kind];
  const ActiveIcon = activeStyle.icon;
  const getVideoSrc = (slide: HeroSlide) => {
    if (!slide.video) return null;
    return assetUrl(heroVideoQuality === "4k" ? slide.video.fourK : slide.video.fhd);
  };
  const goToIndex = (index: number) => {
    setPrewarmIndex(index);
    setActiveIndex(index);
    window.setTimeout(() => setPrewarmIndex(null), 250);
  };
  const move = (direction: number) => goToIndex((activeIndex + direction + slides.length) % slides.length);
  const scrollToTarget = () => activeSlide.targetId && document.getElementById(activeSlide.targetId)?.scrollIntoView({ behavior: "smooth", block: "center" });

  useEffect(() => {
    const nextIndex = (activeIndex + 1) % slides.length;
    const prewarmTimer = window.setTimeout(() => setPrewarmIndex(nextIndex), SLIDE_DURATION_MS - VIDEO_PREWARM_LEAD_MS);
    const slideTimer = window.setTimeout(() => {
      setActiveIndex(nextIndex);
      window.setTimeout(() => setPrewarmIndex(null), 250);
    }, SLIDE_DURATION_MS);

    return () => {
      window.clearTimeout(prewarmTimer);
      window.clearTimeout(slideTimer);
    };
  }, [activeIndex, slides.length]);

  return (
    <div
      id="hero-slider"
      className={`relative min-h-[520px] overflow-hidden border text-white ${activeStyle.border} ${activeStyle.gradient}`}
      aria-roledescription="carousel"
      aria-label="Najważniejsze materiały"
    >
      <img
        src={assetUrl(activeSlide.image)}
        alt={activeSlide.imageAlt}
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
      />
      {activeSlide.video && (
        <HeroVideoBackground
          fhdSrc={assetUrl(activeSlide.video.fhd)}
          fourKSrc={assetUrl(activeSlide.video.fourK)}
          quality={heroVideoQuality}
          onUpgradeReady={() => setHeroVideoQuality("4k")}
        />
      )}
      {prewarmSlide?.video && prewarmSlide.id !== activeSlide.id && (
        <PrewarmVideo src={getVideoSrc(prewarmSlide)} />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/78 to-black/20" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 to-transparent" />

      <div className="relative z-10 flex min-h-[520px] flex-col justify-between p-5 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-4 border-b border-white/15 pb-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2" aria-label="Kategorie slidera">
            {slides.map((slide, index) => {
              const style = slideStyles[slide.kind];
              const Icon = style.icon;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-current={index === activeIndex}
                  className={`inline-flex items-center gap-2 border px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                    index === activeIndex ? style.badge : "border-white/20 bg-black/35 text-white/70 hover:border-white/45 hover:text-white"
                  }`}
                >
                  <Icon size={13} />
                  {style.label}
                </button>
              );
            })}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
            {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        <div className="grid gap-8 py-10 lg:grid-cols-12 lg:items-end">
          <div className="max-w-3xl lg:col-span-8">
            <span className={`inline-flex items-center gap-2 border px-3 py-1.5 text-[10px] font-black uppercase tracking-widest ${activeStyle.badge}`}>
              <ActiveIcon size={14} />
              {activeSlide.label}
            </span>
            <h2 className="mt-5 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {activeSlide.title}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-200 sm:text-base">
              {activeSlide.description}
            </p>
          </div>

          <div className="lg:col-span-4 lg:justify-self-end">
            <time dateTime={activeSlide.publishedAt} className="mb-5 flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-zinc-300">
              <Calendar size={13} /> {formatPolishDate(activeSlide.publishedAt)}
            </time>
            {activeSlide.articleSlug ? (
              <Link to={`/articles/${activeSlide.articleSlug}`} className={`inline-flex items-center gap-2 bg-white px-5 py-3 text-[10px] font-black uppercase tracking-widest text-black transition-colors ${activeStyle.hover}`}>
                Czytaj materiał <ArrowRight size={14} />
              </Link>
            ) : (
              <button type="button" onClick={scrollToTarget} className={`inline-flex items-center gap-2 bg-white px-5 py-3 text-[10px] font-black uppercase tracking-widest text-black transition-colors cursor-pointer ${activeStyle.hover}`}>
                Przejdź do sekcji <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/15 pt-4">
          <div className="flex gap-2" aria-label="Wybór slajdu">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Slajd ${index + 1}: ${slide.title}`}
                aria-current={index === activeIndex}
                className={`h-2.5 w-10 border border-white/25 transition-colors cursor-pointer ${index === activeIndex ? slideStyles[slide.kind].ring : "bg-white/20"}`}
              />
            ))}
          </div>
          <div className="flex gap-1">
            <button type="button" onClick={() => move(-1)} aria-label="Poprzedni slajd" className="border border-white/20 p-2 text-white hover:border-white cursor-pointer">
              <ChevronLeft size={16} />
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Następny slajd" className="border border-white/20 p-2 text-white hover:border-white cursor-pointer">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type HeroVideoBackgroundProps = {
  fhdSrc: string;
  fourKSrc: string;
  quality: "fhd" | "4k";
  onUpgradeReady: () => void;
};

function HeroVideoBackground({ fhdSrc, fourKSrc, quality, onUpgradeReady }: HeroVideoBackgroundProps) {
  const activeSrc = quality === "4k" ? fourKSrc : fhdSrc;

  return (
    <>
      <video
        key={activeSrc}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        src={activeSrc}
        poster=""
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      {quality === "fhd" && (
        <video
          className="hidden"
          src={fourKSrc}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onCanPlayThrough={onUpgradeReady}
        />
      )}
    </>
  );
}

function PrewarmVideo({ src }: { src: string | null }) {
  if (!src) return null;

  return (
    <video
      key={src}
      className="absolute inset-0 h-full w-full object-cover opacity-0 pointer-events-none"
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
