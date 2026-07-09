import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, RotateCcw, Award, Clock, FileText, Settings, ArrowRight, BriefcaseBusiness, Mail, Newspaper, Users } from "lucide-react";
import { ARTICLES } from "../data/articles";
import { ArticleCard } from "../components/article/ArticleCard";
import { getGlobalStats, filterArticles } from "../utils/article";
import { DailyBriefing } from "../components/article/DailyBriefing";
import { HeroSlider } from "../components/article/HeroSlider";
import { WebVitalsDashboard } from "../components/analytics/WebVitalsDashboard";

export function HomePage() {
  // Set page title for SEO
  useEffect(() => {
    document.title = "Blog technologiczny â€” Codex Â· Trae Â· Claude Â· AI Studio";
  }, []);

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

  // Unique tools for the filter list
  const tools = ["Codex", "Trae", "Claude", "AI Studio"];

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedTool(null);
    setSelectedCategory(null);
  };

  const profileImage = `${import.meta.env.BASE_URL}images/kamil-mikolajczyk.png`;

  return (
    <div className="bg-brand-bg min-h-screen pb-20 font-sans text-brand-text">
      
      {/* 1. HERO SECTION & INTRODUCTION */}
      <section id="hero-section" className="bg-brand-bg border-b border-brand-border pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            
            {/* About author */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-block px-3 py-1 bg-brand-text text-brand-bg text-[10px] font-bold uppercase tracking-widest rounded-none mb-4">
                  Blog technologiczny Kamila MikoĹ‚ajczyka
                </span>
                <div className="flex items-center justify-between gap-4">
                  <h1 className="text-[32px] sm:text-5xl lg:text-[64px] font-bold leading-[0.9] tracking-tighter text-brand-text uppercase min-w-0">
                    Praktyczny warsztat AI dla twĂłrcĂłw, liderĂłw i zespoĹ‚Ăłw IT
                  </h1>
                  <div className="lg:hidden shrink-0 h-20 w-20 sm:h-28 sm:w-28 rounded-full border border-brand-border bg-brand-featured-bg p-1.5 overflow-hidden">
                    <img
                      src={profileImage}
                      alt="Kamil MikoĹ‚ajczyk"
                      className="h-full w-full rounded-full object-cover object-top grayscale-[15%]"
                    />
                  </div>
                </div>
                <p className="text-brand-muted text-base sm:text-lg leading-relaxed max-w-2xl">
                  Blog o pracy z Codex, Trae, Claude i AI Studio: od codziennych newsĂłw technologicznych, przez automatyzacje, po konkretne workflow dla osĂłb, ktĂłre chcÄ… szybciej projektowaÄ‡, wdraĹĽaÄ‡ i opowiadaÄ‡ o produktach AI.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    to="/articles"
                    className="inline-flex items-center justify-center px-8 py-4 bg-brand-text text-brand-bg hover:bg-brand-sage hover:text-white text-xs font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer"
                  >
                    <span>Czytaj artykuĹ‚y</span>
                    <ArrowRight size={14} className="ml-2" />
                  </Link>
                  <a
                    href="mailto:mikolajczykamil@gmail.com"
                    className="inline-flex items-center justify-center px-8 py-4 border border-brand-text text-brand-text hover:bg-brand-text hover:text-brand-bg text-xs font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer"
                  >
                    <Mail size={14} className="mr-2" />
                    <span>Kontakt</span>
                  </a>
                </div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-brand-muted">
                  Autor: Kamil MikoĹ‚ajczyk Â· Senior IT Project Manager Â· Product Owner Â· AI & Digital Transformation
                </p>
              </div>
              <div className="hidden lg:block lg:col-span-5">
                <div className="border border-brand-border bg-brand-featured-bg p-3 max-w-sm lg:max-w-none">
                  <img
                    src={profileImage}
                    alt="Kamil MikoĹ‚ajczyk"
                    className="aspect-[4/5] w-full object-cover object-top grayscale-[15%]"
                  />
                </div>
              </div>
            </div>

            {/* Featured content slider */}
            <div className="w-full">
              <HeroSlider />
            </div>

          </div>
        </div>
      </section>

      {/* AI News Section */}
      <DailyBriefing />

      {/* Audience Section */}
      <section id="audience-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="border-y border-brand-border py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-brand-muted uppercase block mb-3">
                Dla kogo jest ten blog
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-extrabold tracking-tight uppercase text-brand-text">
                Dla osĂłb, ktĂłre chcÄ… rozumieÄ‡ AI w praktyce, nie tylko w teorii
              </h2>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: BriefcaseBusiness,
                  title: "Liderzy i PM/PO",
                  text: "Scenariusze uĹĽycia AI w procesach, backlogach, analizie i komunikacji z zespoĹ‚em."
                },
                {
                  icon: Users,
                  title: "TwĂłrcy AI-native",
                  text: "Workflow, automatyzacje i narzÄ™dzia, ktĂłre pomagajÄ… zamieniaÄ‡ pomysĹ‚y w prototypy."
                },
                {
                  icon: Newspaper,
                  title: "Osoby Ĺ›ledzÄ…ce tech",
                  text: "Newsroom AI, TOP 3 i briefing trendĂłw z podziaĹ‚em na PolskÄ™ i Ĺ›wiat."
                }
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="border border-brand-border bg-brand-card p-5">
                    <div className="mb-5 flex h-10 w-10 items-center justify-center border border-brand-border bg-brand-featured-bg text-brand-text">
                      <Icon size={18} />
                    </div>
                    <h3 className="mb-2 text-sm font-extrabold uppercase tracking-tight text-brand-text">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-brand-muted">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SYNERGISTIC WORKFLOW SECTION */}
      <section id="workflow-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-[#1A1A1A] rounded-none p-8 sm:p-12 border border-brand-border text-white relative overflow-hidden">
          
          <div className="max-w-3xl mb-12">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-brand-sage uppercase block mb-3">
              Koncepcja i synergia
            </span>
            <h2 className="text-3xl font-sans font-extrabold tracking-tight text-white uppercase mb-4">
              Jeden proces, cztery wyspecjalizowane role
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Nowoczesny twĂłrca i orkiestrator AI nie polega na jednym asystencie. SkutecznoĹ›Ä‡ polega na rozdzielaniu zadaĹ„ wedĹ‚ug mocnych stron poszczegĂłlnych modeli, tworzÄ…c zintegrowany Ĺ‚aĹ„cuch dostarczania kodu i aplikacji.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Stage 1 */}
            <div className="bg-black/50 border border-zinc-800 p-6 rounded-none hover:border-white transition-colors group">
              <div className="w-9 h-9 bg-zinc-900 text-white border border-zinc-800 flex items-center justify-center rounded-none font-mono font-bold text-xs mb-4">
                01
              </div>
              <h3 className="font-sans font-extrabold uppercase tracking-tight text-sm text-sky-400 mb-2">
                AI Studio
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                <strong>Mapa i kontekst.</strong> Skanowanie caĹ‚ego repozytorium, analiza architektury, wykrywanie zaleĹĽnoĹ›ci i tworzenie globalnej strategii.
              </p>
            </div>

            {/* Stage 2 */}
            <div className="bg-black/50 border border-zinc-800 p-6 rounded-none hover:border-white transition-colors group">
              <div className="w-9 h-9 bg-zinc-900 text-white border border-zinc-800 flex items-center justify-center rounded-none font-mono font-bold text-xs mb-4">
                02
              </div>
              <h3 className="font-sans font-extrabold uppercase tracking-tight text-sm text-amber-400 mb-2">
                Claude
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                <strong>Projekt architektury.</strong> Projektowanie struktur danych, Ĺ›cisĹ‚e typowanie TypeScript, wybĂłr bibliotek i planowanie refaktoryzacji.
              </p>
            </div>

            {/* Stage 3 */}
            <div className="bg-black/50 border border-zinc-800 p-6 rounded-none hover:border-white transition-colors group">
              <div className="w-9 h-9 bg-zinc-900 text-white border border-zinc-800 flex items-center justify-center rounded-none font-mono font-bold text-xs mb-4">
                03
              </div>
              <h3 className="font-sans font-extrabold uppercase tracking-tight text-sm text-indigo-400 mb-2">
                Codex
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                <strong>Praca w repozytorium.</strong> Autonomiczne generowanie moduĹ‚Ăłw, Ĺ‚Ä…czenie plikĂłw, pisanie testĂłw jednostkowych i linter-walidacja.
              </p>
            </div>

            {/* Stage 4 */}
            <div className="bg-black/50 border border-zinc-800 p-6 rounded-none hover:border-white transition-colors group">
              <div className="w-9 h-9 bg-zinc-900 text-white border border-zinc-800 flex items-center justify-center rounded-none font-mono font-bold text-xs mb-4">
                04
              </div>
              <h3 className="font-sans font-extrabold uppercase tracking-tight text-sm text-emerald-400 mb-2">
                Trae
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                <strong>WykoĹ„czenie i UI.</strong> Szybkie, lokalne poprawki w edytorze, iterowanie stylĂłw Tailwind CSS, obsĹ‚uga zdarzeĹ„ i dopieszczanie mikro-detali.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. LIBRARY ARTICLES SECTION (Filters + Grid) */}
      <section id="library-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 scroll-mt-24">
        
        <div className="border-b border-brand-border pb-5 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold tracking-tight uppercase text-brand-text">
              Biblioteka artykuĹ‚Ăłw
            </h2>
            <p className="text-brand-muted text-xs mt-1">
              Przeszukuj, filtruj i odkrywaj artykuĹ‚y na podstawie narzÄ™dzi i kategorii.
            </p>
          </div>
          
          <div className="text-[10px] text-brand-muted font-bold font-mono uppercase tracking-wider bg-brand-featured-bg px-3 py-1.5 rounded-none border border-brand-border self-start md:self-auto">
            Pokazano: <span className="text-brand-text font-bold text-xs">{filteredArticles.length}</span> z {ARTICLES.length} wpisĂłw
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="bg-brand-card p-5 rounded-none border border-brand-border space-y-4 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            
            {/* Text Search Box */}
            <div className="lg:col-span-4 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-brand-muted pointer-events-none">
                <Search size={15} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Szukaj artykuĹ‚u, tagu..."
                className="w-full pl-9 pr-4 py-2 border border-brand-border rounded-none text-xs bg-brand-featured-bg focus:bg-white focus:outline-none focus:border-brand-text transition-all font-sans text-brand-text"
                aria-label="Wyszukaj artykuĹ‚y"
              />
            </div>

            {/* Tool Filter Selector */}
            <div className="lg:col-span-5 flex flex-wrap gap-1.5 items-center">
              <span className="text-[10px] text-brand-muted font-bold mr-1 uppercase tracking-wider">NarzÄ™dzie:</span>
              <button
                onClick={() => setSelectedTool(null)}
                className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-none transition-all cursor-pointer border ${
                  selectedTool === null
                    ? "bg-brand-text text-brand-bg border-brand-text"
                    : "bg-brand-featured-bg text-brand-muted hover:bg-brand-border/30 hover:text-brand-text border-brand-border"
                }`}
              >
                Wszystkie
              </button>
              {tools.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTool(t)}
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-none transition-all cursor-pointer border ${
                    selectedTool === t
                      ? "bg-brand-text text-brand-bg border-brand-text"
                      : "bg-brand-featured-bg text-brand-muted hover:bg-brand-border/30 hover:text-brand-text border-brand-border"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Category Filter Selector */}
            <div className="lg:col-span-3 flex flex-wrap gap-1.5 items-center lg:justify-end">
              <span className="text-[10px] text-brand-muted font-bold mr-1 uppercase tracking-wider">Kategoria:</span>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-none transition-all cursor-pointer border ${
                  selectedCategory === null
                    ? "bg-brand-text text-brand-bg border-brand-text"
                    : "bg-brand-featured-bg text-brand-muted hover:bg-brand-border/30 hover:text-brand-text border-brand-border"
                }`}
              >
                Wszystkie
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-none transition-all cursor-pointer border ${
                    selectedCategory === c
                      ? "bg-brand-text text-brand-bg border-brand-text"
                      : "bg-brand-featured-bg text-brand-muted hover:bg-brand-border/30 hover:text-brand-text border-brand-border"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

          </div>

          {/* Filters summary & Reset button */}
          {(searchQuery || selectedTool || selectedCategory) && (
            <div className="flex justify-between items-center pt-3 border-t border-brand-border text-[10px] text-brand-muted font-mono uppercase tracking-wider">
              <div className="flex flex-wrap items-center gap-2">
                <span>Aktywne filtry:</span>
                {searchQuery && (
                  <span className="px-2 py-0.5 bg-brand-featured-bg border border-brand-border text-brand-text font-bold">
                    Fraza: "{searchQuery}"
                  </span>
                )}
                {selectedTool && (
                  <span className="px-2 py-0.5 bg-brand-featured-bg border border-brand-border text-brand-text font-bold">
                    NarzÄ™dzie: {selectedTool}
                  </span>
                )}
                {selectedCategory && (
                  <span className="px-2 py-0.5 bg-brand-featured-bg border border-brand-border text-brand-text font-bold">
                    Kategoria: {selectedCategory}
                  </span>
                )}
              </div>
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 px-3 py-1 hover:text-brand-text text-brand-muted font-bold transition-colors cursor-pointer"
              >
                <RotateCcw size={11} />
                <span>Resetuj filtry</span>
              </button>
            </div>
          )}
        </div>

        {/* Articles List / Grid */}
        {filteredArticles.length > 0 ? (
          <div className="space-y-10">
            {/* The first filtered article gets a larger layout, rest are in the responsive grid */}
            <div className="hidden lg:block">
              <ArticleCard article={filteredArticles[0]} featured={true} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Show the remaining filtered articles, or all on mobile */}
              {filteredArticles.map((article, index) => {
                // On large screens, skip the first item as it is already featured above
                if (index === 0) {
                  return (
                    <div key={article.id} className="block lg:hidden">
                      <ArticleCard article={article} featured={false} />
                    </div>
                  );
                }
                return (
                  <div key={article.id}>
                    <ArticleCard article={article} featured={false} />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Empty/No results state */
          <div className="bg-brand-card border border-brand-border rounded-none p-16 text-center">
            <div className="w-12 h-12 bg-brand-featured-bg border border-brand-border text-brand-muted flex items-center justify-center rounded-none mx-auto mb-4">
              <Search size={20} />
            </div>
            <h3 className="font-sans font-extrabold text-brand-text text-base uppercase tracking-tight mb-2">Brak wynikĂłw wyszukiwania</h3>
            <p className="text-brand-muted text-xs max-w-sm mx-auto mb-6">
              Nie znaleĹşliĹ›my artykuĹ‚Ăłw speĹ‚niajÄ…cych podane kryteria. SprĂłbuj zmieniÄ‡ filtry lub wyszukiwanÄ… frazÄ™.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-text hover:bg-brand-sage text-brand-bg hover:text-white rounded-none text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Resetuj filtry i szukaj od nowa</span>
            </button>
          </div>
        )}

      </section>

      <WebVitalsDashboard />

      {/* 5. STATS SECTION (Bento grid style) */}
      <section id="stats-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-brand-card border border-brand-border rounded-none p-6 sm:p-8">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-6">
            BLOG W LICZBACH
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-brand-featured-bg p-5 rounded-none border border-brand-border flex flex-col justify-between hover:border-brand-text transition-colors">
              <div className="text-brand-muted mb-2">
                <FileText size={18} />
              </div>
              <div className="mt-4">
                <span className="block text-3xl font-mono font-bold text-brand-text leading-none">
                  {stats.totalArticles}
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mt-2">
                  ArtykuĹ‚Ăłw
                </span>
              </div>
            </div>

            <div className="bg-brand-featured-bg p-5 rounded-none border border-brand-border flex flex-col justify-between hover:border-brand-text transition-colors">
              <div className="text-brand-muted mb-2">
                <Clock size={18} />
              </div>
              <div className="mt-4">
                <span className="block text-3xl font-mono font-bold text-brand-text leading-none">
                  {stats.totalReadTime} <span className="text-sm font-sans font-semibold text-brand-muted">min</span>
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mt-2">
                  Czas czytania
                </span>
              </div>
            </div>

            <div className="bg-brand-featured-bg p-5 rounded-none border border-brand-border flex flex-col justify-between hover:border-brand-text transition-colors">
              <div className="text-brand-muted mb-2">
                <Award size={18} />
              </div>
              <div className="mt-4">
                <span className="block text-3xl font-mono font-bold text-brand-text leading-none">
                  {stats.totalWordCount.toLocaleString()}
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mt-2">
                  Liczba sĹ‚Ăłw
                </span>
              </div>
            </div>

            <div className="bg-brand-featured-bg p-5 rounded-none border border-brand-border flex flex-col justify-between hover:border-brand-text transition-colors">
              <div className="text-brand-muted mb-2">
                <Settings size={18} />
              </div>
              <div className="mt-4">
                <span className="block text-3xl font-mono font-bold text-brand-text leading-none">
                  {stats.uniqueToolsCount}
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mt-2">
                  NarzÄ™dzia AI
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
