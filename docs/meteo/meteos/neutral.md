# ⚪ Neutre (`neutral`)

> Catégorie **Classiques**. Disponible **de jour et de nuit**. C'est la météo de référence : ses presets sont exactement `DAY_BASE` et `NIGHT_BASE`, la base dont toutes les autres météos partent. C'est aussi la météo de **repli** quand une météo n'existe pas à l'heure choisie.

## Ce qu'on voit / entend

- **Jour** : une lumière blanche et neutre, des ombres nettes des bâtiments, pas de nuages, pas de particules, pas d'effet d'écran.
- **Nuit** : la lumière du soleil devient une lune bleutée et faible, l'ambiance vire au bleu, les fenêtres s'allument (avec leur halo).
- **Son** : aucune ambiance propre (`sound: false` dans `weather-catalog.ts`). On entend seulement le vent si on monte la jauge, et les pas sur sol sec.

## Les paramètres

Neutre **ne modifie rien** : `DAY_PRESETS[NEUTRAL] = DAY_BASE` et `NIGHT_PRESETS[NEUTRAL] = NIGHT_BASE`. Le tableau ci-dessous donne donc les valeurs de base elles-mêmes (celles qui comptent pour lire les autres fiches).

| Paramètre | Jour (`DAY_BASE`) | Nuit (`NIGHT_BASE`) | Effet |
|---|---|---|---|
| `litLevel` | 1 | 0.45 | Luminosité d'un sol plat en plein soleil (1 = couleur exacte de la texture). |
| `shadowLevel` | 0.6 | 0.26 | Luminosité à l'ombre (lumière ambiante seule). L'écart `litLevel − shadowLevel` donne la force du soleil. |
| `ambientColor` | `0xffffff` | `0x6d7fb3` | Teinte de la lumière ambiante : blanche le jour, bleue la nuit. |
| `sunColor` | `0xffffff` | `0xb3c4ff` | Couleur du soleil, puis de la lune. |
| `unlitTint` | `0xffffff` | `0x707ea8` | Teinte appliquée aux sprites non éclairés (joueur, pokémons) pour qu'ils suivent la lumière. |
| `specular` | 0.3 | 0.4 | Force des reflets du soleil/de la lune sur les surfaces brillantes. |
| `windowGlow` | 0 | 1 | Fenêtres allumées la nuit. |
| `cloudSpeed` | 12 | 12 | Vitesse des ombres de nuages (sans effet ici puisque `cloudCover = 0`). |
| `fogColor` | `0xdde3e8` | `0x939eb3` | Couleur du brouillard (inutilisée ici car `fog = 0`, mais héritée par les météos qui ne la redéfinissent pas). |
| `lightningColor` | `0xe4ecff` | idem | Couleur des éclairs (héritée par l'orage). |
| `snowDrift` | 1 | 1 | Neutre pour la neige normale. |
| Tout le reste | 0 | 0 | Aucune pluie, neige, particule, brouillard… |

**Température** (`TEMPERATURES`) : **18 °C** le jour, **12 °C** la nuit.

## Comment c'est fait

Il n'y a rien de spécifique, et c'est justement l'intérêt de cette fiche : elle montre le « squelette » que toutes les météos partagent.

- **Presets** : `preset(base, overrides)` fait un simple `{ ...base, ...overrides }`. Une météo = une base + quelques valeurs changées. Voir [01 · Architecture](../concepts/01-architecture.md).
- **Mélange jour/nuit** : `WeatherHelper.targetParams()` mélange les presets jour et nuit selon `daylightAt(hour)`, puis ajoute les teintes d'aube/crépuscule. Voir [02 · Jour et nuit](../concepts/02-jour-nuit.md).
- **Lumière** : `litLevel` et `shadowLevel` sont convertis en intensités three.js dans `WeatherHelper.update()`. Voir [03 · Éclairage et shaders](../concepts/03-eclairage-et-shaders.md).
- **Fenêtres de nuit** : `windowGlow = 1` active le bloom dans `renderPostEffects()`. Voir [06 · Post-effets](../concepts/06-post-effets.md).
- **Repli** : `getWeatherParams(type, night)` renvoie `presets[type] ?? presets[NEUTRAL]`. Une météo sans version de nuit (ensoleillé, canicule, tempête de sable, pluie de printemps) devient donc une **nuit neutre** après le crépuscule.

## Maths et code à retenir

Dans `Weather.ts` :

```ts
const preset = (base: WeatherParams, overrides: Partial<WeatherParams>): WeatherParams => ({ ...base, ...overrides });

export function getWeatherParams(type: WeatherType, night: boolean): WeatherParams {
  const presets = night ? NIGHT_PRESETS : DAY_PRESETS;
  return presets[type] ?? presets[WeatherType.NEUTRAL]!;
}
```

Dans `WeatherHelper.update()`, la conversion des niveaux en intensités (three.js divise l'éclairage Lambert/Phong par π) :

```ts
ambientLight.intensity = Math.PI * shadowLevel * pulse + ...;
sun.intensity = Math.PI * (Math.max(litLevel - shadowLevel, 0) * pulse + ...) / dir.y;
```

Le `/ dir.y` compense l'inclinaison du soleil : un sol plat reçoit toujours exactement `litLevel`, quelle que soit la hauteur du soleil.

## Expériences à tenter

1. Dans `NIGHT_BASE`, passe `litLevel` de `0.45` à `0.8` : la nuit devient presque un jour bleuté. Toutes les météos de nuit qui ne redéfinissent pas `litLevel` (ex. Feuilles la nuit) changent aussi.
2. Dans `DAY_BASE`, mets `shadowLevel: 0.3` : les ombres deviennent très contrastées, sur **toutes** les météos qui ne redéfinissent pas cette valeur (Ensoleillé, Pluvieux…).
3. Dans `NIGHT_BASE`, mets `windowGlow: 0` : plus de fenêtres allumées ni de bloom la nuit.

## Voir aussi

- [Ensoleillé](sunny.md) : Neutre + reflets, façades dorées et rayons.
- [Nuageux](cloudy.md) : Neutre + ombres de nuages.
