# 💀 Pluie de mort (`blood-rain`)

> Catégorie **Sombre & surnaturel**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- **Il pleut du sang** : gouttes sombres, sol et flaques teintés de rouge.
- Éclairs **rouges**.
- Ciel sombre à reflets rouges, brume rouge sombre.
- **Son** : pluie et orage (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.7 | 0.32 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.5 | 0.2 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #c8a8a8 | #7a4a56 | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #f0c4c0 | #d08a90 | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #d0b0b0 | #7c5460 | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.2 | 0.2 | Force des reflets sur les surfaces brillantes. |
| `cloudCover` | 0 | 0.75 | 0.6 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudAmbient` | 0 | 0.15 | 0.15 | Part dont les nuages assombrissent aussi l'ambiant (ombres de nuages plus contrastées). |
| `cloudSpeed` | 12 | 25 | 25 | Vitesse des ombres de nuages au sol (unités/s). |
| `bloodRain` | 0 | 0.8 | 0.8 | Densité de la pluie de sang. |
| `lightning` | 0 | 0.6 | 0.6 | Fréquence des éclairs. |
| `lightningColor` | #e4ecff | #ff2a22 | #ff2a22 | Couleur des éclairs. |
| `fog` | 0 | 0.3 | 0.35 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #8a5458 | #4a2228 | Couleur du brouillard. |
| `windowGlow` | 0 | 0 | 0.6 | Force des fenêtres allumées. |
| `windowTint` | #ffffff | #ffffff | #ff8070 | Teinte des fenêtres. |

**Température** : **12 °C** le jour, **8 °C** la nuit.

## Comment c'est fait

- Style `BLOOD_RAIN_STYLE` : dérivé de `RAIN_STYLE` avec **1800** gouttes max, vitesse 380, longueur 6, largeur 0.5, couleur #a0141c, opacité 0.9, `followLight: true`, éclaboussures #7a0a0e. Voir [08 · Particules](../concepts/08-particules.md).
- `bloodRain: 0.8` (jour et nuit). `lightning: 0.6` avec `lightningColor` #ff2a22 : même mécanique que l'orage, en rouge. Voir [03 · Éclairage et shaders](../concepts/03-eclairage-et-shaders.md).
- **Taches** : tant qu'il pleut du sang, les flaques et le sol prennent la couleur du sang ; une pluie d'eau les lave. Voir [04 · Surfaces météo](../concepts/04-surfaces-meteo.md).
- `fog: 0.3` #8a5458 le jour, 0.35 #4a2228 la nuit. `cloudCover` 0.75 (0.6 la nuit), `cloudSpeed` 25.

## À retenir

- Jour : ambiant #c8a8a8, soleil #f0c4c0, `litLevel` 0.7, `shadowLevel` 0.5. Nuit : ambiant #7a4a56, `windowGlow` 0.6 teinté #ff8070.
- Température : 12 °C le jour, 8 °C la nuit.
- Pour l'audio, la pluie de sang compte dans le niveau `rain` commun (`rain + bloodRain + poisonRain + …`, plafonné à 1). Voir [10 · Audio](../concepts/10-audio.md).

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.BLOOD_RAIN]` et `NIGHT_PRESETS[WeatherType.BLOOD_RAIN]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.BLOOD_RAIN]` dans `weather-catalog.ts`.
- Style : `BLOOD_RAIN_STYLE` dans `RainHelper.ts` ; couleurs de taches : constantes en tête de `WeatherHelper.ts`.
- Capture day : `src/assets/weather/blood-rain-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/blood-rain-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Mets `bloodRain: 1` : plus de gouttes, flaques plus vite rouges.
2. Passe `lightningColor` à #ffffff : éclairs normaux sur pluie de sang.
3. Mets `lightning: 0` : pluie rouge silencieuse, sans éclairs.

## Voir aussi

- [Climat empoisonné](poison.md) : même principe avec une pluie violette.
- [Pluvieux](rainy.md) : pluie d'eau.
- [Lune de sang](blood-moon.md) : lune rouge sans pluie.
