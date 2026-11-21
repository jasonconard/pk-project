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
      f.pos = new THREE.Vector3(
        center.x + (i - (team.length - 1) / 2) * TEAM_SPACING,
        center.y,
        center.z + TEAM_BACK + (i % 2) * 6
      );
    });
    for (const f of fighters.filter((x) => x.side === "foe")) {
      f.pos = new THREE.Vector3(
        center.x + (f.spot.x - 0.5) * FOE_AREA.width,
        center.y,
        center.z - FOE_AREA.ahead + (f.spot.y - 0.5) * FOE_AREA.depth
      );
    }
    for (const f of fighters) {
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

  /** A fighter plays an animation (facing its usual way unless told). */
  play(id: string, anim: string, dir?: SheetDirection): void {
    this.sprites.get(id)?.play(anim, dir);
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
