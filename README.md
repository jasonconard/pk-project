# Pk Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Release (GitHub Pages)

The game is published at https://jasonconard.github.io/pk-project/ (installable PWA) only when a version tag is
pushed. The version is shown in the game (hidden menu of the temperature / fps tile, top right).

1. Raise the version in `package.json` (e.g. `npm version patch --no-git-tag-version`), commit it.
2. Tag and push: `git tag v0.0.2 && git push origin main v0.0.2`.

The deploy workflow (`.github/workflows/main.yml`) checks that the tag matches the `package.json` version, builds
the game and publishes it on the `gh-pages` branch. It can also be started by hand from the Actions tab.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
