# 🎞️ Vieux film (`old-film`)

> Catégorie **Magie & ciel** · disponible **de jour et de nuit** · 16 °C le jour, 11 °C la nuit

## Ce qu'on voit / entend

Le monde devient un vieux film muet. L'image est en noir et blanc légèrement sépia et plus contrastée, avec du grain qui fourmille. Elle scintille et saute un peu, des rayures verticales claires et des poussières sombres passent sur la pellicule, et les coins sont assombris. On entend le ronronnement haché du projecteur et de petits crépitements.

## Les paramètres

Preset `OLD_FILM` dans `src/app/modules/game/shared/weather/Weather.ts` :

| Paramètre | Jour | Nuit | Effet |
|---|---|---|---|
| `litLevel` / `shadowLevel` | 1 / 0.55 | 0.5 / 0.3 | Ombres marquées : le noir et blanc vit de contrastes |
| `oldFilm` | 1 | 1 | Effet de pellicule et son du projecteur |
| `fog` | 0.12 | 0.12 | Léger voile |
| `windowGlow` | — | 0.6 | Fenêtres allumées, qui ressortent en blanc |

## Comment c'est fait

### 1. Un post-effet de plus
L'effet est dans `HeatHazePass.ts`, la passe déjà utilisée par la [Canicule](heatwave.md) et le [Monde inversé](inverted.md) (voir [post-effets](../concepts/06-post-effets.md)). `renderPostEffects` l'active dès que `oldFilm` dépasse 0.01 et lui passe `p.oldFilm` (uniform `uFilm`). Comme pour le négatif, tout se fait dans l'espace de l'écran (gamma), comme sur un vrai tirage.

### 2. Le numéro d'image
Un vieux film tourne à 18 images par seconde, beaucoup moins que l'écran. Tous les défauts doivent donc changer **à ce rythme**, pas à chaque image affichée :

```glsl
float frame = floor(uTime * 18.0);
```

`floor` transforme un temps continu en **marches** : `frame` reste constant pendant 1/18 s. Chaque tirage au hasard utilise `hhHash(vec2(frame, …))` : un nombre pseudo-aléatoire différent pour chaque image du film, mais stable pendant sa durée. C'est le même principe que les cellules des étoiles de la [Nuit étoilée](starry-night.md), mais appliqué au temps au lieu de l'espace.

### 3. Les défauts de la pellicule
| Défaut | Code | Idée |
|---|---|---|
| Image qui saute | `offset.y += (hash(frame) - 0.5) * 0.003` | Décalage de la lecture de l'image, avant l'échantillonnage |
| Noir et blanc contrasté | `smoothstep(0.04, 0.96, luminance)` | Les gris proches du noir ou du blanc y sont poussés |
| Scintillement | `s *= 0.9 + 0.1 * hash(frame)` | Luminosité globale qui varie à chaque image |
| Grain | `hash(gl_FragCoord.xy + frame * 17.0)` | Un bruit par pixel, renouvelé à chaque image |
| Rayures | `1 - smoothstep(0, 0.0012, abs(vUv.x - sx))` | 2 lignes verticales fines, position et présence tirées à chaque image |
| Poussières | `step(0.9993, hash(cellule + frame))` | Quelques cellules sur 220 de haut deviennent des points sombres |
| Vignettage | `s *= 1 - dot(d, d) * 1.4` | Assombrit selon le carré de la distance au centre |
| Sépia | `s * vec3(1.06, 1.0, 0.88)` | Un peu plus de rouge, moins de bleu |

### 4. Le projecteur
`WeatherAudio` (voir [audio](../concepts/10-audio.md)) :
- **Ronronnement** : un bruit filtré autour de 1 600 Hz passe dans un `GainNode` dont le volume est modulé par un **oscillateur carré** à 18 Hz (comme l'obturateur du projecteur). Le volume alterne entre 0.2 et 1, ce qui hache le son au rythme des images. C'est le même principe de LFO que la [Gravité inversée](antigravity.md), mais sur le volume.
- **Crépitements** : `updateFilmCrackle` joue au hasard (7 par seconde en moyenne) des clics de 6 ms : un bruit très court passé au-dessus de 1 500 Hz.

## Maths et code à retenir

- **`floor(t × fps)`** : un temps en marches pour animer à une cadence plus basse que l'écran.
- **Hash du numéro d'image** : un aléatoire stable pendant une image et différent à la suivante.
- **Tous les défauts d'une pellicule sont des fonctions simples** : décalage, seuils, lignes, points, vignette.
- **LFO carré sur le volume** : hacher un son à un rythme précis.

## Expériences à tenter

- `FILM_FPS = 6` dans `HeatHazePass.ts` : une pellicule qui saccade.
- Remplace `vec3(1.06, 1.0, 0.88)` par `vec3(1.0)` : un noir et blanc pur.
- Remplace `0.9993` par `0.995` : une pellicule très abîmée.
- `SHUTTER_RATE = 6` dans `WeatherAudio.ts` : un projecteur fatigué.

## Voir aussi

- [Monde inversé](inverted.md) et [Canicule](heatwave.md) : la même passe de post-effet.
- [Gravité inversée](antigravity.md) : un autre LFO, sur la fréquence d'un filtre.
