# Événements

Un événement fait réagir un objet : un habitant qui parle, un panneau qu'on lit, un endroit où il se passe quelque chose quand on marche dessus. On le règle sans coder : **ce qui le déclenche**, **quand il peut se jouer** (conditions) et **ce qu'il fait** (actions).

## Ajouter un événement

1. En mode Créer, touche un objet pour le sélectionner.
2. Dans sa fiche, partie **Événements** : **+ Ajouter un événement**. La fenêtre de l'événement s'ouvre.
3. Règle le déclencheur, les conditions et les actions, puis **Terminé** (ou ✕, Échap, le bouton retour : tout est gardé).

La fiche montre chaque événement en résumé (« 1. Parler · si A parlé au maire est faux · 3 actions : « Bonjour… » »). Le toucher rouvre sa fenêtre. **Supprimer l'événement** est en bas de la fenêtre. Annuler (Ctrl+Z) défait toute la modification faite dans la fenêtre d'un coup.

## Plusieurs événements sur un objet

Un objet peut en avoir plusieurs, comme les pages de RPG Maker. Le jeu joue **le premier dont le déclencheur et les conditions conviennent**. La flèche ↑ fait passer un événement avant celui du dessus.

Exemple, le maire :

1. Parler, si « A parlé au maire » est faux : « Bonjour, je suis le maire. », puis « A parlé au maire » devient vrai.
2. Parler, sans condition : « Re-bonjour ! »

La première fois le 1 se joue ; ensuite le drapeau est vrai, le 1 ne convient plus, c'est le 2.

## Déclencheur

- **Parler** : le joueur appuie sur la touche d'action (E, Espace, Entrée, ou le bouton d'action sur téléphone) à côté de l'objet, de n'importe quel côté. Le bouton d'action affiche « Parler · nom » si un message a un nom, sinon « Lire · objet ».
  - **Se tourner vers le joueur** : l'objet se tourne d'un quart de tour vers le joueur avant de parler (pour un personnage). Ça ne change pas la carte : l'éditeur le montre comme il a été posé.
- **Entrer dessus** : le joueur marche sur l'objet (le plus souvent une zone invisible, voir plus bas). Rejoué seulement après en être sorti.
- **Automatique** : dès que les conditions deviennent vraies, où que soit le joueur sur la carte (en arrivant sur la carte, à une heure, quand il se met à pleuvoir, quand un drapeau change). Rejoué seulement après que les conditions sont redevenues fausses. Sans condition, il se joue à chaque arrivée sur la carte.

Pour qu'un événement ne se joue **qu'une fois**, ajoute une condition sur un drapeau (« Vu la scène » est faux) et une action qui le met à vrai.

## Conditions

Toutes doivent être vraies. Sans condition, l'événement se joue toujours.

- **Variable** : un drapeau est vrai / faux, un compteur est =, ≠, ≥ ou ≤ à un nombre. Les variables se créent dans l'[éditeur de variables](08-variables.md).
- **Heure** : de telle heure à telle heure (de 20 h à 6 h passe par minuit).
- **Météo** : l'une des météos choisies (« + ou… » en ajoute une autre). Les météos se choisissent dans une liste avec leur image et un champ pour chercher (Entrée prend la première).
- **Objet** : l'équipe a au moins tant de cet objet (les objets de la [base de données](10-base-de-donnees.md)).
- **Argent** : l'équipe a au moins tant de pièces.
- **Équipe** : tel personnage est dans l'équipe.

## Actions

Jouées l'une après l'autre. **+ Action** ouvre une feuille avec les sortes d'action. Le **⋮** d'une action : Monter, Descendre, Dupliquer, Retirer.

| Action | Ce qu'elle fait |
|---|---|
| **Message** | Une réplique, avec qui parle (facultatif) et un portrait (touche le carré à gauche du nom). Le joueur la ferme pour passer à la suite. |
| **Choix** | Des réponses (2 à 4) affichées avec le message juste avant. Chaque réponse a sa branche d'actions, jouée si le joueur la choisit. |
| **Condition** | Teste des variables, l'heure ou la météo (comme les conditions de l'événement) : joue la branche **Alors** si tout est vrai, sinon la branche **Sinon**. |
| **Variable** | Un drapeau devient vrai / faux ; un compteur devient un nombre ou augmente de (négatif : diminue). |
| **Téléporter** | Vers une carte, à son point d'arrivée. |
| **Météo** | Change la météo (comme le panneau Ambiance : une météo de jour la nuit fait passer au jour). Toucher la météo ouvre la liste des météos. |
| **Son** | Un petit son : bip, pièce, objet trouvé, réussite, erreur, porte, coffre, cloche, magie, saut, coup, pas. ▶ l'écoute. |
| **Attendre** | Une pause, en secondes. |
| **Arrêter** | L'événement s'arrête là : les actions suivantes ne sont pas jouées. |
| **Objet** | Donne ou retire un nombre d'un objet de la [base de données](10-base-de-donnees.md) (jamais en dessous de 0). |
| **Argent** | Donne ou retire des pièces. |
| **Équipe** | Un personnage entre dans l'équipe ou en sort. |
| **Combat** | Un combat contre un groupe d'ennemis de la base de données, puis la branche de la fin : **Victoire**, **Défaite** ou **Fuite** (seulement si on peut fuir ce groupe). En attendant le vrai combat, le jeu demande comment il se termine, pour essayer les branches ; une victoire donne le butin (l'argent des ennemis, leurs objets selon leur chance). |

## L'arbre d'actions

Choix, Condition et Combat contiennent des **branches** (comme dans RPG Maker) : un trait de couleur à gauche (orange pour les réponses d'un choix, bleu pour Alors / Sinon, rouge pour Victoire / Défaite / Fuite), décalé vers la droite. Chaque branche a son **+ Action**.

- Le chevron **plie** une action à branches (il reste un résumé : « « Oui » · 2 actions ») ou une seule branche.
- On peut mettre un choix dans un choix, mais pas plus de **3 niveaux** : au-delà, Choix et Condition sont grisés dans la feuille.
- Sur téléphone, **Déclencheur et conditions** se plie en une ligne de résumé (plié d'office quand l'événement a déjà des actions).

Exemple :

```
Message     Le maire : « Tu veux m'aider ? »
Choix       Oui / Non
  Si « Oui »   Message « Merci ! »
  Si « Non »   Condition  si Pièces ≥ 10
                 Alors    Message « Tu es riche ! »
                 Sinon    Message « Dommage… »
```

## Zones invisibles

Pour qu'il se passe quelque chose à un endroit sans objet visible (l'entrée d'un village, un coin à examiner) :

1. Onglet **Événements** de la palette → **Zone invisible**, puis touche la carte pour la poser.
2. Dans sa fiche : **Largeur** et **Profondeur** (en cases, de 1 à 32).
3. Ajoute-lui un événement, en général **Entrer dessus**.

Dans l'éditeur, une zone est une boîte orange transparente ; dans le jeu elle ne se voit pas et laisse passer le joueur.

## Dans le code

| Fichier | Rôle |
|---|---|
| `shared/model/ObjectEvent.ts` | L'événement de l'éditeur (déclencheur, conditions, arbre d'actions), sa conversion en `SceneEvent` (marqué `edited` ; un choix devient les réponses du message d'avant, une condition une instruction `BRANCH`), les conditions (`conditionsFit`), les portraits |
| `event-editor/` | La fenêtre de l'événement (l'arbre : un modèle qui s'appelle lui-même pour chaque branche) |
| `shared/services/event.service.ts` | Quel événement se joue : touche d'action, `armed` (entrer dessus, automatique) |
| `shared/services/game-map.service.ts` | Déclenche les événements (une fois, puis attend qu'ils redeviennent impossibles), tourne l'objet vers le joueur |
| `shared/services/sequence.service.ts` | Joue les actions (les branches : `SceneEventSequence`) |
| `shared/services/sfx.ts` | Les sons, fabriqués en direct |
| `shared/model/Zone.ts` | La zone invisible (calque de caméra à part, vu seulement dans l'éditeur) |

(Chemins relatifs à `src/app/modules/game/`.)
