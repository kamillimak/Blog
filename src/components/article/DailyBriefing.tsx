import { useEffect, useMemo, useState } from "react";
import type { MouseEvent } from "react";
import { AlertTriangle, BriefcaseBusiness, ExternalLink, Globe2, Newspaper, Radio, Share2, Sparkles } from "lucide-react";
import { getLiveFeedItems, UNIFIED_NEWS_FEED, type UnifiedNewsItem, type UnifiedNewsKind } from "../../data/newsFeed";
import { formatPolishDate } from "../../utils/article";
import { shouldReduceMotion } from "../../utils/motion";
import { ShareModal } from "./ShareModal";

type FeedFilter = "all" | UnifiedNewsKind;

const filters: { id: FeedFilter; label: string }[] = [
  { id: "all", label: "Wszystkie" }, { id: "tech-pl", label: "Tech PL" }, { id: "tech-world", label: "Tech World" },
  { id: "top3-news", label: "TOP 3 AI News" }, { id: "top3-crime", label: "TOP 3 Crime AI" }, { id: "top3-business", label: "TOP 3 AI Money" },
];

const kindStyles: Record<UnifiedNewsKind, { badge: string; border: string; divider: string; date: string; ticker: string; icon: typeof Newspaper }> = {
  "tech-pl": { badge: "border-emerald-300 bg-emerald-600 text-white shadow-lg shadow-black/30", border: "hover:border-emerald-500/60", divider: "border-emerald-500", date: "text-emerald-700", ticker: "border-emerald-500 bg-[linear-gradient(135deg,#052e2b_0%,#065f46_42%,#111827_100%)]", icon: Radio },
  "tech-world": { badge: "border-sky-300 bg-sky-600 text-white shadow-lg shadow-black/30", border: "hover:border-sky-500/60", divider: "border-sky-500", date: "text-sky-700", ticker: "border-sky-500 bg-[linear-gradient(135deg,#082f49_0%,#0369a1_42%,#111827_100%)]", icon: Globe2 },
  "top3-news": { badge: "border-violet-300 bg-violet-600 text-white shadow-lg shadow-black/30", border: "hover:border-violet-500/60", divider: "border-violet-500", date: "text-violet-700", ticker: "border-violet-500 bg-[linear-gradient(135deg,#2e1065_0%,#7c3aed_42%,#111827_100%)]", icon: Sparkles },
  "top3-crime": { badge: "border-rose-300 bg-rose-600 text-white shadow-lg shadow-black/30", border: "hover:border-rose-500/60", divider: "border-rose-500", date: "text-rose-700", ticker: "border-rose-500 bg-[linear-gradient(135deg,#4c0519_0%,#be123c_42%,#111827_100%)]", icon: AlertTriangle },
  "top3-business": { badge: "border-amber-300 bg-amber-500 text-black shadow-lg shadow-black/30", border: "hover:border-amber-500/60", divider: "border-amber-500", date: "text-amber-700", ticker: "border-amber-500 bg-[linear-gradient(135deg,#451a03_0%,#d97706_42%,#111827_100%)]", icon: BriefcaseBusiness },
};

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const isValidSourceUrl = (url: string) => /^https?:\/\//i.test(url);

export function DailyBriefing() {
  const [activeFilter, setActiveFilter] = useState<FeedFilter>("all");
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => setReducedMotion(shouldReduceMotion()), []);

  const filteredNews = useMemo(() => activeFilter === "all" ? UNIFIED_NEWS_FEED : UNIFIED_NEWS_FEED.filter((item) => item.kind === activeFilter), [activeFilter]);
  const liveFeedItems = useMemo(() => getLiveFeedItems(), []);

  useEffect(() => {
    if (reducedMotion) return;
    let scrollTimer: number | undefined;
    const pauseVideo = (video: HTMLVideoElement) => { video.pause(); video.currentTime = 0; };
    const playFocusedVideo = () => {
      const cards = Array.from(document.querySelectorAll<HTMLElement>("#daily-briefing-section [id^='news-feed-']"));
      const viewportCenter = window.innerHeight / 2;
      const focusedCard = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        return { card, visible: rect.bottom > 96 && rect.top < window.innerHeight - 96, distance: Math.abs(rect.top + rect.height / 2 - viewportCenter) };
      }).filter((item) => item.visible).sort((left, right) => left.distance - right.distance)[0]?.card;
      cards.forEach((card) => { const video = card.querySelector("video"); if (!video) return; if (card === focusedCard) void video.play(); else pauseVideo(video); });
    };
    const handleScroll = () => { if (scrollTimer) window.clearTimeout(scrollTimer); scrollTimer = window.setTimeout(playFocusedVideo, 180); };
    window.addEventListener("scroll", handleScroll, { passive: true }); playFocusedVideo();
    return () => { if (scrollTimer) window.clearTimeout(scrollTimer); window.removeEventListener("scroll", handleScroll); };
  }, [filteredNews, reducedMotion]);

  return <section id="daily-briefing-section" className="mt-14 border-y border-brand-border bg-brand-card py-12 font-sans">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {liveFeedItems.length > 0 && <LiveFeed items={liveFeedItems} />}
      <div className="max-w-3xl">
        <span className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-600">Tech + TOP 3</span>
        <h2 className="mt-3 text-3xl font-extrabold uppercase leading-none tracking-tight text-brand-text sm:text-4xl">Newsroom</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-muted">Codzienny briefing z Polski i świata oraz najnowszy pakiet TOP 3 są połączone w jeden skanowalny feed. Każdy materiał ma wyraźną etykietę, źródło oraz lokalne tło wideo uruchamiane dopiero po najechaniu.</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-2 border-y border-brand-border py-4" aria-label="Filtry newsroomu">
        {filters.map((filter) => <button key={filter.id} type="button" onClick={() => setActiveFilter(filter.id)} className={`border px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${activeFilter === filter.id ? "border-brand-text bg-brand-text text-brand-bg" : "border-brand-border bg-brand-featured-bg text-brand-muted hover:border-brand-text hover:text-brand-text"}`}>{filter.label}</button>)}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6">{filteredNews.map((item, index) => <div key={item.id}><NewsCard item={item} featured={index === 0} index={index} /></div>)}</div>
    </div>
  </section>;
}

function LiveFeed({ items }: { items: UnifiedNewsItem[] }) {
  return <div className="mb-8 border border-orange-500 bg-[linear-gradient(135deg,#1c1917_0%,#111827_100%)] p-3 text-white">
    <div className="mb-2 flex items-center gap-2"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-orange-600" /></span><span className="inline-flex items-center gap-1.5 bg-orange-600 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest"><Newspaper size={12} />Live feed</span></div>
    <div className="divide-y divide-white/10">
      {items.map((item) => {
        const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          const targetEl = document.getElementById(`news-feed-${item.id}`);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
        };
        return (
          <a key={item.id} href={`#news-feed-${item.id}`} onClick={handleAnchorClick} className="flex min-w-0 items-center gap-2 py-2 text-sm font-black uppercase leading-snug tracking-tight text-white transition-colors hover:text-orange-200 sm:flex-nowrap sm:py-1.5 sm:text-base">
            <span className={`shrink-0 border px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider ${kindStyles[item.kind].badge}`}>{item.label}</span>
            <span className="min-w-0 line-clamp-2 sm:truncate">{item.title}</span>
            <time dateTime={item.publishedAt} className="ml-auto shrink-0 font-mono text-[10px] font-bold uppercase tracking-wider text-white/70">{formatPolishDate(item.publishedAt)}</time>
          </a>
        );
      })}
    </div>
  </div>;
}

function NewsCard({ item, featured, index }: { item: UnifiedNewsItem; featured: boolean; index: number }) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const styles = kindStyles[item.kind];
  const Icon = styles.icon;
  const sourceUrl = isValidSourceUrl(item.sourceUrl) ? item.sourceUrl : "";
  const shareUrl = `${window.location.origin}${window.location.pathname}#news-feed-${item.id}`;

  const handleVideoEnter = (event: MouseEvent<HTMLElement>) => { if (shouldReduceMotion()) return; const video = event.currentTarget.querySelector("video"); if (video) void video.play(); };
  const handleVideoLeave = (event: MouseEvent<HTMLElement>) => { const video = event.currentTarget.querySelector("video"); if (video) { video.pause(); video.currentTime = 0; } };

  return (
    <>
      <article id={`news-feed-${item.id}`} onMouseEnter={handleVideoEnter} onMouseLeave={handleVideoLeave} className={`group grid overflow-hidden border border-brand-border bg-brand-bg transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-xl lg:grid-cols-12 ${styles.border}`}>
        <div className={`${featured ? "lg:col-span-5" : "lg:col-span-4"} relative min-h-64 overflow-hidden bg-brand-text`}>
          <video src={assetUrl(item.video)} className="absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-105" muted loop playsInline preload="metadata" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
          <span className={`absolute left-4 top-4 inline-flex items-center gap-1.5 border px-3 py-1.5 text-[10px] font-black uppercase tracking-widest ${styles.badge}`}>
            <Icon size={12} />{item.label}
          </span>
          <span className="absolute bottom-4 left-4 border border-white/25 bg-black/35 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white/85 backdrop-blur">
            News {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className={`${featured ? "lg:col-span-7" : "lg:col-span-8"} flex flex-col justify-between p-5 sm:p-7`}>
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-wider">
              <time dateTime={item.publishedAt} className={`font-black ${styles.date}`}>{formatPolishDate(item.publishedAt)}</time>
              <span className="text-brand-muted">{item.groupLabel}</span>
            </div>
            <h3 className="text-xl font-extrabold uppercase leading-tight tracking-tight text-brand-text transition-colors group-hover:text-orange-600 sm:text-2xl">{item.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-brand-muted sm:text-base">{item.summary}</p>
          </div>
          <div className={`mt-6 flex flex-wrap items-center justify-between gap-3 border-t-2 pt-4 ${styles.divider}`}>
            {sourceUrl ? (
              <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex max-w-[70%] items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-text transition-colors hover:text-orange-600">
                <span className="min-w-0 break-words">Źródło: {item.sourceLabel || "materiał źródłowy"}</span>
                <ExternalLink className="h-4 w-4 shrink-0 sm:h-3 sm:w-3" />
              </a>
            ) : (
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-muted">
                Źródło: {item.sourceLabel || "dostęp ograniczony"}
              </span>
            )}
            <button
              type="button"
              onClick={() => setIsShareOpen(true)}
              className="inline-flex items-center gap-1.5 border border-brand-border bg-brand-featured-bg px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-brand-text transition-colors hover:border-brand-text hover:bg-brand-text hover:text-brand-bg cursor-pointer"
              title="Udostępnij ten news w social media"
            >
              <Share2 size={12} className="text-orange-500" />
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
