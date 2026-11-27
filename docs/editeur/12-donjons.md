# Donjons

La nuit, l'équipe explore des donjons : des étages faits à la main ou tirés au hasard à partir de salles, des ennemis qui se promènent sur la carte, des coffres, des pièges, des interrupteurs et des portes fermées. Maquette : `design/main-view.pen` (Donjons) et `design/database.pen` (écran 17).

## Créer un donjon

1. **Les cartes** : dans le gestionnaire de cartes ([Cartes](05-sauvegarde-export.md)), créer les étages faits à la main avec la sorte **Donjon**, et les salles avec la sorte **Salle**.
2. **Les objets** : poser dans les cartes les objets de l'onglet **Donjon** de la palette (voir plus bas). Une salle a au moins une **Porte de salle** ; un étage fait à la main a un **Escalier** pour descendre.
3. **La fiche** : dans la [base de données](10-base-de-donnees.md), table **Donjons**, régler les heures d'ouverture, la météo et les étages.
4. **L'entrée** : sur la carte de la ville ou du monde, un objet avec un **passage** vers « Donjon : <nom> » (ou l'action **Téléporter** d'un événement vers ce donjon). L'équipe arrive au premier étage.

## La fiche du donjon

- **Ouverture** : les moments où il est ouvert (aucun : toujours ouvert) et les jours spéciaux du calendrier où il est ouvert toute la journée.
- **Météo** : la météo du donjon (elle remplace celle du dehors, rendue à la sortie), ou celle du dehors.
- **Musique** : un morceau de l'[éditeur de musique](07-musique.md) pour ce donjon, ou celui du moment **Donjon** (volet Jeu de l'éditeur de musique). Les combats gardent leur musique.
- **Étages**, dans l'ordre :
  - **Faite à la main** : une carte.
  - **Générés** : les salles où piocher, le nombre de salles (de … à …) et **Étages pareils** (plusieurs étages tirés de la même façon à la suite).
  - **Groupes d'ennemis** et leur nombre sur l'étage (un groupe tiré au hasard pour chaque ennemi).
  - Étages générés : le nombre de **coffres** et ce qu'ils peuvent contenir (un objet et sa chance en %).
  - **Point de sauvegarde et sortie** : un cristal près de l'arrivée.

## L'onglet Donjon de l'éditeur

| Objet | Ce qu'il fait | Réglages (fiche de l'objet sélectionné) |
|---|---|---|
| **Coffre** | Touche d'action : il s'ouvre et donne son contenu (une seule fois) | Contenu (objets, pièces), **Fermé à clé** (un objet de la base, gardé dans le sac). Sur un étage généré, un coffre vide reçoit un objet du butin de l'étage |
| **Piège** | Marcher dessus : l'équipe perd une partie de ses PV, ou un combat commence | L'effet, **Caché** (invisible jusqu'à ce qu'on marche dessus) |
| **Interrupteur** | Touche d'action : allume ou éteint un drapeau | Le drapeau ([Variables](08-variables.md)) |
| **Porte fermée** | Bloque le passage ; s'ouvre avec la clé, ou disparaît quand le drapeau est vrai | La clé, le drapeau |
| **Escalier** | Marcher dessus : l'étage suivant (après le dernier : la sortie) | — |
| **Porte de salle** | Touche d'action : la salle voisine | **Mène à** : une carte et sa porte d'arrivée (donjon fait à la main), ou au hasard (étage généré) |
| **Cristal de sauvegarde** | Touche d'action : sauver la partie, sortir du donjon | — |
| **Ennemi** | Marche sur la carte ; le combat commence quand il touche l'équipe | Son **groupe**, son **déplacement** avant de voir l'équipe (ronde autour de sa place, aller-retour gauche-droite ou haut-bas, immobile), jusqu'à combien de cases |

Dans l'éditeur, les objets sont montrés tels qu'ils sont posés (coffres fermés, pièges cachés visibles, portes fermées).

**Porte de salle dans une paroi inclinée** : posée sur une case au pied d'une paroi qui penche (carte au style **Roche inclinée** ou **Grotte**, ou paroi peinte avec un pinceau **Paroi**), la porte n'est plus une arche debout : c'est une **bouche de grotte dessinée sur la pente de la roche**, avec une ombre au sol devant elle. **Tourner** choisit le mur : nord (sans tourner), est, sud ou ouest. Le jeu lit la hauteur et la pente de la paroi derrière la porte ; garder la paroi droite sur trois cases pour que la bouche repose bien à plat. On arrive devant elle, côté salle.

**Porte de salle sur un mur droit de côté** : tournée d'un quart de tour, la porte est une **ouverture sombre au sol**, d'une case. La poser dans une case creusée dans le mur (une encoche d'une case).

## Un donjon fait à la main

Pour maîtriser le parcours, tout se pose dans l'éditeur de cartes, rien n'est tiré au hasard :

- **Un étage** est une carte faite à la main (fiche Donjon → étage → **Carte**). Mettre **0 ennemi** et **0 coffre** au hasard dans la fiche.
- **Plusieurs cartes dans un étage** : poser des **Portes de salle** et régler leur **Mène à** (la carte, puis la porte d'arrivée). Régler aussi la porte de l'autre côté pour le retour. On arrive devant la porte d'arrivée.
- **Les ennemis** : l'objet **Ennemi** de l'onglet Donjon. Dans l'éditeur il montre le premier ennemi de son groupe. En jeu, il marche selon son déplacement tant qu'il n'a pas vu l'équipe, puis la poursuit ; **Immobile** ne bouge jamais et ne poursuit pas (un boss). Un ennemi battu ne revient pas tant qu'on reste à cet étage. Hors d'un donjon, les objets Ennemi n'apparaissent pas.
- **Coffres, escalier, cristal de sauvegarde** : posés à la main aussi.

## Les étages générés

À chaque visite, le jeu tire le nombre de salles, les pioche parmi celles de l'étage (une salle peut revenir) et relie chaque nouvelle salle à une porte libre d'une salle déjà là : on peut toujours aller partout. Il place l'escalier dans la dernière salle, partage les ennemis et les coffres entre les salles (pas dans la première, quand il y en a d'autres) et met le cristal dans la première si l'étage en a un. **Une porte de salle sans voisine n'est pas dessinée** dans l'étage : on ne voit que les portes qui mènent quelque part. Hors d'un donjon (salle ouverte depuis le gestionnaire de cartes), toutes les portes sont montrées et disent que le passage ne mène nulle part. Les objets sont posés sur des cases libres au niveau de l'arrivée, loin des murs et des autres objets.

## Dans le jeu

- **Le bandeau** (sous l'horloge) : le donjon et l'étage, l'heure où il ferme, les ennemis qui restent.
- **Les ennemis** se promènent autour de leur place. Chacun est dessiné avec la **planche de marche** du premier ennemi de son groupe (Base de données → Ennemis → **Marche sur la carte**) : tourné dans l'une des 8 directions où il va, animé quand il marche. Sans planche, c'est son image fixe, sans animation. S'ils voient l'équipe, un « ! » s'affiche : ils restent surpris un peu moins d'une seconde, sans bouger, puis la poursuivent. Le combat commence quand ils la touchent.
  - **Frapper** (touche d'action devant un ennemi) : « Attaque surprise ! », les jauges de l'équipe partent en avance.
  - Un ennemi qui touche l'équipe **par derrière** : « Embuscade ! », les jauges des ennemis partent en avance (si son groupe peut attaquer en premier).
  - Sinon, le combat commence à égalité.
  - Gagné : l'ennemi disparaît jusqu'à la prochaine visite de l'étage. Fuite : il clignote quelques secondes sans pouvoir attaquer. Perdu : l'équipe se réveille à l'entrée du donjon, soignée.
- **Fermé** : hors de ses heures, l'entrée dit qu'elle est scellée et quand elle s'ouvre. À l'heure de fermeture, l'équipe est ramenée dehors.
- **Sortir** : le cristal de sauvegarde, l'escalier du dernier étage, ou une défaite ramènent l'équipe là où elle est entrée, avec la météo du dehors.
- **Les sauvegardes de partie** gardent le donjon : l'étage, les salles tirées, les coffres ouverts. Les coffres des étages faits à la main restent ouverts pour toujours ; ceux des étages générés, le temps de la visite.

## Un exemple : la Grotte de cristal

Le jeu contient un donjon complet, à ouvrir dans les éditeurs pour voir comment tout s'assemble :

- **L'accès** : l'entrée de grotte au sud-ouest de la ville (carte du monde), un objet avec un passage vers « Donjon : Grotte de cristal ».
- **La fiche** (Base de données → Donjons) : toujours ouvert, météo **Brume de cristal**, arène de la grotte, 3 étages, tous faits à la main. « Ancienne mine » (`grotte-de-cristal`), puis « Galeries » : quatre cartes reliées par leurs portes (Salle des géodes, d'où l'on part ; à l'ouest la Galerie des mineurs, un cul-de-sac avec un coffre gardé par un golem immobile ; à l'est le Couloir éboulé, puis le Lac souterrain et son escalier), enfin « Cœur de cristal », où le Gardien attend, immobile. Les ennemis, les coffres et les cristaux de sauvegarde sont posés à la main ; rien n'est tiré au hasard.
- **Les cartes** : murs en style **Grotte** (voir [04](04-reliefs.md#le-style-des-murs--roche-ou-grotte)), heure **figée à 23 h** pour que les cristaux et les lanternes brillent toujours.
- **Les décors** (palette Objets, familles Cristaux, Grotte, Mine) : cristaux de 5 formes en 3 couleurs qui brillent dans leur couleur, rochers, stalagmites, et les restes de la mine (rails, wagonnets, étais, lanternes, pioches, caisses).
- **Les ennemis** (Base de données → Ennemis et Groupes) : dix ennemis de la grotte, du Gluant cristallin au Gardien de cristal, l'élément **Terre**, leurs compétences et leur butin.

## La planche de marche d'un ennemi

Une image PNG de **8 lignes**, une par direction dans cet ordre : bas, bas gauche, gauche, haut gauche, haut, haut droite, droite, bas droite ; et une **colonne par pas** (4 dans le jeu). La première colonne sert aussi à l'arrêt. Les cases ont la taille qu'on veut, la même pour toute la planche : un pixel de l'image est un pixel de la carte, et le héros fait 16×24. Un gluant tient dans 16×17, le Gardien de cristal dans 56×64. Les pieds sont en bas de la case ; une bande vide sous un ennemi volant le fait flotter.

Dans la fiche de l'ennemi, **Choisir une planche** lit le PNG et devine la taille des cases (hauteur ÷ 8, largeur ÷ 4) ; les trois réglages se corrigent ensuite.

Les planches de la Grotte de cristal viennent de PixelLab : un petit personnage par ennemi (8 directions, nommé « … (carte) »), une marche de 4 images par direction, assemblés par un script. Sources : `design-resources/cave/walk/`.

## Essayer un donjon

**Menu → Essayer un donjon** liste les donjons de la base et leurs étages ; **Lancer** fait entrer l'équipe tout de suite à cet étage, même si le donjon est fermé à cette heure. Le jeu relie les salles, place les ennemis, les coffres et l'escalier comme en vrai. La sortie (ou la défaite) ramène là où on était. **Équipe de test** remplace l'équipe de la partie le temps de l'essai : on coche les personnages (4 au plus), on règle leur niveau et leurs niveaux d'éléments, ou on met tout le monde au même niveau avec **Appliquer** (les éléments passent alors à la moitié du niveau). La fenêtre indique le niveau des ennemis du donjon. L'équipe de la partie revient à la sortie. Depuis un étage, on peut relancer un autre étage par le même menu.

Ouvrir une salle depuis le gestionnaire de cartes sert à la dessiner, pas à la jouer : ses portes ne sont reliées à rien tant qu'on n'est pas entré dans le donjon.

## Les fichiers

| Fichier | Rôle |
|---|---|
| `src/app/modules/database-editor/sheets/dungeon-sheet/` | La fiche du donjon |
| `game/shared/services/dungeon.service.ts` | Le donjon en jeu : entrer, étages, salles reliées, ennemis, coffres, pièges, interrupteurs, portes, sortie |
| `game/shared/model/dungeon-object.ts` | Les objets de l'onglet Donjon (`dg:<sorte>`) et les ennemis sur la carte (`foe:<groupe>`), leurs images |
| `game/shared/model/dungeon-state.ts` | Ce qui est gardé (`pk-dungeon`) : coffres ouverts, donjon en cours |
| `game/dungeon-chip/` | Le bandeau du donjon |
| `game/dungeon-try/` | Menu → Essayer un donjon (étage, équipe de test) |
| `battle/team-setup/` | Le choix d'une équipe d'essai (aussi dans Simuler un combat) |
| `src/assets/dungeon/*.png` | Les images des objets (dessinées avec PixelLab et à la main) |
