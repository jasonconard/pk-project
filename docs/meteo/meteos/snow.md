# ❄️ Neige (`snow`)

> Catégorie **Froid**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Des **flocons tombent doucement** et la neige s'accumule sur les toits et le sol.
- Ciel blanc couvert, lumière diffuse, ombres douces.
- Les pas crissent dans la neige.
- **Son** : aucune ambiance propre (`sound: false`).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.95 | 0.47 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.68 | 0.3 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #e6edf8 | #7486b8 | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #f4f8ff | #b3c4ff | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #e8eef8 | #7884ac | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.2 | 0.2 | Force des reflets sur les surfaces brillantes. |
| `cloudCover` | 0 | 0.4 | 0.4 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudAmbient` | 0 | 0.1 | 0.1 | Part dont les nuages assombrissent aussi l'ambiant (ombres de nuages plus contrastées). |
| `cloudSpeed` | 12 | 8 | 8 | Vitesse des ombres de nuages au sol (unités/s). |
| `snow` | 0 | 1 | 1 | Densité de la neige (2 = blizzard). |

**Température** : **-4 °C** le jour, **-10 °C** la nuit.

## Comment c'est fait

- `SnowHelper.ts` : **2000** flocons par unité de `snow` (max 4000), chute **22–42** unités/s (bien plus lent que la pluie), taille 0.6–1.4, balancement de 2.5, vent 60 à pleine force. Voir [08 · Particules](../concepts/08-particules.md).
- `snow: 1` : 2000 flocons. Tant qu'il neige, `snowCover` grimpe (`SNOW_ACCUMULATION_TIME` = 40 s pour tout recouvrir) et le shader blanchit les surfaces tournées vers le haut. Voir [04 · Surfaces météo](../concepts/04-surfaces-meteo.md).
- `cloudCover` 0.4, `cloudAmbient` 0.1, `cloudSpeed` 8. Pas de brouillard.

## À retenir

- La neige **renvoie la lumière** : le jour `litLevel` 0.95 et `shadowLevel` 0.68 (ombres peu marquées) ; la nuit `litLevel` 0.47 et `shadowLevel` 0.3, soit plus clair que la nuit neutre (0.45).
- La nuit seul l'ambiant (#7486b8), `unlitTint` et quelques valeurs changent ; `sunColor` reste celle de la base nocturne.
- Pas de son propre (`sound: false`) : le crissement des pas vient de la surface.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.SNOW]` et `NIGHT_PRESETS[WeatherType.SNOW]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.SNOW]` dans `weather-catalog.ts`.
- Flocons : `SnowHelper.ts` ; accumulation : `SNOW_ACCUMULATION_TIME` dans `WeatherHelper.ts`.
- Capture day : `src/assets/weather/snow-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/snow-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Mets `snow: 2` : tu obtiens la densité d'un blizzard, mais sans vent fort.
2. Mets `snowDrift: 3` : les flocons partent presque à l'horizontale.
3. Baisse `SNOW_ACCUMULATION_TIME` à 5 : les toits blanchissent presque tout de suite.

## Voir aussi

- [Blizzard](blizzard.md) : neige poussée par un vent violent.
- [Neige magique](magic-snow.md) : neige légère et étincelles bleues.
- [Gel](frost.md) : froid clair sans neige.
