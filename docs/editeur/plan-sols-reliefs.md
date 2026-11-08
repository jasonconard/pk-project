# Plan : raccords de sols et reliefs dans l'éditeur de carte

## Contexte

L'éditeur de carte (touche B) sait déjà :
- poser, sélectionner, déplacer et supprimer des objets ;
- peindre des tuiles de 16 unités au sol ;
- sauvegarder dans le navigateur et exporter le fichier `.ts`.

Il manque trois choses :
- **Des raccords entre sols.** Aujourd'hui, une case de sable posée sur de l'herbe a des bords nets.
- **Des reliefs**, dans l'eau et en montagne.
- **Retirer la tuile « Fleurs »**, puisque l'objet 3D Fleurs existe déjà.

La source graphique est `design-resources/…Tileset 2.png` (Rouge Feu / Vert Feuille). Ce sont des tuiles de 16 px sur une grille au pas de 17 px : la case (col, ligne) commence à `x = 1 + 17·col`, `y = 1 + 17·ligne`. Le fichier `…Animated Tiles.png` contient les animations, en particulier celle de l'eau.

Une fois validé, ce plan sera copié dans `docs/editeur/plan-sols-reliefs.md`.

## État d'avancement (8 novembre 2026)

- **Étape 1 faite.** Les terrains sont dans `shared/model/Terrain.ts`. Les bords et coins de chaque tuile ont été repérés **automatiquement** : chaque tuile reçoit une « signature » qui dit quelles zones (4 bords, 4 coins) montrent l'herbe, calculée à partir des couleurs de la planche. La planche est copiée dans `src/assets/tex/tileset.png`.
- **Étape 2 faite**, sauf la taille de pinceau et le pot de peinture. `autotile()` choisit la variante dont la signature est la plus proche des voisins, et peindre une case redessine ses 8 voisines.
- **Étape 3 faite.**
  - L'eau bloque le joueur (`SceneService.checkGroundCollisions`).
  - L'eau est animée : 8 images de `src/assets/tex/tileset-anim.png`, lignes « Sea » (y = 32) et « Deep Sea » (y = 66), à x = 121 + 17·k.
  - Le sable contre l'eau forme une plage (`shoreVariants`, lignes 27–28).
  - Un modèle de rocher existe (`assets/models/md-rock.ts`).
- **Étape 4 à faire**, en plusieurs prompts.

## Ce que permet le tileset (repéré sur la planche)

| Zone (col, ligne) | Contenu | Usage prévu |
|---|---|---|
| 0–4, 0–2 | Sable / chemin avec bords et coins d'herbe | Raccords herbe ↔ sable |
| 0–4, 3–5 | Herbe claire avec bords | Raccords herbe ↔ herbe claire |
| 0–4, 6–8 | Terre avec bords d'herbe | Raccords herbe ↔ terre |
| 0–4, 9–11 | Herbe mouchetée avec bords | Variante |
| 0–4, 12–17 | Dalles et pavés avec bords | Raccords herbe ↔ dalles / pavés |
| 0–4, 24–26 | Gravier avec bords | Raccords herbe ↔ gravier |
| 0–4, 27–28 | Sable et rivage d'eau | Plages (sable ↔ eau) |
| 6–8, 4–9 | Rebords rocheux bruns (bords, coins) | Corniches et falaises basses (sauts à la Pokémon) |
| 10–12, 0–9 | Mare avec berges rocheuses | Raccords herbe ↔ eau |
| 10–12, 11–17 | Eau profonde, vagues, rochers dans l'eau, cascade | Eau, rochers à poser |
| Partie droite (x ≈ 320–460, y ≈ 255–680) | Grandes parois de montagne, escaliers, entrées de grotte | Falaises de montagne, escaliers |
| `Animated Tiles.png` | Eau animée (et fleurs) | Animation de l'eau |

Chaque terrain se présente sous forme de blocs 3×3 (centre, 4 bords, 4 coins extérieurs) plus des coins intérieurs. C'est le format classique de l'**autotiling** : chaque case garde son terrain, et c'est l'affichage qui choisit la variante en fonction des cases voisines.

## Étapes

### 1. Catalogue de terrains à partir de la planche
- Charger la planche entière comme **atlas** au lieu de PNG séparés. Le dossier `src/assets/tex/tiles/` sera remplacé par une copie de la planche dans `src/assets/tex/tileset.png`.
- Créer `shared/model/Terrain.ts`. Chaque terrain y déclare :
  - `id`, `label` ;
  - les cases de l'atlas pour le centre, les 4 bords, les 4 coins extérieurs et les 4 coins intérieurs ;
  - `blocking` (l'eau bloque le passage) ;
  - `priority` : le terrain de priorité haute dessine sa bordure par-dessus celui de priorité basse.
- Vérifier chaque bloc sur une planche agrandie et numérotée (méthode déjà utilisée), puis noter les coordonnées.
- Retirer « Fleurs » de `GROUND_TILES` (`shared/model/GroundTile.ts`).

### 2. Raccords automatiques (autotiling)
- **Données inchangées** : `chunk.tiles` contient toujours `'col,ligne' → terrain`. Une case vide garde le sol d'origine (herbe).
- **Affichage** : dans `MapHelper.drawCell` (`shared/model/MapHelper.ts`), on calcule un masque à partir des 8 voisins. On pioche ensuite le bord ou le coin du terrain de plus haute priorité qui touche la case, et on le dessine par-dessus.
- **Voisins à redessiner** : peindre une case redessine la case et ses 8 voisines (`paintCell`), y compris dans le morceau de carte voisin. Il faudra donc un `cellAt` global, qui existe déjà, plus un repli de bord en bord.
- **Pinceau** : on garde `MapEditorService.paintAt` et l'historique (un trait = une action). On ajoute une **taille de pinceau** (1, 2 ou 3 cases) et un **remplissage** (pot de peinture).

### 3. L'eau
- **Bloquante** : une grille de collisions par case, tirée des terrains `blocking`, est vérifiée dans `SceneService.checkCollisions` (`shared/services/scene.service.ts`) en plus des bâtiments.
- **Animée** : les cases d'eau des morceaux visibles sont redessinées toutes les 250 ms à partir de `Animated Tiles.png`. Il faut garder la liste des cases d'eau par morceau pour ne pas tout repeindre.
- **Rivages** : utilisation des berges (10–12, 0–9) et des plages (0–4, 27–28) grâce à l'autotiling.
- **Rochers dans l'eau** : de nouveaux modèles `SceneModel` (plans texturés depuis l'atlas, sur le même principe que `assets/models/md-*.ts`), non traversables, ajoutés à la palette.

### 4. Reliefs : niveaux de hauteur
- **Données** : `chunk.heights?: Record<'col,ligne', niveau>`, avec un niveau de 8 unités, comme le pas du joueur.
- **Sol** : le quad unique (`BasicMeshService.makePlaneFromPoints`) est remplacé par une **grille de 32×32 cases** par morceau. Chaque case est à sa hauteur, et des **parois verticales** apparaissent quand deux cases voisines n'ont pas le même niveau. Les coordonnées de texture renvoient vers le canvas peint, donc on garde le même canvas et `applyWeatherShader`.
- **Texture des parois** : les tuiles de rebord (6–8, 4–9) pour un niveau, les parois de montagne (partie droite) au-delà.
- **Joueur** : il suit déjà la hauteur du sol grâce au rayon vertical de `GameMapService.inputLoop` (`shared/services/game-map.service.ts`). On bloque les montées de plus d'un niveau et on autorise le **saut vers le bas** sur un rebord, en réutilisant l'animation d'envol de la météo (`WeatherHelper.updateFlight`) en plus petit.
- **Éditeur** : un outil « Hauteur » (clic pour monter d'un niveau, clic droit pour descendre, pinceau 1 à 3 cases) et un outil « Escalier » qui pose les tuiles d'escalier et autorise le passage entre deux niveaux.

### 5. Sauvegarde, export, migration
- `map-storage.ts` :
  - ajouter `heights` ;
  - passer `STORAGE_VERSION` à 2, avec une migration des anciens identifiants de tuiles (`grass`, `sand`… vers les terrains) ;
  - inclure `heights` dans `exportChunksFile`.
- Le fichier exporté reste lisible : les grilles creuses sont écrites en objet `{ 'col,ligne': … }`.

### 6. Finitions
- Aperçu du pinceau à la taille choisie (le carré orange `brush` de `MapEditorService`).
- Palette organisée en onglets : Objets / Sols / Reliefs.
- Documentation dans `docs/editeur/` (une page par outil, dans le style de `docs/meteo`).

## Ordre conseillé (un prompt par étape)

1 → 2 (le plus visible) → 3 → 4 (le plus gros) → 5 (à faire au fil des étapes, à vérifier à la fin) → 6.

## Fichiers principaux

- `src/app/modules/game/shared/model/MapHelper.ts` : rendu du sol (canvas, grille, parois), `cellAt`, `paintCell`.
- `src/app/modules/game/shared/services/map-editor.service.ts` : outils pinceau, remplissage, hauteur, escalier.
- `src/app/modules/game/shared/services/map-storage.ts` : sauvegarde, export, migration.
- `src/app/modules/game/shared/services/scene.service.ts` et `game-map.service.ts` : collisions, hauteurs, saut.
- `src/app/modules/game/shared/model/SceneMap.ts` : `tiles`, `heights`.
- `src/app/modules/game/editor-bar/` : palette à onglets, taille du pinceau.
- Nouveaux fichiers : `shared/model/Terrain.ts`, `src/assets/tex/tileset.png`, modèles de rochers dans `src/assets/models/`.

## Vérification (à chaque étape)

- `npx tsc --noEmit -p tsconfig.app.json` et `npx ng build --configuration development`.
- Test dans le navigateur (serveur de test sur le port 4300, données sauvegardées effacées avant et après) :
  - peindre un carré de sable dans l'herbe, vérifier sur une capture que les 4 bords et les 4 coins sont raccordés ;
  - effacer une case au milieu et vérifier les coins intérieurs ;
  - faire avancer le joueur vers l'eau et vérifier qu'il est bloqué ;
  - monter un plateau de 2 niveaux, vérifier les parois, que le joueur ne peut pas y monter, qu'il peut en sauter et qu'il peut prendre l'escalier ;
  - recharger la page (sauvegarde), puis exporter et vérifier que le fichier compile (méthode déjà utilisée : génération avec Node, puis `tsc` sur un fichier temporaire).
