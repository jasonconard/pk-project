# Objets

Bâtiments et nature sont le même type d'objet : un modèle (`assets/models/md-*.ts`) placé dans un morceau de carte (512 × 512 unités).

## Poser

Onglet **Objets**, choisir un modèle : un **aperçu transparent** suit la souris sur le sol, **aimanté à la grille de 8 unités** (le pas du joueur). Un clic pose l'objet ; un glisser déplace toujours la vue.

- L'objet va dans le morceau de carte **sous lui** (`MapHelper.chunkAt`), avec une position relative à ce morceau.
- Ses options sont celles **les plus courantes pour ce modèle** sur la carte (`defaultOptions`) : un nouvel arbre bloque le passage comme les autres arbres.
- Il n'y a pas de rotation : les modèles sont faits pour la caméra fixe (seules les faces avant sont texturées).

## Sélectionner, déplacer, supprimer

Avec « Aucun », un clic sélectionne un objet (cadre orange) ; un clic dans le vide ou Échap désélectionne.

- **Glisser l'objet sélectionné** le déplace (aimanté à la grille), même d'un morceau de carte à l'autre.
- **Suppr** ou le bouton 🗑 le supprime.
- Le panneau permet de changer **« Bloque le passage »** et **« Transparent quand le joueur est derrière »**.

**Comment c'est fait** : un rayon part de la souris (`Raycaster.setFromCamera`) et touche les meshes des objets visibles ; on remonte ensuite les parents jusqu'à l'objet (`MapHelper.findBuilding`). Les objets cachés près de la caméra (couleur non écrite) sont ignorés. Un appui est un **clic** s'il bouge de moins de 5 pixels, sinon un **glisser**.

## Annuler / refaire

Chaque changement enregistre une action `{ undo, redo }` (`MapEditorService.record`). Les actions retrouvent le morceau de carte de l'objet au moment où elles s'exécutent (`chunkOf`), car un déplacement peut l'avoir changé de morceau.

## Le rocher

`md-rock.ts` : un bloc bas avec la tuile « Sea Rocks » de la planche d'animations (le fond rouge, couleur de transparence de la planche, est rendu transparent). Il bloque le passage et se pose dans l'eau comme sur la terre.
