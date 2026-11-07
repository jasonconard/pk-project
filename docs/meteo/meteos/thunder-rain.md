# 🌩️ Pluie de tonnerre (`thunder-rain`)

> Catégorie **Pluie & tempêtes** · disponible **de jour et de nuit** · 16 °C le jour, 12 °C la nuit

## Ce qu'on voit / entend

Une pluie battante sous un ciel noir. Toutes les quelques secondes, la foudre frappe le sol à un endroit visible, parfois juste à côté du joueur. On voit un éclair ramifié qui clignote, un flash, et on entend un coup de tonnerre sec. Depuis l'impact, des veines électriques s'étendent sur le sol, les flaques proches s'illuminent en bleu et vacillent, et des étincelles jaillissent. Si la foudre tombe tout près, l'écran tremble. Des arcs électriques crépitent sur les toits.

## Les paramètres

Preset `THUNDER_RAIN` dans `src/app/modules/game/shared/weather/Weather.ts` :

| Paramètre | Jour | Nuit | Effet |
|---|---|---|---|
| `litLevel` / `shadowLevel` | 0.45 / 0.38 | 0.26 / 0.18 | Ciel très sombre ([éclairage](../concepts/03-eclairage-et-shaders.md)) |
| `cloudCover` / `cloudSpeed` | 0.9 / 60 | 0.8 / 60 | Nuages épais et rapides |
| `rain` / `soak` | 1 / 2 | 1 / 2 | Pluie battante, flaques qui se remplissent vite ([Pluie](rainy.md)) |
| `thunderRain` | 1 | 1 | Fréquence des impacts de foudre |
| `electric` | 0.35 | 0.35 | Arcs sur les toits ([Électrique](electric.md)) |
| `fog` / `fogColor` | 0.2 / `0x6a7490` | 0.2 / `0x1c2234` | Voile de pluie ([brouillard](../concepts/05-brouillard-et-tenebres.md)) |

## Comment c'est fait

### 1. Les éclairs : `StrikeHelper.ts`
Contrairement à l'[Orage](storm.md), qui n'a que des flashes, on **voit** les éclairs ici.

- **Où** : un point au hasard dans la zone visible (`AREA`), ou, une fois sur sept (`NEAR_CHANCE`), à 15–55 unités du joueur. La hauteur du sol vient de `SurfaceHeights`.
- **La forme, par déplacement du point milieu** (`jagged`) : on part d'un segment entre le haut (260 unités au-dessus, légèrement décalé) et l'impact. On pousse son milieu de côté d'une part de sa longueur (`roughness`), puis on recommence sur chaque moitié, récursivement, jusqu'à 32 segments. Les grands segments font de grands zigzags, les petits des petits : c'est une forme **fractale**, comme un vrai canal de foudre.
- **Les branches** : 4 petits éclairs de 8 segments partent du quart supérieur aux trois quarts du canal, vers le bas et l'extérieur.
- **Le rendu** : chaque segment est un rectangle étiré le long du segment et tourné vers la caméra (comme les arcs de la météo [Électrique](electric.md)), en mélange additif et plus lumineux que 1 pour le bloom.
- **Le clignotement** : allumé, presque éteint, rallumé, puis fondu, en 0,45 s. Un vrai éclair est souvent fait de plusieurs décharges dans le même canal.

### 2. Flash, tonnerre et secousse
`WeatherHelper.onGroundStrike` réutilise ce qui existe déjà :
- **Flash et tonnerre** de l'[Orage](storm.md) : on construit un `ThunderBolt` dont la `distance` dépend de l'éloignement de l'impact, puis `boltPulses` pour le flash et `audio.thunder` pour le son. Un impact proche donne un flash aveuglant et un claquement immédiat. `updateLightning` a été adapté pour jouer ces flashes même quand le paramètre `lightning` vaut 0.
- **Secousse** du [Séisme](earthquake.md) : à moins de 70 unités, on lance une secousse courte (0,7 s), plus forte quand c'est plus près.

### 3. La décharge au sol : le shader
Le helper écrit chaque impact dans un tableau d'uniforms `uStrikes[2]` (x, z, âge, actif). Dans `FRAGMENT_BODY` (`weather-shader.ts`), pour chaque impact :

```glsl
vec2 dir = d / r;                                    // direction depuis l'impact
float n1 = wbNoise(dir * 4.0 + r * 0.008 + seed) + jag;
float veins = smoothstep(0.06 * thin, 0.0, abs(n1 - 0.5));
```

- **Des lignes qui partent du centre** : le bruit est échantillonné sur un **cercle** (`dir`, de longueur 1) au lieu de la position. Il varie donc avec l'angle, presque pas avec la distance. Ses **iso-lignes** (là où il vaut 0.5) partent ainsi vers l'extérieur, comme des rayons tordus.
- **Ramification** : une seconde couche plus fine (`dir * 11`), seulement au-delà de 8 unités, ajoute des lignes plus loin du centre, ce qui donne une impression de branches.
- **`jag`** : un petit bruit en coordonnées du monde rend les lignes irrégulières.
- **Croissance et extinction** : le rayon atteint 45 unités en 0,25 s (`STRIKE_GROW`), les lignes s'amincissent vers le bord (`thin`), puis tout s'éteint de façon exponentielle (`exp(-âge × 2.2)`).
- **Flaques** : `wbPuddle` (calculé plus tôt pour les reflets) dit si le pixel est dans une flaque. Les flaques dans un rayon d'environ 70 unités s'illuminent plus longtemps (`exp(-âge × 1.2)`), avec un vacillement produit de deux sinusoïdes du temps.

**Piège rencontré** : le premier essai dessinait des **cercles concentriques**. Deux erreurs : `+ r × 0.035` faisait trop varier le bruit avec la distance (les iso-lignes devenaient des arcs), et le vacillement des flaques utilisait `sin(temps + r)`, qui dessine des anneaux. À retenir : tout terme en `sin(… + r)` dans un shader crée des cercles autour du centre.

### 4. Étincelles et sons
- **Étincelles** : un style `GlowParticles` (`STRIKE_SPARK_STYLE`), additif bleu-blanc, très court (0,2–0,6 s), qui naît à l'impact grâce à `spawnAt`. Sa densité suit `sparks = exp(-âge × 3)` (voir [particules](../concepts/08-particules.md)).
- **Grésillements** : pendant la décharge, `onCrackle` est appelé environ 14 fois par seconde au début, puis de moins en moins, à un point au hasard près de l'impact. Il joue le `zap` des arcs électriques, plus fort quand le joueur est proche (voir [audio](../concepts/10-audio.md)).

## Maths et code à retenir

- **Déplacement du point milieu** : une ligne fractale par subdivision récursive avec un décalage proportionnel à la longueur.
- **Bruit échantillonné sur un cercle** : des motifs qui rayonnent autour d'un point.
- **Uniforms en tableau** pour passer plusieurs événements au shader.
- **Composer l'existant** : flash et tonnerre de l'orage, secousse du séisme, arcs et grésillements de l'électrique.

## Expériences à tenter

- `NEAR_CHANCE = 1` dans `StrikeHelper.ts` : la foudre poursuit le joueur.
- `BRANCHES = 12` : des éclairs très ramifiés.
- `STRIKE_RADIUS = 120` dans `weather-shader.ts` : des décharges immenses.
- Remplace `r * 0.008` par `r * 0.05` : les veines redeviennent des arcs, et on voit le piège.
- Dans `jagged`, `roughness = 0.6` : des éclairs très tordus.

## Voir aussi

- [Orage](storm.md) : flashes et tonnerre.
- [Électrique](electric.md) : arcs sur les toits et leurs sons.
- [Séisme](earthquake.md) : la secousse de caméra.
