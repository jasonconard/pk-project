import { Vec2, Vec3 } from './SceneUtils';

export interface ScenePlayer {
  id: string,
  tex: PlayerTex,
  pos: Vec3
}

export interface PlayerTex {
  link: string
  size: Vec2
}
