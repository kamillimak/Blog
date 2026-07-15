# PROJECT_CONTEXT.md — pakiet migracyjny projektu

Dokument przygotowany 2026-07-15 dla przeniesienia projektu „AI w praktyce” na inne konto ChatGPT/Codex. Jego celem jest szybkie przejęcie kontekstu przez kolejnego AI developera lub project managera bez ponownego odkrywania architektury, decyzji i reguł redakcyjnych.

## 1. Cel projektu

### Nazwa projektu

**AI w praktyce** — polskojęzyczny blog technologiczny i newsroom o praktycznym wykorzystaniu AI, pracy z agentami oraz nowoczesnym workflow twórcy AI-native.

### Główne założenia

- Blog ma być responsywną aplikacją premium magazine: skanowalną, minimalistyczną, technologiczną i wiarygodną.
- Autor jest pozycjonowany jako **AI-Native Creator / Process Orchestrator**, Senior IT Project Manager i Product Owner, a nie jako tradycyjny manualny programista.
- Treść jest oddzielona od interfejsu: artykuły kanoniczne są w `src/data/articles.ts`, a materiały redakcyjne DRAFT są importowane z Markdown przez `src/data/draftArticles.ts`.
- Newsroom i automatyzacje mają dostarczać aktualne materiały AI/IT, ale nic nie może przejść do statusu `APPROVED` bez jawnej akceptacji treści i kompletu minimum dwóch legalnych grafik.
- Projekt ma działać lokalnie, na GitHub Pages oraz z osobnym backendem Express/Cloud Run dla newslettera.

### Problem, który projekt rozwiązuje

Projekt rozwiązuje problem rozproszonego, mało praktycznego śledzenia świata AI. Łączy:

- blog ekspercki,
- codzienny briefing technologiczny Polska/świat,
- pakiety TOP 3: newsy AI, kryminalne użycia AI, legalne sposoby zarabiania,
- pipeline redakcyjny DRAFT → fact-check → grafiki → approval,
- demonstrację, jak osoba nietworząca kodu ręcznie może orkiestracją narzędzi AI budować aplikację full-stack.

### Oczekiwany rezultat

Docelowo projekt ma być stabilnym, publicznym blogiem/newsroomem pod GitHub Pages z oddzielnym API newslettera, regularnymi automatyzacjami redakcyjnymi, kontrolą jakości treści i jasnym procesem publikacji tylko zweryfikowanych materiałów.

## 2. Aktualny stan projektu

### Co zostało już wykonane

- Zbudowano aplikację React 19 + TypeScript + Vite + Tailwind CSS v4.
- Wdrożono `HashRouter`, strony: home, lista artykułów, detal artykułu, privacy, workspace, 404.
- Zbudowano czytnik artykułów z TOC, paskiem postępu, ustawieniami czytania, kopiowaniem kodu/linku i rekomendacjami.
- Dodano frontend newsroomu: `DailyBriefing`, `HeroSlider`, `AIContentDashboard`.
- Dodano import szkiców Markdown z `content/draft` przez `import.meta.glob`.
- Dodano parser newsroomu w `src/data/newsFeed.ts`, który łączy:
  - `content/daily-news/**/*.md`,
  - najnowszy pakiet `content/top-3/**/*.md`,
  - draft slug-i z `DRAFT_ARTICLES`.
- Zbudowano backend `server.ts`:
  - `POST /api/subscribe`,
  - `POST /api/newsletter/daily-digest`,
  - `GET /api/health`,
  - Firestore w produkcji,
  - lokalny fallback `subscriptions.json`,
  - opcjonalny Gmail SMTP.
- Dodano Google Workspace w `/workspace`: Firebase Auth, Drive API i Docs API.
- Dodano Google Analytics 4, Consent Mode, Web Vitals dashboard, SEO assets i GitHub Pages workflow.
- Uruchomiono automatyzacje:
  - codzienny briefing AI/IT w `content/daily-news/YYYY-MM-DD/YYYY-MM-DD.md`,
  - pakiet TOP 3 w `content/top-3/YYYY-MM-DD_HH-mm/`,
  - kopie redakcyjne DRAFT w `content/draft/...`,
  - synchronizacja Markdown do Google Drive.
- Dodano pierwszą bramkę mediów dla briefingu 2026-07-03: dwa pliki WebP w `public/news/drafts/2026-07-03-daily-news-07-03/`.

### Co jest obecnie realizowane

- Utrzymywanie automatycznego newsroomu i pakietów TOP 3.
- Rozdzielanie archiwum automatyzacji od treści importowanych do bloga.
- Przygotowanie projektu do przeniesienia na inne konto ChatGPT/Codex.
- Najnowsza istotna decyzja automatyzacji: od 2026-07-13 `AIContentDashboard` korzysta z `TOP_THREE_BRIEFING` w `src/data/newsFeed.ts`, a nie z ręcznie aktualizowanego `src/data/aiTrendBriefing.ts`.

### Co pozostało do wykonania

- Wprowadzić manifest workflow per artykuł, np. `article.manifest.json`.
- Dodać formalny podpis agenta zatwierdzającego poprawność treści.
- Zautomatyzować bramkę dwóch grafik przed `APPROVED`.
- Oddzielić publiczny widok `APPROVED` od redakcyjnego podglądu `DRAFT`.
- Dodać testy linków, walidację dat i raport źródeł.
- Uporządkować kodowanie polskich znaków w części plików, jeśli migracja ujawni problemy z mojibake.
- Dodać ochronę backendu: rate limiting, antybot/CAPTCHA, monitoring, alerty, testy integracyjne.

### Aktualny etap projektu

Projekt jest na etapie **działającego MVP+ / newsroomu redakcyjnego**. Frontend, backend i automatyzacje istnieją, ale proces publikacji wymaga dalszego utwardzenia jakości, approval i mediów.

## 3. Architektura i technologia

### Stack technologiczny

- React 19
- TypeScript 5.8
- Vite 6
- Tailwind CSS v4 przez `@tailwindcss/vite`
- React Router DOM 7 z `HashRouter`
- lucide-react dla ikon
- Express 4 dla backendu
- Firebase client SDK dla Google Auth w aplikacji
- firebase-admin dla Firestore w backendzie
- Nodemailer dla Gmail SMTP
- esbuild dla bundlowania serwera
- sharp i skrypt SEO assets
- GitHub Actions dla GitHub Pages
- Docker / Cloud Run dla backendu

### Frameworki i biblioteki

- UI: `react`, `react-dom`, `lucide-react`, `motion`
- Routing: `react-router-dom`
- Styling: `tailwindcss`, `@tailwindcss/vite`, `autoprefixer`
- Backend: `express`, `cors`, `dotenv`, `nodemailer`
- Google: `firebase`, `firebase-admin`
- Build/dev: `vite`, `tsx`, `esbuild`, `typescript`
- SEO/media generation: `sharp`

### Integracje

- GitHub Pages: statyczny frontend.
- Cloud Run: backend Express.
- Firestore: produkcyjny storage newslettera.
- Gmail SMTP: opcjonalne e-maile powitalne i dzienny digest.
- Google Drive / Docs: `/workspace` w aplikacji przez Firebase Auth.
- Google Drive automatyzacji Codex: archiwizacja Markdown w folderach TOP 3 i DRAFT.
- Google Analytics 4: przez `VITE_GA_MEASUREMENT_ID`.

### Struktura katalogów

```text
/
├── .github/workflows/deploy-pages.yml
├── AGENTS.md
├── README.md
├── PROJECT_CONTEXT.md
├── CHANGELOG.md
├── Dockerfile
├── server.ts
├── package.json
├── vite.config.ts
├── firebase-applet-config.json
├── content/
│   ├── daily-news/
│   ├── top-3/
│   ├── draft/
│   └── image-prompts/
├── public/
│   ├── images/
│   ├── news/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── llms.txt
├── scripts/
│   └── generate-seo-assets.ts
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── components/
    ├── data/
    ├── pages/
    ├── types/
    └── utils/
```

### Kluczowe pliki i przeznaczenie

- `AGENTS.md` — podstawowe instrukcje architektoniczne dla agentów AI.
- `README.md` — pełny opis funkcji, deploymentu i know-how.
- `CHANGELOG.md` — historia iteracji technicznych.
- `server.ts` — backend newslettera, health check, daily digest.
- `src/App.tsx` — routing aplikacji.
- `src/pages/HomePage.tsx` — strona główna, hero, newsroom, biblioteka, statystyki.
- `src/data/articles.ts` — ręcznie utrzymywana baza artykułów kanonicznych.
- `src/data/draftArticles.ts` — import Markdown DRAFT z `content/draft`.
- `src/data/newsFeed.ts` — parser `daily-news` i `top-3`, źródło newsroomu.
- `src/components/article/DailyBriefing.tsx` — feed newsów i TOP 3.
- `src/components/article/AIContentDashboard.tsx` — trójkolumnowy dashboard TOP 3.
- `src/data/draftMedia.ts` — manifest ręcznie zatwierdzonych grafik dla szkiców.
- `.github/workflows/deploy-pages.yml` — build i publikacja GitHub Pages.
- `Dockerfile` — kontener backendu Cloud Run.

## 4. Najważniejsze decyzje projektowe

### 2026-07-06 / fundament SPA

- Problem: blog ma działać stabilnie na hostingu statycznym, także po odświeżeniu głębokich linków.
- Rozważane opcje: `BrowserRouter` z konfiguracją rewrites albo `HashRouter`.
- Wybrane rozwiązanie: `HashRouter`.
- Powód wyboru: GitHub Pages nie wymaga dodatkowej konfiguracji serwera; linki typu `#/articles/...` działają po refreshu.

### 2026-07-06 / rozdzielenie treści i UI

- Problem: mieszanie layoutu i treści utrudnia rozwój przez agentów AI.
- Rozważane opcje: trzymanie artykułów w komponentach albo typowane dane.
- Wybrane rozwiązanie: `src/data/articles.ts` + `src/types/article.ts`.
- Powód wyboru: mniejszy chaos, bezpieczniejsze refaktoryzacje, łatwa walidacja przez TypeScript.

### 2026-07-07 / newsletter full-stack

- Problem: statyczne SPA nie może bezpiecznie wysyłać maili ani przechowywać sekretów.
- Rozważane opcje: zewnętrzny formularz, serverless, Express.
- Wybrane rozwiązanie: Express w `server.ts`, lokalny fallback JSON i opcjonalny Gmail SMTP.
- Powód wyboru: szybkie wdrożenie, brak sekretów w przeglądarce, możliwość uruchomienia lokalnie i w Cloud Run.

### 2026-07-07 / Google Workspace w aplikacji

- Problem: autor potrzebuje strefy twórcy do pracy z Drive i Docs.
- Rozważane opcje: backend proxy, bezpośredni OAuth w przeglądarce.
- Wybrane rozwiązanie: Firebase Auth client SDK, Drive/Docs API bezpośrednio z frontendu.
- Powód wyboru: prostszy przepływ, token dostępowy tylko w pamięci modułu, brak zapisu tokenów w `localStorage` / `sessionStorage`.

### 2026-07-08 / archiwum automatyzacji vs źródło bloga

- Problem: automatycznie generowane materiały nie powinny automatycznie stawać się publicznymi zatwierdzonymi wpisami.
- Rozważane opcje: import z `content/top-3`, import z `content/daily-news`, osobny katalog draftów.
- Wybrane rozwiązanie: `content/top-3` i `content/daily-news` są archiwami, a blog importuje tylko `content/draft`.
- Powód wyboru: jasna granica redakcyjna i możliwość dodania gate’u jakości.

### 2026-07-09 / SEO i produkcja

- Problem: SPA potrzebuje lepszej indeksowalności, metadanych i produkcyjnego flow.
- Rozważane opcje: pełne SSG/SSR albo skrypt generujący zasoby SEO.
- Wybrane rozwiązanie: `scripts/generate-seo-assets.ts` uruchamiany po buildzie klienta.
- Powód wyboru: zachowuje prostą architekturę SPA, a poprawia metadane, sitemapę, OG i statyczne zasoby.

### 2026-07-09 / publiczny newsroom

- Problem: strona główna miała prezentować bieżące newsy i TOP 3 bez ręcznego przepisywania.
- Rozważane opcje: ręczne tablice w TS albo parser Markdown.
- Wybrane rozwiązanie: `src/data/newsFeed.ts` parsuje Markdown z `content/daily-news` i `content/top-3`.
- Powód wyboru: automatyzacje zapisują Markdown, więc UI może czytać artefakty bez duplikowania treści.

### 2026-07-10 / status DRAFT i media

- Problem: materiały bez weryfikacji i grafik nie mogą wyglądać jak gotowe publikacje.
- Rozważane opcje: ukrywać wszystko, publikować od razu z ostrzeżeniem, oznaczać jako DRAFT.
- Wybrane rozwiązanie: import DRAFT z placeholderami `imagePlaceholder`.
- Powód wyboru: redakcja widzi materiał w aplikacji, ale status i brak mediów są jednoznaczne.

### 2026-07-13 / dynamiczny AIContentDashboard

- Problem: Tech PL/World aktualizowały się dynamicznie, ale trzy kolumny AI dashboardu pozostawały statyczne.
- Rozważane opcje: dalej aktualizować `src/data/aiTrendBriefing.ts` ręcznie albo przełączyć komponent na parser.
- Wybrane rozwiązanie: `AIContentDashboard.tsx` używa `TOP_THREE_BRIEFING` z `src/data/newsFeed.ts`.
- Powód wyboru: najnowszy pakiet TOP 3 automatycznie zasila dashboard po zapisaniu Markdown.

### 2026-07-15 / migracja konta

- Problem: nowe konto ChatGPT/Codex może nie mieć pełnej historii rozmów i pamięci automatyzacji.
- Rozważane opcje: polegać na `AGENTS.md`/`README.md` albo przygotować osobny dokument przejęcia.
- Wybrane rozwiązanie: `PROJECT_CONTEXT.md`.
- Powód wyboru: jeden praktyczny punkt startowy z decyzjami, ryzykami, integracjami i quick startem.

## 5. Konfiguracja środowiska

### Wymagane narzędzia

- Node.js 22 rekomendowany; workflow GitHub używa `actions/setup-node@v6` z `node-version: 22`.
- npm.
- Git.
- Dla deploymentu backendu: Google Cloud CLI, dostęp do projektu GCP i Cloud Run.
- Dla automatyzacji Drive: aktywny connector Google Drive w środowisku Codex lub odpowiedni mechanizm API.

### Instalacja

```bash
npm ci
```

Jeśli repo jest świeżo sklonowane i brak lockfile albo trwa lokalny development:

```bash
npm install
```

### Zmienne środowiskowe

Opis w `.env.example`:

- `GEMINI_API_KEY` — dla wywołań Gemini / AI Studio, jeśli używane.
- `APP_URL` — URL hostingu aplikacji/apletu.
- `GMAIL_USER` — konto Gmail nadawcy.
- `GMAIL_APP_PASSWORD` — hasło aplikacji Gmail, nigdy hasło główne.
- `CRON_SECRET` — sekret endpointu daily digest.
- `VITE_API_BASE_URL` — publiczny URL backendu Cloud Run bez trailing slash.
- `VITE_GA_MEASUREMENT_ID` — opcjonalny identyfikator GA4.
- `GOOGLE_CLOUD_PROJECT` — obecnie w dokumentacji: `gen-lang-client-0172881890`.
- `USE_FIRESTORE` — `true` wymusza Firestore, `false` wymusza lokalny JSON w produkcyjnym bundle test.
- `FIREBASE_SERVICE_ACCOUNT_JSON` — opcjonalne credentials dla firebase-admin poza Cloud Run.

Uwaga: `firebase-applet-config.json` jest publiczną konfiguracją Firebase client SDK, nie sekretem konta usługi.

### Komendy uruchomienia

```bash
npm run dev
npm run lint
npm run build
npm run start
npm run preview
```

Znaczenie:

- `npm run dev` — uruchamia `tsx server.ts` na porcie 3000; Express używa Vite middleware.
- `npm run lint` — `tsc --noEmit`.
- `npm run build` — `build:client` + `build:server`.
- `npm run build:client` — Vite build + SEO asset generation.
- `npm run build:server` — esbuild do `dist/server.cjs`.
- `npm run start` — produkcyjne uruchomienie `dist/server.cjs`.

### Deployment

Frontend:

- GitHub Actions w `.github/workflows/deploy-pages.yml`.
- Push do `main` albo ręczny workflow.
- Build używa `VITE_API_BASE_URL=https://blog-api-118165783138.europe-central2.run.app`.
- Build używa `VITE_GA_MEASUREMENT_ID=G-ZZY3EX8C9H`.
- `vite.config.ts` ustawia `base: "/Blog/"` tylko w GitHub Actions.
- Docelowy publiczny URL: `https://kamillimak.github.io/Blog/`.

Backend:

- `Dockerfile` buduje klienta i serwer, kopiuje `dist` i `content`.
- Cloud Run uruchamia `node dist/server.cjs`.
- Port produkcyjny bierze `PORT`; Docker eksponuje 8080.
- CORS dopuszcza `https://kamillimak.github.io`, `localhost:3000`, `127.0.0.1:3000`.
- Health check: `/api/health`.

## 6. Reguły i standardy pracy

### Jak pisać kod

- Trzymać odpowiedzialności w osobnych plikach; nie przenosić danych artykułów do komponentów.
- Używać typów i interfejsów; unikać `any`.
- Nie używać `dangerouslySetInnerHTML`.
- Markdown parsować do strukturalnych danych.
- Dla filtrów, statystyk i kosztownych kalkulacji używać `useMemo`.
- Elementy interaktywne muszą mieć dostępny focus i sensowne `aria-label`, jeśli etykieta nie jest jawna.
- Wewnętrzne linki w aplikacji robić przez `Link` z `react-router-dom`.
- Ikony brać z `lucide-react`, nie pisać ręcznie SVG dla zwykłych ikon.
- Nie zmieniać layoutu przy aktualizacji treści, jeśli zadanie dotyczy tylko danych/newsów.

### Konwencje nazewnictwa

- Katalogi przebiegów TOP 3: `content/top-3/YYYY-MM-DD_HH-mm/`.
- Kopie draft: `content/draft/YYYY-MM-DD_HH-mm/`.
- Daily news: `content/daily-news/YYYY-MM-DD/YYYY-MM-DD.md`.
- Daily draft: `content/draft/YYYY-MM-DD-daily-news/YYYY-MM-DD.md`.
- Draft media: `public/news/drafts/<legacySlug>/<legacySlug>-01.webp`, `...-02.webp`.
- Krótkie slug-i draftów: `#/articles/MMRR/DD`, kolejne tego samego dnia `DD.1`, `DD.2`.
- Legacy slug pozostaje w `legacySlug` dla kompatybilności i mediów.

### Struktura commitów

Nie ma formalnego conventional commits w repo. Zalecenie dla nowego konta:

- Małe, tematyczne commity.
- Komunikat imperatywny i konkretny, np. `Add project migration context`, `Update TOP 3 briefing parser`.
- Osobno commity dla treści, kodu, deploymentu i konfiguracji, jeśli zmiany są większe.

### Zasady review

- Najpierw uruchomić `npm run lint`.
- Po zmianach w buildzie, routingu, danych importowanych lub SEO uruchomić `npm run build`.
- Przy zmianach UI sprawdzić desktop i mobile.
- Przy zmianach newsroomu sprawdzić, czy najnowsze pliki Markdown parsują się bez pustych kart.
- Nie naprawiać niezwiązanych problemów przy okazji automatyzacji redakcyjnej.
- Dla treści oddzielać fakty od wniosków i zachowywać bezpośrednie linki źródłowe.

### Preferowane rozwiązania

- Dla danych: typowane źródła i parsery zamiast ręcznego przepisywania do komponentów.
- Dla Google Drive automatyzacji: idempotencja po ID, readback folderu, surowe Markdown.
- Dla publikacji: `DRAFT` aż do jawnej akceptacji i dwóch grafik.
- Dla hostingu: GitHub Pages dla frontendu, Cloud Run dla API.

## 7. Integracje zewnętrzne

### GitHub Pages

- Cel: publikacja statycznego frontendu.
- API: GitHub Actions Pages.
- Wejście: build `dist`.
- Wyjście: publiczny URL GitHub Pages.
- Status: działa przez `.github/workflows/deploy-pages.yml`.

### Cloud Run

- Cel: uruchomienie backendu Express.
- API: Google Cloud Run.
- Wejście: Dockerfile / source deploy, env vars, sekrety.
- Wyjście: URL API dla `VITE_API_BASE_URL`.
- Status: skonfigurowany; obecny URL w workflow: `https://blog-api-118165783138.europe-central2.run.app`.

### Firestore

- Cel: produkcyjne przechowywanie subskrypcji newslettera.
- API: Firebase Admin SDK / Firestore.
- Wejście: znormalizowany e-mail.
- Wyjście: dokument w kolekcji `newsletterSubscriptions`; ID to SHA-256 e-maila.
- Status: obsługiwany w `server.ts`, wymaga uprawnień Cloud Run.

### Gmail SMTP

- Cel: e-mail powitalny i daily digest.
- API: Nodemailer `service: "gmail"`.
- Wejście: `GMAIL_USER`, `GMAIL_APP_PASSWORD`, lista subskrybentów.
- Wyjście: wiadomości HTML.
- Status: opcjonalny; brak konfiguracji nie blokuje zapisu subskrypcji, ale blokuje wysyłkę digestu.

### Google Analytics 4

- Cel: analityka frontendu z Consent Mode.
- API: GA4 measurement ID.
- Wejście: `VITE_GA_MEASUREMENT_ID`.
- Wyjście: zdarzenia/analityka po zgodzie użytkownika.
- Status: wdrożone; workflow używa `G-ZZY3EX8C9H`.

### Firebase Auth / Google Workspace w aplikacji

- Cel: `/workspace` jako strefa twórcy z Drive i Docs.
- API: Firebase Auth, Google Drive API, Google Docs API.
- Wejście: logowanie Google, scope `drive` i `documents`.
- Wyjście: lista plików Drive, podgląd Docs, tworzenie dokumentów po potwierdzeniu.
- Status: wdrożone; token dostępowy jest tylko w pamięci modułu `firebaseAuth.ts`.

### Google Drive dla automatyzacji Codex

- Cel: archiwizacja materiałów Markdown poza repo.
- API: connector Google Drive / Drive API dostępny dla automatyzacji.
- Wejście: lokalne pliki `.md`.
- Wyjście:
  - TOP 3 folder parent ID `1hrZeNgh0D5k9joChMGnk_lnqejJr9A8K`,
  - DRAFT folder parent ID `1DjLIWVsGMpTpOhTrstc-1sSAVq9gRUF9`,
  - daily-news parent ID `1k_6odvzXd9xAs3lngICP-FMl43xuBccE`.
- Status: używane przez automatyzacje; wymagane jest idempotentne tworzenie/aktualizacja i readback.

### Automatyzacje redakcyjne Codex

- Cel: cykliczne tworzenie materiałów.
- API: web research, repo filesystem, Google Drive connector, pamięć automatyzacji.
- Wejście: prompt automatyzacji i pamięć w `$CODEX_HOME/automations/<automation_id>/memory.md`.
- Wyjście: Markdown w `content/*`, kopie DRAFT, aktualizacja dashboardu, lint, zapis Drive.
- Status: działa; pamięć ostatniego znanego przebiegu zawiera m.in. 2026-07-10 i zmianę 2026-07-13.

## 8. Problemy i rozwiązania

| Problem | Rozwiązanie | Unikać |
|---|---|---|
| Odświeżenie głębokiego linku na GitHub Pages powodowałoby 404 | `HashRouter` | Przejścia na `BrowserRouter` bez rewrites |
| Sekrety newslettera nie mogą być w SPA | Express backend + env vars/Secret Manager | Wysyłania maili z frontendu |
| Gmail może nie być skonfigurowany | Zapis działa bez SMTP, e-mail jest opcjonalny | Traktowania SMTP jako wymogu zapisu |
| Tokeny Google Workspace są wrażliwe | Token tylko w pamięci modułu, czyszczony przy logout | Zapisu tokenów do `localStorage` lub `sessionStorage` |
| Automatyczne treści mogą być niedostatecznie zweryfikowane | Status `DRAFT`, źródła i wymóg akceptacji | Automatycznego `APPROVED` po buildzie |
| Brak grafik w szkicach | `imagePlaceholder` z promptem, nazwą i ścieżką | Hotlinkowania zewnętrznych obrazów |
| Dashboard AI był statyczny | `AIContentDashboard` czyta `TOP_THREE_BRIEFING` | Ręcznej duplikacji danych w komponencie |
| Google Drive może tworzyć duplikaty | Znajdź folder/plik, aktualizuj po ID, readback | Uploadu bez sprawdzenia istniejących plików |
| Niektóre polskie znaki wyglądają jak mojibake w odczycie terminalowym | Zachować ostrożność przy edycji kodowania, najlepiej UTF-8 | Masowego „naprawiania” bez testu build/lint |
| Duży chunk Vite po buildzie | Na razie zaakceptowane jako warning | Refaktoru bundle przy okazji treści |

## 9. Otwarte zadania

### HIGH

| Zadanie | Status | Rekomendowany kolejny krok |
|---|---|---|
| Manifest workflow per artykuł | Otwarte | Zaprojektować `article.manifest.json` dla draftów i TOP 3 |
| Bramka dwóch grafik przed `APPROVED` | Otwarte | Dodać walidator sprawdzający `DRAFT_MEDIA` i pliki w `public/news/drafts` |
| Formalny fact-check / approval agent | Otwarte | Ustalić format raportu i pole podpisu zatwierdzającego |
| Oddzielenie publicznych `APPROVED` od redakcyjnych `DRAFT` | Otwarte | Dodać tryb podglądu redakcyjnego albo flagę build-time |
| Migracja sekretów i dostępów na nowe konto | Otwarte | Przenieść GitHub, GCP, Firebase, Drive, GA4 i sekrety według listy integracji |

### MEDIUM

| Zadanie | Status | Rekomendowany kolejny krok |
|---|---|---|
| Uporządkowanie kodowania polskich znaków | Otwarte | Sprawdzić kodowanie plików w edytorze UTF-8 i naprawić partiami z lint/build |
| Test martwych linków źródłowych | Otwarte | Dodać skrypt walidujący URL-e w Markdown |
| Walidacja dat publikacji i zdarzeń | Otwarte | Dodać frontmatter albo manifest ze strukturą dat |
| Rate limiting i antybot dla newslettera | Otwarte | Dodać middleware, CAPTCHA lub provider anti-abuse |
| Monitoring Cloud Run | Otwarte | Dodać logi strukturalne, alerty i dashboard |
| Daily digest przez Cloud Scheduler | Częściowo przygotowane | Skonfigurować scheduler z `CRON_SECRET` |

### LOW

| Zadanie | Status | Rekomendowany kolejny krok |
|---|---|---|
| Redesign dashboardu dziennego po dniach | Zaplanowane w AGENTS.md | Przebudować `DailyBriefing` na timeline bez ręcznego przepisywania newsów |
| Dalsze SEO / performance | W toku | Rozważyć code splitting po analizie bundle |
| Więcej grafik dla draftów historycznych | Otwarte | Generować i dodać wpisy do `draftMedia.ts` |
| Testy komponentów UI | Otwarte | Dodać minimalny zestaw testów dla parserów i routingu |
| Uspójnienie nazw projektu w package.json | Otwarte | Zmienić `react-example` na nazwę projektu przy okazji metadanych |

## 10. Kontekst biznesowy

### Użytkownicy

- Liderzy, PM/PO i osoby zarządzające transformacją cyfrową.
- Twórcy AI-native i osoby budujące produkty z pomocą agentów.
- Osoby śledzące AI/IT, które chcą zwięzłego polskiego newsroomu.
- Potencjalni klienci zainteresowani automatyzacją, audytem procesów, strategią AI lub edukacją.

### Interesariusze

- Kamil Mikołajczyk — autor, właściciel projektu, główna persona ekspercka.
- Czytelnicy bloga.
- Subskrybenci newslettera.
- Kolejne konta/agent AI przejmujące rozwój.
- Platformy zewnętrzne: GitHub, Google Cloud, Firebase, Google Drive, Gmail, GA4.

### Cele biznesowe

- Budować ekspercki wizerunek autora wokół praktycznego AI.
- Przyciągać leady przez treści, newsletter i kontakt.
- Pokazać realny workflow AI-native product orchestration.
- Utrzymać szybki cykl publikacji bez rezygnacji z fact-checkingu.

### Najważniejsze wymagania

- Wiarygodność źródeł i jawne daty.
- Bezpieczny status DRAFT dla materiałów niezatwierdzonych.
- Minimum dwie legalne grafiki przed publikacją.
- Brak sekretów w frontendzie.
- Stabilny deployment GitHub Pages + Cloud Run.
- Skanowalny, premium, responsywny UI.

## 11. Instrukcja dla kolejnego AI

### Jak pracować nad tym projektem

1. Najpierw przeczytaj `AGENTS.md`, `PROJECT_CONTEXT.md`, `README.md` i `CHANGELOG.md`.
2. Jeśli pracujesz nad automatyzacją, przeczytaj jej pamięć:
   - `$CODEX_HOME/automations/ai-newsy-przest-pczo-i-zarabianie/memory.md`
   - oraz analogiczną pamięć briefingu dziennego, jeśli zadanie jej dotyczy.
3. Zanim zmienisz kod, sprawdź aktualny mechanizm danych:
   - statyczne artykuły: `src/data/articles.ts`,
   - drafty: `src/data/draftArticles.ts`,
   - newsroom: `src/data/newsFeed.ts`,
   - media draftów: `src/data/draftMedia.ts`.
4. Nie traktuj plików `content/top-3` i `content/daily-news` jako bezpośredniego źródła kart bloga; publiczne/draftowe artykuły idą przez `content/draft`.
5. Nie zmieniaj statusu na `APPROVED`, jeśli nie ma jawnej akceptacji treści i minimum dwóch grafik.
6. Po zmianach uruchom `npm run lint`; przy zmianach build/deployment/routingu/parserów uruchom też `npm run build`.
7. Przy aktualizacjach redakcyjnych używaj internetu, weryfikuj daty publikacji i unikaj powtórek względem pamięci.

### Założenia, które trzeba pamiętać

- Projekt jest polskojęzyczny.
- Styl: premium, magazynowy, skanowalny, bez marketingowej pustki.
- Autor ma być przedstawiany jako ekspert orkiestracji AI i procesów, nie jako klasyczny ręczny programista.
- `HashRouter` jest świadomą decyzją pod GitHub Pages.
- `content/draft` jest jedynym katalogiem importowanym jako szkice bloga.
- Google Drive synchronizacja automatyzacji musi być idempotentna i bez konwersji Markdown do Google Docs.
- `src/data/aiTrendBriefing.ts` może istnieć historycznie, ale bieżący dashboard TOP 3 czyta `TOP_THREE_BRIEFING`.

### Decyzji nie zmieniać bez konsultacji

- Nie przechodź z `HashRouter` na `BrowserRouter` bez planu hostingu.
- Nie usuwaj statusu `DRAFT` ani placeholderów grafik.
- Nie mieszaj `content/top-3` jako bezpośredniego źródła kart artykułów.
- Nie zapisuj tokenów Google do local/session storage.
- Nie przenoś sekretów do repo.
- Nie hotlinkuj grafik zewnętrznych.
- Nie usuwaj plików z Google Drive bez potwierdzenia ID i parent folderu.

### Na czym skupić się w pierwszej kolejności

1. Migration sanity: dostęp do GitHub, Google Cloud, Firebase, Drive, GA4, Cloud Run i sekretów.
2. Sprawdzenie lokalne: `npm ci`, `npm run lint`, `npm run build`.
3. Uporządkowanie pipeline DRAFT/APPROVED przez manifest i bramkę mediów.
4. Kontrola publicznej widoczności draftów.
5. Stabilizacja backendu newslettera i daily digest.

### Jak zadawać pytania przed zmianami

Pytaj krótko i konkretnie, gdy decyzja wpływa na publikację, bezpieczeństwo, koszty lub utratę danych. Dobre pytania:

- „Czy ten materiał ma przejść do `APPROVED`, czy tylko przygotować raport fact-check?”
- „Czy drafty mają być widoczne publicznie, czy tylko w trybie redakcyjnym?”
- „Które konto Google/GCP jest docelowe po migracji?”
- „Czy zachować obecny URL GitHub Pages, czy zmienić `base` i domenę?”
- „Czy automatyzacja ma aktualizować istniejący folder Drive, czy utworzyć nowy przebieg?”

## 12. Lista najważniejszych plików

| Plik | Cel | Ważność | Uwagi |
|---|---|---:|---|
| `AGENTS.md` | Reguły pracy agentów i architektura | HIGH | Pierwszy plik do czytania przez AI |
| `PROJECT_CONTEXT.md` | Dokument migracyjny | HIGH | Ten plik |
| `README.md` | Opis funkcji, deploymentu i know-how | HIGH | Najpełniejsza historia projektu |
| `CHANGELOG.md` | Historia zmian | HIGH | Pomaga ustalić kolejność decyzji |
| `package.json` | Skrypty i zależności | HIGH | `lint`, `build`, `dev`, `start` |
| `server.ts` | Backend newslettera i digestu | HIGH | Express + Firestore/local + Gmail |
| `Dockerfile` | Kontener Cloud Run | MEDIUM | Buduje klienta i backend |
| `.github/workflows/deploy-pages.yml` | Deployment frontendu | HIGH | Zawiera produkcyjny API URL i GA4 ID |
| `vite.config.ts` | Vite i base path | HIGH | `/Blog/` w GitHub Actions |
| `src/App.tsx` | Routing | HIGH | `HashRouter`, `/workspace`, krótkie slug-i |
| `src/main.tsx` | Inicjalizacja React | MEDIUM | Punkt wejścia |
| `src/index.css` | Tailwind v4 i theme | HIGH | Globalny styl marki |
| `src/types/article.ts` | Model artykułu | HIGH | Zawiera `imagePlaceholder`, `image`, `status` |
| `src/data/articles.ts` | Kanoniczne artykuły ręczne | HIGH | Nie mieszać z draftami |
| `src/data/draftArticles.ts` | Parser draft Markdown | HIGH | Importuje tylko `content/draft` |
| `src/data/newsFeed.ts` | Parser newsroomu | HIGH | Łączy daily-news i TOP 3 |
| `src/data/draftMedia.ts` | Manifest grafik draftów | HIGH | Minimum 2 media przed publikacją |
| `src/data/aiTrendBriefing.ts` | Historyczne dane TOP 3 | MEDIUM | Nie główne źródło dashboardu po 2026-07-13 |
| `src/pages/HomePage.tsx` | Strona główna | HIGH | Hero, newsroom, biblioteka, statystyki |
| `src/pages/ArticlePage.tsx` | Widok artykułu | HIGH | Czytnik, progress, TOC, status |
| `src/pages/WorkspacePage.tsx` | Google Drive/Docs UI | HIGH | Mutacje wymagają potwierdzenia |
| `src/utils/firebaseAuth.ts` | Auth Google | HIGH | Token tylko w pamięci |
| `src/components/article/DailyBriefing.tsx` | Newsroom feed | HIGH | Filtry i video |
| `src/components/article/AIContentDashboard.tsx` | TOP 3 dashboard | HIGH | Czyta `TOP_THREE_BRIEFING` |
| `src/components/article/ArticleContent.tsx` | Bezpieczny renderer sekcji | HIGH | Nie używać `dangerouslySetInnerHTML` |
| `src/components/article/ReadingProgress.tsx` | Pasek postępu czytania | MEDIUM | Widoczny po scrollu |
| `src/components/layout/NewsletterForm.tsx` | Formularz newslettera | HIGH | Korzysta z API |
| `src/components/layout/Header.tsx` | Nawigacja | HIGH | Linki wewnętrzne przez `Link` |
| `content/daily-news/` | Archiwum briefingów dziennych | HIGH | Źródło newsroomu, nie bezpośredni blog |
| `content/top-3/` | Archiwum pakietów TOP 3 | HIGH | Źródło dashboardu i newsroomu |
| `content/draft/` | Import szkiców do bloga | HIGH | Jedyny katalog draftów blogowych |
| `public/news/drafts/` | Lokalne grafiki draftów | HIGH | Nie hotlinkować |
| `scripts/generate-seo-assets.ts` | SEO asset generation | MEDIUM | Uruchamiany po buildzie klienta |
| `.env.example` | Dokumentacja env vars | HIGH | Nie wpisywać sekretów do repo |
| `firebase-applet-config.json` | Publiczna konfiguracja Firebase | MEDIUM | Nie konto usługi |

## QUICK START FOR NEW AI SESSION

Wklej do nowego konta ChatGPT/Codex:

```text
Przejmujesz projekt `AI w praktyce` w repo `C:\Users\mikol\Documents\Blog`.

Najpierw przeczytaj:
1. `PROJECT_CONTEXT.md`
2. `AGENTS.md`
3. `README.md`
4. `CHANGELOG.md`

To polskojęzyczny blog/newsroom AI z React 19, TypeScript, Vite, Tailwind v4, `HashRouter`, backendem Express/Cloud Run i pipeline redakcyjnym Markdown.

Najważniejsze reguły:
- Nie zmieniaj `HashRouter` bez konsultacji.
- Nie używaj `dangerouslySetInnerHTML`.
- Nie przenoś sekretów do repo.
- `content/top-3` i `content/daily-news` to archiwa automatyzacji.
- Blog importuje szkice wyłącznie z `content/draft` przez `src/data/draftArticles.ts`.
- Materiały bez jawnej akceptacji treści i minimum dwóch legalnych grafik pozostają `DRAFT`.
- `AIContentDashboard` czyta obecnie najnowszy TOP 3 przez `TOP_THREE_BRIEFING` z `src/data/newsFeed.ts`.
- Po zmianach uruchom `npm run lint`; przy zmianach parserów, routingu, builda lub deploymentu uruchom też `npm run build`.

Jeśli pracujesz nad automatyzacją `AI: newsy, przestępczość i zarabianie`, przeczytaj pamięć:
`$CODEX_HOME/automations/ai-newsy-przest-pczo-i-zarabianie/memory.md`.

Najbliższe priorytety:
1. migracja dostępów GitHub/GCP/Firebase/Drive/GA4,
2. manifest workflow per artykuł,
3. automatyczna bramka dwóch grafik,
4. oddzielenie publicznych `APPROVED` od redakcyjnych `DRAFT`,
5. stabilizacja backendu newslettera i daily digest.
```
