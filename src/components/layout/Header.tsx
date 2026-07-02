import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Github, Compass, Layers, Cloud } from "lucide-react";
import { KMSygnet } from "./KMSygnet";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isLinkActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { to: "/", label: "Strona główna", icon: Compass },
    { to: "/articles", label: "Wszystkie artykuły", icon: Layers },
    { to: "/workspace", label: "Strefa Twórcy", icon: Cloud },
  ];

  return (
    <header id="app-header" className="sticky top-0 z-50 w-full bg-brand-bg/95 backdrop-blur-md border-b border-brand-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo and Title */}
          <div className="flex-shrink-0 flex flex-col justify-center">
            <Link to="/" className="group flex items-center gap-3">
              <div className="group-hover:opacity-85 transition-opacity duration-200">
                <KMSygnet size={44} />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-lg sm:text-xl tracking-tighter uppercase leading-none text-brand-text">
                  Warsztat AI Coding
                </span>
                <span className="font-sans text-[10px] tracking-[0.15em] text-brand-muted font-medium uppercase mt-1 leading-none">
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
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-brand-muted hover:text-brand-text transition-colors"
              aria-label="GitHub Repository"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
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
            
            <a
              href="https://github.com"
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
