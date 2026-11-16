import { newSong, Song } from './song';

/** The songs, saved in the browser (a few kB of JSON each): { songs, current }. */
const STORAGE_KEY = 'pk-songs';

interface Stored {
  songs: Song[];
  current: string;
}

export function loadSongs(): Stored {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const stored = raw ? JSON.parse(raw) as Stored : null;
    if (stored?.songs?.length) {
      return stored;
    }
  } catch {
    // unreadable: a new song
  }
  const song = newSong('Ville le jour');
  return { songs: [song], current: song.id };
}

export function saveSongs(stored: Stored): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // storage full / private browsing: kept for this session only
  }
}
