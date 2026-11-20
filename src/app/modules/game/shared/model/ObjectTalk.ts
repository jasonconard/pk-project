import { SceneBuilding } from './SceneBuilding';
import { SceneEvent } from './SceneEvent';
import { InstructionType } from './SceneEventInstruction';
import { KeyCode } from '../../../../core/shared/model/PressedKey';
import { isPassageEvent } from './Passage';

/**
 * What an object says when the player talks to it or looks at it (a character, a sign), set in the editor:
 * lines shown one after the other with the action key in front of it. Stored as one of the object's events
 * (messages), so the game plays it like any event.
 */
export interface ObjectTalk {
  lines: TalkLine[];
}

export interface TalkLine {
  /** Who speaks (shown above the text); nobody when missing (a sign). */
  name?: string;
  text: string;
}

/** The player stands up to this many units around the object (any side). */
const TALK_REACH = 20;
/** The object's box may start a little above the ground (models resting on 0.5): the player's feet still count. */
const STEP_TOLERANCE = 4;

/** Is this event a talk (only messages, not a passage)? */
export function isTalkEvent(event: SceneEvent): boolean {
  return !isPassageEvent(event) && event.instructions.length > 0
    && event.instructions.every(instruction => instruction.type === InstructionType.MESSAGE && !instruction.message?.choices?.length);
}

/** The object's talk, if it has one. */
export function talkOf(building: SceneBuilding): ObjectTalk | null {
  const event = building.events.find(isTalkEvent);
  if (!event) {
    return null;
  }
  return {
    lines: event.instructions.map(instruction => ({
      ...(instruction.message?.name ? { name: instruction.message.name } : {}),
      text: instruction.message?.text ?? '',
    })),
  };
}

/** The object's events with its talk replaced (null or no line: removed); the other events are kept. */
export function eventsWithTalk(building: SceneBuilding, talk: ObjectTalk | null): SceneEvent[] {
  const others = building.events.filter(event => !isTalkEvent(event));
  if (!talk?.lines.length) {
    return others;
  }
  const event: SceneEvent = {
    conditions: {
      pressedKeys: [KeyCode.confirm],
      bounds: {
        min: { x: TALK_REACH, y: STEP_TOLERANCE, z: TALK_REACH },
        max: { x: TALK_REACH, y: 0, z: TALK_REACH },
      },
    },
    instructions: talk.lines.map(line => ({
      type: InstructionType.MESSAGE,
      message: { ...(line.name?.trim() ? { name: line.name.trim() } : {}), text: line.text },
    })),
  };
  return [...others, event];
}
