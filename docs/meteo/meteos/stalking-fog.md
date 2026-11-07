# 🌁 Brouillard rôdeur (`stalking-fog`)

> Catégorie **Classique** · disponible **de jour et de nuit** · 8 °C le jour, 5 °C la nuit

## Ce qu'on voit / entend

Un mur de brume, blanc le jour et bleu nuit la nuit, entoure le joueur. Quand il marche, la brume s'écarte vite et révèle les alentours. Dès qu'il s'arrête, elle se referme lentement sur lui, comme si elle l'attendait. Le bord de l'éclaircie est déchiré et ondule. La nuit, les fenêtres allumées percent faiblement la brume. Pas de son pour l'instant.

## Les paramètres

Preset `STALKING_FOG` dans `src/app/modules/game/shared/weather/Weather.ts` :

| Paramètre | Jour | Nuit | Effet |
|---|---|---|---|
| `litLevel` / `shadowLevel` | 0.8 / 0.66 | 0.34 / 0.27 | Lumière diffuse, ombres faibles |
| `stalkingFog` | 1 | 1 | Active le mur de brume et l'éclaircie |
| `fog` / `fogColor` | 0.3 / `0xdde2e8` | 0.3 / `0x2a3040` | Brume légère dans l'éclaircie, et couleur du mur ([brouillard](../concepts/05-brouillard-et-tenebres.md)) |
| `windowGlow` | — | 0.5 | Fenêtres allumées |

## Comment c'est fait

### 1. Le mur et l'éclaircie : le shader
Dans `FOG_FRAGMENT` (`weather-shader.ts`), sur le même principe que les [Ténèbres](darkness.md), mais avec un rayon **variable** (uniform `uStalkRadius`) au lieu d'une constante :

```glsl
float stalkDist = length(vWeatherWorldPos.xz - uDarkCenter.xz);
float curl = wbNoise(vWeatherWorldPos.xz * 0.05 + uFogOffset * 2.5 + vec2(uBeamTime * 0.04, 0.0));
float stalkEdge = uStalkRadius * mix(0.65, 1.35, curl);
float stalkFog = smoothstep(stalkEdge * 0.35, stalkEdge, stalkDist);
gl_FragColor.rgb = mix(gl_FragColor.rgb, uFogColor, uStalk * mix(STALK_NEAR, STALK_FAR, stalkFog));
```

- La distance est mesurée **à plat** (`xz`) depuis le joueur : l'éclaircie est un cylindre, donc les toits proches restent visibles.
- Le bruit `curl` fait varier le rayon de ±35 % selon l'endroit, et il dérive avec le temps : le bord est déchiré et bouge (voir [bruit procédural](../concepts/07-bruit-procedural.md)).
- `smoothstep` donne un dégradé entre 35 % et 100 % du rayon : un bord flou plutôt qu'un cercle net.
- `STALK_NEAR` (0.12) laisse une fine brume même au centre, `STALK_FAR` (0.97) laisse les lumières très fortes percer le mur.

### 2. Le rayon qui suit le mouvement
`WeatherHelper.updateStalkingFog` compare la position du joueur avec celle de l'image précédente. S'il a bougé, il marche (sauf si le déplacement est énorme, c'est alors une téléportation). Le rayon visé est `STALK_OPEN` (90) en marchant et `STALK_CLOSED` (14) à l'arrêt. On s'en approche de façon **exponentielle** :

```ts
this.stalkRadius += (goal - this.stalkRadius) * (1 - Math.exp(-rate * dt));
```

À chaque seconde, le rayon parcourt une part fixe de l'écart restant : vite au début, puis de plus en plus doucement. La formule `1 - exp(-rate·dt)` donne le même résultat quelle que soit la fréquence d'images, contrairement à un simple `rate * dt`. Deux vitesses rendent l'effet vivant : `STALK_OPEN_RATE` (1.2) ouvre en une seconde environ, `STALK_CLOSE_RATE` (0.25) referme en une dizaine de secondes. C'est cette asymétrie qui donne l'impression d'une brume qui « rôde ».

## Maths et code à retenir

- **Approche exponentielle indépendante du nombre d'images** : `x += (but − x) · (1 − e^(−k·dt))`.
- **Deux vitesses** (ouverture rapide, fermeture lente) pour donner du caractère à une transition.
- **Domain noise sur un rayon** : bruit × rayon pour un bord organique.
- **Réutiliser un mécanisme** ([Ténèbres](darkness.md)) en rendant variable ce qui était constant.

## Expériences à tenter

- `STALK_CLOSE_RATE = 3` dans `WeatherHelper.ts` : la brume se jette sur le joueur dès qu'il s'arrête.
- `STALK_CLOSED = 0` : à l'arrêt, plus rien n'est visible.
- `STALK_FAR = 1.0` dans `weather-shader.ts` : un mur totalement opaque, même les fenêtres disparaissent.
- Remplace `mix(0.65, 1.35, curl)` par `1.0` : l'éclaircie devient un cercle parfait.

## Voir aussi

- [Ténèbres](darkness.md) : la même éclaircie, de rayon fixe.
- [Brouillard](fog.md) : le brouillard classique, en nappes.
