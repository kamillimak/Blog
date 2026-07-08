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

export const AI_TREND_BRIEFING_DATE = "2026-07-08";

export const AI_TREND_BRIEFING: TrendBriefingCategory[] = [
  {
    id: "news",
    title: "Top 3 newsy ze świata AI",
    description: "Najnowsze zdarzenia potwierdzone w źródłach pierwotnych i redakcyjnych.",
    items: [
      {
        id: "openai-gpt-56-sol-preview",
        title: "GPT-5.6 Sol pozostaje w ograniczonym preview",
        summary: "OpenAI opisuje etapowe udostępnianie GPT-5.6 i wzmocnione zabezpieczenia. Doniesienia o zniesieniu ograniczeń rządowych warto traktować jako informację medialną do dalszej weryfikacji.",
        sourceLabel: "OpenAI",
        sourceUrl: "https://openai.com/index/previewing-gpt-5-6-sol/",
      },
      {
        id: "claude-code-agent-story",
        title: "Claude Code wyrasta na pełny workflow agentowy",
        summary: "Anthropic pokazał kulisy rozwoju Claude Code. Najważniejszy sygnał: rynek przesuwa się od samego modelu do kontrolowanego procesu pracy z repozytorium.",
        sourceLabel: "Anthropic",
        sourceUrl: "https://www.anthropic.com/features/making-of-claude-code",
      },
      {
        id: "ai-safety-index-summer-2026",
        title: "AI Safety Index daje liderom tylko średnie oceny",
        summary: "FLI ocenia Anthropic, OpenAI i Google DeepMind najwyżej, ale bez wysokich not. To dobry kontrapunkt do premier modeli i argument za własnym governance.",
        sourceLabel: "Future of Life Institute",
        sourceUrl: "https://futureoflife.org/ai-safety-index-summer-2026/",
      },
    ],
  },
  {
    id: "crime",
    title: "Top 3 kryminalne użycia AI",
    description: "Udokumentowane nadużycia oraz bezpieczne, praktyczne sposoby obrony.",
    items: [
      {
        id: "natwest-ceo-deepfake-scam",
        title: "Deepfake z CEO NatWest wzmacnia oszustwa inwestycyjne",
        summary: "Fałszywy materiał z Paulem Thwaite'em miał imitować rozmowę medialną. Obrona to niezależna weryfikacja źródła i brak przelewów po linkach z reklam.",
        sourceLabel: "SC Media",
        sourceUrl: "https://www.scworld.com/brief/natwest-ceo-targeted-in-ai-deepfake-scam",
      },
      {
        id: "ic3-ai-related-losses-2025",
        title: "IC3 liczy 893 mln dolarów strat AI-related",
        summary: "FBI pokazuje, że AI wzmacnia phishing, spoofing, podszywanie się i fraud inwestycyjny. Procedury zatwierdzania muszą być ważniejsze niż wygląd wiadomości.",
        sourceLabel: "FBI IC3",
        sourceUrl: "https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf",
      },
      {
        id: "europol-iocta-ai-cybercrime-2026",
        title: "Europol: AI przyspiesza fraud i crime-as-a-service",
        summary: "IOCTA 2026 opisuje AI jako akcelerator skali, szybkości i personalizacji cyberprzestępczości. Najważniejsze są punkty kontroli decyzji finansowych i dostępowych.",
        sourceLabel: "Europol",
        sourceUrl: "https://www.europol.europa.eu/cms/sites/default/files/documents/IOCTA-2026.pdf",
      },
    ],
  },
  {
    id: "business",
    title: "Top 3 sposoby zarabiania z AI",
    description: "Legalne usługi oparte na potrzebach rynku - bez obietnic przychodu.",
    items: [
      {
        id: "agent-orchestration-audit",
        title: "Mały audyt orkiestracji agentów AI",
        summary: "Sprzedawaj mapę jednego procesu, test jakości, promptbook i zasady nadzoru. Stały zakres jest bardziej wiarygodny niż obietnica pełnej transformacji.",
        sourceLabel: "PwC",
        sourceUrl: "https://www.pwc.com/us/en/tech-effect/ai-analytics/ai-predictions.html",
      },
      {
        id: "ai-value-redesign-workshop",
        title: "Warsztat redefinicji wartości z AI",
        summary: "McKinsey wskazuje, że trwała wartość nie wynika z samej produktywności. Pomagaj klientom projektować nowe oferty i modele obsługi.",
        sourceLabel: "McKinsey",
        sourceUrl: "https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights/where-ai-will-create-value-and-where-it-wont",
      },
      {
        id: "professional-services-ai-packages",
        title: "Pakiety AI dla usług profesjonalnych",
        summary: "Kancelarie, księgowość i compliance potrzebują workflow, polityk i kontroli ROI. To praktyczna usługa dla twórcy, który łączy narzędzia z procesem.",
        sourceLabel: "Thomson Reuters",
        sourceUrl: "https://www.thomsonreuters.com/en/reports/2026-ai-in-professional-services-report",
      },
    ],
  },
];
