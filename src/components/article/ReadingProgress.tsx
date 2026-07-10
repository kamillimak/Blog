import React, { useEffect, useState } from "react";
import { BookOpen, Clock, Check } from "lucide-react";

interface ReadingProgressProps {
  title: string;
  category: string;
  readTime: number;
  scrollProgress: number;
}

export function ReadingProgress({ title, category, readTime, scrollProgress }: ReadingProgressProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleVisibility = () => {
      // Show the compact bar only when we've scrolled down a bit (past the main title header)
      if (window.scrollY > 220) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleVisibility);
    return () => window.removeEventListener("scroll", handleVisibility);
  }, []);

  // Calculate remaining time
  const percentRounded = Math.round(scrollProgress);
  const timeLeft = Math.max(0, Math.ceil(readTime * (1 - scrollProgress / 100)));

  return (
    <>
      {/* 1. Slim Progress Line (Always visible at the very top of page below header) */}
      <div 
        className="fixed top-20 left-0 w-full h-[3px] bg-brand-border/30 z-50 pointer-events-none"
        role="progressbar"
        aria-valuenow={percentRounded}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div 
          className="h-full bg-brand-text transition-[width] duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Premium Floating Progress Bar (Sticky just under the header, fades/slides in on scroll) */}
      <div 
        className={`fixed top-20 left-0 w-full bg-brand-bg border-b border-brand-border py-2.5 z-40 transition-[opacity,transform] duration-300 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest font-bold text-brand-muted">
          
          {/* Left Side: Article Information (Hidden on small screens) */}
          <div className="hidden md:flex items-center gap-3 truncate max-w-[50%]">
            <span className="text-brand-text/90 shrink-0 border border-brand-border px-1.5 py-0.5 bg-brand-featured-bg">
              {category}
            </span>
            <span className="text-brand-text truncate font-sans tracking-tight">
              {title}
            </span>
          </div>

          {/* Fallback Left Side for Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <BookOpen size={13} className="text-brand-text" />
            <span className="text-brand-text tracking-tight font-sans">Czytasz artykuł</span>
          </div>

          {/* Right Side: Progress Stats */}
          <div className="flex items-center gap-5 shrink-0 ml-auto md:ml-0">
            <div className="flex items-center gap-1.5">
              {percentRounded >= 98 ? (
                <>
                  <Check size={12} className="text-emerald-600 font-extrabold" />
                  <span className="text-emerald-600 font-extrabold">Ukończono</span>
                </>
              ) : (
                <>
                  <span className="text-brand-text font-extrabold">{percentRounded}%</span>
                  <span>przeczytane</span>
                </>
              )}
            </div>

            {percentRounded < 98 && (
              <div className="hidden sm:flex items-center gap-1.5 border-l border-brand-border pl-5">
                <Clock size={12} className="opacity-80" />
                <span>Pozostało: <strong className="text-brand-text font-bold">~{timeLeft} min</strong></span>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
