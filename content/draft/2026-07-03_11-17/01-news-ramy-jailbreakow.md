# Anthropic proponuje wspólną skalę powagi jailbreaków AI

**Lead:** 2 lipca Anthropic opublikował robocze ramy oceny jailbreaków oraz dokładniejszy opis zabezpieczeń cybernetycznych modelu Fable 5. Firma chce ujednolicić język używany przez laboratoria, badaczy i administrację.

## Rozwinięcie

### Fakty

Ramy rozróżniają obejścia drobne, wąskie szkodliwe i uniwersalne. Anthropic opisuje też cztery klasy zapytań cyberbezpieczeństwa: zabronione, wysokiego ryzyka podwójnego zastosowania, niskiego ryzyka oraz bezpieczne. To propozycja branżowa, a nie obowiązujący standard. Towarzyszy jej program zgłoszeń dla badaczy przez HackerOne.

### Wnioski redakcyjne

Wspólna skala może ułatwić priorytetyzację poprawek, ale jej wiarygodność zależy od niezależnej walidacji i publikowania danych o fałszywych alarmach. Deklaracja producenta nie zastępuje testów konkretnego wdrożenia.

## Znaczenie

Zespoły korzystające z agentów AI w kodzie powinny oceniać nie tylko jakość odpowiedzi, lecz także możliwość obchodzenia reguł przez treść z repozytorium, stron internetowych i dokumentów.

## Praktyczny wniosek

Dodaj do testów trzy klasy prób: nieszkodliwe polecenia graniczne, niedozwolone działania oraz prompt injection z zewnętrznego dokumentu. Rejestruj blokady i przepuszczenia, nie tylko końcową odpowiedź.

**Data aktualności:** 2026-07-02

## Źródła

- [Anthropic — szczegóły zabezpieczeń i ram jailbreaków](https://www.anthropic.com/news/fable-safeguards-jailbreak-framework)
- [Anthropic — kontekst ponownego wdrożenia Fable 5](https://www.anthropic.com/news/redeploying-fable-5)

