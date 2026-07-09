import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="bg-brand-bg min-h-[70vh] flex items-center justify-center py-20 px-4 text-brand-text">
      <div
        id="notfound-card"
        className="max-w-md w-full bg-brand-card border border-brand-border rounded-none p-8 sm:p-10 text-center"
      >
        <div className="w-16 h-16 bg-brand-featured-bg text-brand-text border border-brand-border flex items-center justify-center rounded-none mx-auto mb-6">
          <span className="font-mono text-2xl font-extrabold">404</span>
        </div>

        <h1 className="font-sans font-extrabold text-2xl text-brand-text uppercase mb-3 tracking-tight">
          Nie znaleziono strony
        </h1>
        <p className="text-brand-muted text-xs leading-relaxed mb-8 font-sans">
          Przepraszamy, ale strona o podanym adresie URL nie istnieje w blogu AI w praktyce. Mogła zostać przeniesiona lub usunięta.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-text hover:bg-brand-sage text-brand-bg hover:text-white font-bold uppercase tracking-widest text-[10px] rounded-none transition-colors cursor-pointer"
          >
            <Compass size={14} />
            <span>Wróć do strony głównej</span>
          </Link>
          <Link
            to="/articles"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-featured-bg hover:bg-brand-border/30 text-brand-text font-bold uppercase tracking-widest text-[10px] border border-brand-border rounded-none transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Wszystkie wpisy</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
