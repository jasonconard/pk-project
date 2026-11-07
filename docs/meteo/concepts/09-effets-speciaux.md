# 09 · Effets spéciaux

Ici, les effets qui ne sont pas de simples « particules qui tombent » : ils ont une **forme** (un éclair en zigzag, une spirale, un entonnoir) ou une **interaction** (la tornade emporte le joueur, les fantômes fuient quand on approche). Les bases (`InstancedMesh`, billboards, additif) sont dans [08 · Particules](08-particules.md).

Retour : [README](../README.md). Voir aussi [11 · Vent](11-vent.md), [10 · Audio](10-audio.md).

## ElectricHelper : arcs électriques

Des petits arcs qui crépitent sur les surfaces brillantes (toits, métal).

### Où naissent les arcs : conducteurs pondérés par l'aire

`refreshConductors` (toutes les 2 s) parcourt la scène et retient les meshes dont le matériau est `MeshPhongMaterial` (les surfaces brillantes du jeu), avec leur boîte `Box3.setFromObject`. Puis :

```ts
this.conductorAreas = boxes.map(b => total += Math.max((b.max.x - b.min.x) * (b.max.z - b.min.z), 1));
```

On stocke les **aires cumulées** (somme glissante). Pour tirer un conducteur proportionnellement à son aire (`pickConductor`) :

```ts
const r = Math.random() * total;
return this.conductors[this.conductorAreas.findIndex(a => a >= r)];
```

C'est un **tirage par somme cumulée** : `r` est uniforme dans [0, total] ; on prend la première case dont le cumul dépasse `r`. Un grand toit occupe un plus long segment de [0, total], donc a plus de chances. Un petit objet reçoit au moins une aire de 1 (`Math.max(..., 1)`) pour ne pas être impossible.

### Quand : une « dette » de spawn

```ts
this.spawnDebt += dt * SPAWN_RATE * intensity;
while (this.spawnDebt >= 1) { this.spawnDebt--; ... }
```

Débit moyen = `SPAWN_RATE · intensity` arcs/s, **indépendant du framerate** : si une frame est longue, la dette accumule et on lance plusieurs arcs d'un coup. Avec `BURST_CHANCE` (45 %), un arc en déclenche un second au même endroit (rafales).

### Forme : zigzag

Chaque arc a deux extrémités fixes et `SEGMENTS = 7` segments. `zigzag(arc)` place les points intermédiaires sur la droite (`lerpVectors`, avec `t = k/SEGMENTS`) puis les **décale au hasard** :

```ts
const amp = JITTER * Math.sin(Math.PI * t) + 0.2;
p.x += (Math.random() - 0.5) * 2 * amp;
p.y += Math.random() * amp;
```

`sin(π·t)` est nul aux bouts et maximal au milieu : l'éclair est « accroché » à ses extrémités et nerveux au centre. Le zigzag est **retiré toutes les 0,035 s** (`REJITTER`) pendant la vie de l'arc (0,08 à 0,32 s) : c'est le **crépitement**.

### Dessiner un segment : un quad le long du segment

Chaque segment est un plan fin, mais pas un billboard classique : il doit **aller de `p0` à `p1`** tout en faisant face à la caméra. On construit sa base de vecteurs à la main :

- `x = (p1 − p0)` normalisé → l'axe le long du segment ;
- `z = −direction de la caméra` ;
- `y = z × x` (produit vectoriel) normalisé → perpendiculaire aux deux : la « largeur » ;
- `matrix.makeBasis(x·longueur, y·ARC_WIDTH, z).setPosition(milieu)`.

Un `makeBasis` met ces trois axes comme colonnes de la matrice : le plan unité est étiré à la bonne longueur, orienté, centré. Chaque arc a aussi un halo bleu (`glows`, quad doux billboard).

### `onArc` et `flicker`

`onArc?: (position, life) => void` est un **callback** appelé pour chaque nouvel arc : `WeatherHelper` y branche les craquements sonores (voir Électricité dans [10](10-audio.md)). Ainsi l'effet visuel ne connaît pas l'audio. L'`activity` (0..1) décroît à `6/s` et sert à faire vaciller la lumière globale (`get flicker`).

## WispHelper : feux follets

Six lueurs violettes qui tournent autour du joueur (météo « malédiction »), avec un halo (grand, 20) et un coeur (petit, 5) en blending additif ; le tout dans un seul `InstancedMesh` de `WISPS × 2` instances.

- **Orbite elliptique** : `x = cos(angle)·r`, `z = sin(angle)·r·0.75`, `angle += vitesse·dt` (signe aléatoire = sens horaire ou non). Le rayon respire : `r·(0.85 + 0.15·sin(0.5·t))`.
- **Suivi avec retard** (`center`) : `center.lerp(player, 1 − exp(−dt·FOLLOW))`. Même formule de lissage exponentiel que pour les couleurs : le centre rattrape le joueur à vitesse proportionnelle à l'écart, sans dépendre du framerate. Les feux follets « traînent » plutôt qu'ils ne sont collés.
- **Scintillement irrégulier** : produit de deux sinus de fréquences sans rapport (7,3 et 2,1) puis un troisième lent : `(0.65 + 0.35·sin(7.3t)·sin(2.1t)) × (0.6 + 0.4·sin(0.4t))`. Le produit de sinus donne des battements non périodiques ; `Math.max(flicker, 0.1)` évite l'extinction complète.
- `center.x = NaN` sert de **drapeau « pas encore placé »** : au démarrage on copie la position du joueur pour éviter que les feux ne volent depuis l'origine.

## WhirlHelper : tourbillons de pétales

Jusqu'à 4 tourbillons de 110 pétales de cerisier (une rafale géante). Chaque pétale :

- monte une spirale : `h = (p.h + temps·climb/HEIGHT) % 1` (0 = bas, 1 = haut ; le modulo le fait recommencer en bas, « aspiré » puis « rejeté »),
- à un rayon qui grandit avec la hauteur : `radius = lerp(4, 18, h²)` → un cône évasé, `h²` garde le bas étroit,
- à un angle `angle`, position : `(cos(angle)·r, hauteur, sin(angle)·r·0.8)` (0,8 = ellipse légèrement aplatie).

### Angle intégré vs `temps × vitesse variable`

Point pédagogique clé, noté dans le code : « Turning: integrated (the speed depends on the height, which changes: multiplying the time by it would accelerate) ».

```ts
p.angle += dt * SPIN * p.spin * (1.4 - h * 0.7);      // intégré : OK
// à éviter :  angle = temps * SPIN * (1.4 - h * 0.7)   // accélère
```

Pourquoi ? Si la vitesse angulaire est `ω(h)` avec `h` qui change dans le temps, l'angle vrai est l'intégrale `θ(t) = ∫ ω(h(τ)) dτ`. Avec `angle = temps × ω(h(temps))`, on dérive : `dθ/dt = ω + temps·ω'·h'`, donc la vitesse apparente **croît avec le temps** (le pétale s'emballe). En **accumulant** `dt·ω` à chaque frame, on réalise l'intégrale : vitesse = `ω`, et rien de plus. Règle : *si la vitesse varie, on additionne ; on ne multiplie le temps que si la vitesse est constante.*

Autres points :
- **Présence** : chaque tourbillon a `presence` (0..1), montée/descente à `0.6/s`, qui module rayon et taille : il apparaît et disparaît en douceur. Il se déplace (`windX·TRAVEL + sin(...)·WANDER`), et sort par l'aval.
- `fade = min(h·6, 1, (1−h)·6) · presence` : les pétales grossissent au bas et rétrécissent en haut.
- `BASE_HEIGHT = 14` : le bas de la spirale est relevé pour ne pas traverser fleurs, panneaux, clôtures.
- `closeness(pos, range)` : `max(0, 1 − d/range) · presence` : une proximité 0..1 utilisée pour le son.
- Les pétales (`petals`) sont partagés entre les tourbillons : un seul jeu d'angles, positionné autour de chaque centre.

## TornadoHelper

### Entonnoir

650 sprites de poussière (`PUFFS`), hauteur 260. Pour un sprite à hauteur normalisée `h` (0..1) :

```
r(h)      = (7 + (70 − 7) · h^1.6) · (0.8 + 0.4·jitter)
angle(t)  = angle0 + t · SPIN · (1.3 − 0.6·h)       // plus vite en bas
taille(h) = lerp(10, 46, h)
```

L'exposant `1.6` : étroit près du sol, s'évase surtout vers le haut (profil convexe, entonnoir). `jitter` épaissit ou amincit chaque particule. L'ellipse `z·0.7` donne de la perspective. Une courbure sinusoïdale décale la colonne : `bend = sin(0.4t + 2.5h)·25·h` (`·h` : le bas reste fixé au sol). La répartition en hauteur `Math.pow(Math.random(), 0.8)` place un peu plus de particules en bas.

60 sprites supplémentaires (`RING_PUFFS`) forment un anneau de poussière à la base.

### Débris

160 feuilles (texture `makeLeafTexture('autumn')`, `alphaTest`) en orbite : `h = (b.h + t·climb) % 1`, rayon `radius·(1 − 0.5h)`, hauteur `sin(π·h)·DEBRIS_HEIGHT`. Le `sin(πh)` les fait monter puis **retomber**. Même angle **intégré** que les pétales (commentaire identique). La rotation d'Euler `(tt, 0.7tt, 1.3tt)` (rapports sans simplicité) fait culbuter sans cycle visible.

### Errance avec laisse

La tornade se déplace en coordonnées monde (`move`) :

- **Apparition** : à distance 110 à 200 du joueur, dans un demi-cercle (`angle ∈ [−π, 0]` : devant ou sur les côtés).
- **Errance** : le cap tourne selon un produit de deux sinus lents : `heading += sin(0.23t)·sin(0.11t + 2)·TURN_SPEED·2·dt`. Il tourne tantôt d'un côté, tantôt de l'autre, parfois presque droit.
- **Laisse** (`LEASH = 240`) : au-delà, on fait tourner le cap vers le joueur. L'écart d'angle est mis dans ]−π, π] avec `atan2(sin Δ, cos Δ)` (astuce classique : évite le saut 359° → 0°) puis **limité** à `±TURN_SPEED·dt` : la tornade vire en douceur, pas en demi-tour brusque.
- **Perdue** (`LOST_DISTANCE = 600`, par ex. après une téléportation) : elle s'efface (`presence → 0`) puis réapparaît près du joueur.
- La hauteur suit le joueur : `y += (player.y − y)·min(1, 2dt)`.
- `presence` monte/descend à `0.25/s` selon `intensity > 0.5` ; la taille de chaque particule est multipliée par `presence`.

## Envol du joueur : `updateFlight` et `liftCamera`

Dans `WeatherHelper.ts`. Si la tornade est assez forte (`strength > 0.8`), à moins de `TORNADO_CATCH = 16` du joueur et sans délai de repos (`FLIGHT_COOLDOWN = 5 s`), le joueur est emporté pendant `FLIGHT_TIME = 3.2 s`. Seul le **sprite** (`mesh.children[0]`) bouge ; la position logique reste sur sa case (le jeu se « gèle »).

Hauteur, avec `t = temps/durée` et `up = 0.6` :

```
t < up :  lift = 1 − (1 − t/up)²             // montée rapide qui ralentit (ease-out)
t ≥ up :  lift = 1 − ((t−up)/(1−up))²        // chute qui accélère (gravité)
y = base + 50 · max(lift, rebond)
```

Deux paraboles : la première est ralentie (dérivée nulle au sommet), la seconde est de vitesse croissante comme une vraie chute. Un petit **rebond** (`sin(...)·0.05`) clôt l'atterrissage à `t > 0.93`.

Rotation sur soi-même : la vitesse `FLIGHT_SPIN · sin(π·min(t/0.9, 1))` est **intégrée** (`flightSpin += speed·dt`, même règle que pour les pétales). La vitesse monte puis retombe à 0 à `t = 0.9` ; ensuite l'angle est ramené à 0 modulo 2π pour que le sprite atterrisse **de face**.

`liftCamera(height)` : la caméra monte de `50 · lift · 0.8` (`FLIGHT_CAMERA_FOLLOW`). Elle est déplacée **de façon relative** : `camera.position.y += height − this.cameraLift` puis `cameraLift = height`. On ajoute seulement la **différence** avec le décalage déjà appliqué, car le jeu continue de déplacer la caméra par ailleurs. À la fin : `liftCamera(0)` et `audio.thud()`.

## GhostHelper : fantômes de brume

Jusqu'à 4 silhouettes (`Sprite` three.js) dans la brume. La texture est dessinée au canvas : dégradé linéaire vertical, courbes quadratiques, `ctx.filter = 'blur(5px)'`.

- Apparition : toutes les 2 à 6 s, à 70 à 150 de distance, surtout dans le champ de vision (angle entre −1.1π et 0.1π, la caméra regarde vers −z).
- `sprite.center.set(0.5, 0)` : l'ancre est le **bas** du sprite : il « se tient » sur le sol quand on change d'échelle.
- Dissolution : si le joueur est à moins de `VANISH_DISTANCE = 50`, ou si la vie est finie, `vanishing = true`. L'alpha diminue à `1.5/s` (apparition `0.35/s`, lente). En disparaissant, il s'**étire** : `stretch = 1 + (1 − alpha)·0.6` et sa largeur diminue `base·0.5/stretch`, hauteur `base·stretch`.
- Souffle : opacité `0.8 + 0.2·sin(1.3t)`, rotation `±0.06 rad`, dérive en x.
- `nearest` : proximité 0..1 du fantôme le plus proche (`1 − dist/160` pondéré par l'alpha) pour le son.
- Contrairement aux autres, les fantômes créent **un matériau par sprite** (`registerUnlitMaterial(new SpriteMaterial)`). À la disparition : `scene.remove`, `UNLIT_MATERIALS.delete`, `material.dispose()` : sinon la liste de matériaux teintés ou la mémoire GPU fuiraient.

## FloodHelper : inondation

Un grand plan d'eau (`PLANE_SIZE = 1400`) qui monte (`RISE_SPEED = 0.12`/s) et redescend (`RECEDE_SPEED = 0.2`/s) jusqu'à `MAX_LEVEL = 4`.

- **Niveau** : on avance vers la cible à vitesse constante (`Math.min(wanted, level + dt·speed)`), sans dépasser.
- **Reflets** : `MeshPhongMaterial` avec `shininess: 90` et un `normalMap` (ondulations dessinées au canvas, tuilables : chaque bosse est dessinée aussi décalée de ±`size` pour se raccorder sur les bords). `offset` défile avec le temps et le vent.
- **Suit la caméra par tuiles entières** (`Math.round(target.x / 40) · 40`) : le plan se déplace d'un multiple de la taille de la texture, donc les ondulations ne glissent pas avec la caméra.
- `groundY` est figé quand l'eau commence à monter.
- **`renderOrder = -1`** : transparent, donc dessiné avec les autres transparents ; `-1` le met **en premier** pour que les sprites (joueur) soient dessinés *devant*. Sinon le tri par profondeur pourrait placer l'eau par-dessus le joueur. (Comparer avec `renderOrder = 10` des particules, qui doivent être *derniers*.)
- `depthWrite: false` : l'eau n'écrit pas de profondeur, ce qui évite qu'elle masque ce qui est derrière.
- `mesh.raycast = () => {}` : désactive le raycast pour que le plan n'intercepte pas les rayons (clics, sélection) : même réflexe sur tous les effets.

## Expériences à tenter

1. `ElectricHelper.ts` : `REJITTER = 0.2` ralentit le crépitement ; `SEGMENTS = 3` donne des éclairs anguleux.
2. Mets `BURST_CHANCE = 0.9` pour des gerbes d'étincelles.
3. `WhirlHelper.ts` : remplace `p.angle += dt * SPIN * p.spin * (1.4 - h * 0.7)` par `p.angle = this.time * SPIN * p.spin * (1.4 - h * 0.7)` : les pétales s'emballent au fil des minutes.
4. `TornadoHelper.ts` : `LEASH = 60` : la tornade colle au joueur. `TURN_SPEED = 5` : elle vire sèchement.
5. Exposant `1.6` de `Math.pow(h, 1.6)` → `1` (cône) ou `3` (trompe très étroite en bas).
6. `WeatherHelper.ts` : `FLIGHT_CAMERA_FOLLOW = 1` : le joueur reste immobile à l'écran pendant l'envol. `FLIGHT_SPIN = 60` : toupie.
7. `GhostHelper.ts` : `VANISH_DISTANCE = 5` : on peut s'approcher presque à les toucher.
8. `FloodHelper.ts` : `renderOrder = 10` : l'eau est dessinée au-dessus du joueur.
