# 🧊 Gel (`frost`)

> Catégorie **Froid**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Un froid sec et clair : le **givre s'étend lentement** sur l'herbe, les toits puis les murs.
- Cristaux qui scintillent ; les flaques gèlent.
- Craquements de glace.
- **Son** : craquements de glace (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.95 | 0.46 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.66 | 0.3 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #dce8ff | #6a84c0 | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #fff4e8 | #b3c4ff | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #e2ecff | #7488b4 | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.6 | 0.6 | Force des reflets sur les surfaces brillantes. |
| `cloudSpeed` | 12 | 4 | 12 | Vitesse des ombres de nuages au sol (unités/s). |
| `frost` | 0 | 1 | 1 | Givre qui gagne peu à peu tout. |
| `fog` | 0 | 0.2 | 0.2 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #e0eaf8 | #34446c | Couleur du brouillard. |

**Température** : **-6 °C** le jour, **-12 °C** la nuit.

## Comment c'est fait

- `frost: 1` : la couverture de givre progresse en **45 s** (`FROST_SPREAD_TIME`) et fond en **30 s** (`FROST_MELT_TIME`). Voir [04 · Surfaces météo](../concepts/04-surfaces-meteo.md).
- Brume légère : `fog` 0.2 (#e0eaf8 le jour, #34446c la nuit).
- `specular: 0.6` : surfaces gelées plus brillantes. `cloudSpeed` 4 : ombres presque immobiles. Pas de nuages (`cloudCover` 0).

## À retenir

- Température : -6 °C le jour, -12 °C la nuit.
- Jour : `litLevel` 0.95, `shadowLevel` 0.66, soleil #fff4e8 : lumière claire et froide.
- Nuit : `litLevel` 0.46, `shadowLevel` 0.3, ambiant bleu #6a84c0.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.FROST]` et `NIGHT_PRESETS[WeatherType.FROST]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.FROST]` dans `weather-catalog.ts`.
- Constantes : `FROST_SPREAD_TIME`, `FROST_MELT_TIME` dans `WeatherHelper.ts`.
- Capture day : `src/assets/weather/frost-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/frost-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Passe `FROST_SPREAD_TIME` à 8 : le givre recouvre tout en quelques secondes.
2. Mets `frost: 0.5` : la couverture n'atteint que la moitié de sa force.
3. Combine avec `snow: 0.5` : neige légère sur un sol givré.

## Voir aussi

- [Pluie verglaçante](freezing-rain.md) : verglas progressif avec pluie.
- [Neige](snow.md) : neige.
- [Aurore](aurora.md) : nuit claire et froide.
