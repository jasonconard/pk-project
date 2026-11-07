# 04 · Surfaces météo

Neige, sable, humidité, flaques, sang, verglas, givre : la météo **change l'aspect des matériaux**. Chaque effet suit le même schéma en deux temps :

1. **CPU** (`WeatherHelper.update`) : un *état* 0..1 qui monte lentement quand la météo le demande, redescend sinon, puis est copié dans un uniform.
2. **GPU** (`weather-shader.ts`) : un bout de GLSL injecté après la lecture de la texture (`SNOW_FRAGMENT`, `SAND_FRAGMENT`, `PUDDLE_FRAGMENT`), voir [03 · Éclairage et shaders](03-eclairage-et-shaders.md).

Pourquoi séparer ? L'état est un **historique** (la neige s'accumule pendant 40 s), donc il vit côté CPU ; le shader ne sait que dessiner « un niveau de couverture ». Bruit utilisé : [07](07-bruit-procedural.md). Les particules associées : [08](08-particules.md).

## 1. États CPU : monter et descendre

Le motif est identique pour la neige, le sable, le verglas et le givre :

```ts
// WeatherHelper.update
this.snowCover = p.snow > 0.05
  ? Math.min(1, this.snowCover + dt * p.snow / SNOW_ACCUMULATION_TIME)   // 40 s
  : Math.max(0, this.snowCover - dt / SNOW_MELT_TIME);                    // 25 s
u.uSnowCover.value = this.snowCover;
```

Lecture : à `p.snow = 1`, la couverture gagne `dt/40` par frame, soit 1 en 40 s ; en blizzard (`snow = 2`), deux fois plus vite. Le seuil `0.05` évite de continuer à accumuler avec les restes de la transition exponentielle ([01](01-architecture.md)). Les durées sont des constantes :

| État | Uniform | Monte | Descend |
|---|---|---|---|
| `snowCover` | `uSnowCover` | `SNOW_ACCUMULATION_TIME = 40` | `SNOW_MELT_TIME = 25` |
| `sandCover` | `uSandCover` | `SAND_ACCUMULATION_TIME = 30` | `SAND_CLEAR_TIME = 20` |
| `iceCover` | `uIce` | `ICE_GLAZE_TIME = 20` | `ICE_MELT_TIME = 45` |
| `frostCover` | `uFrost` | `FROST_SPREAD_TIME = 45` | `FROST_MELT_TIME = 30` |

### Humidité et flaques : `updatePuddles`

```ts
const raining = Math.max(p.rain, p.bloodRain, p.poisonRain, p.sunRain * 0.6, p.drizzle * 0.5);
if (raining > 0.05) {
  this.wetness = Math.min(1, this.wetness + dt * raining / WET_TIME);          // 6 s
  this.puddles = Math.min(1, this.puddles + dt * raining / PUDDLE_FILL_TIME);  // 25 s
} else {
  const sun = clamp(p.litLevel, 0.3, 1.2) * (1 + 2 * p.heatWash);
  this.wetness = Math.max(0, this.wetness - dt * sun / DRY_TIME);              // 40 s
  this.puddles = Math.max(0, this.puddles - dt * sun / PUDDLE_DRY_TIME);       // 90 s
}
```

Le sol sèche **plus vite sous un soleil fort** (`litLevel`) et très vite pendant une canicule (`heatWash`), plus lentement la nuit. Les flaques sèchent 2 fois plus lentement que le sol : elles persistent après la pluie. Autre détail : `uRipples = min(raining * 1.5, 1) * (1 - max(iceCover, frostCover))` : une flaque gelée ne fait plus de rond dans l'eau.

### Sang et poison : `blood` et `uStainColor`

Ce que la pluie transporte détermine la couleur :

```ts
const stained = p.bloodRain + p.poisonRain;
const water   = p.rain + p.sunRain + p.drizzle * 0.5;
const share   = stained / Math.max(stained + water, 0.001);   // part de liquide « sale »
this.blood += (share - this.blood) * k;                       // k = min(1, dt·raining/BLOOD_STAIN_TIME)
STAIN_MIX.copy(BLOOD_STAIN).lerp(POISON_STAIN, p.poisonRain / stained);
WEATHER_UNIFORMS.uStainColor.value.lerp(STAIN_MIX, k);
```

`share` est une proportion entre 0 (eau pure) et 1 (sang ou poison pur). `blood` s'en rapproche : de l'eau claire **lave** donc progressivement les taches (`share` tombe à 0). La couleur est un mélange rouge sang `BLOOD_STAIN (0.42, 0.02, 0.03)` / violet poison `POISON_STAIN (0.22, 0.04, 0.42)`, dosé par `poisonRain / stained`. Les couleurs sont données en **linéaire** (comme l'impose le shader, voir fiche 05 pour la notion).

## 2. GLSL : la neige (`SNOW_FRAGMENT`)

```glsl
float facingUp = smoothstep(0.25, 0.75, snowNormal.y);
float isGround = 1.0 - step(1.0, vWeatherWorldPos.y);           // SNOW_GROUND_HEIGHT
float level = uSnowCover * mix(1.0, 0.42, isGround) * 1.2;      // SNOW_GROUND_MAX
float patches = wbNoise(pos.xz * 0.12) * 0.6 + wbNoise(pos.xz * 0.5) * 0.4;
float snow = facingUp * smoothstep(patches - 0.08, patches + 0.08, level);
```

1. **Orientation** : `n_y` (normale monde, y vers le haut) vaut 1 pour un toit, 0 pour un mur. `smoothstep(0.25, 0.75, n_y)` n'enneige que ce qui regarde vers le haut, avec une transition douce pour les surfaces inclinées. Le `gl_FrontFacing ? 1 : -1` inverse la normale des faces vues par derrière.
2. **Toit ou sol** : `step(1.0, y)` vaut 1 au-dessus de 1 unité. Le sol ne dépasse que `SNOW_GROUND_MAX = 0.42` de la couverture des toits pour garder les chemins lisibles.
3. **Seuil bruité** : on compare `level` à un champ de bruit `patches` (deux octaves, fréquences 0,12 et 0,5). `smoothstep(patches − 0.08, patches + 0.08, level)` vaut 1 là où `level > patches`. C'est un **seuillage progressif d'un bruit** : quand `level` monte, des plaques apparaissent d'abord où le bruit est bas et s'élargissent. C'est ainsi que « la neige s'accumule » sans texture animée.
4. **Couleur** : `snowColor = vec3(0.92, 0.95, 1.0) * min(0.72 + 0.4 * textureLum, 1.0)` avec `textureLum = dot(rgb, vec3(0.299, 0.587, 0.114))` (luminance perceptuelle). On garde ainsi un indice des contours et tuiles sous la neige au lieu d'un aplat blanc. Mélange final : `mix(diffuseColor.rgb, snowColor, snow)`.

## 3. GLSL : le sable (`SAND_FRAGMENT`)

Même structure, avec deux familles de surfaces :

```glsl
float up = smoothstep(0.25, 0.75, sandNormal.y);
float windward = (1.0 - abs(sandNormal.y)) * smoothstep(0.2, 0.8, -sandNormal.x * sign(uWindX + 0.0001));
float drift = wbNoise(pos.xz * vec2(0.05, 0.2)) * 0.65 + wbNoise(pos.xz * 0.6) * 0.35;
float wallLow = 1.0 - smoothstep(0.0, 14.0, pos.y);
float amount = up * SAND_UP_MAX + windward * wallLow * SAND_WALL_MAX;   // 0.6 et 0.45
```

- `windward` : mur dont la normale est **opposée** au vent (`−n_x · signe(vent)` grand), donc la face qui reçoit le sable. `sign(uWindX + 0.0001)` évite `sign(0) = 0`.
- `drift` : le bruit est échantillonné avec des fréquences différentes en x (0,05) et z (0,2) : des dunes **allongées** perpendiculairement à x, donc selon la direction du vent.
- `wallLow` : le sable s'accumule en bas des murs (disparaît vers 14 unités de hauteur).

## 4. GLSL : humidité, flaques, reflet (`PUDDLE_FRAGMENT` + `FRAGMENT_BODY`)

- **Sol mouillé** : `wet = uWetness * wetUp * (1 − dry)`, avec `dry = max(uSnowCover, uSandCover)` : sous la neige ou le sable, plus d'eau visible. La couleur s'assombrit : `diffuseColor.rgb *= 1 − WET_DARKEN·wet − PUDDLE_DARKEN·wbPuddle` (0,22 et 0,45).
- **Flaques** : `puddleHollow` additionne **trois lectures** de la texture de bruit (`PUDDLE_LAYERS`) à des échelles (1/260, 1/83, 1/31), angles et décalages différents, pondérées 0,5 / 0,35 / 0,15. Les rotations (`cos`/`sin` de l'angle) et décalages cassent la répétition de la tuile ([07](07-bruit-procedural.md)). Il y a flaque là où ce champ **dépasse** un niveau : `wbPuddle = smoothstep(level, level + 0.02, hollow) · …` (le code appelle ces zones les « creux »). Plus `level` baisse, plus la zone s'étend depuis le centre des taches. Le niveau dépend de l'état :

```glsl
float puddleLevel(float puddles) { return mix(0.671, 0.553, sqrt(max(puddles, 0.0))); }
```

Le `sqrt` rend les flaques **visibles tôt** (la courbe monte vite puis se tasse) ; le seuil `PUDDLE_LEVEL` passe de ~2 % du sol à ~15 % quand `uPuddles = 1`. Le même calcul existe côté CPU (`puddleAt(x, z, puddles)`, qui échantillonne `sampleNoiseMap`) pour que les **bruits de pas** sachent s'il y a une flaque sous le joueur.

- **Teinte de sang** : `stain = uBlood * max(0.4·wet, 0.9·wbPuddle)` puis `mix(diffuse, uStainColor * (0.6 + 0.8 * shade), stain)` : les flaques rougissent bien plus que le sol humide.
- **Reflet** (dans `FRAGMENT_BODY`) : l'eau reflète le ciel, plus fort en **incidence rasante**, approximation de Fresnel :

```glsl
float fresnel = 0.55 + 0.45 * pow(1.0 - clamp(viewDir.y, 0.0, 1.0), 3.0);
```

`viewDir.y` = cosinus de l'angle entre la vue et la verticale. Regard vertical (`viewDir.y = 1`) : `fresnel = 0.55` ; regard rasant (`viewDir.y → 0`) : `fresnel → 1`. C'est la forme d'une approximation de Schlick (`F0 + (1 − F0)(1 − cosθ)^n`, ici `n = 3`). La couleur reflétée est `uSkyColor` (bleu si ciel clair, gris/ambiant sinon, calculée dans `updatePuddles`). Un **éclat** du soleil est ajouté : `glint = pow(max(dot(reflect(-uSunDir, up), viewDir), 0), 60)` : le vecteur réfléchi du soleil par un miroir horizontal, élevé à la puissance 60 pour une tache fine.

- **Ronds de pluie** : on découpe le sol en cellules de 2,5 unités (`floor(pos.xz / 2.5)`). Chaque cellule a sa phase `fract(uBeamTime·1.3 + hash(cell))` et un centre décalé aléatoirement. L'anneau est `ring = |length(local) − phase·0.45|` : distance au cercle de rayon `phase·0.45` qui **grandit** avec la phase. `(1 − smoothstep(0, 0.04, ring)) · (1 − phase)` dessine un trait fin qui s'estompe en s'élargissant.

## 5. Verglas, givre, feuillage, irisation

- **Verglas** (`uIce`, pluie verglaçante) : `wbIce = uIce * smoothstep(0.4, 0.9, n_y) * (1 − uSnowCover)`. Teinte bleutée (`× vec3(0.8, 0.88, 1.0) + vec3(0.04, 0.06, 0.1)`), puis dans `FRAGMENT_BODY` : reflet de ciel (`iceFresnel = 0.3 + 0.7·(…)^3`) et éclat net (`pow(…, 40)`).
- **Givre** (`uFrost`) : `crystals` mélange la texture de bruit (0,6) et `wbNoise` (0,4) ; `reach = uFrost · (0.3 + 0.22·frostUp + 0.32·green)`. `green = clamp((g − max(r, b))·4, 0, 1)` détecte les pixels **verts** (herbe) : le givre les atteint en premier, comme les toits (`frostUp`). Scintillement : `glitter = step(0.97, hash(cellule))` (3 % des cellules) multiplié par `twinkle = 0.5 + 0.5 sin(t·3 + hash·30)`.
- **Feuillage (`canopy`)** : `canopyLeaves` additionne trois couches de la texture de bruit (`CANOPY_LAYERS`), chacune tournée, avec un `sway` différent (les petites bougent plus avec le vent). `shade = smoothstep(CANOPY_GAPS ± CANOPY_EDGE, leaves)` puis `sunVisibility *= 1 − uCanopy · CANOPY_SHADE (0.8) · shade` : des taches de soleil dans l'ombre des feuilles (voir `sunVisibility` en [03](03-eclairage-et-shaders.md)).
- **Irisation** : voir [03](03-eclairage-et-shaders.md), palette `0.5 + 0.5 cos(2π(h + [0, 0.33, 0.67]))`.

## Expériences à tenter

- `SNOW_ACCUMULATION_TIME` (`WeatherHelper.ts`) à `5` : la neige recouvre tout en 5 s, observe l'apparition par plaques.
- `SNOW_GROUND_MAX` (`weather-shader.ts`) à `1` : le sol est enneigé comme les toits (chemins illisibles).
- `PUDDLE_LEVEL` à `[0.5, 0.35]` : flaques énormes ; et `PUDDLE_DRY_TIME` à `600` pour qu'elles ne sèchent presque plus.
- Dans `fresnel`, remplace l'exposant `3.0` par `1.0` puis `8.0` : le reflet couvre tout ou seulement l'horizon.
