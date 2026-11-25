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
| 1 | **Projet de jeu** (fait : exporter / importer le fichier `.pk` depuis le menu, l'envoyer depuis l'application Android, le résumé de ce que contient l'appareil, voir [05](editeur/05-sauvegarde-export.md#projet-de-jeu-fichier-pk)) | Toutes les créations (cartes, modèles, musiques) dans un seul projet : exporter / importer un fichier `.pk`, synchroniser entre téléphone et ordinateur | Tout |
| 2 | **Variables et sauvegarde de partie** (fait : l'éditeur de variables et le test des variables, voir [08](editeur/08-variables.md), la sauvegarde de partie sur trois emplacements, voir [05](editeur/05-sauvegarde-export.md#sauvegarde-de-partie)) | Drapeaux d'histoire (« a parlé au maire »), compteurs, jour courant ; sauvegarde sur plusieurs emplacements | Tout |
| 3 | **Personnages et événements** (fait : déclencheurs parler / entrer dessus / automatique, conditions variables / heure / météo, actions message / variable / téléporter / météo / son / attendre / objet / argent / équipe / combat, conditions objet / argent / équipe, se tourner vers le joueur, zones invisibles, voir [09](editeur/09-evenements.md) ; restent : téléporter vers un point choisi, et le vrai combat derrière l'action Combat (point 9)) | Poser un PNJ, un panneau, une zone ; déclencheurs (parler, entrer, heure, météo, drapeau) et actions | Jour et nuit |
| 4 | **Dialogues** (fait : arbre d'actions dans la fenêtre des événements, choix et conditions Si / Sinon avec leurs branches, arrêter, portrait et nom, voir [09](editeur/09-evenements.md#larbre-dactions) ; restent : conditions sur les liens (point 8), événements communs réutilisables, portraits dessinés (point 6)) | Répliques, choix, conditions (drapeaux, liens), effets ; portrait et nom de qui parle | Jour |
| 5 | **Base de données** (fait : personnages, ennemis, groupes, compétences, objets, états, éléments, types d'armes, et le lien avec les événements, voir [10](editeur/10-base-de-donnees.md) et [plus bas](#base-de-données-point-5--fait)) | Personnages (stats, portrait), objets, compétences, ennemis et groupes, éléments et faiblesses | Tout |
| 6 | **Portraits et sprites** (fait : étape 1, les portraits de Hugo et Jason en 96 × 96 dessinés avec PixelLab, dans le style des planches de combat, pour les dialogues et la base de données ; étape 2, les messages montrent le portrait d'un personnage de la base (les anciennes images de Hugo et Jason aussi). étape 3, la maquette des PNJ (`design/database.pen` écran 12, `design/main-view.pen` : poser un PNJ, PNJ sélectionné) ; étape 4, la table PNJ dans la base de données (nom, petite tête, portrait, description ; les anciens habitants y passent, le choix Équipe / Habitant disparaît des personnages ; leurs portraits dans l'action Message). étape 5, la planche de marche (16 × 24, 4 directions × 3 images) dans les fiches des personnages et des PNJ, avec son aperçu ; le joueur dessiné avec celle du chef d'équipe (l'ancien sprite sinon). étape 6, les planches de marche de Hugo et Jason et un premier PNJ, Bernard le boulanger (portrait et planche), dessinés avec PixelLab. étape 7, poser un PNJ sur la carte (onglet PNJ de la palette, dessiné avec sa planche dans sa direction, Tourner, Fiche, ses événements ; le menu « Portraits et sprites » ouvre la base de données). À suivre : un PNJ qui regarde autour de lui ou se promène) | Dessiner en pixel art les portraits de dialogue et les personnages (avec la vue 2D de l'éditeur de modèles) | Jour et nuit |
| 7 | **Temps et calendrier** | Jours, périodes (matin, après-midi, soir, nuit), activités qui prennent du temps, emplois du temps des habitants | Jour |
| 8 | **Liens sociaux** | Un niveau de lien par personnage, les scènes débloquées à chaque niveau, les bonus en combat | Jour → nuit |
| 9 | **Combat** (fait : les planches d'animations des combattants dans la base de données, voir [11](editeur/11-planches.md) ; la maquette `design/combat.pen` ; étape 1 du moteur : le terrain sur la carte avec les combattants animés, la jauge et les cartes de l'équipe ; étape 2 : la jauge qui avance, les commandes (attaque, attaque forte, défendre, fuir), la cible, l'attaque jouée avec ses dégâts ; étape 3 : les règles (dégâts, éléments, météo, magie et incantation, objets, états, comportement des ennemis) ; étape 4 : interrompre une action avec une attaque forte ; étape 5 : la fenêtre de fin (victoire avec l'expérience, les niveaux, le butin ; défaite) et la progression de l'équipe gardée entre les combats. l'action d'événement « Soigner l'équipe » ; étape 6 : le coup reçu (le touché clignote en rouge, sa jauge s'arrête le temps de l'animation). étape 8 : la mise en scène des compétences et magies (tout s'arrête, le nom en gros, la caméra sur le lanceur puis sur la cible, les coups reçus après). étape 7 : l'étourdissement après un coup (« Étourdi après un coup » sur la fiche d'un personnage ou d'un ennemi). les compétences (étape 1) : portée (le lanceur s'approche) et zone d'effet (cible unique, autour de la cible, tout le terrain). étape 2 : les animations d'effet des compétences (sur la cible, projectile puis impact, sur la zone ; jouées pendant la mise en scène, les effets tombent sur leur image du coup ; aperçu dans l'éditeur). étape 3 : les animations des 7 compétences dessinées avec PixelLab (boule de feu et lance de glace en projectile puis impact, orage, soin, venin et coup double sur la cible, berceuse sur la zone). Simuler un combat (Menu → Simuler un combat : un groupe, une carte, une équipe avec ses niveaux ; rien n'est gardé). L'animation d'un type d'arme pour ses attaques, à part de la planche (la flèche de l'arc). Les combattants et les effets toujours de face (tournés vers la caméra) et dessinés par-dessus la carte (plus rien ne les coupe). À suivre : l'équilibrage, les animations propres aux boss) | Tour par tour à la Grandia : jauge d'action, interrompre l'action d'un ennemi ; la météo du donjon change les éléments et les effets ; réglable depuis la base de données | Nuit |
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

### Personnages et événements dans l'éditeur de carte — fait en grande partie

Poser un PNJ ou un panneau, écrire son dialogue dans l'éditeur, choisir ce qui le déclenche, sans coder.

- Déclencheurs : parler, entrer dans une zone, une heure, une météo, un objet possédé.
- Actions : dialogue (avec choix), téléporter, donner un objet, changer la météo, jouer un son, lancer un combat.
- Fait : voir [09-evenements](editeur/09-evenements.md), y compris « donner un objet » et « lancer un combat » (le vrai combat viendra au point 9). Reste une arrivée choisie pour « Téléporter ».

### Éditeur de musique (MIDI lo-fi) — en cours (faits : composer et écouter, mixage et son lo-fi, un morceau par moment et par carte ; restent le moment Donjon et l'import MIDI, voir [07-musique](editeur/07-musique.md))

Une musique d'ambiance par zone, qui change avec la météo et l'heure, composée dans un éditeur simple, dans l'esprit de **Mario Paint** (on pose des notes-tampons sur une portée, et ça joue en boucle).

- **Grille de pas** (step sequencer) : quelques pistes (mélodie, basse, accords, batterie), des cases à cocher par temps, des boucles de 1 à 8 mesures.
- **Sons synthétisés** en direct (comme les sons de météo) : carré, triangle, dents de scie, bruit pour la batterie. Côté **lo-fi** : filtre doux, léger souffle, craquements de vinyle, petit décalage de rythme (swing).
- **Gammes** proposées pour ne jamais sonner faux : on choisit une tonalité, la grille ne montre que ses notes.
- **Variantes** : la même musique jour / nuit / pluie (instruments ou filtre qui changent), avec un fondu entre elles.
- Export en fichier du jeu (comme les modèles) ; plus tard, import d'un fichier MIDI.
- Utilisable sur téléphone, comme l'éditeur de modèles.

### Base de données (point 5) — fait

Une page à part (`/#/base`), comme les variables ou la musique : un onglet par table, la liste puis la fiche.

- **Tables** : Éléments, Types d'armes, États, Compétences, Objets, Personnages, Ennemis, Groupes.
- **Stats fixes** (comme Persona) : PV, PM, Force, Magie, Endurance, Agilité, Chance.
- **Éléments** : on les crée soi-même ; pour chacun, les météos qui le renforcent ou l'affaiblissent. Un élément peut être **composé** de deux autres (Feu + Vent = Foudre).
- **Types d'armes** : épée, arc, poings… Ils jouent pour les compétences physiques le rôle des éléments pour la magie. L'élément Physique ne sert plus à apprendre : il reste seulement pour les dégâts et les résistances.
- **États** : nom, icône, durée, effet (dégâts par tour, stat modifiée, passe son tour) ; compétences et objets en donnent ou en guérissent.
- **Compétences** : coût en PM et temps d'incantation sur la jauge d'action (à la Grandia). Effet = une liste d'effets simples (dégâts avec élément et puissance, soin, état, stat, cible), avec une formule en option pour les cas spéciaux.
- **Apprendre les compétences, à la Grandia** : on progresse dans les éléments et les armes qu'on utilise. Chaque élément et chaque type d'arme a son niveau, par personnage. Une compétence s'apprend quand le niveau demandé est atteint, dans un élément ou une arme (Épée 4), ou dans les deux éléments d'un élément composé (Foudre : Feu 5 + Vent 3). On gagne de l'expérience d'élément en utilisant ses compétences (une compétence composée en donne aux deux), avec des objets, avec l'équipement (donner un élément ou le faire monter plus vite) et avec les liens sociaux. Chaque personnage a une affinité par élément et par arme : rapide, normal, lent ou jamais. Une même courbe d'expérience pour tous les niveaux d'élément et d'arme ; l'affinité la rend plus rapide ou plus lente.
- **Objets** : consommables (dont amélioration permanente d'une stat), équipement (bonus, résistances, qui peut le porter), objets clés, cadeaux.
- **Personnages** : niveaux et expérience ; pour chaque stat une valeur au niveau 1 et au niveau max (courbe) ; niveau de départ dans chaque élément et chaque arme, et son affinité. Apparence : modèle 3D (carte), sprite de combat 2D plat à la Grandia, petite image pour la jauge d'action et les menus, portrait.
- **Ennemis** : stats, faiblesses, butin (expérience, argent, objets avec une chance en %), comportement (compétences avec un poids et des conditions simples), météos et heures où il apparaît ou devient plus fort. **Groupes** : on place les ennemis sur le terrain (vue de dessus).
- **Images** : un petit éditeur pixel dans les fiches pour les icônes (16×16), les portraits et les sprites de combat, avec import d'un PNG possible.
- **Événements** : donner / retirer un objet, donner de l'argent ; conditions « a l'objet », « argent ≥ » ; faire entrer / sortir un personnage de l'équipe, soigner l'équipe ; lancer un combat avec les branches Victoire / Défaite / Fuite.
- **Étapes** (une par session, validée) : 1) maquette `design/database.pen` (téléphone et ordinateur) — fait ; 2) la page, Éléments, Types d'armes et États, avec l'éditeur pixel des icônes — fait ; 3) Compétences — fait ; 4) Objets — fait ; 5) Personnages — fait ; 6) Ennemis et groupes — fait ; 7) les liens avec les événements — fait, avec « Soigner l'équipe » depuis le combat (point 9).

### Zones d'action sur les objets

Aujourd'hui, une porte (passage) ou un événement occupe toute la largeur de l'objet. Pouvoir dessiner la zone d'action dans l'éditeur (la porte seule de la maison, le devant d'un panneau), sur la carte ou dans le modèle.

## À trier

### Le socle commun (sandbox et RPG)

- **Sauvegarde de partie** (fait, voir [05](editeur/05-sauvegarde-export.md#sauvegarde-de-partie)) : position, inventaire, progression, drapeaux d'histoire ; plusieurs emplacements.
- **Objets et inventaire** (fait, dans la base de données, voir [10](editeur/10-base-de-donnees.md)), avec un éditeur de données (nom, icône, prix, effet) façon RPG Maker.
- **PNJ avec un emploi du temps** : où ils sont selon l'heure et la météo (à l'abri quand il pleut, chez eux la nuit).
- **Plusieurs cartes et des intérieurs** (fait, point 0) : portes qui mènent dans les maisons, transitions.
- **Cinématiques** : la caméra bouge, les personnages marchent, des dialogues s'enchaînent.
- **Lumières** : torches, lampadaires, fenêtres qui éclairent vraiment le sol la nuit.
- **Synchroniser les créations entre appareils** : export / import d'un fichier `.pk` par la fenêtre de partage (fait, point 1), puis un bouton « Publier » vers le dépôt GitHub (reste à faire).

### Pour la vie quotidienne (le jour)

- **Cultures** : cases de sol à labourer (comme la peinture des sols), plantes qui poussent jour après jour ; la pluie arrose, le gel abîme.
- **Saisons et calendrier** : la météo tirée au sort suit la saison, des fêtes à certaines dates.
- **Métiers** avec des niveaux : pêche (selon la météo et l'heure), minage, cueillette, cuisine.
- **Construire et décorer** en jeu : l'éditeur de carte, version joueur (poser des meubles, des clôtures).
- **Amitié avec les habitants** : discuter, offrir des cadeaux, débloquer des scènes.
- **Boutiques** : acheter, vendre, une petite économie.

### Pour les donjons et les combats (la nuit)

- **La météo en combat** : la pluie affaiblit le feu, l'orage renforce l'électrique, le brouillard fait rater les attaques. Les 61 météos deviennent une vraie mécanique.
- **Une équipe** qui suit le joueur sur la carte, des compétences, de l'expérience (faits : les compétences et l'expérience, points 5 et 9 ; reste : l'équipe qui suit le joueur).
- **Donjons avec énigmes** : interrupteurs, blocs à pousser, portes, avec les déclencheurs de l'éditeur de carte.
- **Dialogues à choix** (fait, point 4) qui changent la suite de l'histoire.
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
