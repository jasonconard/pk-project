import { Vec3 } from './SceneUtils';
import { SceneEvent } from './SceneEvent';
import { SceneModel } from './SceneModel';

export interface SceneBuilding {
  id: string,
  modelId: string
  originModel?: SceneModel,
  pos: Vec3,
  passable: boolean,
  canHide: boolean,
  events: SceneEvent[]
}
