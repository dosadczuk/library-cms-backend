# LibraryCMS

[Nest](https://github.com/nestjs/nest) framework with TypeScript.

## Wymagania

* Node.js
* NPM

Informacje o wersjach dostępne w _package.json_.

## Instalacja

1. Klonujemy repozytorium na swój komputer
2. Przechodzimy do repozytorium i instalujemy zależności:
   ```shell
   npm install
   ```
3. Kopiujemy plik .env.dist i zapisujemy pod nazwą .env
    1. można użyć przykładowych wartości lub wpisać własne
4. Wykorzystując Docker, budujemy i uruchamiamy aplikację:
   ```shell
   npm docker:build
   ```
5. Uruchamiamy migrację bazy danych:
   ```shell
   npm run migration:run
   ```
6. Zasilamy bazę danych przykładowymi danymi:
   ```shell
   npm run seeder:run
   ```
