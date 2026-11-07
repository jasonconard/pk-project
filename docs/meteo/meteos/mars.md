# 🪐 Vent de Mars (`mars`)

> Catégorie **Magie & ciel** · disponible **de jour et de nuit** · -15 °C le jour, -40 °C la nuit (le thermomètre s'arrête à -20)

## Ce qu'on voit / entend

Comme sur une autre planète : le ciel est couleur rouille, un vent permanent souffle du sable rouge, et le sol, les toits et les murs face au vent se couvrent peu à peu d'une couche rouge. Des poussières rougeâtres flottent longtemps dans l'air en montant et descendant lentement, comme en faible gravité. La nuit tombe glaciale, sous une lumière froide bleutée. On entend le vent et le sifflement du sable.

## Les paramètres

Preset `MARS` dans `src/app/modules/game/shared/weather/Weather.ts` :

| Paramètre | Jour | Nuit | Effet |
|---|---|---|---|
| `litLevel` / `shadowLevel` | 0.8 / 0.56 | 0.34 / 0.22 | Lumière voilée |
| `ambientColor` / `sunColor` / `unlitTint` | orangés | brun-rouge / bleu froid | Ciel rouille ; la nuit, lumière bleutée comme les crépuscules martiens ([éclairage](../concepts/03-eclairage-et-shaders.md)) |
| `cloudCover` / `cloudSpeed` | 0.4 / 30 | 0.3 / 30 | Ombres de nuages rapides |
| `sand` | 0.7 | 0.6 | Grains et nuages de poussière soufflés ([particules](../concepts/08-particules.md)) |
| `minWind` | 0.5 | 0.5 | Vent minimum forcé ([vent](../concepts/11-vent.md)) |
| `sandColor` | rouille (0.6, 0.24, 0.12) | idem | Couleur de la couche de sable au sol |
| `sandTint` | `0xff8a6a` | idem | Teinte des grains et nuages de poussière |
| `marsDust` | 1 | 1 | Poussières en « faible gravité » |
| `fog` / `fogColor` | 0.5 / `0xc27a52` | 0.5 / `0x3c2020` | Brume rouge ([brouillard](../concepts/05-brouillard-et-tenebres.md)) |

## Comment c'est fait

Le Vent de Mars réutilise toute la mécanique de la [Tempête de sable](sandstorm.md) : grains et nuages soufflés, couche qui s'accumule (`sandCover`), vent forcé. Pour pouvoir la recolorer, deux couleurs fixes sont devenues des **paramètres de météo**.

### `sandColor` : la couleur de la couche au sol
Avant, `SAND_FRAGMENT` (`weather-shader.ts`) utilisait une couleur écrite en dur. C'est maintenant l'uniform `uSandColor`, mis à jour à chaque image dans `WeatherHelper.update` :

```glsl
float sandLum = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
vec3 sandColor = uSandColor * min(0.75 + 0.35 * sandLum, 1.0);   // garde un peu du relief de la texture
diffuseColor.rgb = mix(diffuseColor.rgb, sandColor, sand);
```

La couleur est donnée en **RGB linéaire** (`new THREE.Color().setRGB(0.6, 0.24, 0.12)`) car les calculs d'éclairage du shader se font en espace linéaire. C'est une couleur (`THREE.Color`), donc le mélange de météo la fait glisser progressivement : passer de Mars à la Tempête de sable fait virer la couche du rouge au beige (voir [architecture](../concepts/01-architecture.md)).

### `sandTint` : la teinte des grains soufflés
Les grains et nuages de `SandHelper` sont des matériaux « non éclairés » : leur couleur finale est **teinte de lumière × couleur de base** (voir [éclairage](../concepts/03-eclairage-et-shaders.md), `registerUnlitMaterial`). `SandHelper.setTint` remplace simplement cette couleur de base (`userData.unlitBaseColor`) par `sandTint`. Les couleurs sableuses de chaque grain sont multipliées par ce rouge-orangé. En blanc (la valeur par défaut), rien ne change.

Les nuages de poussière soufflés utilisent la texture de fumée et roulent sur eux-mêmes, comme dans la [Tempête de sable](sandstorm.md).

### Les poussières en faible gravité
Un style de `GlowParticles` à part, `MARS_DUST_STYLE`. La sensation de gravité faible tient à trois réglages :

| Réglage | Valeur | Effet |
|---|---|---|
| `rise` | [-2.5, 1.5] | Vitesse verticale faible, vers le haut ou vers le bas : la poussière ne retombe pas franchement |
| `life` | [10, 18] s | Elle reste longtemps en l'air |
| `wobble` / `wobbleSpeed` | 5 / 0.25 | Grands balancements très lents |

## Maths et code à retenir

- **Transformer une constante de shader en uniform** pour la rendre pilotable par la météo : c'est le chemin habituel pour enrichir un effet.
- **Couleurs en espace linéaire** pour tout ce qui entre dans les calculs d'éclairage.
- **Couleur finale = teinte × couleur de base** pour les matériaux non éclairés : changer la base suffit à recolorer sans toucher au reste.
- **Faible gravité = petites vitesses + longue vie + mouvements lents** : un effet perçu se règle par plusieurs paramètres à la fois.

## Expériences à tenter

- `sandColor: new THREE.Color().setRGB(0.9, 0.9, 0.95)` et `sandTint: new THREE.Color(0xffffff)` : une tempête de sable blanc.
- `sandColor: new THREE.Color().setRGB(0.08, 0.08, 0.09)` et `sandTint: new THREE.Color(0x404040)` : des cendres noires.
- `rise: [0.5, 1]` dans `MARS_DUST_STYLE` : toute la poussière monte, comme aspirée vers le ciel.
- `minWind: 1` : une vraie tempête martienne.

## Voir aussi

- [Tempête de sable](sandstorm.md) : la même mécanique en beige.
- [Neige de cendres](ash.md) : autre ciel voilé avec des particules qui tombent.
- [Smog](smog.md) : autre brume colorée et pesante.
