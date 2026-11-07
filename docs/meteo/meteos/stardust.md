# 🌠 Poussière d'étoiles (`stardust`)

> Catégorie **Magie & ciel**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Des **poussières dorées et violettes** flottent lentement dans l'air.
- Les reflets des toits prennent des **couleurs irisées**.
- Clochettes discrètes.
- **Son** : clochettes discrètes (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.96 | 0.42 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.62 | 0.26 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #f0e6ff | #6a5aa0 | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #fff4ec | #d0c0ff | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #f4ecff | #7468a4 | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 1.3 | 1.2 | Force des reflets sur les surfaces brillantes. |
| `sunGlow` | 0 | 0.3 | 0 | Lumière en plus sur les façades face au soleil. |
| `cloudSpeed` | 12 | 6 | 12 | Vitesse des ombres de nuages au sol (unités/s). |
| `iridescence` | 0 | 1 | 1 | Irisation arc-en-ciel sur les surfaces brillantes. |
| `stardust` | 0 | 1 | 1 | Poussières dorées/violettes qui flottent. |
| `fog` | 0 | 0.15 | 0.15 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #e4d4f4 | #3a2c5c | Couleur du brouillard. |

**Température** : **18 °C** le jour, **12 °C** la nuit.

## Comment c'est fait

- Style `STARDUST_STYLE` : **480** particules, couleur #ffc840 (palette #c890ff, #fff2c0, #90b0ff), intensité 1.6, mélange `normal`, dérive de -1 à 1.5, balancement 4, vie 7–13 s, taille 2.6–4.2, hauteur 2–40, scintillement 0.6 à vitesse 4. Voir [08 · Particules](../concepts/08-particules.md).
- `stardust: 1` ; `iridescence: 1` : sheen arc-en-ciel sur les surfaces brillantes. Voir [04 · Surfaces météo](../concepts/04-surfaces-meteo.md).
- `specular` **1.3** le jour (1.2 la nuit) : l'irisation se voit sur les surfaces brillantes, comme les toits. Voir [03 · Éclairage et shaders](../concepts/03-eclairage-et-shaders.md).
- Clochettes : `chimes = stardust × STARDUST_CHIMES` (0.3), plus discrètes que la [Neige magique](magic-snow.md).

## À retenir

- Jour : ambiant violet clair #f0e6ff, `litLevel` 0.96. Nuit : ambiant #6a5aa0, soleil #d0c0ff.
- Brume : `fog` 0.15 (#e4d4f4 le jour, #3a2c5c la nuit).
- Température : 18 °C le jour, 12 °C la nuit.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.STARDUST]` et `NIGHT_PRESETS[WeatherType.STARDUST]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.STARDUST]` dans `weather-catalog.ts`.
- Style : `STARDUST_STYLE` dans `GlowParticles.ts`.
- Capture day : `src/assets/weather/stardust-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/stardust-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Mets `iridescence: 0` : les toits perdent leurs reflets irisés.
2. Passe `size` à `[6, 9]` : de grosses étoiles floues.
3. Mets `specular: 0.3` : l'irisation devient presque invisible.

## Voir aussi

- [Neige magique](magic-snow.md) : étincelles bleues qui tombent.
- [Brume féérique](fairy-mist.md) : brume rose et lumières.
- [Aurore](aurora.md) : nuit colorée.
