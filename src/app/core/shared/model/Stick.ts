import { Vec2 } from "../../../modules/game/shared/model/SceneUtils";

export const STICK_RADIUS = 60;

export interface Stick {
  begin: Vec2;
  current: Vec2;
  radius: number;
}
