import React, { useState, useEffect } from "react";
import { X, Copy, Check, Facebook, Linkedin, Share2, Sparkles } from "lucide-react";
import { copyToClipboard } from "../../utils/article";

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  summary: string;
  url: string;
  categoryLabel?: string;
  hashtags?: string[];
}

export function ShareModal({
  isOpen,
  onClose,
  title,
  summary,
  url,
  categoryLabel,
  hashtags = ["DziennikBudowy", "Newsroom", "AI", "TechNews"]
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formattedHashtags = hashtags
    .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
    .join(" ");

  const shareText = `${title}\n\n${summary}`;
  const textToCopy = `${shareText}\n\n${url}\n\n${formattedHashtags}`;

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
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div className="bg-brand-card border border-brand-border p-6 sm:p-8 max-w-lg w-full relative shadow-2xl rounded-none font-sans text-brand-text max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-brand-muted hover:text-brand-text hover:bg-brand-featured-bg transition-colors cursor-pointer"
          aria-label="Zamknij okno"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-4 border-b border-brand-border pb-4 pr-8">
          <Share2 size={18} className="text-orange-500 shrink-0" />
          <div>
            <h3 id="share-modal-title" className="font-extrabold uppercase tracking-tight text-sm text-brand-text">
              Udostępnij news w Social Media
            </h3>
            {categoryLabel && (
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-muted">
                Kategoria: {categoryLabel}
              </span>
            )}
          </div>
        </div>

        {/* Preview Box */}
        <div className="mb-5 p-4 bg-brand-featured-bg border border-brand-border rounded-none relative">
          <div className="flex items-center gap-1.5 mb-2 text-[10px] font-mono font-bold uppercase tracking-widest text-brand-muted">
            <Sparkles size={12} className="text-amber-500" />
            <span>Gotowa treść do skopiowania</span>
          </div>
          <p className="text-xs sm:text-sm text-brand-text font-sans leading-relaxed whitespace-pre-line select-all font-medium">
            {shareText}
          </p>
          <div className="mt-3 pt-3 border-t border-brand-border flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
            <span className="text-brand-muted truncate max-w-[240px] sm:max-w-xs">{url}</span>
            <span className="text-brand-sage font-bold">{formattedHashtags}</span>
          </div>
        </div>

        {/* UX Tip */}
        <div className="mb-5 flex items-start gap-2 text-[11px] text-brand-muted font-mono bg-brand-bg/60 p-2.5 border border-brand-border/60">
          <span className="text-brand-text font-bold uppercase tracking-wider shrink-0">Podpowiedź UX:</span>
          <span>Skopiuj tekst, wklej go w oknie posta, dopiero potem kliknij Udostępnij.</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* 1. Primary Copy Button */}
          <button
            onClick={handleCopyText}
            className={`w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-none text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-sm ${
              copied
                ? "bg-emerald-700 text-white border border-emerald-600"
                : "bg-brand-text text-brand-bg hover:bg-brand-sage hover:text-white border border-brand-text"
            }`}
            title="Kopiuj tekst posta z hashtagami i linkiem"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? "Skopiowano!" : "Kopiuj tekst posta"}</span>
          </button>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {/* 2. Facebook */}
            <button
              onClick={handleShareFacebook}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/40 rounded-none text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
              title="Udostępnij na Facebooku"
            >
              <Facebook size={16} />
              <span>Facebook</span>
            </button>

            {/* 3. LinkedIn */}
            <button
              onClick={handleShareLinkedIn}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white border border-[#0A66C2]/40 rounded-none text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
              title="Udostępnij na LinkedIn"
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
