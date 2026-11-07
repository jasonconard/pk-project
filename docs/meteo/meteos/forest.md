# 🌲 Forêt (`forest`)

> Catégorie **Nature**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Comme **sous les arbres** : des ombres de feuillage dansent au sol avec le vent.
- Lumière verte filtrée, **rayons de soleil**, **pollen doré** qui flotte.
- Quelques feuilles tombent. La nuit : quelques lucioles.
- Oiseaux le jour, grillons et hibou la nuit.
- **Son** : oiseaux le jour, grillons et hibou la nuit (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `shadowLevel` | 0.6 | 0.55 | 0.22 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #d4ecc8 | #4f7a78 | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #fff6d8 | #b8d4e8 | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #e4f0dc | #5c7c80 | Teinte des sprites non éclairés (joueur, pokémons). |
| `sunGlow` | 0 | 0.3 | 0 | Lumière en plus sur les façades face au soleil. |
| `godRays` | 0 | 0.7 | 0 | Rayons de soleil volumétriques. |
| `cloudSpeed` | 12 | 6 | 12 | Vitesse des ombres de nuages au sol (unités/s). |
| `canopy` | 0 | 1 | 1 | Ombres de feuillage et sons de forêt. |
| `pollen` | 0 | 1 | 0 | Pollen doré flottant dans la lumière. |
| `leaves` | 0 | 0.2 | 0 | Densité de feuilles/pétales qui tombent. |
| `fog` | 0 | 0.2 | 0.25 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #b8d8b0 | #24403c | Couleur du brouillard. |
| `litLevel` | 1 | 1 | 0.4 | Luminosité du sol au soleil. |
| `fireflies` | 0 | 0 | 0.35 | Densité des lucioles. |

**Température** : **21 °C** le jour, **14 °C** la nuit.

## Comment c'est fait

- `canopy: 1` projette des ombres de feuillage qui se balancent avec le vent et déclenche les sons de forêt. Voir [03 · Éclairage et shaders](../concepts/03-eclairage-et-shaders.md) et [10 · Audio](../concepts/10-audio.md).
- Style `POLLEN_STYLE` : **220** particules, couleur #fff0a0 (palette #ffffff, #e8ffb0), mélange `normal`, dérive de -0.6 à 0.9, balancement 3, vie 6–12 s, taille 1.3–2.2, hauteur 2–30, 50 % apparaissent près des plantes. Voir [08 · Particules](../concepts/08-particules.md).
- `godRays: 0.7`, `sunGlow 0.3` (jour seulement) : voir [06 · Post-effets](../concepts/06-post-effets.md).
- `leaves: 0.2` (jour seulement) : quelques feuilles tombent. `fog: 0.2` vert #b8d8b0 le jour, 0.25 #24403c la nuit. `cloudSpeed` 6 (jour).
- Nuit : `canopy: 1` et `fireflies: 0.35` (lucioles du `FIREFLY_STYLE`).

## À retenir

- Lumière du jour : ambiant #d4ecc8, soleil #fff6d8, `shadowLevel` 0.55 : teintée de vert.
- Nuit : `litLevel` 0.4, `shadowLevel` 0.22, ambiant #4f7a78 : ombres vert-bleu profond.
- Le pollen, les rayons et les feuilles sont définis dans le preset de jour seulement ; la nuit il reste la canopée et les lucioles.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.FOREST]` et `NIGHT_PRESETS[WeatherType.FOREST]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.FOREST]` dans `weather-catalog.ts`.
- Style : `POLLEN_STYLE` dans `GlowParticles.ts` ; ombres : uniform `uCanopy` (`weather-shader.ts`).
- Capture day : `src/assets/weather/forest-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/forest-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Mets `canopy: 0` : les ombres de feuillage disparaissent, il reste le pollen et les rayons.
2. Passe `pollen` à 0 et `leaves` à 1 : forêt automnale sans pollen.
3. Monte `fireflies` à 1 dans le preset de nuit : une vraie nuit de lucioles dans les bois.

## Voir aussi

- [Feuilles](leaves.md) : feuilles qui tombent seules.
- [Lucioles](fireflies.md) : lucioles de nuit.
- [Pluie de printemps](spring-shower.md) : soleil, rayons et oiseaux.
