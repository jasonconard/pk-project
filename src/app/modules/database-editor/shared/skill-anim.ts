// A skill's effect animation (Grandia-like combat): one picture cut in frames of the same size, played during the
// skill's showcase. Row 1: the effect (an impact, a cloud, a flash); row 2, for a projectile: the projectile flying.
// Format: docs/editeur/10-base-de-donnees.md (Compétences, Animation).

import { frameUsed } from "./sprite-sheet";

/**
 * How it plays: on each target hit; a projectile flying from the caster to each target, then the effect on them; or
 * one effect on the middle of the zone, stretched to its size.
 */
export type SkillAnimMode = "target" | "projectile" | "zone";
export const SKILL_ANIM_MODES: { id: SkillAnimMode; label: string }[] = [
  { id: "target", label: "Sur la cible" },
  { id: "projectile", label: "Projectile puis impact" },
  { id: "zone", label: "Sur la zone" },
];

export interface SkillAnim {
  /** The picture (PNG data URL). */
  image: string;
  frame: { w: number; h: number };
  /** The point of a frame put on the ground under the target (its foot). */
  anchor: { x: number; y: number };
  mode: SkillAnimMode;
  /** The effect: its frames (row 1), the time each is shown, the frame its effects land on (0 = the first). */
  frames: number;
  ms: number;
  hit: number;
  /** A projectile: its frames (row 2, played in a loop while it flies). */
  flyFrames?: number;
}

/** Frame size, frames and time limits in the editor. */
export const ANIM_FRAME_MAX = 256;
export const ANIM_MS_MIN = 40;
export const ANIM_MS_MAX = 400;

/** The frames drawn in a row (up to the last frame with something in it). */
export function countFrames(
  img: HTMLImageElement,
  row: number,
  w: number,
  h: number
): number {
  if ((row + 1) * h > img.height) {
    return 0;
  }
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, img.width, img.height);
  let frames = 0;
  for (let col = 0; col < Math.floor(img.width / w); col++) {
    if (frameUsed(data, col * w, row * h, w, h)) {
      frames = col + 1;
    }
  }
  return frames;
}

/**
 * A new animation for a picture: square frames as tall as a row (two rows for a projectile), its foot at the bottom
 * middle, its frames counted, its effects landing in the middle of it.
 */
export function newSkillAnim(
  img: HTMLImageElement,
  image: string,
  mode: SkillAnimMode
): SkillAnim {
  const rows = mode === "projectile" && img.height >= 2 ? 2 : 1;
  const h = Math.max(1, Math.floor(img.height / rows));
  const w = Math.min(h, img.width);
  return withFrames(
    img,
    {
      image,
      frame: { w, h },
      anchor: { x: Math.floor(w / 2), y: h - 1 },
      mode,
      frames: 1,
      ms: 80,
      hit: 0,
    },
    w,
    h
  );
}

/** Another frame size or mode: its frames counted again, the hit frame and the foot kept inside. */
export function withFrames(
  img: HTMLImageElement,
  anim: SkillAnim,
  w: number,
  h: number
): SkillAnim {
  const frames = Math.max(1, countFrames(img, 0, w, h));
  const next: SkillAnim = {
    ...anim,
    frame: { w, h },
    anchor: {
      x: Math.min(anim.anchor.x, w - 1),
      y: Math.min(anim.anchor.y, h - 1),
    },
    frames,
    hit: anim.hit < frames ? anim.hit : Math.floor((frames - 1) / 2),
  };
  delete next.flyFrames;
  if (anim.mode === "projectile") {
    next.flyFrames = Math.max(1, countFrames(img, 1, w, h));
  }
  return next;
}

/** The frame shown `ms` after it starts: the effect once, the projectile in a loop. */
export function animFrame(
  frames: number,
  ms: number,
  frameMs: number,
  loop: boolean
): number {
  const i = Math.floor(ms / frameMs);
  return loop ? i % Math.max(1, frames) : Math.min(i, frames - 1);
}
