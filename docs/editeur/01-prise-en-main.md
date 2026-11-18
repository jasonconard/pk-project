# Prise en main

## Ouvrir l'éditeur

Touche **B** ou bouton **Créer** (crayon et règle) en haut à droite du jeu (sur la carte uniquement, pas en combat). **Jouer** (ou B) en sort. En édition, un liseré orange entoure la barre et le joueur est figé : plus de déplacement ni d'événements. En sortant, la caméra revient exactement où elle était.

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

La mise en page dépend de l'écran (`EditorBarComponent.layout`, attribut `data-layout` ; styles dans `editor-bar.component.scss` et `editor-bar.wide.scss`) :

| Mise en page | Quand |
|---|---|
| Téléphone en portrait | par défaut (et tablette en portrait : le dock flotte au milieu en bas) |
| Téléphone en paysage | paysage et hauteur ≤ 600 px |
| Ordinateur | largeur ≥ 1000 px et hauteur ≥ 601 px |

### Téléphone en portrait

- **La barre, en haut** : **Jouer** (quitter l'édition), la **carte ouverte** (son nom : ouvre le gestionnaire de cartes, voir [05](05-sauvegarde-export.md)), **annuler**, **refaire**, et **⋮** : Grille des cases, Ambiance, Réglages (le menu du jeu : plein écran, son, qualité, nouveautés), et les éditeurs Modèles 3D et Musique.
- **Sous la barre** : un rappel des gestes de l'outil choisi. Sa croix le masque jusqu'au prochain changement d'outil.
- **Le dock, en bas** : les onglets en icônes (Objets, Sols, Reliefs, Zones ; Événements grisé, à venir), seul l'onglet choisi montre son nom ; pour Sols et Reliefs, la taille du pinceau (1, 2, 3, pot de peinture) ; puis la palette, qui défile de côté. « Aucun » reste toujours en tête : le doigt sélectionne et déplace la vue.
- **Un objet touché** : sa fiche remplace le dock (voir [Objets](02-objets.md)). La croix, ou Échap, le désélectionne.
- **L'ambiance** (⋮ → Ambiance, ou M / H / W / N / V) se déplie en colonne sous la barre, à gauche ; chaque réglage s'ouvre à droite de son bouton.

### Téléphone en paysage

La hauteur manque : les panneaux passent sur les côtés.

- **À gauche**, sur toute la hauteur : les onglets en rail d'icônes, la taille du pinceau au-dessus de la palette, et la palette sur 2 colonnes qui défile.
- **En haut**, entre le panneau d'outils et le bord droit : la même barre qu'en portrait, et le rappel des gestes dessous.
- **À droite** : la fiche de l'objet sélectionné, sur toute la hauteur (elle défile).
- L'ambiance se déplie à droite du panneau d'outils.

### Ordinateur

- **La barre, sur toute la largeur** : Jouer (B), la carte ouverte, annuler, refaire, Grille ; à droite **l'ambiance** (la météo et l'heure, ouvre les réglages d'ambiance), **Réglages**, et le lanceur **Éditeurs** (Modèles 3D, Musique ; Dialogues, Base de données, Portraits et sprites, Cinématiques grisés, à venir).
- **À gauche** : les onglets avec leur nom, la taille du pinceau, une **recherche** d'objet (sans accents : « batiment » trouve « Bâtiment » ; Échap la vide) et la palette **par familles** (Nature, Bâtiments, Décor ; `MODEL_FAMILIES`).
- **À droite** : la fiche de l'objet sélectionné.
- **En bas** : l'aide clavier et souris de l'outil choisi (Clic, Glisser, R, Ctrl D, Suppr, Échap, Molette…), à la place du rappel des gestes.

### Commun

- **Grille** : trace le contour de chaque case (16 unités) au-dessus du sol, à la hauteur de la case et en pente sur les escaliers. Un jeu de lignes par zone de carte, construit quand elle entre dans la vue et refait quand ses reliefs changent (`MapEditorService.buildGrid`).
- La console de diagnostic (Réglages → Qualité graphique) s'affiche sous la barre, à droite du panneau d'outils en paysage et sur ordinateur.

## Raccourcis

| Touche | Effet |
|---|---|
| B | Ouvrir / fermer l'éditeur |
| Échap | Défait la dernière chose faite : ferme le dernier menu ou réglage ouvert, repose l'outil, désélectionne (`EscapeService` : une pile, la dernière action en haut) |
| R | Tourner l'objet sélectionné d'un quart de tour |
| Ctrl+D (Cmd+D) | Dupliquer l'objet sélectionné |
| Suppr / Retour arrière | Supprimer l'objet sélectionné |
| Ctrl+Z (Cmd+Z) | Annuler |
| Ctrl+Y, Ctrl+Maj+Z | Refaire |

L'historique garde 100 étapes. Un coup de pinceau entier (un glisser) s'annule d'un coup.
