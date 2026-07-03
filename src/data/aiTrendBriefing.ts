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

export const AI_TREND_BRIEFING_DATE = "2026-07-03";

export const AI_TREND_BRIEFING: TrendBriefingCategory[] = [
  {
    id: "news",
    title: "Top 3 newsy ze świata AI",
    description: "Najnowsze zdarzenia potwierdzone w źródłach pierwotnych i redakcyjnych.",
    items: [
      {
        id: "anthropic-jailbreak-framework",
        title: "Powstaje skala powagi jailbreaków AI",
        summary: "Anthropic opublikował robocze ramy oceny obejść zabezpieczeń oraz szczegóły klasyfikatorów cyberbezpieczeństwa. To propozycja do konsultacji, nie obowiązujący standard.",
        sourceLabel: "Anthropic",
        sourceUrl: "https://www.anthropic.com/news/fable-safeguards-jailbreak-framework",
      },
      {
        id: "claude-sonnet-5",
        title: "Claude Sonnet 5 trafia do wszystkich planów",
        summary: "Nowy model jest nastawiony na wieloetapową pracę z narzędziami. Przed migracją warto porównać go na własnych zadaniach pod względem jakości, kosztu i interwencji człowieka.",
        sourceLabel: "Anthropic",
        sourceUrl: "https://www.anthropic.com/news/claude-sonnet-5",
      },
      {
        id: "claude-science",
        title: "Claude Science łączy AI z pracą badawczą",
        summary: "Beta integruje narzędzia naukowe i ma tworzyć audytowalne artefakty. Wyniki nadal wymagają kontroli eksperta oraz sprawdzenia odtwarzalności analiz.",
        sourceLabel: "Anthropic",
        sourceUrl: "https://www.anthropic.com/news/claude-science-ai-workbench",
      },
    ],
  },
  {
    id: "crime",
    title: "Top 3 kryminalne użycia AI",
    description: "Udokumentowane nadużycia oraz bezpieczne, praktyczne sposoby obrony.",
    items: [
      {
        id: "ai-fake-consulting-personas",
        title: "Persony AI w operacji wywiadowczej",
        summary: "DOJ opisuje fałszywe firmy i wygenerowane zdjęcia używane do kontaktu z osobami mającymi dostęp do informacji wrażliwych. Kontrahenta trzeba potwierdzać niezależnym kanałem.",
        sourceLabel: "U.S. DOJ",
        sourceUrl: "https://www.justice.gov/opa/pr/justice-department-fbi-disable-13-websites-backed-suspected-chinese-agents-sought-sensitive",
      },
      {
        id: "take-it-down-arrests",
        title: "Aresztowania za seksualne deepfake’i",
        summary: "Prokuratura federalna opisała zarzuty wobec dwóch osób w związku z publikowaniem deepfake’ów bez zgody. Ofiary powinny zabezpieczyć dowody bez dalszego rozpowszechniania treści.",
        sourceLabel: "U.S. DOJ",
        sourceUrl: "https://www.justice.gov/usao-edny/pr/two-individuals-arrested-publishing-ai-deepfake-pornography-violation-take-it-down-act",
      },
      {
        id: "europol-iocta-2026",
        title: "AI skaluje istniejące modele cyberprzestępczości",
        summary: "IOCTA 2026 wskazuje na automatyzację socjotechniki i oszustw. Obrona powinna opierać się na drugim kanale, limitach i rozdzieleniu obowiązków.",
        sourceLabel: "Europol",
        sourceUrl: "https://www.europol.europa.eu/publication-events/main-reports/iocta-2026-evolving-threat-landscape",
      },
    ],
  },
  {
    id: "business",
    title: "Top 3 sposoby zarabiania z AI",
    description: "Legalne usługi oparte na potrzebach rynku — bez obietnic przychodu.",
    items: [
      {
        id: "ai-quality-audit",
        title: "Audyt jakości procesu wspieranego przez AI",
        summary: "Sprzedawaj pomiar błędów, kosztu i czasu jednego procesu. Stały zakres i rekomendacja „wdrażać albo nie” są bardziej wiarygodne niż obietnica pełnej transformacji.",
        sourceLabel: "PwC",
        sourceUrl: "https://www.pwc.com/gx/en/news-room/press-releases/2026/pwc-2026-ai-jobs-barometer.html",
      },
      {
        id: "ai-content-provenance",
        title: "Wdrożenie pochodzenia treści AI",
        summary: "Firmy potrzebują rejestru źródeł, zgód, wersji i metadanych. Usługa techniczna powinna kończyć się przeglądem prawnym klienta, nie obietnicą zgodności.",
        sourceLabel: "Komisja Europejska",
        sourceUrl: "https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content",
      },
      {
        id: "ai-research-workbench",
        title: "Odtwarzalny warsztat AI dla badań",
        summary: "Konfiguracja środowiska, notebooka, źródeł i kontroli uprawnień może być usługą dla zespołów R&D. Wyniki naukowe muszą pozostać pod kontrolą eksperta.",
        sourceLabel: "Anthropic",
        sourceUrl: "https://www.anthropic.com/news/claude-science-ai-workbench",
      },
    ],
  },
];
