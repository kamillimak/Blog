import React from "react";
import { Sparkles, AlertTriangle, Coins, ArrowRight } from "lucide-react";

export function AIContentDashboard() {
  const categories = [
    {
      title: "Top 3 Newsy ze świata AI",
      description: "Najważniejsze rewolucje i przełomy technologiczne.",
      icon: <Sparkles size={18} />,
      iconBg: "bg-brand-featured-bg border-brand-border text-brand-text",
      accentColor: "border-brand-text hover:shadow-brand-text/5",
      badgeColor: "text-brand-text border-brand-border bg-brand-featured-bg/30",
      items: [
        {
          num: "01",
          title: "Narodziny agentów „Multimodal Reasoners” (AGI-Lite)",
          content: "Nowe modele analizują wideo w czasie rzeczywistym, generują kod i rozwiązują wieloetapowe zadania inżynierskie bez udziału człowieka z 92% skutecznością (np. Claude 3.8 i GPT-5-preview).",
        },
        {
          num: "02",
          title: "Chip-Sovereignty: Europa buduje własne klastry GPU",
          content: "UE uruchomiła pierwszy kontenerowy superkomputer oparty w całości na europejskiej architekturze RISC-V zintegrowanej z akceleratorami AI, zmniejszając zależność od USA.",
        },
        {
          num: "03",
          title: "Neuro-Symbiosis w przeglądarce",
          content: "Lokalne, ultra-małe modele LLM (4B-8B) są natywnie wbudowywane w silniki przeglądarek Chrome i Safari, co umożliwia bezpłatną, asynchroniczną analizę prywatnych danych bez chmury.",
        },
      ],
    },
    {
      title: "Top 3 Kryminalne użycia AI",
      description: "Nowe zagrożenia i wektory cyberataków z użyciem maszyn.",
      icon: <AlertTriangle size={18} />,
      iconBg: "bg-rose-950/20 border-rose-900/40 text-rose-500",
      accentColor: "hover:border-rose-500/50 hover:shadow-rose-500/5",
      badgeColor: "text-rose-400 border-rose-900/30 bg-rose-950/10",
      items: [
        {
          num: "01",
          title: "Ataki „Dynamic Deepfake Hijacking” w bankowości",
          content: "Przestępcy zaczęli wykorzystywać syntezę głosu i wideo w czasie rzeczywistym podczas rozmów weryfikacyjnych KYC (Know Your Customer), omijając dwuetapowe zabezpieczenia biometryczne.",
        },
        {
          num: "02",
          title: "Autonomiczne boty phishingowe z profilowaniem",
          content: "Boty AI skanują publiczne profile społecznościowe pracowników, analizują ich styl pisania i generują hiper-spersonalizowane wiadomości e-mail idealnie naśladujące przełożonych.",
        },
        {
          num: "03",
          title: "Ransomware pisany w locie przez „Shadow Agents”",
          content: "Szkodliwe oprogramowanie mutujące swój kod i metody szyfrowania w czasie rzeczywistym za pomocą mikromodeli LLM osadzonych w skrypcie, aby skutecznie omijać systemy antywirusowe (EDR/XDR).",
        },
      ],
    },
    {
      title: "Top 3 Pomysły na zarabianie z AI",
      description: "Praktyczne nisze rynkowe i pomysły na usługi komercyjne.",
      icon: <Coins size={18} />,
      iconBg: "bg-emerald-950/20 border-emerald-900/40 text-emerald-500",
      accentColor: "hover:border-emerald-500/50 hover:shadow-emerald-500/5",
      badgeColor: "text-emerald-400 border-emerald-900/30 bg-emerald-950/10",
      items: [
        {
          num: "01",
          title: "Mikro-SaaS do walidacji danych syntetycznych",
          content: "Tworzenie niszowych generatorów bezpiecznych, wysokiej jakości syntetycznych danych (medycznych, finansowych) dla firm trenujących własne, małe modele specjalistyczne.",
        },
        {
          num: "02",
          title: "„AI Compliance & Security Audit” dla korporacji",
          content: "Pomoc firmom w dostosowaniu ich systemów AI do unijnego AI Act oraz testowanie wdrożonych modeli pod kątem wycieków danych (Prompt Injection i Data Poisoning).",
        },
        {
          num: "03",
          title: "Autonomiczne pipeline'y lokalizacyjne wideo",
          content: "Kompleksowe tłumaczenie, dubbingowanie i dopasowywanie ruchu warg (Lipsync) na rynki zagraniczne przy minimalnych kosztach, z automatycznym dopasowaniem humoru i slangu.",
        },
      ],
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
        {categories.map((category, idx) => (
          <div 
            key={idx} 
            className={`bg-brand-card border border-brand-border p-6 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl ${category.accentColor} transition-all duration-300 relative group overflow-hidden`}
          >
            {/* Elegant Corner Accent Line */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-transparent group-hover:bg-orange-500 transition-colors duration-300" />

            <div>
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-6">
                <div className={`p-2 border ${category.iconBg} shrink-0`}>
                  {category.icon}
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
                      <span className={`font-mono text-xs font-black px-1.5 py-0.5 border h-fit shrink-0 ${category.badgeColor}`}>
                        {item.num}
                      </span>
                      <div>
                        <h4 className="font-extrabold text-xs sm:text-sm text-brand-text tracking-tight uppercase mb-1.5 leading-snug group-hover/item:text-orange-500 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-brand-muted leading-relaxed font-sans">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom micro footer for visual balance */}
            <div className="mt-8 pt-4 border-t border-brand-border/50 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-brand-muted group-hover:text-brand-text transition-colors">
              <span>Skaner trendów v1.2</span>
              <ArrowRight size={10} className="transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
