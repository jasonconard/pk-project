import * as THREE from "three";
import { GameDatabase } from "../../../database-editor/shared/database";
import { MaterialService } from "../services/material.service";
import { CAMERA_LOOK } from "./Game";
import { LEVEL_HEIGHT } from "./GroundMesh";
import { MapHelper } from "./MapHelper";
import { FarmState, isWatered, stageOf } from "./farm";
import { facingSprite } from "./pixel-scale";
import { TILE_SIZE } from "./Terrain";

const TILLED = "assets/crops/soil-tilled.png";
const WATERED = "assets/crops/soil-watered.png";
/** A crop's picture: one cell wide, taller (database PICTURE_SIZES.crop). */
const CROP_SIZE = new THREE.Vector2(16, 24);
/** The soil just above the ground (no flicker with the painted tiles). */
const SOIL_LIFT = 0.15;
/** Tints: a wilted crop (frost), a dead one. */
const WILTED = 0xc8_c0_a0;
const DEAD = 0x8a_76_58;

const soilGeometry = new THREE.PlaneGeometry(TILE_SIZE, TILE_SIZE).rotateX(
  -Math.PI / 2
);
const cropGeometry = new THREE.PlaneGeometry(CROP_SIZE.x, CROP_SIZE.y);
/** Pictures drawn taller like the player and the NPCs (the camera looks down at them). */
const STRETCH = 1 / Math.cos(Math.atan2(CAMERA_LOOK.y, CAMERA_LOOK.z));

/**
 * The plots of the map being played (design/main-view.pen, Cultures): the tilled soil (darker once watered today)
 * and the crop's picture of its stage, upright and facing the camera like the NPCs; a wilted crop is paler, a dead
 * one brown. Its own group in the scene (never under an object: collisions measure the objects' groups). Built again
 * when the crops, the day or the map change.
 */
export class FarmView {
  private readonly group = new THREE.Group();
  private readonly materials = new Map<string, THREE.Material>();
  private drawn: unknown[] = [];

  constructor() {
    this.group.name = "farm";
  }

  /** Draws the plots again if anything they show changed. */
  sync(
    mapHelper: MapHelper,
    state: FarmState,
    day: number,
    db: GameDatabase
  ): void {
    const scene = mapHelper.originGame.scene;
    if (this.group.parent !== scene) {
      scene.add(this.group);
    }
    const map = mapHelper.sceneMap;
    const key = [map, state, day, db];
    if (key.every((k, i) => k === this.drawn[i])) {
      return;
    }
    this.drawn = key;
    this.group.clear();
    const plots = state.plots[map.id] ?? {};
    for (const [where, plot] of Object.entries(plots)) {
      const [chunkId, cell] = where.split(":");
      const [col, row] = cell.split(",").map(Number);
      const chunk = map.chunks.find((c) => c.id === chunkId);
      if (!chunk) {
        continue;
      }
      const x = chunk.pos.x - chunk.size.x / 2 + (col + 0.5) * TILE_SIZE;
      const z = chunk.pos.z - chunk.size.y / 2 + (row + 0.5) * TILE_SIZE;
      const y = chunk.pos.y + mapHelper.levelAt(chunk, col, row) * LEVEL_HEIGHT;
      const soil = new THREE.Mesh(
        soilGeometry,
        this.soilMaterial(isWatered(plot, day) ? WATERED : TILLED)
      );
      soil.position.set(x, y + SOIL_LIFT, z);
      soil.receiveShadow = true;
      this.group.add(soil);
      const crop = db.crops.find((c) => c.id === plot.crop);
      const pic = crop?.stages[stageOf(plot, crop)]?.pic;
      if (!crop || !pic) {
        continue;
      }
      let tint: number | undefined;
      if (plot.dead) {
        tint = DEAD;
      } else if (plot.wilted) {
        tint = WILTED;
      }
      const sprite = new THREE.Mesh(cropGeometry, this.cropMaterial(pic, tint));
      sprite.scale.y = STRETCH;
      sprite.position.set(x, y + (CROP_SIZE.y / 2) * STRETCH, z);
      this.group.add(sprite);
    }
  }

  private soilMaterial(link: string): THREE.Material {
    let material = this.materials.get(link);
    if (!material) {
      material = MaterialService.getLambertMaterialFromLink(link, true);
      this.materials.set(link, material);
    }
    return material;
  }

  private cropMaterial(pic: string, tint?: number): THREE.Material {
    const key = `${tint ?? ""}|${pic}`;
    let material = this.materials.get(key);
    if (!material) {
      const basic = MaterialService.getMaterialFromLink(pic, true);
      basic.side = THREE.DoubleSide;
      if (tint !== undefined) {
        basic.color.set(tint);
      }
      facingSprite(basic, CROP_SIZE.y);
      material = basic;
      this.materials.set(key, material);
    }
    return material;
  }
}
