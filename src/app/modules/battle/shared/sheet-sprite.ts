import * as THREE from "three";
import { CAMERA_LOOK } from "../../game/shared/model/Game";
import {
  registerUnlitMaterial,
  UNLIT_MATERIALS,
} from "../../game/shared/weather/weather-shader";
import {
  frameAt,
  isFlipped,
  SheetAnim,
  SheetDirection,
  sheetRow,
  SpriteSheet,
} from "../../database-editor/shared/sprite-sheet";

/** World units per pixel of a sheet (a 48 px frame: a fighter a little smaller than the player on the map). */
export const SHEET_SCALE = 0.5;

/**
 * A fighter drawn from its sprite sheet: a flat picture standing on the ground and facing the camera (like the
 * player on the map), its round shadow on the ground, playing one animation in one of the 4 directions.
 */
export class SheetSprite {
  readonly group = new THREE.Group();
  private readonly texture: THREE.Texture;
  private readonly material: THREE.MeshBasicMaterial;
  private readonly plane: THREE.Mesh;
  private readonly shadow: THREE.Mesh;
  private columns = 1;
  private rows = 1;
  private animIndex = 0;
  private dir: SheetDirection = "se";
  private time = 0;
  private hitFired = false;
  /** Glowing (an enemy preparing a spell): its colour pulses brighter. */
  private glow = false;
  private glowTime = 0;

  constructor(private readonly sheet: SpriteSheet) {
    const { w, h } = sheet.frame;
    this.texture = new THREE.TextureLoader().load(sheet.image, (t) => {
      const img = t.image as HTMLImageElement;
      this.columns = Math.max(1, Math.floor(img.width / w));
      this.rows = Math.max(1, Math.floor(img.height / h));
      this.applyFrame();
    });
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.magFilter = THREE.NearestFilter;
    this.texture.minFilter = THREE.NearestFilter;
    this.texture.generateMipmaps = false;
    this.material = registerUnlitMaterial(
      new THREE.MeshBasicMaterial({
        map: this.texture,
        transparent: true,
        alphaTest: 0.1,
        side: THREE.DoubleSide,
      })
    );
    // Upright, stretched so it looks its height from the camera pitch (see MapHelper.buildPlayer)
    const stretch = 1 / Math.cos(Math.atan2(CAMERA_LOOK.y, CAMERA_LOOK.z));
    this.plane = new THREE.Mesh(
      new THREE.PlaneGeometry(w * SHEET_SCALE, h * SHEET_SCALE),
      this.material
    );
    this.plane.scale.y = stretch;
    // The plane's centre above the feet: half the frame, minus what lies under the feet
    this.plane.position.y = (sheet.anchor.y - h / 2) * SHEET_SCALE * stretch;
    this.shadow = new THREE.Mesh(
      new THREE.CircleGeometry(1, 20),
      new THREE.MeshBasicMaterial({
        color: 0x00_00_00,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
      })
    );
    this.shadow.rotation.x = -Math.PI / 2;
    this.shadow.scale.set(w * SHEET_SCALE * 0.24, w * SHEET_SCALE * 0.1, 1);
    this.shadow.position.y = 0.3;
    this.group.add(this.shadow, this.plane);
    this.applyFrame();
  }

  get anim(): SheetAnim | undefined {
    return this.sheet.anims[this.animIndex];
  }

  /** Plays an animation (by id: idle, walk…) from its start; the direction stays unless given. */
  play(id: string, dir?: SheetDirection, restart = false): void {
    const index = this.sheet.anims.findIndex((a) => a.id === id);
    if (index >= 0 && (index !== this.animIndex || restart)) {
      this.animIndex = index;
      this.time = 0;
      this.hitFired = false;
    }
    if (dir) {
      this.dir = dir;
    }
    this.applyFrame();
  }

  /** Has an animation played once reached its last frame? */
  get finished(): boolean {
    const anim = this.anim;
    return !!anim && !anim.loop && this.time >= anim.frames * anim.ms;
  }

  /** True once, when the animation reaches its hit frame (the blow lands, the spell leaves); no hit frame: at its end. */
  consumeHit(): boolean {
    const anim = this.anim;
    if (!anim || this.hitFired) {
      return false;
    }
    const at = anim.hit ?? Math.max(0, anim.frames - 1);
    if (this.time >= at * anim.ms) {
      this.hitFired = true;
      return true;
    }
    return false;
  }

  /** Fading out (a defeated enemy): 1 shown … 0 gone. */
  setOpacity(opacity: number): void {
    this.material.opacity = opacity;
    (this.shadow.material as THREE.MeshBasicMaterial).opacity = 0.28 * opacity;
  }

  update(dt: number): void {
    this.time += dt * 1000;
    this.applyFrame();
    if (this.glow) {
      this.glowTime += dt;
      const k = 0.5 + 0.5 * Math.sin(this.glowTime * 6);
      // (the weather multiplies this base colour by its tint each frame)
      this.baseColor().setRGB(1 + 0.45 * k, 1 + 0.3 * k, 1 + 0.75 * k);
    }
  }

  /** Glowing on / off (an enemy preparing a spell). */
  setGlow(on: boolean): void {
    this.glow = on;
    this.glowTime = 0;
    if (!on) {
      this.baseColor().setRGB(1, 1, 1);
    }
  }

  private baseColor(): THREE.Color {
    return this.material.userData["unlitBaseColor"] as THREE.Color;
  }

  dispose(): void {
    this.group.removeFromParent();
    this.plane.geometry.dispose();
    this.shadow.geometry.dispose();
    (this.shadow.material as THREE.Material).dispose();
    UNLIT_MATERIALS.delete(this.material);
    this.material.dispose();
    this.texture.dispose();
  }

  private applyFrame(): void {
    const anim = this.anim;
    if (!anim) {
      return;
    }
    const w = this.sheet.frame.w;
    const anchor = this.sheet.anchor;
    const frame = frameAt(anim, this.time);
    const row = sheetRow(this.sheet, this.animIndex, this.dir);
    const flipped = isFlipped(this.sheet, this.dir);
    const cw = 1 / this.columns;
    const ch = 1 / this.rows;
    this.texture.repeat.set(flipped ? -cw : cw, ch);
    this.texture.offset.set(
      flipped ? (frame + 1) * cw : frame * cw,
      1 - (row + 1) * ch
    );
    // The feet stay on the ground point, flipped or not
    this.plane.position.x =
      (w / 2 - anchor.x) * SHEET_SCALE * (flipped ? -1 : 1);
  }
}
