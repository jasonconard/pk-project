# 🌤️ Pluie de printemps (`spring-shower`)

> Catégorie **Pluie & tempêtes**. Disponible **le jour seulement** : il n'y a pas d'entrée dans `NIGHT_PRESETS`, la nuit elle devient une nuit neutre.

## Ce qu'on voit / entend

- Une **averse légère en plein soleil** : gouttes dorées brillantes à contre-jour.
- Rayons de soleil dans l'air et sur le sol.
- Les oiseaux chantent.
- **Son** : chants d'oiseaux et pluie légère (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 1.02 | – | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.62 | – | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #fff8ec | – | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #fff0d0 | – | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #fff8f0 | – | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.8 | – | Force des reflets sur les surfaces brillantes. |
| `sunGlow` | 0 | 0.5 | – | Lumière en plus sur les façades face au soleil. |
| `godRays` | 0 | 0.6 | – | Rayons de soleil volumétriques. |
| `cloudCover` | 0 | 0.2 | – | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudSpeed` | 12 | 15 | – | Vitesse des ombres de nuages au sol (unités/s). |
| `sunRain` | 0 | 0.45 | – | Averse dorée à contre-jour. |
| `birds` | 0 | 0.8 | – | Chants d'oiseaux (hors forêt). |

**Température** : **19 °C** le jour. La valeur de nuit (13 °C) n'est jamais utilisée : la boucle de `Weather.ts` ne copie les températures que dans les presets existants.

## Comment c'est fait

- Style `SUN_RAIN_STYLE` : dérivé de `RAIN_STYLE` avec **1200** gouttes max, couleur dorée #fff0c0, opacité 0.7, couleur d'éclaboussure #b0a070. Les gouttes sont toujours claires (comme éclairées à contre-jour). Voir [08 · Particules](../concepts/08-particules.md).
- `sunRain: 0.45` : 45 % de la densité du style.
- Rayons : `godRays 0.6` (plus que [Ensoleillé](sunny.md), 0.5), voir [06 · Post-effets](../concepts/06-post-effets.md). `sunGlow 0.5`, `specular 0.8`.
- Oiseaux : `birds: 0.8` (canal audio dédié, hors forêt). Voir [10 · Audio](../concepts/10-audio.md).
- Ciel presque dégagé : `cloudCover` 0.2, `cloudSpeed` 15.

## À retenir

- **Jour seulement** : pas de preset de nuit. De nuit, c'est la nuit neutre.
- `litLevel` 1.02 : plus clair que la base, avec un ambiant crème (#fff8ec).

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.SPRING_SHOWER]` et `NIGHT_PRESETS[WeatherType.SPRING_SHOWER]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.SPRING_SHOWER]` dans `weather-catalog.ts`.
- Capture day : `src/assets/weather/spring-shower-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Mets `sunRain: 1` : averse nettement plus dense, toujours dorée.
2. Passe `godRays` à 1.5 : rayons très marquants à travers les gouttes.
3. Ajoute `birds: 0` : même ambiance visuelle, sans chants.

## Voir aussi

- [Ensoleillé](sunny.md) : le soleil sans pluie.
- [Bruine](drizzle.md) : bruine grise.
- [Pluvieux](rainy.md) : pluie sans soleil.
