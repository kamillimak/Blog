# Pierwsze kroki z AI: testuj model na własnych przykładach

**Status:** DRAFT  
**Data aktualności:** 2026-07-08

## Lead

Demo na jednym efektownym promptcie nie mówi, czy narzędzie nadaje się do codziennego procesu. Najprostsza ewaluacja zaczyna się od małego zestawu prawdziwych zadań i jawnych kryteriów zaliczenia.

## Rozwinięcie

**Fakty:** OpenAI udostępnia Evals do uruchamiania zestawów prób i graderów, a NIST wskazuje testowanie, ewaluację, weryfikację i walidację jako element operacyjnego zarządzania ryzykiem. Zestaw testowy powinien obejmować typowe zadania, trudne wyjątki i przypadki, w których odpowiedź musi zostać odrzucona.

**Wniosek redakcyjny:** dla małej firmy wystarczy na start arkusz z 20–30 przykładami, oczekiwanym wynikiem, kryteriami jakości i kosztem korekty przez człowieka.

## Znaczenie

Porównanie modeli według tej samej miary jest bardziej użyteczne niż ranking oparty na marketingu albo pojedynczej odpowiedzi.

## Praktyczny wniosek

Zbuduj wersję 1.0 testu, zapisz wyniki bazowe i powtarzaj go po zmianie modelu, promptu, narzędzia lub źródeł danych.

## Źródła

- [OpenAI API: Evals](https://platform.openai.com/docs/api-reference/evals)
- [NIST AI Resource Center](https://airc.nist.gov/)
- [NIST: profil generatywnej AI](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)
