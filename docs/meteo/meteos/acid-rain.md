# 🧪 Pluie acide (`acid-rain`)

> Catégorie **Sombre & surnaturel** · disponible **de jour et de nuit** · 19 °C le jour, 15 °C la nuit

## Ce qu'on voit / entend

Un ciel jaune-vert maladif et une pluie verdâtre qui ronge tout. Le sol se tache de vert acide, les flaques deviennent vertes et des volutes de fumée s'en élèvent en tournant, puis s'étalent et se dissipent. On entend la pluie et un grésillement aigu et irrégulier, comme une friture, qui monte à mesure que le sol se mouille.

## Les paramètres

Preset `ACID_RAIN` dans `src/app/modules/game/shared/weather/Weather.ts` :

| Paramètre | Jour | Nuit | Effet |
|---|---|---|---|
| `litLevel` / `shadowLevel` | 0.72 / 0.58 | 0.32 / 0.22 | Lumière couverte |
| `ambientColor` / `sunColor` / `unlitTint` | jaune-vert pâle | vert sombre | Teinte maladive ([éclairage](../concepts/03-eclairage-et-shaders.md)) |
| `cloudCover` / `cloudAmbient` | 0.75 / 0.14 | 0.6 / — | Ciel couvert |
| `acidRain` | 0.7 | 0.7 | Pluie acide |
| `fumes` | 1 | 1 | Fumées au-dessus des flaques |
| `fog` / `fogColor` | 0.3 / `0xaec486` | 0.3 / `0x323e26` | Brume verdâtre ([brouillard](../concepts/05-brouillard-et-tenebres.md)) |
| `windowGlow` | — | 0.5 | Fenêtres allumées |

## Comment c'est fait

### La pluie et les taches
`ACID_RAIN_STYLE` (`RainHelper.ts`) est une variante de la pluie : gouttes vert-jaune qui suivent la lumière (`followLight`) et éclaboussures vertes (voir [particules](../concepts/08-particules.md)). Au sol, la pluie acide utilise la même mécanique de **taches** que le sang et le poison (voir [surfaces météo](../concepts/04-surfaces-meteo.md)). Dans `updatePuddles` (`WeatherHelper.ts`), la couleur des flaques est maintenant une **moyenne pondérée** des pluies colorées qui tombent :

```ts
const stained = p.bloodRain + p.poisonRain + p.acidRain;
STAIN_MIX.copy(BLOOD_STAIN).multiplyScalar(p.bloodRain / stained)
  .add(TMP_STAIN.copy(POISON_STAIN).multiplyScalar(p.poisonRain / stained))
  .add(TMP_STAIN.copy(ACID_STAIN).multiplyScalar(p.acidRain / stained));
```

Les poids `p.x / stained` font 1 au total : c'est une **combinaison convexe** des trois couleurs. Si on passe progressivement d'une pluie de sang à une pluie acide, la couleur glisse du rouge au vert. Une pluie d'eau lave ensuite ces taches.

### La fumée
C'est l'élément nouveau. Un premier essai, avec de simples disques lumineux, donnait des « boules de lumière ». Voici ce qui fait une fumée crédible, avec les options ajoutées à `GlowParticles` (style `FUME_STYLE`) :

| Ingrédient | Option | Pourquoi |
|---|---|---|
| Contour irrégulier | `smoke` → `makeSmokeTexture()` | 14 petits nuages flous de taille et de position aléatoires, fondus ensemble : pas de cœur brillant, un bord nuageux |
| Mouvement de volute | `smoke.spin` | Chaque bouffée tourne lentement sur elle-même, dans un sens ou dans l'autre |
| Elle s'étale en montant | `grow: 2.6`, `stretchY: 1.3` | La taille passe de ×1 à ×2.6 pendant la vie, et la bouffée est un peu plus haute que large |
| Elle se dissipe | `blending: 'additive'` | En mélange additif, baisser la couleur rend la bouffée transparente, donc elle s'estompe au lieu de rétrécir |
| Elle vit dans la scène | `followLight: true` | Teintée par la lumière ambiante : pâle le jour, sombre la nuit |
| Elle vient des flaques | `spawnFilter` | Une fonction qui décide où les particules peuvent naître, ici `puddleAt(x, z, puddles)` |

Quelques détails de code :

- **La rotation** : la bouffée doit rester face à la caméra *et* tourner sur l'axe de vue. On compose deux rotations (quaternions) : `camera.quaternion × rotation autour de Z`. Multiplier par la droite applique la rotation dans le repère local du quad, donc autour de l'axe qui pointe vers la caméra.
- **La croissance** : `size × (1 + (grow - 1) × t)` avec `t = âge / vie`, une interpolation linéaire de ×1 à ×`grow`.
- **Où naître** : `spawnPoint` tire jusqu'à 12 positions au hasard et garde la première qui passe le filtre. C'est l'**échantillonnage par rejet**, simple et efficace quand la zone acceptée n'est pas minuscule.
- **La densité suit l'humidité** : dans `WeatherHelper`, la densité vaut `fumes × min(wetness × 1.5, 1)`. Pas de fumée tant que le sol n'est pas mouillé.

### Le grésillement
`WeatherAudio.updateMagic` module une boucle de bruit blanc filtrée dans les aigus (3,5 à 9 kHz). À chaque image, son volume saute au hasard entre un niveau fort (45 % du temps) et un niveau faible, avec une constante de temps très courte (15 ms). Ces changements rapides et irréguliers donnent la « friture ». Le niveau suit lui aussi l'humidité du sol. Voir [audio](../concepts/10-audio.md).

## Maths et code à retenir

- **Combinaison convexe** de couleurs, avec des poids positifs de somme 1.
- **Composition de quaternions** : `parent × local` pour tourner un billboard autour de l'axe de vue.
- **Échantillonnage par rejet** pour faire naître des particules dans une zone de forme quelconque.
- **Additif pour estomper, normal pour garder la couleur** : le choix du mélange décide de la façon dont une particule peut disparaître.

## Expériences à tenter

- `grow: 5` dans `FUME_STYLE` : de grandes nappes de fumée.
- `smoke: { spin: 2 }` : des volutes qui tourbillonnent.
- Retire `this.fumes.spawnFilter = …` dans `WeatherHelper.ts` : la fumée sort de partout, et on comprend l'intérêt du filtre.
- `ACID_STAIN = new THREE.Color(0.4, 0.3, 0.02)` : un acide plus jaune.

## Voir aussi

- [Climat empoisonné](poison.md) et [Pluie de mort](blood-rain.md) : les autres pluies colorées, même mécanique de taches.
- [Pluvieux](rainy.md) : la pluie d'eau qui lave les taches.
- [Spores](spores.md) : autres particules qui montent du sol, mais lumineuses.
