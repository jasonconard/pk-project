# Éditeur de modèles 3D

Un écran à part pour créer et modifier les modèles (bâtiments, panneaux, fleurs…) avec des formes simples et des textures pixel art. On l'ouvre avec **Modèles** dans la barre de l'éditeur de carte. **Modifier le modèle** dans le panneau d'un objet sélectionné ouvre directement son modèle. L'adresse est `/#/modeles` (ou `/#/modeles?id=house`).

## Le principe : une grille de pixels par face

Un modèle est fait de **boxes** (6 faces) et de **planes** (1 face, visible des deux côtés si on le veut). Chaque face a sa propre grille de pixels, **de la taille de la face** : 1 unité = 1 pixel, partout. Une box de 76 × 31 × 30 a une face avant de 76 × 31 px et des côtés de 30 × 31 px. On ne touche jamais aux UV : à l'export, l'éditeur range toutes les faces dans une image (l'atlas) et calcule les UV.

## Deux modes

En haut, **Modélisation** / **Dessin** :

- **Modélisation** : choisir, déplacer, redimensionner les formes. Sections **Modèle**, **Formes** et la forme choisie.
- **Dessin** : peindre les faces. Sections **Modèle**, **Calque**, **Outils**, **Couleur** et **Face**.

## Sur ordinateur

Maquette : `design/model-editor-mobile.pen` (écrans « Desktop »).

- **Barre du haut** : **‹ Jeu**, le choix du modèle, « Enregistré », le choix du mode (au centre), annuler / refaire et **Exporter**.
- **Panneau de droite** : les sections du mode, repliables (mémorisées dans le navigateur). Leurs actions sont dans leur en-tête : **+ Box** / **+ Plane** pour Formes ; dupliquer, tourner de 90° et supprimer pour la forme choisie ; **Importer** une palette pour Couleur. En bas, les raccourcis clavier du mode.
- Sur la vue 3D, une bulle rappelle ce que fait la souris.

## Sur téléphone

Sous 700 px de large, l'écran change :

- en haut : **‹ Jeu**, le nom du modèle (il ouvre la section Modèle), annuler / refaire, puis le choix du mode ;
- **Modélisation** : toucher une forme affiche une carte avec ses flèches (x −, x +, y +, y −, z −, z +), **Dupliquer**, **Tourner 90°**, **Supprimer** et **⚙ Réglages** ; la barre du bas ouvre **Modèle**, **Formes** et **Ajouter** ;
- **Dessin** : **3D / Face** en haut à droite (Face : la face en plein écran pour dessiner à un doigt ; deux doigts zooment en pinçant et déplacent la face, le bouton agrandir revient à toute la face) ; en bas, la couleur actuelle (la toucher : couleur libre), les couleurs récentes, le bouton palette (toutes les couleurs) et les outils ; la barre du bas ouvre **Modèle**, **Calque** et **Face** ;
- chaque section s'ouvre en volet par le bas ; **✕** (toujours visible en haut du volet), la poignée, le glisser vers le bas ou Échap le ferment. La section **Face** permet de choisir une face par son nom (Avant, Dessus…), sans viser en 3D ;
- **Lier à…** / **Copier vers…** : un bandeau demande de toucher la face cible, avec **Annuler** ;
- pincer à deux doigts sur le modèle zoome, même en dessinant.

## La vue 3D

- **Glisser** : tourner autour du modèle · **Molette** : zoom · **Clic droit glissé** : déplacer la vue.
- **Clic sur une face** (mode Modélisation, touche V) : la sélectionne (contour jaune). Les **flèches** déplacent la forme par pas de 1.
- La grille au sol fait 1 unité.

## Les formes

Les formes sont listées (Box 1, Plane 1…, avec leur taille ; en pastilles sur téléphone). **+ Box**, **+ Plane** (une forme de 16, posée à droite du modèle), **Dupliquer** (Ctrl+D), **Supprimer** (Suppr, en mode Modélisation).

Propriétés de la forme sélectionnée :

| Propriété | Rôle |
|---|---|
| Taille | En unités entières (au moins 1). Les grilles des faces suivent : le dessin reste ancré en bas à gauche, les pixels ajoutés sont transparents. |
| Position, Rotation | Position libre (les flèches avancent par 1), rotation en degrés. |
| Faces visibles | Devant seulement, derrière seulement, les deux côtés. |
| Caché par les autres | Décocher pour un élément dessiné par-dessus (le texte d'un panneau). |
| Cache les autres | Décocher pour les fleurs, les herbes (elles ne cachent pas ce qui est derrière). |

Le modèle a aussi un **nom** (son id, en minuscules avec des tirets) et un réglage **Vent** (0 à 1 : plie au vent comme la végétation).

## Dessiner

Outils : **crayon** (P), **gomme** (E, rend transparent), **pipette** (I, puis retour au crayon), **pot de peinture** (F), **ligne** (L), **rectangle** (R, plein ou contour). On dessine :

- dans la **vue 2D** de la face sélectionnée (section **Face** : zoom − / + ou Ctrl + molette / pincement du trackpad, le bouton agrandir pour revoir toute la face, grille, damier sous le transparent). **Grande vue** (touche G) l'ouvre en grand par-dessus la gauche de la vue 3D, le zoom en bas ; elle reste ouverte d'une face à l'autre. Dessiner dans la vue 2D passe en mode dessin ;
- ou **directement sur le modèle 3D** : appuyer sur le modèle peint, appuyer à côté tourne la vue.

**Couleurs** : sélecteur libre, couleurs **récentes**, couleurs **du modèle** (les plus utilisées d'abord), et une **palette importée** : fichiers `.gpl`, `.pal`, `.hex` ou `.png` (Aseprite, Lospec, GIMP). **Garder seulement ces couleurs** remplace toute couleur choisie par la plus proche de la palette.

## Faces liées

Des faces **liées** partagent les mêmes pixels : dessiner sur l'une change les autres (par exemple les deux côtés d'une maison). Pour la face sélectionnée :

- **Lier à…** puis clic sur une autre face de même taille ;
- **Délier** : la face garde une copie et ne suit plus les autres ;
- **Copier vers…** puis clic sur la face cible, en miroir (gauche-droite / haut-bas) si activé (étiré si la taille diffère) ;
- les deux boutons flèches : retourner le dessin de la face (gauche-droite, haut-bas).

Échap annule un « Lier » ou un « Copier » en attente.

## Les calques

Chaque face a 4 calques, choisis par les onglets **Couleur | Brillance | Nuit | Relief** :

| Calque | Gris | Dans le jeu |
|---|---|---|
| Brillance | blanc = reflets du soleil, noir = mat | carte `xxx-specular.png` |
| Nuit | ce qui s'allume la nuit (lumière chaude) | carte `xxx-night.png`, suit la météo comme les fenêtres |
| Relief | blanc = en relief, noir = en creux (seules les différences comptent) ; réglage **Force** | carte `xxx-bump.png` |

Sur un calque gris, la palette devient 9 nuances et un curseur, et un **aperçu** en bas à droite de la vue 3D montre le modèle comme en jeu, avec la même caméra (de nuit sur le calque Nuit, de jour sinon ; bouton ☀/🌙). Sur Couleur, la case **Vue de nuit** montre le modèle la nuit.

À l'ouverture d'un modèle du jeu, la `shininess` de ses formes devient son calque Brillance, et les vitres que le jeu allume la nuit (bleu clair) deviennent son calque Nuit : le rendu reste le même.

## Annuler, sauvegarde

- **Annuler / Refaire** (Ctrl+Z, Ctrl+Y ou Ctrl+Maj+Z) : 60 étapes.
- Chaque changement est **enregistré dans le navigateur**, dans IndexedDB (base `pk-project`, table `models`, un enregistrement par modèle, les pixels gardés tels quels). La place est large (des centaines de Mo) ; l'éditeur demande au navigateur de ne pas l'effacer quand il manque de place. Les modèles enregistrés par les premières versions dans `localStorage` (`pk-model-edits`) y sont déplacés une fois.
- Un modèle du jeu modifié apparaît « (modifié) » dans la liste ; **Version du jeu** (ordinateur) ou **Revenir à la version du jeu** (téléphone) (deux clics) oublie les modifications. Les nouveaux modèles ont leur propre groupe.

**Le jeu utilise les modèles du navigateur, sans export** (`browser-models.ts`, avant de construire le jeu) : chaque modèle enregistré est converti au format du jeu (atlas et cartes en images en mémoire) et remplace le modèle du code de même id. Un nouveau modèle est ajouté, et apparaît dans la palette de l'éditeur de carte (sous son id). **← Jeu** enregistre puis recharge le jeu. L'export reste nécessaire pour mettre les modèles dans le dépôt (et pour les autres navigateurs, le site publié).

L'éditeur de modèles part toujours des modèles **du code** (`CODE_MODELS`) pour « Revenir à la version du jeu ».

## Exporter

**Exporter** télécharge :

- `md-<id>.ts` → `src/assets/models/` ;
- `<id>.png` (l'atlas), et `<id>-specular.png`, `<id>-night.png`, `<id>-bump.png` si ces calques sont peints → `src/assets/tex/`.

Le fichier `.ts` contient aussi `thumb` : la plus grande face avant, utilisée comme vignette dans la palette de l'éditeur de carte (sans elle, `texPos` dans `ModelChoice.ts`).

**Nouveau modèle** : ajouter sa constante dans `src/assets/models/models.ts`, `{ model: MD_XXX }` dans `MODEL_CHOICES` (`ModelChoice.ts`) pour la palette de la carte, et son nom français dans `MODEL_LABELS` (`editor-bar.component.ts`).

Le fichier du code générait parfois des formes en boucle (l'arbre) : l'export les écrit une par une, c'est équivalent. Une face dont le dessin était plus petit que la face (étiré) devient une grille à la vraie taille de la face.

## Les fichiers

| Fichier | Rôle |
|---|---|
| `model-editor/model-editor.component.*` | La page : panneau, outils, raccourcis, sauvegarde |
| `model-editor/pixel-canvas/` | Vue 2D d'une face (zoom, grille) |
| `model-editor/shared/EditableModel.ts` | Le modèle en cours d'édition : formes, une texture par face, calques |
| `model-editor/shared/model-editor-scene.ts` | La vue 3D : caméra, flèches, choix de la face, aperçu |
| `model-editor/shared/pixel-tools.ts` | Les outils de dessin |
| `model-editor/shared/model-ops.ts` | Formes et faces : ajouter, redimensionner, lier, copier… |
| `model-editor/shared/model-import.ts`, `model-export.ts` | Modèle du jeu ↔ modèle éditable (découpe et rangement de l'atlas) |
| `model-editor/shared/model-history.ts`, `model-storage.ts` | Annuler / refaire, enregistrement IndexedDB |
| `game/shared/model/browser-models.ts` | Le jeu prend les modèles du navigateur (appelé par la route du jeu) |
| `model-editor/shared/palette.ts`, `palette-import.ts` | Couleurs du modèle, palettes importées |
| `game/shared/model/model-uv.ts` | UV des faces (partagé avec le jeu) |
| `game/shared/services/material.service.ts` | `getModelMaterial` : utilise les cartes des calques |

(Chemins relatifs à `src/app/modules/`.)
