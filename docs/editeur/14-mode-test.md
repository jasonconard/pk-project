# Mode test

Le mode test sert à essayer une scène sans rejouer depuis le début : on choisit où le joueur apparaît et dans quel état est la partie (le jour, le moment, la météo, les variables, l'équipe, le sac, les liens, les cinématiques déjà vues), puis on joue. En quittant le test, **ta partie revient comme avant** : rien de ce qui s'est passé pendant le test n'est gardé. Maquette : `design/main-view.pen` (Mode test). Vert = test (orange = édition, bleu = jeu).

## Lancer un test

Quatre endroits :

1. **Dans l'éditeur de carte** : le bouton **Tester** (la fiole, à côté de Jouer). « Touche la carte : le joueur apparaît là » ; on touche la case, la feuille **Tester ici** s'ouvre. Appuyer de nouveau sur Tester annule.
2. **Dans la fenêtre d'un événement** : **Tester** (en haut). L'événement est gardé tel qu'il est, le joueur apparaît devant l'objet, puis l'événement se joue tout de suite (sans regarder son déclencheur ni ses conditions).
3. **Dans l'éditeur de cinématiques** : **Voir → Tester avec des réglages**. Le joueur reste où il est, la cinématique se joue depuis le début, puis on peut continuer à jouer. (**Voir → Voir ici** la joue avec la partie de maintenant, comme avant.)
4. **Dans le menu du jeu** : **Menu → Mode test**, la liste des tests gardés : **Régler** ouvre ses réglages, **Lancer** le joue à l'endroit où il a été gardé. **Nouveau test** garde la partie de maintenant, là où est le joueur.

## La feuille « Tester ici »

- **Réglages** : les tests gardés, en pastilles. **Comme ma partie** joue avec la partie telle qu'elle est (le jour, les variables, l'équipe de maintenant). Le dernier choisi est repris la fois suivante.
- En dessous, ce que règle le test choisi : jour et moment, variables, équipe et sac, liens, cinématiques vues. Toucher une ligne ouvre ses réglages (avec **Comme ma partie**, un nouveau test est d'abord gardé).
- **Garder** garde la partie de maintenant comme un nouveau test (« Test 1 »), qui part de cet endroit.
- **Lancer le test**.

## Les réglages d'un test

Une fenêtre (plein écran sur téléphone ; sur ordinateur, les tests gardés à gauche et les réglages sur deux colonnes). Tout est gardé à chaque changement.

- **Le nom**, en haut, se change directement.
- **Jour et moment** : le jour (− / +), le moment (Matin, Après-midi, Soir, Nuit : le test commence au début du moment), la météo.
- **Variables** : les drapeaux (interrupteur) et les compteurs (− / +). « N changées » compte celles qui ne sont pas à leur valeur de départ.
- **Équipe** : qui est dans l'équipe et à quel niveau (les points de vie et de magie sont pleins).
- **Sac et argent** : l'argent, chaque objet et son nombre, **+ Objet**.
- **Liens** : le niveau de chaque lien.
- **Cinématiques vues** : les cinématiques « Une seule fois » déjà vues (elles ne se rejouent pas).
- **Supprimer** (deux appuis), **Ma partie** (remplace les réglages par la partie de maintenant, deux appuis), **Lancer**.

## Pendant le test

- Un **contour vert** entoure le jeu et le bandeau **Test · son nom** est en haut.
- **Recommencer** (la flèche) remet le test à son début : l'endroit, l'état de la partie, et l'événement ou la cinématique se rejoue.
- **Quitter** demande d'abord : « Quitter le test ? Ta partie revient comme avant le test. » Puis retour à l'éditeur si le test a été lancé depuis l'éditeur, sinon retour à la partie, là où elle était.
- On ne peut ni sauver ni charger une partie pendant un test.
- Si l'application se ferme pendant un test, la partie revient comme avant au démarrage suivant.

## Bon à savoir

- Un test ne garde ni les donjons en cours ni les objets déplacés par des événements : tout repart de zéro.
- Les tests gardés font partie du projet de jeu (fichier `.pk`), comme les autres créations.
- En commençant au début d'un moment, le bandeau « Le soir tombe » peut s'afficher.

## Dans le code

- `shared/model/test-preset.ts` : un test gardé (`TestPreset`, `pk-tests`), `testFromGame` (la partie de maintenant), `applyTest` (la partie prend l'état du test).
- `shared/services/test-mode.service.ts` : les tests gardés, la feuille demandée, lancer / recommencer / quitter ; la partie mise de côté est gardée dans `pk-test-run` (rendue au démarrage si le jeu s'est fermé pendant un test).
- `shared/services/game-saves.ts` : `captureGame` / `restoreProgress` (aussi utilisés par les sauvegardes).
- `test-mode/` : `test-sheet` (Tester ici), `test-settings` (les réglages), `test-list` (Menu → Mode test), `test-banner` (le bandeau et Quitter le test ?).

(Chemins relatifs à `src/app/modules/game/`.)
