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
    title: "Top 3: pierwsze kroki z AI",
    description: "Zweryfikowane podstawy pracy z modelami zamiast powtarzania wcześniejszych newsów.",
    items: [
      {
        id: "source-verification-basics",
        title: "Weryfikuj odpowiedzi i źródła",
        summary: "Sprowadź każdą istotną tezę do źródła pierwotnego, sprawdź daty i oddziel fakt od własnego wniosku.",
        sourceLabel: "NIST",
        sourceUrl: "https://www.nist.gov/itl/ai-risk-management-framework",
      },
      {
        id: "evaluation-basics",
        title: "Testuj model na własnych przykładach",
        summary: "Mały zestaw prawdziwych zadań i jawne kryteria jakości dają więcej niż efektowne demo na jednym promptcie.",
        sourceLabel: "OpenAI",
        sourceUrl: "https://platform.openai.com/docs/api-reference/evals",
      },
      {
        id: "risk-map-basics",
        title: "Zrób mapę ryzyka przed wdrożeniem",
        summary: "Opisz dane, możliwą szkodę, kontrolę człowieka i warunek zatrzymania procesu przed zwiększeniem autonomii.",
        sourceLabel: "NIST",
        sourceUrl: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
      },
    ],
  },
  {
    id: "crime",
    title: "Top 3 obrony przed nadużyciami AI",
    description: "Odpowiedzialne procedury reakcji bez instrukcji ułatwiających przestępstwo.",
    items: [
      {
        id: "voice-clone-verification",
        title: "Klon głosu: rozłącz się i oddzwoń",
        summary: "Nie ufaj samemu głosowi. Potwierdź historię na znanym numerze i nie realizuj płatności podczas pierwszego kontaktu.",
        sourceLabel: "FTC",
        sourceUrl: "https://consumer.ftc.gov/articles/scammers-use-fake-emergencies-steal-your-money",
      },
      {
        id: "ai-phishing-process-defense",
        title: "Phishing AI pokonuj kontrolą procesu",
        summary: "Oceniaj żądaną czynność, domenę i kanał potwierdzenia; nie próbuj zgadywać, czy tekst napisał model.",
        sourceLabel: "FBI IC3",
        sourceUrl: "https://www.ic3.gov/AnnualReport/Reports",
      },
      {
        id: "deepfake-victim-response",
        title: "Deepfake bez zgody: zabezpiecz dowody",
        summary: "Zachowaj adresy i kontekst, zgłoś materiał bez jego dalszego rozpowszechniania i skorzystaj z właściwych organów.",
        sourceLabel: "Privacy Commissioner of Canada",
        sourceUrl: "https://www.priv.gc.ca/en/opc-news/news-and-announcements/2026/nr-c_260611/",
      },
    ],
  },
  {
    id: "business",
    title: "Top 3 sposoby zarabiania z AI",
    description: "Legalne usługi z konkretnym rezultatem, bez gwarancji przychodu.",
    items: [
      {
        id: "ai-evaluation-service",
        title: "Usługa ewaluacji AI",
        summary: "Porównaj narzędzia na zadaniach klienta i dostarcz raport jakości, ryzyka oraz kosztu korekty.",
        sourceLabel: "OpenAI",
        sourceUrl: "https://platform.openai.com/docs/api-reference/evals",
      },
      {
        id: "ai-risk-register-service",
        title: "Rejestr ryzyka AI dla małej firmy",
        summary: "Zmapuj przypadki użycia, klasy danych, właścicieli, nadzór człowieka i kryteria zatrzymania.",
        sourceLabel: "NIST",
        sourceUrl: "https://www.nist.gov/itl/ai-risk-management-framework",
      },
      {
        id: "ai-safety-training",
        title: "Szkolenie z bezpiecznej pracy z AI",
        summary: "Połącz ochronę danych, weryfikację odpowiedzi i reakcję na podszywanie się w jednym warsztacie.",
        sourceLabel: "NIST",
        sourceUrl: "https://www.nist.gov/itl/ai-risk-management-framework/ai-risk-management-framework-faqs",
      },
    ],
  },
];
