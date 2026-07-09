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
        id: "gpt-56-sol-public-launch",
        title: "GPT-5.6 Sol zmienia plan wdrożeń",
        summary: "OpenAI pokazało model, ceny i zastosowania, więc firmy muszą ocenić koszt, jakość i granice użycia zamiast ślepo migrować endpoint.",
        sourceLabel: "OpenAI",
        sourceUrl: "https://openai.com/index/gpt-5-6/",
      },
      {
        id: "nukib-frontier-cyber-risk",
        title: "NUKIB ostrzega przed frontier AI",
        summary: "Czeska agencja wskazuje, że najmocniejsze modele mogą przyspieszać rozpoznanie podatności, socjotechnikę i działania ofensywne.",
        sourceLabel: "NUKIB",
        sourceUrl: "https://nukib.gov.cz/en/infoservis-en/hrozby/2098-frontier-ai-as-a-cyber-threat/",
      },
      {
        id: "ai-infrastructure-policy",
        title: "Compute AI staje się polityką",
        summary: "Debata o centrach danych, energii i lokalizacji infrastruktury pokazuje, że przewaga AI zależy także od fizycznego zaplecza.",
        sourceLabel: "The Guardian",
        sourceUrl: "https://www.theguardian.com/technology/artificial-intelligence-ai",
      },
    ],
  },
  {
    id: "crime",
    title: "Top 3 nadużycia AI",
    description: "Odpowiedzialne omówienie ryzyk bez instrukcji ułatwiających przestępstwo.",
    items: [
      {
        id: "take-it-down-first-charges",
        title: "Pierwsze zarzuty po TAKE IT DOWN",
        summary: "AP opisuje federalną sprawę dotyczącą niekonsensualnych materiałów intymnych, w tym syntetycznych treści deepfake.",
        sourceLabel: "Associated Press",
        sourceUrl: "https://apnews.com/article/2e0c0ab83fe967d1db1f45af90a03fc2",
      },
      {
        id: "natwest-voice-deepfake-scam",
        title: "Deepfake głosu w oszustwie finansowym",
        summary: "Przestępcy wykorzystują presję czasu i podszycie pod decydenta, więc przelewy wymagają weryfikacji drugim kanałem.",
        sourceLabel: "NatWest",
        sourceUrl: "https://www.natwest.com/fraud-and-security.html",
      },
      {
        id: "frontier-ai-cyber-abuse",
        title: "AI obniża próg cybernadużyć",
        summary: "NUKIB i Europol opisują AI jako akcelerator socjotechniki, rozpoznania i automatyzacji, ale nacisk kładą na obronę.",
        sourceLabel: "NUKIB",
        sourceUrl: "https://nukib.gov.cz/en/infoservis-en/hrozby/2098-frontier-ai-as-a-cyber-threat/",
      },
    ],
  },
  {
    id: "business",
    title: "Top 3 sposoby zarabiania z AI",
    description: "Legalne, realistyczne usługi oparte na kosztach, workflow i automatyzacji.",
    items: [
      {
        id: "gpt56-migration-audit",
        title: "Audyt migracji na GPT-5.6",
        summary: "Nowy model tworzy popyt na mierzalne porównanie kosztu, jakości i bezpiecznych granic użycia w realnych procesach klienta.",
        sourceLabel: "OpenAI",
        sourceUrl: "https://openai.com/index/gpt-5-6/",
      },
      {
        id: "enterprise-agent-factory",
        title: "Fabryka mikroagentów dla firm",
        summary: "Praktyczna nisza to małe, kontrolowane workflow: wejścia, reguły, narzędzia, walidacja, logi i człowiek w pętli.",
        sourceLabel: "Microsoft WorkLab",
        sourceUrl: "https://www.microsoft.com/en-us/worklab/",
      },
      {
        id: "ai-red-team-service",
        title: "Red-teaming procesów AI",
        summary: "Małe zespoły potrzebują defensywnego przeglądu promptów, automatyzacji, danych i procedur reagowania na nadużycia.",
        sourceLabel: "OpenAI Docs",
        sourceUrl: "https://platform.openai.com/docs/guides/evals",
      },
    ],
  },
];
