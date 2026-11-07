# ✨ Neige magique (`magic-snow`)

> Catégorie **Froid**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Une **neige légère** (`snow: 0.5`) mêlée d'**étincelles bleues et mauves** qui scintillent en tombant.
- Lumière douce teintée de bleu.
- Quelques notes cristallines.
- **Son** : clochettes cristallines (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.95 | 0.45 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.68 | 0.3 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #dce8ff | #6a80c0 | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #f0f4ff | #b3c4ff | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #e0eaff | #7484b4 | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.4 | 0.4 | Force des reflets sur les surfaces brillantes. |
| `cloudCover` | 0 | 0.3 | 0.3 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudSpeed` | 12 | 6 | 6 | Vitesse des ombres de nuages au sol (unités/s). |
| `snow` | 0 | 0.5 | 0.5 | Densité de la neige (2 = blizzard). |
| `magicSnow` | 0 | 1 | 1 | Étincelles bleues qui tombent en scintillant. |
| `fog` | 0 | 0.2 | 0.2 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #d0dcff | #3c4c7c | Couleur du brouillard. |

**Température** : **-3 °C** le jour, **-8 °C** la nuit.

## Comment c'est fait

- Style `MAGIC_SNOW_STYLE` (`GlowParticles.ts`) : **600** particules max, couleur #6cc8ff, palette #d8f4ff, #3a90ff, #a080ff, intensité 2.2, mélange `normal`, chute de 4 à 9 unités/s, vie 6–12 s, taille 2.6–4.2, apparition à 15–70 de haut, scintillement fort (**0.8** à vitesse 9). Voir [08 · Particules](../concepts/08-particules.md).
- `magicSnow: 1` : densité maximale des étincelles ; la neige normale est à moitié (`snow: 0.5`).
- Jour et nuit : `cloudCover` 0.3, `cloudSpeed` 6, `fog` 0.2 (#d0dcff le jour, #3c4c7c la nuit).
- `magicSnow` fait partie des `SNAP_KEYS` : une fois fondu à presque 0 au changement de météo, il est mis à 0 pour que le helper s'arrête complètement. Voir [01 · Architecture](../concepts/01-architecture.md).
- Les clochettes cristallines : `chimes = max(magicSnow × MAGIC_SNOW_CHIMES, stardust × STARDUST_CHIMES)` avec `MAGIC_SNOW_CHIMES` = 0.45. Voir [10 · Audio](../concepts/10-audio.md).

## À retenir

- Température : -3 °C le jour, -8 °C la nuit.
- Le mélange `normal` garde les étincelles bleues même de jour ; en mélange additif elles virent au blanc sur un sol clair.
- Jour : `litLevel` 0.95, `shadowLevel` 0.68, `specular` 0.4.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.MAGIC_SNOW]` et `NIGHT_PRESETS[WeatherType.MAGIC_SNOW]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.MAGIC_SNOW]` dans `weather-catalog.ts`.
- Style : `MAGIC_SNOW_STYLE` dans `GlowParticles.ts`.
- Capture day : `src/assets/weather/magic-snow-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/magic-snow-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Passe `intensity` à 4 dans `MAGIC_SNOW_STYLE` : les étincelles brillent plus fort et attirent le bloom la nuit.
2. Remplace la palette par #ffc0e0 : neige magique rose.
3. Mets `snow: 0` : étincelles seules, sans neige.

## Voir aussi

- [Neige](snow.md) : la neige sans magie.
- [Poussière d'étoiles](stardust.md) : autres poussières scintillantes.
- [Blizzard](blizzard.md) : neige violente.
