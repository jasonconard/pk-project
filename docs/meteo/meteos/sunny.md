# ☀️ Ensoleillé (`sunny`)

> Catégorie **Classiques**. Disponible **le jour seulement** : il n'y a pas d'entrée `SUNNY` dans `NIGHT_PRESETS`, donc la nuit elle devient une nuit neutre. C'est aussi la météo de départ du jeu (`WeatherHelper.weatherType` vaut `SUNNY` à la construction).

## Ce qu'on voit / entend

- Des **rayons de soleil** visibles dans l'air (« god rays »), qui éclairent aussi le sol là où ils tombent.
- Des **reflets brillants** sur les toits et les surfaces lisses.
- Les **façades tournées vers le soleil** prennent une lueur chaude et dorée.
- **Son** : aucune ambiance propre (`sound: false`).

## Les paramètres

Seulement trois valeurs changent par rapport à `DAY_BASE` :

| Paramètre | `DAY_BASE` | Ensoleillé (jour) | Effet |
|---|---|---|---|
| `specular` | 0.3 | **1** | Reflets du soleil à pleine force sur les matériaux brillants. |
| `sunGlow` | 0 | **0.8** | +80 % de lumière directe sur les façades face au soleil, teintée chaude. |
| `godRays` | 0 | **0.5** | Active le post-effet de rayons volumétriques et les taches de lumière au sol. |

Nuit : pas de preset → `NIGHT_PRESETS[NEUTRAL]` (voir [Neutre](neutral.md)).

**Température** : **26 °C** le jour. La valeur de nuit de `TEMPERATURES` (16 °C) n'est jamais utilisée : la boucle qui copie les températures ne parcourt que les presets existants, et la nuit on affiche donc la température de la nuit neutre (12 °C).

## Comment c'est fait

Ensoleillé ne crée aucun objet : tout passe par des uniforms et un post-effet.

- **Reflets** : `uSpecular` multiplie `reflectedLight.directSpecular` dans `FRAGMENT_BODY` (`weather-shader.ts`). Voir [03 · Éclairage et shaders](../concepts/03-eclairage-et-shaders.md).
- **Façades dorées** (`uSunGlow`) : un terme « façade » calculé à partir de la normale monde, voir [03 · Éclairage et shaders](../concepts/03-eclairage-et-shaders.md).
- **Rayons** : deux moitiés qui partagent **le même motif** `beamPattern()` (`BEAM_GLSL`) :
  - dans l'air, le post-effet `GodRaysPass` (ray-marching dans la shadow map), voir [06 · Post-effets](../concepts/06-post-effets.md) ;
  - sur les surfaces, `uBeamLight` éclaircit ou assombrit `directDiffuse` selon qu'on est dans un rayon ou entre deux, voir [03 · Éclairage et shaders](../concepts/03-eclairage-et-shaders.md).
- **Choix du post-effet** : dans `WeatherHelper.renderPostEffects()`, `godRays ≥ 0.01` est testé **avant** le bloom des fenêtres. Au crépuscule, quand le jour ensoleillé se mélange à la nuit neutre, les rayons restent prioritaires jusqu'à ce qu'ils s'éteignent, puis le bloom prend le relais.
- **Aube/crépuscule** : `targetParams()` ajoute `TWILIGHT_SUN_GLOW` (0.35) à `sunGlow` au pic de l'aube ou du crépuscule : les façades sont encore plus dorées quand le soleil est bas. Voir [02 · Jour et nuit](../concepts/02-jour-nuit.md).
- **Flaques** : si des flaques restent d'une pluie précédente, `specular = 1` rend le reflet du soleil (`glint`) bien visible, et elles sèchent vite parce que `litLevel` est élevé. Voir [04 · Surfaces météo](../concepts/04-surfaces-meteo.md).

## Maths et code à retenir

Le terme façade (`FRAGMENT_BODY`, `weather-shader.ts`) :

```glsl
float facade = (1.0 - abs(worldNormal.y)) * smoothstep(0.05, 0.5, dot(worldNormal, uSunDir));
reflectedLight.directDiffuse *= 1.0 + uSunGlow * facade * vec3(1.0, 0.92, 0.75);
```

- `1 − |n.y|` vaut 1 pour un mur vertical, 0 pour un toit plat ou le sol.
- `dot(n, sunDir)` mesure si le mur regarde le soleil.
- On multiplie `directDiffuse`, qui vaut déjà 0 à l'ombre : un mur ombragé ne s'allume jamais.

La lumière dans les rayons (`FRAGMENT_BODY`) :

```glsl
reflectedLight.directDiffuse *= mix(1.0 - 0.35 * uBeamLight, 1.0 + 0.8 * uBeamLight, beam);
```

Avec `godRays = 0.5` : ×0.825 entre les rayons, ×1.4 dans un rayon.

## Expériences à tenter

1. Dans le preset `SUNNY`, mets `godRays: 1.5` : rayons beaucoup plus marqués dans l'air (`RAYS_STRENGTH × intensité` dans `GodRaysPass`) et au sol.
2. Mets `sunGlow: 3` : les façades face au soleil deviennent presque orange. Fais tourner l'heure : la façade éclairée change avec la course du soleil.
3. Dans `GodRaysPass.ts`, baisse `STEPS` de 24 à 6 : les rayons deviennent « en escalier » (moins d'échantillons de ray-marching), et le rendu est plus rapide.
4. Ajoute `[WeatherType.SUNNY]: preset(NIGHT_BASE, { specular: 1 })` dans `NIGHT_PRESETS` : la météo devient disponible la nuit (vérifie dans le catalogue).

## Voir aussi

- [Canicule](heatwave.md) : soleil encore plus fort, avec un post-effet d'ondulations.
- [Pluie de printemps](spring-shower.md) : soleil, rayons et pluie dorée.
- [Neutre](neutral.md) : la base sans effet.
