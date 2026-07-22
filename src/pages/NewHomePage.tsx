import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Search, RotateCcw, Award, Clock, FileText, Settings, 
  ArrowRight, BriefcaseBusiness, Mail, Newspaper, Users, 
  Linkedin, Github, Sparkles, Star, ArrowLeft, ExternalLink, 
  Share2, Shield, Flame, ChevronRight, ChevronLeft
} from "lucide-react";
import { ARTICLES } from "../data/articles";
import { ArticleCard } from "../components/article/ArticleCard";
import { getGlobalStats, filterArticles } from "../utils/article";
import { UNIFIED_NEWS_FEED, type UnifiedNewsItem, type UnifiedNewsKind } from "../data/newsFeed";
import { formatPolishDate } from "../utils/article";
import { shouldReduceMotion } from "../utils/motion";
import { AnimatedHeroBackground } from "../components/article/AnimatedHeroBackground";
import { ShareModal } from "../components/article/ShareModal";

// Define category styles and colors for news cards
const categoryColors: Record<UnifiedNewsKind, {
  color: string;
  bgGlow: string;
  badgeBg: string;
  borderHover: string;
  textHover: string;
  name: string;
}> = {
  "tech-pl": {
    color: "#10B981", // Emerald
    bgGlow: "rgba(16, 185, 129, 0.12)",
    badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    borderHover: "hover:border-emerald-500/60",
    textHover: "group-hover:text-emerald-400",
    name: "Tech PL"
  },
  "tech-world": {
    color: "#0EA5E9", // Sky
    bgGlow: "rgba(14, 165, 233, 0.12)",
    badgeBg: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    borderHover: "hover:border-sky-500/60",
    textHover: "group-hover:text-sky-400",
    name: "Tech World"
  },
  "top3-news": {
    color: "#8B5CF6", // Violet
    bgGlow: "rgba(139, 92, 246, 0.12)",
    badgeBg: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    borderHover: "hover:border-violet-500/60",
    textHover: "group-hover:text-violet-400",
    name: "AI Newsy"
  },
  "top3-crime": {
    color: "#F43F5E", // Rose
    bgGlow: "rgba(244, 63, 94, 0.12)",
    badgeBg: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    borderHover: "hover:border-rose-500/60",
    textHover: "group-hover:text-rose-400",
    name: "Kryminalne AI"
  },
  "top3-business": {
    color: "#F59E0B", // Amber
    bgGlow: "rgba(245, 158, 11, 0.12)",
    badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    borderHover: "hover:border-amber-500/60",
    textHover: "group-hover:text-amber-400",
    name: "Zarabianie AI"
  }
};

export function NewHomePage() {
  useEffect(() => {
    document.title = "Nowy Layout — Blog AI Coding";
    window.scrollTo({ top: 0 });
  }, []);

  const profileImage = `${import.meta.env.BASE_URL}images/kamil-mikolajczyk.png`;

  // Stats
  const stats = useMemo(() => getGlobalStats(ARTICLES), []);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filtered Library Articles
  const filteredArticles = useMemo(() => {
    return filterArticles(ARTICLES, searchQuery, selectedTool, selectedCategory);
  }, [searchQuery, selectedTool, selectedCategory]);

  // Unique categories for the filter list
  const categories = useMemo(() => {
    return Array.from(new Set(ARTICLES.map((a) => a.category)));
  }, []);

  const tools = ["Codex", "Trae", "Claude", "AI Studio"];

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedTool(null);
    setSelectedCategory(null);
  };

  // Carousel scroll handler for Newsroom
  const newsroomScrollRef = useRef<HTMLDivElement | null>(null);
  
  const scrollNewsroom = (direction: "left" | "right") => {
    const container = newsroomScrollRef.current;
    if (!container) return;
    const scrollAmount = 360;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  return (
    <div 
      className="bg-black text-white min-h-screen pb-24 font-sans selection:bg-orange-500 selection:text-black"
      style={{
        // Override global theme variables for child components locally
        ["--color-brand-bg" as any]: "#000000",
        ["--color-brand-card" as any]: "#0B0B0B",
        ["--color-brand-featured-bg" as any]: "#121212",
        ["--color-brand-border" as any]: "#1F1F1F",
        ["--color-brand-text" as any]: "#FFFFFF",
        ["--color-brand-muted" as any]: "#8E8E93",
        ["--color-brand-sage" as any]: "#FF6B00",
      }}
    >
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-zinc-900 bg-black pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT COLUMN: Title & Author Badge & Floating Code editor */}
            <div className="lg:col-span-4 space-y-8 flex flex-col justify-center">
              <div>
                <span className="inline-block px-2.5 py-1 bg-orange-600 text-black text-[9px] font-black uppercase tracking-widest mb-4">
                  AI-Native Orchestration PO / PM
                </span>
                
                <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-black leading-[0.85] tracking-tighter text-white uppercase font-sans">
                  Praktyczne <br />
                  podejście <br />
                  <span className="text-orange-500">do AI</span>
                </h1>
              </div>

              {/* Author badge */}
              <div className="flex items-center gap-3 bg-zinc-950/80 p-3 border border-zinc-900 w-fit">
                <img 
                  src={profileImage} 
                  alt="Kamil Mikołajczyk" 
                  className="h-10 w-10 rounded-full object-cover object-top border border-orange-500/50 grayscale"
                />
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">AUTHOR</div>
                  <div className="text-sm font-black uppercase tracking-tight text-white leading-none">Kamil Mikołajczyk</div>
                  <div className="text-[10px] text-orange-500/80 font-mono mt-0.5 leading-none">AI Coding Expert</div>
                </div>
              </div>

              {/* Left Floating mockup Editor Card */}
              <div className="bg-[#060606] border border-orange-500/20 hover:border-orange-500/50 transition-colors duration-300 shadow-[0_0_15px_rgba(249,115,22,0.05)] p-4 max-w-sm rounded-none">
                <div className="flex items-center gap-1.5 mb-3 border-b border-zinc-900 pb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-[9px] font-mono text-zinc-500 ml-2">agent_orchestrator.ts</span>
                </div>
                <pre className="text-[10px] font-mono text-zinc-400 overflow-x-auto leading-relaxed">
                  <code>
                    <span className="text-orange-500">async function</span> <span className="text-amber-300">runWorkflow</span>() &#123;{"\n"}
                    {"  "}const agents = [<span className="text-emerald-400">"Codex"</span>, <span className="text-sky-400">"Trae"</span>, <span className="text-violet-400">"Claude"</span>];{"\n"}
                    {"  "}const results = await Promise.all(agents.map(a =&gt; &#123;{"\n"}
                    {"    "}return <span className="text-orange-500">orchestrate</span>(a, task);{"\n"}
                    {"  "}&#125;));{"\n"}
                    {"  "}return compile(results);{"\n"}
                    &#125;
                  </code>
                </pre>
              </div>
            </div>

            {/* CENTER COLUMN: Portal cutout with Canvas Animation */}
            <div className="lg:col-span-4 flex justify-center relative">
              <div className="relative w-full aspect-[4/5] max-w-[340px] lg:max-w-[380px] border border-zinc-900 bg-black overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                
                {/* The canvas particle flow */}
                <AnimatedHeroBackground />
                
                {/* Grayscale profile cutout */}
                <img
                  src={profileImage}
                  alt="Kamil Mikołajczyk"
                  className="absolute inset-0 w-full h-full object-cover object-top grayscale contrast-[1.2] brightness-[0.95] mix-blend-lighten pointer-events-none select-none transition-transform duration-700 group-hover:scale-105"
                  style={{
                    maskImage: "radial-gradient(circle at 50% 45%, black 48%, transparent 80%)",
                    WebkitMaskImage: "radial-gradient(circle at 50% 45%, black 48%, transparent 80%)"
                  }}
                />

                {/* Glowing neon aura overlay bottom */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
              </div>
            </div>

            {/* RIGHT COLUMN: Feature Title & Changelog Widget */}
            <div className="lg:col-span-4 space-y-8 flex flex-col justify-center">
              <div className="space-y-4">
                <div className="flex h-9 w-9 items-center justify-center border border-orange-500 bg-orange-500/10 text-orange-500">
                  <Sparkles size={16} />
                </div>
                
                <Link to="/articles/jak-powstawal-blog-ai-coding-changelog-jako-historia-produktu" className="group block">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-none uppercase group-hover:text-orange-500 transition-colors">
                    Jak powstawał blog AI coding: changelog jako historia produktu
                  </h2>
                </Link>
                
                <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                  Dziennik ewolucji oprogramowania napisanego wspólnie z agentami. Poznaj architekturę procesów decyzyjnych stojących za tym systemem.
                </p>
              </div>

              {/* Right Floating Changelog Box */}
              <div className="bg-[#060606] border border-orange-500/20 hover:border-orange-500/50 transition-colors duration-300 shadow-[0_0_15px_rgba(249,115,22,0.05)] p-4 max-w-sm rounded-none">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">changelog.log</span>
                  </div>
                  <span className="text-[9px] font-mono text-orange-500 font-bold uppercase">v2.1.0</span>
                </div>
                <div className="space-y-3 font-mono text-[9px] text-zinc-400">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 shrink-0">+</span>
                    <span>Added Canvas Particle Engine</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 shrink-0">+</span>
                    <span>Enabled Category-Colored News Feed</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sky-500 shrink-0">*</span>
                    <span>Re-designed homepage layout with premium touch</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-violet-500 shrink-0">!</span>
                    <span>Optimized React 19 theme overrides</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NEWSROOM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="border-b border-zinc-900 pb-6 mb-8 flex items-end justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-orange-500 uppercase block mb-1">
              DZIEŃ PO DNIU · TRENDY AI
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white font-sans">
              Newsroom
            </h2>
          </div>
          
          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => scrollNewsroom("left")}
              className="p-2 border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
              aria-label="Przewiń w lewo"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={() => scrollNewsroom("right")}
              className="p-2 border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
              aria-label="Przewiń w prawo"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable News Cards Row */}
        <div 
          ref={newsroomScrollRef}
          className="flex overflow-x-auto gap-6 pb-6 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {UNIFIED_NEWS_FEED.map((news, idx) => (
            <div key={news.id} className="snap-start shrink-0 w-[290px] sm:w-[340px]">
              <NewsCarouselCard item={news} index={idx} />
            </div>
          ))}
        </div>
      </section>

      {/* AUDIENCE BENTO GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="border-t border-b border-zinc-900 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-orange-500 uppercase block mb-3">
                DLA KOGO JEST TEN BLOG
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Praktyka zamiast teorii i szumu medialnego
              </h2>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: BriefcaseBusiness,
                  title: "Liderzy i PM/PO",
                  text: "Scenariusze użycia AI w procesach, backlogach, analizie i komunikacji z zespołem programistów."
                },
                {
                  icon: Users,
                  title: "Twórcy AI-native",
                  text: "Workflow, integracje API i narzędzia pomocnicze do szybkiego prototypowania i wdrażania kodu."
                },
                {
                  icon: Newspaper,
                  title: "Analiza Rynku",
                  text: "Systematyczny monitoring trendów technologicznych, bezpieczeństwa oraz mechanizmów monetyzacji AI."
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="border border-zinc-900 bg-zinc-950/40 p-5 hover:border-zinc-800 transition-colors">
                    <div className="mb-5 flex h-9 w-9 items-center justify-center border border-zinc-800 bg-zinc-950 text-orange-500">
                      <Icon size={16} />
                    </div>
                    <h3 className="mb-2 text-sm font-black uppercase tracking-tight text-white">{item.title}</h3>
                    <p className="text-xs leading-relaxed text-zinc-400">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE LIBRARY SECTION */}
      <section id="library-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="border-b border-zinc-900 pb-5 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">
              Biblioteka Artykułów
            </h2>
            <p className="text-zinc-500 text-xs mt-1">
              Przeglądaj głębokie analizy, instrukcje i studia przypadków wdrożeń systemowych AI.
            </p>
          </div>
          
          <div className="text-[10px] text-zinc-400 font-bold font-mono uppercase tracking-wider bg-zinc-950 px-3 py-1.5 border border-zinc-900 self-start md:self-auto">
            Znaleziono: <span className="text-orange-500 font-bold text-xs">{filteredArticles.length}</span> z {ARTICLES.length}
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="bg-[#080808] p-5 border border-zinc-900 space-y-4 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            
            {/* Text Search Box */}
            <div className="lg:col-span-4 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-500 pointer-events-none">
                <Search size={14} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Szukaj artykułu, tagu..."
                className="w-full pl-9 pr-4 py-2 border border-zinc-800 bg-[#0c0c0c] text-xs text-white focus:outline-none focus:border-orange-500 focus:bg-black transition-colors font-sans"
              />
            </div>

            {/* Tool Filter Selector */}
            <div className="lg:col-span-5 flex flex-wrap gap-1.5 items-center">
              <span className="text-[10px] text-zinc-500 font-bold mr-1 uppercase tracking-wider">Narzędzie:</span>
              <button
                onClick={() => setSelectedTool(null)}
                className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                  selectedTool === null
                    ? "bg-orange-600 text-black border-orange-600"
                    : "bg-[#0c0c0c] text-zinc-400 hover:text-white border-zinc-800"
                }`}
              >
                Wszystkie
              </button>
              {tools.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTool(t)}
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                    selectedTool === t
                      ? "bg-orange-600 text-black border-orange-600"
                      : "bg-[#0c0c0c] text-zinc-400 hover:text-white border-zinc-800"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Category Filter Selector */}
            <div className="lg:col-span-3 flex flex-wrap gap-1.5 items-center lg:justify-end">
              <span className="text-[10px] text-zinc-500 font-bold mr-1 uppercase tracking-wider">Kategoria:</span>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                  selectedCategory === null
                    ? "bg-orange-600 text-black border-orange-600"
                    : "bg-[#0c0c0c] text-zinc-400 hover:text-white border-zinc-800"
                }`}
              >
                Wszystkie
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                    selectedCategory === c
                      ? "bg-orange-600 text-black border-orange-600"
                      : "bg-[#0c0c0c] text-zinc-400 hover:text-white border-zinc-800"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

          </div>

          {/* Reset Filters Panel */}
          {(searchQuery || selectedTool || selectedCategory) && (
            <div className="flex justify-between items-center pt-3 border-t border-zinc-900 text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
              <div className="flex flex-wrap items-center gap-2">
                <span>Filtrowanie:</span>
                {searchQuery && <span className="bg-[#121212] px-2 py-0.5 border border-zinc-800 text-white">"{searchQuery}"</span>}
                {selectedTool && <span className="bg-[#121212] px-2 py-0.5 border border-zinc-800 text-white">{selectedTool}</span>}
                {selectedCategory && <span className="bg-[#121212] px-2 py-0.5 border border-zinc-800 text-white">{selectedCategory}</span>}
              </div>
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 px-2 py-0.5 text-orange-500 hover:text-white transition-colors cursor-pointer font-bold"
              >
                <RotateCcw size={10} />
                <span>Resetuj</span>
              </button>
            </div>
          )}
        </div>

        {/* Library Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div key={article.id} className="relative group transition-all duration-300">
                {/* Accent line based on category */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-0.5 transition-transform scale-x-0 group-hover:scale-x-100 duration-300`} 
                  style={{
                    backgroundColor: 
                      article.category === "Workflow" ? "#F59E0B" :
                      article.category === "Architektura" ? "#0EA5E9" :
                      article.category === "Narzędzia" ? "#10B981" : "#8B5CF6"
                  }}
                />
                <ArticleCard article={article} featured={false} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty results state */
          <div className="border border-zinc-900 bg-zinc-950/20 p-16 text-center">
            <h3 className="font-bold text-white text-base uppercase tracking-tight mb-2">Brak wyników</h3>
            <p className="text-zinc-500 text-xs max-w-sm mx-auto mb-6">
              Brak artykułów pasujących do wybranych kryteriów wyszukiwania.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-black rounded-none text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Zresetuj filtry</span>
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

// Dedicated Newsroom card component for the carousel
function NewsCarouselCard({ item, index }: { item: UnifiedNewsItem; index: number }) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const style = categoryColors[item.kind] || {
    color: "#F97316",
    bgGlow: "rgba(249, 115, 22, 0.12)",
    badgeBg: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    borderHover: "hover:border-orange-500/60",
    textHover: "group-hover:text-orange-400",
    name: "News"
  };

  const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;
  const isValidSourceUrl = (url: string) => /^https?:\/\//i.test(url);
  const sourceUrl = isValidSourceUrl(item.sourceUrl) ? item.sourceUrl : "";
  const shareUrl = `${window.location.origin}${window.location.pathname}#news-feed-${item.id}`;

  const handleMouseEnter = () => {
    if (shouldReduceMotion() || !videoRef.current) return;
    void videoRef.current.play();
  };

  const handleMouseLeave = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <>
      <article 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        className={`group flex flex-col h-full bg-zinc-950 border border-zinc-900 rounded-none overflow-hidden transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 ${style.borderHover}`}
        style={{
          boxShadow: `0 4px 30px rgba(0,0,0,0.8)`
        }}
      >
        {/* Hover Shadow glow using category specific color */}
        <div 
          className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: `0 0 25px ${style.bgGlow}`
          }}
        />

        {/* Video / Visual container */}
        <div className="relative h-44 overflow-hidden bg-black">
          <video 
            ref={videoRef}
            src={assetUrl(item.video)} 
            className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300"
            muted 
            loop 
            playsInline 
            preload="metadata" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
          
          {/* Category Badge */}
          <span className={`absolute left-3 top-3 border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${style.badgeBg}`}>
            {style.name}
          </span>

          <span className="absolute bottom-3 left-3 border border-white/10 bg-black/50 px-2 py-0.5 text-[9px] font-mono text-zinc-400">
            News {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Card Content */}
        <div className="flex flex-col justify-between flex-grow p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[8px] font-mono uppercase tracking-wider text-zinc-500">
              <time dateTime={item.publishedAt}>{formatPolishDate(item.publishedAt)}</time>
              <span>·</span>
              <span>{item.groupLabel}</span>
            </div>
            
            <h3 className={`text-sm font-black uppercase tracking-tight text-white transition-colors duration-300 ${style.textHover} line-clamp-2`}>
              {item.title}
            </h3>
            
            <p className="text-xs leading-relaxed text-zinc-400 line-clamp-3">
              {item.summary}
            </p>
          </div>

          <div className="border-t border-zinc-900 pt-3 flex items-center justify-between gap-2">
            {sourceUrl ? (
              <a 
                href={sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-zinc-400 hover:text-white transition-colors`}
              >
                <span>Źródło</span>
                <ExternalLink size={10} />
              </a>
            ) : (
              <span className="text-[9px] font-mono uppercase text-zinc-600">
                {item.sourceLabel || "Źródło"}
              </span>
            )}
            
            <button
              type="button"
              onClick={() => setIsShareOpen(true)}
              className="inline-flex items-center gap-1.5 border border-zinc-800 bg-zinc-900 px-2 py-1 text-[8px] font-black uppercase tracking-widest text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 cursor-pointer"
            >
              <Share2 size={9} className="text-orange-500" />
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
        categoryLabel={style.name}
      />
    </>
  );
}
