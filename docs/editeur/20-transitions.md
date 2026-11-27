# Transitions

Quand la carte change, ou quand un combat commence ou finit, l'image peut être couverte par une transition : elle se ferme, le changement se fait derrière, puis l'image revient.

## Choisir les transitions

**Éditeurs → Base de données → Réglages** : une ligne par cas, avec la transition jouée et un bouton **Voir** qui la montre tout de suite par-dessus l'éditeur.

| Cas | Quand | Réglage de départ |
|---|---|---|
| **Changement de carte** | Un passage, une téléportation vers une autre carte, l'entrée et la sortie d'un donjon, un étage ou une salle suivante | Fondu au noir |
| **Entrée en combat** | Au début d'un combat (action Combat, ennemi d'un donjon, piège, Simuler un combat) | Éclair et bandes |
| **Sortie de combat** | À la fin du combat, après la fenêtre de fin, ou après une fuite | Fondu au noir |

Une téléportation sur la même carte garde son petit fondu d'avant. **Aucune** fait le changement directement.

## Une transition propre à un lieu ou à un groupe

Ces réglages sont ceux de tout le jeu. Deux endroits permettent d'en choisir une autre ; « Celle des réglages » y remet la transition générale.

- **Un lieu** : gestionnaire de cartes → **…** d'une carte → **Transition à l'arrivée**. Elle est jouée chaque fois que l'équipe arrive sur cette carte, d'où qu'elle vienne. Elle est gardée avec la carte (`SceneMap.transition`) et dans son fichier exporté.
- **Un groupe d'ennemis** : Base de données → Groupes → Combat → **Transition d'entrée** et **Transition de sortie**. Elles servent pour tous les combats contre ce groupe (`DbGroup.transitionIn`, `transitionOut`).

Dans le jeu : l'entrée de la Grotte de cristal se fait par un Cercle, et le combat contre le Gardien de cristal commence par les Éclats de cristal.

## Les transitions

| Transition | Ce qu'on voit |
|---|---|
| **Fondu au noir** (simple) | L'image s'assombrit par paliers, puis revient |
| **Cercle** (simple) | Un cercle se referme sur le milieu de l'écran, là où est le joueur, puis se rouvre |
| **Volet** (simple) | Un volet en biais arrive par la gauche, puis repart par la droite |
| **Mosaïque** (stylée) | De gros pixels noirs apparaissent au hasard jusqu'à tout couvrir, puis s'en vont de même |
| **Éclair et bandes** (stylée) | Deux éclairs blancs, puis des bandes noires se ferment en alternance depuis la gauche et la droite |
| **Éclats de cristal** (stylée) | Des triangles noirs partent du milieu comme des éclats ; au retour, le milieu se dégage en premier |

Elles sont dessinées en gros pixels (4 pixels d'écran pour un pixel de transition), pour rester dans le style du jeu. Pendant une transition, l'écran ne répond pas aux touches.

## Pour le code

| Fichier | Rôle |
|---|---|
| `game/shared/model/transition.ts` | La liste (`TRANSITIONS` : nom, durées), les cas (`TRANSITION_CASES`) et le dessin d'une image (`drawTransition`) |
| `game/shared/services/transition.service.ts` | Joue une transition : `through(sorte, changement, fin)` couvre, fait le changement, découvre ; `kindFor(cas)` lit le réglage |
| `game/transition/` | Le canevas par-dessus le jeu |
| `database-editor/sheets/settings-sheet/` | La fiche Réglages (table `settings`, une seule ligne : `DbSettings`) |

Branchements : `teleport.component.ts` (changement de carte : la transition de la carte d'arrivée, sinon celle des réglages), `BattleService.start` et `BattleService.end` (combat : celles du groupe, sinon celles des réglages). Ajouter une transition : son nom dans `TransitionKind`, sa ligne dans `TRANSITIONS`, son dessin dans `drawTransition` (un `case` qui peint en noir selon `covered`, de 0 à 1).
