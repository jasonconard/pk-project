import { MusicEngine } from "../../../music-editor/shared/music-engine";
import {
  MapMusicUse,
  mapSlots,
  MusicSlot,
  MusicUse,
  Song,
} from "../../../music-editor/shared/song";
import { loadGameMusic } from "../../../music-editor/shared/song-storage";
import { onGameAsleep } from "../../../../core/shared/app-visibility";

/** Fade out of the song that stops, fade in of the next one (s). */
const FADE_OUT = 0.9;
const FADE_IN = 1.4;

/**
 * The game's music: the song chosen in the music editor for the moment (fight, rain, night, day) on the current map
 * (its own choices, else the ones of every map), changed with a fade. A slot without a song falls back to the closest one (night → day, rain → night or day, day → night); a
 * fight without its song keeps the current one. Starts at the first touch / key (browsers block sound before),
 * silent in the background.
 */
export class GameMusic {
  private readonly engine = new MusicEngine();
  private songs: Song[];
  private use: MusicUse;
  private mapUse: MapMusicUse;
  /** The map the player is on. */
  private mapId = "";
  /** The last moment asked for (the song is chosen again when the songs change). */
  private slot: { slot: MusicSlot; night: boolean } = {
    slot: "day",
    night: false,
  };
  private unlocked = false;
  private volume = 0;
  /** Song heard now (null during a fade out), song asked for, song being switched to (playing or after the fade). */
  private playing: Song | null = null;
  private wanted: Song | null = null;
  private target: Song | null = null;
  private switchTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    const music = loadGameMusic();
    this.songs = music.songs;
    this.use = music.use;
    this.mapUse = music.mapUse;
    const unlock = () => {
      if (!this.unlocked) {
        this.unlocked = true;
        this.apply();
      }
    };
    for (const event of ["pointerup", "keydown", "touchend"]) {
      window.addEventListener(event, unlock, { capture: true, passive: true });
    }
    onGameAsleep((hidden) => this.engine.setSuspended(hidden));
  }

  /** Volume 0..1 (0: no music). */
  setVolume(volume: number): void {
    this.volume = volume;
    if (this.playing) {
      this.engine.setOutput(volume, 0.15);
    }
    this.apply();
  }

  /** The moment of the game: its song (or the closest one) plays. */
  setSlot(slot: MusicSlot, night: boolean): void {
    this.slot = { slot, night };
    const song = this.songFor(slot, night);
    if (song === null && slot === "fight") {
      return; // no fight music: the current one goes on
    }
    this.wanted = song;
    this.apply();
  }

  /** The map the player is on: its songs (changed with a fade when they differ). */
  setMap(mapId: string): void {
    if (mapId !== this.mapId) {
      this.mapId = mapId;
      this.setSlot(this.slot.slot, this.slot.night);
    }
  }

  /**
   * The songs and the choices of moments read again (back from the music editor): the song of the moment starts
   * again, with the changes.
   */
  reload(): void {
    const music = loadGameMusic();
    this.songs = music.songs;
    this.use = music.use;
    this.mapUse = music.mapUse;
    this.target = null;
    this.setSlot(this.slot.slot, this.slot.night);
  }

  private songFor(slot: MusicSlot, night: boolean): Song | null {
    // The songs tried in order (a missing one falls back to the next)
    const orders: Record<MusicSlot, MusicSlot[]> = {
      fight: ["fight"],
      rain: ["rain", night ? "night" : "day", "day", "night"],
      night: ["night", "day"],
      day: ["day", "night"],
    };
    const order = orders[slot];
    const use = mapSlots(this.use, this.mapUse, this.mapId);
    for (const s of order) {
      const song = this.songs.find((x) => x.id === use[s]);
      if (song) {
        return song;
      }
    }
    return null;
  }

  /** Plays the wanted song: the current one fades out first. */
  private apply(): void {
    const wanted = this.volume > 0 ? this.wanted : null;
    if (!this.unlocked || wanted?.id === this.target?.id) {
      return;
    }
    this.target = wanted;
    clearTimeout(this.switchTimer);
    const start = () => {
      this.playing = wanted;
      this.engine.stop();
      if (wanted) {
        this.engine.setOutput(0, 0.01);
        this.engine.play(wanted, 0);
        this.engine.setOutput(this.volume, FADE_IN);
      }
    };
    if (this.playing) {
      this.engine.setOutput(0, FADE_OUT);
      this.playing = null;
      this.switchTimer = setTimeout(start, FADE_OUT * 1000);
    } else {
      start();
    }
  }
}
