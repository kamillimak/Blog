# Prompt dla AI Studio: generator grafik do szkiców bloga

Stwórz aplikację webową do obsługi manifestu JSON z kolejką grafik dla bloga "AI w praktyce". Aplikacja ma przyjmować jeden lub wiele plików JSON o strukturze takiej jak `draft-image-generation-queue-2026-07-10.json`.

## Cel aplikacji

Użytkownik wrzuca plik lub kilka plików z instrukcjami generowania grafik. Aplikacja odczytuje pole `tasks`, dzieli zadania na paczki po `batchSize` albo domyślnie po 10 obrazów, pokazuje przejrzystą listę zadań i pozwala wygenerować lub wyeksportować instrukcje dla każdej paczki.

## Wymagania funkcjonalne

1. Obsłuż upload jednego lub wielu plików `.json`.
2. Zwaliduj strukturę: wymagane są `tasks[]`, `taskId`, `article.title`, `article.legacySlug`, `article.sourceMarkdownPath`, `image.fileName`, `image.targetPath`, `prompt`.
3. Scal zadania z wielu plików, usuń duplikaty po `taskId`, zachowaj kolejność według `batchNumber`, a gdy go brakuje według kolejności w pliku.
4. Podziel zadania na paczki po 10 grafik, chyba że manifest ma inne `batchSize`.
5. Dla każdej paczki pokaż: numer paczki, liczbę grafik, listę artykułów, nazwy plików docelowych i ścieżki zapisu.
6. Dla każdego zadania pokaż kartę z tytułem artykułu, statusem, kategorią, źródłowym plikiem markdown, nazwą pliku obrazu, ścieżką docelową i pełnym promptem.
7. Dodaj przyciski: Kopiuj prompt zadania, Kopiuj prompty paczki, Pobierz paczkę jako JSON, Pobierz paczkę jako Markdown.
8. Dodaj stan realizacji dla każdego zadania: `pending`, `generated`, `accepted`, `needs_fix`. Stan trzymaj lokalnie w przeglądarce w `localStorage`.
9. Pozwól filtrować po statusie, kategorii, paczce, artykule i nazwie pliku.
10. Na końcu generuj raport: ile grafik gotowych, ile zaakceptowanych, ile wymaga poprawki, oraz lista plików do zapisania w repozytorium.

## Wymagania dotyczące integracji z generowaniem obrazów

Jeżeli środowisko AI Studio ma dostęp do modelu generowania obrazów, dodaj opcjonalny przycisk "Generuj obraz" przy zadaniu oraz "Generuj paczkę" przy paczce. Każdy obraz musi użyć dokładnie pola `prompt`. Po wygenerowaniu aplikacja ma wymusić pobranie pliku pod nazwą z `image.fileName`. Jeżeli bezpośredni zapis do ścieżki `image.targetPath` nie jest możliwy w przeglądarce, pokaż tę ścieżkę jako instrukcję zapisu dla użytkownika.

## Wymagania UI

Zbuduj praktyczny dashboard roboczy, nie landing page. Layout ma być gęsty, czytelny i redakcyjny: pasek uploadu u góry, pod nim statystyki, po lewej filtry i lista paczek, po prawej zadania z aktywnej paczki. Użyj responsywnego układu bez poziomego scrolla na mobile.

## Walidacja

Przed zakończeniem implementacji dodaj przykładowy parser manifestu, obsługę błędów JSON, komunikaty walidacyjne i test ręczny na przykładowym obiekcie zawierającym minimum 11 zadań, żeby potwierdzić podział na dwie paczki.
