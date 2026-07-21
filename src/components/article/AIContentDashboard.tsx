import React, { useState } from "react";
import { AlertTriangle, ArrowRight, Coins, ExternalLink, Share2, Sparkles } from "lucide-react";
import { TOP_THREE_BRIEFING, type UnifiedNewsItem, type UnifiedNewsKind } from "../../data/newsFeed";
import { ShareModal } from "./ShareModal";

interface DashboardCategory {
  id: UnifiedNewsKind;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  accentColor: string;
  badgeColor: string;
  items?: UnifiedNewsItem[];
}

const categoryStyles: DashboardCategory[] = [
  {
    id: "top3-news",
    title: "Top 3 Newsy ze swiata AI",
    description: "Najwazniejsze rewolucje i przelomy technologiczne.",
    icon: <Sparkles size={18} />,
    iconBg: "bg-brand-featured-bg border-brand-border text-brand-text",
    accentColor: "border-brand-text hover:shadow-brand-text/5",
    badgeColor: "text-brand-text border-brand-border bg-brand-featured-bg/30",
  },
  {
    id: "top3-crime",
    title: "Top 3 Kryminalne uzycia AI",
    description: "Nowe zagrozenia i wektory cyberatakow z uzyciem maszyn.",
    icon: <AlertTriangle size={18} />,
    iconBg: "bg-rose-950/20 border-rose-900/40 text-rose-500",
    accentColor: "hover:border-rose-500/50 hover:shadow-rose-500/5",
    badgeColor: "text-rose-400 border-rose-900/30 bg-rose-950/10",
  },
  {
    id: "top3-business",
    title: "Top 3 Pomysly na zarabianie z AI",
    description: "Praktyczne nisze rynkowe i pomysly na uslugi komercyjne.",
    icon: <Coins size={18} />,
    iconBg: "bg-emerald-950/20 border-emerald-900/40 text-emerald-500",
    accentColor: "hover:border-emerald-500/50 hover:shadow-emerald-500/5",
    badgeColor: "text-emerald-400 border-emerald-900/30 bg-emerald-950/10",
  },
];

export function AIContentDashboard() {
  const categories = categoryStyles.map((category) => ({
    ...category,
    items: TOP_THREE_BRIEFING.items.filter((item) => item.kind === category.id).slice(0, 3),
  }));

  return (
    <section id="ai-content-dashboard" className="mx-auto mt-16 max-w-7xl px-4 font-sans sm:px-6 lg:px-8">
      <div className="mb-10 border-b border-brand-border pb-5">
        <div className="mb-1 flex items-center gap-2">
          <Sparkles size={18} className="text-orange-500" />
          <h2 className="text-xl font-extrabold uppercase tracking-tight text-brand-text sm:text-2xl">
            Skaner Trendow: AI Content Dashboard
          </h2>
        </div>
        <p className="text-xs text-brand-muted">
          Gleboka analiza rynku z perspektywy praktyka IT: przelomy technologiczne, wektory zagrozen oraz realne mozliwosci komercjalizacji.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`group relative flex flex-col justify-between overflow-hidden border border-brand-border bg-brand-card p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:shadow-xl ${category.accentColor}`}
          >
            <div className="absolute left-0 top-0 h-full w-1.5 bg-transparent transition-colors duration-300 group-hover:bg-orange-500" />

            <div>
              <div className="mb-6 flex items-center gap-2.5">
                <div className={`shrink-0 border p-2 ${category.iconBg}`}>{category.icon}</div>
                <div>
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-text">
                    {category.title}
                  </h3>
                  <p className="mt-0.5 text-[10px] leading-tight text-brand-muted">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {category.items.map((item, itemIndex) => (
                  <DashboardItem key={item.id} item={item} itemIndex={itemIndex} category={category} />
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-brand-border/50 pt-4 font-mono text-[10px] uppercase tracking-widest text-brand-muted transition-colors group-hover:text-brand-text">
              <span>Zweryfikowano {TOP_THREE_BRIEFING.date}</span>
              <ArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

interface DashboardItemProps {
  key?: React.Key;
  item: UnifiedNewsItem;
  itemIndex: number;
  category: DashboardCategory;
}

function DashboardItem({ item, itemIndex, category }: DashboardItemProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const shareUrl = `${window.location.origin}${window.location.pathname}#news-feed-${item.id}`;

  return (
    <>
      <div
        id={category.id === "top3-news" ? `trend-news-${item.id}` : undefined}
        className="group/item border-b border-brand-border/60 pb-5 last:border-b-0 last:pb-0"
      >
        <div className="flex gap-4">
          <span className={`h-fit shrink-0 border px-1.5 py-0.5 font-mono text-xs font-black ${category.badgeColor}`}>
            {String(itemIndex + 1).padStart(2, "0")}
          </span>
          <div className="flex-grow">
            <h4 className="mb-1.5 text-xs font-extrabold uppercase leading-snug tracking-tight text-brand-text transition-colors group-hover/item:text-orange-500 sm:text-sm">
              {item.title}
            </h4>
            <p className="font-sans text-xs leading-relaxed text-brand-muted">{item.summary}</p>
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
              {item.sourceUrl ? (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-brand-text hover:text-orange-500"
                >
                  {item.sourceLabel}
                  <ExternalLink size={10} />
                </a>
              ) : (
                <span className="inline-flex text-[10px] font-bold uppercase tracking-wider text-brand-muted">
                  {item.sourceLabel}
                </span>
              )}
              <button
                type="button"
                onClick={() => setIsShareOpen(true)}
                className="inline-flex items-center gap-1 border border-brand-border/80 bg-brand-featured-bg px-2 py-1 text-[9px] font-black uppercase tracking-wider text-brand-text hover:border-brand-text hover:bg-brand-text hover:text-brand-bg transition-colors cursor-pointer"
                title="Udostępnij materiał w social media"
              >
                <Share2 size={10} className="text-orange-500" />
                <span>Udostępnij</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={item.title}
        summary={item.summary}
        url={shareUrl}
        categoryLabel={category.title}
      />
    </>
  );
}
