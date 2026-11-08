# Sols et raccords

## Peindre

Onglet **Sols** : choisir un terrain, puis clic ou glisser. Le carré orange montre les cases touchées.

- **Pinceau 1, 2, 3** : un carré de 1 à 3 cases à partir de la case sous la souris.
- **Pot de peinture 🪣** : remplit toute la zone continue du même sol que la case cliquée (voisins haut, bas, gauche, droite ; 4096 cases au plus).
- **Gomme 🧽** : revient au sol d'origine (et enlève les escaliers).

Une case fait **16 unités** ; elle est rangée dans `chunk.tiles` : `'colonne,ligne' → terrain`, la case (0, 0) étant le coin nord-ouest du morceau de carte.

## Le sol peint : un canvas

Le sol d'un morceau de carte est un seul maillage avec une texture. Dès qu'il est peint, sa texture devient un **canvas** de 512 × 512 pixels (1 pixel par unité, comme les textures de sol) : on y dessine la texture d'origine, puis chaque case peinte par-dessus (`MapHelper.paintedGround`, `drawCell`). Le sol garde ainsi tous les effets météo (pluie, flaques, neige…) et un seul maillage.

## Les terrains et la planche

`Terrain.ts` liste les terrains. Les tuiles viennent de `tileset.png` : des tuiles de 16 px sur une grille au pas de 17 px (`tilesetPos(col, ligne)` = `1 + 17 × index`).

## Les raccords automatiques (autotiling)

Chaque terrain avec raccords a un bloc de tuiles : centre, 4 bords, 4 coins, coins intérieurs. Plutôt que de les repérer à la main, une **signature** a été calculée pour chacune, à partir des couleurs de la planche : pour 8 zones de la tuile (4 bords, 4 coins), la zone « montre de l'herbe » si plus de 35 % de ses pixels sont loin des couleurs du centre du terrain. Les 8 réponses forment un nombre de 8 bits.

Au dessin d'une case (`autotile`) :

1. On regarde les 8 voisines : un bord a besoin d'herbe si sa voisine est un autre terrain ; un coin aussi, ou si l'un de ses deux côtés en a besoin.
2. On choisit la tuile dont la signature diffère du besoin sur **le moins de zones** (distance de Hamming : le nombre de bits à 1 de `signature XOR besoin`).

Peindre une case redessine aussi ses 8 voisines, y compris dans le morceau de carte d'à côté (`neighborCell`).

## L'eau

- **Bloquante** : le joueur s'arrête avant une case d'eau (`SceneService.checkGroundCollisions`, deux côtés des pieds testés).
- **Animée** : toutes les 220 ms, les cases d'eau ouverte (sans berge) reçoivent l'image suivante des 8 images « Sea » / « Deep Sea » de `tileset-anim.png`.
- **Plages** : quand toutes les voisines différentes d'une case de sable sont de l'eau, le sable utilise ses tuiles de rivage (`shoreVariants`), et l'eau ne dessine pas de berge rocheuse vers lui.

## Limites

Les raccords n'existent qu'avec l'herbe : du sable contre de la terre montre une bordure d'herbe entre les deux.
