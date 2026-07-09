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
    description: "Najnowsze sygnały produktowe i badawcze z wiarygodnych źródeł pierwotnych.",
    items: [
      {
        id: "gpt-live-voice-interface",
        title: "GPT-Live trafia do ChatGPT Voice",
        summary: "OpenAI uruchamia pełnodupleksowy model głosowy, który może prowadzić rozmowę i delegować trudniejsze zadania w tle.",
        sourceLabel: "OpenAI",
        sourceUrl: "https://openai.com/index/introducing-gpt-live/",
      },
      {
        id: "openai-coding-evals-audit",
        title: "OpenAI kwestionuje SWE-Bench Pro",
        summary: "Audyt benchmarku wskazał, że około 30% zadań może być wadliwych, co wzmacnia potrzebę własnych ewaluacji.",
        sourceLabel: "OpenAI",
        sourceUrl: "https://openai.com/index/separating-signal-from-noise-coding-evaluations/",
      },
      {
        id: "gemini-managed-agents-expanded",
        title: "Gemini API rozwija agentów zarządzanych",
        summary: "Google dodaje zadania w tle, remote MCP, funkcje własne i odświeżanie poświadczeń dla produkcyjnych agentów.",
        sourceLabel: "Google",
        sourceUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/expanding-managed-agents-gemini-api/",
      },
    ],
  },
  {
    id: "crime",
    title: "Top 3 nadużycia AI",
    description: "Odpowiedzialne omówienie ryzyk bez instrukcji ułatwiających przestępstwo.",
    items: [
      {
        id: "deepfake-investment-scam",
        title: "Deepfake w oszustwie inwestycyjnym",
        summary: "Fałszywy autorytet w reklamie i komunikatorze pokazuje, że decyzje finansowe wymagają niezależnej weryfikacji.",
        sourceLabel: "Economic Times",
        sourceUrl: "https://m.economictimes.com/news/new-updates/a-video-on-facebook-a-chat-on-telegram-deepfake-nirmala-sitharaman-scam-costs-bengaluru-professor-rs-61-lakh/articleshow/132276001.cms",
      },
      {
        id: "ai-csam-parent-guidance",
        title: "NCA i IWF ostrzegają rodziców",
        summary: "Publiczne zdjęcia dzieci mogą zostać nadużyte przez generatywną AI, więc potrzebny jest audyt prywatności i zgód.",
        sourceLabel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/society/2026/jul/03/ai-sexual-abuse-fears-uk-parents-warned-posting-images-children-national-crime-agency",
      },
      {
        id: "school-ai-deepfake-policy",
        title: "Illinois obejmuje deepfake cyberprzemocą",
        summary: "Szkoły aktualizują polityki po wejściu przepisów o AI-generated digital replicas w życie 1 lipca.",
        sourceLabel: "Capitol News Illinois",
        sourceUrl: "https://www.myjournalcourier.com/news/article/illinois-schools-ai-deepfakes-22334216.php",
      },
    ],
  },
  {
    id: "business",
    title: "Top 3 sposoby zarabiania z AI",
    description: "Legalne, realistyczne usługi oparte na aktualnych wdrożeniach agentów i ewaluacji.",
    items: [
      {
        id: "agent-workflow-audit",
        title: "Audyt procesów pod agentów",
        summary: "Firmy potrzebują mapy narzędzi, uprawnień, ryzyk i punktów zatwierdzania przed wdrożeniem agentów.",
        sourceLabel: "Google",
        sourceUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/expanding-managed-agents-gemini-api/",
      },
      {
        id: "ai-evaluation-sprint",
        title: "Sprint ewaluacji modeli AI",
        summary: "Własne testy na zadaniach klienta są bardziej użyteczne niż zakup narzędzia na podstawie publicznego rankingu.",
        sourceLabel: "OpenAI",
        sourceUrl: "https://openai.com/index/separating-signal-from-noise-coding-evaluations/",
      },
      {
        id: "agentic-security-review",
        title: "Przegląd bezpieczeństwa kodu z AI",
        summary: "Case Alberty pokazuje usługę: szybki skan repozytoriów, propozycje poprawek i ręczne zatwierdzenie zmian.",
        sourceLabel: "Anthropic",
        sourceUrl: "https://www.anthropic.com/news/alberta-government-claude-cybersecurity",
      },
    ],
  },
];
