# Warsztat AI Coding — Instrukcja dla Agentów AI (Codex, Trae, Claude)

Ten plik służy jako główne źródło prawdy i kontekstu architektonicznego dla kolejnych agentów AI pracujących w tym repozytorium. Przed przystąpieniem do jakichkolwiek modyfikacji kodu, przeczytaj poniższe wytyczne.

## 1. CEL PROJEKTU
Projekt „Warsztat AI Coding” to zaawansowany technologicznie, responsywny blog poświęcony pracy z agentami AI, inżynierii promptów na poziomie repozytorium oraz nowoczesnemu workflow programistycznemu. Projekt jest w pełni statycznym SPA (Single Page Application) przystosowanym do stabilnego działania na platformach takich jak GitHub Pages.

## 2. STACK TECHNOLOGICZNY
- **Framework**: React 19 (Functional Components, Hooks)
- **Typowanie**: TypeScript (Ścisłe typowanie, interfejsy zamiast rzutowania `any`)
- **Kompilator/Bundler**: Vite + `@tailwindcss/vite`
- **Stylizowanie**: Tailwind CSS v4 (metoda `@import "tailwindcss";` w index.css z rozszerzeniem `@theme`)
- **Routing**: `react-router-dom` (wykorzystanie `HashRouter` do zapobiegania błędom 404 przy odświeżaniu bezpośrednich linków)
- **Ikony**: `lucide-react` (zabrania się stosowania czystych SVG, o ile nie są to ilustracje)

## 3. ARCHITEKTURA I STRUKTURA KATALOGÓW
Aplikacja jest modularna. Zabrania się łączenia wielu odpowiedzialności w jednym pliku (np. trzymania danych artykułów i layoutu w `App.tsx`).

```
/
├── index.html                   # Punkt wejścia HTML
├── package.json                 # Definicje zależności i skrypty npm
├── vite.config.ts               # Konfiguracja Vite
├── tsconfig.json                # Konfiguracja kompilatora TypeScript
├── AGENTS.md                    # Niniejsza instrukcja dla agentów AI
├── README.md                    # Podręcznik użytkownika i instrukcja wdrożenia
├── src/
│   ├── main.tsx                 # Główny inicjalizator React
│   ├── App.tsx                  # Główny kontener aplikacji i konfiguracja tras (Routes)
│   ├── index.css                # Style globalne i konfiguracja motywu Tailwind v4
│   ├── types/
│   │   └── article.ts           # Definicje typów danych (Article, Section itp.)
│   ├── data/
│   │   └── articles.ts          # Baza danych artykułów (jedyne źródło treści)
│   ├── utils/
│   │   ├── article.ts           # Funkcje pomocnicze (statystyki, wyszukiwanie, kopiowanie)
│   │   └── firebaseAuth.ts      # Autoryzacja i pozyskiwanie tokenów Google API
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Nawigacja i nagłówek (desktop + mobile)
│   │   │   └── Footer.tsx       # Stopka strony z powrotem na górę
│   │   └── article/
│   │       ├── ArticleCard.tsx  # Karta artykułu (featured i standard grid)
│   │       ├── ArticleContent.tsx # Dynamiczny, bezpieczny parser sekcji artykułu
│   │       ├── ArticleIllustration.tsx # Wektorowe, stabilne ilustracje SVG dla wpisów
│   │       └── TableOfContents.tsx # Automatyczny spis treści z podświetlaniem (IntersectionObserver)
│   └── pages/
│       ├── HomePage.tsx         # Strona główna (hero, bento-stats, filtry, workflow)
│       ├── ArticlesPage.tsx     # Widok listy wszystkich artykułów (/articles)
│       ├── ArticlePage.tsx      # Szczegóły artykułu (/articles/:slug) z ustawieniami czytnika
│       ├── WorkspacePage.tsx    # Strefa Twórcy z integracją Google Drive & Docs
│       └── NotFoundPage.tsx     # Strona błędu 404 (elegancki fallback)
```

## 4. DANE ARTYKUŁÓW (`src/data/articles.ts`)
Treść artykułów jest oddzielona od interfejsu. Każdy artykuł musi implementować interfejs `Article` z pliku `src/types/article.ts`.

### Sposób dodania nowego artykułu:
1. Otwórz plik `src/data/articles.ts`.
2. Dodaj nowy obiekt typu `Article` na końcu tablicy `ARTICLES`.
3. Przestrzegaj struktury pól:
   - `id`: unikalny ciąg tekstowy (np. `"6"`)
   - `slug`: unikalny identyfikator URL (np. `"moj-nowy-artykul"`)
   - `title`: chwytliwy tytuł
   - `subtitle`: dopełniający podtytuł
   - `description`: krótki opis do wyświetlenia na kartach (limituj do 2-3 zdań)
   - `category`: kategoria (np. `"Workflow"`, `"Architektura"`, `"Narzędzia"`, `"Strategia"`)
   - `tool`: jedno z dozwolonych narzędzi (`"Codex" | "Trae" | "Claude" | "AI Studio"`)
   - `author`: obiekt zawierający `{ name: "Kamil Mikołajczyk", role: "...", avatar: "KM" }`
   - `publishedAt`: data w formacie ISO `"YYYY-MM-DD"`
   - `readTime`: czas czytania w minutach (liczba)
   - `wordCount`: liczba słów we wpisie (liczba)
   - `heroImage`: klucz ilustracji (np. `"codex_hero"`, `"trae_hero"`, `"claude_hero"`, `"aistudio_hero"`, `"workflow_hero"`)
   - `imageAlt`: tekst alternatywny dla dostępności
   - `imageCaption`: podpis pod obrazkiem na stronie artykułu
   - `accentColor`: kolor akcentu dominujący we wpisie (np. `"indigo"`, `"emerald"`, `"amber"`, `"sky"`)
   - `featured`: ustaw `true` tylko dla jednego głównego artykułu na stronie głównej (resztę ustaw na `false`)
   - `tags`: tablica słów kluczowych np. `["React", "AI"]`
   - `pullQuote`: cytat wyróżniony w tekście
   - `keyTakeaways`: tablica 4 najważniejszych wniosków
   - `sections`: tablica obiektów reprezentujących sekcje tekstu. Każdy obiekt musi mieć określony `type`:
     - `heading` (musi posiadać `level: 2 | 3`, `text: string`, `id: string` dla spisu treści)
     - `paragraph` (posiada `text: string`)
     - `quote` (posiada `text: string`)
     - `bulletList` (posiada `items: string[]`)
     - `numberedList` (posiada `items: string[]`)
     - `code` (posiada `language: string`, `code: string`)

## 5. ZASADY TWORZENIA KOMPONENTÓW
- **Semantyczny HTML**: Zawsze używaj tagów `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`.
- **Dostępność (A11y)**: Każdy element interaktywny musi mieć widoczny focus, poprawny kontrast oraz atrybuty `aria-label` tam, gdzie etykieta tekstowa nie jest oczywista. Obrazki muszą mieć tag `alt`.
- **Unikalne identyfikatory**: Każdy znaczny komponent (karty, listy, przyciski akcji) powinien posiadać unikalne `id` ułatwiające targetowanie CSS lub skryptów QA.
- **Bezpieczny render**: Zabrania się stosowania `dangerouslySetInnerHTML`. Wszystkie sekcje artykułów muszą być renderowane za pomocą komponentu `<ArticleContent />` na podstawie strukturalnych danych.
- **Unikanie pętli renderujących**: Wszelkie operacje kalkulacji statystyk i filtrowania powinny być opakowane w `useMemo`, aby zapobiec zbędnemu przebudowywaniu drzewa komponentów przy wprowadzaniu literówek w wyszukiwarce.

## 6. ROUTING I GITHUB PAGES
Aplikacja została skonfigurowana przy użyciu `HashRouter`, co eliminuje najczęstszy problem hostingu statycznego (błąd 404 po odświeżeniu strony o ścieżce np. `/articles/some-slug`).
- Wszystkie odnośniki wewnątrz aplikacji muszą korzystać z komponentu `Link` z biblioteki `react-router-dom`.
- Przy dodawaniu nowych stron, zdefiniuj ścieżkę w `src/App.tsx`.

## 7. KOMENDY I SKRYPTY
Przed zakończeniem edycji upewnij się, że projekt buduje się bez żadnych błędów TypeScript ani lintera:
- `npm run lint` — uruchamia statyczną analizę typów (`tsc --noEmit`)
- `npm run dev` — uruchamia lokalny serwer deweloperski na porcie 3000
- `npm run build` — kompiluje produkcyjną wersję aplikacji do folderu `dist/`

## 8. REKOMENDOWANE KIERUNKI ROZBUDOWY
Jeśli otrzymasz polecenie rozbudowania tego projektu, rozważ:
1. **System Komentarzy**: Dodanie lokalnego (localStorage) lub chmurowego (Firestore) systemu komentarzy pod artykułami.
2. **Ciemny motyw (Dark Mode)**: Pełny, elegancki, wysoko-kontrastowy ciemny motyw kontrolowany przełącznikiem w nagłówku.
3. **Filtrowanie tagów**: Możliwość kliknięcia dowolnego tagu na karcie artykułu w celu automatycznego wyszukania powiązanych wpisów.

## 9. INTEGRACJA NEWSLETTERA (GMAIL SMTP + LOCAL FALLBACK)
Projekt został rozbudowany z prostej strony statycznej do **aplikacji full-stack (Express + Vite)** w celu umożliwienia bezpiecznej integracji backendowej wysyłki newsletterów bez ujawniania kluczy API ani haseł użytkownikowi końcowemu w przeglądarce.

### Architektura serwera (`server.ts`):
- Punkt wejściowy to `server.ts` uruchamiany w trybie deweloperskim za pomocą `tsx`.
- Wersja produkcyjna jest kompilowana przez `esbuild` do jednego pliku CommonJS `dist/server.cjs` i uruchamiana komendą `node dist/server.cjs` (zgodnie z wymogami bezpieczeństwa chmury Cloud Run).
- Endpoint `/api/subscribe` (POST) przyjmuje zgłoszenia e-mail.
- **Lokalna Baza Danych (`subscriptions.json`)**: Wszystkie e-maile są automatycznie dopisywane do pliku JSON w katalogu głównym projektu, co gwarantuje zbieranie adresów nawet w przypadku braku lub niepoprawnej konfiguracji serwera pocztowego.

### Konfiguracja wysyłki Gmail SMTP:
Aby aktywować automatyczne e-maile powitalne dla nowych subskrybentów, zdefiniuj następujące zmienne środowiskowe w panelu ustawień lub pliku `.env`:
1. `GMAIL_USER` — Twój adres e-mail w domenie Gmail (np. `kontakt@gmail.com`).
2. `GMAIL_APP_PASSWORD` — Hasło aplikacji wygenerowane w ustawieniach bezpieczeństwa konta Google (dwuetapowa weryfikacja -> Hasła do aplikacji). **Nigdy nie używaj głównego hasła do konta Google!**

W przypadku braku konfiguracji, system zapisze dane w pliku `subscriptions.json` i zwróci informację o zapisie lokalnym bez wywoływania błędów.

## 10. PASEK POSTĘPU CZYTANIA (`ReadingProgress.tsx`)
Zaimplementowano dedykowany komponent `ReadingProgress` zlokalizowany na stronie szczegółów artykułu:
- Wyświetla cienką linię postępu pod spodem nagłówka głównego.
- Posiada pływający panel ze statystykami (tytuł, kategoria, procent przeczytania, szacowany czas pozostały do końca artykułu), który **pojawia się automatycznie dopiero po przescrollowaniu poniżej 220px** (gdy nagłówek artykułu znika z ekranu). Zapobiega to przeładowaniu UI.

## 11. HISTORIA KROKÓW (LOG DLA KOLEJNEGO AGENTA AI)
*Wpisy dodane w ostatniej sesji roboczej (Integracja Newslettera & Full-Stack):*
- **Instalacja paczek**: Zainstalowano `nodemailer` oraz `@types/nodemailer` do obsługi poczty Gmail.
- **Przejście na Full-Stack**: Dodano serwer Express (`server.ts`) z middleware Vite i parserem JSON, obsługujący bezpieczny endpoint `/api/subscribe` oraz serwowanie plików statycznych `dist` w produkcji.
- **Aktualizacja package.json**: Przepisano skrypty `"dev"`, `"build"` i `"start"`, wprowadzając kompilację serwera backendowego za pomocą `esbuild` do formatu CJS.
- **Wdrożenie Formularza Newslettera**: Stworzono dedykowany komponent `/src/components/layout/NewsletterForm.tsx` o surowej, kontrastowej estetyce, umieszczając go w stopce (`Footer.tsx`). Formularz prezentuje użytkownikowi dokładny stan serwera (zapis w lokalnej bazie, wysyłka e-maila).
- **Zintegrowanie ReadingProgress**: Stworzono `/src/components/article/ReadingProgress.tsx` i wdrożono go w `/src/pages/ArticlePage.tsx`, eliminując uproszczony pasek postępu.
- **Konfiguracja środowiskowa**: Zadeklarowano nowe zmienne w `.env.example`.
- **Weryfikacja**: Wszystkie skrypty (`npm run lint`, `npm run build`) działają bez błędów. Kompilacja przebiega pomyślnie.

*Wpisy dodane w obecnej sesji roboczej (Premium Touch & AI Content Dashboard):*
- **Sygnet Autorski**: Stworzono dedykowany komponent wektorowy `/src/components/layout/KMSygnet.tsx` z minimalistycznym monogramem „KM” w złotej okrągłej oprawie na bazie załączonego projektu graficznego.
- **Favicon & Integracja Logo**: Wdrożono sygnet w nagłówku (`Header.tsx`), stopce (`Footer.tsx`) oraz zakodowano jako wektorowy, responsywny favicon w formacie SVG bezpośrednio w `<head>` pliku `index.html`.
- **Wdrożenie AIContentDashboard**: Zaprojektowano i wdrożono zaawansowany komponent `/src/components/article/AIContentDashboard.tsx` na stronie głównej w miejsce uproszczonej siatki newsów. Komponent prezentuje w minimalistycznym i eleganckim układzie 3 kolumny: Top Newsy, Kryminalne użycia oraz Pomysły na zarabianie.
- **Premium Hover Lift**: Dodano do wszystkich nowo wdrożonych kart (zarówno w `DailyBriefing`, jak i w `AIContentDashboard`) subtelny efekt uniesienia (`hover:-translate-y-1` / `hover:-translate-y-1.5`) oraz gładką animację przejścia cieni, co wzmacnia magazynową estetykę premium.
- **Optymalizacja Persony (Rule #4)**: Przejrzano całą treść strony głównej oraz artykułów, dopasowując opisy, nagłówki i sekcję workflow tak, by jasno prezentowały autora jako eksperta orkiestracji procesów i narzędzi AI (No-Code/AI-Native Creator), a nie tradycyjnego manualnego programistę. Usunięto potencjalne niespójności.
- **Gotowość do integracji z GitHub**: Dokładnie udokumentowano architekturę i logi zmian w plikach `AGENTS.md` oraz `README.md`, ułatwiając szybki eksport i dalszy rozwój projektu.

*Wpisy dodane w obecnej sesji roboczej (Integracja Google Drive & Google Docs - Gotowość GitHub):*
- **Instalacja Firebase**: Zainstalowano pakiet `firebase` npm w celu obsługi Google OAuth oraz Firebase Authentication na kliencie.
- **Konfiguracja OAuth**: Skonfigurowano uprawnienia (Scopes) dla Google Drive oraz Google Docs (`documents`, `drive`), generując pomyślnie `firebase-applet-config.json` w repozytorium.
- **Bezpieczna Autoryzacja (`firebaseAuth.ts`)**: Wdrożono bezpieczny moduł uwierzytelniania z pamięcią podręczną tokenu (In-Memory Access Token Caching), zgodnie z rygorystycznymi zasadami bezpieczeństwa (brak zapisu tokenów w `localStorage` / `sessionStorage`).
- **Wdrożenie Strefy Twórcy (`WorkspacePage.tsx`)**: Zaprojektowano i wdrożono zaawansowany panel kreatora z obsługą:
  1. *Eksploratora plików Google Drive* — wyszukiwanie, dynamiczne filtrowanie dokumentów oraz podgląd.
  2. *Eksportu szkiców do Google Docs* — generowanie nowych dokumentów w chmurze z predefiniowanych, merytorycznych szablonów dla autorów AI.
  3. *Importer plików Google Docs* — pobieranie surowej struktury dokumentu przez Docs API v1 i renderowanie w eleganckim, stylizowanym podglądzie.
- **Zasada Potwierdzenia (User Confirmation)**: Wprowadzono jawne, natywne okna dialogowe przed każdą mutacją danych użytkownika (np. tworzeniem plików w Google Docs) w celu zapewnienia pełnej kontroli.
- **Aktualizacja Nawigacji**: Zarejestrowano trasę `/workspace` w `App.tsx` oraz zintegrowano nowy link z ikoną `Cloud` w `Header.tsx`.

## 12. INTEGRACJA GOOGLE WORKSPACE (DRIVE & DOCS)
Połączenie z Google Workspace bazuje na bezpiecznym, bezserwerowym połączeniu bezpośrednio w przeglądarce użytkownika przy użyciu Firebase Auth.

### Kluczowe mechanizmy:
1. **OAuth Scopes**: Zdefiniowano uprawnienia `https://www.googleapis.com/auth/drive` oraz `https://www.googleapis.com/auth/documents` dla pełnej swobody manipulacji zarysami artykułów.
2. **In-Memory Token**: Token sesyjny z Google Auth jest przechowywany wyłącznie w pamięci operacyjnej zmiennej `cachedAccessToken` wewnątrz modułu `firebaseAuth.ts` i jest czyszczony w momencie wywołania `logout()`. Zapobiega to przejęciu uprawnień przez zewnętrzne skrypty (XSS).
3. **Docs API v1 Parser**: Moduł podglądu dokumentów samodzielnie przetwarza strukturę JSON dokumentu Google Docs (`body.content`), rekonstruując akapity bezpośrednio w bezpiecznym kontenerze tekstowym, zapobiegając błędom XSS.

## 13. AUTOMATYCZNY PIPELINE TREŚCI I GOOGLE DRIVE

Repozytorium obsługują dwie niezależne automatyzacje redakcyjne:

1. **Codzienny briefing AI i IT** zapisuje raport w `content/daily-news/YYYY-MM-DD/YYYY-MM-DD.md` i synchronizuje go jako surowy plik Markdown do datowanego folderu pod Google Drive ID `1k_6odvzXd9xAs3lngICP-FMl43xuBccE`.
2. **AI: newsy, przestępczość i zarabianie** zapisuje 9 materiałów oraz README w `content/top-3/YYYY-MM-DD_HH-mm/` i synchronizuje komplet do datowanego folderu pod katalogiem `TOP 3` o ID `1hrZeNgh0D5k9joChMGnk_lnqejJr9A8K`.

Każdy zapis Drive musi być idempotentny: najpierw wyszukaj folder i plik, utwórz tylko brakujące zasoby, istniejący plik aktualizuj po jego ID, a następnie wykonaj readback listy folderu. Link zwrócony przez API zapisz w podsumowaniu i pamięci automatyzacji. Nie konwertuj plików `.md` do Google Docs.

## 14. STATUS DRAFT I BRAKUJĄCE GRAFIKI

- `src/data/draftArticles.ts` importuje Markdown wyłącznie z `content/draft` przy użyciu `import.meta.glob` i buduje typowane wpisy `Article`. Katalogi `content/top-3` oraz `content/daily-news` są archiwum wyników automatyzacji, nie bezpośrednim źródłem kart bloga.
- Wszystkie materiały oznaczone `DRAFT` muszą mieć lokalną kopię w `content/draft/<przebieg>/` oraz kopię Markdown w folderze Google Drive `DRAFT` o ID `1DjLIWVsGMpTpOhTrstc-1sSAVq9gRUF9`.
- Materiał bez formalnej akceptacji agenta poprawności treści ma `status: "DRAFT"`.
- Materiał bez co najmniej dwóch gotowych, legalnych grafik pozostaje `DRAFT`.
- Brakujące media reprezentuje sekcja `imagePlaceholder`, która musi zawierać `fileName`, `targetPath` i konkretny `prompt`.
- Docelowe grafiki szkiców zapisuj w `public/news/drafts/<slug>/` i dopiero po ich sprawdzeniu zastępuj placeholdery.
- Nie ustawiaj `APPROVED` na podstawie samego istnienia artykułu, poprawnego buildu ani obecności linków. Wymagana jest jawna akceptacja merytoryczna i komplet mediów.

## 15. AKTUALNY KIERUNEK ROZWOJU

Pełny changelog, stan bieżący, instrukcje podłączenia backendu i Drive oraz docelowa architektura automatyzacji są utrzymywane w `README.md`. Najbliższy etap to manifest workflow per artykuł, automatyczna bramka dwóch grafik, jawny podpis agenta zatwierdzającego oraz oddzielenie publicznych wpisów `APPROVED` od redakcyjnego podglądu `DRAFT`.


