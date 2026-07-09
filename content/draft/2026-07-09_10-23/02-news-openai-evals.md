# OpenAI wycofuje rekomendację SWE-Bench Pro po audycie jakości benchmarku

**Status:** DRAFT  
**Data aktualności:** 2026-07-08

## Lead

OpenAI opublikowało 8 lipca 2026 r. analizę jakości benchmarku SWE-Bench Pro i oszacowało, że około 30% zadań może być wadliwych. To ważny news dla wszystkich, którzy oceniają modele AI przez ranking, a nie przez realne zadania.

## Rozwinięcie

**Fakty:** Według OpenAI audyt wykazał problemy w znaczącej części publicznego splitu SWE-Bench Pro: zbyt restrykcyjne testy, niedookreślone prompty, niskie pokrycie testami i mylące treści zadań. Pipeline analityczny wskazał 200 wadliwych zadań, a kampania ludzkiej anotacji 249. OpenAI wycofało wcześniejszą rekomendację korzystania z SWE-Bench Pro jako zaufanego benchmarku.

**Wniosek redakcyjny:** ranking modelu może być mniej wiarygodny niż dobrze przygotowany zestaw testów organizacji. W praktyce oznacza to, że firmy powinny mierzyć modele na własnych przypadkach, z kontrolą jakości danych testowych.

## Znaczenie

Wraz z rosnącą skutecznością agentów rośnie ryzyko, że benchmark mierzy błędy datasetu, a nie zdolność modelu. To ma znaczenie dla zakupów narzędzi, bezpieczeństwa wdrożeń i decyzji, czy model może dostać większą autonomię.

## Praktyczny wniosek

Zbuduj mały, jawny benchmark wewnętrzny: 20-50 prawdziwych zadań, poprawne odpowiedzi, kryteria akceptacji, przypadki brzegowe i regularny audyt, czy test nadal mierzy to, co powinien.

## Źródła

- [OpenAI: Separating signal from noise in coding evaluations](https://openai.com/index/separating-signal-from-noise-coding-evaluations/)
- [OpenAI News: publikacja z 8 lipca 2026](https://openai.com/news/)
- [SWE-Bench Pro](https://scale.com/leaderboard/swe-bench-pro)
