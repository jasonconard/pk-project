# 🌋 Volcanique (`volcanic`)

> Catégorie **Chaleur & feu**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Une **lumière orange** à travers une brume de cendres, un air **étouffant** qui ondule.
- Des **braises** jaillissent du sol, rapides et brillantes.
- La nuit, un éclairage orangé du sol, des fenêtres chaudes et des braises encore plus lumineuses.
- **Son** : grondement et crépitements (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.92 | 0.42 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.55 | 0.22 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #ffa874 | #9a5a3c | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #ff9444 | #ff8a4a | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #ffc49c | #a86a4c | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.5 | 0.5 | Force des reflets sur les surfaces brillantes. |
| `sunGlow` | 0 | 0.3 | 0 | Lumière en plus sur les façades face au soleil. |
| `cloudCover` | 0 | 0.35 | 0.3 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudAmbient` | 0 | 0.08 | 0 | Part dont les nuages assombrissent aussi l'ambiant (ombres de nuages plus contrastées). |
| `cloudSpeed` | 12 | 6 | 6 | Vitesse des ombres de nuages au sol (unités/s). |
| `lightPulse` | 0 | 0.06 | 0.1 | « Respiration » lente de la lumière. |
| `heatHaze` | 0 | 0.9 | 0.9 | Ondulations de chaleur (post-effet). |
| `lava` | 0 | 1 | 1 | Braises volcaniques jaillissant du sol. |
| `fog` | 0 | 0.65 | 0.65 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #e08a50 | #6a3424 | Couleur du brouillard. |
| `windowGlow` | 0 | 0 | 0.7 | Force des fenêtres allumées. |
| `windowTint` | #ffffff | #ffffff | #ffa060 | Teinte des fenêtres. |

**Température** : **48 °C** le jour, **40 °C** la nuit.

## Comment c'est fait

- Style `LAVA_STYLE` (`GlowParticles.ts`) : **420** particules, couleur #ff7a1a, palette #ffb020, #ff4a10, #ffd060, intensité 1.8, mélange `normal`, montée **10–22** unités/s, vie 1.5–4 s, taille 2.6–4.4, apparition au ras du sol (0–2), scintillement 0.5 à vitesse 12. Voir [08 · Particules](../concepts/08-particules.md).
- `lava: 1`. Mélange `normal` : les braises restent orange de jour ; elles dépassent 1 en intensité pour déclencher le bloom la nuit. Voir [06 · Post-effets](../concepts/06-post-effets.md).
- `heatHaze: 0.9` : ondulations (sans délavage, `heatWash` = 0). Voir [06 · Post-effets](../concepts/06-post-effets.md).
- `fog: 0.65` couleur #e08a50 le jour, #6a3424 la nuit. `lightPulse` 0.06 (nuit : 0.1) : la lumière « respire ».
- Nuit : `windowGlow` 0.7 avec fenêtres teintées #ffa060.

## À retenir

- Température la plus haute : **48 °C** le jour, 40 °C la nuit.
- Jour : `litLevel` 0.92, ambiant #ffa874, soleil #ff9444, `sunGlow` 0.3. Nuit : `litLevel` 0.42, soleil #ff8a4a.
- Les braises montent plus vite que celles de la [Lune de sang](blood-moon.md) (10–22 contre 5–12) et vivent moins longtemps.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.VOLCANIC]` et `NIGHT_PRESETS[WeatherType.VOLCANIC]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.VOLCANIC]` dans `weather-catalog.ts`.
- Style : `LAVA_STYLE` dans `GlowParticles.ts`.
- Capture day : `src/assets/weather/volcanic-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/volcanic-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Mets `lava: 2` dans le preset : la densité est plafonnée à 1 par `GlowParticles`, rien ne change au-delà.
2. Passe `rise` à `[30, 60]` : des geysers de braises.
3. Mets `heatHaze: 0` : on garde braises et brume mais l'air ne bouge plus.

## Voir aussi

- [Neige de cendres](ash.md) : cendres grises qui tombent.
- [Canicule](heatwave.md) : chaleur sans braises.
- [Lune de sang](blood-moon.md) : autres braises, rouges.
