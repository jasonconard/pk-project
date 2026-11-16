/**
 * A song of the music editor: a loop of 1 to 8 bars of 16 steps, notes placed on the degrees of a scale (never a
 * wrong note) by melodic instruments, and drum hits. Saved as JSON (browser), played by music-engine.ts.
 */

export type InstrumentId = 'lead' | 'bell' | 'pluck' | 'bass' | 'pad';
export type DrumId = 'kick' | 'snare' | 'hat';
export type ModeId = 'major' | 'minor' | 'pentaMajor' | 'pentaMinor' | 'dorian' | 'blues';

export interface SongNote {
  /** 0 .. bars × 16 − 1 */
  step: number;
  /** Degree of the scale from the lowest row (0 = the tonic, 2 octaves lower than the top row). */
  degree: number;
  instrument: InstrumentId;
}

export interface DrumHit {
  step: number;
  drum: DrumId;
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
}

export const STEPS_PER_BAR = 16;
export const MAX_BARS = 8;
export const MIN_BPM = 50;
export const MAX_BPM = 180;

export const INSTRUMENTS: { id: InstrumentId, label: string, color: string }[] = [
  { id: 'lead', label: 'Mélodie', color: '#ff6b6b' },
  { id: 'bell', label: 'Cloche', color: '#ffd34d' },
  { id: 'pluck', label: 'Corde', color: '#6bcb77' },
  { id: 'bass', label: 'Basse', color: '#4d96ff' },
  { id: 'pad', label: 'Nappe', color: '#c77dff' },
];

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
