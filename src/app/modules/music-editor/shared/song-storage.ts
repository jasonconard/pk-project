import { CODE_MUSIC_USE, CODE_SONGS } from '../../../../assets/music/music';
import { MusicUse, newSong, Song } from './song';

/** The songs, saved in the browser (a few kB of JSON each): { songs, current, use }. */
const STORAGE_KEY = 'pk-songs';

export interface StoredSongs {
  songs: Song[];
  current: string;
  /** Which song plays when in the game. */
  use?: MusicUse;
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
    return { songs: structuredClone(CODE_SONGS), current: CODE_SONGS[0].id, use: { ...CODE_MUSIC_USE } };
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
 * browser's choices of songs per slot over the code's.
 */
export function loadGameMusic(): { songs: Song[], use: MusicUse } {
  const stored = readStored();
  const songs = new Map(CODE_SONGS.map(s => [s.id, s]));
  stored?.songs.forEach(s => songs.set(s.id, s));
  return { songs: [...songs.values()], use: { ...CODE_MUSIC_USE, ...stored?.use } };
}
