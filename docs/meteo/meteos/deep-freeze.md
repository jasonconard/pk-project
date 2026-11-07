# 🧊 Aurore glacée (`deep-freeze`)

> Catégorie **Froid** · disponible **de jour et de nuit** · −22 °C le jour, −34 °C la nuit

## Ce qu'on voit / entend

Un froid mordant. Le givre recouvre tout et grimpe peu à peu le long des murs. Le sol est glacé et brillant comme une patinoire. Toutes les 3 secondes, l'haleine du joueur forme un petit nuage blanc qui s'étale et s'efface lentement. Un vent glacé souffle, et la glace craque avec des sons étranges, comme sur un lac gelé. La nuit, une aurore boréale danse au-dessus de la ville gelée.

## Les paramètres

Preset `DEEP_FREEZE` dans `src/app/modules/game/shared/weather/Weather.ts` :

| Paramètre | Jour | Nuit | Effet |
|---|---|---|---|
| `ambientColor` / `sunColor` / `unlitTint` | bleus pâles | bleus profonds | Lumière froide ([éclairage](../concepts/03-eclairage-et-shaders.md)) |
| `specular` | 0.9 | 0.7 | Reflets sur la glace |
| `frost` / `ice` | 1 / 0.5 | 1 / 0.5 | Givre du [Gel](frost.md), sol glacé ([surfaces](../concepts/04-surfaces-meteo.md)) |
| `deepFreeze` | 1 | 1 | Givre qui grimpe, haleine, craquements |
| `aurora` | — | 0.7 | Aurore boréale ([Aurore](aurora.md)) |
| `minWind` | 0.4 | 0.4 | Vent glacé ([vent](../concepts/11-vent.md)) |
| `fog` / `fogColor` | 0.25 / `0xdce8fa` | 0.2 / `0x1c2840` | Brume froide ([brouillard](../concepts/05-brouillard-et-tenebres.md)) |

## Comment c'est fait

### 1. Le givre qui grimpe sur les murs
Le givre du [Gel](frost.md) s'étend avec `uFrost` sur un motif cristallin, en atteignant d'abord les surfaces tournées vers le haut (`frostUp`). Il ne touchait presque pas les murs. Une ligne ajoutée dans `PUDDLE_FRAGMENT` (`weather-shader.ts`) lui permet de les monter :

```glsl
reach += uFrost * 0.55 * (1.0 - frostUp) * (1.0 - smoothstep(uFrostClimb * 0.6, uFrostClimb + 0.01, vWeatherWorldPos.y));
```

- `1 − frostUp` : seulement les surfaces verticales.
- `1 − smoothstep(…, y)` : seulement **sous** la hauteur `uFrostClimb`, avec un bord dégradé (le motif cristallin le rend irrégulier).
- `WeatherHelper` fait monter `uFrostClimb` de 0.6 unité par seconde jusqu'à 28 (`FROST_CLIMB_MAX`) : une quarantaine de secondes pour couvrir une façade. Quand on change de météo, le givre redescend trois fois plus vite.

### 2. L'haleine
Un style `GlowParticles` (`BREATH_STYLE`, voir [particules](../concepts/08-particules.md)) : la texture de fumée, blanche, petite, éclairée par la scène, qui naît **devant le visage du joueur** grâce à `spawnAt` :
- à 15–16 unités au-dessus du sol (le sprite du joueur fait 21 de haut ; le premier essai, à 11, sortait au niveau du ventre) ;
- décalée de 4 unités vers la caméra, pour être dessinée devant le sprite.

Deux nouvelles options de `GlowParticles` rendent le souffle naturel :

**Une porte d'apparition (`spawnGate`).** Le premier essai faisait respirer le joueur en passant la densité à 0 entre deux souffles. Mais la densité fixe le **nombre de particules dessinées** : à 0, toutes les bouffées encore en train de s'effacer disparaissaient d'un coup. Avec `spawnGate`, la densité reste constante. Quand une particule meurt, elle ne renaît que si la porte l'autorise, sinon elle attend, cachée. Les bouffées vivantes vont toujours au bout de leur vie. Côté `WeatherHelper`, la porte distribue des **jetons** : 22 par seconde pendant l'expiration (le premier tiers de chaque cycle de 3,2 s), aucun ensuite. Le souffle sort ainsi en flux régulier au lieu d'apparaître d'un bloc.

**Des courbes adoucies (`puff`).** Au lieu du fondu symétrique `sin(π·t)` :

```ts
brightness = t < 0.08 ? t / 0.08 : (1 - (t - 0.08) / 0.92) ** 2;  // apparaît vite, s'efface lentement
grow = 1 + (grow - 1) * (1 - (1 - t) ** 2);                     // s'étale vite, puis ralentit
```

`(1 − u)²` baisse vite au début puis traîne longtemps près de 0 : la bouffée laisse une brume légère qui s'efface doucement. `1 − (1 − t)²` est la courbe inverse (**ease-out**) : rapide au départ, lente à la fin, comme un nuage freiné par l'air.

Mesuré sur un cycle : l'opacité totale monte de 1.1 à 6.8 pendant l'expiration, puis redescend progressivement jusqu'à 0 aux deux tiers du cycle.

### 3. Les craquements de la glace
`WeatherAudio.updateIceCracks` (voir [audio](../concepts/10-audio.md)), environ une fois toutes les 3 secondes :
- un **claquement** : un bruit très court au-dessus de 2 000 Hz ;
- un **« piou »** : un son pur qui tombe de 1 800–3 200 Hz à 12 % de cette fréquence en 0,25 à 0,5 s. Dans la glace, les fréquences aiguës voyagent plus vite que les graves : on les entend d'abord, et le son semble glisser vers le grave. C'est le bruit typique d'un lac gelé qui craque.

## Maths et code à retenir

- **Effet limité en hauteur** avec `smoothstep` sur `y`, et une hauteur qui monte avec le temps.
- **Densité ≠ émission** : couper le nombre de particules les efface ; contrôler leur **apparition** les laisse finir leur vie.
- **Jetons d'émission** pour étaler des apparitions dans le temps.
- **Courbes d'easing** : `(1 − u)²` (chute rapide qui s'attarde) et `1 − (1 − t)²` (ease-out).

## Expériences à tenter

- `FROST_CLIMB_SPEED = 5` dans `WeatherHelper.ts` : le givre envahit les maisons en quelques secondes.
- `BREATH_PERIOD = 1` : le joueur est essoufflé.
- `BREATH_PUFFS = 200` : toutes les bouffées sortent d'un coup, et on voit l'intérêt des jetons.
- Remplace `** 2` par `** 4` dans la courbe `puff` de `GlowParticles.ts` : l'haleine s'attarde encore plus.
- `ICE_CRACK_RATE = 3` dans `WeatherAudio.ts` : la glace est sur le point de céder.

## Voir aussi

- [Gel](frost.md) : le givre de base.
- [Aurore](aurora.md) : l'aurore boréale.
- [Brume matinale](morning-mist.md) : une autre fumée, en grandes nappes à plat.
