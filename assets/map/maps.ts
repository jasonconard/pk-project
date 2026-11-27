import { SceneMap } from '../../app/modules/game/shared/model/SceneMap';
import { WORLD_MAP } from './world/world';
import { GROTTE_DE_CRISTAL_MAP } from './grotte-de-cristal/grotte-de-cristal';
import { GROTTE_CRISTAL_SALLE_1_MAP } from './grotte-cristal-salle-1/grotte-cristal-salle-1';
import { GROTTE_CRISTAL_SALLE_2_MAP } from './grotte-cristal-salle-2/grotte-cristal-salle-2';
import { GROTTE_CRISTAL_SALLE_3_MAP } from './grotte-cristal-salle-3/grotte-cristal-salle-3';
import { GROTTE_CRISTAL_SALLE_4_MAP } from './grotte-cristal-salle-4/grotte-cristal-salle-4';
import { GROTTE_CRISTAL_COEUR_MAP } from './grotte-cristal-coeur/grotte-cristal-coeur';
import { ARENE_GROTTE_MAP } from './arene-grotte/arene-grotte';
import { ARENE_PRAIRIE_MAP } from './arene-prairie/arene-prairie';


/**
 * The maps of the game (code). A map exported from the editor goes to src/assets/map/<id>/<id>.ts, then is added
 * here.
 */
export const CODE_MAPS: SceneMap[] = [
  WORLD_MAP,
  GROTTE_DE_CRISTAL_MAP,
  GROTTE_CRISTAL_SALLE_1_MAP,
  GROTTE_CRISTAL_SALLE_2_MAP,
  GROTTE_CRISTAL_SALLE_3_MAP,
  GROTTE_CRISTAL_SALLE_4_MAP,
  GROTTE_CRISTAL_COEUR_MAP,
  ARENE_GROTTE_MAP,
  ARENE_PRAIRIE_MAP,
];

/** The map the game starts on. */
export const DEFAULT_MAP_ID = WORLD_MAP.id;
