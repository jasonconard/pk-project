/** What changed in one version of the game, in simple words for the players. */
export interface ReleaseNote {
  /** Version number, as in package.json (without the "v"). */
  version: string;
  /** Release date (YYYY-MM-DD). */
  date: string;
  /** One simple sentence per change, in French, from the player's point of view. */
  notes: string[];
}

/**
 * Release notes shown in the game (click on the version number). The latest version comes first.
 * Updated at each release by the `release` Claude skill (.claude/skills/release/SKILL.md).
 */
export const RELEASE_NOTES: ReleaseNote[] = [
  {
    version: '0.0.49',
    date: '2026-11-28',
    notes: [
      'L\'interface des combats est maintenant en pixel art, comme le reste du jeu : des cadres ardoise et or et une police en pixels.',
      'Les commandes se choisissent sur un anneau d\'icônes qui tourne autour du combattant : la commande choisie est devant, avec son nom dessous.',
      'La jauge d\'action, la fenêtre de la cible, les listes de magies et d\'objets et les cartes de l\'équipe ont le même style.',
      'La fenêtre de fin de combat aussi : « Victoire ! » en doré, « Défaite… » en rouge.',
    ],
  },
  {
    version: '0.0.48',
    date: '2026-11-27',
    notes: [
      'Les combats se jouent dans une arène dégagée, puis l\'équipe revient où elle était.',
      'Les combats ont plus d\'impact : des sons pour les coups et les magies, un vrai tonnerre pour la foudre, et un boss vaincu tombe lentement pendant que l\'écran tremble.',
      'Chaque ennemi a sa voix et ses bruits de pas. Un combattant touché clignote avant de repartir, et un ennemi qui prépare une magie scintille.',
      'La Grotte de cristal est maintenant un donjon fixe : salles reliées à la main, ennemis à leur place, le Gardien attend au fond sans bouger.',
      'Éditeur : arènes de combat, donjons faits à la main, cartes rangées en sections, et un déroulé pour chaque compétence (animations, sons et coups placés dans le temps, avec un aperçu).',
    ],
  },
  {
    version: '0.0.47',
    date: '2026-11-27',
    notes: [
      'Premier donjon complet : la Grotte de cristal, près de la ville. Une ancienne mine, des galeries qui changent à chaque visite, un lac souterrain et un gardien tout au fond.',
      'Dix nouveaux ennemis et l\'élément Terre. Sur la carte, les ennemis marchent et se tournent vers là où ils vont.',
      'L\'image se ferme et se rouvre quand on change de lieu et quand un combat commence ou finit.',
      'Éditeur : parois de roche inclinées à peindre case par case, six transitions à choisir pour tout le jeu, un lieu ou un groupe d\'ennemis, et une lueur de couleur pour chaque modèle.',
      'Menu : « Essayer un donjon » fait entrer tout de suite à l\'étage choisi, avec une équipe de test.',
    ],
  },
  {
    version: '0.0.46',
    date: '2026-11-27',
    notes: [
      'Le jeu a un calendrier (la date, les moments de la journée, les jours spéciaux, l\'Agenda) et des liens avec l\'équipe et les habitants, qui donnent des scènes et des bonus en combat.',
      'La nuit, les donjons s\'ouvrent : des étages avec des ennemis visibles, des coffres, des pièges et leur propre musique.',
      'Le jour, on peut acheter et vendre dans les boutiques, cultiver des plantes fantastiques, et l\'équipe marche derrière le joueur.',
      'La nuit, les lampadaires, le feu de camp et la lanterne éclairent vraiment le sol.',
      'Éditeur : cinématiques, mode test, modèles animés, zones d\'action et import de fichiers MIDI.',
    ],
  },
  {
    version: '0.0.45',
    date: '2026-11-25',
    notes: [
      'fix: Le personnage ne recule plus d\'un pixel quand il s\'arrête, et le décor défile plus régulièrement.',
    ],
  },
  {
    version: '0.0.44',
    date: '2026-11-25',
    notes: [
      'Les personnages sur la carte sont parfaitement nets : chaque pixel du sprite a la même taille à l\'écran.',
      'La caméra suit le joueur en douceur et le décor défile sans à-coups.',
      'Menu → Qualité graphique : le rendu rétro donne de gros pixels, comme sur une console portable.',
      'Menu → Qualité graphique : la caméra glissante peut être coupée pour garder la caméra collée au joueur.',
    ],
  },
  {
    version: '0.0.43',
    date: '2026-11-25',
    notes: [
      'Hugo marche sur la carte avec un nouveau sprite, dans le même style que les autres personnages.',
      'Dans les dialogues de la ville, Hugo et Jason ont leurs nouveaux portraits.',
      'Éditeur : la base de données a une table PNJ, avec le premier habitant, Bernard le boulanger.',
      'Éditeur : chaque personnage et PNJ a une planche de marche, à dessiner image par image ou à importer.',
      'Éditeur : le nouvel onglet PNJ pose les habitants sur la carte. On peut leur parler, et ils se tournent vers le joueur.',
    ],
  },
  {
    version: '0.0.42',
    date: '2026-11-23',
    notes: [
      'Combat : Jason a un nouveau sprite, dans le même style que Hugo. Il bande son arc et tire.',
      'Combat : les flèches volent jusqu\'à leur cible. Chaque type d\'arme peut avoir sa propre animation d\'attaque.',
      'Combat : les combattants sont toujours vus de face et ne sont plus cachés par le décor.',
      'Hugo et Jason ont de nouveaux portraits dans les dialogues.',
      'Menu : Simuler un combat permet d\'essayer un combat contre un groupe d\'ennemis, sur la carte et avec l\'équipe de son choix. Rien n\'est gardé après.',
      'Éditeur : une fiche de la base de données peut reprendre la version du jeu.',
    ],
  },
  {
    version: '0.0.41',
    date: '2026-11-23',
    notes: [
      'Combat : Hugo et les monstres ont de nouveaux sprites, plus détaillés.',
      'Combat : un combattant touché clignote en rouge et perd un peu de temps ; certains restent étourdis.',
      'Combat : les compétences et la magie sont mises en scène. Le combat s\'arrête, leur nom s\'affiche en gros et une animation se joue : une boule de feu qui explose, un orage, une berceuse…',
      'Combat : une compétence a une portée et peut toucher une zone autour de sa cible. Un arc tire de loin.',
      'La jauge d\'action avance plus doucement et sans à-coups.',
    ],
  },
  {
    version: '0.0.40',
    date: '2026-11-22',
    notes: [
      'Combat : la jauge d\'action fonctionne comme dans Grandia. Les ennemis décident de leur action plus tôt, et brillent quand ils préparent un sort.',
      'Une attaque forte annule l\'action d\'un ennemi qui se prépare ou qui s\'avance, et le renvoie en arrière sur la jauge.',
      'Pour choisir une cible, la caméra s\'approche d\'elle et elle clignote. Sa fenêtre montre ses PV, ses états, sa prochaine action et ses faiblesses.',
      'On peut aussi toucher un ennemi pour le viser.',
    ],
  },
  {
    version: '0.0.39',
    date: '2026-11-22',
    notes: [
      'Les combats arrivent, à la Grandia : ils se jouent sur la carte, avec la jauge d\'action, les attaques, la magie, les objets et les états.',
      'Une attaque forte au bon moment interrompt l\'action d\'un ennemi.',
      'Après une victoire, l\'équipe gagne de l\'expérience, des niveaux, et progresse dans les éléments et les armes qu\'elle utilise.',
      'Hugo, la chauve-souris et le gluant des neiges ont leurs animations de combat. Événements : nouvelle action pour soigner l\'équipe.',
      'Sur mobile : le menu du jeu et le menu « ⋮ » de l\'éditeur défilent quand l\'écran est petit.',
    ],
  },
  {
    version: '0.0.38',
    date: '2026-11-21',
    notes: [
      'Base de données : chaque personnage et chaque ennemi a maintenant une planche de combat, avec ses animations : attente, marche, attaque, attaque forte, incantation, magie, coup reçu et mort.',
      'La planche s\'importe en PNG : ses images sont comptées toutes seules, et un aperçu les joue dans les 4 directions.',
      'Pour chaque animation, on règle sa vitesse, si elle tourne en boucle, et l\'image où le coup touche.',
      'Le gluant a sa planche : un corps de gelée qui tremble, s\'étale en avançant et fond quand il est vaincu.',
    ],
  },
  {
    version: '0.0.37',
    date: '2026-11-20',
    notes: [
      'Base de données : on y crée maintenant les compétences, les objets, les personnages, les ennemis et leurs groupes.',
      'Les compétences s\'apprennent à la Grandia : chaque personnage progresse dans les éléments et les armes qu\'il utilise.',
      'Les portraits et les sprites de combat se dessinent en pixel art, en plus grand que les icônes.',
      'Événements : nouvelles actions pour donner un objet ou de l\'argent, faire entrer un personnage dans l\'équipe ou lancer un combat. Les conditions peuvent vérifier ce que l\'équipe possède.',
      'Dans un événement, les actions d\'une réponse ou d\'une condition se jouent bien avant la suite.',
    ],
  },
  {
    version: '0.0.36',
    date: '2026-11-20',
    notes: [
      'Éditeur : dans un événement, un choix propose 2 à 4 réponses, et chaque réponse a ses propres actions.',
      'Une condition joue des actions si elle est vraie, et d\'autres sinon. Nouvelle action « Arrêter », et un portrait peut s\'afficher à côté d\'un message.',
      'En jeu, on peut aussi choisir une réponse à la souris.',
      'Nouvel éditeur : la base de données. On y crée les éléments (feu, glace…), les types d\'armes et les états (poison, sommeil…), chacun avec une icône à dessiner en pixel art.',
      'Éditeur : les météos se choisissent dans une liste avec leur image et une recherche.',
    ],
  },
  {
    version: '0.0.35',
    date: '2026-11-20',
    notes: [
      'Éditeur : un objet peut maintenant avoir des événements. On choisit ce qui le déclenche : lui parler, marcher dessus, ou tout seul.',
      'Un événement peut dépendre des variables, de l\'heure ou de la météo. Il peut afficher des messages, changer une variable, téléporter, changer la météo, jouer un petit son ou faire une pause.',
      'Un personnage peut se tourner vers le joueur quand on lui parle.',
      'Éditeur : nouvel onglet Événements, pour poser des zones invisibles qui déclenchent quelque chose quand on entre dedans.',
      'Écrire dans un champ ne déclenche plus les raccourcis du jeu (météo, éditeur, déplacements).',
    ],
  },
  {
    version: '0.0.34',
    date: '2026-11-19',
    notes: [
      'Nouveau dans le menu : Sauver. Trois emplacements pour sauver la partie et la reprendre plus tard, au même endroit, à la même heure et avec la même météo.',
      'Éditeur : nouvel éditeur Variables. Il crée les drapeaux (oui ou non) et les compteurs qui retiendront ce qui se passe dans l\'histoire.',
      'Nouveau dans le menu : Test des variables, pour voir et changer leur valeur pendant la partie.',
      'Projet de jeu : le menu montre ce que contient l\'appareil, et l\'import compare le fichier avec ce qu\'il va remplacer.',
    ],
  },
  {
    version: '0.0.33',
    date: '2026-11-19',
    notes: [
      'Nouveau dans le menu : Projet de jeu. Il met toutes vos créations (cartes, modèles, musiques) dans un seul fichier .pk.',
      'Importer un fichier .pk remplace les créations de l\'appareil par celles du fichier, après confirmation.',
      'Vous pouvez ainsi passer vos créations du téléphone à l\'ordinateur, et inversement.',
      'Sur l\'application Android, le bouton Envoyer… partage le fichier par Drive, mail, Bluetooth ou dans Fichiers.',
    ],
  },
  {
    version: '0.0.32',
    date: '2026-11-19',
    notes: [
      'Éditeur de musique : chaque carte peut avoir ses propres morceaux (jour, nuit, pluie, combat), choisis dans le volet Jeu.',
      'En changeant de carte, la musique passe en fondu à celle de la nouvelle carte.',
    ],
  },
  {
    version: '0.0.31',
    date: '2026-11-18',
    notes: [
      'Sur Android : le bouton retour ne met plus le jeu en arrière-plan. Il ferme la dernière chose ouverte, et ouvre le menu quand rien n\'est ouvert.',
      'Le bouton retour ferme aussi les volets des éditeurs de musique et de modèles.',
    ],
  },
  {
    version: '0.0.30',
    date: '2026-11-18',
    notes: [
      'Éditeur : les éditeurs de musique et de modèles s\'ouvrent par-dessus le jeu, sans le recharger. Le jeu s\'arrête derrière et reprend avec tes changements.',
      'Éditeur : le bouton « Modèle » d\'un objet ouvre directement son modèle.',
      'Sur Android : le bouton retour ferme la dernière chose ouverte, comme Échap.',
    ],
  },
  {
    version: '0.0.29',
    date: '2026-11-18',
    notes: [
      'Nouvelle interface : l\'horloge en haut à gauche montre le moment, la météo et la température, et ouvre l\'ambiance quand on la touche.',
      'Le bouton Menu (ou Échap) réunit le plein écran, le son, la qualité graphique et les nouveautés.',
      'Sur mobile : un bouton pour courir, et un bouton d\'action qui montre quoi faire devant un objet (Entrer, Parler, Lire). Au clavier, la touche E fait l\'action et Maj fait courir.',
      'Éditeur : une nouvelle interface, adaptée au téléphone en portrait, au téléphone en paysage et à l\'ordinateur, avec une recherche d\'objets sur ordinateur. L\'onglet Morceaux s\'appelle maintenant Zones.',
      'Éditeur : on peut tourner un objet (R) et le dupliquer (Ctrl D). Échap ferme d\'abord la dernière chose ouverte.',
    ],
  },
  {
    version: '0.0.28',
    date: '2026-11-17',
    notes: [
      'Éditeur : le jeu peut avoir plusieurs cartes (monde, ville, intérieur, donjon). Touche le nom de la carte, en haut, pour en créer, ouvrir, renommer, dupliquer ou exporter.',
      'Éditeur : l\'onglet Morceaux agrandit ou réduit une carte, et place son point d\'arrivée.',
      'Éditeur : un objet peut devenir une porte ou une sortie vers une autre carte, avec le point d\'arrivée de ton choix.',
      'Le jeu reste léger sur les grandes cartes : seuls les alentours du joueur sont construits.',
    ],
  },
  {
    version: '0.0.27',
    date: '2026-11-17',
    notes: [
      'Tes musiques jouent dans le jeu : choisis-en une pour le jour, la nuit, la pluie et les combats, avec un fondu entre elles.',
      'Un curseur Musique dans le réglage du son.',
      'Éditeur de musique : 12 nouveaux instruments (flûte, ocarina, harpe, célesta, cordes…), à choisir pour chaque morceau et à écouter avant.',
      'Une batterie plus douce et un léger écho sur la musique.',
    ],
  },
  {
    version: '0.0.26',
    date: '2026-11-16',
    notes: [
      'Éditeur de musique : règle le volume de chaque instrument et donne un son lo-fi à ton morceau (chaleur, grain, cassette, vinyle, swing).',
      'Éditeur de musique : des rythmes de batterie tout faits, et copier-coller une mesure.',
      'Éditeur de musique : glisse le doigt pour faire durer une note sur plusieurs temps.',
    ],
  },
  {
    version: '0.0.25',
    date: '2026-11-16',
    notes: [
      'Nouveau : l\'éditeur de musique, à ouvrir depuis l\'éditeur de carte avec le bouton Musique.',
      'Pose des notes comme des tampons sur une grille : elles suivent toujours la gamme choisie, impossible de jouer faux.',
      'Cinq instruments, une batterie, et ton morceau tourne en boucle pendant que tu composes.',
      'Le bouton météo affiche toujours l\'image de la météo, même au lancement.',
    ],
  },
  {
    version: '0.0.24',
    date: '2026-11-16',
    notes: [
      'Sur Android, l\'appli propose aussi la nouvelle version quand tu y reviens, sans avoir à la relancer.',
    ],
  },
  {
    version: '0.0.23',
    date: '2026-11-16',
    notes: [
      'Après une mise à jour, les nouveautés s\'affichent dans une petite fenêtre avec les dernières versions.',
    ],
  },
  {
    version: '0.0.22',
    date: '2026-11-16',
    notes: [
      'Après une mise à jour, la fenêtre des nouveautés s\'ouvre toute seule pour montrer ce qui a changé.',
    ],
  },
  {
    version: '0.0.21',
    date: '2026-11-16',
    notes: [
      'Sur Android, la mise à jour automatique du jeu fonctionne (une dernière installation de l\'APK est nécessaire).',
    ],
  },
  {
    version: '0.0.20',
    date: '2026-11-16',
    notes: [
      'Éditeur de modèles sur mobile en paysage : fais glisser la barre du haut pour atteindre tous les boutons, comme Exporter.',
    ],
  },
  {
    version: '0.0.19',
    date: '2026-11-16',
    notes: [
      'Sur Android, l\'appli se met à jour toute seule : plus besoin de réinstaller l\'APK à chaque nouvelle version.',
    ],
  },
  {
    version: '0.0.18',
    date: '2026-11-16',
    notes: [
      'Le jeu et les sons se mettent en pause quand tu quittes l\'appli, et reprennent à ton retour.',
      'Sur mobile, courir en se déplaçant ne bloque plus les boutons, et les boutons A B X Y sont plus proches.',
      'Sur mobile en portrait, les réglages météo sont en colonne à droite et les outils de l\'éditeur à gauche.',
      'Le téléphone vibre légèrement sur les boutons et les actions ; tu peux couper les vibrations dans le menu de qualité.',
    ],
  },
  {
    version: '0.0.17',
    date: '2026-11-16',
    notes: [
      'Éditeur de modèles sur mobile : choisis le mode Modélisation ou Dessin, et ouvre chaque réglage dans un volet qui monte du bas.',
      'Éditeur de modèles : pince à deux doigts pour zoomer sur une face et déplace-la à deux doigts.',
      'Éditeur de modèles sur ordinateur : une barre en haut et un panneau mieux rangé.',
      'Les icônes de l\'éditeur et de la barre météo sont plus nettes et plus lisibles.',
      'Sur mobile, le choix de la météo prend tout l\'écran : touche une météo pour voir sa fiche, puis applique-la.',
    ],
  },
  {
    version: '0.0.16',
    date: '2026-11-14',
    notes: [
      'Nouveau : l\'éditeur de modèles 3D, à ouvrir depuis l\'éditeur de carte avec le bouton Modèles.',
      'Construis un modèle avec des blocs et des panneaux, puis peins chaque face en pixel art.',
      'Dessine au crayon, à la gomme, au pot de peinture, en ligne ou en rectangle, et importe tes palettes d\'Aseprite ou de Lospec.',
      'Peins aussi les reflets du soleil, les lumières de la nuit et le relief.',
      'Tes modèles modifiés apparaissent tout de suite dans le jeu.',
    ],
  },
  {
    version: '0.0.15',
    date: '2026-11-10',
    notes: [
      'Le jeu reste fluide après avoir monté ou descendu le sol dans l\'éditeur.',
      'La pluie et la neige tombent bien sur le sol après un changement de relief.',
    ],
  },
  {
    version: '0.0.14',
    date: '2026-11-10',
    notes: [
      'Clique sur le numéro de version, dans le menu de qualité, pour voir les nouveautés de chaque version.',
      'L\'éditeur de carte est plus léger quand on déplace la vue.',
    ],
  },
  {
    version: '0.0.13',
    date: '2026-11-10',
    notes: [
      'On peut se déplacer de côté sur des escaliers collés les uns aux autres.',
    ],
  },
  {
    version: '0.0.12',
    date: '2026-11-10',
    notes: [
      'Éditeur : une grille peut s\'afficher pour voir chaque case.',
      'Éditeur : un nouvel outil enlève les escaliers sans toucher au sol.',
      'Éditeur sur mobile : on glisse pour déplacer la vue, on touche pour poser et on écarte deux doigts pour zoomer.',
      'On peut monter des escaliers collés par n\'importe quel endroit de leur largeur.',
    ],
  },
  {
    version: '0.0.11',
    date: '2026-11-09',
    notes: [
      'Sur iPhone et iPad, le son peut marcher même en mode silencieux.',
    ],
  },
  {
    version: '0.0.10',
    date: '2026-11-09',
    notes: [
      'Sur Safari, le son démarre bien et revient après une interruption (un appel, une autre appli).',
    ],
  },
  {
    version: '0.0.9',
    date: '2026-11-09',
    notes: [
      'Nouvelle météo : la jungle.',
    ],
  },
  {
    version: '0.0.8',
    date: '2026-11-09',
    notes: [
      'Le jeu installé sur l\'écran d\'accueil propose de redémarrer quand une nouvelle version est prête.',
    ],
  },
  {
    version: '0.0.7',
    date: '2026-11-09',
    notes: [
      'Sur iPhone, le jeu ne passe plus sous la barre d\'état et les boutons restent accessibles.',
      'Le jeu est plus fluide au démarrage et pendant la partie.',
    ],
  },
  {
    version: '0.0.6',
    date: '2026-11-09',
    notes: [
      'Nouvelle météo de nuit : l\'énergie montante.',
    ],
  },
  {
    version: '0.0.5',
    date: '2026-11-08',
    notes: [
      'L\'application Android propose la nouvelle version dès qu\'elle sort.',
    ],
  },
  {
    version: '0.0.4',
    date: '2026-11-08',
    notes: [
      'Le jeu existe en application Android.',
    ],
  },
  {
    version: '0.0.3',
    date: '2026-11-08',
    notes: [
      'Le pied de la boîte aux lettres s\'affiche correctement.',
      'Le brouillard n\'a plus de traits visibles sur mobile.',
    ],
  },
  {
    version: '0.0.2',
    date: '2026-11-08',
    notes: [
      'Le jeu ne se fige plus quand un tremblement de terre commence.',
    ],
  },
  {
    version: '0.0.1',
    date: '2026-11-08',
    notes: [
      'Première version publiée : la carte, les météos, l\'éditeur de carte et les réglages de qualité graphique.',
      'Le jeu s\'installe sur l\'écran d\'accueil et le numéro de version s\'affiche dans le menu de qualité.',
    ],
  },
];
