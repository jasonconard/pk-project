# Arènes de combat

Un combat peut se jouer dans une **arène** : un lieu ouvert, fait pour le combat, montré à la place du décor. Les combattants ne se mêlent plus aux maisons, aux arbres ou aux murs du lieu où l'équipe se trouvait.

## Comment ça marche

Au début du combat, derrière la transition, la carte est cachée et l'arène est montrée à sa place. **La carte n'est pas quittée** : rien n'y bouge (les ennemis du donjon, les PNJ, les objets, les événements). À la fin, l'arène est retirée et l'équipe se retrouve exactement où elle était. La météo et l'heure restent celles du lieu.

## Faire une arène

Une arène est une **carte** de sorte **Arène** : gestionnaire de cartes → **Nouvelle carte** → Arène. Un seul morceau suffit. On la dessine comme les autres cartes (sols, reliefs, objets).

Son **point d'arrivée** est le centre du combat. En mode édition, un **repère** est dessiné au sol autour de lui :

- le **cercle blanc** : jusqu'où les combattants se déplacent (75 unités autour de leur milieu) ;
- le **rectangle rouge** : où les ennemis sont placés, au nord ;
- le **rectangle bleu** : la ligne de l'équipe, au sud, du côté de la caméra.

Dans ce cercle, le sol doit rester **plat et libre** : les combattants sont posés à plat, à la hauteur du point d'arrivée, et ne butent pas sur le décor. Mettre le décor autour : parois, arbres, cristaux. Le garder bas au sud, pour ne pas cacher le combat.

## Choisir l'arène d'un combat

Le premier réglage renseigné gagne, dans cet ordre :

| Où | Réglage |
|---|---|
| Un **groupe d'ennemis** | Base de données → Groupes → Combat → **Arène** |
| Un **lieu** (une carte) | Gestionnaire de cartes → **…** → **Arène de combat** |
| Un **donjon** entier | Base de données → Donjons → Combats → **Arène** |
| **Tout le jeu** | Base de données → Réglages → **Arène par défaut** |

Chaque liste propose aussi **Sur place, sans arène** : le combat se joue où est l'équipe, comme avant.

Dans le jeu : les combats de la Grotte de cristal se jouent dans l'**Arène de la grotte**, tous les autres dans l'**Arène de la prairie** (l'arène par défaut).

## Essayer une arène

**Menu → Simuler un combat** a une liste **Arène** : celle du groupe ou du lieu, sur place, ou une arène précise.

## Limites

- Pas de collision avec le décor de l'arène : seul le cercle du repère dit où les combattants vont.
- Le style des murs d'une arène est le sien (Murs des reliefs), pas celui du lieu d'où l'on vient.

## Pour le code

| Fichier | Rôle |
|---|---|
| `game/shared/model/arena.ts` | `arenaFor` (l'arène d'un combat), `FIGHT_AREA` (la taille d'un combat), `ARENA_HERE` (« Sur place ») |
| `game/shared/model/MapHelper.ts` | `showArena` / `hideArena` : les morceaux de l'arène construits loin de la carte, ceux de la carte cachés ; `shownChunks` |
| `battle/shared/battle.service.ts` | `enterArena` / `leaveArena`, autour du combat |
| `game/shared/services/map-editor/editor-markers.ts` | Le repère de combat |

Données : `DbGroup.arena`, `SceneMap.arena`, `DbDungeon.arena`, `DbSettings.arena` (l'id d'une carte, ou `"none"` pour « Sur place »).
