import { SceneMap, StairsSide } from '../model/SceneMap';
import { SceneBuilding } from '../model/SceneBuilding';
import { PlayerDirection } from '../model/ScenePlayer';
import { KeyCode } from '../../../../core/shared/model/PressedKey';
import { InstructionType } from '../model/SceneEventInstruction';
import { LEGACY_TILE_IDS } from '../model/Terrain';

/** Browser storage key of the map edited in the editor. */
const STORAGE_KEY = 'pk-map-edits';
const STORAGE_VERSION = 1;
/** File the exported chunks go to (all the world chunks live in it), relative to src/assets/map/world/. */
export const EXPORT_FILE_NAME = 'ck-pallet-town.ts';

/** What is kept of a chunk: its content (position and size never change in the editor). */
interface StoredChunk {
  buildings: Omit<SceneBuilding, 'originModel'>[];
  /** Painted ground tiles. */
  tiles?: Record<string, string>;
  /** Ground levels (reliefs). */
  heights?: Record<string, number>;
  /** Stairs cells. */
  stairs?: Record<string, StairsSide | boolean>;
}

interface StoredMap {
  version: number;
  chunks: Record<string, StoredChunk>;
}

/** Building data without the runtime fields (resolved model, meshes). */
function cleanBuilding(building: SceneBuilding): Omit<SceneBuilding, 'originModel'> {
  const { originModel, ...data } = building;
  return data;
}

/**
 * Replaces the chunks content by the one saved in the browser by the editor (before the map is built).
 * Returns true if there was a saved map.
 */
export function loadMapEdits(map: SceneMap): boolean {
  let stored: StoredMap | null = null;
  try {
    stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
  } catch {
    stored = null;
  }
  if (!stored || stored.version !== STORAGE_VERSION || !stored.chunks) {
    return false;
  }
  map.chunks.forEach(chunk => {
    const saved = stored!.chunks[chunk.id];
    if (saved?.buildings) {
      chunk.buildings = saved.buildings.map(b => ({ ...b }));
    }
    if (saved?.heights) {
      chunk.heights = { ...saved.heights };
    }
    if (saved?.stairs) {
      chunk.stairs = { ...saved.stairs };
    }
    if (saved?.tiles) {
      // (tiles of the first version renamed / dropped)
      chunk.tiles = {};
      Object.entries(saved.tiles).forEach(([cell, id]) => {
        const terrain = id in LEGACY_TILE_IDS ? LEGACY_TILE_IDS[id] : id;
        if (terrain) {
          chunk.tiles![cell] = terrain;
        }
      });
    }
  });
  return true;
}

/** Saves the chunks content in the browser. */
export function saveMapEdits(map: SceneMap) {
  const stored: StoredMap = { version: STORAGE_VERSION, chunks: {} };
  map.chunks.forEach(chunk => stored.chunks[chunk.id] = { buildings: chunk.buildings.map(cleanBuilding), tiles: chunk.tiles, heights: chunk.heights, stairs: chunk.stairs });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Storage full or blocked: the edits only live until the page is reloaded
  }
}

/** Forgets the edits saved in the browser (the map comes back to the code version). */
export function clearMapEdits() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing saved anyway
  }
}

// --- Export as TypeScript source (to put back in the repo) ---

/** Name of the exported constant of a chunk: 'pallet-town-ne' → PC_PALLET_TOWN_NE. */
function constName(chunkId: string): string {
  return 'PC_' + chunkId.toUpperCase().replace(/[^A-Z0-9]+/g, '_');
}

/** Enums written by name (readable source) instead of their number. */
const ENUM_KEYS: Record<string, [string, Record<number, string>]> = {
  direction: ['PlayerDirection', PlayerDirection],
  pressedKeys: ['KeyCode', KeyCode],
  type: ['InstructionType', InstructionType],
};

/** A value as TypeScript source, indented like the hand-written chunk files. */
function toSource(value: unknown, indent: string, key?: string): string {
  const inner = indent + '  ';
  if (key && key in ENUM_KEYS && (typeof value === 'number' || Array.isArray(value))) {
    const [enumName, values] = ENUM_KEYS[key];
    const name = (n: unknown) => typeof n === 'number' && values[n] ? `${enumName}.${values[n]}` : JSON.stringify(n);
    return Array.isArray(value) ? `[${value.map(name).join(', ')}]` : name(value);
  }
  if (Array.isArray(value)) {
    if (!value.length) {
      return '[]';
    }
    return `[\n${value.map(v => inner + toSource(v, inner)).join(',\n')}\n${indent}]`;
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined);
    // Small flat objects (positions, sizes) on one line
    if (entries.every(([, v]) => typeof v !== 'object' || v === null) && entries.length <= 4) {
      return `{ ${entries.map(([k, v]) => `${propName(k)}: ${toSource(v, inner, k)}`).join(', ')} }`;
    }
    return `{\n${entries.map(([k, v]) => `${inner}${propName(k)}: ${toSource(v, inner, k)}`).join(',\n')}\n${indent}}`;
  }
  return typeof value === 'string' ? `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'` : JSON.stringify(value);
}

function propName(key: string): string {
  return /^[A-Za-z_$][\w$]*$/.test(key) ? key : `'${key}'`;
}

/** The chunks file (same constants as the hand-written one, so world.ts doesn't change). */
export function exportChunksFile(map: SceneMap): string {
  const header = [
    `import { SceneChunk } from '../../../../app/modules/game/shared/model/SceneMap';`,
    `import { PlayerDirection } from '../../../../app/modules/game/shared/model/ScenePlayer';`,
    `import { KeyCode } from '../../../../app/core/shared/model/PressedKey';`,
    `import { InstructionType } from '../../../../app/modules/game/shared/model/SceneEventInstruction';`,
    '',
    '// Generated by the map editor (export). Edit the map in the game (B key), then export again.',
    '',
    '',
  ].join('\n');
  const chunks = map.chunks.map(chunk => {
    const data = {
      id: chunk.id,
      pos: chunk.pos,
      size: chunk.size,
      buildings: chunk.buildings.map(cleanBuilding),
      grounds: chunk.grounds.map(({ mesh, ...ground }) => ground),
      tiles: chunk.tiles && Object.keys(chunk.tiles).length ? chunk.tiles : undefined,
      heights: chunk.heights && Object.keys(chunk.heights).length ? chunk.heights : undefined,
      stairs: chunk.stairs && Object.keys(chunk.stairs).length ? chunk.stairs : undefined,
    };
    return `export const ${constName(chunk.id)}: SceneChunk = ${toSource(data, '')};\n`;
  });
  return header + chunks.join('\n');
}

/** Hands the exported file to the browser (download). */
export function downloadChunksFile(map: SceneMap) {
  const blob = new Blob([exportChunksFile(map)], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = EXPORT_FILE_NAME;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
