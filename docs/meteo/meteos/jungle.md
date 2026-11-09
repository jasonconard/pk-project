# 🌴 Jungle (`jungle`)

> Catégorie **Nature**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- **La Forêt en plus sombre et étouffante** : lumière verte filtrée par une canopée épaisse, ombres de feuillage qui bougent très lentement.
- **De jour** : quelques rayons de soleil, une brume moite au ras du sol, de rares gouttes qui tombent, du pollen et quelques spores, l'air lourd qui ondule à peine, le sol humide qui brille.
- **De nuit** : presque noir, lune verdâtre, brume épaisse, **des yeux qui brillent dans l'obscurité** et regardent le joueur, quelques lucioles.
- **Son** : l'ambiance de la Forêt (feuillage, oiseaux le jour), avec des grenouilles et des grillons la nuit.

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.6 | 0.22 | Luminosité du sol au soleil (à la lune). |
| `shadowLevel` | 0.6 | 0.26 | 0.14 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #7aa468 | #3a5a40 | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #f0f4c8 | #9ac8a0 | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #a8c49a | #4a6a50 | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.5 | 0.4 | Reflets du sol et des toits mouillés. |
| `sunGlow` | 0 | 0.15 | 0 | Lumière en plus sur les façades face au soleil. |
| `godRays` | 0 | 0.55 | 0 | Rayons de soleil à travers la canopée. |
| `windowGlow` | 0 | 0 | 0.6 | Fenêtres allumées. |
| `cloudSpeed` | 12 | 3 | 3 | Vitesse des ombres au sol : la canopée bouge à peine. |
| `canopy` | 0 | 1 | 1 | Ombres de feuillage au sol et ambiance sonore de la forêt. |
| `pollen` | 0 | 0.6 | 0 | Pollen doré. |
| `spores` | 0 | 0.12 | 0 | Quelques spores lumineuses. |
| `drizzle` | 0 | 0.12 | 0 | Gouttes qui tombent des arbres (bruine très légère). |
| `dew` | 0 | 0.6 | 0.6 | Sol humide qui brille. |
| `heatHaze` | 0 | 0.25 | 0 | Air lourd qui ondule à peine. |
| `groundMist` | 0 | 0.45 | 1 | Brume moite au ras du sol, à toute heure. |
| `watchingEyes` | 0 | 0 | 0.8 | Yeux qui regardent depuis le noir. |
| `fireflies` | 0 | 0 | 0.15 | Quelques lucioles. |
| `birds` | 0 | 0.6 | 0 | Oiseaux. |
| `frogs` | 0 | 0 | 0.6 | Grenouilles. |
| `crickets` | 0 | 0 | 0.8 | Grillons. |
| `fog` | 0 | 0.28 | 0.4 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #5a7a56 | #14261c | Couleur du brouillard. |

**Température** : **31 °C** le jour, **26 °C** la nuit.

## Comment c'est fait

- Presque tout vient d'effets existants : la canopée et le pollen de la [Forêt](forest.md), la bruine, les rayons de soleil, l'ondulation de la [Canicule](heatwave.md).
- **`groundMist`** (nouveau) : les bancs de brume basse de la [Brume matinale](morning-mist.md) (`MIST_STYLE`), mais à toute heure. `morningMist` dépend de l'heure (`mistAt` : la brume se dissipe quand le soleil monte), `groundMist` non. `WeatherHelper` utilise le plus fort des deux. La brume suit la lumière de la scène : elle devient verte avec l'ambiance.
- **`watchingEyes`** (nouveau) : les yeux de la [Nuit sans lune](moonless.md) (`EyesHelper`), sans son noir complet ni sa lanterne. `WeatherHelper` utilise le plus fort de `moonless` et `watchingEyes`.

## À retenir

- Pour une ambiance oppressante : peu de lumière (`litLevel`, `shadowLevel`), une brume colorée et des yeux dans le noir.
- Trop de rayons ou de brume blanche rendent le jour laiteux au lieu de sombre : le premier essai, avec des rayons à 0.9, était trop clair.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.JUNGLE]` et `NIGHT_PRESETS[WeatherType.JUNGLE]` dans `Weather.ts`.
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.JUNGLE]` dans `weather-catalog.ts`.
- Brume et yeux : `this.mist` et `this.eyes` dans `WeatherHelper.ts`.
- Captures : `src/assets/weather/jungle-day.webp` et `jungle-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).

## Expériences à tenter

1. Passe `watchingEyes` à 0.3 le jour : des yeux dans les ombres en plein jour.
2. Monte `drizzle` à 0.5 : une averse tropicale sous la canopée.
3. Mets `fogColor` à #3a2a1a la nuit : une jungle brune, boueuse.

## Voir aussi

- [Forêt](forest.md) : la version claire et paisible.
- [Mousson](monsoon.md) : pluie tropicale et grenouilles.
- [Nuit sans lune](moonless.md) : les yeux dans le noir, avec la lanterne.
