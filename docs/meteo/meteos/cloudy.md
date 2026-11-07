# ☁️ Nuageux (`cloudy`)

> Catégorie **Classiques**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Le ciel se couvre : des **ombres de nuages** glissent sur le sol au rythme du vent.
- La lumière devient plus douce, avec un léger voile blanc-bleuté (`ambientColor` #f2f4f8).
- Les façades face au soleil gardent une faible lueur (`sunGlow` 0.15).
- **Son** : aucune ambiance propre (`sound: false`).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `shadowLevel` | 0.6 | 0.62 | 0.26 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #f2f4f8 | #6d7fb3 | Teinte de la lumière ambiante. |
| `unlitTint` | #ffffff | #f4f6fa | #6f7ca6 | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.25 | 0.35 | Force des reflets sur les surfaces brillantes. |
| `cloudCover` | 0 | 1 | 0.8 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudAmbient` | 0 | 0.3 | 0.2 | Part dont les nuages assombrissent aussi l'ambiant (ombres de nuages plus contrastées). |
| `sunGlow` | 0 | 0.15 | 0 | Lumière en plus sur les façades face au soleil. |
| `litLevel` | 1 | 1 | 0.42 | Luminosité du sol au soleil. |

**Température** : **16 °C** le jour, **11 °C** la nuit.

## Comment c'est fait

- **Aucun objet créé** : tout passe par des uniforms et par la texture de nuages (`cloud-texture.ts`) que le shader projette au sol. Voir [03 · Éclairage et shaders](../concepts/03-eclairage-et-shaders.md).
- `cloudCover = 1` : les nuages peuvent masquer complètement le soleil. La nuit le preset descend à 0.8, pour que la lune ne disparaisse jamais tout à fait.
- `cloudAmbient = 0.3` : les nuages n'assombrissent pas seulement la lumière directe, ils baissent aussi un peu l'ambiant, donc les zones sous un nuage sont plus contrastées. C'est la valeur la plus haute de tous les presets de jour (nuit : 0.2).
- `cloudSpeed` reste à la valeur de base (12 unités/s). Pour le vent, voir [11 · Vent](../concepts/11-vent.md).
- Pas de brouillard (`fog` = 0) : seule la lumière change.

## À retenir

- `litLevel` reste à 1 le jour : c'est la **couverture** et non la luminosité qui fait le ciel gris. Le preset ne baisse que `shadowLevel` (0.62 contre 0.6 : en réalité un peu **plus** clair à l'ombre) et `specular` (0.25).
- Nuit : `litLevel` 0.42 (base 0.45) et `specular` 0.35 (base 0.4), sans changer les couleurs d'ambiance.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.CLOUDY]` et `NIGHT_PRESETS[WeatherType.CLOUDY]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.CLOUDY]` dans `weather-catalog.ts`.
- Capture day : `src/assets/weather/cloudy-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/cloudy-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Passe `cloudSpeed` à 60 : les ombres filent sur le sol comme sous un ciel d'orage.
2. Mets `cloudAmbient: 0.8` : les zones sous les nuages deviennent presque aussi sombres que l'ombre des bâtiments.
3. Passe `cloudCover` à 0.5 : le ciel est à moitié dégagé, des trouées de soleil reviennent.

## Voir aussi

- [Neutre](neutral.md) : la base sans nuages.
- [Pluvieux](rainy.md) : mêmes nuages, avec de la pluie.
- [Brouillard](fog.md) : ciel voilé par le brouillard.
