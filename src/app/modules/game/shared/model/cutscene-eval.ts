import {
  CutBlock,
  CutEmote,
  CutPace,
  Cutscene,
  CutTrack,
  INSTANT_KINDS,
  PACE_SPEED,
  PLAYER_ACTOR,
} from "./cutscene";

/**
 * What a cutscene shows at a time (s), worked out from its blocks alone: the same time always gives the same scene,
 * so the editor can show any moment (the playhead) and skipping puts everyone at their final place.
 */

export interface Point3 {
  x: number;
  y: number;
  z: number;
}

/** Where the actors and the camera are when the cutscene starts. */
export interface CutStart {
  actors: Record<string, Point3 & { dir: number }>;
  /** The point the camera looks at. */
  camera: Point3;
}

export interface ActorPose extends Point3 {
  /** PlayerDirection: 0 up, 1 right, 2 down, 3 left. */
  dir: number;
  visible: boolean;
  /** Walking now (its pace), else standing. */
  pace: CutPace | null;
  emote: CutEmote | null;
}

export interface CameraPose extends Point3 {
  /** The camera's distance (1: the usual one). */
  zoom: number;
  /** Degrees turned around the point looked at. */
  angle: number;
}

export interface ScreenState {
  /** 0..1: the black bars in. */
  bars: number;
  /** 0..1: the screen covered by the fade's colour. */
  fade: number;
  fadeColor: "black" | "white";
  title: string | null;
  titleOpacity: number;
}

const byStart = (a: CutBlock, b: CutBlock) => a.start - b.start;

function progress(block: CutBlock, t: number): number {
  if (block.duration <= 0) {
    return t >= block.start ? 1 : 0;
  }
  return Math.min(1, Math.max(0, (t - block.start) / block.duration));
}

/** Smooth start and stop. */
export function ease(p: number): number {
  return p * p * (3 - 2 * p);
}

/** The direction of a move (the larger axis). */
export function dirOf(dx: number, dz: number, fallback: number): number {
  if (Math.abs(dx) < 0.01 && Math.abs(dz) < 0.01) {
    return fallback;
  }
  if (Math.abs(dx) > Math.abs(dz)) {
    return dx > 0 ? 1 : 3;
  }
  return dz > 0 ? 2 : 0;
}

export function characterTracks(cut: Cutscene): CutTrack[] {
  return cut.tracks.filter((t) => t.kind === "actor" && t.actor);
}

/** The actor's track (null: none, it doesn't move). */
function trackOf(cut: Cutscene, actor: string): CutTrack | null {
  return characterTracks(cut).find((t) => t.actor === actor) ?? null;
}

/** Where an actor is at a time (its walks one after the other, straight lines). */
export function positionAt(
  cut: Cutscene,
  actor: string,
  t: number,
  start: CutStart
): Point3 & { moving: CutBlock | null; lastWalk: CutBlock | null } {
  const from = start.actors[actor] ?? { x: 0, y: 0, z: 0, dir: 2 };
  let x = from.x;
  let z = from.z;
  let moving: CutBlock | null = null;
  let lastWalk: CutBlock | null = null;
  const walks = (trackOf(cut, actor)?.blocks ?? [])
    .filter((b) => b.kind === "walk" && b.x !== undefined && b.z !== undefined)
    .sort(byStart);
  for (const w of walks) {
    if (t < w.start) {
      break;
    }
    const p = progress(w, t);
    if (p < 1) {
      x += (w.x! - x) * p;
      z += (w.z! - z) * p;
      moving = w;
      lastWalk = w;
      break;
    }
    x = w.x!;
    z = w.z!;
    lastWalk = w;
  }
  return { x, y: from.y, z, moving, lastWalk };
}

/** Where a walk starts from: the actor's place when the block begins (for its duration from the way's length). */
export function walkFrom(
  cut: Cutscene,
  actor: string,
  block: CutBlock,
  start: CutStart
): Point3 {
  const others: Cutscene = {
    ...cut,
    tracks: cut.tracks.map((tr) =>
      tr.actor === actor
        ? { ...tr, blocks: tr.blocks.filter((b) => b.id !== block.id) }
        : tr
    ),
  };
  return positionAt(others, actor, block.start, start);
}

/** How long a walk takes at its pace (s, at least 0.2). */
export function walkDuration(from: Point3, block: CutBlock): number {
  if (block.x === undefined || block.z === undefined) {
    return block.duration;
  }
  const length = Math.hypot(block.x - from.x, block.z - from.z);
  const speed = PACE_SPEED[block.pace ?? "walk"];
  return Math.max(0.2, Math.round((length / speed) * 10) / 10);
}

/** Everyone's pose at a time. */
export function actorsAt(
  cut: Cutscene,
  t: number,
  start: CutStart
): Record<string, ActorPose> {
  const actors = new Set([
    ...Object.keys(start.actors),
    ...characterTracks(cut).map((tr) => tr.actor!),
  ]);
  const places = new Map(
    [...actors].map((a) => [a, positionAt(cut, a, t, start)])
  );
  const toward = (from: Point3, target: string, fallback: number) => {
    const to = places.get(target);
    return to ? dirOf(to.x - from.x, to.z - from.z, fallback) : fallback;
  };
  const poses: Record<string, ActorPose> = {};
  for (const actor of actors) {
    const place = places.get(actor)!;
    const blocks = [...(trackOf(cut, actor)?.blocks ?? [])].sort(byStart);
    let dir = start.actors[actor]?.dir ?? 2;
    // (hidden at first when it first appears)
    const firstShow = blocks.find(
      (b) => b.kind === "show" || b.kind === "hide"
    );
    let visible = firstShow?.kind !== "show";
    let emote: CutEmote | null = null;
    // The last place before each walk, to know where it walked from
    let last = {
      x: start.actors[actor]?.x ?? 0,
      z: start.actors[actor]?.z ?? 0,
    };
    for (const b of blocks) {
      if (t < b.start) {
        break;
      }
      switch (b.kind) {
        case "walk": {
          if (b.x === undefined || b.z === undefined) {
            break;
          }
          dir = dirOf(b.x - last.x, b.z - last.z, dir);
          if (progress(b, t) >= 1) {
            if (b.target) {
              dir = toward({ x: b.x, y: 0, z: b.z }, b.target, dir);
            } else if (b.dir !== undefined) {
              dir = b.dir;
            }
          }
          last = { x: b.x, z: b.z };
          break;
        }
        case "turn":
          dir = b.target ? toward(place, b.target, dir) : (b.dir ?? dir);
          break;
        case "show":
          visible = true;
          break;
        case "hide":
          visible = false;
          break;
        case "bubble":
          if (t < b.start + b.duration) {
            emote = b.emote ?? "exclaim";
          }
          break;
        default:
          break;
      }
    }
    poses[actor] = {
      x: place.x,
      y: place.y,
      z: place.z,
      dir,
      visible,
      pace: place.moving ? (place.moving.pace ?? "walk") : null,
      emote,
    };
  }
  return poses;
}

/**
 * The camera at a time: it follows the player until its first block, then goes to points, follows someone, zooms,
 * turns around, shakes.
 */
export function cameraAt(
  cut: Cutscene,
  t: number,
  start: CutStart,
  poses: Record<string, ActorPose>
): CameraPose {
  const blocks = [
    ...(cut.tracks.find((tr) => tr.kind === "camera")?.blocks ?? []),
  ].sort(byStart);
  const player = poses[PLAYER_ACTOR];
  // Before any block: on the player (as in the game)
  let x = player?.x ?? start.camera.x;
  let y = player?.y ?? start.camera.y;
  let z = player?.z ?? start.camera.z;
  if (blocks.length > 0 && blocks[0].start > 0 && player) {
    // (where the player was when the first block began)
    const at = positionAt(
      cut,
      PLAYER_ACTOR,
      Math.min(t, blocks[0].start),
      start
    );
    x = at.x;
    z = at.z;
  } else if (blocks.length > 0) {
    x = start.camera.x;
    y = start.camera.y;
    z = start.camera.z;
  }
  let zoom = 1;
  let angle = 0;
  let shakeX = 0;
  let shakeZ = 0;
  for (const b of blocks) {
    if (t < b.start) {
      break;
    }
    const p = ease(progress(b, t));
    switch (b.kind) {
      case "cam-goto":
        if (b.x !== undefined && b.z !== undefined) {
          x += (b.x - x) * p;
          z += (b.z - z) * p;
        }
        break;
      case "cam-follow": {
        const who = b.target ?? PLAYER_ACTOR;
        const at = positionAt(
          cut,
          who,
          Math.min(t, b.start + b.duration),
          start
        );
        // (it catches up with them in its first half second)
        const catchUp = Math.min(1, (t - b.start) / 0.5);
        const k = ease(Math.min(1, catchUp));
        x += (at.x - x) * k;
        z += (at.z - z) * k;
        y += (at.y - y) * k;
        break;
      }
      case "cam-zoom":
        zoom += ((b.zoom ?? 1) - zoom) * p;
        break;
      case "cam-orbit":
        angle += (b.degrees ?? 0) * p;
        break;
      case "cam-shake":
        if (t < b.start + b.duration) {
          // (fading out towards its end)
          const s = (b.strength ?? 2) * 1.5 * (1 - progress(b, t));
          shakeX = Math.sin(t * 53) * s;
          shakeZ = Math.cos(t * 47) * s;
        }
        break;
      default:
        break;
    }
  }
  return { x: x + shakeX, y, z: z + shakeZ, zoom, angle };
}

/** The black bars, the fade and the title at a time. */
export function screenAt(cut: Cutscene, t: number): ScreenState {
  const blocks = [
    ...(cut.tracks.find((tr) => tr.kind === "screen")?.blocks ?? []),
  ].sort(byStart);
  const state: ScreenState = {
    bars: 0,
    fade: 0,
    fadeColor: "black",
    title: null,
    titleOpacity: 0,
  };
  const edge = (b: CutBlock, span: number) =>
    Math.min(1, (t - b.start) / span, (b.start + b.duration - t) / span);
  for (const b of blocks) {
    if (t < b.start) {
      break;
    }
    const inside = t < b.start + b.duration;
    switch (b.kind) {
      case "bars":
        if (inside) {
          state.bars = Math.max(state.bars, ease(Math.max(0, edge(b, 0.4))));
        }
        break;
      case "fade": {
        const p = ease(progress(b, t));
        state.fade = b.in ? 1 - p : p;
        state.fadeColor = b.color ?? "black";
        break;
      }
      case "title":
        if (inside) {
          state.title = b.text ?? "";
          state.titleOpacity = Math.max(0, edge(b, 0.5));
        }
        break;
      default:
        break;
    }
  }
  return state;
}

/** The blocks fired once when the time reaches them (messages, music, sounds…) between two times (t0, t1]. */
export function firedBetween(
  cut: Cutscene,
  t0: number,
  t1: number
): CutBlock[] {
  return cut.tracks
    .flatMap((tr) => tr.blocks)
    .filter(
      (b) =>
        INSTANT_KINDS.includes(b.kind) &&
        !["turn", "show", "hide"].includes(b.kind) &&
        (t0 < 0 ? b.start >= 0 : b.start > t0) &&
        b.start <= t1
    )
    .sort(byStart);
}
