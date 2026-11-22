import * as THREE from "three";
import { CAMERA_LOOK, Game } from "../../game/shared/model/Game";
import { SheetDirection } from "../../database-editor/shared/sprite-sheet";
import { SheetSprite } from "./sheet-sprite";
import { Fighter } from "./battle-types";

/** The enemies' area (its centre ahead of the team) and the team's line, in world units. */
const FOE_AREA = { width: 90, depth: 40, ahead: 52 };
const TEAM_SPACING = 26;
const TEAM_BACK = 14;
/** The camera closer than on the map during a fight; closer still when aiming (towards the aimed one), its easing. */
const FIGHT_ZOOM = 0.85;
const FOCUS_ZOOM = 0.62;
const FOCUS_SHIFT = 0.7;
const CAMERA_EASE = 6;

/** An arrow in flight: a thin shaft (world units), flying at about a fighter's chest height. */
const ARROW_GEOMETRY = new THREE.BoxGeometry(0.6, 0.6, 9);
const ARROW_MATERIAL = new THREE.MeshBasicMaterial({ color: 0xf0_e6_d0 });
const ARROW_HEIGHT = 12;

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
  /** Arrows flying (ranged attacks), with their way and time. */
  private arrows: {
    mesh: THREE.Mesh;
    from: THREE.Vector3;
    to: THREE.Vector3;
    time: number;
    duration: number;
  }[] = [];
  private aimed: string | null = null;

  constructor(
    private readonly game: Game,
    fighters: Fighter[]
  ) {
    const player = game.mapHelper?.meshes["player"];
    const center = player?.position.clone() ?? game.getCameraTarget();
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

  /** The real clock (also while the fight waits): the camera easing to its place, the glows and blinks. */
  tick(dt: number): void {
    this.sprites.forEach((s) => s.effects(dt));
    const camera = this.game.camera;
    let dest = this.cameraHome;
    if (this.focus) {
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

  /** True once when the fighter's animation reaches its hit frame (no sprite: at once). */
  consumeHit(id: string): boolean {
    return this.sprites.get(id)?.consumeHit() ?? true;
  }

  /** A fighter glowing (an enemy preparing a spell) or not. */
  glow(id: string, on: boolean): void {
    this.sprites.get(id)?.setGlow(on);
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
    const a = from.clone().setY(from.y + ARROW_HEIGHT);
    const b = to.clone().setY(to.y + ARROW_HEIGHT);
    mesh.position.copy(a);
    mesh.lookAt(b);
    this.game.scene.add(mesh);
    this.arrows.push({ mesh, from: a, to: b, time: 0, duration });
  }

  update(dt: number): void {
    this.sprites.forEach((s) => s.update(dt));
    for (const arrow of this.arrows) {
      arrow.time += dt;
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

  dispose(): void {
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
