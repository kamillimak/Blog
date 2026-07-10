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

export const AI_TREND_BRIEFING_DATE = "2026-07-10";

export const AI_TREND_BRIEFING: TrendBriefingCategory[] = [
  {
    id: "news",
    title: "Top 3 newsy ze świata AI",
    description: "Najnowsze sygnały produktowe, regulacyjne i wdrożeniowe z wiarygodnych źródeł.",
    items: [
      {
        id: "openai-google-china-access",
        title: "Modele AI i luka eksportowa",
        summary: "FT opisuje dostęp podmiotów powiązanych z Chinami do usług OpenAI i Google, co wzmacnia temat kontroli klientów i regionów użycia.",
        sourceLabel: "Financial Times",
        sourceUrl: "https://www.ft.com/content/5d6aafa1-5d47-4585-aa95-6ec06a6cd20f",
      },
      {
        id: "anthropic-hard-questions",
        title: "Anthropic zbiera trudne pytania",
        summary: "Firma przesuwa komunikację z benchmarków na społeczne skutki AI, publiczne obawy i rozliczalność działań wobec użytkowników.",
        sourceLabel: "Anthropic",
        sourceUrl: "https://www.anthropic.com/news/hard-questions",
      },
      {
        id: "google-agentic-enterprise",
        title: "Google porządkuje agentów AI",
        summary: "Nowa lista 20 pytań dla firm pokazuje, że wdrożenie agentów wymaga decyzji o danych, tożsamości, narzędziach i kosztach.",
        sourceLabel: "Google Cloud",
        sourceUrl: "https://cloud.google.com/blog/products/ai-machine-learning/20-questions-for-the-agentic-enterprise",
      },
    ],
  },
  {
    id: "crime",
    title: "Top 3 nadużycia AI",
    description: "Odpowiedzialne omówienie ryzyk bez instrukcji ułatwiających przestępstwo.",
    items: [
      {
        id: "ai-streaming-royalty-fraud",
        title: "AI w oszustwie streamingowym",
        summary: "DOJ opisuje schemat generowania fałszywych utworów i sztucznego nabijania odtworzeń, z ponad 8 mln dolarów tantiem.",
        sourceLabel: "DOJ",
        sourceUrl: "https://www.justice.gov/usao-sdny/pr/north-carolina-man-pleads-guilty-music-streaming-fraud-aided-artificial-intelligence-0",
      },
      {
        id: "ai-generated-harassment",
        title: "AI-generowane obrazy w cyberstalkingu",
        summary: "Sprawa DOJ pokazuje, że syntetyczne materiały intymne są traktowane jako realna szkoda i wymagają procedur reagowania.",
        sourceLabel: "DOJ",
        sourceUrl: "https://www.justice.gov/usao-ndga/pr/new-york-man-faces-federal-cyberstalking-charge-after-posting-ai-generated-nude-images",
      },
      {
        id: "ai-export-distillation-risk",
        title: "Destylacja jako ryzyko dostępu",
        summary: "Doniesienia FT podkreślają, że nadużyciem może być także obejście zasad dostępu lub nieautoryzowane wykorzystanie wyników modeli.",
        sourceLabel: "Financial Times",
        sourceUrl: "https://www.ft.com/content/5d6aafa1-5d47-4585-aa95-6ec06a6cd20f",
      },
    ],
  },
  {
    id: "business",
    title: "Top 3 sposoby zarabiania z AI",
    description: "Legalne, realistyczne usługi oparte na kosztach, governance i automatyzacji.",
    items: [
      {
        id: "agentic-roi-audit",
        title: "Audyt ROI agentów AI",
        summary: "Firmy potrzebują pomiaru kosztu, jakości i czasu weryfikacji, zanim zaczną skalować agentów poza pojedyncze demo.",
        sourceLabel: "McKinsey",
        sourceUrl: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/cost-versus-value-managing-agentic-ai-system-performance",
      },
      {
        id: "agent-governance-playbook",
        title: "Playbook governance agentów",
        summary: "Praktyczna usługa to spisanie ról, uprawnień, progów akceptacji, logów i procedury wyłączenia agenta.",
        sourceLabel: "Google Cloud",
        sourceUrl: "https://cloud.google.com/blog/products/ai-machine-learning/20-questions-for-the-agentic-enterprise",
      },
      {
        id: "ai-compliance-briefing",
        title: "Briefing compliance AI",
        summary: "Zarządy potrzebują krótkiej mapy narzędzi, danych, zależności regulacyjnych i decyzji do podjęcia w 30 dni.",
        sourceLabel: "Anthropic",
        sourceUrl: "https://www.anthropic.com/news/hard-questions",
      },
    ],
  },
];
