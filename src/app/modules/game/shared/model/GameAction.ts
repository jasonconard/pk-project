import { SceneEvent } from './SceneEvent';
import { SceneBuilding } from './SceneBuilding';
import { InstructionType } from './SceneEventInstruction';
import { modelLabel } from './ModelChoice';

/** What the action key does right now, in front of an object: shown by the touch action button and the computer's prompt. */
export interface GameAction {
  kind: 'enter' | 'talk' | 'read' | 'look';
  /** « Entrer », « Parler », « Lire », « Regarder ». */
  verb: string;
  /** The object's name (« Labo »), or who talks (« Hugo »). */
  target: string;
}

const VERBS: Record<GameAction['kind'], string> = { enter: 'Entrer', talk: 'Parler', read: 'Lire', look: 'Regarder' };

/**
 * The action of an event: a passage enters; a message with a name is someone talking (the target: their name),
 * another message is read on the object.
 */
export function describeAction(evt: SceneEvent, building: SceneBuilding): GameAction {
  const first = evt.instructions[0];
  const message = first?.type === InstructionType.MESSAGE ? first.message : undefined;
  const kind: GameAction['kind'] = first?.type === InstructionType.TELEPORT ? 'enter'
    : message ? (message.name ? 'talk' : 'read')
    : 'look';
  return { kind, verb: VERBS[kind], target: kind === 'talk' ? message!.name! : modelLabel(building.modelId) };
}

export function sameAction(a: GameAction | null, b: GameAction | null): boolean {
  return a === b || (!!a && !!b && a.kind === b.kind && a.target === b.target);
}
