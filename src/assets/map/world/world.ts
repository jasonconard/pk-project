import { SceneMap } from '../../../app/modules/game/shared/model/SceneMap';
import {
  PC_PALLET_TOWN,
  PC_PALLET_TOWN_E, PC_PALLET_TOWN_N,
  PC_PALLET_TOWN_NE,
  PC_PALLET_TOWN_NW, PC_PALLET_TOWN_S,
  PC_PALLET_TOWN_SE, PC_PALLET_TOWN_SW,
  PC_PALLET_TOWN_W
} from './chunks/ck-pallet-town';

export const WORLD_MAP: SceneMap = {
  chunks: [
    PC_PALLET_TOWN,
    PC_PALLET_TOWN_E, PC_PALLET_TOWN_NE, PC_PALLET_TOWN_SE,
    PC_PALLET_TOWN_W, PC_PALLET_TOWN_NW, PC_PALLET_TOWN_SW,
    PC_PALLET_TOWN_N, PC_PALLET_TOWN_S
  ]
};
