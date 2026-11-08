import { inject, Service } from '@angular/core';
import * as THREE from 'three';
import { Game, SHADE_OFFSET, TOO_FAR_LIMIT } from '../model/Game';
import { KeyCode } from '../../../../core/shared/model/PressedKey';
import { KeyService } from '../../../../core/shared/service/key.service';
import { MODELS } from '../../../../../assets/models/models';
import { BasicMeshService } from './basic-mesh.service';
import { SceneBuilding } from '../model/SceneBuilding';
import { SceneChunk, StairsSide, stairsSide } from '../model/SceneMap';
import { TILE_SIZE } from '../model/Terrain';
import { clearMapEdits, downloadChunksFile, saveMapEdits } from './map-storage';

/** Camera zoom range in the editor (1 = normal game view, lower = closer). */
const ZOOM_MIN = 0.4;
const ZOOM_MAX = 1.8;
/** Zoom change per wheel pixel (exponential: the same wheel move zooms by the same ratio). */
const ZOOM_SPEED = 0.0012;
/** Keyboard panning speed (world units per input tick at zoom 1). */
const KEY_PAN_SPEED = 3;
/** Placement grid (world units: the player's step). */
const GRID = 8;
/** A press that moves less than this (pixels) is a click (place / select), more is a drag (pan / move). */
const CLICK_TOLERANCE = 5;
/** Opacity of the preview of the model to place. */
const GHOST_OPACITY = 0.55;
/** Color of the box around the selected object. */
const SELECTION_COLOR = 0xffb04a;
/** Max undo steps kept. */
const HISTORY_SIZE = 100;
/** Delay before saving the map in the browser after a change (ms: a burst of changes is saved once). */
const SAVE_DELAY = 400;
/** Max cells painted by one bucket fill. */
const FILL_MAX = 4096;

/** The selected object, as shown by the editor UI. */
export interface EditSelection {
  modelId: string;
  passable: boolean;
  canHide: boolean;
}

/** Editor command sent by the UI (keyboard shortcuts, buttons). */
/** Ground brush: size in cells, or the bucket. */
export type EditBrush = 1 | 2 | 3 | 'fill';

export type EditCommand = 'undo' | 'redo' | 'delete' | 'deselect' | 'togglePassable' | 'toggleCanHide' | 'export' | 'reset';

interface EditAction {
  undo(): void;
  redo(): void;
}

/** One painting stroke: each painted cell with its tile before and after (for undo / redo). */
interface Stroke {
  cells: Map<string, { chunk: SceneChunk, col: number, row: number, before: string | null, after: string | null }>;
  /** Height tool: each cell's level before / after (each cell moves one level per stroke). */
  levels: Map<string, { chunk: SceneChunk, col: number, row: number, before: number, after: number }>;
  /** Stairs tool / eraser: each cell's stairs before / after. */
  stairs: Map<string, { chunk: SceneChunk, col: number, row: number, before: StairsSide | null, after: StairsSide | null }>;
}

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
 */
@Service()
export class MapEditorService {
  private readonly keyService = inject(KeyService);

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
  private readonly selectionHelper = new THREE.Box3Helper(this.selectionBox, SELECTION_COLOR);
  private readonly undoStack: EditAction[] = [];
  private readonly redoStack: EditAction[] = [];
  private saveTimer?: ReturnType<typeof setTimeout>;
  /** Ground painting: the stroke being painted, and the square showing the cell under the mouse. */
  private stroke: Stroke | null = null;
  private readonly brush = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints([[0, 0], [TILE_SIZE, 0], [TILE_SIZE, TILE_SIZE], [0, TILE_SIZE]]
      .map(([x, z]) => new THREE.Vector3(x, 0, z))),
    new THREE.LineBasicMaterial({ color: SELECTION_COLOR, depthTest: false }));

  /** Listens to the mouse on the game canvas (only acts in edit mode). */
  attach(game: Game) {
    const el = game.canvas;
    this.selectionHelper.visible = false;
    game.scene.add(this.selectionHelper);
    this.brush.visible = false;
    this.brush.renderOrder = 20;
    game.scene.add(this.brush);
    el.addEventListener('contextmenu', ev => {
      if (game.editMode) { ev.preventDefault(); }
    });
    el.addEventListener('pointerdown', ev => {
      if (!game.editMode) { return; }
      if (ev.button === 1 || ev.button === 2) {
        // Right / middle button: always moves the view
        this.drag = { startX: ev.clientX, startY: ev.clientY, x: ev.clientX, y: ev.clientY, hit: null, dragging: true, moving: false, panOnly: true };
        el.setPointerCapture(ev.pointerId);
        return;
      }
      if (ev.button !== 0) { return; }
      if (game.editTileId) {
        // Painting the ground: the press and every move paint
        this.stroke = { cells: new Map(), levels: new Map(), stairs: new Map() };
        this.paintAt(game, ev.clientX, ev.clientY);
        el.setPointerCapture(ev.pointerId);
        return;
      }
      const hit = game.editModelId ? null : this.pick(game, ev.clientX, ev.clientY);
      this.drag = { startX: ev.clientX, startY: ev.clientY, x: ev.clientX, y: ev.clientY, hit, dragging: false, moving: false };
      // Pressing on the selected object: dragging will move it
      if (hit && this.selected && hit.building === this.selected.building && game.mapHelper) {
        const from = game.mapHelper.buildingWorldPos(hit.chunk, hit.building);
        const ground = this.groundAt(game, ev.clientX, ev.clientY);
        this.drag.moving = true;
        this.drag.from = from;
        this.drag.grab = ground ? from.clone().sub(ground).setY(0) : new THREE.Vector3();
      }
      el.setPointerCapture(ev.pointerId);
    });
    el.addEventListener('pointermove', ev => {
      if (!game.editMode) { return; }
      this.moveBrush(game, ev.clientX, ev.clientY);
      if (this.stroke) {
        this.paintAt(game, ev.clientX, ev.clientY);
        return;
      }
      const drag = this.drag;
      if (drag && !drag.dragging && Math.hypot(ev.clientX - drag.startX, ev.clientY - drag.startY) > CLICK_TOLERANCE) {
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
      this.moveGhost(game, ev.clientX, ev.clientY);
    });
    const release = (ev: PointerEvent, cancelled: boolean) => {
      if (this.stroke) {
        this.endStroke(game);
      }
      const drag = this.drag;
      this.drag = null;
      if (el.hasPointerCapture(ev.pointerId)) {
        el.releasePointerCapture(ev.pointerId);
      }
      if (!drag || cancelled) {
        if (drag?.moving && drag.from && this.selected && game.mapHelper) {
          // Cancelled move: back where it was
          game.mapHelper.moveBuilding(this.selected.chunk, this.selected.building, drag.from);
          this.refreshSelection(game);
        }
        return;
      }
      if (drag.panOnly) {
        return;
      }
      if (drag.moving && drag.dragging) {
        this.endMove(game, drag);
      } else if (!drag.dragging) {
        if (game.editModelId) {
          this.place(game);
        } else {
          this.select(game, drag.hit);
        }
      }
    };
    el.addEventListener('pointerup', ev => release(ev, false));
    el.addEventListener('pointercancel', ev => release(ev, true));
    el.addEventListener('pointerleave', () => {
      this.showGhostAt(null);
      this.brush.visible = false;
    });
    el.addEventListener('wheel', ev => {
      if (!game.editMode) { return; }
      ev.preventDefault();
      this.setZoom(game, game.cameraZoom * Math.exp(ev.deltaY * ZOOM_SPEED));
    }, { passive: false });
  }

  enter(game: Game) {
    if (game.editMode) { return; }
    this.savedPosition.copy(game.camera.position);
    this.savedZoom = game.cameraZoom;
    game.editMode = true;
    this.updateHistoryFlags(game);
  }

  exit(game: Game) {
    if (!game.editMode) { return; }
    game.editMode = false;
    this.drag = null;
    this.showGhostAt(null);
    this.brush.visible = false;
    this.select(game, null);
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
    const model = modelId ? MODELS.find(m => m.id === modelId) : undefined;
    if (model) {
      this.ghost = BasicMeshService.makeModel(model);
      // Own see-through materials (the model ones are shared with the placed buildings), no shadow
      this.ghost.traverse(o => {
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

  /** Ground tile to paint ('erase' = back to the original ground, null = no painting). */
  selectTile(game: Game, tileId: string | null) {
    if (tileId) {
      this.selectModel(game, null);
      this.select(game, null);
    }
    game.editTileId = tileId;
    this.brush.visible = false;
  }

  /** Brush size in cells (1 to 3), or 'fill' (bucket). */
  setBrush(game: Game, brush: EditBrush) {
    game.editBrush = brush;
  }

  /** Keyboard shortcuts and buttons of the editor UI. */
  command(game: Game, command: EditCommand) {
    if (!game.editMode) { return; }
    switch (command) {
      case 'undo': this.undo(game); break;
      case 'redo': this.redo(game); break;
      case 'deselect': this.select(game, null); break;
      case 'delete': this.deleteSelected(game); break;
      case 'togglePassable': this.toggleOption(game, 'passable'); break;
      case 'toggleCanHide': this.toggleOption(game, 'canHide'); break;
      case 'export':
        if (game.mapHelper) {
          downloadChunksFile(game.mapHelper.sceneMap);
        }
        break;
      case 'reset':
        // Back to the map of the code: forget the browser copy and start again from it
        clearTimeout(this.saveTimer);
        clearMapEdits();
        location.reload();
        break;
    }
  }

  /** Called by the map input loop (120 Hz) instead of the player moves while editing. */
  update(game: Game) {
    const held = this.keyService.holdedCodes;
    const speed = KEY_PAN_SPEED * game.cameraZoom;
    const x = (held.includes(KeyCode.right) ? 1 : 0) - (held.includes(KeyCode.left) ? 1 : 0);
    const z = (held.includes(KeyCode.down) ? 1 : 0) - (held.includes(KeyCode.up) ? 1 : 0);
    if (x || z) {
      game.camera.position.x += x * speed;
      game.camera.position.z += z * speed;
      game.mapHelper?.updateCameraAim();
    }
    // Buildings fading / hiding follow the camera target instead of the (frozen) player
    const mapHelper = game.mapHelper;
    if (mapHelper) {
      const target = game.getCameraTarget();
      mapHelper.sceneMap.chunks.forEach(chunk => {
        if (chunk.visible) {
          chunk.buildings.forEach(building => mapHelper.updateVisibleMesh(chunk.id + '-' + building.id, target, building.canHide));
        }
      });
    }
  }

  // --- Selection, move, delete, options ---

  private select(game: Game, picked: Picked | null) {
    this.selected = picked;
    this.refreshSelection(game);
  }

  /** Box around the selected object, and what the UI shows about it. */
  private refreshSelection(game: Game) {
    const picked = this.selected;
    // (instanced or not: the bounds come from the map)
    const bounds = picked && game.mapHelper?.buildingBounds(picked.chunk, picked.building);
    this.selectionHelper.visible = !!bounds;
    if (bounds) {
      this.selectionBox.copy(bounds);
    }
    game.editSelection = picked
      ? { modelId: picked.building.modelId, passable: picked.building.passable, canHide: picked.building.canHide }
      : null;
  }

  /** The object under the mouse (its meshes, not hidden near the camera). */
  private pick(game: Game, clientX: number, clientY: number): Picked | null {
    const mapHelper = game.mapHelper;
    if (!mapHelper) {
      return null;
    }
    this.setRay(game, clientX, clientY);
    const hits = game.raycaster.intersectObjects(mapHelper.pickableBuildingMeshes(), true)
      .filter(hit => ((hit.object as THREE.Mesh).material as THREE.Material)?.colorWrite !== false);
    return hits.length ? mapHelper.findBuilding(hits[0].object, hits[0].instanceId) : null;
  }

  /** Dragging the selected object: it follows the mouse on the ground, snapped to the grid. */
  private dragSelected(game: Game, clientX: number, clientY: number) {
    const drag = this.drag;
    const ground = this.groundAt(game, clientX, clientY);
    if (!drag?.grab || !ground || !this.selected || !game.mapHelper) {
      return;
    }
    const to = ground.add(drag.grab);
    to.set(Math.round(to.x / GRID) * GRID, Math.round(ground.y * 1000) / 1000, Math.round(to.z / GRID) * GRID);
    if (game.mapHelper.moveBuilding(this.selected.chunk, this.selected.building, to)) {
      this.selected.chunk = this.chunkOf(game, this.selected.building) ?? this.selected.chunk;
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
      this.select(game, { chunk: this.chunkOf(game, building) ?? chunk, building });
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

  private toggleOption(game: Game, option: 'passable' | 'canHide') {
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

  /** The chunk that currently holds a building (it changes when moved across a chunk border). */
  private chunkOf(game: Game, building: SceneBuilding): SceneChunk | undefined {
    return game.mapHelper?.sceneMap.chunks.find(c => c.buildings.includes(building));
  }

  // --- Undo / redo ---

  /** Keeps a change that was just done (a new change forgets the undone ones). */
  private record(game: Game, action: EditAction) {
    this.undoStack.push(action);
    if (this.undoStack.length > HISTORY_SIZE) {
      this.undoStack.shift();
    }
    this.redoStack.length = 0;
    this.updateHistoryFlags(game);
  }

  private undo(game: Game) {
    const action = this.undoStack.pop();
    if (action) {
      action.undo();
      this.redoStack.push(action);
      this.updateHistoryFlags(game);
    }
  }

  private redo(game: Game) {
    const action = this.redoStack.pop();
    if (action) {
      action.redo();
      this.undoStack.push(action);
      this.updateHistoryFlags(game);
    }
  }

  /** Also the moment the map changed (a change, an undo, a redo): it is saved in the browser. */
  private updateHistoryFlags(game: Game) {
    game.editCanUndo = this.undoStack.length > 0;
    game.editCanRedo = this.redoStack.length > 0;
    this.scheduleSave(game);
  }

  private scheduleSave(game: Game) {
    if (!this.undoStack.length && !this.redoStack.length) {
      return; // nothing edited yet (just opened the editor)
    }
    clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => {
      if (game.mapHelper) {
        saveMapEdits(game.mapHelper.sceneMap);
      }
    }, SAVE_DELAY);
  }

  // --- Placing ---

  /** The preview follows the mouse: where its ray hits the ground, snapped to the grid. */
  private moveGhost(game: Game, clientX: number, clientY: number) {
    if (!this.ghost) {
      return;
    }
    const hit = this.groundAt(game, clientX, clientY);
    this.showGhostAt(hit
      ? new THREE.Vector3(Math.round(hit.x / GRID) * GRID, Math.round(hit.y * 1000) / 1000, Math.round(hit.z / GRID) * GRID)
      : null);
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

  /** The orange square follows the cell under the mouse while a tile is selected. */
  private moveBrush(game: Game, clientX: number, clientY: number) {
    const ground = game.editTileId ? this.groundAt(game, clientX, clientY) : null;
    const cell = ground && game.mapHelper?.cellAt(ground.x, ground.z);
    this.brush.visible = !!cell;
    // The square covers the brush size (one cell for the bucket)
    const size = game.editBrush === 'fill' ? 1 : game.editBrush;
    this.brush.scale.set(size, 1, size);
    if (cell) {
      this.brush.position.set(
        cell.chunk.pos.x - cell.chunk.size.x / 2 + cell.col * TILE_SIZE,
        ground.y + 0.3,
        cell.chunk.pos.z - cell.chunk.size.y / 2 + cell.row * TILE_SIZE);
    }
  }

  /**
   * Paints the cells under the brush: a square of `editBrush` cells (from the one under the mouse), or with the
   * bucket ('fill', terrains only), the whole area of the same terrain around it (once per stroke).
   */
  private paintAt(game: Game, clientX: number, clientY: number) {
    const ground = this.groundAt(game, clientX, clientY);
    const mapHelper = game.mapHelper;
    if (!ground || !this.stroke || !mapHelper) {
      return;
    }
    const terrainTool = game.editTileId !== 'raise' && game.editTileId !== 'lower' && game.editTileId !== 'stairs';
    if (game.editBrush === 'fill' && terrainTool) {
      if (!this.stroke.cells.size) {
        this.fillCells(game, ground.x, ground.z).forEach(cell => this.paintCell(game, cell));
      }
      return;
    }
    const size = game.editBrush === 'fill' ? 1 : game.editBrush;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const cell = mapHelper.cellAt(ground.x + i * TILE_SIZE, ground.z + j * TILE_SIZE);
        if (cell) {
          this.paintCell(game, cell);
        }
      }
    }
  }

  /** Bucket: the cells of the same terrain connected to the one at (x, z) (4 neighbors, at most FILL_MAX). */
  private fillCells(game: Game, x: number, z: number): { chunk: SceneChunk, col: number, row: number }[] {
    const mapHelper = game.mapHelper!;
    const start = mapHelper.cellAt(x, z);
    if (!start) {
      return [];
    }
    const terrainOf = (cell: { chunk: SceneChunk, col: number, row: number }) => cell.chunk.tiles?.[cell.col + ',' + cell.row];
    const target = terrainOf(start);
    const centerOf = (cell: { chunk: SceneChunk, col: number, row: number }) => [
      cell.chunk.pos.x - cell.chunk.size.x / 2 + (cell.col + 0.5) * TILE_SIZE,
      cell.chunk.pos.z - cell.chunk.size.y / 2 + (cell.row + 0.5) * TILE_SIZE,
    ];
    const seen = new Set<string>();
    const result: { chunk: SceneChunk, col: number, row: number }[] = [];
    const queue = [start];
    while (queue.length && result.length < FILL_MAX) {
      const cell = queue.shift()!;
      const key = cell.chunk.id + ':' + cell.col + ',' + cell.row;
      if (seen.has(key) || terrainOf(cell) !== target) {
        continue;
      }
      seen.add(key);
      result.push(cell);
      const [cx, cz] = centerOf(cell);
      for (const [dx, dz] of [[TILE_SIZE, 0], [-TILE_SIZE, 0], [0, TILE_SIZE], [0, -TILE_SIZE]]) {
        const next = mapHelper.cellAt(cx + dx, cz + dz);
        if (next) {
          queue.push(next);
        }
      }
    }
    return result;
  }

  /** One cell of a stroke, with the current tool (terrain, eraser, height, stairs). */
  private paintCell(game: Game, cell: { chunk: SceneChunk, col: number, row: number }) {
    if (!this.stroke || !game.mapHelper) {
      return;
    }
    const key = cell.chunk.id + ':' + cell.col + ',' + cell.row;
    if (game.editTileId === 'raise' || game.editTileId === 'lower') {
      // Height tool: one level up / down per cell and per stroke
      if (!this.stroke.levels.has(key)) {
        const before = game.mapHelper.levelAt(cell.chunk, cell.col, cell.row);
        const after = before + (game.editTileId === 'raise' ? 1 : -1);
        game.mapHelper.setLevel(cell.chunk, cell.col, cell.row, after);
        this.stroke.levels.set(key, { ...cell, before, after: game.mapHelper.levelAt(cell.chunk, cell.col, cell.row) });
      }
      return;
    }
    // Stairs tool puts stairs, the eraser removes them (with the painted terrain)
    if (game.editTileId === 'stairs' || game.editTileId === 'erase') {
      const before = stairsSide(cell.chunk.stairs?.[cell.col + ',' + cell.row]);
      if (!this.stroke.stairs.has(key) && (before || game.editTileId === 'stairs')) {
        game.mapHelper.setStairs(cell.chunk, cell.col, cell.row, game.editTileId === 'stairs' ? 'auto' : null);
        const after = stairsSide(cell.chunk.stairs?.[cell.col + ',' + cell.row]);
        this.stroke.stairs.set(key, { ...cell, before, after });
      }
      if (game.editTileId === 'stairs') {
        return;
      }
    }
    const after = game.editTileId === 'erase' ? null : game.editTileId;
    const before = cell.chunk.tiles?.[cell.col + ',' + cell.row] ?? null;
    if (before === after) {
      return;
    }
    if (!this.stroke.cells.has(key)) {
      this.stroke.cells.set(key, { ...cell, before, after });
    }
    game.mapHelper.paintCell(cell.chunk, cell.col, cell.row, after);
  }

  /** A stroke is undone / redone as a whole. */
  private endStroke(game: Game) {
    const cells = [...(this.stroke?.cells.values() ?? [])];
    const levels = [...(this.stroke?.levels.values() ?? [])].filter(l => l.before !== l.after);
    const stairs = [...(this.stroke?.stairs.values() ?? [])];
    this.stroke = null;
    if ((!cells.length && !levels.length && !stairs.length) || !game.mapHelper) {
      return;
    }
    const mapHelper = game.mapHelper;
    this.record(game, {
      undo: () => {
        cells.forEach(c => mapHelper.paintCell(c.chunk, c.col, c.row, c.before));
        levels.forEach(l => mapHelper.setLevel(l.chunk, l.col, l.row, l.before));
        stairs.forEach(s => mapHelper.setStairs(s.chunk, s.col, s.row, s.before));
      },
      redo: () => {
        cells.forEach(c => mapHelper.paintCell(c.chunk, c.col, c.row, c.after));
        levels.forEach(l => mapHelper.setLevel(l.chunk, l.col, l.row, l.after));
        stairs.forEach(s => mapHelper.setStairs(s.chunk, s.col, s.row, s.after));
      },
    });
  }

  // --- Mouse rays, camera ---

  private setRay(game: Game, clientX: number, clientY: number) {
    const rect = game.canvas.getBoundingClientRect();
    this.pointer.set((clientX - rect.left) / rect.width * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    game.raycaster.setFromCamera(this.pointer, game.camera);
  }

  /** Point of the ground under the mouse (null = no ground there). */
  private groundAt(game: Game, clientX: number, clientY: number): THREE.Vector3 | null {
    if (!game.mapHelper) {
      return null;
    }
    this.setRay(game, clientX, clientY);
    const grounds = game.mapHelper.sceneMap.chunks
      .filter(chunk => chunk.visible)
      .flatMap(chunk => chunk.grounds.filter(g => g.passable && g.mesh).map(g => g.mesh!));
    return game.raycaster.intersectObjects(grounds, false)[0]?.point.clone() ?? null;
  }

  /**
   * Drag: the ground follows the mouse. A screen pixel covers `worldPerPixel` world units at the camera target;
   * vertically the ground is seen at an angle, so a pixel covers more ground (÷ sin of the camera pitch).
   */
  private pan(game: Game, dx: number, dy: number) {
    const camera = game.camera;
    const offset = game.cameraOffset();
    const distance = offset.length();
    const worldPerPixel = 2 * distance * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) / game.canvas.clientHeight;
    const pitchSin = offset.y / distance;
    camera.position.x -= dx * worldPerPixel;
    camera.position.z -= dy * worldPerPixel / pitchSin;
    game.mapHelper?.updateCameraAim();
  }

  /** Zooms around the point the camera looks at (it stays at the same place on screen). */
  private setZoom(game: Game, zoom: number) {
    const target = game.getCameraTarget();
    game.cameraZoom = THREE.MathUtils.clamp(zoom, ZOOM_MIN, ZOOM_MAX);
    game.camera.position.copy(target).add(game.cameraOffset());
    this.updateFar(game);
    game.mapHelper?.updateCameraAim();
  }

  /** The far plane follows the zoom, so zooming out doesn't cut the map. */
  private updateFar(game: Game) {
    game.camera.far = (TOO_FAR_LIMIT + SHADE_OFFSET) * Math.max(1, game.cameraZoom);
    game.camera.updateProjectionMatrix();
  }
}
