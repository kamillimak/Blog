# Google Antigravity staje się kluczowym asystentem w ekosystemie deweloperskim Google

**Status:** DRAFT  
**Data aktualności:** 2026-07-17

## Lead

Google oficjalnie zaprezentowało nową generację asystenta Antygravity (AGY), integrującą CLI, samodzielne IDE oraz Desktop Canvas. Narzędzie redefiniuje pojęcie pracy AI bezpośrednio w repozytorium z pełnym kontekstem projektu.

## Rozwinięcie

**Fakty:** Antygravity (AGY) to ekosystem składający się z CLI (`agy`), dedykowanego środowiska IDE oraz aplikacji Desktop 2.0 z panelem HTML (Aux Pane) do zarządzania subagentami i zadaniami. Google otworzyło oficjalne API dla deweloperów oraz SDK w Pythonie, pozwalające leasingować agentów i tworzyć niestandardowe narzędzia (custom tools). Antygravity obsługuje Model Context Protocol (MCP), co pozwala na bezpośrednie łączenie modeli z bazami danych i lokalnymi narzędziami bez dodatkowych warstw proxy.

**Wniosek redakcyjny:** Antygravity to próba Google wdrożenia w pełni agentowej platformy programistycznej, która zastępuje luźne wtyczki do edytorów spójnym, dedykowanym środowiskiem zorientowanym na współpracę.

## Znaczenie

Przejście na zintegrowane środowisko AI-first eliminuje przełączanie kontekstu i pozwala agentowi na bezpieczniejsze wykonywanie wieloetapowych zadań, takich jak testowanie czy wdrożenia chmurowe.

## Praktyczny wniosek

Zainstaluj CLI `agy` i przetestuj logowanie oraz pierwszy onboarding w swoim repozytorium. Zwróć szczególną uwagę na pliki reguł i instrukcji agentów, które pozwalają dostosować asystenta pod Twoje standardy.

## Źródła

- [Google Antigravity Site](https://antigravity.google/docs)
- [Antigravity SDK Python](https://github.com/google-antigravity/antigravity-sdk-python)
