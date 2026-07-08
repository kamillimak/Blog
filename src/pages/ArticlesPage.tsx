import React, { useState, useMemo, useEffect } from "react";
import { Search, RotateCcw, SlidersHorizontal, Grid } from "lucide-react";
import { ARTICLES } from "../data/articles";
import { ArticleCard } from "../components/article/ArticleCard";
import { filterArticles } from "../utils/article";

export function ArticlesPage() {
  // Set page title for SEO
  useEffect(() => {
    document.title = "Artykuły i przewodniki — BLOG AI Coding";
  }, []);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filtered Articles
  const filteredArticles = useMemo(() => {
    return filterArticles(ARTICLES, searchQuery, selectedTool, selectedCategory);
  }, [searchQuery, selectedTool, selectedCategory]);

  // Unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(ARTICLES.map((a) => a.category)));
  }, []);

  // Unique tools
  const tools = ["Codex", "Trae", "Claude", "AI Studio"];

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedTool(null);
    setSelectedCategory(null);
  };

  return (
    <div className="bg-brand-bg min-h-screen py-12 text-brand-text font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-brand-border pb-8 mb-10">
          <span className="text-[10px] font-bold tracking-[0.2em] text-brand-muted uppercase block mb-2">
            Kompendium Wiedzy
          </span>
          <h1 className="text-4xl font-sans font-extrabold tracking-tight uppercase text-brand-text">
            Artykuły i przewodniki
          </h1>
          <p className="text-brand-muted text-sm mt-2 max-w-2xl leading-relaxed">
            Poznaj szczegółowe omówienia, studia przypadków i techniczne scenariusze integracji agentów AI z codziennym cyklem wytwórczym oprogramowania.
          </p>
        </div>

        {/* Filters Toolbar */}
        <div className="bg-brand-card p-5 border border-brand-border rounded-none space-y-4 mb-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            
            {/* Search */}
            <div className="relative w-full lg:max-w-sm">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-brand-muted pointer-events-none">
                <Search size={15} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Szukaj po tytule, opisie lub tagach..."
                className="w-full pl-9 pr-4 py-2 border border-brand-border rounded-none text-xs bg-brand-featured-bg focus:bg-white focus:outline-none focus:border-brand-text transition-all font-sans text-brand-text"
                aria-label="Wyszukaj artykuły"
              />
            </div>

            {/* Results counter & active tag indicator */}
            <div className="flex items-center gap-2 text-[10px] text-brand-muted font-bold font-mono uppercase tracking-wider bg-brand-featured-bg px-3 py-1.5 rounded-none border border-brand-border self-start lg:self-auto">
              <div className="flex items-center gap-1.5">
                <Grid size={13} className="opacity-80" />
                <span>Znaleziono: <strong className="text-brand-text font-bold text-xs">{filteredArticles.length}</strong></span>
              </div>
            </div>

          </div>

          <hr className="border-brand-border" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tool selection buttons */}
            <div>
              <span className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-2">Filtruj po narzędziu:</span>
              <div className="flex flex-wrap gap-1.5">
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
            </div>

            {/* Category selection buttons */}
            <div>
              <span className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-2">Filtruj po kategorii:</span>
              <div className="flex flex-wrap gap-1.5">
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
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedTool || selectedCategory) && (
            <div className="flex justify-between items-center pt-3 border-t border-brand-border text-[10px] text-brand-muted font-mono uppercase tracking-wider">
              <div className="flex flex-wrap items-center gap-2">
                <SlidersHorizontal size={11} className="opacity-80" />
                <span>Aktywne:</span>
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

        {/* Article Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <div key={article.id}>
                <ArticleCard article={article} featured={false} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-brand-card border border-brand-border rounded-none p-16 text-center">
            <div className="w-12 h-12 bg-brand-featured-bg border border-brand-border text-brand-muted flex items-center justify-center rounded-none mx-auto mb-4">
              <Search size={20} />
            </div>
            <h3 className="font-sans font-extrabold text-brand-text text-base uppercase tracking-tight mb-2">Brak wyników</h3>
            <p className="text-brand-muted text-xs max-w-sm mx-auto mb-6">
              Nie znaleźliśmy artykułów spełniających Twoje kryteria. Spróbuj zmodyfikować filtry lub wyczyścić pole wyszukiwania.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-text hover:bg-brand-sage text-brand-bg hover:text-white rounded-none text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Resetuj filtry i pokaż wszystko</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
