# 🌊 Marée de lumière (`light-tide`)

> Catégorie **Magie & ciel** · **nuit uniquement** (choisie de jour, l'heure passe à 22:00) · 16 °C

## Ce qu'on voit / entend

Une nuit bleu profond. Des vagues de lumière bleue balaient le sol, comme du plancton bioluminescent qui s'allume au passage d'une vague puis s'éteint lentement. Les fronts sont courbés et irréguliers. Certaines vagues brillent fort, d'autres à peine, et des milliers de petits points scintillent chacun à son rythme. On entend un doux ressac.

## Les paramètres

Preset `LIGHT_TIDE` dans `src/app/modules/game/shared/weather/Weather.ts` (seulement dans `NIGHT_PRESETS`) :

| Paramètre | Valeur | Effet |
|---|---|---|
| `litLevel` / `shadowLevel` | 0.3 / 0.18 | Nuit sombre, pour que la lumière du sol ressorte |
| `ambientColor` / `sunColor` / `unlitTint` | bleus profonds | Ambiance marine ([éclairage](../concepts/03-eclairage-et-shaders.md)) |
| `specular` | 0.6 | Reflets de lune |
| `windowGlow` | 0.4 | Fenêtres allumées, et surtout **active le bloom** qui fait rayonner le plancton ([post-effets](../concepts/06-post-effets.md)) |
| `dew` | 0.6 | Sol humide (voir [Nuit étoilée](starry-night.md)) |
| `tide` | 1 | Intensité de la marée de lumière |
| `fog` / `fogColor` | 0.18 / `0x101c40` | Voile bleu nuit |

Le son reprend les vagues de la [Brume marine](sea-mist.md) via le niveau `lapping` (0.35 × `tide`), sans les mouettes. Voir [audio](../concepts/10-audio.md).

## Comment c'est fait

Tout se passe dans le shader des surfaces (`FRAGMENT_BODY`, `weather-shader.ts`, uniform `uTide`). Aucune particule : c'est de la lumière **calculée pour chaque pixel du sol**.

### 1. Seulement le sol
```glsl
float tideGround = smoothstep(0.6, 0.9, tideNormal.y) * (1.0 - step(1.0, vWeatherWorldPos.y));
```
Les surfaces tournées vers le haut (`normal.y` proche de 1) et proches du sol (`y < 1`) : ni les toits, ni les murs.

### 2. Une vague qui avance
Une onde plane qui se déplace s'écrit `sin(k·(d·p − v·t))`, avec `p` la position, `d` la direction, `v` la vitesse et `k = 2π / longueur d'onde`. Pour que les fronts ne soient pas des lignes droites, on **déforme** la position par du bruit (deux octaves, voir [bruit procédural](../concepts/07-bruit-procedural.md)) :

```glsl
float warp = (wbNoise(tp * 0.015 + t * 0.02) * 0.7 + wbNoise(tp * 0.05 - t * 0.03) * 0.3) * 45.0;
float wave = sin((dot(tp, vec2(0.8, 0.6)) + warp - t * TIDE_SPEED) * k);
float crest = smoothstep(0.86, 1.0, wave) * swell;
```

`smoothstep(0.86, 1.0, wave)` ne garde que le **sommet** de la sinusoïde : de fines bandes lumineuses, séparées par de larges zones sombres. Le bruit lui-même évolue lentement dans le temps, donc les fronts se tordent en avançant.

### 3. Casser la régularité
Le premier essai croisait deux trains de vagues, et leurs crêtes formaient un **quadrillage** régulier, comme un réseau de routes. La solution est de garder un seul train de vagues, et d'utiliser la seconde onde, lente et dans une autre direction, seulement comme **modulation** de l'intensité (`swell`, entre 0.35 et 1). Certaines vagues brillent, d'autres sont faibles, sans dessiner de grille. À retenir : additionner deux motifs périodiques crée une grille, alors que les multiplier (moduler) crée de la variété.

### 4. La traînée et le plancton
- **Traînée** : `smoothstep(0.2, 0.86, wave) × (1 − crest)` éclaire faiblement le versant qui suit la crête. La lumière semble s'éteindre lentement après le passage de la vague.
- **Plancton** : la même recette que les étoiles de la [Nuit étoilée](starry-night.md). On fait une grille de cellules, puis un hash et un seuil (environ 20 % des cellules), puis un scintillement sinusoïdal déphasé par cellule. Il n'est visible que sur la crête et la traînée.

### 5. Ajout de lumière
La couleur est ajoutée à `reflectedLight.indirectDiffuse` **sans être multipliée par la couleur du sol** : c'est une lumière émise, pas une lumière reçue. Avec une couleur au-dessus de 1 (`TIDE_COLOR`), le bloom la fait rayonner.

## Maths et code à retenir

- **Onde plane qui avance** : `sin(k·(d·p − v·t))`, avec `k = 2π/λ`.
- **Déformer l'espace** (domain warping) : ajouter du bruit à la position avant la fonction pour rendre organique une forme géométrique.
- **`smoothstep` sur une sinusoïde** pour isoler des crêtes fines.
- **Moduler plutôt qu'additionner** deux motifs périodiques pour éviter les grilles.
- **Émission vs réflexion** : ajouter de la lumière sans la multiplier par l'albédo.

## Expériences à tenter

- `TIDE_WAVELENGTH = 30` dans `weather-shader.ts` : des vagues serrées.
- `TIDE_SPEED = 40` : une marée rapide.
- `TIDE_COLOR = [0.2, 1.1, 0.5]` : un plancton vert.
- Remplace `* 45.0` par `* 0.0` dans `warp` : les fronts redeviennent des lignes droites, et on voit l'effet du domain warping.

## Voir aussi

- [Nuit étoilée](starry-night.md) : la même recette grille + hash pour les étoiles.
- [Brume marine](sea-mist.md) : le même ressac.
- [Aurore](aurora.md) : autre lumière mouvante calculée dans le shader.
