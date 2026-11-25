import { Vec3 } from "./SceneUtils";
import { SceneEvent } from "./SceneEvent";
import { SceneModel } from "./SceneModel";

export interface SceneBuilding {
  id: string;
  modelId: string;
  originModel?: SceneModel;
  pos: Vec3;
  /** Quarter turns around the vertical axis (0 to 3, clockwise seen from above): the editor's Tourner. */
  rot?: number;
  passable: boolean;
  /** An invisible zone's size in cells (x wide, z deep; see Zone.ts). */
  size?: { x: number; z: number };
  canHide: boolean;
  /** An NPC's place name (« derrière le comptoir »): its schedule picks it (see npc-schedule.ts). */
  label?: string;
  events: SceneEvent[];
}
