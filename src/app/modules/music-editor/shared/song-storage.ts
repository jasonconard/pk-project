import { CODE_MAP_MUSIC_USE, CODE_MUSIC_USE, CODE_SONGS } from '../../../../assets/music/music';
import { MapMusicUse, MusicUse, newSong, Song } from './song';

/** The songs, saved in the browser (a few kB of JSON each): { songs, current, use, mapUse }. */
const STORAGE_KEY = 'pk-songs';

export interface StoredSongs {
  songs: Song[];
  current: string;
  /** Which song plays when in the game. */
  use?: MusicUse;
  /** Which song plays when on given maps (over `use`). */
  mapUse?: MapMusicUse;
}

/** The songs saved in the browser, null if none (for the project file). */
export function storedSongsData(): StoredSongs | null {
  return readStored();
}

/** Replaces the songs saved in the browser (project file import); null forgets them (the code's play again). */
export function replaceStoredSongs(stored: StoredSongs | null): void {
  if (stored?.songs?.length) {
    saveSongs(stored);
  } else {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to forget
    }
  }
}

function readStored(): StoredSongs | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const stored = raw ? JSON.parse(raw) as StoredSongs : null;
    return stored?.songs?.length ? stored : null;
  } catch {
    return null; // unreadable
  }
}

/** The editor's songs: the browser's, else the game's (code), else a new one. */
export function loadSongs(): StoredSongs {
  const stored = readStored();
  if (stored) {
    return stored;
  }
  if (CODE_SONGS.length) {
    return { songs: structuredClone(CODE_SONGS), current: CODE_SONGS[0].id, use: { ...CODE_MUSIC_USE }, mapUse: structuredClone(CODE_MAP_MUSIC_USE) };
  }
  const song = newSong('Ville le jour');
  return { songs: [song], current: song.id };
}

export function saveSongs(stored: StoredSongs): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // storage full / private browsing: kept for this session only
  }
}

/**
 * The game's music: the code's songs (src/assets/music/music.ts), replaced by the browser's with the same id, and the
 * browser's choices of songs per slot (every map, and per map) over the code's.
 */
export function loadGameMusic(): { songs: Song[], use: MusicUse, mapUse: MapMusicUse } {
  const stored = readStored();
  const songs = new Map(CODE_SONGS.map(s => [s.id, s]));
  stored?.songs.forEach(s => songs.set(s.id, s));
  const mapUse: MapMusicUse = {};
  for (const id of new Set([...Object.keys(CODE_MAP_MUSIC_USE), ...Object.keys(stored?.mapUse ?? {})])) {
    mapUse[id] = { ...CODE_MAP_MUSIC_USE[id], ...stored?.mapUse?.[id] };
  }
  return { songs: [...songs.values()], use: { ...CODE_MUSIC_USE, ...stored?.use }, mapUse };
}
