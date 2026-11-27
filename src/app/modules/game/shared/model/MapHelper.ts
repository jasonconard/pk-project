import {
  defaultLight,
  isLightObject,
  LIGHT_ID,
  makeLightMarker,
} from "./light";
import * as THREE from "three";
import {
  findModel,
  isZone,
  makeZoneMesh,
  ZONE_DEFAULT_SIZE,
  ZONE_ID,
  ZONE_LAYER,
} from "./Zone";
import { SceneChunk, SceneMap, StairsSide } from "./SceneMap";
import { PlayerTex, ScenePlayer } from "./ScenePlayer";
import { playerLook } from "./player-look";
import { isNpc, makeNpcMesh, npcOf } from "./npc-sprite";
import {
  doorFront,
  DoorWall,
  dungeonKindOf,
  dungeonModelId,
  foePicture,
  foeWalk,
  isDungeonObject,
  isFoe,
  makeDungeonMesh,
  makeFoeMesh,
} from "./dungeon-object";
import { dungeonLook } from "./dungeon-state";
import {
  applyMotions,
  hasMotion,
  MOTION_KEY,
  MOTION_NEAR,
  MotionDrive,
  MotionState,
  newMotionState,
} from "./model-motion";
import { npcPlaceAt, placeKey } from "./npc-schedule";
import { facingSprite } from "./pixel-scale";
import {
  CAMERA_LOOK,
  Game,
  SHADE_OFFSET,
  SHADOW_AREA,
  TOO_FAR_LIMIT,
} from "./Game";
import { BasicMeshService } from "../services/basic-mesh.service";
import { convertVec2, convertVec3 } from "./SceneUtils";
import { MODELS } from "../../../../../assets/models/models";
import { SceneBuilding } from "./SceneBuilding";
import { NEIGHBORS, TILE_SIZE } from "./Terrain";
import { LEVEL_HEIGHT, MAX_LEVEL, wallLean } from "./GroundMesh";
import { ChunkGround } from "./ChunkGround";
import { applyMeshOpacity, meshOpacity } from "./mesh-fading";
import { canInstance, forgetTemplate, ModelInstances } from "./ModelInstances";

/** Chunks built ahead of the view (chunk sizes around what can be seen), and kept until this far. */
const BUILD_AHEAD = 0.6;
const KEEP_RANGE = 1.6;

export interface MapHelperInit {
  originGame: Game;
  sceneMap: SceneMap;
  scenePlayer: ScenePlayer;
}

/** userData key of a turned building's mesh: its shift (see MapHelper.turn). */
const TURN_SHIFT = "turnShift";
/** userData key: the quarter turns an object is drawn with when it turned towards the player (faceTowards). */
const FACING = "facing";

/** A fight's arena is built this far east of the map (world units), its chunks' ids start with this. */
const ARENA_SHIFT = 20_000;
const ARENA_PREFIX = "arena:";

export class MapHelper {
  originGame: Game;
  meshes: Record<string, THREE.Object3D> = {};
  sceneMap: SceneMap;
  scenePlayer: ScenePlayer;

  constructor(o: MapHelperInit) {
    this.originGame = o.originGame;
    this.sceneMap = o.sceneMap;
    this.scenePlayer = o.scenePlayer;
  }

  public getPlayerScreenCoords(game: Game): THREE.Vector2 | null {
    const vector = new THREE.Vector3();

    const player = this.scenePlayer.mesh;
    if (!player) {
      return null;
    }

    const widthHalf = game.canvas.clientWidth / 2;
    const heightHalf = game.canvas.clientHeight / 2;

    player.updateMatrixWorld();
    vector.setFromMatrixPosition(player.matrixWorld);
    vector.project(game.camera);

    vector.x = vector.x * widthHalf + widthHalf;
    vector.y = -(vector.y * heightHalf) + heightHalf;

    return new THREE.Vector2(vector.x, vector.y);
  }

  public buildPlayer() {
    const p = this.scenePlayer;
    p.tex = playerLook();
    const spriteGroup = new THREE.Group();
    spriteGroup.add(this.makePlayerSprite(p.tex));

    const camera = this.originGame.camera;
    const scene = this.originGame.scene;

    this.addMesh(p.id, spriteGroup);
    camera.position.x = 0;
    scene.add(spriteGroup);

    this.scenePlayer.mesh = spriteGroup;

    this.updateVisibleChunks();
  }

  /**
   * The player drawn again when the team leader or its walking sheet changed (the database editor, an event making
   * someone join or leave the team). Cheap when nothing changed.
   */
  public refreshPlayerLook() {
    const look = playerLook();
    const group = this.scenePlayer.mesh;
    if (look === this.scenePlayer.tex || !group) {
      return;
    }
    this.scenePlayer.tex = look;
    const old = group.children[0] as THREE.Mesh;
    group.remove(old);
    old.geometry.dispose();
    (old.material as THREE.Material).dispose();
    group.add(this.makePlayerSprite(look));
  }

  /** The player's sprite: one picture of its texture (see PlayerService), with its shadow caster. */
  private makePlayerSprite(tex: PlayerTex): THREE.Mesh {
    const spritePlane = BasicMeshService.makePlane(
      tex.link,
      convertVec2(tex.size),
      true
    );
    const mat = spritePlane.material as THREE.Material;
    mat.depthTest = true;
    mat.depthWrite = true;
    mat.side = THREE.DoubleSide;

    // Upright (not leaning back towards the camera: its top would go into a wall standing just behind the player),
    // stretched so it still looks its normal height from the camera pitch
    const stretch = 1 / Math.cos(Math.atan2(CAMERA_LOOK.y, CAMERA_LOOK.z));
    spritePlane.scale.y = stretch;
    // Shadow: an invisible copy (same geometry, so same walking frame) turned towards the sun casts it; the sprite
    // itself faces the camera, the sun would light it edge-on and its shadow would be a thin line
    const shadowMaterial = (spritePlane.material as THREE.Material).clone();
    shadowMaterial.colorWrite = false;
    shadowMaterial.depthWrite = false;
    this.playerShadow = new THREE.Mesh(spritePlane.geometry, shadowMaterial);
    this.playerShadow.castShadow = true;
    spritePlane.add(this.playerShadow);
    spritePlane.position.set(0, (tex.size.y / 2) * stretch, 0);
    // (drawn facing the camera, pixel-sharp; after the shadow's copy, which stays upright)
    facingSprite(mat, tex.size.y);
    return spritePlane;
  }

  /** The arena of the fight being played, shown in place of the map (see showArena). */
  private arena: { map: SceneMap; chunks: SceneChunk[] } | null = null;

  /**
   * Chunks around the view: those that can be seen are shown (built first if needed), those a bit further are
   * built ahead (one per call, so walking doesn't stutter), those far away are taken down (big maps stay light).
   * @param focus point the view is centered on (the player by default; the camera target in the editor)
   * @param extra chunk sizes seen around (the editor zoomed out)
   */
  public updateVisibleChunks(focus?: THREE.Vector3, extra = 0) {
    // A fight's arena shown: the map's chunks stay as they are, built and hidden
    const chunks = this.arena ? this.arena.chunks : this.sceneMap.chunks;
    const center = focus ?? this.scenePlayer.mesh?.position;
    if (!center) {
      return;
    }
    const comparePos = new THREE.Vector3(
      center.x,
      center.y,
      focus ? focus.z + CAMERA_LOOK.z : this.originGame.camera.position.z
    );
    let ahead = 1;
    chunks.forEach((chunk) => {
      const visible = MapHelper.isChunkInRange(chunk, comparePos, extra);
      if (
        !chunk.group &&
        (visible ||
          (ahead > 0 &&
            MapHelper.isChunkInRange(chunk, comparePos, extra + BUILD_AHEAD)))
      ) {
        ahead -= visible ? 0 : 1;
        this.buildChunk(chunk);
      } else if (
        chunk.group &&
        !MapHelper.isChunkInRange(chunk, comparePos, extra + KEEP_RANGE)
      ) {
        this.unbuildChunk(chunk);
      }
      chunk.visible = visible && !!chunk.group;
      if (chunk.group) {
        chunk.group.visible = chunk.visible;
      }
    });
  }

  /** Can the chunk be seen from this point (`extra` chunk sizes added around: built ahead, kept)? */
  private static isChunkInRange(
    chunk: SceneChunk,
    comparePos: THREE.Vector3,
    extra: number
  ): boolean {
    const marginX = chunk.size.x * extra;
    const marginZ = chunk.size.y * extra;
    return !(
      // HIDE BEHIND CAMERA
      chunk.pos.z - chunk.size.y / 2 - marginZ > comparePos.z ||
      // HIDE TOO FAR
      chunk.pos.z + chunk.size.y * 1.4 + marginZ < comparePos.z ||
      // HIDE TOO FAR LEFT
      chunk.pos.x + chunk.size.x * 1.2 + marginX < comparePos.x ||
      // HIDE TOO FAR RIGHT
      chunk.pos.x - chunk.size.x * 1.2 - marginX > comparePos.x ||
      // HIDE TOO FAR HEIGHT
      Math.abs(chunk.pos.y - comparePos.y) > TOO_FAR_LIMIT + SHADE_OFFSET
    );
  }

  /** Builds the chunks that can be seen from a point (the map's arrival point, else its middle). */
  public buildChunks(focus?: THREE.Vector3) {
    const spawn = this.sceneMap.spawn;
    const center = focus ?? (spawn ? convertVec3(spawn) : new THREE.Vector3());
    const comparePos = new THREE.Vector3(
      center.x,
      center.y,
      center.z + CAMERA_LOOK.z
    );
    this.sceneMap.chunks
      .filter(
        (chunk) =>
          !chunk.group && MapHelper.isChunkInRange(chunk, comparePos, 0)
      )
      .forEach((chunk) => this.buildChunk(chunk));
  }

  /** A chunk added to the map (editor): built if it is in view; its neighbors' borders and walls are redrawn. */
  public addChunk(chunk: SceneChunk) {
    this.sceneMap.chunks.push(chunk);
    this.refreshNeighbors(chunk);
    this.updateCameraAim();
  }

  /** A chunk taken out of the map (editor; its data is kept by the caller for undo). */
  public removeChunk(chunk: SceneChunk) {
    this.unbuildChunk(chunk);
    this.sceneMap.chunks = this.sceneMap.chunks.filter((c) => c !== chunk);
    chunk.visible = false;
    this.refreshNeighbors(chunk);
  }

  /**
   * Models changed (back from the model editor): the buildings take the new versions (a model that left: not drawn),
   * and the built chunks holding them are built again.
   */
  public refreshModels(ids: string[]) {
    ids.forEach(forgetTemplate);
    this.sceneMap.chunks.forEach((chunk) => {
      const changed = chunk.buildings.filter((b) => ids.includes(b.modelId));
      changed.forEach(
        (b) => (b.originModel = MODELS.find((m) => m.id === b.modelId))
      );
      if (changed.length > 0 && chunk.group) {
        const shown = chunk.group.visible;
        const visible = chunk.visible;
        this.unbuildChunk(chunk);
        this.buildChunk(chunk);
        chunk.group!.visible = shown;
        chunk.visible = visible;
      }
    });
  }

  /**
   * The NPCs placed on the map drawn again (their walking sheet or name changed in the database), and the dungeon
   * objects (the editor shows them as set: closed, hidden traps shown).
   */
  public refreshNpcs() {
    this.sceneMap.chunks.forEach((chunk) => {
      if (chunk.group) {
        chunk.buildings
          .filter((b) => isNpc(b) || isDungeonObject(b))
          .forEach((b) => this.refreshBuilding(chunk, b));
      }
    });
  }

  /** The built chunks touching this one are built again (their borders, walls and shores depend on it). */
  private refreshNeighbors(chunk: SceneChunk) {
    this.sceneMap.chunks
      .filter(
        (c) =>
          c !== chunk &&
          c.group &&
          Math.abs(c.pos.x - chunk.pos.x) <= (c.size.x + chunk.size.x) / 2 &&
          Math.abs(c.pos.z - chunk.pos.z) <= (c.size.y + chunk.size.y) / 2
      )
      .forEach((c) => {
        const visible = c.group!.visible;
        this.unbuildChunk(c);
        this.buildChunk(c);
        c.group!.visible = visible;
      });
  }

  private buildChunk(chunk: SceneChunk) {
    const group = new THREE.Group();
    chunk.group = group;

    chunk.grounds.forEach((ground) => {
      const key = chunk.id + "-g-" + ground.id;
      const groundMesh = BasicMeshService.makePlaneFromPoints(
        ground.link,
        ground.points
      );
      this.addMesh(key, groundMesh, convertVec3(chunk.pos));
      ground.mesh = groundMesh;
      group.add(groundMesh);
      if (
        (Object.keys(chunk.tiles ?? {}).length > 0 ||
          Object.keys(chunk.stairs ?? {}).length > 0) &&
        ground === chunk.grounds[0]
      ) {
        this.ground.paintedGround(chunk);
      }
      if (
        ((chunk.heights && Object.keys(chunk.heights).length > 0) ||
          (chunk.stairs && Object.keys(chunk.stairs).length > 0)) &&
        ground === chunk.grounds[0]
      ) {
        this.ground.rebuildGround(chunk);
      }
      // ground.mesh.rotation.x = Math.PI / -2;
    });
    // return;

    // this.meshes[chunk.id].castShadow = true;
    // this.meshes[chunk.id].receiveShadow = true;

    // (the group is needed by the views: set before)
    chunk.buildings.forEach((building) => this.createView(chunk, building));

    this.originGame.scene.add(group);
  }

  /**
   * A fight's arena (a map of the « Arène » kind) shown in place of the map, which stays loaded: its chunks are
   * hidden, the arena's ones are built far from them in the same scene. Nothing of the map changes (its objects, the
   * dungeon's enemies, its events): `hideArena` gives it back as it was. The arena's chunks are not the map's: no
   * events, nothing saved.
   * @returns the middle of the fight: the arena's arrival point
   */
  public showArena(map: SceneMap): THREE.Vector3 {
    this.hideArena();
    const shift = new THREE.Vector3(ARENA_SHIFT, 0, 0);
    const chunks = structuredClone(
      map.chunks.map((chunk) => ({ ...chunk, group: undefined }))
    ).map((chunk) => ({
      ...chunk,
      id: ARENA_PREFIX + chunk.id,
      pos: { ...chunk.pos, x: chunk.pos.x + shift.x },
    }));
    this.sceneMap.chunks.forEach((chunk) => {
      chunk.visible = false;
      if (chunk.group) {
        chunk.group.visible = false;
      }
    });
    this.arena = { map, chunks };
    const spawn = map.spawn ? convertVec3(map.spawn) : new THREE.Vector3();
    const center = spawn.add(shift);
    chunks.forEach((chunk) => this.buildChunk(chunk));
    return center;
  }

  /** The fight's arena taken down: the map is seen again. */
  public hideArena() {
    if (!this.arena) {
      return;
    }
    this.arena.chunks.forEach((chunk) => this.unbuildChunk(chunk));
    this.arena = null;
    this.updateVisibleChunks();
  }

  /** The chunks drawn now: the map's, and the arena's during a fight in an arena. */
  public shownChunks(): SceneChunk[] {
    return this.arena
      ? [...this.sceneMap.chunks, ...this.arena.chunks]
      : this.sceneMap.chunks;
  }

  /** Another map takes the place of the current one: its chunks are built, the old ones taken down. */
  public setMap(map: SceneMap) {
    this.hideArena();
    this.sceneMap.chunks.forEach((chunk) => this.unbuildChunk(chunk));
    this.sceneMap = map;
    this.buildChunks();
  }

  /** Takes a chunk out of the scene and frees what was made for it (its data stays). */
  private unbuildChunk(chunk: SceneChunk) {
    chunk.visible = false;
    this.instances.get(chunk.id)?.forEach((set) => set.dispose());
    this.instances.delete(chunk.id);
    this.ground.forget(chunk);
    // (materials are shared between chunks: only the geometries are the chunk's own)
    chunk.group?.traverse((object) => {
      if (
        (object as THREE.Mesh).isMesh &&
        !(object as THREE.InstancedMesh).isInstancedMesh
      ) {
        (object as THREE.Mesh).geometry.dispose();
      }
    });
    chunk.group?.removeFromParent();
    chunk.group = undefined;
    chunk.grounds.forEach((ground) => (ground.mesh = undefined));
    Object.keys(this.meshes)
      .filter((key) => key.startsWith(chunk.id + "-"))
      .forEach((key) => delete this.meshes[key]);
  }

  /** The chunks' ground: painted tiles, reliefs, stairs. */
  private readonly ground = new ChunkGround(
    () => this.shownChunks(),
    (x, z) => this.cellAt(x, z),
    () => (this.arena?.map ?? this.sceneMap).walls ?? "rock"
  );

  /** The ground cell (column, row from the chunk corner) under a world point, if any. */
  public cellAt(
    x: number,
    z: number
  ): { chunk: SceneChunk; col: number; row: number } | null {
    const chunk = this.chunkAt(x, z);
    if (!chunk) {
      return null;
    }
    const col = Math.floor((x - chunk.pos.x + chunk.size.x / 2) / TILE_SIZE);
    const row = Math.floor((z - chunk.pos.z + chunk.size.y / 2) / TILE_SIZE);
    return { chunk, col, row };
  }

  /** Paints a ground cell with a tile (null = back to the original ground). */
  public paintCell(
    chunk: SceneChunk,
    col: number,
    row: number,
    tileId: string | null
  ) {
    this.ground.paintCell(chunk, col, row, tileId);
  }

  /** Ground level of a cell (possibly in the next chunk; 0 outside the map). */
  public levelAt(chunk: SceneChunk, col: number, row: number): number {
    return this.ground.levelAt(chunk, col, row);
  }

  /** Ground level under a world point (0 outside the map or on flat ground). */
  public levelAtWorld(x: number, z: number): number {
    return this.ground.levelAtWorld(x, z);
  }

  /** Side the stairs cell under a world point rises towards (null = no stairs there). */
  public stairsAt(x: number, z: number): StairsSide | null {
    return this.ground.stairsAt(x, z);
  }

  /** Is there a stairs cell under a world point? */
  public isStairsAt(x: number, z: number): boolean {
    return this.ground.isStairsAt(x, z);
  }

  /** Puts / removes stairs on a cell (see ChunkGround.setStairs). */
  public setStairs(
    chunk: SceneChunk,
    col: number,
    row: number,
    side: StairsSide | "auto" | null
  ) {
    this.ground.setStairs(chunk, col, row, side);
  }

  /** The lean painted on a cell's walls (undefined: none, the map's style decides). */
  public slopeAt(
    chunk: SceneChunk,
    col: number,
    row: number
  ): number | undefined {
    return chunk.slopes?.[col + "," + row];
  }

  /** Paints the lean of a cell's walls (null: back to the map's style) and rebuilds the ground around. */
  public setSlope(
    chunk: SceneChunk,
    col: number,
    row: number,
    slope: number | null
  ) {
    const key = col + "," + row;
    chunk.slopes ??= {};
    if (slope === null) {
      delete chunk.slopes[key];
    } else {
      chunk.slopes[key] = slope;
    }
    this.ground.rebuildGround(chunk);
    this.rebuildAround(chunk, col, row);
  }

  /** A cell on a chunk's border changed: the next chunks' walls and slopes follow. */
  private rebuildAround(chunk: SceneChunk, col: number, row: number) {
    const cols = chunk.size.x / TILE_SIZE;
    const rows = chunk.size.y / TILE_SIZE;
    if (col === 0 || row === 0 || col === cols - 1 || row === rows - 1) {
      for (const [dc, dr] of NEIGHBORS) {
        const n = this.ground.neighborCell(chunk, col + dc, row + dr);
        if (n && n.chunk !== chunk) {
          this.ground.rebuildGround(n.chunk);
        }
      }
    }
  }

  /** Sets the ground level of a cell and rebuilds the ground (and the next chunk's on a border: its walls). */
  public setLevel(chunk: SceneChunk, col: number, row: number, level: number) {
    const key = col + "," + row;
    level = Math.max(0, Math.min(MAX_LEVEL, level));
    chunk.heights ??= {};
    if (level) {
      chunk.heights[key] = level;
    } else {
      delete chunk.heights[key];
    }
    this.ground.rebuildGround(chunk);
    // The objects standing on the cell go up / down with it
    chunk.buildings.forEach((building) => {
      const bc = Math.floor((building.pos.x + chunk.size.x / 2) / TILE_SIZE);
      const br = Math.floor((building.pos.z + chunk.size.y / 2) / TILE_SIZE);
      if (bc === col && br === row) {
        building.pos = { ...building.pos, y: level * LEVEL_HEIGHT };
        const set = this.instancesOf(chunk, building);
        if (set) {
          set.move(building, this.buildingWorldPos(chunk, building));
        } else {
          this.meshes[chunk.id + "-" + building.id]?.position.setY(
            chunk.pos.y + level * LEVEL_HEIGHT
          );
        }
      }
    });
    this.rebuildAround(chunk, col, row);
  }

  /** Chunk containing a world point (x, z), if any. */
  public chunkAt(x: number, z: number): SceneChunk | undefined {
    return this.shownChunks().find(
      (c) =>
        Math.abs(x - c.pos.x) <= c.size.x / 2 &&
        Math.abs(z - c.pos.z) <= c.size.y / 2
    );
  }

  /**
   * Map editor: adds a building / nature object at a world position, in the chunk under it. Its options
   * (passable, canHide) are those most used by the same model on the map. Returns null outside the map.
   */
  public addBuildingAt(
    modelId: string,
    world: THREE.Vector3
  ): SceneBuilding | null {
    const chunk = this.chunkAt(world.x, world.z);
    const model = findModel(modelId);
    if (!chunk || !model || !chunk.group) {
      return null;
    }
    const building: SceneBuilding = {
      id: `${modelId}-${Date.now().toString(36)}${Math.floor(Math.random() * 1296).toString(36)}`,
      modelId,
      pos: {
        x: world.x - chunk.pos.x,
        y: world.y - chunk.pos.y,
        z: world.z - chunk.pos.z,
      },
      ...this.defaultOptions(modelId),
      ...(modelId === ZONE_ID ? { size: { ...ZONE_DEFAULT_SIZE } } : {}),
      ...(modelId === LIGHT_ID ? { light: defaultLight() } : {}),
      originModel: model,
      events: [],
    };
    this.addBuilding(chunk, building);
    return building;
  }

  /** Puts a building (new, or removed earlier: undo) in a chunk and in the scene. */
  public addBuilding(chunk: SceneChunk, building: SceneBuilding) {
    const model = building.originModel ?? findModel(building.modelId);
    if (!model) {
      return;
    }
    building.originModel = model;
    chunk.buildings.push(building);
    this.createView(chunk, building);
  }

  /** Instanced copies per chunk and per model (see ModelInstances). */
  private readonly instances = new Map<string, Map<string, ModelInstances>>();

  /** The leaning wall behind a room door (nothing: no wall there, or a straight one). */
  private doorWall(
    building: SceneBuilding,
    world: THREE.Vector3
  ): DoorWall | undefined {
    const cell = this.cellAt(world.x, world.z);
    if (!cell || building.modelId !== dungeonModelId("room-door")) {
      return undefined;
    }
    const front = doorFront(building.rot);
    const col = cell.col - front.x;
    const row = cell.row - front.z;
    const levels =
      this.levelAt(cell.chunk, col, row) -
      this.levelAt(cell.chunk, cell.col, cell.row);
    const lean =
      levels > 0
        ? wallLean(
            this.sceneMap.walls ?? "rock",
            levels,
            this.ground.slopeAt(cell.chunk, col, row)
          )
        : 0;
    if (!lean) {
      return undefined;
    }
    // From the door to the border of its cell on the wall's side
    const along = front.x
      ? world.x - cell.chunk.pos.x + cell.chunk.size.x / 2
      : world.z - cell.chunk.pos.z + cell.chunk.size.y / 2;
    const place = along - (front.x ? cell.col : cell.row) * TILE_SIZE;
    const foot = front.x + front.z > 0 ? place : TILE_SIZE - place;
    return { foot, lean, rise: levels * LEVEL_HEIGHT };
  }

  /** The copies of a building's model in a chunk, if the building is drawn as one of them. */
  private instancesOf(
    chunk: SceneChunk,
    building: SceneBuilding
  ): ModelInstances | undefined {
    const set = this.instances.get(chunk.id)?.get(building.modelId);
    return set?.has(building) ? set : undefined;
  }

  /**
   * What draws a building: a copy of its model (instancing: repeated objects that don't fade, e.g. trees,
   * barriers) or its own meshes (houses, the lab, objects with events).
   */
  private createView(
    chunk: SceneChunk,
    building: SceneBuilding,
    rot = building.rot ?? 0
  ) {
    const model = building.originModel ?? findModel(building.modelId);
    if (!model || !chunk.group) {
      return;
    }
    building.originModel = model;
    const world = convertVec3(chunk.pos).add(convertVec3(building.pos));
    if (isLightObject(building)) {
      const marker = makeLightMarker(
        building.light ?? defaultLight(),
        ZONE_LAYER
      );
      this.addMesh(chunk.id + "-" + building.id, marker, world);
      chunk.group.add(marker);
      return;
    }
    if (isZone(building)) {
      const zone = makeZoneMesh(building.size);
      this.addMesh(chunk.id + "-" + building.id, zone, world);
      chunk.group.add(zone);
      return;
    }
    if (isFoe(building)) {
      const mesh = makeFoeMesh(
        foePicture(building.modelId),
        foeWalk(building.modelId)
      );
      this.addMesh(chunk.id + "-" + building.id, mesh, world);
      chunk.group.add(mesh);
      return;
    }
    if (isDungeonObject(building)) {
      const look = dungeonLook(
        this.sceneMap.id,
        building,
        this.originGame.editMode
      );
      if (look.gone) {
        return;
      }
      const mesh = makeDungeonMesh(
        building.modelId,
        look,
        building.rot,
        this.doorWall(building, world),
        building.dungeon
      );
      this.addMesh(chunk.id + "-" + building.id, mesh, world);
      chunk.group.add(mesh);
      return;
    }
    if (isNpc(building)) {
      // Its schedule: shown at the place it is at now (the editor shows every place)
      if (!this.originGame.editMode) {
        const npc = npcOf(building.modelId);
        const place =
          npc &&
          npcPlaceAt(
            npc,
            this.originGame.day,
            this.originGame.weather.hourOfDay
          );
        if (
          place !== undefined &&
          place !== placeKey(this.sceneMap.id, building.id)
        ) {
          return;
        }
      }
      // (turned by its picture, not by its mesh: the sheet's row of the direction)
      const npc = makeNpcMesh(building.modelId, rot);
      this.addMesh(chunk.id + "-" + building.id, npc, world);
      chunk.group.add(npc);
      return;
    }
    if (rot === (building.rot ?? 0) && canInstance(model, building)) {
      let byModel = this.instances.get(chunk.id);
      if (!byModel) {
        byModel = new Map();
        this.instances.set(chunk.id, byModel);
      }
      let set = byModel.get(model.id);
      if (!set) {
        set = new ModelInstances(model, chunk.group);
        byModel.set(model.id, set);
      }
      set.add(building, world);
      return;
    }
    const mesh = BasicMeshService.makeModel(model);
    MapHelper.turn(mesh, rot);
    this.addMesh(
      chunk.id + "-" + building.id,
      mesh,
      MapHelper.viewPos(mesh, world)
    );
    chunk.group.add(mesh);
    if (hasMotion(model)) {
      this.moving.set(chunk.id + "-" + building.id, {
        building,
        mesh,
        state: newMotionState(),
      });
    }
  }

  /**
   * A turned building (quarter turns): turned around the middle of its footprint, which stays in place (the
   * model's origin may be anywhere); the shift that keeps it there is kept with the mesh (see viewPos).
   */
  private static turn(mesh: THREE.Object3D, rot: number) {
    if (!rot) {
      return;
    }
    const angle = (-rot * Math.PI) / 2;
    const middle = new THREE.Box3()
      .setFromObject(mesh)
      .getCenter(new THREE.Vector3())
      .setY(0);
    mesh.rotation.y = angle;
    mesh.userData[TURN_SHIFT] = middle
      .clone()
      .sub(middle.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), angle));
  }

  /** Where a building's mesh goes for the building to be at a world position (the shift of a turned one). */
  private static viewPos(
    mesh: THREE.Object3D,
    world: THREE.Vector3
  ): THREE.Vector3 {
    const shift = mesh.userData[TURN_SHIFT] as THREE.Vector3 | undefined;
    return shift ? world.clone().add(shift) : world;
  }

  /** The objects whose model has moving parts, by mesh key (see model-motion.ts). */
  private readonly moving = new Map<
    string,
    { building: SceneBuilding; mesh: THREE.Object3D; state: MotionState }
  >();

  /**
   * The moving parts played (each frame, `dt` seconds): in a loop, when the player is near, at night, or as an event
   * asked (`eventDrive`, by object id). The editor shows them still.
   */
  public updateMotions(
    dt: number,
    night: boolean,
    eventDrive: (building: SceneBuilding) => MotionDrive
  ) {
    const player = this.scenePlayer.mesh?.position;
    const editing = this.originGame.editMode;
    for (const [key, view] of this.moving) {
      if (this.meshes[key] !== view.mesh) {
        this.moving.delete(key);
        continue;
      }
      if (!view.mesh.parent?.visible) {
        continue;
      }
      applyMotions(view.mesh, view.state, editing ? 0 : dt, (trigger) => {
        if (editing) {
          return "hold";
        }
        switch (trigger) {
          case "near": {
            const box = new THREE.Box3().setFromObject(view.mesh);
            return player &&
              box.distanceToPoint(player.clone().setY(box.min.y)) < MOTION_NEAR
              ? "play"
              : "rest";
          }
          case "night":
            return night ? "play" : "rest";
          case "event":
            return eventDrive(view.building);
          default:
            return "loop";
        }
      });
    }
  }

  /** How long an object's movements « Par un événement » last (s; 0: none). */
  public motionDuration(objectId: string): number {
    const building = this.sceneMap.chunks
      .flatMap((c) => c.buildings)
      .find((b) => b.id === objectId);
    const model =
      building && (building.originModel ?? findModel(building.modelId));
    return model
      ? Math.max(
          0,
          ...[...model.boxes, ...model.planes].map((p) =>
            p.motion?.trigger === "event" ? p.motion.duration : 0
          )
        )
      : 0;
  }

  /** Takes a building's drawing out of the scene (its data stays in the chunk). */
  private removeView(chunk: SceneChunk, building: SceneBuilding) {
    const set = this.instancesOf(chunk, building);
    if (set) {
      set.remove(building);
      return;
    }
    const key = chunk.id + "-" + building.id;
    this.meshes[key]?.removeFromParent();
    delete this.meshes[key];
  }

  /** Draws a building again (e.g. after its options changed: instanced copy or its own meshes). */
  public refreshBuilding(chunk: SceneChunk, building: SceneBuilding) {
    this.removeView(chunk, building);
    this.createView(chunk, building);
  }

  /**
   * In the game, an object turns its front towards a point (a character towards the player): drawn turned by
   * quarter turns, its map data unchanged (the editor shows it as it was set).
   */
  public faceTowards(
    chunk: SceneChunk,
    building: SceneBuilding,
    point: THREE.Vector3
  ) {
    const bounds = this.buildingBounds(chunk, building);
    if (!bounds || isZone(building)) {
      return;
    }
    const center = bounds.getCenter(new THREE.Vector3());
    const dx = point.x - center.x;
    const dz = point.z - center.z;
    // The front (rot 0) faces +z; each quarter turn is clockwise seen from above: west, back, east
    const sideRot = dx > 0 ? 3 : 1;
    const frontRot = dz > 0 ? 0 : 2;
    const rot = Math.abs(dx) > Math.abs(dz) ? sideRot : frontRot;
    const key = chunk.id + "-" + building.id;
    if (
      this.meshes[key]?.userData[FACING] === rot ||
      (this.meshes[key]?.userData[FACING] === undefined &&
        rot === (building.rot ?? 0))
    ) {
      return;
    }
    this.removeView(chunk, building);
    this.createView(chunk, building, rot);
    const mesh = this.meshes[key];
    if (mesh) {
      mesh.userData[FACING] = rot;
    }
  }

  /** The objects turned towards the player are drawn again as they were set (opening the editor). */
  public resetFacing() {
    this.sceneMap.chunks.forEach((chunk) =>
      chunk.buildings.forEach((building) => {
        if (
          this.meshes[chunk.id + "-" + building.id]?.userData[FACING] !==
          undefined
        ) {
          this.refreshBuilding(chunk, building);
        }
      })
    );
  }

  /** Bounds of a building in the world (collisions, editor selection), instanced or not. */
  public buildingBounds(
    chunk: SceneChunk,
    building: SceneBuilding
  ): THREE.Box3 | null {
    const set = this.instancesOf(chunk, building);
    if (set) {
      return set.boundsAt(this.buildingWorldPos(chunk, building));
    }
    return this.getBounds(chunk.id + "-" + building.id);
  }

  /** Takes a building out of its chunk and of the scene (its data can be added back: undo). */
  public removeBuilding(chunk: SceneChunk, building: SceneBuilding) {
    this.removeView(chunk, building);
    chunk.buildings = chunk.buildings.filter((b) => b !== building);
  }

  /** Moves a building to a world position, changing its chunk if it crosses a border. False outside the map. */
  public moveBuilding(
    chunk: SceneChunk,
    building: SceneBuilding,
    world: THREE.Vector3
  ): boolean {
    const target = this.chunkAt(world.x, world.z);
    if (!target) {
      return false;
    }
    if (target !== chunk) {
      this.removeBuilding(chunk, building);
      building.pos = {
        x: world.x - target.pos.x,
        y: world.y - target.pos.y,
        z: world.z - target.pos.z,
      };
      this.addBuilding(target, building);
      return true;
    }
    building.pos = {
      x: world.x - chunk.pos.x,
      y: world.y - chunk.pos.y,
      z: world.z - chunk.pos.z,
    };
    const set = this.instancesOf(chunk, building);
    if (set) {
      set.move(building, world);
    } else {
      const mesh = this.meshes[chunk.id + "-" + building.id];
      mesh?.position.copy(MapHelper.viewPos(mesh, world));
    }
    return true;
  }

  /** World position of a building. */
  public buildingWorldPos(
    chunk: SceneChunk,
    building: SceneBuilding
  ): THREE.Vector3 {
    return convertVec3(chunk.pos).add(convertVec3(building.pos));
  }

  /** The building a scene object (one of its meshes) belongs to, if any. */
  public findBuilding(
    object: THREE.Object3D,
    instanceId?: number
  ): { chunk: SceneChunk; building: SceneBuilding } | null {
    // An instanced copy: the copy number gives the building
    for (const [chunkId, byModel] of this.instances) {
      for (const set of byModel.values()) {
        if (set.parts.includes(object as THREE.InstancedMesh)) {
          const building = set.buildingAt(instanceId);
          const chunk = this.sceneMap.chunks.find((c) => c.id === chunkId);
          return building && chunk ? { chunk, building } : null;
        }
      }
    }
    for (const chunk of this.sceneMap.chunks) {
      for (const building of chunk.buildings) {
        const mesh = this.meshes[chunk.id + "-" + building.id];
        let o: THREE.Object3D | null = object;
        while (o) {
          if (o === mesh) {
            return { chunk, building };
          }
          o = o.parent;
        }
      }
    }
    return null;
  }

  /** Building meshes that can be clicked (visible chunks, not hidden near the camera). */
  public pickableBuildingMeshes(): THREE.Object3D[] {
    const visible = this.sceneMap.chunks.filter((chunk) => chunk.visible);
    return [
      ...visible
        .flatMap((chunk) =>
          chunk.buildings.map((b) => this.meshes[chunk.id + "-" + b.id])
        )
        .filter((mesh): mesh is THREE.Object3D => !!mesh && mesh.visible),
      ...visible.flatMap((chunk) =>
        [...(this.instances.get(chunk.id)?.values() ?? [])].flatMap(
          (set) => set.parts
        )
      ),
    ];
  }

  /** Instanced copies of the visible chunks' models (diagnostics): model id, copies, its instanced meshes. */
  public instancedSets(): {
    modelId: string;
    copies: number;
    parts: THREE.InstancedMesh[];
  }[] {
    return [...this.instances.entries()].flatMap(([, byModel]) =>
      [...byModel.entries()].map(([modelId, set]) => ({
        modelId,
        copies: set.buildings.length,
        parts: set.parts,
      }))
    );
  }

  /** Options used by most buildings of this model on the map (a new tree behaves like the other trees). */
  private defaultOptions(modelId: string): {
    passable: boolean;
    canHide: boolean;
  } {
    if (modelId === ZONE_ID || modelId === LIGHT_ID) {
      return { passable: true, canHide: false };
    }
    if (isNpc({ modelId })) {
      return { passable: false, canHide: false };
    }
    const dungeon = dungeonKindOf(modelId);
    if (dungeon) {
      return { passable: !dungeon.body, canHide: false };
    }
    const votes = new Map<string, number>();
    this.sceneMap.chunks.forEach((c) =>
      c.buildings.forEach((b) => {
        if (b.modelId === modelId) {
          const key = `${b.passable}-${b.canHide}`;
          votes.set(key, (votes.get(key) ?? 0) + 1);
        }
      })
    );
    const best = [...votes.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
    return best
      ? { passable: best.startsWith("true"), canHide: best.endsWith("true") }
      : { passable: false, canHide: false };
  }

  /** Invisible copy of the player sprite casting its shadow (see buildPlayer). */
  private playerShadow?: THREE.Mesh;

  /** Turns the player's shadow caster towards the sun (horizontal direction from the player to the sun). */
  public updatePlayerShadow() {
    const caster = this.playerShadow;
    const plane = caster?.parent;
    if (!caster || !plane) {
      return;
    }
    const sun = this.originGame.sun;
    const dx = sun.position.x - sun.target.position.x;
    const dz = sun.position.z - sun.target.position.z;
    caster.rotation.y = Math.atan2(dx, dz) - plane.rotation.y;
  }

  public updateCameraAim() {
    const camera = this.originGame.camera;
    camera.lookAt(this.originGame.getCameraTarget());
    const game = this.originGame;
    if (game.editMode) {
      this.updateVisibleChunks(
        game.getCameraTarget(),
        Math.max(0, game.cameraZoom - 1) * 0.8
      );
    } else {
      this.updateVisibleChunks();
    }
  }

  public addMesh(key: string, mesh: THREE.Object3D, position?: THREE.Vector3) {
    this.meshes[key] = mesh;
    const pos = position || new THREE.Vector3(0, 0, 0);
    mesh.position.x = pos.x;
    mesh.position.y = pos.y;
    mesh.position.z = pos.z;
  }

  public getBounds(key: string): THREE.Box3 | null {
    const mesh = this.meshes[key];
    if (!mesh) {
      return null;
    }
    // A model with moving parts: its still parts only (a windmill's turning sails don't block the way)
    if (this.moving.has(key)) {
      const box = new THREE.Box3();
      mesh.updateMatrixWorld();
      mesh.children
        .filter((child) => !child.userData[MOTION_KEY])
        .forEach((child) => box.expandByObject(child));
      return box;
    }
    return new THREE.Box3().setFromObject(mesh);
  }

  public updateVisibleMesh(
    key: string,
    playerPos: THREE.Vector3,
    canHide: boolean
  ) {
    const mesh = this.meshes[key];
    if (!mesh) {
      return;
    }

    const bounds = new THREE.Box3().setFromObject(mesh);
    const opacity = meshOpacity(
      this.originGame,
      mesh,
      bounds,
      playerPos,
      canHide
    );
    // A hidden mesh is only kept for its shadow while it is inside the area where shadows are computed
    // (around the camera target): farther, it can't shade anything visible and is dropped completely.
    const target = this.originGame.getCameraTarget();
    const castsShadow =
      bounds.max.x > target.x - SHADOW_AREA &&
      bounds.min.x < target.x + SHADOW_AREA &&
      bounds.max.z > target.z - SHADOW_AREA &&
      bounds.min.z < target.z + SHADOW_AREA;

    mesh.children.forEach((child) => {
      // (a moving part is in its pivot group)
      if (child.userData[MOTION_KEY]) {
        child.children.forEach((part) =>
          applyMeshOpacity(part, opacity, castsShadow)
        );
      } else {
        applyMeshOpacity(child, opacity, castsShadow);
      }
    });
  }
}
