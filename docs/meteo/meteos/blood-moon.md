# 🩸 Lune de sang (`blood-moon`)

> Catégorie **Sombre & surnaturel**. Disponible **la nuit seulement** : il n'y a pas d'entrée dans `DAY_PRESETS`, le jour elle devient neutre.

## Ce qu'on voit / entend

- Une **lune de sang** : lumière rouge oppressante qui **respire** lentement.
- Ombres très profondes, **fenêtres rouges**, brume rouge.
- Des **braises rouges** montent du sol.
- **Son** : aucune ambiance propre (`sound: false`).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | – | 0.44 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | – | 0.15 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | – | #8a3a42 | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | – | #ff5446 | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | – | #9c5056 | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | – | 0.6 | Force des reflets sur les surfaces brillantes. |
| `cloudCover` | 0 | – | 0.2 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudAmbient` | 0 | – | 0.1 | Part dont les nuages assombrissent aussi l'ambiant (ombres de nuages plus contrastées). |
| `cloudSpeed` | 12 | – | 6 | Vitesse des ombres de nuages au sol (unités/s). |
| `windowGlow` | 0 | – | 0.9 | Force des fenêtres allumées. |
| `windowTint` | #ffffff | – | #ff6a50 | Teinte des fenêtres. |
| `lightPulse` | 0 | – | 0.12 | « Respiration » lente de la lumière. |
| `embers` | 0 | – | 1 | Braises rouges qui montent. |
| `fog` | 0 | – | 0.45 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | – | #8a3036 | Couleur du brouillard. |

**Température** : **13 °C** la nuit. La valeur de jour (15 °C) n'est jamais utilisée : la boucle de `Weather.ts` ne copie les températures que dans les presets existants.

## Comment c'est fait

- Style `EMBER_STYLE` : **240** particules, couleur #ff4020, intensité 2.2, mélange additif (lumière pure), montée de **5 à 12** unités/s, balancement 1.8, vie 3–7 s, taille 1.6–3, hauteur 0–15, scintillement 0.35 à vitesse 9, vent 25. Voir [08 · Particules](../concepts/08-particules.md).
- `embers: 1`. Dans l'audio, `bloodMoon = min(embers, 1)`. Voir [10 · Audio](../concepts/10-audio.md).
- `lightPulse: 0.12` : la lumière varie de ±12 % (le plus fort de tous les presets). Voir [03 · Éclairage et shaders](../concepts/03-eclairage-et-shaders.md).
- `windowGlow: 0.9` teinté #ff6a50 ; `fog: 0.45` rouge #8a3036 : voir [05 · Brouillard et ténèbres](../concepts/05-brouillard-et-tenebres.md).
- Lumière : `litLevel` 0.44, `shadowLevel` **0.15** (le plus bas), ambiant #8a3a42, lune #ff5446, `specular` 0.6.

## À retenir

- **Nuit seulement** : pas de preset de jour, la météo est indisponible le jour.
- Température : 13 °C la nuit (15 °C le jour n'est jamais utilisé).
- `cloudCover` 0.2, `cloudAmbient` 0.1, `cloudSpeed` 6 : quelques nuages lents.
- Contrairement à la [Pluie de mort](blood-rain.md), il ne tombe rien : la lumière et les braises font tout.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.BLOOD_MOON]` et `NIGHT_PRESETS[WeatherType.BLOOD_MOON]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.BLOOD_MOON]` dans `weather-catalog.ts`.
- Style : `EMBER_STYLE` dans `GlowParticles.ts`.
- Capture night : `src/assets/weather/blood-moon-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Passe `lightPulse` à 0.3 : la lumière bat comme un cœur.
2. Mets `embers: 0` : lune rouge sans braises.
3. Passe `EMBER_STYLE.rise` à `[-8, -3]` : les braises retombent comme des cendres rouges.

## Voir aussi

- [Volcanique](volcanic.md) : autres braises, orange, de jour comme de nuit.
- [Pluie de mort](blood-rain.md) : pluie rouge et éclairs rouges.
- [Malédiction](curse.md) : autre ambiance oppressante.
