import { VecBox3 } from './SceneUtils';
import { KeyCode } from '../../../../core/shared/model/PressedKey';

export interface SceneEvent {
  conditions: SceneEventCondition[]
}

export interface SceneEventCondition {
  direction?: KeyCode, // Only use up down left right =)
  position?: VecBox3,
  input?: KeyCode
}
