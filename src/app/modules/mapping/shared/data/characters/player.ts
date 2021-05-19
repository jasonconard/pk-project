import { PlayerDirection, ScenePlayer } from '../../model/ScenePlayer';

export const SCENE_PLAYER: ScenePlayer = {
  id: 'player',
  pos: { x: 0, y: 0, z: 0 },
  dir: PlayerDirection.DOWN,
  tex: {
    link: 'assets/tex/sprite.png',
    size: { x: 14, y: 21 }
  }
}
