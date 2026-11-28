# Le menu Équipe

Le menu Équipe montre les membres de l'équipe, leur fiche, et permet de changer leur équipement. On l'ouvre en jeu avec **Menu → Équipe**. Maquette : `design/main-view.pen` (Menu Équipe). Couleur de l'équipe : orange clair.

(Pour l'équipe qui marche derrière le joueur sur la carte, voir [L'équipe qui suit](18-equipe.md).)

## L'équipe

Une carte par membre : son portrait, son niveau, ses barres de **PV** et de **PM**, sa barre d'**expérience** avec ce qu'il manque avant le niveau suivant (« encore 340 »), et trois petites cases pour ce qu'il porte (arme, armure, accessoire). Toucher un membre ouvre sa fiche.

## La fiche d'un membre

La fiche défile. La flèche en haut ramène à l'équipe.

- **PV et PM**.
- **Stats** : Force, Magie, Endurance, Agilité, Chance. Sous une stat, ce que l'équipement lui ajoute (en vert) ou lui enlève (en rouge).
- **Équipement** : les trois places, Arme, Armure et Accessoire, avec ce que l'objet porté apporte (bonus de stats, résistances, élément qui progresse plus vite). Toucher une place permet de la changer.
- **Éléments et armes** : le niveau du membre dans chaque élément et type d'arme où il a commencé à progresser, avec une barre vers le niveau suivant.
- **Compétences** : celles qu'il connaît, avec leur coût en PM.

## Changer un équipement

Toucher une place montre les objets du **sac** qui vont dans cette place et que ce membre peut porter.

- À droite de chaque objet, ce qu'il change par rapport à l'objet porté : en vert c'est mieux, en rouge c'est moins bien (« Magie +6 », « Force −1 »).
- Toucher un objet, puis **Équiper** : le membre le porte, et l'objet qu'il portait retourne dans le sac.
- **Retirer** vide la place et remet l'objet dans le sac.
- Un objet réservé à d'autres personnages (« Qui peut le porter » dans sa fiche) n'est pas listé.
- Si les PV ou les PM dépassent leur nouveau maximum, ils y sont ramenés.

L'équipement porté fait partie de la partie : il est gardé dans les sauvegardes, et compté en combat. Au début d'une partie, chaque membre porte l'équipement de départ de sa fiche (Base de données → Personnages). Une [simulation de combat](10-base-de-donnees.md) utilise toujours l'équipement de départ.

## Dans le code

- `game/team/` : la fenêtre (`team.sheet.scss` pour la fiche).
- `game/shared/model/team.ts` : la carte d'un membre (`memberCard`), sa fiche (`memberSheet`), les choix d'une place (`equipChoices`).
- `party.ts` : `MemberProgress.equipment` (ce qui est porté dans la partie), `asWorn` (le personnage avec cet équipement), `equip` (échange avec le sac).
