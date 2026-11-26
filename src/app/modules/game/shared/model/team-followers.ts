import * as THREE from "three";
import {
  DbCharacter,
  WALK_CELL,
  WALK_DIRS,
  WALK_FRAMES,
  WALK_STAND,
} from "../../../database-editor/shared/database";
import { BasicMeshService } from "../services/basic-mesh.service";
import { CAMERA_LOOK } from "./Game";
import { facingSprite, FOLLOWERS_NAME } from "./pixel-scale";
import { PlayerDirection } from "./ScenePlayer";

/** Frames without moving before a follower stands (the leader's steps are uneven: some frames don't move). */
const STILL_FRAMES = 8;

/** How many members walk behind the leader at most. */
export const FOLLOWERS_MAX = 3;
/** The distance between two members of the file (one cell). */
const SPACING = 16;
/** A step of the trail is kept each time the leader moved this far. */
const TRAIL_STEP = 2;
/** The leader jumped further than this (a door, a teleport): the file gathers again right behind. */
const JUMP = 40;
/** A walk's steps in the sheet's columns: left foot, standing, right foot, standing. */
const WALK_STEPS = [0, WALK_STAND, 2, WALK_STAND];
/** The sheet's row of each direction (WALK_DIRS: down, left, right, up). */
const WALK_ROWS: Record<PlayerDirection, number> = {
  [PlayerDirection.DOWN]: 0,
  [PlayerDirection.LEFT]: 1,
  [PlayerDirection.RIGHT]: 2,
  [PlayerDirection.UP]: 3,
};
/** Pictures drawn taller like the player (the camera looks down at them). */
const STRETCH = 1 / Math.cos(Math.atan2(CAMERA_LOOK.y, CAMERA_LOOK.z));

interface Point {
  x: number;
  y: number;
  z: number;
}

interface Follower {
  id: string;
  walk: string;
  mesh: THREE.Mesh;
  /** Where it was drawn last (its direction and its steps come from its own moves). */
  last: Point;
  dir: PlayerDirection;
  /** Frames since it last moved. */
  still: number;
}

/** The direction of a move on the ground (the biggest of its two parts). */
function directionOf(dx: number, dz: number, fallback: PlayerDirection) {
  if (Math.abs(dx) < 0.01 && Math.abs(dz) < 0.01) {
    return fallback;
  }
  if (Math.abs(dx) > Math.abs(dz)) {
    return dx > 0 ? PlayerDirection.RIGHT : PlayerDirection.LEFT;
  }
  return dz > 0 ? PlayerDirection.DOWN : PlayerDirection.UP;
}

/**
 * The team members walking in single file behind the leader (docs/editeur/18-equipe.md; design/main-view.pen,
 * Équipe): each one on the leader's path, one cell behind the one in front, drawn from its walking sheet like the
 * player. They never block (no body). After a door or a teleport they gather right behind the player. Their own group
 * in the scene, never under an object (collisions measure the objects' groups).
 */
export class TeamFollowers {
  private readonly group = new THREE.Group();
  private followers: Follower[] = [];
  /** The leader's past positions, the newest first. */
  private trail: Point[] = [];
  private map: unknown;

  constructor() {
    this.group.name = FOLLOWERS_NAME;
  }

  /**
   * Each frame.
   * @param members the characters behind the leader (with a walking sheet), in the team's order
   * @param shown false: hidden (the setting, the map, an event, a fight)
   */
  update(
    scene: THREE.Scene,
    map: unknown,
    leader: THREE.Object3D,
    leaderDir: PlayerDirection,
    members: DbCharacter[],
    shown: boolean,
    pace: { frame: number; framePerSecond: number; running: boolean }
  ): void {
    if (this.group.parent !== scene) {
      scene.add(this.group);
    }
    this.group.visible = shown;
    this.syncMembers(members);
    const pos = leader.position;
    const head = this.trail[0];
    if (
      map !== this.map ||
      !head ||
      Math.hypot(pos.x - head.x, pos.z - head.z) > JUMP ||
      !shown
    ) {
      // (a new map, a door, hidden: the file starts again behind the leader)
      this.map = map;
      this.gather(pos, leaderDir);
    } else if (Math.hypot(pos.x - head.x, pos.z - head.z) >= TRAIL_STEP) {
      this.trail.unshift({ x: pos.x, y: pos.y, z: pos.z });
      const keep = Math.ceil((SPACING * (FOLLOWERS_MAX + 1)) / TRAIL_STEP) + 2;
      this.trail.length = Math.min(this.trail.length, keep);
    }
    if (!shown) {
      return;
    }
    const now = { x: pos.x, y: pos.y, z: pos.z };
    // The steps at the player's pace (PlayerService: 6 a second walking, 9 running), each member a foot apart
    const step = pace.framePerSecond
      ? Math.floor(pace.frame / (pace.framePerSecond / (pace.running ? 9 : 6)))
      : 0;
    this.followers.forEach((f, i) =>
      this.place(f, now, (i + 1) * SPACING, step + (i + 1) * 2)
    );
  }

  /** The followers made again when the team or their walking sheets changed. */
  private syncMembers(members: DbCharacter[]): void {
    const wanted = members
      .filter((c) => c.walk)
      .slice(0, FOLLOWERS_MAX)
      .map((c) => ({ id: c.id, walk: c.walk! }));
    if (
      wanted.length === this.followers.length &&
      wanted.every(
        (w, i) =>
          w.id === this.followers[i].id && w.walk === this.followers[i].walk
      )
    ) {
      return;
    }
    for (const f of this.followers) {
      this.group.remove(f.mesh);
      f.mesh.geometry.dispose();
      (f.mesh.material as THREE.Material).dispose();
    }
    this.followers = wanted.map((w) => {
      const size = new THREE.Vector2(WALK_CELL.w, WALK_CELL.h);
      const mesh = BasicMeshService.makePlane(w.walk, size, true);
      mesh.scale.y = STRETCH;
      mesh.castShadow = false;
      facingSprite(mesh.material as THREE.Material, size.y);
      this.group.add(mesh);
      return {
        ...w,
        mesh,
        last: { x: 0, y: 0, z: 0 },
        dir: PlayerDirection.DOWN,
        still: STILL_FRAMES,
      };
    });
    this.trail = [];
  }

  /** The file right behind the leader, looking the same way. */
  private gather(pos: THREE.Vector3, dir: PlayerDirection): void {
    const back = {
      [PlayerDirection.UP]: { x: 0, z: 1 },
      [PlayerDirection.DOWN]: { x: 0, z: -1 },
      [PlayerDirection.LEFT]: { x: 1, z: 0 },
      [PlayerDirection.RIGHT]: { x: -1, z: 0 },
    }[dir];
    const length = SPACING * (FOLLOWERS_MAX + 1);
    this.trail = [];
    for (let d = 0; d <= length; d += TRAIL_STEP) {
      this.trail.push({
        x: pos.x + back.x * d,
        y: pos.y,
        z: pos.z + back.z * d,
      });
    }
    for (const f of this.followers) {
      f.dir = dir;
      f.last = { x: Number.NaN, y: 0, z: 0 };
    }
  }

  /** A follower at a distance behind the leader along the trail. */
  private place(
    f: Follower,
    leader: Point,
    distance: number,
    step: number
  ): void {
    let left = distance;
    let from = leader;
    let at = this.trail.at(-1) ?? leader;
    for (const point of this.trail) {
      const step = Math.hypot(point.x - from.x, point.z - from.z);
      if (step >= left) {
        const t = step > 0 ? left / step : 0;
        at = {
          x: from.x + (point.x - from.x) * t,
          y: from.y + (point.y - from.y) * t,
          z: from.z + (point.z - from.z) * t,
        };
        break;
      }
      left -= step;
      from = point;
    }
    const moved = Number.isNaN(f.last.x)
      ? 0
      : Math.hypot(at.x - f.last.x, at.z - f.last.z);
    if (moved > 0.01) {
      f.dir = directionOf(at.x - f.last.x, at.z - f.last.z, f.dir);
      f.still = 0;
    } else {
      f.still++;
    }
    const column =
      f.still < STILL_FRAMES
        ? WALK_STEPS[step % WALK_STEPS.length]
        : WALK_STAND;
    this.setFrame(f.mesh, f.dir, column);
    f.last = at;
    f.mesh.position.set(at.x, at.y + (WALK_CELL.h / 2) * STRETCH, at.z);
  }

  private setFrame(mesh: THREE.Mesh, dir: PlayerDirection, column: number) {
    const row = WALK_ROWS[dir];
    const rows = WALK_DIRS.length;
    const u0 = column / WALK_FRAMES;
    const u1 = (column + 1) / WALK_FRAMES;
    const v0 = 1 - (row + 1) / rows;
    const v1 = 1 - row / rows;
    const uv = mesh.geometry.getAttribute("uv");
    uv.setXY(0, u0, v1);
    uv.setXY(1, u1, v1);
    uv.setXY(2, u0, v0);
    uv.setXY(3, u1, v0);
    uv.needsUpdate = true;
  }
}
