# ⛈️ Orage (`storm`)

> Catégorie **Pluie & tempêtes**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- **Ciel noir** en plein jour, pluie battante, éclairs simples ou doubles.
- Tonnerre plus ou moins retardé selon la distance de l'éclair.
- Fenêtres allumées dès le jour (`windowGlow` 0.5).
- **Son** : pluie, éclairs et tonnerre variés (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.55 | 0.3 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.45 | 0.2 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #9aa6bd | #56648f | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #d8e0ff | #a0aedd | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #a3adc2 | #56628a | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0 | 0 | Force des reflets sur les surfaces brillantes. |
| `cloudCover` | 0 | 0.8 | 0.7 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudAmbient` | 0 | 0.25 | 0.2 | Part dont les nuages assombrissent aussi l'ambiant (ombres de nuages plus contrastées). |
| `cloudSpeed` | 12 | 55 | 55 | Vitesse des ombres de nuages au sol (unités/s). |
| `windowGlow` | 0 | 0.5 | 1 | Force des fenêtres allumées. |
| `rain` | 0 | 1 | 1 | Densité de la pluie. |
| `lightning` | 0 | 1 | 1 | Fréquence des éclairs. |

**Température** : **17 °C** le jour, **13 °C** la nuit.

## Comment c'est fait

- `RAIN_STYLE` à `rain: 1` : 2500 gouttes (le maximum), voir [Pluvieux](rainy.md) pour les valeurs du style.
- `lightning: 1` : un éclair toutes les quelques secondes. Les éclairs éclairent la scène (flash de lumière) et leur couleur vient de `lightningColor` (base #e4ecff). Voir [03 · Éclairage et shaders](../concepts/03-eclairage-et-shaders.md).
- `cloudCover` 0.8 (0.7 la nuit), `cloudAmbient` 0.25 (0.2 la nuit), `cloudSpeed` **55** : le plus rapide avec la tornade (50).
- `specular: 0`.

## À retenir

- Jour : `litLevel` 0.55 et `shadowLevel` 0.45, l'ambiance la plus sombre des météos de jour hors ténèbres.
- Nuit : `litLevel` 0.3 et `shadowLevel` 0.2.
- Les fenêtres sont à 0.5 le jour ; la nuit elles gardent la valeur 1 de la base nocturne.
- Le décalage du tonnerre dépend de la distance de l'éclair (voir [10 · Audio](../concepts/10-audio.md)).

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.STORM]` et `NIGHT_PRESETS[WeatherType.STORM]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.STORM]` dans `weather-catalog.ts`.
- Capture day : `src/assets/weather/storm-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/storm-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Mets `lightning: 3` : éclairs en rafale.
2. Change `lightningColor` en #ff2a22 : l'orage devient rouge (voir [Pluie de mort](blood-rain.md)).
3. Mets `rain: 0.3` en gardant `lightning: 1` : orage sec, éclairs sans déluge.

## Voir aussi

- [Pluvieux](rainy.md) : pluie sans éclairs.
- [Pluie de mort](blood-rain.md) : pluie et éclairs rouges.
- [Tornade](tornado.md) : orage + tornade.
