# Le déroulé d'une compétence

Une compétence, ou l'attaque d'un type d'arme, se joue dans le temps comme une petite cinématique : son **déroulé**. Il dit quelle animation joue le lanceur, quand l'effet visuel apparaît, quand un son part, et surtout **quand les coups touchent**.

> L'éditeur du déroulé (ligne de temps et aperçu dans la base de données) arrive à l'étape suivante. Pour l'instant le déroulé est écrit dans les données ; cette page décrit comment il fonctionne en combat. Maquette : `design/database.pen`, écrans 21 et 22.

## Les cinq pistes

| Piste | Un bloc, c'est… | Réglages |
|---|---|---|
| **Lanceur** | une animation de sa planche | laquelle (attaque, coup lourd, magie, incantation…) |
| **Effets** | l'image d'effet de la compétence, jouée sur les cibles | sa durée est le **temps de vol** d'un projectile (0 : l'effet apparaît directement sur la cible) ; ou une flèche simple |
| **Sons** | un son, à un instant | lequel, sa hauteur |
| **Coups** | l'instant où les effets s'appliquent et où les chiffres s'affichent | sa **part de la puissance** (%), et s'il porte les états |
| **Écran** | un tremblement | sa durée |

Le temps part de zéro quand le lanceur frappe. Pour un coup au contact, il marche d'abord jusqu'à sa cible : cette marche n'est pas dans le déroulé.

## Les coups et la puissance

La fiche de la compétence garde sa liste d'effets (dégâts 60, brûlure 30 %…) : c'est sa puissance totale. Chaque coup en applique une part.

- Deux coups à **40 %** et **60 %** : le premier fait 40 % des dégâts de la fiche, le second 60 %.
- Les **états, guérisons d'état et renforts** ne partent que sur les coups qui les portent (le dernier, en général).
- Les soins sont partagés comme les dégâts.
- Un total différent de 100 % est permis : la compétence fait alors plus ou moins que sa fiche.

Les cibles sont choisies au moment où le lanceur frappe ; une cible tombée entre deux coups ne reçoit pas les suivants. Les chiffres de coups rapprochés s'empilent au lieu de se recouvrir.

## Sans déroulé

Une compétence sans déroulé en reçoit un tout seul, à **un coup** : l'animation du lanceur (coup lourd au contact, magie sinon), son image d'effet si elle en a une (avec 0,4 s de vol pour un projectile), un son (le sien, sinon celui de son élément) et un coup à 100 % au moment de l'impact. C'est ce que faisaient les compétences avant.

Pour un type d'arme : l'animation d'attaque ou de coup lourd, son image d'effet, une flèche pour une arme à distance, le son du coup et un petit tremblement sur le coup lourd. Un objet utilisé en combat : le geste d'attaque et un coup.

## Un exemple : Double frappe

| Moment | Piste | Bloc |
|---|---|---|
| 0 s | Lanceur | Attaque |
| 0,05 s | Effets | l'entaille |
| 0,30 s | Sons, Coups | coup d'épée, **40 %** |
| 0,55 s | Lanceur | Coup lourd |
| 0,90 s | Effets | l'entaille |
| 1,15 s | Sons, Coups, Écran | coup lourd, **60 %** avec les états, tremblement |

## Pour le code

| Fichier | Rôle |
|---|---|
| `database-editor/shared/skill-flow.ts` | `SkillFlow`, `FlowBlock`, les déroulés par défaut (`skillFlow`, `attackFlow`, `itemFlow`), `flowLength`, `flowPower` |
| `battle/shared/battle-engine.ts` | `strike` lance le déroulé, `playFlow` joue les blocs qui commencent entre deux instants, `land` applique un coup |
| `battle/shared/skill-anim-player.ts` | L'image d'effet, avec un temps de vol donné |

Données : `DbSkill.flow`, `DbWeapon.flow` (attaque) et `DbWeapon.flowHeavy` (coup lourd).
