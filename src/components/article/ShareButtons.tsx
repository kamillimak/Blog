import React, { useState } from "react";
import { Copy, Check, Facebook, Linkedin, Share2, Sparkles } from "lucide-react";
import { copyToClipboard } from "../../utils/article";

export interface ShareButtonsProps {
  url: string;
  title: string;
  shareText?: string;
  hashtags?: string[];
  description?: string;
}

export function ShareButtons({
  url,
  title,
  shareText,
  hashtags,
  description
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // Fallback defaults if props are not explicitly set
  const defaultHashtags = ["DziennikBudowy", "AI", "Programowanie"];
  const activeHashtags = hashtags && hashtags.length > 0 ? hashtags : defaultHashtags;

  const fallbackText = description
    ? `${title} — ${description}`
    : `Sprawdź nowy artykuł na blogu: "${title}".`;

  const activeShareText = shareText && shareText.trim().length > 0 ? shareText : fallbackText;

  // Format hashtags with '#' prefix
  const formattedHashtags = activeHashtags
    .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
    .join(" ");

  // Full text formatted for copy & paste on social platforms
  const textToCopy = `${activeShareText}\n\n${title}\n${url}\n\n${formattedHashtags}`;

  const handleCopyText = async () => {
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(fbUrl, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  const handleShareLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  return (
    <section 
      id="social-share-widget" 
      className="my-10 p-6 sm:p-8 border border-brand-border bg-brand-card rounded-none transition-colors"
      aria-label="Udostępnianie w mediach społecznościowych"
    >
      {/* Widget Header */}
      <div className="flex items-center justify-between mb-4 border-b border-brand-border pb-4">
        <div className="flex items-center gap-2">
          <Share2 size={18} className="text-brand-text opacity-90" />
          <h3 className="font-sans font-extrabold uppercase tracking-tight text-sm text-brand-text">
            Udostępnij artykuł w Social Media
          </h3>
        </div>
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-muted border border-brand-border px-2 py-0.5">
          Social Ready
        </span>
      </div>

      {/* Suggested Social Post Preview Box */}
      <div className="mb-6 p-4 bg-brand-featured-bg border border-brand-border rounded-none relative">
        <div className="flex items-center gap-1.5 mb-2 text-[10px] font-mono font-bold uppercase tracking-widest text-brand-muted">
          <Sparkles size={12} className="text-amber-500" />
          <span>Gotowa treść posta do skopiowania</span>
        </div>
        <p className="text-xs sm:text-sm text-brand-text font-sans leading-relaxed whitespace-pre-line select-all">
          {activeShareText}
        </p>
        <div className="mt-3 pt-3 border-t border-brand-border flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
          <span className="text-brand-muted truncate max-w-[280px] sm:max-w-xs">{url}</span>
          <span className="text-brand-sage font-bold">{formattedHashtags}</span>
        </div>
      </div>

      {/* UX Hint / Guideline */}
      <div className="mb-5 flex items-start gap-2 text-[11px] text-brand-muted font-mono bg-brand-bg/50 p-2.5 border border-brand-border/60">
        <span className="text-brand-text font-bold uppercase tracking-wider">Wskazówka UX:</span>
        <span>Skopiuj tekst, wklej go w oknie posta, dopiero potem kliknij Udostępnij.</span>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* 1. Primary Copy Text Button (ALWAYS First / Most Prominent) */}
        <button
          onClick={handleCopyText}
          className={`sm:col-span-1 flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-none text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-sm ${
            copied
              ? "bg-emerald-700 text-white border border-emerald-600"
              : "bg-brand-text text-brand-bg hover:bg-brand-sage hover:text-white border border-brand-text"
          }`}
          title="Kopiuj przygotowany tekst posta z linkiem i hashtagami"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? "Skopiowano!" : "Kopiuj tekst posta"}</span>
        </button>

        {/* 2. Udostępnij na Facebooku */}
        <button
          onClick={handleShareFacebook}
          className="flex items-center justify-center gap-2 px-4 py-3.5 bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/40 rounded-none text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
          title="Otwórz okno udostępniania na Facebooku"
        >
          <Facebook size={16} />
          <span>Facebook</span>
        </button>

        {/* 3. Udostępnij na LinkedIn */}
        <button
          onClick={handleShareLinkedIn}
          className="flex items-center justify-center gap-2 px-4 py-3.5 bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white border border-[#0A66C2]/40 rounded-none text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
          title="Otwórz okno udostępniania na LinkedIn"
        >
          <Linkedin size={16} />
          <span>LinkedIn</span>
        </button>
      </div>
    </section>
  );
}
