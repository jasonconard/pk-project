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

**Comment c'est fait** (`MapEditorService.pan`) : un pixel d'écran couvre `2 × distance × tan(fov/2) / hauteur de l'écran` unités au point regardé. Verticalement, le sol est vu en biais : un pixel couvre plus de sol, on divise par le sinus de l'inclinaison de la caméra. Le zoom change le facteur `game.cameraZoom` qui multiplie `CAMERA_LOOK` (la position de la caméra par rapport au point regardé) : `getCameraTarget()` en tient compte, si bien que tous les systèmes centrés sur la caméra (météo, ombres) suivent.

## L'interface

- **En haut à gauche** : Quitter l'édition, ↶ annuler, ↷ refaire, ⬇ Exporter, ⟲ Réinitialiser.
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
