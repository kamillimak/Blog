# Usługa przeglądu bezpieczeństwa kodu wspieranego agentami AI

**Status:** DRAFT  
**Data aktualności:** 2026-07-06

## Lead

Anthropic opisał 6 lipca 2026 r., jak rząd Alberty użył Claude Code do przeglądu 466 milionów linii kodu w 20 godzin i do wsparcia remediacji luk. Dla mniejszych organizacji podobny efekt można przekuć w usługę audytu bezpieczeństwa.

## Rozwinięcie

**Fakty:** Według case study Anthropic zespół w Albercie uruchomił około 50 agentów równolegle, aby skanować repozytoria, cytować konkretne pliki i linie oraz generować poprawki i testy do weryfikacji przez inżynierów. Każda poprawka przed wdrożeniem miała przechodzić przegląd zespołu.

**Wniosek redakcyjny:** najważniejszy wzorzec to nie "agent sam naprawia produkcję", tylko "agent przyspiesza wykrycie i przygotowanie poprawki, człowiek zatwierdza". Taką usługę da się sprzedawać firmom, które mają dług technologiczny i brak czasu na ręczny przegląd.

## Znaczenie

AI obniża koszt pierwszego przejścia przez duży kod, ale nie znosi potrzeby kontroli jakości. Profesjonalna oferta musi obejmować zakres, priorytety, testy, ograniczenia modelu i raport śladów audytowych.

## Praktyczny wniosek

Zacznij od pakietu "security review backlog": skan repozytoriów, klasyfikacja luk, propozycje poprawek, testy reprodukujące i lista zmian do ręcznego zatwierdzenia przez właściciela kodu.

## Źródła

- [Anthropic: Government of Alberta uses Claude to find and fix cybersecurity vulnerabilities](https://www.anthropic.com/news/alberta-government-claude-cybersecurity)
- [Anthropic Newsroom: case study z 6 lipca 2026](https://www.anthropic.com/news)
- [NIST: AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
