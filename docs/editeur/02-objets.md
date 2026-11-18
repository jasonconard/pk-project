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
- **Suppr** ou le bouton **Supprimer** le supprime.
- Le panneau permet de changer **« Bloque le passage »** et **« Transparent quand le joueur est derrière »**.

**Comment c'est fait** : un rayon part de la souris (`Raycaster.setFromCamera`) et touche les meshes des objets visibles ; on remonte ensuite les parents jusqu'à l'objet (`MapHelper.findBuilding`). Les objets cachés près de la caméra (couleur non écrite) sont ignorés. Un appui est un **clic** s'il bouge de moins de 5 pixels, sinon un **glisser**.

## Passage vers une carte

Le panneau de l'objet sélectionné a une section **Passage vers une carte** : **Ajouter un passage** fait de l'objet une porte ou une sortie (`shared/model/Passage.ts`).

- **Vers** : la carte où il mène (celle-ci comprise : un passage peut aussi téléporter sur la même carte).
- **Porte** : on passe en avançant vers l'objet (jusqu'à 24 unités devant sa face avant, tourné vers le haut), ou avec la touche d'action devant. **Marcher dessus** : on passe en entrant dans l'objet, qui laisse alors passer le joueur.
- **Arrivée** : par défaut, le point d'arrivée de la carte de destination. **Choisir** ouvre cette carte dans l'éditeur, avec un bandeau « Touchez le point d'arrivée » : le point touché (aligné sur la grille de 8) est enregistré, et l'éditeur revient sur l'objet. **Annuler** (ou Échap) revient sans rien changer ; la croix revient au point d'arrivée de la carte.
- **Retirer le passage** garde les autres événements de l'objet.
- Le passage est un événement de l'objet (une téléportation vers la carte), exporté avec la carte. En jeu, le passage se fait avec un fondu ; juste après une arrivée, les passages sont ignorés tant que le joueur n'est pas sorti de leur zone (pas de renvoi immédiat).

Le **point d'arrivée de la carte** se règle avec l'outil **Arrivée** de l'onglet Zones (repère jaune, visible dans l'éditeur).

## Annuler / refaire

Chaque changement enregistre une action `{ undo, redo }` (`MapEditorService.record`). Les actions retrouvent le morceau de carte de l'objet au moment où elles s'exécutent (`chunkOf`), car un déplacement peut l'avoir changé de morceau.

## Le rocher

`md-rock.ts` : un bloc bas avec la tuile « Sea Rocks » de la planche d'animations (le fond rouge, couleur de transparence de la planche, est rendu transparent). Il bloque le passage et se pose dans l'eau comme sur la terre.
