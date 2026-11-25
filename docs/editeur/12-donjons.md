# Donjons

La nuit, l'équipe explore des donjons : des étages faits à la main ou tirés au hasard à partir de salles, des ennemis qui se promènent sur la carte, des coffres, des pièges, des interrupteurs et des portes fermées. Maquette : `design/main-view.pen` (Donjons) et `design/database.pen` (écran 17).

## Créer un donjon

1. **Les cartes** : dans le gestionnaire de cartes ([Cartes](05-sauvegarde-export.md)), créer les étages faits à la main avec la sorte **Donjon**, et les salles avec la sorte **Salle**.
2. **Les objets** : poser dans les cartes les objets de l'onglet **Donjon** de la palette (voir plus bas). Une salle a au moins une **Porte de salle** ; un étage fait à la main a un **Escalier** pour descendre.
3. **La fiche** : dans la [base de données](10-base-de-donnees.md), table **Donjons**, régler les heures d'ouverture, la météo et les étages.
4. **L'entrée** : sur la carte de la ville ou du monde, un objet avec un **passage** vers « Donjon : <nom> » (ou l'action **Téléporter** d'un événement vers ce donjon). L'équipe arrive au premier étage.

## La fiche du donjon

- **Ouverture** : les moments où il est ouvert (aucun : toujours ouvert) et les jours spéciaux du calendrier où il est ouvert toute la journée.
- **Météo** : la météo du donjon (elle remplace celle du dehors, rendue à la sortie), ou celle du dehors.
- **Musique** : un morceau de l'[éditeur de musique](07-musique.md) pour ce donjon, ou celui du moment **Donjon** (volet Jeu de l'éditeur de musique). Les combats gardent leur musique.
- **Étages**, dans l'ordre :
  - **Faite à la main** : une carte.
  - **Générés** : les salles où piocher, le nombre de salles (de … à …) et **Étages pareils** (plusieurs étages tirés de la même façon à la suite).
  - **Groupes d'ennemis** et leur nombre sur l'étage (un groupe tiré au hasard pour chaque ennemi).
  - Étages générés : le nombre de **coffres** et ce qu'ils peuvent contenir (un objet et sa chance en %).
  - **Point de sauvegarde et sortie** : un cristal près de l'arrivée.

## L'onglet Donjon de l'éditeur

| Objet | Ce qu'il fait | Réglages (fiche de l'objet sélectionné) |
|---|---|---|
| **Coffre** | Touche d'action : il s'ouvre et donne son contenu (une seule fois) | Contenu (objets, pièces), **Fermé à clé** (un objet de la base, gardé dans le sac). Sur un étage généré, un coffre vide reçoit un objet du butin de l'étage |
| **Piège** | Marcher dessus : l'équipe perd une partie de ses PV, ou un combat commence | L'effet, **Caché** (invisible jusqu'à ce qu'on marche dessus) |
| **Interrupteur** | Touche d'action : allume ou éteint un drapeau | Le drapeau ([Variables](08-variables.md)) |
| **Porte fermée** | Bloque le passage ; s'ouvre avec la clé, ou disparaît quand le drapeau est vrai | La clé, le drapeau |
| **Escalier** | Marcher dessus : l'étage suivant (après le dernier : la sortie) | — |
| **Porte de salle** | Touche d'action : la salle voisine | — (reliée au hasard) |
| **Cristal de sauvegarde** | Touche d'action : sauver la partie, sortir du donjon | — |

Dans l'éditeur, les objets sont montrés tels qu'ils sont posés (coffres fermés, pièges cachés visibles, portes fermées).

## Les étages générés

À chaque visite, le jeu tire le nombre de salles, les pioche parmi celles de l'étage (une salle peut revenir) et relie chaque nouvelle salle à une porte libre d'une salle déjà là : on peut toujours aller partout. Il place l'escalier dans la dernière salle, partage les ennemis et les coffres entre les salles (pas dans la première, quand il y en a d'autres) et met le cristal dans la première si l'étage en a un. Une porte de salle sans voisine dit « Le passage est bouché ». Les objets sont posés sur des cases libres au niveau de l'arrivée, loin des murs et des autres objets.

## Dans le jeu

- **Le bandeau** (sous l'horloge) : le donjon et l'étage, l'heure où il ferme, les ennemis qui restent.
- **Les ennemis** se promènent autour de leur place. S'ils voient l'équipe, un « ! » s'affiche et ils la poursuivent.
  - **Frapper** (touche d'action devant un ennemi) : « Attaque surprise ! », les jauges de l'équipe partent en avance.
  - Un ennemi qui touche l'équipe **par derrière** : « Embuscade ! », les jauges des ennemis partent en avance (si son groupe peut attaquer en premier).
  - Sinon, le combat commence à égalité.
  - Gagné : l'ennemi disparaît jusqu'à la prochaine visite de l'étage. Fuite : il clignote quelques secondes sans pouvoir attaquer. Perdu : l'équipe se réveille à l'entrée du donjon, soignée.
- **Fermé** : hors de ses heures, l'entrée dit qu'elle est scellée et quand elle s'ouvre. À l'heure de fermeture, l'équipe est ramenée dehors.
- **Sortir** : le cristal de sauvegarde, l'escalier du dernier étage, ou une défaite ramènent l'équipe là où elle est entrée, avec la météo du dehors.
- **Les sauvegardes de partie** gardent le donjon : l'étage, les salles tirées, les coffres ouverts. Les coffres des étages faits à la main restent ouverts pour toujours ; ceux des étages générés, le temps de la visite.

## Les fichiers

| Fichier | Rôle |
|---|---|
| `src/app/modules/database-editor/sheets/dungeon-sheet/` | La fiche du donjon |
| `game/shared/services/dungeon.service.ts` | Le donjon en jeu : entrer, étages, salles reliées, ennemis, coffres, pièges, interrupteurs, portes, sortie |
| `game/shared/model/dungeon-object.ts` | Les objets de l'onglet Donjon (`dg:<sorte>`) et les ennemis sur la carte (`foe:<groupe>`), leurs images |
| `game/shared/model/dungeon-state.ts` | Ce qui est gardé (`pk-dungeon`) : coffres ouverts, donjon en cours |
| `game/dungeon-chip/` | Le bandeau du donjon |
| `src/assets/dungeon/*.png` | Les images des objets (dessinées avec PixelLab et à la main) |
