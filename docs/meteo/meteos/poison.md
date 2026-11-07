# ☠️ Climat empoisonné (`poison`)

> Catégorie **Sombre & surnaturel**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Un **climat empoisonné** : grosse brume violette, pluie violette, **flaques toxiques**.
- L'air étouffant **ondule**.
- Des bulles éclatent.
- **Son** : bulles toxiques (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.78 | 0.36 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.56 | 0.24 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #c8a8e0 | #6e4a96 | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #e0c4ff | #b88aff | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #d0b4e4 | #7a5a9c | Teinte des sprites non éclairés (joueur, pokémons). |
| `cloudCover` | 0 | 0.5 | 0.4 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudAmbient` | 0 | 0.1 | 0 | Part dont les nuages assombrissent aussi l'ambiant (ombres de nuages plus contrastées). |
| `cloudSpeed` | 12 | 6 | 6 | Vitesse des ombres de nuages au sol (unités/s). |
| `lightPulse` | 0 | 0.06 | 0.08 | « Respiration » lente de la lumière. |
| `heatHaze` | 0 | 1 | 1 | Ondulations de chaleur (post-effet). |
| `poisonRain` | 0 | 0.6 | 0.6 | Densité de la pluie toxique. |
| `fog` | 0 | 0.8 | 0.8 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #9a62c8 | #4a2a6e | Couleur du brouillard. |
| `specular` | 0.3 | 0.3 | 0.3 | Force des reflets sur les surfaces brillantes. |
| `windowGlow` | 0 | 0 | 0.6 | Force des fenêtres allumées. |
| `windowTint` | #ffffff | #ffffff | #d090ff | Teinte des fenêtres. |

**Température** : **29 °C** le jour, **24 °C** la nuit.

## Comment c'est fait

- Style `POISON_RAIN_STYLE` : **2000** gouttes max, vitesse 340, longueur 6, largeur 0.45, couleur #a64cf0, opacité 0.85, éclaboussures #6a2aa0. Voir [08 · Particules](../concepts/08-particules.md).
- `poisonRain: 0.6`. Les flaques prennent la teinte du poison tant qu'il pleut ; l'eau d'une pluie normale les lave. Voir [04 · Surfaces météo](../concepts/04-surfaces-meteo.md).
- `heatHaze: 1` : ondulations de l'air (sans délavage). Voir [06 · Post-effets](../concepts/06-post-effets.md).
- `fog: 0.8` violet #9a62c8 le jour, #4a2a6e la nuit : voir [05 · Brouillard et ténèbres](../concepts/05-brouillard-et-tenebres.md). `lightPulse` 0.06 (nuit : 0.08).
- Nuit : fenêtres teintées #d090ff (`windowGlow` 0.6).

## À retenir

- Température : 29 °C le jour, 24 °C la nuit, la plus chaude des météos de pluie.
- Jour : ambiant #c8a8e0, soleil #e0c4ff, `litLevel` 0.78.
- `cloudSpeed` 6 : les ombres de nuages bougent à peine.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.POISON]` et `NIGHT_PRESETS[WeatherType.POISON]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.POISON]` dans `weather-catalog.ts`.
- Style : `POISON_RAIN_STYLE` dans `RainHelper.ts`.
- Capture day : `src/assets/weather/poison-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/poison-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Passe `poisonRain` à 1 : pluie plus dense et flaques plus vite violettes.
2. Mets `heatHaze: 0` : brume violette sans ondulations.
3. Change `color` en #50ff50 dans `POISON_RAIN_STYLE` : pluie acide verte.

## Voir aussi

- [Pluie de mort](blood-rain.md) : pluie rouge.
- [Spores](spores.md) : air toxique vert, avec spores.
- [Brume hantée](haunted.md) : brume épaisse sombre.
