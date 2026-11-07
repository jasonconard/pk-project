# 🌫️ Neige de cendres (`ash`)

> Catégorie **Chaleur & feu**. Disponible **de jour et de nuit**.

## Ce qu'on voit / entend

- Le soleil orange est **voilé** et des **flocons de cendres grises** tombent lentement en tourbillonnant.
- Brume grise-brune.
- Un feu qui crépite au loin.
- **Son** : crépitement lointain d'un feu (`sound: true`). Voir [10 · Audio](../concepts/10-audio.md).

## Les paramètres

Valeurs réelles des presets qui diffèrent de la base (jour : `DAY_BASE`, nuit : `NIGHT_BASE`). La colonne « Base » est celle du jour ; « – » = pas de preset à cette heure.

| Paramètre | Base | Jour | Nuit | Effet |
|---|---|---|---|---|
| `litLevel` | 1 | 0.72 | 0.34 | Luminosité du sol au soleil. |
| `shadowLevel` | 0.6 | 0.55 | 0.22 | Luminosité à l'ombre (lumière ambiante seule). |
| `ambientColor` | #ffffff | #d4bca8 | #7a5a4c | Teinte de la lumière ambiante. |
| `sunColor` | #ffffff | #ffa870 | #d08a60 | Couleur du soleil (la lune la nuit). |
| `unlitTint` | #ffffff | #d8c4b4 | #7c6458 | Teinte des sprites non éclairés (joueur, pokémons). |
| `specular` | 0.3 | 0.1 | 0.1 | Force des reflets sur les surfaces brillantes. |
| `cloudCover` | 0 | 0.6 | 0.5 | Couverture nuageuse (1 = le soleil est totalement masqué). |
| `cloudAmbient` | 0 | 0.12 | 0 | Part dont les nuages assombrissent aussi l'ambiant (ombres de nuages plus contrastées). |
| `cloudSpeed` | 12 | 5 | 5 | Vitesse des ombres de nuages au sol (unités/s). |
| `ash` | 0 | 1 | 1 | Flocons de cendres qui tombent. |
| `fog` | 0 | 0.45 | 0.45 | Épaisseur du brouillard. |
| `fogColor` | #dde3e8 | #a89488 | #3c2e2a | Couleur du brouillard. |
| `windowGlow` | 0 | 0 | 0.6 | Force des fenêtres allumées. |

**Température** : **24 °C** le jour, **18 °C** la nuit.

## Comment c'est fait

- **Nappes de fumée** : style `ASH_SMOKE_STYLE` (`GlowParticles.ts`), 70 grandes bouffées grises (taille 22–32, plus larges que hautes avec `stretchY` 0.6) en mélange normal avec opacité par bouffée (`smokeOpacity` 0.35, voir [Volcanique](volcanic.md)). Elles suivent la lumière, flottent presque sans monter et sont surtout **poussées par le vent** (`windSpeed` 40) : elles dérivent en travers de l'écran. Elles sont pilotées par `ash`.
- Style `ASH_STYLE` : **700** flocons max, couleur #8c8884 et palette #5c5856, #b0aaa4, intensité 1, mélange `normal` (ils ne brillent pas), chute **7–14** unités/s, balancement 4, vie 6–11 s, taille 1.4–2.6, apparition à 30–110 de haut, vent 30. Voir [08 · Particules](../concepts/08-particules.md).
- `ash: 1`. Le paramètre est dans les `SNAP_KEYS` : mis à 0 une fois éteint pour arrêter le helper. Voir [01 · Architecture](../concepts/01-architecture.md).
- `fog: 0.45` : #a89488 le jour, #3c2e2a la nuit. `cloudCover` 0.6 (0.5 la nuit), `cloudSpeed` **5**.
- Lumière : soleil orange #ffa870 le jour (#d08a60 la nuit), `specular` 0.1.

## À retenir

- Température : 24 °C le jour, 18 °C la nuit.
- Jour : `litLevel` 0.72, `shadowLevel` 0.55 ; nuit : `litLevel` 0.34, `windowGlow` 0.6.
- Les cendres ne scintillent pas (`flicker` 0) contrairement aux braises : seule la lumière du ciel fait leur couleur.

## Où regarder dans le code

- Presets : `DAY_PRESETS[WeatherType.ASH]` et `NIGHT_PRESETS[WeatherType.ASH]` dans `Weather.ts` (un preset absent = météo indisponible à cette heure).
- Textes affichés dans le panneau : `WEATHER_INFO[WeatherType.ASH]` dans `weather-catalog.ts`.
- Style : `ASH_STYLE` dans `GlowParticles.ts`.
- Capture day : `src/assets/weather/ash-day.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Capture night : `src/assets/weather/ash-night.webp` (`weatherScreenshot` dans `weather-catalog.ts`).
- Mélange jour/nuit et aube/crépuscule : [02 · Jour et nuit](../concepts/02-jour-nuit.md) ; câblage dans `WeatherHelper` : [01 · Architecture](../concepts/01-architecture.md).

## Expériences à tenter

1. Mets `ash: 0.3` : quelques flocons seulement.
2. Change `color` en #ffffff : de la neige d'été.
3. Passe `rise` à `[-30, -20]` : les cendres tombent beaucoup plus vite.

## Voir aussi

- [Volcanique](volcanic.md) : braises et chaleur.
- [Neige](snow.md) : flocons blancs.
- [Brouillard](fog.md) : brume neutre.
