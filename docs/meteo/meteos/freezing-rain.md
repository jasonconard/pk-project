# 🥶 Pluie verglaçante (`freezing-rain`)

> Catégorie **Pluie & tempêtes**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Une **pluie fine et glaciale** sous un ciel gris.
- Peu à peu, le sol et les surfaces tournées vers le haut se couvrent d'un **verglas bleuté et brillant**.
- Les pas craquent sur la glace.
- **Son** : pluie fine et pas qui craquent (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.8 | 0.36 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.62 | 0.25 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #d4dcea | #6474a0 | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #eef4ff | #b3c4ff | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #d8e0ec | #6a78a0 | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 1.2 | 1.2 | Force des reflets sur les surfaces brillantes. |
| `cloudCover` | 0 | 0.6 | 0.5 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudAmbient` | 0 | 0.1 | 0 | Part dont les nuages assombrissent aussi l'ambiant (ombres de nuages plus contrastées). |
| `cloudSpeed` | 12 | 15 | 15 | Vitesse des ombres de nuages au sol (unités/s). |
| `drizzle` | 0 | 0.9 | 0.9 | Densité de la bruine. |
| `ice` | 0 | 1 | 1 | Verglas sur les surfaces tournées vers le haut. |
| `fog` | 0 | 0.25 | 0.25 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #c8d4e0 | #3c4860 | Couleur du brouillard. |
| `windowGlow` | 0 | 0 | 0.5 | Force des fenêtres allumées. |

**Température** : **-2 °C** le jour, **-5 °C** la nuit.

## Comment c'est fait

- Les gouttes utilisent `DRIZZLE_STYLE` avec `drizzle: 0.9` (voir [Bruine](drizzle.md) : 3000 gouttes max, vitesse 130, sans éclaboussures). Voir [08 · Particules](../concepts/08-particules.md).
- `ice: 1` active le verglas : il **grandit tant que la météo dure** (constante `ICE_GLAZE_TIME` = 20 s dans `WeatherHelper`) et **fond** ensuite (`ICE_MELT_TIME` = 45 s). Voir [04 · Surfaces météo](../concepts/04-surfaces-meteo.md).
- `specular: 1.2` (jour et nuit) : les reflets sont les plus forts de toutes les météos de jour, c'est ce qui rend la glace « brillante ». Voir [03 · Éclairage et shaders](../concepts/03-eclairage-et-shaders.md).
- Brume : `fog` 0.25 (#c8d4e0 le jour, #3c4860 la nuit).

## À retenir

- Température négative : -2 °C le jour, -5 °C la nuit.
- La nuit `windowGlow` passe à 0.5 (base nocturne : 1).
- La bruine (0.9 et non 1) laisse un peu moins de gouttes que la [Bruine](drizzle.md) pure.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.FREEZING_RAIN]` et `NIGHT_PRESETS[WeatherType.FREEZING_RAIN]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.FREEZING_RAIN]` dans `weather-catalog.ts`.
- Constantes : `ICE_GLAZE_TIME`, `ICE_MELT_TIME` dans `WeatherHelper.ts`.
- Capture day : `src/assets/weather/freezing-rain-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/freezing-rain-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Passe `ice` à 0.4 : un verglas partiel et plus discret.
2. Mets `specular: 3` : la glace devient très éblouissante au soleil.
3. Retire `drizzle` (mets 0) : le verglas se forme sans aucune pluie visible, ce qui montre qu'il est indépendant des gouttes.

## Voir aussi

- [Bruine](drizzle.md) : la même pluie fine, sans glace.
- [Gel](frost.md) : givre progressif sans pluie.
- [Grêle](hail.md) : précipitations gelées en grêlons.
