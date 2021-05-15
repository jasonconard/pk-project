import { KeyCode } from './PressedKey';
import { Vec2 } from '../../../modules/mapping/shared/model/SceneUtils';

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

export const TOUCH_KEYS: TouchKey[] = [
  {
    code: KeyCode.confirm,
    label: 'a',
    type: TouchKeyType.CIRCLE,
    size: { x: 50, y: 50 },
    position: { x: 110, y: 25 }
  },
  {
    code: KeyCode.cancel,
    label: 'b',
    type: TouchKeyType.CIRCLE,
    size: { x: 50, y: 50 },
    position: { x: 40, y: 80 }
  },
  {
    code: KeyCode.x,
    label: 'x',
    type: TouchKeyType.CIRCLE,
    size: { x: 50, y: 50 },
    position: { x: 180, y: 80 }
  },
  {
    code: KeyCode.y,
    label: 'y',
    type: TouchKeyType.CIRCLE,
    size: { x: 50, y: 50 },
    position: { x: 110, y: 135 }
  },
  {
    code: KeyCode.pause,
    label: 'start',
    type: TouchKeyType.RECT,
    size: { x: 80, y: 30 },
    position: { x: 40, y: 220 }
  },
  {
    code: KeyCode.select,
    label: 'select',
    type: TouchKeyType.RECT,
    size: { x: 80, y: 30 },
    position: { x: 160, y: 220 }
  },
];
