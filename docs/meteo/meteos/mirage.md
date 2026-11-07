# 🫠 Mirage (`mirage`)

> Catégorie **Chaleur** · **jour uniquement** (choisi de nuit, l'heure passe à 12:00) · 44 °C

## Ce qu'on voit / entend

Une chaleur écrasante, sous une lumière blanche et dorée. L'air tremble, les couleurs sont délavées. Au loin, des flaques d'eau scintillantes couvrent le sol, mais on ne les atteint jamais : elles s'effacent quand on s'approche et réapparaissent ailleurs. L'image se dédouble légèrement, comme quand on a la tête qui tourne. Un sifflement aigu flotte dans l'air.

## Les paramètres

Preset `MIRAGE` dans `src/app/modules/game/shared/weather/Weather.ts` (seulement dans `DAY_PRESETS`) :

| Paramètre | Valeur | Effet |
|---|---|---|
| `litLevel` / `shadowLevel` | 1.15 / 0.7 | Lumière éblouissante ([éclairage](../concepts/03-eclairage-et-shaders.md)) |
| `specular` / `sunGlow` | 1 / 0.7 | Reflets et halo du soleil |
| `heatHaze` / `heatWash` | 0.7 / 0.6 | Air qui tremble, couleurs délavées ([Canicule](heatwave.md)) |
| `mirage` | 1 | Fausses flaques, image dédoublée, sifflement |
| `minWind` | 0.3 | Vent chaud léger ([vent](../concepts/11-vent.md)) |
| `fog` / `fogColor` | 0.15 / `0xf6e6cc` | Brume de chaleur |

## Comment c'est fait

### 1. Les fausses flaques : le shader du sol
Dans `FRAGMENT_BODY` (`weather-shader.ts`, uniform `uMirage`), seulement sur le sol (normale vers le haut, sous `y = 1`, comme la [Marée de lumière](light-tide.md)) :

```glsl
float mirageDist = length(vWeatherWorldPos.xz - uDarkCenter.xz);
float distant = smoothstep(MIRAGE_NEAR, MIRAGE_FAR, mirageDist);   // 70 → 130
float patches = smoothstep(0.52, 0.62, bruit à deux octaves qui dérive lentement);
float pool = patches * distant * mirageGround * uMirage;
reflectedLight.directDiffuse *= 1.0 - 0.7 * pool;
reflectedLight.indirectDiffuse = mix(reflectedLight.indirectDiffuse, sky, pool * 0.85);
```

- **Inatteignables** : `distant` vaut 0 à moins de 70 unités du joueur (`uDarkCenter`) et 1 au-delà de 130. Quand on avance vers une flaque, elle entre dans cette zone et s'efface. C'est exactement ce que fait un vrai mirage, qui reste toujours à la même distance devant soi.
- **Les taches** : du bruit à deux octaves seuillé par `smoothstep` (voir [bruit procédural](../concepts/07-bruit-procedural.md)), qui dérive lentement : les flaques changent de forme et se déplacent.
- **Remplacer plutôt qu'ajouter** : on **retire** une partie de la lumière directe (la couleur du sol) et on **remplace** la lumière indirecte par la couleur du ciel. Une flaque de mirage n'est rien d'autre que le reflet du ciel. Ajouter de la lumière éclaircirait seulement le sol, sans donner l'impression d'eau.
- **Les ondulations** : `sin(z × 1.7 + temps × 5 + bruit)` dessine de fines lignes horizontales qui bougent vite, comme la chaleur au-dessus de l'eau.

**Premier essai abandonné** : les flaques étaient calculées dans le post-effet, sur le haut de l'écran. Mais en vue de dessus, le haut de l'écran contient surtout des maisons et des arbres : les « flaques » apparaissaient sur les murs et les toits. Seul le shader du sol sait ce qui est du sol.

### 2. L'image dédoublée : le post-effet
Dans `HeatHazePass.ts` (voir [post-effets](../concepts/06-post-effets.md)) :

```glsl
vec2 ghost = vec2(sin(uTime * 0.7), sin(uTime * 0.5 + 1.0)) * vec2(0.006, 0.003);
c = mix(c, texture2D(tScene, vUv + offset + ghost).rgb, 0.25 * uMirage);
```

On relit l'image avec un léger décalage qui suit deux sinusoïdes lentes de fréquences différentes (le décalage trace une courbe qui ne se répète pas vite), et on la mélange à 25 % : une copie fantôme qui flotte.

`HeatHazePass.render` prend maintenant un objet `PostEffects` (`heat`, `wash`, `time`, `invert`, `film`, `mirage`) au lieu d'une longue liste de paramètres : plus lisible, et ajouter un effet ne change plus la signature.

### 3. Le sifflement
`WeatherAudio` (voir [audio](../concepts/10-audio.md)) : trois sons purs, à 2 900, 2 903 et 4 350 Hz, dans un gain dont le volume ondule lentement. Les deux premiers sont si proches qu'ils **battent** 3 fois par seconde (comme le bourdonnement de la [Distorsion temporelle](time-warp.md), mais dans l'aigu) : un tintement d'oreilles.

## Maths et code à retenir

- **Un effet qui dépend de la distance au joueur** peut être inatteignable par construction.
- **Remplacer la lumière** (moins de diffus, plus de ciel) pour simuler un reflet.
- **Le bon endroit pour un effet** : le shader du sol sait ce qui est du sol, le post-effet ne voit que des pixels.
- **Battement** de deux fréquences proches.

## Expériences à tenter

- `MIRAGE_NEAR = 20` et `MIRAGE_FAR = 40` dans `weather-shader.ts` : les flaques arrivent presque aux pieds du joueur.
- Remplace `0.52, 0.62` par `0.3, 0.4` : le sol devient un lac.
- Remplace `0.25 * uMirage` par `0.5 * uMirage` dans `HeatHazePass.ts` : une vision vraiment double.
- `MIRAGE_GAIN = 0.06` dans `WeatherAudio.ts` : un acouphène pénible.

## Voir aussi

- [Canicule](heatwave.md) : la même chaleur et le même air qui tremble.
- [Marée de lumière](light-tide.md) : un autre effet calculé sur le sol.
- [Vieux film](old-film.md) : un autre post-effet.
