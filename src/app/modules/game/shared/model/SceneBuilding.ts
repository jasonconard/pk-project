import { Vec3 } from './SceneUtils';
import { SceneEvent } from './SceneEvent';
import { SceneModel } from './SceneModel';

export interface SceneBuilding {
  id: string,
  modelId: string
  originModel?: SceneModel,
  pos: Vec3,
  /** Quarter turns around the vertical axis (0 to 3, clockwise seen from above): the editor's Tourner. */
  rot?: number,
  passable: boolean,
  canHide: boolean,
  events: SceneEvent[]
}
