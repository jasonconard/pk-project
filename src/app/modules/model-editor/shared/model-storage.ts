import { EditableModel, FaceTexture } from "./EditableModel";
import {
  readJson,
  removeKey,
  writeJson,
} from "../../../core/shared/local-store";

/**
 * The edited models are kept in the browser's IndexedDB (room for hundreds of MB, where localStorage has ~5 MB
 * shared with the map edits): database `pk-project`, store `models`, one record per model id, pixels kept as
 * typed arrays. The models saved in localStorage by the first versions are moved there once.
 */
const DB_NAME = "pk-project";
const DB_VERSION = 1;
const STORE = "models";
const MODEL_VERSION = 1;
/** localStorage key of the first versions (moved to IndexedDB, then removed). */
const LEGACY_KEY = "pk-model-edits";

interface ModelRecord {
  id: string;
  version: number;
  model: EditableModel;
}

let db: Promise<IDBDatabase> | null = null;

function request<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function done(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = tx.onabort = () => reject(tx.error);
  });
}

function openDb(): Promise<IDBDatabase> {
  db ??= new Promise<IDBDatabase>((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () =>
      req.result.createObjectStore(STORE, { keyPath: "id" });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  }).then(async (database) => {
    await moveLegacyModels(database);
    return database;
  });
  db.catch(() => (db = null)); // try again next time (blocked, private mode…)
  return db;
}

async function store(
  mode: IDBTransactionMode
): Promise<{ tx: IDBTransaction; models: IDBObjectStore }> {
  const tx = (await openDb()).transaction(STORE, mode);
  return { tx, models: tx.objectStore(STORE) };
}

/** Ids of the models saved in the browser. */
export async function storedModelIds(): Promise<string[]> {
  try {
    const { models } = await store("readonly");
    return (await request(models.getAllKeys())).map(String);
  } catch {
    return [];
  }
}

export async function loadStoredModel(
  id: string
): Promise<EditableModel | null> {
  try {
    const { models } = await store("readonly");
    const record = (await request(models.get(id))) as ModelRecord | undefined;
    return record?.version === MODEL_VERSION ? record.model : null;
  } catch {
    return null;
  }
}

/** All the models saved in the browser. */
export async function loadStoredModels(): Promise<EditableModel[]> {
  try {
    const { models } = await store("readonly");
    return ((await request(models.getAll())) as ModelRecord[])
      .filter((r) => r.version === MODEL_VERSION)
      .map((r) => r.model);
  } catch {
    return [];
  }
}

/** Saves the model in the browser (`previousId`: its id before a rename, forgotten). Returns false if it failed. */
export async function saveStoredModel(
  model: EditableModel,
  previousId?: string
): Promise<boolean> {
  try {
    const { tx, models } = await store("readwrite");
    if (previousId && previousId !== model.id) {
      models.delete(previousId);
    }
    models.put({
      id: model.id,
      version: MODEL_VERSION,
      model,
    } satisfies ModelRecord);
    await done(tx);
    keepStorage();
    return true;
  } catch {
    return false;
  }
}

export async function forgetStoredModel(id: string) {
  try {
    const { tx, models } = await store("readwrite");
    models.delete(id);
    await done(tx);
  } catch {
    // Nothing saved anyway
  }
}

/** Replaces every model saved in the browser (project file import). Returns false if it failed. */
export async function replaceStoredModels(
  list: EditableModel[]
): Promise<boolean> {
  try {
    const { tx, models } = await store("readwrite");
    models.clear();
    list.forEach((model) =>
      models.put({
        id: model.id,
        version: MODEL_VERSION,
        model,
      } satisfies ModelRecord)
    );
    await done(tx);
    keepStorage();
    return true;
  } catch {
    return false;
  }
}

/** Asks the browser not to clear the saved models when it runs out of room (granted or not, silently). */
let persistAsked = false;
function keepStorage() {
  if (!persistAsked) {
    persistAsked = true;
    navigator.storage?.persist?.().catch(() => {});
  }
}

export function toBase64(bytes: Uint8Array | Uint8ClampedArray): string {
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x80_00) {
    s += String.fromCharCode(...bytes.subarray(i, i + 0x80_00));
  }
  return btoa(s);
}

// --- Models saved in localStorage by the first versions ---

type LegacyTexture = { w: number; h: number } & Partial<
  Record<"color" | "specular" | "night" | "bump", string>
>;
type LegacyModel = Omit<EditableModel, "textures"> & {
  textures: Record<string, LegacyTexture>;
};

export function fromBase64(text: string): Uint8ClampedArray {
  const s = atob(text);
  const bytes = new Uint8ClampedArray(s.length);
  for (let i = 0; i < s.length; i++) {
    bytes[i] = s.charCodeAt(i);
  }
  return bytes;
}

async function moveLegacyModels(database: IDBDatabase) {
  const legacy = readJson<{ models?: Record<string, LegacyModel> }>(LEGACY_KEY);
  if (!legacy?.models) {
    return;
  }
  const tx = database.transaction(STORE, "readwrite");
  const models = tx.objectStore(STORE);
  Object.values(legacy.models).forEach((stored) => {
    const textures: Record<string, FaceTexture> = {};
    Object.entries(stored.textures).forEach(([texId, t]) => {
      textures[texId] = {
        w: t.w,
        h: t.h,
        color: fromBase64(t.color ?? ""),
        specular: t.specular ? fromBase64(t.specular) : undefined,
        night: t.night ? fromBase64(t.night) : undefined,
        bump: t.bump ? fromBase64(t.bump) : undefined,
      };
    });
    models.put({
      id: stored.id,
      version: MODEL_VERSION,
      model: { ...stored, textures },
    } satisfies ModelRecord);
  });
  await done(tx);
  // (not removed: moved anyway; read again next time, written over with the same models)
  removeKey(LEGACY_KEY);
}

const RECENT_COLORS_KEY = "pk-model-recent-colors";

export function loadRecentColors(): string[] {
  const colors = readJson<unknown>(RECENT_COLORS_KEY);
  return Array.isArray(colors)
    ? colors.filter((c) => typeof c === "string")
    : [];
}

export function saveRecentColors(colors: string[]) {
  // (only a convenience: not kept when the browser refuses)
  writeJson(RECENT_COLORS_KEY, colors);
}

const PALETTE_KEY = "pk-model-palette";

/** Palette imported from a file, and whether drawing is limited to its colors. */
export interface StoredPalette {
  name: string;
  colors: string[];
  locked: boolean;
}

export function loadImportedPalette(): StoredPalette | null {
  const palette = readJson<StoredPalette>(PALETTE_KEY);
  return palette && Array.isArray(palette.colors) && palette.colors.length > 0
    ? palette
    : null;
}

export function saveImportedPalette(palette: StoredPalette | null) {
  // (only a convenience: not kept when the browser refuses)
  if (palette) {
    writeJson(PALETTE_KEY, palette);
  } else {
    removeKey(PALETTE_KEY);
  }
}
