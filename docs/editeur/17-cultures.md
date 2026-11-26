# Cultures

Le joueur cultive des plantes fantastiques sur la **terre cultivable** : il laboure, plante une graine, arrose chaque jour, puis récolte. La pluie arrose pour lui, le gel abîme les plantes qui le craignent, chaque plante a ses saisons. Maquette : `design/database.pen` (écran 20) et `design/main-view.pen` (Cultures).

## Le sol « Terre cultivable »

Éditeur de carte, onglet **Sols** : **Terre cultivable**. Elle ressemble à la Terre ; c'est seulement là que le joueur peut labourer et planter. On décide ainsi où sont les champs.

## Une culture (base de données → Cultures)

- **Graine** : l'objet qui la plante (« Graines de lunelle »).
- **Pousse** : 4 images de 16 × 24 pixels (une case de large) : Semis, Pousse, Grande, Mûre. On les dessine en touchant l'image (comme les icônes). Sous chaque étape, le nombre de **jours arrosés** qu'elle dure ; l'en-tête dit « mûre en 5 jours arrosés ».
- **Récolte** : l'objet qu'elle donne et combien (1 à 3…). **Une seule récolte** : la case redevient de la terre labourée. **Repousse** : elle est mûre de nouveau après quelques jours.
- **Saison** : les mois du calendrier où elle pousse (aucun : toute l'année). Hors saison elle ne se plante pas, et celles déjà plantées meurent.
- **Météo** : **Craint le gel** (neige, gel, blizzard, grêle… : elle fane le premier jour, meurt le second). **Pousse plus vite par** : des météos qui ajoutent des jours de pousse un jour arrosé (Ensoleillé +1 jour).

Le jeu en a 4 au départ, dessinées avec PixelLab : **Lunelle** (une fleur qui brille comme une lune), **Braisepomme** (un buisson aux fruits de braise, qui repousse), **Givrelys** (un lys de cristal, la seule qui résiste au gel) et **Bullefeuille** (une fougère à bulles qui aime la pluie). Leurs graines et leurs récoltes sont des objets ; les récoltes sont des cadeaux, qu'on peut offrir ou vendre en boutique.

## Les outils

Deux objets clés : la **Houe** (labourer) et l'**Arrosoir** (arroser). Dans la fiche d'un objet clé, **Outil** dit à quoi il sert. Il suffit de l'avoir dans le sac. Un événement peut les donner (action Objet).

## En jeu

Devant une case de terre cultivable, le bouton d'action change :

| Bouton | Quand | Ce qui se passe |
|---|---|---|
| **Labourer** | la terre n'est pas labourée | Il faut la houe. |
| **Planter** | terre labourée, vide | « Planter quoi ? » : les graines du sac ; une graine hors saison est grisée. |
| **Arroser** | la plante n'a pas eu d'eau aujourd'hui | Il faut l'arrosoir. La terre arrosée est plus sombre. |
| **Regarder** | déjà arrosée | Dans combien de jours elle sera mûre (ou qu'elle a souffert du gel). |
| **Récolter** | mûre | « +2 Bulbe de lune » en haut de l'écran ; les objets vont dans le sac. |
| **Arracher** | morte (gel, hors saison) | La case redevient de la terre labourée. |

- Les jours sont comptés quand la date change (en dormant, en faisant passer le temps…) : un jour où la plante a été arrosée, ou où il a plu, elle pousse d'un jour (plus les météos qui l'aident).
- La pluie arrose toutes les cultures, sur toutes les cartes, si elle tombe à un moment de la journée.
- Les cultures sont gardées avec la partie (sauvegardes, mode test ; une nouvelle partie les efface).

## Dans le code

- `database-editor/shared/database.ts` : `DbCrop`, `newCrop`, `daysToRipe`, la table `crops` ; `DbItem.tool` (`FarmTool`) ; `PICTURE_SIZES.crop`. `database-storage.ts` ajoute les cultures et leurs objets à une base enregistrée avant elles.
- `database-editor/sheets/crop-sheet/` : la fiche (les images : `DatabaseStore.editCropStage`).
- `game/shared/model/Terrain.ts` : le terrain `farmland`.
- `game/shared/model/farm.ts` : l'état (`pk-farm` : les cases labourées par carte, la météo des derniers jours), `advanceFarm` (les jours passés), `noteWeather`, `stageOf`.
- `game/shared/model/farm-view.ts` : la terre et les plantes dessinées sur la carte.
- `game/shared/services/farm.service.ts` : le bouton d'action et ce qu'il fait ; l'instruction interne `PLANT` attend la fenêtre des graines.
- `game/farm/` : « Planter quoi ? » et le message de récolte.
