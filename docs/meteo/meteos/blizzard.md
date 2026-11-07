# 🌨️ Blizzard (`blizzard`)

> Catégorie **Froid**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Une **tempête de neige** : flocons soufflés presque à l'horizontale, brume blanche, presque aucune visibilité.
- Un vent violent qui hurle.
- **Son** : hurlements du vent (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.85 | 0.4 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.72 | 0.32 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #e4ecf8 | #7888b4 | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #f0f4ff | #b3c4ff | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #e2eaf6 | #7a86aa | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.1 | 0.1 | Force des reflets sur les surfaces brillantes. |
| `cloudCover` | 0 | 0.85 | 0.7 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudAmbient` | 0 | 0.15 | 0.1 | Part dont les nuages assombrissent aussi l'ambiant (ombres de nuages plus contrastées). |
| `cloudSpeed` | 12 | 40 | 40 | Vitesse des ombres de nuages au sol (unités/s). |
| `snow` | 0 | 1.8 | 1.8 | Densité de la neige (2 = blizzard). |
| `snowDrift` | 1 | 3.5 | 3.5 | À quel point le vent emporte les flocons. |
| `minWind` | 0 | 0.95 | 0.95 | Vent minimal imposé, quelle que soit la jauge. |
| `fog` | 0 | 1 | 1 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #dce3ec | #8c98b8 | Couleur du brouillard. |

**Température** : **-14 °C** le jour, **-19 °C** la nuit.

## Comment c'est fait

- `snow: 1.8` (3600 flocons, max du `SnowHelper` : 4000) et `snowDrift: 3.5` : le vent emporte 3.5 fois plus les flocons. Voir [08 · Particules](../concepts/08-particules.md).
- `minWind: 0.95` : vent minimal quasi maximal, imposé dans la direction choisie, quelle que soit la jauge. Voir [11 · Vent](../concepts/11-vent.md).
- `fog: 1` : brouillard maximal (#dce3ec le jour, #8c98b8 la nuit). Voir [05 · Brouillard et ténèbres](../concepts/05-brouillard-et-tenebres.md).
- `cloudCover` 0.85 le jour (0.7 la nuit), `cloudSpeed` **40**.
- Comme la [Neige](snow.md), `snowCover` grimpe tant qu'il neige, un peu plus vite (vitesse proportionnelle à `snow`). Voir [04 · Surfaces météo](../concepts/04-surfaces-meteo.md).

## À retenir

- Température la plus basse : -14 °C le jour, -19 °C la nuit.
- Jour : `litLevel` 0.85 et `shadowLevel` **0.72**, le plus élevé : quasiment pas d'ombre.
- Nuit : `litLevel` 0.4, `shadowLevel` 0.32.
- Les hurlements du vent sont proportionnels à la force du vent. Voir [10 · Audio](../concepts/10-audio.md).

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.BLIZZARD]` et `NIGHT_PRESETS[WeatherType.BLIZZARD]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.BLIZZARD]` dans `weather-catalog.ts`.
- Dérive : paramètre `snowDrift` passé à `SnowHelper.update`.
- Capture day : `src/assets/weather/blizzard-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/blizzard-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Baisse `fog` à 0.4 : on voit la neige filer sur de longues distances.
2. Passe `snowDrift` à 8 : flocons parfaitement horizontaux.
3. Mets `minWind: 0` : le vent suit la jauge, la tempête se calme si elle est à 0.

## Voir aussi

- [Neige](snow.md) : la neige calme.
- [Tempête de sable](sandstorm.md) : tempête forcée de sable.
- [Gel](frost.md) : froid sec et clair.
