# Boutiques

Une boutique vend des objets au joueur et lui rachète ce qu'il a dans son sac. C'est une fiche de la **base de données** (table **Boutiques**), ouverte en jeu par l'action d'événement **Ouvrir la boutique**. Maquette : `design/database.pen` (écrans 18 et 19) et `design/main-view.pen` (Boutiques). Couleur de l'argent : jaune.

## La fiche d'une boutique

Base de données → **Boutiques** → **+ Boutique**.

- **Nom** et **Description**.
- **Vendeur** : un PNJ (ou personne). Son portrait et son nom s'affichent dans la boutique, et son lien baisse les prix.
- **Rachète les objets à** : ce que le joueur reçoit pour un objet vendu, en % de son prix (50 % au départ ; 0 % : la boutique n'achète rien).
- **Réduction par niveau de lien** : avec un vendeur, les prix baissent de ce % à chaque niveau du lien (5 % : −15 % au niveau 3). La réduction ne dépasse jamais 90 %.
- **Objets en vente** : **+ Objet** ajoute un objet (pas les objets clés). Chaque ligne montre le prix et des étiquettes : le stock, « Prix propre », les moments ou conditions, « Lien niveau N ».

## Un objet de la boutique

Toucher un objet de la liste ouvre sa fenêtre :

- **Prix ici** : **Celui de l'objet** (le prix de sa fiche) ou **Propre** (un prix pour cette boutique seulement). Un objet sans prix reçoit un prix propre en entrant dans la boutique.
- **Stock par jour** : **Illimité**, ou **Limité** à un nombre qui revient **chaque matin** (chaque nouveau jour de la partie).
- **En vente** : les mêmes conditions que les événements (moment, heure, météo, jour, date, jour spécial, variable, lien…). Sans condition, l'objet est toujours en vente.
- **Lien avec le vendeur** : l'objet n'apparaît qu'à partir de ce niveau du lien (0 : toujours).
- **Retirer de la boutique**.

## Ouvrir la boutique

Dans la fenêtre d'un événement : **Action** → **Ouvrir la boutique**, puis choisir la boutique. On peut l'ouvrir depuis un comptoir, depuis le vendeur lui-même, ou depuis plusieurs endroits. L'action suivante attend que le joueur ferme la boutique (par exemple un message « À bientôt ! »).

## En jeu

Une feuille en bas de l'écran (une fenêtre au centre sur ordinateur) : le vendeur, le nom de la boutique, l'argent, et deux onglets.

- **Acheter** : les objets en vente maintenant, avec leur prix (l'ancien barré quand le lien fait une réduction). « Plus que 2 aujourd'hui » quand le stock baisse, « Épuisé, revient demain matin » en gris. Toucher un objet montre − / + et le bouton **Acheter · prix**. Le bouton dit pourquoi on ne peut pas : pas assez d'argent, sac plein.
- **Vendre** : les objets du sac que la boutique rachète, au prix de rachat. Les objets clés et ceux sans prix ne se vendent pas. Ce qu'on vend ne revient pas dans la boutique.
- On ferme avec ✕, en touchant à côté, Échap ou le bouton retour.

L'argent, le sac et le stock acheté du jour sont gardés avec la partie (sauvegardes, mode test).

## Dans le code

- `database-editor/shared/database.ts` : `DbShop`, `DbShopItem`, `newShop` ; la table `shops`.
- `database-editor/sheets/shop-sheet/` : la fiche et la fenêtre d'un objet (les conditions : `game-event-conditions`).
- `database-editor/shared/party.ts` : `trade` (acheter, vendre), `boughtToday` ; `PartyState.shops` le stock acheté du jour.
- `game/shared/model/shop.ts` : les objets en vente maintenant (`shopLines`), les prix et la réduction (`shopDiscount`, `discounted`), le rachat (`sellLines`, `sellPrice`).
- `game/shop/` : la fenêtre du jeu ; l'instruction `SHOP` (`SequenceService.shop$`), l'action `shop` de `ObjectEvent`.
