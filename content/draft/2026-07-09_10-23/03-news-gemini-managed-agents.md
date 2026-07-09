# Google rozszerza Managed Agents w Gemini API o zadania w tle i zdalne MCP

**Status:** DRAFT  
**Data aktualności:** 2026-07-07

## Lead

Google ogłosiło 7 lipca 2026 r. nowe możliwości Managed Agents w Gemini API: wykonywanie zadań w tle, integrację ze zdalnymi serwerami MCP, własne funkcje i odświeżanie poświadczeń między interakcjami.

## Rozwinięcie

**Fakty:** Google opisuje Managed Agents jako warstwę, w której jeden endpoint obsługuje rozumowanie, wykonywanie kodu, instalację pakietów, pracę na plikach i dostęp do informacji webowych w izolowanym sandboxie. Nowe tło asynchroniczne pozwala uruchamiać długie zadania bez trzymania połączenia HTTP, a remote MCP ma ułatwić dostęp do prywatnych danych i narzędzi bez własnych proxy.

**Wniosek redakcyjny:** to kolejny dowód, że platformy AI przesuwają się z modelu "wyślij prompt" do modelu "zarządzaj pracującym agentem". Dla zespołów produktowych kluczowe będą logi, uprawnienia, odtwarzalność i możliwość przerwania zadania.

## Znaczenie

Agent, który działa w tle i łączy się z narzędziami, może realizować realne procesy biznesowe. Jednocześnie zwiększa się odpowiedzialność za bezpieczeństwo poświadczeń, zakres dostępu i kontrolę człowieka.

## Praktyczny wniosek

Projektując agenta, zapisz nie tylko prompt, ale cały kontrakt procesu: dane wejściowe, narzędzia, uprawnienia, warunek stopu, log audytowy i osobę zatwierdzającą wynik.

## Źródła

- [Google Blog: Expanding Managed Agents in Gemini API](https://blog.google/innovation-and-ai/technology/developers-tools/expanding-managed-agents-gemini-api/)
- [Google Blog: Introducing Managed Agents in Gemini API](https://blog.google/innovation-and-ai/technology/developers-tools/managed-agents-gemini-api/)
- [Google AI for Developers: Gemini API](https://ai.google.dev/)
