import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Cpu, Github, Linkedin, Mail } from "lucide-react";
import { NewsletterForm } from "./NewsletterForm";
import { KMSygnet } from "./KMSygnet";

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 520);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="WrĂłÄ‡ do gĂłry"
        className={`fixed bottom-5 right-4 z-50 flex h-11 w-11 items-center justify-center border border-brand-text bg-brand-text text-brand-bg shadow-xl transition-all sm:hidden ${
          showBackToTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp size={20} />
      </button>

      <footer id="app-footer" className="bg-[#1A1A1A] text-zinc-400 py-16 border-t border-[#2D2D2D] font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
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
              Kompleksowe kompendium i praktyczne opisy pracy z autonomicznymi agentami AI w realnych projektach. Dowiedz siÄ™, jak orkiestrowaÄ‡ zespoĹ‚y maszyn do pisania czystego kodu.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              <Cpu size={14} className="text-zinc-500" />
              <span>React 19 Â· TypeScript Â· Tailwind v4</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white text-xs font-bold tracking-[0.15em] uppercase mb-5 border-l-2 border-brand-sage pl-3">Nawigacja</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors hover:underline underline-offset-4">Strona gĹ‚Ăłwna</Link>
              </li>
              <li>
                <Link to="/articles" className="hover:text-white transition-colors hover:underline underline-offset-4">Wszystkie artykuĹ‚y</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors hover:underline underline-offset-4">Polityka prywatnoĹ›ci</Link>
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
                <span className="text-zinc-400 hover:text-white transition-colors cursor-default">CODEX Â· Repo Agent</span>
              </li>
              <li>
                <span className="text-zinc-400 hover:text-white transition-colors cursor-default">TRAE Â· Local Editor</span>
              </li>
              <li>
                <span className="text-zinc-400 hover:text-white transition-colors cursor-default">CLAUDE Â· System Architect</span>
              </li>
              <li>
                <span className="text-zinc-400 hover:text-white transition-colors cursor-default">AI STUDIO Â· Wide Context</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-white text-xs font-bold tracking-[0.15em] uppercase mb-5 border-l-2 border-brand-sage pl-3">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:mikolajczykamil@gmail.com" className="inline-flex items-center gap-2 hover:text-white transition-colors hover:underline underline-offset-4">
                  <Mail size={15} />
                  mikolajczykamil@gmail.com
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/kamil-mikolajczyk/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white transition-colors hover:underline underline-offset-4">
                  <Linkedin size={15} />
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/kamillimak" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white transition-colors hover:underline underline-offset-4">
                  <Github size={15} />
                  GitHub
                </a>
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
            &copy; {new Date().getFullYear()} BLOG AI Coding â€” Minimalist Tech Magazine for Modern Engineers
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-white hover:text-zinc-900 text-zinc-400 font-bold uppercase tracking-wider text-[10px] rounded-none border border-zinc-800 hover:border-white transition-colors cursor-pointer"
            aria-label="WrĂłÄ‡ do gĂłry"
          >
            <span>WrĂłÄ‡ do gĂłry</span>
            <ArrowUp size={12} />
          </button>
        </div>
        </div>
      </footer>
    </>
  );
}
