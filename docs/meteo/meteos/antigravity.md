# 🪐 Gravité inversée (`antigravity`)

> Catégorie **Magie & ciel** · disponible **de jour et de nuit** · 18 °C le jour, 13 °C la nuit

## Ce qu'on voit / entend

La gravité s'est inversée. Des cailloux et des mottes de terre montent lentement vers le ciel, des gouttes d'eau jaillissent du sol comme une pluie jouée à l'envers, et le joueur flotte au-dessus du sol en se balançant doucement. La lumière est froide, un peu lavande, et les nuages dérivent dans l'autre sens. On entend un souffle aérien qui monte vers l'aigu sans jamais s'arrêter.

## Les paramètres

Preset `ANTIGRAVITY` dans `src/app/modules/game/shared/weather/Weather.ts` :

| Paramètre | Jour | Nuit | Effet |
|---|---|---|---|
| `ambientColor` / `sunColor` / `unlitTint` | lavandes pâles | bleus violets | Lumière étrange ([éclairage](../concepts/03-eclairage-et-shaders.md)) |
| `cloudSpeed` | -8 | -8 | Les ombres de nuages défilent à l'envers |
| `antigravity` | 1 | 1 | Débris, gouttes, joueur qui flotte, souffle |
| `fog` / `fogColor` | 0.15 / `0xd8d4f0` | 0.15 / `0x24223c` | Léger voile ([brouillard](../concepts/05-brouillard-et-tenebres.md)) |
| `windowGlow` | — | 0.5 | Fenêtres allumées |

## Comment c'est fait

### 1. Les débris et la pluie à l'envers
Deux styles de `GlowParticles` (voir [particules](../concepts/08-particules.md)). Il suffit d'une vitesse `rise` **positive** pour que les particules montent :

| Style | Rôle | Réglages clés |
|---|---|---|
| `GRAVITY_PEBBLE_STYLE` | Cailloux et mottes | lents (`rise` 5–13), gros (2.4–4.6), bruns et verts, 20 % partent des plantes |
| `GRAVITY_DROP_STYLE` | Gouttes qui montent | rapides (`rise` 30–55), étirées (`stretchY` 4), blanches |

Les deux sont en mélange normal avec `followLight` : ce ne sont pas des lumières, la scène les éclaire. De nuit, ils sont donc plus discrets.

**Piège rencontré** : au premier essai, avec des cailloux petits et de couleur proche du sol, on ne voyait presque rien sur les captures. Une particule doit **contraster** avec ce qu'il y a derrière : plus sombre, plus grosse et plus nombreuse.

### 2. Le joueur qui flotte
`WeatherHelper.updateFloat` déplace le plan du joueur (`scenePlayer.mesh.children[0]`) avec un **décalage relatif**, comme le tremblement du [Séisme](earthquake.md) :

```ts
plane.position.y -= this.floatOffset;  // retire le décalage de l'image précédente
this.floatOffset = level * (FLOAT_HEIGHT + FLOAT_BOB * Math.sin(this.floatTime * FLOAT_SPEED));
plane.position.y += this.floatOffset;  // ajoute le nouveau
plane.rotation.z = level * FLOAT_SWAY * Math.sin(this.floatTime * FLOAT_SPEED * 0.7);
```

- La hauteur est multipliée par `level` : quand on change de météo, le joueur redescend doucement avec le mélange des paramètres, et revient **exactement** à sa place (vérifié).
- Le balancement (`rotation.z`) tourne à 0.7 fois la vitesse du rebond. Les deux mouvements ne se synchronisent jamais, le mouvement paraît plus naturel.
- Pendant un envol de [Tornade](tornado.md) ou de [Geyser](geysers.md), le flottement est mis de côté, pour ne pas mélanger les deux mouvements.

### 3. Le souffle sans fin
`WeatherAudio` (voir [audio](../concepts/10-audio.md)) : un bruit passe dans un filtre passe-bande dont la fréquence est pilotée par un **oscillateur en dents de scie** très lent (0.22 Hz) :

```ts
const lfo = ctx.createOscillator();
lfo.type = 'sawtooth';
lfo.frequency.value = FLOAT_SWEEP_RATE;
lfo.connect(depth).connect(sweep.frequency); // 1 300 Hz ± 900 Hz
```

Une dent de scie monte lentement puis retombe d'un coup. Le souffle devient de plus en plus aigu, revient au grave, et recommence : une impression d'ascension infinie. Un oscillateur peut piloter n'importe quel paramètre audio (`AudioParam`), pas seulement produire un son : c'est un **LFO** (oscillateur basse fréquence).

## Maths et code à retenir

- **Le signe de la vitesse** suffit à inverser la gravité d'un système de particules.
- **Contraste** : une particule visible se distingue de son fond par la luminosité, la taille et le nombre.
- **Décalage relatif** et **deux sinusoïdes de fréquences différentes** pour un flottement naturel.
- **LFO en dents de scie** sur la fréquence d'un filtre : une montée qui recommence sans fin.

## Expériences à tenter

- `FLOAT_HEIGHT = 30` dans `WeatherHelper.ts` : le joueur s'envole presque.
- `rise: [-13, -5]` dans `GRAVITY_PEBBLE_STYLE` : les cailloux tombent du ciel (n'oublie pas `spawnHeight: [30, 50]`).
- `lfo.type = 'sine'` dans `WeatherAudio.ts` : le souffle monte et descend au lieu de monter sans fin.
- `FLOAT_SWEEP_RATE = 2` : un bruit de sirène.

## Voir aussi

- [Monde inversé](inverted.md) : autre dimension parallèle.
- [Tornade](tornado.md) et [Geysers](geysers.md) : le joueur projeté dans les airs.
- [Distorsion temporelle](time-warp.md) : les poussières suspendues.
