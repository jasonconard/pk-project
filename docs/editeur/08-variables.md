# Éditeur de variables

Les variables retiennent ce qui s'est passé dans l'histoire. Les événements et les dialogues (à venir) pourront les lire et les changer, et une sauvegarde de partie gardera leurs valeurs.

## Ouvrir l'éditeur

En mode Créer : **Éditeurs → Variables** (ordinateur, téléphone en paysage) ou **⋮ → Variables** (téléphone en portrait). L'éditeur s'ouvre par-dessus le jeu ; **Jeu** (ou le bouton retour) le ferme.

## Les deux sortes

- **Drapeau** : oui ou non. « A parlé au maire », « Porte du donjon ouverte ».
- **Compteur** : un nombre entier, de -9999 à 9999. « Pièces trouvées », « Jour ».

## Faire une variable

- **+ Drapeau** ou **+ Compteur** (en bas) ajoute une variable ; son nom est sélectionné, prêt à être tapé.
- **Le nom** : deux variables ne peuvent pas avoir le même nom (les majuscules ne comptent pas). Un nom vide ou en double est entouré en orange.
- **Drapeau / Compteur** change sa sorte ; la valeur de départ revient à « Non » ou 0.
- **Au début** : la valeur quand une nouvelle partie commence (Non / Oui, ou le nombre avec − et +).
- **À quoi elle sert** : une note, facultative.
- **Supprimer** (la corbeille) : appuyer deux fois (« Supprimer ? » pendant 3 secondes).

Renommer une variable ne casse rien : ce qui l'utilisera la retrouve par un identifiant qui ne change jamais.

## Pendant la partie

La valeur **Au début** est celle d'une nouvelle partie. Pendant le jeu, chaque variable a sa valeur du moment (gardée dans le navigateur, même après avoir fermé le jeu) ; une [sauvegarde de partie](05-sauvegarde-export.md#sauvegarde-de-partie) en garde une copie et la remet en la chargeant. Une variable créée après le début de la partie prend sa valeur au début.

## Test des variables

Pour essayer ce qui dépend d'une variable : **Menu → Test des variables**, pendant la partie.

- Chaque variable montre sa valeur du moment, à changer à la main (Non / Oui, ou − / + et le nombre), et sa valeur au début.
- Une variable qui n'est plus à sa valeur au début a un trait jaune à gauche ; le bas de la fenêtre dit combien ont changé.
- **Tout remettre au début** (deux appuis) remet toutes les variables à leur valeur au début, comme une nouvelle partie.

## Sauvegarde et export

- Chaque changement est enregistré dans le navigateur (« Enregistré » sous le titre).
- Les variables sont dans le [projet de jeu](05-sauvegarde-export.md#projet-de-jeu-fichier-pk) (fichier `.pk`).
- **Exporter** (en haut à droite) télécharge `variables.ts`, à mettre dans `src/assets/variables/` : ce sont les variables du jeu pour tout le monde. Celles du navigateur passent devant.

## Dans le code

| Fichier | Rôle |
|---|---|
| `src/app/modules/variables-editor/variables-editor.component.*` | L'éditeur |
| `src/app/modules/variables-editor/shared/variables.ts` | `GameVariable` (id, nom, note, `flag` ou `counter`, valeur au début) |
| `src/app/modules/variables-editor/shared/variable-storage.ts` | Le navigateur (`pk-variables`), sinon le code |
| `src/app/modules/variables-editor/shared/variable-values.ts` | La valeur des variables dans la partie (`pk-variable-values`) |
| `src/app/modules/game/variables-test/` | Le test des variables (menu) |
| `src/assets/variables/variables.ts` | Les variables du jeu (`CODE_VARIABLES`), écrites par l'export |
