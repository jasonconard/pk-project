import { SceneBuilding } from './SceneBuilding';
import { SceneEvent } from './SceneEvent';
import { InstructionType } from './SceneEventInstruction';
import { PlayerDirection } from './ScenePlayer';
import { KeyCode } from '../../../../core/shared/model/PressedKey';
import { Vec3 } from './SceneUtils';

/**
 * A passage to another map, set on an object in the editor: a door (walking up into the object, or the action
 * key in front of it) or a place to walk on (the object lets the player through). Stored as one of the object's
 * events (a teleport to a map), so the game plays it like any event.
 */
export interface Passage {
  /** Map it leads to. */
  map: string;
  /** Arrival point; the map's arrival point when missing. */
  pos?: Vec3;
  trigger: PassageTrigger;
}

export type PassageTrigger = 'door' | 'walk';

/** Door: the player stands up to 24 units in front of the object (+z side, facing the camera) and goes up into it. */
const DOOR_REACH = 24;
/** The object's box may start a little above the ground (models resting on 0.5): the player's feet still count. */
const STEP_TOLERANCE = 4;

/** Is this event a passage (a lone teleport to a map)? */
export function isPassageEvent(event: SceneEvent): boolean {
  return !event.edited && event.instructions.length === 1 && event.instructions[0].type === InstructionType.TELEPORT
    && !!event.instructions[0].teleport?.map;
}

/** The object's passage, if it has one. */
export function passageOf(building: SceneBuilding): Passage | null {
  const event = building.events.find(isPassageEvent);
  const teleport = event?.instructions[0].teleport;
  if (!event || !teleport?.map) {
    return null;
  }
  return {
    map: teleport.map,
    pos: teleport.pos,
    trigger: event.conditions.direction === undefined ? 'walk' : 'door',
  };
}

/** The object's events with its passage replaced (null: removed); the other events are kept. */
export function eventsWithPassage(building: SceneBuilding, passage: Passage | null): SceneEvent[] {
  const others = building.events.filter(event => !isPassageEvent(event));
  if (!passage) {
    return others;
  }
  const teleport = { map: passage.map, ...(passage.pos ? { pos: { ...passage.pos } } : {}) };
  const event: SceneEvent = {
    conditions: passage.trigger === 'door'
      ? {
        direction: PlayerDirection.UP,
        pressedKeys: [KeyCode.confirm, KeyCode.up],
        held: true,
        bounds: { min: { x: 0, y: STEP_TOLERANCE, z: 0 }, max: { x: 0, y: 0, z: DOOR_REACH } },
      }
      : { bounds: { min: { x: 0, y: STEP_TOLERANCE, z: 0 }, max: { x: 0, y: 0, z: 0 } } },
    instructions: [{ type: InstructionType.TELEPORT, teleport }],
  };
  return [...others, event];
}
