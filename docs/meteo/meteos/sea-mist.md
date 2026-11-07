# 🌊 Brume marine (`sea-mist`)

> Catégorie **Classiques**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Des **nappes de brume bleu-gris** poussées par un vent léger permanent.
- Houle et mouettes au loin (`sea: 1`).
- Lumière douce et froide (#d4e0ea le jour).
- **Son** : vagues et mouettes lointaines (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.85 | 0.36 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.64 | 0.26 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #d4e0ea | #5a7090 | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #f0f6ff | #b3c4ff | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #d8e2ec | #627890 | Teinte des sprites non éclairés (joueur, pokémons). |
| `cloudCover` | 0 | 0.5 | 0.4 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudAmbient` | 0 | 0.08 | 0 | Part dont les nuages assombrissent aussi l'ambiant (ombres de nuages plus contrastées). |
| `cloudSpeed` | 12 | 20 | 20 | Vitesse des ombres de nuages au sol (unités/s). |
| `minWind` | 0 | 0.25 | 0.25 | Vent minimal imposé, quelle que soit la jauge. |
| `sea` | 0 | 1 | 1 | Sons de mer (vagues, mouettes). |
| `fog` | 0 | 0.75 | 0.75 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #a8bac8 | #34465a | Couleur du brouillard. |
| `specular` | 0.3 | 0.3 | 0.3 | Force des reflets sur les surfaces brillantes. |

**Température** : **14 °C** le jour, **11 °C** la nuit.

## Comment c'est fait

- `fog` 0.75 avec `fogColor` bleu-gris (#a8bac8 le jour, #34465a la nuit) : voir [05 · Brouillard et ténèbres](../concepts/05-brouillard-et-tenebres.md).
- `minWind: 0.25` impose un vent minimal : même avec la jauge à zéro, la brume avance. Voir [11 · Vent](../concepts/11-vent.md).
- `sea: 1` ne produit aucun visuel : il envoie le niveau de mer au moteur audio (vagues et mouettes). Voir [10 · Audio](../concepts/10-audio.md).
- Nuages : `cloudCover` 0.5 le jour, 0.4 la nuit ; `cloudSpeed` 20 (ombres plutôt rapides).

## À retenir

- Le jour `litLevel` 0.85 et `shadowLevel` 0.64 ; la nuit `litLevel` 0.36 et `shadowLevel` 0.26 (presque la base nocturne).
- `sea` est un paramètre indépendant : on pourrait l'ajouter à une autre météo pour ajouter l'ambiance de plage.
- La différence avec [Brouillard](fog.md) : brume moins épaisse (0.75 contre 0.85), colorée bleu, vent minimal, et son.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.SEA_MIST]` et `NIGHT_PRESETS[WeatherType.SEA_MIST]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.SEA_MIST]` dans `weather-catalog.ts`.
- Capture day : `src/assets/weather/sea-mist-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/sea-mist-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Passe `minWind` à 0.8 : la brume file à toute vitesse.
2. Mets `fogColor: #c8e8d0` : brume verdâtre de marécage.
3. Passe `sea` à 0 : la même brume, sans la mer.

## Voir aussi

- [Brouillard](fog.md) : brouillard blanc sans son.
- [Bruine](drizzle.md) : brume légère avec bruine.
- [Brume hantée](haunted.md) : brume sombre et silhouettes.
