# 🫨 Séisme (`earthquake`)

> Catégorie **Pluie & tempêtes** · disponible **de jour et de nuit** · 17 °C le jour, 12 °C la nuit

## Ce qu'on voit / entend

L'air est légèrement poussiéreux et calme… puis, toutes les 7 à 18 secondes environ, la terre tremble pendant 2 à 4,5 s. L'image secoue de façon irrégulière, de la poussière tombe le long des murs, des nuages de poussière montent du sol et un grondement très grave fait vibrer l'air, avec des objets qui s'entrechoquent. Puis tout redevient calme, jusqu'à la prochaine secousse.

## Les paramètres

Preset `EARTHQUAKE` dans `src/app/modules/game/shared/weather/Weather.ts` :

| Paramètre | Jour | Nuit | Effet |
|---|---|---|---|
| `litLevel` / `shadowLevel` | 0.92 / 0.6 | 0.4 / 0.25 | Lumière presque normale |
| `ambientColor` / `sunColor` | beiges | bleus | Air poussiéreux ([éclairage](../concepts/03-eclairage-et-shaders.md)) |
| `quake` | 1 | 1 | Fréquence des secousses |
| `fog` / `fogColor` | 0.18 / `0xc8b8a0` | 0.18 / `0x3a3634` | Voile de poussière ([brouillard](../concepts/05-brouillard-et-tenebres.md)) |
| `windowGlow` | — | 0.6 | Fenêtres allumées |

## Comment c'est fait

Le séisme est un **événement** : une machine à états dans `WeatherHelper.updateQuake`, sur le même principe que les éclairs de l'[Orage](storm.md).

### 1. La machine à états
- **Au calme** : un minuteur (`quakeTimer`) décompte, au rythme de `quake`. À 0, une secousse démarre avec une durée (`QUAKE_LENGTH`) et une force (0.5 à 1) tirées au hasard.
- **Pendant la secousse** : l'âge `quakeAge` avance. À la fin, on revient au calme avec un nouveau délai (`QUAKE_INTERVAL`).

### 2. L'enveloppe de force
```ts
const envelope = Math.pow(Math.sin(Math.PI * Math.pow(t, 0.6)), 0.8) * this.quakePower;
const jolt = 0.75 + 0.25 * Math.sin(age * 7.3) * Math.sin(age * 2.1);
```
- `sin(π·u)` forme une cloche de 0 à 1 puis à 0. En remplaçant `u` par `t^0.6`, le temps est déformé : la cloche monte **vite** et redescend **lentement**, comme une vraie secousse qui s'amortit.
- `jolt` multiplie deux sinusoïdes de fréquences sans rapport simple : des **à-coups** irréguliers.

### 3. Secouer la caméra sans la dérégler
Le décalage de caméra est une somme de sinusoïdes rapides de fréquences sans rapport (31, 53, 41, 67, 37, 59 rad/s). Le mouvement semble aléatoire et ne se répète pas. Le point délicat est que la caméra est aussi déplacée par le jeu (marche du joueur, envol de la tornade). On applique donc le tremblement en **relatif** :

```ts
// au début de update() : on retire le tremblement de l'image précédente
this.game.camera.position.sub(this.shakeOffset);
...
// dans updateQuake() : on calcule le nouveau et on l'ajoute
this.game.camera.position.add(this.shakeOffset);
```

Le tremblement ne s'accumule jamais : la caméra revient **exactement** à sa place (vérifié : écart de 0 après une secousse). Comme il est retiré avant `getCameraTarget()`, les effets centrés sur la caméra (ombres, particules) ne tremblent pas.

### 4. La poussière
Deux styles de `GlowParticles` dont la densité suit la force de la secousse (voir [particules](../concepts/08-particules.md)) :

- **`QUAKE_DEBRIS_STYLE`** : petits débris qui tombent vite (`rise` de -30 à -14). Ils naissent **au pied des murs** grâce à un `spawnFilter` : un point au sol où l'un des quatre voisins à 6 unités est bien plus haut, donc un bâtiment juste à côté. Ils partent entre 18 et 38 unités de haut et tombent le long du mur.
- **`QUAKE_DUST_STYLE`** : nuages de poussière en texture de fumée (voir [Pluie acide](acid-rain.md)) qui montent du sol, en mélange normal avec opacité par bouffée (voir [Volcanique](volcanic.md)).

**Piège rencontré** : les hauteurs du sol et des toits (`SurfaceHeights`) ne sont recalculées que si une météo à particules est active, avec une longue condition dans `update`. Sans `p.quake > 0` dans cette condition, `heightAt` renvoyait une valeur par défaut sous le sol, et toute la poussière naissait sous terre.

### 5. Le son
`WeatherAudio.updateEerie` : une boucle de bruit brun passée sous 110 Hz dont le volume suit la force (`QUAKE_GAIN`), et des **cliquetis**, de courts bruits filtrés en passe-bande de 400 à 1 800 Hz, tirés au hasard (`RATTLE_RATE` par seconde à pleine force) et répartis à gauche et à droite. Voir [audio](../concepts/10-audio.md).

## Maths et code à retenir

- **Machine à états** calme / secousse avec minuteurs aléatoires.
- **Déformer le temps** (`t^0.6`) pour changer la forme d'une enveloppe sans changer sa fonction.
- **Bruit par somme de sinusoïdes** de fréquences sans rapport : pas cher, sans répétition visible.
- **Offset relatif** : retirer l'effet de l'image précédente avant d'appliquer le nouveau, pour cohabiter avec d'autres systèmes qui déplacent le même objet.

## Expériences à tenter

- `SHAKE_AMPLITUDE = 6` dans `WeatherHelper.ts` : un séisme violent.
- `QUAKE_INTERVAL = [2, 4]` : des répliques en rafale.
- Remplace `Math.pow(t, 0.6)` par `t` : la secousse devient symétrique, avec une montée aussi lente que la descente, et on sent la différence.
- `maxParticles: 2000` dans `QUAKE_DEBRIS_STYLE` : les façades s'effritent.

## Voir aussi

- [Orage](storm.md) : la même logique d'événements aléatoires (éclairs).
- [Tornade](tornado.md) : l'autre effet qui déplace la caméra (envol du joueur).
- [Volcanique](volcanic.md) : fumées et opacité par bouffée.
