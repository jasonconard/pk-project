# 🌃 Nuit étoilée (`starry-night`)

> Catégorie **Magie & ciel** · **nuit uniquement** (choisie de jour, l'heure passe à 22:00) · 11 °C

## Ce qu'on voit / entend

Une nuit claire et fraîche : la lune est brillante et un peu bleutée, et les ombres sont nettes. La rosée garde le sol légèrement humide avec de petites flaques, et des étoiles scintillent dans l'eau, chacune à son rythme. Quelques lucioles flottent près des plantes et les grillons chantent.

## Les paramètres

Preset `STARRY_NIGHT` dans `src/app/modules/game/shared/weather/Weather.ts` (seulement dans `NIGHT_PRESETS`, d'où la disponibilité « nuit uniquement ») :

| Paramètre | Valeur | Effet |
|---|---|---|
| `litLevel` / `shadowLevel` | 0.52 / 0.26 | Lune plus lumineuse qu'une nuit neutre, ombres bien contrastées |
| `ambientColor` / `sunColor` / `unlitTint` | bleus clairs | Lumière lunaire froide ([éclairage](../concepts/03-eclairage-et-shaders.md)) |
| `specular` | 0.6 | Reflets de lune sur les toits et l'eau |
| `windowGlow` | 0.45 | Quelques fenêtres allumées ([bloom](../concepts/06-post-effets.md)) |
| `fireflies` | 0.2 | Lucioles discrètes ([particules](../concepts/08-particules.md)) |
| `dew` | 1 | Rosée : sol humide et petites flaques |
| `stars` | 1 | Étoiles dans les flaques |
| `crickets` | 0.8 | Grillons ([audio](../concepts/10-audio.md)) |

Pas de nuages ni de brouillard : la valeur 0 de `NIGHT_BASE` est gardée.

## Comment c'est fait

### La rosée (`dew`)
D'habitude, les flaques ne se remplissent que s'il pleut (`updatePuddles` dans `WeatherHelper.ts`, voir [surfaces météo](../concepts/04-surfaces-meteo.md)). La rosée ajoute une règle : tant que `dew > 0`, l'humidité et le niveau des flaques montent jusqu'à un **plancher** et pas plus loin.

```ts
this.wetness = Math.max(this.wetness, Math.min(DEW_WETNESS * p.dew, this.wetness + dt / WET_TIME));
this.puddles = Math.max(this.puddles, Math.min(DEW_PUDDLES * p.dew, this.puddles + dt / PUDDLE_FILL_TIME));
```

Lecture de droite à gauche : on fait monter la valeur à la vitesse habituelle (`+ dt / …`), on la plafonne au niveau de rosée (`min`), et on ne la fait jamais baisser (`max` avec la valeur actuelle). S'il a plu avant, des flaques plus grandes restent donc telles quelles. Avec `DEW_PUDDLES = 0.45`, on obtient les plus petites flaques dans les creux les plus profonds du bruit (voir `puddleLevel` dans [bruit procédural](../concepts/07-bruit-procedural.md)).

### Les étoiles dans les flaques (`stars`)
Dans le shader (`FRAGMENT_BODY` de `weather-shader.ts`), là où l'eau reflète le ciel, on ajoute des étoiles. Le sol est découpé en une **grille de cellules** et une fonction de hachage décide pour chaque cellule s'il y a une étoile :

```glsl
vec2 starCell = floor(vWeatherWorldPos.xz * STAR_DENSITY);   // numéro de la cellule
float star = step(STAR_RARITY, wbHash(starCell));            // 1 si hash > 0.985 (environ 1,5 % des cellules)
float twinkle = 0.4 + 0.6 * sin(uBeamTime * (2.0 + 3.0 * wbHash(starCell + 5.3))
                                + wbHash(starCell + 1.7) * 40.0);
reflection += vec3(0.85, 0.9, 1.0) * star * max(twinkle, 0.0) * fresnel * uStars * 1.6;
```

- `floor(x * densité)` donne le même entier pour tous les pixels d'une cellule, donc la décision est identique sur toute la cellule. On obtient un petit carré, qui colle bien au pixel art.
- `wbHash` renvoie un nombre pseudo-aléatoire stable entre 0 et 1 pour chaque cellule, et `step(seuil, x)` vaut 0 sous le seuil, 1 au-dessus. Avec 0.985, environ 1,5 % des cellules ont une étoile.
- Le **scintillement** est une sinusoïde dont la vitesse et la phase dépendent de la cellule (deux autres hash). Les étoiles ne clignotent donc jamais ensemble, et `max(…, 0)` les éteint par moments.
- Le facteur `fresnel` vient du reflet de l'eau : les étoiles sont plus visibles quand on regarde l'eau en biais, comme un vrai reflet.
- Tout est multiplié par `wbPuddle` (on est dans le bloc des flaques) : pas d'étoile sur le sol sec.

### Les grillons (`crickets`)
Les grillons de la [Forêt](forest.md) ne dépendaient que du niveau `forest`. `updateForest` (`WeatherAudio.ts`) prend maintenant le maximum entre la forêt et `crickets`, de la même façon que `birds` pour les oiseaux. La nuit étoilée a ainsi les grillons sans le bruissement des feuilles ni le hibou.

## Maths et code à retenir

- **Grille + hash + step** : la recette classique pour semer des points aléatoires mais stables (étoiles, paillettes du [Gel](frost.md), éclats).
- **Phase et vitesse par cellule** : `sin(t · vitesse(cellule) + phase(cellule))` évite que tout clignote en même temps.
- **Plancher progressif** `max(v, min(plafond, v + vitesse·dt))` : monter doucement jusqu'à un niveau sans jamais faire baisser la valeur.

## Expériences à tenter

- `STAR_RARITY = 0.96` dans `weather-shader.ts` : un ciel très étoilé dans l'eau.
- `STAR_DENSITY = 3.0` : des étoiles plus petites et plus serrées.
- `DEW_PUDDLES = 0.7` dans `WeatherHelper.ts` : de grandes flaques de rosée, donc plus d'étoiles.
- `fireflies: 0.6` dans le preset : une nuit d'été bien plus vivante.

## Voir aussi

- [Lucioles](fireflies.md) : les lucioles en vedette.
- [Forêt](forest.md) : les mêmes grillons, avec le hibou et le bruissement.
- [Gel](frost.md) : autre usage de la grille + hash (paillettes de givre).
- [Aurore](aurora.md) : autre nuit claire, illuminée par des voiles colorés.
