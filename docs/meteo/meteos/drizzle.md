# 🌦️ Bruine (`drizzle`)

> Catégorie **Pluie & tempêtes**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Une **bruine fine et dense** : petites gouttes lentes et peu visibles.
- Le sol se mouille doucement sous un ciel gris clair, avec un léger voile de brume.
- **Son** : bruine continue (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.86 | 0.37 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.64 | 0.25 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #dbe1ea | #63739c | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #eef2f8 | #b3c4ff | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #dde3ec | #67739a | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.1 | 0.1 | Force des reflets sur les surfaces brillantes. |
| `cloudCover` | 0 | 0.6 | 0.5 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudAmbient` | 0 | 0.1 | 0.1 | Part dont les nuages assombrissent aussi l'ambiant (ombres de nuages plus contrastées). |
| `cloudSpeed` | 12 | 15 | 15 | Vitesse des ombres de nuages au sol (unités/s). |
| `drizzle` | 0 | 1 | 1 | Densité de la bruine. |
| `fog` | 0 | 0.25 | 0.3 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #d5dbe3 | #939eb3 | Couleur du brouillard. |

**Température** : **11 °C** le jour, **8 °C** la nuit.

## Comment c'est fait

- Style de pluie `DRIZZLE_STYLE` (`RainHelper.ts`), comparé à `RAIN_STYLE` : **3000** gouttes max (2500), vitesse **130** (420), longueur **3.5** (7), largeur **0.5**, couleur #e4ecf6, opacité 0.5, vent **110** (220), **sans éclaboussures** (`splashes: false`), hauteur de départ 90 (260), `followLight: true` (la goutte suit la lumière de la scène). Voir [08 · Particules](../concepts/08-particules.md).
- `drizzle: 1` le jour, `1` la nuit. Le sol mouillé et les flaques viennent de la surface météo : voir [04 · Surfaces météo](../concepts/04-surfaces-meteo.md).
- Brume : `fog` 0.25 le jour (#d5dbe3), 0.3 la nuit (couleur de base nocturne).
- `cloudCover` 0.6 (0.5 la nuit), `cloudSpeed` 15, `specular` 0.1.

## À retenir

- Les gouttes sont lentes (130 contre 420) : elles tombent presque en suspension et dérivent fort avec le vent (110).
- Pas d'éclaboussures : le côté « humide » vient du sol mouillé et non de ronds dans l'eau.
- Le son de bruine est un canal audio séparé : `drizzle: p.drizzle` dans `audio.update`, alors que la pluie, la pluie de sang, etc. partagent `rain`. Voir [10 · Audio](../concepts/10-audio.md).

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.DRIZZLE]` et `NIGHT_PRESETS[WeatherType.DRIZZLE]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.DRIZZLE]` dans `weather-catalog.ts`.
- Capture day : `src/assets/weather/drizzle-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/drizzle-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Passe `drizzle` à 0.3 : une bruine éparse, à peine visible.
2. Mets `windSpeed: 400` dans `DRIZZLE_STYLE` : les gouttes volent presque à l'horizontale.
3. Change `color` en #ffcccc : bruine rosée (comparable à la pluie de sang, sans les flaques).

## Voir aussi

- [Pluvieux](rainy.md) : vraie pluie avec éclaboussures.
- [Pluie verglaçante](freezing-rain.md) : même style de bruine qui gèle.
- [Brume marine](sea-mist.md) : brume sans pluie.
