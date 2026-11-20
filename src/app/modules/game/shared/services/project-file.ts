import { replaceStoredMaps, StoredMaps, storedMapsData } from './map-storage';
import { fromBase64, loadStoredModels, replaceStoredModels, toBase64 } from '../../../model-editor/shared/model-storage';
import { EditableModel, FaceTexture } from '../../../model-editor/shared/EditableModel';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { replaceStoredSongs, StoredSongs, storedSongsData } from '../../../music-editor/shared/song-storage';
import { replaceStoredVariables, StoredVariables, storedVariablesData } from '../../../variables-editor/shared/variable-storage';
import { replaceStoredDatabase, StoredDatabase, storedDatabaseData } from '../../../database-editor/shared/database-storage';

/**
 * The game project file (`.pk`): every creation saved in the browser (maps, models, songs, variables, database) in one file, to move them
 * between the phone and the computer. Gzipped JSON; the models' pixels in base64. Importing replaces every creation.
 */
const FORMAT = 'pk-project';
const FORMAT_VERSION = 1;
const LAYERS = ['color', 'specular', 'night', 'bump'] as const;

type FileTexture = { w: number, h: number } & Partial<Record<typeof LAYERS[number], string>>;
type FileModel = Omit<EditableModel, 'textures'> & { textures: Record<string, FileTexture> };

export interface ProjectFile {
  format: typeof FORMAT;
  version: number;
  /** Version of the app that wrote it. */
  appVersion: string;
  /** ISO date. */
  savedAt: string;
  maps: StoredMaps;
  models: FileModel[];
  songs: StoredSongs | null;
  /** Missing in the files written before the variables editor (same format version: nothing to forget). */
  variables?: StoredVariables | null;
  /** Missing in the files written before the database editor. */
  database?: StoredDatabase | null;
}

/** What a project holds, shown before importing. */
export interface ProjectSummary {
  maps: number;
  models: number;
  songs: number;
  variables: number;
  /** The project has its own database (else the game's comes back). */
  database: boolean;
  savedAt: string;
  appVersion: string;
}

export function summarize(project: ProjectFile): ProjectSummary {
  return {
    maps: Object.keys(project.maps.maps).length,
    models: project.models.length,
    songs: project.songs?.songs.length ?? 0,
    variables: project.variables?.variables.length ?? 0,
    database: !!project.database,
    savedAt: project.savedAt,
    appVersion: project.appVersion,
  };
}

function toFileModel(model: EditableModel): FileModel {
  const textures: Record<string, FileTexture> = {};
  Object.entries(model.textures).forEach(([id, t]) => {
    const texture: FileTexture = { w: t.w, h: t.h };
    LAYERS.forEach(layer => {
      const bytes = t[layer];
      if (bytes) {
        texture[layer] = toBase64(bytes);
      }
    });
    textures[id] = texture;
  });
  return { ...model, textures };
}

function fromFileModel(model: FileModel): EditableModel {
  const textures: Record<string, FaceTexture> = {};
  Object.entries(model.textures).forEach(([id, t]) => {
    textures[id] = {
      w: t.w, h: t.h, color: fromBase64(t.color ?? ''),
      specular: t.specular ? fromBase64(t.specular) : undefined,
      night: t.night ? fromBase64(t.night) : undefined,
      bump: t.bump ? fromBase64(t.bump) : undefined,
    };
  });
  return { ...model, textures };
}

async function pipe(data: Blob, stream: CompressionStream | DecompressionStream): Promise<Blob> {
  return new Response(data.stream().pipeThrough(stream)).blob();
}

/** Everything saved in the browser, as a project. */
export async function collectProject(appVersion: string): Promise<ProjectFile> {
  return {
    format: FORMAT,
    version: FORMAT_VERSION,
    appVersion,
    savedAt: new Date().toISOString(),
    maps: storedMapsData(),
    models: (await loadStoredModels()).map(toFileModel),
    songs: storedSongsData(),
    variables: storedVariablesData(),
    database: storedDatabaseData(),
  };
}

/** The `.pk` file of a project: its name (`pk-projet-2026-11-19.pk`) and its gzipped content. */
export async function projectFileBlob(project: ProjectFile): Promise<{ name: string, blob: Blob }> {
  const json = new Blob([JSON.stringify(project)], { type: 'application/json' });
  const blob = await pipe(json, new CompressionStream('gzip'));
  return { name: `pk-projet-${project.savedAt.slice(0, 10)}.pk`, blob: new Blob([blob], { type: 'application/octet-stream' }) };
}

/** The Android app can't download a file: it shares it instead (Drive, mail, Bluetooth, Files…). */
export const SHARES_PROJECT = Capacitor.isNativePlatform();

/**
 * Android app: writes the `.pk` file in the app cache and opens the Android share sheet with it. Resolves false if
 * the player closed the share sheet without choosing an app.
 */
export async function shareProjectFile(name: string, blob: Blob): Promise<boolean> {
  const { uri } = await Filesystem.writeFile({
    path: name,
    data: toBase64(new Uint8Array(await blob.arrayBuffer())),
    directory: Directory.Cache,
  });
  try {
    await Share.share({ title: name, dialogTitle: 'Envoyer le projet de jeu', files: [uri] });
    return true;
  } catch (e) {
    if (/cancel/i.test((e as Error)?.message ?? '')) {
      return false;
    }
    throw e;
  }
}

/** Reads a `.pk` file (gzipped or plain JSON). Throws an Error with a message for the player if it isn't one. */
export async function readProjectFile(file: Blob): Promise<ProjectFile> {
  let project: ProjectFile;
  try {
    const head = new Uint8Array(await file.slice(0, 2).arrayBuffer());
    const gzipped = head[0] === 0x1f && head[1] === 0x8b;
    const text = await (gzipped ? await pipe(file, new DecompressionStream('gzip')) : file).text();
    project = JSON.parse(text);
  } catch {
    throw new Error('Ce fichier n\'est pas un projet .pk lisible.');
  }
  if (project?.format !== FORMAT || !project.maps?.maps || !Array.isArray(project.models)) {
    throw new Error('Ce fichier n\'est pas un projet .pk.');
  }
  if (project.version > FORMAT_VERSION) {
    throw new Error(`Projet fait avec une version plus récente (v${project.appVersion}) : mettez le jeu à jour.`);
  }
  return project;
}

/**
 * Replaces every creation saved in the browser by the project's. The game must be reloaded afterwards (what is
 * shown and kept in memory is the old project). Throws an Error with a message for the player if it failed.
 */
export async function applyProject(project: ProjectFile): Promise<void> {
  if (!replaceStoredMaps(project.maps)) {
    throw new Error('Les cartes de ce projet ne sont pas lisibles par cette version du jeu.');
  }
  if (!await replaceStoredModels(project.models.map(fromFileModel))) {
    throw new Error('Les modèles n\'ont pas pu être enregistrés (plus de place ?).');
  }
  replaceStoredSongs(project.songs);
  replaceStoredVariables(project.variables);
  replaceStoredDatabase(project.database);
}
