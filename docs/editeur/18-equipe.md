# L'équipe qui suit

Les membres de l'équipe marchent **en file** derrière le joueur (le chef d'équipe), chacun sur les pas de celui de devant, avec sa planche de marche. Maquette : `design/main-view.pen` (Équipe) et `design/map-manager.pen` (Réglages de la carte, équipe).

## En jeu

- Jusqu'à **3 membres** suivent, dans l'ordre de l'équipe (le premier est le chef, c'est le joueur). Seuls ceux qui ont une **planche de marche** (base de données, fiche du personnage) sont dessinés.
- Chacun reste une case derrière celui de devant, sur le chemin exact du chef, et regarde dans la direction où il marche. Quand le joueur s'arrête, ils s'arrêtent.
- Ils ne bloquent jamais : on les traverse.
- Après une porte, une téléportation ou un changement de carte, ils réapparaissent juste derrière le joueur.
- Pendant un combat, ils disparaissent avec le joueur.

## Les cacher

Trois réglages, qui s'ajoutent :

1. **Par carte** : Cartes → **…** d'une carte → **L'équipe suit le joueur** (cochée par défaut). Décochée : seul le chef est dessiné, par exemple dans une petite pièce.
2. **Par un événement** : l'action **L'équipe suit / se cache**. « Se cache » fait disparaître ceux qui suivent (le chef reste) jusqu'à une action « Suit », qui les fait revenir juste derrière le joueur. C'est gardé avec la partie.
3. **Par le joueur** : Menu → **L'équipe me suit** (un interrupteur ; la ligne dit qui marche derrière).

## Dans le code

- `game/shared/model/team-followers.ts` : `TeamFollowers` (la trace des pas du chef, les membres placés dessus, leurs images de marche, le regroupement après un saut). Mis à jour à chaque image par `GameMapService.updateFollowers`.
- `SceneMap.followers` (false : cachés sur la carte ; `GameService.setMapFollowers`), `PartyState.teamHidden` (`setTeamHidden`, l'instruction `TEAM`, l'action `team`), `Game.teamFollows` (le réglage du joueur, `GameService.setTeamFollows`, gardé dans `pk-weather-settings`).
