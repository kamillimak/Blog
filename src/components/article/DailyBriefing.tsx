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
      title: "AI może zwiększyć PKB Polski nawet o 12% do 2035 r.",
      content: "Nowy raport World Bank wskazuje, że sztuczna inteligencja może zwiększyć realny PKB Polski od 1,3% do nawet 12,1% do 2035 roku. Kluczowe będą inwestycje przedsiębiorstw, rozwój kompetencji pracowników oraz odpowiednie otoczenie regulacyjne.",
      source: "World Bank",
      sourceUrl: "https://www.worldbank.org/en/news/press-release/2026/06/22/ai-could-boost-poland-s-economy-by-up-to-12-by-2035-new-world-bank-group-report-finds?utm_source=chatgpt.com",
      image: "https://images.openai.com/static-rsc-4/aufEy3BddiT22vvaeOd6fHC_i4yNOFhit4HEC9cKLM313FhezTfx_qiZ9dn5axKl2WY5HpRmUkx_APA67D35GkJyXfrvoAnh6Gh4JaI5ZD1aihD6RfaWD_qxgJ-BGOs9KLgW3RJQiYD0J4iwe3MpJIilrlahwAkETr4eK9OdNKCoZIrKNbI8xHVlH_bGzrgt?purpose=fullsize"
    },
    {
      id: "2",
      category: "Polska",
      title: "Polska przyspiesza budowę własnego ekosystemu AI",
      content: "Rząd kontynuuje działania na rzecz większej niezależności technologicznej. Inwestycje obejmują infrastrukturę AI, centra danych oraz rozwiązania ograniczające zależność od globalnych dostawców technologii.",
      source: "TVP World",
      sourceUrl: "https://tvpworld.com/93605642/poland-bets-500m-on-ai-to-cut-dependence-on-big-tech?utm_source=chatgpt.com",
      image: "https://images.openai.com/static-rsc-4/gGab8cAAtcTAXNOEIjo5KczsMVP4bPrTrGdpEjgsfLLX6yE_vIC6fXXkNsq0kRLcsqJpiebc8UcEzUPE2i6zd7NmA2DjMYc-46dKxJOgpR-cFKbJYscpi1Aprgob6wd4OrDrMnKf0lBbOGPrRNnOLeulnCHaBZgZXECBQA4M0SUq3y_dkq4Y_ZOymAyPcbmd?purpose=fullsize"
    },
    {
      id: "3",
      category: "Świat",
      title: "OpenAI proponuje udział państwa USA w zyskach z AI",
      content: "Według doniesień OpenAI rozważa przekazanie 5% udziałów rządowi USA jako elementu modelu, który miałby zapewnić społeczeństwu udział w korzyściach płynących z rozwoju sztucznej inteligencji. Pomysł jest inspirowany funduszem Alaska Permanent Fund i pokazuje, jak mocno polityka zaczyna wpływać na rozwój AI.",
      source: "Reuters",
      sourceUrl: "https://www.reuters.com/business/openai-proposes-handing-trump-administration-5-stake-ft-reports-2026-07-02/?utm_source=chatgpt.com",
      image: "https://images.openai.com/static-rsc-4/uKxNj_FlM5KQKSsZ3KuHB0vpRLwyUQ3RyRSc4bjV0IQ71ymIERlCrEU3_7fz5kfhuQbS0MUUSZJnUYTQ9nUmoDP948ab0v_UnvS6GFDfCqqLEf4eGBPswlPqVgkAJMkv5iLhJk1XPM5S7rwmDqhC0Xm4a7mQePwGcOLS6zFO00AyX_0SlqtzPs5atfI0yOLj?purpose=fullsize"
    },
    {
      id: "4",
      category: "Świat",
      title: "Anthropic odzyskuje możliwość globalnego udostępniania modeli Fable 5 i Mythos 5",
      content: "Anthropic poinformował o zniesieniu amerykańskich ograniczeń eksportowych dotyczących swoich najbardziej zaawansowanych modeli po wdrożeniu dodatkowych zabezpieczeń. To ważna wiadomość dla programistów i firm wykorzystujących modele Claude w projektach produkcyjnych.",
      source: "The Guardian",
      sourceUrl: "https://www.theguardian.com/technology/2026/jul/01/anthropic-fable-mythos-ai-models-us-export-controls-lifted?utm_source=chatgpt.com",
      image: "https://images.openai.com/static-rsc-4/5bixbdz3xih52AA-22xTyGGmSzmsA6hvTKbT-66Hmzss3gH3XIIjoVIhZkgp8AYGvXK3BRM5rympwLfyoEjZu5-W0c9rAhwAFA0bzMUCZWyi-ifj1IzEX-BalopcI_U2QsSX7GEFRKrCHMDAeinEE3K2kP5fUTXffGjM-YWrTizRwbMYkgfdnoJIHEVh1KZk?purpose=fullsize"
    },
    {
      id: "5",
      category: "Świat",
      title: "Google opóźnia premierę Gemini 3.5 Pro",
      content: "Google przesunął premierę modelu Gemini 3.5 Pro na lipiec, aby dopracować możliwości agentów AI oraz poprawić wydajność po uwagach testerów. Pokazuje to, że konkurencja pomiędzy Google, OpenAI i Anthropic coraz bardziej koncentruje się na zastosowaniach programistycznych i automatyzacji pracy.",
      source: "Business Insider",
      sourceUrl: "https://www.businessinsider.com/google-3-5-pro-july-release-tokens-ai-agents-model-2026-6?utm_source=chatgpt.com",
      image: "https://images.openai.com/static-rsc-4/ErOgDFTdYcQE0yV2dbxXiJBaUhRHMDG9EaK0zy-XEpDmzvl7lc7HBSBbZnHBVkF7BmNVusHq07nUNooVmKqBNL-XtZzZALEYUuqSxrdLQSvWr4aPg3dTJOZp51YH2RoFcrYT3pBtCBOD1g3IlJvKhzrYOt1kVgAxn-ymoP54kanrRrrrAAygi1gFZN6aVYvg?purpose=fullsize"
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
                Suwerenność Technologiczna i Rządy w grze o AI
              </h3>

              <div className="border-l-2 border-orange-500 pl-4 my-4">
                <p className="text-xs text-brand-muted leading-relaxed italic font-serif">
                  "Największym tematem jest rosnący wpływ państw na rozwój zaawansowanej AI. Zarówno propozycje OpenAI dotyczące udziału społeczeństwa w zyskach, jak i decyzje administracji USA wobec modeli Anthropic pokazują, że regulacje stają się równie istotne jak same postępy technologiczne."
                </p>
              </div>

              <p className="text-xs text-brand-muted leading-relaxed font-sans mt-4">
                Dla osób pracujących w IT oznacza to, że w najbliższych miesiącach warto śledzić nie tylko premiery kolejnych modeli, ale także zmiany prawne i ich bezpośredni wpływ na dostępność zaawansowanych narzędzi programistycznych.
              </p>

              <div className="mt-6 pt-4 border-t border-brand-border/60 text-[9px] font-mono text-brand-muted uppercase tracking-wider">
                Analiza z: <span className="text-brand-text font-bold">2 lipca 2026</span>
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
