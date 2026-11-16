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
