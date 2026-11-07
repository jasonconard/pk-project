# 🌑 Ténèbres (`darkness`)

> Catégorie **Sombre & surnaturel**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Une **brume noire** engloutit tout à quelques pas du joueur, même en plein jour.
- Les fenêtres percent à peine.
- Ambiance sonore oppressante.
- **Son** : bourdonnement, cœur et chuchotements (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.4 | 0.22 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.28 | 0.14 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #8890a0 | #4a5470 | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #a0a4b0 | #b3c4ff | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #707680 | #3c4458 | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.1 | 0.1 | Force des reflets sur les surfaces brillantes. |
| `cloudCover` | 0 | 0.6 | 0.4 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudSpeed` | 12 | 4 | 4 | Vitesse des ombres de nuages au sol (unités/s). |
| `windowGlow` | 0 | 0.25 | 0.35 | Force des fenêtres allumées. |
| `fog` | 0 | 0.7 | 0.75 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #07070a | #030305 | Couleur du brouillard. |
| `darkness` | 0 | 1 | 1 | Les ténèbres se referment autour du joueur. |

**Température** : **9 °C** le jour, **4 °C** la nuit.

## Comment c'est fait

- **Volutes noires** : style `DARK_WISP_STYLE` (`GlowParticles.ts`), de la fumée en mélange **normal** avec opacité par bouffée (le noir ne peut pas être additif, voir [Volcanique](volcanic.md)). Elles naissent sur un **anneau autour du joueur**, entre 0.7 et 1.15 × `DARK_RADIUS`, grâce à `spawnAt` (le point d'apparition est imposé par `WeatherHelper` au lieu d'être tiré dans toute la zone). Elles sont plus larges que hautes (`stretchY` 0.75), montent à peine et ondulent lentement : elles rampent au bord de la zone visible et la grignotent. Leur densité vaut `(darkness - 0.6) / 0.4`, donc la demi-obscurité de la [Brume hantée](haunted.md) n'en a pas.
- `darkness: 1` : le brouillard se resserre autour du joueur, avec sa couleur au-delà d'un petit rayon. Voir [05 · Brouillard et ténèbres](../concepts/05-brouillard-et-tenebres.md).
- `fog: 0.7` (0.75 la nuit) avec une couleur presque noire : #07070a le jour, #030305 la nuit.
- `windowGlow` 0.25 le jour, 0.35 la nuit : fenêtres faibles (base nocturne : 1).
- `cloudCover` 0.6 (0.4 la nuit), `cloudSpeed` 4, `specular` 0.1.

## À retenir

- Jour : `litLevel` **0.4** et `shadowLevel` 0.28, ambiant #8890a0.
- Nuit : `litLevel` **0.22** et `shadowLevel` 0.14 : la scène la plus sombre.
- Température : 9 °C le jour, 4 °C la nuit.
- Audio : le niveau `darkness` est directement `p.darkness`. Voir [10 · Audio](../concepts/10-audio.md).

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.DARKNESS]` et `NIGHT_PRESETS[WeatherType.DARKNESS]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.DARKNESS]` dans `weather-catalog.ts`.
- Uniform `uDarkness` : ligne `u.uDarkness.value = p.darkness` de `WeatherHelper`.
- Capture day : `src/assets/weather/darkness-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/darkness-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Mets `darkness: 0.5` : le rayon de visibilité est plus grand ([Brume hantée](haunted.md) utilise 0.5).
2. Change `fogColor` en #300010 : ténèbres rouge sang.
3. Passe `windowGlow` à 1 : les fenêtres restent bien visibles dans le noir.

## Voir aussi

- [Brume hantée](haunted.md) : brume épaisse avec silhouettes.
- [Malédiction](curse.md) : lumière violette éteinte.
- [Brouillard](fog.md) : brouillard clair.
