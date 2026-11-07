import { WeatherType } from './Weather';

/** Catalog of the weathers shown in the weather popup: categories, texts, screenshots. */

export type WeatherCategory = 'classic' | 'rain' | 'cold' | 'heat' | 'nature' | 'magic' | 'dark';

export const WEATHER_CATEGORIES: { id: WeatherCategory, label: string, icon: string }[] = [
  { id: 'classic', label: 'Classiques', icon: '☀️' },
  { id: 'rain', label: 'Pluie & tempêtes', icon: '🌧️' },
  { id: 'cold', label: 'Froid', icon: '❄️' },
  { id: 'heat', label: 'Chaleur & feu', icon: '🔥' },
  { id: 'nature', label: 'Nature', icon: '🌿' },
  { id: 'magic', label: 'Magie & ciel', icon: '✨' },
  { id: 'dark', label: 'Sombre & surnaturel', icon: '🌑' },
];

export interface WeatherInfo {
  category: WeatherCategory;
  /** One line, on the card. */
  summary: string;
  /** A few sentences, in the detail panel. */
  description: string;
  /** What it does, listed in the detail panel. */
  effects: string[];
  /** Has its own sounds (badge). */
  sound: boolean;
}

export const WEATHER_INFO: Record<WeatherType, WeatherInfo> = {
  [WeatherType.NEUTRAL]: {
    category: 'classic', sound: false,
    summary: 'Lumière simple, sans effet.',
    description: 'Une lumière claire et neutre, sans nuages ni effets : la scène telle quelle, avec les ombres des bâtiments.',
    effects: ['Ombres nettes', 'Aucun effet météo'],
  },
  [WeatherType.SUNNY]: {
    category: 'classic', sound: false,
    summary: 'Grand soleil, rayons et reflets.',
    description: 'Un grand soleil : rayons de lumière dans l\'air, reflets brillants sur les toits, façades dorées côté soleil.',
    effects: ['Rayons de soleil', 'Reflets sur les toits', 'Façades réchauffées'],
  },
  [WeatherType.CLOUDY]: {
    category: 'classic', sound: false,
    summary: 'Ombres de nuages qui défilent.',
    description: 'Le ciel se couvre : les ombres des nuages glissent sur le sol avec le vent, la lumière devient plus douce.',
    effects: ['Ombres de nuages mobiles', 'Lumière douce'],
  },
  [WeatherType.FOG]: {
    category: 'classic', sound: false,
    summary: 'Brouillard épais qui dérive.',
    description: 'Un brouillard épais, plus dense au loin et au ras du sol, qui dérive en nappes avec le vent. La nuit, les fenêtres percent la brume.',
    effects: ['Brouillard en nappes', 'Visibilité réduite au loin'],
  },
  [WeatherType.STALKING_FOG]: {
    category: 'classic', sound: false,
    summary: 'Le brouillard s\'ouvre quand on marche, se referme à l\'arrêt.',
    description: 'Un mur de brouillard entoure le joueur. Quand il marche, la brume s\'écarte et révèle les alentours ; dès qu\'il s\'arrête, elle se referme lentement sur lui, comme si elle l\'attendait.',
    effects: ['Éclaircie autour du joueur', 'Rayon qui suit le mouvement', 'Bord déchiré qui ondule'],
  },
  [WeatherType.MORNING_MIST]: {
    category: 'classic', sound: true,
    summary: 'Brume basse à l\'aube, qui se dissipe au lever du soleil.',
    description: 'Le petit matin : des nappes de brume basse traînent au ras du sol, les rayons du soleil levant les traversent, la rosée brille et les oiseaux se réveillent. La brume dépend de l\'heure : épaisse de 3 h à 7 h, elle se déchire quand le soleil monte et disparaît vers 10 h. Choisie à un autre moment, l\'heure passe à 6 h.',
    effects: ['Nappes de brume au sol', 'Rayons de soleil', 'Rosée', 'Chant des oiseaux', 'Se dissipe avec l\'heure'],
  },
  [WeatherType.SMOG]: {
    category: 'classic', sound: true,
    summary: 'Brume jaune, ville qui gronde au loin.',
    description: 'Une brume jaune-brun épaisse et pesante, un soleil orange pâle, des couleurs ternes. Au loin, la rumeur de la circulation, des klaxons et parfois une sirène.',
    effects: ['Brume polluée', 'Couleurs ternies', 'Bruits de ville lointains'],
  },
  [WeatherType.SEA_MIST]: {
    category: 'classic', sound: true,
    summary: 'Brume bleutée, vagues et mouettes.',
    description: 'Une brume marine bleu-gris arrive par nappes, poussée par un vent léger. On entend la houle respirer et des mouettes au loin.',
    effects: ['Brume bleu-gris', 'Vent léger permanent', 'Vagues et mouettes'],
  },
  [WeatherType.DRIZZLE]: {
    category: 'rain', sound: true,
    summary: 'Fine pluie légère et grise.',
    description: 'Une bruine fine et dense sous un ciel gris clair. Le sol se mouille doucement, avec un léger voile de brume.',
    effects: ['Fines gouttes', 'Sol mouillé', 'Brume légère'],
  },
  [WeatherType.RAINY]: {
    category: 'rain', sound: true,
    summary: 'Pluie, flaques et sol mouillé.',
    description: 'Une vraie pluie : le sol s\'assombrit, des flaques se forment dans les creux et reflètent le ciel, les gouttes y font des ronds.',
    effects: ['Pluie', 'Flaques qui se remplissent', 'Pas dans l\'eau'],
  },
  [WeatherType.SPRING_SHOWER]: {
    category: 'rain', sound: true,
    summary: 'Averse dorée sous le soleil.',
    description: 'Une averse légère en plein soleil : les gouttes brillent à contre-jour, les rayons percent et les oiseaux chantent.',
    effects: ['Gouttes dorées', 'Rayons de soleil', 'Chants d\'oiseaux'],
  },
  [WeatherType.STORM]: {
    category: 'rain', sound: true,
    summary: 'Pluie battante, éclairs et tonnerre.',
    description: 'Ciel noir, pluie battante, éclairs simples ou doubles. Le tonnerre arrive plus ou moins tard selon la distance de l\'éclair.',
    effects: ['Grosse pluie', 'Éclairs proches ou lointains', 'Tonnerre varié'],
  },
  [WeatherType.THUNDER_RAIN]: {
    category: 'rain', sound: true,
    summary: 'La foudre frappe le sol, l\'électricité s\'y propage.',
    description: 'Une pluie battante sous un ciel noir. Toutes les quelques secondes, la foudre frappe le sol à un endroit visible : un éclair ramifié, un flash, un coup de tonnerre sec. Depuis l\'impact, des fissures électriques s\'étendent sur le sol, les flaques proches s\'illuminent et grésillent, des étincelles jaillissent. Si elle tombe tout près, l\'écran tremble. Des arcs crépitent sur les toits.',
    effects: ['Éclairs visibles qui frappent le sol', 'Décharges électriques au sol', 'Flaques électrifiées', 'Étincelles', 'Secousse si proche', 'Arcs sur les toits'],
  },
  [WeatherType.MONSOON]: {
    category: 'rain', sound: true,
    summary: 'Déluge tropical chaud, grenouilles.',
    description: 'Une pluie tropicale battante et chaude sous une brume verte : le sol se gorge d\'eau très vite, les grenouilles chantent et l\'orage gronde au loin.',
    effects: ['Pluie très dense', 'Flaques express', 'Grenouilles', 'Tonnerre lointain'],
  },
  [WeatherType.HAIL]: {
    category: 'rain', sound: true,
    summary: 'Grêlons qui rebondissent partout.',
    description: 'Des grêlons blancs tombent très vite et rebondissent sur le sol et les toits, sous un ciel gris foncé.',
    effects: ['Grêlons', 'Éclaboussures blanches', 'Crépitement perlé'],
  },
  [WeatherType.FREEZING_RAIN]: {
    category: 'rain', sound: true,
    summary: 'Pluie fine qui gèle en verglas.',
    description: 'Une pluie fine et glaciale : peu à peu, le sol et les toits se couvrent d\'un verglas bleuté et brillant, et les pas craquent.',
    effects: ['Verglas progressif', 'Reflets glacés', 'Pas qui craquent'],
  },
  [WeatherType.FLOOD]: {
    category: 'rain', sound: true,
    summary: 'L\'eau monte au-dessus du sol.',
    description: 'Une grosse pluie, et l\'eau monte lentement au-dessus du sol jusqu\'à tout recouvrir. Chaque pas éclabousse. L\'eau se retire ensuite.',
    effects: ['Niveau d\'eau qui monte', 'Clapotis', 'Pas dans l\'eau partout'],
  },
  [WeatherType.OLD_FILM]: {
    category: 'magic', sound: true,
    summary: 'Le monde en vieux film noir et blanc.',
    description: 'Le monde devient un vieux film muet : noir et blanc légèrement sépia, grain, image qui saute et scintille, rayures et poussières sur la pellicule, coins assombris. On entend le ronronnement du projecteur et le crépitement de la bobine.',
    effects: ['Noir et blanc sépia', 'Grain et scintillement', 'Rayures et poussières', 'Bruit de projecteur'],
  },
  [WeatherType.ANTIGRAVITY]: {
    category: 'magic', sound: true,
    summary: 'Tout tombe vers le ciel, le joueur flotte.',
    description: 'La gravité s\'est inversée : cailloux et mottes de terre montent lentement vers le ciel, des gouttes d\'eau jaillissent du sol comme une pluie à l\'envers, et le joueur flotte au-dessus du sol en se balançant doucement. Un souffle aérien monte sans fin.',
    effects: ['Cailloux qui montent', 'Pluie à l\'envers', 'Joueur qui flotte', 'Souffle ascendant'],
  },
  [WeatherType.INVERTED]: {
    category: 'magic', sound: true,
    summary: 'Couleurs en négatif, sons à l\'envers.',
    description: 'Une dimension parallèle : tout passe en négatif, les ombres deviennent claires et les lumières sombres, les sons arrivent à l\'envers. Même la température s\'inverse : il fait plus chaud la nuit.',
    effects: ['Image en négatif', 'Ombres claires', 'Sons à l\'envers'],
  },
  [WeatherType.TIME_WARP]: {
    category: 'magic', sound: true,
    summary: 'Le temps ralentit autour de toi.',
    description: 'Le temps se dérègle : tout ralentit, des poussières de lumière restent suspendues, l\'air ondule et des anneaux se propagent autour de toi. Une horloge égrène ses secondes, étirées et graves.',
    effects: ['Ralenti', 'Anneaux autour du joueur', 'Poussières figées', 'Horloge au ralenti'],
  },
  [WeatherType.GEYSERS]: {
    category: 'nature', sound: true,
    summary: 'Bouches de vapeur qui entrent en éruption.',
    description: 'Un air tiède et brumeux : quelques bouches fument doucement, gargouillent… puis crachent une haute colonne de vapeur en sifflant. Ne reste pas dessus, elles te projettent en l\'air !',
    effects: ['Vapeur qui s\'échappe du sol', 'Éruptions', 'Le joueur est projeté', 'Gargouillis et sifflement'],
  },
  [WeatherType.EARTHQUAKE]: {
    category: 'rain', sound: true,
    summary: 'Le sol tremble par secousses.',
    description: 'De temps en temps, la terre tremble : l\'image secoue, de la poussière tombe le long des murs et monte du sol, un grondement sourd fait vibrer l\'air. Puis tout redevient calme… jusqu\'à la prochaine secousse.',
    effects: ['Secousses de la caméra', 'Poussière qui tombe des toits', 'Grondement sourd'],
  },
  [WeatherType.TORNADO]: {
    category: 'rain', sound: true,
    summary: 'Une tornade qui erre sur la carte.',
    description: 'Ciel vert-gris, vent violent : un tourbillon de poussière nuageux, chargé de débris, erre sur la carte. Si tu t\'en approches trop, il t\'emporte !',
    effects: ['Tornade mobile', 'Le joueur s\'envole', 'Grondement selon la distance'],
  },
  [WeatherType.SNOW]: {
    category: 'cold', sound: false,
    summary: 'Neige qui recouvre les toits.',
    description: 'Des flocons tombent doucement et la neige s\'accumule petit à petit sur les toits et le sol. Les pas crissent.',
    effects: ['Flocons', 'Neige qui s\'accumule', 'Pas dans la neige'],
  },
  [WeatherType.CRYSTAL_MIST]: {
    category: 'cold', sound: true,
    summary: 'Éclats de glace aux reflets de prisme.',
    description: 'Une brume glacée et lumineuse où flottent de minuscules éclats de glace : ils captent la lumière en reflets de prisme, les toits s\'irisent et de fins tintements cristallins résonnent.',
    effects: ['Éclats de glace scintillants', 'Reflets irisés', 'Brume bleutée', 'Tintements'],
  },
  [WeatherType.MAGIC_SNOW]: {
    category: 'cold', sound: true,
    summary: 'Neige et étincelles bleues.',
    description: 'Une neige légère mêlée d\'étincelles bleues et mauves qui scintillent en tombant, avec quelques notes cristallines.',
    effects: ['Étincelles scintillantes', 'Neige légère', 'Clochettes'],
  },
  [WeatherType.BLIZZARD]: {
    category: 'cold', sound: true,
    summary: 'Tempête de neige, vent hurlant.',
    description: 'Une tempête de neige : flocons soufflés presque à l\'horizontale, neige poudreuse arrachée au sol en bourrasques, vent violent qui hurle, brume blanche et presque aucune visibilité.',
    effects: ['Neige à l\'horizontale', 'Bourrasques au ras du sol', 'Vent forcé', 'Hurlements du vent'],
  },
  [WeatherType.FROST]: {
    category: 'cold', sound: true,
    summary: 'Le givre gagne tout peu à peu.',
    description: 'Un froid sec et clair : le givre s\'étend lentement sur l\'herbe, les toits puis les murs, avec des cristaux qui scintillent. Les flaques gèlent.',
    effects: ['Givre progressif', 'Cristaux scintillants', 'Craquements de glace'],
  },
  [WeatherType.DEEP_FREEZE]: {
    category: 'cold', sound: true,
    summary: 'Froid extrême : givre sur les murs, haleine visible.',
    description: 'Un froid mordant. Le givre recouvre tout et grimpe peu à peu le long des murs, le sol devient glacé et brillant, l\'haleine du joueur forme de petits nuages. La glace craque avec des sons étranges et le vent glacé souffle. La nuit, une aurore boréale danse au-dessus de la ville gelée.',
    effects: ['Givre qui grimpe sur les murs', 'Haleine visible', 'Sol glacé', 'Craquements de glace', 'Aurore la nuit'],
  },
  [WeatherType.MOONLESS]: {
    category: 'dark', sound: true,
    summary: 'Le noir complet, une lanterne, des yeux qui brillent.',
    description: 'Une nuit sans lune ni étoiles : on ne voit presque rien. Seules les fenêtres allumées percent l\'obscurité, et la lanterne du joueur éclaire un petit cercle chaud qui vacille. Dans le noir, des paires d\'yeux brillants observent, clignent… et s\'enfuient dans un bruissement quand on s\'approche. Uniquement la nuit.',
    effects: ['Obscurité totale', 'Lanterne qui vacille', 'Yeux dans le noir', 'Fuite dans un bruissement'],
  },
  [WeatherType.MIRAGE]: {
    category: 'heat', sound: true,
    summary: 'De fausses flaques d\'eau scintillent au loin.',
    description: 'Une chaleur écrasante : l\'air tremble et, au loin, des flaques d\'eau scintillantes reflètent ce qu\'il y a derrière elles. Comme un vrai mirage, elles restent toujours loin devant : on ne les atteint jamais, elles s\'effacent et réapparaissent ailleurs. L\'image se dédouble légèrement et un sifflement aigu flotte dans l\'air. Uniquement de jour.',
    effects: ['Fausses flaques au loin', 'Image dédoublée', 'Air qui tremble', 'Sifflement de chaleur'],
  },
  [WeatherType.HEATWAVE]: {
    category: 'heat', sound: false,
    summary: 'Chaleur écrasante, air qui ondule.',
    description: 'Un soleil écrasant : l\'air ondule au-dessus du sol, les couleurs sont délavées et chaudes.',
    effects: ['Ondulations de chaleur', 'Couleurs délavées'],
  },
  [WeatherType.SANDSTORM]: {
    category: 'heat', sound: true,
    summary: 'Sable soufflé par un vent fort.',
    description: 'Un vent fort soulève le sable : traînées de grains, nuages de poussière ocre, et le sable s\'amasse sur le sol et contre les murs.',
    effects: ['Sable soufflé', 'Sable qui s\'accumule', 'Vent forcé'],
  },
  [WeatherType.VOLCANIC]: {
    category: 'heat', sound: true,
    summary: 'Lumière orange, braises et fumées.',
    description: 'Une lumière orangée, une brume étouffante et l\'air qui ondule. Des braises s\'échappent du sol et des fumées sombres montent çà et là ; on entend gronder et crépiter.',
    effects: ['Braises', 'Fumées sombres', 'Ondulations', 'Grondement et crépitements'],
  },
  [WeatherType.ERUPTION]: {
    category: 'heat', sound: true,
    summary: 'Le volcan se réveille : secousses de plus en plus fréquentes.',
    description: 'L\'ambiance volcanique, avec des cendres qui tombent, et des secousses qui deviennent de plus en plus fréquentes. La tension monte avec elles : de plus en plus de braises et de fumées, jusqu\'à une grande secousse qui fait jaillir une gerbe de braises… puis le cycle recommence.',
    effects: ['Secousses de plus en plus rapprochées', 'Grande secousse finale', 'Gerbes de braises et fumées', 'Cendres', 'Grondement et crépitements'],
  },
  [WeatherType.ASH]: {
    category: 'heat', sound: true,
    summary: 'Flocons de cendres grises.',
    description: 'Le soleil orange est voilé, des flocons de cendres grises tombent lentement en tourbillonnant et des nappes de fumée dérivent avec le vent. Un feu crépite au loin.',
    effects: ['Cendres qui tombent', 'Nappes de fumée', 'Soleil voilé', 'Crépitement lointain'],
  },
  [WeatherType.FOREST]: {
    category: 'nature', sound: true,
    summary: 'Ombres de feuillage et oiseaux.',
    description: 'Comme sous les arbres : ombres de feuillage qui bougent avec le vent, pollen doré, oiseaux le jour, grillons et hibou la nuit.',
    effects: ['Ombres de feuillage', 'Pollen', 'Oiseaux, grillons, hibou'],
  },
  [WeatherType.AUTUMN_DRIZZLE]: {
    category: 'nature', sound: true,
    summary: 'Bruine dorée et feuilles mortes.',
    description: 'Une lumière d\'automne basse et dorée, une fine bruine et des feuilles mortes qui tombent ensemble. Les façades rougeoient, quelques oiseaux chantent encore.',
    effects: ['Lumière dorée rasante', 'Bruine', 'Feuilles d\'automne', 'Oiseaux discrets'],
  },
  [WeatherType.LEAVES]: {
    category: 'nature', sound: false,
    summary: 'Feuilles ou pétales qui tombent.',
    description: 'Des feuilles d\'automne (ou des pétales de cerisier) tombent des arbres en virevoltant et se posent un moment au sol.',
    effects: ['Feuilles qui tombent', 'Mode automne ou cerisier'],
  },
  [WeatherType.PETAL_WHIRL]: {
    category: 'nature', sound: true,
    summary: 'Tourbillons de pétales de cerisier.',
    description: 'Un vent fort fait traverser de grands tourbillons de pétales de cerisier qui montent en spirale. On entend le souffle quand ils passent près.',
    effects: ['Tourbillons de pétales', 'Vent forcé', 'Souffle tournoyant'],
  },
  [WeatherType.FIREFLIES]: {
    category: 'nature', sound: false,
    summary: 'Lucioles autour des plantes.',
    description: 'La nuit, des lucioles flottent autour des arbres et des fleurs en s\'allumant et s\'éteignant doucement.',
    effects: ['Lucioles', 'Couleur au choix'],
  },
  [WeatherType.SPORES]: {
    category: 'nature', sound: true,
    summary: 'Spores lumineuses qui flottent.',
    description: 'Un air étrange teinté de vert : de grosses spores lumineuses montent du sol et des plantes. Quelques bulles éclatent.',
    effects: ['Spores lumineuses', 'Brume verte', 'Bulles discrètes'],
  },
  [WeatherType.AURORA]: {
    category: 'magic', sound: false,
    summary: 'Voiles d\'aurore vert et violet.',
    description: 'Une nuit claire éclairée par des voiles d\'aurore vert et violet qui ondulent sur le sol et les toits.',
    effects: ['Aurores mouvantes'],
  },
  [WeatherType.STARRY_NIGHT]: {
    category: 'magic', sound: true,
    summary: 'Ciel clair, étoiles dans les flaques.',
    description: 'Une nuit claire et fraîche : lune brillante et nette, rosée au sol, des étoiles qui scintillent dans les petites flaques, quelques lucioles et le chant des grillons.',
    effects: ['Lumière de lune nette', 'Rosée et flaques', 'Étoiles dans les flaques', 'Grillons'],
  },
  [WeatherType.LIGHT_TIDE]: {
    category: 'magic', sound: true,
    summary: 'Vagues de lumière bleue au sol.',
    description: 'Une nuit bleu profond : des vagues de lumière parcourent le sol comme du plancton bioluminescent, scintillent à leur passage puis s\'éteignent. On entend un doux ressac.',
    effects: ['Vagues lumineuses', 'Plancton scintillant', 'Ressac doux'],
  },
  [WeatherType.FIREWORKS]: {
    category: 'magic', sound: true,
    summary: 'Gerbes colorées qui illuminent la nuit.',
    description: 'Une nuit de fête : des fusées sifflent en montant puis éclatent en gerbes de couleurs qui retombent en pluie d\'étincelles. Chaque explosion colore toute la scène un instant.',
    effects: ['Fusées et gerbes colorées', 'Scène illuminée à chaque éclat', 'Sifflements et détonations'],
  },
  [WeatherType.MARS]: {
    category: 'magic', sound: true,
    summary: 'Ciel rouille et sable rouge.',
    description: 'Comme sur une autre planète : un ciel couleur rouille, un vent qui soulève du sable rouge et le dépose partout, des poussières qui flottent longtemps dans l\'air. La nuit tombe glaciale.',
    effects: ['Sable rouge soufflé', 'Sol qui rougit', 'Poussières en faible gravité', 'Froid extrême'],
  },
  [WeatherType.SOLAR_STORM]: {
    category: 'magic', sound: true,
    summary: 'Aurores rouges et interférences.',
    description: 'Des aurores rouges en plein jour : la lumière baisse par à-coups, les fenêtres clignotent et la radio grésille.',
    effects: ['Aurores rouges', 'Lumière qui vacille', 'Grésillements'],
  },
  [WeatherType.STARDUST]: {
    category: 'magic', sound: true,
    summary: 'Poussières dorées, reflets irisés.',
    description: 'Des poussières dorées et violettes flottent dans l\'air, les reflets des toits prennent des couleurs irisées.',
    effects: ['Poussières d\'étoiles', 'Reflets irisés', 'Clochettes discrètes'],
  },
  [WeatherType.FAIRY_MIST]: {
    category: 'magic', sound: false,
    summary: 'Brume rose et lumières féériques.',
    description: 'Une brume rose de rêve qui ondule comme de l\'air chaud, avec des lucioles roses autour des plantes.',
    effects: ['Brume rose', 'Lumières roses', 'Ondulations'],
  },
  [WeatherType.ELECTRIC]: {
    category: 'magic', sound: true,
    summary: 'Arcs électriques sur les toits.',
    description: 'L\'air est chargé : de petits arcs électriques crépitent sur les toits et le métal. On les entend grésiller quand on passe près.',
    effects: ['Arcs électriques', 'Crépitements de proximité'],
  },
  [WeatherType.BLOOD_MOON]: {
    category: 'dark', sound: false,
    summary: 'Lune rouge et braises montantes.',
    description: 'Une lune de sang : lumière rouge oppressante qui respire lentement, brume rouge et braises qui montent.',
    effects: ['Lumière rouge', 'Braises', 'Brume rouge'],
  },
  [WeatherType.BLOOD_RAIN]: {
    category: 'dark', sound: true,
    summary: 'Pluie de sang, éclairs rouges.',
    description: 'Il pleut du sang : les flaques et le sol se teintent de rouge, des éclairs rouges illuminent la scène.',
    effects: ['Gouttes de sang', 'Flaques rouges', 'Éclairs rouges'],
  },
  [WeatherType.ACID_RAIN]: {
    category: 'dark', sound: true,
    summary: 'Pluie verdâtre qui ronge le sol.',
    description: 'Un ciel jaune-vert maladif et une pluie verdâtre qui ronge tout : le sol se tache, des vapeurs s\'élèvent là où elle tombe et on l\'entend grésiller.',
    effects: ['Pluie acide', 'Flaques et taches vertes', 'Vapeurs qui montent', 'Grésillement'],
  },
  [WeatherType.POISON]: {
    category: 'dark', sound: true,
    summary: 'Brume violette et pluie toxique.',
    description: 'Un climat empoisonné : grosse brume violette, pluie violette, flaques toxiques d\'où montent des fumées violettes, air étouffant qui ondule. Des bulles éclatent.',
    effects: ['Brume violette', 'Pluie toxique', 'Fumées violettes', 'Bulles toxiques'],
  },
  [WeatherType.DARKNESS]: {
    category: 'dark', sound: true,
    summary: 'Le noir se referme autour de toi.',
    description: 'Une brume noire engloutit tout à quelques pas, et des volutes de ténèbres rampent tout autour de toi. Les fenêtres percent à peine. Ambiance sonore oppressante.',
    effects: ['Vision réduite', 'Volutes noires qui rampent', 'Bourdonnement, cœur, chuchotements'],
  },
  [WeatherType.CURSE]: {
    category: 'dark', sound: true,
    summary: 'Feux follets et ombres vivantes.',
    description: 'Une lumière violette éteinte : des feux follets tournent autour de toi, les ombres bougent toutes seules, on entend chuchoter.',
    effects: ['Feux follets', 'Ombres mouvantes', 'Chuchotements'],
  },
  [WeatherType.HAUNTED]: {
    category: 'dark', sound: true,
    summary: 'Silhouettes dans la brume.',
    description: 'Une brume épaisse d\'où s\'élèvent des volutes pâles, et où des silhouettes se forment au loin… puis se dissipent quand on s\'approche. Gémissements dans le vent.',
    effects: ['Brume épaisse', 'Volutes qui s\'élèvent', 'Silhouettes fantomatiques', 'Gémissements'],
  },
};

/** Screenshot of a weather (day / night version). */
export function weatherScreenshot(type: WeatherType, night: boolean): string {
  return `assets/weather/${type}-${night ? 'night' : 'day'}.webp`;
}
