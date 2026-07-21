import React from "react";
import { Linkedin, Github, Mail, Sparkles, MessageSquare } from "lucide-react";

export function ArticleCTA() {
  return (
    <section className="my-12 border border-brand-border bg-brand-card p-6 sm:p-8 rounded-none transition-colors relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-brand-featured-bg border border-brand-border text-[10px] font-bold font-mono uppercase tracking-widest text-brand-muted">
            <Sparkles size={12} className="text-amber-500" />
            <span>Co dalej?</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-sans font-extrabold uppercase tracking-tight text-brand-text">
            Podobał Ci się ten wpis?
          </h3>

          <p className="text-brand-muted text-xs sm:text-sm leading-relaxed font-sans">
            Śledzę i testuję AI na bieżąco – zerknij na mój profil na LinkedIn po więcej codziennych wniosków i analiz, albo sprawdź kod moich projektów na GitHubie. Masz pytanie lub pomysł na współpracę?
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
          <a
            href="https://www.linkedin.com/in/kamilmikolajczyk/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-text hover:bg-brand-sage text-brand-bg hover:text-white text-xs font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer"
          >
            <Linkedin size={15} />
            <span>Obserwuj na LinkedIn</span>
          </a>

          <a
            href="https://github.com/kamillimak"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-brand-border hover:border-brand-text bg-brand-featured-bg hover:bg-white text-brand-text text-xs font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer"
          >
            <Github size={15} />
            <span>Zobacz GitHub</span>
          </a>

          <a
            href="mailto:mikolajczykamil@gmail.com"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-brand-text text-brand-text hover:bg-brand-text hover:text-brand-bg text-xs font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer"
          >
            <Mail size={15} />
            <span>Napisz do mnie</span>
          </a>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-brand-border flex items-center gap-2 text-[10px] font-mono text-brand-muted uppercase tracking-wider">
        <MessageSquare size={12} className="opacity-75" />
        <span>Otwarty na rozmowy o projektach AI, automatyzacjach i doradztwie.</span>
      </div>
    </section>
  );
}
