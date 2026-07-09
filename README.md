# Warsztat AI Coding â€” Kompletny Blog Technologiczny

**Warsztat AI Coding** to nowoczesny, w peĹ‚ni responsywny blog technologiczny o wysokiej estetyce wizualnej (premium minimalist magazine), stworzony z myĹ›lÄ… o programistach, architektach i pasjonatach inĹĽynierii oprogramowania wspomaganej przez sztucznÄ… inteligencjÄ™. 

Blog skupia siÄ™ wokĂłĹ‚ synergii czterech przeĹ‚omowych narzÄ™dzi deweloperskich: **Codex**, **Trae**, **Claude** oraz **AI Studio**, pokazujÄ…c ich unikalne role w jednym, spĂłjnym przepĹ‚ywie pracy (workflow).

---

## đźš€ GĹ‚Ăłwne Funkcje Aplikacji

1. **Strona GĹ‚Ăłwna (Dashboard)**:
   - Dynamiczny Hero Section wyrĂłĹĽniajÄ…cy najnowszy wpis.
   - Panel statystyk liczbowych (liczba sĹ‚Ăłw, Ĺ‚Ä…czny czas czytania itp.) zaprojektowany w stylu bento-grid.
   - Interaktywny przewodnik po 4 etapach nowoczesnego workflow dewelopera.
   - Filtrowana biblioteka artykuĹ‚Ăłw.
2. **Zaawansowana Biblioteka ArtykuĹ‚Ăłw (`/articles`)**:
   - Wyszukiwanie w czasie rzeczywistym po tytule, opisie lub tagach.
   - Filtrowanie wielokryteriowe (osobno po kategorii i uĹĽywanym narzÄ™dziu AI).
   - Dynamiczny licznik wynikĂłw wyszukiwania oraz przejrzysty stan braku wynikĂłw (Empty State) z szybkim resetem filtrĂłw.
3. **Imersyjny Widok ArtykuĹ‚u (`/articles/:slug`)**:
   - Pasek postÄ™pu czytania (Reading Progress Bar) przyklejony do gĂłry ekranu.
   - Osobny panel ustawieĹ„ czytnika (moĹĽliwoĹ›Ä‡ dynamicznej zmiany rozmiaru czcionki dla wygody czytania: MaĹ‚y, Ĺšredni, DuĹĽy).
   - Automatycznie generowany Spis TreĹ›ci (Table of Contents) z aktywnym Ĺ›ledzeniem pozycji scrollowania za pomocÄ… `IntersectionObserver`.
   - Profesjonalny, typograficzny podziaĹ‚ tekstu (krĂłj szeryfowy dla treĹ›ci artykuĹ‚Ăłw w celu zminimalizowania zmÄ™czenia wzroku).
   - Sekcja â€žNajwaĹĽniejsze wnioskiâ€ť (Key Takeaways) podsumowujÄ…ca dany artykuĹ‚.
   - W peĹ‚ni sprawny system kopiowania blokĂłw kodu ĹşrĂłdĹ‚owego oraz kopiowania linku do schowka z powiadomieniem typu toast.
   - Rekomendacje powiÄ…zanych tematycznie artykuĹ‚Ăłw zachÄ™cajÄ…ce do dalszego czytania.

---

## đź“ Kronika Iteracji i Zrealizowanych FunkcjonalnoĹ›ci

Projekt ewoluowaĹ‚ przez szereg ustrukturyzowanych iteracji, z ktĂłrych kaĹĽda wnosiĹ‚a kluczowe ulepszenia pod kÄ…tem doĹ›wiadczenia uĹĽytkownika (UX), bezpieczeĹ„stwa i zaawansowania technicznego:

### đź”ą Iteracja 1: Fundamenty i Statyczne SPA
- **Architektura React + Vite**: Skonfigurowano nowoczesne Ĺ›rodowisko programistyczne z peĹ‚nÄ… obsĹ‚ugÄ… TypeScript.
- **Premium Magazine Design**: Zaprojektowano minimalistyczny interfejs w stonowanych barwach (Inter dla interfejsu i Playfair Display/krĂłj szeryfowy dla artykuĹ‚Ăłw), aby zoptymalizowaÄ‡ czytelnoĹ›Ä‡ i wyeliminowaÄ‡ zmÄ™czenie oczu.
- **Ustrukturyzowana Baza ArtykuĹ‚Ăłw**: Oddzielono treĹ›Ä‡ od widoku poprzez wdroĹĽenie bazy danych `src/data/articles.ts` opartej o Ĺ›cisĹ‚e typowanie zdefiniowane w `src/types/article.ts`.
- **Wygodne Filtrowanie i Wyszukiwanie**: Dodano zaawansowanÄ… wyszukiwarkÄ™ w czasie rzeczywistym z wielokryteriowym filtrowaniem (kategoria, uĹĽyte narzÄ™dzie AI) zoptymalizowanÄ… z uĹĽyciem `useMemo`.
- **ZgodnoĹ›Ä‡ z GitHub Pages**: WdroĹĽono `HashRouter`, eliminujÄ…c znany problem bĹ‚Ä™du 404 podczas odĹ›wieĹĽania podstron na hostingu statycznym.

### đź”ą Iteracja 2: Zaawansowany Czytnik & NarzÄ™dzia Interaktywne
- **Automatyczny Spis TreĹ›ci (Table of Contents)**: Zaimplementowano interaktywny boczny panel, ktĂłry automatycznie odczytuje nagĹ‚Ăłwki artykuĹ‚u i podĹ›wietla aktualnÄ… sekcjÄ™ za pomocÄ… `IntersectionObserver`.
- **Interaktywne Akcje**: Dodano funkcjonalnoĹ›Ä‡ kopiowania kodu ĹşrĂłdĹ‚owego jednym klikniÄ™ciem oraz kopiowania linku bezpoĹ›redniego do artykuĹ‚u wraz z eleganckim, autorskim powiadomieniem toast.
- **Rekomendacje TreĹ›ci**: WdroĹĽono silnik rekomendujÄ…cy powiÄ…zane artykuĹ‚y na dole strony czytnika.

### đź”ą Iteracja 3: Architektura Full-Stack & System Subskrypcji
- **Ewolucja do Full-Stack (Express.js)**: Rozbudowano aplikacjÄ™ z prostej strony statycznej do serwera Express.js obsĹ‚ugujÄ…cego middleware Vite w trybie deweloperskim.
- **Kompilacja Produkcyjna Bundlerem esbuild**: Skonfigurowano skrypty budowania tak, by serwer backendowy byĹ‚ kompilowany do jednego, bezpiecznego pliku CommonJS (`dist/server.cjs`) dla Ĺ‚atwego uruchomienia w Ĺ›rodowiskach chmurowych (np. Cloud Run).
- **Endpoint Subskrypcji (`/api/subscribe`)**: Zbudowano bezpiecznÄ… bramkÄ™ przyjmujÄ…cÄ… e-maile uĹĽytkownikĂłw z podwĂłjnym systemem zapisu: do lokalnej bazy danych JSON (`subscriptions.json`) oraz poprzez wysyĹ‚kÄ™ e-maili powitalnych przez serwer pocztowy Gmail SMTP (`nodemailer`) z wykorzystaniem zmiennych Ĺ›rodowiskowych.
- **Premium Newsletter Form**: Dodano responsywny formularz w stopce (`NewsletterForm.tsx`) informujÄ…cy uĹĽytkownika o dokĹ‚adnym statusie zapisu.

### đź”ą Iteracja 4: Identyfikacja Wizualna Premium & AI Content Dashboard
- **Sygnet Autorski (`KMSygnet.tsx`)**: Opracowano i zaimplementowano wektorowy, zĹ‚oty monogram â€žKMâ€ť w eleganckiej okrÄ…gĹ‚ej oprawie, peĹ‚niÄ…cy rolÄ™ logo w nagĹ‚Ăłwku, stopce oraz jako favicon SVG bezpoĹ›rednio w `<head>` pliku `index.html`.
- **AI Content Dashboard (`AIContentDashboard.tsx`)**: Stworzono nowoczesny, trĂłjkolumnowy panel na stronie gĹ‚Ăłwnej w miejsce uproszczonej siatki nowinek, grupujÄ…cy kluczowe, skondensowane informacje (Top Newsy, Kryminalne uĹĽycia, PomysĹ‚y na zarabianie).
- **Premium Hover-Lift Effect**: Wprowadzono do wszystkich interaktywnych kart (zarĂłwno w Daily Briefing, jak i w AI Content Dashboard) subtelne uniesienie (`hover:-translate-y-1` / `hover:-translate-y-1.5`) i pĹ‚ynne przejĹ›cia cieni, potÄ™gujÄ…ce wraĹĽenie ekskluzywnego magazynu.
- **Optymalizacja Persony Autora**: Przeredagowano treĹ›ci na stronie gĹ‚Ăłwnej i w sekcji workflow, by jasno ukazaÄ‡ autora jako eksperta orkiestracji procesĂłw i zaawansowanych narzÄ™dzi AI (AI-Native Creator / AI Orchestration Expert), a nie tradycyjnego programistÄ™.

### đź”ą Iteracja 5: Google Workspace i Strefa TwĂłrcy
- **Firebase Authentication**: Dodano logowanie Google w popupie oraz zakresy OAuth dla Google Drive i Google Docs.
- **Token tylko w pamiÄ™ci**: Token Google nie jest zapisywany w `localStorage`, `sessionStorage` ani bazie aplikacji. Istnieje wyĹ‚Ä…cznie w zmiennej moduĹ‚u `firebaseAuth.ts` i jest czyszczony przy wylogowaniu.
- **Strefa TwĂłrcy (`/workspace`)**: Dodano eksplorator Drive, wyszukiwanie dokumentĂłw, bezpieczny podglÄ…d treĹ›ci Docs API v1 oraz eksport nowych szkicĂłw do Google Docs.
- **Kontrola mutacji**: Operacje tworzÄ…ce pliki wymagajÄ… jawnego potwierdzenia uĹĽytkownika.

### đź”ą Iteracja 6: Produkcyjny backend i trwaĹ‚y newsletter
- **Cloud Run**: Backend Express moĹĽe dziaĹ‚aÄ‡ jako kontener, korzysta z `PORT`, udostÄ™pnia `/api/health` i ogranicza CORS do GitHub Pages oraz Ĺ›rodowiska lokalnego.
- **Firestore w produkcji**: Subskrypcje sÄ… przechowywane w kolekcji `newsletterSubscriptions`; identyfikatorem dokumentu jest hash SHA-256 adresu e-mail, co zapobiega duplikatom bez uĹĽywania adresu jako jawnego ID.
- **Fallback lokalny**: Poza produkcjÄ… dane trafiajÄ… do `subscriptions.json`, chyba ĹĽe jawnie ustawiono `USE_FIRESTORE`.
- **Gmail SMTP jako funkcja opcjonalna**: Brak sekretĂłw pocztowych nie blokuje zapisu subskrypcji. WysyĹ‚ka powitalna jest dodatkiem, nie pojedynczym punktem awarii.
- **Rozdzielony deployment**: Frontend jest publikowany przez GitHub Actions na GitHub Pages, a API dziaĹ‚a niezaleĹĽnie w Cloud Run; Ĺ‚Ä…czy je `VITE_API_BASE_URL`.

### đź”ą Iteracja 7: Automatyczne briefingi redakcyjne
- **Briefing dzienny**: Automatyzacja o 08:00 przygotowuje piÄ™Ä‡ wiadomoĹ›ci AI/IT z podziaĹ‚em Polskaâ€“Ĺ›wiat, aktualizuje `DailyBriefing` i zapisuje raport w `content/daily-news/YYYY-MM-DD/YYYY-MM-DD.md`.
- **Pakiet TOP 3**: Automatyzacja o 09:15 i 18:15 przygotowuje po trzy materiaĹ‚y w kategoriach newsy, przestÄ™pczoĹ›Ä‡ AI i legalne sposoby zarabiania, zapisujÄ…c wynik w `content/top-3/YYYY-MM-DD_HH-mm/`.
- **PamiÄ™Ä‡ przebiegĂłw**: KaĹĽda automatyzacja zapisuje tematy, datÄ™, wynik walidacji i reguĹ‚y unikania powtĂłrzeĹ„ w swoim `memory.md` poza repozytorium.
- **Kontrola jakoĹ›ci technicznej**: KaĹĽdy przebieg koĹ„czy siÄ™ `npm run lint`; bĹ‚Ä™dy niezwiÄ…zane z aktualizacjÄ… nie powinny byÄ‡ modyfikowane automatycznie.

### đź”ą Iteracja 8: Synchronizacja redakcji z Google Drive
- **Surowe pliki Markdown**: Wyniki automatyzacji sÄ… przesyĹ‚ane jako `text/markdown`, bez konwersji do natywnego Google Docs.
- **Idempotentny zapis**: Automatyzacja najpierw znajduje lub tworzy folder przebiegu, a przy ponownym uruchomieniu aktualizuje istniejÄ…cy plik zamiast generowaÄ‡ duplikat.
- **Dwa kanaĹ‚y treĹ›ci**: Briefing dzienny trafia do datowanego folderu w katalogu gĹ‚Ăłwnym Drive, a pakiety redakcyjne do katalogu `TOP 3`.
- **Readback po zapisie**: Operacja nie jest uznawana za zakoĹ„czonÄ…, dopĂłki lista folderu lub metadane nie potwierdzÄ… obecnoĹ›ci plikĂłw. Rzeczywisty link jest zapisywany w podsumowaniu i pamiÄ™ci automatyzacji.
- **Migracja bez utraty danych**: WczeĹ›niejsze pliki skonwertowane do Google Docs zachowano w `_archive-google-docs`; bieĹĽÄ…cym formatem ĹşrĂłdĹ‚owym jest Markdown.

### đź”ą Iteracja 9: Pipeline publikacyjny DRAFT i wymagania graficzne (stan bieĹĽÄ…cy)
- **Import treĹ›ci Markdown**: Vite Ĺ‚aduje materiaĹ‚y przeznaczone do redakcji wyĹ‚Ä…cznie z `content/draft` przez `import.meta.glob`, a `draftArticles.ts` zamienia je w typowane obiekty `Article`. `content/top-3` i `content/daily-news` pozostajÄ… archiwum wynikĂłw automatyzacji.
- **Status redakcyjny**: MateriaĹ‚ bez formalnego zatwierdzenia agenta odpowiedzialnego za poprawnoĹ›Ä‡ treĹ›ci pozostaje oznaczony jako `DRAFT` na karcie i stronie artykuĹ‚u.
- **Minimum dwĂłch grafik**: KaĹĽdy importowany materiaĹ‚ bez kompletu ilustracji otrzymuje dwa placeholdery. KaĹĽdy placeholder zawiera konkretny prompt, prostÄ… nazwÄ™ pliku oraz docelowÄ… Ĺ›cieĹĽkÄ™ w `public/news/drafts/<slug>/`.
- **Bez automatycznej publikacji**: Import do interfejsu nie oznacza zatwierdzenia. Status `APPROVED` moĹĽe zostaÄ‡ nadany dopiero po weryfikacji treĹ›ci, ĹşrĂłdeĹ‚ i dwĂłch grafik.

### đź”ą Iteracja 10: Pakiet redakcyjny 2026-07-03 i publikacja produkcyjna
- **DziewiÄ™Ä‡ nowych szkicĂłw**: Dodano po trzy materiaĹ‚y w kategoriach newsy AI, kryminalne uĹĽycia AI i legalne sposoby zarabiania z AI; peĹ‚ne wersje znajdujÄ… siÄ™ w `content/top-3/2026-07-03_11-17/` oraz `content/draft/2026-07-03_11-17/`.
- **Aktualizacja dashboardu**: `src/data/aiTrendBriefing.ts` prezentuje najnowsze pozycje z jednym gĹ‚Ăłwnym ĹşrĂłdĹ‚em na kartÄ™, a peĹ‚ne zestawy ĹşrĂłdeĹ‚ pozostajÄ… w plikach Markdown.
- **Jawny status DRAFT**: Nowe materiaĹ‚y sÄ… widoczne w redakcyjnym podglÄ…dzie jako szkice i automatycznie otrzymujÄ… dwa placeholdery grafik; nie sÄ… oznaczane jako zatwierdzone publikacje.
- **Synchronizacja Google Drive**: Pakiet `TOP 3` i dziewiÄ™Ä‡ kopii `DRAFT` zostaĹ‚y zapisane w osobnych datowanych folderach jako surowe pliki Markdown i potwierdzone odczytem list folderĂłw.
- **PorzÄ…dkowanie archiwum**: Wyniki automatyzacji rozdzielono na `content/daily-news`, `content/top-3` i `content/draft`, zastÄ™pujÄ…c wczeĹ›niejszy wspĂłlny katalog `content/briefings`.
- **Kontrola wydania**: Przed publikacjÄ… wykonywane sÄ… `npm run lint` i produkcyjny build klienta; deployment GitHub Pages uruchamia siÄ™ automatycznie po pushu do `main`.

### đź”ą Iteracja 11: KrĂłtkie adresy publikacji i pierwsza kompletna bramka mediĂłw
- **KrĂłtkie adresy szkicĂłw**: Trasy redakcyjne uĹĽywajÄ… schematu `#/articles/MMRR/DD`, np. `#/articles/0726/03` dla pierwszej publikacji z 3 lipca 2026 r.
- **Wiele publikacji dziennie**: Kolejne wpisy z tej samej daty otrzymujÄ… deterministyczne koĹ„cĂłwki `DD.1`, `DD.2` itd., zgodnie z kolejnoĹ›ciÄ… plikĂłw ĹşrĂłdĹ‚owych.
- **ZgodnoĹ›Ä‡ starych linkĂłw**: Dotychczasowe dĹ‚ugie slug-i pozostajÄ… rozpoznawane i sÄ… automatycznie przekierowywane na nowy adres kanoniczny.
- **Manifest mediĂłw szkicĂłw**: Dodano `src/data/draftMedia.ts`, ktĂłry jawnie Ĺ‚Ä…czy zweryfikowane pliki graficzne z artykuĹ‚em, tekstem alternatywnym i podpisem.
- **Pierwsza bramka dwĂłch grafik**: Briefing z 3 lipca 2026 r. otrzymaĹ‚ dwa pliki WebP w `public/news/drafts/2026-07-03-daily-news-07-03/`; gotowe obrazy zastÄ™pujÄ… oba placeholdery.
- **Bez przedwczesnej akceptacji**: Komplet mediĂłw aktualizuje komunikaty artykuĹ‚u, ale nie zmienia statusu `DRAFT`; publikacja nadal wymaga jawnej akceptacji merytorycznej.
- **ObsĹ‚uga GitHub Pages**: Renderer buduje Ĺ›cieĹĽki obrazĂłw z `import.meta.env.BASE_URL`, dziÄ™ki czemu zasoby dziaĹ‚ajÄ… lokalnie i pod prefiksem `/Blog/` na produkcji.

### đź”ą Iteracja 12: UzupeĹ‚nienie historycznych briefingĂłw dziennych 4-7 lipca 2026
- **DomkniÄ™cie luki archiwum**: Dodano brakujÄ…ce briefingi dzienne dla 4, 5, 6 i 7 lipca 2026 r. w `content/daily-news/YYYY-MM-DD/YYYY-MM-DD.md`.
- **Import redakcyjny jako DRAFT**: Utworzono odpowiadajÄ…ce im kopie w `content/draft/YYYY-MM-DD-daily-news/YYYY-MM-DD.md`, dziÄ™ki czemu aplikacja importuje je jako szkice z automatycznymi placeholderami dwĂłch grafik.
- **Metodyka ĹşrĂłdeĹ‚**: KaĹĽdy briefing zachowuje piÄ™Ä‡ pozycji, podziaĹ‚ Polska/Ĺ›wiat, daty publikacji i zdarzenia, bezpoĹ›rednie URL-e ĹşrĂłdeĹ‚ oraz jawny status roboczy.
- **Synchronizacja Drive DRAFT**: Utworzono foldery `2026-07-04-daily-news` - `2026-07-07-daily-news` w katalogu Google Drive `DRAFT` i zapisano w nich surowe pliki Markdown bez konwersji do Google Docs, z readbackiem list folderĂłw.
- **Bez publikacji przed akceptacjÄ…**: Historyczne materiaĹ‚y nie zmieniajÄ… statusu na `APPROVED`; nadal wymagajÄ… weryfikacji merytorycznej i kompletu legalnych grafik.

---

## Stan projektu: teraz, uzgodnione dziaĹ‚ania i cel

| Obszar | Stan bieĹĽÄ…cy | Uzgodniony nastÄ™pny krok | Stan docelowy |
|---|---|---|---|
| Frontend | React SPA, artykuĹ‚y typowane, dashboardy i czytnik | UzupeĹ‚niaÄ‡ grafiki i zatwierdzaÄ‡ szkice | Stabilny magazyn z kontrolowanym cyklem publikacji |
| Backend | Express, Firestore/local JSON, Gmail SMTP, health check | WdroĹĽyÄ‡ i monitorowaÄ‡ Cloud Run oraz sekrety | Oddzielne, obserwowalne API z trwaĹ‚ym storage i kontrolÄ… naduĹĽyÄ‡ |
| Google Workspace w aplikacji | OAuth w przeglÄ…darce, Drive/Docs w Strefie TwĂłrcy | OgraniczyÄ‡ zakresy OAuth do minimum wymaganego przez realne operacje | Bezpieczny panel redakcyjny z granularnymi uprawnieniami i audytem |
| Automatyzacje | Dwa harmonogramy, internet research, Markdown, lint | UtrzymaÄ‡ pamiÄ™Ä‡, idempotencjÄ™ i readback Drive | Wieloetapowy pipeline research â†’ fact-check â†’ grafiki â†’ approval â†’ publikacja |
| Google Drive | Datowane foldery i surowe `.md`, osobny `TOP 3` | AktualizowaÄ‡ pliki bez duplikatĂłw | WspĂłlne archiwum redakcyjne ze stanami i manifestem przebiegu |
| Kontrola treĹ›ci | Wszystkie niezatwierdzone lub niekompletne materiaĹ‚y majÄ… `DRAFT` | Agent poprawnoĹ›ci zatwierdza fakty; generator dostarcza dwie grafiki | Tylko kompletne materiaĹ‚y `APPROVED` sÄ… widoczne jako opublikowane |

### Kryterium gotowoĹ›ci artykuĹ‚u

ArtykuĹ‚ moĹĽe przejĹ›Ä‡ z `DRAFT` do `APPROVED`, gdy jednoczeĹ›nie:

1. ĹşrĂłdĹ‚a sÄ… dostÄ™pne, bezpoĹ›rednie i potwierdzajÄ… kluczowe twierdzenia;
2. daty publikacji i zdarzenia zostaĹ‚y zweryfikowane;
3. agent odpowiedzialny za poprawnoĹ›Ä‡ treĹ›ci zostawiĹ‚ jednoznaczny wynik akceptacji;
4. istniejÄ… co najmniej dwie legalne grafiki w zadeklarowanych Ĺ›cieĹĽkach lokalnych;
5. placeholdery zostaĹ‚y zastÄ…pione wĹ‚aĹ›ciwymi mediami i tekstami alternatywnymi;
6. `npm run lint` oraz `npm run build` koĹ„czÄ… siÄ™ powodzeniem.

---

## Know-how: podĹ‚Ä…czenie backendu

### Jak backend dziaĹ‚a obecnie

`server.ts` Ĺ‚Ä…czy dwie role:

- w development uruchamia Express i Vite jako middleware pod jednym portem;
- w production obsĹ‚uguje API oraz statyczne pliki z `dist`.

PrzepĹ‚yw newslettera wyglÄ…da nastÄ™pujÄ…co:

```text
NewsletterForm â†’ POST /api/subscribe â†’ walidacja e-mail
                                      â†’ Firestore (production)
                                      â†’ subscriptions.json (development)
                                      â†’ Gmail SMTP (opcjonalnie)
```

### Konfiguracja lokalna

1. Skopiuj `.env.example` do `.env` i nie commituj sekretĂłw.
2. Pozostaw `USE_FIRESTORE` puste, jeĹ›li chcesz korzystaÄ‡ z `subscriptions.json`.
3. Ustaw `GMAIL_USER` i `GMAIL_APP_PASSWORD` tylko wtedy, gdy potrzebna jest wiadomoĹ›Ä‡ powitalna.
4. Uruchom `npm install`, nastÄ™pnie `npm run dev`.
5. SprawdĹş `http://localhost:3000/api/health`.
6. WyĹ›lij testowy zapis i potwierdĹş odpowiedĹş API oraz wpis w storage.

### Konfiguracja produkcyjna

1. UtwĂłrz projekt Google Cloud i Firestore w trybie Native.
2. Nadaj kontu usĹ‚ugi Cloud Run rolÄ™ `Cloud Datastore User`.
3. UmieĹ›Ä‡ dane Gmail wyĹ‚Ä…cznie w Secret Manager.
4. WdrĂłĹĽ backend do Cloud Run z `GOOGLE_CLOUD_PROJECT` i sekretami.
5. Ustaw publiczny URL usĹ‚ugi jako `VITE_API_BASE_URL` w GitHub Actions.
6. Przebuduj frontend i sprawdĹş `/api/health`, CORS oraz peĹ‚ny zapis newslettera.

### Ograniczenia obecnego backendu

- Endpoint nie ma jeszcze rate limitingu, CAPTCHA ani kolejki wysyĹ‚kowej.
- Gmail SMTP nadaje siÄ™ do maĹ‚ej skali, ale nie zastÄ™puje dostawcy transakcyjnego z obsĹ‚ugÄ… reputacji i bounce'Ăłw.
- Lokalny JSON jest mechanizmem deweloperskim, nie storage produkcyjnym.
- Brakuje centralnego monitoringu bĹ‚Ä™dĂłw, metryk i alarmĂłw.

### Docelowy backend

Docelowo API powinno mieÄ‡ walidacjÄ™ schematu, rate limiting, ochronÄ™ antybotowÄ…, kolejkÄ™ wiadomoĹ›ci, dedykowanego dostawcÄ™ e-mail, logi strukturalne, alerty i testy integracyjne. Operacje redakcyjne powinny byÄ‡ oddzielone od publicznego endpointu newslettera oraz chronione uwierzytelnieniem i rolami.

---

## Know-how: Google Drive â€” dwa niezaleĹĽne poĹ‚Ä…czenia

Projekt korzysta z Google Drive na dwa rĂłĹĽne sposoby. Nie naleĹĽy ich myliÄ‡.

### 1. Strefa TwĂłrcy w aplikacji

Frontend uĹĽywa Firebase Auth i Google OAuth. `firebaseAuth.ts` inicjalizuje provider, dodaje zakresy Drive i Docs, a token dostÄ™pu przechowuje wyĹ‚Ä…cznie w pamiÄ™ci procesu przeglÄ…darki. `WorkspacePage.tsx` wywoĹ‚uje oficjalne API Google bez poĹ›redniczÄ…cego backendu.

Procedura konfiguracji:

1. UtwĂłrz lub wybierz projekt Firebase/Google Cloud.
2. WĹ‚Ä…cz Firebase Authentication i provider Google.
3. WĹ‚Ä…cz Google Drive API oraz Google Docs API.
4. Skonfiguruj ekran zgody OAuth i dozwolone domeny.
5. UmieĹ›Ä‡ publicznÄ… konfiguracjÄ™ Firebase w `firebase-applet-config.json`; nie umieszczaj tam sekretu konta usĹ‚ugi.
6. Zaloguj siÄ™ w `/workspace`, potwierdĹş zakresy i wykonaj test listowania plikĂłw.
7. Przed kaĹĽdÄ… mutacjÄ… zachowaj potwierdzenie uĹĽytkownika.

### 2. Google Drive uĹĽywany przez automatyzacje Codex

Automatyzacje korzystajÄ… z podĹ‚Ä…czonego connectora Google Drive w Ĺ›rodowisku Codex, a nie z tokenu zapisowanego w aplikacji. Foldery docelowe sÄ… wskazane przez stabilne identyfikatory:

- folder gĹ‚Ăłwny: `1k_6odvzXd9xAs3lngICP-FMl43xuBccE`;
- folder pakietĂłw: `1hrZeNgh0D5k9joChMGnk_lnqejJr9A8K` (`TOP 3`).

Bezpieczny algorytm synchronizacji:

1. odczytaj pamiÄ™Ä‡ automatyzacji i ustal nazwÄ™ przebiegu;
2. znajdĹş folder o oczekiwanej nazwie lub utwĂłrz go pod wĹ‚aĹ›ciwym parent ID;
3. przed uploadem sprawdĹş, czy plik o tej nazwie juĹĽ istnieje;
4. nowy plik przeĹ›lij jako `text/markdown`, a istniejÄ…cy aktualizuj po ID;
5. po zapisie ponownie odczytaj folder;
6. porĂłwnaj liczbÄ™ i nazwy plikĂłw z katalogiem lokalnym;
7. zapisz rzeczywisty URL i wynik w `memory.md`.

### Zasada bezpieczeĹ„stwa Drive

Nie naleĹĽy usuwaÄ‡ ani przenosiÄ‡ plikĂłw na podstawie samej nazwy. Najpierw trzeba potwierdziÄ‡ ID pliku, aktualny parent ID i folder docelowy. Historyczne formaty powinny trafiÄ‡ do archiwum zamiast byÄ‡ bezpowrotnie kasowane.

---

## Know-how: automatyzacja procesu redakcyjnego

### Poziom obecny

```text
Harmonogram
  â†’ wyszukanie i weryfikacja ĹşrĂłdeĹ‚
  â†’ zapis Markdown w repozytorium i kopia w content/draft
  â†’ aktualizacja danych dashboardu
  â†’ synchronizacja surowych .md do Drive i folderu DRAFT
  â†’ import do bloga jako DRAFT
  â†’ dwa placeholdery grafik
  â†’ lint i raport przebiegu
```

Mechanizm dziaĹ‚a deterministycznie na poziomie struktury plikĂłw, ale zatwierdzenie merytoryczne i dostarczenie grafik pozostajÄ… etapami rÄ™cznymi lub realizowanymi przez osobnych agentĂłw.

### Poziom docelowy

```text
Research Agent
  â†’ Fact-check Agent (raport APPROVED/REJECTED)
  â†’ Editorial Agent (ujednolicenie tekstu i metadanych)
  â†’ Image Agent (minimum 2 grafiki + licencja + alt)
  â†’ Quality Gate (ĹşrĂłdĹ‚a, pliki, lint, build, linki)
  â†’ Publishing Agent (zmiana DRAFT â†’ APPROVED)
  â†’ Git/Drive/Deploy
  â†’ monitoring i moĹĽliwoĹ›Ä‡ wycofania publikacji
```

Docelowy proces powinien uĹĽywaÄ‡ manifestu dla kaĹĽdego artykuĹ‚u, np. `article.manifest.json`, zawierajÄ…cego statusy etapĂłw, identyfikatory ĹşrĂłdeĹ‚, Ĺ›cieĹĽki grafik, wynik fact-checku, datÄ™ akceptacji i wersjÄ™ opublikowanÄ…. DziÄ™ki temu status nie zaleĹĽy od interpretacji tekstu ani nazwy pliku.

### NajbliĹĽsze dziaĹ‚ania

1. DodaÄ‡ trwaĹ‚y manifest workflow i jednoznaczny podpis agenta zatwierdzajÄ…cego.
2. WprowadziÄ‡ automatycznÄ… kontrolÄ™ obecnoĹ›ci dwĂłch plikĂłw graficznych przed `APPROVED`.
3. ZastÄ™powaÄ‡ placeholdery po dostarczeniu obrazĂłw, zachowujÄ…c prompt jako historiÄ™ produkcyjnÄ….
4. UkryÄ‡ `DRAFT` przed publicznym buildem lub przenieĹ›Ä‡ je do chronionego podglÄ…du redakcyjnego.
5. DodaÄ‡ test martwych linkĂłw, walidacjÄ™ dat i raport rozbieĹĽnoĹ›ci ĹşrĂłdeĹ‚.
6. PoĹ‚Ä…czyÄ‡ zatwierdzony manifest z automatycznym commitem, wdroĹĽeniem i archiwizacjÄ… wersji na Drive.

---


## đź› ď¸Ź Stack Technologiczny

- **React 19** â€” nowoczesne, funkcyjne komponenty z hookami.
- **TypeScript** â€” silne, bezpieczne typowanie caĹ‚ego modelu danych.
- **Vite** â€” ultraszybkie Ĺ›rodowisko deweloperskie i optymalny proces budowania.
- **Tailwind CSS v4** â€” bĹ‚yskawiczna stylizacja za pomocÄ… klas narzÄ™dziowych i zdefiniowanego motywu graficznego.
- **React Router 6** â€” obsĹ‚uga Ĺ›cieĹĽek aplikacji (`react-router-dom`).
- **Lucide React** â€” kompletny zestaw spĂłjnych, wektorowych ikon interfejsu.

---

## âš™ď¸Ź Wymagania Systemowe

- **Node.js**: wersja 18.x lub nowsza (rekomendowana wersja LTS)
- **MenedĹĽer pakietĂłw**: npm (wersja 9.x lub nowsza)

---

## đź’» Instrukcja Uruchomienia i Rozwoju

### 1. Instalacja zaleĹĽnoĹ›ci
Przed pierwszym uruchomieniem projektu, pobierz i zainstaluj wymagane paczki:
```bash
npm install
```

### 2. Uruchomienie serwera deweloperskiego
Uruchom aplikacjÄ™ lokalnie z podglÄ…dem na ĹĽywo (serwer zostanie zbindowany na porcie `3000`):
```bash
npm run dev
```
Po uruchomieniu aplikacja bÄ™dzie dostÄ™pna pod adresem: `http://localhost:3000`.

### 3. Statyczna analiza kodu i sprawdzanie typĂłw
Uruchom kompilator TypeScript bez generowania plikĂłw wyjĹ›ciowych, aby upewniÄ‡ siÄ™, ĹĽe w projekcie nie wystÄ™pujÄ… bĹ‚Ä™dy typowania:
```bash
npm run lint
```

### 4. Build produkcyjny
Skompiluj i zoptymalizuj aplikacjÄ™ do wersji produkcyjnej. Wszystkie zminimalizowane pliki statyczne HTML, CSS i JS zostanÄ… wygenerowane w katalogu `dist/`:
```bash
npm run build
```

---

## đź“ Struktura Projektu

SzczegĂłĹ‚owy opis struktury katalogĂłw i plikĂłw znajduje siÄ™ w dedykowanej instrukcji architektonicznej [AGENTS.md](./AGENTS.md). 

NajwaĹĽniejsze lokalizacje danych:
- **Model danych artykuĹ‚u**: `src/types/article.ts`
- **Wpisy i treĹ›Ä‡ (baza danych bloga)**: `src/data/articles.ts`
- **Wektorowe ilustracje SVG**: `src/components/article/ArticleIllustration.tsx`

---

## đź“ť Jak DodaÄ‡ Nowy ArtykuĹ‚?

TreĹ›Ä‡ bloga jest caĹ‚kowicie oddzielona od kodu interfejsu i przechowywana w postaci ustrukturyzowanej bazy danych TypeScript w pliku `src/data/articles.ts`. 

Aby dodaÄ‡ artykuĹ‚, wystarczy wkleiÄ‡ nowy obiekt implementujÄ…cy interfejs `Article` na koĹ„cu tablicy `ARTICLES`. SzczegĂłĹ‚owy szablon i opis pĂłl znajdziesz w pliku [AGENTS.md](./AGENTS.md#4-dane-artykuĹ‚Ăłw-srcdataarticlests).

---

## đźŚ WdroĹĽenie na GitHub Pages

Projekt zostaĹ‚ specjalnie zoptymalizowany pod kÄ…tem wdroĹĽenia jako witryna statyczna na GitHub Pages:
1. **Brak bĹ‚Ä™dĂłw 404**: DziÄ™ki zastosowaniu `HashRouter` w `src/App.tsx`, bezpoĹ›rednie wejĹ›cie pod adresy takie jak `https://nazwa-uzytkownika.github.io/nazwa-repozytorium/#/articles/codex-jako-drugi-inzynier` dziaĹ‚a poprawnie i nie powoduje bĹ‚Ä™dĂłw po odĹ›wieĹĽeniu strony przez uĹĽytkownika.
2. **Konfiguracja Ĺ›cieĹĽki bazowej (base path)**: JeĹ›li Twoja witryna na GitHub Pages znajduje siÄ™ w podkatalogu (np. `https://nazwa-uzytkownika.github.io/nazwa-repozytorium/`), upewnij siÄ™, ĹĽe w pliku `vite.config.ts` ustawiono odpowiedniÄ… opcjÄ™ `base`:
   ```typescript
   export default defineConfig({
     base: '/nazwa-repozytorium/',
     // pozostaĹ‚a konfiguracja...
   })
   ```
3. **Automatyzacja wdroĹĽenia**: MoĹĽesz dodaÄ‡ pakiet `gh-pages` jako zaleĹĽnoĹ›Ä‡ deweloperskÄ… (`npm install -D gh-pages`), a nastÄ™pnie dodaÄ‡ skrypty do `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
   Wtedy publikacja sprowadza siÄ™ do wywoĹ‚ania jednej komendy: `npm run deploy`.

---

## đź“§ Konfiguracja Newslettera (Gmail SMTP)

Aplikacja posiada zaimplementowany, bezpieczny system zapisu na newsletter oparty o serwer **Express.js**. Adresy subskrybentĂłw sÄ… domyĹ›lnie zapisywane w lokalnym pliku kopii zapasowej `subscriptions.json` w gĹ‚Ăłwnym katalogu projektu.

Aby aktywowaÄ‡ automatycznÄ… wysyĹ‚kÄ™ e-maili powitalnych za pomocÄ… serwera pocztowego **Gmail**, naleĹĽy zadeklarowaÄ‡ w ustawieniach Ĺ›rodowiskowych lub pliku `.env` nastÄ™pujÄ…ce klucze:

- `GMAIL_USER` â€” TwĂłj adres e-mail Gmail (np. `twoj-login@gmail.com`).
- `GMAIL_APP_PASSWORD` â€” HasĹ‚o aplikacji wygenerowane na koncie Google (Ustawienia konta -> BezpieczeĹ„stwo -> Weryfikacja dwuetapowa -> HasĹ‚a do aplikacji).

JeĹ›li zmienne te nie sÄ… ustawione, zapis do newslettera nadal powiedzie siÄ™ (e-mail zostanie zabezpieczony w `subscriptions.json`), a interfejs poinformuje o zapisie w bazie lokalnej.

---

## âď¸Ź Integracja Google Workspace (Google Drive & Google Docs)

Projekt posiada dedykowanÄ… **StrefÄ™ TwĂłrcy** (`/workspace`), ktĂłra umoĹĽliwia bezpoĹ›redniÄ… integracjÄ™ z chmurÄ… Google:
1. **Bezpieczne Logowanie Google OAuth**: UĹĽytkownik loguje siÄ™ przez dedykowany, bezpieczny popup Firebase Google Auth. Token dostÄ™pu do API jest bezpiecznie przechowywany wyĹ‚Ä…cznie w pamiÄ™ci operacyjnej (In-Memory Access Token), co uniemoĹĽliwia wyciek wraĹĽliwych danych przez pliki cookie czy localStorage.
2. **Eksplorator PlikĂłw Google Drive**: UmoĹĽliwia wyszukiwanie w czasie rzeczywistym oraz listowanie i filtrowanie plikĂłw w Twojej chmurze (w tym dedykowane filtrowanie plikĂłw Google Docs).
3. **Eksport SzkicĂłw do Google Docs**: UĹĽytkownik moĹĽe wybraÄ‡ profesjonalny szablon (np. zarys strategii monetyzacji lub inĹĽynierii promptĂłw), spersonalizowaÄ‡ nazwÄ™ i jednym klikniÄ™ciem wyeksportowaÄ‡ sformatowany szkic bezpoĹ›rednio do nowego dokumentu Google Docs na swoim dysku.
4. **Wbudowany Importer TreĹ›ci**: MoĹĽliwoĹ›Ä‡ pobrania i zdekodowania struktury dowolnego pliku Google Doc za pomocÄ… oficjalnego **Google Docs API v1** i wyĹ›wietlenia jego zawartoĹ›ci w eleganckim, szeryfowym podglÄ…dzie bezpoĹ›rednio w aplikacji.

---

## đźŽ¨ Unikalna Identyfikacja Wizualna & Premium Feel

Projekt wyrĂłĹĽnia siÄ™ spĂłjnÄ…, starannie zaprojektowanÄ… identyfikacjÄ… wizualnÄ…:
1. **Sygnet Autorski (`KMSygnet`)**: ZĹ‚oty, geometryczny monogram â€žKMâ€ť w okrÄ…gĹ‚ej oprawie zintegrowany w nagĹ‚Ăłwku i stopce aplikacji, a takĹĽe wdroĹĽony jako dynamiczny, responsywny favicon SVG w pliku `index.html`.
2. **AI Content Dashboard**: Panel na stronie gĹ‚Ăłwnej prezentujÄ…cy wyselekcjonowane i dynamiczne treĹ›ci w minimalistycznym i czytelnym ukĹ‚adzie 3 kolumn:
   - *Top Newsy Ĺšwiata AI* â€” Kluczowe wydarzenia technologiczne.
   - *Kryminalne Wykorzystania AI* â€” Opisy niebezpiecznych incydentĂłw i mechanizmĂłw oszustw.
   - *PomysĹ‚y na Zarabianie* â€” Praktyczne i konkretne sposoby na monetyzacjÄ™ zaawansowanych modeli.
3. **Efekt Hover Lift**: Wszystkie karty w sekcji Daily Briefing oraz AI Content Dashboard posiadajÄ… pĹ‚ynne animacje uniesienia (`hover-lift`) i przejĹ›cia cieni, nadajÄ…ce caĹ‚oĹ›ci charakter luksusowego, interaktywnego magazynu drukowanego.

---

## đź¤– Filozofia AI-Native Creator (Bez programowania od zera)

Ten projekt powstaĹ‚ w peĹ‚ni w oparciu o filozofiÄ™ **AI-Native Product Orchestration**. TreĹ›Ä‡ bloga oraz architektura systemu zostaĹ‚y zaprojektowane tak, by pokazaÄ‡, ĹĽe **nie musisz byÄ‡ tradycyjnym, manualnym programistÄ…, aby tworzyÄ‡ i wdraĹĽaÄ‡ zaawansowane technologicznie, bezpieczne, produkcyjne aplikacje full-stack**. 

Kluczem do sukcesu jest:
- UmiejÄ™tna inĹĽynieria promptĂłw na poziomie repozytorium.
- Synergiczne dzielenie rĂłl pomiÄ™dzy wyspecjalizowanych asystentĂłw (AI Studio jako globalny architekt, Claude jako projektant struktur danych, Codex jako precyzyjny realizator, Trae jako lokalny esteta UI).
- Automatyczna weryfikacja kodu (kompilator, linter) peĹ‚niÄ…ca rolÄ™ tarczy ochronnej dla kaĹĽdego twĂłrcy.

---

## đź¤– Dalsza Praca w Ĺšrodowisku Codex

Repozytorium jest w peĹ‚ni przygotowane do natychmiastowej, zautomatyzowanej edycji przez asystentĂłw programowania AI. JeĹ›li rozwijasz ten projekt w Codex:
1. Codex przeczyta wytyczne z pliku [AGENTS.md](./AGENTS.md) i automatycznie zrozumie caĹ‚Ä… architekturÄ™ (w tym nowy model full-stack Express + Vite).
2. Codex Ĺ‚atwo odnajdzie i zmodyfikuje bazÄ™ danych w `src/data/articles.ts` lub endpointy w `server.ts` bez ryzyka uszkodzenia interfejsu.
3. System kompilacji i sprawdzania typĂłw gwarantuje, ĹĽe kaĹĽda zmiana zostanie zweryfikowana przed wdroĹĽeniem.

---

## Produkcyjne wdroĹĽenie: GitHub Pages + Cloud Run

Repozytorium zawiera workflow `.github/workflows/deploy-pages.yml`. Po kaĹĽdym pushu do `main` wykonuje on lint, buduje frontend z bazowÄ… Ĺ›cieĹĽkÄ… `/Blog/` i publikuje katalog `dist` w GitHub Pages.

1. W repozytorium GitHub otwĂłrz **Settings â†’ Pages** i wybierz **Source: GitHub Actions**.
2. Po wdroĹĽeniu backendu dodaj w **Settings â†’ Secrets and variables â†’ Actions** sekret `VITE_API_BASE_URL`. Jego wartoĹ›ciÄ… ma byÄ‡ publiczny adres Cloud Run bez koĹ„cowego ukoĹ›nika.
3. Uruchom workflow rÄ™cznie w zakĹ‚adce **Actions** albo wykonaj push do `main`.

Frontend bÄ™dzie dostÄ™pny pod `https://kamillimak.github.io/Blog/`.

### Backend newslettera na Cloud Run

Backend uĹĽywa Firestore w produkcji i lokalnego `subscriptions.json` podczas pracy deweloperskiej. Kontener jest opisany w `Dockerfile` i respektuje zmiennÄ… `PORT` ustawianÄ… przez Cloud Run.

1. W projekcie Google Cloud `gen-lang-client-0172881890` wĹ‚Ä…cz Cloud Run, Cloud Build, Artifact Registry i Firestore.
2. UtwĂłrz bazÄ™ Firestore w trybie Native. Konto usĹ‚ugi Cloud Run musi mieÄ‡ rolÄ™ **Cloud Datastore User**.
3. W Secret Manager utwĂłrz opcjonalne sekrety `GMAIL_USER` i `GMAIL_APP_PASSWORD`. Bez nich adresy bÄ™dÄ… zapisywane, lecz wiadomoĹ›Ä‡ powitalna nie zostanie wysĹ‚ana.
4. WdrĂłĹĽ usĹ‚ugÄ™ z katalogu repozytorium:

```bash
gcloud auth login
gcloud config set project gen-lang-client-0172881890
gcloud run deploy blog-api --source . --region europe-central2 --allow-unauthenticated --set-env-vars GOOGLE_CLOUD_PROJECT=gen-lang-client-0172881890 --set-secrets GMAIL_USER=GMAIL_USER:latest,GMAIL_APP_PASSWORD=GMAIL_APP_PASSWORD:latest
```

5. Skopiuj URL zwrĂłcony przez Cloud Run do sekretu GitHub `VITE_API_BASE_URL`, a nastÄ™pnie ponownie uruchom workflow Pages.

Endpoint kontrolny backendu znajduje siÄ™ pod `/api/health`. CORS dopuszcza GitHub Pages oraz lokalne adresy deweloperskie.

## Daily Digest Newsletter

Backend ma dwa tryby pracy newslettera:

1. `POST /api/subscribe` zapisuje adres e-mail do Firestore w produkcji albo do `subscriptions.json` lokalnie. Gmail SMTP moze wyslac wiadomosc powitalna, jesli ustawiono `GMAIL_USER` i `GMAIL_APP_PASSWORD`.
2. `POST /api/newsletter/daily-digest` wysyla raz dziennie digest nowosci z ostatnich 24h. Endpoint pobiera subskrybentow, zbiera nowe artykuly oraz materialy z `content/daily-news` i `content/top-3`, a nastepnie wysyla mail przez Gmail SMTP.

Endpoint dziennego digestu w produkcji wymaga sekretu:

```bash
Authorization: Bearer <CRON_SECRET>
```

albo:

```bash
x-cron-secret: <CRON_SECRET>
```

Test bez wysylki:

```bash
curl -X POST "https://<cloud-run-url>/api/newsletter/daily-digest?dryRun=1" \
  -H "Authorization: Bearer <CRON_SECRET>"
```

Docelowy harmonogram: Cloud Scheduler -> Cloud Run -> Firestore + Gmail SMTP. Cloud Scheduler wywoluje endpoint raz dziennie, Cloud Run wykonuje kod backendu, Firestore przechowuje subskrybentow, a Gmail SMTP odpowiada za sama wysylke.
