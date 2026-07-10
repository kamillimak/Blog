# AI w praktyce — Kompletny Blog Technologiczny

**AI w praktyce** to nowoczesny, w pełni responsywny blog technologiczny o wysokiej estetyce wizualnej (premium minimalist magazine), stworzony z myślą o programistach, architektach i pasjonatach inżynierii oprogramowania wspomaganej przez sztuczną inteligencję. 

Blog skupia się wokół synergii czterech przełomowych narzędzi deweloperskich: **Codex**, **Trae**, **Claude** oraz **AI Studio**, pokazując ich unikalne role w jednym, spójnym przepływie pracy (workflow).

---

## 🚀 Główne Funkcje Aplikacji

1. **Strona Główna (Dashboard)**:
   - Dynamiczny Hero Section wyróżniający najnowszy wpis.
   - Panel statystyk liczbowych (liczba słów, łączny czas czytania itp.) zaprojektowany w stylu bento-grid.
   - Interaktywny przewodnik po 4 etapach nowoczesnego workflow dewelopera.
   - Filtrowana biblioteka artykułów.
2. **Zaawansowana Biblioteka Artykułów (`/articles`)**:
   - Wyszukiwanie w czasie rzeczywistym po tytule, opisie lub tagach.
   - Filtrowanie wielokryteriowe (osobno po kategorii i używanym narzędziu AI).
   - Dynamiczny licznik wyników wyszukiwania oraz przejrzysty stan braku wyników (Empty State) z szybkim resetem filtrów.
3. **Imersyjny Widok Artykułu (`/articles/:slug`)**:
   - Pasek postępu czytania (Reading Progress Bar) przyklejony do góry ekranu.
   - Osobny panel ustawień czytnika (możliwość dynamicznej zmiany rozmiaru czcionki dla wygody czytania: Mały, Średni, Duży).
   - Automatycznie generowany Spis Treści (Table of Contents) z aktywnym śledzeniem pozycji scrollowania za pomocą `IntersectionObserver`.
   - Profesjonalny, typograficzny podział tekstu (krój szeryfowy dla treści artykułów w celu zminimalizowania zmęczenia wzroku).
   - Sekcja „Najważniejsze wnioski” (Key Takeaways) podsumowująca dany artykuł.
   - W pełni sprawny system kopiowania bloków kodu źródłowego oraz kopiowania linku do schowka z powiadomieniem typu toast.
   - Rekomendacje powiązanych tematycznie artykułów zachęcające do dalszego czytania.

---

## 📈 Kronika Iteracji i Zrealizowanych Funkcjonalności

Projekt ewoluował przez szereg ustrukturyzowanych iteracji, z których każda wnosiła kluczowe ulepszenia pod kątem doświadczenia użytkownika (UX), bezpieczeństwa i zaawansowania technicznego:

### 🔹 Iteracja 1: Fundamenty i Statyczne SPA
- **Architektura React + Vite**: Skonfigurowano nowoczesne środowisko programistyczne z pełną obsługą TypeScript.
- **Premium Magazine Design**: Zaprojektowano minimalistyczny interfejs w stonowanych barwach (Inter dla interfejsu i Playfair Display/krój szeryfowy dla artykułów), aby zoptymalizować czytelność i wyeliminować zmęczenie oczu.
- **Ustrukturyzowana Baza Artykułów**: Oddzielono treść od widoku poprzez wdrożenie bazy danych `src/data/articles.ts` opartej o ścisłe typowanie zdefiniowane w `src/types/article.ts`.
- **Wygodne Filtrowanie i Wyszukiwanie**: Dodano zaawansowaną wyszukiwarkę w czasie rzeczywistym z wielokryteriowym filtrowaniem (kategoria, użyte narzędzie AI) zoptymalizowaną z użyciem `useMemo`.
- **Zgodność z GitHub Pages**: Wdrożono `HashRouter`, eliminując znany problem błędu 404 podczas odświeżania podstron na hostingu statycznym.

### 🔹 Iteracja 2: Zaawansowany Czytnik & Narzędzia Interaktywne
- **Automatyczny Spis Treści (Table of Contents)**: Zaimplementowano interaktywny boczny panel, który automatycznie odczytuje nagłówki artykułu i podświetla aktualną sekcję za pomocą `IntersectionObserver`.
- **Interaktywne Akcje**: Dodano funkcjonalność kopiowania kodu źródłowego jednym kliknięciem oraz kopiowania linku bezpośredniego do artykułu wraz z eleganckim, autorskim powiadomieniem toast.
- **Rekomendacje Treści**: Wdrożono silnik rekomendujący powiązane artykuły na dole strony czytnika.

### 🔹 Iteracja 3: Architektura Full-Stack & System Subskrypcji
- **Ewolucja do Full-Stack (Express.js)**: Rozbudowano aplikację z prostej strony statycznej do serwera Express.js obsługującego middleware Vite w trybie deweloperskim.
- **Kompilacja Produkcyjna Bundlerem esbuild**: Skonfigurowano skrypty budowania tak, by serwer backendowy był kompilowany do jednego, bezpiecznego pliku CommonJS (`dist/server.cjs`) dla łatwego uruchomienia w środowiskach chmurowych (np. Cloud Run).
- **Endpoint Subskrypcji (`/api/subscribe`)**: Zbudowano bezpieczną bramkę przyjmującą e-maile użytkowników z podwójnym systemem zapisu: do lokalnej bazy danych JSON (`subscriptions.json`) oraz poprzez wysyłkę e-maili powitalnych przez serwer pocztowy Gmail SMTP (`nodemailer`) z wykorzystaniem zmiennych środowiskowych.
- **Premium Newsletter Form**: Dodano responsywny formularz w stopce (`NewsletterForm.tsx`) informujący użytkownika o dokładnym statusie zapisu.

### 🔹 Iteracja 4: Identyfikacja Wizualna Premium & AI Content Dashboard
- **Sygnet Autorski (`KMSygnet.tsx`)**: Opracowano i zaimplementowano wektorowy, złoty monogram „KM” w eleganckiej okrągłej oprawie, pełniący rolę logo w nagłówku, stopce oraz jako favicon SVG bezpośrednio w `<head>` pliku `index.html`.
- **AI Content Dashboard (`AIContentDashboard.tsx`)**: Stworzono nowoczesny, trójkolumnowy panel na stronie głównej w miejsce uproszczonej siatki nowinek, grupujący kluczowe, skondensowane informacje (Top Newsy, Kryminalne użycia, Pomysły na zarabianie).
- **Premium Hover-Lift Effect**: Wprowadzono do wszystkich interaktywnych kart (zarówno w Daily Briefing, jak i w AI Content Dashboard) subtelne uniesienie (`hover:-translate-y-1` / `hover:-translate-y-1.5`) i płynne przejścia cieni, potęgujące wrażenie ekskluzywnego magazynu.
- **Optymalizacja Persony Autora**: Przeredagowano treści na stronie głównej i w sekcji workflow, by jasno ukazać autora jako eksperta orkiestracji procesów i zaawansowanych narzędzi AI (AI-Native Creator / AI Orchestration Expert), a nie tradycyjnego programistę.

### 🔹 Iteracja 5: Google Workspace i Strefa Twórcy
- **Firebase Authentication**: Dodano logowanie Google w popupie oraz zakresy OAuth dla Google Drive i Google Docs.
- **Token tylko w pamięci**: Token Google nie jest zapisywany w `localStorage`, `sessionStorage` ani bazie aplikacji. Istnieje wyłącznie w zmiennej modułu `firebaseAuth.ts` i jest czyszczony przy wylogowaniu.
- **Strefa Twórcy (`/workspace`)**: Dodano eksplorator Drive, wyszukiwanie dokumentów, bezpieczny podgląd treści Docs API v1 oraz eksport nowych szkiców do Google Docs.
- **Kontrola mutacji**: Operacje tworzące pliki wymagają jawnego potwierdzenia użytkownika.

### 🔹 Iteracja 6: Produkcyjny backend i trwały newsletter
- **Cloud Run**: Backend Express może działać jako kontener, korzysta z `PORT`, udostępnia `/api/health` i ogranicza CORS do GitHub Pages oraz środowiska lokalnego.
- **Firestore w produkcji**: Subskrypcje są przechowywane w kolekcji `newsletterSubscriptions`; identyfikatorem dokumentu jest hash SHA-256 adresu e-mail, co zapobiega duplikatom bez używania adresu jako jawnego ID.
- **Fallback lokalny**: Poza produkcją dane trafiają do `subscriptions.json`, chyba że jawnie ustawiono `USE_FIRESTORE`.
- **Gmail SMTP jako funkcja opcjonalna**: Brak sekretów pocztowych nie blokuje zapisu subskrypcji. Wysyłka powitalna jest dodatkiem, nie pojedynczym punktem awarii.
- **Rozdzielony deployment**: Frontend jest publikowany przez GitHub Actions na GitHub Pages, a API działa niezależnie w Cloud Run; łączy je `VITE_API_BASE_URL`.

### 🔹 Iteracja 7: Automatyczne briefingi redakcyjne
- **Briefing dzienny**: Automatyzacja o 08:00 przygotowuje pięć wiadomości AI/IT z podziałem Polska–świat, aktualizuje `DailyBriefing` i zapisuje raport w `content/daily-news/YYYY-MM-DD/YYYY-MM-DD.md`.
- **Pakiet TOP 3**: Automatyzacja o 09:15 i 18:15 przygotowuje po trzy materiały w kategoriach newsy, przestępczość AI i legalne sposoby zarabiania, zapisując wynik w `content/top-3/YYYY-MM-DD_HH-mm/`.
- **Pamięć przebiegów**: Każda automatyzacja zapisuje tematy, datę, wynik walidacji i reguły unikania powtórzeń w swoim `memory.md` poza repozytorium.
- **Kontrola jakości technicznej**: Każdy przebieg kończy się `npm run lint`; błędy niezwiązane z aktualizacją nie powinny być modyfikowane automatycznie.

### 🔹 Iteracja 8: Synchronizacja redakcji z Google Drive
- **Surowe pliki Markdown**: Wyniki automatyzacji są przesyłane jako `text/markdown`, bez konwersji do natywnego Google Docs.
- **Idempotentny zapis**: Automatyzacja najpierw znajduje lub tworzy folder przebiegu, a przy ponownym uruchomieniu aktualizuje istniejący plik zamiast generować duplikat.
- **Dwa kanały treści**: Briefing dzienny trafia do datowanego folderu w katalogu głównym Drive, a pakiety redakcyjne do katalogu `TOP 3`.
- **Readback po zapisie**: Operacja nie jest uznawana za zakończoną, dopóki lista folderu lub metadane nie potwierdzą obecności plików. Rzeczywisty link jest zapisywany w podsumowaniu i pamięci automatyzacji.
- **Migracja bez utraty danych**: Wcześniejsze pliki skonwertowane do Google Docs zachowano w `_archive-google-docs`; bieżącym formatem źródłowym jest Markdown.

### 🔹 Iteracja 9: Pipeline publikacyjny DRAFT i wymagania graficzne (stan bieżący)
- **Import treści Markdown**: Vite ładuje materiały przeznaczone do redakcji wyłącznie z `content/draft` przez `import.meta.glob`, a `draftArticles.ts` zamienia je w typowane obiekty `Article`. `content/top-3` i `content/daily-news` pozostają archiwum wyników automatyzacji.
- **Status redakcyjny**: Materiał bez formalnego zatwierdzenia agenta odpowiedzialnego za poprawność treści pozostaje oznaczony jako `DRAFT` na karcie i stronie artykułu.
- **Minimum dwóch grafik**: Każdy importowany materiał bez kompletu ilustracji otrzymuje dwa placeholdery. Każdy placeholder zawiera konkretny prompt, prostą nazwę pliku oraz docelową ścieżkę w `public/news/drafts/<slug>/`.
- **Bez automatycznej publikacji**: Import do interfejsu nie oznacza zatwierdzenia. Status `APPROVED` może zostać nadany dopiero po weryfikacji treści, źródeł i dwóch grafik.

### 🔹 Iteracja 10: Pakiet redakcyjny 2026-07-03 i publikacja produkcyjna
- **Dziewięć nowych szkiców**: Dodano po trzy materiały w kategoriach newsy AI, kryminalne użycia AI i legalne sposoby zarabiania z AI; pełne wersje znajdują się w `content/top-3/2026-07-03_11-17/` oraz `content/draft/2026-07-03_11-17/`.
- **Aktualizacja dashboardu**: `src/data/aiTrendBriefing.ts` prezentuje najnowsze pozycje z jednym głównym źródłem na kartę, a pełne zestawy źródeł pozostają w plikach Markdown.
- **Jawny status DRAFT**: Nowe materiały są widoczne w redakcyjnym podglądzie jako szkice i automatycznie otrzymują dwa placeholdery grafik; nie są oznaczane jako zatwierdzone publikacje.
- **Synchronizacja Google Drive**: Pakiet `TOP 3` i dziewięć kopii `DRAFT` zostały zapisane w osobnych datowanych folderach jako surowe pliki Markdown i potwierdzone odczytem list folderów.
- **Porządkowanie archiwum**: Wyniki automatyzacji rozdzielono na `content/daily-news`, `content/top-3` i `content/draft`, zastępując wcześniejszy wspólny katalog `content/briefings`.
- **Kontrola wydania**: Przed publikacją wykonywane są `npm run lint` i produkcyjny build klienta; deployment GitHub Pages uruchamia się automatycznie po pushu do `main`.

### 🔹 Iteracja 11: Krótkie adresy publikacji i pierwsza kompletna bramka mediów
- **Krótkie adresy szkiców**: Trasy redakcyjne używają schematu `#/articles/MMRR/DD`, np. `#/articles/0726/03` dla pierwszej publikacji z 3 lipca 2026 r.
- **Wiele publikacji dziennie**: Kolejne wpisy z tej samej daty otrzymują deterministyczne końcówki `DD.1`, `DD.2` itd., zgodnie z kolejnością plików źródłowych.
- **Zgodność starych linków**: Dotychczasowe długie slug-i pozostają rozpoznawane i są automatycznie przekierowywane na nowy adres kanoniczny.
- **Manifest mediów szkiców**: Dodano `src/data/draftMedia.ts`, który jawnie łączy zweryfikowane pliki graficzne z artykułem, tekstem alternatywnym i podpisem.
- **Pierwsza bramka dwóch grafik**: Briefing z 3 lipca 2026 r. otrzymał dwa pliki WebP w `public/news/drafts/2026-07-03-daily-news-07-03/`; gotowe obrazy zastępują oba placeholdery.
- **Bez przedwczesnej akceptacji**: Komplet mediów aktualizuje komunikaty artykułu, ale nie zmienia statusu `DRAFT`; publikacja nadal wymaga jawnej akceptacji merytorycznej.
- **Obsługa GitHub Pages**: Renderer buduje ścieżki obrazów z `import.meta.env.BASE_URL`, dzięki czemu zasoby działają lokalnie i pod prefiksem `/Blog/` na produkcji.

### 🔹 Iteracja 12: Uzupełnienie historycznych briefingów dziennych 4-7 lipca 2026
- **Domknięcie luki archiwum**: Dodano brakujące briefingi dzienne dla 4, 5, 6 i 7 lipca 2026 r. w `content/daily-news/YYYY-MM-DD/YYYY-MM-DD.md`.
- **Import redakcyjny jako DRAFT**: Utworzono odpowiadające im kopie w `content/draft/YYYY-MM-DD-daily-news/YYYY-MM-DD.md`, dzięki czemu aplikacja importuje je jako szkice z automatycznymi placeholderami dwóch grafik.
- **Metodyka źródeł**: Każdy briefing zachowuje pięć pozycji, podział Polska/świat, daty publikacji i zdarzenia, bezpośrednie URL-e źródeł oraz jawny status roboczy.
- **Synchronizacja Drive DRAFT**: Utworzono foldery `2026-07-04-daily-news` - `2026-07-07-daily-news` w katalogu Google Drive `DRAFT` i zapisano w nich surowe pliki Markdown bez konwersji do Google Docs, z readbackiem list folderów.
- **Bez publikacji przed akceptacją**: Historyczne materiały nie zmieniają statusu na `APPROVED`; nadal wymagają weryfikacji merytorycznej i kompletu legalnych grafik.

---

## Stan projektu: teraz, uzgodnione działania i cel

| Obszar | Stan bieżący | Uzgodniony następny krok | Stan docelowy |
|---|---|---|---|
| Frontend | React SPA, artykuły typowane, dashboardy i czytnik | Uzupełniać grafiki i zatwierdzać szkice | Stabilny magazyn z kontrolowanym cyklem publikacji |
| Backend | Express, Firestore/local JSON, Gmail SMTP, health check | Wdrożyć i monitorować Cloud Run oraz sekrety | Oddzielne, obserwowalne API z trwałym storage i kontrolą nadużyć |
| Google Workspace w aplikacji | OAuth w przeglądarce, Drive/Docs w Strefie Twórcy | Ograniczyć zakresy OAuth do minimum wymaganego przez realne operacje | Bezpieczny panel redakcyjny z granularnymi uprawnieniami i audytem |
| Automatyzacje | Dwa harmonogramy, internet research, Markdown, lint | Utrzymać pamięć, idempotencję i readback Drive | Wieloetapowy pipeline research → fact-check → grafiki → approval → publikacja |
| Google Drive | Datowane foldery i surowe `.md`, osobny `TOP 3` | Aktualizować pliki bez duplikatów | Wspólne archiwum redakcyjne ze stanami i manifestem przebiegu |
| Kontrola treści | Wszystkie niezatwierdzone lub niekompletne materiały mają `DRAFT` | Agent poprawności zatwierdza fakty; generator dostarcza dwie grafiki | Tylko kompletne materiały `APPROVED` są widoczne jako opublikowane |

### Kryterium gotowości artykułu

Artykuł może przejść z `DRAFT` do `APPROVED`, gdy jednocześnie:

1. źródła są dostępne, bezpośrednie i potwierdzają kluczowe twierdzenia;
2. daty publikacji i zdarzenia zostały zweryfikowane;
3. agent odpowiedzialny za poprawność treści zostawił jednoznaczny wynik akceptacji;
4. istnieją co najmniej dwie legalne grafiki w zadeklarowanych ścieżkach lokalnych;
5. placeholdery zostały zastąpione właściwymi mediami i tekstami alternatywnymi;
6. `npm run lint` oraz `npm run build` kończą się powodzeniem.

---

## Know-how: podłączenie backendu

### Jak backend działa obecnie

`server.ts` łączy dwie role:

- w development uruchamia Express i Vite jako middleware pod jednym portem;
- w production obsługuje API oraz statyczne pliki z `dist`.

Przepływ newslettera wygląda następująco:

```text
NewsletterForm → POST /api/subscribe → walidacja e-mail
                                      → Firestore (production)
                                      → subscriptions.json (development)
                                      → Gmail SMTP (opcjonalnie)
```

### Konfiguracja lokalna

1. Skopiuj `.env.example` do `.env` i nie commituj sekretów.
2. Pozostaw `USE_FIRESTORE` puste, jeśli chcesz korzystać z `subscriptions.json`.
3. Ustaw `GMAIL_USER` i `GMAIL_APP_PASSWORD` tylko wtedy, gdy potrzebna jest wiadomość powitalna.
4. Uruchom `npm install`, następnie `npm run dev`.
5. Sprawdź `http://localhost:3000/api/health`.
6. Wyślij testowy zapis i potwierdź odpowiedź API oraz wpis w storage.

### Konfiguracja produkcyjna

1. Utwórz projekt Google Cloud i Firestore w trybie Native.
2. Nadaj kontu usługi Cloud Run rolę `Cloud Datastore User`.
3. Umieść dane Gmail wyłącznie w Secret Manager.
4. Wdróż backend do Cloud Run z `GOOGLE_CLOUD_PROJECT` i sekretami.
5. Ustaw publiczny URL usługi jako `VITE_API_BASE_URL` w GitHub Actions.
6. Przebuduj frontend i sprawdź `/api/health`, CORS oraz pełny zapis newslettera.

### Ograniczenia obecnego backendu

- Endpoint nie ma jeszcze rate limitingu, CAPTCHA ani kolejki wysyłkowej.
- Gmail SMTP nadaje się do małej skali, ale nie zastępuje dostawcy transakcyjnego z obsługą reputacji i bounce'ów.
- Lokalny JSON jest mechanizmem deweloperskim, nie storage produkcyjnym.
- Brakuje centralnego monitoringu błędów, metryk i alarmów.

### Docelowy backend

Docelowo API powinno mieć walidację schematu, rate limiting, ochronę antybotową, kolejkę wiadomości, dedykowanego dostawcę e-mail, logi strukturalne, alerty i testy integracyjne. Operacje redakcyjne powinny być oddzielone od publicznego endpointu newslettera oraz chronione uwierzytelnieniem i rolami.

---

## Know-how: Google Drive — dwa niezależne połączenia

Projekt korzysta z Google Drive na dwa różne sposoby. Nie należy ich mylić.

### 1. Strefa Twórcy w aplikacji

Frontend używa Firebase Auth i Google OAuth. `firebaseAuth.ts` inicjalizuje provider, dodaje zakresy Drive i Docs, a token dostępu przechowuje wyłącznie w pamięci procesu przeglądarki. `WorkspacePage.tsx` wywołuje oficjalne API Google bez pośredniczącego backendu.

Procedura konfiguracji:

1. Utwórz lub wybierz projekt Firebase/Google Cloud.
2. Włącz Firebase Authentication i provider Google.
3. Włącz Google Drive API oraz Google Docs API.
4. Skonfiguruj ekran zgody OAuth i dozwolone domeny.
5. Umieść publiczną konfigurację Firebase w `firebase-applet-config.json`; nie umieszczaj tam sekretu konta usługi.
6. Zaloguj się w `/workspace`, potwierdź zakresy i wykonaj test listowania plików.
7. Przed każdą mutacją zachowaj potwierdzenie użytkownika.

### 2. Google Drive używany przez automatyzacje Codex

Automatyzacje korzystają z podłączonego connectora Google Drive w środowisku Codex, a nie z tokenu zapisowanego w aplikacji. Foldery docelowe są wskazane przez stabilne identyfikatory:

- folder główny: `1k_6odvzXd9xAs3lngICP-FMl43xuBccE`;
- folder pakietów: `1hrZeNgh0D5k9joChMGnk_lnqejJr9A8K` (`TOP 3`).

Bezpieczny algorytm synchronizacji:

1. odczytaj pamięć automatyzacji i ustal nazwę przebiegu;
2. znajdź folder o oczekiwanej nazwie lub utwórz go pod właściwym parent ID;
3. przed uploadem sprawdź, czy plik o tej nazwie już istnieje;
4. nowy plik prześlij jako `text/markdown`, a istniejący aktualizuj po ID;
5. po zapisie ponownie odczytaj folder;
6. porównaj liczbę i nazwy plików z katalogiem lokalnym;
7. zapisz rzeczywisty URL i wynik w `memory.md`.

### Zasada bezpieczeństwa Drive

Nie należy usuwać ani przenosić plików na podstawie samej nazwy. Najpierw trzeba potwierdzić ID pliku, aktualny parent ID i folder docelowy. Historyczne formaty powinny trafić do archiwum zamiast być bezpowrotnie kasowane.

---

## Know-how: automatyzacja procesu redakcyjnego

### Poziom obecny

```text
Harmonogram
  → wyszukanie i weryfikacja źródeł
  → zapis Markdown w repozytorium i kopia w content/draft
  → aktualizacja danych dashboardu
  → synchronizacja surowych .md do Drive i folderu DRAFT
  → import do bloga jako DRAFT
  → dwa placeholdery grafik
  → lint i raport przebiegu
```

Mechanizm działa deterministycznie na poziomie struktury plików, ale zatwierdzenie merytoryczne i dostarczenie grafik pozostają etapami ręcznymi lub realizowanymi przez osobnych agentów.

### Poziom docelowy

```text
Research Agent
  → Fact-check Agent (raport APPROVED/REJECTED)
  → Editorial Agent (ujednolicenie tekstu i metadanych)
  → Image Agent (minimum 2 grafiki + licencja + alt)
  → Quality Gate (źródła, pliki, lint, build, linki)
  → Publishing Agent (zmiana DRAFT → APPROVED)
  → Git/Drive/Deploy
  → monitoring i możliwość wycofania publikacji
```

Docelowy proces powinien używać manifestu dla każdego artykułu, np. `article.manifest.json`, zawierającego statusy etapów, identyfikatory źródeł, ścieżki grafik, wynik fact-checku, datę akceptacji i wersję opublikowaną. Dzięki temu status nie zależy od interpretacji tekstu ani nazwy pliku.

### Najbliższe działania

1. Dodać trwały manifest workflow i jednoznaczny podpis agenta zatwierdzającego.
2. Wprowadzić automatyczną kontrolę obecności dwóch plików graficznych przed `APPROVED`.
3. Zastępować placeholdery po dostarczeniu obrazów, zachowując prompt jako historię produkcyjną.
4. Ukryć `DRAFT` przed publicznym buildem lub przenieść je do chronionego podglądu redakcyjnego.
5. Dodać test martwych linków, walidację dat i raport rozbieżności źródeł.
6. Połączyć zatwierdzony manifest z automatycznym commitem, wdrożeniem i archiwizacją wersji na Drive.

---


## 🛠️ Stack Technologiczny

- **React 19** — nowoczesne, funkcyjne komponenty z hookami.
- **TypeScript** — silne, bezpieczne typowanie całego modelu danych.
- **Vite** — ultraszybkie środowisko deweloperskie i optymalny proces budowania.
- **Tailwind CSS v4** — błyskawiczna stylizacja za pomocą klas narzędziowych i zdefiniowanego motywu graficznego.
- **React Router 6** — obsługa ścieżek aplikacji (`react-router-dom`).
- **Lucide React** — kompletny zestaw spójnych, wektorowych ikon interfejsu.

---

## ⚙️ Wymagania Systemowe

- **Node.js**: wersja 18.x lub nowsza (rekomendowana wersja LTS)
- **Menedżer pakietów**: npm (wersja 9.x lub nowsza)

---

## 💻 Instrukcja Uruchomienia i Rozwoju

### 1. Instalacja zależności
Przed pierwszym uruchomieniem projektu, pobierz i zainstaluj wymagane paczki:
```bash
npm install
```

### 2. Uruchomienie serwera deweloperskiego
Uruchom aplikację lokalnie z podglądem na żywo (serwer zostanie zbindowany na porcie `3000`):
```bash
npm run dev
```
Po uruchomieniu aplikacja będzie dostępna pod adresem: `http://localhost:3000`.

### 3. Statyczna analiza kodu i sprawdzanie typów
Uruchom kompilator TypeScript bez generowania plików wyjściowych, aby upewnić się, że w projekcie nie występują błędy typowania:
```bash
npm run lint
```

### 4. Build produkcyjny
Skompiluj i zoptymalizuj aplikację do wersji produkcyjnej. Wszystkie zminimalizowane pliki statyczne HTML, CSS i JS zostaną wygenerowane w katalogu `dist/`:
```bash
npm run build
```

---

## 📁 Struktura Projektu

Szczegółowy opis struktury katalogów i plików znajduje się w dedykowanej instrukcji architektonicznej [AGENTS.md](./AGENTS.md). 

Najważniejsze lokalizacje danych:
- **Model danych artykułu**: `src/types/article.ts`
- **Wpisy i treść (baza danych bloga)**: `src/data/articles.ts`
- **Wektorowe ilustracje SVG**: `src/components/article/ArticleIllustration.tsx`

---

## 📝 Jak Dodać Nowy Artykuł

Treść bloga jest całkowicie oddzielona od kodu interfejsu i przechowywana w postaci ustrukturyzowanej bazy danych TypeScript w pliku `src/data/articles.ts`. 

Aby dodać artykuł, wystarczy wkleić nowy obiekt implementujący interfejs `Article` na końcu tablicy `ARTICLES`. Szczegółowy szablon i opis pól znajdziesz w pliku [AGENTS.md](./AGENTS.md#4-dane-artykułów-srcdataarticlests).

---

## 🌐 Wdrożenie na GitHub Pages

Projekt został specjalnie zoptymalizowany pod kątem wdrożenia jako witryna statyczna na GitHub Pages:
1. **Brak błędów 404**: Dzięki zastosowaniu `HashRouter` w `src/App.tsx`, bezpośrednie wejście pod adresy takie jak `https://nazwa-uzytkownika.github.io/nazwa-repozytorium/#/articles/codex-jako-drugi-inzynier` działa poprawnie i nie powoduje błędów po odświeżeniu strony przez użytkownika.
2. **Konfiguracja ścieżki bazowej (base path)**: Jeśli Twoja witryna na GitHub Pages znajduje się w podkatalogu (np. `https://nazwa-uzytkownika.github.io/nazwa-repozytorium/`), upewnij się, że w pliku `vite.config.ts` ustawiono odpowiednią opcję `base`:
   ```typescript
   export default defineConfig({
     base: '/nazwa-repozytorium/',
     // pozostała konfiguracja...
   })
   ```
3. **Automatyzacja wdrożenia**: Możesz dodać pakiet `gh-pages` jako zależność deweloperską (`npm install -D gh-pages`), a następnie dodać skrypty do `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
   Wtedy publikacja sprowadza się do wywołania jednej komendy: `npm run deploy`.

---

## 📧 Konfiguracja Newslettera (Gmail SMTP)

Aplikacja posiada zaimplementowany, bezpieczny system zapisu na newsletter oparty o serwer **Express.js**. Adresy subskrybentów są domyślnie zapisywane w lokalnym pliku kopii zapasowej `subscriptions.json` w głównym katalogu projektu.

Aby aktywować automatyczną wysyłkę e-maili powitalnych za pomocą serwera pocztowego **Gmail**, należy zadeklarować w ustawieniach środowiskowych lub pliku `.env` następujące klucze:

- `GMAIL_USER` — Twój adres e-mail Gmail (np. `twoj-login@gmail.com`).
- `GMAIL_APP_PASSWORD` — Hasło aplikacji wygenerowane na koncie Google (Ustawienia konta -> Bezpieczeństwo -> Weryfikacja dwuetapowa -> Hasła do aplikacji).

Jeśli zmienne te nie są ustawione, zapis do newslettera nadal powiedzie się (e-mail zostanie zabezpieczony w `subscriptions.json`), a interfejs poinformuje o zapisie w bazie lokalnej.

---

## ☁️ Integracja Google Workspace (Google Drive & Google Docs)

Projekt posiada dedykowaną **Strefę Twórcy** (`/workspace`), która umożliwia bezpośrednią integrację z chmurą Google:
1. **Bezpieczne Logowanie Google OAuth**: Użytkownik loguje się przez dedykowany, bezpieczny popup Firebase Google Auth. Token dostępu do API jest bezpiecznie przechowywany wyłącznie w pamięci operacyjnej (In-Memory Access Token), co uniemożliwia wyciek wrażliwych danych przez pliki cookie czy localStorage.
2. **Eksplorator Plików Google Drive**: Umożliwia wyszukiwanie w czasie rzeczywistym oraz listowanie i filtrowanie plików w Twojej chmurze (w tym dedykowane filtrowanie plików Google Docs).
3. **Eksport Szkiców do Google Docs**: Użytkownik może wybrać profesjonalny szablon (np. zarys strategii monetyzacji lub inżynierii promptów), spersonalizować nazwę i jednym kliknięciem wyeksportować sformatowany szkic bezpośrednio do nowego dokumentu Google Docs na swoim dysku.
4. **Wbudowany Importer Treści**: Możliwość pobrania i zdekodowania struktury dowolnego pliku Google Doc za pomocą oficjalnego **Google Docs API v1** i wyświetlenia jego zawartości w eleganckim, szeryfowym podglądzie bezpośrednio w aplikacji.

---

## 🎨 Unikalna Identyfikacja Wizualna & Premium Feel

Projekt wyróżnia się spójną, starannie zaprojektowaną identyfikacją wizualną:
1. **Sygnet Autorski (`KMSygnet`)**: Złoty, geometryczny monogram „KM” w okrągłej oprawie zintegrowany w nagłówku i stopce aplikacji, a także wdrożony jako dynamiczny, responsywny favicon SVG w pliku `index.html`.
2. **AI Content Dashboard**: Panel na stronie głównej prezentujący wyselekcjonowane i dynamiczne treści w minimalistycznym i czytelnym układzie 3 kolumn:
   - *Top Newsy Świata AI* — Kluczowe wydarzenia technologiczne.
   - *Kryminalne Wykorzystania AI* — Opisy niebezpiecznych incydentów i mechanizmów oszustw.
   - *Pomysły na Zarabianie* — Praktyczne i konkretne sposoby na monetyzację zaawansowanych modeli.
3. **Efekt Hover Lift**: Wszystkie karty w sekcji Daily Briefing oraz AI Content Dashboard posiadają płynne animacje uniesienia (`hover-lift`) i przejścia cieni, nadające całości charakter luksusowego, interaktywnego magazynu drukowanego.

---

## 🤖 Filozofia AI-Native Creator (Bez programowania od zera)

Ten projekt powstał w pełni w oparciu o filozofię **AI-Native Product Orchestration**. Treść bloga oraz architektura systemu zostały zaprojektowane tak, by pokazać, że **nie musisz być tradycyjnym, manualnym programistą, aby tworzyć i wdrażać zaawansowane technologicznie, bezpieczne, produkcyjne aplikacje full-stack**. 

Kluczem do sukcesu jest:
- Umiejętna inżynieria promptów na poziomie repozytorium.
- Synergiczne dzielenie ról pomiędzy wyspecjalizowanych asystentów (AI Studio jako globalny architekt, Claude jako projektant struktur danych, Codex jako precyzyjny realizator, Trae jako lokalny esteta UI).
- Automatyczna weryfikacja kodu (kompilator, linter) pełniąca rolę tarczy ochronnej dla każdego twórcy.

---

## 🤖 Dalsza Praca w Środowisku Codex

Repozytorium jest w pełni przygotowane do natychmiastowej, zautomatyzowanej edycji przez asystentów programowania AI. Jeśli rozwijasz ten projekt w Codex:
1. Codex przeczyta wytyczne z pliku [AGENTS.md](./AGENTS.md) i automatycznie zrozumie całą architekturę (w tym nowy model full-stack Express + Vite).
2. Codex łatwo odnajdzie i zmodyfikuje bazę danych w `src/data/articles.ts` lub endpointy w `server.ts` bez ryzyka uszkodzenia interfejsu.
3. System kompilacji i sprawdzania typów gwarantuje, że każda zmiana zostanie zweryfikowana przed wdrożeniem.

---

## Produkcyjne wdrożenie: GitHub Pages + Cloud Run

Repozytorium zawiera workflow `.github/workflows/deploy-pages.yml`. Po każdym pushu do `main` wykonuje on lint, buduje frontend z bazową ścieżką `/Blog/` i publikuje katalog `dist` w GitHub Pages.

1. W repozytorium GitHub otwórz **Settings → Pages** i wybierz **Source: GitHub Actions**.
2. Po wdrożeniu backendu dodaj w **Settings → Secrets and variables → Actions** sekret `VITE_API_BASE_URL`. Jego wartością ma być publiczny adres Cloud Run bez końcowego ukośnika.
3. Uruchom workflow ręcznie w zakładce **Actions** albo wykonaj push do `main`.

Frontend będzie dostępny pod `https://kamillimak.github.io/Blog/`.

### Backend newslettera na Cloud Run

Backend używa Firestore w produkcji i lokalnego `subscriptions.json` podczas pracy deweloperskiej. Kontener jest opisany w `Dockerfile` i respektuje zmienną `PORT` ustawianą przez Cloud Run.

1. W projekcie Google Cloud `gen-lang-client-0172881890` włącz Cloud Run, Cloud Build, Artifact Registry i Firestore.
2. Utwórz bazę Firestore w trybie Native. Konto usługi Cloud Run musi mieć rolę **Cloud Datastore User**.
3. W Secret Manager utwórz opcjonalne sekrety `GMAIL_USER` i `GMAIL_APP_PASSWORD`. Bez nich adresy będą zapisywane, lecz wiadomość powitalna nie zostanie wysłana.
4. Wdróż usługę z katalogu repozytorium:

```bash
gcloud auth login
gcloud config set project gen-lang-client-0172881890
gcloud run deploy blog-api --source . --region europe-central2 --allow-unauthenticated --set-env-vars GOOGLE_CLOUD_PROJECT=gen-lang-client-0172881890 --set-secrets GMAIL_USER=GMAIL_USER:latest,GMAIL_APP_PASSWORD=GMAIL_APP_PASSWORD:latest
```

5. Skopiuj URL zwrócony przez Cloud Run do sekretu GitHub `VITE_API_BASE_URL`, a następnie ponownie uruchom workflow Pages.

Endpoint kontrolny backendu znajduje się pod `/api/health`. CORS dopuszcza GitHub Pages oraz lokalne adresy deweloperskie.

## Daily Digest Newsletter

Backend ma dwa tryby pracy newslettera:

1. `POST /api/subscribe` zapisuje adres e-mail do Firestore w produkcji albo do `subscriptions.json` lokalnie. Gmail SMTP może wysłać wiadomość powitalną, jeśli ustawiono `GMAIL_USER` i `GMAIL_APP_PASSWORD`.
2. `POST /api/newsletter/daily-digest` wysyła raz dziennie digest nowości z ostatnich 24h. Endpoint pobiera subskrybentów, zbiera nowe artykuły oraz materiały z `content/daily-news` i `content/top-3`, a następnie wysyła mail przez Gmail SMTP.

Endpoint dziennego digestu w produkcji wymaga sekretu:

```bash
Authorization: Bearer <CRON_SECRET>
```

albo:

```bash
x-cron-secret: <CRON_SECRET>
```

Test bez wysyłki:

```bash
curl -X POST "https://<cloud-run-url>/api/newsletter/daily-digestdryRun=1" \
  -H "Authorization: Bearer <CRON_SECRET>"
```

Docelowy harmonogram: Cloud Scheduler -> Cloud Run -> Firestore + Gmail SMTP. Cloud Scheduler wywołuje endpoint raz dziennie, Cloud Run wykonuje kod backendu, Firestore przechowuje subskrybentów, a Gmail SMTP odpowiada za samą wysyłkę.
