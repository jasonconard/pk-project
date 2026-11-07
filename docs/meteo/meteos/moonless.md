# 🌚 Nuit sans lune (`moonless`)

> Catégorie **Sombre** · **nuit uniquement** (choisie de jour, l'heure passe à 22:00) · 9 °C

## Ce qu'on voit / entend

Une nuit sans lune ni étoiles : on ne voit presque rien. Seules les fenêtres allumées percent l'obscurité, et la lanterne du joueur éclaire un petit cercle chaud qui vacille. Dans le noir, des paires d'yeux brillants (jaunes, verts, rouges ou blancs) observent le joueur et clignent. Quand il s'approche, ils s'enfuient dans un bruissement de petits pas. Quelques grillons chantent.

## Les paramètres

Preset `MOONLESS` dans `src/app/modules/game/shared/weather/Weather.ts` (seulement dans `NIGHT_PRESETS`) :

| Paramètre | Valeur | Effet |
|---|---|---|
| `litLevel` / `shadowLevel` | 0.3 / 0.25 | Nuit sombre ([éclairage](../concepts/03-eclairage-et-shaders.md)) |
| `windowGlow` | 0.8 | Fenêtres bien allumées, avec bloom ([post-effets](../concepts/06-post-effets.md)) |
| `crickets` | 0.4 | Grillons ([audio](../concepts/10-audio.md)) |
| `moonless` | 1 | Obscurité, lanterne, yeux |
| `fog` / `fogColor` | 0.2 / `0x05060a` | Brume noire ([brouillard](../concepts/05-brouillard-et-tenebres.md)) |

## Comment c'est fait

### 1. L'obscurité et la lanterne : un post-effet
Les [Ténèbres](darkness.md) assombrissent le monde dans le shader des surfaces. Mais les objets non éclairés (sprites, arbres, joueur) n'y passent pas : ils resteraient visibles dans le noir. Ici, tout se fait donc **sur l'image finale**, dans `HeatHazePass.ts`, ce qui touche tout ce qui est à l'écran de la même façon.

Chaque image, `WeatherHelper.renderPostEffects` **projette** la position du joueur à l'écran (`Vector3.project(camera)` donne des coordonnées de -1 à 1, ramenées de 0 à 1) et la passe au shader (`uLanternAt`) :

```glsl
vec2 ld = (vUv - uLanternAt) * vec2(uAspect, 1.4);          // ellipse : le cercle au sol vu en perspective
float flick = 1.0 + 0.05 * sin(uTime * 13.0) + 0.03 * sin(uTime * 29.0 + 1.0);
float lit = 1.0 - smoothstep(LANTERN_INNER, LANTERN_OUTER * flick, length(ld));
float keep = smoothstep(0.25, 0.7, luma);                    // les pixels très lumineux restent visibles
vec3 dark = c * mix(0.035, 1.0, keep);
vec3 lantern = c * vec3(1.5, 1.15, 0.75) * 1.6;              // lumière chaude
c = mix(dark, lantern, lit);
```

- **`* uAspect`** : sans cela, le cercle serait déformé selon la largeur de l'écran. **`* 1.4`** en vertical l'aplatit, comme un cercle posé au sol vu de biais.
- **Vacillement** : deux sinusoïdes rapides de fréquences sans rapport (13 et 29) font varier le rayon de quelques pour cent, comme une flamme.
- **Garder les lumières** : l'image est presque noire (3,5 % de sa luminosité) **sauf** les pixels déjà très lumineux (`keep`) : les fenêtres et les yeux brillent dans l'obscurité. On choisit ce qui reste visible selon la luminosité de chaque pixel.

### 2. Les yeux : `EyesHelper.ts`
- **Où** : jusqu'à 7 paires, chacune à 55–140 unités du joueur, dans la zone visible, de 2.5 à 7 unités au-dessus du sol (dans un buisson, sur un muret).
- **Comment** : deux petits halos additifs très lumineux (couleur × 2.2, ce qui active le bloom et le `keep` du post-effet), écartés le long de l'axe **horizontal de la caméra**. Les deux yeux restent ainsi côte à côte, quel que soit l'angle de vue.
- **Clignement** : toutes les 1,5 à 5 s, la hauteur des yeux passe à presque 0 puis revient, en 0,14 s (`|2t − 1|` : une descente puis une remontée en V).
- **Fuite** : si le joueur s'approche à moins de 42 unités, la paire s'éteint deux fois plus vite et `onFlee` joue le son. Elle disparaît aussi après 4 à 11 s. Une nouvelle paire apparaît ailleurs.

### 3. Le bruissement
`WeatherAudio.scurry` : 4 à 8 courts bruits filtrés en passe-bande (1 800 à 3 500 Hz, comme des feuilles), espacés irrégulièrement de 50 à 120 ms et de plus en plus faibles : des petits pas qui s'éloignent en courant, du côté de la paire d'yeux.

## Maths et code à retenir

- **Projeter un point 3D à l'écran** (`project`) pour centrer un post-effet sur un objet du monde.
- **Corriger le rapport largeur / hauteur** dans un effet en coordonnées d'écran.
- **Masquer selon la luminosité** : garder ce qui est déjà lumineux.
- **Orienter selon la caméra** : écarter deux éléments le long de son axe horizontal.

## Expériences à tenter

- `LANTERN_OUTER = 0.45` dans `HeatHazePass.ts` : une grosse lampe torche.
- Remplace `mix(0.035, 1.0, keep)` par `mix(0.0, 1.0, keep)` : le noir absolu.
- `MAX_PAIRS = 30` dans `EyesHelper.ts` : on est cerné.
- `FLEE_DISTANCE = 0` : les yeux ne s'enfuient plus… et regardent de tout près.

## Voir aussi

- [Ténèbres](darkness.md) : l'obscurité calculée dans le shader des surfaces.
- [Brouillard rôdeur](stalking-fog.md) : une autre éclaircie autour du joueur.
- [Mirage](mirage.md) : un autre effet ajouté au même post-effet.
