# 💥 Éruption imminente (`eruption`)

> Catégorie **Chaleur** · disponible **de jour et de nuit** · 54 °C le jour, 46 °C la nuit

## Ce qu'on voit / entend

Le volcan se réveille. L'ambiance du [Volcanique](volcanic.md) (lumière orange, brume étouffante, air qui ondule, braises et fumées) s'épaissit, et des cendres tombent du ciel. La terre tremble comme pendant le [Séisme](earthquake.md), mais les secousses se rapprochent : rares au début, elles reviennent toutes les quelques secondes au bout d'une minute. À chaque secousse, une gerbe de braises et de fumées jaillit. Puis arrive **la grande secousse**, plus longue et plus forte… et le cycle recommence. Le grondement du volcan enfle avec la tension.

## Les paramètres

Preset `ERUPTION` dans `src/app/modules/game/shared/weather/Weather.ts` :

| Paramètre | Jour | Nuit | Effet |
|---|---|---|---|
| `ambientColor` / `sunColor` / `unlitTint` | oranges | rouges sombres | Lumière de braise ([éclairage](../concepts/03-eclairage-et-shaders.md)) |
| `heatHaze` | 0.9 | 0.9 | L'air ondule ([post-effets](../concepts/06-post-effets.md)) |
| `lightPulse` | 0.1 | 0.16 | La lumière palpite |
| `lava` | 1 | 1 | Braises, fumées et grondement du [Volcanique](volcanic.md) |
| `ash` | 0.4 | 0.4 | Cendres qui tombent ([Neige de cendres](ash.md)) |
| `quake` | 1 | 1 | Secousses du [Séisme](earthquake.md) |
| `eruption` | 1 | 1 | Active la montée de tension |
| `fog` / `fogColor` | 0.7 / `0xc8704a` | 0.7 / `0x5a2618` | Brume rouge étouffante ([brouillard](../concepts/05-brouillard-et-tenebres.md)) |
| `windowGlow` / `windowTint` | — | 0.7 / orange | Fenêtres allumées |

## Comment c'est fait

Cette météo n'a presque pas de code propre : elle **combine** des paramètres existants (`lava`, `ash`, `quake`) et ajoute une seule idée, une **tension** qui orchestre le tout. Tout se passe dans `WeatherHelper.ts`.

### 1. La tension
```ts
this.eruptionTension = Math.min(1, this.eruptionTension + dt * p.eruption / ERUPTION_BUILDUP);
```
Elle monte de 0 à 1 en `ERUPTION_BUILDUP` (60 s), puis reste à 1 en attendant la grande secousse.

### 2. Des secousses de plus en plus rapprochées
La machine à états du [Séisme](earthquake.md) (`updateQuake`) fait décompter son minuteur à la vitesse `quake`. Il suffit de multiplier cette vitesse :

```ts
const quakeRate = lerp(ERUPTION_RATE[0], ERUPTION_RATE[1], this.eruptionTension); // 0.5 → 2.5
this.quakeShake = this.updateQuake(dt, p.quake * quakeRate);
```

Le délai entre deux secousses (7 à 18 s) est divisé par cette vitesse : environ 25 s au calme, environ 5 s à pleine tension. On ne touche pas à la machine à états, on change seulement **la vitesse de son horloge**, comme le ralenti de la [Distorsion temporelle](time-warp.md).

### 3. La grande secousse
Au démarrage d'une secousse, `updateQuake` regarde la tension :

```ts
if (this.eruptionTension >= 1) {
  this.quakeLength = ERUPTION_QUAKE_LENGTH; // 7 s
  this.quakePower = ERUPTION_QUAKE_POWER;   // 1.4 au lieu de 0.5 à 1
  this.eruptionTension = 0;
}
```

C'est un **cycle** : accumulation lente, puis libération brutale et retour à zéro, comme un vrai volcan qui accumule de la pression.

### 4. Les gerbes de braises
La densité des braises et des fumées du volcan est multipliée par un facteur `stir` :

```ts
const stir = (1 + p.eruption * (ERUPTION_TENSION_BOOST * tension + ERUPTION_SHAKE_BOOST * this.quakeShake))
  / (1 + p.eruption * ERUPTION_HEADROOM);
```

- Plus la tension monte, plus il y a de braises. Pendant une secousse (`quakeShake`), c'est une gerbe.
- **Piège** : la densité des particules est plafonnée à 1 dans `GlowParticles` (c'est une part de `maxParticles`). Avec `lava = 1`, multiplier n'aurait rien changé : on était déjà au maximum. On divise donc par `1 + ERUPTION_HEADROOM` pour que le calme soit à 50 % et **laisser de la marge** aux gerbes. C'est la même idée que la marge de volume avant saturation en audio.

### 5. Le son
Rien de nouveau : le grondement et les crépitements du [Volcanique](volcanic.md) (niveau `lava` multiplié par `1 + 0.5 × tension`) et le grondement grave et les cliquetis du [Séisme](earthquake.md), qui suivent `quakeShake`. Voir [audio](../concepts/10-audio.md).

## Maths et code à retenir

- **Composer plutôt que réécrire** : une nouvelle météo peut naître de paramètres existants et d'une seule variable d'orchestration.
- **Accumulation puis libération** : une jauge qui monte et déclenche un événement, puis repart de zéro.
- **Changer la vitesse d'une horloge** pour moduler la fréquence d'événements aléatoires sans toucher à leur logique.
- **Garder de la marge** sous un plafond (`clamp`) pour pouvoir pousser au-dessus du niveau normal.

## Expériences à tenter

- `ERUPTION_BUILDUP = 15` dans `WeatherHelper.ts` : le volcan explose toutes les 15 secondes.
- `ERUPTION_QUAKE_POWER = 3` : une grande secousse dévastatrice.
- `ERUPTION_RATE = [2.5, 0.5]` : les secousses s'espacent avant la grande, comme un calme avant la tempête.
- `ERUPTION_HEADROOM = 0` : les gerbes disparaissent, et on voit l'effet du plafond.

## Voir aussi

- [Volcanique](volcanic.md) et [Séisme](earthquake.md) : les deux météos combinées ici.
- [Neige de cendres](ash.md) : les cendres qui tombent.
- [Orage](storm.md) : autre météo à événements aléatoires.
