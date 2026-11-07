# 🏜️ Tempête de sable (`sandstorm`)

> Catégorie **Chaleur & feu**. Disponible **le jour seulement** : il n'y a pas d'entrée dans `NIGHT_PRESETS`, la nuit elle devient une nuit neutre.

## Ce qu'on voit / entend

- Un **vent fort** soulève le sable : traînées de grains et gros nuages de poussière ocre.
- Le sable s'**amasse** sur le sol et contre les murs.
- Ciel ocre, soleil orange atténué, faible visibilité.
- **Son** : vent et sable (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.82 | – | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.62 | – | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #e8cba2 | – | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #ffd29a | – | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #ecd4b2 | – | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.1 | – | Force des reflets sur les surfaces brillantes. |
| `cloudCover` | 0 | 0.55 | – | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudAmbient` | 0 | 0.1 | – | Part dont les nuages assombrissent aussi l'ambiant (ombres de nuages plus contrastées). |
| `cloudSpeed` | 12 | 40 | – | Vitesse des ombres de nuages au sol (unités/s). |
| `sand` | 0 | 1 | – | Densité du sable soufflé. |
| `minWind` | 0 | 0.6 | – | Vent minimal imposé, quelle que soit la jauge. |
| `fog` | 0 | 0.65 | – | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #cfa874 | – | Couleur du brouillard. |

**Température** : **37 °C** le jour. La valeur de nuit (24 °C) n'est jamais utilisée : la boucle de `Weather.ts` ne copie les températures que dans les presets existants.

## Comment c'est fait

- `SandHelper.ts` : **1400** grains (traînées rapides de 130 à 220 unités/s, longueur 4–8, couleurs #f2dcae, #e8c48a, #fff0cf, #dcb880) et **70** nuages de poussière (taille 28–55, opacité 0.45, couleurs #d6b688, #c9a374, #e0c49c). Les nuages utilisent la **texture de fumée** (`makeSmokeTexture`, voir [Pluie acide](acid-rain.md)) et roulent sur eux-mêmes en avançant (`PUFF_ROLL` = 0.5 rad/s, quaternion `camera × rotation Z`) : un contour nuageux au lieu d'un disque flou. Voir [08 · Particules](../concepts/08-particules.md) et [09 · Effets spéciaux](../concepts/09-effets-speciaux.md).
- `sand: 1` : densité maximale ; `sandCover` grimpe en **30 s** (`SAND_ACCUMULATION_TIME`) et le shader accumule le sable. Voir [04 · Surfaces météo](../concepts/04-surfaces-meteo.md).
- `minWind: 0.6` : vent minimal imposé (le `SandHelper` a aussi son propre `MIN_WIND` = 0.6). Voir [11 · Vent](../concepts/11-vent.md).
- `fog: 0.65` couleur ocre #cfa874 : voir [05 · Brouillard et ténèbres](../concepts/05-brouillard-et-tenebres.md). `cloudCover` 0.55, `cloudSpeed` **40**.

## À retenir

- **Jour seulement** : pas de preset de nuit, la nuit devient neutre.
- Température : 37 °C le jour.
- Jour : `litLevel` 0.82, `shadowLevel` 0.62, ambiant #e8cba2, soleil #ffd29a : tout est teinté d'ocre.
- Le niveau audio `sand` est celui du paramètre.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.SANDSTORM]` et `NIGHT_PRESETS[WeatherType.SANDSTORM]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.SANDSTORM]` dans `weather-catalog.ts`.
- Sable : `SandHelper.ts` ; accumulation : `SAND_ACCUMULATION_TIME` dans `WeatherHelper.ts`.
- Capture day : `src/assets/weather/sandstorm-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Mets `sand: 0.3` : peu de grains, le sable s'accumule beaucoup plus lentement.
2. Baisse `SAND_ACCUMULATION_TIME` à 3 : le sable couvre tout presque immédiatement.
3. Retire `fog` (0) : la tempête se voit mieux, mais le ciel perd sa brume ocre.

## Voir aussi

- [Canicule](heatwave.md) : chaleur sans sable.
- [Blizzard](blizzard.md) : même principe avec de la neige.
- [Tornade](tornado.md) : poussière et vent violent.
