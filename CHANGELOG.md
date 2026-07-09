# Changelog

Wszystkie istotne zmiany w projekcie „Warsztat AI Coding” są dokumentowane w tym pliku.

## 2026-07-09 — SEO, konwersja i zaufanie

- Zmieniono główny tytuł SEO na: `Blog technologiczny — Codex · Trae · Claude · AI Studio`.
- Uzupełniono meta description, Open Graph, Twitter Card, canonical URL, `robots.txt`, `sitemap.xml`, `site.webmanifest` oraz `llms.txt`.
- Dodano obsługę Google Analytics 4 przez zmienną `VITE_GA_MEASUREMENT_ID`.
- Dodano CTA `Kontakt` w nawigacji i hero.
- Dodano sekcję „Dla kogo jest ten blog”.
- Dodano stronę polityki prywatności i linki zaufania w stopce.
- Dodano przełącznik jasny/ciemny motyw z zapisem wyboru w `localStorage`.

## 2026-07-09 — Newsroom i slider video

- Połączono newsy z Polski, świata, TOP 3 oraz AI briefing w jeden newsroom.
- Dodano czytelne etykiety `Tech PL`, `Tech World` oraz podkategorie TOP 3.
- Zmieniono układ newsów na jeden element w wierszu, aby poprawić czytelność treści.
- Ukryto szkice i sekcje robocze z publicznego widoku.
- Dodano grafiki i filmiki do kart newsowych oraz odtwarzanie video na hover i po zatrzymaniu scrolla.
- Slider rozbudowano do 6 pozycji i podpięto 10 lokalnych plików video.
- Poprawiono widok mobile slidera, przycisków i ikon źródeł.

## 2026-07-08 — Automatyzacje redakcyjne

- Zweryfikowano pipeline dziennego briefingu AI/IT zapisujący Markdown w `content/daily-news`.
- Zweryfikowano pipeline TOP 3 zapisujący materiały w `content/top-3`.
- Utrzymano rozdzielenie archiwum automatyzacji od publicznych artykułów bloga.
- Zachowano zasadę, że materiały bez akceptacji merytorycznej i kompletu grafik pozostają jako `DRAFT`.

## 2026-07-07 — Full-stack newsletter i Strefa Twórcy

- Dodano backend Express z endpointem `/api/subscribe`.
- Dodano lokalny fallback zapisu subskrypcji do `subscriptions.json`.
- Dodano obsługę Gmail SMTP przez `GMAIL_USER` i `GMAIL_APP_PASSWORD`.
- Dodano komponent `NewsletterForm`.
- Dodano Strefę Twórcy z integracją Google Drive i Google Docs.

## 2026-07-06 — Fundament bloga

- Zbudowano statyczne SPA na React 19, TypeScript, Vite i Tailwind CSS v4.
- Wdrożono `HashRouter` pod stabilne działanie na GitHub Pages.
- Oddzielono dane artykułów od layoutu w `src/data/articles.ts`.
- Dodano karty artykułów, stronę szczegółów, spis treści i pasek postępu czytania.
- Ustalono strukturę projektu oraz instrukcje pracy agentów AI w `AGENTS.md`.
