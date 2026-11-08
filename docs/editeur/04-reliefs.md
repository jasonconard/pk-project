# Reliefs et escaliers

## Les outils

Onglet **Reliefs**, avec le même pinceau (1, 2, 3 cases) :

- **⛰️ Monter** / **🕳️ Descendre** : un niveau par case et par passage. Un niveau fait **8 unités** (le pas du joueur), de 0 à 6. Les objets posés sur une case montent ou descendent avec elle.
- **🪜 Escalier** : une rampe qui monte d'un niveau, orientée **automatiquement** vers la case voisine exactement un niveau plus haut (nord, puis est, ouest, sud ; nord s'il n'y en a pas). La gomme de l'onglet Sols l'enlève.

Données : `chunk.heights` (`'colonne,ligne' → niveau`) et `chunk.stairs` (`'colonne,ligne' → 'n' | 'e' | 's' | 'w'`).

## Le sol en relief

Dès qu'un morceau de carte a des hauteurs, son sol devient une **grille de 32 × 32 cases** (`GroundMesh.buildGroundGeometry`) :

- chaque case est un carré à sa hauteur, avec les mêmes coordonnées de texture que le sol plat (le canvas peint reste valable) ;
- là où une case est plus haute que sa voisine, une **paroi rocheuse** verticale, une tuile de la planche par niveau, alternée entre deux tuiles pour éviter la répétition ; chaque paroi est dessinée par la case haute seulement ;
- un escalier est une case dont **deux coins sont un niveau plus haut** (ceux du côté où il monte) ; ses côtés en pente sont fermés par des triangles ; les marches de la planche sont peintes dessus, tournées selon le sens.

La géométrie a deux groupes : le sol (texture du morceau) et les parois (planche).

**Sens des triangles** : un triangle est « vu de face » quand ses points tournent dans le sens inverse des aiguilles d'une montre de ce côté-là ; sa normale, `(b − a) × (c − a)`, pointe vers ce côté. Chaque paroi est construite avec ses coins « de gauche à droite vus de dehors », pour que la normale pointe vers l'extérieur.

## Le joueur

- **Hauteur** : un rayon part de 80 unités au-dessus du joueur vers le bas et trouve le sol, rampes comprises. Il part très légèrement à côté de la position exacte : un rayon passant exactement par un sommet commun à plusieurs cases peut les manquer toutes.
- **Pas d'escalade** : le joueur s'arrête devant une case plus haute, testée sur **les deux côtés des pieds** (sinon, à cheval sur deux cases, il passait à moitié au-dessus). Un seul niveau par un escalier est permis.
- **Saut d'un rebord** : quand le centre du joueur **entre** dans une case plus basse (pas avant, sinon il sautait sur place au bord), un saut en arc (`sin(π·t)`, 0.35 s) ; pas de saut par un escalier.
- **Sprite vertical** : le sprite du joueur ne penche plus vers la caméra (son haut entrait dans une paroi derrière lui) ; il est allongé de `1 / cos(inclinaison de la caméra)` pour garder sa taille à l'écran.
- **Ombre** : une copie invisible du sprite (même géométrie, donc même image d'animation), tournée vers le soleil, projette l'ombre ; le sprite, face à la caméra, serait éclairé par la tranche.
