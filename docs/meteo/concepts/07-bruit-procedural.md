# 07 · Bruit procédural

Presque tout ce qui est « organique » dans la météo (nuages, flaques, ombres de feuillage, brouillard, neige par plaques, sable) vient d'une seule idée : **du bruit**, c'est-à-dire des valeurs aléatoires mais *lisses*. Cette fiche explique comment on le fabrique, comment on le relit, et comment on évite qu'on voie qu'il se répète.

Retour : [README](../README.md) · Voir aussi [03 · Éclairage et shaders](03-eclairage-et-shaders.md), [04 · Surfaces météo](04-surfaces-meteo.md), [05 · Brouillard et ténèbres](05-brouillard-et-tenebres.md).

## Pourquoi pas `Math.random()` ?

Un tirage aléatoire pur donne du « grésillement » : chaque pixel est indépendant de son voisin. Un nuage, lui, a des **grandes masses douces** et des **bords déchiquetés**. Il faut donc un hasard *corrélé dans l'espace* : des points proches ont des valeurs proches.

## Value noise

Principe : on tire une valeur aléatoire à chaque sommet d'une grille (le « réseau », *lattice*), puis on **interpole** entre les sommets. Pour un point `p` :

- `i = floor(p)` : la case ; `f = fract(p)` : la position dans la case, entre 0 et 1.
- les 4 coins de la case ont une valeur chacun ; on mélange d'abord en x, puis en y (interpolation **bilinéaire**) :

```
top    = lerp(v00, v10, fx)
bottom = lerp(v01, v11, fx)
valeur = lerp(top, bottom, fy)      avec lerp(a, b, t) = a + (b - a)·t
```

C'est exactement ce que fait `wbNoise` dans `weather-shader.ts` (GLSL, `mix` = `lerp`) :

```glsl
float wbHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float wbNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(wbHash(i), wbHash(i + vec2(1.0, 0.0)), f.x),
             mix(wbHash(i + vec2(0.0, 1.0)), wbHash(i + vec2(1.0, 1.0)), f.x), f.y);
}
```

### `wbHash` : un hasard sans mémoire

Un shader ne peut pas stocker une grille de nombres aléatoires facilement ; il utilise une **fonction de hachage** : même entrée, même sortie, mais sortie « imprévisible ».

```
hash(p) = fract( sin(p · (127.1, 311.7)) × 43758.5453 )
```

- `dot` transforme le point 2D en un seul nombre.
- `sin` le plie dans [-1, 1] ; la **grande multiplication** amplifie les petites différences ; `fract` garde la partie décimale (0..1). Ces constantes sont un classique du « shader golf » : rien de magique, elles « brouillent » bien.
- Limite : sur certains GPU, `sin` d'un très grand argument perd en précision, d'où des motifs visibles loin de l'origine. Ici les entrées restent petites (coordonnées divisées par une échelle).

## `smoothstep` : adoucir

Interpoler linéairement donne des **plis visibles** à la frontière des cases (la pente change brusquement). On remplace `f` par :

```
s(t) = 3t² − 2t³        (smoothstep de 0 à 1)
```

Propriétés : `s(0)=0`, `s(1)=1`, et la **dérivée est nulle aux deux bouts** : la courbe arrive à plat dans chaque sommet, donc deux cases voisines se raccordent sans cassure. C'est la ligne `f = f * f * (3.0 - 2.0 * f)` ci-dessus, et `fx = fx * fx * (3 - 2 * fx)` dans `makeCloudTexture` (`cloud-texture.ts`).

La fonction GLSL `smoothstep(a, b, x)` fait la même chose avec une rampe : `t = clamp((x−a)/(b−a), 0, 1)` puis `3t²−2t³`. On s'en sert surtout comme **seuil à bord doux** (voir plus bas).

## fbm : empiler des octaves

Un seul value noise est trop « mou ». Le **fbm** (*fractional Brownian motion*) additionne plusieurs **octaves** : chaque octave a une grille 2 fois plus fine et une amplitude 2 fois plus faible.

```
fbm(p) = Σ_o  amplitude_o · noise(p · 2^o)      avec amplitude_o = 0.5^o
```

Les grosses octaves donnent les masses, les petites les détails. Dans `cloud-texture.ts` :

```ts
const BASE_CELLS = 4;   // cellules de la 1re octave sur la texture
const OCTAVES = 5;
...
const cells = BASE_CELLS << o;          // 4, 8, 16, 32, 64
const amplitude = Math.pow(0.5, o);
```

Comme les octaves sont **sommées**, la plage de sortie n'est pas 0..1. D'où la **normalisation** à la fin : on relève `min` et `max` de toute la texture et on remappe `(v − min) / (max − min)` sur 0..255. Ainsi les seuils des shaders ont toujours le même sens, quelle que soit la graine.

## PRNG seedé : le même ciel à chaque chargement

`seededRandom(seed)` dans `cloud-texture.ts` est un petit générateur pseudo-aléatoire **déterministe** (famille *mulberry32*). Il utilise des multiplications entières 32 bits (`Math.imul`) et des décalages de bits (`>>>`) pour mélanger l'état, puis divise par `4294967296` (2³²) pour obtenir un flottant dans [0, 1[.

Pourquoi pas `Math.random()` ? Parce qu'avec une graine fixe (`seededRandom(42)`), les nuages et les flaques sont **identiques à chaque chargement** : une flaque ne « déménage » pas, les bugs sont reproductibles, et le CPU et le GPU voient la même carte (voir `sampleNoiseMap`).

## Texture tuilable

Une texture de 256×256 doit couvrir un monde immense : on la **répète**. Pour que la jonction ne se voie pas, le bruit doit être **périodique**. Dans `makeCloudTexture` :

```ts
const at = (x: number, y: number) => lattice[(y % cells) * cells + (x % cells)];
```

Le modulo (`%`) fait que la colonne `cells` est la même que la colonne 0 : le bord droit se raccorde au bord gauche. Côté three.js il reste à demander la répétition :

```ts
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.colorSpace = THREE.NoColorSpace; // data texture, not a color
```

`NoColorSpace` est important : ce sont des **données**, pas une couleur ; three ne doit pas appliquer de conversion sRGB.

## `sampleNoiseMap` : la même lecture sur CPU et GPU

Problème : le GPU lit la texture avec `texture2D(uCloudMap, uv)`. Mais le jeu doit aussi savoir, côté JS, « y a-t-il une flaque sous mes pieds ? » (pour jouer le bruit de pas dans l'eau, voir [10 · Audio](10-audio.md), section Pas). On ne peut pas relire facilement un pixel du GPU. Solution : `makeCloudTexture` **garde une copie** des valeurs (`noiseValues`) et `sampleNoiseMap(u, v)` refait à la main ce que fait le matériel :

- wrap : `u − floor(u)` ramène dans [0, 1[ ;
- `x = u·n − 0.5` : les **centres de texels** sont à `+0.5` (convention GPU) ;
- interpolation **bilinéaire** entre les 4 texels voisins (`at(x0,y0)`, `at(x0+1,y0)`, …) avec modulo pour le wrap ;
- division par 255.

Résultat : même valeur (à l'arrondi 8 bits près) des deux côtés. Retourne `0` tant que la texture n'est pas générée.

## Casser la répétition : des couches tournées, à échelles différentes

Une seule lecture de la texture laisse voir le motif qui revient. Astuce : lire la **même** texture **plusieurs fois**, chaque fois avec une échelle, une rotation et un décalage différents, puis pondérer. Dans `weather-shader.ts` :

```ts
const PUDDLE_LAYERS = [
  { scale: 1 / 260, angle: 0,       offset: [0.13, 0.57], weight: 0.5 },
  { scale: 1 / 83,  angle: 0.6458,  offset: [0.61, 0.29], weight: 0.35 },
  { scale: 1 / 31,  angle: -1.0647, offset: [0.83, 0.07], weight: 0.15 },
] as const;
```

- `scale = 1 / taille d'une tuile en unités monde` : 1/260 → une tuile = 260 unités.
- `angle` : on tourne les coordonnées : `x' = cos·x − sin·z`, `z' = sin·x + cos·z`.
- Les trois échelles (260, 83, 31) n'ont **aucun rapport simple** (rapports ≈ 3,1 et ≈ 2,7) : les répétitions des trois couches ne s'alignent jamais vraiment.
- Les poids somment à 1 (0.5 + 0.35 + 0.15) : grandes zones humides/sèches, forme des flaques, bords irréguliers.

Le même schéma sert au feuillage (`CANOPY_LAYERS`, voir [04](04-surfaces-meteo.md)) avec en plus un `sway` : plus la couche est fine, plus le vent la fait onduler.

Le code GLSL est **généré** depuis le tableau TypeScript (`PUDDLE_LAYERS.map(...)` dans `puddleHollow`), et `puddleAt` utilise le *même* tableau côté CPU : une seule source de vérité, donc pas de décalage entre ce qu'on voit et ce qu'on entend.

### Recalibrer les seuils

Additionner trois couches **change la distribution** des valeurs : la somme pondérée de bruits est plus « concentrée » autour de la moyenne (théorème central limite en plus : plus on additionne, plus ça ressemble à une cloche). Un seuil qui donnait 15 % de flaques avec une seule couche n'en donne plus autant. D'où des constantes mesurées :

```ts
/** Puddle threshold for a puddles level 0..1: ~2% of the ground at first, ~15% when full. */
const PUDDLE_LEVEL = [0.671, 0.553] as const;
export function puddleLevel(puddles) { return a + (b - a) * Math.sqrt(Math.max(puddles, 0)); }
```

Les flaques sont là où `hollow > level`. Un seuil **haut** (0,671) = peu de surface ; **bas** (0,553) = beaucoup. `√puddles` fait apparaître les premières flaques tôt (la racine croît vite près de 0). `PUDDLE_EDGE = 0.02` règle la douceur du bord via `smoothstep(level, level + EDGE, hollow)`.

Si tu modifies les échelles ou les poids, **recalibre** `PUDDLE_LEVEL` pour retrouver la même proportion de sol mouillé : c'est la leçon pratique à retenir.

## Seuil à bord doux : nuages

`smoothstep` + seuil = « où le bruit dépasse X, avec un flou de largeur Y ». C'est la forme des nuages (`weather-shader.ts`) :

```glsl
float cloudThreshold = mix(0.72, 0.28, uCloudDensity);
float cloud = smoothstep(cloudThreshold - 0.06, cloudThreshold + 0.14, cloudNoise);
```

Plus la densité monte, plus le seuil descend, plus de bruit passe au-dessus : le ciel se couvre. On retrouve ce motif pour la neige par plaques, le sable (`drift`), le givre, la couche de ténèbres, etc.

## Où `wbNoise` est utilisé

Contrairement à la texture (lecture, 1 fetch), `wbNoise` **calcule** le bruit à la volée avec 4 `wbHash` : pas de texture, pas de tuile visible, résolution infinie, mais plus de calcul ALU. On l'emploie pour des motifs qui bougent et à plusieurs échelles : brouillard (`fogNoise`), plaques de neige (`patches`), dérive du sable, aurores, orientation des rayons de soleil (`beamPattern`).

Règle simple : **texture** quand la forme doit être lue aussi par le CPU ou est coûteuse à calculer ; **`wbNoise`** pour des détails qui défilent ou n'ont besoin d'aucune cohérence côté JS.

## Expériences à tenter

1. Dans `cloud-texture.ts`, mets `OCTAVES = 1` puis `8` : observe les nuages (très doux, puis très granuleux).
2. Change `seededRandom(42)` en `seededRandom(7)` : nouveaux nuages et nouvelles flaques, mais toujours les mêmes à chaque rechargement.
3. Dans `PUDDLE_LAYERS`, mets tous les `angle` à 0 et remplace les trois `scale` par `1/100` : tu verras la répétition apparaître au sol.
4. Après ça, mets les poids à `0.34 / 0.33 / 0.33` sans toucher à `PUDDLE_LEVEL` : la surface de flaques change (recalibrage).
5. Dans `wbHash`, remplace `43758.5453` par `4.5` : le bruit devient régulier (les petites différences ne sont plus amplifiées).
6. Remplace `f = f * f * (3.0 - 2.0 * f)` par `f` (interpolation linéaire) : des plis en grille apparaissent dans le brouillard.
