# 03 · Éclairage et shaders

Cette fiche montre comment le jeu **modifie les shaders de three.js** pour ajouter la météo, puis détaille les effets de lumière. Prérequis : [01 · Architecture](01-architecture.md) (d'où viennent les valeurs) et [02 · Jour et nuit](02-jour-nuit.md) (position du soleil). Suite : [04 · Surfaces](04-surfaces-meteo.md), [05 · Brouillard](05-brouillard-et-tenebres.md), [07 · Bruit](07-bruit-procedural.md).

## 1. Injecter du code dans un matériau three.js

Les matériaux `MeshLambertMaterial` / `MeshPhongMaterial` ont un shader écrit par three.js, assemblé à partir de **chunks** (morceaux GLSL nommés : `#include <map_fragment>`, `#include <lights_fragment_end>`…). Plutôt que de réécrire tout le shader, `applyWeatherShader` (weather-shader.ts) utilise le crochet `onBeforeCompile`, appelé juste avant la compilation, pour **remplacer du texte** :

```ts
mat.onBeforeCompile = shader => {
  Object.assign(shader.uniforms, WEATHER_UNIFORMS);
  shader.vertexShader = VERTEX_HEAD + shader.vertexShader.replace('#include <project_vertex>', SWAY_VERTEX + '#include <project_vertex>\n' + VERTEX_BODY);
  shader.fragmentShader = FRAGMENT_HEAD + shader.fragmentShader
    .replace('#include <map_fragment>', '#include <map_fragment>\n' + SNOW_FRAGMENT + SAND_FRAGMENT + PUDDLE_FRAGMENT)
    .replace('#include <emissivemap_fragment>', '...\ntotalEmissiveRadiance *= uWindowGlow * uWindowTint;')
    .replace('#include <lights_fragment_end>', '#include <lights_fragment_end>\n' + FRAGMENT_BODY)
    .replace('#include <fog_fragment>', '')
    .replace('#include <colorspace_fragment>', FOG_FRAGMENT + '#include <colorspace_fragment>');
};
```

Chaque point d'injection est choisi pour une raison précise :

| Chunk visé | Code ajouté | Pourquoi là |
|---|---|---|
| `map_fragment` (juste après la lecture de la texture) | `SNOW_`, `SAND_`, `PUDDLE_FRAGMENT` | On modifie `diffuseColor` **avant** l'éclairage : la neige est éclairée comme de la neige (voir [04](04-surfaces-meteo.md)) |
| `emissivemap_fragment` | `totalEmissiveRadiance *= uWindowGlow * uWindowTint` | L'émissif ne sert qu'aux fenêtres allumées la nuit |
| `lights_fragment_end` (toutes les lumières sont accumulées) | `FRAGMENT_BODY` | On peut multiplier séparément `reflectedLight.directDiffuse`, `directSpecular`, `indirectDiffuse` |
| `fog_fragment` supprimé, puis `FOG_FRAGMENT` avant `colorspace_fragment` | brouillard maison | Mélange en **espace linéaire** (voir [05](05-brouillard-et-tenebres.md)) |

Les déclarations (`uniform`, `varying`, fonctions) sont préfixées en tête de shader (`FRAGMENT_HEAD`, `VERTEX_HEAD`). Le vertex shader exporte `vWeatherWorldPos` et `vWeatherWorldNormal` (position et normale monde) que le fragment shader réutilise partout.

### Les uniforms partagés : `WEATHER_UNIFORMS`

C'est **un seul objet** de `{ value }`. `Object.assign(shader.uniforms, WEATHER_UNIFORMS)` donne à *tous* les matériaux la **même référence** : quand `WeatherHelper.update` écrit `u.uCloudCover.value = p.cloudCover`, tous les matériaux voient la nouvelle valeur au prochain dessin, sans parcourir la scène. Exemples : `uSunDir`, `uCloudDensity`, `uBeamTime`, `uWindowGlow`, `uAurora`, `uSnowCover`…

### `customProgramCacheKey`

three met en cache les programmes GLSL compilés. Il faut lui dire quand deux matériaux partagent le même programme : `mat.customProgramCacheKey = () => 'weather-v26'`. Tous les matériaux météo partagent ainsi un programme (selon leurs autres paramètres : texture, émissif…). Le numéro de version sert à **invalider** : si tu changes le GLSL, incrémente la chaîne. C'est le même principe pour `'linear-fog-v1'` (`applyLinearFog`) et `'weather-sway-depth-v2'`.

## 2. Intensités des lumières : les maths de Lambert

Dans `WeatherHelper.update`, le commentaire du code donne le but : « these intensities give exactly litLevel on a flat ground in the sun and shadowLevel in the shade, whatever the sun elevation ». Les artistes règlent deux **niveaux de luminosité** (`litLevel`, `shadowLevel`), le code en déduit les intensités des lumières three.js.

Notation : `ρ` = couleur de la surface, `E` = intensité de la lumière, `θ` = angle entre la normale et la lumière, `d_y` = `dir.y` = sinus de l'élévation du soleil.

- Un matériau Lambert renvoie `ρ/π × E × max(cosθ, 0)` pour une lumière directionnelle. La division par `π` normalise le modèle (l'énergie se répartit sur un demi-espace).
- Lumière ambiante : pas de `cosθ`, donc `ρ/π × E_amb`.

Pour avoir **un facteur `shadowLevel` à l'ombre** : `E_amb = π · shadowLevel`.

```ts
this.game.ambientLight.intensity = Math.PI * (p.shadowLevel * pulse + ...);
```

Pour le soleil, on veut que `ambiante + soleil = litLevel` sur un sol plat (`cosθ = d_y`, normale = haut) :

```
ρ/π · [ π·shadow + E_sun · d_y ] = ρ · litLevel      ⇒   E_sun = π · (litLevel − shadow) / d_y
```

```ts
this.game.sun.intensity = Math.PI * (Math.max(p.litLevel - p.shadowLevel, 0) * pulse + ...) / dir.y;
```

La **division par `dir.y`** compense le fait qu'un soleil bas éclaire le sol « en biais » (`cosθ` petit) : sans elle, la luminosité du sol changerait avec l'heure. `MIN_SUN_ELEVATION` ([02](02-jour-nuit.md)) garantit que `dir.y ≥ 0,45`, donc la division ne s'emballe jamais. Les murs verticaux, eux, reçoivent `cosθ ≠ d_y` et sont donc plus sombres : c'est voulu.

### Pulsation (`pulse`) et éclairs

```ts
const pulse = (1 + p.lightPulse * (0.7 * Math.sin(t * 0.8) + 0.3 * Math.sin(t * 2.3))) * (1 - dip);
```

Deux sinus de fréquences différentes (0,8 et 2,3 rad/s) pondérés 0,7 / 0,3 : une respiration **irrégulière** (la somme ne se répète pas régulièrement) d'amplitude `lightPulse` (0,2 = ±20 %).

Les éclairs (`updateLightning`) renvoient `flash` ∈ [0,1], enveloppe « montée rapide, décroissance exponentielle » :

```ts
flash = Math.max(flash, pulse.peak * Math.min(t / pulse.rise, 1) * Math.exp(-Math.max(t - pulse.rise, 0) * pulse.decay));
```

`min(t/rise, 1)` : rampe linéaire jusqu'au pic ; `exp(−(t−rise)·decay)` : chute. Le flash s'ajoute aux deux lumières (`LIGHTNING_AMBIENT = 0.9`, `LIGHTNING_SUN = 0.8`) **et** teinte les couleurs vers `lightningColor` (`.lerp(p.lightningColor, flash)`). Un soleil plus fort fait « claquer » les ombres.

### Les dips (`flicker`)

`updateDips` choisit au hasard (`DIP_INTERVAL = [0.4, 3]` s, durée 0,05 à 0,3 s) une chute brève de toutes les lumières (`dipDepth` 0,25 à 0,65). Le dip entre dans `pulse` via `(1 - dip)` et réduit `uWindowGlow` (`1 - Math.min(dip * 1.5, 1)`) : les fenêtres clignotent. Pendant le dip, `Math.random() < 0.7 ? 1 : 0.3` ajoute un bégaiement.

## 3. Ombres de nuages (`FRAGMENT_BODY`)

```glsl
vec2 cloudPos = vWeatherWorldPos.xz - uSunDir.xz * (vWeatherWorldPos.y / max(uSunDir.y, 0.1));
float cloudNoise = texture2D(uCloudMap, cloudPos * uCloudScale + uCloudOffset).r;
float cloudThreshold = mix(0.72, 0.28, uCloudDensity);
float cloud = smoothstep(cloudThreshold - 0.06, cloudThreshold + 0.14, cloudNoise);
float sunVisibility = 1.0 - uCloudCover * cloud;
```

- **Projection** : on remonte le rayon vers le soleil jusqu'au plan `y = 0`. Si `P = (x, y, z)` et `s` = direction du soleil, le point du plan est `P − s · (y / s_y)` (composantes xz). Un toit et le sol en dessous partagent le même `cloudPos` : l'ombre de nuage est **cohérente** sur toute la verticale. Le `max(…, 0.1)` évite une division par ~0.
- **Seuil de densité** : `uCloudMap` est une texture de bruit (voir [07](07-bruit-procedural.md)). `cloudThreshold` va de `0,72` (peu de nuages : seules les valeurs très hautes comptent) à `0,28` (ciel presque couvert). `smoothstep` sur une bande de `0,2` donne des bords flous.
- `uCloudScale = 1/900` : une tuile de texture couvre 900 unités monde. `uCloudOffset` est décalé chaque frame par le vent (voir [11](11-vent.md)).
- **`sunVisibility`** : `1` = plein soleil, `1 − uCloudCover` sous un nuage dense. `uCloudCover` (météo) dit à quel point un nuage *bloque* le soleil. Il multiplie `directDiffuse` et `directSpecular`, jamais l'ambiante, sauf via `uCloudAmbient` : `reflectedLight.indirectDiffuse *= 1.0 - uCloudAmbient * cloud` (nuages plus contrastés).

## 4. Autres effets de `FRAGMENT_BODY`

- **`sunGlow`** : `facade = (1 − |n_y|) · smoothstep(0.05, 0.5, dot(n, uSunDir))`. `1 − |n_y|` vaut 1 sur un mur vertical, 0 sur un toit ; le `dot` mesure à quel point la face regarde le soleil. Puis `directDiffuse *= 1 + uSunGlow · facade · vec3(1.0, 0.92, 0.75)` : façades éclairées plus chaudes (teinte orangée). Comme `directDiffuse` est déjà nul à l'ombre, un mur ombragé ne s'illumine pas.
- **Rayons (`beams`)** : `directDiffuse *= mix(1.0 - 0.35 * uBeamLight, 1.0 + 0.8 * uBeamLight, beam)`. `beamPattern` (`BEAM_GLSL`) renvoie 0 entre les rayons, 1 dedans. Le motif est un bruit **constant le long de la direction du soleil** (on projette `p` sur deux axes `a1`, `a2` perpendiculaires à `sunDir`) : des colonnes parallèles aux rayons. Le même GLSL sert au post-effet [GodRays](06-post-effets.md) : le rayon qui éclaire l'air éclaire aussi la surface touchée.
- **Étincelles iridescentes** (`uIridescence`) : `h = fract(…)` puis `0.5 + 0.5 cos(6.2831 (h + vec3(0, 0.33, 0.67)))`, la palette arc-en-ciel (trois cosinus déphasés d'un tiers de tour) qui multiplie `directSpecular`.
- **Aurore** (`uAurora`) : `warp` (bruit) déforme une onde `sin((ap.x·1.3 + ap.y·0.6 + warp)·2π + t·0.25)` ; `pow(max(curtain, 0), 2.5)` l'affine en rideaux ; `rays` ajoute des raies fines ; `hue` choisit entre vert `(0.1, 1, 0.5)` et violet `(0.65, 0.25, 1)`. `uAuroraRed` bascule la palette vers rouge/orange (tempête solaire). La lumière s'ajoute en **indirect** : `indirectDiffuse += diffuseColor.rgb * auroraColor * (auroraLight * uAurora)` avec `auroraLight = AURORA_GLOBAL_TINT (0.1) + curtain·rays·0.55` : un voile léger partout, plus des rideaux brillants.
- Reflets de flaques, givre, verglas : voir [04 · Surfaces](04-surfaces-meteo.md).

## 5. Matériaux sans éclairage : `UNLIT_MATERIALS`

Les sprites (joueur, pokémons) utilisent `MeshBasicMaterial` / `SpriteMaterial`, qui **ignorent** les lumières. `registerUnlitMaterial` les ajoute à l'ensemble `UNLIT_MATERIALS`, mémorise leur couleur d'origine (`userData['unlitBaseColor']`) et active `applyLinearFog`. Chaque frame :

```ts
UNLIT_MATERIALS.forEach(mat => mat.color.copy(this.tmpColor).multiply(mat.userData['unlitBaseColor'] ?? WHITE));
```

`tmpColor` = `unlitTint` (météo/heure) mélangée à l'éclair. Une multiplication de couleurs **simule** l'éclairage : un sprite reste identique à l'ombre ou au soleil, mais prend la teinte bleue de la nuit.

## 6. `patchShadowFilter`

three adoucit les bords d'ombre (PCF) avec un échantillonnage tourné par un bruit d'écran (`interleavedGradientNoise`) : quand l'ombre bouge, ses bords « grésillent ». `patchShadowFilter` remplace, au chargement du module, ce morceau de `THREE.ShaderChunk.shadowmap_pars_fragment` par **4 lectures bilinéaires** sur une grille fixe (`vec2 o = 0.5 * radius;`, moyenne × 0,25). Résultat : sans bruit, et l'ombre évolue continûment quand le soleil bouge. Le patch repère le texte exact de three (`PCF_NOISY`) et affiche un `console.warn` si une mise à jour de three l'a changé.

## 7. `alphaTest` des sprites (`material.service.ts`)

```ts
const TRANSPARENT_ALPHA_TEST = 0.1;
alphaTest: transparent ? TRANSPARENT_ALPHA_TEST : 0,
```

Un sprite transparent est un quad rectangulaire. Sans `alphaTest`, ses pixels vides **écrivent quand même la profondeur** : les particules (pluie, lucioles) dessinées après disparaissent dans un rectangle autour du joueur. Avec `alphaTest = 0.1`, les texels dont l'alpha est inférieur sont `discard`és (pas de profondeur écrite). La valeur est basse pour que les opacités qui s'estompent fonctionnent encore. `getSpriteMaterialFromLink` applique la même constante.

## Expériences à tenter

- `SUNNY` dans `DAY_PRESETS` (`Weather.ts`) : `sunGlow: 3`, regarde les façades. Puis `godRays: 1` pour voir la variation `mix(1 − 0.35·g, 1 + 0.8·g, beam)`.
- Dans `FRAGMENT_BODY`, change `mix(0.72, 0.28, uCloudDensity)` en `mix(0.9, 0.1, …)` : les nuages deviennent soit rares, soit un plafond.
- `LIGHTNING_INTERVAL` à `[0.5, 1]` et `LIGHTNING_SUN` à `2` sous la météo `STORM`.
- `TRANSPARENT_ALPHA_TEST` (`material.service.ts`) à `0` : observe le rectangle autour des sprites derrière lesquels passent des particules. (Remets `0.1` ensuite.)
