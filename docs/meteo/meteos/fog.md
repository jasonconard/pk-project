# 🌫️ Brouillard (`fog`)

> Catégorie **Classiques**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Un **brouillard épais** en nappes, plus dense au loin et au ras du sol, qui dérive avec le vent.
- Lumière diffuse, ombres très faibles : `specular` à 0 (aucun reflet).
- La nuit, les fenêtres allumées percent la brume.
- **Son** : aucune ambiance propre (`sound: false`).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.82 | 0.34 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.68 | 0.27 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #e9edf2 | #6a7aa6 | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #f2f4f6 | #b3c4ff | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #e4e9ee | #6a7798 | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0 | 0 | Force des reflets sur les surfaces brillantes. |
| `cloudCover` | 0 | 0.3 | 0.3 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudAmbient` | 0 | 0.05 | 0 | Part dont les nuages assombrissent aussi l'ambiant (ombres de nuages plus contrastées). |
| `cloudSpeed` | 12 | 6 | 6 | Vitesse des ombres de nuages au sol (unités/s). |
| `fog` | 0 | 0.85 | 1 | Épaisseur du brouillard. |

**Température** : **8 °C** le jour, **5 °C** la nuit.

## Comment c'est fait

- Un seul paramètre fait le travail : `fog` (0.85 le jour, **1** la nuit, le maximum de l'échelle). Voir [05 · Brouillard et ténèbres](../concepts/05-brouillard-et-tenebres.md).
- Le brouillard est plus dense au loin et près du sol, et dérive avec le vent : voir [07 · Bruit procédural](../concepts/07-bruit-procedural.md) et [11 · Vent](../concepts/11-vent.md).
- `fogColor` n'est pas surchargée : jour #dde3e8 (base), nuit #939eb3 (base nocturne). Le fond de scène prend la même couleur (`sceneFog`).
- Nuages discrets : `cloudCover` 0.3, `cloudAmbient` 0.05, `cloudSpeed` 6 (ombres lentes).

## À retenir

- Le jour la lumière baisse peu (`litLevel` 0.82) mais `shadowLevel` monte à 0.68 : les ombres s'estompent, c'est ce qui donne l'aspect « diffus ».
- Nuit : `litLevel` 0.34 et `shadowLevel` 0.27, donc très peu de contraste entre lumière et ombre ; les fenêtres (`windowGlow` 1 de la base nocturne) deviennent les principales sources visibles.
- Pas de brouillard maximum le jour (0.85) : contrairement à la nuit, on voit encore un peu le fond de la carte.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.FOG]` et `NIGHT_PRESETS[WeatherType.FOG]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.FOG]` dans `weather-catalog.ts`.
- Capture day : `src/assets/weather/fog-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/fog-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Passe `fog` à 0.4 : la brume devient un simple voile, on voit à nouveau le fond de la carte.
2. Change `fogColor` en #ffd0d0 : le brouillard devient rosé, et le fond de scène suit.
3. Ajoute `minWind: 0.5` : les nappes défilent visiblement plus vite.

## Voir aussi

- [Brume marine](sea-mist.md) : brume bleutée avec vent et son de mer.
- [Brume hantée](haunted.md) : brouillard épais avec silhouettes.
- [Ténèbres](darkness.md) : le brouillard devient noir et se resserre autour du joueur.
