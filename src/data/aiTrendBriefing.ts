export interface TrendBriefingItem {
  id: string;
  title: string;
  summary: string;
  sourceLabel: string;
  sourceUrl: string;
}

export interface TrendBriefingCategory {
  id: "news" | "crime" | "business";
  title: string;
  description: string;
  items: TrendBriefingItem[];
}

export const AI_TREND_BRIEFING_DATE = "2026-07-09";

export const AI_TREND_BRIEFING: TrendBriefingCategory[] = [
  {
    id: "news",
    title: "Top 3 newsy ze świata AI",
    description: "Najnowsze sygnały produktowe, kosztowe i rynkowe z wiarygodnych źródeł.",
    items: [
      {
        id: "gpt-56-public-rollout",
        title: "GPT-5.6 wychodzi szerzej na rynek",
        summary: "Axios opisuje rozszerzenie rollout po konsultacjach, a OpenAI publikuje szczegóły możliwości i cen rodziny Sol, Terra i Luna.",
        sourceLabel: "Axios",
        sourceUrl: "https://www.axios.com/2026/07/08/openai-gpt-trump-ban-lifted",
      },
      {
        id: "open-source-ai-cost-pressure",
        title: "Koszt AI wzmacnia modele otwarte",
        summary: "Presja budżetowa skłania firmy do routingu zadań między modelami frontier, tańszymi wariantami i rozwiązaniami open source.",
        sourceLabel: "Investor's Business Daily",
        sourceUrl: "https://www.investors.com/news/technology/ai-stocks-open-source-ai-models-meta-stock-nvidia/",
      },
      {
        id: "anthropic-nyc-expansion",
        title: "Anthropic rośnie w Nowym Jorku",
        summary: "Firma ma podwoić lokalny zespół, co pokazuje, że sprzedaż AI enterprise przesuwa się bliżej finansów, mediów i dużych klientów.",
        sourceLabel: "New York Post",
        sourceUrl: "https://nypost.com/2026/07/08/business/anthropic-leases-new-nyc-office-building-set-to-double-local-workforce-by-end-of-year/",
      },
    ],
  },
  {
    id: "crime",
    title: "Top 3 nadużycia AI",
    description: "Odpowiedzialne omówienie ryzyk bez instrukcji ułatwiających przestępstwo.",
    items: [
      {
        id: "deepfake-sitharaman-investment",
        title: "Deepfake w reklamie inwestycyjnej",
        summary: "Fałszywy autorytet w materiale wideo i komunikatorze doprowadził ofiarę do wysokich przelewów na rzekomą inwestycję.",
        sourceLabel: "Economic Times",
        sourceUrl: "https://m.economictimes.com/news/new-updates/a-video-on-facebook-a-chat-on-telegram-deepfake-nirmala-sitharaman-scam-costs-bengaluru-professor-rs-61-lakh/articleshow/132276001.cms",
      },
      {
        id: "school-ai-deepfake-policy",
        title: "Szkoły aktualizują zasady deepfake",
        summary: "Illinois rozszerza cyberprzemoc o AI-generated digital replicas, a szkoły dopracowują procedury reagowania i edukacji.",
        sourceLabel: "Capitol News Illinois",
        sourceUrl: "https://www.myjournalcourier.com/news/article/illinois-schools-ai-deepfakes-22334216.php",
      },
      {
        id: "ai-deepfake-takedown-context",
        title: "Platformy muszą usuwać intymne deepfake'i",
        summary: "FTC wyjaśnia, że TAKE IT DOWN Act obejmuje realne, zmienione i syntetyczne materiały intymne oraz wymaga szybkiego usuwania.",
        sourceLabel: "FTC",
        sourceUrl: "https://consumer.ftc.gov/consumer-alerts/2026/05/what-will-ftcs-enforcement-take-it-down-act-mean-you",
      },
    ],
  },
  {
    id: "business",
    title: "Top 3 sposoby zarabiania z AI",
    description: "Legalne, realistyczne usługi oparte na kosztach, workflow i automatyzacji.",
    items: [
      {
        id: "model-routing-audit",
        title: "Audyt kosztów i routingu modeli",
        summary: "Firmy potrzebują macierzy: które zadania wymagają modelu frontier, a które można obsłużyć taniej bez utraty jakości.",
        sourceLabel: "Investor's Business Daily",
        sourceUrl: "https://www.investors.com/news/technology/ai-stocks-open-source-ai-models-meta-stock-nvidia/",
      },
      {
        id: "ai-workflow-skills",
        title: "Projektowanie skills dla agentów",
        summary: "Konsultant może zamienić powtarzalny proces klienta w instrukcję operacyjną z przykładami, kryteriami jakości i wyjątkami.",
        sourceLabel: "Microsoft WorkLab",
        sourceUrl: "https://www.microsoft.com/en-us/worklab/ai-at-work-redesign-first-then-ai-just-works",
      },
      {
        id: "ai-order-automation",
        title: "Automatyzacja zamówień z AI",
        summary: "Case Choco pokazuje usługę dla firm, które przepisują zamówienia z maili, SMS-ów, obrazów i rozmów do systemów ERP.",
        sourceLabel: "OpenAI",
        sourceUrl: "https://openai.com/index/choco/",
      },
    ],
  },
];
