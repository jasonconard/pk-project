# pk-project

The app's name shown to players is **Tesselle** (manifest, page title, Android app name); the repository, package,
Android app id and storage keys keep `pk-project` / `pk-`.

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
  input listeners must respect it). `stick`, `message`, `update-prompt` (GitHub release check, live update).
- `modules/game/`: `game.component` (main view, game mode / edit mode, editor panels opened over the game via
  `editorPanel` + `@defer`). UI pieces: `editor-bar` (edit UI; `layout` signal, `editor-bar.wide.scss` for
  landscape/desktop, `editor-bar.selection.scss` the selected object's sheet), `game-menu`, `map-controls`, `map-manager` (the maps in sections by kind or made by hand, `SceneMap.section`; a map's settings; `map-manager.settings.scss`), `weather-panel`, `weather-catalog`,
  `release-notes`, `game-saves` (saved games dialog), `agenda` (Menu → Agenda), `time-banner` (« Le soir tombe »), `links` (Menu → Liens), `link-toast` (« Le lien monte »), `gift-picker` (the Offrir action), `variables-test` (change the variables' values while playing),
  `teleport`, `event-editor` (an object's event window: trigger, conditions, the tree of actions and branches;
  `event-conditions/` and `event-action/` (one action's fields) components, `event-editor-data.ts` (`EventEditorData`,
  provided by the window: variables and database read once; field helpers), `_fields.scss` the shared fields (global,
  in `styles.scss`)); small windows over the game share `shared/_dialog.scss`.
  - `shared/services/`: `game.service` (settings, music, reload of models), `map-editor.service` (map editor logic: input, selection, objects, chunks; `map-editor/`: `editor-grid`
    (cells grid), `edit-history` (undo / redo), `editor-markers` (chunk outlines, arrival point), `ground-painter`
    (terrain, height, stairs, bucket strokes)),
    `map-storage` (maps in the browser), `game-map`, `scene`, `basic-mesh` (`makeModel`), `material`, `player`,
    `event` (`actionAt`, `armed`: enter / automatic events), `sequence` (plays the actions), `sfx` (synthesized sound
    effects: games', fights', steps, creatures' voices; `playSound(id, preview, {pitch, gain})`), `game-music`, `game-saves` (saved game slots), `project-file` (`.pk`).
  - `shared/model/`: `MapHelper` (chunks, bounds, `refreshModels`; `ChunkGround` the painted ground, water, reliefs and stairs;
    `mesh-fading` objects fading near the camera / see-through), `Terrain`, `GroundMesh`, `SceneMap`,
    `SceneBuilding`, `SceneModel`, `ModelChoice` (`MODEL_CHOICES`, palette thumbnails), `ModelInstances`,
    `browser-models`, `Passage` (links between maps), `ObjectEvent` (editor events ↔ `SceneEvent`, `conditionsFit`),
    `Zone` (invisible zones, camera layer 1 shown only in the editor; `findModel`), `npc-sprite` (an NPC placed on the map: model id `npc:<id>`, its walking sheet's standing picture turned by `rot`, an invisible body box), `game-calendar` (the date: a day number → date, moment, labels, special days; `GameService` keeps `day` and the time's pauses), `npc-schedule` (where an NPC is: its places are its objects on the maps), `model-motion` (a model part's movement: rotate / move / blink / swing, triggers; `applyMotions`, played by
    `MapHelper.updateMotions`; `model-animations` keeps what events asked, `pk-animations`), `pixel-scale` (pixel-sharp sprites: the camera zoom for a whole number of screen pixels per sprite pixel, sprites drawn facing the camera with an upright depth; retro rendering: one picture pixel per map unit, `Game.setRetro`; `CameraFollow` the camera's smooth follow and pixel snap, applied only while drawing), `Quality`.
  - `shared/weather/`: `Weather.ts` (entry: re-exports `weather-types` (enum, params), `day-presets`, `night-presets`,
    `time-of-day`; temperature, `WEATHER_CHOICES`), `WeatherHelper.ts`
    (wiring; `weather-blend` the day / night blending and sun, `weather-motion` the player thrown, floating, shaken), `GlowParticles.ts`, `weather-shader.ts`, `WeatherAudio.ts` (+ `audio/`: kit, mix levels, one-shot sounds), one `XxxHelper.ts` per effect, post passes
    (`BloomPass`, `GodRaysPass`, `HeatHazePass`), `weather-catalog.ts` (catalog texts). Details in `shared/weather/CLAUDE.md`.
- `modules/model-editor/`: 3D model editor (one pixel grid per face, grayscale layers specular / night / bump).
  `model-editor.options.ts` (tools, layers, rows of numbers, saved view settings). `shared/`: `EditableModel`,
  `model-ops`, `model-history`, `model-saver` (saves a little after each change), `model-storage` (IndexedDB),
  `model-export` (→ `md-xxx.ts` + png).
- `modules/music-editor/`: lo-fi music editor. `shared/`: `song`, `instruments` (data sheets), `synth`, `music-engine`, `song-storage`, `midi-file` (Standard MIDI
  File reader / writer), `midi-song` (MIDI ↔ song); `midi-import/` the import window.
- `modules/variables-editor/`: story flags and counters (`GameVariable`). `shared/`: `variables`, `variable-storage`
  (browser `pk-variables`, else `assets/variables/variables.ts`), `variable-values` (values in the game being played).
- `modules/database-editor/`: the game's database (characters, NPCs, enemies, groups, skills, items, states, elements,
  weapon types), opened over the game. The editor is a shell (tables, list, sheet head, windows over it);
  `sheets/<table>-sheet/` one component per table, extending `shared/db-sheet.ts` (`DbSheet`: the store, constants,
  lookups); `shared/database-store.ts` (`DatabaseStore`, provided by the editor: the database, its saving, the table
  shown, the pixel editor / weathers windows); `effects-editor/` (skills' and items' effects), `anim-field/` (an effect animation's fields and preview: skills, weapon types), `sheets/calendar-sheet/` (the game's calendar: the `calendar` table holds one row, shown without a list; `DbCalendar` in `database.ts`), `schedule-field/` (an NPC's schedule), `link-field/` (a social link: pace, bonuses or advantages, gifts; logic in `shared/links.ts`, points kept in `party.ts`), `walk-field/` (the walking sheet on the map, 16×24 × 4 directions × 3; `shared/walk-sheet.ts`; the player uses the team leader's, `game/shared/model/player-look.ts`), `learn-select/`,
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
  growth, skills known), `battle-types`; `battle-hud/` the interface, in pixel art (design/combat.pen « interface pixel art »: the commands' ring in `battle-hud.ring.scss`, the team's cards in `battle-hud.team.scss`, `battle-target-info/` the aimed one's window; the look (`panel`, `font` mixins) in `battle/_pixel.scss`; numbers never bold: the font's bold 2 and 3 read as 8; icons in `assets/battle/ui/`, the font Pixelify Sans in `assets/fonts/`), `battle-outcome/` the end window, `battle-sim/` the fight simulation (menu → Simuler un combat; `BattleService.simulateNext`, the party put back after)
  (design/combat.pen). The team's progress is kept in `party.ts` (`members`, `memberProgress`, `saveProgress`). Steps in docs/idees.md (point 9).
- Crystal cave (the first dungeon, `dg-crystal-cave`): maps `src/assets/map/grotte-*/` (walls style `SceneMap.walls`
  → `WALL_STYLES` in `GroundMesh.ts`; leaning walls painted per cell with the Reliefs tab's Paroi brushes,
  `SceneChunk.slopes`; their outlines are rounded by `rounded` in `buildGroundGeometry`; a room door at the foot of a
  leaning wall is a cave mouth drawn on the slope, `DoorWall` in `dungeon-object.ts`; cave terrains at the tileset's
  last row), decor models `md-crystal-*`, `md-cave-*`,
  `md-mine-*`… (one upright plane each, `tex.glow` = the night glow's colour; sources in `design-resources/cave/`), enemies
  `en-*` / groups `gr-cave-*` in the database.
- Dungeons (`docs/editeur/12-donjons.md`): `game/shared/services/dungeon.service.ts` (entering, floors, generated rooms
  linked by their doors, hand-made floors of several maps (room doors with a destination, `DungeonObject.to`, the
  run's `map`), visible enemies (drawn at random or put by hand: the `dg:foe` object with its group and `FoeMove`,
  `placedFoes`), chests, traps, switches, locked doors, save point), `model/dungeon-object.ts`
  (`dg:<kind>` objects of the editor's Donjon tab, `foe:<group>` enemies, pictures in `src/assets/dungeon/`),
  `model/dungeon-state.ts` (`pk-dungeon`: chests opened, the run), `game/dungeon-chip/`, `game/dungeon-try/` (Menu →
  Essayer un donjon: straight into a floor, with a team made for the try (`battle/team-setup/`), `DungeonService.tryOut`);
  an enemy's map sprite is `DbEnemy.walk` (`MapWalk`: 8 direction rows × step columns, drawn by `makeFoeMesh` /
  `setFoeFrame`); the database table `dungeons`
  (`sheets/dungeon-sheet/`); the `DUNGEON` instruction and `dungeon:<id>` teleports.
- Cutscenes (`docs/editeur/13-cinematiques.md`): kept in their map (`SceneMap.cutscenes`); `model/cutscene.ts` (tracks,
  blocks), `model/cutscene-eval.ts` (the scene at a time: actors, camera, screen — pure, used by the editor preview and
  skipping), `model/cutscene-seen.ts` (`pk-cutscenes-seen`), `services/cutscene.service.ts` (plays them: `game.cutscene`
  freezes the input and the camera follow; `preview` for the editor), `game/cutscene-overlay/` (bars, fade, title,
  bubbles, Passer held 2 s, ⏩), `game/cutscene-editor/` (opened from Éditeurs → Cinématiques over the map editor, talks
  to the game through `CutsceneHost`, see `GameService.cutsceneHost`); the `CUTSCENE` instruction.
- Mode test (`docs/editeur/14-mode-test.md`): `model/test-preset.ts` (named tests `pk-tests`, also in the `.pk`;
  `testFromGame`, `applyTest`), `services/test-mode.service.ts` (the sheet asked, start / restart / quit; the game set
  aside in `pk-test-run`, given back at the next start), `game-saves.ts` `captureGame` / `restoreProgress`,
  `game/test-mode/` (`test-sheet` Tester ici, `test-settings`, `test-list` Menu → Mode test, `test-banner`).
- Action zones (`docs/editeur/15-zones-action.md`): `model/action-zone.ts` (cells of the footprint + side; `inZone`,
  `zoneFacing`), on `SceneModel.zone` / `SceneBuilding.zone` / `SceneEventCondition.zone` (`EventService.zoneOf`),
  `game/zone-editor/` (grid + side, shared by the model editor, the object sheet, the event window),
  `map-editor/zone-overlay.ts` (cells shown on the map, `MapEditorService.editZone` / `setZone`).
- Shops (`docs/editeur/16-boutiques.md`): the database table `shops` (`DbShop`: shopkeeper NPC, buyback %, link discount
  per level, items with own price, daily stock, `EventConditions`, link level; `sheets/shop-sheet/`), `model/shop.ts`
  (items on sale now, prices, buyback), `party.ts` `trade` / `boughtToday` (`PartyState.shops`), `game/shop/` the
  window, the `SHOP` instruction (`SequenceService.shop$`). `:where(.event-fields)` in `styles.scss` lends the event
  window's fields to `game-event-conditions` outside it.
- Crops (`docs/editeur/17-cultures.md`): the `farmland` terrain, the database table `crops` (`DbCrop`: seed, 4 stage
  pictures 16×24 with watered days, harvest, regrow, months, frost, weathers; `sheets/crop-sheet/`), `DbItem.tool`
  (hoe, watering can), `model/farm.ts` (`pk-farm`: plots per map, the days' weather, `advanceFarm`), `farm-view.ts`
  (soil and plants drawn), `services/farm.service.ts` (the action key on farmland; internal `PLANT` instruction),
  `game/farm/` (seed picker, harvest toast). Plant pictures source: `design-resources/crops/`.
- Team following (`docs/editeur/18-equipe.md`): `model/team-followers.ts` (`TeamFollowers`: the leader's trail, up to 3
  members in single file, regrouped after a jump), updated by `GameMapService.updateFollowers`; hidden by
  `SceneMap.followers === false`, `PartyState.teamHidden` (the `TEAM` instruction / `team` action) or `Game.teamFollows`
  (Menu → L'équipe me suit).
- Lights (`docs/editeur/19-lumieres.md`): `model/light.ts` (`LightSpec`, `ModelLight` on `SceneModel.lights`, the
  invisible `light` object with `SceneBuilding.light`, the lantern, `isLightOn` / `PartyState.lights` switched by the
  `LIGHT` instruction), `model/lights-view.ts` (`LightsView`: additive ground pools for every light, the nearest ones as
  real `PointLight`s per `RENDER_DETAIL.realLights`; strength follows `uWindowGlow`), `game/light-fields/` (settings,
  shared by the map editor sheet and the model editor's Lumières part). Props `lamp` / `campfire` are one upright
  picture each (`md-lamp.ts`, `md-campfire.ts`, sources in `design-resources/props/`).
- Transitions (`docs/editeur/20-transitions.md`): `model/transition.ts` (`TRANSITIONS`, `drawTransition`: one picture on a
  small canvas), `services/transition.service.ts` (`through`: cover, change, reveal; `kindFor` reads the database table
  `settings`, one row, `sheets/settings-sheet/`), `game/transition/` the canvas; played by `teleport.component` (another
  map; the arrival map's own `SceneMap.transition` first) and `BattleService.start` / `end` (the group's own
  `DbGroup.transitionIn` / `transitionOut` first).
- Arenas (`docs/editeur/21-arenes.md`): a fight is played in an arena map (kind `arena`) shown in place of the map,
  which stays loaded (`MapHelper.showArena` / `hideArena`: the arena's chunks built far east, the map's hidden;
  `shownChunks`); `model/arena.ts` (`arenaFor`: the group's, the map's, the dungeon's, the settings'; `FIGHT_AREA`),
  `BattleService.enterArena` / `leaveArena`; the editor's fight guide in `editor-markers.ts`. Maps `arene-*`.
- Skill flows (`docs/editeur/22-deroule.md`): a skill or a weapon's attack plays in time, blocks on five tracks
  (`database-editor/shared/skill-flow.ts`: `SkillFlow`, defaults `skillFlow` / `attackFlow`); the engine's action has
  a clock from its strike (`strike`, `playFlow`, `land(action, percent, states)` in `battle-engine.ts`); several
  hits share the sheet's power. Edited in `database-editor/flow-editor/` (timeline, block settings, undo), opened by
  `DatabaseStore.flowEdit`; its preview is a flat 2D scene drawn at a moment (`shared/flow-scene.ts`, pure).
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
  game-weather-panel, core-stick, .status-tile, .btn-fullscreen`), real model thumbnails
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
