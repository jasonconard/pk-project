# 👻 Brume hantée (`haunted`)

> Catégorie **Sombre & surnaturel**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Une **brume épaisse** où des **silhouettes** se forment au loin et **se dissipent** quand on approche.
- Gémissements dans le vent.
- **Son** : gémissements dans le vent (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.65 | 0.32 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.5 | 0.22 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #c4ccd4 | #5a6478 | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #dde4ec | #b3c4ff | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #c0c8d0 | #5e6878 | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.1 | 0.1 | Force des reflets sur les surfaces brillantes. |
| `cloudCover` | 0 | 0.6 | 0.4 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudSpeed` | 12 | 4 | 4 | Vitesse des ombres de nuages au sol (unités/s). |
| `minWind` | 0 | 0.15 | 0.15 | Vent minimal imposé, quelle que soit la jauge. |
| `haunt` | 0 | 1 | 1 | Silhouettes fantomatiques dans la brume, gémissements. |
| `fog` | 0 | 0.85 | 0.85 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #9aa4b0 | #2a3038 | Couleur du brouillard. |
| `darkness` | 0 | 0.5 | 0.5 | Les ténèbres se referment autour du joueur. |
| `windowGlow` | 0 | 0 | 0.4 | Force des fenêtres allumées. |

**Température** : **8 °C** le jour, **5 °C** la nuit.

## Comment c'est fait

- **Volutes** : style `HAUNT_WISP_STYLE` (`GlowParticles.ts`), dérivé de la fumée de la [Pluie acide](acid-rain.md) : 220 bouffées gris-bleu en mélange additif, qui suivent la lumière (`followLight`), montent lentement (2 à 4.5 unités/s), ondulent largement (`wobble` 5) et vivent 5 à 8 s en grossissant (`grow` 2.2). Elles sont pilotées par `haunt` et naissent partout. De jour elles forment des nappes pâles dans la brume ; la nuit elles se devinent à peine.
- `haunt: 1` (dans `SNAP_KEYS`) active `GhostHelper.ts` : jusqu'à **4** fantômes, apparaissant à **70–150** unités du joueur, qui s'évanouissent à moins de **50**. Vie 8–18 s, taille 24–34, opacité 0.7, apparition lente (0.35/s) et disparition rapide (1.5/s). Voir [09 · Effets spéciaux](../concepts/09-effets-speciaux.md).
- `fog: 0.85` gris #9aa4b0 le jour, #2a3038 la nuit : voir [05 · Brouillard et ténèbres](../concepts/05-brouillard-et-tenebres.md).
- `darkness: 0.5` : une partie du noir de la [Ténèbres](darkness.md), pour resserrer la vue.
- `minWind: 0.15` : vent minimal léger qui fait dériver la brume. `cloudCover` 0.6 (0.4 la nuit), `cloudSpeed` 4.

## À retenir

- Jour : `litLevel` 0.65, `shadowLevel` 0.5, ambiant #c4ccd4, `specular` 0.1.
- Nuit : `litLevel` 0.32, `windowGlow` 0.4.
- Température : 8 °C le jour, 5 °C la nuit.
- Audio : `moan = 0.35 + 0.65 × ghosts.nearest` si `haunt > 0.3` : les gémissements montent quand un fantôme est proche.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.HAUNTED]` et `NIGHT_PRESETS[WeatherType.HAUNTED]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.HAUNTED]` dans `weather-catalog.ts`.
- Fantômes : `GhostHelper.ts`.
- Capture day : `src/assets/weather/haunted-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/haunted-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Passe `MAX_GHOSTS` à 12 : la brume est peuplée.
2. Mets `VANISH_DISTANCE` à 10 : on peut s'approcher bien plus d'une silhouette.
3. Mets `haunt: 0` : il reste une brume épaisse et sombre sans fantômes.

## Voir aussi

- [Malédiction](curse.md) : feux follets et ombres vivantes.
- [Brouillard](fog.md) : brouillard sans fantômes.
- [Ténèbres](darkness.md) : même obscurité plus complète.
