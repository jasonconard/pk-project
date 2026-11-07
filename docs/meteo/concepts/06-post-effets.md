# 06 · Post-effets

Un **post-effet** retravaille l'image *après* qu'elle a été dessinée. Principe général : au lieu de dessiner la scène à l'écran, on la dessine dans une **texture** (`WebGLRenderTarget`), puis on dessine un rectangle plein écran (un « quad ») dont le fragment shader lit cette texture et produit l'image finale. Trois effets existent : rayons de soleil (`GodRaysPass`), halo des fenêtres (`BloomPass`) et ondulations de chaleur (`HeatHazePass`). Les valeurs viennent de la météo ([01 · Architecture](01-architecture.md)). Le GLSL des rayons partage son motif avec [03 · Éclairage et shaders](03-eclairage-et-shaders.md), le bruit vient de [07](07-bruit-procedural.md).

Aucun effet ne coûte quoi que ce soit s'il est inactif : `Game.renderFrame` dessine directement la scène quand `renderPostEffects()` renvoie `false`.

## 1. Le chaînage : `renderPostEffects` et `drawFrame(target)`

```ts
// WeatherHelper.renderPostEffects
const drawFrame = (target: THREE.WebGLRenderTarget | null): boolean => {
  if (p.godRays >= 0.01 && this.godRays.render(..., p.godRays, target)) return true;
  if (p.windowGlow >= 0.01) { this.bloom.render(..., p.windowGlow, target); return true; }
  if (target) { /* rend la scène simple dans target */ return true; }
  return false;
};
if (p.heatHaze >= 0.01 || p.heatWash >= 0.01) {
  this.heatHaze.render(g.renderer, drawFrame, p.heatHaze, p.heatWash, WEATHER_UNIFORMS.uBeamTime.value);
  return true;
}
return drawFrame(null);
```

`drawFrame(target)` signifie : « dessine l'image (avec rayons ou bloom) dans `target` ; `null` = à l'écran ». C'est un **motif de chaînage par callback** :

- Sans chaleur : `drawFrame(null)` dessine directement à l'écran.
- Avec chaleur : `HeatHazePass.render` reçoit `drawFrame`, l'appelle avec **sa propre texture** `sceneTarget` comme destination, puis dessine à l'écran en déformant cette texture. L'effet de chaleur est donc toujours **la dernière étape**.
- Rayons et bloom sont **exclusifs** (le `if` du premier renvoie `true` avant le second). Le commentaire du code précise : pendant une transition jour/nuit, les rayons gagnent jusqu'à ce qu'ils s'estompent. Le seuil `0.01` évite de payer un effet quasi invisible.

Autre point : chaque `render(…, output)` finit par `renderer.setRenderTarget(output)` puis dessine le quad de composition, de sorte que le même code sert pour l'écran (`null`) et pour une texture intermédiaire.

## 2. `GodRaysPass` : rayons volumétriques

Objectif : des **faisceaux de lumière dans l'air**, bloqués par les bâtiments. Trois passes.

1. **Scène → texture** `sceneTarget` (avec un `DepthTexture` : on aura la profondeur de chaque pixel). Type `HalfFloatType` : couleurs linéaires en 16 bits flottants, sans bandes dans les tons sombres.
2. **Ray-marching** à demi-résolution (`RAYS_RESOLUTION = 0.5`, donc un quart des pixels) dans `RAYS_FRAGMENT`.
3. **Composition** de la scène et des rayons.

### La passe 2, pas à pas

```glsl
float depth = texture(tDepth, vUv).r;
vec4 view = uProjInv * vec4(vUv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
view /= view.w;
vec3 world = (uCamWorld * view).xyz;
```

*Reconstruction de la position monde* : on part du pixel `(u, v, profondeur)` en coordonnées normalisées `[−1, 1]`, on applique l'**inverse** de la matrice de projection (`uProjInv`), on divise par `w` (division perspective), puis on passe de l'espace caméra à l'espace monde (`uCamWorld`). On sait ainsi où est la surface vue sans l'avoir stockée.

```glsl
vec3 ray = world - uCamPos;
float len = min(length(ray), 600.0);          // MAX_DISTANCE
float stepLen = len / 24.0;                   // STEPS
float t = stepLen * ign(gl_FragCoord.xy);
for (int i = 0; i < 24; i++) {
  vec3 p = uCamPos + dir * t;
  vec4 sc = uShadowMatrix * vec4(p, 1.0);  sc.xyz /= sc.w;
  float lit = 1.0;
  if (/* sc dans le cube [0,1]³ */) lit = texture(tShadow, vec3(sc.xy, sc.z - 0.001));
  acc += lit * beamPattern(p, uSunDir, uTime);
  t += stepLen;
}
gl_FragColor = vec4(vec3(acc / 24.0), 1.0);
```

On marche le long du rayon **caméra → surface** en 24 pas. À chaque point `p` : (a) on le projette dans la *shadow map* du soleil (`uShadowMatrix`) pour savoir si l'air y est éclairé (`lit` = 1) ou dans l'ombre d'un bâtiment (0) ; (b) on lit le motif de faisceaux `beamPattern` (le **même** que celui des matériaux). La moyenne `acc / STEPS` est une intégrale discrète de la lumière diffusée. `sc.z − 0.001` est un *biais* qui évite l'auto-ombrage.

`ign` (interleaved gradient noise) décale le point de départ par pixel : sans ce **jitter**, 24 pas identiques pour tous les pixels produiraient des bandes visibles ; avec lui, elles se changent en un grain fin que le flou naturel absorbe.

### Composition

```glsl
vec3 light = uColor * rays * uIntensity;
gl_FragColor = vec4(scene + light * (1.0 - clamp(scene, 0.0, 1.0)), 1.0);
```

C'est un **mélange « screen »** : `a + b·(1 − a)`. Les zones sombres s'éclairent, les zones déjà claires bougent à peine : pas d'image délavée. `uIntensity = godRays · RAYS_STRENGTH (0.5)`. `RAYS_COLOR = (1.0, 0.9, 0.65)` (soleil chaud). `#include <colorspace_fragment>` fait la conversion sRGB finale.

## 3. `BloomPass` : le halo des fenêtres

Le bloom simule la diffusion de la lumière dans l'œil / l'objectif : ce qui est très lumineux « déborde ». Quatre étapes (scène rendue **une seule fois**) :

1. **Scène → texture.**
2. **Passe lumineuse** (`BRIGHT_FRAGMENT`, demi-résolution) : on ne garde que les pixels brillants :
```glsl
float brightest = max(c.r, max(c.g, c.b));
gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + uKnee, brightest), 1.0);   // 0.5, 0.2
```
Seuil sur le canal le plus fort, adouci par un « genou » (`BLOOM_KNEE`) pour éviter des bords durs. À la nuit, d'après les commentaires du code, les fenêtres sont de loin les plus claires (~0,6 à 1) et le reste reste sous ~0,35 : `BLOOM_THRESHOLD = 0.5` isole donc les fenêtres.
3. **Flou gaussien séparable** (`BLUR_FRAGMENT`, quart de résolution). Un flou 2D de `n×n` points coûte `n²` ; en faisant d'abord l'horizontal puis le vertical (**séparabilité**), il ne coûte que `2n`. Le shader lit 5 points (centre + 2 paires) avec des poids `0.2270270270`, `0.3162162162`, `0.0702702703` et des décalages `1.3846…`, `3.2307…` : c'est un flou à **9 taps réels** réduit à 5 lectures en exploitant le filtrage linéaire du GPU (chaque lecture tombe entre deux texels). Les poids totalisent 1 : `0,227 + 2·(0,316 + 0,070) = 1`. La boucle `BLUR_RADII = [1, 2, 3]` répète le flou avec un rayon croissant, en **ping-pong** entre deux textures (on ne peut pas lire et écrire la même texture).
4. **Composition** : `scene + bloom * uStrength`, avec `uStrength = windowGlow · BLOOM_STRENGTH (1.6)`. Addition simple : de la lumière s'ajoute.

Pourquoi des résolutions réduites ? Un flou large sur un petit buffer est moins cher **et** plus large visuellement.

## 4. `HeatHazePass` : l'air qui ondule

Ici l'image est déformée et ternie. Le shader (`HEAT_FRAGMENT`) fait deux choses.

**Distorsion** :
```glsl
vec2 p = vec2(vUv.x * uAspect, vUv.y) * uScale - vec2(0.0, uTime * 1.8);   // SHIMMER_SCALE (26, 60), RISE_SPEED
vec2 wave = vec2(hhNoise(p), hhNoise(p + vec2(17.3, 5.1))) - 0.5;
float strength = uHeat * mix(0.35, 1.0, vUv.y);
vec2 offset = wave * 0.0022 * 2.0 * strength * vec2(1.0 / uAspect, 1.0);    // SHIMMER_AMPLITUDE
vec3 c = texture2D(tScene, vUv + offset).rgb;
```
- Le bruit est animé en soustrayant `uTime·1.8` à `p.y` : le motif **monte**, comme l'air chaud.
- Deux bruits décalés (`+ vec2(17.3, 5.1)`) donnent un décalage 2D (`− 0.5` le recentre sur zéro).
- `uAspect` corrige le rapport largeur/hauteur pour que les ondes ne soient pas étirées.
- `mix(0.35, 1.0, vUv.y)` : plus fort en haut de l'image (lointain, couche d'air plus épaisse).
- On **échantillonne la scène à une position décalée** : c'est tout le principe de la distorsion.

**Teinte** (`uWash`) :
```glsl
float luma = dot(c, vec3(0.2126, 0.7152, 0.0722));        // luminance Rec. 709
c = mix(c, vec3(luma), 0.30 * uWash);                       // DESATURATION
c *= mix(vec3(1.0), uTint, uWash);                          // WARM_TINT (1.06, 1.0, 0.88)
```
On rapproche chaque couleur de son gris (désaturation de 30 % maximum) puis on multiplie par un orange léger. `heatHaze` (ondulation) et `heatWash` (teinte) sont deux paramètres **distincts** de `WeatherParams`.

## Expériences à tenter

- `STEPS` (`GodRaysPass.ts`) à `6` : bandes visibles ; à `64` : plus lisse (et plus lent). Désactive aussi le `ign` pour voir le rôle du jitter.
- `BLOOM_THRESHOLD` à `0.2` : les murs se mettent à briller aussi. `BLUR_RADII` à `[1, 2, 3, 5, 8]` : halo très large.
- `SHIMMER_AMPLITUDE` à `0.01` et `SHIMMER_SCALE` à `(8, 20)` : grosses vagues d'air.
- `RAYS_RESOLUTION` à `0.1` : les rayons deviennent pixellisés, preuve du rôle de la résolution réduite.
