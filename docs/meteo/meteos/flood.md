# 🌊 Inondation (`flood`)

> Catégorie **Pluie & tempêtes**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Une **grosse pluie**, et l'eau **monte lentement** au-dessus du sol jusqu'à tout recouvrir.
- Chaque pas éclabousse ; l'eau se retire ensuite quand la météo change.
- Clapotis de l'eau.
- **Son** : pluie et clapotis, pas dans l'eau partout (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.72 | 0.32 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.58 | 0.22 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #c0cad8 | #5a6a94 | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #e0e8f4 | #b3c4ff | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #c4ccda | #5e6a90 | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.2 | 0.2 | Force des reflets sur les surfaces brillantes. |
| `cloudCover` | 0 | 0.85 | 0.6 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudAmbient` | 0 | 0.15 | 0 | Part dont les nuages assombrissent aussi l'ambiant (ombres de nuages plus contrastées). |
| `cloudSpeed` | 12 | 30 | 30 | Vitesse des ombres de nuages au sol (unités/s). |
| `rain` | 0 | 0.8 | 0.8 | Densité de la pluie. |
| `flood` | 0 | 1 | 1 | Niveau d'eau qui monte. |
| `fog` | 0 | 0.2 | 0.2 | Épaisseur du brouillard. |
| `windowGlow` | 0 | 0 | 0.6 | Force des fenêtres allumées. |

**Température** : **14 °C** le jour, **11 °C** la nuit.

## Comment c'est fait

- `rain: 0.8` avec `RAIN_STYLE` (voir [Pluvieux](rainy.md)) et `flood: 1`.
- Un plan d'eau (`FloodHelper.ts`) de **1400** unités de côté suit la cible de la caméra : niveau maximal **4** au-dessus du sol, montée **0.12** unité/s, descente **0.2** unité/s, couleur #3d6f8e, opacité 0.62. Voir [09 · Effets spéciaux](../concepts/09-effets-speciaux.md).
- Le niveau d'eau est calculé par rapport à la hauteur du sol sous la cible (`surfaces.heightAt`). Quand l'eau dépasse un seuil (`FLOOD_STEPS`), les pas se font dans l'eau : voir [04 · Surfaces météo](../concepts/04-surfaces-meteo.md).
- Le ciel reflété dans l'eau dépend de la lumière : bleu si la journée est claire, couleur de l'ambiant sous les nuages ou la nuit.
- Ciel : `cloudCover` 0.85 (0.6 la nuit), `cloudSpeed` 30, `fog` 0.2.

## À retenir

- Au niveau 4 en montée à 0.12/s, il faut une trentaine de secondes pour atteindre le maximum ; la descente à 0.2/s est plus rapide.
- Le son de clapotis est proportionnel à la profondeur : `lapping = min(depth × 1.5, 1) × 0.5` dans `audio.update`.
- Jour : `litLevel` 0.72, `shadowLevel` 0.58, `specular` 0.2.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.FLOOD]` et `NIGHT_PRESETS[WeatherType.FLOOD]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.FLOOD]` dans `weather-catalog.ts`.
- Plan d'eau : `FloodHelper.ts` (constantes `MAX_LEVEL`, `RISE_SPEED`, `RECEDE_SPEED`).
- Capture day : `src/assets/weather/flood-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/flood-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Passe `MAX_LEVEL` à 8 dans `FloodHelper.ts` : l'eau monte bien au-dessus des toits bas.
2. Double `RISE_SPEED` : l'inondation arrive deux fois plus vite.
3. Mets `rain: 0` : l'eau monte quand même, car elle ne dépend que de `flood`.

## Voir aussi

- [Pluvieux](rainy.md) : la pluie seule, sans montée des eaux.
- [Orage](storm.md) : pluie maximale avec éclairs.
- [Brume marine](sea-mist.md) : univers marin plus calme.
