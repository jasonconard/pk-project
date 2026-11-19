# Boîte à idées

Les pistes pour la suite. **Retenue** : on la fera ; **À trier** : pas encore décidé ; **Écartée** : gardée pour mémoire.

## La direction

Faire de l'appli un **moteur de jeu** : les éditeurs (carte, modèles, et ceux à venir) servent à fabriquer le jeu, sans coder.

**Le genre choisi : la vie quotidienne le jour, les donjons la nuit** (à la Persona).

- **Le jour, la ville (hub)** : vie quotidienne façon sandbox, les habitants, les liens avec l'équipe, les activités qui font avancer le temps (matin, après-midi, soir).
- **La nuit, les donjons** : exploration, énigmes, combats en équipe. **Les combats n'ont lieu que dans les donjons**, et chaque donjon n'est ouvert qu'à certaines heures.
- **Le combat** : tour par tour à la Grandia, avec une jauge d'action où l'on voit qui agit quand (frapper juste avant un ennemi peut annuler son action).
- Les deux se nourrissent : les liens du jour rendent l'équipe plus forte la nuit ; ce qu'on trouve la nuit sert le jour (objets, argent, histoire).
- **La météo et l'heure** relient tout : elles changent qui on croise le jour, ce qui se passe dans les donjons ; **la météo du donjon agit sur les combats**.

**Les choix techniques :**

- **Plusieurs cartes**, chacune faite de morceaux (chunks) : la carte du monde (la carte par défaut, grande), la ville, les intérieurs, les étages de donjon.
- **Pensé d'abord pour le téléphone**, en portrait et en paysage : c'est l'outil le plus souvent en main. Chaque éditeur doit y être aussi simple qu'à l'ordinateur.

## Les outils à construire

Tout ce qu'il faut pour fabriquer ce jeu sans coder. L'ordre indique sur quoi chaque outil s'appuie ; on avance une étape à la fois, validée avant la suivante. **On commence par la musique** (12) : elle ne dépend de rien d'autre.

| # | Outil | Ce qu'il permet | Sert à |
|---|---|---|---|
| 0 | **Plusieurs cartes** (fait) | Créer, renommer, ouvrir une carte ; chacune en chunks (la carte du monde par défaut) ; passages entre cartes. Voir [05](editeur/05-sauvegarde-export.md) et [02](editeur/02-objets.md) | Tout |
| 1 | **Projet de jeu** | Toutes les créations (cartes, modèles, et la suite) rangées dans un projet : enregistrer, exporter / importer un fichier `.pk`, synchroniser entre téléphone et ordinateur | Tout |
| 2 | **Variables et sauvegarde de partie** | Drapeaux d'histoire (« a parlé au maire »), compteurs, jour courant ; sauvegarde sur plusieurs emplacements | Tout |
| 3 | **Personnages et événements** (éditeur de carte) | Poser un PNJ, un panneau, une zone ; déclencheurs (parler, entrer, heure, météo, drapeau) et actions | Jour et nuit |
| 4 | **Dialogues** | Répliques, choix, conditions (drapeaux, liens), effets ; portrait et nom de qui parle | Jour |
| 5 | **Base de données** | Personnages (stats, portrait), objets, compétences, ennemis et groupes, éléments et faiblesses | Tout |
| 6 | **Portraits et sprites** | Dessiner en pixel art les portraits de dialogue et les personnages (avec la vue 2D de l'éditeur de modèles) | Jour et nuit |
| 7 | **Temps et calendrier** | Jours, périodes (matin, après-midi, soir, nuit), activités qui prennent du temps, emplois du temps des habitants | Jour |
| 8 | **Liens sociaux** | Un niveau de lien par personnage, les scènes débloquées à chaque niveau, les bonus en combat | Jour → nuit |
| 9 | **Combat** | Tour par tour à la Grandia : jauge d'action, interrompre l'action d'un ennemi ; la météo du donjon change les éléments et les effets ; réglable depuis la base de données | Nuit |
| 10 | **Donjons** | Étages (cartes) faits à la main ou générés à partir de salles ; heures d'ouverture ; météo propre ; coffres, pièges, énigmes, ennemis visibles | Nuit |
| 11 | **Animation des modèles** | Portes, mécanismes, décors qui bougent (voir plus bas) | Jour et nuit |
| 12 | **Musique** | L'éditeur MIDI lo-fi (voir plus bas), une musique par lieu, jour / nuit / donjon / combat | Tout |
| 13 | **Cinématiques** | Une ligne de temps : caméra, déplacements, dialogues, musique, à lancer depuis un événement | Histoire |
| 14 | **Mode test** | Lancer le jeu depuis n'importe où, au jour et avec les drapeaux voulus, pour essayer une scène | Tout |

## Retenues

### Animer les modèles

Dans l'éditeur de modèles : une forme reçoit un mouvement (rotation, déplacement, clignotement), en boucle ou déclenché.

- Porte qui s'ouvre quand le joueur approche, moulin qui tourne, drapeau, enseigne qui clignote la nuit (calque Nuit).
- Réglages simples : axe, amplitude, vitesse, « en boucle » ou « à l'approche du joueur ».
- Le vent (déjà dans les modèles) pourrait aussi pousser certaines formes.

### Personnages et événements dans l'éditeur de carte

Poser un PNJ ou un panneau, écrire son dialogue dans l'éditeur, choisir ce qui le déclenche, sans coder.

- Déclencheurs : parler, entrer dans une zone, une heure, une météo, un objet possédé.
- Actions : dialogue (avec choix), téléporter, donner un objet, changer la météo, jouer un son, lancer un combat.
- Les briques existent déjà (messages, téléporteurs, `sequence.service`) : il manque l'outil pour les placer.

### Éditeur de musique (MIDI lo-fi) — en cours (étapes 1 et 2 faites : composer et écouter, mixage et son lo-fi, voir [07-musique](editeur/07-musique.md))

Une musique d'ambiance par zone, qui change avec la météo et l'heure, composée dans un éditeur simple, dans l'esprit de **Mario Paint** (on pose des notes-tampons sur une portée, et ça joue en boucle).

- **Grille de pas** (step sequencer) : quelques pistes (mélodie, basse, accords, batterie), des cases à cocher par temps, des boucles de 1 à 8 mesures.
- **Sons synthétisés** en direct (comme les sons de météo) : carré, triangle, dents de scie, bruit pour la batterie. Côté **lo-fi** : filtre doux, léger souffle, craquements de vinyle, petit décalage de rythme (swing).
- **Gammes** proposées pour ne jamais sonner faux : on choisit une tonalité, la grille ne montre que ses notes.
- **Variantes** : la même musique jour / nuit / pluie (instruments ou filtre qui changent), avec un fondu entre elles.
- Export en fichier du jeu (comme les modèles) ; plus tard, import d'un fichier MIDI.
- Utilisable sur téléphone, comme l'éditeur de modèles.

### Zones d'action sur les objets

Aujourd'hui, une porte (passage) ou un événement occupe toute la largeur de l'objet. Pouvoir dessiner la zone d'action dans l'éditeur (la porte seule de la maison, le devant d'un panneau), sur la carte ou dans le modèle.

## À trier

### Le socle commun (sandbox et RPG)

- **Sauvegarde de partie** : position, inventaire, progression, drapeaux d'histoire ; plusieurs emplacements.
- **Objets et inventaire**, avec un éditeur de données (nom, icône, prix, effet) façon RPG Maker.
- **PNJ avec un emploi du temps** : où ils sont selon l'heure et la météo (à l'abri quand il pleut, chez eux la nuit).
- **Plusieurs cartes et des intérieurs** : portes qui mènent dans les maisons, transitions.
- **Cinématiques** : la caméra bouge, les personnages marchent, des dialogues s'enchaînent.
- **Lumières** : torches, lampadaires, fenêtres qui éclairent vraiment le sol la nuit.
- **Synchroniser les créations entre appareils** : export / import d'un fichier `.pk` par la fenêtre de partage, puis un bouton « Publier » vers le dépôt GitHub.

### Pour la vie quotidienne (le jour)

- **Cultures** : cases de sol à labourer (comme la peinture des sols), plantes qui poussent jour après jour ; la pluie arrose, le gel abîme.
- **Saisons et calendrier** : la météo tirée au sort suit la saison, des fêtes à certaines dates.
- **Métiers** avec des niveaux : pêche (selon la météo et l'heure), minage, cueillette, cuisine.
- **Construire et décorer** en jeu : l'éditeur de carte, version joueur (poser des meubles, des clôtures).
- **Amitié avec les habitants** : discuter, offrir des cadeaux, débloquer des scènes.
- **Boutiques** : acheter, vendre, une petite économie.

### Pour les donjons et les combats (la nuit)

- **La météo en combat** : la pluie affaiblit le feu, l'orage renforce l'électrique, le brouillard fait rater les attaques. Les 61 météos deviennent une vraie mécanique.
- **Une équipe** qui suit le joueur sur la carte, des compétences, de l'expérience.
- **Donjons avec énigmes** : interrupteurs, blocs à pousser, portes, avec les déclencheurs de l'éditeur de carte.
- **Dialogues à choix** qui changent la suite de l'histoire.
- **Carte du monde** et voyages entre les zones.

### Le monde et la météo

- **Rencontres selon la météo et l'heure** : certaines créatures sous la pluie, d'autres la nuit ou pendant l'aurore.
- **Météo réelle** (en option) : l'heure du jeu suit l'heure réelle, la météo celle de ta ville (Open-Meteo, gratuit, avec ta permission pour la localisation).
- **Saisons** selon la date réelle (feuilles en automne, neige en hiver).

### Petits plaisirs

- **Mode photo** : cacher l'interface, choisir l'heure et la météo, cadrer, enregistrer ou partager l'image.
- **Météopédia** : découvrir les météos en jouant (« 23/61 vues »), badge pour les rares.

### Solidité

- **Captures automatiques des météos** comparées d'une version à l'autre (voir si un effet casse) ; elles serviraient aussi d'images pour le catalogue.

### Travailler avec Claude

- **Skill `add-model`** (`.claude/skills/add-model/`, comme `release`) : la recette pour ajouter un modèle 3D au jeu en une fois (fichier `md-xxx.ts` et sa texture exportés par l'éditeur de modèles, inscription dans `src/assets/models/models.ts` et dans la palette de l'éditeur de carte `MODEL_CHOICES`, vignette, vérification dans le jeu, doc). À écrire la première fois qu'on ajoute un modèle, à partir de ce qu'on aura vraiment fait.
- **Skill `add-weather`** : la même chose pour une météo (la recette est déjà dans `CLAUDE.md`).

## Écartées

(rien pour l'instant)
