import { animFrame, SkillAnim } from "./skill-anim";
import { effectTiming, FlowBlock, SkillFlow } from "./skill-flow";
import {
  frameAt,
  isFlipped,
  SheetDirection,
  sheetRow,
  SpriteSheet,
} from "./sprite-sheet";

/**
 * A flow drawn at a moment, for the editor's preview (flow-editor): a caster and a target with their own sheets, the
 * effect picture, the numbers of the hits, the screen shaking. Pure: the same moment always gives the same picture,
 * so the editor can play, pause and go anywhere in time. Not the fight's camera nor its scenery: a small flat scene.
 */
export interface FlowScene {
  flow: SkillFlow;
  /** The effect picture of the skill or the weapon, with its loaded image. */
  picture?: SkillAnim;
  pictureImage?: HTMLImageElement;
  caster?: { sheet: SpriteSheet; image: HTMLImageElement };
  target?: { sheet: SpriteSheet; image: HTMLImageElement };
  /** The caster stands right next to its target (a blow at contact). */
  melee: boolean;
  /** What a hit of 100 % shows (the sheet's damage, or healing), and whether it heals. */
  power: number;
  heals: boolean;
}

/** The scene's size (canvas pixels: one for a sprite pixel), the ground line, where the two stand. */
export const SCENE = { w: 320, h: 170, ground: 128, caster: 96, target: 224 };
const NUMBER_TIME = 0.9;
const HURT_TIME = 0.36;
const ARROW_LENGTH = 14;

function started(flow: SkillFlow, track: FlowBlock["track"], t: number) {
  return flow.blocks.filter((b) => b.track === track && b.start <= t);
}

/** One frame of a sheet's animation, its feet at (x, y). */
function drawSprite(
  ctx: CanvasRenderingContext2D,
  who: { sheet: SpriteSheet; image: HTMLImageElement },
  anim: string,
  ms: number,
  dir: SheetDirection,
  x: number,
  y: number
): void {
  const { sheet, image } = who;
  let index = sheet.anims.findIndex((a) => a.id === anim);
  if (index < 0) {
    index = 0;
  }
  const frame = frameAt(sheet.anims[index], ms);
  const { w, h } = sheet.frame;
  const flipped = isFlipped(sheet, dir);
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  if (flipped) {
    ctx.scale(-1, 1);
  }
  ctx.drawImage(
    image,
    frame * w,
    sheetRow(sheet, index, dir) * h,
    w,
    h,
    -sheet.anchor.x,
    -sheet.anchor.y,
    w,
    h
  );
  ctx.restore();
}

/** Has a sheet's animation that plays once reached its end after `ms`? */
function over(sheet: SpriteSheet, anim: string, ms: number): boolean {
  const found = sheet.anims.find((a) => a.id === anim);
  return !found || (!found.loop && ms >= found.frames * found.ms);
}

/** The whole scene at `t` seconds of the flow. */
export function drawFlowScene(
  ctx: CanvasRenderingContext2D,
  scene: FlowScene,
  t: number
): void {
  const { flow } = scene;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = "#3d6b42";
  ctx.fillRect(0, 0, SCENE.w, SCENE.h);
  // The screen shaking: strong at first then less and less, the same at the same moment
  const shake = started(flow, "screen", t).find(
    (b) => t < b.start + Math.max(0.1, b.duration)
  );
  if (shake) {
    const left = 1 - (t - shake.start) / Math.max(0.1, shake.duration);
    ctx.translate(
      Math.round(Math.sin(t * 190) * 4 * left),
      Math.round(Math.cos(t * 230) * 2 * left)
    );
  }
  ctx.fillStyle = "#355d3a";
  ctx.fillRect(-8, SCENE.ground - 6, SCENE.w + 16, SCENE.h);
  const targetX = SCENE.target;
  const casterX = scene.melee ? targetX - 40 : SCENE.caster;
  const hits = started(flow, "hit", t);

  // The target: flinching for a moment after each hit
  if (scene.target) {
    const last = hits.at(-1);
    const hurt = last && t - last.start < HURT_TIME;
    drawSprite(
      ctx,
      scene.target,
      hurt ? "hurt" : "idle",
      (hurt ? t - last.start : t) * 1000,
      "sw",
      targetX,
      SCENE.ground
    );
  }
  // The caster: its last animation started, then back to standing
  if (scene.caster) {
    const block = started(flow, "caster", t).at(-1);
    const anim = block?.anim ?? "idle";
    const ms = block ? (t - block.start) * 1000 : t * 1000;
    const idle = !block || over(scene.caster.sheet, anim, ms);
    drawSprite(
      ctx,
      scene.caster,
      idle ? "idle" : anim,
      idle ? t * 1000 : ms,
      "se",
      casterX,
      SCENE.ground
    );
  }
  // The effects: an arrow or the picture flying to the target, then the picture's frames on it
  for (const block of started(flow, "effect", t)) {
    const since = t - block.start;
    const flying = since < block.duration;
    const k = block.duration > 0 ? since / block.duration : 1;
    const x = casterX + (targetX - casterX) * Math.min(1, k);
    if (block.arrow) {
      if (flying) {
        ctx.fillStyle = "#e8dcc8";
        ctx.fillRect(Math.round(x) - ARROW_LENGTH, SCENE.ground - 22, 14, 2);
        ctx.fillStyle = "#8a8d9c";
        ctx.fillRect(Math.round(x), SCENE.ground - 23, 3, 4);
      }
      continue;
    }
    const picture = scene.picture;
    const image = scene.pictureImage;
    if (!picture || !image) {
      continue;
    }
    const { w, h } = picture.frame;
    if (flying && picture.flyFrames) {
      const frame = animFrame(
        picture.flyFrames,
        since * 1000,
        picture.ms,
        true
      );
      ctx.drawImage(
        image,
        frame * w,
        h,
        w,
        h,
        Math.round(x - picture.anchor.x),
        SCENE.ground - 12 - picture.anchor.y,
        w,
        h
      );
      continue;
    }
    const played = (since - block.duration) * 1000;
    if (played >= 0 && played < effectTiming(picture).length * 1000) {
      const frame = animFrame(picture.frames, played, picture.ms, false);
      ctx.drawImage(
        image,
        frame * w,
        0,
        w,
        h,
        targetX - picture.anchor.x,
        SCENE.ground - picture.anchor.y,
        w,
        h
      );
    }
  }
  // The numbers: each hit's share of the sheet's power, going up and fading
  ctx.font = "bold 14px monospace";
  ctx.textAlign = "center";
  hits.forEach((hit, index) => {
    const age = t - hit.start;
    if (age >= NUMBER_TIME) {
      return;
    }
    // (under the number of a hit just before, like in a fight)
    const before = hits[index - 1];
    const line = before && hit.start - before.start < 0.35 ? 1 : 0;
    const amount = Math.round((scene.power * (hit.percent ?? 100)) / 100);
    const y = SCENE.ground - 62 - age * 22 + line * 14;
    ctx.globalAlpha = Math.min(1, (NUMBER_TIME - age) * 4);
    ctx.fillStyle = "#1b1020";
    ctx.fillText(String(amount), targetX + 1, Math.round(y) + 1);
    ctx.fillStyle = scene.heals ? "#7fe08a" : "#ffd34d";
    ctx.fillText(String(amount), targetX, Math.round(y));
    ctx.globalAlpha = 1;
  });
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

/** The sound blocks starting between two moments (after `from`, up to `to`): played once while the flow plays. */
export function soundsBetween(
  flow: SkillFlow,
  from: number,
  to: number
): FlowBlock[] {
  return flow.blocks.filter(
    (b) => b.track === "sound" && b.start > from && b.start <= to
  );
}
