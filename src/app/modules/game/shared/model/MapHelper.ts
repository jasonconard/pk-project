import * as THREE from 'three';
import { SceneChunk, SceneMap, StairsSide, stairsSide } from './SceneMap';
import { ScenePlayer } from './ScenePlayer';
import { CAMERA_LOOK, Game, SHADE_OFFSET, SHADOW_AREA, TOO_CLOSE_LIMIT, TOO_FAR_LIMIT } from "./Game";
import { BasicMeshService } from "../services/basic-mesh.service";
import { convertVec2, convertVec3 } from "./SceneUtils";
import { MODELS } from "../../../../../assets/models/models";
import { SceneBuilding } from "./SceneBuilding";
import { MathService } from "../services/math.service";
import { autotile, NEIGHBORS, terrainById, TILE_SIZE, TILESET_ANIM_LINK, TILESET_LINK, tilesetPos, waterFramePos } from "./Terrain";
import { applyWeatherShader } from "../weather/weather-shader";
import { buildGroundGeometry, LEVEL_HEIGHT, MAX_LEVEL, STAIRS_TILE } from "./GroundMesh";

/** A chunk ground drawn on a canvas: its texture, then the painted tiles over it. */
interface PaintedGround {
  ctx: CanvasRenderingContext2D;
  texture: THREE.CanvasTexture;
  base: HTMLImageElement | null;
}

/** Water animation step (ms per frame). */
const WATER_STEP = 220;

/** Pictures loaded once (ground textures, tiles). */
const IMAGES = new Map<string, Promise<HTMLImageElement>>();
function loadImage(link: string): Promise<HTMLImageElement> {
  let image = IMAGES.get(link);
  if (!image) {
    image = new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = link;
    });
    IMAGES.set(link, image);
  }
  return image;
}

export interface MapHelperInit {
  originGame: Game;
  sceneMap: SceneMap;
  scenePlayer: ScenePlayer;
}

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
    if(!player) { return null; }

    const widthHalf = game.canvas.clientWidth / 2;
    const heightHalf = game.canvas.clientHeight / 2;

    player.updateMatrixWorld();
    vector.setFromMatrixPosition(player.matrixWorld);
    vector.project(game.camera);

    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;

    return new THREE.Vector2(vector.x, vector.y);
  }

  public buildPlayer() {
    const p = this.scenePlayer;
    const spriteGroup = new THREE.Group();
    const spritePlane = BasicMeshService.makePlane(p.tex.link, convertVec2(p.tex.size), true);
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
    spritePlane.position.x = 0;
    spritePlane.position.y = p.tex.size.y / 2 * stretch;
    spritePlane.position.z = 0;
    spriteGroup.add(spritePlane);

    const camera = this.originGame.camera;
    const scene = this.originGame.scene;

    this.addMesh(p.id, spriteGroup);
    camera.position.x = spritePlane.position.x;
    scene.add(spriteGroup);

    this.scenePlayer.mesh = spriteGroup;

    this.updateVisibleChunks();
  }

  /** @param focus point the view is centered on (the player by default; the camera target in the editor) */
  public updateVisibleChunks(focus?: THREE.Vector3) {
    const chunks = this.sceneMap.chunks;
    const center = focus ?? this.scenePlayer.mesh?.position;
    if (!center) { return; }
    const comparePos = new THREE.Vector3(center.x, center.y, this.originGame.camera.position.z);
    chunks.forEach(chunk => {
      chunk.visible = MapHelper.isChunkVisible(chunk, comparePos);
      if (chunk.group) {
        chunk.group.visible = chunk.visible;
      }
    });
  }

  private static isChunkVisible(chunk: SceneChunk, comparePos: THREE.Vector3): boolean {
    return !(
      // HIDE BEHIND CAMERA
      (chunk.pos.z - chunk.size.y / 2) > comparePos.z ||
      // HIDE TOO FAR
      (chunk.pos.z + (chunk.size.y * 1.4)) < comparePos.z ||
      // HIDE TOO FAR LEFT
      (chunk.pos.x + (chunk.size.x * 1.2)) < comparePos.x ||
      // HIDE TOO FAR RIGHT
      (chunk.pos.x - (chunk.size.x * 1.2)) > comparePos.x ||
      // HIDE TOO FAR HEIGHT
      Math.abs(chunk.pos.y - comparePos.y) > (TOO_FAR_LIMIT + SHADE_OFFSET)
    );
  }

  public buildChunks() {
    this.sceneMap.chunks.forEach(chunk => {
      const group = new THREE.Group();
      chunk.group = group;

      chunk.grounds.forEach(ground => {
        const key = chunk.id + '-g-' + ground.id;
        const groundMesh = BasicMeshService.makePlaneFromPoints(ground.link, ground.points);
        this.addMesh(key, groundMesh, convertVec3(chunk.pos));
        ground.mesh = groundMesh;
        group.add(groundMesh);
        if (chunk.tiles && Object.keys(chunk.tiles).length && ground === chunk.grounds[0]) {
          this.paintedGround(chunk);
        }
        if (chunk.stairs && Object.keys(chunk.stairs).length && ground === chunk.grounds[0]) {
          this.paintedGround(chunk);
        }
        if (((chunk.heights && Object.keys(chunk.heights).length) || (chunk.stairs && Object.keys(chunk.stairs).length))
          && ground === chunk.grounds[0]) {
          this.rebuildGround(chunk);
        }
        // ground.mesh.rotation.x = Math.PI / -2;
      });
      // return;


      // this.meshes[chunk.id].castShadow = true;
      // this.meshes[chunk.id].receiveShadow = true;

      chunk.buildings.forEach( building => {
        const key = chunk.id + '-' + building.id;
        const model = MODELS.find(m => m.id === building.modelId);
        if(model) {
          building.originModel = model;
          const buildingMesh = BasicMeshService.makeModel(model);
          this.addMesh(key, buildingMesh, convertVec3(chunk.pos).add(convertVec3(building.pos)));
          group.add(buildingMesh);
        }
      });

      this.originGame.scene.add(group);
    });

  }

  private readonly paintedGrounds = new Map<string, PaintedGround>();
  /** Water animation: current frame of the animated water tiles. */
  private waterFrame = 0;
  private waterTimer?: ReturnType<typeof setInterval>;

  /** The ground cell (column, row from the chunk corner) under a world point, if any. */
  public cellAt(x: number, z: number): { chunk: SceneChunk, col: number, row: number } | null {
    const chunk = this.chunkAt(x, z);
    if (!chunk) {
      return null;
    }
    const col = Math.floor((x - chunk.pos.x + chunk.size.x / 2) / TILE_SIZE);
    const row = Math.floor((z - chunk.pos.z + chunk.size.y / 2) / TILE_SIZE);
    return { chunk, col, row };
  }

  /** Paints a ground cell with a tile (null = back to the original ground). */
  public paintCell(chunk: SceneChunk, col: number, row: number, tileId: string | null) {
    const key = col + ',' + row;
    chunk.tiles ??= {};
    if (tileId) {
      chunk.tiles[key] = tileId;
    } else {
      delete chunk.tiles[key];
    }
    const painted = this.paintedGround(chunk);
    if (painted) {
      this.drawCell(chunk, painted, col, row);
    }
    // The painted neighbors change their borders (autotiling), in this chunk or the next one
    for (const [dc, dr] of NEIGHBORS) {
      const n = this.neighborCell(chunk, col + dc, row + dr);
      const nPainted = n && n.chunk.tiles?.[n.col + ',' + n.row] ? this.paintedGround(n.chunk) : null;
      if (n && nPainted) {
        this.drawCell(n.chunk, nPainted, n.col, n.row);
      }
    }
  }

  /** Ground level of a cell (possibly in the next chunk; 0 outside the map). */
  public levelAt(chunk: SceneChunk, col: number, row: number): number {
    const cell = this.neighborCell(chunk, col, row);
    return cell?.chunk.heights?.[cell.col + ',' + cell.row] ?? 0;
  }

  /** Ground level under a world point (0 outside the map or on flat ground). */
  public levelAtWorld(x: number, z: number): number {
    const cell = this.cellAt(x, z);
    return cell ? cell.chunk.heights?.[cell.col + ',' + cell.row] ?? 0 : 0;
  }

  /** Stairs cell under a world point: its side and its center (world), or null. */
  public stairsAt(x: number, z: number): { side: StairsSide, cx: number, cz: number } | null {
    const cell = this.cellAt(x, z);
    const side = cell && stairsSide(cell.chunk.stairs?.[cell.col + ',' + cell.row]);
    if (!cell || !side) {
      return null;
    }
    return {
      side,
      cx: cell.chunk.pos.x - cell.chunk.size.x / 2 + (cell.col + 0.5) * TILE_SIZE,
      cz: cell.chunk.pos.z - cell.chunk.size.y / 2 + (cell.row + 0.5) * TILE_SIZE,
    };
  }

  /** Is there a stairs cell under a world point? */
  public isStairsAt(x: number, z: number): boolean {
    const cell = this.cellAt(x, z);
    return !!cell?.chunk.stairs?.[cell.col + ',' + cell.row];
  }

  /**
   * Puts / removes stairs on a cell: a ramp up one level towards `side` (null = no stairs), the stairs tile painted
   * on it. 'auto' rises towards the neighbor exactly one level higher (north first), north if none.
   */
  public setStairs(chunk: SceneChunk, col: number, row: number, side: StairsSide | 'auto' | null) {
    const key = col + ',' + row;
    chunk.stairs ??= {};
    if (side === 'auto') {
      const level = this.levelAt(chunk, col, row);
      const sides: [StairsSide, number, number][] = [['n', 0, -1], ['e', 1, 0], ['w', -1, 0], ['s', 0, 1]];
      side = sides.find(([, dc, dr]) => this.levelAt(chunk, col + dc, row + dr) === level + 1)?.[0] ?? 'n';
    }
    if (side) {
      chunk.stairs[key] = side;
    } else {
      delete chunk.stairs[key];
    }
    this.rebuildGround(chunk);
    const painted = this.paintedGround(chunk);
    if (painted) {
      this.drawCell(chunk, painted, col, row);
    }
  }

  /** Sets the ground level of a cell and rebuilds the ground (and the next chunk's on a border: its walls). */
  public setLevel(chunk: SceneChunk, col: number, row: number, level: number) {
    const key = col + ',' + row;
    level = Math.max(0, Math.min(MAX_LEVEL, level));
    chunk.heights ??= {};
    if (level) {
      chunk.heights[key] = level;
    } else {
      delete chunk.heights[key];
    }
    this.rebuildGround(chunk);
    // The objects standing on the cell go up / down with it
    chunk.buildings.forEach(building => {
      const bc = Math.floor((building.pos.x + chunk.size.x / 2) / TILE_SIZE);
      const br = Math.floor((building.pos.z + chunk.size.y / 2) / TILE_SIZE);
      if (bc === col && br === row) {
        building.pos = { ...building.pos, y: level * LEVEL_HEIGHT };
        this.meshes[chunk.id + '-' + building.id]?.position.setY(chunk.pos.y + level * LEVEL_HEIGHT);
      }
    });
    const cols = chunk.size.x / TILE_SIZE;
    const rows = chunk.size.y / TILE_SIZE;
    if (col === 0 || row === 0 || col === cols - 1 || row === rows - 1) {
      for (const [dc, dr] of NEIGHBORS) {
        const n = this.neighborCell(chunk, col + dc, row + dr);
        if (n && n.chunk !== chunk) {
          this.rebuildGround(n.chunk);
        }
      }
    }
  }

  private wallMaterial?: THREE.MeshLambertMaterial;

  /** The chunk ground becomes a grid of cells at their level, with rock walls (see buildGroundGeometry). */
  private rebuildGround(chunk: SceneChunk) {
    const mesh = chunk.grounds[0]?.mesh;
    if (!mesh) {
      return;
    }
    const old = mesh.geometry;
    mesh.geometry = buildGroundGeometry(chunk, (col, row) => this.levelAt(chunk, col, row),
      (col, row) => stairsSide(chunk.stairs?.[col + ',' + row]));
    old.dispose();
    if (!this.wallMaterial) {
      const texture = new THREE.TextureLoader().load(TILESET_LINK);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      this.wallMaterial = applyWeatherShader(new THREE.MeshLambertMaterial({ map: texture }));
    }
    if (!Array.isArray(mesh.material)) {
      mesh.material = [mesh.material, this.wallMaterial];
    }
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  }

  /** A cell given from a chunk, possibly out of it (then in the chunk next to it). */
  private neighborCell(chunk: SceneChunk, col: number, row: number): { chunk: SceneChunk, col: number, row: number } | null {
    const cols = chunk.size.x / TILE_SIZE;
    const rows = chunk.size.y / TILE_SIZE;
    if (col >= 0 && row >= 0 && col < cols && row < rows) {
      return { chunk, col, row };
    }
    const x = chunk.pos.x - chunk.size.x / 2 + (col + 0.5) * TILE_SIZE;
    const z = chunk.pos.z - chunk.size.y / 2 + (row + 0.5) * TILE_SIZE;
    return this.cellAt(x, z);
  }

  /** Does a neighbor terrain get a border? The water has none towards a beach (the sand tile draws the shore). */
  private differs(terrainId: string, neighborId: string | undefined): boolean {
    if (neighborId === terrainId) {
      return false;
    }
    return !(terrainById(terrainId)?.blocking && neighborId === 'sand');
  }

  private terrainIdAt(chunk: SceneChunk, col: number, row: number): string | undefined {
    const cell = this.neighborCell(chunk, col, row);
    return cell?.chunk.tiles?.[cell.col + ',' + cell.row];
  }

  /**
   * The chunk ground switches to its own canvas texture (the original texture, the tiles over it), with its own
   * material (the textures are shared between chunks). The canvas has 1 px per world unit like the ground textures.
   */
  private paintedGround(chunk: SceneChunk): PaintedGround | null {
    const existing = this.paintedGrounds.get(chunk.id);
    const ground = chunk.grounds[0];
    if (existing || !ground?.mesh) {
      return existing ?? null;
    }
    const canvas = document.createElement('canvas');
    canvas.width = chunk.size.x;
    canvas.height = chunk.size.y;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.NearestFilter;
    const current = ground.mesh.material;
    const old = (Array.isArray(current) ? current[0] : current) as THREE.MeshLambertMaterial;
    const material = applyWeatherShader(new THREE.MeshLambertMaterial({ map: texture, side: old.side }));
    // (with reliefs, the mesh has a second material: the walls)
    ground.mesh.material = Array.isArray(current) ? [material, ...current.slice(1)] : material;
    const painted: PaintedGround = { ctx, texture, base: null };
    this.paintedGrounds.set(chunk.id, painted);
    // Once the original texture is there: drawn whole, then every painted cell
    this.waterTimer ??= setInterval(() => this.animateWater(), WATER_STEP);
    loadImage(ground.link).then(base => {
      painted.base = base;
      ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
      Object.keys(chunk.tiles ?? {}).forEach(key => {
        const [col, row] = key.split(',').map(Number);
        this.drawCell(chunk, painted, col, row);
      });
      texture.needsUpdate = true;
    });
    return painted;
  }

  /** Redraws the open water cells (no border) of the visible painted chunks with the next animation frame. */
  private animateWater() {
    this.waterFrame++;
    loadImage(TILESET_ANIM_LINK).then(img => this.paintedGrounds.forEach((painted, chunkId) => {
      const chunk = this.sceneMap.chunks.find(c => c.id === chunkId);
      if (!chunk?.visible || !chunk.tiles) {
        return;
      }
      let changed = false;
      Object.entries(chunk.tiles).forEach(([key, id]) => {
        const terrain = terrainById(id);
        if (!terrain?.blocking) {
          return;
        }
        const [col, row] = key.split(',').map(Number);
        const differs = NEIGHBORS.map(([dc, dr]) => this.differs(id, this.terrainIdAt(chunk, col + dc, row + dr)));
        const [c, r] = autotile(terrain, differs);
        if (c !== terrain.center[0] || r !== terrain.center[1]) {
          return; // shores stay still
        }
        const src = waterFramePos(id, this.waterFrame);
        if (!src) {
          return;
        }
        painted.ctx.drawImage(img, src.x, src.y, TILE_SIZE, TILE_SIZE, col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        changed = true;
      });
      if (changed) {
        painted.texture.needsUpdate = true;
      }
    }));
  }

  private drawCell(chunk: SceneChunk, painted: PaintedGround, col: number, row: number) {
    const x = col * TILE_SIZE;
    const y = row * TILE_SIZE;
    const tileId = chunk.tiles?.[col + ',' + row];
    const terrain = terrainById(tileId);
    const stairs = stairsSide(chunk.stairs?.[col + ',' + row]);
    if (stairs) {
      loadImage(TILESET_LINK).then(img => {
        if (stairsSide(chunk.stairs?.[col + ',' + row]) === stairs) {
          // The steps are drawn for a ramp rising north: turned for the other sides
          const src = tilesetPos(...STAIRS_TILE);
          const ctx = painted.ctx;
          ctx.save();
          ctx.translate(x + TILE_SIZE / 2, y + TILE_SIZE / 2);
          ctx.rotate({ n: 0, e: Math.PI / 2, s: Math.PI, w: -Math.PI / 2 }[stairs]);
          ctx.drawImage(img, src.x, src.y, TILE_SIZE, TILE_SIZE, -TILE_SIZE / 2, -TILE_SIZE / 2, TILE_SIZE, TILE_SIZE);
          ctx.restore();
          painted.texture.needsUpdate = true;
        }
      });
    } else if (terrain) {
      loadImage(TILESET_LINK).then(img => {
        // (still the same terrain once loaded: the cell may have been repainted meanwhile)
        if (chunk.tiles?.[col + ',' + row] === tileId) {
          // The tile whose borders match the neighbors (autotiling)
          const ids = NEIGHBORS.map(([dc, dr]) => this.terrainIdAt(chunk, col + dc, row + dr));
          const differs = ids.map(id => this.differs(tileId!, id));
          // Beach: every different neighbor is water
          const others = ids.filter(id => id !== tileId);
          const shore = others.length > 0 && others.every(id => terrainById(id)?.blocking);
          const src = tilesetPos(...autotile(terrain, differs, shore));
          painted.ctx.drawImage(img, src.x, src.y, TILE_SIZE, TILE_SIZE, x, y, TILE_SIZE, TILE_SIZE);
          painted.texture.needsUpdate = true;
        }
      });
    } else if (painted.base) {
      const sx = painted.base.width / chunk.size.x;
      const sy = painted.base.height / chunk.size.y;
      painted.ctx.drawImage(painted.base, x * sx, y * sy, TILE_SIZE * sx, TILE_SIZE * sy, x, y, TILE_SIZE, TILE_SIZE);
      painted.texture.needsUpdate = true;
    }
  }

  /** Chunk containing a world point (x, z), if any. */
  public chunkAt(x: number, z: number): SceneChunk | undefined {
    return this.sceneMap.chunks.find(c =>
      Math.abs(x - c.pos.x) <= c.size.x / 2 && Math.abs(z - c.pos.z) <= c.size.y / 2);
  }

  /**
   * Map editor: adds a building / nature object at a world position, in the chunk under it. Its options
   * (passable, canHide) are those most used by the same model on the map. Returns null outside the map.
   */
  public addBuildingAt(modelId: string, world: THREE.Vector3): SceneBuilding | null {
    const chunk = this.chunkAt(world.x, world.z);
    const model = MODELS.find(m => m.id === modelId);
    if (!chunk || !model || !chunk.group) {
      return null;
    }
    const building: SceneBuilding = {
      id: `${modelId}-${Date.now().toString(36)}${Math.floor(Math.random() * 1296).toString(36)}`,
      modelId,
      pos: { x: world.x - chunk.pos.x, y: world.y - chunk.pos.y, z: world.z - chunk.pos.z },
      ...this.defaultOptions(modelId),
      originModel: model,
      events: [],
    };
    this.addBuilding(chunk, building);
    return building;
  }

  /** Puts a building (new, or removed earlier: undo) in a chunk and in the scene. */
  public addBuilding(chunk: SceneChunk, building: SceneBuilding) {
    const model = building.originModel ?? MODELS.find(m => m.id === building.modelId);
    if (!model || !chunk.group) {
      return;
    }
    building.originModel = model;
    chunk.buildings.push(building);
    const mesh = BasicMeshService.makeModel(model);
    this.addMesh(chunk.id + '-' + building.id, mesh, convertVec3(chunk.pos).add(convertVec3(building.pos)));
    chunk.group.add(mesh);
  }

  /** Takes a building out of its chunk and of the scene (its data can be added back: undo). */
  public removeBuilding(chunk: SceneChunk, building: SceneBuilding) {
    const key = chunk.id + '-' + building.id;
    const mesh = this.meshes[key];
    mesh?.removeFromParent();
    delete this.meshes[key];
    chunk.buildings = chunk.buildings.filter(b => b !== building);
  }

  /** Moves a building to a world position, changing its chunk if it crosses a border. False outside the map. */
  public moveBuilding(chunk: SceneChunk, building: SceneBuilding, world: THREE.Vector3): boolean {
    const target = this.chunkAt(world.x, world.z);
    if (!target) {
      return false;
    }
    if (target !== chunk) {
      this.removeBuilding(chunk, building);
      building.pos = { x: world.x - target.pos.x, y: world.y - target.pos.y, z: world.z - target.pos.z };
      this.addBuilding(target, building);
      return true;
    }
    building.pos = { x: world.x - chunk.pos.x, y: world.y - chunk.pos.y, z: world.z - chunk.pos.z };
    this.meshes[chunk.id + '-' + building.id]?.position.copy(world);
    return true;
  }

  /** World position of a building. */
  public buildingWorldPos(chunk: SceneChunk, building: SceneBuilding): THREE.Vector3 {
    return convertVec3(chunk.pos).add(convertVec3(building.pos));
  }

  /** The building a scene object (one of its meshes) belongs to, if any. */
  public findBuilding(object: THREE.Object3D): { chunk: SceneChunk, building: SceneBuilding } | null {
    for (const chunk of this.sceneMap.chunks) {
      for (const building of chunk.buildings) {
        const mesh = this.meshes[chunk.id + '-' + building.id];
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
    return this.sceneMap.chunks
      .filter(chunk => chunk.visible)
      .flatMap(chunk => chunk.buildings.map(b => this.meshes[chunk.id + '-' + b.id]))
      .filter((mesh): mesh is THREE.Object3D => !!mesh && mesh.visible);
  }

  /** Options used by most buildings of this model on the map (a new tree behaves like the other trees). */
  private defaultOptions(modelId: string): { passable: boolean, canHide: boolean } {
    const votes = new Map<string, number>();
    this.sceneMap.chunks.forEach(c => c.buildings.forEach(b => {
      if (b.modelId === modelId) {
        const key = `${b.passable}-${b.canHide}`;
        votes.set(key, (votes.get(key) ?? 0) + 1);
      }
    }));
    const best = [...votes.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
    return best
      ? { passable: best.startsWith('true'), canHide: best.endsWith('true') }
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
    this.updateVisibleChunks(this.originGame.editMode ? this.originGame.getCameraTarget() : undefined);
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
    if(!mesh) { return null; }
    return new THREE.Box3().setFromObject(mesh);
  }

  public updateVisibleMesh(key: string, playerPos: THREE.Vector3, canHide: boolean) {
    const mesh = this.meshes[key];
    if(!mesh) { return; }

    const bounds = new THREE.Box3().setFromObject(mesh);
    const opacity = this.getOpacity(mesh, bounds, playerPos, canHide);
    // A hidden mesh is only kept for its shadow while it is inside the area where shadows are computed
    // (around the camera target): farther, it can't shade anything visible and is dropped completely.
    const target = this.originGame.getCameraTarget();
    const castsShadow = bounds.max.x > target.x - SHADOW_AREA && bounds.min.x < target.x + SHADOW_AREA
      && bounds.max.z > target.z - SHADOW_AREA && bounds.min.z < target.z + SHADOW_AREA;

    mesh.children.forEach(child => MapHelper.updateMeshOpacity(child, opacity, castsShadow));
  }

  private getOpacity(mesh: THREE.Object3D, bounds: THREE.Box3, playerPos: THREE.Vector3, canHide: boolean): number {
    let opacity = 1;

    const camera = this.originGame.camera;

    // HIDE IF TOO CLOSE TO CAMERA (out of view at the bottom of the screen). The camera looks down at an angle:
    // a point h high is seen along the same line of sight as the ground h × CAMERA_LOOK.z / CAMERA_LOOK.y further
    // ahead, so a tall building (the lab, a tower) is still on screen when its base already left it.
    const cameraZ = camera.position.z - TOO_CLOSE_LIMIT;
    const visibleZ = bounds.max.z - (bounds.max.y - bounds.min.y) * CAMERA_LOOK.z / CAMERA_LOOK.y;
    if(cameraZ < visibleZ) {
      opacity = Math.max(0, 1 - (visibleZ - cameraZ) / SHADE_OFFSET);
      return opacity;
    }

    // HIDE IF TOO FAR FOR CAMERA
    // (farther when the editor zooms out)
    const farLimit = TOO_FAR_LIMIT * Math.max(1, this.originGame.cameraZoom);
    const dist = MathService.getDist(mesh.position, camera.position);
    if(dist > farLimit) {
      opacity = Math.max(0, 1 - (dist - farLimit) / SHADE_OFFSET);
      return opacity;
    }

    if(bounds.min.x < playerPos.x && bounds.max.x > playerPos.x && playerPos.z < bounds.min.z) {
      const borderDist = Math.min(Math.abs(playerPos.x - bounds.min.x), Math.abs(playerPos.x - bounds.max.x));
      const behindDist = Math.abs(playerPos.z - bounds.min.z);
      const height = (bounds.max.y - bounds.min.y + SHADE_OFFSET);
      if(behindDist < height) {
        const opacityOffsetX = borderDist > SHADE_OFFSET ? 0 : (1 - borderDist/SHADE_OFFSET);
        const opacityOffsetZ = behindDist > height ? 0 : (behindDist/height);
        const opacityOffset = Math.max(opacityOffsetX, opacityOffsetZ);
        opacity = 0.7 + (0.3 * opacityOffset);
      }
    }

    if(!canHide) {
      return opacity > 0 ? 1 : 0;
    } else {
      return opacity;
    }
  }

  /**
   * A hidden mesh (too close to the camera / too far) is not drawn but, while `castsShadow`, stays in the scene:
   * it still casts its shadow, which would otherwise vanish at once from the visible ground (e.g. the lab's long
   * shadow when walking past it). Hidden = no color and no depth written. Once its shadow can't reach the view
   * anymore, it is removed (`visible = false`: no more drawing, shadow or weather effects on it).
   */
  private static updateMeshOpacity(mesh: THREE.Object3D, opacity: number, castsShadow: boolean) {
    if (!(mesh instanceof THREE.Mesh)) { return; }
    const material = mesh.material as THREE.Material;
    // Transparent only while fading: a transparent double sided material is drawn in two passes (back faces,
    // then front faces), twice the draw calls; the cut-out texels are handled by the alphaTest anyway.
    // One pass even while fading (the few overlapping faces of a fading building don't need the second one).
    // Parts drawn without the depth test (a sign's text over its posts) stay in the transparent list: drawn from
    // the farthest to the nearest, their order is right (the opaque list draws the nearest first).
    material.transparent = (opacity > 0 && opacity < 1) || !material.depthTest;
    material.forceSinglePass = true;
    mesh.visible = opacity > 0 || castsShadow;
    if (material.userData['depthWrite'] === undefined) {
      material.userData['depthWrite'] = material.depthWrite;
    }
    const hidden = opacity <= 0;
    material.colorWrite = !hidden;
    material.depthWrite = hidden ? false : material.userData['depthWrite'];
    material.opacity = Math.min(opacity, 1);
  }

}
