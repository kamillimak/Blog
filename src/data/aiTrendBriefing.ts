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

export const AI_TREND_BRIEFING_DATE = "2026-07-15";

export const AI_TREND_BRIEFING: TrendBriefingCategory[] = [
  {
    id: "news",
    title: "Top 3 newsy ze świata AI",
    description: "Najnowsze sygnały produktowe, wdrożeniowe i regulacyjne z wiarygodnych źródeł.",
    items: [
      {
        id: "hassabis-global-ai-watchdog",
        title: "Hassabis chce watchdogu AI",
        summary:
          "Szef Google DeepMind proponuje amerykańsko-ledowany organ testujący modele frontier przed premierą, z naciskiem na ryzyka cyber, bio i oszustwa.",
        sourceLabel: "Axios",
        sourceUrl: "https://www.axios.com/2026/07/14/demis-hassabis-ai-regulation-google-deepmind",
      },
      {
        id: "google-accenture-midmarket-ai",
        title: "AI z pilota do produkcji",
        summary:
          "Google Cloud i Accenture celują w firmy średniej wielkości, których projekty AI utknęły między demonstracją a realnym wdrożeniem.",
        sourceLabel: "ITPro",
        sourceUrl: "https://www.itpro.com/business/business-strategy/ai-projects-are-stalling-at-mid-market-firms-google-cloud-and-accenture-want-to-solve-that",
      },
      {
        id: "cli-agents-productivity-study",
        title: "Agenci CLI wymagają procesu",
        summary:
          "Badanie wdrożenia Claude Code i GitHub Copilot CLI pokazuje, że adopcja agentów kodujących zależy od wzorców pracy zespołu, nie tylko od licencji.",
        sourceLabel: "arXiv",
        sourceUrl: "https://arxiv.org/abs/2607.01418",
      },
    ],
  },
  {
    id: "crime",
    title: "Top 3 nadużycia AI",
    description: "Odpowiedzialne omówienie ryzyk bez instrukcji ułatwiających przestępstwo.",
    items: [
      {
        id: "fbi-ai-related-fraud",
        title: "AI jako wzmacniacz fraudu",
        summary:
          "Raport IC3 FBI pokazuje setki milionów dolarów strat w zgłoszeniach oznaczonych jako AI-related; główny problem to skala i wiarygodność oszustw.",
        sourceLabel: "FBI IC3",
        sourceUrl: "https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf",
      },
      {
        id: "frontier-ai-cybercrime-baseline",
        title: "Cybercrime jako próg ryzyka",
        summary:
          "Nowy benchmark strat cyberprzestępczości pomaga oceniać, kiedy modele frontier realnie zwiększają skalę szkód, zamiast operować wyłącznie anegdotami.",
        sourceLabel: "arXiv",
        sourceUrl: "https://arxiv.org/abs/2603.20570",
      },
      {
        id: "synthetic-trust-attacks",
        title: "Atak na decyzję, nie obraz",
        summary:
          "Model Synthetic Trust Attacks pokazuje, że obrona przed deepfake'ami musi obejmować procedury autoryzacji, a nie tylko detektory mediów.",
        sourceLabel: "arXiv",
        sourceUrl: "https://arxiv.org/abs/2604.04951",
      },
    ],
  },
  {
    id: "business",
    title: "Top 3 sposoby zarabiania z AI",
    description: "Legalne, realistyczne usługi oparte na workflow, wdrożeniach i decyzjach zarządczych.",
    items: [
      {
        id: "fde-for-midmarket",
        title: "Mini-FDE dla MŚP",
        summary:
          "Rynek premiuje osoby, które potrafią dowieźć jeden proces AI do produkcji: discovery, prototyp, integrację, test jakości i szkolenie.",
        sourceLabel: "ITPro",
        sourceUrl: "https://www.itpro.com/business/business-strategy/ai-projects-are-stalling-at-mid-market-firms-google-cloud-and-accenture-want-to-solve-that",
      },
      {
        id: "coding-agent-rollout-audit",
        title: "Audyt agentów kodujących",
        summary:
          "Zespoły kupujące agentów potrzebują polityki użycia, playbooków, metryk jakości i zasad review; to konkretna usługa wdrożeniowa.",
        sourceLabel: "arXiv",
        sourceUrl: "https://arxiv.org/abs/2607.01418",
      },
      {
        id: "ai-adoption-board-briefing",
        title: "Briefing adopcji AI",
        summary:
          "Badanie S&P 500 pokazuje różnicę między hype'em a głęboką integracją AI, co można przełożyć na krótką mapę decyzji dla zarządu.",
        sourceLabel: "arXiv",
        sourceUrl: "https://arxiv.org/abs/2607.08920",
      },
    ],
  },
];
