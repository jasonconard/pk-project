# Lumières

La nuit, les lampes éclairent vraiment : un halo de leur couleur sur le sol autour d'elles, qui monte quand la nuit tombe (en même temps que les fenêtres s'allument). Maquette : `design/main-view.pen` (Lumières) et `design/model-editor-mobile.pen` (écran 12).

## Trois sortes de lumières

1. **Un point de lumière dans un modèle** : éditeur de modèles, fiche **Modèle**, partie **Lumières** → **+ Point**, puis **Placer** et toucher le modèle à l'endroit voulu (la vitre d'un lampadaire, une fenêtre). Tous les objets de ce modèle posés sur la carte s'allument. Le lampadaire du jeu en a un (sa vitre), le feu de camp aussi (ses flammes).
2. **Un objet Lumière** : éditeur de carte, onglet **Événements**, **Lumière**, puis toucher le sol. Il est invisible en jeu (une petite boule de sa couleur dans l'éditeur) : un feu de camp sans modèle, une lueur magique, une lumière dans un donjon.
3. **La lanterne du joueur** : éteinte au début ; un événement l'allume (action **Lumière**, « La lanterne du joueur »). Elle suit le joueur.

## Les réglages d'une lumière

- **Couleur** : 7 teintes, ou une autre au choix.
- **Portée** : de 1 à 8 cases.
- **Force** : Douce, Moyenne, Forte.
- **Vacille comme une flamme** : sa force bouge un peu, sans arrêt.
- **Seulement le soir et la nuit** : éteinte le jour (un lampadaire). Sinon elle éclaire aussi le jour, un peu (une lumière de donjon).
- **Allumée au départ** : décochée, elle attend qu'un événement l'allume.

## Les allumer, les éteindre

L'action d'événement **Lumière** : choisir **La lanterne du joueur**, **Cet objet** (l'objet de l'événement) ou une lumière de la carte, puis **Allumer** ou **Éteindre**. C'est gardé avec la partie (sauvegardes, mode test).

## La qualité graphique

Chaque lumière dessine un halo sur le sol : peu coûteux, même avec beaucoup de lampes. En qualité **Haute**, les 4 lumières les plus proches du joueur sont aussi de vraies lumières, qui éclairent les murs, les objets et les personnages ; en **Moyenne**, les 2 plus proches ; en **Économie**, aucune (les halos seulement).

## Dans le code

- `game/shared/model/light.ts` : `LightSpec` (couleur, portée, force, vacille, nuit, éteinte), `ModelLight` (avec sa position), l'objet `light` (`MD_LIGHT`, `makeLightMarker`), la lanterne (`LANTERN`), `isLightOn` (les interrupteurs des événements : `PartyState.lights`, `switchLight`).
- `game/shared/model/lights-view.ts` : `LightsView`, appelé à chaque pas par `GameMapService` : cherche les lumières des morceaux visibles, pose les halos (additifs) et règle les vraies lumières (`RENDER_DETAIL.realLights`, fixé par `Game.applyQuality`). L'intensité suit `WEATHER_UNIFORMS.uWindowGlow` (la lueur des fenêtres).
- `game/light-fields/` : les réglages, partagés par la fiche de l'objet (éditeur de carte, `MapEditorService.setLight`) et l'éditeur de modèles (`SceneModel.lights`, `EditableModel.lights`, `ModelEditorScene.setLights` / `pickPoint`).
- L'instruction `LIGHT` et l'action `light` (fenêtre des événements).
