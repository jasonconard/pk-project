# Base de données

La base de données rassemble ce que le combat, les événements et les menus vont lire : les personnages, les ennemis et leurs groupes, les compétences, les objets, les états, les éléments, les types d'armes (voir la [feuille de route](../idees.md)).

## Ouvrir l'éditeur

En mode Créer : **Éditeurs → Base de données** (ordinateur, téléphone en paysage) ou **⋮ → Base de données** (téléphone en portrait). L'éditeur s'ouvre par-dessus le jeu ; **Jeu** le ferme.

- **Sur téléphone en portrait** : les tables en onglets en haut (Personnages, PNJ, Ennemis, Groupes, Compétences, Objets, États, Éléments, Armes, Calendrier), puis la liste. Toucher une ligne ouvre sa fiche ; **‹ Éléments** (ou le bouton retour) revient à la liste.
- **Plus large** (paysage, tablette) : la liste et la fiche côte à côte.
- **Sur ordinateur** : les tables en colonne à gauche, avec leur nombre de lignes.
- Sur les écrans larges, **Reprendre la version du jeu**, **Dupliquer** et **Supprimer** sont à droite du nom.
- **Échap** ou le bouton retour ferme ce qui est ouvert, le dernier d'abord : la liste des météos ou l'éditeur pixel, puis la fiche (téléphone), puis l'éditeur.

## La liste

- **Chercher** filtre par nom (les accents et les majuscules ne comptent pas).
- **+ Personnage** (ou + Ennemi, + Groupe, + Compétence, + Objet, + État, + Élément, + Type d'arme), en bas, ajoute une ligne et ouvre sa fiche, le nom prêt à être tapé.
- Dans la fiche : **Dupliquer** (copie juste en dessous) et **Supprimer** (la corbeille : appuyer deux fois, « Supprimer ? » pendant 3 secondes).
- **Reprendre la version du jeu** (la flèche qui tourne, seulement sur une fiche modifiée) : la fiche redevient celle du jeu, ses changements dans l'éditeur oubliés (appuyer deux fois, « Reprendre ? »). Le reste de la base ne bouge pas : pratique pour récupérer une compétence ou un ennemi mis à jour dans le jeu sans perdre ses autres réglages.

Renommer ne casse rien : ce qui utilise une ligne la retrouve par un identifiant qui ne change jamais.

## L'icône (éditeur pixel)

Chaque ligne a une icône de 16 × 16 pixels (pour un personnage : sa petite tête). Toucher l'icône de la fiche ouvre l'éditeur pixel ; il sert aussi aux portraits (96 × 96) et aux images fixes (48 × 48) des personnages et des ennemis :

- **Crayon**, **Gomme**, **Remplir** (pot de peinture), **Pipette** (reprend une couleur du dessin), **Miroir** (retourne gauche / droite).
- **La palette** : 20 couleurs, puis les autres couleurs déjà dans le dessin ; **+** choisit n'importe quelle couleur.
- **Annuler** (la flèche) défait le dernier trait.
- **Zoomer** : − et + sous les outils, deux doigts écartés ou rapprochés (téléphone), Ctrl + molette (ordinateur). Une fois zoomé, deux doigts déplacent la grille.
- **Importer un PNG** : l'image est réduite à la taille du dessin, centrée (adoucie si elle est beaucoup plus grande, comme une photo de portrait, nette sinon).
- **Tout effacer** : une icône vide redevient une pastille de couleur.
- **OK** garde le dessin ; **Fermer** (ou toucher à côté) l'oublie.

## Personnages

Les membres de l'équipe (ceux qui se battent). Les habitants sont des [PNJ](#pnj).

- **Dans l'équipe au début de la partie** : sinon, un [événement](09-evenements.md) le fait entrer (action Équipe).
- **Apparence** : la petite tête (l'icône à côté du nom, pour les menus et la jauge d'action), le **portrait** des dialogues (96 × 96, dans le style des planches de combat ; aussi sur les cartes de l'équipe en combat), l'**image fixe** (48 × 48, dans les menus), la **planche de combat** (ses animations en combat, à la Grandia, voir [Planches de combat](11-planches.md)), le **modèle 3D** sur la carte et la **planche de marche** (voir [plus bas](#planche-de-marche)) : le joueur est dessiné avec celle du chef d'équipe (le premier de l'équipe) ; sans elle, avec l'ancien sprite.
- Deux onglets :
  - **Général** :
    - **Niveaux et expérience** : niveau de départ, niveau max, et si les niveaux montent vite, normalement ou lentement ;
    - **Stats** : la valeur au niveau 1 et au niveau max ; toucher la **courbe** la change (régulière, monte tôt, monte tard) ;
    - **Au combat** : **Étourdi après un coup** (en ms, voir [Le combat](#le-combat)) ;
    - **Équipement de départ** : arme, armure, accessoire (seulement ce qu'il peut porter).
  - **Éléments et armes**, à la Grandia :
    - pour chaque élément simple et chaque type d'arme : son **niveau au départ** et sa **progression** (rapide, normal, lent, jamais) ; un élément composé suit ses deux éléments ;
    - **Ce qu'il apprendra** : les compétences qu'il connaît dès le départ, celles qu'il apprendra (ce qui manque : « Feu 2/5 · Vent 1/3 ») et celles qu'il n'apprendra jamais.
    - le bouton **Exclure** (⊘) d'une compétence la réserve aux autres personnages : celui-ci ne l'apprendra jamais, même avec les niveaux. Elle passe en bas, marquée « exclue » ; la flèche la rend de nouveau possible.

## PNJ

Les personnages non joueurs (le boulanger, le maire…) : ils ne se battent pas, ils n'ont que leur apparence. Maquette : `design/database.pen`, écran 12.

- **La petite tête** (l'icône à côté du nom, dans la liste ; sans elle, la liste montre le portrait).
- **Le portrait** des dialogues (96 × 96) : il se choisit dans l'action Message des [événements](09-evenements.md), sous « PNJ ».
- **Description** (facultative).
- **La planche de marche** (voir [plus bas](#planche-de-marche)).
- **Lien** : son rythme (rapide, normal, lent), l'**avantage** de chaque niveau (ce qu'on dit au joueur : « -5 % à la boulangerie ») et les **cadeaux** aimés (+4) et détestés (−2), les autres +1. Voir [Liens sociaux](#liens-sociaux).
- **Emploi du temps** (case « Suit un emploi du temps ») : une grille jours de la semaine × moments ; chaque case dit à quelle place il est, ou absent. Ses places sont ses poses sur les cartes (éditeur de carte, onglet PNJ ; chacune avec ses événements et son nom, « Nom de la place » dans sa fiche). Toucher le nom d'un jour met toute la journée comme le matin. **Exceptions des jours spéciaux** : un jour spécial du calendrier, ses moments (aucun : toute la journée) et la place ce jour-là. Dans le jeu, il n'est visible qu'à la place où il est (l'éditeur montre toutes ses places). Sans emploi du temps, il est toujours à toutes ses places.

Les habitants des premières versions (des personnages « Habitant ») sont passés tout seuls dans cette table, avec leur nom, leur description et leurs images.

### Planche de marche

Comment un personnage ou un PNJ marche sur la carte : une image de 48 × 96, faite de 12 images de 16 × 24 (un pixel de l'image = un pixel du décor). Une ligne par direction (Bas, Gauche, Droite, Haut) et 3 images par ligne : pied gauche, à l'arrêt (celle du milieu, encadrée), pied droit. En marchant, le personnage passe par 1, 2, 3, 2.

- **Toucher une image** l'ouvre dans l'éditeur pixel (16 × 24) ; le reste de la planche est gardé.
- **Planche entière** ouvre toute la planche (48 × 96) : pour la dessiner d'un coup ou **importer un PNG** (par exemple une planche faite avec PixelLab, à la même taille).
- L'**aperçu** le fait marcher dans les 4 directions.

## Liens sociaux

Un lien avec chaque membre de l'équipe et chaque PNJ. Maquette : `design/database.pen`, écrans 15 et 16, et `design/main-view.pen` (Liens).

- **Points et niveaux** : les événements donnent des points (action **Lien**, ou **Offrir un cadeau** à un PNJ) ; assez de points, le niveau suivant, de 1 à 10. Points pour chaque niveau : 5, 7, 10, 12, 14, 16, 18, 20, 22, 24 (Rapide : un tiers de moins ; Lent : un tiers de plus).
- **Un membre de l'équipe** (onglet **Lien** de sa fiche) : pour chaque niveau, des **bonus en combat** : une **stat en plus** (en %), une **compétence** (il la connaît en combat), de l'**expérience d'élément ou d'arme** (donnée une fois, en atteignant le niveau).
- **Un PNJ** : un avantage par niveau, et ses cadeaux (voir [PNJ](#pnj)).
- **Dans le jeu** : une carte « Lien avec Bernard · Niv. 3 → 4 » quand le lien monte, avec ce qu'apporte le nouveau niveau ; **Menu → Liens** montre chaque lien commencé (niveau, points vers le suivant, ce qu'il apporte). Les scènes de lien sont des événements avec la condition **Lien** ([Événements](09-evenements.md)).
- Les points sont gardés dans la partie (et ses sauvegardes).

## Ennemis

- **Apparence** : sa petite image dans la jauge d'action (l'icône à côté du nom), son **image fixe** (48 × 48, dans les menus et les groupes), sa **planche de combat** (ses animations, voir [Planches de combat](11-planches.md)) et son **modèle 3D** (vu sur la carte du donjon).
- **Marche sur la carte** : sa planche de marche en 8 directions, avec laquelle il est dessiné et animé sur la carte d'un donjon (voir [Donjons](12-donjons.md#la-planche-de-marche-dun-ennemi)).
- **Stats** : le niveau, puis PV, PM, Force, Magie, Endurance, Agilité, Chance.
- **Au combat** : **Étourdi après un coup** (en ms, voir [Le combat](#le-combat)).
- **Face aux éléments** : pour chaque élément, Faible (dégâts ×2), Normal, Résiste (×½), Annule (aucun dégât) ou Absorbe (le soigne).
- **Butin** : l'expérience, l'argent, et des objets avec leur chance (%).
- **Comportement** : ses compétences, chacune utilisée rarement, parfois ou souvent, toujours ou seulement **si ses PV sont sous** un pourcentage ou **pendant une météo**. Sans compétence, il attaque simplement.
- **Météo et heure** : des météos où il **apparaît** (seulement pendant celles-là) ou est **plus fort**, et les moments de la journée où il apparaît (aucun : toute la journée).

## Le combat

Ce que le combat lit dans la base :

- **Les dégâts** : puissance ÷ 10 × la stat de celui qui frappe (Force ou Magie), moins l'Endurance de la cible, ±10 %. Une compétence avec une **formule** l'utilise à la place (« a.mag * 2 - b.end »). L'**attaque** simple a une puissance de 20 (Force), avec l'élément de l'arme (sinon physique) ; l'**attaque forte** frappe 1,6 fois plus fort mais arrive plus lentement.
- **Les soins** : puissance ÷ 10 × la Magie de celui qui soigne (une potion aussi).
- **Les éléments** : Faible ×2, Résiste ×½, Annule 0, Absorbe soigne. Pour l'équipe, les résistances viennent de l'équipement porté (le bouclier de bois d'Hugo le rend faible au feu). Un élément composé sans résistance à lui prend celle de ses parties.
- **La météo** : chaque élément est plus fort ou plus faible selon la météo du combat (les pourcentages de sa fiche) ; un ennemi « plus fort » dans une météo frappe 25 % plus fort.
- **La jauge** (comme dans Grandia) : à **2/5**, un ennemi décide de sa prochaine action (s'il prépare un sort, il brille et son jeton devient violet) ; à **4/5** (COM, un point fixe), un membre de l'équipe choisit sa commande (le combat attend) ; de 4/5 à la fin, une **compétence se charge** pendant son temps d'incantation : le lanceur joue son animation « incantation » (dans un cercle azur pour ceux qui en ont un sur leur planche) et son jeton avance lentement jusqu'à la fin de la jauge, alors qu'une attaque, un objet ou la défense partent tout de suite ; à la fin, l'action se joue.
- **Les PM** : payés au moment d'agir ; une compétence trop chère est grisée.
- **Les états** : au début de chaque tour, leurs PV / PM gagnés ou perdus, leur chance de faire perdre le tour (sommeil, paralysie) ; ils durent leur nombre de tours. Ceux qui finissent quand on est touché (sommeil) s'arrêtent au premier coup.
- **Les armes à distance** : un type d'arme coché « Attaque à distance » (l'arc) tire de loin : le personnage qui en porte une attaque de là où il est, une flèche vole jusqu'à la cible et le coup tombe quand elle arrive.
- **Le temps** : les jauges avancent pendant qu'un combattant agit, et plusieurs peuvent agir en même temps ; seul le choix d'une commande par un membre de l'équipe met tout le combat en pause. **Une compétence ou une magie** (pas les attaques) est mise en scène : quand elle part, tout s'arrête (jauges, déplacements, animations des autres), son nom s'affiche en gros sous la jauge et la caméra s'approche du lanceur ; il joue la compétence, la caméra passe sur la cible (le milieu de la zone pour plusieurs cibles) le temps de voir les chiffres, puis le combat reprend : les touchés jouent leur « coup reçu » et le lanceur repart du début de sa jauge. Un combattant touché joue son animation « coup reçu » en clignotant en rouge : sa jauge s'arrête (même s'il charge une compétence) jusqu'à la fin de cette animation ; s'il marchait, il s'arrête aussi. Un combattant **étourdissable** (« Étourdi après un coup » sur sa fiche, en millisecondes, 0 par défaut) reste arrêté au moins ce temps et « Étourdi » s'affiche ; juste après (1,5 s), un nouveau coup ne l'étourdit pas, pour qu'il ne reste pas bloqué. Après avoir agi, chacun va se placer à un endroit libre tout près (dans le terrain, loin des autres) et se tourne vers le camp d'en face.
- **Interrompre** : une **attaque forte** qui touche un combattant pendant qu'il charge sa compétence ou qu'il marche vers sa cible **annule** son action et le renvoie à 2/5 (« Interruption : Venin ») ; plus tôt sur la jauge, elle le **retarde** un peu. Celui qui se défend n'est pas interrompu. Les ennemis peuvent le faire aussi. Un point violet marque, dans la liste des cibles, ceux qu'on peut interrompre.
- **Viser** : la cible visée clignote sur le terrain et sur la jauge, la caméra s'approche d'elle, et sa fenêtre montre ses PV, ses états, sa prochaine action quand elle est décidée (« interruptible » pendant qu'elle se charge ou qu'elle marche) et, pour un ennemi, ses faiblesses et résistances. ◀ ▶ (ou les flèches) changent de cible, Viser (ou Entrée) confirme, Retour (ou Échap) revient aux commandes ; toucher un combattant le vise, le toucher encore confirme.
- **La fin** : une **victoire** ouvre une fenêtre avec l'expérience et l'argent gagnés, les objets trouvés (selon leur chance) et, pour chaque membre de l'équipe, son niveau, les éléments et types d'armes qu'il a utilisés (leurs points, un niveau atteint) et les compétences apprises ; une **défaite** a sa fenêtre aussi. Toucher (ou Entrée) la ferme.
- **La progression** : chaque membre garde, d'un combat à l'autre (et dans les sauvegardes), son niveau et son expérience (selon sa courbe : monte vite, normal, lentement), ses PV et PM, les états qui restent après le combat (poison) et ses niveaux dans les éléments et les armes. Une compétence utilisée fait grandir les niveaux avec lesquels elle s'apprend (sinon son élément) ; une attaque, le type de l'arme portée ; l'affinité (rapide, normal, lent, jamais) et l'équipement (« progresse plus vite ») changent les points. Ceux qui sont tombés se relèvent avec 1 PV, sans expérience.
- **Les ennemis** : à leur tour, une de leurs compétences selon leur poids (rarement, parfois, souvent) et leur condition (PV sous…, pendant une météo), ou une attaque simple.

## Groupes

Un groupe, ce sont les ennemis qu'on rencontre ensemble (un événement « lancer un combat » choisira un groupe).

- **Terrain de combat**, vu de dessus : les ennemis se placent dans la moitié du haut ; on les **fait glisser** pour les déplacer. Toucher un ennemi propose **Dupliquer** et la corbeille. La moitié du bas montre les places de l'équipe.
- **Ennemis du groupe** : combien de chaque (− et +), **+ Ennemi** en ajoute un autre ; 8 au plus.
- **Combat** : la **musique** (une musique de l'éditeur de musique, sinon la musique de combat), **On peut fuir**, **Il peut attaquer par surprise**.
- Sans icône, la liste montre son premier ennemi.

## Compétences

- **Description** : facultative.
- **Élément** : celui de ses dégâts (les faiblesses et la météo en dépendent).
- **S'apprend quand**, à la Grandia : le niveau qu'un personnage doit avoir dans un élément simple ou un type d'arme (« Feu niv. 2 », « Épée niv. 4 »), deux au plus. Une compétence d'un élément composé demande un niveau dans ses deux éléments (Orage : Feu 5 + Vent 3). En choisissant l'élément d'une compétence qui n'a pas encore de niveau, le jeu en propose : les deux éléments d'un élément composé, l'élément lui-même, ou le premier type d'arme pour le Physique. Sans niveau, la compétence ne s'apprend pas toute seule (un événement ou un objet la donnera).
- **Coût en PM** et **Cible** : les ennemis, l'équipe ou soi-même.
- **Zone d'effet** : **cible unique** ; **autour de la cible**, avec son **rayon** (un curseur de 10 à 70, par pas de 2 ; les crans Petite 20, Moyenne 32 et Grande 48 le règlent d'un toucher ; les combattants se tiennent à environ 26 l'un de l'autre) : les autres du même camp dans le cercle sont touchés aussi (jamais l'autre camp) ; ou **tout le terrain** (tous les ennemis, toute l'équipe). Pendant la visée, la zone est un cercle orange au sol et ceux qu'elle attrape clignotent avec la cible.
- **Portée** : au contact, courte, moyenne, longue ou illimitée. Si la cible est plus loin, le lanceur marche jusqu'à la bonne distance avant d'agir ; au contact, il va jusqu'à elle (un coup). Sans réglage : au contact pour une compétence qui ne frappe qu'avec la Force, sinon illimitée.
- **Animation** : l'effet de la compétence, joué pendant sa mise en scène. Une image découpée en cases de même taille : la **1re ligne** est l'effet (l'impact, un nuage, un éclair), la **2e** le projectile en vol. **Jouée** : **sur la cible** (sur chaque touché), **projectile puis impact** (le projectile part du lanceur, vole jusqu'à chaque cible, puis l'effet joue sur elle) ou **sur la zone** (un seul effet au centre de la zone, étiré à sa taille ; tout le terrain : autour des touchés). Réglages : la taille d'une case (les images sont comptées à l'import et quand elle change), la durée par image, l'**image du coup** (les dégâts, les soins et les états tombent à ce moment), le **son** joué au début de l'effet (l'explosion de la boule de feu ; il s'entend quand on le choisit) ; un aperçu la joue en boucle. Sans animation, les effets tombent sur l'image du lancer du lanceur.
- **Temps d'incantation** : de 0 (immédiat) à 5 secondes, par demi-seconde. La jauge montre la part de l'incantation avant l'action : plus c'est lent, plus un ennemi a le temps de l'interrompre en frappant.
- **Utilisable** : en combat, hors combat, ou les deux (un soin).
- **Effets**, dans l'ordre (les flèches les déplacent) :
  - **Dégâts** de l'élément de la compétence, selon la Force ou la Magie de celui qui l'utilise, avec une puissance ;
  - **Soin** : rend des PV ou des PM, avec une puissance ;
  - **Donner un état**, avec une chance en % ; **Guérir un état** ;
  - **Stat** : une stat montée ou baissée en %, pendant quelques tours.
- **Formule (pour les cas spéciaux)** : remplace la puissance des dégâts et des soins, par exemple `a.mag * 2 - b.end` (a = celui qui l'utilise, b = la cible ; stats : hp, mp, str, mag, end, agi, luck, level). Une formule mal écrite est signalée en orange.

Supprimer un élément fait passer ses compétences en Physique ; supprimer un élément, un type d'arme ou un état retire les niveaux, les effets, les résistances et les bonus qui le nommaient (dans les compétences, les objets et les personnages). Supprimer un objet le retire de l'équipement de départ ; supprimer un personnage le retire de « Qui peut le porter » ; supprimer une compétence la retire des compétences exclues et du comportement des ennemis ; supprimer un objet le retire aussi de leur butin ; supprimer un ennemi le retire des groupes.

## Objets

- **Dans la liste**, les filtres **Tous**, **Consommables**, **Équipement**, **Objets clés**, **Cadeaux** n'affichent qu'une sorte d'objet ; **+ Objet** crée alors un objet de cette sorte.
- **Sorte d'objet** : Consommable, Équipement, Objet clé ou Cadeau. Changer de sorte garde ce qui a déjà été réglé (on peut revenir en arrière).
- **Prix** : en pièces ; l'objet se revend moitié prix. 0 : il ne s'achète pas et ne se vend pas. Un objet clé n'a pas de prix.
- **Consommable** : **Utilisable** (en combat, hors combat, les deux), **Cible**, et des **effets** comme une compétence (sans les dégâts), plus deux qui sont propres aux objets :
  - **Stat pour toujours** : une stat montée pour de bon (une graine) ;
  - **Expérience** : de l'expérience dans un élément simple ou un type d'arme, comme les œufs de mana de Grandia.
- **Équipement** :
  - **Emplacement** : Arme, Armure ou Accessoire ;
  - une arme a un **type d'arme** (frapper avec fait monter ce niveau) et l'élément de **ses attaques** (Physique sinon) ;
  - **Bonus de stats** (+ ou −) ;
  - **Face aux éléments** : Faible ×2, Résiste ×½, Annule ou Absorbe ;
  - **Progresse plus vite** : un élément ou un type d'arme qui gagne plus d'expérience tant qu'on porte l'objet (en %).
  - **Qui peut le porter** : les membres de l'équipe choisis (personne de choisi : tout le monde).
- **Objet clé** : pour l'histoire, il ne se vend pas et ne s'utilise pas ; les événements pourront le donner et vérifier qu'on l'a.
- **Cadeau** : à offrir aux habitants ; ce que chacun aime arrivera avec les liens sociaux.

## Éléments

- **Couleur** : sert dans les listes et plus tard en combat.
- **Simple ou Composé** : un élément composé est fait de deux éléments simples, par exemple **Feu + Vent = Foudre**. Ses compétences s'apprendront avec un niveau dans les deux, et les feront monter tous les deux. Supprimer un des deux rend l'élément composé simple.
- **Plus fort par / Plus faible par** : les météos qui changent les dégâts de l'élément, en % (de 5 à 100 %). **+ Météo** ouvre la liste des météos, avec un champ pour chercher (Entrée prend la première) ; **✕** retire une météo. En combat, c'est la météo du donjon qui comptera.
- **Le Physique** ne se supprime pas et ne sert pas à composer : il compte seulement pour les dégâts et les résistances. Les compétences physiques s'apprennent avec les types d'armes.

## Types d'armes

Épée, arc, poings, bâton… Pour les coups physiques, ils jouent le rôle des éléments pour la magie : frapper avec un type d'arme fait monter son niveau, qui débloque des coups spéciaux (avec les compétences, bientôt). La fiche : le nom, l'icône, une description facultative.

- **Attaque à distance** : le personnage tire de là où il est, sans aller jusqu'à sa cible (un arc).
- **Animation des attaques** : jouée par l'attaque et l'attaque forte de ceux qui portent ce type d'arme, **à part de leur planche de combat** (la planche montre le geste, l'animation la flèche). Même format que l'animation d'une compétence : la 1re ligne l'impact, la 2e la flèche en vol. **Jouée** : **projectile puis impact** (la flèche part du tireur et vole jusqu'à sa cible) ou **sur la cible** (une entaille). Le coup tombe sur l'image du coup. L'**Arc** a la sienne : une flèche avec une petite traînée, puis une étincelle sur la cible. Sans animation, une arme à distance tire une simple flèche.

## États

- **Durée** : en tours ; 0 = tout le combat.
- **Reste après le combat** : il faut le soigner (comme le poison).
- **Se termine quand on est touché** : comme le sommeil.
- **Effets**, à empiler :
  - **PV par tour** et **PM par tour** : en % du maximum, perdus (−) ou gagnés (+) à chaque tour ;
  - **Stat** : une stat montée (+) ou baissée (−) en %, tant que l'état dure ;
  - **Passe son tour** : la chance (%) de perdre son tour.

## Au départ

Sans rien changer, la base contient 7 compétences (Boule de feu, Lance de glace, Orage, Soin, Venin, Coup double, Berceuse), 9 objets (Potion, Remède, Graine de force, Cristal de feu, Épée courte, Bouclier de bois, Amulette de glace, Clé rouillée, Boîte à musique), 2 personnages (Hugo et Jason), 3 ennemis (Gluant, Chauve-souris, Gluant des neiges), 3 groupes (Gluants de la forêt, Nuée, Gluants des neiges), 7 éléments (Physique, Feu, Glace, Vent, Foudre = Feu + Vent, Lumière, Ténèbres), 4 types d'armes (Épée, Arc, Poings, Bâton) et 5 états (Poison, Brûlure, Sommeil, Paralysie, Force +), avec leurs icônes.

## Pendant la partie

Les [événements](09-evenements.md) donnent et retirent des objets et de l'argent, font entrer ou sortir des personnages de l'équipe et lancent des combats contre les groupes ; leurs conditions vérifient ce que l'équipe a. L'équipe (membres, objets, argent) est gardée dans le navigateur, et dans les [sauvegardes de partie](05-sauvegarde-export.md#sauvegarde-de-partie). **Tout remettre au début** (Menu → Test des variables) la remet comme au début d'une partie.

## Simuler un combat

Pour essayer un combat sans écrire d'événement : **Menu → Simuler un combat**, pendant la partie.

- **Ennemis** : le groupe à combattre (ses ennemis sont écrits dessous).
- **Lieu** : **Ici, où est le joueur**, ou une carte : le combat a lieu à son point d'arrivée, puis le joueur revient où il était.
- **Équipe** : cocher jusqu'à 4 personnages ; pour chacun, son **niveau** (− / +) et son niveau dans chaque élément (les éléments « jamais » ne sont pas proposés). Au départ : les personnages du début de partie, à leurs niveaux de départ.
- **Lancer** : le combat commence, avec la météo du moment. Les objets du sac sont utilisables.
- **Rien n'est gardé** : à la fin (victoire, défaite ou fuite), l'équipe, ses niveaux, ses objets et l'argent redeviennent comme avant.
- Les choix sont retenus pour la simulation suivante.

## Calendrier

Le calendrier du jeu : une seule fiche (l'onglet l'ouvre directement). Maquette : `design/database.pen`, écran 13.

- **Forme du calendrier** : un modèle, **Réel** (12 mois, de janvier à décembre) ou **Saisons** (4 saisons de 28 jours, comme Stardew Valley), à toucher deux fois (il remplace la semaine et les mois). Changer la semaine ou les mois à la main donne un calendrier **Libre**.
- **Semaine** : le nombre de jours (1 à 10) et leurs noms.
- **Mois · saisons** : chacun a un nom, un nombre de jours, une couleur et une icône ; les flèches changent leur ordre, + Mois en ajoute. Le total d'une année s'affiche.
- **Début de la partie** : le mois, le jour et l'heure où commence une nouvelle partie, le jour de la semaine du 1er jour de l'an 1, et la durée d'une journée en temps réel (12 minutes par défaut).
- **Les moments de la journée** : l'heure où commencent le matin, l'après-midi, le soir et la nuit (6 h, 12 h, 18 h, 22 h par défaut), avec la barre des 24 heures.
- **Jours spéciaux** : un nom, une couleur, quand il revient (chaque année à une date, chaque mois un jour, chaque semaine un jour de la semaine) et ses moments (aucun : toute la journée).

Dans le jeu :

- **L'horloge** (en haut à gauche) affiche la date (« Ven. 5 printemps ») et, dessous, le moment, l'heure et la température. Un bandeau annonce chaque nouveau moment (« Le soir tombe »).
- **Les jours** avancent quand l'heure passe minuit ; une journée dure le temps réglé ici. Le temps s'arrête pendant les dialogues et les combats, sur une carte réglée ainsi ([Cartes](05-sauvegarde-export.md)), et après l'action « Arrêter le temps ».
- **Menu → Agenda** : le mois (le jour d'aujourd'hui, les jours spéciaux en couleur), la journée en moments (celui en cours, les jours spéciaux de chaque moment) et les prochains jours spéciaux.
- **Les événements** : conditions jour, date, moment, jour spécial ; actions « Faire passer le temps » et « Arrêter / reprendre le temps » ([Événements](09-evenements.md)).
- **Les sauvegardes de partie** gardent la date.

## Donjons

Un donjon : ses heures d'ouverture (moments, jours spéciaux), sa météo, ses étages (une carte faite à la main, ou générés à partir de salles), les groupes d'ennemis et leur nombre, les coffres des étages générés et leur butin, les points de sauvegarde. Maquette : `design/database.pen`, écran 17. Voir [Donjons](12-donjons.md).

## Boutiques

Une boutique : son vendeur (un PNJ), ce qu'elle rachète, la réduction du lien, les objets vendus (prix propre, stock du jour, moments et conditions, niveau de lien). Ouverte par l'action « Ouvrir la boutique » d'un événement. Maquette : `design/database.pen`, écrans 18 et 19. Voir [Boutiques](16-boutiques.md).

## Cultures

Une culture : sa graine, ses 4 images de pousse (16 × 24) et leurs jours, sa récolte (objet, combien, repousse ou non), ses mois, si elle craint le gel, les météos qui la font pousser plus vite. Un objet clé peut être un **outil** (houe, arrosoir). Maquette : `design/database.pen`, écran 20. Voir [Cultures](17-cultures.md).

## Sauvegarde et export

- Chaque changement est enregistré dans le navigateur (« Enregistré » sous le titre).
- La base est dans le [projet de jeu](05-sauvegarde-export.md#projet-de-jeu-fichier-pk) (fichier `.pk`).
- **Exporter** (en haut à droite) télécharge `database.ts`, à mettre dans `src/assets/database/` : c'est la base du jeu pour tout le monde. Celle du navigateur passe devant.

## Dans le code

| Fichier | Rôle |
|---|---|
| `src/app/modules/database-editor/database-editor.component.*` | L'éditeur : les onglets, la liste, le haut de la fiche (icône, nom, couleur), les fenêtres par-dessus |
| `src/app/modules/database-editor/sheets/<table>-sheet/` | Une fiche par table (calendrier, personnage, PNJ, ennemi, groupe, compétence, objet, état, élément, type d'arme) |
| `src/app/modules/database-editor/shared/db-sheet.ts` | Ce que les fiches partagent (`DbSheet`) : les constantes, les noms des éléments, compétences, météos… |
| `src/app/modules/database-editor/shared/database-store.ts` | La base en cours de modification et son enregistrement (`DatabaseStore`) |
| `src/app/modules/database-editor/effects-editor/` | Les effets d'une compétence ou d'un objet |
| `src/app/modules/database-editor/learn-select/` | Le choix d'un élément simple ou d'un type d'arme |
| `src/app/modules/database-editor/_sheets.scss` | Le style des champs des fiches (commun) |
| `src/app/modules/database-editor/walk-field/`, `shared/walk-sheet.ts` | La planche de marche dans les fiches (grille, aperçu), une image découpée ou remise dans la planche |
| `src/app/modules/game/shared/model/player-look.ts` | Le joueur dessiné avec la planche du chef d'équipe (`PlayerService` choisit l'image) |
| `src/app/modules/database-editor/pixel-editor/` | L'éditeur pixel (icônes 16 × 16, portraits, images fixes) |
| `src/app/modules/database-editor/sheet-editor/`, `shared/sprite-sheet.ts` | Les planches de combat (voir [11-planches](11-planches.md)) |
| `src/app/modules/battle/battle-sim/` | Simuler un combat (Menu) : l'équipe choisie passe par `BattleService.simulateNext` |
| `src/app/modules/database-editor/stepper/` | Le champ − nombre + |
| `src/app/modules/database-editor/shared/database.ts` | Les types (`DbCharacter`, `DbNpc`, `DbEnemy`, `DbGroup`, `DbSkill`, `DbItem`, `DbElement`, `DbWeapon`, `DbState`, `STATS`), les règles (éléments composés, niveaux proposés, formule, suppression) |
| `src/app/modules/database-editor/shared/database-storage.ts` | Le navigateur (`pk-database`), sinon le code |
| `src/app/modules/database-editor/shared/party.ts` | L'équipe dans la partie (`pk-party`) : membres, objets, argent |
| `src/assets/database/database.ts` | La base du jeu (`CODE_DATABASE`), écrite par l'export |
