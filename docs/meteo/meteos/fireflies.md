# ✨ Lucioles (`fireflies`)

> Catégorie **Nature**. Disponible **la nuit seulement** : il n'y a pas d'entrée dans `DAY_PRESETS`, le jour elle devient neutre.

## Ce qu'on voit / entend

- **La nuit**, des lucioles flottent autour des arbres et des fleurs en s'allumant et s'éteignant doucement.
- Ciel clair, lumière bleue de lune.
- Couleur au choix : vert, rose, cyan, mauve.
- **Son** : aucune ambiance propre (`sound: false`).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | – | 0.42 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | – | 0.25 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | – | #637fa6 | Teinte de la lumière ambiante. |
| `unlitTint` | #ffffff | – | #6e7fa6 | Teinte des sprites non éclairés (joueur, pokémons). |
| `fireflies` | 0 | – | 1 | Densité des lucioles. |

**Température** : **19 °C** la nuit. La valeur de jour (23 °C) n'est jamais utilisée : la boucle de `Weather.ts` ne copie les températures que dans les presets existants.

## Comment c'est fait

- Style `FIREFLY_STYLE` : **260** particules, couleur #c8ff4a, intensité **3.2** (déclenche le bloom la nuit), mélange additif, dérive de -1.2 à 1.5, balancement 5, vie 6–12 s, taille 2–3.4, hauteur 1–12, scintillement **0.85** à vitesse 1.6, **75 %** apparaissent près des plantes. Voir [08 · Particules](../concepts/08-particules.md).
- `fireflies: 1`. Couleur : `setFireflyColor` (`FIREFLY_COLORS` : vert #c8ff4a, rose #ff6ad5, cyan #4af0ff, mauve #cc99ff) : la couleur se fond doucement vers la nouvelle (`setColor`). Voir [08 · Particules](../concepts/08-particules.md).
- Nuit : ambiant #637fa6, `litLevel` 0.42, `shadowLevel` 0.25.

## À retenir

- **Nuit seulement** : pas de preset de jour, la météo est indisponible le jour.
- Température : 19 °C la nuit (23 °C le jour n'est jamais utilisé).
- Pas de nuages ni de brouillard : le preset n'ajoute que les lucioles et un ambiant légèrement bleu.
- Les autres paramètres restent ceux de `NIGHT_BASE` : fenêtres allumées (`windowGlow` 1) et `specular` 0.4.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.FIREFLIES]` et `NIGHT_PRESETS[WeatherType.FIREFLIES]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.FIREFLIES]` dans `weather-catalog.ts`.
- Style : `FIREFLY_STYLE` dans `GlowParticles.ts`.
- Couleur : `WeatherHelper.setFireflyColor`, choix dans `FIREFLY_COLORS` (`Weather.ts`).
- Panneau de choix de couleur : composant `weather-panel`.
- Capture night : `src/assets/weather/fireflies-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Passe `nearPlants` à 0 : les lucioles flottent n'importe où, y compris en plein champ.
2. Monte `intensity` à 6 : elles éblouissent à travers le bloom.
3. Choisis la couleur cyan : lucioles bleu-vert.

## Voir aussi

- [Forêt](forest.md) : forêt de nuit avec quelques lucioles.
- [Brume féérique](fairy-mist.md) : lucioles roses dans une brume.
- [Spores](spores.md) : autres lumières flottantes.
