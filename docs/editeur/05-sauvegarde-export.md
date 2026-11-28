# Cartes, sauvegarde et export

## Les cartes

Le bouton au nom de la carte ouverte (en haut, avec l'icône de carte) ouvre le **gestionnaire de cartes** : un panneau à droite, ou un panneau qui monte du bas sur téléphone en portrait (maquette : `design/map-manager.pen`).

- **Toucher une carte** l'ouvre dans l'éditeur : elle remplace la carte affichée, le joueur et la caméra vont à son point d'arrivée. Le jeu se rouvre sur la dernière carte ouverte.
- **Les sections** : les cartes sont rangées par sorte dans des sections repliables, avec leur nombre : **Monde et villes**, **Intérieurs**, **Donjons** (donjons et salles), **Arènes**. Le bouton **Section** en crée une à toi (« Mes essais », « Chapitre 2 »…) ; on y range une carte depuis ses réglages. Le crayon d'une section la renomme ; un nom vide la retire, ses cartes retournent dans la section de leur sorte. Le champ **Chercher une carte** ne garde que les cartes dont le nom correspond.
- Chaque carte indique sa sorte (Monde, Ville, Intérieur, Donjon, Salle : un morceau d'étage généré, voir [Donjons](12-donjons.md), Arène : voir [Arènes](21-arenes.md)), sa taille en zones, et si elle est **Ouverte**, **Modifiée** (carte du code changée dans le navigateur) ou **Navigateur** (créée ici, pas encore dans le code).
- Le bouton de réglages d'une carte (à droite de sa ligne) ouvre **Réglages de la carte** ; tout s'applique aussitôt :
    - **Nom**, **Sorte** (six tuiles) et **Section** (celle de sa sorte, une des tiennes, ou **Nouvelle**) ;
    - **Le temps sur cette carte** : **Passe** (comme dehors), **S'arrête** (l'horloge reste à l'heure d'entrée : un donjon) ou **Figé** à une heure réglée avec − et + (toujours la même heure, quelle que soit l'heure dehors ; en revenant dehors, l'heure reprend où elle en était) ;
    - **L'équipe suit le joueur** (interrupteur ; éteint : seul le chef d'équipe est dessiné sur cette carte, voir [L'équipe qui suit](18-equipe.md)) ;
    - **Murs des reliefs** (Falaise droite, Roche inclinée ou Grotte : l'allure des parois et des escaliers, voir [04](04-reliefs.md#le-style-des-murs--roche-ou-grotte)) ;
    - **Transition à l'arrivée** (voir [Transitions](20-transitions.md)) et **Arène de combat** (voir [Arènes](21-arenes.md)) : toucher la ligne ouvre la liste des choix, le choix actuel est coché ;
    - **Actions** : **Dupliquer** (« (copie) »), **Exporter**, et **Réinitialiser** pour une carte du code (oublie ses modifications) ou **Supprimer** pour une carte du navigateur. Ces deux dernières demandent un second appui (« Confirmer ? », 3 secondes) ; supprimer la carte ouverte ramène sur la carte du monde.
- **Nouvelle carte** : un nom, un type, une taille choisie en glissant sur une grille de 6 × 4 zones (une zone : 512 unités, 32 × 32 cases), en herbe. Son identifiant vient du nom (`grotte-de-cristal`), son point d'arrivée est au milieu. Elle s'ouvre aussitôt.

## Les zones

Une carte est faite de **zones** de 512 × 512 unités (32 × 32 cases), posées sur une grille (dans le code : les *chunks*). L'onglet **Zones** de la palette :

- **Ajouter** : les places libres touchant la carte sont entourées en vert (avec un « + ») ; un clic / une touche y pose une zone d'herbe. Les zones existantes sont entourées en blanc.
- **Retirer** : un clic / une touche sur une zone la retire avec ce qu'elle contient. Impossible pour la dernière, celle où se tient le joueur et celle du point d'arrivée.
- **Arrivée** : un clic / une touche sur le sol place le **point d'arrivée** de la carte (repère jaune dans l'éditeur) : là où arrive un passage sans point choisi, et où commence une carte rouverte.
- Annuler / refaire marchent pour les trois. Avec un outil de zones, le zoom va plus loin (jusqu'à 5) pour voir plusieurs zones ; il revient au zoom habituel avec un autre outil.
- Une zone ajoutée s'appelle `<carte>-<colonne>-<rangée>` (`m1` pour -1) : c'est aussi le nom de sa constante dans le fichier exporté.

**Seules les zones proches sont construites** (`MapHelper.updateVisibleChunks`) : celles qu'on peut voir tout de suite, celles juste autour une par une (pas d'à-coup en marchant), et celles qui sont loin sont défaites (mémoire libérée). Une grande carte du monde reste légère.

## Sauvegarde automatique

Chaque changement (et chaque annuler / refaire) est enregistré dans le navigateur, 400 ms plus tard pour regrouper une série (`map-storage.ts`, clé `pk-maps`). Le jeu a **plusieurs cartes** (liste du code : `src/assets/map/maps.ts`, la carte du monde par défaut) ; le navigateur garde une entrée par carte modifiée ou créée. Au chargement d'une carte (`loadMap`), sa copie du navigateur **remplace** celle du code ; une zone présente dans le code garde sa place et ses sols du code.

Pour chaque carte : son nom, son type (monde, ville, intérieur, donjon, salle), son point d'arrivée, et toutes ses zones avec leurs objets (sans les données d'exécution comme le modèle résolu), leurs tuiles, leurs hauteurs, leurs escaliers. Les modifications de la première version (clé `pk-map-edits`, carte du monde seule) sont reprises une fois dans la nouvelle clé ; les tuiles renommées sont converties au chargement (`LEGACY_TILE_IDS`).

Passer d'une carte à l'autre : l'instruction **téléporter** accepte une carte (`map`, son identifiant) ; sans point d'arrivée (`pos`), le joueur arrive au point d'arrivée de la carte. La carte quittée est enregistrée et retirée de la scène, la nouvelle est construite à sa place (`GameMapService.travel`).

## Exporter

**Exporter** (dans les actions de la carte) télécharge le fichier de la carte ouverte, `<id>.ts`, à mettre dans `src/assets/map/<id>/` (la carte du monde : `src/assets/map/world/world.ts`). Il déclare une constante par zone (`PC_PALLET_TOWN`…) puis la carte (`WORLD_MAP`). Une nouvelle carte s'ajoute ensuite à la liste de `src/assets/map/maps.ts`.

Le fichier est écrit par un petit générateur de code (`toSource`) :

- les petits objets plats (positions, tailles) sur une ligne, le reste indenté ;
- les énumérations écrites par leur nom (`PlayerDirection.DOWN`, `KeyCode.confirm`, `InstructionType.MESSAGE`) plutôt que leur nombre ;
- les grilles creuses en objets : `tiles: { '3,5': 'sand' }`, `heights: { '13,9': 1 }`, `stairs: { '16,15': 'n' }`.

Le fichier du code générait certains objets en boucle (`[...].map(...)`) : l'export les écrit un par un, il est donc plus long, mais équivalent.

**Vérification** : générer l'export avec Node depuis les données du dépôt (bundle esbuild), le placer dans un fichier temporaire, et le compiler avec `tsc`.

## Projet de jeu (fichier `.pk`)

Pour passer **toutes les créations** d'un appareil à l'autre (téléphone ↔ ordinateur) : **Menu → Projet de jeu**.

- En ouvrant **Projet de jeu**, le panneau montre ce que contient l'appareil : « Sur cet appareil : 3 cartes · 12 modèles · 4 musiques · 5 variables · 85 ko ».
- **Exporter** télécharge `pk-projet-<date>.pk` : les cartes modifiées ou créées, les modèles de l'éditeur de modèles, les musiques (avec leurs choix par moment et par carte), les [variables](08-variables.md), la [base de données](10-base-de-donnees.md) et les [tests gardés](14-mode-test.md), tels qu'ils sont enregistrés dans le navigateur. Le message donne ce qu'il contient et sa taille.
- **Sur l'application Android**, le bouton s'appelle **Envoyer…** : il ouvre la fenêtre de partage d'Android pour envoyer le fichier où on veut (Drive, mail, Bluetooth, Fichiers…). Fermer la fenêtre sans choisir affiche « Envoi annulé ».
- **Importer…** : on choisit un fichier `.pk`, le jeu montre ce qu'il contient (« Ce fichier : 3 cartes · 12 modèles · 4 musiques · 5 variables · du 19/11/2026 · 85 ko ») et ce qu'il va remplacer (« Sera remplacé : … »), puis demande de confirmer. **Remplacer** efface les créations de l'appareil, met celles du fichier à la place et relance le jeu. **Annuler** ne change rien.
- Un fichier qui n'est pas un projet, ou fait avec une version plus récente du jeu, est refusé avec un message.
- Les réglages (ambiance, qualité, son) ne sont pas dans le projet : ils restent propres à chaque appareil.
- **Tout remettre à zéro** : efface tout ce que l'appareil garde (cartes, modèles, musiques, variables, base de données, tests, parties sauvegardées, réglages) et relance le jeu, comme à la première visite. Le jeu demande de confirmer (**Tout effacer** ou **Annuler**). Rien ne peut être récupéré ensuite : exporter d'abord le projet pour le garder.

Dans le code : `project-file.ts` (format `pk-project` version 1 : JSON compressé en gzip, les pixels des modèles en base64). Sur Android, `shareProjectFile` écrit le fichier dans le cache de l'application (`@capacitor/filesystem`) puis le partage (`@capacitor/share`). Le sélecteur de fichiers d'Android plante sur une extension qu'il ne connaît pas : l'import n'y filtre donc pas sur `.pk`. Il s'appuie sur `map-storage.ts` (`storedMapsData` / `replaceStoredMaps`), `model-storage.ts` (`replaceStoredModels`) `song-storage.ts` (`storedSongsData` / `replaceStoredSongs`) et `variable-storage.ts` (`storedVariablesData` / `replaceStoredVariables` ; absent des fichiers plus anciens, qui s'importent toujours). La remise à zéro est `resetEverything` (`clearStore` de `local-store.ts` et les modèles vidés).

## Sauvegarde de partie

Pour garder où en est la partie : **Menu → Sauver** (pendant le jeu ; grisé depuis l'éditeur). Trois emplacements.

- Un emplacement montre la carte, l'heure du jeu, la météo et quand il a été sauvé (« Carte du monde · 07:38 · Neutre », « Sauvée le 19 nov. à 16:02 »).
- **Sauver ici** remplit un emplacement vide. **Écraser** remplace une sauvegarde par la partie en cours.
- **Charger** ramène à la sauvegarde : la carte, la position du joueur, l'heure, la météo, la valeur des [variables](08-variables.md) et l'équipe (ses membres, ses objets, son argent). La partie en cours est perdue si elle n'a pas été sauvée.
- **Écraser**, **Charger** et la corbeille demandent deux appuis (pendant 3 secondes ; le texte sous les emplacements dit ce qui va se passer).
- Si la carte d'une sauvegarde n'existe plus, le joueur revient à la carte de départ.
- Pendant un [test](14-mode-test.md), on ne peut ni sauver ni charger.
- Les sauvegardes restent sur l'appareil : elles ne sont pas dans le projet de jeu (ce sont les parties, pas les créations).

Dans le code : `game-saves/` (la fenêtre), `shared/services/game-saves.ts` (les emplacements, `pk-saves`), `GameService.playerSpot` / `restoreSpot`, et `variables-editor/shared/variable-values.ts` (la valeur des variables dans la partie, `pk-variable-values`).

## Réinitialiser

**Réinit.** (deux appuis : « Confirmer ? » pendant 3 secondes) oublie la copie du navigateur d'une carte du code ; ouverte, elle est reconstruite telle qu'elle est dans le code. À faire après avoir exporté et commité, ou si la carte du code a été modifiée à la main (la copie du navigateur passerait par-dessus).
