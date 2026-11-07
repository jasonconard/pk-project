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
  [WeatherType.TORNADO]: {
    category: 'rain', sound: true,
    summary: 'Une tornade qui erre sur la carte.',
    description: 'Ciel vert-gris, vent violent : une colonne de poussière et de débris erre sur la carte. Si tu t\'en approches trop, elle t\'emporte !',
    effects: ['Tornade mobile', 'Le joueur s\'envole', 'Grondement selon la distance'],
  },
  [WeatherType.SNOW]: {
    category: 'cold', sound: false,
    summary: 'Neige qui recouvre les toits.',
    description: 'Des flocons tombent doucement et la neige s\'accumule petit à petit sur les toits et le sol. Les pas crissent.',
    effects: ['Flocons', 'Neige qui s\'accumule', 'Pas dans la neige'],
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
    description: 'Une tempête de neige : flocons soufflés presque à l\'horizontale, vent violent qui hurle, brume blanche et presque aucune visibilité.',
    effects: ['Neige à l\'horizontale', 'Vent forcé', 'Hurlements du vent'],
  },
  [WeatherType.FROST]: {
    category: 'cold', sound: true,
    summary: 'Le givre gagne tout peu à peu.',
    description: 'Un froid sec et clair : le givre s\'étend lentement sur l\'herbe, les toits puis les murs, avec des cristaux qui scintillent. Les flaques gèlent.',
    effects: ['Givre progressif', 'Cristaux scintillants', 'Craquements de glace'],
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
    summary: 'Lumière orange et braises.',
    description: 'Une lumière orangée, une brume étouffante et l\'air qui ondule. Des braises s\'échappent du sol, on entend gronder et crépiter.',
    effects: ['Braises', 'Ondulations', 'Grondement et crépitements'],
  },
  [WeatherType.ASH]: {
    category: 'heat', sound: true,
    summary: 'Flocons de cendres grises.',
    description: 'Le soleil orange est voilé, des flocons de cendres grises tombent lentement en tourbillonnant. Un feu crépite au loin.',
    effects: ['Cendres qui tombent', 'Soleil voilé', 'Crépitement lointain'],
  },
  [WeatherType.FOREST]: {
    category: 'nature', sound: true,
    summary: 'Ombres de feuillage et oiseaux.',
    description: 'Comme sous les arbres : ombres de feuillage qui bougent avec le vent, pollen doré, oiseaux le jour, grillons et hibou la nuit.',
    effects: ['Ombres de feuillage', 'Pollen', 'Oiseaux, grillons, hibou'],
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
  [WeatherType.POISON]: {
    category: 'dark', sound: true,
    summary: 'Brume violette et pluie toxique.',
    description: 'Un climat empoisonné : grosse brume violette, pluie violette, flaques toxiques et air étouffant qui ondule. Des bulles éclatent.',
    effects: ['Brume violette', 'Pluie toxique', 'Bulles toxiques'],
  },
  [WeatherType.DARKNESS]: {
    category: 'dark', sound: true,
    summary: 'Le noir se referme autour de toi.',
    description: 'Une brume noire engloutit tout à quelques pas. Les fenêtres percent à peine. Ambiance sonore oppressante.',
    effects: ['Vision réduite', 'Bourdonnement, cœur, chuchotements'],
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
    description: 'Une brume épaisse où des silhouettes se forment au loin… et se dissipent quand on s\'approche. Gémissements dans le vent.',
    effects: ['Brume épaisse', 'Silhouettes fantomatiques', 'Gémissements'],
  },
};

/** Screenshot of a weather (day / night version). */
export function weatherScreenshot(type: WeatherType, night: boolean): string {
  return `assets/weather/${type}-${night ? 'night' : 'day'}.webp`;
}
