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

export const AI_TREND_BRIEFING_DATE = "2026-07-02";

export const AI_TREND_BRIEFING: TrendBriefingCategory[] = [
  {
    id: "news",
    title: "Top 3 newsy ze świata AI",
    description: "Najnowsze zdarzenia potwierdzone w źródłach pierwotnych i redakcyjnych.",
    items: [
      {
        id: "un-ai-scientific-panel",
        title: "Panel ONZ publikuje przegląd naukowy o AI",
        summary: "Pierwszy globalny panel naukowy ONZ ds. AI przedstawił raport wstępny. Firmy powinny dokumentować skutki, błędy i nadzór człowieka, zamiast opierać ocenę ryzyka na deklaracjach dostawców.",
        sourceLabel: "ONZ",
        sourceUrl: "https://www.un.org/independent-international-scientific-panel-ai/en",
      },
      {
        id: "claude-fable-5-redeployed",
        title: "Claude Fable 5 wraca po ograniczeniach USA",
        summary: "Anthropic przywrócił model po cofnięciu kontroli eksportowych. Krótkie globalne wyłączenie pokazuje, że krytyczne procesy AI potrzebują przenośnych danych, testów i dostawcy zapasowego.",
        sourceLabel: "Anthropic",
        sourceUrl: "https://www.anthropic.com/news/redeploying-fable-5",
      },
      {
        id: "eu-ai-act-omnibus-final",
        title: "Rada UE zatwierdza nowe terminy AI Act",
        summary: "UE przesunęła część terminów dla systemów wysokiego ryzyka, ale utrzymała osobne obowiązki transparentności i dodała zakazy dotyczące niekonsensualnych treści intymnych.",
        sourceLabel: "Rada UE",
        sourceUrl: "https://www.consilium.europa.eu/en/press/press-releases/2026/06/29/artificial-intelligence-council-gives-final-green-light-to-simplify-and-streamline-rules/pdf/",
      },
    ],
  },
  {
    id: "crime",
    title: "Top 3 kryminalne użycia AI",
    description: "Udokumentowane nadużycia oraz bezpieczne, praktyczne sposoby obrony.",
    items: [
      {
        id: "outsider-ai-phishing-lawsuit",
        title: "Pozew za phishing wspierany przez AI",
        summary: "Google oskarża operatorów Outsider Enterprise o ułatwianie masowych kampanii phishingowych. Poprawny język nie potwierdza już autentyczności — domenę i żądanie trzeba sprawdzać drugim kanałem.",
        sourceLabel: "TechCrunch",
        sourceUrl: "https://techcrunch.com/2026/06/12/chinese-cybercrime-operation-that-used-ai-to-scam-hundreds-of-thousands-of-victims-sued-by-google/",
      },
      {
        id: "doj-deepfake-domain-seizure",
        title: "DOJ przejmuje domeny z deepfake'ami",
        summary: "Amerykańskie służby zajęły domeny publikujące seksualne falsyfikaty wizerunków bez zgody. Poszkodowani powinni zachować adres, datę i dowód bez dalszego rozpowszechniania materiału.",
        sourceLabel: "U.S. DOJ",
        sourceUrl: "https://www.justice.gov/opa/pr/united-states-seizes-domain-names-publishing-nude-digital-forgeries-famous-women",
      },
      {
        id: "fbi-ai-scam-losses-2025",
        title: "FBI wyodrębnia straty z oszustw AI",
        summary: "IC3 odnotowało 22 364 skargi i niemal 893 mln dolarów deklarowanych strat związanych z AI. Pilne płatności trzeba potwierdzać drugim kanałem, nawet gdy głos lub obraz brzmi wiarygodnie.",
        sourceLabel: "FBI",
        sourceUrl: "https://www.fbi.gov/news/press-releases/cryptocurrency-and-ai-scams-bilk-americans-of-billions",
      },
    ],
  },
  {
    id: "business",
    title: "Top 3 sposoby zarabiania z AI",
    description: "Legalne usługi oparte na potrzebach rynku — bez obietnic przychodu.",
    items: [
      {
        id: "sme-workflow-audit",
        title: "Audyt jednego procesu w małej firmie",
        summary: "Sprzedawaj mierzalną poprawę konkretnego procesu: mapę pracy, pilotaż, test jakości i instrukcję awaryjną. Wdrożenie ma sens tylko wtedy, gdy wynik potwierdzają dane klienta.",
        sourceLabel: "OECD",
        sourceUrl: "https://www.oecd.org/en/publications/empowering-smes-in-the-age-of-ai_bf5a9816-en.html",
      },
      {
        id: "ai-integration-quality-care",
        title: "Integracja AI z kontrolą jakości",
        summary: "Popyt na umiejętności integracji AI rośnie, lecz trwałą wartość daje dopiero testowanie, monitoring kosztu i nadzór człowieka. To podstawa projektu oraz opieki abonamentowej.",
        sourceLabel: "Upwork",
        sourceUrl: "https://upwork.gcs-web.com/news-releases/news-release-details/upworks-demand-skills-2026-demand-top-ai-skills-more-doubles-ai",
      },
      {
        id: "eu-ai-content-transparency",
        title: "Wdrożenie oznaczeń treści AI",
        summary: "Nowy kodeks UE tworzy potrzebę uporządkowania etykiet, metadanych i śladu redakcyjnego. Usługa techniczna powinna kończyć się przeglądem prawnym klienta, nie obietnicą zgodności.",
        sourceLabel: "Komisja Europejska",
        sourceUrl: "https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content",
      },
    ],
  },
];
