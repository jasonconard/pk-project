# 🌴 Mousson (`monsoon`)

> Catégorie **Pluie & tempêtes** · disponible **de jour et de nuit** · 30 °C le jour, 26 °C la nuit

## Ce qu'on voit / entend

Un déluge tropical chaud : la pluie est aussi dense qu'en [Orage](storm.md), sous une brume verte et moite. Le sol se gorge d'eau en quelques secondes et les flaques se remplissent trois fois plus vite qu'avec une pluie normale. On entend un chœur de grenouilles et, de temps en temps, un orage qui gronde **au loin** : éclairs faibles, tonnerre sourd et tardif. La nuit, l'ambiance passe au vert sombre avec les fenêtres allumées, et les grenouilles chantent plus fort.

## Les paramètres

Preset `MONSOON` dans `src/app/modules/game/shared/weather/Weather.ts` (valeurs qui diffèrent de `DAY_BASE` / `NIGHT_BASE`) :

| Paramètre | Jour | Nuit | Effet |
|---|---|---|---|
| `litLevel` / `shadowLevel` | 0.66 / 0.54 | 0.32 / 0.22 | Lumière tamisée par les nuages, ombres douces |
| `ambientColor` / `sunColor` / `unlitTint` | verts pâles | verts sombres | La teinte tropicale (voir [éclairage](../concepts/03-eclairage-et-shaders.md)) |
| `cloudCover` / `cloudAmbient` | 0.85 / 0.2 | 0.6 / — | Ciel presque couvert |
| `rain` | 1 | 1 | Pluie maximale ([particules](../concepts/08-particules.md)) |
| `soak` | 3 | 3 | Le sol se mouille et les flaques se remplissent 3× plus vite |
| `lightning` | 0.25 | 0.25 | Éclairs rares |
| `lightningFar` | 0.65 | 0.65 | Éclairs toujours lointains |
| `frogs` | 0.6 | 1 | Chœur de grenouilles |
| `fog` / `fogColor` | 0.45 / `0x8fae94` | 0.45 / `0x2c4034` | Brume verte ([brouillard](../concepts/05-brouillard-et-tenebres.md)) |
| `windowGlow` | — | 0.6 | Fenêtres allumées |

## Comment c'est fait

La Mousson réutilise la pluie, les flaques et le tonnerre. Elle ajoute **trois paramètres génériques** que d'autres météos peuvent utiliser :

### `soak` : la vitesse d'imbibition
Dans `WeatherHelper.updatePuddles`, l'humidité et le niveau des flaques montent proportionnellement à la pluie. `soak` multiplie simplement cette vitesse :

```ts
this.wetness = Math.min(1, this.wetness + dt * raining * p.soak / WET_TIME);
this.puddles = Math.min(1, this.puddles + dt * raining * p.soak / PUDDLE_FILL_TIME);
```

Avec `WET_TIME = 6` s et `PUDDLE_FILL_TIME = 25` s, `soak = 3` donne un sol trempé en 2 s et des flaques pleines en environ 8 s. Le reste (reflets, ronds de pluie, forme des flaques) est décrit dans [surfaces météo](../concepts/04-surfaces-meteo.md).

### `lightningFar` : un orage qui reste au loin
Chaque éclair tire une distance entre 0 (au-dessus de soi) et 1 (à l'horizon) dans `newStrike` (`WeatherHelper.ts`). La Mousson la « pousse » vers l'horizon par une interpolation linéaire :

```ts
const distance = minDistance + (1 - minDistance) * picked;
```

Avec `minDistance = 0.65`, une distance tirée de 0 devient 0.65, et 1 reste 1 : l'intervalle [0, 1] est comprimé dans [0.65, 1]. Comme la luminosité du flash, le volume et le délai du tonnerre dépendent de cette distance, on obtient automatiquement des éclairs pâles et des grondements sourds et tardifs (voir [audio, tonnerre](../concepts/10-audio.md)).

### `frogs` : le chœur de grenouilles
`WeatherAudio.updateFrogs` fait vivre 4 grenouilles indépendantes, chacune avec sa hauteur (170 à 340 Hz), son côté (panoramique) et son minuteur (`FROG_INTERVAL`, 0.8 à 3.5 s). Un coassement (`croak`) est une **dent de scie** dont la hauteur monte légèrement, découpée en 2 ou 3 pulsations brèves. Elle passe dans un filtre passe-bande centré sur 3,5× la fréquence (le côté nasillard de la poche vocale), puis un passe-bas qui adoucit le tout. Les bases (oscillateurs, filtres, enveloppes) sont expliquées dans [audio](../concepts/10-audio.md).

## Maths et code à retenir

- **Remappage linéaire** `a + (1 - a) · x` : comprime [0, 1] dans [a, 1] en gardant l'ordre et la répartition relative. C'est un outil très utile pour « décaler sans casser » une valeur aléatoire.
- **Un multiplicateur de vitesse** (`soak`) plutôt qu'un nouveau temps : le code des flaques reste unique, et chaque météo choisit son rythme.
- **Des voix indépendantes** (un minuteur par grenouille) donnent un chœur naturel, sans motif répétitif.

## Expériences à tenter

- `soak: 10` dans `MONSOON` : flaques pleines en 2-3 secondes.
- `lightningFar: 0` : l'orage se rapproche, avec des éclairs proches et le claquement sec.
- `FROG_INTERVAL = [0.3, 1]` dans `WeatherAudio.ts` : un marais très bruyant.
- Dans `croak`, remplace `pitch * 3.5` par `pitch * 2` : des coassements plus graves et plus ronds.

## Voir aussi

- [Orage](storm.md) : la même pluie, avec des éclairs proches.
- [Pluvieux](rainy.md) et [Inondation](flood.md) : autres façons de gérer l'eau au sol.
- [Forêt](forest.md) : l'autre ambiance animale (oiseaux, grillons, hibou).
