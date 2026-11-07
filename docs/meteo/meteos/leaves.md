# 🍂 Feuilles (`leaves`)

> Catégorie **Nature**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Des **feuilles d'automne** (ou des **pétales de cerisier**) tombent en virevoltant et se posent un moment au sol.
- Lumière dorée douce.
- **Son** : aucune ambiance propre (`sound: false`).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 1.02 | 0.45 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.62 | 0.26 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #fff4e6 | #6d7fb3 | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #ffebcc | #b3c4ff | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #fff6ea | #707ea8 | Teinte des sprites non éclairés (joueur, pokémons). |
| `sunGlow` | 0 | 0.3 | 0 | Lumière en plus sur les façades face au soleil. |
| `cloudCover` | 0 | 0.25 | 0 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudAmbient` | 0 | 0.05 | 0 | Part dont les nuages assombrissent aussi l'ambiant (ombres de nuages plus contrastées). |
| `cloudSpeed` | 12 | 10 | 12 | Vitesse des ombres de nuages au sol (unités/s). |
| `leaves` | 0 | 1 | 1 | Densité de feuilles/pétales qui tombent. |

**Température** : **14 °C** le jour, **9 °C** la nuit.

## Comment c'est fait

- `LeafHelper.ts` : **450** feuilles max, apparition à **18–55** de haut, chute **6–12** unités/s, vent à pleine force 45, balancement 3 (vitesse 1.8), 60 % près des plantes, repos au sol de **3 à 7 s** puis rétrécissement en 0.8 s. Voir [08 · Particules](../concepts/08-particules.md).
- Deux modes (`LEAF_MODES`) : `autumn` (#d9822b, #c4452b, #e6b33d, #b5562a, #9a6b2f, #8fb040) et `cherry` (#ffc0dc, #ffadd2, #ffd9ea, #ff9ac6, #fff0f6). Le mode se règle dans le panneau (`setMode`).
- `leaves: 1` : densité maximale. Le vent de la jauge les pousse. Voir [11 · Vent](../concepts/11-vent.md).
- Jour : `litLevel` 1.02, ambiant #fff4e6, soleil #ffebcc, `sunGlow` 0.3, `cloudCover` 0.25, `cloudSpeed` 10.

## À retenir

- Nuit : preset minimal, `NIGHT_BASE` + `leaves: 1` seulement : la lumière reste celle d'une nuit neutre.
- Température : 14 °C le jour, 9 °C la nuit.
- Les feuilles ont leur propre helper (`LeafHelper`, pas `GlowParticles`) : elles se posent au sol et leur forme est dessinée sur un canvas (`makeLeafTexture`).

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.LEAVES]` et `NIGHT_PRESETS[WeatherType.LEAVES]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.LEAVES]` dans `weather-catalog.ts`.
- Feuilles : `LeafHelper.ts` (`LEAF_PALETTES`, `LEAF_MODES` dans `Weather.ts`).
- Capture day : `src/assets/weather/leaves-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/leaves-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Passe en mode `cherry` : pétales roses à la place des feuilles d'automne.
2. Mets `MAX_LEAVES` à 1500 dans `LeafHelper.ts` : une vraie bourrasque de feuilles.
3. Passe `REST_TIME` à `[20, 30]` : les feuilles s'accumulent bien plus longtemps au sol.

## Voir aussi

- [Vent de pétales](petal-whirl.md) : tourbillons de pétales.
- [Forêt](forest.md) : feuillage et pollen.
- [Nuageux](cloudy.md) : ciel couvert.
