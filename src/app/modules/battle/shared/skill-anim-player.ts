import * as THREE from "three";
import { CAMERA_LOOK } from "../../game/shared/model/Game";
import { animFrame, SkillAnim } from "../../database-editor/shared/skill-anim";
import { playSound } from "../../game/shared/services/sfx";
import { SHEET_SCALE, SPRITE_ORDER } from "./sheet-sprite";

/** A projectile's speed (world units per second) and the height it flies at (a fighter's chest). */
const FLY_SPEED = 160;
const FLY_HEIGHT = 12;
/** Effects drawn a little towards the camera, in front of the fighter they play on. */
const IN_FRONT = 3;
/** « All of a side »: the zone around its fighters, this much wider than the farthest one. */
const ZONE_MARGIN = 16;
/** Effects drawn over the map and over the fighters. */
export const EFFECT_ORDER = SPRITE_ORDER + 100;
/** An animation over that its fight never took the hit of (its caster fell): removed this long after (ms). */
const FORGOTTEN = 3000;

/** One picture of an animation on the field: a flat plane facing the camera, cut to one frame. */
interface Piece {
  group: THREE.Group;
  plane: THREE.Mesh;
  texture: THREE.Texture;
  material: THREE.MeshBasicMaterial;
  columns: number;
  rows: number;
  row: number;
  /** A projectile: where it flies from and to. */
  from?: THREE.Vector3;
  to?: THREE.Vector3;
}

/** One skill's animation playing: its projectiles flying, then its effects. */
interface Show {
  anim: SkillAnim;
  stage: "fly" | "effect";
  /** Time in the stage (ms), the flight's length (ms). */
  time: number;
  flight: number;
  pieces: Piece[];
  /** Where the effects play (the targets, or the middle of the zone with its size). */
  spots: { pos: THREE.Vector3; scale: number }[];
  hitFired: boolean;
  hitTaken: boolean;
}

/**
 * Skills' effect animations on the battle field (see skill-anim.ts): a projectile flying from the caster to each
 * target then the effect on them, the effect on each target, or one effect on the middle of the zone, stretched to
 * its size. The fight asks when the effects land (the hit frame) and when it is over.
 */
export class SkillAnimPlayer {
  private readonly shows = new Map<number, Show>();
  private nextId = 0;

  constructor(
    private readonly scene: THREE.Scene,
    private readonly camera: THREE.Camera
  ) {}

  /**
   * Plays an animation from the caster `from` on `targets`; `zone`: the zone around the main target (its radius, 0:
   * none), or null for all of a side (the zone around them).
   */
  play(
    anim: SkillAnim,
    from: THREE.Vector3,
    targets: THREE.Vector3[],
    zone: number | null
  ): number {
    const spots = this.spotsOf(anim, targets, zone);
    const show: Show = {
      anim,
      stage: "effect",
      time: 0,
      flight: 0,
      pieces: [],
      spots,
      hitFired: false,
      hitTaken: false,
    };
    if (anim.mode === "projectile" && anim.flyFrames) {
      show.stage = "fly";
      const start = from.clone().setY(from.y + FLY_HEIGHT);
      const far = Math.max(...targets.map((t) => t.distanceTo(from)), 1);
      show.flight = (far / FLY_SPEED) * 1000;
      show.pieces = targets.map((t) => {
        const piece = this.piece(anim, 1, 1);
        piece.from = start;
        piece.to = t.clone().setY(t.y + FLY_HEIGHT);
        // Turned towards where it flies (on the screen: right or left)
        piece.group.scale.x = t.x < from.x ? -1 : 1;
        return piece;
      });
    } else {
      this.startEffect(show);
    }
    const id = ++this.nextId;
    this.shows.set(id, show);
    return id;
  }

  /**
   * True once, when its effects land (the effect's hit frame). Unknown (over, its hit already taken: it is only
   * removed after that): false, so the effects never land twice.
   */
  takeHit(id: number): boolean {
    const show = this.shows.get(id);
    if (!show || !show.hitFired || show.hitTaken) {
      return false;
    }
    show.hitTaken = true;
    return true;
  }

  /** Is it over (its effect played to the end)? Unknown: yes. */
  done(id: number): boolean {
    return !this.shows.has(id);
  }

  update(dt: number): void {
    for (const [id, show] of this.shows) {
      show.time += dt * 1000;
      const { anim } = show;
      if (show.stage === "fly") {
        const k = Math.min(1, show.time / Math.max(1, show.flight));
        for (const p of show.pieces) {
          if (p.from && p.to) {
            p.group.position.lerpVectors(p.from, p.to, k).add(towardCamera());
          }
          this.frame(
            p,
            animFrame(anim.flyFrames ?? 1, show.time, anim.ms, true)
          );
        }
        if (k >= 1) {
          this.clear(show);
          show.time = 0;
          show.stage = "effect";
          this.startEffect(show);
        }
        continue;
      }
      const frame = animFrame(anim.frames, show.time, anim.ms, false);
      show.pieces.forEach((p) => this.frame(p, frame));
      if (show.time >= anim.hit * anim.ms) {
        show.hitFired = true;
      }
      if (show.time >= anim.frames * anim.ms) {
        // (its effects land at the latest at its end)
        show.hitFired = true;
        // (kept until the fight took its hit; its fight no longer asking, e.g. the caster fell: gone later)
        if (show.hitTaken || show.time >= anim.frames * anim.ms + FORGOTTEN) {
          this.clear(show);
          this.shows.delete(id);
        }
      }
    }
  }

  dispose(): void {
    this.shows.forEach((s) => this.clear(s));
    this.shows.clear();
  }

  /** Where its effects play: on each target, or once on the middle of the zone, stretched to its width. */
  private spotsOf(
    anim: SkillAnim,
    targets: THREE.Vector3[],
    zone: number | null
  ): Show["spots"] {
    if (anim.mode !== "zone" || targets.length === 0) {
      return targets.map((pos) => ({ pos: pos.clone(), scale: 1 }));
    }
    const center =
      zone === null
        ? targets
            .reduce((sum, t) => sum.add(t), new THREE.Vector3())
            .divideScalar(targets.length)
        : targets[0].clone();
    const radius =
      zone ??
      Math.max(
        ...targets.map((t) => Math.hypot(t.x - center.x, t.z - center.z))
      ) + ZONE_MARGIN;
    const width = anim.frame.w * SHEET_SCALE;
    return [{ pos: center, scale: Math.max(1, (radius * 2) / width) }];
  }

  private startEffect(show: Show): void {
    // (once, however many targets)
    if (show.anim.sound) {
      playSound(show.anim.sound);
    }
    show.pieces = show.spots.map((spot) => {
      const piece = this.piece(show.anim, 0, spot.scale);
      piece.group.position.copy(spot.pos).add(towardCamera());
      return piece;
    });
  }

  /** A plane for one row of the animation, its foot on the group's place. */
  private piece(anim: SkillAnim, row: number, scale: number): Piece {
    const { w, h } = anim.frame;
    const piece = {} as Piece;
    piece.row = row;
    piece.columns = 1;
    piece.rows = 1;
    piece.texture = new THREE.TextureLoader().load(anim.image, (t) => {
      const img = t.image as HTMLImageElement;
      piece.columns = Math.max(1, Math.floor(img.width / w));
      piece.rows = Math.max(1, Math.floor(img.height / h));
      piece.plane.visible = true;
    });
    piece.texture.colorSpace = THREE.SRGBColorSpace;
    piece.texture.magFilter = THREE.NearestFilter;
    piece.texture.minFilter = THREE.NearestFilter;
    piece.texture.generateMipmaps = false;
    piece.material = new THREE.MeshBasicMaterial({
      map: piece.texture,
      transparent: true,
      depthWrite: false,
      // (over the map and the fighters)
      depthTest: false,
      side: THREE.DoubleSide,
    });
    // Facing the camera like the fighters (see SheetSprite), turned around its foot on the ground point
    piece.plane = new THREE.Mesh(
      new THREE.PlaneGeometry(w * SHEET_SCALE, h * SHEET_SCALE),
      piece.material
    );
    piece.plane.visible = false;
    piece.plane.renderOrder = EFFECT_ORDER;
    piece.plane.position.set(
      (w / 2 - anim.anchor.x) * SHEET_SCALE,
      (anim.anchor.y - h / 2) * SHEET_SCALE,
      0
    );
    const pivot = new THREE.Group();
    pivot.quaternion.copy(this.camera.quaternion);
    pivot.add(piece.plane);
    piece.group = new THREE.Group();
    piece.group.scale.set(scale, scale, scale);
    piece.group.add(pivot);
    this.scene.add(piece.group);
    this.frame(piece, 0);
    return piece;
  }

  private frame(piece: Piece, frame: number): void {
    const cw = 1 / piece.columns;
    const ch = 1 / piece.rows;
    piece.texture.repeat.set(cw, ch);
    piece.texture.offset.set(frame * cw, 1 - (piece.row + 1) * ch);
  }

  private clear(show: Show): void {
    for (const p of show.pieces) {
      p.group.removeFromParent();
      p.plane.geometry.dispose();
      p.material.dispose();
      p.texture.dispose();
    }
    show.pieces = [];
  }
}

/** A short step towards the camera (effects in front of the fighter they play on). */
function towardCamera(): THREE.Vector3 {
  return CAMERA_LOOK.clone().normalize().multiplyScalar(IN_FRONT);
}
