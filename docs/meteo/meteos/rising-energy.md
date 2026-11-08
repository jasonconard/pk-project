# 💠 Énergie montante (`rising-energy`)

> Catégorie **Magie & ciel**. Disponible **de nuit seulement** (choisie de jour, l'heure passe à 22 h).

## Ce qu'on voit / entend

- Une **brume épaisse turquoise** (#45b49b) recouvre la ville.
- Des **étincelles rondes turquoise montent du sol jusqu'au ciel**.
- La lumière « respire » lentement.
- **Son** : aucune ambiance propre (`sound: false`).

## Les paramètres

Valeurs réelles du preset de nuit qui diffèrent de la base. La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | – | 0.38 | Luminosité du sol au clair de lune. |
| `shadowLevel` | 0.6 | – | 0.24 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | – | #4a9a8a | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | – | #a8f0dc | Couleur de la lune. |
| `unlitTint` | #ffffff | – | #5a948a | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | – | 0.4 | Force des reflets sur les surfaces brillantes. |
| `windowGlow` | 0 | – | 0.4 | Fenêtres allumées (plus faibles que la nuit de base, 1 : la brume les noie). |
| `cloudSpeed` | 12 | – | 8 | Vitesse des ombres de nuages au sol (unités/s). |
| `lightPulse` | 0 | – | 0.06 | « Respiration » lente de la lumière. |
| `risingEnergy` | 0 | – | 1 | Densité des étincelles montantes. |
| `fog` | 0 | – | 0.62 | Épaisseur du brouillard : épaisse. |
| `fogColor` | #dde3e8 | – | #45b49b | Couleur du brouillard. |

**Température** : **14 °C** la nuit.

## Comment c'est fait

- Style `ENERGY_STYLE` : **210** particules, couleur #45b49b (palette #6ff0d0, #2fd6b0, #a8ffe8), intensité 2.4, mélange additif (pure lumière, elles prennent le halo la nuit), montée **rapide** de 12 à 22 unités/s, vie 3–6 s, petites et rondes (1.8–3.2), nées près du sol (0–4), 20 % près des plantes, scintillement 0.35. Voir [08 · Particules](../concepts/08-particules.md).
- `risingEnergy: 1` pilote ce style (son propre `GlowParticles` dans `WeatherHelper`).
- `fog: 0.62` turquoise #45b49b : bien plus épais que la [Brume féérique](fairy-mist.md) (0.45). Le ciel et l'ambiant sont teintés dans la même famille pour que tout baigne dans la brume.

## À retenir

- Nuit seulement : pas de preset de jour.
- La brume et les étincelles partagent la même teinte, les étincelles plus claires pour ressortir.
- Une montée rapide donne l'impression d'un flux d'énergie vers le ciel, contrairement aux lucioles qui flottent.

## Où regarder dans le code

- Preset : `NIGHT_PRESETS[WeatherType.RISING_ENERGY]` dans `Weather.ts` (pas de preset de jour = météo indisponible le jour).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.RISING_ENERGY]` dans `weather-catalog.ts`.
- Style : `ENERGY_STYLE` dans `GlowParticles.ts`.
- Capture night : `src/assets/weather/rising-energy-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Passe `rise` à [2, 4] : les étincelles flottent au lieu de monter.
2. Baisse `fog` à 0.3 : la ville réapparaît, les étincelles ressortent moins.
3. Remplace la couleur et la palette par des violets : énergie spectrale.

## Voir aussi

- [Brume féérique](fairy-mist.md) : brume rose et lumières.
- [Lune de sang](blood-moon.md) : braises rouges qui montent.
- [Spores](spores.md) : grosses lumières vertes qui flottent.
