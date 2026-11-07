# 🦠 Spores (`spores`)

> Catégorie **Nature**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Un **air étrange teinté de vert** : de grosses **spores lumineuses** montent du sol et des plantes.
- Léger voile vert, soleil violet.
- Quelques bulles éclatent.
- **Son** : bulles discrètes (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.95 | 0.4 | Luminosité du sol au soleil. |
| `ambientColor` | #ffffff | #cdeedd | #4f7f7a | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #e9dcff | #b49cff | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #dcefe6 | #5f8a88 | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.4 | 0.3 | Force des reflets sur les surfaces brillantes. |
| `sunGlow` | 0 | 0.3 | 0 | Lumière en plus sur les façades face au soleil. |
| `cloudCover` | 0 | 0.2 | 0 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudSpeed` | 12 | 8 | 12 | Vitesse des ombres de nuages au sol (unités/s). |
| `lightPulse` | 0 | 0.05 | 0.06 | « Respiration » lente de la lumière. |
| `spores` | 0 | 1 | 1 | Densité des spores lumineuses. |
| `fog` | 0 | 0.22 | 0.3 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #b8e6cc | #4c7a6c | Couleur du brouillard. |
| `shadowLevel` | 0.6 | 0.6 | 0.25 | Luminosité à l'ombre (lumière ambiante seule). |

**Température** : **24 °C** le jour, **20 °C** la nuit.

## Comment c'est fait

- Style `SPORE_STYLE` : **320** particules, couleur #6dff9a (palette #b070ff, #52ffd8), intensité 1.15, mélange `normal`, **montée** de 1.5 à 4 unités/s, vie 8–14 s, grandes (4.5–7.5), hauteur 0–25, 35 % près des plantes, scintillement 0.35. Voir [08 · Particules](../concepts/08-particules.md).
- `spores: 1` ; `lightPulse` 0.05 le jour (0.06 la nuit) : la lumière respire.
- Jour : ambiant #cdeedd, soleil violet #e9dcff ; nuit : ambiant #4f7f7a, soleil #b49cff. Brume : `fog` 0.22 (#b8e6cc), 0.3 la nuit (#4c7a6c).

## À retenir

- Les spores sont plus grandes que les autres lueurs : en mélange `normal` on voit surtout le cœur de la texture, d'où les tailles élevées du style.
- Température : 24 °C le jour, 20 °C la nuit.
- Jour : `litLevel` 0.95, `sunGlow` 0.3.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.SPORES]` et `NIGHT_PRESETS[WeatherType.SPORES]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.SPORES]` dans `weather-catalog.ts`.
- Style : `SPORE_STYLE` dans `GlowParticles.ts`.
- Capture day : `src/assets/weather/spores-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/spores-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Mets `rise` à `[-4, -1]` : les spores retombent au lieu de monter.
2. Remplace la palette par #ff70c0 : spores roses.
3. Passe `lightPulse` à 0.3 : la lumière pulse très fort.

## Voir aussi

- [Brume féérique](fairy-mist.md) : lumières roses dans une brume rose.
- [Lucioles](fireflies.md) : lucioles.
- [Climat empoisonné](poison.md) : air toxique violet.
