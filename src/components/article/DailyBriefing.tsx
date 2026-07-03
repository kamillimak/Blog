import React, { useState, useEffect } from "react";
import { Tv, Globe, MapPin, TrendingUp, ChevronLeft, ChevronRight, Pause, Play, ExternalLink } from "lucide-react";

interface NewsItem {
  id: string;
  category: "Polska" | "Świat";
  title: string;
  content: string;
  source: string;
  sourceUrl: string;
  image?: string;
}

export function DailyBriefing() {
  const [activeTab, setActiveTab] = useState<"all" | "pl" | "world">("all");
  const [isPlaying, setIsPlaying] = useState(true);
  const [tickerIndex, setTickerIndex] = useState(0);

  const newsList: NewsItem[] = [
    {
      id: "1",
      category: "Polska",
      title: "AI może zwiększyć PKB Polski nawet o 12,1% do 2035 r.",
      content: "Bank Światowy szacuje, że sztuczna inteligencja może podnieść realny PKB Polski o 1,3–12,1% do 2035 roku. Skala efektu zależy od inwestycji firm, kompetencji pracowników i otoczenia regulacyjnego; dziś AI wykorzystuje tylko 8% polskich przedsiębiorstw.",
      source: "Bank Światowy",
      sourceUrl: "https://www.worldbank.org/en/news/press-release/2026/06/22/ai-could-boost-poland-s-economy-by-up-to-12-by-2035-new-world-bank-group-report-finds"
    },
    {
      id: "2",
      category: "Polska",
      title: "BGK inwestuje w ElevenLabs; powstanie AI Lab Poland",
      content: "Vinci, spółka z Grupy BGK, zainwestowała w ElevenLabs. W ramach współpracy firma ma utworzyć AI Lab Poland — krajowy ośrodek badań i rozwoju technologii głosowych oraz systemów sztucznej inteligencji.",
      source: "Bank Gospodarstwa Krajowego",
      sourceUrl: "https://media.bgk.pl/en/press-release/vinci-part-of-the-bgk-group-invests-in-elevenlabs-ai-lab-poland-will-be-established-1/"
    },
    {
      id: "3",
      category: "Polska",
      title: "12 tysięcy pracowni AI trafi do polskich szkół",
      content: "Ministerstwo Cyfryzacji przeznacza blisko 1,9 mld zł z KPO na 8 tys. pracowni AI w szkołach podstawowych i 4 tys. w ponadpodstawowych. Oferty wykonawców otwarto 12 maja, a sprzęt ma dotrzeć przed rokiem szkolnym 2026/2027.",
      source: "Ministerstwo Cyfryzacji",
      sourceUrl: "https://www.gov.pl/web/cyfryzacja/otwarcie-ofert-wykonawcow-na-dostawe-12-tysiecy-pracowni-sztucznej-inteligencji-dla-szkol"
    },
    {
      id: "4",
      category: "Świat",
      title: "Anthropic udostępnia Claude Sonnet 5",
      content: "Claude Sonnet 5 jest dostępny we wszystkich planach, w Claude Code i przez API. Anthropic pozycjonuje model jako wydajniejszą warstwę wykonawczą do agentów, programowania i długich zadań narzędziowych, z ceną promocyjną do końca sierpnia.",
      source: "Anthropic",
      sourceUrl: "https://www.anthropic.com/news/claude-sonnet-5"
    },
    {
      id: "5",
      category: "Świat",
      title: "OpenAI proponuje 5% udziałów dla rządu USA",
      content: "Według Reutersa OpenAI zaproponowało przekazanie administracji USA 5% udziałów w ramach modelu publicznego udziału w korzyściach z AI. Koncepcja, inspirowana Alaska Permanent Fund, pokazuje rosnące powiązanie rozwoju modeli z polityką przemysłową państwa.",
      source: "Reuters",
      sourceUrl: "https://www.reuters.com/business/openai-proposes-handing-trump-administration-5-stake-ft-reports-2026-07-02/"
    }
  ];

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
            {newsList[tickerIndex].category === "Polska" ? "🇵🇱 PL" : "🌍 ŚWIAT"}
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

      {/* 2. Main Daily AI & IT Briefing Container */}
      <div className="bg-brand-card border border-brand-border p-6 sm:p-8">
        
        {/* Header Grid */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-brand-border pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-orange-500 text-lg">📅</span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight uppercase text-brand-text">
                Daily AI & IT Briefing
              </h2>
            </div>
            <p className="text-brand-muted text-xs">
              Codzienny, skondensowany przegląd kluczowych wydarzeń technologicznych i legislacyjnych ze świata.
            </p>
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
              <span>🇵🇱 Polska</span>
            </button>
            <button
              onClick={() => setActiveTab("world")}
              className={`px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === "world" 
                  ? "bg-brand-text text-brand-bg font-black" 
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              <span>🌍 Świat</span>
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
                          {news.category === "Polska" ? "🇵🇱 Polska" : "🌍 Świat"}
                        </span>
                        <span className="text-[10px] font-mono text-brand-muted">
                          Źródło: <strong>{news.source}</strong>
                        </span>
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
                AI przechodzi od narzędzi do infrastruktury państwa
              </h3>

              <div className="border-l-2 border-orange-500 pl-4 my-4">
                <p className="text-xs text-brand-muted leading-relaxed italic font-serif">
                  "Dzisiejsze wiadomości łączą trzy warstwy rozwoju AI: nowe modele agentowe, inwestycje w krajowy ekosystem oraz budowę kompetencji od szkół po przedsiębiorstwa."
                </p>
              </div>

              <p className="text-xs text-brand-muted leading-relaxed font-sans mt-4">
                Dla branży IT oznacza to, że przewagę będą budować nie tylko dostawcy najlepszych modeli, lecz także organizacje zdolne wdrożyć je w edukacji, procesach firmowych i bezpiecznej infrastrukturze.
              </p>

              <div className="mt-6 pt-4 border-t border-brand-border/60 text-[9px] font-mono text-brand-muted uppercase tracking-wider">
                Analiza z: <span className="text-brand-text font-bold">3 lipca 2026</span>
              </div>
            </div>

            {/* Quick Micro Stats / Ticker Extra Info */}
            <div className="border border-brand-border hover:border-brand-text hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-text/5 transition-all duration-300 p-5 bg-brand-featured-bg">
              <h4 className="text-[9px] font-extrabold tracking-widest uppercase text-brand-muted mb-3">
                METRYKI BRANŻOWE (LIPEC 2026)
              </h4>
              <div className="space-y-3.5 text-xs font-mono">
                <div className="flex justify-between border-b border-brand-border pb-1.5">
                  <span className="text-brand-muted">Adopcja AI w PL IT:</span>
                  <span className="font-bold text-brand-text text-right">86.4%</span>
                </div>
                <div className="flex justify-between border-b border-brand-border pb-1.5">
                  <span className="text-brand-muted">Średni koszt 1M tokenów:</span>
                  <span className="font-bold text-brand-text text-right">-32% YoY</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Wzrost popytu na GPU:</span>
                  <span className="font-bold text-orange-500 text-right">+210%</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
