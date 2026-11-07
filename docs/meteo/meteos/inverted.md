# 🔮 Monde inversé (`inverted`)

> Catégorie **Magie & ciel** · disponible **de jour et de nuit** · 12 °C le jour, 18 °C la nuit (la température s'inverse aussi)

## Ce qu'on voit / entend

Une dimension parallèle : toute l'image passe en négatif. Les ombres deviennent claires, les toits bleus virent au cyan, l'herbe devient rose-mauve. La nuit, le négatif d'une scène sombre donne un monde pâle et délavé, où les fenêtres allumées deviennent sombres. Toutes les 2 à 5 secondes, un son « à l'envers » arrive d'un côté : il enfle depuis le silence puis s'arrête net.

## Les paramètres

Preset `INVERTED` dans `src/app/modules/game/shared/weather/Weather.ts` :

| Paramètre | Jour | Nuit | Effet |
|---|---|---|---|
| `litLevel` / `shadowLevel` | 0.95 / 0.5 | nuit normale | Ombres marquées : une fois inversées, elles deviennent claires |
| `invert` | 1 | 1 | Négatif de l'image et sons à l'envers |
| `fog` | 0.12 | 0.12 | Léger voile |
| `windowGlow` | — | 0.5 | Fenêtres allumées, sombres une fois inversées |

## Comment c'est fait

### 1. Le négatif : un post-effet
L'inversion se fait sur l'image finale, dans la passe de `HeatHazePass.ts` déjà utilisée pour l'ondulation de la [Canicule](heatwave.md) (voir [post-effets](../concepts/06-post-effets.md)). `WeatherHelper.renderPostEffects` active la passe dès que `heatHaze`, `heatWash` **ou** `invert` dépasse 0.01, et lui transmet `p.invert` (uniform `uInvert`).

```glsl
vec3 shown = pow(max(c, 0.0), vec3(1.0 / 2.2));
vec3 negative = pow(clamp(1.0 - shown, 0.0, 1.0), vec3(2.2));
c = mix(c, negative, uInvert);
```

**Piège** : à ce stade, la couleur `c` est encore en **linéaire** (la conversion vers l'écran, `colorspace_fragment`, vient juste après). Un gris qui paraît moyen à l'écran vaut environ 0.2 en linéaire, donc `1 - c` donnerait 0.8, un gris presque blanc. On passe donc d'abord dans l'espace de l'écran (gamma, `pow(c, 1/2.2)`), on inverse, puis on revient en linéaire (`pow(…, 2.2)`). Un gris moyen reste alors un gris moyen.

Le `mix` avec `uInvert` permet une transition douce : en changeant de météo, l'image passe progressivement par un gris uniforme avant de s'inverser.

### 2. Les sons à l'envers
Un son naturel a une **attaque** rapide puis une **extinction** lente (une cloche frappée, une cymbale). Joué à l'envers, c'est le contraire : il naît du silence, enfle lentement, puis s'arrête net. `WeatherAudio.updateInverted` (voir [audio](../concepts/10-audio.md)) fabrique directement cette enveloppe inversée :

```ts
g.gain.setValueAtTime(0.0005, at);
g.gain.exponentialRampToValueAtTime(REVERSE_GAIN * level, at + length); // montée lente
g.gain.setValueAtTime(0, at + length + 0.01);                          // coupure nette
```

Deux sons, tirés à pile ou face :
- **Cymbale inversée** : du bruit passé dans un filtre passe-bande dont la fréquence monte de 800 à 6 000 Hz. Le souffle devient de plus en plus brillant.
- **Cloche inversée** : trois sons purs aux rapports **inharmoniques** d'une cloche (1, 2.76, 5.4 fois la fondamentale). Ce sont ces rapports non entiers qui font sonner « métal » plutôt que « flûte ».

Chaque son est placé au hasard entre la gauche et la droite (`panned`).

## Maths et code à retenir

- **Linéaire vs gamma** : les calculs de lumière se font en linéaire, mais une opération « visuelle » comme un négatif se fait dans l'espace de l'écran.
- **Inverser le temps d'un son = inverser son enveloppe** : montée exponentielle puis coupure.
- **Partiels inharmoniques** : des fréquences non multiples de la fondamentale donnent un timbre de cloche.

## Expériences à tenter

- Remplace le calcul par `c = mix(c, 1.0 - c, uInvert);` dans `HeatHazePass.ts` : le négatif devient délavé, et on voit l'intérêt du passage en gamma.
- `invert: 0.5` dans le preset : l'image entière devient grise, avec juste des contours colorés.
- `REVERSE_INTERVAL = [0.5, 1]` dans `WeatherAudio.ts` : un monde très bavard.

## Voir aussi

- [Canicule](heatwave.md) : la même passe de post-effet.
- [Distorsion temporelle](time-warp.md) : autre jeu sur le temps et le son.
