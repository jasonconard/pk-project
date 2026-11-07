# 💎 Brume de cristal (`crystal-mist`)

> Catégorie **Froid** · disponible **de jour et de nuit** · -2 °C le jour, -6 °C la nuit

## Ce qu'on voit / entend

Une brume glacée et lumineuse, bleutée, où flottent de minuscules éclats de glace. Ils scintillent très vite et changent de couleur (cyan, rose, or, violet, vert, blanc), comme des facettes de prisme qui accrochent la lumière. Les reflets des toits s'irisent et de fins tintements cristallins résonnent. C'est de nuit que l'effet est le plus spectaculaire : les éclats brillent avec un halo.

## Les paramètres

Preset `CRYSTAL_MIST` dans `src/app/modules/game/shared/weather/Weather.ts` :

| Paramètre | Jour | Nuit | Effet |
|---|---|---|---|
| `litLevel` / `shadowLevel` | 0.95 / 0.66 | 0.46 / 0.3 | Lumière claire et froide |
| `ambientColor` / `sunColor` / `unlitTint` | blancs bleutés | bleus | Teinte glacée ([éclairage](../concepts/03-eclairage-et-shaders.md)) |
| `specular` | 1.2 | 1.1 | Reflets forts sur les toits |
| `iridescence` | 0.7 | 0.7 | Reflets arc-en-ciel ([surfaces météo](../concepts/04-surfaces-meteo.md)) |
| `crystals` | 1 | 1 | Éclats de glace flottants |
| `fog` / `fogColor` | 0.4 / `0xd8e6fa` | 0.4 / `0x384a74` | Brume bleutée ([brouillard](../concepts/05-brouillard-et-tenebres.md)) |

## Comment c'est fait

Encore une **composition** : une brume, l'irisation de la [Poussière d'étoiles](stardust.md) et les tintements de la [Neige magique](magic-snow.md). La seule nouveauté est le style de particules `CRYSTAL_STYLE` (`GlowParticles.ts`), réglé pour imiter des facettes :

| Réglage | Valeur | Pourquoi |
|---|---|---|
| `flicker` | 0.95 | La luminosité descend presque à 0 : la facette « s'éteint » quand elle se détourne |
| `flickerSpeed` | 11 rad/s | Clignotement rapide, comme un cristal qui tourne |
| `rise` | [-0.8, 0.8] | Les éclats flottent en suspension, sans vraiment monter ni tomber |
| `wobble` / `wobbleSpeed` | 2 / 0.35 | Lente dérive |
| `palette` | cyan, rose, or, violet, vert, blanc | Les couleurs d'un prisme : chaque éclat garde la sienne |
| `blending` | `'normal'` | Garde les couleurs visibles de jour (le mélange additif blanchirait sur la brume claire) |
| `intensity` | 2.2 | Au-dessus de 1, la nuit les fait passer dans le bloom des fenêtres |

Le scintillement vient de la formule commune de `GlowParticles` (voir [particules](../concepts/08-particules.md)) :

```ts
const flicker = 1 - s.flicker * (0.5 + 0.5 * Math.sin(this.time * s.flickerSpeed + this.phase[i] * 3));
```

Avec `flicker = 0.95`, le facteur oscille entre 0.05 et 1. La phase propre à chaque particule (`phase[i]`) évite qu'elles clignotent toutes en même temps.

**Jour ou nuit ?** En mélange normal, une particule ne peut pas être plus claire que sa couleur. Sur une brume déjà très claire, des couleurs pastel disparaissaient. On a donc choisi des couleurs **saturées** et des éclats plus gros : la saturation crée le contraste là où la luminosité ne peut plus le faire.

Les tintements passent par le niveau `chimes` partagé, avec un dosage propre (`CRYSTAL_CHIMES = 0.4` dans `WeatherHelper.ts`), entre la Poussière d'étoiles (0.3) et la Neige magique (0.45). Voir [audio](../concepts/10-audio.md).

## Maths et code à retenir

- **Clignotement par sinusoïde déphasée** : `1 - a·(0.5 + 0.5·sin(ω t + φ))`. `a` règle la profondeur, `ω` la vitesse, `φ` (propre à chaque particule) désynchronise.
- **Contraste par la saturation** quand on ne peut pas jouer sur la luminosité.
- **Partager un niveau sonore** (`chimes`) entre plusieurs météos, chacune avec son dosage : `Math.max(a·kA, b·kB, c·kC)`.

## Expériences à tenter

- `flickerSpeed: 3` dans `CRYSTAL_STYLE` : des cristaux qui « respirent » au lieu de scintiller.
- `blending: 'additive'` : magnifique la nuit, mais les éclats blanchissent et disparaissent de jour.
- `maxParticles: 1200` : une brume pleine d'éclats.
- `iridescence: 1.5` dans le preset : des toits franchement arc-en-ciel.

## Voir aussi

- [Poussière d'étoiles](stardust.md) : la même irisation, avec des poussières dorées.
- [Neige magique](magic-snow.md) : étincelles qui tombent, mêmes tintements.
- [Gel](frost.md) : le givre qui scintille au sol.
