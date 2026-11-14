import { EditableModel, FaceTexture } from './EditableModel';

/** Browser storage key of the models edited in /modeles. */
const STORAGE_KEY = 'pk-model-edits';
const STORAGE_VERSION = 1;
const RECENT_COLORS_KEY = 'pk-model-recent-colors';

type StoredTexture = { w: number, h: number } & Partial<Record<'color' | 'specular' | 'night' | 'bump', string>>;
type StoredModel = Omit<EditableModel, 'textures'> & { textures: Record<string, StoredTexture> };

interface Stored {
  version: number;
  models: Record<string, StoredModel>;
}

function toBase64(bytes: Uint8ClampedArray): string {
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(s);
}

function fromBase64(text: string): Uint8ClampedArray {
  const s = atob(text);
  const bytes = new Uint8ClampedArray(s.length);
  for (let i = 0; i < s.length; i++) {
    bytes[i] = s.charCodeAt(i);
  }
  return bytes;
}

function read(): Stored {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Stored | null;
    if (stored?.version === STORAGE_VERSION && stored.models) {
      return stored;
    }
  } catch {
    // Unreadable or blocked: nothing saved
  }
  return { version: STORAGE_VERSION, models: {} };
}

function write(stored: Stored): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    return true;
  } catch {
    return false; // storage full or blocked: the edits only live until the page is reloaded
  }
}

/** Ids of the models saved in the browser. */
export function storedModelIds(): string[] {
  return Object.keys(read().models);
}

export function loadStoredModel(id: string): EditableModel | null {
  const model = read().models[id];
  if (!model) {
    return null;
  }
  const textures: Record<string, FaceTexture> = {};
  Object.entries(model.textures).forEach(([texId, t]) => {
    textures[texId] = {
      w: t.w, h: t.h, color: fromBase64(t.color ?? ''),
      specular: t.specular ? fromBase64(t.specular) : undefined,
      night: t.night ? fromBase64(t.night) : undefined,
      bump: t.bump ? fromBase64(t.bump) : undefined,
    };
  });
  return { ...model, textures };
}

/** Saves the model in the browser (`previousId`: its id before a rename, forgotten). Returns false if it failed. */
export function saveStoredModel(model: EditableModel, previousId?: string): boolean {
  const stored = read();
  if (previousId && previousId !== model.id) {
    delete stored.models[previousId];
  }
  const textures: Record<string, StoredTexture> = {};
  Object.entries(model.textures).forEach(([texId, t]) => {
    textures[texId] = {
      w: t.w, h: t.h, color: toBase64(t.color),
      specular: t.specular && toBase64(t.specular), night: t.night && toBase64(t.night), bump: t.bump && toBase64(t.bump),
    };
  });
  stored.models[model.id] = { ...model, textures };
  return write(stored);
}

export function forgetStoredModel(id: string) {
  const stored = read();
  delete stored.models[id];
  write(stored);
}

export function loadRecentColors(): string[] {
  try {
    const colors = JSON.parse(localStorage.getItem(RECENT_COLORS_KEY) ?? '[]');
    return Array.isArray(colors) ? colors.filter(c => typeof c === 'string') : [];
  } catch {
    return [];
  }
}

export function saveRecentColors(colors: string[]) {
  try {
    localStorage.setItem(RECENT_COLORS_KEY, JSON.stringify(colors));
  } catch {
    // Only a convenience
  }
}

const PALETTE_KEY = 'pk-model-palette';

/** Palette imported from a file, and whether drawing is limited to its colors. */
export interface StoredPalette {
  name: string;
  colors: string[];
  locked: boolean;
}

export function loadImportedPalette(): StoredPalette | null {
  try {
    const palette = JSON.parse(localStorage.getItem(PALETTE_KEY) ?? 'null') as StoredPalette | null;
    return palette && Array.isArray(palette.colors) && palette.colors.length ? palette : null;
  } catch {
    return null;
  }
}

export function saveImportedPalette(palette: StoredPalette | null) {
  try {
    if (palette) {
      localStorage.setItem(PALETTE_KEY, JSON.stringify(palette));
    } else {
      localStorage.removeItem(PALETTE_KEY);
    }
  } catch {
    // Only a convenience
  }
}
