export interface DraftMediaItem {
  fileName: string;
  alt: string;
  caption: string;
}

export const DRAFT_MEDIA: Record<string, DraftMediaItem[]> = {
  "2026-07-03-daily-news-07-03": [
    {
      fileName: "2026-07-03-daily-news-07-03-01.webp",
      alt: "Cyfrowy glob i komputer ilustrujące globalny briefing AI i IT",
      caption: "Globalny krajobraz AI i IT — ilustracja redakcyjna wygenerowana na podstawie promptu artykułu.",
    },
    {
      fileName: "2026-07-03-daily-news-07-03-02.webp",
      alt: "Sieciowy model mózgu łączący tekst, obrazy, dźwięk, kod i komunikację",
      caption: "Przepływ danych pomiędzy narzędziami AI — ilustracja redakcyjna wygenerowana na podstawie promptu artykułu.",
    },
  ],
};
