# Base de données

La base de données rassemble ce que le combat, les événements et les menus vont lire : les compétences, les objets, les états, les éléments, les types d'armes. Les personnages, les ennemis et les groupes arrivent ensuite (voir la [feuille de route](../idees.md)).

## Ouvrir l'éditeur

En mode Créer : **Éditeurs → Base de données** (ordinateur, téléphone en paysage) ou **⋮ → Base de données** (téléphone en portrait). L'éditeur s'ouvre par-dessus le jeu ; **Jeu** le ferme.

- **Sur téléphone en portrait** : les tables en onglets en haut (Compétences, Objets, États, Éléments, Armes), puis la liste. Toucher une ligne ouvre sa fiche ; **‹ Éléments** (ou le bouton retour) revient à la liste.
- **Plus large** (paysage, tablette) : la liste et la fiche côte à côte.
- **Sur ordinateur** : les tables en colonne à gauche, avec leur nombre de lignes.
- Sur les écrans larges, **Dupliquer** et **Supprimer** sont à droite du nom.
- **Échap** ou le bouton retour ferme ce qui est ouvert, le dernier d'abord : la liste des météos ou l'éditeur pixel, puis la fiche (téléphone), puis l'éditeur.

## La liste

- **Chercher** filtre par nom (les accents et les majuscules ne comptent pas).
- **+ Compétence** (ou + Objet, + État, + Élément, + Type d'arme), en bas, ajoute une ligne et ouvre sa fiche, le nom prêt à être tapé.
- Dans la fiche : **Dupliquer** (copie juste en dessous) et **Supprimer** (la corbeille : appuyer deux fois, « Supprimer ? » pendant 3 secondes).

Renommer ne casse rien : ce qui utilise une ligne la retrouve par un identifiant qui ne change jamais.

## L'icône (éditeur pixel)

Chaque ligne a une icône de 16 × 16 pixels. Toucher l'icône de la fiche ouvre l'éditeur pixel :

- **Crayon**, **Gomme**, **Remplir** (pot de peinture), **Pipette** (reprend une couleur du dessin), **Miroir** (retourne gauche / droite).
- **La palette** : 20 couleurs, puis les autres couleurs déjà dans le dessin ; **+** choisit n'importe quelle couleur.
- **Annuler** (la flèche) défait le dernier trait.
- **Zoomer** : − et + sous les outils, deux doigts écartés ou rapprochés (téléphone), Ctrl + molette (ordinateur). Une fois zoomé, deux doigts déplacent la grille.
- **Importer un PNG** : l'image est réduite à 16 × 16, sans flou.
- **Tout effacer** : une icône vide redevient une pastille de couleur.
- **OK** garde le dessin ; **Fermer** (ou toucher à côté) l'oublie.

## Compétences

- **Description** : facultative.
- **Élément** : celui de ses dégâts (les faiblesses et la météo en dépendent).
- **S'apprend quand**, à la Grandia : le niveau qu'un personnage doit avoir dans un élément simple ou un type d'arme (« Feu niv. 2 », « Épée niv. 4 »), deux au plus. Une compétence d'un élément composé demande un niveau dans ses deux éléments (Orage : Feu 5 + Vent 3). En choisissant l'élément d'une compétence qui n'a pas encore de niveau, le jeu en propose : les deux éléments d'un élément composé, l'élément lui-même, ou le premier type d'arme pour le Physique. Sans niveau, la compétence ne s'apprend pas toute seule (un événement ou un objet la donnera).
- **Coût en PM** et **Cible** (un ennemi, tous les ennemis, un allié, toute l'équipe, soi-même).
- **Temps d'incantation** : de 0 (immédiat) à 5 secondes, par demi-seconde. La jauge montre la part de l'incantation avant l'action : plus c'est lent, plus un ennemi a le temps de l'interrompre en frappant.
- **Utilisable** : en combat, hors combat, ou les deux (un soin).
- **Effets**, dans l'ordre (les flèches les déplacent) :
  - **Dégâts** de l'élément de la compétence, selon la Force ou la Magie de celui qui l'utilise, avec une puissance ;
  - **Soin** : rend des PV ou des PM, avec une puissance ;
  - **Donner un état**, avec une chance en % ; **Guérir un état** ;
  - **Stat** : une stat montée ou baissée en %, pendant quelques tours.
- **Formule (pour les cas spéciaux)** : remplace la puissance des dégâts et des soins, par exemple `a.mag * 2 - b.end` (a = celui qui l'utilise, b = la cible ; stats : hp, mp, str, mag, end, agi, luck, level). Une formule mal écrite est signalée en orange.

Supprimer un élément fait passer ses compétences en Physique ; supprimer un élément, un type d'arme ou un état retire les niveaux, les effets, les résistances et les bonus qui le nommaient (dans les compétences et les objets).

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
  - Qui peut le porter arrivera avec les personnages.
- **Objet clé** : pour l'histoire, il ne se vend pas et ne s'utilise pas ; les événements pourront le donner et vérifier qu'on l'a.
- **Cadeau** : à offrir aux habitants ; ce que chacun aime arrivera avec les liens sociaux.

## Éléments

- **Couleur** : sert dans les listes et plus tard en combat.
- **Simple ou Composé** : un élément composé est fait de deux éléments simples, par exemple **Feu + Vent = Foudre**. Ses compétences s'apprendront avec un niveau dans les deux, et les feront monter tous les deux. Supprimer un des deux rend l'élément composé simple.
- **Plus fort par / Plus faible par** : les météos qui changent les dégâts de l'élément, en % (de 5 à 100 %). **+ Météo** ouvre la liste des météos, avec un champ pour chercher (Entrée prend la première) ; **✕** retire une météo. En combat, c'est la météo du donjon qui comptera.
- **Le Physique** ne se supprime pas et ne sert pas à composer : il compte seulement pour les dégâts et les résistances. Les compétences physiques s'apprennent avec les types d'armes.

## Types d'armes

Épée, arc, poings, bâton… Pour les coups physiques, ils jouent le rôle des éléments pour la magie : frapper avec un type d'arme fait monter son niveau, qui débloque des coups spéciaux (avec les compétences, bientôt). La fiche : le nom, l'icône, une description facultative.

## États

- **Durée** : en tours ; 0 = tout le combat.
- **Reste après le combat** : il faut le soigner (comme le poison).
- **Se termine quand on est touché** : comme le sommeil.
- **Effets**, à empiler :
  - **PV par tour** et **PM par tour** : en % du maximum, perdus (−) ou gagnés (+) à chaque tour ;
  - **Stat** : une stat montée (+) ou baissée (−) en %, tant que l'état dure ;
  - **Passe son tour** : la chance (%) de perdre son tour.

## Au départ

Sans rien changer, la base contient 7 compétences (Boule de feu, Lance de glace, Orage, Soin, Venin, Coup double, Berceuse), 9 objets (Potion, Remède, Graine de force, Cristal de feu, Épée courte, Bouclier de bois, Amulette de glace, Clé rouillée, Boîte à musique), 7 éléments (Physique, Feu, Glace, Vent, Foudre = Feu + Vent, Lumière, Ténèbres), 4 types d'armes (Épée, Arc, Poings, Bâton) et 5 états (Poison, Brûlure, Sommeil, Paralysie, Force +), avec leurs icônes.

## Sauvegarde et export

- Chaque changement est enregistré dans le navigateur (« Enregistré » sous le titre).
- La base est dans le [projet de jeu](05-sauvegarde-export.md#projet-de-jeu-fichier-pk) (fichier `.pk`).
- **Exporter** (en haut à droite) télécharge `database.ts`, à mettre dans `src/assets/database/` : c'est la base du jeu pour tout le monde. Celle du navigateur passe devant.

## Dans le code

| Fichier | Rôle |
|---|---|
| `src/app/modules/database-editor/database-editor.component.*` | L'éditeur (onglets, liste, fiches) |
| `src/app/modules/database-editor/pixel-editor/` | L'éditeur pixel 16 × 16 |
| `src/app/modules/database-editor/stepper/` | Le champ − nombre + |
| `src/app/modules/database-editor/shared/database.ts` | Les types (`DbSkill`, `DbItem`, `DbElement`, `DbWeapon`, `DbState`, `STATS`), les règles (éléments composés, niveaux proposés, formule, suppression) |
| `src/app/modules/database-editor/shared/database-storage.ts` | Le navigateur (`pk-database`), sinon le code |
| `src/assets/database/database.ts` | La base du jeu (`CODE_DATABASE`), écrite par l'export |
