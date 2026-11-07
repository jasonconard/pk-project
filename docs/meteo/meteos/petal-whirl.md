# 🌸 Vent de pétales (`petal-whirl`)

> Catégorie **Nature**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Un **vent fort** fait traverser de grands **tourbillons de pétales de cerisier** qui montent en spirale.
- Lumière chaude et rosée.
- On entend le souffle quand un tourbillon passe près.
- **Son** : souffle tournoyant quand un tourbillon passe près (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 1.02 | 0.42 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.62 | 0.26 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #fff0f4 | #7a6a9a | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #fff2ea | #b3c4ff | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #fff4f6 | #84749c | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.4 | 0.4 | Force des reflets sur les surfaces brillantes. |
| `sunGlow` | 0 | 0.3 | 0 | Lumière en plus sur les façades face au soleil. |
| `cloudCover` | 0 | 0.2 | 0 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudSpeed` | 12 | 25 | 25 | Vitesse des ombres de nuages au sol (unités/s). |
| `minWind` | 0 | 0.5 | 0.5 | Vent minimal imposé, quelle que soit la jauge. |
| `petalWhirl` | 0 | 1 | 1 | Tourbillons de pétales. |

**Température** : **17 °C** le jour, **12 °C** la nuit.

## Comment c'est fait

- `WhirlHelper.ts` : jusqu'à **4** tourbillons (`MAX_WHIRLS`) de **110** pétales, rayon de **4** en bas à **18** en haut, hauteur **45**, base à 14 du sol pour éviter fleurs et panneaux, rotation **2.6** rad/s, montée 6–14 unités/s, avancée 40 avec le vent plus une dérive propre de 12. Voir [09 · Effets spéciaux](../concepts/09-effets-speciaux.md).
- `petalWhirl: 1` (dans `SNAP_KEYS`). `minWind: 0.5` : vent minimal imposé. Voir [11 · Vent](../concepts/11-vent.md).
- Audio : `whirl` = proximité du tourbillon le plus proche (portée `WHIRL_HEARING` = 110), et aussi 1 pendant un envol (voir [Tornade](tornado.md)). Voir [10 · Audio](../concepts/10-audio.md).
- Jour : `cloudCover` 0.2, `cloudSpeed` 25, `sunGlow` 0.3, `litLevel` 1.02.

## À retenir

- Nuit : `litLevel` 0.42, ambiant #7a6a9a (violacé), sans autre effet de lumière.
- Température : 17 °C le jour, 12 °C la nuit.
- Taille d'un pétale : 2.2–3.4 unités.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.PETAL_WHIRL]` et `NIGHT_PRESETS[WeatherType.PETAL_WHIRL]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.PETAL_WHIRL]` dans `weather-catalog.ts`.
- Tourbillons : `WhirlHelper.ts`.
- Capture day : `src/assets/weather/petal-whirl-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/petal-whirl-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Passe `MAX_WHIRLS` à 12 : la zone se remplit de tourbillons.
2. Baisse `SPIN` à 1 : tourbillons plus paresseux.
3. Mets `minWind: 0` : le vent suit la jauge, les tourbillons n'avancent plus s'il est à 0.

## Voir aussi

- [Feuilles](leaves.md) : pétales ou feuilles qui tombent.
- [Tornade](tornado.md) : même principe, en violent.
- [Pluie de printemps](spring-shower.md) : ambiance douce.
