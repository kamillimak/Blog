import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Github, Compass, Layers, Mail, Moon, Sun } from "lucide-react";
import { KMSygnet } from "./KMSygnet";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("blog-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    document.documentElement.classList.toggle("dark", shouldUseDark);
    setIsDarkMode(shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDarkMode;

    document.documentElement.classList.toggle("dark", nextTheme);
    window.localStorage.setItem("blog-theme", nextTheme ? "dark" : "light");
    setIsDarkMode(nextTheme);
  };

  const isLinkActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { to: "/", label: "Strona główna", icon: Compass },
    { to: "/articles", label: "Wszystkie artykuły", icon: Layers },
  ];

  return (
    <header id="app-header" className="sticky top-0 z-50 w-full bg-brand-bg/95 backdrop-blur-md border-b border-brand-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo and Title */}
          <div className="min-w-0 flex flex-col justify-center">
            <Link to="/" className="group flex min-w-0 items-center gap-2 sm:gap-3">
              <div className="shrink-0 group-hover:opacity-85 transition-opacity duration-200">
                <KMSygnet size={38} />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-sans font-bold text-base sm:text-xl tracking-tighter uppercase leading-none text-brand-text">
                  BLOG AI Coding
                </span>
                <span className="hidden min-[380px]:block truncate font-sans text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.15em] text-brand-muted font-medium uppercase mt-1 leading-none">
                  Codex · Trae · Claude · AI Studio
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8 text-sm font-medium tracking-tight">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isLinkActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 py-2 border-b-2 transition-colors ${
                    active
                      ? "text-brand-text border-brand-text font-bold"
                      : "text-brand-muted border-transparent hover:text-brand-text"
                  }`}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
            
            <span className="h-4 w-px bg-brand-border" />

            <a
              href="mailto:mikolajczykamil@gmail.com"
              className="flex items-center gap-2 px-4 py-2 border border-brand-text bg-brand-text text-brand-bg hover:bg-brand-sage hover:text-white hover:border-brand-sage transition-colors font-bold uppercase tracking-wider text-[10px]"
            >
              <Mail size={15} />
              <span>Kontakt</span>
            </a>

            <a
              href="https://github.com/kamillimak/Blog"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-brand-muted hover:text-brand-text transition-colors"
              aria-label="GitHub Repository"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-text transition-colors"
              aria-label={isDarkMode ? "Włącz jasny motyw" : "Włącz ciemny motyw"}
            >
              {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-none text-brand-muted hover:text-brand-text hover:bg-brand-border/30 transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Otwórz menu główne</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-brand-border bg-brand-bg" id="mobile-menu">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isLinkActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-none text-base font-bold uppercase tracking-wide transition-colors ${
                    active
                      ? "bg-brand-text text-brand-bg font-bold"
                      : "text-brand-muted hover:bg-brand-border/30 hover:text-brand-text"
                  }`}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              );
            })}
            
            <hr className="my-2 border-brand-border" />

            <button
              type="button"
              onClick={toggleTheme}
              className="flex w-full items-center gap-3 px-3 py-3 rounded-none text-base font-bold uppercase tracking-wide text-brand-muted hover:bg-brand-border/30 hover:text-brand-text transition-colors"
              aria-label={isDarkMode ? "Włącz jasny motyw" : "Włącz ciemny motyw"}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              <span>{isDarkMode ? "Jasny motyw" : "Ciemny motyw"}</span>
            </button>

            <a
              href="mailto:mikolajczykamil@gmail.com"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-none text-base font-bold uppercase tracking-wide bg-brand-text text-brand-bg hover:bg-brand-sage hover:text-white transition-colors"
            >
              <Mail size={18} />
              <span>Kontakt</span>
            </a>

            <a
              href="https://github.com/kamillimak/Blog"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-none text-base font-bold uppercase tracking-wide text-brand-muted hover:bg-brand-border/30 hover:text-brand-text transition-colors"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
