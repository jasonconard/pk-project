import { SceneMap } from '../../app/modules/game/shared/model/SceneMap';
import { WORLD_MAP } from './world/world';

/**
 * The maps of the game (code). A map exported from the editor goes to src/assets/map/<id>/<id>.ts, then is added
 * here.
 */
export const CODE_MAPS: SceneMap[] = [WORLD_MAP];

/** The map the game starts on. */
export const DEFAULT_MAP_ID = WORLD_MAP.id;
