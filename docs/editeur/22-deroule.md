# Le déroulé d'une compétence

Une compétence, ou l'attaque d'un type d'arme, se joue dans le temps comme une petite cinématique : son **déroulé**. Il dit quelle animation joue le lanceur, quand l'effet visuel apparaît, quand un son part, et surtout **quand les coups touchent**.

## L'éditeur

Dans la fiche d'une compétence, le bouton **Déroulé** ouvre l'éditeur ; il indique si le déroulé est celui d'origine ou réglé à la main, avec le nombre de coups et la durée. Dans la fiche d'un type d'arme, deux boutons : **Attaque** et **Attaque forte**. Maquette : `design/database.pen`, écrans 21 et 22.

- **La scène d'aperçu** rejoue le déroulé : un lanceur et une cible avec leurs vraies planches, l'image d'effet, les chiffres des coups (la part de chaque coup sur la puissance de la fiche), le tremblement. Les deux pastilles en haut choisissent **qui joue** parmi les combattants qui ont une planche. Ce n'est pas le décor ni la caméra du combat : une petite scène à plat.
- **Lecture** : retour au début, lecture / pause (touche Espace), le moment et la durée, le zoom de la ligne de temps, **+ Bloc**. La lecture joue aussi les sons.
- **La ligne de temps** : une ligne par piste. Toucher la règle ou un endroit vide va à ce moment (l'aperçu suit). **Glisser un bloc** le déplace, par pas de 0,05 s ; le **bord droit** d'un bloc long l'allonge. Toucher un bloc le choisit.
- **Les réglages du bloc** choisi : son **moment** (par pas de 0,01 s), puis selon sa piste l'animation du lanceur, le temps de vol ou la flèche simple, le son et sa hauteur (un son touché s'écoute), la part de puissance et « Applique les états », la durée du tremblement. Dupliquer, supprimer (touche Suppr).
- **En tout** : le nombre de coups, le total de leurs parts, la durée. **Déroulé d'origine** oublie le déroulé réglé à la main.
- **Annuler / refaire** : les deux flèches en haut (Ctrl Z, Ctrl Maj Z). Tout changement est enregistré aussitôt.

L'image d'effet elle-même (ses images, sa vitesse, son mode : sur la cible, projectile, sur la zone) se règle toujours dans la fiche, partie **Animation**.

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
| `database-editor/flow-editor/` | L'éditeur (ligne de temps, réglages du bloc, lecture) |
| `database-editor/shared/flow-scene.ts` | L'aperçu : la scène dessinée à un instant donné (`drawFlowScene`), les sons entre deux instants |

Données : `DbSkill.flow`, `DbWeapon.flow` (attaque) et `DbWeapon.flowHeavy` (coup lourd).
