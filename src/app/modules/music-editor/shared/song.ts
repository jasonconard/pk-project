/**
 * A song of the music editor: a loop of 1 to 8 bars of 16 steps, notes placed on the degrees of a scale (never a
 * wrong note) by melodic instruments, and drum hits. Saved as JSON (browser), played by music-engine.ts.
 */

import { INSTRUMENT_DEFS } from './instruments';

export type InstrumentId = keyof typeof INSTRUMENT_DEFS;
export type DrumId = 'kick' | 'snare' | 'hat';
export type ModeId = 'major' | 'minor' | 'pentaMajor' | 'pentaMinor' | 'dorian' | 'blues';

export interface SongNote {
  /** 0 .. bars × 16 − 1 */
  step: number;
  /** Degree of the scale from the lowest row (0 = the tonic, 2 octaves lower than the top row). */
  degree: number;
  instrument: InstrumentId;
  /** Steps held (1 when not set). */
  length?: number;
}

export interface DrumHit {
  step: number;
  drum: DrumId;
}

/** A volume per channel: each melodic instrument and the drums. */
export type Channel = InstrumentId | 'drums';

/** The lo-fi sound, every value 0..1 (0 = clean). */
export interface LofiSettings {
  /** Warmth: a low-pass filter that closes (muffled, like an old radio). */
  warmth: number;
  /** Grain: fewer volume steps (bit crusher), a gritty old sampler. */
  grain: number;
  /** Wobble: the pitch floats, like a worn tape. */
  wobble: number;
  /** Hiss: a soft breath of noise. */
  hiss: number;
  /** Vinyl: crackles. */
  vinyl: number;
  /** Swing: every second sixteenth a little late (laid-back groove). */
  swing: number;
  /** Space: a light reverb, like in a room. */
  reverb: number;
}

export interface Song {
  id: string;
  name: string;
  /** Beats (quarter notes) per minute; a step is a sixteenth. */
  bpm: number;
  /** Tonic, 0 = Do … 11 = Si. */
  tonic: number;
  mode: ModeId;
  bars: number;
  notes: SongNote[];
  drums: DrumHit[];
  /** Volume per channel, 0..1.5 (1 when not set). */
  mix?: Partial<Record<Channel, number>>;
  /** Lo-fi sound (clean when not set). */
  lofi?: LofiSettings;
  /** The stamps of the song's bar (6 to 8 instruments chosen in the library); DEFAULT_STAMPS when not set. */
  stamps?: InstrumentId[];
}

export const STEPS_PER_BAR = 16;
export const MAX_BARS = 8;
export const MIN_BPM = 50;
export const MAX_BPM = 180;

export const INSTRUMENTS: { id: InstrumentId, label: string, color: string }[] =
  (Object.keys(INSTRUMENT_DEFS) as InstrumentId[]).map(id => ({ id, label: INSTRUMENT_DEFS[id].label, color: INSTRUMENT_DEFS[id].color }));

export const DRUMS: { id: DrumId, label: string }[] = [
  { id: 'kick', label: 'Grosse caisse' },
  { id: 'snare', label: 'Caisse claire' },
  { id: 'hat', label: 'Charley' },
];

export const MODES: { id: ModeId, label: string, hint: string, intervals: number[] }[] = [
  { id: 'major', label: 'Majeur', hint: 'Joyeux, lumineux', intervals: [0, 2, 4, 5, 7, 9, 11] },
  { id: 'minor', label: 'Mineur', hint: 'Mélancolique, la nuit', intervals: [0, 2, 3, 5, 7, 8, 10] },
  { id: 'pentaMajor', label: 'Penta. majeure', hint: 'Simple, toujours juste', intervals: [0, 2, 4, 7, 9] },
  { id: 'pentaMinor', label: 'Penta. mineure', hint: 'Lo-fi, rêveur', intervals: [0, 3, 5, 7, 10] },
  { id: 'dorian', label: 'Dorien', hint: 'Mystérieux, donjon', intervals: [0, 2, 3, 5, 7, 9, 10] },
  { id: 'blues', label: 'Blues', hint: 'Cool, nonchalant', intervals: [0, 3, 5, 6, 7, 10] },
];

/** Stamps of a song that hasn't chosen them (the original five). */
export const DEFAULT_STAMPS: InstrumentId[] = ['lead', 'bell', 'pluck', 'bass', 'pad'];
export const MAX_STAMPS = 8;

/** The song's stamps, and the instruments its notes use that aren't among them (so that they can be reached). */
export function stampsOf(song: Song): InstrumentId[] {
  const stamps = [...(song.stamps ?? DEFAULT_STAMPS)];
  for (const note of song.notes) {
    if (!stamps.includes(note.instrument)) {
      stamps.push(note.instrument);
    }
  }
  return stamps;
}

export const CHANNELS: { id: Channel, label: string, color: string }[] = [
  ...INSTRUMENTS,
  { id: 'drums', label: 'Batterie', color: '#e8e8ee' },
];

/** No lo-fi effect; a light reverb by default. */
export const CLEAN: LofiSettings = { warmth: 0, grain: 0, wobble: 0, hiss: 0, vinyl: 0, swing: 0, reverb: 0.2 };

export const LOFI_SETTINGS: { id: keyof LofiSettings, label: string, hint: string }[] = [
  { id: 'warmth', label: 'Chaleur', hint: 'Son étouffé, comme une vieille radio' },
  { id: 'grain', label: 'Grain', hint: 'Son granuleux de vieil échantillonneur' },
  { id: 'wobble', label: 'Flottement', hint: 'La note ondule, comme une cassette usée' },
  { id: 'hiss', label: 'Souffle', hint: 'Un léger bruit de fond' },
  { id: 'vinyl', label: 'Vinyle', hint: 'Des craquements de disque' },
  { id: 'swing', label: 'Swing', hint: 'Le rythme se balance, plus nonchalant' },
  { id: 'reverb', label: 'Espace', hint: 'Un peu d\'écho, comme dans une pièce' },
];

export const LOFI_PRESETS: { id: string, label: string, settings: LofiSettings }[] = [
  { id: 'clean', label: 'Propre', settings: CLEAN },
  { id: 'soft', label: 'Lo-fi doux', settings: { warmth: 0.45, grain: 0.1, wobble: 0.25, hiss: 0.15, vinyl: 0.2, swing: 0.3, reverb: 0.3 } },
  { id: 'tape', label: 'Cassette', settings: { warmth: 0.6, grain: 0.25, wobble: 0.6, hiss: 0.35, vinyl: 0, swing: 0.2, reverb: 0.15 } },
  { id: 'vinyl', label: 'Vieux vinyle', settings: { warmth: 0.7, grain: 0.2, wobble: 0.2, hiss: 0.2, vinyl: 0.65, swing: 0.35, reverb: 0.25 } },
  { id: 'chip', label: 'Console 8 bits', settings: { warmth: 0.1, grain: 0.7, wobble: 0, hiss: 0, vinyl: 0, swing: 0, reverb: 0.1 } },
];

/** Ready-made drum patterns (steps of one bar), copied on every bar. */
export const DRUM_PATTERNS: { id: string, label: string, hint: string, kick: number[], snare: number[], hat: number[] }[] = [
  { id: 'basic', label: 'Simple', hint: 'Grosse caisse 1 et 3, caisse claire 2 et 4',
    kick: [0, 8], snare: [4, 12], hat: [0, 2, 4, 6, 8, 10, 12, 14] },
  { id: 'boombap', label: 'Lo-fi', hint: 'Boom bap décontracté',
    kick: [0, 7, 10], snare: [4, 12], hat: [0, 2, 4, 6, 8, 10, 12, 14, 15] },
  { id: 'calm', label: 'Calme', hint: 'Moitié moins vite, pour la ville ou la nuit',
    kick: [0], snare: [8], hat: [0, 4, 8, 12] },
  { id: 'battle', label: 'Combat', hint: 'Énergique, charley sur chaque croche',
    kick: [0, 8, 10], snare: [4, 12], hat: [0, 2, 4, 6, 8, 10, 12, 14] },
  { id: 'dance', label: 'Danse', hint: 'Grosse caisse sur chaque temps',
    kick: [0, 4, 8, 12], snare: [4, 12], hat: [2, 6, 10, 14] },
  { id: 'none', label: 'Aucun', hint: 'Pas de batterie', kick: [], snare: [], hat: [] },
];

export function volumeOf(song: Song, channel: Channel): number {
  return song.mix?.[channel] ?? 1;
}

export function noteLength(note: SongNote): number {
  return note.length ?? 1;
}

/** The song's lo-fi settings (the ones added since its last save at their default). */
export function lofiOf(song: Song): LofiSettings {
  return { ...CLEAN, ...song.lofi };
}

/** When a song plays in the game: by day, by night, under the rain, in a fight (the dungeons will come later). */
export type MusicSlot = 'day' | 'night' | 'rain' | 'fight';
/** Song id per slot. */
export type MusicUse = Partial<Record<MusicSlot, string>>;
/** Songs of one map (map id → its slots), over the songs of every map: a slot left empty takes theirs. */
export type MapMusicUse = Record<string, MusicUse>;

/** The slots of a map: its own choices over the ones of every map. */
export function mapSlots(use: MusicUse, mapUse: MapMusicUse, mapId: string): MusicUse {
  return { ...use, ...mapUse[mapId] };
}

export const MUSIC_SLOTS: { id: MusicSlot, label: string, hint: string }[] = [
  { id: 'day', label: 'Jour', hint: 'Sur la carte, le jour' },
  { id: 'night', label: 'Nuit', hint: 'Sur la carte, la nuit (sinon : celle du jour)' },
  { id: 'rain', label: 'Pluie', hint: 'Bruine, averse, orage, mousson… (sinon : jour ou nuit)' },
  { id: 'fight', label: 'Combat', hint: 'Pendant un combat' },
];

/** French note names (with the usual sharps / flats). */
export const NOTE_NAMES = ['Do', 'Do♯', 'Ré', 'Mi♭', 'Mi', 'Fa', 'Fa♯', 'Sol', 'La♭', 'La', 'Si♭', 'Si'];
/** MIDI note of the lowest row's tonic when it is Do (Do2, French numbering: Do3 = middle C). */
const LOWEST_DO = 48;

export function modeOf(song: Song) {
  return MODES.find(m => m.id === song.mode) ?? MODES[1];
}

/** Rows of the grid: two octaves of the scale and the tonic above (top row first). */
export function degreeCount(song: Song): number {
  return modeOf(song).intervals.length * 2 + 1;
}

/** MIDI note of a degree of the song's scale. */
export function degreeMidi(song: Song, degree: number): number {
  const intervals = modeOf(song).intervals;
  const octave = Math.floor(degree / intervals.length);
  return LOWEST_DO + song.tonic + 12 * octave + intervals[degree % intervals.length];
}

/** "La", 2 (French octave numbering) */
export function midiName(midi: number): { name: string, octave: number } {
  return { name: NOTE_NAMES[midi % 12], octave: Math.floor(midi / 12) - 2 };
}

export function songLength(song: Song): number {
  return song.bars * STEPS_PER_BAR;
}

export function scaleLabel(song: Song): string {
  return `${NOTE_NAMES[song.tonic]} ${modeOf(song).label.toLowerCase()}`;
}

export function newSong(name = 'Nouveau morceau'): Song {
  return {
    id: crypto.randomUUID(), name, bpm: 84, tonic: 9, mode: 'minor', bars: 4,
    notes: [],
    // A beat to start from: kick on 1 and 3, snare on 2 and 4, hats on the eighths
    drums: Array.from({ length: 4 }, (_, bar) => [
      { step: bar * 16, drum: 'kick' as DrumId }, { step: bar * 16 + 8, drum: 'kick' as DrumId },
      { step: bar * 16 + 4, drum: 'snare' as DrumId }, { step: bar * 16 + 12, drum: 'snare' as DrumId },
      ...[0, 2, 4, 6, 8, 10, 12, 14].map(s => ({ step: bar * 16 + s, drum: 'hat' as DrumId })),
    ]).flat(),
  };
}
