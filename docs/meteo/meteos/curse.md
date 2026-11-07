# 🕯️ Malédiction (`curse`)

> Catégorie **Sombre & surnaturel**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Une **lumière violette éteinte**.
- Des **feux follets** tournent autour du joueur.
- Les **ombres bougent toutes seules**.
- On entend chuchoter.
- **Son** : chuchotements (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.6 | 0.3 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.36 | 0.18 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #b8a0d0 | #4a3a6a | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #d8c0ff | #b090ff | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #bcaad0 | #504270 | Teinte des sprites non éclairés (joueur, pokémons). |
| `cloudCover` | 0 | 0.3 | 0.3 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudSpeed` | 12 | 4 | 4 | Vitesse des ombres de nuages au sol (unités/s). |
| `lightPulse` | 0 | 0.08 | 0.1 | « Respiration » lente de la lumière. |
| `curse` | 0 | 1 | 1 | Feux follets autour du joueur et chuchotements. |
| `sunWander` | 0 | 1 | 1 | Le soleil/la lune dérive seul (ombres qui bougent). |
| `fog` | 0 | 0.35 | 0.4 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #584070 | #281838 | Couleur du brouillard. |
| `specular` | 0.3 | 0.3 | 0.3 | Force des reflets sur les surfaces brillantes. |
| `windowGlow` | 0 | 0 | 0.4 | Force des fenêtres allumées. |
| `windowTint` | #ffffff | #ffffff | #c080ff | Teinte des fenêtres. |

**Température** : **11 °C** le jour, **7 °C** la nuit.

## Comment c'est fait

- `curse: 1` (dans `SNAP_KEYS`) active `WispHelper.ts` : **6** feux follets en orbite autour du joueur, rayon 26–48, hauteur 8–18, vitesse 0.25–0.6 rad/s, cœur de taille 5 et halo de taille 20 (additifs, assez lumineux pour le bloom la nuit). Voir [09 · Effets spéciaux](../concepts/09-effets-speciaux.md).
- `sunWander: 1` : le soleil/la lune dérive seul (amplitude `SUN_WANDER` = 1100), les ombres se déplacent. Voir [03 · Éclairage et shaders](../concepts/03-eclairage-et-shaders.md).
- `lightPulse` 0.08 (nuit : 0.1) : la lumière respire.
- `fog` 0.35 violet foncé #584070 (nuit : 0.4, #281838). `cloudCover` 0.3, `cloudSpeed` 4.

## À retenir

- Jour : `litLevel` 0.6, `shadowLevel` 0.36, ambiant #b8a0d0, soleil #d8c0ff.
- Nuit : `litLevel` 0.3, `shadowLevel` 0.18, `windowGlow` 0.4 teinté #c080ff.
- Température : 11 °C le jour, 7 °C la nuit.
- L'audio mélange chuchotements de la malédiction et de la [Brume hantée](haunted.md) : `whispers = max(curse, haunt × 0.6)`.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.CURSE]` et `NIGHT_PRESETS[WeatherType.CURSE]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.CURSE]` dans `weather-catalog.ts`.
- Feux follets : `WispHelper.ts`.
- Capture day : `src/assets/weather/curse-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/curse-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Mets `sunWander: 0` : la lumière redevient fixe, les ombres cessent de bouger.
2. Passe `WISPS` à 20 : une nuée de feux follets.
3. Mets `ORBIT_RADIUS` à `[8, 14]` : les feux follets collent au joueur.

## Voir aussi

- [Brume hantée](haunted.md) : silhouettes dans la brume.
- [Ténèbres](darkness.md) : le noir se referme.
- [Lune de sang](blood-moon.md) : autre lumière oppressante.
