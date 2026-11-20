# Base de données

La base de données rassemble ce que le combat, les événements et les menus vont lire : les éléments, les types d'armes, les états. Les compétences, les objets, les personnages, les ennemis et les groupes arrivent ensuite (voir la [feuille de route](../idees.md)).

## Ouvrir l'éditeur

En mode Créer : **Éditeurs → Base de données** (ordinateur, téléphone en paysage) ou **⋮ → Base de données** (téléphone en portrait). L'éditeur s'ouvre par-dessus le jeu ; **Jeu** le ferme.

- **Sur téléphone en portrait** : les tables en onglets en haut (Éléments, Armes, États), puis la liste. Toucher une ligne ouvre sa fiche ; **‹ Éléments** (ou le bouton retour) revient à la liste.
- **Plus large** (paysage, tablette) : la liste et la fiche côte à côte.
- **Sur ordinateur** : les tables en colonne à gauche, avec leur nombre de lignes.
- Sur les écrans larges, **Dupliquer** et **Supprimer** sont à droite du nom.
- **Échap** ou le bouton retour ferme ce qui est ouvert, le dernier d'abord : la liste des météos ou l'éditeur pixel, puis la fiche (téléphone), puis l'éditeur.

## La liste

- **Chercher** filtre par nom (les accents et les majuscules ne comptent pas).
- **+ Élément** (ou + Type d'arme, + État), en bas, ajoute une ligne et ouvre sa fiche, le nom prêt à être tapé.
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

Sans rien changer, la base contient 7 éléments (Physique, Feu, Glace, Vent, Foudre = Feu + Vent, Lumière, Ténèbres), 4 types d'armes (Épée, Arc, Poings, Bâton) et 5 états (Poison, Brûlure, Sommeil, Paralysie, Force +), avec leurs icônes.

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
| `src/app/modules/database-editor/shared/database.ts` | Les types (`DbElement`, `DbWeapon`, `DbState`, `STATS`), les règles (éléments composés, suppression) |
| `src/app/modules/database-editor/shared/database-storage.ts` | Le navigateur (`pk-database`), sinon le code |
| `src/assets/database/database.ts` | La base du jeu (`CODE_DATABASE`), écrite par l'export |
