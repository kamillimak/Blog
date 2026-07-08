import React from "react";
import { Link } from "react-router-dom";
import { Cpu, ArrowUp } from "lucide-react";
import { NewsletterForm } from "./NewsletterForm";
import { KMSygnet } from "./KMSygnet";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="app-footer" className="bg-[#1A1A1A] text-zinc-400 py-16 border-t border-[#2D2D2D] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6 text-white">
              <KMSygnet size={40} />
              <div className="flex flex-col flex-shrink-0">
                <span className="font-sans font-extrabold tracking-tighter text-lg uppercase leading-none">
                  BLOG AI Coding
                </span>
                <span className="font-mono text-[9px] tracking-[0.15em] text-zinc-500 uppercase mt-1 leading-none">
                  Premium Tech Magazine
                </span>
              </div>
            </div>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              Kompleksowe kompendium i praktyczne opisy pracy z autonomicznymi agentami AI w realnych projektach. Dowiedz się, jak orkiestrować zespoły maszyn do pisania czystego kodu.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              <Cpu size={14} className="text-zinc-500" />
              <span>React 19 · TypeScript · Tailwind v4</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white text-xs font-bold tracking-[0.15em] uppercase mb-5 border-l-2 border-brand-sage pl-3">Nawigacja</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors hover:underline underline-offset-4">Strona główna</Link>
              </li>
              <li>
                <Link to="/articles" className="hover:text-white transition-colors hover:underline underline-offset-4">Wszystkie artykuły</Link>
              </li>
              <li>
                <a href="https://github.com/kamillimak/Blog" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:underline underline-offset-4">Repozytorium GitHub</a>
              </li>
            </ul>
          </div>

          {/* Tools Info */}
          <div className="col-span-1">
            <h3 className="text-white text-xs font-bold tracking-[0.15em] uppercase mb-5 border-l-2 border-brand-sage pl-3">Ekosystem AI</h3>
            <ul className="space-y-3 text-xs font-mono tracking-wide">
              <li>
                <span className="text-zinc-400 hover:text-white transition-colors cursor-default">CODEX · Repo Agent</span>
              </li>
              <li>
                <span className="text-zinc-400 hover:text-white transition-colors cursor-default">TRAE · Local Editor</span>
              </li>
              <li>
                <span className="text-zinc-400 hover:text-white transition-colors cursor-default">CLAUDE · System Architect</span>
              </li>
              <li>
                <span className="text-zinc-400 hover:text-white transition-colors cursor-default">AI STUDIO · Wide Context</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <NewsletterForm />
          </div>

        </div>

        <hr className="my-10 border-[#2D2D2D]" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs tracking-wider font-mono">
          <div className="text-zinc-500 uppercase">
            &copy; {new Date().getFullYear()} BLOG AI Coding — Minimalist Tech Magazine for Modern Engineers
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-white hover:text-zinc-900 text-zinc-400 font-bold uppercase tracking-wider text-[10px] rounded-none border border-zinc-800 hover:border-white transition-colors cursor-pointer"
            aria-label="Wróć do góry"
          >
            <span>Wróć do góry</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
