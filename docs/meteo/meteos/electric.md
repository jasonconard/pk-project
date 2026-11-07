# ⚡ Champ électrique (`electric`)

> Catégorie **Magie & ciel**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- L'air est chargé : de petits **arcs électriques** crépitent sur les toits et le métal.
- Lumière froide bleutée et légère brume bleue.
- On les entend grésiller quand on passe près.
- **Son** : crépitements de proximité (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.9 | 0.36 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.58 | 0.24 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #d9e4ff | #5f74b8 | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #eef3ff | #a8c0ff | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #e2eaff | #6a7cb0 | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 1 | 0.8 | Force des reflets sur les surfaces brillantes. |
| `cloudCover` | 0 | 0.45 | 0.4 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudAmbient` | 0 | 0.12 | 0 | Part dont les nuages assombrissent aussi l'ambiant (ombres de nuages plus contrastées). |
| `cloudSpeed` | 12 | 25 | 25 | Vitesse des ombres de nuages au sol (unités/s). |
| `electric` | 0 | 1 | 1 | Champ électrique : arcs sur les surfaces brillantes. |
| `fog` | 0 | 0.18 | 0.2 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #c4d4ff | #4a5a90 | Couleur du brouillard. |

**Température** : **21 °C** le jour, **16 °C** la nuit.

## Comment c'est fait

- `ElectricHelper.ts` : jusqu'à **44** arcs simultanés (`MAX_ARCS`), **7** segments par arc, **48** arcs/s à `electric = 1`, vie **0.08–0.32 s**. Ils apparaissent sur les surfaces brillantes. Voir [09 · Effets spéciaux](../concepts/09-effets-speciaux.md).
- `specular: 1` (0.8 la nuit) : les arcs se posent sur les surfaces brillantes. Voir [03 · Éclairage et shaders](../concepts/03-eclairage-et-shaders.md).
- Chaque arc fait vaciller légèrement la lumière (`ELECTRIC_FLICKER` = 0.07) et tire l'ambiant vers une teinte électrique. Un callback `onArc` est branché dans le constructeur de `WeatherHelper` ; le crépitement de proximité est décrit dans [10 · Audio](../concepts/10-audio.md).
- `fog: 0.18` #c4d4ff (nuit : 0.2, #4a5a90). `cloudCover` 0.45, `cloudSpeed` 25.

## À retenir

- Jour : ambiant #d9e4ff, soleil #eef3ff, `litLevel` 0.9. Nuit : ambiant #5f74b8, soleil #a8c0ff.
- Température : 21 °C le jour, 16 °C la nuit.
- Les arcs concernent les surfaces brillantes (voir `SceneModelObj.shininess`, cité dans `specular`).

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.ELECTRIC]` et `NIGHT_PRESETS[WeatherType.ELECTRIC]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.ELECTRIC]` dans `weather-catalog.ts`.
- Arcs : `ElectricHelper.ts`.
- Capture day : `src/assets/weather/electric-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/electric-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Passe `SPAWN_RATE` à 200 : les toits sont couverts d'arcs.
2. Baisse `specular` à 0.1 : les arcs deviennent très rares.
3. Mets `electric: 0` : lumière bleue seule, sans étincelles.

## Voir aussi

- [Orage](storm.md) : éclairs dans le ciel.
- [Tempête solaire](solar-storm.md) : lumière qui vacille.
- [Poussière d'étoiles](stardust.md) : autre magie du ciel.
