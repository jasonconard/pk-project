# 02 · Jour et nuit

Le cycle jour/nuit repose sur **une seule variable : l'heure** (`hour`, 0 à 24). Tout le reste (lumière, couleurs, position du soleil) en est dérivé par des fonctions mathématiques simples. Contexte général : [01 · Architecture](01-architecture.md). Les lumières obtenues sont décrites dans [03 · Éclairage et shaders](03-eclairage-et-shaders.md).

## 1. `daylightAt` : un interrupteur progressif

```ts
// Weather.ts
export const DAWN = [6, 8];   export const DUSK = [18, 20];

export function daylightAt(hour: number): number {
  const h = ((hour % 24) + 24) % 24;
  if (h < DAWN[0] || h >= DUSK[1]) return 0;                  // nuit
  if (h < DAWN[1]) return smoothstep(h, DAWN[0], DAWN[1]);    // aube
  if (h < DUSK[0]) return 1;                                  // plein jour
  return 1 - smoothstep(h, DUSK[0], DUSK[1]);                 // crépuscule
}
```

- La ligne `((hour % 24) + 24) % 24` ramène n'importe quelle heure (même négative) dans `[0, 24[`. En JavaScript `-1 % 24` vaut `-1`, d'où le `+ 24` avant le second modulo.
- `THREE.MathUtils.smoothstep(x, min, max)` : avec `s = (x − min) / (max − min)` borné à `[0,1]`, il vaut `3s² − 2s³`. Courbe en S : démarrage et arrivée à pente nulle, donc pas de « cassure » visible dans la lumière à 6 h ou 8 h (une rampe linéaire se verrait).

Résultat : `daylightAt(6) = 0`, `daylightAt(7) = 0,5`, `daylightAt(8) = 1`, `daylightAt(12) = 1`, `daylightAt(19) = 0,5`, `daylightAt(20) = 0`. `isNightHour(h)` est simplement `daylightAt(h) < 0.5`.

## 2. Mélange des presets : `targetParams`

Chaque météo existe en version jour et nuit. `targetParams` (WeatherHelper) fait, pour chaque clé de `WeatherParams` :

```ts
// WeatherHelper.ts, targetParams
const d = daylightAt(this.hour);
to[key] = night[key] + (day[key] - night[key]) * d;     // NUMBER_KEYS
to[key].copy(night[key]).lerp(day[key], d);              // COLOR_KEYS
```

C'est un `lerp(a, b, d) = a + (b − a)·d`. Le même procédé que la transition de météo, mais piloté par `d`. Par exemple le `litLevel` passe de `0,45` (nuit) à `1` (jour) en douceur entre 6 h et 8 h. Si une météo n'existe que le jour, `getWeatherParams(type, true)` renvoie `NEUTRAL` de nuit : la météo « se transforme » en nuit claire plutôt que de disparaître brutalement.

Ensuite, `blendParams` rejoint cette cible avec l'exponentielle de la fiche 01 : il y a donc **deux lissages en cascade** (le mélange `d` par l'heure, puis le rattrapage exponentiel).

## 3. Aube et crépuscule : `twilightAt` et les teintes

Entre nuit et jour, la lumière devient rose (aube) ou orange (crépuscule). `twilightAt` renvoie un `amount` en forme de **cloche** :

```ts
const bell = (from, to) => h > from && h < to ? Math.sin(Math.PI * (h - from) / (to - from)) : 0;
const dawn = bell(DAWN[0] - 0.5, DAWN[1] + 0.5);   // 5h30 → 8h30
const dusk = bell(DUSK[0] - 0.5, DUSK[1] + 0.5);   // 17h30 → 20h30
```

`sin(π·s)` pour `s ∈ [0,1]` vaut 0 aux bords et 1 au milieu : l'effet culmine au milieu de la fenêtre et s'efface doucement. La fenêtre déborde de 0,5 h de chaque côté de `DAWN` / `DUSK`. La fonction renvoie `{ amount, dusk }` (le plus fort des deux gagne).

Les couleurs sont dans `DAWN_TINT` (soleil `0xffa070`, ambiante `0xe0b0c0`…) et `DUSK_TINT` (soleil `0xff7a28`, ambiante `0xd0907a`…). Elles sont mélangées par `targetParams` :

```ts
const k = twilight.amount * TWILIGHT_STRENGTH * (1 - 0.6 * Math.min(to.cloudCover, 1));
to.sunColor.lerp(tint.sunColor, k);   // idem ambientColor, unlitTint, fogColor
to.sunGlow += TWILIGHT_SUN_GLOW * k;  // 0.35
to.litLevel += TWILIGHT_LIGHT * k;    // 0.12
```

Lecture de la formule : `k` vaut au plus `TWILIGHT_STRENGTH = 0,9` ; sous un ciel couvert (`cloudCover = 1`) il est réduit de 60 % (`× 0,4`), car les nuages cachent les couleurs du couchant. On ajoute aussi un peu de lumière (`litLevel`) et de lueur sur les façades (`sunGlow`) : le soleil bas reste éclatant.

## 4. `sunWorldPos` : la trajectoire du soleil et de la lune

Le soleil (jour) et la lune (nuit) suivent un **arc** défini par les constantes `SUN_EAST_X = 900`, `SUN_WEST_X = -900`, `SUN_HEIGHT = 900`, `SUN_Z = 900`, `SUN_LOW = 0.55`.

```ts
// sunWorldPos
t = (h - DAWN[0]) / dayLength;            // jour : 0 à 6h, 1 à 20h (dayLength = DUSK[1] - DAWN[0] = 14)
fromX = SUN_EAST_X;  toX = SUN_WEST_X;    // le soleil va de l'est (x=900) à l'ouest (x=-900)
const arc = Math.sin(Math.PI * t);
return out.set(lerp(fromX, toX, t), SUN_HEIGHT * (SUN_LOW + (1 - SUN_LOW) * arc), SUN_Z);
```

- `x` varie linéairement de `fromX` à `toX` ; la hauteur `y` suit `sin(π·t)` : 0 aux extrémités, 1 à midi. La hauteur ne tombe jamais à 0 grâce à `SUN_LOW` : `y ∈ [495 ; 900]`. Le soleil reste donc assez haut pour que les ombres existent tout le temps.
- De nuit, c'est le même arc inversé (`fromX = SUN_WEST_X`) avec `t = ((h − DUSK[1] + 24) % 24) / (24 − dayLength)` : la lune parcourt la nuit (20 h → 6 h) en sens contraire. À 20 h le soleil est à l'ouest et la lune « reprend » à l'ouest : **aucun saut d'ombre** à la bascule (commentaire du fichier).

Dans `update`, le point est lissé (`this.sunPos.lerp(this.sunTarget, 1 - Math.exp(-dt * TRANSITION_SPEED))`), puis la direction est calculée depuis la cible caméra :

```ts
const dir = this.sunDir.copy(this.sunPos).sub(target).normalize();
if (dir.y < MIN_SUN_ELEVATION) { /* recale à y = 0.45 en gardant l'azimut */ }
this.game.placeSun(target, dir);
```

`MIN_SUN_ELEVATION = 0.45` (sinus de l'angle d'élévation, environ 27°) empêche des ombres infiniment longues quand le soleil est bas. La formule : on garde `y = 0,45` et on rescale `(x, z)` par `√(1 − 0,45²) / hypot(x, z)` pour que la direction reste **de longueur 1**. `Game.placeSun` colle ensuite la lumière à la caméra, avec une position arrondie à la grille de texels de la shadow map pour éviter le scintillement.

## 5. Le temps qui passe

Dans `game.service.ts` :

```ts
const DAY_DURATION = 12 * 60;   // 720 s réelles pour 24 h de jeu
const TIME_STEP = 250;          // ms
setInterval(() => { if (timeFlow && !paused && !loading)
    this.advanceHour(TIME_STEP / 1000 * 24 / DAY_DURATION); }, TIME_STEP);
```

Calcul : un pas de 0,25 s avance de `0,25 × 24 / 720 ≈ 0,0083 h`, soit une journée complète en 12 minutes (1 s réelle = 2 minutes de jeu). Le pas est petit car l'éclairage est lissé entre deux pas (exponentielle). `advanceHour` fait `(hour + hours) % 24` et prévient `game.weather.setHour`.

## 6. Météos réservées au jour ou à la nuit

`isWeatherAvailable(type, night)` teste la présence dans `NIGHT_PRESETS` / `DAY_PRESETS`. Deux chemins distincts dans `GameService` :

- **Choix manuel** `setWeather(type)` : si la météo n'existe pas à l'heure actuelle, on **déplace l'horloge** : `this.setHour(isWeatherAvailable(type, true) ? NIGHT_ONLY_HOUR : DAY_ONLY_HOUR)` (`DAY_ONLY_HOUR = 12`, `NIGHT_ONLY_HOUR = 22`, dans `Weather.ts`). L'aurore choisie à midi te téléporte à 22 h.
- **Temps qui passe** (`advanceHour`) : la météo est conservée, on ne touche pas à `weatherState`. Le soleil devient simplement une nuit claire par le mélange de la section 2.
- **Changement d'heure manuel** `setHour(hour)` : si la météo courante n'existe plus à cette heure, retour à `WeatherType.NEUTRAL`.

## Expériences à tenter

- `DAY_DURATION` (`game.service.ts`) : mets `60` pour voir un jour en une minute, observe les teintes d'aube.
- `DAWN` / `DUSK` (`Weather.ts`) : essaie `[6, 12]` pour un très long matin, la cloche de `twilightAt` suit.
- `SUN_LOW` : passe de `0.55` à `0.1` puis regarde la course du soleil et la longueur des ombres (`MIN_SUN_ELEVATION` les borne).
- `TWILIGHT_STRENGTH` à `1` et `DUSK_TINT.sunColor` à `0xff0000` pour exagérer le couchant.
