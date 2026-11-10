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
