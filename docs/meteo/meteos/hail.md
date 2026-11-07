# 🧊 Grêle (`hail`)

> Catégorie **Pluie & tempêtes**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Des **grêlons blancs** tombent très vite et **rebondissent** sur le sol et les toits.
- Éclaboussures blanches, crépitement perlé sur les toits.
- Ciel gris foncé.
- **Son** : crépitement perlé de grêlons sur les toits (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.7 | 0.34 | Luminosité du sol au soleil. |
| `ambientColor` | #ffffff | #c8d0dc | #5f6f9c | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #e8eef8 | #b3c4ff | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #ccd4e0 | #66729a | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.2 | 0.2 | Force des reflets sur les surfaces brillantes. |
| `cloudCover` | 0 | 0.8 | 0.6 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudAmbient` | 0 | 0.15 | 0 | Part dont les nuages assombrissent aussi l'ambiant (ombres de nuages plus contrastées). |
| `cloudSpeed` | 12 | 35 | 35 | Vitesse des ombres de nuages au sol (unités/s). |
| `hail` | 0 | 1 | 1 | Densité de la grêle. |
| `fog` | 0 | 0.15 | 0.15 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #c8d0d8 | #939eb3 | Couleur du brouillard. |
| `shadowLevel` | 0.6 | 0.6 | 0.24 | Luminosité à l'ombre (lumière ambiante seule). |
| `windowGlow` | 0 | 0 | 0.5 | Force des fenêtres allumées. |

**Température** : **7 °C** le jour, **4 °C** la nuit.

## Comment c'est fait

- Style `HAIL_STYLE` : **900** grêlons max, vitesse **520** (la plus rapide), longueur **1.8**, largeur **1.1** (courts et épais), couleur #f4f8ff, opacité 0.95, vent 120, `followLight: true`, couleur d'éclaboussure #c8d4e4. Voir [08 · Particules](../concepts/08-particules.md).
- `hail: 1` : densité maximale, jour et nuit.
- Ciel : `cloudCover` 0.8 (0.6 la nuit), `cloudAmbient` 0.15 le jour, `cloudSpeed` **35**.
- Brume légère : `fog` 0.15 (#c8d0d8 le jour). Nuit : `windowGlow` 0.5.
- Dans le canal audio, la grêle compte très peu dans le niveau de pluie global (`hail × 0.05`) : son propre crépitement est géré à part. Voir [10 · Audio](../concepts/10-audio.md).

## À retenir

- Jour : `litLevel` 0.7, `shadowLevel` 0.6, `specular` 0.2.
- Nuit : `litLevel` 0.34, `shadowLevel` 0.24 et `specular` 0.2 ; ambiant bleu-gris #5f6f9c.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.HAIL]` et `NIGHT_PRESETS[WeatherType.HAIL]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.HAIL]` dans `weather-catalog.ts`.
- Capture day : `src/assets/weather/hail-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/hail-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Passe `speed` à 200 dans `HAIL_STYLE` : les grêlons tombent comme de grosses gouttes.
2. Mets `hail: 0.3` : une petite grêle éparse.
3. Mets `width: 2.5` : de vrais gros grêlons.

## Voir aussi

- [Pluvieux](rainy.md) : pluie liquide.
- [Pluie verglaçante](freezing-rain.md) : pluie qui gèle sur le sol.
- [Orage](storm.md) : orage avec éclairs.
