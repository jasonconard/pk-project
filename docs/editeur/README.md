# Éditeur de carte

L'éditeur permet de modifier la carte directement dans le jeu : poser des bâtiments et des éléments de nature, peindre le sol, créer des reliefs et des escaliers. Les modifications sont sauvegardées dans le navigateur, puis exportées en fichier `.ts` à remettre dans le dépôt.

## Pages

1. [Prise en main](01-prise-en-main.md) : ouvrir l'éditeur, la caméra, l'interface, les raccourcis.
2. [Objets](02-objets.md) : poser, sélectionner, déplacer, supprimer, options, passages vers une carte.
3. [Sols et raccords](03-sols-raccords.md) : terrains, raccords automatiques, eau, plages, pinceau.
4. [Reliefs et escaliers](04-reliefs.md) : niveaux, parois, escaliers, déplacements du joueur.
5. [Cartes, sauvegarde et export](05-sauvegarde-export.md) : gestionnaire de cartes (créer, ouvrir, renommer, dupliquer), zones (ajouter, retirer), point d'arrivée, stockage navigateur, export, réinitialisation.
6. [Éditeur de modèles 3D](06-modeles.md) : créer les modèles avec des boxes et des planes, les peindre en pixel art, calques brillance / nuit / relief, export.
7. [Éditeur de musique](07-musique.md) : composer les musiques avec des tampons sur une grille (à la Mario Paint), gammes, batterie, lecture en boucle.
8. [Éditeur de variables](08-variables.md) : les drapeaux et compteurs de l'histoire, leur valeur au début, export.
9. [Événements](09-evenements.md) : faire parler un objet, zones invisibles, déclencheurs, conditions (variables, heure, météo) et actions.
10. [Base de données](10-base-de-donnees.md) : personnages (apparence, niveaux, stats, éléments et armes à la Grandia), ennemis (faiblesses, butin, comportement, météo) et groupes (placés sur le terrain), compétences (coût, incantation, effets, niveaux pour les apprendre), objets (consommables, équipement, objets clés, cadeaux), états, éléments (simples ou composés, liés aux météos), types d'armes, icônes en pixel art, export.
11. [Planches de combat](11-planches.md) : les animations d'un personnage ou d'un ennemi en combat (attente, marche, attaques, incantation, magie, coup reçu, mort), le découpage de l'image, l'aperçu.
12. [Donjons](12-donjons.md) : la fiche d'un donjon (heures d'ouverture, météo, étages faits à la main ou générés à partir de salles), l'onglet Donjon (coffres, pièges, interrupteurs, portes fermées, escaliers, portes de salle, cristal de sauvegarde), les ennemis visibles sur la carte.
13. [Cinématiques](13-cinematiques.md) : une ligne de temps sur la carte (caméra, personnages qui marchent, bulles, fondus, bandes noires, messages, musique), jouée par un événement ; passer, accélérer, une seule fois.
14. [Mode test](14-mode-test.md) : essayer une scène depuis l'éditeur, un événement, une cinématique ou le menu, avec le jour, les variables, l'équipe et les liens voulus ; ta partie revient comme avant en quittant.
15. [Zones d'action](15-zones-action.md) : où le joueur agit sur un objet (la porte de la maison, le devant d'un panneau) : des cases et un côté, dans le modèle, sur la carte ou pour un événement.
16. [Boutiques](16-boutiques.md) : une boutique dans la base de données (vendeur, objets, prix, stock du jour, moments, réduction du lien), ouverte par un événement ; acheter et vendre en jeu.

Le [plan des sols et reliefs](plan-sols-reliefs.md) retrace la construction étape par étape.

## Les fichiers

| Fichier | Rôle |
|---|---|
| `src/app/modules/game/editor-bar/` | Interface : bouton, historique, panneau de l'objet sélectionné, palette à onglets |
| `shared/services/map-editor.service.ts` | Le cœur de l'éditeur : caméra libre, souris, sélection, objets, morceaux de carte |
| `shared/services/map-editor/` | La grille des cases (`editor-grid`), l'historique annuler / rétablir (`edit-history`), les contours des morceaux et le point d'arrivée (`editor-markers`), la peinture du sol (`ground-painter`) |
| `shared/services/map-storage.ts` | Sauvegarde navigateur, export en TypeScript |
| `shared/model/MapHelper.ts` | La carte en 3D : morceaux de carte, objets |
| `shared/model/ChunkGround.ts` | Le sol : cases peintes (canvas), eau animée, reliefs, escaliers |
| `shared/model/mesh-fading.ts` | Les objets qui s'effacent (trop près de la caméra, trop loin, joueur derrière) |
| `shared/model/Terrain.ts` | Catalogue des terrains et calcul des raccords (`autotile`) |
| `shared/model/GroundMesh.ts` | Géométrie du sol en relief (cases, parois, escaliers) |
| `src/assets/tex/tileset.png`, `tileset-anim.png` | Planches de tuiles (sol, eau animée) |

(Chemins `shared/…` relatifs à `src/app/modules/game/`.)
