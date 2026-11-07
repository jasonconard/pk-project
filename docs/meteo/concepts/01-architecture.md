# 01 · Architecture du système météo

Cette fiche répond à une question : **quand je clique sur « Pluvieux », que se passe-t-il, fichier par fichier, jusqu'aux pixels ?** Les fiches suivantes détaillent chaque étage : [02 · Jour et nuit](02-jour-nuit.md), [03 · Éclairage et shaders](03-eclairage-et-shaders.md), [11 · Vent](11-vent.md).

## 1. Le flux, de l'interface au rendu

```
weather-panel / weather-catalog   (composants Angular : boutons, curseurs)
        │  outputs : weatherSelected, hourChange, windChange…
        ▼
game.component.ts  ──►  GameService  (shared/services/game.service.ts)
        │                 signaux Angular + persistance localStorage
        │                 appelle game.weather.setWeather(), setHour(), setWind()…
        ▼
Game  (shared/model/Game.ts)       possède  ambientLight, sun, weather: WeatherHelper
        │  updateLights(dt)  ──►  weather.update(dt)
        │  renderFrame()     ──►  weather.renderPostEffects()
        ▼
WeatherHelper (shared/weather/WeatherHelper.ts)   le « chef d'orchestre »
        ├─ blendParams / targetParams  : calcule les paramètres courants
        ├─ pousse les valeurs dans les lumières three.js et les uniforms GLSL
        └─ met à jour les helpers (RainHelper, SnowHelper, GlowParticles…)
```

Le rôle de chaque étage :

- **Les composants** ne connaissent pas three.js. Ils affichent l'état (signaux) et émettent des événements.
- **`GameService`** garde l'état de l'interface dans des `signal(...)` Angular (`weatherState`, `hourState`, `windStrengthState`…) et le recopie dans `game.weather` via des setters (`setWeather`, `setHour`, `setWind`, `setCloudDensity`…). Il le sauvegarde aussi.
- **`Game`** est la scène three.js. Dans `renderLoop` (GameService), chaque frame appelle `game.updateLights(dt)` puis `game.renderFrame()`. `updateLights` se contente de déléguer : `this.weather.update(dt)`.
- **`WeatherHelper`** ne dessine rien lui-même : à chaque frame il calcule *l'état courant* et le distribue.

Le `dt` vient de `renderLoop` : `Math.min((now - this.lastFrameTime) / 1000, 0.1)`. Le plafond à 0,1 s évite que les effets « sautent » après une pause ou un onglet en arrière-plan.

## 2. `WeatherParams` : la carte d'identité d'une météo

Dans `Weather.ts`, l'interface `WeatherParams` liste **tous** les réglages numériques ou colorés d'une météo : `litLevel`, `shadowLevel`, `ambientColor`, `sunColor`, `cloudCover`, `rain`, `snow`, `fog`, `fogColor`, `darkness`, `temperature`, etc. Une météo n'est *que* un objet de ce type : il n'y a pas de code `if (type === RAINY)` dans le moteur. C'est un choix de conception important : le moteur lit des **intensités continues** (0 = absent, 1 = maximum), ce qui rend possible le mélange entre deux météos.

### Presets jour et nuit

Deux bases existent : `DAY_BASE` (lumière blanche, tout à 0) et `NIGHT_BASE`, construite par `{ ...DAY_BASE, litLevel: 0.45, shadowLevel: 0.26, ambientColor: 0x6d7fb3, … windowGlow: 1 }`. Le helper `preset` ajoute des surcharges :

```ts
// Weather.ts
const preset = (base: WeatherParams, overrides: Partial<WeatherParams>): WeatherParams => ({ ...base, ...overrides });
```

Exemple : `[WeatherType.SUNNY]: preset(DAY_BASE, { specular: 1, sunGlow: 0.8, godRays: 0.5 })`. On ne décrit donc que **ce qui change** par rapport à une journée neutre.

`DAY_PRESETS` et `NIGHT_PRESETS` sont des `Partial<Record<WeatherType, WeatherParams>>` : une météo absente d'un des deux tableaux n'existe pas à ce moment (le soleil de nuit, l'aurore de jour). `getWeatherParams(type, night)` renvoie alors le preset `NEUTRAL`, et `isWeatherAvailable` permet à l'interface de le savoir.

### `TEMPERATURES`

`TEMPERATURES: Record<WeatherType, [number, number]>` donne `[jour, nuit]` en °C (ex. `SNOW: [-4, -10]`). Une boucle en bas de `Weather.ts` injecte la valeur dans chaque preset :

```ts
presets[type] = { ...presets[type]!, temperature: TEMPERATURES[type][index] };
```

Le commentaire du code explique la copie : certains presets sont les objets de base partagés, on évite de les muter. Comme `temperature` fait partie de `WeatherParams`, elle est **interpolée comme le reste** : le thermomètre glisse doucement d'une valeur à l'autre (`WeatherHelper.temperature` lit `this.current.temperature`).

## 3. `blendParams` : transitions indépendantes du framerate

Quand on change de météo, rien ne saute : `this.current` rejoint `this.target` progressivement.

```ts
// WeatherHelper.ts, blendParams
const k = 1 - Math.exp(-dt * TRANSITION_SPEED);   // TRANSITION_SPEED = 1.5
for (const key of NUMBER_KEYS) c[key] += (to[key] - c[key]) * k;
for (const key of COLOR_KEYS)  c[key].lerp(to[key], k);
```

### Pourquoi cette formule ?

Notation : `c` = valeur courante, `t` = cible, `v` = `TRANSITION_SPEED`, `dt` = durée de la frame.

Une approche naïve serait `c += (t - c) * 0.05` à chaque frame. Problème : à 144 fps on se rapproche bien plus vite qu'à 30 fps. La bonne approche vient de l'équation différentielle `dc/dτ = v·(t − c)`, dont la solution exacte est :

```
c(τ + dt) = t + (c(τ) − t) · e^(−v·dt)
          = c + (t − c) · (1 − e^(−v·dt))        ← k = 1 − exp(−dt·v)
```

Deux frames de `dt/2` donnent *exactement* le même résultat qu'une frame de `dt` : `(e^(−v·dt/2))² = e^(−v·dt)`. C'est ce qui rend l'interpolation **indépendante du framerate**. Avec `v = 1,5`, la moitié de l'écart est résorbée en `ln 2 / 1,5 ≈ 0,46 s`. Le même schéma sert pour le vent (`baseWindX`), la position du soleil (`sunPos.lerp(…, 1 - Math.exp(-dt * TRANSITION_SPEED))`) et la densité de nuages.

### `NUMBER_KEYS` et `COLOR_KEYS`

Pour ne pas écrire 60 lignes `c.rain += …`, le fichier calcule les listes de clés par introspection d'un échantillon :

```ts
const SAMPLE = DAY_PRESETS[WeatherType.NEUTRAL]!;
const NUMBER_KEYS = Object.keys(SAMPLE).filter(k => typeof SAMPLE[k] === 'number');
const COLOR_KEYS  = Object.keys(SAMPLE).filter(k => SAMPLE[k] instanceof THREE.Color);
```

**Conséquence pratique** : ajouter un champ numérique ou `THREE.Color` à `WeatherParams` (et à `DAY_BASE`) suffit à l'inclure dans les transitions, sans toucher à `blendParams`.

### `SNAP_KEYS` : finir à zéro

Une exponentielle n'atteint jamais sa cible : après 10 s il resterait `0,0003` de pluie, donc des particules invisibles encore mises à jour. D'où ces clamps dans `blendParams` :

```ts
if (to.rain === 0 && c.rain < 0.005) { c.rain = 0; }   // idem snow, drizzle, embers…
for (const key of SNAP_KEYS) if (to[key] === 0 && c[key] < 0.005) c[key] = 0;
```

`SNAP_KEYS` regroupe les densités de particules traitées en boucle (`hail`, `sunRain`, `ash`, `magicSnow`, `stardust`, `curse`, `petalWhirl`, `haunt`). Les autres ont leur `if` écrit à la main. Un helper qui reçoit exactement `0` peut alors s'arrêter complètement.

### `snapToTarget`

`snapToTarget()` appelle `blendParams(60)` : avec `dt = 60 s`, `k ≈ 1`, donc on saute directement à la cible. `GameService.init` s'en sert pour démarrer dans les réglages restaurés, sans fondu depuis la météo par défaut.

## 4. Sauvegarde : `loadSettings` / `saveSettings`

Dans `game.service.ts`, l'interface `SavedSettings` (météo, heure, vent, nuages, son…) est stockée sous la clé `SETTINGS_KEY = 'pk-weather-settings'`.

- **`loadSettings`** relit le JSON et **valide champ par champ** (`unit(v)` accepte un nombre dans `[0,1]`, `bool(v)` un booléen, la météo doit appartenir à `Object.values(WeatherType)`). Tout champ invalide est simplement omis, d'où le `Partial<SavedSettings>`. Un `try/catch` gère un JSON corrompu. Les signaux s'initialisent ensuite avec `this.saved.weather ?? WeatherType.NEUTRAL`.
- **`saveSettings`** est appelé dans un `effect(...)` Angular : il se redéclenche dès qu'un signal change (l'heure bouge plusieurs fois par seconde). Il ne réécrit **que les champs modifiés** (`changed`) en les fusionnant dans la valeur déjà stockée :

```ts
const stored = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? '{}') ?? {};
changed.forEach(k => stored[k] = settings[k]);
```

La fusion par champ répond à un cas réel (commentaire du code) : avec le jeu ouvert dans plusieurs onglets, l'horloge d'un onglet n'écrase pas la météo choisie dans un autre.

## 5. Checklist : ajouter une météo

1. `Weather.ts` : ajouter une entrée à l'enum `WeatherType`.
2. `Weather.ts` : ajouter `preset(DAY_BASE, {...})` dans `DAY_PRESETS` et/ou `preset(NIGHT_BASE, {...})` dans `NIGHT_PRESETS` (au moins un des deux).
3. `Weather.ts` : ajouter la paire `[jour, nuit]` dans `TEMPERATURES` (le type `Record<WeatherType, …>` force à la renseigner).
4. `Weather.ts` : ajouter un `{ type, label, icon }` dans `WEATHER_CHOICES`.
5. `weather-catalog.ts` : ajouter l'entrée de `WEATHER_INFO` (catégorie, résumé, description, effets) : le type `Record` l'impose aussi.
6. Si un effet nouveau est nécessaire : ajouter un champ à `WeatherParams` **et** à `DAY_BASE`, puis consommer la valeur dans `WeatherHelper.update`. Si c'est un champ de particules, penser à `SNAP_KEYS`.
7. Écrire la fiche `meteos/<id>.md`.

## Expériences à tenter

- `TRANSITION_SPEED` (`WeatherHelper.ts`) : passe de `1.5` à `0.3` puis `8`, et change de météo. Observe la durée de la transition ; comprends pourquoi elle ne dépend pas de ta machine.
- Dans `blendParams`, remplace `k` par la valeur fixe `0.05` et compare à 30 fps et 144 fps (limite le fps dans les devtools).
- `SUNNY` dans `DAY_PRESETS` : mets `godRays: 1` et `sunGlow: 2`, regarde l'effet (voir [03](03-eclairage-et-shaders.md) et [06](06-post-effets.md)).
- `TEMPERATURES[WeatherType.SNOW]` : mets `[40, 40]` et observe le thermomètre glisser pendant la transition.
