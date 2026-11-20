import { inject, Service } from "@angular/core";
import { haptic } from "../../../../core/shared/haptics";
import * as THREE from "three";
import { Game, SHADE_OFFSET, TOO_FAR_LIMIT } from "../model/Game";
import { KeyCode } from "../../../../core/shared/model/PressedKey";
import { KeyService } from "../../../../core/shared/service/key.service";
import { TouchService } from "../../../../core/shared/service/touch.service";
import { BasicMeshService } from "./basic-mesh.service";
import { SceneBuilding } from "../model/SceneBuilding";
import { SceneChunk } from "../model/SceneMap";
import { TILE_SIZE } from "../model/Terrain";
import { CHUNK_SIZE, downloadMapFile, newChunk, saveMap } from "./map-storage";
import { eventsWithPassage, Passage, passageOf } from "../model/Passage";
import {
  eventsWithObjectEvents,
  ObjectEvent,
  objectEventsOf,
} from "../model/ObjectEvent";
import {
  findModel,
  isZone,
  makeZoneMesh,
  ZONE_LAYER,
  ZONE_MAX_CELLS,
} from "../model/Zone";
import { Vec3 } from "../model/SceneUtils";
import { SceneEvent } from "../model/SceneEvent";
import { EditAction, EditHistory } from "./map-editor/edit-history";
import { EditorGrid } from "./map-editor/editor-grid";
import { EditorMarkers, slotKey } from "./map-editor/editor-markers";
import { GroundPainter } from "./map-editor/ground-painter";

/** Camera zoom range in the editor (1 = normal game view, lower = closer). */
const ZOOM_MIN = 0.4;
const ZOOM_MAX = 1.8;
/** With a chunk tool: zoomed out enough to see a few chunks and the free places around. */
const ZOOM_MAX_CHUNKS = 5;
/** Zoom change per wheel pixel (exponential: the same wheel move zooms by the same ratio). */
const ZOOM_SPEED = 0.0012;
/** Keyboard panning speed (world units per input tick at zoom 1). */
const KEY_PAN_SPEED = 3;
/** Placement grid (world units: the player's step). */
const GRID = 8;
/** A press that moves less than this (pixels) is a click (place / select), more is a drag (pan / move). */
const CLICK_TOLERANCE = 5;
/** Same for a finger (less steady than a mouse): below is a tap, above a drag. */
const TAP_TOLERANCE = 10;
/** Opacity of the preview of the model to place. */
const GHOST_OPACITY = 0.55;
/** Color of the box around the selected object. */
const SELECTION_COLOR = 0xff_b0_4a;
/** Delay before saving the map in the browser after a change (ms: a burst of changes is saved once). */
const SAVE_DELAY = 400;
/** Buildings fading / hiding: every this many input ticks (120 Hz → 30 Hz, like in the game), when the view moved. */
const VISIBILITY_EVERY = 4;

/** The selected object, as shown by the editor UI. */
export interface EditSelection {
  modelId: string;
  passable: boolean;
  canHide: boolean;
  /** Passage to another map set on the object. */
  passage: Passage | null;
  /** The events made in the editor's event window, in order. */
  events: ObjectEvent[];
  /** An invisible zone's size in cells (null: not a zone). */
  zoneSize: { x: number; z: number } | null;
}

/** Ground brush: size in cells, or the bucket. */
export type EditBrush = 1 | 2 | 3 | "fill";

/** Editor command sent by the UI (keyboard shortcuts, buttons). */
export type EditCommand =
  | "undo"
  | "redo"
  | "delete"
  | "rotate"
  | "duplicate"
  | "deselect"
  | "togglePassable"
  | "toggleCanHide"
  | "toggleGrid"
  | "export"
  | "reset";

/** Chunk tools of the palette: add a chunk on a free place next to the map, take one away. */
const CHUNK_TOOLS = new Set(["chunk-add", "chunk-remove", "spawn"]);

interface Picked {
  chunk: SceneChunk;
  building: SceneBuilding;
}

/** Pointer pressed: where (to tell a click from a drag), last position, what's under it, what the drag does. */
interface Drag {
  startX: number;
  startY: number;
  x: number;
  y: number;
  hit: Picked | null;
  /** Moved beyond the click tolerance. */
  dragging: boolean;
  /** Dragging the selected object (else: panning the camera). */
  moving: boolean;
  /** Panning only (right / middle button). */
  panOnly?: boolean;
  /** Moving: world position of the object when grabbed, and grab point → object offset on the ground. */
  from?: THREE.Vector3;
  grab?: THREE.Vector3;
}

/**
 * Map editor. In edit mode the player is frozen and the camera can be moved: drag to pan, wheel to zoom,
 * arrows / ZQSD to pan. Leaving the editor puts the camera back where it was.
 * - With a model selected, a see-through preview follows the mouse on the ground (snapped to the grid) and a click
 *   places the model there.
 * - Without one, a click selects an object (orange box): drag it to move it, Delete to remove it, its options
 *   (passable, fades when the player is behind) can be switched. Every change can be undone / redone.
 * - On a touch screen: dragging always moves the view, a tap places / paints / selects, two fingers zoom.
 */
@Service()
export class MapEditorService {
  private readonly keyService = inject(KeyService);
  private readonly touchService = inject(TouchService);

  /** Camera position and zoom when the editor was opened (restored when leaving it). */
  private readonly savedPosition = new THREE.Vector3();
  private savedZoom = 1;
  private drag: Drag | null = null;
  /** See-through preview of the model to place, and where it would go (null = not over the ground). */
  private ghost: THREE.Group | null = null;
  private ghostAt: THREE.Vector3 | null = null;
  private readonly pointer = new THREE.Vector2();
  /** Selected object and the box drawn around it. */
  private selected: Picked | null = null;
  private readonly selectionBox = new THREE.Box3();
  private readonly selectionHelper = new THREE.Box3Helper(
    this.selectionBox,
    SELECTION_COLOR
  );
  private saveTimer?: ReturnType<typeof setTimeout>;
  private savePending = false;
  /** The square showing the cell under the mouse (ground painting). */
  private readonly brush = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(
      [
        [0, 0],
        [TILE_SIZE, 0],
        [TILE_SIZE, TILE_SIZE],
        [0, TILE_SIZE],
      ].map(([x, z]) => new THREE.Vector3(x, 0, z))
    ),
    new THREE.LineBasicMaterial({ color: SELECTION_COLOR, depthTest: false })
  );

  /** Fingers on the screen (pointer id → position), and the pinch of two of them (their distance and the zoom at its start). */
  private readonly touches = new Map<number, { x: number; y: number }>();
  private pinch: { distance: number; zoom: number } | null = null;
  private readonly grid = new EditorGrid();
  private readonly markers = new EditorMarkers();
  private readonly history = new EditHistory();
  private readonly painter = new GroundPainter(this.grid, (game, action) =>
    this.record(game, action)
  );
  /** Buildings fading: input ticks counter, and the camera target / zoom they were last computed for (null = to do). */
  private visibilityTick = 0;
  private visibilityAt: { target: THREE.Vector3; zoom: number } | null = null;

  /** Listens to the mouse / the fingers on the game canvas (only acts in edit mode). */
  attach(game: Game) {
    const el = game.canvas;
    this.selectionHelper.visible = false;
    game.scene.add(this.selectionHelper);
    this.brush.visible = false;
    this.brush.renderOrder = 20;
    game.scene.add(this.brush);
    el.addEventListener("contextmenu", (ev) => {
      if (game.editMode) {
        ev.preventDefault();
      }
    });
    el.addEventListener("pointerdown", (ev) => {
      if (!game.editMode) {
        return;
      }
      const touch = ev.pointerType === "touch";
      if (touch) {
        this.touches.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
        if (this.touches.size > 1) {
          // A second finger: the drag / tap of the first one is dropped, the two zoom
          this.cancelDrag(game);
          this.pinch =
            this.touches.size === 2
              ? { distance: this.touchesDistance(), zoom: game.cameraZoom }
              : this.pinch;
          el.setPointerCapture(ev.pointerId);
          return;
        }
      }
      if (ev.button === 1 || ev.button === 2) {
        // Right / middle button: always moves the view
        this.drag = {
          startX: ev.clientX,
          startY: ev.clientY,
          x: ev.clientX,
          y: ev.clientY,
          hit: null,
          dragging: true,
          moving: false,
          panOnly: true,
        };
        el.setPointerCapture(ev.pointerId);
        return;
      }
      if (ev.button !== 0) {
        return;
      }
      if (game.editTileId && !touch && !this.groundPick) {
        // Painting the ground with the mouse: the press and every move paint (a finger paints on a tap)
        this.painter.begin();
        this.paintAt(game, ev.clientX, ev.clientY);
        el.setPointerCapture(ev.pointerId);
        return;
      }
      const hit =
        game.editModelId || game.editTileId || this.groundPick
          ? null
          : this.pick(game, ev.clientX, ev.clientY);
      this.drag = {
        startX: ev.clientX,
        startY: ev.clientY,
        x: ev.clientX,
        y: ev.clientY,
        hit,
        dragging: false,
        moving: false,
      };
      // Pressing on the selected object: dragging will move it
      if (
        hit &&
        this.selected &&
        hit.building === this.selected.building &&
        game.mapHelper
      ) {
        const from = game.mapHelper.buildingWorldPos(hit.chunk, hit.building);
        const ground = this.groundAt(game, ev.clientX, ev.clientY);
        this.drag.moving = true;
        this.drag.from = from;
        this.drag.grab = ground
          ? from.clone().sub(ground).setY(0)
          : new THREE.Vector3();
      }
      el.setPointerCapture(ev.pointerId);
    });
    el.addEventListener("pointermove", (ev) => {
      if (!game.editMode) {
        return;
      }
      const touch = ev.pointerType === "touch";
      if (touch) {
        const finger = this.touches.get(ev.pointerId);
        if (finger) {
          finger.x = ev.clientX;
          finger.y = ev.clientY;
        }
        if (this.pinch && this.touches.size === 2) {
          // Fingers moving apart zoom in (the camera gets closer)
          this.setZoom(
            game,
            (this.pinch.zoom * this.pinch.distance) /
              Math.max(1, this.touchesDistance())
          );
        }
        if (!this.drag) {
          return;
        }
      }
      if (this.painter.painting) {
        this.hover(game, ev.clientX, ev.clientY);
        this.paintAt(game, ev.clientX, ev.clientY);
        return;
      }
      const drag = this.drag;
      if (
        drag &&
        !drag.dragging &&
        Math.hypot(ev.clientX - drag.startX, ev.clientY - drag.startY) >
          (touch ? TAP_TOLERANCE : CLICK_TOLERANCE)
      ) {
        drag.dragging = true;
      }
      if (drag?.dragging && drag.moving) {
        this.dragSelected(game, ev.clientX, ev.clientY);
      } else if (drag?.dragging) {
        this.pan(game, ev.clientX - drag.x, ev.clientY - drag.y);
      }
      if (drag) {
        drag.x = ev.clientX;
        drag.y = ev.clientY;
      }
      // (after the view moved; a finger doesn't hover: its square and its preview are shown where it taps)
      if (!touch) {
        this.hover(game, ev.clientX, ev.clientY);
      }
    });
    const release = (ev: PointerEvent, cancelled: boolean) => {
      const touch = ev.pointerType === "touch";
      if (el.hasPointerCapture(ev.pointerId)) {
        el.releasePointerCapture(ev.pointerId);
      }
      if (touch) {
        this.touches.delete(ev.pointerId);
        if (this.touches.size < 2) {
          this.pinch = null;
        }
      }
      if (this.painter.painting) {
        this.painter.end(game);
      }
      if (!this.drag || cancelled) {
        this.cancelDrag(game);
        return;
      }
      const drag = this.drag;
      this.drag = null;
      if (!game.editMode || drag.panOnly) {
        return;
      }
      if (drag.moving && drag.dragging) {
        this.endMove(game, drag);
        haptic("light");
      } else if (!drag.dragging) {
        const ground = this.groundPick
          ? this.groundAt(game, ev.clientX, ev.clientY)
          : null;
        if (this.groundPick) {
          if (ground) {
            haptic("success");
            this.groundPick({
              x: Math.round(ground.x / GRID) * GRID,
              y: 0,
              z: Math.round(ground.z / GRID) * GRID,
            });
          }
        } else if (game.editTileId) {
          // Tap (finger): one press of the brush
          haptic("tick");
          this.painter.begin();
          this.paintAt(game, ev.clientX, ev.clientY);
          this.painter.end(game);
        } else if (game.editModelId) {
          // (a finger doesn't hover: the preview goes where it tapped, and doesn't stay over the placed model)
          this.moveGhost(game, ev.clientX, ev.clientY);
          this.place(game);
          if (touch) {
            this.showGhostAt(null);
          }
        } else {
          if (drag.hit) {
            haptic("tick");
          }
          this.select(game, drag.hit);
        }
      }
    };
    el.addEventListener("pointerup", (ev) => release(ev, false));
    el.addEventListener("pointercancel", (ev) => release(ev, true));
    el.addEventListener("pointerleave", () => {
      this.showGhostAt(null);
      this.brush.visible = false;
    });
    el.addEventListener(
      "wheel",
      (ev) => {
        if (!game.editMode) {
          return;
        }
        ev.preventDefault();
        this.setZoom(game, game.cameraZoom * Math.exp(ev.deltaY * ZOOM_SPEED));
      },
      { passive: false }
    );
  }

  enter(game: Game) {
    if (game.editMode) {
      return;
    }
    this.savedPosition.copy(game.camera.position);
    this.savedZoom = game.cameraZoom;
    game.editMode = true;
    // The invisible zones show (their own layer), the objects turned towards the player turn back
    game.camera.layers.enable(ZONE_LAYER);
    game.raycaster.layers.enable(ZONE_LAYER);
    game.mapHelper?.resetFacing();
    this.visibilityAt = null;
    this.markers.refreshChunkOutlines(game);
    this.markers.refreshSpawnMarker(game);
    // Touch screens: no stick nor buttons while editing, the fingers move the view and edit the map
    this.touchService.setGameControls(false);
    this.updateHistoryFlags(game);
  }

  exit(game: Game) {
    if (!game.editMode) {
      return;
    }
    game.editMode = false;
    game.camera.layers.disable(ZONE_LAYER);
    game.raycaster.layers.disable(ZONE_LAYER);
    this.touchService.setGameControls(true);
    this.cancelDrag(game);
    this.painter.cancel();
    this.pinch = null;
    this.touches.clear();
    this.grid.clear();
    this.showGhostAt(null);
    this.brush.visible = false;
    this.select(game, null);
    this.groundPick = null;
    this.markers.refreshChunkOutlines(game);
    this.markers.refreshSpawnMarker(game);
    game.cameraZoom = this.savedZoom;
    game.camera.position.copy(this.savedPosition);
    this.updateFar(game);
    game.mapHelper?.updateCameraAim();
  }

  /** Model to place (null = none: the mouse selects objects and moves the camera). */
  selectModel(game: Game, modelId: string | null) {
    game.editModelId = modelId;
    if (modelId) {
      this.select(game, null);
      game.editTileId = null;
      this.brush.visible = false;
    }
    if (this.ghost) {
      game.scene.remove(this.ghost);
      this.ghost = null;
    }
    const model = modelId ? findModel(modelId) : undefined;
    if (model && isZone(model)) {
      this.ghost = makeZoneMesh(undefined, 0.12);
      this.ghost.visible = false;
      game.scene.add(this.ghost);
    } else if (model) {
      this.ghost = BasicMeshService.makeModel(model);
      // Own see-through materials (the model ones are shared with the placed buildings), no shadow
      this.ghost.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.isMesh) {
          const material = (mesh.material as THREE.Material).clone();
          material.transparent = true;
          material.opacity = GHOST_OPACITY;
          material.depthWrite = false;
          mesh.material = material;
          mesh.castShadow = false;
          mesh.receiveShadow = false;
        }
      });
      this.ghost.visible = false;
      game.scene.add(this.ghost);
    }
    this.ghostAt = null;
  }

  /** Ground tile to paint ('erase' = back to the original ground, null = no painting), or a chunk tool. */
  selectTile(game: Game, tileId: string | null) {
    if (tileId) {
      this.selectModel(game, null);
      this.select(game, null);
    }
    game.editTileId = tileId;
    this.brush.visible = false;
    this.markers.refreshChunkOutlines(game);
    if (
      game.editMode &&
      game.cameraZoom > ZOOM_MAX &&
      !CHUNK_TOOLS.has(tileId ?? "")
    ) {
      this.setZoom(game, ZOOM_MAX); // (zoomed out for the chunks: back to the usual view)
    }
  }

  // --- Chunks ---

  /** Point of the ground level 0 under the mouse (also where there is no ground: free places). */
  private planeAt(
    game: Game,
    clientX: number,
    clientY: number
  ): THREE.Vector3 | null {
    this.setRay(game, clientX, clientY);
    return game.raycaster.ray.intersectPlane(
      new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
      new THREE.Vector3()
    );
  }

  /** The chunk tool on the place under the mouse: a new chunk on a free place next to the map, or one taken away. */
  private chunkToolAt(game: Game, clientX: number, clientY: number) {
    const mapHelper = game.mapHelper;
    const point = this.planeAt(game, clientX, clientY);
    if (!mapHelper || !point) {
      return;
    }
    const map = mapHelper.sceneMap;
    if (game.editTileId === "spawn") {
      // The map's arrival point, on its ground, snapped to the grid
      if (!mapHelper.chunkAt(point.x, point.z)) {
        haptic("warning");
        return;
      }
      const before = map.spawn;
      const after = {
        x: Math.round(point.x / GRID) * GRID,
        y: 0,
        z: Math.round(point.z / GRID) * GRID,
      };
      const set = (spawn: Vec3 | undefined) => {
        map.spawn = spawn;
        this.markers.refreshSpawnMarker(game);
      };
      set(after);
      haptic("success");
      this.record(game, { undo: () => set(before), redo: () => set(after) });
      return;
    }
    const key = slotKey(point.x, point.z);
    const [col, row] = key.split(",").map(Number);
    const existing = map.chunks.find((c) => slotKey(c.pos.x, c.pos.z) === key);
    if (game.editTileId === "chunk-add") {
      const touches = map.chunks.some(
        (c) =>
          Math.abs(Math.round(c.pos.x / CHUNK_SIZE) - col) +
            Math.abs(Math.round(c.pos.z / CHUNK_SIZE) - row) ===
          1
      );
      if (existing || !touches) {
        return;
      }
      // (negative places written m1, m2…: the ids become constant names in the exported file)
      const place = (n: number) => (n < 0 ? "m" + -n : String(n));
      let id = `${map.id}-${place(col)}-${place(row)}`;
      for (let i = 2; map.chunks.some((c) => c.id === id); i++) {
        id = `${map.id}-${place(col)}-${place(row)}-${i}`;
      }
      const chunk = newChunk(id, col, row);
      mapHelper.addChunk(chunk);
      haptic("success");
      this.record(game, {
        undo: () => this.takeChunk(game, chunk),
        redo: () => this.putChunk(game, chunk),
      });
    } else if (existing) {
      // Not the last one, nor the one under the player or the arrival point (they would stand in the void)
      const player = mapHelper.scenePlayer.mesh?.position;
      const spawn = map.spawn ?? { x: 0, y: 0, z: 0 };
      const holds = (x: number, z: number) =>
        Math.abs(x - existing.pos.x) <= existing.size.x / 2 &&
        Math.abs(z - existing.pos.z) <= existing.size.y / 2;
      if (
        map.chunks.length === 1 ||
        (player && holds(player.x, player.z)) ||
        holds(spawn.x, spawn.z)
      ) {
        haptic("warning");
        return;
      }
      if (this.selected?.chunk === existing) {
        this.select(game, null);
      }
      this.takeChunk(game, existing);
      haptic("warning");
      this.record(game, {
        undo: () => this.putChunk(game, existing),
        redo: () => this.takeChunk(game, existing),
      });
    }
  }

  private putChunk(game: Game, chunk: SceneChunk) {
    game.mapHelper?.addChunk(chunk);
    this.markers.refreshChunkOutlines(game);
  }

  private takeChunk(game: Game, chunk: SceneChunk) {
    this.grid.remove(chunk.id);
    game.mapHelper?.removeChunk(chunk);
    this.markers.refreshChunkOutlines(game);
  }

  /** Brush size in cells (1 to 3), or 'fill' (bucket). */
  setBrush(game: Game, brush: EditBrush) {
    game.editBrush = brush;
  }

  /** Keyboard shortcuts and buttons of the editor UI. */
  command(game: Game, command: EditCommand) {
    if (!game.editMode) {
      return;
    }
    switch (command) {
      case "undo":
        this.undo(game);
        break;
      case "redo":
        this.redo(game);
        break;
      case "deselect":
        this.select(game, null);
        break;
      case "delete":
        this.deleteSelected(game);
        break;
      case "rotate":
        this.rotateSelected(game);
        break;
      case "duplicate":
        this.duplicateSelected(game);
        break;
      case "togglePassable":
        this.toggleOption(game, "passable");
        break;
      case "toggleCanHide":
        this.toggleOption(game, "canHide");
        break;
      case "toggleGrid":
        game.editGrid = !game.editGrid;
        if (!game.editGrid) {
          this.grid.clear();
        }
        break;
      case "export":
        if (game.mapHelper) {
          downloadMapFile(game.mapHelper.sceneMap);
        }
        break;
      // ('reset': the map comes back to the code's one, see GameService.resetMap)
    }
  }

  /** Called by the map input loop (120 Hz) instead of the player moves while editing. */
  update(game: Game) {
    const held = this.keyService.holdedCodes;
    const speed = KEY_PAN_SPEED * game.cameraZoom;
    const x =
      (held.includes(KeyCode.right) ? 1 : 0) -
      (held.includes(KeyCode.left) ? 1 : 0);
    const z =
      (held.includes(KeyCode.down) ? 1 : 0) -
      (held.includes(KeyCode.up) ? 1 : 0);
    if (x || z) {
      game.camera.position.x += x * speed;
      game.camera.position.z += z * speed;
      game.mapHelper?.updateCameraAim();
    }
    // Buildings fading / hiding follow the camera target instead of the (frozen) player
    const mapHelper = game.mapHelper;
    if (mapHelper && game.editGrid) {
      this.grid.follow(game);
    }
    // (every building's box is computed: only 30 times per second, and only when the view moved or the map changed)
    if (mapHelper && ++this.visibilityTick % VISIBILITY_EVERY === 0) {
      const target = game.getCameraTarget();
      const at = this.visibilityAt;
      if (!at || !at.target.equals(target) || at.zoom !== game.cameraZoom) {
        this.visibilityAt = { target: target.clone(), zoom: game.cameraZoom };
        mapHelper.sceneMap.chunks.forEach((chunk) => {
          if (chunk.visible) {
            chunk.buildings.forEach((building) =>
              mapHelper.updateVisibleMesh(
                chunk.id + "-" + building.id,
                target,
                building.canHide
              )
            );
          }
        });
      }
    }
  }

  /** Drops the current press (a second finger, a cancelled pointer, leaving the editor): a moved object goes back. */
  private cancelDrag(game: Game) {
    const drag = this.drag;
    this.drag = null;
    if (drag?.moving && drag.from && this.selected && game.mapHelper) {
      const chunk =
        this.chunkOf(game, this.selected.building) ?? this.selected.chunk;
      if (
        game.mapHelper.moveBuilding(chunk, this.selected.building, drag.from)
      ) {
        this.selected.chunk =
          this.chunkOf(game, this.selected.building) ?? chunk;
      }
      this.refreshSelection(game);
    }
  }

  /** Distance between the two fingers of a pinch (pixels). */
  private touchesDistance(): number {
    const [a, b] = [...this.touches.values()];
    return a && b ? Math.hypot(a.x - b.x, a.y - b.y) : 1;
  }

  // --- Grid ---

  // --- Selection, move, delete, options ---

  private select(game: Game, picked: Picked | null) {
    this.selected = picked;
    this.refreshSelection(game);
  }

  /** Box around the selected object, and what the UI shows about it. */
  private refreshSelection(game: Game) {
    const picked = this.selected;
    // (instanced or not: the bounds come from the map)
    const bounds =
      picked && game.mapHelper?.buildingBounds(picked.chunk, picked.building);
    this.selectionHelper.visible = !!bounds;
    if (bounds) {
      this.selectionBox.copy(bounds);
    }
    game.editSelection = picked
      ? {
          modelId: picked.building.modelId,
          passable: picked.building.passable,
          canHide: picked.building.canHide,
          passage: passageOf(picked.building),
          events: objectEventsOf(picked.building),
          zoneSize: isZone(picked.building)
            ? {
                x: picked.building.size?.x ?? 2,
                z: picked.building.size?.z ?? 2,
              }
            : null,
        }
      : null;
  }

  /** The object under the mouse (its meshes, not hidden near the camera). */
  private pick(game: Game, clientX: number, clientY: number): Picked | null {
    const mapHelper = game.mapHelper;
    if (!mapHelper) {
      return null;
    }
    this.setRay(game, clientX, clientY);
    const hits = game.raycaster
      .intersectObjects(mapHelper.pickableBuildingMeshes(), true)
      .filter(
        (hit) =>
          ((hit.object as THREE.Mesh).material as THREE.Material)
            ?.colorWrite !== false
      );
    return hits.length > 0
      ? mapHelper.findBuilding(hits[0].object, hits[0].instanceId)
      : null;
  }

  /** Dragging the selected object: it follows the mouse on the ground, snapped to the grid. */
  private dragSelected(game: Game, clientX: number, clientY: number) {
    const drag = this.drag;
    const ground = this.groundAt(game, clientX, clientY);
    if (!drag?.grab || !ground || !this.selected || !game.mapHelper) {
      return;
    }
    const to = ground.add(drag.grab);
    to.set(
      Math.round(to.x / GRID) * GRID,
      Math.round(ground.y * 1000) / 1000,
      Math.round(to.z / GRID) * GRID
    );
    if (
      game.mapHelper.moveBuilding(
        this.selected.chunk,
        this.selected.building,
        to
      )
    ) {
      this.selected.chunk =
        this.chunkOf(game, this.selected.building) ?? this.selected.chunk;
      this.refreshSelection(game);
    }
  }

  private endMove(game: Game, drag: Drag) {
    const picked = this.selected;
    if (!picked || !drag.from || !game.mapHelper) {
      return;
    }
    const from = drag.from.clone();
    const to = game.mapHelper.buildingWorldPos(picked.chunk, picked.building);
    if (to.equals(from)) {
      return;
    }
    const building = picked.building;
    this.record(game, {
      undo: () => this.moveTo(game, building, from),
      redo: () => this.moveTo(game, building, to),
    });
  }

  private moveTo(game: Game, building: SceneBuilding, world: THREE.Vector3) {
    const chunk = this.chunkOf(game, building);
    if (chunk && game.mapHelper?.moveBuilding(chunk, building, world)) {
      this.select(game, {
        chunk: this.chunkOf(game, building) ?? chunk,
        building,
      });
    }
  }

  private deleteSelected(game: Game) {
    const picked = this.selected;
    if (!picked || !game.mapHelper) {
      return;
    }
    const building = picked.building;
    const chunk = picked.chunk;
    const remove = () => {
      const current = this.chunkOf(game, building);
      if (current) {
        game.mapHelper?.removeBuilding(current, building);
      }
      if (this.selected?.building === building) {
        this.select(game, null);
      }
    };
    remove();
    this.record(game, {
      undo: () => {
        game.mapHelper?.addBuilding(chunk, building);
        this.select(game, { chunk, building });
      },
      redo: remove,
    });
  }

  /** A quarter turn (clockwise seen from above), around the middle of the object. */
  private rotateSelected(game: Game) {
    const picked = this.selected;
    if (!picked) {
      return;
    }
    const building = picked.building;
    const before = building.rot ?? 0;
    const after = (before + 1) % 4;
    const set = (rot: number) => {
      building.rot = rot || undefined;
      const chunk = this.chunkOf(game, building);
      if (chunk) {
        // (a turned object has its own meshes: no more an instanced copy)
        game.mapHelper?.refreshBuilding(chunk, building);
        this.select(game, { chunk, building });
      }
    };
    set(after);
    haptic("light");
    this.record(game, { undo: () => set(before), redo: () => set(after) });
  }

  /**
   * A copy of the selected object (options, turn, events and passage included) just to its right, past its width;
   * the copy is selected (drag it where it goes).
   */
  private duplicateSelected(game: Game) {
    const picked = this.selected;
    const mapHelper = game.mapHelper;
    if (!picked || !mapHelper) {
      return;
    }
    const building = picked.building;
    const bounds = mapHelper.buildingBounds(picked.chunk, building);
    const width = bounds ? bounds.max.x - bounds.min.x : GRID;
    const world = mapHelper.buildingWorldPos(picked.chunk, building);
    world.x += Math.max(1, Math.ceil(width / GRID)) * GRID;
    const chunk = mapHelper.chunkAt(world.x, world.z);
    if (!chunk) {
      haptic("warning");
      return;
    }
    const { originModel, ...data } = building;
    const copy: SceneBuilding = {
      ...(JSON.parse(JSON.stringify(data)) as Omit<
        SceneBuilding,
        "originModel"
      >),
      id: `${building.modelId}-${Date.now().toString(36)}${Math.floor(Math.random() * 1296).toString(36)}`,
      pos: {
        x: world.x - chunk.pos.x,
        y: world.y - chunk.pos.y,
        z: world.z - chunk.pos.z,
      },
      originModel,
    };
    mapHelper.addBuilding(chunk, copy);
    this.select(game, { chunk, building: copy });
    haptic("success");
    this.record(game, {
      undo: () => {
        const current = this.chunkOf(game, copy);
        if (current) {
          mapHelper.removeBuilding(current, copy);
        }
        if (this.selected?.building === copy) {
          this.select(game, {
            chunk: this.chunkOf(game, building) ?? picked.chunk,
            building,
          });
        }
      },
      redo: () => {
        mapHelper.addBuilding(chunk, copy);
        this.select(game, { chunk, building: copy });
      },
    });
  }

  private toggleOption(game: Game, option: "passable" | "canHide") {
    const picked = this.selected;
    if (!picked) {
      return;
    }
    const building = picked.building;
    const value = !building[option];
    const set = (v: boolean) => {
      building[option] = v;
      const chunk = this.chunkOf(game, building);
      if (chunk) {
        // (fading or not changes how it is drawn: its own meshes or an instanced copy)
        game.mapHelper?.refreshBuilding(chunk, building);
        this.select(game, { chunk, building });
      }
    };
    set(value);
    this.record(game, { undo: () => set(!value), redo: () => set(value) });
  }

  /**
   * The selected object's passage (null: removed). A place to walk on lets the player through. Undone as one
   * change.
   */
  setPassage(game: Game, passage: Passage | null) {
    const picked = this.selected;
    if (!picked) {
      return;
    }
    const building = picked.building;
    this.changeEvents(
      game,
      picked,
      eventsWithPassage(building, passage),
      passage?.trigger === "walk" ? true : building.passable
    );
  }

  /** The selected object's events made in the event window (all of them, in order). Undone as one change. */
  setObjectEvents(game: Game, events: ObjectEvent[]) {
    const picked = this.selected;
    if (picked) {
      this.changeEvents(
        game,
        picked,
        eventsWithObjectEvents(picked.building, events),
        picked.building.passable
      );
    }
  }

  /** The selected zone's size in cells. Undone as one change. */
  setZoneSize(game: Game, size: { x: number; z: number }) {
    const picked = this.selected;
    if (!picked || !isZone(picked.building)) {
      return;
    }
    const building = picked.building;
    const clamp = (n: number) =>
      Math.min(ZONE_MAX_CELLS, Math.max(1, Math.round(n)));
    const before = { ...(building.size ?? { x: 2, z: 2 }) };
    const after = { x: clamp(size.x), z: clamp(size.z) };
    const set = (value: { x: number; z: number }) => {
      building.size = { ...value };
      const chunk = this.chunkOf(game, building);
      if (chunk) {
        game.mapHelper?.refreshBuilding(chunk, building);
        this.select(game, { chunk, building });
      }
    };
    set(after);
    this.record(game, { undo: () => set(before), redo: () => set(after) });
  }

  /** New events (and passable option) for an object, undone as one change. */
  private changeEvents(
    game: Game,
    picked: Picked,
    events: SceneEvent[],
    passable: boolean
  ) {
    const building = picked.building;
    const before = { events: building.events, passable: building.passable };
    const after = { events, passable };
    const set = (state: typeof before) => {
      building.events = state.events;
      building.passable = state.passable;
      const chunk = this.chunkOf(game, building);
      if (chunk) {
        // (an object with events has its own meshes: no more an instanced copy)
        game.mapHelper?.refreshBuilding(chunk, building);
        this.select(game, { chunk, building });
      }
    };
    set(after);
    this.record(game, { undo: () => set(before), redo: () => set(after) });
  }

  /** Where the selected object is (to find it again on its map later). */
  selectedRef(): {
    chunkId: string;
    buildingId: string;
    passage: Passage | null;
  } | null {
    const picked = this.selected;
    return picked
      ? {
          chunkId: picked.chunk.id,
          buildingId: picked.building.id,
          passage: passageOf(picked.building),
        }
      : null;
  }

  /** Selects an object of the current map by its ids (back from choosing an arrival point). */
  selectById(game: Game, chunkId: string, buildingId: string) {
    const chunk = game.mapHelper?.sceneMap.chunks.find((c) => c.id === chunkId);
    const building = chunk?.buildings.find((b) => b.id === buildingId);
    this.select(game, chunk && building ? { chunk, building } : null);
  }

  /** Choosing a point: the next tap on the ground gives it (snapped to the grid) instead of editing the map. */
  private groundPick: ((point: Vec3) => void) | null = null;

  pickGround(onPick: ((point: Vec3) => void) | null) {
    this.groundPick = onPick;
  }

  /** The chunk that currently holds a building (it changes when moved across a chunk border). */
  private chunkOf(game: Game, building: SceneBuilding): SceneChunk | undefined {
    return game.mapHelper?.sceneMap.chunks.find((c) =>
      c.buildings.includes(building)
    );
  }

  // --- Undo / redo ---

  /** Keeps a change that was just done. */
  private record(game: Game, action: EditAction) {
    this.history.record(action);
    this.updateHistoryFlags(game);
  }

  private undo(game: Game) {
    if (this.history.undo()) {
      this.updateHistoryFlags(game);
    }
  }

  private redo(game: Game) {
    if (this.history.redo()) {
      this.updateHistoryFlags(game);
    }
  }

  /** Also the moment the map changed (a change, an undo, a redo): it is saved in the browser. */
  private updateHistoryFlags(game: Game) {
    this.visibilityAt = null; // (objects placed, moved, removed: their fading is computed again)
    game.editCanUndo = this.history.canUndo;
    game.editCanRedo = this.history.canRedo;
    this.scheduleSave(game);
  }

  private scheduleSave(game: Game) {
    if (this.history.empty) {
      return; // nothing edited yet (just opened the editor)
    }
    clearTimeout(this.saveTimer);
    this.savePending = true;
    this.saveTimer = setTimeout(() => this.saveNow(game), SAVE_DELAY);
  }

  /** Saves the pending changes now (before the map is copied, exported, left). */
  saveNow(game: Game) {
    clearTimeout(this.saveTimer);
    if (this.savePending && game.mapHelper) {
      saveMap(game.mapHelper.sceneMap);
    }
    this.savePending = false;
  }

  /** The player was moved (teleport) while editing: leaving the editor brings the camera back next to them. */
  followPlayer(dx: number, dz: number) {
    this.savedPosition.x += dx;
    this.savedPosition.z += dz;
  }

  /** Forgets the changes not saved yet (the map is reset). */
  dropPendingSave() {
    clearTimeout(this.saveTimer);
    this.savePending = false;
  }

  /**
   * The current map is about to be replaced by another one: its last changes are saved, the history (about its
   * objects) is forgotten, the grid and selection go.
   */
  leaveMap(game: Game) {
    this.saveNow(game);
    setTimeout(() => {
      // (once the new map is there)
      this.markers.refreshChunkOutlines(game);
      this.markers.refreshSpawnMarker(game);
    });
    this.history.clear();
    this.grid.clear();
    this.select(game, null);
    game.editCanUndo = false;
    game.editCanRedo = false;
  }

  // --- Placing ---

  /** The preview follows the mouse: where its ray hits the ground, snapped to the grid. */
  private moveGhost(
    game: Game,
    clientX: number,
    clientY: number,
    ground?: THREE.Vector3 | null
  ) {
    if (!this.ghost) {
      return;
    }
    const hit =
      ground === undefined ? this.groundAt(game, clientX, clientY) : ground;
    this.showGhostAt(
      hit
        ? new THREE.Vector3(
            Math.round(hit.x / GRID) * GRID,
            Math.round(hit.y * 1000) / 1000,
            Math.round(hit.z / GRID) * GRID
          )
        : null
    );
  }

  private showGhostAt(at: THREE.Vector3 | null) {
    this.ghostAt = at;
    if (this.ghost) {
      this.ghost.visible = !!at;
      if (at) {
        this.ghost.position.copy(at);
      }
    }
  }

  /** Click: the selected model is placed where the preview is. */
  private place(game: Game) {
    const mapHelper = game.mapHelper;
    if (!game.editModelId || !this.ghostAt || !mapHelper) {
      return;
    }
    const building = mapHelper.addBuildingAt(game.editModelId, this.ghostAt);
    const chunk = building && this.chunkOf(game, building);
    if (!building || !chunk) {
      return;
    }
    haptic("light");
    this.record(game, {
      undo: () => {
        const current = this.chunkOf(game, building);
        if (current) {
          mapHelper.removeBuilding(current, building);
        }
        if (this.selected?.building === building) {
          this.select(game, null);
        }
      },
      redo: () => mapHelper.addBuilding(chunk, building),
    });
  }

  // --- Ground painting ---

  /** Mouse over the map: the brush square and the model preview follow it (one ray to the ground for both). */
  private hover(game: Game, clientX: number, clientY: number) {
    const ground =
      game.editTileId || this.ghost
        ? this.groundAt(game, clientX, clientY)
        : null;
    this.moveBrush(game, ground, clientX, clientY);
    this.moveGhost(game, clientX, clientY, ground);
  }

  /** The orange square follows the cell under the mouse while a tile is selected. */
  private moveBrush(
    game: Game,
    ground: THREE.Vector3 | null,
    clientX = 0,
    clientY = 0
  ) {
    if (game.editTileId === "spawn") {
      const point = this.planeAt(game, clientX, clientY);
      this.brush.visible = !!point;
      if (point) {
        this.brush.scale.set(1, 1, 1);
        this.brush.position.set(
          Math.round(point.x / GRID) * GRID - TILE_SIZE / 2,
          0.6,
          Math.round(point.z / GRID) * GRID - TILE_SIZE / 2
        );
      }
      return;
    }
    if (CHUNK_TOOLS.has(game.editTileId ?? "")) {
      // The square covers the place of a chunk
      const point = this.planeAt(game, clientX, clientY);
      this.brush.visible = !!point;
      if (point) {
        const [col, row] = slotKey(point.x, point.z).split(",").map(Number);
        const scale = CHUNK_SIZE / TILE_SIZE;
        this.brush.scale.set(scale, 1, scale);
        this.brush.position.set(
          (col - 0.5) * CHUNK_SIZE,
          0.6,
          (row - 0.5) * CHUNK_SIZE
        );
      }
      return;
    }
    const cell =
      game.editTileId && ground
        ? game.mapHelper?.cellAt(ground.x, ground.z)
        : null;
    this.brush.visible = !!cell;
    // The square covers the brush size (one cell for the bucket)
    const size = game.editBrush === "fill" ? 1 : game.editBrush;
    this.brush.scale.set(size, 1, size);
    if (cell && ground) {
      this.brush.position.set(
        cell.chunk.pos.x - cell.chunk.size.x / 2 + cell.col * TILE_SIZE,
        ground.y + 0.3,
        cell.chunk.pos.z - cell.chunk.size.y / 2 + cell.row * TILE_SIZE
      );
    }
  }

  /**
   * Paints the cells under the brush (see GroundPainter.paint); a chunk tool acts once per stroke.
   */
  private paintAt(game: Game, clientX: number, clientY: number) {
    if (CHUNK_TOOLS.has(game.editTileId ?? "")) {
      if (this.painter.chunkTurn()) {
        this.chunkToolAt(game, clientX, clientY);
      }
      return;
    }
    const ground = this.groundAt(game, clientX, clientY);
    if (ground) {
      this.painter.paint(game, ground);
    }
  }

  // --- Mouse rays, camera ---

  private setRay(game: Game, clientX: number, clientY: number) {
    const rect = game.canvas.getBoundingClientRect();
    this.pointer.set(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1
    );
    game.raycaster.setFromCamera(this.pointer, game.camera);
  }

  /** Point of the ground under the mouse (null = no ground there). */
  private groundAt(
    game: Game,
    clientX: number,
    clientY: number
  ): THREE.Vector3 | null {
    if (!game.mapHelper) {
      return null;
    }
    this.setRay(game, clientX, clientY);
    const grounds = game.mapHelper.sceneMap.chunks
      .filter((chunk) => chunk.visible)
      .flatMap((chunk) =>
        chunk.grounds.filter((g) => g.passable && g.mesh).map((g) => g.mesh!)
      );
    return (
      game.raycaster.intersectObjects(grounds, false)[0]?.point.clone() ?? null
    );
  }

  /**
   * Drag: the ground follows the mouse. A screen pixel covers `worldPerPixel` world units at the camera target;
   * vertically the ground is seen at an angle, so a pixel covers more ground (÷ sin of the camera pitch).
   */
  private pan(game: Game, dx: number, dy: number) {
    const camera = game.camera;
    const offset = game.cameraOffset();
    const distance = offset.length();
    const worldPerPixel =
      (2 * distance * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) /
      game.canvas.clientHeight;
    const pitchSin = offset.y / distance;
    camera.position.x -= dx * worldPerPixel;
    camera.position.z -= (dy * worldPerPixel) / pitchSin;
    game.mapHelper?.updateCameraAim();
  }

  /** Zooms around the point the camera looks at (it stays at the same place on screen). */
  private setZoom(game: Game, zoom: number) {
    const target = game.getCameraTarget();
    const max = CHUNK_TOOLS.has(game.editTileId ?? "")
      ? ZOOM_MAX_CHUNKS
      : ZOOM_MAX;
    game.cameraZoom = THREE.MathUtils.clamp(zoom, ZOOM_MIN, max);
    game.camera.position.copy(target).add(game.cameraOffset());
    this.updateFar(game);
    game.mapHelper?.updateCameraAim();
  }

  /** The far plane follows the zoom, so zooming out doesn't cut the map. */
  private updateFar(game: Game) {
    game.camera.far =
      (TOO_FAR_LIMIT + SHADE_OFFSET) * Math.max(1, game.cameraZoom);
    game.camera.updateProjectionMatrix();
  }
}
