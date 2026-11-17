# Cartes, sauvegarde et export

## Les cartes

Le bouton au nom de la carte ouverte (en haut, avec l'icône de carte) ouvre le **gestionnaire de cartes** : un panneau à droite, ou un panneau qui monte du bas sur téléphone en portrait (maquette : `design/map-manager.pen`).

- **Toucher une carte** l'ouvre dans l'éditeur : elle remplace la carte affichée, le joueur et la caméra vont à son point d'arrivée. Le jeu se rouvre sur la dernière carte ouverte.
- Chaque carte indique son type (Monde, Ville, Intérieur, Donjon), sa taille en morceaux, et si elle est **Ouverte**, **Modifiée** (carte du code changée dans le navigateur) ou **Navigateur** (créée ici, pas encore dans le code).
- **…** déplie ses actions : **Renommer**, **Dupliquer** (« (copie) »), **Exporter**, et **Réinit.** pour une carte du code (oublie ses modifications) ou **Supprimer** pour une carte du navigateur. Ces deux dernières demandent un second appui (« Confirmer ? », 3 secondes) ; supprimer la carte ouverte ramène sur la carte du monde.
- **Nouvelle carte** : un nom, un type, une taille choisie en glissant sur une grille de 6 × 4 morceaux (un morceau : 512 unités, 32 × 32 cases), en herbe. Son identifiant vient du nom (`grotte-de-cristal`), son point d'arrivée est au milieu. Elle s'ouvre aussitôt.

## Sauvegarde automatique

Chaque changement (et chaque annuler / refaire) est enregistré dans le navigateur, 400 ms plus tard pour regrouper une série (`map-storage.ts`, clé `pk-maps`). Le jeu a **plusieurs cartes** (liste du code : `src/assets/map/maps.ts`, la carte du monde par défaut) ; le navigateur garde une entrée par carte modifiée ou créée. Au chargement d'une carte (`loadMap`), sa copie du navigateur **remplace** celle du code ; un morceau présent dans le code garde sa place et ses sols du code.

Pour chaque carte : son nom, son type (monde, ville, intérieur, donjon), son point d'arrivée, et tous ses morceaux avec leurs objets (sans les données d'exécution comme le modèle résolu), leurs tuiles, leurs hauteurs, leurs escaliers. Les modifications de la première version (clé `pk-map-edits`, carte du monde seule) sont reprises une fois dans la nouvelle clé ; les tuiles renommées sont converties au chargement (`LEGACY_TILE_IDS`).

Passer d'une carte à l'autre : l'instruction **téléporter** accepte une carte (`map`, son identifiant) ; sans point d'arrivée (`pos`), le joueur arrive au point d'arrivée de la carte. La carte quittée est enregistrée et retirée de la scène, la nouvelle est construite à sa place (`GameMapService.travel`).

## Exporter

**Exporter** (dans les actions de la carte) télécharge le fichier de la carte ouverte, `<id>.ts`, à mettre dans `src/assets/map/<id>/` (la carte du monde : `src/assets/map/world/world.ts`). Il déclare une constante par morceau (`PC_PALLET_TOWN`…) puis la carte (`WORLD_MAP`). Une nouvelle carte s'ajoute ensuite à la liste de `src/assets/map/maps.ts`.

Le fichier est écrit par un petit générateur de code (`toSource`) :

- les petits objets plats (positions, tailles) sur une ligne, le reste indenté ;
- les énumérations écrites par leur nom (`PlayerDirection.DOWN`, `KeyCode.confirm`, `InstructionType.MESSAGE`) plutôt que leur nombre ;
- les grilles creuses en objets : `tiles: { '3,5': 'sand' }`, `heights: { '13,9': 1 }`, `stairs: { '16,15': 'n' }`.

Le fichier du code générait certains objets en boucle (`[...].map(...)`) : l'export les écrit un par un, il est donc plus long, mais équivalent.

**Vérification** : générer l'export avec Node depuis les données du dépôt (bundle esbuild), le placer dans un fichier temporaire, et le compiler avec `tsc`.

## Réinitialiser

**Réinit.** (deux appuis : « Confirmer ? » pendant 3 secondes) oublie la copie du navigateur d'une carte du code ; ouverte, elle est reconstruite telle qu'elle est dans le code. À faire après avoir exporté et commité, ou si la carte du code a été modifiée à la main (la copie du navigateur passerait par-dessus).
