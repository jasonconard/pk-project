# 🌄 Brume matinale (`morning-mist`)

> Catégorie **Classique** · disponible **de jour et de nuit**, mais la brume n'existe qu'au petit matin (choisie à un autre moment, l'heure passe à 6:00) · 13 °C le jour, 7 °C la nuit

## Ce qu'on voit / entend

Le petit matin. De grandes nappes de brume pâle traînent au ras du sol et dérivent lentement. La lumière de l'aube les teinte de rose doré, les rayons du soleil levant les traversent, la rosée fait briller le sol et les oiseaux se réveillent. La brume s'installe dans la seconde moitié de la nuit, reste épaisse de 3 h à 7 h, puis se déchire quand le soleil monte et disparaît vers 10 h.

## Les paramètres

Preset `MORNING_MIST` dans `src/app/modules/game/shared/weather/Weather.ts` :

| Paramètre | Jour | Nuit | Effet |
|---|---|---|---|
| `litLevel` / `shadowLevel` | 0.95 / 0.62 | nuit normale | Lumière douce ([éclairage](../concepts/03-eclairage-et-shaders.md)) |
| `morningMist` | 1 | 1 | « Matin brumeux » : la quantité réelle dépend de l'heure |
| `fogColor` | `0xeeeae4` | `0x3a4258` | Couleur de la brume ([brouillard](../concepts/05-brouillard-et-tenebres.md)) |
| `birds` | 1 | — | Chant des oiseaux ([audio](../concepts/10-audio.md)) |
| `windowGlow` | — | 0.4 | Fenêtres allumées |

Le brouillard, la rosée et les rayons ne sont **pas** dans le preset : ils sont ajoutés selon l'heure (voir plus bas).

## Comment c'est fait

### 1. Une météo qui dépend de l'heure
`mistAt(hour)` (`Weather.ts`) donne la force de la brume selon l'heure :

```ts
if (h < 3) return smoothstep(h, 0, 3);    // elle s'installe après minuit
if (h < 7) return 1;                      // épaisse jusqu'au lever du soleil
return 1 - smoothstep(h, 7, 10);          // elle se dissipe, disparue à 10 h
```

Dans `WeatherHelper.targetParams`, après le mélange jour/nuit et la teinte de l'aube (voir [jour et nuit](../concepts/02-jour-nuit.md)) :

```ts
to.morningMist *= mistAt(this.hour);
to.fog += MIST_FOG * to.morningMist;                     // 0.55
to.dew = Math.max(to.dew, MIST_DEW * to.morningMist);    // rosée
to.godRays = Math.max(to.godRays, MIST_RAYS * to.morningMist * d); // rayons, seulement de jour
```

Comme ces paramètres passent ensuite par le mélange progressif habituel, la brume se dissipe **toute seule** quand l'heure avance (écoulement du temps activé). Les rayons (`godRays`, voir [post-effets](../concepts/06-post-effets.md)) sont multipliés par la lumière du jour `d` : pas de rayons de soleil la nuit.

Choisie à un autre moment de la journée, la brume serait invisible. `GameService.setWeather` place donc l'heure à `MORNING_MIST_HOUR` (6:00) si `mistAt` est sous 0.5, comme pour les météos de jour ou de nuit seulement.

### 2. Les nappes au sol
Un style `GlowParticles` (`MIST_STYLE`, voir [particules](../concepts/08-particules.md)) : la texture de fumée, très grande (45 à 75 unités), très transparente (`smokeOpacity` 0.32), éclairée par la scène (`followLight`, d'où la teinte de l'aube), presque immobile (`rise` −0.3 à 0.6, vie de 10 à 18 s), poussée doucement par le vent.

Deux nouvelles options de `GlowStyle` ont été nécessaires :
- **`flat`** : les particules sont **couchées à plat** au lieu de faire face à la caméra. Un quad tourné vers la caméra est incliné par rapport au sol. S'il est aussi grand qu'une nappe de brume, sa moitié basse s'enfonce dans le sol et le test de profondeur la coupe le long d'une **ligne droite**, très visible. À plat, à 1 à 4 unités au-dessus du sol, il ne le traverse plus. La rotation lente de la fumée se fait alors autour de l'axe vertical.
- **`renderOrder: -1`** : la brume est dessinée avant les autres objets transparents (le joueur, la pluie) qui la recouvrent.

**Piège rencontré** : un rectangle sombre près du joueur a fait croire à un défaut de la brume. Pour trouver la cause, on a rendu l'image **en retirant un élément à la fois** (sans joueur, puis sans brume) : le rectangle restait. C'était l'ombre d'un bâtiment, visible à 4 h parce que la lune était placée différemment.

## Maths et code à retenir

- **Un paramètre modulé par l'heure** : le preset décrit l'ambiance, une fonction de l'heure dose l'effet.
- **`smoothstep` pour des transitions douces** dans le temps.
- **Des quads à plat** pour les grands effets au sol, des quads face à la caméra pour les petits.
- **Déboguer par élimination** : retirer un élément à la fois jusqu'à isoler le coupable.

## Expériences à tenter

- `MIST_FOG = 1.2` dans `WeatherHelper.ts` : une purée de pois.
- Dans `mistAt`, remplace `smoothstep(h, 7, 10)` par `smoothstep(h, 7, 14)` : la brume traîne jusqu'en début d'après-midi.
- Retire `flat: true` de `MIST_STYLE` : on voit les nappes coupées net par le sol.
- `size: [10, 20]` : des petits flocons de brume au lieu de nappes.

## Voir aussi

- [Brouillard](fog.md) : le brouillard classique, sans dépendance à l'heure.
- [Ensoleillé](sunny.md) : les rayons du soleil.
- [Nuit étoilée](starry-night.md) : la rosée.
