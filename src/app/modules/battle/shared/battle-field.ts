import { FIGHT_AREA } from "../../game/shared/model/arena";
import * as THREE from "three";
import { CAMERA_LOOK, Game } from "../../game/shared/model/Game";
import { SheetDirection } from "../../database-editor/shared/sprite-sheet";
import { EFFECT_ORDER } from "./skill-anim-player";
import { SheetSprite } from "./sheet-sprite";
import { SkillAnimPlayer } from "./skill-anim-player";
import { Fighter } from "./battle-types";

/** The enemies' area (its centre ahead of the team) and the team's line, in world units. */
const FOE_AREA = FIGHT_AREA.foes;
const TEAM_SPACING = FIGHT_AREA.teamSpacing;
const TEAM_BACK = FIGHT_AREA.teamBack;
/** The camera closer than on the map during a fight; closer still when aiming (towards the aimed one), its easing. */
const FIGHT_ZOOM = 0.85;
const FOCUS_ZOOM = 0.62;
const FOCUS_SHIFT = 0.7;
const CAMERA_EASE = 6;
/** A skill shown off: the camera right on the caster (then the targets), closer still. */
const SHOW_ZOOM = 0.5;
/** …standing back to show several targets. */
const SHOW_WIDE_ZOOM = 0.8;

/** An arrow in flight: a thin shaft (world units), flying at about a fighter's chest height. */
const ARROW_GEOMETRY = new THREE.BoxGeometry(0.6, 0.6, 9);
const ARROW_MATERIAL = new THREE.MeshBasicMaterial({
  color: 0xf0_e6_d0,
  depthTest: false,
});
const ARROW_HEIGHT = 12;
/** A skill's zone while aiming: a thin orange circle on the ground. */
const ZONE_MATERIAL = new THREE.MeshBasicMaterial({
  color: 0xff_b0_4a,
  transparent: true,
  opacity: 0.75,
  depthWrite: false,
  side: THREE.DoubleSide,
});

/** The diagonal a fighter faces to look from `from` towards `to` (on the ground: x right, z towards the camera). */
export function facing(from: THREE.Vector3, to: THREE.Vector3): SheetDirection {
  const east = to.x >= from.x;
  const south = to.z > from.z;
  if (south) {
    return east ? "se" : "sw";
  }
  return east ? "ne" : "nw";
}

/**
 * The fight drawn on the map, where the player stands: the team in a line, the enemies ahead of it where the group
 * places them, each a sprite animated from its sheet; the camera closer and centred on the field; the player's own
 * sprite hidden (the team stands in its place). Everything is put back as it was by `dispose`.
 */
export class BattleField {
  private readonly sprites = new Map<string, SheetSprite>();
  private readonly savedCamera: THREE.Vector3;
  private readonly savedZoom: number;
  private readonly savedPlayerScale: THREE.Vector3 | null;
  /** The camera's usual place in the fight, the fighter it looks at (aimed at), the one blinking. */
  private readonly cameraHome: THREE.Vector3;
  private focus: THREE.Vector3 | null = null;
  /** A skill shown off: where the camera looks (over the aim). */
  private showLook: THREE.Vector3 | null = null;
  private showWide = false;
  /** Arrows flying (ranged attacks), with their way and time. */
  private arrows: {
    mesh: THREE.Mesh;
    from: THREE.Vector3;
    to: THREE.Vector3;
    time: number;
    duration: number;
  }[] = [];
  private aimed: string | null = null;
  /** The skills' effect animations playing. */
  readonly skillAnims: SkillAnimPlayer;
  /** Aiming a skill with a zone: its circle on the ground, and the others caught in it (they blink too). */
  private zoneRing: THREE.Mesh | null = null;
  private zoned: string[] = [];

  constructor(
    private readonly game: Game,
    fighters: Fighter[]
  ) {
    const player = game.mapHelper?.meshes["player"];
    const center = player?.position.clone() ?? game.getCameraTarget();
    this.skillAnims = new SkillAnimPlayer(game.scene, game.camera);
    this.savedCamera = game.camera.position.clone();
    this.savedZoom = game.cameraZoom;
    this.savedPlayerScale = player?.scale.clone() ?? null;
    player?.scale.set(0.0001, 0.0001, 0.0001);

    const team = fighters.filter((f) => f.side === "team");
    team.forEach((f, i) => {
      f.home = new THREE.Vector3(
        center.x + (i - (team.length - 1) / 2) * TEAM_SPACING,
        center.y,
        center.z + TEAM_BACK + (i % 2) * 6
      );
    });
    for (const f of fighters.filter((x) => x.side === "foe")) {
      f.home = new THREE.Vector3(
        center.x + (f.spot.x - 0.5) * FOE_AREA.width,
        center.y,
        center.z - FOE_AREA.ahead + (f.spot.y - 0.5) * FOE_AREA.depth
      );
    }
    for (const f of fighters) {
      f.pos = f.home.clone();
      if (!f.sheet) {
        continue;
      }
      const sprite = new SheetSprite(f.sheet);
      sprite.group.position.copy(f.pos);
      sprite.play("idle", f.side === "team" ? "ne" : "sw");
      game.scene.add(sprite.group);
      this.sprites.set(f.id, sprite);
    }

    // The camera: closer, looking at the middle of the field
    const middle = new THREE.Vector3(
      center.x,
      center.y,
      center.z - FOE_AREA.ahead / 2 + TEAM_BACK / 2
    );
    game.cameraZoom = FIGHT_ZOOM;
    this.cameraHome = middle.clone().add(game.cameraOffset());
    game.camera.position.copy(this.cameraHome);
    game.mapHelper?.updateCameraAim();
  }

  /**
   * Aiming at a fighter (null: nobody): it blinks and the camera moves closer to it, smoothly (see tick); back to
   * the whole field after.
   */
  setAim(fighter: Fighter | null): void {
    if (fighter?.id !== this.aimed) {
      if (this.aimed) {
        this.sprites.get(this.aimed)?.setBlink(false);
      }
      this.aimed = fighter?.id ?? null;
      if (this.aimed) {
        this.sprites.get(this.aimed)?.setBlink(true);
      }
    }
    this.focus = fighter ? fighter.pos.clone() : null;
  }

  /**
   * Aiming a skill with a zone: a circle of this radius on the ground around its center, the fighters in it
   * blinking with the aimed one; null: none.
   */
  setZone(
    center: THREE.Vector3 | null,
    radius: number,
    inside: string[]
  ): void {
    const keep = new Set(inside);
    for (const id of this.zoned) {
      if (!keep.has(id) && id !== this.aimed) {
        this.sprites.get(id)?.setBlink(false);
      }
    }
    for (const id of inside) {
      this.sprites.get(id)?.setBlink(true);
    }
    this.zoned = inside;
    if (!center || radius <= 0) {
      this.zoneRing?.removeFromParent();
      return;
    }
    if (!this.zoneRing || this.zoneRing.userData["radius"] !== radius) {
      this.zoneRing?.removeFromParent();
      this.zoneRing?.geometry.dispose();
      this.zoneRing = new THREE.Mesh(
        new THREE.RingGeometry(radius - 1.5, radius, 48),
        ZONE_MATERIAL
      );
      this.zoneRing.rotation.x = -Math.PI / 2;
      this.zoneRing.userData["radius"] = radius;
    }
    this.zoneRing.position.set(center.x, center.y + 0.4, center.z);
    if (!this.zoneRing.parent) {
      this.game.scene.add(this.zoneRing);
    }
  }

  /** A skill shown off: the camera on this point (the caster, then its targets); null: back to the field. */
  setShowcase(look: THREE.Vector3 | null, wide = false): void {
    this.showLook = look;
    this.showWide = wide;
  }

  /** The real clock (also while the fight waits): the camera easing to its place, the glows and blinks. */
  tick(dt: number): void {
    this.sprites.forEach((s) => s.effects(dt));
    const camera = this.game.camera;
    let dest = this.cameraHome;
    if (this.showLook) {
      const middle = this.cameraHome
        .clone()
        .sub(CAMERA_LOOK.clone().multiplyScalar(FIGHT_ZOOM));
      dest = middle
        .add(this.showLook.clone().sub(middle).setY(0))
        .add(
          CAMERA_LOOK.clone().multiplyScalar(
            this.showWide ? SHOW_WIDE_ZOOM : SHOW_ZOOM
          )
        );
    } else if (this.focus) {
      // Closer, between the field's middle and the aimed one
      const look = this.cameraHome
        .clone()
        .sub(CAMERA_LOOK.clone().multiplyScalar(FIGHT_ZOOM))
        .lerp(this.focus, FOCUS_SHIFT);
      dest = look.add(CAMERA_LOOK.clone().multiplyScalar(FOCUS_ZOOM));
    }
    if (camera.position.distanceToSquared(dest) > 0.01) {
      camera.position.lerp(dest, 1 - Math.exp(-dt * CAMERA_EASE));
      this.game.mapHelper?.updateCameraAim();
    }
    this.faceCamera();
  }

  /** A fighter plays an animation (restart: from its start even if already playing). */
  play(id: string, anim: string, dir?: SheetDirection, restart = false): void {
    this.sprites.get(id)?.play(anim, dir, restart);
  }

  /** Puts a fighter's sprite where it stands now. */
  place(fighter: Fighter): void {
    this.sprites.get(fighter.id)?.group.position.copy(fighter.pos);
  }

  /** Has the fighter's animation (played once) ended? A fighter without a sprite: at once. */
  finished(id: string): boolean {
    return this.sprites.get(id)?.finished ?? true;
  }

  /** Is the fighter back in a looping animation (idle, walk, cast: its blow's animation was cut, e.g. by a hit)? */
  looping(id: string): boolean {
    return !!this.sprites.get(id)?.anim?.loop;
  }

  /** True once when the fighter's animation reaches its hit frame (no sprite: at once). */
  consumeHit(id: string): boolean {
    return this.sprites.get(id)?.consumeHit() ?? true;
  }

  /** A fighter glowing (an enemy preparing a spell) or not. */
  glow(id: string, on: boolean): void {
    this.sprites.get(id)?.setGlow(on);
  }

  /** A fighter blinking (recovering from a hit, its gauge waiting) or not. */
  recover(id: string, on: boolean): void {
    this.sprites.get(id)?.setRecover(on);
  }

  /** A fighter flashing red (a hit taken) or not. */
  hurtFlash(id: string, on: boolean): void {
    this.sprites.get(id)?.setHurtFlash(on);
  }

  fade(id: string, opacity: number): void {
    this.sprites.get(id)?.setOpacity(opacity);
  }

  /** Where a point of the field (lifted by `up` world units) is on the screen, in CSS pixels. */
  screenPos(pos: THREE.Vector3, up = 0): { x: number; y: number } {
    const v = pos
      .clone()
      .setY(pos.y + up)
      .project(this.game.camera);
    const rect = this.game.renderer.domElement.getBoundingClientRect();
    return {
      x: rect.left + ((v.x + 1) / 2) * rect.width,
      y: rect.top + ((1 - v.y) / 2) * rect.height,
    };
  }

  /** An arrow shot from one fighter to another, flying `duration` seconds (a ranged attack). */
  shoot(from: THREE.Vector3, to: THREE.Vector3, duration: number): void {
    const mesh = new THREE.Mesh(ARROW_GEOMETRY, ARROW_MATERIAL);
    mesh.renderOrder = EFFECT_ORDER;
    const a = from.clone().setY(from.y + ARROW_HEIGHT);
    const b = to.clone().setY(to.y + ARROW_HEIGHT);
    mesh.position.copy(a);
    mesh.lookAt(b);
    this.game.scene.add(mesh);
    this.arrows.push({ mesh, from: a, to: b, time: 0, duration });
  }

  /** The animations go on; `only`: just this fighter's (a skill shown off, the others stand still). */
  update(dt: number, only?: string): void {
    this.sprites.forEach((s, id) => s.update(only && id !== only ? 0 : dt));
    this.skillAnims.update(dt);
    for (const arrow of this.arrows) {
      // (stopped too while a skill is shown off)
      arrow.time += only ? 0 : dt;
      const k = Math.min(1, arrow.time / arrow.duration);
      arrow.mesh.position.lerpVectors(arrow.from, arrow.to, k);
      // A slight arc
      arrow.mesh.position.y += Math.sin(k * Math.PI) * 6;
    }
    this.arrows = this.arrows.filter((a) => {
      const done = a.time >= a.duration;
      if (done) {
        a.mesh.removeFromParent();
      }
      return !done;
    });
  }

  /**
   * The fighters turned to face the camera (seen face on whatever it does), the closest to it drawn last (over the
   * ones behind).
   */
  private faceCamera(): void {
    const camera = this.game.camera;
    const away = (s: SheetSprite) =>
      s.group.position.distanceToSquared(camera.position);
    [...this.sprites.values()]
      .sort((a, b) => away(b) - away(a))
      .forEach((s, i) => s.faceCamera(camera, i));
  }

  dispose(): void {
    this.skillAnims.dispose();
    this.zoneRing?.removeFromParent();
    this.zoneRing?.geometry.dispose();
    this.arrows.forEach((a) => a.mesh.removeFromParent());
    this.arrows = [];
    this.sprites.forEach((s) => s.dispose());
    this.sprites.clear();
    const game = this.game;
    game.cameraZoom = this.savedZoom;
    game.camera.position.copy(this.savedCamera);
    const player = game.mapHelper?.meshes["player"];
    if (player && this.savedPlayerScale) {
      player.scale.copy(this.savedPlayerScale);
    }
    game.mapHelper?.updateCameraAim();
  }
}
