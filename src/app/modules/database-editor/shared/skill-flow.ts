import { DbSkill, DbWeapon, SkillEffect, skillRange } from "./database";
import { SkillAnim } from "./skill-anim";
import { SHEET_ANIMS } from "./sprite-sheet";

/**
 * How a skill (or a weapon type's attack) plays in time (docs/editeur/22-deroule.md): blocks on five tracks, like a
 * cutscene. The caster's animations, the effect picture played on the targets, sounds, the hits (the moments its
 * effects land and the numbers show, each with its share of the power: several hits make a combo) and the screen
 * (shaking). The clock starts when the caster strikes (after it walked up to its target, for a blow at contact).
 */
export type FlowTrack = "caster" | "effect" | "sound" | "hit" | "screen";

export const FLOW_TRACKS: { id: FlowTrack; label: string }[] = [
  { id: "caster", label: "Lanceur" },
  { id: "effect", label: "Effets" },
  { id: "sound", label: "Sons" },
  { id: "hit", label: "Coups" },
  { id: "screen", label: "Écran" },
];

/** The tracks whose blocks are a moment, not a length of time. */
export const INSTANT_TRACKS: FlowTrack[] = ["sound", "hit"];

export interface FlowBlock {
  id: string;
  track: FlowTrack;
  /** When it starts (s from the strike). */
  start: number;
  /**
   * How long it lasts (s; 0 for a moment). An effect flying to its targets (a projectile, an arrow): its flight,
   * the effect then plays where it arrives.
   */
  duration: number;
  /** Caster: the animation of its sheet (attack, heavy, magic, cast…). */
  anim?: string;
  /** Effect: a plain arrow shot from the caster instead of the owner's effect picture. */
  arrow?: boolean;
  /** Sound: its id (sfx.ts) and its pitch (1: as it is). */
  sound?: string;
  pitch?: number;
  /** Hit: its share of the power (%), whether the states and boosts land with it. */
  percent?: number;
  states?: boolean;
}

export interface SkillFlow {
  blocks: FlowBlock[];
}

/** How long a projectile or an arrow flies when nothing says (s). */
export const FLIGHT_TIME = 0.4;
const SHAKE_TIME = 0.25;

let nextBlock = 0;
export function flowBlockId(): string {
  return `b${Date.now().toString(36)}${(nextBlock++).toString(36)}`;
}

/** How long a sheet's standard animation lasts and when its blow lands (s). */
export function sheetTiming(anim: string): { length: number; hit: number } {
  const found = SHEET_ANIMS.find((a) => a.id === anim) ?? SHEET_ANIMS[0];
  return {
    length: (found.frames * found.ms) / 1000,
    hit: ((found.hit ?? found.frames - 1) * found.ms) / 1000,
  };
}

/** How long an effect picture plays once it is on its targets, and when its hit frame comes (s). */
export function effectTiming(anim: SkillAnim): { length: number; hit: number } {
  return {
    length: (anim.frames * anim.ms) / 1000,
    hit: (Math.min(anim.hit, anim.frames - 1) * anim.ms) / 1000,
  };
}

/** When a flow is over (s): its last block's end, an effect played to its end. */
export function flowLength(flow: SkillFlow, anim?: SkillAnim): number {
  return Math.max(
    0.1,
    ...flow.blocks.map((b) => {
      const tail =
        b.track === "effect" && anim && !b.arrow
          ? effectTiming(anim).length
          : 0;
      return b.start + b.duration + tail;
    })
  );
}

/** The hits' shares added up (%): 100 when the skill does what its sheet says. */
export function flowPower(flow: SkillFlow): number {
  return flow.blocks
    .filter((b) => b.track === "hit")
    .reduce((sum, b) => sum + (b.percent ?? 100), 0);
}

/** The sound of a skill's effects landing, when nothing says: its element's, else what its effects do. */
export function defaultSkillSound(
  skill: Pick<DbSkill, "element" | "effects">,
  melee: boolean
): string {
  const has = (kind: SkillEffect["kind"]) =>
    skill.effects.some((e) => e.kind === kind);
  const element = ELEMENT_SOUNDS.find(([name]) => skill.element.includes(name));
  if (element && has("damage")) {
    return element[1];
  }
  if (has("heal") || has("removeState")) {
    return "heal";
  }
  if (has("stat")) {
    return "boost";
  }
  if (has("addState") && !has("damage")) {
    return "poison";
  }
  return melee ? "heavy" : "magic";
}

/** A sound by the name of an element, found in the element's id. */
const ELEMENT_SOUNDS: [string, string][] = [
  ["fire", "fire"],
  ["ice", "ice"],
  ["thunder", "thunder"],
  ["wind", "wind"],
  ["earth", "earth"],
  ["light", "light"],
  ["dark", "dark"],
  ["water", "ice"],
];

/**
 * One blow: the caster's animation, the effect picture (or an arrow) leaving on its hit frame, a sound and one hit
 * of the whole power when it lands.
 */
function oneBlow(
  casterAnim: string,
  sound: string,
  anim: SkillAnim | undefined,
  arrow: boolean,
  shake: boolean
): SkillFlow {
  const caster = sheetTiming(casterAnim);
  const blocks: FlowBlock[] = [
    {
      id: flowBlockId(),
      track: "caster",
      start: 0,
      duration: caster.length,
      anim: casterAnim,
    },
  ];
  let land = caster.hit;
  if (anim || arrow) {
    const flies = arrow || (anim?.mode === "projectile" && !!anim.flyFrames);
    const flight = flies ? FLIGHT_TIME : 0;
    blocks.push({
      id: flowBlockId(),
      track: "effect",
      start: caster.hit,
      duration: flight,
      ...(arrow && !anim ? { arrow: true } : {}),
    });
    land = caster.hit + flight + (anim ? effectTiming(anim).hit : 0);
  }
  const at = Math.round(land * 100) / 100;
  blocks.push(
    { id: flowBlockId(), track: "sound", start: at, duration: 0, sound },
    {
      id: flowBlockId(),
      track: "hit",
      start: at,
      duration: 0,
      percent: 100,
      states: true,
    }
  );
  if (shake) {
    blocks.push({
      id: flowBlockId(),
      track: "screen",
      start: at,
      duration: SHAKE_TIME,
    });
  }
  return { blocks };
}

/**
 * A skill's flow: its own, else the one its sheet gives (what it did before the flows): its caster's blow at
 * contact or spell, its effect picture, its sound, one hit.
 */
export function skillFlow(skill: DbSkill): SkillFlow {
  if (skill.flow?.blocks.length) {
    return skill.flow;
  }
  const melee = skillRange(skill) === "contact";
  return oneBlow(
    melee ? "heavy" : "magic",
    skill.anim?.sound ?? defaultSkillSound(skill, melee),
    skill.anim,
    false,
    false
  );
}

/**
 * A weapon type's flow for the attack or the heavy blow (no weapon: bare hands): its own, else a blow with its
 * effect picture, an arrow for a ranged one, the screen shaking a little on a heavy blow.
 */
export function attackFlow(
  weapon: DbWeapon | undefined,
  heavy: boolean,
  ranged: boolean
): SkillFlow {
  const own = heavy ? weapon?.flowHeavy : weapon?.flow;
  if (own?.blocks.length) {
    return own;
  }
  const blow = ranged ? "arrow" : "slash";
  return oneBlow(
    heavy ? "heavy" : "attack",
    weapon?.anim?.sound ?? (heavy ? "heavy" : blow),
    weapon?.anim,
    ranged,
    heavy
  );
}

/** An item used in a fight: its user's gesture, one hit with its effects. */
export function itemFlow(): SkillFlow {
  return oneBlow("attack", "item", undefined, false, false);
}
