# 🏭 Smog (`smog`)

> Catégorie **Classiques** · disponible **de jour et de nuit** · 27 °C le jour, 21 °C la nuit

## Ce qu'on voit / entend

Une brume jaune-brun, épaisse et pesante, noie le décor au loin. Le soleil est orange pâle et voilé, les ombres sont molles et les couleurs paraissent ternies, comme délavées. La nuit, la brume prend une lueur brun-orangé, comme éclairée par les lampadaires d'une ville. Au loin, on entend la rumeur de la circulation, des klaxons et parfois une sirène.

## Les paramètres

Preset `SMOG` dans `src/app/modules/game/shared/weather/Weather.ts` (valeurs qui diffèrent de `DAY_BASE` / `NIGHT_BASE`) :

| Paramètre | Jour | Nuit | Effet |
|---|---|---|---|
| `litLevel` / `shadowLevel` | 0.74 / 0.58 | 0.38 / 0.28 | Peu d'écart entre soleil et ombre : ombres molles |
| `sunColor` | `0xffd498` | `0xc8a878` | Soleil orange pâle ([éclairage](../concepts/03-eclairage-et-shaders.md)) |
| `ambientColor` / `unlitTint` | beiges jaunis | bruns | Air jauni |
| `specular` | 0.1 | 0.1 | Presque plus de reflets |
| `cloudCover` | 0.4 | 0.3 | Voile nuageux |
| `heatWash` | 0.7 | 0.5 | Couleurs désaturées et réchauffées ([post-effets](../concepts/06-post-effets.md)) |
| `fog` / `fogColor` | 0.7 / `0xb2a26e` | 0.7 / `0x4c4030` | Brume polluée ([brouillard](../concepts/05-brouillard-et-tenebres.md)) |
| `windowGlow` / `windowTint` | — | 0.6 / `0xffc890` | Fenêtres orangées |
| `city` | 1 | 0.7 | Bruits de ville lointains ([audio](../concepts/10-audio.md)) |

## Comment c'est fait

### Une ambiance visuelle composée
Le Smog n'ajoute aucun rendu nouveau. Il combine des réglages existants :

- le **brouillard** (0.7) teinté jaune-brun fait l'essentiel ;
- `heatWash` réutilise la passe de la [Canicule](heatwave.md) (`HeatHazePass`), qui fait deux choses distinctes. La première, `heatHaze`, fait onduler l'image : elle reste à 0 ici. La seconde, `heatWash`, désature et réchauffe les couleurs : c'est elle qui donne l'aspect « terni » ;
- l'écart réduit entre `litLevel` et `shadowLevel` : la lumière du soleil (`litLevel - shadowLevel`) pèse peu face à l'ambiante, donc les ombres sont peu marquées, comme sous un voile.

Pour mémoire, la désaturation de `HeatHazePass` mélange la couleur avec sa luminance :

```glsl
float luma = dot(c, vec3(0.2126, 0.7152, 0.0722));  // luminosité perçue
c = mix(c, vec3(luma), DESATURATION * uWash);        // vers le gris
c *= mix(vec3(1.0), uTint, uWash);                   // teinte chaude
```

Les coefficients `0.2126 / 0.7152 / 0.0722` sont ceux du standard Rec. 709 : l'œil est bien plus sensible au vert qu'au bleu.

### La ville au loin (`city`)
`WeatherAudio.updateCity` superpose trois couches :

- **la circulation** : une boucle de bruit brun passée dans un passe-bas réglé vers 220-340 Hz. Son volume et sa fréquence de coupure suivent une « houle » faite de deux sinusoïdes lentes, de périodes sans rapport simple (0.21 et 0.67 rad/s), pour que le motif ne se répète jamais vraiment ;
- **les klaxons** (`horn`) : deux oscillateurs carrés joués ensemble, avec un rapport de fréquence de 1.26, proche d'une tierce majeure. C'est l'accord typique d'un klaxon. Le passe-bas à 900 Hz enlève les aigus, et c'est ce qui donne l'impression de distance ;
- **la sirène** (`siren`) : un oscillateur dont la fréquence est **modulée par un second oscillateur très lent** (un LFO de 0.4 à 0.7 Hz, profondeur ±160 Hz autour de 720 Hz). On connecte le LFO directement au paramètre `frequency` : le Web Audio additionne alors sa sortie à la valeur de base.

Les bases (bruit brun, filtres, enveloppes, LFO) sont dans [audio](../concepts/10-audio.md).

## Maths et code à retenir

- **Luminance Rec. 709** pour désaturer proprement.
- **Lumière soleil vs ambiante** : ce sont leur rapport et leur écart qui donnent le contraste des ombres, pas leur valeur absolue.
- **Modulation par LFO** : `oscillateur.frequency ← base + profondeur × sin(2π·f_lfo·t)`, réalisée en branchant un oscillateur sur un `AudioParam`.
- **Le passe-bas, effet de distance** : l'air absorbe d'abord les aigus, donc un son lointain est plus sourd.

## Expériences à tenter

- `heatWash: 1` et `fogColor: new THREE.Color(0x9a8a5a)` : un smog bien plus étouffant.
- `heatHaze: 0.4` dans le preset : l'air pollué se met à onduler, comme une chaleur urbaine.
- `SIREN_CHANCE = 0.6` dans `WeatherAudio.ts` : une ville en alerte.
- Dans `horn`, remplace `1.26` par `1.5` : un klaxon accordé en quinte, plus « gentil ».

## Voir aussi

- [Brouillard](fog.md) et [Brume marine](sea-mist.md) : les autres brumes classiques.
- [Canicule](heatwave.md) : la même passe d'image, avec l'ondulation en plus.
- [Neige de cendres](ash.md) : autre ciel voilé et orangé.
