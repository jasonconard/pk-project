# Reliefs et escaliers

## Les outils

Onglet **Reliefs**, avec le même pinceau (1, 2, 3 cases) :

- **Monter** / **Descendre** : un niveau par case et par passage. Un niveau fait **8 unités** (le pas du joueur), de 0 à 6. Les objets posés sur une case montent ou descendent avec elle.
- **Escalier** : une rampe qui monte d'un niveau, orientée **automatiquement** vers la case voisine exactement un niveau plus haut (nord, puis est, ouest, sud ; nord s'il n'y en a pas).
- **Sans escalier** : enlève les escaliers, sans toucher au sol ni à sa hauteur (la gomme de l'onglet Sols les enlève aussi, avec le sol peint).

Données : `chunk.heights` (`'colonne,ligne' → niveau`) et `chunk.stairs` (`'colonne,ligne' → 'n' | 'e' | 's' | 'w'`).

## Le sol en relief

Dès qu'un morceau de carte a des hauteurs, son sol devient une **grille de 32 × 32 cases** (`GroundMesh.buildGroundGeometry`) :

- chaque case est un carré à sa hauteur, avec les mêmes coordonnées de texture que le sol plat (le canvas peint reste valable) ;
- là où une case est plus haute que sa voisine, une **paroi rocheuse** verticale, une tuile de la planche par niveau, alternée entre deux tuiles pour éviter la répétition ; chaque paroi est dessinée par la case haute seulement ;
- un escalier est une case dont **deux coins sont un niveau plus haut** (ceux du côté où il monte) ; ses côtés en pente sont fermés par des triangles ; les marches de la planche sont peintes dessus, tournées selon le sens.

La géométrie a deux groupes : le sol (texture du morceau) et les parois (planche).

### Le style des murs : roche ou grotte

Chaque carte choisit le style de ses parois et de ses escaliers : **Falaise droite** (la roche brune de dehors, des murs verticaux, par défaut), **Roche inclinée** (la même roche, mais les murs penchent en arrière comme les flancs d'une montagne) ou **Grotte** (une roche sombre bleutée, inclinée elle aussi).

Un mur incliné part du pied de la case haute et rejoint son dessus un peu en retrait (5 unités par niveau de hauteur, 12 au plus) : le dessus de la case haute est donc plus petit. Autour d'un coin de la grille, toutes les cases au même niveau utilisent le même point, pour que dessus et murs restent joints ; à côté d'un escalier, les murs restent droits. Plusieurs niveaux côte à côte donnent des gradins de roche. **Le contour de ces parois est arrondi** : un escalier de cases devient une diagonale et un angle droit est coupé, en haut comme au pied de la paroi (chaque coin va à mi-chemin vers le milieu de ses deux voisins sur le contour, un quart de case au plus). **Un bassin** se fait avec ces mêmes outils : monter le sol d'un niveau, laisser l'eau au niveau du dessous ; elle est alors bordée d'une petite berge de roche au contour arrondi (la salle du lac de la Grotte de cristal). Les collisions ne changent pas : elles suivent toujours les cases. Le réglage est dans le gestionnaire de cartes, **…** → **Murs des reliefs** (voir [05](05-sauvegarde-export.md)) ; il est gardé avec la carte (`SceneMap.walls`) et dans son fichier exporté. Les styles sont listés dans `WALL_STYLES` (`GroundMesh.ts`) : deux tuiles de mur et une tuile d'escalier de la planche pour chacun.

### Peindre l'inclinaison des parois

L'onglet **Reliefs** a cinq pinceaux **Paroi**, à passer sur les cases **en hauteur** (celles dont on voit le mur) :

| Pinceau | Ce que fait le mur de la case |
|---|---|
| **Paroi droite** | une falaise verticale |
| **Paroi raide** | penche de 2 unités par niveau |
| **Paroi moyenne** | penche de 4 unités par niveau |
| **Paroi douce** | penche de 8 unités par niveau : une case entière pour deux niveaux, comme les parois des grottes de Pokémon (la case devient alors toute en pente) |
| **Paroi auto** | efface le réglage : la case suit le style de murs de la carte |

On peut donc mêler falaises droites et plans inclinés sur une même carte, quel que soit son style. Les coins se font tout seuls. L'inclinaison ne dépasse jamais une case. Elle est gardée avec la carte (`SceneChunk.slopes`, « colonne,ligne » → unités par niveau) et s'annule comme le reste (Ctrl Z).

La recette des parois de grotte : une bande de cases au niveau 2 en **Paroi douce** au bord du sol, une bande au niveau 2 sans réglage (le replat), une bande au niveau 4 en **Paroi douce**, puis le dessus.

Pour une grotte « à la Pokémon » : peindre le sol avec **Sol de grotte** (onglet Sols, avec **Sol cristallin**, les **Rails** dans les deux sens et **Dessus de grotte**), monter les cases autour de deux niveaux, puis de quatre un peu plus loin (des gradins), et peindre leur dessus en **Dessus de grotte**. Une salle peut avoir plusieurs niveaux où l'on marche : une terrasse montée d'un niveau, avec des escaliers pour y monter. Garder bas (niveau 1) les murs placés au sud d'un passage : la caméra regarde depuis le sud, un mur haut cacherait le sol derrière lui. La [Grotte de cristal](12-donjons.md#un-exemple--la-grotte-de-cristal) est faite ainsi.

**Coût** : sur une ligne, les cases plates voisines au même niveau ne forment qu'un seul carré (quelques dizaines de triangles pour un morceau surtout plat, au lieu de 2 par case : 2 048). Quand plus aucune case n'a de hauteur ni d'escalier, le sol plat d'origine revient (2 triangles, un seul matériau, pas d'ombre projetée). Le rayon qui place le joueur sur le sol ne vise que le morceau de carte sous ses pieds, et le cache des hauteurs de la pluie / neige est vidé quand la géométrie d'un sol change.

**Sens des triangles** : un triangle est « vu de face » quand ses points tournent dans le sens inverse des aiguilles d'une montre de ce côté-là ; sa normale, `(b − a) × (c − a)`, pointe vers ce côté. Chaque paroi est construite avec ses coins « de gauche à droite vus de dehors », pour que la normale pointe vers l'extérieur.

## Le joueur

- **Hauteur** : un rayon part de 80 unités au-dessus du joueur vers le bas et trouve le sol, rampes comprises. Il part très légèrement à côté de la position exacte : un rayon passant exactement par un sommet commun à plusieurs cases peut les manquer toutes.
- **Pas d'escalade** : le joueur s'arrête devant une case plus haute, testée sur **les deux côtés des pieds** (sinon, à cheval sur deux cases, il passait à moitié au-dessus).
- **Escaliers** : on ne les prend que **dans le sens de leur pente**, les **deux côtés des pieds** sur un escalier de même sens : sur un escalier seul, le personnage doit donc être centré sur sa colonne (ou sa ligne pour un escalier est / ouest) ; sur des escaliers collés dans le même sens, il passe n'importe où dans leur largeur. En travers de la pente, on se déplace d'un escalier collé à l'autre (même sens), mais on n'entre ni ne sort par le côté. Un pied à côté, ou en arrivant par le côté, l'escalier est un mur (`SceneService.checkGroundCollisions`, `MapHelper.stairsAt`). Par un escalier, on monte ou descend d'un niveau, sans saut.
- **Saut d'un rebord** : quand le centre du joueur **entre** dans une case plus basse (pas avant, sinon il sautait sur place au bord). Le sol change d'un coup sous lui, mais le sprite et la caméra repartent de l'ancienne hauteur et descendent en accélérant (`chute × (1 − t²)`), avec un arc par-dessus pour le sprite (`sin(π·t)`), en 0.42 s de **temps réel** (la boucle d'entrée ne tourne pas toujours à ses 120 Hz). Si l'arrière du corps est encore au-dessus du rebord (sauts vers la droite ou le bas), le saut le porte d'un pas de plus. Un souffle au départ, un bruit sourd et un nuage de poussière (`DustPuff`) à l'atterrissage.
- **Sprite vertical** : le sprite du joueur ne penche plus vers la caméra (son haut entrait dans une paroi derrière lui) ; il est allongé de `1 / cos(inclinaison de la caméra)` pour garder sa taille à l'écran.
- **Ombre** : une copie invisible du sprite (même géométrie, donc même image d'animation), tournée vers le soleil, projette l'ombre ; le sprite, face à la caméra, serait éclairé par la tranche.
