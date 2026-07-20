import { Article } from "../types/article";

export const ARTICLES: Article[] = [
  {
    id: "1",
    slug: "codex-jako-drugi-inzynier",
    title: "Codex jako drugi inżynier w repozytorium",
    subtitle: "Jak efektywnie współpracować z agentem pracującym na poziomie całego projektu",
    description: "Poznaj różnicę między prostym czatem a autonomicznym agentem. Dowiedz się, jak pisać precyzyjne briefy, wyznaczać granice zadania i automatyzować weryfikację kodu.",
    category: "Workflow",
    tool: "Codex",
    author: {
      name: "Kamil Mikołajczyk",
      role: "Senior IT Project Manager | Product Owner | AI & Digital Transformation",
      avatar: "KM"
    },
    publishedAt: "2026-06-28",
    readTime: 7,
    wordCount: 1450,
    heroImage: "codex_hero",
    imageAlt: "Schematyczne przedstawienie agenta analizującego strukturę katalogów w repozytorium",
    imageCaption: "Rys. 1: Agent AI analizujący drzewo plików w celu zrozumienia zależności systemowych.",
    accentColor: "indigo",
    featured: true,
    tags: ["Agentic AI", "Codex", "Workflow", "Automation"],
    pullQuote: "Dobry prompt dla Codexa nie opisuje tylko pożądanego efektu. Opisuje granice odpowiedzialności, kryteria jakości i sposób sprawdzenia pracy.",
    keyTakeaways: [
      "Agent w repozytorium potrzebuje jasno określonego obszaru roboczego (Workspace) i precyzyjnych reguł brzegowych.",
      "Przed rozpoczęciem edycji, zleć agentowi wykonanie analizy i przedstawienie planu zmian do akceptacji.",
      "Weryfikacja automatyczna (build, lint, testy) to jedyny sposób na upewnienie się, że agent nie popsuł istniejącego kodu.",
      "Traktuj agenta jak utalentowanego, ale nowego programistę w zespole – sprawdzaj jego pracę i dawaj precyzyjny feedback."
    ],
    shareText: "Praca z agentami AI na poziomie całego repozytorium to zupełnie inny wymiar niż zwykły czat w przeglądarce. Zobacz, jak wyznaczać granice odpowiedzialności dla Codexa, planować zmiany w 3 krokach i wykorzystywać automatyczną weryfikację kodu, by uniknąć niekontrolowanego chaosu.",
    hashtags: ["Codex", "AgenticAI", "AIEngineering", "Workflow", "DziennikBudowy"],
    sections: [
      {
        type: "heading",
        level: 2,
        text: "Czat to za mało: wejdź w erę agentów repozytorium",
        id: "czat-to-za-malo"
      },
      {
        type: "paragraph",
        text: "Tradycyjne czaty AI (np. w przeglądarce) działają w izolacji. Musisz ręcznie kopiować fragmenty kodu, tłumaczyć kontekst i liczyć na to, że model domyśli się reszty architektury. Agenci pracujący bezpośrednio w repozytorium, tacy jak Codex, mają dostęp do pełnego kontekstu projektu. Widzą zależności, konfigurację środowiska, pliki package.json oraz strukturę folderów."
      },
      {
        type: "paragraph",
        text: "Taka zmiana perspektywy wymaga jednak zupełnie nowego podejścia do pisania poleceń. Kiedy AI ma uprawnienia do tworzenia, edycji i usuwania plików w Twoim projekcie, brak precyzji w promptowaniu może prowadzić do chaosu."
      },
      {
        type: "heading",
        level: 2,
        text: "Zasada trzech kroków: Analiza, Planowanie, Realizacja",
        id: "zasada-trzech-krokow"
      },
      {
        type: "paragraph",
        text: "Doświadczeni programiści pracujący z agentami stosują sprawdzony trójetapowy workflow. Pozwala on zachować pełną kontrolę nad kodem i minimalizuje ryzyko niekontrolowanych modyfikacji:"
      },
      {
        type: "bulletList",
        items: [
          "Etap 1: Analiza stanu obecnego – Zanim poprosisz o naprawienie błędu lub dodanie funkcji, poproś agenta o znalezienie powiązanych plików i wyjaśnienie, jak obecnie działa dana logika.",
          "Etap 2: Zaproponowanie planu – Poproś o wypunktowanie planowanych zmian, zanim zostaną one fizycznie zapisane na dysku. To moment na skorygowanie założeń architektonicznych.",
          "Etap 3: Implementacja i walidacja – Agent wykonuje precyzyjne edycje, a następnie uruchamiane są skrypty weryfikujące poprawność kodu."
        ]
      },
      {
        type: "heading",
        level: 3,
        text: "Jak napisać idealny brief dla agenta?",
        id: "idealny-brief"
      },
      {
        type: "paragraph",
        text: "Dobry brief powinien przypominać zadanie w Jirze stworzone dla programisty poziomu Mid/Senior. Musi zawierać cel, założenia techniczne, listę plików do modyfikacji (lub wytyczne jak je znaleźć) oraz kryteria sukcesu (Definition of Done)."
      },
      {
        type: "code",
        language: "markdown",
        code: `# BRIEF: Implementacja walidacji formularza kontaktowego

## Cel
Dodaj walidację po stronie klienta do komponentu ContactForm.tsx.

## Wymagania techniczne
1. Pole 'Email' musi sprawdzać poprawność adresu za pomocą wyrażenia regularnego.
2. Pole 'Wiadomość' musi mieć minimum 20 znaków.
3. Wszystkie błędy powinny być wyświetlane bezpośrednio pod polami w kolorze czerwonym.
4. Użyj wyłącznie istniejących klas Tailwind CSS.

## Kryteria sukcesu
- Uruchomienie 'npm run lint' nie zwraca żadnych błędów.
- Formularz blokuje wysyłkę (onSubmit), jeśli dane są niepoprawne.`
      },
      {
        type: "heading",
        level: 2,
        text: "Weryfikacja automatyczna jako tarcza ochronna",
        id: "weryfikacja-automatyczna"
      },
      {
        type: "paragraph",
        text: "Największym błędem podczas pracy z agentem AI jest ręczne testowanie każdej linijki kodu w przeglądarce bez automatycznego sprawdzenia spójności całego projektu. Po każdej serii zmian wprowadzonych przez Codexa, należy bezwzględnie uruchomić proces kompilacji i linter."
      },
      {
        type: "numberedList",
        items: [
          "Uruchomienie kompilatora TypeScript (tsc --noEmit) – wykrywa niedopasowanie typów, brakujące importy i błędy w sygnaturach funkcji.",
          "Uruchomienie lintera (eslint / npm run lint) – sprawdza zgodność ze standardami zespołu oraz potencjalne błędy logiczne.",
          "Uruchomienie testów jednostkowych – daje pewność, że nowa funkcja nie zepsuła dotychczasowego działania aplikacji."
        ]
      },
      {
        type: "quote",
        text: "Programista, który nie korzysta z automatycznej walidacji po edycji kodu przez AI, traci czas zyskany dzięki generowaniu kodu na ręczne poszukiwanie literówek i zgubionych nawiasów."
      },
      {
        type: "heading",
        level: 2,
        text: "Podsumowanie",
        id: "podsumowanie"
      },
      {
        type: "paragraph",
        text: "Praca z agentem typu Codex drastycznie skraca czas dostarczania oprogramowania, ale tylko wtedy, gdy nauczymy się zarządzać nim jak pracownikiem. Precyzyjne określanie granic zadań, weryfikacja planów zmian oraz rygorystyczne korzystanie z narzędzi do statycznej analizy kodu to fundamenty nowoczesnego, efektywnego inżyniera oprogramowania."
      }
    ]
  },
  {
    id: "2",
    slug: "trae-jako-lokalny-asystent",
    title: "Trae jako lokalny asystent codziennej pracy",
    subtitle: "Jak efektywnie wykorzystać edytor AI do szybkich poprawek UI i lokalnych iteracji",
    description: "Kiedy potrzebujesz chirurga, a nie architekta. Odkryj moc natychmiastowego feedbacku w edytorze Trae, steruj precyzyjnym diffem i dowiedz się, kiedy odpuścić pracę z lokalnym agentem.",
    category: "Narzędzia",
    tool: "Trae",
    author: {
      name: "Kamil Mikołajczyk",
      role: "Senior IT Project Manager | Product Owner | AI & Digital Transformation",
      avatar: "KM"
    },
    publishedAt: "2026-06-29",
    readTime: 5,
    wordCount: 950,
    heroImage: "trae_hero",
    imageAlt: "Praca w edytorze kodu Trae z podglądem zmian w czasie rzeczywistym",
    imageCaption: "Rys. 2: Interfejs edytora Trae ułatwiający bezpośrednie kontrolowanie linii kodu i zatwierdzanie różnic (diff).",
    accentColor: "emerald",
    featured: false,
    tags: ["Trae", "IDE", "UI Iterations", "Developer Experience"],
    pullQuote: "Trae jest najmocniejszy wtedy, gdy zadanie mieści się w widoku edytora i ma jasny efekt wizualny albo techniczny.",
    keyTakeaways: [
      "Trae świetnie nadaje się do mikro-zadań: szybka zmiana klas Tailwind, poprawka w jednym komponencie, dopisanie prostego helpera.",
      "Zawsze kontroluj widok różnic (diff) linia po linii przed kliknięciem „Accept”.",
      "Nie zmuszaj lokalnego asystenta do wielkich zmian architektonicznych bez wcześniejszego rozbicia ich na mniejsze etapy.",
      "Trae najlepiej sprawdza się w połączeniu z uruchomionym obok dev serverem, dając natychmiastową wizualną informację zwrotną."
    ],
    shareText: "Kiedy potrzebujesz chirurgicznej precyzji w edytorze kodu, a nie wielkiego architekta, Trae sprawdza się znakomicie. Sprawdź, jak pisać precyzyjne mikro-prompty, kontrolować zmiany linia po linii i budować natychmiastową pętlę feedbacku dla poprawek UI.",
    hashtags: ["Trae", "DeveloperExperience", "React", "Frontend", "DziennikBudowy"],
    sections: [
      {
        type: "heading",
        level: 2,
        text: "Chirurgiczna precyzja na poziomie pliku",
        id: "chirurgiczna-precyzja"
      },
      {
        type: "paragraph",
        text: "Podczas gdy potężne, globalne agenty analizują całe repozytoria i planują migracje, w codziennej pracy najczęściej potrzebujemy szybkich, punktowych poprawek. Chcemy zmienić układ siatki na mobilnym ekranie, dodać brakujący stan załadowania (loading state) do przycisku czy zrefaktoryzować jedną mało czytelną funkcję. W takich scenariuszach idealnym narzędziem okazuje się Trae."
      },
      {
        type: "paragraph",
        text: "Trae to środowisko zorientowane na bezpośrednią, bardzo szybką interakcję z kodem, który aktualnie masz przed oczami. Zamiast pisać długie kontekstowe eseje, zaznaczasz fragment kodu, wciskasz skrót klawiszowy i wydajesz krótkie, precyzyjne polecenie."
      },
      {
        type: "heading",
        level: 2,
        text: "Krótkie pętle iteracyjne – sekret produktywności",
        id: "krotkie-petle"
      },
      {
        type: "paragraph",
        text: "Najlepsze rezultaty z Trae osiąga się, pracując w bardzo krótkich cyklach. Zamiast zlecać mu „Napisz cały widok profilu użytkownika”, rozbij to zadanie na serię małych kroków:"
      },
      {
        type: "bulletList",
        items: [
          "Krok 1: „Stwórz szkielet komponentu profilu z polami na imię, email i avatar przy użyciu podstawowego flexboxa”.",
          "Krok 2: „Dodaj hover efekty i stany focus dla wszystkich pól formularza”.",
          "Krok 3: „Zaimplementuj prostą obsługę błędów – jeśli imię jest puste, pokaż małą czerwoną etykietę”.",
          "Krok 4: „Spraw, aby avatar miał okrągły kształt i delikatny cień na ciemnym tle”."
        ]
      },
      {
        type: "paragraph",
        text: "Pracując w ten sposób, kontrolujesz każdą zmianę na bieżąco, a model rzadko miewa momenty halucynacji, ponieważ dostarczany mu kontekst jest minimalny i wysoce precyzyjny."
      },
      {
        type: "heading",
        level: 3,
        text: "Jak pisać skuteczne mikro-prompty?",
        id: "mikro-prompty"
      },
      {
        type: "paragraph",
        text: "Przykłady poleceń, które w Trae dają doskonałe rezultaty z marszu:"
      },
      {
        type: "code",
        language: "typescript",
        code: `// ❌ Słaby prompt: "Popraw ten przycisk"
// ✅ Dobry prompt: "Dodaj ikonę Loader z lucide-react i animację spin, gdy isLoading jest true. Zablokuj klikanie w tym stanie."

interface ButtonProps {
  isLoading: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function Button({ isLoading, onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors"
    >
      {isLoading ? (
        <span className="mr-2 animate-spin">⏳</span> // Trae zamieni to na piękną ikonę Loader
      ) : null}
      {children}
    </button>
  );
}`
      },
      {
        type: "heading",
        level: 2,
        text: "Kiedy Trae to za mało?",
        id: "kiedy-trae-to-za-malo"
      },
      {
        type: "paragraph",
        text: "Trae nie jest srebrną kulą. Próba zmuszenia go do zaplanowania migracji z JavaScriptu do TypeScriptu w starym projekcie albo do zaimplementowania skomplikowanego przepływu danych między pięcioma różnymi mikroserwisami skończy się frustracją. Trae ma wąskie okno uwagi, skupia się na bieżącym pliku i najbliższych sąsiadach."
      },
      {
        type: "paragraph",
        text: "Gdy czujesz, że zadanie wymaga głębszej analizy architektonicznej, przesiądź się na Claude lub skorzystaj z globalnego okna kontekstowego w AI Studio, aby opracować plan, a dopiero potem wróć do Trae w celu szybkiego wdrożenia gotowych decyzji."
      }
    ]
  },
  {
    id: "3",
    slug: "claude-jako-architekt",
    title: "Claude jako architekt refaktoryzacji",
    subtitle: "Jak mapować dług techniczny i projektować czyste abstrakcje z najbystrzejszym modelem",
    description: "Claude to król koncepcji, czystych typów i przemyślanych architektur. Dowiedz się, jak zdiagnozować przerośnięty komponent, zaprojektować skalowalny model danych i przekazać gotowy plan wykonawczy innym agentom.",
    category: "Architektura",
    tool: "Claude",
    author: {
      name: "Kamil Mikołajczyk",
      role: "Senior IT Project Manager | Product Owner | AI & Digital Transformation",
      avatar: "KM"
    },
    publishedAt: "2026-06-30",
    readTime: 8,
    wordCount: 1600,
    heroImage: "claude_hero",
    imageAlt: "Schemat struktury czystej architektury z wyraźnym podziałem na warstwy",
    imageCaption: "Rys. 3: Trójwarstwowa struktura aplikacji zaprojektowana przez model Claude w celu rozdzielenia logiki biznesowej od interfejsu.",
    accentColor: "amber",
    featured: false,
    tags: ["Claude", "Refactoring", "Clean Architecture", "TypeScript"],
    pullQuote: "Claude jest najlepszy tam, gdzie kod potrzebuje myślenia, a nie tylko dopisania kolejnej funkcji.",
    keyTakeaways: [
      "Wykorzystuj Claude do analizy „smrodu w kodzie” (code smell) i projektowania optymalnych struktur danych.",
      "Zanim napiszesz kod, poproś o analizę 3 alternatywnych podejść architektonicznych wraz z ich zaletami i wadami.",
      "Claude doskonale radzi sobie z tworzeniem ścisłych i wysoce elastycznych definicji typów TypeScript.",
      "Gotowy, zaakceptowany plan architektoniczny od Claude'a stanowi idealny materiał wsadowy (brief) dla Codexa."
    ],
    shareText: "Dopuszczenie kolejnego warunku 'if' to nie refaktoryzacja. Zobacz, jak wykorzystać model Claude do wykrywania długu technicznego, projektowania czystych unii w TypeScript i tworzenia kompletnych planów migracji zanim ktokolwiek napisze chociaż linijkę kodu.",
    hashtags: ["Claude", "TypeScript", "SoftwareArchitecture", "CleanCode", "DziennikBudowy"],
    sections: [
      {
        type: "heading",
        level: 2,
        text: "Dlaczego refaktoryzacja wymaga inteligencji, a nie szablonów?",
        id: "dlaczego-refaktoryzacja"
      },
      {
        type: "paragraph",
        text: "Dopisanie kolejnego warunku „if” w komponencie potrafi każdy prosty generator kodu. Jednak po kilku miesiącach takiego „rozwoju”, aplikacja staje się niespłacalnym długiem technicznym. Komponenty mają po 2000 linijek kodu, stan jest rozproszony, a drobna zmiana w jednym miejscu wywołuje lawinę błędów w innych częściach systemu."
      },
      {
        type: "paragraph",
        text: "Refaktoryzacja to nie jest zwykłe pisanie kodu – to proces myślowy polegający na upraszczaniu, rozdzielaniu odpowiedzialności (Separation of Concerns) i budowaniu czystych, przewidywalnych interfejsów komunikacyjnych. W tej roli Claude – dzięki wybitnym zdolnościom wnioskowania i syntezy informacji – nie ma sobie równych."
      },
      {
        type: "heading",
        level: 2,
        text: "Jak rozmawiać z architektem: sesja projektowa z Claude",
        id: "sesja-z-claude"
      },
      {
        type: "paragraph",
        text: "Nie proś Claude'a od razu o „przepisanie pliku”. Podejdź do tego jak do technicznego brainstormingu z drugim głównym programistą (Staff Engineer):"
      },
      {
        type: "numberedList",
        items: [
          "Przekaż Claude'owi kod źródłowy skomplikowanego modułu i zapytaj: „Jakie problemy architektoniczne, antywzorce i potencjalne wąskie gardła widzisz w tym kodzie?”",
          "Poproś o zaproponowanie nowego podziału komponentów i przepływu danych bez pisania pełnego kodu, a jedynie w postaci opisu ról i interfejsów (TypeScript types).",
          "Przeanalizujcie razem kompromisy techniczne – zapytaj o wady proponowanego rozwiązania.",
          "Poproś o wygenerowanie precyzyjnego planu migracji „krok po kroku”, który można bezpiecznie wdrażać bez paraliżowania pracy reszty zespołu."
        ]
      },
      {
        type: "heading",
        level: 3,
        text: "Przykład refaktoryzacji: Od spaghetti do czystych typów",
        id: "przyklad-refaktoryzacji"
      },
      {
        type: "paragraph",
        text: "Wyobraźmy sobie typowy, przerośnięty stan filtrowania artykułów blogowych, który Claude przekształca w czytelny, bezpieczny i łatwy w rozbudowie typ oparty na dyskryminowanej unii:"
      },
      {
        type: "code",
        language: "typescript",
        code: `// ❌ Przedtem: Luźne, niepowiązane stany podatne na błędy spójności
interface LegacyFilter {
  searchQuery?: string;
  category?: string;
  tool?: string;
  isFeaturedOnly?: boolean;
}

// ✅ Potem (zaprojektowane przez Claude): Jawna definicja stanów i akcji
export type FilterAction =
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_CATEGORY"; payload: string | null }
  | { type: "SET_TOOL"; payload: "Codex" | "Trae" | "Claude" | "AI Studio" | null }
  | { type: "TOGGLE_FEATURED" }
  | { type: "RESET_FILTERS" };

export interface FilterState {
  searchQuery: string;
  category: string | null;
  tool: string | null;
  isFeaturedOnly: boolean;
}`
      },
      {
        type: "heading",
        level: 2,
        text: "Rola Claude'a w hybrydowym workflow",
        id: "rola-w-workflow"
      },
      {
        type: "paragraph",
        text: "Złota zasada brzmi: używaj Claude'a do generowania „mapy drogowej” (blueprint) i szablonów typów. Kiedy plan jest gotowy i zatwierdzony przez Ciebie, skopiuj go i przekaż go jako brief do Codexa (który świetnie zrealizuje masową edycję plików w repozytorium) lub wykonaj precyzyjne poprawki lokalnie za pomocą Trae. Pozwoli Ci to maksymalnie oszczędzić czas i tokeny, zachowując najwyższą jakość inżynierską."
      }
    ]
  },
  {
    id: "4",
    slug: "ai-studio-jako-mapa",
    title: "AI Studio jako mapa całego systemu",
    subtitle: "Wykorzystanie gigantycznego okna kontekstu do audytu architektury i planowania",
    description: "Milion tokenów w służbie dewelopera. Zobacz, jak wrzucić całą dokumentację i strukturę projektu do AI Studio, przeprowadzić głęboki audyt bezpieczeństwa i zaplanować wieloetapowe wdrożenie.",
    category: "Strategia",
    tool: "AI Studio",
    author: {
      name: "Kamil Mikołajczyk",
      role: "Senior IT Project Manager | Product Owner | AI & Digital Transformation",
      avatar: "KM"
    },
    publishedAt: "2026-07-01",
    readTime: 6,
    wordCount: 1100,
    heroImage: "aistudio_hero",
    imageAlt: "Wizualizacja okna kontekstu łączącego kod źródłowy z bazami wiedzy",
    imageCaption: "Rys. 4: Koncepcja gigantycznego okna kontekstu integrującego kod źródłowy, dokumentację API i logi systemowe.",
    accentColor: "sky",
    featured: false,
    tags: ["AI Studio", "Context Window", "Code Audit", "System Design"],
    pullQuote: "AI Studio nie musi pisać ostatniej linijki kodu. Czasem jego największą wartością jest to, że pokazuje, gdzie tej linijki nie pisać.",
    keyTakeaways: [
      "Dzięki oknu kontekstu rzędu 1-2 milionów tokenów możesz załadować do modelu cały kod projektu wraz z dokumentacją bibliotek zewnętrznych.",
      "AI Studio doskonale sprawdza się przy wyszukiwaniu nieoczywistych podatności i luk bezpieczeństwa w rozproszonych plikach.",
      "Używaj systemu do generowania map zależności, ułatwiających onboarding nowych programistów.",
      "Model potrafi przeanalizować całe standardy technologiczne firmy i sprawdzić zgodność repozytorium z tymi wytycznymi."
    ],
    shareText: "Co się dzieje, gdy wrzucisz całe repozytorium z dokumentacją do okna kontekstu rzędu 2 milionów tokenów? Odkryj, jak używać AI Studio do błyskawicznego onboardingu w starym kodzie (legacy) oraz wykrywania nieoczywistych podatności bezpieczeństwa z lotu ptaka.",
    hashtags: ["AIStudio", "Gemini", "CodeAudit", "SystemDesign", "DziennikBudowy"],
    sections: [
      {
        type: "heading",
        level: 2,
        text: "Kontekst to król – nowa era analizy systemowej",
        id: "kontekst-to-krol"
      },
      {
        type: "paragraph",
        text: "Przez lata największym ograniczeniem modeli językowych w programowaniu było małe okno kontekstu. Deweloper musiał starannie wybierać pliki, które przesyła do czatu, co często powodowało, że model pomijał kluczowe powiązania systemowe. AI Studio z modelami z rodziny Gemini eliminuje tę barierę, oferując okno kontekstu zdolne pomieścić setki plików źródłowych, kompletną dokumentację, a nawet historię commitów."
      },
      {
        type: "paragraph",
        text: "Mając do dyspozycji tak ogromną pamięć roboczą, możemy traktować model nie jak asystenta piszącego pojedyncze linijki, ale jak wszechwiedzącego partnera architektonicznego, który widzi projekt z lotu ptaka."
      },
      {
        type: "heading",
        level: 2,
        text: "Zastosowanie praktyczne: Audyt i Onboarding",
        id: "zastosowanie-audyt"
      },
      {
        type: "paragraph",
        text: "Dwa scenariusze, w których gigantyczny kontekst AI Studio deklasuje inne rozwiązania:"
      },
      {
        type: "bulletList",
        items: [
          "Kompleksowy audyt bezpieczeństwa – Załaduj kod aplikacji, konfiguracje środowiskowe (bez rzeczywistych sekretów!) i pliki Dockerfile. Poproś model o znalezienie luk OWASP Top 10, błędów w obsłudze CORS, podatności na SQL Injection czy wycieków pamięci.",
          "Błyskawiczny onboarding w starym projekcie (Legacy Code) – Jeśli wchodzisz do projektu rozwijanego przez 5 lat bez aktualnej dokumentacji, wrzuć kod do AI Studio i poproś o wygenerowanie interaktywnej mapy systemu: jakie są kluczowe moduły, jak przepływają dane i gdzie szukać poszczególnych funkcjonalności."
        ]
      },
      {
        type: "heading",
        level: 3,
        text: "Przykładowe zapytanie o mapę zależności",
        id: "zapytanie-o-mape"
      },
      {
        type: "paragraph",
        text: "Zamiast ręcznie analizować powiązania, możesz wydać AI Studio następujące polecenie:"
      },
      {
        type: "code",
        language: "markdown",
        code: `Przeanalizuj całe zaimportowane repozytorium i stwórz dokument architektoniczny w formacie Markdown:
1. Zidentyfikuj główny punkt wejścia aplikacji i opisz przepływ sterowania.
2. Wymień wszystkie zewnętrzne integracje API i powiązane z nimi pliki usług.
3. Przedstaw diagram Mermaid pokazujący zależności między komponentami UI a modułami zarządzania stanem.
4. Wskaż 3 miejsca o największym stopniu skomplikowania (high coupling), które powinny zostać zrefaktoryzowane.`
      },
      {
        type: "heading",
        level: 2,
        text: "Przekuwanie analizy w działanie",
        id: "analiza-w-dzialanie"
      },
      {
        type: "paragraph",
        text: "Największa wartość z audytu w AI Studio płynie wtedy, gdy wnioski przekształcamy w konkretne zadania. Model po przeanalizowaniu całości potrafi precyzyjnie wskazać, które pliki i w jakiej kolejności należy zmodyfikować, aby osiągnąć pożądany cel biznesowy lub techniczny. Otrzymujemy gotową, spójną instrukcję działania, eliminującą ryzyko „ślepych uliczek” podczas pisania kodu."
      }
    ]
  },
  {
    id: "5",
    slug: "jedno-repo-cztery-narzedzia",
    title: "Jedno repo, cztery narzędzia AI: mój workflow",
    subtitle: "Jak połączyć Codex, Trae, Claude i AI Studio w jeden, bezbłędny proces programowania",
    description: "Używanie wielu narzędzi AI na raz może prowadzić do konfliktów, nadpisywania kodu i frustracji. Dowiedz się, jak podzielić role, zachować porządek w systemie kontroli wersji i stworzyć synergiczny workflow.",
    category: "Workflow",
    tool: "AI Studio",
    author: {
      name: "Kamil Mikołajczyk",
      role: "Senior IT Project Manager | Product Owner | AI & Digital Transformation",
      avatar: "KM"
    },
    publishedAt: "2026-07-01",
    readTime: 9,
    wordCount: 1850,
    heroImage: "workflow_hero",
    imageAlt: "Przedstawienie synergii czterech narzędzi AI połączonych w spójny łańcuch dostarczania oprogramowania",
    imageCaption: "Rys. 5: Schemat współdziałania AI Studio, Claude, Codex i Trae w codziennym cyklu wytwórczym oprogramowania.",
    accentColor: "violet",
    featured: false,
    tags: ["Workflow", "AI Engineering", "Productivity", "Best Practices"],
    pullQuote: "Nie wygrywa ten, kto używa najwięcej narzędzi AI. Wygrywa ten, kto wie, kiedy każde z nich ma milczeć.",
    keyTakeaways: [
      "Zdefiniuj jasne, sztywne role dla każdego narzędzia AI w swoim codziennym workflow.",
      "Traktuj lokalne repozytorium Git jako jedyne źródło prawdy (Single Source of Truth) i twórz małe, tematyczne gałęzie (feature branches).",
      "Nigdy nie pozwalaj dwóm agentom AI edytować tego samego kodu w tym samym czasie.",
      "Przekazuj precyzyjny kontekst (prompt chaining) – plany architektoniczne stworzone przez Claude'a są idealnymi briefami dla Codexa."
    ],
    shareText: "Używasz kilku agentów AI i zaczynają nadpisywać swój kod? Poznaj moją sprawdzoną matrycę odpowiedzialności łączącą AI Studio, Claude, Codexa i Trae w jeden, przewidywalny łańcuch dostarczania oprogramowania bez konfliktów i straty czasu.",
    hashtags: ["AIWorkflow", "DevProductivity", "Codex", "Claude", "DziennikBudowy"],
    sections: [
      {
        type: "heading",
        level: 2,
        text: "Klątwa wielozadaniowości: chaos w świecie wielu agentów",
        id: "klatwa-wielozadaniowosci"
      },
      {
        type: "paragraph",
        text: "Kiedy deweloperzy odkrywają potęgę narzędzi AI Coding, często wpadają w pułapkę nadużywania. Uruchamiają asystenta w edytorze (Trae), jednocześnie zlecają agentowi w przeglądarce (Codex) pisanie nowych funkcji, a w tle wysyłają zapytania o refaktoryzację do Claude'a. Efekt? Agenty nadpisują nawzajem swoje zmiany, w kodzie pojawiają się sprzeczne wzorce projektowe, a czas spędzony na rozwiązywaniu konfliktów i naprawianiu błędów przekracza czas samodzielnego pisania."
      },
      {
        type: "paragraph",
        text: "Kluczem do sukcesu nie jest maksymalizacja liczby generowanych linii kodu, lecz precyzyjna orkiestracja i przypisanie każdemu narzędziu unikalnej, wyspecjalizowanej roli w procesie wytwórczym."
      },
      {
        type: "heading",
        level: 2,
        text: "Podział ról: Moja sprawdzona matryca odpowiedzialności",
        id: "podzial-rol"
      },
      {
        type: "paragraph",
        text: "Aby uniknąć chaosu, wprowadziłem ścisły podział ról bazujący na mocnych stronach poszczególnych modeli i interfejsów:"
      },
      {
        type: "bulletList",
        items: [
          "AI Studio (Mapa i Strategia) – Używam go na samym początku zadania. Służy do analizy całego projektu, zrozumienia zależności oraz wygenerowania wysokopoziomowej strategii wdrożenia.",
          "Claude (Architektura i Logika) – Gdy znam już ogólny kierunek, zapraszam Claude'a do zaprojektowania struktur danych, definicji typów TypeScript oraz napisania kluczowych, złożonych algorytmów.",
          "Codex (Budowanie i Automatyzacja) – Otrzymuje gotowy projekt architektury i typów od Claude'a jako brief. Jego zadaniem jest autonomiczne napisanie brakujących modułów, testów jednostkowych i integracja komponentów na poziomie całego repozytorium.",
          "Trae (Wykończenie i Detale) – Pracuje lokalnie bezpośrednio w edytorze. Odpowiada za mikro-poprawki, dopieszczanie stylów CSS (Tailwind), obsługę stanów brzegowych UI i szybkie iterowanie na podstawie podglądu w przeglądarce."
        ]
      },
      {
        type: "heading",
        level: 3,
        text: "Cykl życia zadania w nowoczesnym workflow",
        id: "cykl-zycia-zadania"
      },
      {
        type: "paragraph",
        text: "Jak wygląda realizacja nowej, dużej funkcji (np. systemu subskrypcji) od A do Z w tym modelu?"
      },
      {
        type: "numberedList",
        items: [
          "Faza 1 (AI Studio): Analiza kodu płatności w projekcie i stworzenie raportu integracji.",
          "Faza 2 (Claude): Zaprojektowanie stanów subskrypcji i interfejsów API w TypeScript.",
          "Faza 3 (Codex): Stworzenie nowej gałęzi (feature/billing), wygenerowanie kodu integracji z API płatności oraz napisanie testów integracyjnych.",
          "Faza 4 (Weryfikacja): Uruchomienie automatycznego procesu budowania i lintera w celu wykrycia ewentualnych niespójności.",
          "Faza 5 (Trae): Uruchomienie lokalnego serwera deweloperskiego i dopracowanie wyglądu kart planów taryfowych oraz animacji przejść."
        ]
      },
      {
        type: "quote",
        text: "Synergia powstaje wtedy, gdy wynik pracy jednego narzędzia staje się precyzyjnym wejściem dla drugiego. Claude tworzy architekturę, Codex pisze kod, linter pilnuje standardów, a Trae dopieszcza interfejs."
      },
      {
        type: "heading",
        level: 2,
        text: "Zasady BHP pracy z AI",
        id: "zasady-bhp"
      },
      {
        type: "paragraph",
        text: "Aby ten workflow działał stabilnie i przewidywalnie, każdy inżynier oprogramowania powinien przestrzegać trzech żelaznych zasad:"
      },
      {
        type: "bulletList",
        items: [
          "Zasada 1: Git jako jedyne źródło prawdy – Każdy agent musi startować z czystego stanu repozytorium. Twórz małe commity, aby w razie niepowodzenia móc natychmiast wycofać zmiany (git reset --hard).",
          "Zasada 2: Jeden agent na raz – Nigdy nie uruchamiaj dwóch różnych procesów generowania kodu jednocześnie w tym samym obszarze roboczym.",
          "Zasada 3: Statyczna analiza kodu to świętość – Jeśli linter albo kompilator zgłasza błąd, nie ignoruj go. Napraw go przed przejściem do kolejnego kroku."
        ]
      },
      {
        type: "heading",
        level: 2,
        text: "Podsumowanie",
        id: "podsumowanie-workflow"
      },
      {
        type: "paragraph",
        text: "Wdrożenie hybrydowego workflow łączącego AI Studio, Claude'a, Codexa i Trae pozwala na bezprecedensowy wzrost produktywności. Zamiast pisać powtarzalny kod, skupiasz się na projektowaniu, podejmowaniu decyzji i orkiestracji inteligentnych agentów. Stajesz się dyrygentem orkiestry, w której każdy muzyk gra dokładnie to, w czym jest najlepszy."
      }
    ]
  },
  {
    id: "6",
    slug: "jak-powstawal-blog-ai-coding",
    title: "Jak powstawał blog AI Coding: changelog jako historia produktu",
    subtitle: "Od statycznego SPA po newsroom, automatyzacje, SEO i ciemny motyw",
    description: "Kulisy kolejnych iteracji nad blogiem technologicznym: architektura React/Vite, publikacje, newsroom AI, slider video, integracje Google, SEO oraz decyzje UX, które zmieniają prosty blog w pełniejszy produkt redakcyjny.",
    category: "Strategia",
    tool: "Codex",
    author: {
      name: "Kamil Mikołajczyk",
      role: "Senior IT Project Manager | Product Owner | AI & Digital Transformation",
      avatar: "KM"
    },
    publishedAt: "2026-07-09",
    readTime: 8,
    wordCount: 1750,
    heroImage: "workflow_hero",
    imageAlt: "Schemat rozwoju bloga technologicznego od fundamentu po newsroom i SEO",
    imageCaption: "Rys. 6: Changelog jako mapa iteracyjnego rozwoju produktu redakcyjnego.",
    accentColor: "emerald",
    featured: false,
    tags: ["Changelog", "Product", "SEO", "React", "AI Workflow"],
    pullQuote: "Dobry changelog nie jest listą technicznych drobiazgów. Jest pamięcią produktu: pokazuje decyzje, priorytety i kierunek dojrzewania.",
    keyTakeaways: [
      "Blog można rozwijać jak produkt: małymi iteracjami, z jasnym celem każdej zmiany.",
      "Newsroom, automatyzacje i biblioteka artykułów powinny mieć oddzielne źródła danych i statusy publikacji.",
      "SEO, polityka prywatności, CTA i responsywność nie są dodatkami, tylko częścią wiarygodności.",
      "Changelog pomaga utrzymać ciągłość pracy między kolejnymi agentami AI i przyszłymi wdrożeniami."
    ],
    shareText: "Kulisy ewolucji bloga 'AI w praktyce': od prostego statycznego SPA po newsroom z automatyzacją, integracje Google Workspace oraz pełne SEO. Przeczytaj, dlaczego prowadzenie czytelnego changelogu jest kluczowe w pracy z kolejnymi agentami AI.",
    hashtags: ["ProductManagement", "React", "Vite", "Changelog", "DziennikBudowy"],
    sections: [
      {
        type: "heading",
        level: 2,
        text: "Część 1: Fundament techniczny",
        id: "fundament-techniczny"
      },
      {
        type: "paragraph",
        text: "Projekt zaczął się jako statyczne SPA oparte o React 19, TypeScript, Vite i Tailwind CSS v4. Najważniejszą decyzją architektoniczną było rozdzielenie treści artykułów od komponentów interfejsu. Dzięki temu blog nie stał się jedną dużą stroną z ręcznie wpisanym HTML, tylko uporządkowaną aplikacją, w której dane, layout, routing i typy mają osobne odpowiedzialności."
      },
      {
        type: "paragraph",
        text: "HashRouter został wybrany z myślą o GitHub Pages, aby bezpiecznie obsługiwać bezpośrednie linki do artykułów bez błędów 404. To praktyczny kompromis dla projektu, który ma działać stabilnie jako statyczna publikacja."
      },
      {
        type: "heading",
        level: 2,
        text: "Część 2: Od bloga do narzędzia redakcyjnego",
        id: "narzedzie-redakcyjne"
      },
      {
        type: "paragraph",
        text: "Kolejna iteracja dodała elementy zaplecza redakcyjnego: newsletter, lokalny fallback zapisu subskrypcji, integrację Gmail SMTP oraz Strefę Twórcy połączoną z Google Drive i Google Docs. Blog zaczął działać nie tylko jako miejsce publikacji, ale jako środowisko pracy nad treściami."
      },
      {
        type: "bulletList",
        items: [
          "Newsletter zbiera adresy nawet wtedy, gdy SMTP nie jest skonfigurowany.",
          "Strefa Twórcy pozwala pracować z dokumentami Google bez ręcznego kopiowania treści.",
          "Tokeny Google są trzymane w pamięci, a nie w localStorage, co ogranicza ryzyko bezpieczeństwa."
        ]
      },
      {
        type: "heading",
        level: 2,
        text: "Część 3: Newsroom, automatyzacje i statusy publikacji",
        id: "newsroom-automatyzacje"
      },
      {
        type: "paragraph",
        text: "Największa zmiana produktowa dotyczyła newsroomu. Dzienne newsy, materiały TOP 3 i AI briefing zostały spięte w jeden układ, ale bez mieszania szkiców z publicznymi artykułami. To ważne, bo automatyzacja może tworzyć treść szybko, ale publikacja wymaga osobnej decyzji redakcyjnej."
      },
      {
        type: "paragraph",
        text: "Widok newsroomu dostał etykiety Tech PL, Tech World oraz trzy podkategorie TOP 3. Karty newsów pokazują źródło, datę, mocniejsze tło labeli i lokalne video, które może uruchamiać się po najechaniu lub po zatrzymaniu scrolla na mobile."
      },
      {
        type: "heading",
        level: 2,
        text: "Część 4: Mobile, SEO i zaufanie",
        id: "mobile-seo-zaufanie"
      },
      {
        type: "paragraph",
        text: "Po rozbudowie treści priorytet przeszedł na mobile responsiveness, widoczność i konwersję. Slider został dopasowany do małych ekranów, przyciski przestały wypadać poza viewport, a sekcja hero otrzymała mocniejszy headline oraz dwa CTA: czytanie artykułów i kontakt."
      },
      {
        type: "paragraph",
        text: "Warstwa SEO została uzupełniona o meta title, description, Open Graph, Twitter Card, canonical, sitemap, robots i schema.org. Dodanie polityki prywatności oraz jawnego kontaktu jest szczególnie istotne po włączeniu Google Analytics i formularza newslettera."
      },
      {
        type: "heading",
        level: 2,
        text: "Część 5: Dlaczego changelog zostaje w repozytorium",
        id: "dlaczego-changelog"
      },
      {
        type: "paragraph",
        text: "Changelog jest tu czymś więcej niż dodatkiem do GitHuba. To zapis decyzji produktowych, który pomaga kolejnym agentom AI i ludziom zrozumieć, dlaczego blog wygląda i działa w określony sposób. Zamiast odtwarzać historię z commitów, można szybko zobaczyć kolejne etapy: fundament, full-stack, automatyzacje, newsroom, SEO i UX."
      },
      {
        type: "quote",
        text: "Najlepsze projekty AI-native nie powstają w jednym wielkim skoku. Powstają przez serię małych, dobrze opisanych iteracji."
      },
      {
        type: "heading",
        level: 2,
        text: "Co dalej",
        id: "co-dalej"
      },
      {
        type: "paragraph",
        text: "Następny etap to dalsza profesjonalizacja publikacji: lepsze obrazy OG dla każdego artykułu, statyczne generowanie pod SEO, panel redakcyjny statusów, testy wizualne oraz automatyczne raportowanie efektów publikacji."
      }
    ]
  },
  {
    id: "7",
    slug: "10-featureow-ktore-rozwina-blog-ai-coding",
    title: "10 feature’ów, które rozwiną blog AI Coding",
    subtitle: "Dlaczego warto wdrożyć SEO SSG, OG images, Consent Mode, Web Vitals i panel redakcyjny",
    description: "Strategiczny przegląd dziesięciu funkcji, które mogą zwiększyć widoczność, zaufanie, jakość techniczną i powtarzalność pracy redakcyjnej na blogu technologicznym.",
    category: "Strategia",
    tool: "AI Studio",
    author: {
      name: "Kamil Mikołajczyk",
      role: "Senior IT Project Manager | Product Owner | AI & Digital Transformation",
      avatar: "KM"
    },
    publishedAt: "2026-07-09",
    readTime: 10,
    wordCount: 2100,
    heroImage: "aistudio_hero",
    imageAlt: "Mapa rozwoju funkcji bloga technologicznego AI Coding",
    imageCaption: "Rys. 7: Dziesięć funkcji, które przesuwają blog z poziomu publikacji do produktu redakcyjnego.",
    accentColor: "sky",
    featured: false,
    tags: ["SEO", "Product Roadmap", "Web Vitals", "Consent Mode", "Content Ops"],
    pullQuote: "Feature ma sens wtedy, gdy poprawia jeden z czterech obszarów: widoczność, zaufanie, szybkość decyzji albo powtarzalność procesu.",
    keyTakeaways: [
      "Pre-render i dynamiczne OG images zwiększają szansę, że treść będzie poprawnie widoczna w Google i social media.",
      "Consent Mode v2 oraz polityka prywatności wzmacniają zaufanie i porządkują analitykę.",
      "Dashboard Web Vitals zamienia wydajność z abstrakcyjnego tematu w codzienny wskaźnik produktu.",
      "Panel redakcyjny, bramka grafik i CI redukują ryzyko publikacji niedopracowanych materiałów."
    ],
    shareText: "Jak przesunąć projekt z poziomu zwykłego bloga do dojrzałego produktu redakcyjnego? Przeanalizuj 10 kluczowych usprawnień: od dynamicznych kart OG, przez Consent Mode v2, po dashboard Core Web Vitals i automatyczne bramki jakości w CI.",
    hashtags: ["ProductRoadmap", "SEO", "WebVitals", "WebDev", "DziennikBudowy"],
    sections: [
      {
        type: "heading",
        level: 2,
        text: "1. Pre-render/SSG dla artykułów pod SEO",
        id: "pre-render-ssg"
      },
      {
        type: "paragraph",
        text: "SPA jest wygodne w rozwoju, ale roboty wyszukiwarek i podglądy social media wolą gotowy HTML. Pre-render lub SSG daje każdemu artykułowi własną statyczną stronę z tytułem, opisem, treścią, canonicalem i JSON-LD. To zwiększa czytelność dla crawlerów i zmniejsza zależność SEO od JavaScriptu."
      },
      {
        type: "heading",
        level: 2,
        text: "2. Dynamiczne OG images",
        id: "dynamiczne-og-images"
      },
      {
        type: "paragraph",
        text: "Kiedy artykuł albo news trafia na LinkedIn, pierwszym kontaktem odbiorcy często jest obraz podglądu. Dynamiczne OG images pozwalają automatycznie tworzyć spójne banery z tytułem, kategorią i brandingiem. To ma bezpośredni wpływ na klikalność i profesjonalny odbiór treści."
      },
      {
        type: "heading",
        level: 2,
        text: "3. Consent Mode v2 i banner zgód",
        id: "consent-mode"
      },
      {
        type: "paragraph",
        text: "Analityka bez przejrzystej zgody osłabia zaufanie. Consent Mode v2 pozwala uporządkować działanie Google Analytics, jasno rozdzielić zgodę na pomiar od reklam i dać użytkownikowi realny wybór. To ważne szczególnie wtedy, gdy blog ma wspierać markę ekspercką."
      },
      {
        type: "heading",
        level: 2,
        text: "4. Lokalny indeks wyszukiwania",
        id: "lokalny-indeks"
      },
      {
        type: "paragraph",
        text: "Wraz ze wzrostem liczby newsów i artykułów zwykły filtr przestaje wystarczać. Lokalny indeks wyszukiwania pozwala szybko przeszukiwać tytuły, tagi, leady, kategorie i źródła bez wysyłania zapytań na zewnętrzny serwer. To poprawia UX i utrzymuje prywatność."
      },
      {
        type: "heading",
        level: 2,
        text: "5. Panel redakcyjny DRAFT/APPROVED",
        id: "panel-redakcyjny"
      },
      {
        type: "paragraph",
        text: "Automatyzacje mogą produkować dużo treści, ale publikacja wymaga kontroli jakości. Panel statusów pozwala szybko zobaczyć, co jest szkicem, co ma komplet grafik, co przeszło weryfikację i co może trafić na stronę publiczną."
      },
      {
        type: "heading",
        level: 2,
        text: "6. Bramka publikacji z kompletem grafik",
        id: "bramka-grafik"
      },
      {
        type: "paragraph",
        text: "Materiał bez grafiki wygląda jak niedokończony. Automatyczna bramka blokująca publikację bez kompletu legalnych, lokalnych grafik chroni jakość wizualną bloga i ogranicza ryzyko przypadkowego użycia zewnętrznych zasobów."
      },
      {
        type: "heading",
        level: 2,
        text: "7. Web Vitals dashboard",
        id: "web-vitals-dashboard"
      },
      {
        type: "paragraph",
        text: "Core Web Vitals przekładają się na odczucie szybkości, komfort czytania i pośrednio na SEO. Dashboard widoczny w projekcie sprawia, że wydajność nie jest sprawdzana dopiero po problemach, tylko staje się stałym elementem pracy nad produktem."
      },
      {
        type: "heading",
        level: 2,
        text: "8. Rekomendowane artykuły pod wpisem",
        id: "rekomendacje"
      },
      {
        type: "paragraph",
        text: "Czytelnik, który kończy artykuł, jest w najlepszym momencie na kolejny krok. Rekomendacje zwiększają liczbę odsłon, prowadzą użytkownika przez temat i pomagają budować ścieżki wiedzy zamiast pojedynczych, oderwanych wpisów."
      },
      {
        type: "heading",
        level: 2,
        text: "9. Generator grafik LinkedIn",
        id: "generator-linkedin"
      },
      {
        type: "paragraph",
        text: "Jeśli blog regularnie publikuje newsy, ręczne projektowanie grafik szybko staje się wąskim gardłem. Generator szablonów LinkedIn pozwala utrzymać spójność marki i skrócić drogę od publikacji newsa do dystrybucji w social media."
      },
      {
        type: "heading",
        level: 2,
        text: "10. Playwright CI dla mobile i krytycznych route",
        id: "playwright-ci"
      },
      {
        type: "paragraph",
        text: "Najbardziej bolesne błędy frontendowe często pojawiają się na mobile: overflow, niedziałające menu, za małe przyciski, niewidoczne video. Testy Playwright w CI mogą automatycznie sprawdzać slider, newsroom, artykuły i politykę prywatności przed publikacją."
      }
    ]
  },
  {
    id: "8",
    slug: "iteracja-seo-vitals-og-consent",
    title: "Iteracja SEO, Web Vitals, OG images i Consent Mode",
    subtitle: "Jak blog dostał statyczne strony pod SEO, dashboard jakości i uporządkowaną analitykę",
    description: "Opis konkretnej iteracji wdrożeniowej: statyczne snapshoty artykułów i newsów, generowane grafiki OG, Consent Mode v2, banner zgód oraz Web Vitals dashboard.",
    category: "Workflow",
    tool: "Codex",
    author: {
      name: "Kamil Mikołajczyk",
      role: "Senior IT Project Manager | Product Owner | AI & Digital Transformation",
      avatar: "KM"
    },
    publishedAt: "2026-07-09",
    readTime: 7,
    wordCount: 1650,
    heroImage: "codex_hero",
    imageAlt: "Proces wdrożenia SEO, analityki i pomiaru jakości technicznej bloga",
    imageCaption: "Rys. 8: Iteracja łącząca widoczność, prywatność, social preview i wydajność.",
    accentColor: "indigo",
    featured: false,
    tags: ["Iteration", "SSG", "Open Graph", "GA4", "Web Vitals"],
    pullQuote: "Ta iteracja nie dodaje kolejnej dekoracji. Dodaje mechanizmy, które pomagają blogowi być widocznym, mierzalnym i godnym zaufania.",
    keyTakeaways: [
      "SSG snapshoty dają artykułom i newsom statyczne HTML pod crawlery.",
      "OG images są generowane automatycznie z danych treści.",
      "Consent Mode v2 porządkuje działanie Google Analytics i decyzje użytkownika.",
      "Web Vitals dashboard pokazuje jakość techniczną bez opuszczania strony."
    ],
    shareText: "Raport z konkretnego sprintu: jak dodaliśmy statyczny pre-render SSG, automatyczne generowanie banerów Social Open Graph, baner zgód Consent Mode v2 i pomiar wydajności w czasie rzeczywistym. Zobacz szczegóły wdrożenia w React i Vite.",
    hashtags: ["SSG", "OpenGraph", "GA4", "Performance", "DziennikBudowy"],
    sections: [
      {
        type: "heading",
        level: 2,
        text: "Zakres iteracji",
        id: "zakres-iteracji"
      },
      {
        type: "paragraph",
        text: "W tej iteracji blog dostał cztery elementy, które wzmacniają go jako produkt: pre-render/SSG dla artykułów i newsów, automatyczne grafiki Open Graph, Consent Mode v2 z bannerem zgód oraz dashboard Web Vitals."
      },
      {
        type: "heading",
        level: 2,
        text: "Statyczne strony dla crawlerów",
        id: "statyczne-strony"
      },
      {
        type: "paragraph",
        text: "Aplikacja nadal działa jako HashRouter, ale build generuje dodatkowe pliki HTML w katalogu dist. Każdy artykuł dostaje własny adres statyczny z title, description, canonical, JSON-LD i skrótem treści. Newsroom również otrzymuje statyczne strony dla wybranych materiałów."
      },
      {
        type: "heading",
        level: 2,
        text: "Dynamiczne OG images",
        id: "dynamiczne-og"
      },
      {
        type: "paragraph",
        text: "Ten sam generator tworzy pliki SVG w katalogach og/articles i og/news. Obrazy zawierają tytuł, kategorię, krótki opis i branding bloga, dzięki czemu linki udostępniane w social media mają spójny, profesjonalny podgląd."
      },
      {
        type: "heading",
        level: 2,
        text: "Consent Mode i prywatność",
        id: "consent-prywatnosc"
      },
      {
        type: "paragraph",
        text: "Google Analytics działa teraz z domyślnie odmówioną zgodą na analitykę, a użytkownik może świadomie zaakceptować pomiar lub wybrać tylko niezbędne ustawienia. Decyzja jest zapisywana lokalnie i aktualizuje tryb zgód w gtag."
      },
      {
        type: "heading",
        level: 2,
        text: "Web Vitals jako panel operacyjny",
        id: "web-vitals-panel"
      },
      {
        type: "paragraph",
        text: "Na stronie głównej pojawił się dashboard FCP, LCP, CLS, INP i TTFB. To pomiar lokalny w przeglądarce, który daje szybki sygnał, czy kolejne zmiany nie pogarszają komfortu korzystania ze strony."
      },
      {
        type: "heading",
        level: 2,
        text: "Efekt końcowy",
        id: "efekt-koncowy"
      },
      {
        type: "paragraph",
        text: "Blog jest teraz lepiej przygotowany do publikacji, dystrybucji i pomiaru. Treść jest czytelniejsza dla crawlerów, linki mają własne grafiki, analityka szanuje decyzje użytkownika, a wydajność stała się widocznym elementem dashboardu."
      }
    ]
  },
  {
    id: "9",
    slug: "pierwsze-kroki-z-antygravity",
    title: "Pierwsze kroki z Google Antigravity",
    subtitle: "Jak oswoić agenta AI pracującego bezpośrednio w Twoim kodzie i orkiestrować workflow",
    description: "Kompleksowy poradnik opisujący onboarding do nowego projektu z asystentem Antygravity. Dowiedz się, jak analizować kod systemowy, rozmawiać z modelami Vertex i dbać o bezpieczeństwo lokalnego repozytorium.",
    category: "Workflow",
    tool: "AI Studio",
    author: {
      name: "Kamil Mikołajczyk",
      role: "Senior IT Project Manager | Product Owner | AI & Digital Transformation",
      avatar: "KM"
    },
    publishedAt: "2026-07-17",
    readTime: 8,
    wordCount: 1680,
    heroImage: "antigravity_hero",
    imageAlt: "Centralny schemat asystenta Antigravity łączący CLI, IDE oraz Auxiliary Pane",
    imageCaption: "Rys. 9: Środowisko Google Antigravity i jego trzy główne powierzchnie operacyjne.",
    accentColor: "indigo",
    featured: false,
    tags: ["Antigravity", "Onboarding", "AI Workflow", "Model Context Protocol", "New"],
    pullQuote: "Prawdziwa praca z agentem w repozytorium nie polega na bezmyślnym zatwierdzaniu sugerowanych zmian, ale na rygorystycznym sprawdzaniu planów i automatycznej weryfikacji.",
    keyTakeaways: [
      "Antygravity (AGY) integruje interfejs CLI (agy), dedykowane IDE oraz aplikację Desktop 2.0 z panelem pomocniczym (Aux Pane).",
      "Przed rozpoczęciem prac asystent musi przeczytać pliki kontekstowe projektu, takie jak PROJECT_CONTEXT.md i AGENTS.md.",
      "Model Context Protocol (MCP) umożliwia bezpośrednie i bezpieczne łączenie modeli językowych z lokalnymi zasobami.",
      "Weryfikacja automatyczna za pomocą npm run lint i npm run build gwarantuje stabilność zmian przy każdym zatwierdzeniu."
    ],
    shareText: "Przewodnik po ekosystemie Google Antigravity (AGY): CLI, IDE oraz Auxiliary Pane. Dowiedz się, jak asystent prowadzi onboarding w repozytorium przez pliki AGENTS.md, jak działa Model Context Protocol (MCP) i dlaczego weryfikacja automatyczna jest kluczem do sukcesu.",
    hashtags: ["GoogleAntigravity", "ModelContextProtocol", "AIAgents", "DeveloperTools", "DziennikBudowy"],
    sections: [
      {
        type: "heading",
        level: 2,
        text: "Poznaj Antygravity: Środowisko AI-first nowej generacji",
        id: "poznaj-antygravity"
      },
      {
        type: "paragraph",
        text: "Google Antigravity to nie jest kolejna wtyczka do edytora kodu. To kompletny, nowoczesny ekosystem stworzony z myślą o programowaniu sterowanym przez sztuczną inteligencję (AI-first). W przeciwieństwie do tradycyjnych modeli opartych o interfejs czatu w przeglądarce, Antygravity działa w oparciu o głęboką integrację z repozytorium kodu, z pełnym dostępem do kontekstu plików, struktury katalogów i narzędzi systemowych.\n\nEkosystem ten składa się z trzech głównych powierzchni: interfejsu wiersza poleceń CLI (agy), dedykowanego, niezależnego środowiska IDE oraz interfejsu Desktop 2.0, w którym kluczową rolę odgrywa panel HTML (Auxiliary Pane) przeznaczony do zarządzania subagentami, zadaniami w tle i weryfikacją plików."
      },
      {
        type: "illustration",
        imageKey: "antigravity_hero",
        caption: "Rys. 1: Trzy główne powierzchnie operacyjne Google Antigravity połączone z centralnym rdzeniem asystenta."
      },
      {
        type: "heading",
        level: 2,
        text: "Krok 1: Jak zapoznaję się z dotychczasowym projektem",
        id: "zapoznanie-z-projektem"
      },
      {
        type: "paragraph",
        text: "Wejście do istniejącego projektu (szczególnie tak zaawansowanego jak 'AI w praktyce') wymaga od agenta AI rygorystycznego przestrzegania procedur badawczych. Zamiast chaotycznego przeglądania kodu lub natychmiastowego dokonywania modyfikacji, Antygravity stosuje ustrukturyzowany onboarding oparty o czytanie dokumentów kontekstowych:\n\n1. Analiza manifestu migracyjnego: W pierwszej kolejności czytany jest plik PROJECT_CONTEXT.md. Zawiera on cel biznesowy, aktualny stan wdrożeń, listę integracji zewnętrznych oraz najważniejsze decyzje architektoniczne (takie jak użycie HashRoutera czy Firestore).\n2. Zapoznanie się z regułami agentów: Następnie asystent analizuje plik AGENTS.md, który definiuje rygorystyczne zasady typowania, wytyczne dotyczące dostępności, sposoby dodawania artykułów oraz strukturę katalogów.\n3. Weryfikacja spójności: Przed rozpoczęciem edycji uruchamiana jest analiza statyczna projektu, aby potwierdzić, że wchodzimy do działającego i stabilnego środowiska."
      },
      {
        type: "illustration",
        imageKey: "antigravity_onboarding",
        caption: "Rys. 2: Trzyetapowy proces onboardingu asystenta AI do nowego repozytorium kodu."
      },
      {
        type: "heading",
        level: 2,
        text: "Model Context Protocol (MCP) jako uniwersalny interfejs",
        id: "mcp-interfejs"
      },
      {
        type: "paragraph",
        text: "Kluczym elementem architektury Antygravity jest obsługa standardu Model Context Protocol (MCP). Protokół ten definiuje otwarty i bezpieczny schemat komunikacji między modelami językowymi (np. Gemini 3.5 Flash w Vertex AI) a lokalnymi narzędziami oraz bazami danych.\n\nDzięki MCP model nie musi polegać na zewnętrznych serwerach pośredniczących. Może bezpośrednio wysyłać zapytania do systemu plików, uruchamiać precyzyjne polecenia w terminalu deweloperskim czy odpytywać lokalną bazę danych w celu walidacji schematów. Wszystko to odbywa się w kontrolowanym środowisku piaskownicy, w którym uprawnienia są granularnie przydzielane przez użytkownika."
      },
      {
        type: "illustration",
        imageKey: "antigravity_architecture",
        caption: "Rys. 3: Diagram integracji Model Context Protocol (MCP) łączący asystenta z zasobami lokalnymi i chmurowymi."
      },
      {
        type: "heading",
        level: 2,
        text: "Zasady BHP i kontynuacja prac",
        id: "zasady-bhp-antigravity"
      },
      {
        type: "paragraph",
        text: "Praca w środowisku Antygravity wymaga zachowania odpowiedniej higieny deweloperskiej. Każda modyfikacja kodu dokonana przez agenta musi być zakończona weryfikacją techniczną:\n\n- npm run lint: Uruchamia kompilator TypeScript bez emisji plików, co pozwala natychmiast wykryć niedopasowania typów i błędy importów.\n- npm run build: Kompiluje produkcyjną wersję frontendu i backendu, gwarantując, że zmiany nie popsują procesu bundlowania.\n- Git jako punkt wyjścia: Każde zadanie powinno być realizowane na czystej gałęzi, co umożliwia szybkie wycofanie zmian w przypadku problemów.\n\nIntegracja człowieka i maszyny w tym modelu opiera się na zaufaniu wspieranym przez automatyczną kontrolę jakości. Pozwala to na stabilny rozwój i bezpieczną realizację nawet najbardziej złożonych wymagań biznesowych."
      }
    ]
  }
];
