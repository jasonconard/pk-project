import { MapMusicUse, MusicUse, Song } from '../../app/modules/music-editor/shared/song';

/**
 * Songs of the game and which one plays when (day, night, rain, fight), on every map and
 * on given maps (map id → its slots, over the general ones). Written by the music editor's export
 * (/#/musique → Jeu → Exporter); the songs saved in the browser replace these ones (same id).
 */
export const CODE_SONGS: Song[] = [];

export const CODE_MUSIC_USE: MusicUse = {};

export const CODE_MAP_MUSIC_USE: MapMusicUse = {};
