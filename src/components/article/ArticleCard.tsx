import React from "react";
import { Link } from "react-router-dom";
import { Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";
import { Article } from "../../types/article";
import { ArticleIllustration } from "./ArticleIllustration";
import { formatPolishDate } from "../../utils/article";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  // Map tools to their unique accent colors
  const toolColors = {
    Codex: "text-[#4F46E5]",
    Trae: "text-[#059669]",
    Claude: "text-[#EA580C]",
    "AI Studio": "text-[#0284c7]"
  };

  const accentColor = toolColors[article.tool] || "text-brand-text";

  if (featured) {
    return (
      <div 
        id={`featured-card-${article.slug}`}
        className="group relative bg-brand-featured-bg border border-brand-border rounded-none overflow-hidden hover:border-brand-text transition-[border-color,box-shadow,transform] duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-8"
      >
        {/* Visual Header / Illustration */}
        <div className="lg:col-span-7 w-full flex items-center justify-center border-b lg:border-b-0 lg:border-r border-brand-border pb-6 lg:pb-0 lg:pr-8">
          <Link to={`/articles/${article.slug}`} className="w-full h-full block">
            <ArticleIllustration imageKey={article.heroImage} className="transition-transform duration-500 group-hover:scale-[1.01]" />
          </Link>
        </div>

        {/* Text Details */}
        <div className="lg:col-span-5 flex flex-col justify-between py-2">
          <div>
            {article.status === "DRAFT" && (
              <span className="inline-flex mb-4 border border-amber-500 bg-amber-500/10 px-2 py-1 text-[10px] font-black tracking-widest text-amber-600 uppercase">
                DRAFT
              </span>
            )}
            {/* Meta tags and categories */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <span className={`text-[10px] font-extrabold uppercase tracking-widest ${accentColor}`}>
                {article.tool}
              </span>
              <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest border-b border-brand-border pb-0.5">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <Link to={`/articles/${article.slug}`}>
              <h2 className="text-3xl font-sans font-bold tracking-tight text-brand-text group-hover:underline underline-offset-4 decoration-brand-sage transition-colors mb-4 leading-tight">
                {article.title}
              </h2>
            </Link>

            {/* Subtitle / Description */}
            <p className="text-brand-muted text-sm leading-relaxed mb-6 font-sans">
              {article.description}
            </p>
          </div>

          <div>
            {/* Author and Reading Stats */}
            <div className="flex items-center gap-4 border-t border-brand-border pt-6 mb-5">
              <div className="w-9 h-9 rounded-none bg-brand-text text-brand-bg font-mono text-[11px] font-extrabold flex items-center justify-center">
                {article.author.avatar}
              </div>
              <div>
                <span className="block text-xs font-extrabold text-brand-text uppercase tracking-wide leading-none">{article.author.name}</span>
                <span className="block text-[10px] text-brand-muted uppercase tracking-wide mt-1 leading-none">{article.author.role}</span>
              </div>
            </div>

            {/* Bottom metadata panel */}
            <div className="flex items-center justify-between text-[11px] text-brand-muted font-mono uppercase tracking-wider">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="opacity-80" />
                  {formatPolishDate(article.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="opacity-80" />
                  {article.readTime} min
                </span>
              </div>
              
              <Link 
                to={`/articles/${article.slug}`}
                className="flex items-center gap-1 font-bold text-brand-text border-b border-brand-text hover:border-transparent transition-colors"
              >
                <span>Czytaj</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article 
      id={`article-card-${article.slug}`}
      className="group bg-brand-card border border-brand-border rounded-none overflow-hidden hover:border-brand-text transition-[border-color,box-shadow,transform] duration-300 flex flex-col h-full"
    >
      {/* Card Image / Illustration */}
      <Link to={`/articles/${article.slug}`} className="block overflow-hidden relative border-b border-brand-border">
        <ArticleIllustration imageKey={article.heroImage} className="rounded-none transition-transform duration-500 group-hover:scale-[1.02]" />
      </Link>

      {/* Card Body */}
      <div className="p-6 flex flex-col justify-between flex-grow bg-brand-card">
        <div>
          {article.status === "DRAFT" && (
            <span className="inline-flex mb-3 border border-amber-500 bg-amber-500/10 px-2 py-1 text-[10px] font-black tracking-widest text-amber-600 uppercase">
              DRAFT
            </span>
          )}
          {/* Badges */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className={`text-[10px] font-extrabold uppercase tracking-widest ${accentColor}`}>
              {article.tool}
            </span>
            <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <Link to={`/articles/${article.slug}`}>
            <h3 className="text-xl font-sans font-bold tracking-tight text-brand-text group-hover:underline underline-offset-4 decoration-brand-sage transition-colors mb-3 line-clamp-2 leading-snug">
              {article.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-brand-muted text-xs leading-relaxed mb-6 font-sans line-clamp-3">
            {article.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="border-t border-brand-border pt-4 mt-auto">
          <div className="flex items-center justify-between text-[10px] text-brand-muted font-mono uppercase tracking-wider mb-4">
            <span className="flex items-center gap-1">
              <Calendar size={12} className="opacity-80" />
              {formatPolishDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} className="opacity-80" />
              {article.readTime} min
            </span>
          </div>
          
          <div className="flex justify-between items-center pt-1">
            <div className="flex items-center gap-2">
              <div className="w-6.5 h-6.5 rounded-none bg-brand-text text-brand-bg font-mono text-[9px] font-extrabold flex items-center justify-center">
                {article.author.avatar}
              </div>
              <span className="text-[10px] font-extrabold text-brand-text uppercase tracking-wide">{article.author.name}</span>
            </div>

            <Link 
              to={`/articles/${article.slug}`}
              className="flex items-center gap-1 text-[10px] font-extrabold text-brand-text border-b border-brand-text hover:border-transparent transition-colors"
            >
              <span>Czytaj</span>
              <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
