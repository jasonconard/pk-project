import * as THREE from "three";
import type { Game } from "../../model/Game";
import { LEVEL_HEIGHT } from "../../model/GroundMesh";
import { CHUNK_SIZE } from "../map-storage";

/** Arrival point marker (editor only). */
const SPAWN_COLOR = 0xff_d3_4d;
/** Outlines of the chunks (white) and of the free places next to them (green) while a chunk tool is selected. */
const CHUNK_LINE_COLOR = 0xff_ff_ff;
const SLOT_LINE_COLOR = 0x6b_cb_77;

/** A chunk's place on the map grid: « col,row ». */
export function slotKey(x: number, z: number): string {
  return Math.round(x / CHUNK_SIZE) + "," + Math.round(z / CHUNK_SIZE);
}

/** What the map editor draws over the map: the chunks' outlines (chunk tools), the arrival point. */
export class EditorMarkers {
  private chunkOutlines?: THREE.Group;
  private spawnMarker?: THREE.Group;

  /** With a chunk tool: the chunks' outlines, and the free places around them where one can be added. */
  refreshChunkOutlines(game: Game) {
    if (this.chunkOutlines) {
      this.chunkOutlines.removeFromParent();
      this.chunkOutlines.children.forEach((line) =>
        (line as THREE.LineSegments).geometry.dispose()
      );
      this.chunkOutlines = undefined;
    }
    const chunks = game.mapHelper?.sceneMap.chunks;
    if (
      !game.editMode ||
      !["chunk-add", "chunk-remove"].includes(game.editTileId ?? "") ||
      !chunks
    ) {
      return;
    }
    const taken = new Set(chunks.map((c) => slotKey(c.pos.x, c.pos.z)));
    const free = new Map<string, [number, number]>();
    chunks.forEach((c) => {
      const col = Math.round(c.pos.x / CHUNK_SIZE);
      const row = Math.round(c.pos.z / CHUNK_SIZE);
      for (const [dc, dr] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const key = col + dc + "," + (row + dr);
        if (!taken.has(key)) {
          free.set(key, [col + dc, row + dr]);
        }
      }
    });
    const squares = (centers: [number, number][], inset: number) => {
      const points: THREE.Vector3[] = [];
      centers.forEach(([x, z]) => {
        const h = CHUNK_SIZE / 2 - inset;
        const corners = [
          [-h, -h],
          [h, -h],
          [h, h],
          [-h, h],
        ].map(([dx, dz]) => new THREE.Vector3(x + dx, 0.5, z + dz));
        corners.forEach((corner, i) =>
          points.push(corner, corners[(i + 1) % 4])
        );
        if (inset) {
          // A plus in the middle of a free place
          points.push(
            new THREE.Vector3(x - 24, 0.5, z),
            new THREE.Vector3(x + 24, 0.5, z),
            new THREE.Vector3(x, 0.5, z - 24),
            new THREE.Vector3(x, 0.5, z + 24)
          );
        }
      });
      return new THREE.BufferGeometry().setFromPoints(points);
    };
    const group = new THREE.Group();
    group.add(
      new THREE.LineSegments(
        squares(
          chunks.map((c) => [c.pos.x, c.pos.z]),
          0
        ),
        new THREE.LineBasicMaterial({
          color: CHUNK_LINE_COLOR,
          transparent: true,
          opacity: 0.6,
          depthTest: false,
        })
      )
    );
    if (game.editTileId === "chunk-add") {
      group.add(
        new THREE.LineSegments(
          squares(
            [...free.values()].map(([c, r]) => [
              c * CHUNK_SIZE,
              r * CHUNK_SIZE,
            ]),
            8
          ),
          new THREE.LineBasicMaterial({
            color: SLOT_LINE_COLOR,
            depthTest: false,
          })
        )
      );
    }
    group.children.forEach((line) => (line.renderOrder = 19));
    this.chunkOutlines = group;
    game.scene.add(group);
  }

  /** The map's arrival point while editing: a yellow ring and a post. */
  refreshSpawnMarker(game: Game) {
    const spawn = game.mapHelper?.sceneMap.spawn ?? { x: 0, y: 0, z: 0 };
    if (!this.spawnMarker) {
      const material = new THREE.MeshBasicMaterial({
        color: SPAWN_COLOR,
        depthTest: false,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(new THREE.RingGeometry(6, 9, 24), material);
      ring.rotation.x = -Math.PI / 2;
      const post = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 22, 1.5),
        material
      );
      post.position.y = 11;
      this.spawnMarker = new THREE.Group();
      this.spawnMarker.add(ring, post);
      this.spawnMarker.children.forEach((part) => (part.renderOrder = 21));
      game.scene.add(this.spawnMarker);
    }
    const level = game.mapHelper?.levelAtWorld(spawn.x, spawn.z) ?? 0;
    this.spawnMarker.position.set(spawn.x, level * LEVEL_HEIGHT + 0.5, spawn.z);
    this.spawnMarker.visible = game.editMode;
  }
}
