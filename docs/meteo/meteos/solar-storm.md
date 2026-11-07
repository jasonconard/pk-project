# ☀️ Tempête solaire (`solar-storm`)

> Catégorie **Magie & ciel**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Des **aurores rouges en plein jour**.
- La lumière **baisse par à-coups**, les fenêtres clignotent, la radio **grésille**.
- **Son** : grésillements de radio (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.92 | 0.42 | Luminosité du sol au soleil. |
| `ambientColor` | #ffffff | #ffe0d8 | #8a5a6a | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #fff0e0 | #ffb0a0 | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #ffe8e0 | #8c6470 | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.6 | 0.5 | Force des reflets sur les surfaces brillantes. |
| `sunGlow` | 0 | 0.3 | 0 | Lumière en plus sur les façades face au soleil. |
| `cloudSpeed` | 12 | 8 | 12 | Vitesse des ombres de nuages au sol (unités/s). |
| `aurora` | 0 | 3 | 1 | Force des rideaux d'aurore. |
| `auroraRed` | 0 | 1 | 1 | Aurore virée au rouge (0 = vert/violet). |
| `flicker` | 0 | 1 | 1 | Interférences : creux de lumière, fenêtres qui clignotent, grésillements. |

**Température** : **23 °C** le jour, **15 °C** la nuit.

## Comment c'est fait

- `aurora` à **3** le jour et **1** la nuit, avec `auroraRed: 1` : rideaux entièrement rouges. Voir [03 · Éclairage et shaders](../concepts/03-eclairage-et-shaders.md).
- `flicker: 1` : creux de lumière aléatoires espacés de **0.4 à 3 s** (`DIP_INTERVAL`), fenêtres qui clignotent, grésillement radio. Voir [03 · Éclairage et shaders](../concepts/03-eclairage-et-shaders.md) (dips) et [10 · Audio](../concepts/10-audio.md).
- `specular` 0.6 (0.5 la nuit), `sunGlow` 0.3, `cloudSpeed` 8.
- Jour : ambiant rosé #ffe0d8, soleil #fff0e0 ; nuit : ambiant #8a5a6a, soleil #ffb0a0.

## À retenir

- Le niveau « static » de l'audio est directement `flicker`. Voir [10 · Audio](../concepts/10-audio.md).
- Température : 23 °C le jour, 15 °C la nuit.
- Pas de brouillard ni de précipitation : l'effet vient uniquement de la lumière.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.SOLAR_STORM]` et `NIGHT_PRESETS[WeatherType.SOLAR_STORM]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.SOLAR_STORM]` dans `weather-catalog.ts`.
- Creux de lumière : `updateDips` dans `WeatherHelper.ts`.
- Capture day : `src/assets/weather/solar-storm-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/solar-storm-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Passe `flicker` à 0.3 : creux plus rares et plus discrets.
2. Mets `auroraRed: 0` : l'aurore redevient verte, en plein jour.
3. Monte `aurora` à 6 le jour : aurore très lumineuse.

## Voir aussi

- [Aurore](aurora.md) : la version calme, de nuit.
- [Champ électrique](electric.md) : autre ambiance de courant et de crépitements.
- [Poussière d'étoiles](stardust.md) : magie du ciel.
