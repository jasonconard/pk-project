# Éditeur de carte

L'éditeur permet de modifier la carte directement dans le jeu : poser des bâtiments et des éléments de nature, peindre le sol, créer des reliefs et des escaliers. Les modifications sont sauvegardées dans le navigateur, puis exportées en fichier `.ts` à remettre dans le dépôt.

## Pages

1. [Prise en main](01-prise-en-main.md) : ouvrir l'éditeur, la caméra, l'interface, les raccourcis.
2. [Objets](02-objets.md) : poser, sélectionner, déplacer, supprimer, options.
3. [Sols et raccords](03-sols-raccords.md) : terrains, raccords automatiques, eau, plages, pinceau.
4. [Reliefs et escaliers](04-reliefs.md) : niveaux, parois, escaliers, déplacements du joueur.
5. [Sauvegarde et export](05-sauvegarde-export.md) : stockage navigateur, export, réinitialisation.

Le [plan des sols et reliefs](plan-sols-reliefs.md) retrace la construction étape par étape.

## Les fichiers

| Fichier | Rôle |
|---|---|
| `src/app/modules/game/editor-bar/` | Interface : bouton, historique, panneau de l'objet sélectionné, palette à onglets |
| `shared/services/map-editor.service.ts` | Le cœur de l'éditeur : caméra libre, souris, outils, historique |
| `shared/services/map-storage.ts` | Sauvegarde navigateur, export en TypeScript |
| `shared/model/MapHelper.ts` | La carte en 3D : objets, sol peint (canvas), sol en relief |
| `shared/model/Terrain.ts` | Catalogue des terrains et calcul des raccords (`autotile`) |
| `shared/model/GroundMesh.ts` | Géométrie du sol en relief (cases, parois, escaliers) |
| `src/assets/tex/tileset.png`, `tileset-anim.png` | Planches de tuiles (sol, eau animée) |

(Chemins `shared/…` relatifs à `src/app/modules/game/`.)
