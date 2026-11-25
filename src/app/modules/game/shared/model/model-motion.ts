import * as THREE from "three";

/**
 * A part's movement (design/model-editor-mobile.pen, 8 · Formes · Mouvement), set in the model editor: it turns,
 * slides, blinks or swings, in a loop, when the player comes near, when an event plays it, or at night. Every copy of
 * the model moves the same way.
 */
export type MotionKind = "rotate" | "move" | "blink" | "swing";
export type MotionAxis = "x" | "y" | "z";
/** Where a turning part turns around (in the part's own frame): its middle, left / right edge, bottom. */
export type MotionPivot = "center" | "left" | "right" | "bottom";
export type MotionTrigger = "loop" | "near" | "event" | "night";

export interface PartMotion {
  kind: MotionKind;
  axis: MotionAxis;
  pivot: MotionPivot;
  /** Degrees (rotate, swing: each side), units (move); unused by blink. */
  amount: number;
  /**
   * Seconds: one way (rotate, move), a whole turn of `amount` degrees in a loop (rotate), a back and forth (swing),
   * on or off (blink).
   */
  duration: number;
  trigger: MotionTrigger;
}

export const MOTION_KINDS: { id: MotionKind; label: string }[] = [
  { id: "rotate", label: "Rotation" },
  { id: "move", label: "Déplacement" },
  { id: "blink", label: "Clignote" },
  { id: "swing", label: "Balance" },
];

export const MOTION_PIVOTS: { id: MotionPivot; label: string }[] = [
  { id: "center", label: "Centre" },
  { id: "left", label: "Gauche" },
  { id: "right", label: "Droite" },
  { id: "bottom", label: "Bas" },
];

export const MOTION_TRIGGERS: { id: MotionTrigger; label: string }[] = [
  { id: "loop", label: "En boucle" },
  { id: "near", label: "À l'approche" },
  { id: "event", label: "Par un événement" },
  { id: "night", label: "La nuit" },
];

/** The player is this close (map units, 2 cells) for « À l'approche ». */
export const MOTION_NEAR = 32;

export function newMotion(kind: MotionKind): PartMotion {
  switch (kind) {
    case "rotate":
      return {
        kind,
        axis: "y",
        pivot: "center",
        amount: 90,
        duration: 0.6,
        trigger: "near",
      };
    case "move":
      return {
        kind,
        axis: "y",
        pivot: "center",
        amount: 8,
        duration: 1,
        trigger: "loop",
      };
    case "blink":
      return {
        kind,
        axis: "y",
        pivot: "center",
        amount: 0,
        duration: 0.5,
        trigger: "night",
      };
    case "swing":
      return {
        kind,
        axis: "z",
        pivot: "center",
        amount: 15,
        duration: 2,
        trigger: "loop",
      };
  }
}

/** « Porte tourne de 90° autour de son bord gauche, puis revient quand il s'éloigne. » */
export function motionSentence(name: string, motion: PartMotion): string {
  // (« 0,6 s »: French decimals)
  const m = { ...motion, duration: String(motion.duration).replace(".", ",") };
  const pivot = {
    center: "son centre",
    left: "son bord gauche",
    right: "son bord droit",
    bottom: "son bas",
  }[m.pivot];
  const what = {
    rotate:
      m.trigger === "loop"
        ? `${name} tourne sans arrêt autour de ${pivot} (axe ${m.axis}), ${m.amount}° en ${m.duration} s`
        : `${name} tourne de ${m.amount}° autour de ${pivot} (axe ${m.axis})`,
    move:
      m.trigger === "loop"
        ? `${name} va et vient de ${m.amount} sur l'axe ${m.axis}`
        : `${name} glisse de ${m.amount} sur l'axe ${m.axis}`,
    blink: `${name} clignote (${m.duration} s allumé, ${m.duration} s éteint)`,
    swing: `${name} se balance de ${m.amount}° de chaque côté autour de ${pivot} (axe ${m.axis})`,
  }[m.kind];
  switch (m.trigger) {
    case "loop":
      return `En boucle : ${what}.`;
    case "near":
      return `Le joueur s'approche à moins de 2 cases : ${what}, puis revient quand il s'éloigne.`;
    case "event":
      return `Quand un événement le joue (action « Animer l'objet ») : ${what}.`;
    case "night":
      return `La nuit : ${what} ; le jour, il revient au repos.`;
  }
}

/** Does any part of the model move? */
export function hasMotion(model: {
  boxes: { motion?: PartMotion }[];
  planes: { motion?: PartMotion }[];
}): boolean {
  return [...model.boxes, ...model.planes].some((p) => !!p.motion);
}

/** Where a part turns around, in the model's space. */
export function pivotPoint(
  part: {
    pos: { x: number; y: number; z: number };
    rot: { x: number; y: number; z: number };
    size: { x: number; y: number; z?: number };
  },
  pivot: MotionPivot
): THREE.Vector3 {
  const local = new THREE.Vector3();
  switch (pivot) {
    case "left":
      local.x = -part.size.x / 2;
      break;
    case "right":
      local.x = part.size.x / 2;
      break;
    case "bottom":
      local.y = -part.size.y / 2;
      break;
    default:
      break;
  }
  local.applyEuler(new THREE.Euler(part.rot.x, part.rot.y, part.rot.z));
  return local.add(new THREE.Vector3(part.pos.x, part.pos.y, part.pos.z));
}

/** Key of a moving part's pivot group (in a model's group, see BasicMeshService.makeModel). */
export const MOTION_KEY = "motion";

/**
 * Where a moving object is in its movements: `time` runs while they play (loops, swings, blinks), `progress` goes
 * from 0 (at rest) to 1 (played: a door open) in each part's duration.
 */
export interface MotionState {
  time: number;
  progress: Map<THREE.Object3D, number>;
}

export function newMotionState(): MotionState {
  return { time: 0, progress: new Map() };
}

/**
 * What a trigger asks now: `play` (towards played, swings and blinks going), `loop` (an event's « Boucle »: turning
 * and sliding without end), `rest` (back at rest), `hold` (stopped where it is).
 */
export type MotionDrive = "play" | "loop" | "rest" | "hold";

/**
 * The movements of an object's parts at a time step (`dt` seconds): each pivot group (made by makeModel, see
 * MOTION_KEY) is turned, moved or shown according to what its trigger asks (`drive`).
 */
export function applyMotions(
  group: THREE.Object3D,
  state: MotionState,
  dt: number,
  drive: (trigger: MotionTrigger) => MotionDrive
): void {
  state.time += dt;
  for (const pivot of group.children) {
    const motion = pivot.userData[MOTION_KEY] as PartMotion | undefined;
    if (!motion) {
      continue;
    }
    const asked = motion.trigger === "loop" ? "loop" : drive(motion.trigger);
    const duration = Math.max(0.05, motion.duration);
    let progress = state.progress.get(pivot) ?? 0;
    if (asked === "play" || asked === "loop") {
      progress = Math.min(1, progress + dt / duration);
    } else if (asked === "rest") {
      progress = Math.max(0, progress - dt / duration);
    }
    state.progress.set(pivot, progress);
    const base = pivot.userData["base"] as {
      pos: THREE.Vector3;
      quat: THREE.Quaternion;
    };
    pivot.position.copy(base.pos);
    pivot.quaternion.copy(base.quat);
    pivot.visible = true;
    const axis = new THREE.Vector3(
      motion.axis === "x" ? 1 : 0,
      motion.axis === "y" ? 1 : 0,
      motion.axis === "z" ? 1 : 0
    );
    const t = state.time;
    switch (motion.kind) {
      case "rotate": {
        const degrees =
          asked === "loop"
            ? ((t / duration) * motion.amount) % 360
            : ease(progress) * motion.amount;
        pivot.quaternion.premultiply(
          new THREE.Quaternion().setFromAxisAngle(
            axis,
            THREE.MathUtils.degToRad(degrees)
          )
        );
        break;
      }
      case "move": {
        const amount =
          asked === "loop"
            ? (0.5 - 0.5 * Math.cos((Math.PI * t) / duration)) * motion.amount
            : ease(progress) * motion.amount;
        pivot.position.addScaledVector(axis, amount);
        break;
      }
      case "swing": {
        // (fades in and out with the progress: a sign stops swinging smoothly)
        const degrees =
          Math.sin((2 * Math.PI * t) / duration) *
          motion.amount *
          (asked === "loop" ? 1 : progress);
        pivot.quaternion.premultiply(
          new THREE.Quaternion().setFromAxisAngle(
            axis,
            THREE.MathUtils.degToRad(degrees)
          )
        );
        break;
      }
      case "blink":
        pivot.visible =
          asked === "rest" || asked === "hold"
            ? true
            : Math.floor(t / duration) % 2 === 0;
        break;
    }
  }
}

function ease(p: number): number {
  return p * p * (3 - 2 * p);
}
