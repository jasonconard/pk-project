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

## Android app (APK)

The same tag also builds the Android app (Capacitor 8, `android/`) and attaches `pk-project-vX.Y.Z.apk` to the
GitHub release of the tag. Compared to the browser, the app keeps the screen at its highest refresh rate, awake,
in full screen, and shows up in the phone's game tools.

- Local build: `npm run android-build` (game built without the service worker, copied into `android/`), then
  `cd android && ./gradlew assembleRelease` (JDK 21) or `npx cap open android`.
- Version: `versionName` / `versionCode` are read from `package.json`.
- Signing: an update installs over the previous version only if signed with the same key. The key is made once:
  `keytool -genkeypair -v -keystore pk-release.jks -alias pk -keyalg RSA -keysize 2048 -validity 10000`,
  kept safe (outside the repo), and given to the workflow as repository secrets: `PK_KEYSTORE_BASE64`
  (`base64 -i pk-release.jks | pbcopy`), `PK_KEYSTORE_PASSWORD`, `PK_KEY_ALIAS`, `PK_KEY_PASSWORD`.
  Without them, a local build is signed with the debug key.
- Updates: at launch, the app reads the latest GitHub release (`core/update-prompt`). If its tag is newer than the
  app version, it offers to download the APK; Android then installs it over the current version.

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
