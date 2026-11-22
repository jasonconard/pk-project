# pk-project

3D pixel-art game (Three.js) that is becoming a **game engine** for a Persona-like game: daily life in a town by
day, dungeons + Grandia-style combat by night. Every feature should be an editor / data-driven tool so the game is
built without coding. Direction, ordered tool roadmap and statuses: `docs/idees.md` (keep statuses there).
Mobile-first (portrait + landscape), also desktop. Shipped as a PWA (GitHub Pages) and an Android APK (Capacitor 8).

## Stack and commands

- Angular 22 standalone, zoneless, signals (`signal`/`computed`/`input()`/`viewChild`), `inject()`; Three.js 0.187;
  TypeScript 6. Router uses hash URLs (`/#/modeles`, `/#/musique`).
- `npm start` → dev server on port 7777 (`--host 0.0.0.0`, reachable from the phone). `npx ng serve` → 4200.
- Lint and format: `npm run lint` / `npm run lint:fix` (ESLint + Prettier, same rules as self-checkout-v2: double
  quotes, 80 columns, one HTML attribute per line, unicorn rules, no nested ternaries). `src/assets/` is left as the
  editors export it. Run `lint:fix` before committing.
- Check a change compiles: `npx ng build --configuration development`; before a release also `npx ng build` (the
  production build checks the style budgets: 8 kB warning, 12 kB error per component). **No unit tests** (no `.spec.ts`): verify in
  a browser (headless Chrome via a small CDP script in the scratchpad is more reliable than pen.dev browser nodes
  for multi-step tests).
- `npm run android-build` (native), `scripts/native-fingerprint.mjs` decides live update vs new APK (see README).
- Release: `/release` skill (`.claude/skills/release/`). Deploy = pushing tag `vX.Y.Z` (`.github/workflows/main.yml`).

## Map of the code

- `src/app/app.routes.ts`: `''` game (applies browser-saved models first), `modeles`, `musique`.
- `core/`: app-wide UI and input. `shared/local-store.ts` (the browser's storage, never throwing: `readJson`, `writeJson`,
  `cachedFromStorage`… use it rather than `localStorage`), `text.ts` (`nameKey`, `searchKey` without accents), `omit.ts`. `shared/service/`: `core.service` (fullscreen…), `escape.service` (Escape /
  browser back / Android back close the last opened layer — register every closable layer there), `key`, `touch`,
  `gamepad`. `shared/app-visibility.ts` (`setGameCovered`/`isGameCovered`/`isGameAsleep`: game loops, sounds and
  input listeners must respect it). `stick`, `touch-pad`, `message`, `update-prompt` (GitHub release check, live update).
- `modules/game/`: `game.component` (main view, game mode / edit mode, editor panels opened over the game via
  `editorPanel` + `@defer`). UI pieces: `editor-bar` (edit UI; `layout` signal, `editor-bar.wide.scss` for
  landscape/desktop, `editor-bar.selection.scss` the selected object's sheet), `game-menu`, `map-controls`, `map-manager`, `weather-panel`, `weather-catalog`,
  `release-notes`, `game-saves` (saved games dialog), `variables-test` (change the variables' values while playing),
  `teleport`, `event-editor` (an object's event window: trigger, conditions, the tree of actions and branches;
  `event-conditions/` and `event-action/` (one action's fields) components, `event-editor-data.ts` (`EventEditorData`,
  provided by the window: variables and database read once; field helpers), `_fields.scss` the shared fields (global,
  in `styles.scss`)); small windows over the game share `shared/_dialog.scss`.
  - `shared/services/`: `game.service` (settings, music, reload of models), `map-editor.service` (map editor logic: input, selection, objects, chunks; `map-editor/`: `editor-grid`
    (cells grid), `edit-history` (undo / redo), `editor-markers` (chunk outlines, arrival point), `ground-painter`
    (terrain, height, stairs, bucket strokes)),
    `map-storage` (maps in the browser), `game-map`, `scene`, `basic-mesh` (`makeModel`), `material`, `player`,
    `event` (`actionAt`, `armed`: enter / automatic events), `sequence` (plays the actions), `sfx` (synthesized sound
    effects), `game-music`, `game-saves` (saved game slots), `project-file` (`.pk`).
  - `shared/model/`: `MapHelper` (chunks, bounds, `refreshModels`; `ChunkGround` the painted ground, water, reliefs and stairs;
    `mesh-fading` objects fading near the camera / see-through), `Terrain`, `GroundMesh`, `SceneMap`,
    `SceneBuilding`, `SceneModel`, `ModelChoice` (`MODEL_CHOICES`, palette thumbnails), `ModelInstances`,
    `browser-models`, `Passage` (links between maps), `ObjectEvent` (editor events ↔ `SceneEvent`, `conditionsFit`),
    `Zone` (invisible zones, camera layer 1 shown only in the editor; `findModel`), `Quality`.
  - `shared/weather/`: `Weather.ts` (entry: re-exports `weather-types` (enum, params), `day-presets`, `night-presets`,
    `time-of-day`; temperature, `WEATHER_CHOICES`), `WeatherHelper.ts`
    (wiring; `weather-blend` the day / night blending and sun, `weather-motion` the player thrown, floating, shaken), `GlowParticles.ts`, `weather-shader.ts`, `WeatherAudio.ts` (+ `audio/`: kit, mix levels, one-shot sounds), one `XxxHelper.ts` per effect, post passes
    (`BloomPass`, `GodRaysPass`, `HeatHazePass`), `weather-catalog.ts` (catalog texts). Details in `shared/weather/CLAUDE.md`.
- `modules/model-editor/`: 3D model editor (one pixel grid per face, grayscale layers specular / night / bump).
  `model-editor.options.ts` (tools, layers, rows of numbers, saved view settings). `shared/`: `EditableModel`,
  `model-ops`, `model-history`, `model-saver` (saves a little after each change), `model-storage` (IndexedDB),
  `model-export` (→ `md-xxx.ts` + png).
- `modules/music-editor/`: lo-fi music editor. `shared/`: `song`, `instruments` (data sheets), `synth`, `music-engine`, `song-storage`.
- `modules/variables-editor/`: story flags and counters (`GameVariable`). `shared/`: `variables`, `variable-storage`
  (browser `pk-variables`, else `assets/variables/variables.ts`), `variable-values` (values in the game being played).
- `modules/database-editor/`: the game's database (characters, enemies, groups, skills, items, states, elements,
  weapon types), opened over the game. The editor is a shell (tables, list, sheet head, windows over it);
  `sheets/<table>-sheet/` one component per table, extending `shared/db-sheet.ts` (`DbSheet`: the store, constants,
  lookups); `shared/database-store.ts` (`DatabaseStore`, provided by the editor: the database, its saving, the table
  shown, the pixel editor / weathers windows); `effects-editor/` (skills' and items' effects), `learn-select/`,
  `pixel-editor/`, `sheet-editor/` (combat sprite sheets; format in `shared/sprite-sheet.ts`, docs/editeur/11-planches.md;
  drawn with PixelLab through the `planche-combat` skill),
  `stepper/`; `_popup.scss` the windows over it; `_sheets.scss` the sheets' shared fields (global, inside `app-database-editor`, in
  `styles.scss`). `shared/database.ts` (types, rules), `database-storage` (`pk-database`, else
  `assets/database/database.ts`), `party` (the team in the game being played: members, items, money).
- `modules/battle/`: the Grandia-style combat, played on the map (the Combat action → `SequenceService.startFight`).
  `shared/battle.service` (start / end, the fighters, `view` for the interface), `battle-engine` (the timing:
  gauges, turns, commands, the action played, the end), `battle-rules` (stats, damage / heal, elements, weather,
  the enemies' choices), `battle-field` (the fighters placed on the map, moved,
  the camera, put back after), `sheet-sprite` (a fighter drawn from its sprite sheet), `progress` (experience, levels, element / weapon
  growth, skills known), `battle-types`; `battle-hud/` the interface, `battle-outcome/` the end window
  (design/combat.pen). The team's progress is kept in `party.ts` (`members`, `memberProgress`, `saveProgress`). Steps in docs/idees.md (point 9).
- `modules/fight/`: old combat prototype (2021, `fight-ui` shown by the game), to be removed once `battle` replaces it.
- `src/assets/`: `map/maps.ts` + `map/world/world.ts` (exported maps), `models/md-*.ts` + `models.ts`, `weather/*.webp`
  (catalog images), `release-notes.ts` (player-facing notes, French).

**Big files — never read whole, grep the symbol then read a range:** `day-presets.ts` (~900 lines), `night-presets.ts` (~750), `WeatherAudio.ts`
(~1350), `WeatherHelper.ts` (~1700), `map-editor.service.ts` (~1350), `model-editor.component.ts` (~1300),
`GlowParticles.ts`, `assets/map/world/world.ts`, `music-editor.component.ts`, `game.service.ts`.

## Conventions

- Code, comments and commit messages in English; UI text, docs (`docs/`) and release notes in simple French.
- Commits: `[Feature] …`, `[Fix] …`, `[Docs] …`, `[Design] …`, `[Refacto] …`, `[CI] …` + a sentence saying what changed for the player.
  Commit only when asked; code, then docs, then release as separate commits.
- UI icons: Lucide via `@lucide/angular` (`<svg lucideXxx>`, `<svg [lucideIcon]="Comp">`), never emojis (weather
  emojis in `Weather.ts` are content). Check the icon name exists in `node_modules/@lucide/angular` (e.g. no `Trash2`).
- Never attach decorative meshes (halos, decals, particles) under a model group from `BasicMeshService.makeModel`:
  collisions use `Box3.setFromObject(group)` (`MapHelper.getBounds`), so children enlarge the hitbox.
- `design-resources/` (git-ignored): inputs the user drops for Claude; copy what the game needs into `src/assets/`.

## Design mockups (`design/*.pen`)

- Only through the pencil MCP tools (encrypted files). UI-heavy features get a mockup first.
- Show the real game: captures of the running game with the UI hidden by injected CSS (`game-editor-bar,
  game-weather-panel, core-stick, core-touch-pad, .status-tile, .btn-fullscreen`), real model thumbnails
  (`design/images/models/`), catalog weather images (`design/images/weather/`). No AI images, no Lucide stand-ins
  for content; notes never over the screens.

## Recipe: add a weather

Enum and param in `weather-types.ts`, presets in `day-presets.ts` / `night-presets.ts`, temperature and
`WEATHER_CHOICES` in `Weather.ts` → style in `GlowParticles.ts` → wiring in
`WeatherHelper.ts` → text in `weather-catalog.ts` → user tries it and asks tweaks → catalog image: hide UI, screenshot,
`magick` crop to 1.61 and resize to 800x497 webp `src/assets/weather/<id>-<day|night>.webp`, restore the
`pk-weather-settings` localStorage → after validation: `docs/meteo/meteos/<id>.md` + link in `docs/meteo/README.md`.

## Docs

`docs/editeur/` (map, model and music editors user guide, README = index), `docs/meteo/` (weathers),
`docs/performance/`, `docs/idees.md` (roadmap). Update the matching page when a feature changes.
