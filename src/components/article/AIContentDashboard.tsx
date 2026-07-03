import React from "react";
import { Sparkles, AlertTriangle, Coins, ArrowRight, ExternalLink } from "lucide-react";
import { AI_TREND_BRIEFING, AI_TREND_BRIEFING_DATE } from "../../data/aiTrendBriefing";

export function AIContentDashboard() {
  const categoryStyles = [
    {
      title: "Top 3 Newsy ze świata AI",
      description: "Najważniejsze rewolucje i przełomy technologiczne.",
      icon: <Sparkles size={18} />,
      iconBg: "bg-brand-featured-bg border-brand-border text-brand-text",
      accentColor: "border-brand-text hover:shadow-brand-text/5",
      badgeColor: "text-brand-text border-brand-border bg-brand-featured-bg/30",
    },
    {
      title: "Top 3 Kryminalne użycia AI",
      description: "Nowe zagrożenia i wektory cyberataków z użyciem maszyn.",
      icon: <AlertTriangle size={18} />,
      iconBg: "bg-rose-950/20 border-rose-900/40 text-rose-500",
      accentColor: "hover:border-rose-500/50 hover:shadow-rose-500/5",
      badgeColor: "text-rose-400 border-rose-900/30 bg-rose-950/10",
    },
    {
      title: "Top 3 Pomysły na zarabianie z AI",
      description: "Praktyczne nisze rynkowe i pomysły na usługi komercyjne.",
      icon: <Coins size={18} />,
      iconBg: "bg-emerald-950/20 border-emerald-900/40 text-emerald-500",
      accentColor: "hover:border-emerald-500/50 hover:shadow-emerald-500/5",
      badgeColor: "text-emerald-400 border-emerald-900/30 bg-emerald-950/10",
    },
  ];

  return (
    <section id="ai-content-dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 font-sans">
      
      {/* Title */}
      <div className="border-b border-brand-border pb-5 mb-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-orange-500 text-lg">📊</span>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight uppercase text-brand-text">
            Skaner Trendów: AI Content Dashboard
          </h2>
        </div>
        <p className="text-brand-muted text-xs">
          Głęboka analiza rynku z perspektywy praktyka IT: przełomy technologiczne, wektory zagrożeń oraz realne możliwości komercjalizacji.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {AI_TREND_BRIEFING.map((category, idx) => {
          const styles = categoryStyles[idx];
          const Icon = idx === 0 ? Sparkles : idx === 1 ? AlertTriangle : Coins;
          return (
          <div 
            key={idx} 
            className={`bg-brand-card border border-brand-border p-6 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl ${styles.accentColor} transition-all duration-300 relative group overflow-hidden`}
          >
            {/* Elegant Corner Accent Line */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-transparent group-hover:bg-orange-500 transition-colors duration-300" />

            <div>
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-6">
                <div className={`p-2 border ${styles.iconBg} shrink-0`}>
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm uppercase tracking-wider text-brand-text">
                    {category.title}
                  </h3>
                  <p className="text-[10px] text-brand-muted mt-0.5 leading-tight">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-6">
                {category.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx} 
                    className="group/item border-b border-brand-border/60 pb-5 last:border-b-0 last:pb-0"
                  >
                    <div className="flex gap-4">
                      <span className={`font-mono text-xs font-black px-1.5 py-0.5 border h-fit shrink-0 ${styles.badgeColor}`}>
                        {String(itemIdx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4 className="font-extrabold text-xs sm:text-sm text-brand-text tracking-tight uppercase mb-1.5 leading-snug group-hover/item:text-orange-500 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-brand-muted leading-relaxed font-sans">
                          {item.summary}
                        </p>
                        <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-brand-text hover:text-orange-500">
                          {item.sourceLabel}<ExternalLink size={10} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom micro footer for visual balance */}
            <div className="mt-8 pt-4 border-t border-brand-border/50 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-brand-muted group-hover:text-brand-text transition-colors">
              <span>Zweryfikowano {AI_TREND_BRIEFING_DATE}</span>
              <ArrowRight size={10} className="transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
          );
        })}
      </div>

    </section>
  );
}
