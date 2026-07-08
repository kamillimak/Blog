import React, { useState, useEffect } from "react";
import { Tv, TrendingUp, ChevronLeft, ChevronRight, Pause, Play, ExternalLink, Calendar } from "lucide-react";

export interface NewsItem {
  id: string;
  category: "Polska" | "Świat";
  title: string;
  content: string;
  source: string;
  sourceUrl: string;
  image?: string;
}

export const AI_NEWS_PUBLISHED_AT = "2026-07-08";

export const AI_NEWS_ITEMS: NewsItem[] = [
  {
    id: "1",
    category: "Polska",
    title: "Służby ruszają ze szkoleniami z AI, dezinformacji i cyberhigieny",
    content: "Ministerstwo Cyfryzacji uruchomiło program zaawansowanych kompetencji cyfrowych dla Policji, PSP i Straży Granicznej. W 2026 r. ma zostać przeszkolonych co najmniej 1750 osób, a zakres obejmuje AI, cyberbezpieczeństwo, rozpoznawanie manipulacji i przeciwdziałanie dezinformacji.",
    source: "Ministerstwo Cyfryzacji",
    sourceUrl: "https://www.gov.pl/web/cyfryzacja/wzmacniamy-kompetencje-cyfrowe-sluzb-odpowiedzialnych-za-bezpieczenstwo"
  },
  {
    id: "2",
    category: "Polska",
    title: "Ministerstwo Cyfryzacji zapowiada spotkanie o Gigafabryce AI",
    content: "Resort zaprosił na otwarte spotkanie online poświęcone projektowi polskiej Gigafabryki AI. Wydarzenie zaplanowano na 9 lipca 2026 r.; ma w nim uczestniczyć wiceminister cyfryzacji Dariusz Standerski, co sygnalizuje kolejny etap rozmów o krajowej infrastrukturze obliczeniowej dla AI.",
    source: "Ministerstwo Cyfryzacji",
    sourceUrl: "https://www.gov.pl/web/cyfryzacja/gigafabryka-ai---zapraszamy-na-spotkanie"
  },
  {
    id: "3",
    category: "Świat",
    title: "Kimi K2.7 trafia do GitHub Copilot Business i Enterprise",
    content: "GitHub rozszerzył dostępność modelu Kimi K2.7 Code na plany Copilot Business i Copilot Enterprise. To pierwszy otwartowagowy model dostępny w selektorze modeli Copilota, ale w organizacjach pozostaje domyślnie wyłączony i wymaga decyzji administratora.",
    source: "GitHub Changelog",
    sourceUrl: "https://github.blog/changelog/2026-07-07-kimi-k2-7-now-available-for-copilot-business-and-enterprise/"
  },
  {
    id: "4",
    category: "Świat",
    title: "Rząd Alberty pokazuje skalę użycia Claude Code w cyberbezpieczeństwie",
    content: "Anthropic opisał wdrożenie, w którym zespół technologiczny Alberty użył Claude Code do przeglądu 466 mln linii kodu w 20 godzin. Przypadek pokazuje praktyczny kierunek agentów AI w administracji: audyt dużych repozytoriów, generowanie poprawek, testów i planów modernizacji.",
    source: "Anthropic",
    sourceUrl: "https://www.anthropic.com/news/alberta-government-claude-cybersecurity"
  },
  {
    id: "5",
    category: "Świat",
    title: "GitHub Copilot w VS Code dostaje ogólnodostępne narzędzia przeglądarki",
    content: "Narzędzia przeglądarkowe Copilota w VS Code są już ogólnie dostępne. Agenci mogą otwierać strony, klikać, wpisywać dane, czytać treść, robić zrzuty ekranu i sprawdzać błędy konsoli, przy zachowaniu izolacji kart i kontroli użytkownika nad prywatnymi sesjami.",
    source: "GitHub Changelog",
    sourceUrl: "https://github.blog/changelog/2026-07-01-browser-tools-for-github-copilot-in-vs-code-are-generally-available/"
  }
];

export function DailyBriefing() {
  const [activeTab, setActiveTab] = useState<"all" | "pl" | "world">("all");
  const [isPlaying, setIsPlaying] = useState(true);
  const [tickerIndex, setTickerIndex] = useState(0);

  const newsList: NewsItem[] = AI_NEWS_ITEMS;

  // Ticker automatic rotation effect
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % newsList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, newsList.length]);

  const filteredNews = newsList.filter((news) => {
    if (activeTab === "pl") return news.category === "Polska";
    if (activeTab === "world") return news.category === "Świat";
    return true;
  });

  const nextTicker = () => {
    setTickerIndex((prev) => (prev + 1) % newsList.length);
  };

  const prevTicker = () => {
    setTickerIndex((prev) => (prev - 1 + newsList.length) % newsList.length);
  };

  return (
    <section id="daily-briefing-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 font-sans">
      
      {/* 1. TV Ticker Style Bar (with orange accent) */}
      <div className="bg-[#1A1A1A] border border-brand-border border-l-4 border-l-orange-500 text-white p-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-6 select-none relative overflow-hidden">
        
        {/* Glowing Orange Breaking Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
          </span>
          <span className="bg-orange-600 text-[10px] font-extrabold px-2.5 py-1 uppercase tracking-widest text-white flex items-center gap-1.5">
            <Tv size={11} />
            PILNE NEWSY
          </span>
        </div>

        {/* Ticker Text Area */}
        <div className="flex-1 overflow-hidden min-w-0 flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 font-extrabold shrink-0 border border-orange-500/20 px-1.5 py-0.5 bg-orange-950/20">
            {newsList[tickerIndex].category === "Polska" ? "PL" : "ŚWIAT"}
          </span>
          <a 
            href={newsList[tickerIndex].sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-zinc-200 hover:text-orange-400 font-bold truncate transition-colors flex items-center gap-1 group"
          >
            <span className="truncate">{newsList[tickerIndex].title}</span>
            <ExternalLink size={11} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        {/* Ticker Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0 border-t md:border-t-0 border-[#2D2D2D] pt-2 md:pt-0 justify-end">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Wstrzymaj autorotację" : "Wznów autorotację"}
            className="p-1.5 hover:bg-[#2D2D2D] text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          </button>
          <button 
            onClick={prevTicker} 
            className="p-1.5 hover:bg-[#2D2D2D] text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="text-[10px] font-mono text-zinc-500 px-1">
            {tickerIndex + 1}/{newsList.length}
          </span>
          <button 
            onClick={nextTicker} 
            className="p-1.5 hover:bg-[#2D2D2D] text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* 2. Main AI News Container */}
      <div className="bg-brand-card border border-brand-border p-6 sm:p-8">
        
        {/* Header Grid */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-brand-border pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-orange-500 text-lg">D</span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight uppercase text-brand-text">
                AI News
              </h2>
            </div>
            <p className="text-brand-muted text-xs">
              Codzienny, skondensowany przegląd kluczowych wydarzeń technologicznych i legislacyjnych z Polski oraz świata.
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-brand-muted">
              <Calendar size={12} /> Opublikowano: 8 lipca 2026
            </span>
          </div>

          {/* Tab Filter Controls */}
          <div className="flex items-center gap-1 border border-brand-border p-1 bg-brand-featured-bg self-start md:self-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "all" 
                  ? "bg-brand-text text-brand-bg font-black" 
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              Wszystko
            </button>
            <button
              onClick={() => setActiveTab("pl")}
              className={`px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === "pl" 
                  ? "bg-brand-text text-brand-bg font-black" 
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              <span>Polska</span>
            </button>
            <button
              onClick={() => setActiveTab("world")}
              className={`px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === "world" 
                  ? "bg-brand-text text-brand-bg font-black" 
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              <span>Świat</span>
            </button>
          </div>
        </div>

        {/* Content Layout Grid (Two-Column) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Column A (Left, 8 cols): Filtered News List */}
          <div className="lg:col-span-8 space-y-8">
            {filteredNews.map((news) => (
              <div 
                key={news.id} 
                id={`ai-news-${news.id}`}
                className="group border border-brand-border p-5 hover:border-orange-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 bg-brand-bg/50"
              >
                <div className="flex flex-col sm:flex-row gap-5">
                  {/* News Image */}
                  {news.image && (
                    <div className="sm:w-36 sm:h-24 shrink-0 overflow-hidden border border-brand-border bg-brand-featured-bg">
                      <img 
                        src={news.image} 
                        alt={news.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter grayscale contrast-125"
                      />
                    </div>
                  )}

                  {/* News Text */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 border ${
                          news.category === "Polska" 
                            ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" 
                            : "text-sky-500 border-sky-500/20 bg-sky-500/5"
                        }`}>
                          {news.category}
                        </span>
                        <span className="text-[10px] font-mono text-brand-muted">
                          Źródło: <strong>{news.source}</strong>
                        </span>
                        <time dateTime={AI_NEWS_PUBLISHED_AT} className="text-[10px] font-mono text-brand-muted">
                          08.07.2026
                        </time>
                      </div>
                      
                      <h3 className="font-extrabold text-brand-text text-sm sm:text-base tracking-tight leading-snug mb-2 group-hover:text-orange-500 transition-colors">
                        {news.title}
                      </h3>
                      
                      <p className="text-xs text-brand-muted leading-relaxed font-sans line-clamp-3">
                        {news.content}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-brand-border/60 flex justify-between items-center">
                      <a 
                        href={news.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-extrabold tracking-widest text-brand-text uppercase hover:text-orange-500 transition-colors cursor-pointer"
                      >
                        <span>Czytaj źródło</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column B (Right, 4 cols): Daily Highlight Trend (Orange visual emphasis) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border border-orange-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 bg-orange-950/5 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2 text-orange-500 font-extrabold text-[10px] tracking-widest uppercase mb-4">
                <TrendingUp size={14} />
                <span>NAJWAŻNIEJSZY TREND DNIA</span>
              </div>

              <h3 className="font-extrabold text-brand-text text-lg tracking-tight uppercase leading-tight mb-4">
                Agenci AI przechodzą do infrastruktury operacyjnej
              </h3>

              <div className="border-l-2 border-orange-500 pl-4 my-4">
                <p className="text-xs text-brand-muted leading-relaxed italic font-serif">
                  "Dzisiejsze wiadomości pokazują przesunięcie z demonstracji modeli do zarządzanych wdrożeń: administracja szkoli ludzi, firmy rozszerzają kontrolę nad modelami, a narzędzia programistyczne dostają realne środowiska wykonawcze."
                </p>
              </div>

              <p className="text-xs text-brand-muted leading-relaxed font-sans mt-4">
                Dla zespołów IT oznacza to większy nacisk na polityki dostępu, audyt działań agentów, bezpieczeństwo przeglądarek i praktyczne kompetencje użytkowników, którzy mają zatwierdzać wyniki pracy AI.
              </p>

              <div className="mt-6 pt-4 border-t border-brand-border/60 text-[9px] font-mono text-brand-muted uppercase tracking-wider">
                Analiza z: <span className="text-brand-text font-bold">8 lipca 2026</span>
              </div>
            </div>

            {/* Quick Micro Stats / Ticker Extra Info */}
            <div className="border border-brand-border hover:border-brand-text hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-text/5 transition-all duration-300 p-5 bg-brand-featured-bg">
              <h4 className="text-[9px] font-extrabold tracking-widest uppercase text-brand-muted mb-3">
                METRYKI DNIA
              </h4>
              <div className="space-y-3.5 text-xs font-mono">
                <div className="flex justify-between border-b border-brand-border pb-1.5">
                  <span className="text-brand-muted">Podział geograficzny:</span>
                  <span className="font-bold text-brand-text text-right">PL 2 / Świat 3</span>
                </div>
                <div className="flex justify-between border-b border-brand-border pb-1.5">
                  <span className="text-brand-muted">Źródła pierwotne:</span>
                  <span className="font-bold text-brand-text text-right">5/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Status publikacji:</span>
                  <span className="font-bold text-orange-500 text-right">DRAFT</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
