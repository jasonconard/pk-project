# ♨️ Geysers (`geysers`)

> Catégorie **Nature** · disponible **de jour et de nuit** · 23 °C le jour, 17 °C la nuit

## Ce qu'on voit / entend

Un air tiède et brumeux. Quatre bouches de vapeur sont réparties dans le champ de vision et fument doucement. Toutes les 6 à 16 secondes, l'une d'elles gargouille puis crache une haute colonne de vapeur qui s'évase en haut et penche avec le vent. Si le joueur se trouve dessus à ce moment-là, il est projeté en l'air en tournoyant. Près d'un geyser, on entend la vapeur siffler.

## Les paramètres

Preset `GEYSERS` dans `src/app/modules/game/shared/weather/Weather.ts` :

| Paramètre | Jour | Nuit | Effet |
|---|---|---|---|
| `litLevel` / `shadowLevel` | 0.92 / 0.62 | 0.4 / 0.26 | Lumière douce |
| `specular` | 0.5 | 0.5 | Reflets sur le sol humide |
| `dew` | 0.5 | 0.5 | Sol humide, petites flaques (voir [Nuit étoilée](starry-night.md)) |
| `geysers` | 1 | 1 | Active les geysers |
| `fog` / `fogColor` | 0.3 / `0xd8e0e4` | 0.3 / `0x2c3644` | Brume tiède ([brouillard](../concepts/05-brouillard-et-tenebres.md)) |

## Comment c'est fait

### 1. Les bouches : `GeyserHelper.ts`
Ce helper ne dessine rien : il gère **où** sont les geysers et **quand** ils entrent en éruption.

- **Position** : 4 bouches (`GEYSERS`) placées au hasard dans la zone visible, à au moins 60 unités les unes des autres. Elles sont **fixes sur la carte**. Quand le joueur s'éloigne et qu'une bouche sort de la zone, elle est supprimée et une nouvelle apparaît ailleurs dans le champ.
- **Cycle** : chaque bouche a un minuteur. À 0, une éruption démarre (`ERUPTION_LENGTH`) et `onEruption` est appelé pour le son. Pendant l'éruption, la force `power` suit une enveloppe : montée en 8 % du temps, plateau, puis décroissance linéaire sur les 40 % finaux.

### 2. La vapeur : deux styles de particules
Les deux utilisent la fumée en mélange normal avec opacité par bouffée (voir [Volcanique](volcanic.md)) et **naissent dans les bouches** grâce à `spawnAt` (le helper fournit le point, voir [particules](../concepts/08-particules.md)) :

| Style | Rôle | Réglages clés |
|---|---|---|
| `STEAM_STYLE` | Vapeur au repos, depuis n'importe quelle bouche | lente (`rise` 5–9), fine, 140 bouffées |
| `STEAM_JET_STYLE` | Jet, seulement depuis les bouches en éruption | rapide (`rise` 55–85), dense (`smokeOpacity` 0.7), `grow` 3.2 : il s'évase en montant |

Pour le jet, `spawnPoint(true)` choisit une bouche **au hasard pondéré par sa force**. La somme des forces est tirée au hasard, puis on soustrait la force de chaque geyser jusqu'à tomber sous 0. Un geyser en pleine éruption reçoit donc plus de vapeur qu'un geyser qui s'éteint. La densité du jet suit le total des éruptions (`eruptions / 2`).

### 3. Le joueur projeté
L'envol de la [Tornade](tornado.md) (`updateFlight` dans `WeatherHelper.ts`) a maintenant deux déclencheurs : la tornade, ou un geyser en éruption (`power > 0.3`) à moins de `GEYSER_CATCH` (10 unités). L'animation, la caméra qui suit et le délai de protection sont partagés.

### 4. Les sons
Voir [audio](../concepts/10-audio.md) :
- `geyserBurst` (au début de chaque éruption) : les bulles du [Climat empoisonné](poison.md), puis un **souffle**, un bruit filtré dont la fréquence centrale monte de 400 à 2 500 Hz. C'est ce glissement vers l'aigu qui donne l'impression d'un jet qui jaillit. Le volume dépend de la distance, et le son vient du côté du geyser.
- **Sifflement continu** : une boucle de bruit entre 1,5 et 7 kHz. Son niveau vaut, pour le geyser le plus audible, `proximité × (0.15 + 0.85 × force)` : un léger sifflement au repos, fort pendant l'éruption.

## Maths et code à retenir

- **Séparer la logique du rendu** : `GeyserHelper` décide où et quand, `GlowParticles` dessine.
- **Tirage pondéré** : tirer `r` dans [0, somme], puis soustraire les poids un par un.
- **Enveloppe en trois phases** (montée, plateau, descente) avec des `min` et des interpolations linéaires.
- **Glissement de fréquence d'un filtre** pour donner du mouvement à un bruit.

## Expériences à tenter

- `ERUPTION_INTERVAL = [2, 5]` dans `GeyserHelper.ts` : une zone très active.
- `rise: [120, 160]` dans `STEAM_JET_STYLE` : des jets gigantesques.
- `GEYSER_CATCH = 30` dans `WeatherHelper.ts` : difficile d'y échapper !
- `GEYSERS = 10` : un vrai champ de geysers.

## Voir aussi

- [Tornade](tornado.md) : le même envol du joueur.
- [Pluie acide](acid-rain.md) et [Volcanique](volcanic.md) : les fumées qu'on réutilise ici.
- [Séisme](earthquake.md) : autre phénomène par événements.
