# 🌪️ Tornade (`tornado`)

> Catégorie **Pluie & tempêtes**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- **Ciel vert-gris**, vent violent, un peu de pluie et d'éclairs.
- Une **colonne de poussière et de débris** erre sur la carte.
- Si le joueur s'en approche trop, elle l'**emporte** et il s'envole.
- Grondement dont le volume dépend de la distance.
- **Son** : grondement selon la distance, souffle pendant l'envol (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.62 | 0.3 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.5 | 0.2 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #b8c4b0 | #4e5c58 | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #d8e0c8 | #b3c4ff | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #bcc6b4 | #56625e | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.1 | 0.1 | Force des reflets sur les surfaces brillantes. |
| `cloudCover` | 0 | 0.9 | 0.6 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudAmbient` | 0 | 0.2 | 0 | Part dont les nuages assombrissent aussi l'ambiant (ombres de nuages plus contrastées). |
| `cloudSpeed` | 12 | 50 | 50 | Vitesse des ombres de nuages au sol (unités/s). |
| `minWind` | 0 | 0.8 | 0.8 | Vent minimal imposé, quelle que soit la jauge. |
| `rain` | 0 | 0.25 | 0.25 | Densité de la pluie. |
| `lightning` | 0 | 0.3 | 0.4 | Fréquence des éclairs. |
| `tornado` | 0 | 1 | 1 | Tornade qui traverse la zone. |
| `fog` | 0 | 0.25 | 0.25 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #8a9480 | #2a3230 | Couleur du brouillard. |
| `windowGlow` | 0 | 0 | 0.5 | Force des fenêtres allumées. |

**Température** : **24 °C** le jour, **19 °C** la nuit.

## Comment c'est fait

- `TornadoHelper.ts` : entonnoir de **650** nuages de poussière (couleurs gris-brun #d8d0c4, #c0b8ac, #ece4d8, #a8a094), hauteur **260**, rayon de **7** en bas à **70** en haut, rotation **2.2** rad/s, **160** débris et un anneau de poussière au pied. Voir [09 · Effets spéciaux](../concepts/09-effets-speciaux.md).
- Elle apparaît à 110–200 unités du joueur, avance à **16** unités/s, change de cap avec une vitesse de virage `TURN_SPEED` = 0.5, et se rapproche si elle s'éloigne de plus de 240 (laisse). Au-delà de 600, elle disparaît et réapparaît près du joueur.
- **Envol** : à moins de **16** unités (`TORNADO_CATCH`) avec une force > 0.8, le joueur est emporté pendant **3.2 s** (`FLIGHT_TIME`), à **50** de haut en tournant sur lui-même, puis une pause de **5 s** (`FLIGHT_COOLDOWN`) évite de l'attraper en boucle.
- Vent forcé : `minWind: 0.8` ; `cloudSpeed` **50**. Voir [11 · Vent](../concepts/11-vent.md).
- Pluie `rain 0.25` ; `lightning 0.3` le jour, 0.4 la nuit.

## À retenir

- Le grondement est calculé sur la distance à la tornade, avec une portée d'écoute `TORNADO_HEARING` = 350.
- Jour : `litLevel` 0.62, `shadowLevel` 0.5, brume verdâtre #8a9480 ; nuit : `litLevel` 0.3, `windowGlow` 0.5.
- L'envol aussi fait entendre le souffle tournoyant (`whirl` à 1 pendant le vol). Voir [10 · Audio](../concepts/10-audio.md).

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.TORNADO]` et `NIGHT_PRESETS[WeatherType.TORNADO]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.TORNADO]` dans `weather-catalog.ts`.
- Entonnoir : `TornadoHelper.ts` ; envol et constantes `TORNADO_*`/`FLIGHT_*` dans `WeatherHelper.ts`.
- Capture day : `src/assets/weather/tornado-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/tornado-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Mets `TRAVEL_SPEED` à 40 : la tornade poursuit le joueur plus vite.
2. Passe `RADIUS` à `[10, 120]` : un entonnoir géant.
3. Mets `TORNADO_CATCH` à 5 : il faut presque la toucher pour s'envoler.

## Voir aussi

- [Orage](storm.md) : pluie et éclairs sans tornade.
- [Vent de pétales](petal-whirl.md) : tourbillons plus doux, de pétales.
- [Tempête de sable](sandstorm.md) : vent fort et poussière.
