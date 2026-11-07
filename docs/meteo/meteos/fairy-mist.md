# 🧚 Brume féérique (`fairy-mist`)

> Catégorie **Magie & ciel**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Une **brume rose de rêve** qui ondule comme de l'air chaud.
- **Lumières roses** qui flottent autour des plantes.
- **Son** : aucune ambiance propre (`sound: false`).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.95 | 0.4 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.64 | 0.27 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #ffe4f3 | #8a6aa8 | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #fff0fa | #e2b8ff | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #ffeaf6 | #8c76a6 | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.4 | 0.3 | Force des reflets sur les surfaces brillantes. |
| `sunGlow` | 0 | 0.2 | 0 | Lumière en plus sur les façades face au soleil. |
| `cloudSpeed` | 12 | 6 | 6 | Vitesse des ombres de nuages au sol (unités/s). |
| `lightPulse` | 0 | 0.04 | 0.05 | « Respiration » lente de la lumière. |
| `heatHaze` | 0 | 0.6 | 0.6 | Ondulations de chaleur (post-effet). |
| `fairyLights` | 0 | 1 | 1 | Densité des lumières roses féériques. |
| `fog` | 0 | 0.45 | 0.45 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #ffb0dc | #b06aa0 | Couleur du brouillard. |

**Température** : **20 °C** le jour, **16 °C** la nuit.

## Comment c'est fait

- Style `FAIRY_STYLE` : **280** particules, couleur #ff6fd2 (palette #ffa3e6, #ff4fc0), intensité 1.6, mélange `normal` (restent roses de jour), dérive -0.8 à 1.6, vie 6–12 s, **grandes** (3.2–5), hauteur 1–18, 60 % près des plantes, scintillement 0.8. Voir [08 · Particules](../concepts/08-particules.md).
- `fairyLights: 1`. `heatHaze: 0.6` : la brume ondule (post-effet de chaleur, sans délavage). Voir [06 · Post-effets](../concepts/06-post-effets.md).
- `fog: 0.45` rose #ffb0dc le jour, #b06aa0 la nuit. `lightPulse` 0.04 (nuit : 0.05).
- Les lueurs sont indépendantes de la couleur choisie pour les lucioles (`fairyLights` a son propre helper).

## À retenir

- Jour : ambiant #ffe4f3, soleil #fff0fa, `sunGlow` 0.2. Nuit : ambiant #8a6aa8, soleil #e2b8ff.
- Température : 20 °C le jour, 16 °C la nuit.
- `heatHaze` à 0.6 contre 1 pour la [Canicule](heatwave.md) : ondulations plus douces.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.FAIRY_MIST]` et `NIGHT_PRESETS[WeatherType.FAIRY_MIST]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.FAIRY_MIST]` dans `weather-catalog.ts`.
- Style : `FAIRY_STYLE` dans `GlowParticles.ts`.
- Capture day : `src/assets/weather/fairy-mist-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/fairy-mist-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Passe `heatHaze` à 0 : brume rose immobile.
2. Mets `fairyLights: 1` avec `size` doublé : lanternes féériques.
3. Remplace `fogColor` par #b0e0ff : brume bleu glacier.

## Voir aussi

- [Poussière d'étoiles](stardust.md) : poussières dorées et violettes.
- [Lucioles](fireflies.md) : lucioles.
- [Spores](spores.md) : lumières vertes.
