# 11 · Vent

Le vent est un **nombre signé** `windX` (de −1, vers l'ouest, à +1, vers l'est) qui pilote les nuages, les précipitations, le brouillard et la végétation. Source : le curseur de force et la direction de l'interface ([01 · Architecture](01-architecture.md)), mélangés avec des rafales aléatoires. Les ombres de nuages sont expliquées en [03](03-eclairage-et-shaders.md), le brouillard en [05](05-brouillard-et-tenebres.md), les particules en [08](08-particules.md).

## 1. De l'interface à `windX`

`GameService.setWind(strength, direction)` appelle `windToX` (Weather.ts) :

```ts
export function windToX(strength: number, direction: WindDirection): number {
  return clamp(strength, 0, 1) * (direction === 'east' ? 1 : -1);
}
```

`WeatherHelper.setWind` le range dans `targetWindX` (borné à [−1, 1]). Il ne l'applique pas tout de suite. Dans `update` :

```ts
const windTarget = Math.sign(this.targetWindX || 1) * Math.max(Math.abs(this.targetWindX), p.minWind);
this.baseWindX += (windTarget - this.baseWindX) * (1 - Math.exp(-dt * TRANSITION_SPEED));
this.windX = clamp(this.baseWindX + this.updateGusts(dt), -MAX_GUSTY_WIND, MAX_GUSTY_WIND);
```

- **`minWind`** : une tempête de sable ou un blizzard imposent un vent minimal quelle que soit la jauge, dans le sens choisi. `Math.sign(x || 1)` évite `sign(0) = 0` : à vent nul, on garde le sens +1.
- **`baseWindX`** : le vent « de fond », lissé par la même exponentielle indépendante du framerate que les autres paramètres (voir [01](01-architecture.md)).
- **`windX`** = fond + rafale, plafonné à `MAX_GUSTY_WIND = 1.25` : une rafale peut dépasser le maximum de la jauge.

## 2. Les rafales : `updateGusts`

C'est une petite machine à états : *attente → rafale → attente*.

- Attente : `gustTimer` décroît ; quand il atteint 0 (et que `gustsEnabled`), une rafale naît avec une durée aléatoire `GUST_DURATION = [1.5, 3.5]` s et un pic aléatoire `gustPeak ∈ [0.55, 1]`. À la fin, nouveau délai aléatoire `GUST_INTERVAL = [3, 9]` s.
- Pendant la rafale, on calcule une **enveloppe** :

```ts
const envelope = smoothstep(t, 0, GUST_RISE)                                   // 0.45 s : montée
               * (1 - smoothstep(t, gustDuration - GUST_FALL, gustDuration));  // 1.2 s : retombée
const shake = 1 + 0.15 * Math.sin(this.gustTime * 7.3) * Math.sin(this.gustTime * 2.9);
const strength = GUST_CALM + GUST_STRENGTH * Math.abs(this.baseWindX);          // 0.12 + 0.7·|vent|
return Math.sign(this.baseWindX || 1) * strength * this.gustPeak * envelope * shake;
```

Le produit de deux `smoothstep` (un qui monte, un qui descend) donne une **bosse** : « monte vite, tient, retombe doucement ». Le `shake` (produit de deux sinus de fréquences 7,3 et 2,9, amplitude 15 %) ajoute un tremblement. La force du pic dépend du vent de fond : par vent nul, une brise de `GUST_CALM = 0.12` ; à plein vent, jusqu'à `0,12 + 0,7 = 0,82` d'ajout. Interrupteur : `setGusts(enabled)` (`gusts` dans l'interface).

## 3. Les nuages ne sentent pas les rafales

Les nuages sont **en altitude** : ils suivent le vent de fond, pas les rafales du sol.

```ts
const cloudWind = Math.min(Math.abs(this.baseWindX), 1);
const cloudSpeed = p.cloudSpeed * lerp(CLOUD_SPEED_NO_WIND, CLOUD_SPEED_FULL_WIND, cloudWind);   // 0.6 .. 1.8
this.cloudVelocity.set(CLOUD_DRIFT.x * Math.sign(this.baseWindX || 1), CLOUD_DRIFT.y).multiplyScalar(cloudSpeed);
u.uCloudOffset.value.addScaledVector(this.cloudVelocity, -dt * u.uCloudScale.value);
```

- `p.cloudSpeed` (unités monde/s, propre à la météo) est multiplié par un facteur de `0,6` (sans vent) à `1,8` (plein vent).
- `CLOUD_DRIFT = (1, 0.15)` normalisé : une direction légèrement oblique ; le x est inversé selon le sens du vent.
- **Conversion en coordonnées de texture** : `uCloudOffset` est en unités de texture (un tuile = `1/uCloudScale = 900` unités monde). On multiplie donc la vitesse monde par `uCloudScale` (`1/900`). Le signe `−dt` s'explique par la lecture `texture2D(uCloudMap, cloudPos·uCloudScale + uCloudOffset)` : pour que le motif **avance** dans un sens, on décale la coordonnée de lecture dans l'autre.
- Même formule de lissage pour la densité : `u.uCloudDensity.value += (target − value)·(1 − exp(−dt·TRANSITION_SPEED))`.

## 4. Le vent dans la végétation : `SWAY_VERTEX`

Le vent plie arbres et fleurs dans le **vertex shader** (avant la projection). Deux ingrédients :

**L'attribut `aSway`** (`SWAY_ATTRIBUTE`). `BasicMeshService.addSwayAttribute` donne à chaque sommet une souplesse :
```ts
const height = clamp(vertexY / top, 0, 1);
flex[i] = sway * Math.pow(height, 1.5);   // le haut plie bien plus que le milieu
```
0 à la base (rigide), `sway` au sommet ; l'exposant 1,5 courbe la flexion comme une tige. Les maillages sans cet attribut lisent 0 (rigides) : le `if (aSway > 0.0)` les saute.

**Le déplacement** (`SWAY_VERTEX`) :
```glsl
float gust = 0.65 + 0.35 * sin(uBeamTime * 1.3 + swayWorld.x * 0.04 + swayWorld.z * 0.03);
float flutter = sin(uFlutterPhase + swayWorld.x * 0.35 + swayWorld.z * 0.25);
transformed.x += aSway * (uWindX * 5.0 * gust + flutter * (0.25 + 1.2 * windAbs));   // SWAY_LEAN = 5.0
```
- **Inclinaison** : `aSway · uWindX · SWAY_LEAN · gust`. Elle est proportionnelle au vent signé : il penche dans son sens. `gust ∈ [0.3, 1]` fait « respirer » l'inclinaison.
- **Frémissement** : `flutter` est un sinus rapide d'amplitude `0.25 + 1.2·|vent|` (plus de vent, plus de secousses).
- Les termes `swayWorld.x·… + swayWorld.z·…` **décalent la phase selon la position** : deux plantes voisines ne bougent pas à l'unisson.
- Seul `x` bouge (commentaire : reste correct pour les couches d'arbres inclinées autour de `x`).

### `uFlutterPhase` : intégrer plutôt qu'évaluer

```ts
u.uFlutterPhase.value = (u.uFlutterPhase.value + dt * (2.5 + 5 * windAbs)) % (Math.PI * 2);
```

Si l'on écrivait `sin(time · fréquence(vent))`, **changer le vent changerait la phase** instantanément (`time` est grand : une petite variation de fréquence produit un grand saut) : la végétation sauterait. En **accumulant** la phase côté CPU (`φ += ω·dt`, avec `ω = 2.5 + 5·|vent|` rad/s), la fréquence varie sans saut. Le modulo `2π` garde la valeur petite : la précision `float` du shader se dégrade avec de grands nombres.

### L'ombre suit les feuilles : `getSwayDepthMaterial`

La shadow map est dessinée avec un matériau de profondeur. Si celui-ci ne pliait pas, l'ombre resterait rigide pendant que l'arbre ondule. `getSwayDepthMaterial()` crée **un seul** `MeshDepthMaterial` modifié par `onBeforeCompile` avec le même `SWAY_VERTEX`, et `mesh.customDepthMaterial = getSwayDepthMaterial()` l'assigne aux maillages flexibles. Les uniforms (`uWindX`, `uBeamTime`, `uFlutterPhase`) sont les mêmes objets que `WEATHER_UNIFORMS`. Son `customProgramCacheKey` vaut `'weather-sway-depth-v2'`.

## 5. Autres utilisations

- **Particules** : tous les helpers reçoivent `this.windX` ( `rain.update(dt, target, p.rain, this.windX)`), la neige reçoit en plus `snowDrift`.
- **Brouillard** : `drift = lerp(0.01, 0.2, |windX|)` ([05](05-brouillard-et-tenebres.md)).
- **Sable** : la face « au vent » reçoit des dunes (`sign(uWindX)`, [04](04-surfaces-meteo.md)).
- **Son** : `wind: Math.abs(this.windX)` alimente l'audio ([10 · Audio](10-audio.md)).

## Expériences à tenter

- `GUST_STRENGTH` (`WeatherHelper.ts`) à `3` et `GUST_INTERVAL` à `[0.5, 1]` : rafales violentes ; `MAX_GUSTY_WIND` limite le dépassement.
- `SWAY_LEAN` (`weather-shader.ts`) à `20` : arbres couchés par le vent ; vérifie aussi que leur ombre suit.
- Dans `SWAY_VERTEX`, remplace `uFlutterPhase` par `uBeamTime * 5.0` : change la force du vent en direct et observe le saut de phase (puis remets-le).
- `CLOUD_SPEED_FULL_WIND` à `10` : les nuages filent à pleine force du vent.
