import { ChunkGround, MapKind, SceneChunk, SceneMap, StairsSide } from '../model/SceneMap';
import { SceneBuilding } from '../model/SceneBuilding';
import { Vec2, Vec3 } from '../model/SceneUtils';
import { PlayerDirection } from '../model/ScenePlayer';
import { KeyCode } from '../../../../core/shared/model/PressedKey';
import { InstructionType } from '../model/SceneEventInstruction';
import { LEGACY_TILE_IDS } from '../model/Terrain';
import { downloadFile, SourceEnums, toSource } from '../util/ts-source';
import { CODE_MAPS, DEFAULT_MAP_ID } from '../../../../../assets/map/maps';

/**
 * The maps edited in the editor, saved in the browser: one entry per map (the code's maps edited, the maps made in
 * the browser). A map is the code's one (src/assets/map/maps.ts) with the browser's copy over it.
 */
const STORAGE_KEY = 'pk-maps';
const STORAGE_VERSION = 2;
/** Key of the first version (the world map only), moved to STORAGE_KEY once. */
const LEGACY_KEY = 'pk-map-edits';

/** A chunk as data (without its meshes, its buildings without their resolved model). */
interface StoredChunk {
  id: string;
  pos: Vec3;
  size: Vec2;
  buildings: Omit<SceneBuilding, 'originModel'>[];
  grounds: Omit<ChunkGround, 'mesh'>[];
  /** Painted ground tiles. */
  tiles?: Record<string, string>;
  /** Ground levels (reliefs). */
  heights?: Record<string, number>;
  /** Stairs cells. */
  stairs?: Record<string, StairsSide | boolean>;
}

interface StoredMap {
  name: string;
  kind: MapKind;
  spawn?: Vec3;
  /** Every chunk of the map, in order. */
  chunks: StoredChunk[];
}

interface StoredMaps {
  version: number;
  maps: Record<string, StoredMap>;
  /** Map the game was on (opened again at the next start). */
  current?: string;
}

/** A map in the lists: where it comes from, whether the browser has changes to it. */
export interface MapSummary {
  id: string;
  name: string;
  kind: MapKind;
  /** In the code (src/assets/map): can be reset to it. */
  inCode: boolean;
  /** Changed in the browser. */
  edited: boolean;
  /** Size in chunks (columns × rows of the area its chunks cover). */
  cols: number;
  rows: number;
}

/** Side of a chunk made in the editor (world units: 32 × 32 cells). */
export const CHUNK_SIZE = 512;
/** Ground of a new chunk. */
const NEW_GROUND_LINK = 'assets/tex/ground2.png';

/** Building data without the runtime fields (resolved model, meshes). */
function cleanBuilding(building: SceneBuilding): Omit<SceneBuilding, 'originModel'> {
  const { originModel, ...data } = building;
  return data;
}

/** A chunk as plain data (nothing of the scene: copied safely). */
function chunkData(chunk: SceneChunk): StoredChunk {
  const data: StoredChunk = {
    id: chunk.id,
    pos: chunk.pos,
    size: chunk.size,
    buildings: chunk.buildings.map(cleanBuilding),
    grounds: chunk.grounds.map(({ mesh, ...ground }) => ground),
  };
  if (chunk.tiles && Object.keys(chunk.tiles).length) {
    data.tiles = chunk.tiles;
  }
  if (chunk.heights && Object.keys(chunk.heights).length) {
    data.heights = chunk.heights;
  }
  if (chunk.stairs && Object.keys(chunk.stairs).length) {
    data.stairs = chunk.stairs;
  }
  return data;
}

/** Tiles of the first versions renamed / dropped. */
function currentTiles(tiles: Record<string, string> | undefined): Record<string, string> | undefined {
  if (!tiles) {
    return undefined;
  }
  const result: Record<string, string> = {};
  Object.entries(tiles).forEach(([cell, id]) => {
    const terrain = id in LEGACY_TILE_IDS ? LEGACY_TILE_IDS[id] : id;
    if (terrain) {
      result[cell] = terrain;
    }
  });
  return result;
}

function readStored(): StoredMaps {
  let stored: StoredMaps | null = null;
  try {
    stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
  } catch {
    stored = null;
  }
  if (!stored || stored.version !== STORAGE_VERSION || !stored.maps) {
    stored = { version: STORAGE_VERSION, maps: {} };
  }
  migrateLegacy(stored);
  return stored;
}

function writeStored(stored: StoredMaps) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Storage full or blocked: the edits only live until the page is reloaded
  }
}

/** The world map edits of the first version ({ version: 1, chunks: { id: content } }) become the world map's entry. */
function migrateLegacy(stored: StoredMaps) {
  let legacy: { version: number, chunks: Record<string, Partial<StoredChunk>> } | null = null;
  try {
    legacy = JSON.parse(localStorage.getItem(LEGACY_KEY) ?? 'null');
  } catch {
    legacy = null;
  }
  if (!legacy) {
    return;
  }
  const world = CODE_MAPS.find(m => m.id === DEFAULT_MAP_ID);
  if (world && legacy.version === 1 && legacy.chunks && !stored.maps[world.id]) {
    stored.maps[world.id] = {
      name: world.name,
      kind: world.kind,
      spawn: world.spawn,
      chunks: world.chunks.map(chunk => ({ ...chunkData(chunk), ...legacy!.chunks[chunk.id] })),
    };
    writeStored(stored);
  }
  try {
    localStorage.removeItem(LEGACY_KEY);
  } catch {
    // (read again next time: the world entry exists, nothing changes)
  }
}

/** Columns × rows of the area covered by chunks. */
function gridSize(chunks: { pos: Vec3, size: Vec2 }[]): { cols: number, rows: number } {
  if (!chunks.length) {
    return { cols: 0, rows: 0 };
  }
  const minX = Math.min(...chunks.map(c => c.pos.x - c.size.x / 2));
  const maxX = Math.max(...chunks.map(c => c.pos.x + c.size.x / 2));
  const minZ = Math.min(...chunks.map(c => c.pos.z - c.size.y / 2));
  const maxZ = Math.max(...chunks.map(c => c.pos.z + c.size.y / 2));
  return { cols: Math.round((maxX - minX) / CHUNK_SIZE), rows: Math.round((maxZ - minZ) / CHUNK_SIZE) };
}

/** The maps: the code's ones first, then those made in the browser. */
export function listMaps(): MapSummary[] {
  const stored = readStored().maps;
  const fromCode = CODE_MAPS.map(map => ({
    id: map.id,
    name: stored[map.id]?.name ?? map.name,
    kind: stored[map.id]?.kind ?? map.kind,
    inCode: true,
    edited: !!stored[map.id],
    ...gridSize(stored[map.id]?.chunks ?? map.chunks),
  }));
  const fromBrowser = Object.entries(stored)
    .filter(([id]) => !CODE_MAPS.some(map => map.id === id))
    .map(([id, map]) => ({ id, name: map.name, kind: map.kind, inCode: false, edited: true, ...gridSize(map.chunks) }));
  return [...fromCode, ...fromBrowser];
}

/** The map the game was on last time (the default one when unknown). */
export function currentMapId(): string {
  const id = readStored().current;
  return id && listMaps().some(map => map.id === id) ? id : DEFAULT_MAP_ID;
}

export function setCurrentMapId(id: string) {
  const stored = readStored();
  if (stored.current !== id) {
    stored.current = id;
    writeStored(stored);
  }
}

/** A free id from a name: 'Grotte de cristal – étage 2' → 'grotte-de-cristal-etage-2' (-2, -3… when taken). */
function newMapId(name: string): string {
  const base = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'carte';
  const taken = new Set(listMaps().map(map => map.id));
  let id = base;
  for (let i = 2; taken.has(id); i++) {
    id = `${base}-${i}`;
  }
  return id;
}

/** A new chunk of grass at a place of the chunk grid (column, row: its middle at col × CHUNK_SIZE, row × CHUNK_SIZE). */
export function newChunk(id: string, col: number, row: number): SceneChunk {
  const half = CHUNK_SIZE / 2;
  return {
    id,
    pos: { x: col * CHUNK_SIZE, y: 0, z: row * CHUNK_SIZE },
    size: { x: CHUNK_SIZE, y: CHUNK_SIZE },
    buildings: [],
    grounds: [{
      id: 'main-ground',
      link: NEW_GROUND_LINK,
      points: {
        a: { x: -half, y: 0, z: -half },
        b: { x: half, y: 0, z: -half },
        c: { x: half, y: 0, z: half },
        d: { x: -half, y: 0, z: half },
      },
      passable: true,
      canHide: true,
    }],
  };
}

/** A new map of cols × rows chunks of grass, saved in the browser; its arrival point in the middle chunk. */
export function createMap(name: string, kind: MapKind, cols: number, rows: number): string {
  const id = newMapId(name);
  const chunks: SceneChunk[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      chunks.push(newChunk(`${id}-${col}-${row}`, col, row));
    }
  }
  // (in the middle of the middle chunk: not on a border between chunks)
  const spawn = { x: Math.floor((cols - 1) / 2) * CHUNK_SIZE, y: 0, z: Math.floor((rows - 1) / 2) * CHUNK_SIZE };
  saveMap({ id, name, kind, spawn, chunks });
  return id;
}

/** A copy of a map (its browser version), under a new name. */
export function duplicateMap(id: string, name: string): string | null {
  const map = loadMap(id);
  if (!map) {
    return null;
  }
  const copyId = newMapId(name);
  saveMap({ ...map, id: copyId, name });
  return copyId;
}

/**
 * A map, ready to be built (a fresh copy each time: building it adds meshes to its chunks). The browser's copy
 * decides the chunks and their content; a chunk that is also in the code keeps the code's place and grounds.
 */
export function loadMap(id: string): SceneMap | null {
  const code = CODE_MAPS.find(map => map.id === id);
  const saved = readStored().maps[id];
  if (!code && !saved) {
    return null;
  }
  const codeChunks = new Map((code?.chunks ?? []).map(chunk => [chunk.id, chunkData(chunk)]));
  const chunks: StoredChunk[] = saved
    ? saved.chunks.map(chunk => {
      const fromCode = codeChunks.get(chunk.id);
      return fromCode ? { ...chunk, pos: fromCode.pos, size: fromCode.size, grounds: fromCode.grounds } : chunk;
    })
    : [...codeChunks.values()];
  const copy: SceneChunk[] = structuredClone(chunks).map(chunk => ({
    ...chunk,
    buildings: chunk.buildings as SceneBuilding[],
    tiles: currentTiles(chunk.tiles),
  }));
  return {
    id,
    name: saved?.name ?? code!.name,
    kind: saved?.kind ?? code!.kind,
    spawn: saved ? saved.spawn : code!.spawn,
    chunks: copy,
  };
}

/** Saves a map in the browser (all of it: it replaces the code's one until reset). */
export function saveMap(map: SceneMap) {
  const stored = readStored();
  stored.maps[map.id] = { name: map.name, kind: map.kind, spawn: map.spawn, chunks: map.chunks.map(chunkData) };
  writeStored(stored);
}

/** Forgets the browser's copy of a map: a code map comes back to the code version, a browser map is deleted. */
export function resetMap(id: string) {
  const stored = readStored();
  delete stored.maps[id];
  writeStored(stored);
}

// --- Export as TypeScript source (to put back in the repo) ---

/** Name of the exported constant of a chunk: 'pallet-town-ne' → PC_PALLET_TOWN_NE. */
function constName(chunkId: string): string {
  return 'PC_' + chunkId.toUpperCase().replace(/[^A-Z0-9]+/g, '_');
}

/** Name of the exported constant of a map: 'world' → WORLD_MAP. */
function mapConstName(mapId: string): string {
  return mapId.toUpperCase().replace(/[^A-Z0-9]+/g, '_') + '_MAP';
}

/** Enums written by name (readable source) instead of their number. */
const ENUM_KEYS: SourceEnums = {
  direction: ['PlayerDirection', PlayerDirection],
  pressedKeys: ['KeyCode', KeyCode],
  type: ['InstructionType', InstructionType],
};

/** File of a map: src/assets/map/<id>/<id>.ts. */
export function mapFileName(map: SceneMap): string {
  return map.id + '.ts';
}

/** The map's file: a constant per chunk, then the map (the constant maps.ts imports). */
export function exportMapFile(map: SceneMap): string {
  const header = [
    `import { SceneChunk, SceneMap } from '../../../app/modules/game/shared/model/SceneMap';`,
    `import { PlayerDirection } from '../../../app/modules/game/shared/model/ScenePlayer';`,
    `import { KeyCode } from '../../../app/core/shared/model/PressedKey';`,
    `import { InstructionType } from '../../../app/modules/game/shared/model/SceneEventInstruction';`,
    '',
    `// Generated by the map editor (export): goes to src/assets/map/${map.id}/${mapFileName(map)}, listed in`,
    '// src/assets/map/maps.ts. Edit the map in the game (B key), then export again.',
    '',
    '',
  ].join('\n');
  const chunks = map.chunks.map(chunk =>
    `export const ${constName(chunk.id)}: SceneChunk = ${toSource(chunkData(chunk), '', undefined, { enums: ENUM_KEYS })};\n`);
  const mapData = [
    `export const ${mapConstName(map.id)}: SceneMap = {`,
    `  id: '${map.id}',`,
    `  name: '${map.name.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',`,
    `  kind: '${map.kind}',`,
    ...(map.spawn ? [`  spawn: { x: ${map.spawn.x}, y: ${map.spawn.y}, z: ${map.spawn.z} },`] : []),
    '  chunks: [',
    ...map.chunks.map(chunk => `    ${constName(chunk.id)},`),
    '  ],',
    '};',
    '',
  ].join('\n');
  return header + chunks.join('\n') + '\n' + mapData;
}

/** Hands the map's file to the browser (download). */
export function downloadMapFile(map: SceneMap) {
  downloadFile(mapFileName(map), exportMapFile(map));
}
