# Warsztat AI Coding â€” Instrukcja dla AgentĂłw AI (Codex, Trae, Claude)

Ten plik sĹ‚uĹĽy jako gĹ‚Ăłwne ĹşrĂłdĹ‚o prawdy i kontekstu architektonicznego dla kolejnych agentĂłw AI pracujÄ…cych w tym repozytorium. Przed przystÄ…pieniem do jakichkolwiek modyfikacji kodu, przeczytaj poniĹĽsze wytyczne.

## 1. CEL PROJEKTU
Projekt â€žWarsztat AI Codingâ€ť to zaawansowany technologicznie, responsywny blog poĹ›wiÄ™cony pracy z agentami AI, inĹĽynierii promptĂłw na poziomie repozytorium oraz nowoczesnemu workflow programistycznemu. Projekt jest w peĹ‚ni statycznym SPA (Single Page Application) przystosowanym do stabilnego dziaĹ‚ania na platformach takich jak GitHub Pages.

## 2. STACK TECHNOLOGICZNY
- **Framework**: React 19 (Functional Components, Hooks)
- **Typowanie**: TypeScript (ĹšcisĹ‚e typowanie, interfejsy zamiast rzutowania `any`)
- **Kompilator/Bundler**: Vite + `@tailwindcss/vite`
- **Stylizowanie**: Tailwind CSS v4 (metoda `@import "tailwindcss";` w index.css z rozszerzeniem `@theme`)
- **Routing**: `react-router-dom` (wykorzystanie `HashRouter` do zapobiegania bĹ‚Ä™dom 404 przy odĹ›wieĹĽaniu bezpoĹ›rednich linkĂłw)
- **Ikony**: `lucide-react` (zabrania siÄ™ stosowania czystych SVG, o ile nie sÄ… to ilustracje)

## 3. ARCHITEKTURA I STRUKTURA KATALOGĂ“W
Aplikacja jest modularna. Zabrania siÄ™ Ĺ‚Ä…czenia wielu odpowiedzialnoĹ›ci w jednym pliku (np. trzymania danych artykuĹ‚Ăłw i layoutu w `App.tsx`).

```
/
â”śâ”€â”€ index.html                   # Punkt wejĹ›cia HTML
â”śâ”€â”€ package.json                 # Definicje zaleĹĽnoĹ›ci i skrypty npm
â”śâ”€â”€ vite.config.ts               # Konfiguracja Vite
â”śâ”€â”€ tsconfig.json                # Konfiguracja kompilatora TypeScript
â”śâ”€â”€ AGENTS.md                    # Niniejsza instrukcja dla agentĂłw AI
â”śâ”€â”€ README.md                    # PodrÄ™cznik uĹĽytkownika i instrukcja wdroĹĽenia
â”śâ”€â”€ src/
â”‚   â”śâ”€â”€ main.tsx                 # GĹ‚Ăłwny inicjalizator React
â”‚   â”śâ”€â”€ App.tsx                  # GĹ‚Ăłwny kontener aplikacji i konfiguracja tras (Routes)
â”‚   â”śâ”€â”€ index.css                # Style globalne i konfiguracja motywu Tailwind v4
â”‚   â”śâ”€â”€ types/
â”‚   â”‚   â””â”€â”€ article.ts           # Definicje typĂłw danych (Article, Section itp.)
â”‚   â”śâ”€â”€ data/
â”‚   â”‚   â””â”€â”€ articles.ts          # Baza danych artykuĹ‚Ăłw (jedyne ĹşrĂłdĹ‚o treĹ›ci)
â”‚   â”śâ”€â”€ utils/
â”‚   â”‚   â”śâ”€â”€ article.ts           # Funkcje pomocnicze (statystyki, wyszukiwanie, kopiowanie)
â”‚   â”‚   â””â”€â”€ firebaseAuth.ts      # Autoryzacja i pozyskiwanie tokenĂłw Google API
â”‚   â”śâ”€â”€ components/
â”‚   â”‚   â”śâ”€â”€ layout/
â”‚   â”‚   â”‚   â”śâ”€â”€ Header.tsx       # Nawigacja i nagĹ‚Ăłwek (desktop + mobile)
â”‚   â”‚   â”‚   â””â”€â”€ Footer.tsx       # Stopka strony z powrotem na gĂłrÄ™
â”‚   â”‚   â””â”€â”€ article/
â”‚   â”‚       â”śâ”€â”€ ArticleCard.tsx  # Karta artykuĹ‚u (featured i standard grid)
â”‚   â”‚       â”śâ”€â”€ ArticleContent.tsx # Dynamiczny, bezpieczny parser sekcji artykuĹ‚u
â”‚   â”‚       â”śâ”€â”€ ArticleIllustration.tsx # Wektorowe, stabilne ilustracje SVG dla wpisĂłw
â”‚   â”‚       â””â”€â”€ TableOfContents.tsx # Automatyczny spis treĹ›ci z podĹ›wietlaniem (IntersectionObserver)
â”‚   â””â”€â”€ pages/
â”‚       â”śâ”€â”€ HomePage.tsx         # Strona gĹ‚Ăłwna (hero, bento-stats, filtry, workflow)
â”‚       â”śâ”€â”€ ArticlesPage.tsx     # Widok listy wszystkich artykuĹ‚Ăłw (/articles)
â”‚       â”śâ”€â”€ ArticlePage.tsx      # SzczegĂłĹ‚y artykuĹ‚u (/articles/:slug) z ustawieniami czytnika
â”‚       â”śâ”€â”€ WorkspacePage.tsx    # Strefa TwĂłrcy z integracjÄ… Google Drive & Docs
â”‚       â””â”€â”€ NotFoundPage.tsx     # Strona bĹ‚Ä™du 404 (elegancki fallback)
```

## 4. DANE ARTYKUĹĂ“W (`src/data/articles.ts`)
TreĹ›Ä‡ artykuĹ‚Ăłw jest oddzielona od interfejsu. KaĹĽdy artykuĹ‚ musi implementowaÄ‡ interfejs `Article` z pliku `src/types/article.ts`.

### SposĂłb dodania nowego artykuĹ‚u:
1. OtwĂłrz plik `src/data/articles.ts`.
2. Dodaj nowy obiekt typu `Article` na koĹ„cu tablicy `ARTICLES`.
3. Przestrzegaj struktury pĂłl:
   - `id`: unikalny ciÄ…g tekstowy (np. `"6"`)
   - `slug`: unikalny identyfikator URL (np. `"moj-nowy-artykul"`)
   - `title`: chwytliwy tytuĹ‚
   - `subtitle`: dopeĹ‚niajÄ…cy podtytuĹ‚
   - `description`: krĂłtki opis do wyĹ›wietlenia na kartach (limituj do 2-3 zdaĹ„)
   - `category`: kategoria (np. `"Workflow"`, `"Architektura"`, `"NarzÄ™dzia"`, `"Strategia"`)
   - `tool`: jedno z dozwolonych narzÄ™dzi (`"Codex" | "Trae" | "Claude" | "AI Studio"`)
   - `author`: obiekt zawierajÄ…cy `{ name: "Kamil MikoĹ‚ajczyk", role: "...", avatar: "KM" }`
   - `publishedAt`: data w formacie ISO `"YYYY-MM-DD"`
   - `readTime`: czas czytania w minutach (liczba)
   - `wordCount`: liczba sĹ‚Ăłw we wpisie (liczba)
   - `heroImage`: klucz ilustracji (np. `"codex_hero"`, `"trae_hero"`, `"claude_hero"`, `"aistudio_hero"`, `"workflow_hero"`)
   - `imageAlt`: tekst alternatywny dla dostÄ™pnoĹ›ci
   - `imageCaption`: podpis pod obrazkiem na stronie artykuĹ‚u
   - `accentColor`: kolor akcentu dominujÄ…cy we wpisie (np. `"indigo"`, `"emerald"`, `"amber"`, `"sky"`)
   - `featured`: ustaw `true` tylko dla jednego gĹ‚Ăłwnego artykuĹ‚u na stronie gĹ‚Ăłwnej (resztÄ™ ustaw na `false`)
   - `tags`: tablica sĹ‚Ăłw kluczowych np. `["React", "AI"]`
   - `pullQuote`: cytat wyrĂłĹĽniony w tekĹ›cie
   - `keyTakeaways`: tablica 4 najwaĹĽniejszych wnioskĂłw
   - `sections`: tablica obiektĂłw reprezentujÄ…cych sekcje tekstu. KaĹĽdy obiekt musi mieÄ‡ okreĹ›lony `type`:
     - `heading` (musi posiadaÄ‡ `level: 2 | 3`, `text: string`, `id: string` dla spisu treĹ›ci)
     - `paragraph` (posiada `text: string`)
     - `quote` (posiada `text: string`)
     - `bulletList` (posiada `items: string[]`)
     - `numberedList` (posiada `items: string[]`)
     - `code` (posiada `language: string`, `code: string`)

## 5. ZASADY TWORZENIA KOMPONENTĂ“W
- **Semantyczny HTML**: Zawsze uĹĽywaj tagĂłw `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`.
- **DostÄ™pnoĹ›Ä‡ (A11y)**: KaĹĽdy element interaktywny musi mieÄ‡ widoczny focus, poprawny kontrast oraz atrybuty `aria-label` tam, gdzie etykieta tekstowa nie jest oczywista. Obrazki muszÄ… mieÄ‡ tag `alt`.
- **Unikalne identyfikatory**: KaĹĽdy znaczny komponent (karty, listy, przyciski akcji) powinien posiadaÄ‡ unikalne `id` uĹ‚atwiajÄ…ce targetowanie CSS lub skryptĂłw QA.
- **Bezpieczny render**: Zabrania siÄ™ stosowania `dangerouslySetInnerHTML`. Wszystkie sekcje artykuĹ‚Ăłw muszÄ… byÄ‡ renderowane za pomocÄ… komponentu `<ArticleContent />` na podstawie strukturalnych danych.
- **Unikanie pÄ™tli renderujÄ…cych**: Wszelkie operacje kalkulacji statystyk i filtrowania powinny byÄ‡ opakowane w `useMemo`, aby zapobiec zbÄ™dnemu przebudowywaniu drzewa komponentĂłw przy wprowadzaniu literĂłwek w wyszukiwarce.

## 6. ROUTING I GITHUB PAGES
Aplikacja zostaĹ‚a skonfigurowana przy uĹĽyciu `HashRouter`, co eliminuje najczÄ™stszy problem hostingu statycznego (bĹ‚Ä…d 404 po odĹ›wieĹĽeniu strony o Ĺ›cieĹĽce np. `/articles/some-slug`).
- Wszystkie odnoĹ›niki wewnÄ…trz aplikacji muszÄ… korzystaÄ‡ z komponentu `Link` z biblioteki `react-router-dom`.
- Przy dodawaniu nowych stron, zdefiniuj Ĺ›cieĹĽkÄ™ w `src/App.tsx`.

## 7. KOMENDY I SKRYPTY
Przed zakoĹ„czeniem edycji upewnij siÄ™, ĹĽe projekt buduje siÄ™ bez ĹĽadnych bĹ‚Ä™dĂłw TypeScript ani lintera:
- `npm run lint` â€” uruchamia statycznÄ… analizÄ™ typĂłw (`tsc --noEmit`)
- `npm run dev` â€” uruchamia lokalny serwer deweloperski na porcie 3000
- `npm run build` â€” kompiluje produkcyjnÄ… wersjÄ™ aplikacji do folderu `dist/`

## 8. REKOMENDOWANE KIERUNKI ROZBUDOWY
JeĹ›li otrzymasz polecenie rozbudowania tego projektu, rozwaĹĽ:
1. **System Komentarzy**: Dodanie lokalnego (localStorage) lub chmurowego (Firestore) systemu komentarzy pod artykuĹ‚ami.
2. **Ciemny motyw (Dark Mode)**: PeĹ‚ny, elegancki, wysoko-kontrastowy ciemny motyw kontrolowany przeĹ‚Ä…cznikiem w nagĹ‚Ăłwku.
3. **Filtrowanie tagĂłw**: MoĹĽliwoĹ›Ä‡ klikniÄ™cia dowolnego tagu na karcie artykuĹ‚u w celu automatycznego wyszukania powiÄ…zanych wpisĂłw.

## 9. INTEGRACJA NEWSLETTERA (GMAIL SMTP + LOCAL FALLBACK)
Projekt zostaĹ‚ rozbudowany z prostej strony statycznej do **aplikacji full-stack (Express + Vite)** w celu umoĹĽliwienia bezpiecznej integracji backendowej wysyĹ‚ki newsletterĂłw bez ujawniania kluczy API ani haseĹ‚ uĹĽytkownikowi koĹ„cowemu w przeglÄ…darce.

### Architektura serwera (`server.ts`):
- Punkt wejĹ›ciowy to `server.ts` uruchamiany w trybie deweloperskim za pomocÄ… `tsx`.
- Wersja produkcyjna jest kompilowana przez `esbuild` do jednego pliku CommonJS `dist/server.cjs` i uruchamiana komendÄ… `node dist/server.cjs` (zgodnie z wymogami bezpieczeĹ„stwa chmury Cloud Run).
- Endpoint `/api/subscribe` (POST) przyjmuje zgĹ‚oszenia e-mail.
- **Lokalna Baza Danych (`subscriptions.json`)**: Wszystkie e-maile sÄ… automatycznie dopisywane do pliku JSON w katalogu gĹ‚Ăłwnym projektu, co gwarantuje zbieranie adresĂłw nawet w przypadku braku lub niepoprawnej konfiguracji serwera pocztowego.

### Konfiguracja wysyĹ‚ki Gmail SMTP:
Aby aktywowaÄ‡ automatyczne e-maile powitalne dla nowych subskrybentĂłw, zdefiniuj nastÄ™pujÄ…ce zmienne Ĺ›rodowiskowe w panelu ustawieĹ„ lub pliku `.env`:
1. `GMAIL_USER` â€” TwĂłj adres e-mail w domenie Gmail (np. `kontakt@gmail.com`).
2. `GMAIL_APP_PASSWORD` â€” HasĹ‚o aplikacji wygenerowane w ustawieniach bezpieczeĹ„stwa konta Google (dwuetapowa weryfikacja -> HasĹ‚a do aplikacji). **Nigdy nie uĹĽywaj gĹ‚Ăłwnego hasĹ‚a do konta Google!**

W przypadku braku konfiguracji, system zapisze dane w pliku `subscriptions.json` i zwrĂłci informacjÄ™ o zapisie lokalnym bez wywoĹ‚ywania bĹ‚Ä™dĂłw.

## 10. PASEK POSTÄPU CZYTANIA (`ReadingProgress.tsx`)
Zaimplementowano dedykowany komponent `ReadingProgress` zlokalizowany na stronie szczegĂłĹ‚Ăłw artykuĹ‚u:
- WyĹ›wietla cienkÄ… liniÄ™ postÄ™pu pod spodem nagĹ‚Ăłwka gĹ‚Ăłwnego.
- Posiada pĹ‚ywajÄ…cy panel ze statystykami (tytuĹ‚, kategoria, procent przeczytania, szacowany czas pozostaĹ‚y do koĹ„ca artykuĹ‚u), ktĂłry **pojawia siÄ™ automatycznie dopiero po przescrollowaniu poniĹĽej 220px** (gdy nagĹ‚Ăłwek artykuĹ‚u znika z ekranu). Zapobiega to przeĹ‚adowaniu UI.

## 11. HISTORIA KROKĂ“W (LOG DLA KOLEJNEGO AGENTA AI)
*Wpisy dodane w ostatniej sesji roboczej (Integracja Newslettera & Full-Stack):*
- **Instalacja paczek**: Zainstalowano `nodemailer` oraz `@types/nodemailer` do obsĹ‚ugi poczty Gmail.
- **PrzejĹ›cie na Full-Stack**: Dodano serwer Express (`server.ts`) z middleware Vite i parserem JSON, obsĹ‚ugujÄ…cy bezpieczny endpoint `/api/subscribe` oraz serwowanie plikĂłw statycznych `dist` w produkcji.
- **Aktualizacja package.json**: Przepisano skrypty `"dev"`, `"build"` i `"start"`, wprowadzajÄ…c kompilacjÄ™ serwera backendowego za pomocÄ… `esbuild` do formatu CJS.
- **WdroĹĽenie Formularza Newslettera**: Stworzono dedykowany komponent `/src/components/layout/NewsletterForm.tsx` o surowej, kontrastowej estetyce, umieszczajÄ…c go w stopce (`Footer.tsx`). Formularz prezentuje uĹĽytkownikowi dokĹ‚adny stan serwera (zapis w lokalnej bazie, wysyĹ‚ka e-maila).
- **Zintegrowanie ReadingProgress**: Stworzono `/src/components/article/ReadingProgress.tsx` i wdroĹĽono go w `/src/pages/ArticlePage.tsx`, eliminujÄ…c uproszczony pasek postÄ™pu.
- **Konfiguracja Ĺ›rodowiskowa**: Zadeklarowano nowe zmienne w `.env.example`.
- **Weryfikacja**: Wszystkie skrypty (`npm run lint`, `npm run build`) dziaĹ‚ajÄ… bez bĹ‚Ä™dĂłw. Kompilacja przebiega pomyĹ›lnie.

*Wpisy dodane w obecnej sesji roboczej (Premium Touch & AI Content Dashboard):*
- **Sygnet Autorski**: Stworzono dedykowany komponent wektorowy `/src/components/layout/KMSygnet.tsx` z minimalistycznym monogramem â€žKMâ€ť w zĹ‚otej okrÄ…gĹ‚ej oprawie na bazie zaĹ‚Ä…czonego projektu graficznego.
- **Favicon & Integracja Logo**: WdroĹĽono sygnet w nagĹ‚Ăłwku (`Header.tsx`), stopce (`Footer.tsx`) oraz zakodowano jako wektorowy, responsywny favicon w formacie SVG bezpoĹ›rednio w `<head>` pliku `index.html`.
- **WdroĹĽenie AIContentDashboard**: Zaprojektowano i wdroĹĽono zaawansowany komponent `/src/components/article/AIContentDashboard.tsx` na stronie gĹ‚Ăłwnej w miejsce uproszczonej siatki newsĂłw. Komponent prezentuje w minimalistycznym i eleganckim ukĹ‚adzie 3 kolumny: Top Newsy, Kryminalne uĹĽycia oraz PomysĹ‚y na zarabianie.
- **Premium Hover Lift**: Dodano do wszystkich nowo wdroĹĽonych kart (zarĂłwno w `DailyBriefing`, jak i w `AIContentDashboard`) subtelny efekt uniesienia (`hover:-translate-y-1` / `hover:-translate-y-1.5`) oraz gĹ‚adkÄ… animacjÄ™ przejĹ›cia cieni, co wzmacnia magazynowÄ… estetykÄ™ premium.
- **Optymalizacja Persony (Rule #4)**: Przejrzano caĹ‚Ä… treĹ›Ä‡ strony gĹ‚Ăłwnej oraz artykuĹ‚Ăłw, dopasowujÄ…c opisy, nagĹ‚Ăłwki i sekcjÄ™ workflow tak, by jasno prezentowaĹ‚y autora jako eksperta orkiestracji procesĂłw i narzÄ™dzi AI (No-Code/AI-Native Creator), a nie tradycyjnego manualnego programistÄ™. UsuniÄ™to potencjalne niespĂłjnoĹ›ci.
- **GotowoĹ›Ä‡ do integracji z GitHub**: DokĹ‚adnie udokumentowano architekturÄ™ i logi zmian w plikach `AGENTS.md` oraz `README.md`, uĹ‚atwiajÄ…c szybki eksport i dalszy rozwĂłj projektu.

*Wpisy dodane w obecnej sesji roboczej (Integracja Google Drive & Google Docs - GotowoĹ›Ä‡ GitHub):*
- **Instalacja Firebase**: Zainstalowano pakiet `firebase` npm w celu obsĹ‚ugi Google OAuth oraz Firebase Authentication na kliencie.
- **Konfiguracja OAuth**: Skonfigurowano uprawnienia (Scopes) dla Google Drive oraz Google Docs (`documents`, `drive`), generujÄ…c pomyĹ›lnie `firebase-applet-config.json` w repozytorium.
- **Bezpieczna Autoryzacja (`firebaseAuth.ts`)**: WdroĹĽono bezpieczny moduĹ‚ uwierzytelniania z pamiÄ™ciÄ… podrÄ™cznÄ… tokenu (In-Memory Access Token Caching), zgodnie z rygorystycznymi zasadami bezpieczeĹ„stwa (brak zapisu tokenĂłw w `localStorage` / `sessionStorage`).
- **WdroĹĽenie Strefy TwĂłrcy (`WorkspacePage.tsx`)**: Zaprojektowano i wdroĹĽono zaawansowany panel kreatora z obsĹ‚ugÄ…:
  1. *Eksploratora plikĂłw Google Drive* â€” wyszukiwanie, dynamiczne filtrowanie dokumentĂłw oraz podglÄ…d.
  2. *Eksportu szkicĂłw do Google Docs* â€” generowanie nowych dokumentĂłw w chmurze z predefiniowanych, merytorycznych szablonĂłw dla autorĂłw AI.
  3. *Importer plikĂłw Google Docs* â€” pobieranie surowej struktury dokumentu przez Docs API v1 i renderowanie w eleganckim, stylizowanym podglÄ…dzie.
- **Zasada Potwierdzenia (User Confirmation)**: Wprowadzono jawne, natywne okna dialogowe przed kaĹĽdÄ… mutacjÄ… danych uĹĽytkownika (np. tworzeniem plikĂłw w Google Docs) w celu zapewnienia peĹ‚nej kontroli.
- **Aktualizacja Nawigacji**: Zarejestrowano trasÄ™ `/workspace` w `App.tsx` oraz zintegrowano nowy link z ikonÄ… `Cloud` w `Header.tsx`.

## 12. INTEGRACJA GOOGLE WORKSPACE (DRIVE & DOCS)
PoĹ‚Ä…czenie z Google Workspace bazuje na bezpiecznym, bezserwerowym poĹ‚Ä…czeniu bezpoĹ›rednio w przeglÄ…darce uĹĽytkownika przy uĹĽyciu Firebase Auth.

### Kluczowe mechanizmy:
1. **OAuth Scopes**: Zdefiniowano uprawnienia `https://www.googleapis.com/auth/drive` oraz `https://www.googleapis.com/auth/documents` dla peĹ‚nej swobody manipulacji zarysami artykuĹ‚Ăłw.
2. **In-Memory Token**: Token sesyjny z Google Auth jest przechowywany wyĹ‚Ä…cznie w pamiÄ™ci operacyjnej zmiennej `cachedAccessToken` wewnÄ…trz moduĹ‚u `firebaseAuth.ts` i jest czyszczony w momencie wywoĹ‚ania `logout()`. Zapobiega to przejÄ™ciu uprawnieĹ„ przez zewnÄ™trzne skrypty (XSS).
3. **Docs API v1 Parser**: ModuĹ‚ podglÄ…du dokumentĂłw samodzielnie przetwarza strukturÄ™ JSON dokumentu Google Docs (`body.content`), rekonstruujÄ…c akapity bezpoĹ›rednio w bezpiecznym kontenerze tekstowym, zapobiegajÄ…c bĹ‚Ä™dom XSS.

## 13. AUTOMATYCZNY PIPELINE TREĹšCI I GOOGLE DRIVE

Repozytorium obsĹ‚ugujÄ… dwie niezaleĹĽne automatyzacje redakcyjne:

1. **Codzienny briefing AI i IT** zapisuje raport w `content/daily-news/YYYY-MM-DD/YYYY-MM-DD.md` i synchronizuje go jako surowy plik Markdown do datowanego folderu pod Google Drive ID `1k_6odvzXd9xAs3lngICP-FMl43xuBccE`.
2. **AI: newsy, przestÄ™pczoĹ›Ä‡ i zarabianie** zapisuje 9 materiaĹ‚Ăłw oraz README w `content/top-3/YYYY-MM-DD_HH-mm/` i synchronizuje komplet do datowanego folderu pod katalogiem `TOP 3` o ID `1hrZeNgh0D5k9joChMGnk_lnqejJr9A8K`.

KaĹĽdy zapis Drive musi byÄ‡ idempotentny: najpierw wyszukaj folder i plik, utwĂłrz tylko brakujÄ…ce zasoby, istniejÄ…cy plik aktualizuj po jego ID, a nastÄ™pnie wykonaj readback listy folderu. Link zwrĂłcony przez API zapisz w podsumowaniu i pamiÄ™ci automatyzacji. Nie konwertuj plikĂłw `.md` do Google Docs.

## 14. STATUS DRAFT I BRAKUJÄ„CE GRAFIKI

- `src/data/draftArticles.ts` importuje Markdown wyĹ‚Ä…cznie z `content/draft` przy uĹĽyciu `import.meta.glob` i buduje typowane wpisy `Article`. Katalogi `content/top-3` oraz `content/daily-news` sÄ… archiwum wynikĂłw automatyzacji, nie bezpoĹ›rednim ĹşrĂłdĹ‚em kart bloga.
- Wszystkie materiaĹ‚y oznaczone `DRAFT` muszÄ… mieÄ‡ lokalnÄ… kopiÄ™ w `content/draft/<przebieg>/` oraz kopiÄ™ Markdown w folderze Google Drive `DRAFT` o ID `1DjLIWVsGMpTpOhTrstc-1sSAVq9gRUF9`.
- MateriaĹ‚ bez formalnej akceptacji agenta poprawnoĹ›ci treĹ›ci ma `status: "DRAFT"`.
- MateriaĹ‚ bez co najmniej dwĂłch gotowych, legalnych grafik pozostaje `DRAFT`.
- BrakujÄ…ce media reprezentuje sekcja `imagePlaceholder`, ktĂłra musi zawieraÄ‡ `fileName`, `targetPath` i konkretny `prompt`.
- Docelowe grafiki szkicĂłw zapisuj w `public/news/drafts/<slug>/` i dopiero po ich sprawdzeniu zastÄ™puj placeholdery.
- Nie ustawiaj `APPROVED` na podstawie samego istnienia artykuĹ‚u, poprawnego buildu ani obecnoĹ›ci linkĂłw. Wymagana jest jawna akceptacja merytoryczna i komplet mediĂłw.

## 15. AKTUALNY KIERUNEK ROZWOJU

PeĹ‚ny changelog, stan bieĹĽÄ…cy, instrukcje podĹ‚Ä…czenia backendu i Drive oraz docelowa architektura automatyzacji sÄ… utrzymywane w `README.md`. NajbliĹĽszy etap to manifest workflow per artykuĹ‚, automatyczna bramka dwĂłch grafik, jawny podpis agenta zatwierdzajÄ…cego oraz oddzielenie publicznych wpisĂłw `APPROVED` od redakcyjnego podglÄ…du `DRAFT`.

## 16. INSTRUKCJA DLA TRAE: PRZEBUDOWA STRONY GĹĂ“WNEJ POD NEWSY DZIENNE

Trae ma przebudowaÄ‡ layout strony gĹ‚Ăłwnej tak, aby newsy byĹ‚y prezentowane z podziaĹ‚em na dni oraz czytelnÄ… datÄ… publikacji. Nie przepisuj newsĂłw rÄ™cznie do komponentĂłw, jeĹĽeli istniejÄ… juĹĽ w plikach projektowych.

### ĹąrĂłdĹ‚a danych, z ktĂłrych Trae ma korzystaÄ‡
- `content/daily-news/YYYY-MM-DD/YYYY-MM-DD.md` â€” archiwum briefingĂłw dziennych; ma sĹ‚uĹĽyÄ‡ jako ĹşrĂłdĹ‚o podziaĹ‚u na dni i dat publikacji.
- `content/draft/YYYY-MM-DD-daily-news/YYYY-MM-DD.md` â€” redakcyjne kopie szkicĂłw importowane do aplikacji jako `DRAFT`.
- `src/data/draftArticles.ts` â€” obecny mechanizm importu Markdown przez `import.meta.glob`; przy przebudowie uĹĽywaj istniejÄ…cego importu lub wydziel z niego osobny, typowany helper zamiast dublowaÄ‡ parser.
- `src/components/article/DailyBriefing.tsx` â€” obecnie pokazuje jeden rÄ™cznie wpisany dzieĹ„; docelowo powinien staÄ‡ siÄ™ komponentem osi czasu / dziennego feedu.
- `src/pages/HomePage.tsx` â€” miejsce integracji nowego layoutu.

### Wymagania funkcjonalne
- Strona gĹ‚Ăłwna ma pokazywaÄ‡ newsy pogrupowane po dniach, np. `3 lipca 2026`, `4 lipca 2026`, `5 lipca 2026` itd.
- KaĹĽda grupa dnia ma pokazywaÄ‡ datÄ™ publikacji, status (`DRAFT`/`APPROVED`, jeĹ›li dostÄ™pny), metrykÄ™ podziaĹ‚u geograficznego `Polska X / Ĺšwiat Y` oraz listÄ™ 5 newsĂłw z kategoriÄ…, tytuĹ‚em, krĂłtkim opisem i linkiem do ĹşrĂłdĹ‚a.
- Najnowszy dzieĹ„ powinien byÄ‡ najwyĹĽej; starsze dni niĹĽej w osi czasu.
- UĹĽytkownik powinien mĂłc szybko filtrowaÄ‡ lub przeĹ‚Ä…czaÄ‡ widok: `Wszystkie`, `Polska`, `Ĺšwiat`.
- Zachowaj linki do peĹ‚nych szkicĂłw artykuĹ‚Ăłw importowanych z `content/draft`, ale nie mieszaj ich z archiwum `content/top-3` jako gĹ‚Ăłwnym ĹşrĂłdĹ‚em dziennego briefingu.

### Wymagania UI
- Layout ma byÄ‡ magazynowy, premium i skanowalny: sekcje peĹ‚nej szerokoĹ›ci, bez zagnieĹĽdĹĽania kart w kartach.
- DzieĹ„ publikacji ma byÄ‡ pierwszoplanowym elementem kaĹĽdej grupy, nie maĹ‚ym tekstem pomocniczym.
- Na desktopie preferuj ukĹ‚ad osi czasu lub dwukolumnowy feed: lista dni po lewej / szczegĂłĹ‚y dnia po prawej albo peĹ‚ne sekcje dzieĹ„ po dniu.
- Na mobile grupy dni majÄ… ukĹ‚adaÄ‡ siÄ™ pionowo, bez poziomego scrolla i bez nachodzÄ…cego tekstu.
- UĹĽywaj `lucide-react` dla ikon i Tailwind v4 zgodnie z obecnym stylem projektu.
- Nie uĹĽywaj `dangerouslySetInnerHTML`; Markdown musi byÄ‡ sparsowany do strukturalnych danych albo mapowany przez istniejÄ…ce typy.

### Granice techniczne
- Nie zmieniaj statusu ĹĽadnego materiaĹ‚u na `APPROVED`.
- Nie hotlinkuj grafik zewnÄ™trznych; brakujÄ…ce media pozostajÄ… placeholderami.
- Nie konwertuj plikĂłw Markdown do Google Docs.
- Po zmianach uruchom `npm run lint` i `npm run build`.
- JeĹĽeli zmieniasz parser Markdown, zachowaj kompatybilnoĹ›Ä‡ z istniejÄ…cymi szkicami i krĂłtkimi slugami `#/articles/MMRR/DD`.


