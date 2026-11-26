# Zones d'action

Sans zone, un passage ou un événement compte sur toute la largeur de l'objet, de tous les côtés : on entre dans la maison par le mur du fond, on lit un panneau par derrière. La **zone d'action** dit où le joueur agit : quelques **cases** de l'objet vu de dessus, et le **côté** d'où il agit. Maquette : `design/main-view.pen` (Zones d'action) et `design/model-editor-mobile.pen` (écran 11). Couleur des zones : cyan.

## Les réglages d'une zone

- **Les cases** : l'objet vu de dessus, découpé en cases de la carte (Arrière en haut, Devant en bas, Gauche, Droite). Toucher une case l'ajoute ou la retire. Sans case, tout l'objet compte.
- **Le côté** : Devant, Derrière, Gauche, Droite ou Tous. « Devant » est le côté tourné vers la caméra quand l'objet n'est pas tourné ; quand on tourne l'objet sur la carte, sa zone tourne avec lui.
- **Tout l'objet** : plus de case, tous les côtés (comme sans zone).

## Où on la règle

1. **Dans l'éditeur de modèles** : fiche **Modèle**, partie **Zone d'action**. C'est la zone par défaut de tous les objets de ce modèle (la porte de toutes les maisons). Elle est exportée avec le modèle.
2. **Sur la carte**, pour un objet posé : dans sa fiche, partie **Zone d'action** (« Comme le modèle » ou « Propre à cet objet », et ce qu'elle couvre), puis **Changer**. La vue se place sur l'objet, ses cases s'affichent par-dessus (les cases de la zone en cyan, une bande cyan du côté choisi) ; on touche les cases sur la carte ou dans la grille de la fiche. **Comme le modèle** reprend la zone du modèle, **Fini** termine. Annuler (Ctrl+Z) défait chaque changement.
3. **Dans la fenêtre d'un événement** : partie Déclencheur, **Zone** : **Celle de l'objet** ou **Sa propre zone** (elle part de celle de l'objet). Pas pour le déclencheur Automatique.

## En jeu

- **Parler** (la touche d'action) : le joueur doit être devant les cases de la zone, du côté choisi, à moins d'une case et quart de l'objet (Tous : autour des cases).
- **Une porte** (passage) : devant les cases de la zone, tourné vers l'objet ; on entre en avançant vers lui ou avec la touche d'action.
- **Marcher dessus** (Entrer dessus, passage « Dessus ») : sur les cases de la zone.
- Rien ne s'affiche de plus : le repère d'interaction n'apparaît que quand le joueur est au bon endroit.

## Dans le code

- `shared/model/action-zone.ts` : `ActionZone` (la grille, les cases, le côté), `inZone` (le joueur est-il au bon endroit), `zoneFacing`, `cellAt`, `zoneCellRects`.
- `SceneModel.zone`, `SceneBuilding.zone`, `SceneEventCondition.zone` (et `ObjectEvent.zone`) ; `EventService.zoneOf` choisit celle de l'événement, sinon de l'objet, sinon du modèle.
- `zone-editor/` : la grille et le côté (dans l'éditeur de modèles, la fiche de l'objet et la fenêtre d'un événement) ; `map-editor/zone-overlay.ts` : les cases sur la carte ; `MapEditorService.editZone` / `setZone`.
- Éditeur de modèles : `model-ops.ts` `modelFootprint` (la taille de l'objet, mesurée comme dans le jeu).

(Chemins relatifs à `src/app/modules/game/`, sauf l'éditeur de modèles.)
