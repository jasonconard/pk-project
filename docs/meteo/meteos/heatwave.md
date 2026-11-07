# 🔥 Canicule (`heatwave`)

> Catégorie **Chaleur & feu**. Disponible **le jour seulement** : il n'y a pas d'entrée dans `NIGHT_PRESETS`, la nuit elle devient une nuit neutre.

## Ce qu'on voit / entend

- Un **soleil écrasant** : l'air **ondule** au-dessus du sol.
- Couleurs **délavées** et chaudes, lumière orangée.
- Reflets forts, façades tournées vers le soleil réchauffées.
- **Son** : aucune ambiance propre (`sound: false`).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 1.12 | – | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.68 | – | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #ffe6c8 | – | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #ffd9a0 | – | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #fff0dc | – | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.9 | – | Force des reflets sur les surfaces brillantes. |
| `sunGlow` | 0 | 0.6 | – | Lumière en plus sur les façades face au soleil. |
| `cloudSpeed` | 12 | 4 | – | Vitesse des ombres de nuages au sol (unités/s). |
| `heatHaze` | 0 | 1 | – | Ondulations de chaleur (post-effet). |
| `heatWash` | 0 | 1 | – | Couleurs chaudes délavées (post-effet). |
| `fog` | 0 | 0.18 | – | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #f3dcb8 | – | Couleur du brouillard. |

**Température** : **42 °C** le jour. La valeur de nuit (30 °C) n'est jamais utilisée : la boucle de `Weather.ts` ne copie les températures que dans les presets existants.

## Comment c'est fait

- Deux post-effets pilotés par `heatHaze: 1` (ondulations) et `heatWash: 1` (couleurs délavées), rendus par `HeatHazePass.ts` après les rayons ou le bloom. Voir [06 · Post-effets](../concepts/06-post-effets.md).
- Dans `renderPostEffects()`, le passage de chaleur est appliqué **dès que** `heatHaze ≥ 0.01` ou `heatWash ≥ 0.01`.
- `heatWash` intervient aussi dans la clarté du ciel reflété : `sun = clamp(litLevel, 0.3, 1.2) × (1 + 2 × heatWash)` (`WeatherHelper`).
- Lumière : `litLevel` **1.12** (le plus haut), ambiant #ffe6c8, soleil #ffd9a0, `specular` 0.9, `sunGlow` 0.6. Voir [03 · Éclairage et shaders](../concepts/03-eclairage-et-shaders.md).
- `cloudSpeed` 4 (ombres quasi figées, pas de nuages). Légère brume chaude : `fog` 0.18 (#f3dcb8).

## À retenir

- **Jour seulement** : pas de preset de nuit, la nuit devient neutre.
- Température la plus haute des météos « normales » : 42 °C (seule [Volcanique](volcanic.md) fait plus, 48 °C).
- Pas de rayons ni de bloom propres : seule la chaleur se rend ici.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.HEATWAVE]` et `NIGHT_PRESETS[WeatherType.HEATWAVE]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.HEATWAVE]` dans `weather-catalog.ts`.
- Post-effet : `HeatHazePass.ts` ; choix des passes dans `WeatherHelper.renderPostEffects()`.
- Capture day : `src/assets/weather/heatwave-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Mets `heatHaze: 2` : ondulations très marquées.
2. Garde `heatHaze: 1` mais `heatWash: 0` : l'air ondule sans délavage des couleurs.
3. Passe `sunGlow` à 2 : les murs face au soleil virent à l'orange vif.

## Voir aussi

- [Ensoleillé](sunny.md) : un soleil plus sobre, avec des rayons.
- [Volcanique](volcanic.md) : chaleur avec braises et brume.
- [Tempête de sable](sandstorm.md) : chaleur et sable.
