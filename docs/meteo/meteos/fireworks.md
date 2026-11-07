# 🎆 Feu d'artifice (`fireworks`)

> Catégorie **Magie & ciel** · **nuit uniquement** (choisi de jour, l'heure passe à 22:00) · 18 °C

## Ce qu'on voit / entend

Une nuit de fête : des fusées montent en sifflant puis éclatent en gerbes d'étincelles colorées qui ralentissent, retombent et s'éteignent. Certaines crépitent en clignotant. Chaque explosion colore un instant toute la scène, et on entend une détonation grave, plus tardive quand elle est loin, suivie d'un écho et parfois d'un crépitement.

## Les paramètres

Preset `FIREWORKS` dans `src/app/modules/game/shared/weather/Weather.ts` (seulement dans `NIGHT_PRESETS`) :

| Paramètre | Valeur | Effet |
|---|---|---|
| `litLevel` / `shadowLevel` | 0.4 / 0.24 | Nuit claire |
| `ambientColor` / `unlitTint` | bleus | Lumière de lune |
| `specular` | 0.5 | Les toits accrochent les reflets |
| `windowGlow` | 0.6 | Fenêtres allumées, et surtout **active le bloom**, qui fait rayonner les étincelles ([post-effets](../concepts/06-post-effets.md)) |
| `fireworks` | 1 | Cadence des tirs |

## Comment c'est fait

Tout est dans `src/app/modules/game/shared/weather/FireworksHelper.ts`, piloté par `WeatherHelper`.

### 1. Viser l'écran plutôt que le ciel
La caméra regarde le sol en plongée : le ciel n'est jamais visible. Une gerbe placée « en hauteur au-dessus de la carte » sortait donc de l'écran par le haut. La solution, dans `launch`, est de **choisir le point d'explosion dans l'image**, puis de le placer dans le monde :

1. On tire un point en coordonnées écran normalisées (NDC, de -1 à 1) : `x` dans `SCREEN_X`, `y` dans `SCREEN_Y`.
2. `new Vector3(x, y, 0.5).unproject(camera)` donne un point 3D sur le rayon de vue qui passe par ce pixel. On en déduit la direction `dir` du rayon.
3. On cherche sur ce rayon le point à la hauteur voulue `h`. Le rayon s'écrit `P(d) = camera + d·dir`, donc on résout `camera.y + d·dir.y = h`, soit `d = (h - camera.y) / dir.y`.

Ce point est forcément à l'écran, et la fusée part du sol juste en dessous. C'est la même idée qu'un clic de souris qu'on transforme en position dans le monde (le « picking »).

### 2. La montée de la fusée
Position horizontale linéaire, hauteur avec une **courbe ease-out** `1 - (1 - t)²` : la fusée part vite et ralentit en haut, comme freinée par la gravité.

### 3. La gerbe : une sphère d'étincelles
Pour des directions **uniformément réparties sur la sphère**, on ne tire pas deux angles au hasard (les étincelles s'entasseraient aux pôles). On tire la hauteur `u` uniforme entre -1 et 1 et un angle `a` uniforme :

```ts
const u = Math.random() * 2 - 1;
const a = Math.random() * Math.PI * 2;
const r = Math.sqrt(1 - u * u);
const dir = new THREE.Vector3(r * Math.cos(a), u, r * Math.sin(a));
```

C'est le théorème d'Archimède : sur une sphère, l'aire entre deux hauteurs ne dépend que de leur écart, donc `u` uniforme donne une densité uniforme.

### 4. La physique des étincelles
À chaque image :

```ts
s.vel.multiplyScalar(Math.exp(-DRAG * dt));  // freinage de l'air, indépendant du framerate
s.vel.y -= GRAVITY * dt;                     // gravité
s.pos.addScaledVector(s.vel, dt);            // intégration d'Euler
```

Le freinage `exp(-DRAG·dt)` est la solution exacte de `dv/dt = -DRAG·v` : même résultat à 30 ou 120 fps. La luminosité décroît en `k²` (avec `k = 1 - âge/vie`) : une étincelle reste vive longtemps puis s'éteint vite. Les gerbes « crépitantes » clignotent aléatoirement sur leur dernière partie de vie.

### 5. Rendu
Un seul `InstancedMesh` de quads face caméra avec une texture de halo, en **mélange additif**, et des couleurs multipliées au-dessus de 1 (`INTENSITY = 2.4`) pour que le bloom les fasse rayonner (voir [particules](../concepts/08-particules.md)).

### 6. La scène s'éclaire
Le helper expose `flash` (1 à l'explosion, qui décroît) et `flashColor` (mélange des deux couleurs de la gerbe). Dans `WeatherHelper.update`, la lumière ambiante gagne `FIREWORK_LIGHT × flash²` et prend la teinte de la gerbe. Le carré rend le flash bref (voir [éclairage](../concepts/03-eclairage-et-shaders.md)).

### 7. Les sons
Deux fonctions de rappel (`onLaunch`, `onBurst`) relient l'image au son (`WeatherAudio.ts`) :

- `rocketWhistle` : un son pur dont la hauteur monte exponentiellement pendant toute la durée de la montée ;
- `fireworkBang` : un bruit filtré grave et un son qui chute de 90 à 35 Hz. Ils arrivent **après** le flash, avec un délai plus long quand l'explosion est loin, car le son voyage moins vite que la lumière. Un écho passe par un `DelayNode`, et une salve de petits clics filtrés fait le crépitement. Voir [audio](../concepts/10-audio.md).

## Maths et code à retenir

- **Picking inverse** : point écran → rayon → intersection avec un plan horizontal (`d = (h - c.y) / dir.y`).
- **Directions uniformes sur une sphère** : `u` uniforme dans [-1, 1], `r = √(1 - u²)`.
- **Freinage exponentiel** `v ← v · exp(-k·dt)`, exact et indépendant du framerate.
- **Ease-out** `1 - (1 - t)²` pour une montée qui ralentit.

## Expériences à tenter

- `SPARKS = [250, 350]` dans `FireworksHelper.ts` : des gerbes très fournies.
- `GRAVITY = 40` : les étincelles retombent comme une pluie lourde. `GRAVITY = 0` : des sphères parfaites qui s'éteignent sur place.
- `LAUNCH_INTERVAL = [0.15, 0.5]` : le bouquet final.
- `FIREWORK_LIGHT = 1` dans `WeatherHelper.ts` : chaque explosion illumine fortement la scène.

## Voir aussi

- [Orage](storm.md) : l'autre lumière qui flashe, et le même décalage entre lumière et son.
- [Volcanique](volcanic.md) et [Lune de sang](blood-moon.md) : autres particules lumineuses (braises).
- [Nuit étoilée](starry-night.md) : la nuit calme.
