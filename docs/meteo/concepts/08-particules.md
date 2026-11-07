# 08 · Particules

Pluie, neige, braises, lucioles, feuilles, sable : des centaines à des milliers de petits objets qui bougent à chaque image. Cette fiche explique comment le jeu les dessine à bas coût (`InstancedMesh`), comment il les fait toujours apparaître autour du joueur, et ce que chaque helper a de particulier.

Retour : [README](../README.md). Voir aussi [07 · Bruit procédural](07-bruit-procedural.md), [09 · Effets spéciaux](09-effets-speciaux.md), [11 · Vent](11-vent.md), [01 · Architecture](01-architecture.md).

## `InstancedMesh` : un seul appel de dessin

Dessiner 2000 gouttes comme 2000 `Mesh` = 2000 *draw calls* : le CPU s'effondre. Un `THREE.InstancedMesh(geometry, material, count)` dessine **la même géométrie `count` fois en un seul appel**, chaque instance ayant sa propre **matrice 4×4** (position, rotation, échelle) et, optionnellement, sa propre couleur.

Les helpers suivent tous le même schéma :

```ts
this.mesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), material, n);
this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);   // on réécrit chaque frame
this.mesh.frustumCulled = false;                             // la boîte englobante de base ne suit pas les instances
...
this.matrix.compose(this.position, quaternion, this.scale);  // Matrix4 = T · R · S
this.mesh.setMatrixAt(i, this.matrix);
...
this.mesh.count = count;                      // n'en dessine que `count`
this.mesh.instanceMatrix.needsUpdate = true;  // renvoie le buffer au GPU
```

Détails qui comptent :
- `DynamicDrawUsage` prévient le GPU que le buffer change souvent.
- `frustumCulled = false` : three calcule la boîte englobante de la *géométrie de base* (un petit plan à l'origine), pas des instances ; sans ça tout disparaîtrait dès que l'origine sort de l'écran.
- `mesh.count` permet d'activer seulement une **part** des particules (`density`) sans réallouer.
- Les positions vivent dans des `Float32Array` (struct-of-arrays) : pas d'objets créés par particule, donc pas de travail pour le ramasse-miettes. On réutilise aussi les `Matrix4`/`Vector3` en champs privés.
- Couleur par instance : `setColorAt(i, color)` + `instanceColor.needsUpdate = true`.

## Billboards : faire face à la caméra

Un *billboard* est un plan qui regarde toujours la caméra. Astuce : lui donner **la même rotation que la caméra** :

```ts
this.matrix.compose(this.position, camera.quaternion, this.scale);   // SnowHelper.update
```

Le plan est dans son repère local (visage vers +Z) ; tourné par `camera.quaternion`, ses axes locaux x, y deviennent ceux de l'écran. Il est donc parallèle à l'écran, quel que soit l'angle de vue. (Commentaire de `SandHelper.update` : l'axe droit de la caméra est l'axe x du monde, donc les traînées horizontales le restent.)

Exceptions :
- les **gouttes de pluie** (`RainHelper`) ne sont pas orientées vers la caméra : un plan vertical, simplement incliné autour de Z selon le vent ;
- les **éclaboussures** sont des anneaux à plat (`geo.rotateX(-Math.PI / 2)`) ;
- les **feuilles** (`LeafHelper`) tournent en 3D (`euler`) : on veut voir qu'elles virevoltent.

## Mode de fusion : additif ou normal

| | `AdditiveBlending` | `NormalBlending` |
|---|---|---|
| Formule | `pixel = fond + source` | `pixel = fond·(1−α) + source·α` |
| Effet | pure lumière, ne peut qu'éclaircir | couleur opaque-ish qui masque |
| Pour disparaître | on **assombrit** la couleur vers le noir (noir ajouté = rien) | on réduit l'alpha ou la **taille** |
| Bon pour | nuit, bloom, braises | jour : la couleur reste |

`GlowParticles` expose exactement ce choix dans `GlowStyle.blending` (commentaire du fichier : *additive washes to white on a bright ground*). Pour le mode normal, un commentaire explique : « Normal blending can't dim to transparent with the color: the particle shrinks instead », d'où :

```ts
this.scale.setScalar(this.size[i] * (additive ? 1 : Math.sqrt(Math.max(brightness, 0))));
```

Le `sqrt` garde la particule visible plus longtemps qu'une réduction linéaire.

Même logique pour les éclaboussures de pluie : couleur de l'instance × `(1 − t)` vers le noir, et `fog: false` parce qu'en additif « le brouillard ajouterait sa couleur au lieu de cacher l'effet ».

## Profondeur et ordre de dessin : `depthWrite`, `renderOrder`, `alphaTest`

Les objets **transparents** sont triés de l'arrière vers l'avant puis dessinés *après* les opaques. Deux problèmes :

1. Une particule transparente qui écrit dans le **depth buffer** masquerait ce qui est derrière elle, même ses bords transparents. Remède : `depthWrite: false` (on teste la profondeur, on n'écrit pas). Tous les helpers le font.
2. Les bâtiments qui s'estompent (`canHide`) sont aussi transparents ; le tri de three pourrait les dessiner **par-dessus** les gouttes. Remède : `renderOrder = 10` (ou 11 pour les nuages de poussière) : dessinés après le reste. Commentaire du code : *Drawn after everything else*.

Les **feuilles** font autrement : `alphaTest: 0.5`. Un pixel de la texture est soit gardé soit jeté (découpe nette), donc la feuille est **opaque** et écrit la profondeur normalement : pas de tri nécessaire (`cut-out shapes: no transparency sorting needed`). Bonus : elle peut projeter une ombre (`castShadow = true`).

Pour le contraire (dessiner d'abord), voir `FloodHelper` dans [09](09-effets-speciaux.md) (`renderOrder = -1`).

## `followLight` : suivre la lumière du jour

Un matériau `MeshBasicMaterial` est **non éclairé** : il ignore le soleil. Donc des flocons de pleine intensité brilleraient en pleine nuit. `registerUnlitMaterial(mat)` (dans `weather-shader.ts`) l'inscrit dans `UNLIT_MATERIALS` ; chaque frame, `WeatherHelper` fait :

```ts
UNLIT_MATERIALS.forEach(mat => mat.color.copy(this.tmpColor).multiply(mat.userData['unlitBaseColor'] ?? WHITE));
```

La couleur de teinte du moment (nuit sombre, jour clair) est multipliée par la couleur propre du matériau (rouge sang pour les gouttes de sang). Elle applique aussi le brouillard en espace linéaire (`applyLinearFog`, voir [05](05-brouillard-et-tenebres.md)).

Dans `RainStyle.followLight` : `true` → `registerUnlitMaterial` (teinté par la lumière, sombre la nuit) ; `false` → `applyLinearFog` seul (toujours lumineux : la forte pluie, la pluie ensoleillée « comme à contre-jour »).

## Zone + respawn : toujours autour du joueur

On ne simule pas tout le monde, seulement un rectangle autour du point regardé par la caméra :

```ts
const RAIN_AREA = { minX: -240, maxX: 240, minZ: -300, maxZ: 140 };   // relatif à `target`
```

Chaque particule vit tant qu'elle reste dans la zone. Si elle sort (la caméra a bougé) ou si elle a atterri, on la **recycle** (`respawn`) : on la replace dans la zone. Aucune allocation, nombre constant.

Deux détails malins :
- **Hauteur aléatoire à la (ré)activation** (`randomHeight`) : sinon toutes les gouttes démarrent en haut et tombent en vague unique.
- **Départ en amont du vent** : on choisit d'abord *où* la goutte atterrit, puis on la fait partir `vx × durée_de_chute` plus loin :

```ts
this.dropX[i] = landX - this.vx * (y - stopY) / this.style.speed;
```

(durée de chute = hauteur / vitesse). Le test de zone s'applique aussi au **point d'atterrissage prévu**, pas à la position courante.

Le nombre actif est `count = round(max × clamp(density, 0, 1))` : les indices ≥ `count` sont marqués morts (`alive = 0`) ; en augmentant la densité, ils reviennent via `respawn`.

## `SurfaceHeights` : où s'arrêter ?

Une goutte doit s'arrêter sur le sol **ou un toit**. `SurfaceHeights.heightAt(x, z, fallback)` lance un rayon vers le bas (`THREE.Raycaster`) depuis `fallback + 1000` contre les objets marqués `userData[RAIN_STOP_KEY]`.

Un raycast coûte cher (milliers de cellules) ; deux protections :
- **Cache par cellule** de 4 unités (`HEIGHT_CELL`), clé numérique `cx * 1_000_003 + cz` (pas de string à allouer).
- Le cache n'est vidé que si la **liste de surfaces** change, vérifiée une fois par seconde (`SURFACES_CHECK_INTERVAL`) : `update(dt)` compare avec l'ancienne liste.

Hors carte : renvoie `fallback - 50` : la goutte tombe hors de vue.

L'instance est **partagée** entre tous les helpers : un raycast fait une fois profite à la pluie, à la neige, aux feuilles, etc.

## RainHelper et ses styles

Un `RainStyle` regroupe tout (`maxDrops`, `speed`, `length`, `width`, `color`, `opacity`, `windSpeed`, `splashes`, `top`, `followLight`, `splashColor`). Un seul helper dessine donc plusieurs météos : `RAIN_STYLE`, `DRIZZLE_STYLE` (bruine : fines, lentes, sans éclaboussure), `BLOOD_RAIN_STYLE`, `HAIL_STYLE` (grêlons courts et épais), `SUN_RAIN_STYLE`, `POISON_RAIN_STYLE`. Les variantes font `{ ...RAIN_STYLE, ... }` et ne changent que ce qui diffère.

- **Traînée** : un `PlaneGeometry(width, length)` dont l'origine est au bas (`geo.translate(0, length/2, 0)`), avec un **dégradé en couleur de sommets** (alpha 1 en bas, 0 en haut) : il donne le flou de mouvement sans texture.
- **Inclinaison** : `tilt = rotation autour de Z de atan2(vx, speed)`. La goutte se déplace de `(vx, −speed)` ; l'angle par rapport à la verticale est `atan(vx / speed)`. Les gouttes suivent leur trajectoire.
- **Éclaboussures** : un tampon circulaire de `MAX_SPLASHES = 400` (`nextSplash = (nextSplash + 1) % MAX`), âge 0 → `SPLASH_LIFE = 0.25 s`. Taille `s = 0.4 + 1.6·t`, couleur × `(1 − t)`. Légèrement relevées (`y + 0.3`) contre le *z-fighting* (deux surfaces coplanaires qui se disputent le pixel).
- Les styles de « drizzle » limitent `top` car des gouttes lentes passant près de la caméra feraient d'énormes traits.

## SnowHelper : dérive et étirement

Même squelette (plan billboard + texture canvas radiale `makeFlakeTexture`) avec :
- vitesses de chute 22 à 42 (pluie : 420) ;
- **balancement** : `sway = sin(time·SWAY_SPEED + phase) · SWAY`, déphasé par flocon pour qu'ils ne bougent pas en choeur ;
- paramètre `drift` (1 = neige normale, plus = blizzard) :

```ts
this.vx = windX * SNOW_WIND_SPEED * drift;
this.fallScale = 1 + (drift - 1) * 0.6;
this.stretch = 1 + (drift - 1) * 0.5 * Math.min(Math.abs(windX), 1);
```

En blizzard, la neige est poussée presque à l'horizontale ; on l'**accélère en chute** (sinon les flocons partiraient très loin hors écran) et on **étire** le sprite le long du vent (`scale.x = size × stretch`). `density` va jusqu'à 2 (4000 flocons max).

## GlowParticles et ses styles

Pour tout ce qui flotte et brille : braises (`EMBER_STYLE`), lave, pollen, cendres, neige magique, poussière d'étoiles, lucioles, fées, spores. Un `GlowStyle` donne : `rise` (montée), `wobble`, `life`, `size`, `spawnHeight`, `flicker`, `nearPlants`, `intensity`, `palette`…

Formules (dans `update`) :

```
t           = âge / vie
flicker     = 1 − f · (0.5 + 0.5·sin(temps·vitesse + phase·3))
brightness  = sin(π·t) · flicker
```

`sin(π·t)` vaut 0 en t=0, 1 en t=0,5, 0 en t=1 : la particule **apparaît puis s'éteint** en douceur. Le `flicker` module entre `1−f` et `1`. `intensity > 1` multiplie la couleur pour qu'elle dépasse 1 et déclenche le **bloom** la nuit.

- `nearPlants` : une part des particules apparaît autour des plantes (objets dont la géométrie a l'attribut `SWAY_ATTRIBUTE`), liste rafraîchie toutes les 2 s (`PLANTS_REFRESH`) : les lucioles restent près des buissons.
- `setColor` : la couleur change en douceur : `baseColor.lerp(targetColor, 1 − exp(−dt·3))`. Cette forme (`1 − e^(−k·dt)`) donne un lissage **indépendant du framerate**.
- Palette : chaque particule choisit au hasard une couleur parmi `color` + `palette`.

## LeafHelper

Feuilles d'automne et pétales de cerisier (`LeafMode`), textures dessinées au canvas avec des courbes de Bézier (`makeLeafTexture`), teintées par instance (`LEAF_PALETTES`).

- **Chute en planeur** : la vitesse verticale dépend de l'angle du balancement : `speed × (0.6 + 0.4·|cos(time·SWING_SPEED + phase)|)` ; elle ralentit quand la feuille « plane » en bout d'oscillation.
- **Rotation 3D** : `euler.set(sin(t)·1.2 + 0.4, t·0.8, cos(t·1.3)·0.9)` avec `t = time·spin + phase` : trois fréquences sans rapport évitent un mouvement périodique évident.
- **Au sol** : le sol sous la feuille est re-interrogé à chaque frame (`heightAt(x, z)`) parce qu'elle a dérivé ; elle s'allonge à plat (`euler.set(-π/2, 0, …)`), reste 3 à 7 s (`REST_TIME`), puis rétrécit (`SHRINK_TIME`) avant de renaître.
- 60 % (`NEAR_PLANTS`) naissent près des plantes et 18 à 55 unités de haut : ce sont les arbres qui les lâchent.

## SandHelper

Deux couches `Blown` : des **grains** (traînées rapides, `MAX_GRAINS = 1400`, vitesse 130–220) et des **nuages de poussière** (gros sprites mous, `MAX_PUFFS = 70`, opacité 0,2).

- Particules à entrer côté **amont** et sortir côté aval : `x = −dir · rand(maxX − 30, maxX)` au respawn.
- Grains près du sol : `t = Math.pow(Math.random(), 2)` pour la hauteur ; élever au carré un nombre dans [0,1] **concentre** les valeurs vers 0.
- Saltation : `bob = sin(time·6 + p)·0.6` (petits rebonds) pour les grains ; oscillation lente pour les nuages.
- `sandWind(windX)` impose un vent minimal (`MIN_WIND = 0.6`) : le sable souffle toujours.
- La classe interne `Blown` regroupe tableaux + `InstancedMesh` d'un groupe ; `renderOrder` 10 (grains) et 11 (poussière) pour que la poussière soit dessinée en dernier.

## Expériences à tenter

1. `RainHelper.ts` : mets `RAIN_STYLE.speed` à `120` : la pluie devient une bruine lente ; remets `width` à `2` pour voir les plans.
2. Dans `SnowHelper.ts`, mets `FLAKES_PER_DENSITY = 200` puis `MAX_FLAKES` à 400 : observe la densité.
3. Passe `RainStyle.followLight` à `true` sur `RAIN_STYLE` et regarde la pluie de nuit.
4. Dans `GlowParticles.ts`, bascule `LAVA_STYLE.blending` à `'additive'` : de jour, les braises deviennent blanchâtres.
5. Dans `RainHelper.respawnDrop`, retire `- this.vx * (y - stopY) / this.style.speed` : par vent fort, la pluie n'atteint plus l'avant de l'écran.
6. `HEIGHT_CELL = 40` dans `SurfaceHeights.ts` : les gouttes s'arrêtent au mauvais niveau sur les toits (cache trop grossier) ; `HEIGHT_CELL = 1` : plus précis, mais plus de raycasts.
7. `LeafHelper.ts` : remplace `alphaTest: 0.5` par `transparent: true` : des feuilles se dessinent par-dessus des bâtiments dans le mauvais ordre.
