# 🌧️ Pluvieux (`rainy`)

> Catégorie **Pluie & tempêtes**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Une **vraie pluie** : le sol s'assombrit, des flaques se creusent et reflètent le ciel.
- Les gouttes font des **ronds dans l'eau** et on entend des pas dans l'eau.
- **Son** : bruit de pluie, et pas dans l'eau (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.78 | 0.34 | Luminosité du sol au soleil. |
| `ambientColor` | #ffffff | #c4cfe0 | #5f6f9c | Teinte de la lumière ambiante. |
| `unlitTint` | #ffffff | #c9d2e0 | #606c92 | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0 | 0 | Force des reflets sur les surfaces brillantes. |
| `cloudCover` | 0 | 0.7 | 0.6 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudAmbient` | 0 | 0.15 | 0.15 | Part dont les nuages assombrissent aussi l'ambiant (ombres de nuages plus contrastées). |
| `cloudSpeed` | 12 | 30 | 30 | Vitesse des ombres de nuages au sol (unités/s). |
| `rain` | 0 | 0.6 | 0.6 | Densité de la pluie. |
| `shadowLevel` | 0.6 | 0.6 | 0.24 | Luminosité à l'ombre (lumière ambiante seule). |
| `sunColor` | #ffffff | #ffffff | #a9b8e8 | Couleur du soleil (la lune la nuit). |

**Température** : **13 °C** le jour, **9 °C** la nuit.

## Comment c'est fait

- Style `RAIN_STYLE` : **2500** gouttes max, vitesse **420**, longueur 7, largeur 0.35, couleur #d6e6ff, opacité 0.6, vent 220, éclaboussures actives (max 400 en tout, durée de vie 0.25 s), hauteur de départ 260, `followLight: false`. Voir [08 · Particules](../concepts/08-particules.md).
- `rain: 0.6` le jour comme la nuit, c'est-à-dire 60 % des gouttes (environ 1500).
- Les **flaques** apparaissent dans les creux et se remplissent tant qu'il pleut ; l'eau de pluie lave les taches de sang/poison. Voir [04 · Surfaces météo](../concepts/04-surfaces-meteo.md).
- Ciel : `cloudCover` 0.7 (0.6 la nuit), `cloudAmbient` 0.15, `cloudSpeed` 30. Aucun brouillard.

## À retenir

- `specular: 0` : aucun reflet du soleil, mais les flaques ont leur propre reflet du ciel.
- Le jour, seul `litLevel` (0.78), l'ambiant (#c4cfe0) et `unlitTint` changent : `shadowLevel` reste à 0.6, donc le contraste lumière/ombre est réduit.
- La nuit `litLevel` 0.34 et `shadowLevel` 0.24 : plus sombre que la base nocturne.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.RAINY]` et `NIGHT_PRESETS[WeatherType.RAINY]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.RAINY]` dans `weather-catalog.ts`.
- Capture day : `src/assets/weather/rainy-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/rainy-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Passe `rain: 1` : tu obtiens la densité de l'orage, sans les éclairs.
2. Mets `rain: 0.2` : quelques gouttes seulement, les flaques mettent beaucoup plus de temps à se remplir.
3. Dans `RAIN_STYLE`, passe `splashes` à `false` : plus de ronds dans l'eau.

## Voir aussi

- [Orage](storm.md) : pluie maximale, éclairs, tonnerre.
- [Bruine](drizzle.md) : pluie fine sans éclaboussures.
- [Inondation](flood.md) : pluie dont l'eau finit par monter.
