import { SceneBuilding } from './SceneBuilding';
import { SceneEvent, VariableTest } from './SceneEvent';
import { InstructionType, SceneEventInstruction } from './SceneEventInstruction';
import { KeyCode } from '../../../../core/shared/model/PressedKey';
import { isPassageEvent } from './Passage';
import { Vec3 } from './SceneUtils';

/**
 * An event set on an object in the map editor's event window: what starts it (talking to the object, stepping on it,
 * or on its own), the conditions that must be true (story variables, hour, weather) and the actions played one after
 * the other. Stored as one of the object's events (a SceneEvent marked `edited`), so the game plays it like any
 * event. An object may have several: the game plays the first one whose trigger and conditions fit.
 */
export interface ObjectEvent {
  trigger: EventTrigger;
  /** The object turns towards the player first (talking to a character). */
  face?: boolean;
  conditions: EventConditions;
  actions: EventAction[];
}

/** 'action': the action key next to the object; 'enter': walking onto it (a zone); 'auto': when the conditions become true. */
export type EventTrigger = 'action' | 'enter' | 'auto';

export interface EventConditions {
  variables: VariableTest[];
  hours?: { from: number, to: number };
  /** WeatherType ids. */
  weathers?: string[];
}

export type EventAction =
  | { type: 'message', name?: string, text: string, /** Portrait (image path), shown next to the text. */ pic?: string }
  | { type: 'choice', options: ChoiceOption[] }
  | { type: 'if', conditions: EventConditions, then: EventAction[], else: EventAction[] }
  | { type: 'variable', id: string, op: 'set' | 'add', value: boolean | number }
  | { type: 'teleport', map: string, pos?: Vec3 }
  | { type: 'weather', weather: string }
  | { type: 'sound', sound: string }
  | { type: 'wait', seconds: number }
  | { type: 'stop' };

/** One answer of a choice, and what happens when the player picks it. */
export interface ChoiceOption {
  text: string;
  actions: EventAction[];
}

/** Portraits to show next to a message (the game's faces; later the ones drawn in the portraits editor). */
export const PORTRAITS: { pic: string, label: string }[] = [
  { pic: 'assets/img/faces/face-hugo.png', label: 'Hugo' },
  { pic: 'assets/img/faces/face-jason.png', label: 'Jason' },
];

/** How deep choices and conditions may go in each other (a choice in a choice in a choice). */
export const MAX_BRANCH_DEPTH = 3;
export const MAX_CHOICE_OPTIONS = 4;

export type EventActionType = EventAction['type'];

/** The player stands up to this many units around the object (any side) to talk to it. */
const TALK_REACH = 20;
/** The object's box may start a little above the ground (models resting on 0.5): the player's feet still count. */
const STEP_TOLERANCE = 4;

/** Can the event window edit this event? Its own events, and the talks of the first version (only messages). */
export function isEditableEvent(event: SceneEvent): boolean {
  if (event.edited) {
    return true;
  }
  return !isPassageEvent(event) && event.instructions.length > 0 && !event.conditions.trigger
    && event.instructions.every(i => i.type === InstructionType.MESSAGE && !i.message?.choices?.length && !i.subInstructions?.length);
}

/** The object's events made in the editor, in order. */
export function objectEventsOf(building: SceneBuilding): ObjectEvent[] {
  return building.events.filter(isEditableEvent).map(toObjectEvent);
}

/** The object's events with the editor's ones replaced (the passage and the hand-written ones are kept, first). */
export function eventsWithObjectEvents(building: SceneBuilding, events: ObjectEvent[]): SceneEvent[] {
  return [...building.events.filter(event => !isEditableEvent(event)), ...events.map(toSceneEvent)];
}

export function newObjectEvent(): ObjectEvent {
  return { trigger: 'action', conditions: { variables: [] }, actions: [{ type: 'message', text: '' }] };
}

function toSceneEvent(event: ObjectEvent): SceneEvent {
  const checks = conditionsData(event.conditions);
  const conditions: SceneEvent['conditions'] = event.trigger === 'action'
    ? {
      pressedKeys: [KeyCode.confirm],
      bounds: { min: { x: TALK_REACH, y: STEP_TOLERANCE, z: TALK_REACH }, max: { x: TALK_REACH, y: 0, z: TALK_REACH } },
      ...checks,
    }
    : event.trigger === 'enter'
      ? { trigger: 'enter', bounds: { min: { x: 0, y: STEP_TOLERANCE, z: 0 }, max: { x: 0, y: 0, z: 0 } }, ...checks }
      : { trigger: 'auto', ...checks };
  return {
    edited: true,
    ...(event.face && event.trigger === 'action' ? { face: true } : {}),
    conditions,
    instructions: toInstructions(event.actions),
  };
}

/**
 * The actions as the game's instructions. A choice is shown with the message just before it (as in RPG Maker): that
 * message gets the answers, and each answer's actions are its sub-instructions; a choice with no message before it
 * gets an empty one.
 */
function toInstructions(actions: EventAction[]): SceneEventInstruction[] {
  const out: SceneEventInstruction[] = [];
  for (const action of actions) {
    if (action.type === 'choice') {
      const last = out[out.length - 1];
      let target = last?.type === InstructionType.MESSAGE && last.message && !last.message.choices ? last : undefined;
      if (!target) {
        target = { type: InstructionType.MESSAGE, message: { text: '' } };
        out.push(target);
      }
      target.message!.choices = action.options.map((option, k) => ({ key: 'c' + k, text: option.text }));
      target.subInstructions = action.options.map((option, k) => ({ condition: 'c' + k, instructions: toInstructions(option.actions) }));
    } else if (action.type === 'if') {
      out.push({
        type: InstructionType.BRANCH,
        branch: conditionsData(action.conditions),
        subInstructions: [
          { condition: 'then', instructions: toInstructions(action.then) },
          { condition: 'else', instructions: toInstructions(action.else) },
        ],
      });
    } else {
      out.push(toInstruction(action));
    }
  }
  return out;
}

/** The conditions as stored (only what is set). */
function conditionsData(c: EventConditions) {
  return {
    ...(c.variables.length ? { variables: c.variables.map(v => ({ ...v })) } : {}),
    ...(c.hours ? { hours: { ...c.hours } } : {}),
    ...(c.weathers?.length ? { weathers: [...c.weathers] } : {}),
  };
}

function toInstruction(action: Exclude<EventAction, { type: 'choice' | 'if' }>): SceneEventInstruction {
  switch (action.type) {
    case 'message':
      return {
        type: InstructionType.MESSAGE,
        message: { ...(action.name?.trim() ? { name: action.name.trim() } : {}), text: action.text, ...(action.pic ? { pic: action.pic } : {}) },
      };
    case 'variable':
      return { type: InstructionType.VARIABLE, variable: { id: action.id, op: action.op, value: action.value } };
    case 'teleport':
      return { type: InstructionType.TELEPORT, teleport: { map: action.map, ...(action.pos ? { pos: { ...action.pos } } : {}) } };
    case 'weather':
      return { type: InstructionType.WEATHER, weather: { type: action.weather } };
    case 'sound':
      return { type: InstructionType.SOUND, sound: { id: action.sound } };
    case 'wait':
      return { type: InstructionType.WAIT, wait: { time: Math.round(action.seconds * 1000) } };
    case 'stop':
      return { type: InstructionType.STOP };
  }
}

function toObjectEvent(event: SceneEvent): ObjectEvent {
  const c = event.conditions;
  const trigger: EventTrigger = c.trigger ?? 'action';
  return {
    trigger,
    ...(event.face ? { face: true } : {}),
    conditions: {
      variables: (c.variables ?? []).map(v => ({ ...v })),
      ...(c.hours ? { hours: { ...c.hours } } : {}),
      ...(c.weathers?.length ? { weathers: [...c.weathers] } : {}),
    },
    actions: toActions(event.instructions),
  };
}

/** The game's instructions back as actions (a message with answers: the message, then the choice). */
function toActions(instructions: SceneEventInstruction[]): EventAction[] {
  return instructions.flatMap(instruction => {
    const message = instruction.message;
    if (instruction.type === InstructionType.MESSAGE && message?.choices?.length) {
      const choice: EventAction = {
        type: 'choice',
        options: message.choices.map(c => ({
          text: c.text,
          actions: toActions(instruction.subInstructions?.find(sub => sub.condition === c.key)?.instructions ?? []),
        })),
      };
      const said = message.text || message.name;
      return said ? [toAction({ type: InstructionType.MESSAGE, message: { ...message, choices: undefined } })!, choice] : [choice];
    }
    if (instruction.type === InstructionType.BRANCH) {
      const sub = (key: string) => toActions(instruction.subInstructions?.find(s => s.condition === key)?.instructions ?? []);
      const b = instruction.branch ?? {};
      return [{
        type: 'if' as const,
        conditions: {
          variables: (b.variables ?? []).map(v => ({ ...v })),
          ...(b.hours ? { hours: { ...b.hours } } : {}),
          ...(b.weathers?.length ? { weathers: [...b.weathers] } : {}),
        },
        then: sub('then'),
        else: sub('else'),
      }];
    }
    const action = toAction(instruction);
    return action ? [action] : [];
  });
}

function toAction(instruction: SceneEventInstruction): EventAction | null {
  switch (instruction.type) {
    case InstructionType.MESSAGE:
      return {
        type: 'message', ...(instruction.message?.name ? { name: instruction.message.name } : {}), text: instruction.message?.text ?? '',
        ...(instruction.message?.pic ? { pic: instruction.message.pic } : {}),
      };
    case InstructionType.VARIABLE:
      return instruction.variable ? { type: 'variable', ...instruction.variable } : null;
    case InstructionType.TELEPORT:
      return instruction.teleport?.map
        ? { type: 'teleport', map: instruction.teleport.map, ...(instruction.teleport.pos ? { pos: { ...instruction.teleport.pos } } : {}) }
        : null;
    case InstructionType.WEATHER:
      return instruction.weather ? { type: 'weather', weather: instruction.weather.type } : null;
    case InstructionType.SOUND:
      return instruction.sound ? { type: 'sound', sound: instruction.sound.id } : null;
    case InstructionType.WAIT:
      return { type: 'wait', seconds: (instruction.wait?.time ?? 0) / 1000 };
    case InstructionType.STOP:
      return { type: 'stop' };
    default:
      return null;
  }
}

/** Does the event's conditions fit now? */
export interface EventContext {
  hour: number;
  weather: string;
  values: Record<string, boolean | number>;
}

export function conditionsFit(conditions: Pick<SceneEvent['conditions'], 'variables' | 'hours' | 'weathers'>, ctx: EventContext): boolean {
  const hours = conditions.hours;
  if (hours && hours.from !== hours.to) {
    const h = ctx.hour;
    const inside = hours.from < hours.to ? h >= hours.from && h < hours.to : h >= hours.from || h < hours.to;
    if (!inside) {
      return false;
    }
  }
  if (conditions.weathers?.length && !conditions.weathers.includes(ctx.weather)) {
    return false;
  }
  return (conditions.variables ?? []).every(test => {
    const value = ctx.values[test.id];
    if (value === undefined) {
      return false; // (a variable deleted since: the event never plays)
    }
    switch (test.op) {
      case 'is': return value === test.value;
      case 'eq': return value === test.value;
      case 'ne': return value !== test.value;
      case 'gte': return typeof value === 'number' && value >= Number(test.value);
      case 'lte': return typeof value === 'number' && value <= Number(test.value);
    }
  });
}
