# 05 · Brouillard et ténèbres

Le brouillard et les ténèbres sont deux variantes d'une même idée : **mélanger la couleur finale d'un pixel avec une couleur de brouillard** selon un coefficient `f` entre 0 et 1 : `couleur = mix(couleur, fog, f)` (soit `c·(1 − f) + fog·f`). Tout est dans `FOG_FRAGMENT` (weather-shader.ts), injecté par `applyWeatherShader` ([03 · Éclairage et shaders](03-eclairage-et-shaders.md)). Les uniforms sont écrits par `WeatherHelper.updateFog` ([01 · Architecture](01-architecture.md)).

## 1. Pourquoi « espace linéaire » ?

Depuis three r152 le moteur travaille en **linéaire** (les calculs de lumière sont physiquement corrects) et convertit en **sRGB** à la toute fin, dans le chunk `colorspace_fragment`. Mélanger deux couleurs *après* conversion donne un résultat différent (le sRGB est une courbe, `≈ x^(1/2.2)`) : le brouillard serait plus clair ou plus sombre selon l'endroit où il est mélangé.

Il y a un cas concret : les post-effets ([06](06-post-effets.md)) rendent la scène dans une texture **linéaire** (`HalfFloatType`) puis convertissent à l'écran. Avec le brouillard standard de three (mélangé *après* conversion à l'écran, mais en linéaire dans une texture), l'image « sauterait » à l'activation des rayons ou du bloom. La solution est de **toujours mélanger avant la conversion** :

```ts
// applyWeatherShader (matériaux éclairés)
.replace('#include <fog_fragment>', '')
.replace('#include <colorspace_fragment>', FOG_FRAGMENT + '#include <colorspace_fragment>');
```

`applyLinearFog` fait la même chose pour les matériaux **sans éclairage** (sprites) qui, eux, utilisent le `FogExp2` de la scène :

```ts
shader.fragmentShader = shader.fragmentShader
  .replace('#include <fog_fragment>', '')
  .replace('#include <colorspace_fragment>', '#include <fog_fragment>\n#include <colorspace_fragment>');
```

C'est pourquoi les couleurs de brouillard (`uFogColor`, `uStainColor`…) sont données en linéaire : `THREE.Color` de three stocke des valeurs linéaires.

## 2. Le brouillard par nappes (`FOG_FRAGMENT`, première partie)

```glsl
float fogDist = length(vWeatherWorldPos - cameraPosition);
float fogNoise = wbNoise(fogPos * 0.012 + uFogOffset) * 0.65
               + wbNoise(fogPos * 0.035 - uFogOffset * 1.6 + vec2(uBeamTime * 0.02, 0.0)) * 0.35;
float fogAmount = uFog * (0.35 + 0.65 * smoothstep(120.0, 420.0, fogDist));   // FOG_NEAR, FOG_FAR
fogAmount *= mix(0.45, 1.25, fogNoise);
fogAmount *= 1.0 - 0.35 * smoothstep(5.0, 60.0, vWeatherWorldPos.y);
gl_FragColor.rgb = mix(gl_FragColor.rgb, uFogColor, clamp(fogAmount, 0.0, 0.92));
```

Étape par étape, avec `F = uFog` (la valeur `fog` de la météo, 0 à 1) :

1. **Distance** : `fogDist` est la distance caméra-fragment. Le terme `0.35 + 0.65·smoothstep(FOG_NEAR, FOG_FAR, d)` fait passer le brouillard de `35 %` de `F` près de la caméra à `100 %` au-delà de 420. Il reste donc un voile proche ; l'horizon disparaît. Les constantes sont commentées : la caméra est à ~210 unités de la cible.
2. **Nappes** : deux couches de bruit de valeur ([07](07-bruit-procedural.md)) à des fréquences différentes (0,012 et 0,035), qui dérivent à des vitesses différentes (`uFogOffset` et `uFogOffset·1.6` en sens opposé, plus `uBeamTime`). Les nappes se **déforment** au lieu de glisser en bloc. `mix(0.45, 1.25, fogNoise)` module la densité : de presque `0,45×` dans les trouées à `1,25×` dans les masses épaisses.
3. **Brouillard au sol** : `1 − 0.35·smoothstep(5, 60, y)` : à partir de 60 unités de haut, le brouillard est réduit de 35 % : les toits émergent un peu.
4. **Plafond** : `clamp(…, 0, 0.92)` : le brouillard n'est jamais opaque.

Côté CPU, la dérive est l'intégration d'une vitesse :

```ts
const drift = lerp(FOG_DRIFT_NO_WIND (0.01), FOG_DRIFT_FULL_WIND (0.2), windAbs) * Math.sign(this.windX || 1);
u.uFogOffset.value.x -= drift * dt;
```

Le brouillard va dans le sens du vent ([11 · Vent](11-vent.md)). Comme `uFogOffset` s'incrémente (au lieu de dépendre du temps absolu), un changement de vent n'a pas de saut de phase.

## 3. `FogExp2` et la densité de `updateFog`

Les sprites ne passent pas par `FOG_FRAGMENT` : ils utilisent le brouillard natif de la scène, un `THREE.FogExp2`. three le calcule ainsi :

```
f(depth) = 1 − exp( −(density · depth)² )
```

Pour que ce brouillard donne **une part voulue `s`** à la distance de la cible (`D = CAMERA_TARGET_DISTANCE = 212`), on inverse la formule :

```
s = 1 − exp(−(ρ·D)²)   ⇒   (ρ·D)² = −ln(1 − s)   ⇒   ρ = √(−ln(1 − s)) / D
```

```ts
// updateFog
const share = Math.min(p.fog * UNLIT_FOG_SHARE, 0.95);   // UNLIT_FOG_SHARE = 0.4
this.sceneFog.density = share > 0.001 ? Math.sqrt(-Math.log(1 - share)) / CAMERA_TARGET_DISTANCE : 0;
this.sceneFog.color.copy(u.uFogColor.value);
```

Un sprite reçoit donc 40 % de `fog` à la distance de la cible, comme le sol autour de lui (`0.35 + …` ci-dessus). Le `min(…, 0.95)` évite `ln(0)` (division par zéro à `share = 1`). Le brouillard `FogExp2` est installé une fois dans le constructeur (`game.scene.fog = this.sceneFog`).

## 4. Les ténèbres (`uDarkness`, `DARK_*`)

Dans la météo `darkness` (0 à 1), la vue se referme autour du joueur :

```glsl
float darkDist = length(vWeatherWorldPos.xz - uDarkCenter.xz);
float wisp = wbNoise(vWeatherWorldPos.xz * 0.045 + uFogOffset * 2.0 + vec2(0.0, uBeamTime * 0.03));
float edge = DARK_RADIUS * mix(0.7, 1.3, wisp);                 // DARK_RADIUS = 64
float dark = smoothstep(edge * 0.3, edge, darkDist);
gl_FragColor.rgb = mix(gl_FragColor.rgb, uFogColor, uDarkness * mix(DARK_NEAR, DARK_FAR, dark));   // 0.45 .. 0.99
```

- `uDarkCenter` = la cible de la caméra (le joueur), poussée par `updateFog` (`u.uDarkCenter.value.copy(this.game.getCameraTarget())`). Seule la distance **horizontale** compte.
- Le rayon de visibilité `DARK_RADIUS = 64` (8 cases) est modulé par un bruit `wisp` entre `0,7×` et `1,3×` : le bord est **irrégulier et ondule**. `smoothstep(edge·0.3, edge, d)` donne 0 au centre et 1 au bord.
- La couleur est mélangée avec `uDarkness × (0,45 à 0,99)`. Même à `dark = 0` (au pied du joueur), on garde `0,45` : la zone proche est déjà assombrie. Jamais plus de 99 % : les fenêtres allumées (très brillantes) percent encore faiblement (commentaire du code). On utilise `uFogColor`, qui est la couleur de brouillard de la météo.
- Le brouillard et les ténèbres s'additionnent séquentiellement : le second `mix` s'applique sur le résultat du premier.

## 5. Récapitulatif des paramètres de météo

| Champ `WeatherParams` | Uniform | Effet |
|---|---|---|
| `fog` | `uFog` | Intensité des nappes (et `FogExp2` des sprites) |
| `fogColor` | `uFogColor` | Couleur (mélangée avec les teintes d'aube/crépuscule, voir [02](02-jour-nuit.md)) |
| `darkness` | `uDarkness` | Fermeture autour du joueur |

## Expériences à tenter

- `FOG_NEAR` (`weather-shader.ts`) à `0` et `FOG_FAR` à `150` : le brouillard devient épais dès le premier plan.
- `DARK_RADIUS` à `200` puis `20` sous la météo `DARKNESS` : la zone visible grandit ou se réduit.
- `DARK_NEAR` à `0` : plus de voile au pied du joueur, uniquement un anneau d'obscurité.
- `UNLIT_FOG_SHARE` (`WeatherHelper.ts`) à `1.0` et à `0.0` : compare le sprite du joueur et le décor autour dans le brouillard.
