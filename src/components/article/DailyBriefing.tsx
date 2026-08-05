import React, { useEffect, useMemo, useState } from "react";
import type { MouseEvent } from "react";
import { 
  AlertTriangle, BriefcaseBusiness, ExternalLink, Globe2, 
  Newspaper, Radio, Share2, Sparkles, Calendar, ArrowRight, ShieldCheck 
} from "lucide-react";
import { DAILY_TECH_BRIEFINGS, getLiveFeedItems, type UnifiedNewsItem, type UnifiedNewsKind } from "../../data/newsFeed";
import { formatPolishDate } from "../../utils/article";
import { shouldReduceMotion } from "../../utils/motion";
import { ShareModal } from "./ShareModal";

type GeoFilter = "all" | "pl" | "world";

const filters: { id: GeoFilter; label: string }[] = [
  { id: "all", label: "Wszystkie wiadomości" },
  { id: "pl", label: "Polska" },
  { id: "world", label: "Świat" },
];

const kindStyles: Record<UnifiedNewsKind, { badge: string; text: string; icon: typeof Newspaper }> = {
  "tech-pl": { badge: "border-emerald-300 bg-emerald-600/10 text-emerald-800 dark:text-emerald-300", text: "text-emerald-700 dark:text-emerald-400", icon: Radio },
  "tech-world": { badge: "border-sky-300 bg-sky-600/10 text-sky-800 dark:text-sky-300", text: "text-sky-700 dark:text-sky-400", icon: Globe2 },
  "top3-news": { badge: "border-violet-300 bg-violet-600/10 text-violet-800 dark:text-violet-300", text: "text-violet-700 dark:text-violet-400", icon: Sparkles },
  "top3-crime": { badge: "border-rose-300 bg-rose-600/10 text-rose-800 dark:text-rose-300", text: "text-rose-700 dark:text-rose-400", icon: AlertTriangle },
  "top3-business": { badge: "border-amber-300 bg-amber-500/10 text-amber-800 dark:text-amber-300", text: "text-amber-700 dark:text-amber-400", icon: BriefcaseBusiness },
};

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const isValidSourceUrl = (url: string) => /^https?:\/\//i.test(url);

export function DailyBriefing() {
  const [activeFilter, setActiveFilter] = useState<GeoFilter>("all");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(shouldReduceMotion());
  }, []);

  // Filter and group news by day
  const filteredBriefings = useMemo(() => {
    return DAILY_TECH_BRIEFINGS.map((briefing) => {
      const items = briefing.items.filter((item) => {
        if (activeFilter === "pl") return item.kind === "tech-pl";
        if (activeFilter === "world") return item.kind === "tech-world";
        return true;
      });
      return { ...briefing, items };
    }).filter((briefing) => briefing.items.length > 0);
  }, [activeFilter]);

  const liveFeedItems = useMemo(() => getLiveFeedItems(), []);

  // Play focused video on scroll (for mobile / viewport center)
  useEffect(() => {
    if (reducedMotion) return;
    let scrollTimer: number | undefined;

    const pauseVideo = (video: HTMLVideoElement) => {
      if (!video.paused) {
        video.pause();
      }
    };

    const playFocusedVideo = () => {
      const cards = Array.from(document.querySelectorAll<HTMLElement>("#daily-briefing-section [id^='news-feed-']"));
      const viewportCenter = window.innerHeight / 2;

      const focusedCard = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        return {
          card,
          visible: rect.bottom > 96 && rect.top < window.innerHeight - 96,
          distance: Math.abs(rect.top + rect.height / 2 - viewportCenter)
        };
      }).filter((item) => item.visible).sort((left, right) => left.distance - right.distance)[0]?.card;

      cards.forEach((card) => {
        const video = card.querySelector("video");
        if (!video) return;
        if (card === focusedCard) {
          void video.play();
        } else {
          pauseVideo(video);
        }
      });
    };

    const handleScroll = () => {
      if (scrollTimer) window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(playFocusedVideo, 180);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    playFocusedVideo();

    return () => {
      if (scrollTimer) window.clearTimeout(scrollTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [filteredBriefings, reducedMotion]);

  return (
    <section id="daily-briefing-section" className="relative mt-16 border-y border-brand-border bg-brand-bg py-16 font-sans">
      
      {/* Background timeline axis design block (Left side decorative timeline stripe) */}
      <div className="absolute top-0 bottom-0 left-[21.8%] w-px bg-brand-border/30 pointer-events-none hidden lg:block animate-[pulse_3s_infinite]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {liveFeedItems.length > 0 && <LiveFeed items={liveFeedItems} />}

        <div className="max-w-3xl mb-12">
          <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-brand-sage uppercase block mb-2">
            ./newsroom
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-text uppercase leading-none tracking-tight">
            Kronika Wydarzeń AI
          </h2>
          <p className="mt-4 text-xs leading-relaxed text-brand-muted max-w-2xl">
            Codzienny monitoring trendów z podziałem na Polskę oraz rynki globalne. Dane prezentowane są na chronologicznej osi czasu z dedykowanymi metrykami podziału i statusami zatwierdzenia treści.
          </p>
        </div>

        {/* Filters Toolbar */}
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-y border-brand-border py-4" aria-label="Filtry newsroomu">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer rounded-none ${
                  activeFilter === filter.id
                    ? "border-brand-text bg-brand-text text-brand-bg font-extrabold"
                    : "border-brand-border bg-brand-card text-brand-muted hover:border-brand-text hover:text-brand-text"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="text-[10px] font-mono text-brand-muted uppercase">
            Dni w bazie: <span className="font-bold text-brand-text">{filteredBriefings.length}</span>
          </div>
        </div>

        {/* Daily Timeline Feed */}
        {filteredBriefings.length > 0 ? (
          <div className="space-y-16 relative">
            {filteredBriefings.map((briefing) => (
              <div 
                key={briefing.date} 
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-brand-border/60 pb-12 last:border-b-0 last:pb-0 relative"
              >
                {/* Left Column: Timeline Day Meta */}
                <div className="lg:col-span-3 lg:sticky lg:top-24 h-fit space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-brand-sage shrink-0" />
                    <time dateTime={briefing.date} className="text-xl sm:text-2xl font-serif font-bold text-brand-text">
                      {formatPolishDate(briefing.date)}
                    </time>
                  </div>

                  <div className="flex flex-wrap gap-2 items-center">
                    {/* Status badge */}
                    {briefing.status === "DRAFT" ? (
                      <span className="inline-flex items-center gap-1 border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        Szkic (DRAFT)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        <ShieldCheck size={10} className="text-emerald-500" />
                        Zatwierdzony (APPROVED)
                      </span>
                    )}

                    {/* Geo counter */}
                    <span className="inline-flex items-center border border-brand-border bg-brand-featured-bg px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider text-brand-muted">
                      PL {briefing.polishCount} / ŚW {briefing.worldCount}
                    </span>
                  </div>

                  <p className="text-xs text-brand-muted max-w-sm leading-relaxed">
                    Briefing podsumowujący kluczowe wydarzenia z tego dnia. Zawiera starannie wyselekcjonowane i zweryfikowane doniesienia prasowe oraz analizy rynkowe.
                  </p>

                  {briefing.draftSlug && (
                    <div className="pt-2">
                      <a
                        href={`#/articles/${briefing.draftSlug}`}
                        className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-brand-sage hover:text-brand-text transition-colors group"
                      >
                        <span>~/czytaj-podsumowanie-dnia</span>
                        <ArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Right Column: List of News from the Day */}
                <div className="lg:col-span-9 space-y-6">
                  {briefing.items.map((item, index) => (
                    <NewsItemRow 
                      key={item.id} 
                      item={item} 
                      index={index} 
                      totalItems={briefing.items.length} 
                    />
                  ))}
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty Filter State */
          <div className="bg-brand-card border border-brand-border p-16 text-center">
            <Newspaper size={32} className="mx-auto text-brand-muted mb-4" />
            <h3 className="font-serif font-bold text-brand-text text-lg uppercase tracking-tight mb-2">Brak wiadomości</h3>
            <p className="text-brand-muted text-xs max-w-sm mx-auto mb-6">
              Brak doniesień w wybranej kategorii zasięgu geograficznego dla zarejestrowanych dni.
            </p>
            <button
              onClick={() => setActiveFilter("all")}
              className="px-6 py-3 border border-brand-text bg-brand-text text-brand-bg hover:bg-brand-sage hover:text-white hover:border-brand-sage text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Pokaż wszystkie wiadomości
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

function LiveFeed({ items }: { items: UnifiedNewsItem[] }) {
  return (
    <div className="mb-10 border border-brand-border bg-brand-featured-bg p-4 rounded-none">
      <div className="mb-3 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-sage opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-sage" />
        </span>
        <span className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest text-brand-text">
          <Newspaper size={11} className="text-brand-sage" /> Live feed (Ostatnie)
        </span>
      </div>
      <div className="divide-y divide-brand-border/50">
        {items.map((item) => {
          const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            const targetEl = document.getElementById(`news-feed-${item.id}`);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          };
          return (
            <a 
              key={item.id} 
              href={`#news-feed-${item.id}`} 
              onClick={handleAnchorClick} 
              className="flex min-w-0 flex-col sm:flex-row sm:items-center gap-2 py-2.5 text-xs tracking-tight text-brand-text transition-colors hover:text-brand-sage font-medium"
            >
              <span className={`w-fit border px-1.5 py-0.2 text-[8px] font-mono uppercase tracking-wider ${kindStyles[item.kind].badge}`}>
                {item.label}
              </span>
              <span className="min-w-0 whitespace-normal">{item.title}</span>
              <time dateTime={item.publishedAt} className="sm:ml-auto shrink-0 font-mono text-[9px] text-brand-muted uppercase">
                {formatPolishDate(item.publishedAt)}
              </time>
            </a>
          );
        })}
      </div>
    </div>
  );
}

interface NewsItemRowProps {
  key?: React.Key;
  item: UnifiedNewsItem;
  index: number;
  totalItems: number;
}

function NewsItemRow({ item, index, totalItems }: NewsItemRowProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const styles = kindStyles[item.kind];
  const Icon = styles.icon;
  const sourceUrl = isValidSourceUrl(item.sourceUrl) ? item.sourceUrl : "";
  const shareUrl = `${window.location.origin}${window.location.pathname}#news-feed-${item.id}`;

  const handleVideoEnter = (event: MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion()) return;
    const video = event.currentTarget.querySelector("video");
    if (video) void video.play();
  };

  const handleVideoLeave = (event: MouseEvent<HTMLElement>) => {
    const video = event.currentTarget.querySelector("video");
    if (video && !video.paused) {
      video.pause();
    }
  };

  return (
    <>
      <article 
        id={`news-feed-${item.id}`} 
        onMouseEnter={handleVideoEnter} 
        onMouseLeave={handleVideoLeave}
        className="group grid grid-cols-1 md:grid-cols-12 gap-6 bg-brand-card border border-brand-border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand-sage"
      >
        {/* Left column: Video thumbnail */}
        <div className="md:col-span-3 relative h-36 md:h-full min-h-28 bg-brand-text overflow-hidden border border-brand-border/40 select-none">
          <video 
            src={assetUrl(item.video)} 
            className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105" 
            muted 
            loop 
            playsInline 
            preload="metadata" 
            aria-hidden="true" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          
          <span className={`absolute left-2 top-2 inline-flex items-center gap-1.5 border px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider ${styles.badge}`}>
            <Icon size={9} />
            {item.label}
          </span>
          
          <span className="absolute bottom-2 left-2 font-mono text-[8px] text-white/85 uppercase tracking-widest">
            {String(index + 1).padStart(2, "0")} / {String(totalItems).padStart(2, "0")}
          </span>
        </div>

        {/* Right column: Content details */}
        <div className="md:col-span-9 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-[9px] font-mono uppercase tracking-wider text-brand-muted block mb-1">
              {item.groupLabel}
            </span>
            <h3 className="text-sm sm:text-base font-serif font-bold text-brand-text transition-colors group-hover:text-brand-sage leading-tight">
              {item.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-brand-muted">
              {item.summary}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-brand-border/50 pt-3">
            {sourceUrl ? (
              <a 
                href={sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex max-w-[70%] items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-brand-text hover:text-brand-sage transition-colors"
              >
                <span className="truncate">Źródło: {item.sourceLabel || "Więcej"}</span>
                <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
            ) : (
              <span className="text-[9px] font-mono uppercase tracking-wider text-brand-muted">
                Źródło: {item.sourceLabel || "Zablokowane"}
              </span>
            )}
            
            <button
              type="button"
              onClick={() => setIsShareOpen(true)}
              className="inline-flex items-center gap-1 border border-brand-border bg-brand-featured-bg px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-brand-text transition-colors hover:border-brand-text hover:bg-brand-text hover:text-brand-bg cursor-pointer"
            >
              <Share2 size={10} className="text-brand-sage" />
              <span>Udostępnij</span>
            </button>
          </div>
        </div>
      </article>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={item.title}
        summary={item.summary}
        url={shareUrl}
        categoryLabel={item.label}
      />
    </>
  );
}
