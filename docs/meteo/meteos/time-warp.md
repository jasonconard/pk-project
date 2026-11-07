# ⏳ Distorsion temporelle (`time-warp`)

> Catégorie **Magie & ciel** · disponible **de jour et de nuit** · 15 °C le jour, 12 °C la nuit

## Ce qu'on voit / entend

Le temps se dérègle : toute la météo tourne au ralenti, des poussières de lumière restent suspendues dans l'air, l'air ondule légèrement et des anneaux de lumière violette partent du joueur et s'étendent sur le sol. Une horloge égrène ses secondes, graves et étirées, avec un long écho, au-dessus d'un bourdonnement qui bat lentement.

## Les paramètres

Preset `TIME_WARP` dans `src/app/modules/game/shared/weather/Weather.ts` :

| Paramètre | Jour | Nuit | Effet |
|---|---|---|---|
| `ambientColor` / `sunColor` / `unlitTint` | violets pâles | violets profonds | Teinte irréelle ([éclairage](../concepts/03-eclairage-et-shaders.md)) |
| `heatHaze` | 0.3 | 0.3 | L'air ondule ([post-effets](../concepts/06-post-effets.md)) |
| `timeWarp` | 1 | 1 | Ralenti, anneaux, poussières, sons |
| `fog` / `fogColor` | 0.22 / `0xc8c0e8` | 0.22 / `0x2c2650` | Voile violet |
| `windowGlow` | — | 0.5 | Fenêtres allumées |

## Comment c'est fait

### 1. Le ralenti : une seule ligne
Au début de `WeatherHelper.update`, juste après le mélange des paramètres :

```ts
dt *= 1 - TIME_WARP_SLOWDOWN * Math.min(this.current.timeWarp, 1);
```

Tout ce qui suit dans `update` utilise ce `dt` réduit : particules, nuages, `uBeamTime` (l'horloge des shaders), pulsation de la lumière, rafales… Avec `TIME_WARP_SLOWDOWN = 0.8`, la météo va 5 fois moins vite. C'est l'intérêt d'avoir **tout le temps de la météo dérivé d'un seul `dt`** : on contrôle sa vitesse d'un seul geste. Le mélange des paramètres, lui, est calculé avant avec le vrai `dt`, donc les transitions entre météos gardent leur durée normale. Les déplacements du joueur ne passent pas par là : seul le monde ralentit.

### 2. Les anneaux
Dans le shader des surfaces (`FRAGMENT_BODY`, uniforms `uWarp` et `uWarpCenter`, ce dernier égal à la position du joueur) :

```glsl
float warpDist = length(vWeatherWorldPos.xz - uWarpCenter.xz);
float rings = smoothstep(0.93, 1.0, sin(warpDist * 0.14 - uBeamTime * 2.5));
reflectedLight.indirectDiffuse += vec3(0.55, 0.45, 1.0) * rings * exp(-warpDist / 110.0) * uWarp * warpGround * 0.6;
```

- `sin(distance·k − temps·v)` est une **onde circulaire** qui s'éloigne du centre, comme les ronds dans l'eau.
- `smoothstep(0.93, 1.0, …)` garde seulement de fins anneaux (le sommet de l'onde), comme pour la [Marée de lumière](light-tide.md).
- `exp(-d / 110)` est une **atténuation exponentielle** : les anneaux s'effacent en s'éloignant.
- `uBeamTime` étant ralenti, les anneaux s'éloignent lentement eux aussi.

### 3. Les poussières figées
`TIME_MOTE_STYLE` (`GlowParticles.ts`) : vitesses presque nulles (`rise` ±0.3, `wobble` 0.8 à 0.15 rad/s), longue vie (8 à 14 s), un vent qui ne les pousse presque pas. Combinées au ralenti, elles paraissent immobiles. Voir [particules](../concepts/08-particules.md).

### 4. L'horloge et son écho
`WeatherAudio.updateTimeWarp` (voir [audio](../concepts/10-audio.md)) :
- **Tic / tac** : un son pur qui chute en fréquence (220 → 150 Hz ou 260 → 180 Hz), filtré, joué toutes les 1,6 s, alternativement à gauche et à droite. C'est grave et lent, comme un enregistrement ralenti.
- **Écho par ligne de retard rebouclée** : `DelayNode` (0,42 s) → gain 0,45 → retour dans le même `DelayNode`. Chaque passage repart avec 45 % du volume : une suite géométrique d'échos (1, 0,45, 0,2, 0,09…).
- **Piège** : une boucle de retour ne s'arrête jamais d'elle-même pour le moteur audio. Les nœuds restent connectés et s'accumuleraient à chaque tic. On les **déconnecte** après 4 s (`setTimeout`), une fois l'écho éteint.
- **Bourdonnement** : deux sons purs à 73 et 74,5 Hz. Leur écart de 1,5 Hz crée un **battement** (le volume ondule 1,5 fois par seconde), plus une quinte à 110 Hz.

## Maths et code à retenir

- **Un `dt` unique pour le temps d'un système** : on peut ralentir ou accélérer tout le système d'un coup.
- **Onde circulaire** `sin(k·r − ω·t)` et **atténuation exponentielle** `exp(−r/L)`.
- **Écho = suite géométrique** produite par un retard rebouclé avec un gain < 1.
- **Battement** de deux fréquences proches : `|f1 − f2|` oscillations de volume par seconde.

## Expériences à tenter

- `TIME_WARP_SLOWDOWN = 0.97` dans `WeatherHelper.ts` : le temps presque arrêté.
- `TIME_WARP_SLOWDOWN = -1` : la météo va 2 fois plus vite.
- Remplace `- uBeamTime * 2.5` par `+ uBeamTime * 2.5` dans le shader : les anneaux convergent vers le joueur.
- `feedback.gain.value = 0.8` dans `updateTimeWarp` : un écho interminable.

## Voir aussi

- [Marée de lumière](light-tide.md) : la même technique de crêtes lumineuses au sol.
- [Canicule](heatwave.md) : la même ondulation de l'air.
- [Lune de sang](blood-moon.md) et [Ténèbres](darkness.md) : autres ambiances avec un bourdonnement grave.
