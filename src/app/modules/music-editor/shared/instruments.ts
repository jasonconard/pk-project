/**
 * The instruments of the music editor, described as data (no code per instrument): oscillator layers, ADSR envelope,
 * filter (with a sweep), FM, delayed vibrato, breath. Played by music-engine.ts.
 * `gm`: the closest General MIDI program (0..127), for a future MIDI import / export.
 */

/** Oscillator waves: the Web Audio ones, pulses of other duty cycles (12.5, 25, 75 %), the 4-bit GBA wave. */
export type Wave = 'sine' | 'triangle' | 'sawtooth' | 'square' | 'pulse12' | 'pulse25' | 'pulse75' | 'wave4';

export type InstrumentFamily = 'melody' | 'harmony' | 'pad' | 'bass';

export interface InstrumentDef {
  label: string;
  family: InstrumentFamily;
  color: string;
  gm: number;
  /** Loudness at the top of the attack. */
  peak: number;
  /** Attack and decay / release times (s), sustain level (0..1 of the peak). */
  env: { a: number, d: number, s: number, r: number };
  /**
   * 'held': the note sounds as long as it is held on the grid (`short`: length of a one-step note, in steps;
   * `minSteps`: never shorter); 'ring': it decays by itself (`short`: its ring, s), longer when held.
   */
  kind: 'held' | 'ring';
  short: number;
  minSteps?: number;
  layers: { wave: Wave, ratio?: number, detune?: number, gain?: number }[];
  /** Filter on the voice; `sweepTo` (× the note's frequency, at least `sweepMin` Hz) reached with `sweepTime`. */
  filter?: { type: BiquadFilterType, freq: number, q?: number, sweepTo?: number, sweepMin?: number, sweepTime?: number };
  /** Frequency modulation of the first layer: a sine at `ratio` × the frequency, `index` × the frequency deep,
   * fading with the time constant `time`. */
  fm?: { ratio: number, index: number, time: number };
  /** Vibrato: `cents` deep at `rate` Hz, starting after `delay` s. */
  vibrato?: { rate: number, cents: number, delay: number };
  /** Breath: filtered noise under the tone (flute). */
  breath?: { gain: number, freq: number };
}

/**
 * The instruments by id. The first five are the original ones (same sound): lead, bell, pluck, bass, pad.
 * (Values: brief docs/BRIEF_INSTRUMENTS_MUSIQUE.md, to tune by ear.)
 */
export const INSTRUMENT_DEFS = {
  lead: {
    label: 'Mélodie', family: 'melody', color: '#ff6b6b', gm: 80, peak: 0.13,
    env: { a: 0.005, d: 0.24, s: 0.55, r: 0.12 }, kind: 'held', short: 1.6,
    layers: [{ wave: 'square' }], filter: { type: 'lowpass', freq: 3200 },
  },
  bell: {
    label: 'Cloche', family: 'harmony', color: '#ffd34d', gm: 9, peak: 0.22,
    env: { a: 0.003, d: 1.5, s: 0, r: 0.9 }, kind: 'ring', short: 1.6,
    layers: [{ wave: 'sine' }], fm: { ratio: 3.5, index: 2.2, time: 0.25 },
  },
  pluck: {
    label: 'Corde', family: 'harmony', color: '#6bcb77', gm: 24, peak: 0.2,
    env: { a: 0.002, d: 0.54, s: 0, r: 0.3 }, kind: 'ring', short: 0.9,
    layers: [{ wave: 'sawtooth' }],
    filter: { type: 'lowpass', freq: 5000, q: 1.5, sweepTo: 1.5, sweepMin: 300, sweepTime: 0.06 },
  },
  bass: {
    label: 'Basse', family: 'bass', color: '#4d96ff', gm: 33, peak: 0.32,
    env: { a: 0.006, d: 0.36, s: 0.6, r: 0.15 }, kind: 'held', short: 1.8,
    layers: [{ wave: 'triangle' }, { wave: 'sine', ratio: 0.5 }],
  },
  pad: {
    label: 'Nappe', family: 'pad', color: '#c77dff', gm: 89, peak: 0.07,
    env: { a: 0.12, d: 1.2, s: 0.8, r: 1.05 }, kind: 'held', short: 4, minSteps: 4,
    layers: [{ wave: 'sawtooth', detune: -8 }, { wave: 'sawtooth', detune: 8 }], filter: { type: 'lowpass', freq: 1400 },
  },
} satisfies Record<string, InstrumentDef>;
