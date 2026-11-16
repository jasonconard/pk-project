import { KeyCode } from './PressedKey';
import { Vec2 } from "../../../modules/game/shared/model/SceneUtils";

export enum TouchKeyType {
  CIRCLE, RECT
}

export interface TouchKey {
  code: KeyCode,
  label: string,
  type: TouchKeyType,
  size: Vec2,
  position: Vec2
}

/** Action buttons, bottom right (position: right / bottom of their touch area): A B X Y in a tight diamond, Start / Select above. */
export const TOUCH_KEYS: TouchKey[] = [
  {
    code: KeyCode.confirm,
    label: 'a',
    type: TouchKeyType.CIRCLE,
    size: { x: 52, y: 52 },
    position: { x: 70, y: 16 }
  },
  {
    code: KeyCode.cancel,
    label: 'b',
    type: TouchKeyType.CIRCLE,
    size: { x: 52, y: 52 },
    position: { x: 16, y: 66 }
  },
  {
    code: KeyCode.x,
    label: 'x',
    type: TouchKeyType.CIRCLE,
    size: { x: 52, y: 52 },
    position: { x: 124, y: 66 }
  },
  {
    code: KeyCode.y,
    label: 'y',
    type: TouchKeyType.CIRCLE,
    size: { x: 52, y: 52 },
    position: { x: 70, y: 116 }
  },
  {
    code: KeyCode.pause,
    label: 'start',
    type: TouchKeyType.RECT,
    size: { x: 72, y: 26 },
    position: { x: 16, y: 194 }
  },
  {
    code: KeyCode.select,
    label: 'select',
    type: TouchKeyType.RECT,
    size: { x: 72, y: 26 },
    position: { x: 116, y: 194 }
  },
];
