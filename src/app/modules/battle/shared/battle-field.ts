import * as THREE from "three";
import { Game } from "../../game/shared/model/Game";
import { SheetDirection } from "../../database-editor/shared/sprite-sheet";
import { SheetSprite } from "./sheet-sprite";
import { Fighter } from "./battle-types";

/** The enemies' area (its centre ahead of the team) and the team's line, in world units. */
const FOE_AREA = { width: 90, depth: 40, ahead: 52 };
const TEAM_SPACING = 26;
const TEAM_BACK = 14;
/** The camera closer than on the map during a fight. */
const FIGHT_ZOOM = 0.85;

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
    game.camera.position.copy(middle).add(game.cameraOffset());
    game.mapHelper?.updateCameraAim();
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

  update(dt: number): void {
    this.sprites.forEach((s) => s.update(dt));
  }

  dispose(): void {
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
