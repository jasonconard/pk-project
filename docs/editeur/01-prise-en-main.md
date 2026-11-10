# Prise en main

## Ouvrir l'éditeur

Touche **B** ou bouton **🛠️ Éditer** en haut à gauche (sur la carte uniquement, pas en combat). En édition, le bouton a un contour orange et le joueur est figé : plus de déplacement ni d'événements. En sortant, la caméra revient exactement où elle était.

## La caméra libre

| Action | Effet |
|---|---|
| Glisser (clic gauche, sans outil ou dans le vide) | Déplace la vue, le sol suit la souris |
| Clic droit ou molette glissé | Déplace la vue, quel que soit l'outil |
| Molette | Zoom de 0.4× à 1.8× autour du point regardé |
| Flèches / ZQSD | Déplace la vue (plus vite quand on a dézoomé) |

### Sur écran tactile

| Geste | Effet |
|---|---|
| Glisser un doigt | Déplace la vue, quel que soit l'outil |
| Toucher | Pose le modèle, peint (un coup de pinceau), ou sélectionne un objet |
| Glisser l'objet sélectionné | Le déplace |
| Écarter / pincer deux doigts | Zoom |

En édition, le stick et les boutons du jeu sont masqués (`TouchService.setGameControls`) : les doigts ne servent qu'à l'éditeur. Un second doigt annule le geste du premier (un objet en cours de déplacement revient à sa place).

**Comment c'est fait** (`MapEditorService.pan`) : un pixel d'écran couvre `2 × distance × tan(fov/2) / hauteur de l'écran` unités au point regardé. Verticalement, le sol est vu en biais : un pixel couvre plus de sol, on divise par le sinus de l'inclinaison de la caméra. Le zoom change le facteur `game.cameraZoom` qui multiplie `CAMERA_LOOK` (la position de la caméra par rapport au point regardé) : `getCameraTarget()` en tient compte, si bien que tous les systèmes centrés sur la caméra (météo, ombres) suivent.

## L'interface

- **En haut à gauche** : Quitter l'édition, ↶ annuler, ↷ refaire, ▦ grille, ⬇ Exporter, ⟲ Réinitialiser.
- **▦ Grille** : trace le contour de chaque case (16 unités) au-dessus du sol, à la hauteur de la case et en pente sur les escaliers. Un jeu de lignes par morceau de carte, construit quand il entre dans la vue et refait quand ses reliefs changent (`MapEditorService.buildGrid`).
- **Sous ces boutons** : le panneau de l'objet sélectionné (voir [Objets](02-objets.md)).
- **En bas** : la palette, en trois onglets (Objets, Sols, Reliefs). « ✋ Aucun » reste toujours en tête : la souris sélectionne et déplace la vue. Pour Sols et Reliefs, la taille du pinceau (1, 2, 3, 🪣) est à droite des onglets.
- **Au-dessus de la palette** : un rappel des commandes, qui change avec l'outil choisi.

## Raccourcis

| Touche | Effet |
|---|---|
| B | Ouvrir / fermer l'éditeur |
| Échap | Reposer l'outil, sinon désélectionner |
| Suppr / Retour arrière | Supprimer l'objet sélectionné |
| Ctrl+Z (Cmd+Z) | Annuler |
| Ctrl+Y, Ctrl+Maj+Z | Refaire |

L'historique garde 100 étapes. Un coup de pinceau entier (un glisser) s'annule d'un coup.
