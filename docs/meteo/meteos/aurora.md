# 🌌 Aurore (`aurora`)

> Catégorie **Magie & ciel**. Disponible **la nuit seulement** : il n'y a pas d'entrée dans `DAY_PRESETS`, le jour elle devient neutre.

## Ce qu'on voit / entend

- Une **nuit claire** éclairée par des **voiles d'aurore** vert et violet qui ondulent sur le sol et les toits.
- La lune tire légèrement sur le vert (#a8e0d0).
- **Son** : aucune ambiance propre (`sound: false`).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | – | 0.4 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | – | 0.24 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | – | #5f7fae | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | – | #a8e0d0 | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | – | #6f8faa | Teinte des sprites non éclairés (joueur, pokémons). |
| `aurora` | 0 | – | 1 | Force des rideaux d'aurore. |

**Température** : **-8 °C** la nuit. La valeur de jour (-6 °C) n'est jamais utilisée : la boucle de `Weather.ts` ne copie les températures que dans les presets existants.

## Comment c'est fait

- `aurora: 1` : le shader ajoute la lumière des rideaux sur les surfaces. Voir [03 · Éclairage et shaders](../concepts/03-eclairage-et-shaders.md) (section aurore) et [07 · Bruit procédural](../concepts/07-bruit-procedural.md).
- Aucune particule, aucun helper : tout est dans les uniforms (`uAurora`).
- Nuit : `litLevel` 0.4, `shadowLevel` 0.24, ambiant #5f7fae, `unlitTint` #6f8faa.

## À retenir

- **Nuit seulement** : pas de preset de jour, la météo est indisponible le jour.
- Température : -8 °C la nuit (-6 °C le jour n'est jamais utilisé).
- Pas de brouillard, pas de nuages, pas de vent forcé : seule la lumière change.
- Les autres paramètres restent ceux de `NIGHT_BASE` (`windowGlow` 1, `specular` 0.4, `fogColor` #939eb3).

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.AURORA]` et `NIGHT_PRESETS[WeatherType.AURORA]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.AURORA]` dans `weather-catalog.ts`.
- Uniforms `uAurora`, `uAuroraRed` mis à jour dans `WeatherHelper`.
- Le shader qui lit ces uniforms : `weather-shader.ts`.
- Capture night : `src/assets/weather/aurora-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Passe `aurora` à 3 : valeur utilisée par la [Tempête solaire](solar-storm.md) de jour.
2. Mets `auroraRed: 1` : l'aurore devient rouge.
3. Retire `aurora` (0) : on retombe sur la nuit neutre teintée.

## Voir aussi

- [Tempête solaire](solar-storm.md) : aurores rouges et interférences.
- [Poussière d'étoiles](stardust.md) : autres couleurs dans le ciel.
- [Gel](frost.md) : froid et clair.
