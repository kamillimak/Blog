import React, { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, RotateCcw, Award, Clock, FileText, Settings, ArrowRight, BriefcaseBusiness, Mail, Newspaper, Users, Linkedin, Github, Sparkles, Star } from "lucide-react";
import { ARTICLES } from "../data/articles";
import { ArticleCard } from "../components/article/ArticleCard";
import { getGlobalStats, filterArticles } from "../utils/article";
import { DailyBriefing } from "../components/article/DailyBriefing";
import { CinematicHero } from "../components/article/CinematicHero";
import { WebVitalsDashboard } from "../components/analytics/WebVitalsDashboard";
import { AIContentDashboard } from "../components/article/AIContentDashboard";

export function HomePage() {
  const location = useLocation();

  // Set page title for SEO
  useEffect(() => {
    document.title = "Blog technologiczny — Codex · Trae · Claude · AI Studio";
  }, []);

  // Programmatic scroll helper for cross-page hash navigations
  useEffect(() => {
    if (location.state && (location.state as any).scrollTo === "daily-briefing-section") {
      setTimeout(() => {
        const el = document.getElementById("daily-briefing-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }
  }, [location]);

  // Dynamic design switcher
  const [concept, setConcept] = useState<"editorial" | "dashboard">(
    (import.meta.env.VITE_CONCEPT as "editorial" | "dashboard") || "editorial"
  );

  // Stats
  const stats = useMemo(() => getGlobalStats(ARTICLES), []);

  const agentCards = useMemo(() => {
    const isEditorial = concept === "editorial";
    return [
      {
        step: "01",
        tag: "01_studio",
        title: "AI Studio",
        desc: "Mapa i kontekst. Skanowanie całego repozytorium, analiza architektury, wykrywanie zależności i tworzenie globalnej strategii.",
        color: isEditorial ? "text-brand-sage" : "text-sky-500",
        glowColor: isEditorial ? "rgba(90, 90, 64, 0.06)" : "rgba(14, 165, 233, 0.12)"
      },
      {
        step: "02",
        tag: "02_claude",
        title: "Claude",
        desc: "Projekt architektury. Projektowanie struktur danych, ścisłe typowanie TypeScript, wybór bibliotek i planowanie refaktoryzacji.",
        color: isEditorial ? "text-brand-sage" : "text-amber-500",
        glowColor: isEditorial ? "rgba(90, 90, 64, 0.06)" : "rgba(245, 158, 11, 0.12)"
      },
      {
        step: "03",
        tag: "03_codex",
        title: "Codex",
        desc: "Praca w repozytorium. Autonomiczne generowanie modułów, łączenie plików, pisanie testów jednostkowych i linter-walidacja.",
        color: isEditorial ? "text-brand-sage" : "text-indigo-500",
        glowColor: isEditorial ? "rgba(90, 90, 64, 0.06)" : "rgba(99, 102, 241, 0.12)"
      },
      {
        step: "04",
        tag: "04_trae",
        title: "Trae",
        desc: "Wykończenie i UI. Szybkie, lokalne poprawki w edytorze, iterowanie stylów Tailwind CSS, obsługa zdarzeń i dopieszczanie mikro-detali.",
        color: isEditorial ? "text-brand-sage" : "text-emerald-500",
        glowColor: isEditorial ? "rgba(90, 90, 64, 0.06)" : "rgba(16, 185, 129, 0.12)"
      }
    ];
  }, [concept]);

  // Hand-picked / Curated recommended articles
  const curatedArticles = useMemo(() => {
    return ARTICLES.filter((a) => a.featured || a.id === "1" || a.id === "2").slice(0, 3);
  }, []);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className={`min-h-screen pb-20 font-sans transition-colors duration-500 ${
      concept === "dashboard" ? "dashboard-concept bg-[#07080a] text-zinc-100 dark" : "bg-brand-bg text-brand-text"
    }`}>
      
      {/* 1. CINEMATIC HERO SECTION */}
      <CinematicHero concept={concept} />

      {/* AI News Section */}
      {concept === "editorial" ? <DailyBriefing /> : <AIContentDashboard />}

      {/* 4. LIBRARY ARTICLES SECTION (Filters + Grid) */}
      <section id="library-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 scroll-mt-24">
        
        <div className="border-b border-brand-border pb-5 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight uppercase text-brand-text">
              Biblioteka artykułów
            </h2>
            <p className="text-brand-muted text-xs mt-1">
              Przeszukuj, filtruj i odkrywaj artykuły na podstawie narzędzi i kategorii.
            </p>
          </div>
          
          <div className="text-[10px] text-brand-muted font-bold font-mono uppercase tracking-wider bg-brand-featured-bg px-3 py-1.5 rounded-none border border-brand-border self-start md:self-auto">
            Pokazano: <span className="text-brand-text font-bold text-xs">{filteredArticles.length}</span> z {ARTICLES.length} wpisów
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
                placeholder="Szukaj artykułu, tagu..."
                className="w-full pl-9 pr-4 py-2 border border-brand-border rounded-none text-xs bg-brand-featured-bg focus:bg-white focus:outline-none focus:border-brand-text transition-colors font-sans text-brand-text"
                aria-label="Wyszukaj artykuły"
              />
            </div>

            {/* Tool Filter Selector */}
            <div className="lg:col-span-5 flex flex-wrap gap-1.5 items-center">
              <span className="text-[10px] text-brand-muted font-bold mr-1 uppercase tracking-wider">Narzędzie:</span>
              <button
                onClick={() => setSelectedTool(null)}
                className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer border ${
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
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer border ${
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
                className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer border ${
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
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer border ${
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
                    Narzędzie: {selectedTool}
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
            <h3 className="font-sans font-extrabold text-brand-text text-base uppercase tracking-tight mb-2">Brak wyników wyszukiwania</h3>
            <p className="text-brand-muted text-xs max-w-sm mx-auto mb-6">
              Nie znaleźliśmy artykułów spełniających podane kryteria. Spróbuj zmienić filtry lub wyszukiwaną frazę.
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

      {/* Audience Section */}
      <section id="audience-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="border-y border-brand-border py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-brand-muted uppercase block mb-3">
                Dla kogo jest ten blog
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight uppercase text-brand-text">
                Dla osób, które chcą rozumieć AI w praktyce, nie tylko w teorii
              </h2>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: BriefcaseBusiness,
                  title: "Liderzy i PM/PO",
                  text: "Scenariusze użycia AI w procesach, backlogach, analizie i komunikacji z zespołem."
                },
                {
                  icon: Users,
                  title: "Twórcy AI-native",
                  text: "Workflow, automatyzacje i narzędzia, które pomagają zamieniać pomysły w prototypy."
                },
                {
                  icon: Newspaper,
                  title: "Osoby śledzące tech",
                  text: "Newsroom AI, TOP 3 i briefing trendów z podziałem na Polskę i świat."
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
        <div className="bg-brand-card border border-brand-border rounded-none overflow-hidden transition-all shadow-sm">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-brand-featured-bg border-b border-brand-border font-mono text-[10px] text-brand-muted">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 opacity-90"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 opacity-90"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 opacity-90"></span>
            </div>
            <span className="font-bold tracking-wider uppercase">agent_pipeline — zsh</span>
            <span className="opacity-0 w-10"></span>
          </div>

          <div className="p-8 sm:p-10 space-y-8">
            <div className="max-w-3xl">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-brand-sage uppercase block mb-3">
                Koncepcja i synergia
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-text uppercase mb-4">
                Jeden proces, cztery wyspecjalizowane role
              </h2>
              <p className="text-brand-muted text-sm leading-relaxed">
                Nowoczesny twórca i orkiestrator AI nie polega na jednym asystencie. Skuteczność polega na rozdzielaniu zadań według mocnych stron poszczególnych modeli, tworząc zintegrowany łańcuch dostarczania kodu i aplikacji.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {agentCards.map((item) => (
                <div 
                  key={item.step} 
                  onMouseMove={handleMouseMove}
                  style={{ "--glow-color": item.glowColor } as React.CSSProperties}
                  className="bg-brand-featured-bg border border-brand-border p-6 hover:border-brand-sage transition-all duration-300 flex flex-col justify-between group spotlight-card overflow-hidden hover:-translate-y-1.5 hover:shadow-md cursor-default"
                >
                  <div>
                    <div className="w-8 h-8 bg-brand-bg text-brand-muted border border-brand-border flex items-center justify-center font-mono font-bold text-xs mb-4 group-hover:border-brand-text group-hover:text-brand-text transition-colors">
                      {item.step}
                    </div>
                    <span className="font-mono text-[9px] text-brand-muted uppercase block tracking-widest mb-1.5">
                      {item.tag}
                    </span>
                    <h3 className={`font-serif font-extrabold uppercase tracking-tight text-sm mb-3 ${item.color}`}>
                      {item.title}
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Author Section - Combined Console/Magazine styling */}
      <section id="author-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="border-t border-brand-border pt-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            <div className="author-photo-frame shrink-0 shadow-lg shadow-black/25 relative group overflow-hidden">
              <img src={profileImage} alt="Kamil Mikołajczyk" />
              {concept === "dashboard" && <div className="scan-line" />}
              {/* Editorial Labels Overlay (blog-preview-11 inspired) */}
              <span className="absolute top-2 left-2 bg-black/75 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-white border border-white/10 select-none">
                [PM/PO]
              </span>
              <span className="absolute top-2 right-2 bg-black/75 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-white border border-white/10 select-none">
                [ORCHESTRATOR]
              </span>
              <span className="absolute bottom-2 left-2 bg-black/75 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-white border border-white/10 select-none">
                [AI-NATIVE]
              </span>
              <span className="absolute bottom-2 right-2 bg-black/75 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-white border border-white/10 select-none">
                [LOC: PL]
              </span>
            </div>
            <div className="flex-grow space-y-4 text-center md:text-left">
              <div className="text-[10px] font-mono font-bold tracking-[0.2em] text-brand-sage uppercase">
                ./whoami.sh
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-text">
                Kamil Mikołajczyk
              </h3>
              <p className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider">
                Senior IT Project Manager / Product Owner
              </p>
              <p className="text-sm text-brand-muted leading-relaxed max-w-2xl">
                Orkiestruję zespół czterech agentów AI (Codex, Trae, Claude i AI Studio) tak samo, jak profesjonalne zespoły produktowe — definiując role, granice odpowiedzialności i dbając o precyzyjne przekazywanie kontekstu w środowiskach produkcyjnych.
              </p>
              <div className="flex justify-center md:justify-start gap-4 pt-2">
                <a
                  href="https://www.linkedin.com/in/kamil-mikolajczyk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-text transition-colors border border-brand-border bg-brand-card px-3 py-1.5 hover:border-brand-text"
                >
                  <Linkedin size={14} className="text-brand-sage" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/kamillimak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-text transition-colors border border-brand-border bg-brand-card px-3 py-1.5 hover:border-brand-text"
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
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
                  Artykułów
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
                  Liczba słów
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
                  Narzędzia AI
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Concept Preview Switcher - hidden in hardcoded static builds */}
      {!import.meta.env.VITE_CONCEPT && (
        <div className="fixed bottom-6 right-6 z-[100] bg-zinc-900 text-zinc-100 border border-zinc-800 p-2 shadow-2xl backdrop-blur-md flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider rounded-none">
          <span className="text-zinc-500 font-bold px-2 select-none border-r border-zinc-800 pr-3">Podgląd:</span>
          <button
            onClick={() => setConcept("editorial")}
            className={`px-3 py-1.5 transition-colors cursor-pointer rounded-none border ${
              concept === "editorial"
                ? "bg-white text-black border-white font-bold"
                : "bg-transparent text-zinc-400 border-transparent hover:text-white"
            }`}
          >
            Editorial Slate
          </button>
          <button
            onClick={() => setConcept("dashboard")}
            className={`px-3 py-1.5 transition-colors cursor-pointer rounded-none border ${
              concept === "dashboard"
                ? "bg-sky-500 text-black border-sky-500 font-bold"
                : "bg-transparent text-zinc-400 border-transparent hover:text-white"
            }`}
          >
            Cyber Dashboard
          </button>
        </div>
      )}

    </div>
  );
}
