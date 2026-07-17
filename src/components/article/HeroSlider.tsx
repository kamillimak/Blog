import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Code2 } from "lucide-react";
import { ARTICLES } from "../../data/articles";
import { NEWSROOM_VIDEOS } from "../../data/newsFeed";
import { formatPolishDate } from "../../utils/article";
import { shouldReduceMotion } from "../../utils/motion";

type HeroSlide = {
  id: string;
  label: string;
  title: string;
  description: string;
  publishedAt: string;
  video: string;
  articleSlug: string;
};

const slideDurationMs = 7000;
const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(shouldReduceMotion());
  }, []);

  const slides = useMemo<HeroSlide[]>(() => {
    const featuredArticle = ARTICLES.find((article) => article.featured);
    const remainingArticles = ARTICLES
      .filter((article) => article.id !== featuredArticle?.id)
      .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));

    return [featuredArticle, ...remainingArticles]
      .filter((article): article is (typeof ARTICLES)[number] => Boolean(article))
      .slice(0, 5)
      .map((article, index) => ({
        id: `article-${article.id}`,
        label: article.slug === "pierwsze-kroki-z-antygravity" ? "NEW" : (article.featured ? "Polecany artykuł" : "Artykuł"),
        title: article.title,
        description: article.description,
        publishedAt: article.publishedAt,
        video: NEWSROOM_VIDEOS[index % NEWSROOM_VIDEOS.length],
        articleSlug: article.slug,
      }));
  }, []);

  useEffect(() => {
    if (reducedMotion || slides.length < 2) return;
    const slideTimer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, slideDurationMs);

    return () => window.clearTimeout(slideTimer);
  }, [activeIndex, reducedMotion, slides.length]);

  const activeSlide = slides[activeIndex];
  if (!activeSlide) return null;

  const move = (direction: number) => setActiveIndex((current) => (current + direction + slides.length) % slides.length);

  return (
    <div id="hero-slider" className="relative min-h-[460px] w-full max-w-full overflow-hidden border border-indigo-500/70 bg-black text-white sm:min-h-[520px]" aria-roledescription="carousel" aria-label="Najważniejsze artykuły">
      <video key={activeSlide.video} className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700" src={assetUrl(activeSlide.video)} autoPlay={!reducedMotion} muted loop playsInline preload="metadata" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/38 to-black/5" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/78 via-black/25 to-transparent" />

      <div className="relative z-10 flex min-h-[460px] flex-col justify-between p-4 sm:min-h-[520px] sm:p-8 lg:p-10">
        <div className="flex items-center justify-end border-b border-white/15 pb-4 md:justify-between md:pb-5">
          <div className="hidden flex-wrap items-center gap-2 md:flex" aria-label="Artykuły w sliderze">
            {slides.map((slide, index) => (
              <button key={slide.id} type="button" onClick={() => setActiveIndex(index)} aria-current={index === activeIndex} className={`inline-flex items-center gap-2 border px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${
                index === activeIndex 
                  ? (slide.label === "NEW" ? "border-amber-400 bg-amber-500 text-black" : "border-indigo-400 bg-indigo-500 text-white") 
                  : "border-white/20 bg-black/35 text-white/70 hover:border-white/45 hover:text-white"
              }`}>
                <Code2 size={13} /> {slide.label}
              </button>
            ))}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
        </div>
 
        <div className="grid gap-6 py-7 sm:py-10 lg:grid-cols-12 lg:items-end">
          <div className="max-w-3xl lg:col-span-8">
            <span className={`inline-flex items-center gap-2 border px-2.5 py-1.5 text-[9px] font-black uppercase tracking-widest text-white sm:px-3 sm:text-[10px] ${
              activeSlide.label === "NEW" ? "border-amber-400 bg-amber-500 text-black font-extrabold" : "border-indigo-400 bg-indigo-500"
            }`}><Code2 size={13} />{activeSlide.label}</span>
            <h2 className="mt-4 max-w-full text-2xl font-extrabold uppercase leading-[1] tracking-tight text-white sm:mt-5 sm:text-5xl lg:text-6xl">{activeSlide.title}</h2>
            <p className="mt-4 max-w-2xl text-xs leading-relaxed text-zinc-200 sm:mt-5 sm:text-base">{activeSlide.description}</p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <time dateTime={activeSlide.publishedAt} className="mb-5 flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-zinc-300"><Calendar size={13} /> {formatPolishDate(activeSlide.publishedAt)}</time>
            <Link to={`/articles/${activeSlide.articleSlug}`} className="inline-flex items-center gap-2 bg-white px-5 py-3 text-[10px] font-black uppercase tracking-widest text-black transition-colors hover:bg-indigo-600">Czytaj materiał <ArrowRight size={14} /></Link>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-white/15 pt-4">
          <div className="flex min-w-0 flex-1 flex-wrap gap-1.5 sm:gap-2" aria-label="Wybór slajdu">
            {slides.map((slide, index) => <button key={slide.id} type="button" onClick={() => setActiveIndex(index)} aria-label={`Slajd ${index + 1}: ${slide.title}`} aria-current={index === activeIndex} className={`h-2.5 w-6 border border-white/25 transition-colors sm:w-10 ${index === activeIndex ? "bg-indigo-500" : "bg-white/20"}`} />)}
          </div>
          <div className="flex shrink-0 gap-1">
            <button type="button" onClick={() => move(-1)} aria-label="Poprzedni slajd" className="border border-white/20 p-2 text-white hover:border-white"><ChevronLeft size={16} /></button>
            <button type="button" onClick={() => move(1)} aria-label="Następny slajd" className="border border-white/20 p-2 text-white hover:border-white"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
