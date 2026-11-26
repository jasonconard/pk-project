import { SceneEvent } from "./SceneEvent";
import { SceneBuilding } from "./SceneBuilding";
import { InstructionType } from "./SceneEventInstruction";
import { modelLabel } from "./ModelChoice";

/** What the action key does right now, in front of an object: shown by the touch action button and the computer's prompt. */
export interface GameAction {
  kind:
    | "enter"
    | "talk"
    | "read"
    | "look"
    | "open"
    | "use"
    | "hit"
    | "till"
    | "plant"
    | "water"
    | "harvest"
    | "clear";
  /**
   * « Entrer », « Parler », « Lire », « Regarder », in a dungeon « Ouvrir », « Actionner », « Frapper », on the
   * farmland « Labourer », « Planter », « Arroser », « Récolter », « Arracher ».
   */
  verb: string;
  /** The object's name (« Labo »), or who talks (« Hugo »). */
  target: string;
}

const VERBS: Record<GameAction["kind"], string> = {
  enter: "Entrer",
  talk: "Parler",
  read: "Lire",
  look: "Regarder",
  open: "Ouvrir",
  use: "Actionner",
  hit: "Frapper",
  till: "Labourer",
  plant: "Planter",
  water: "Arroser",
  harvest: "Récolter",
  clear: "Arracher",
};

export function gameAction(
  kind: GameAction["kind"],
  target: string
): GameAction {
  return { kind, verb: VERBS[kind], target };
}

/**
 * The action of an event: a passage enters; a message with a name is someone talking (the target: their name),
 * another message is read on the object.
 */
export function describeAction(
  evt: SceneEvent,
  building: SceneBuilding
): GameAction {
  const first = evt.instructions[0];
  // (an event of the editor may change a variable or play a sound before talking)
  const message = evt.instructions.find(
    (i) => i.type === InstructionType.MESSAGE
  )?.message;
  let kind: GameAction["kind"] = "look";
  if (first?.type === InstructionType.TELEPORT) {
    kind = "enter";
  } else if (message) {
    kind = message.name ? "talk" : "read";
  }
  return {
    kind,
    verb: VERBS[kind],
    target: kind === "talk" ? message!.name! : modelLabel(building.modelId),
  };
}

export function sameAction(
  a: GameAction | null,
  b: GameAction | null
): boolean {
  return a === b || (!!a && !!b && a.kind === b.kind && a.target === b.target);
}
