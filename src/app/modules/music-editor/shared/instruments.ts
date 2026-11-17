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
 * The instruments by id, by family. The original five keep their id and sound: lead, bell, pluck, bass, pad.
 * (Values: starting points, to tune by ear.)
 */
export const INSTRUMENT_DEFS = {
  // --- Melody ---
  lead: {
    label: 'Carré 50 %', family: 'melody', color: '#ff6b6b', gm: 80, peak: 0.13,
    env: { a: 0.005, d: 0.24, s: 0.55, r: 0.12 }, kind: 'held', short: 1.6,
    layers: [{ wave: 'square' }], filter: { type: 'lowpass', freq: 3200 },
  },
  pulse25: {
    label: 'Carré 25 %', family: 'melody', color: '#ff9f6b', gm: 80, peak: 0.13,
    env: { a: 0.005, d: 0.08, s: 0.6, r: 0.08 }, kind: 'held', short: 1.6,
    layers: [{ wave: 'pulse25' }],
  },
  pulse12: {
    label: 'Carré 12,5 %', family: 'melody', color: '#ffb86b', gm: 80, peak: 0.12,
    env: { a: 0.005, d: 0.08, s: 0.6, r: 0.08 }, kind: 'held', short: 1.6,
    layers: [{ wave: 'pulse12' }],
  },
  pulse75: {
    label: 'Carré 75 %', family: 'melody', color: '#e85d75', gm: 80, peak: 0.13,
    env: { a: 0.005, d: 0.08, s: 0.6, r: 0.08 }, kind: 'held', short: 1.6,
    layers: [{ wave: 'pulse75' }],
  },
  flute: {
    label: 'Flûte douce', family: 'melody', color: '#ffc78a', gm: 73, peak: 0.17,
    env: { a: 0.09, d: 0.1, s: 0.7, r: 0.15 }, kind: 'held', short: 1.8,
    layers: [{ wave: 'triangle' }, { wave: 'sine', ratio: 2, gain: 0.08 }],
    vibrato: { rate: 5, cents: 12, delay: 0.2 }, breath: { gain: 0.35, freq: 2400 },
  },
  ocarina: {
    label: 'Ocarina', family: 'melody', color: '#ff7eb6', gm: 79, peak: 0.19,
    env: { a: 0.04, d: 0.1, s: 0.8, r: 0.12 }, kind: 'held', short: 1.8,
    layers: [{ wave: 'sine' }], vibrato: { rate: 5.5, cents: 10, delay: 0.25 },
  },
  // --- Harmony, arpeggios ---
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
  harp: {
    label: 'Harpe', family: 'harmony', color: '#f5e663', gm: 46, peak: 0.26,
    env: { a: 0.002, d: 0.45, s: 0, r: 0.1 }, kind: 'ring', short: 0.6,
    layers: [{ wave: 'triangle' }], filter: { type: 'lowpass', freq: 3000 },
  },
  celesta: {
    label: 'Célesta', family: 'harmony', color: '#b6f07a', gm: 8, peak: 0.2,
    env: { a: 0.002, d: 0.6, s: 0.1, r: 0.2 }, kind: 'ring', short: 0.9,
    layers: [{ wave: 'sine' }, { wave: 'sine', ratio: 2, gain: 0.15 }], fm: { ratio: 1, index: 0.4, time: 0.15 },
  },
  nylon: {
    label: 'Guitare nylon', family: 'harmony', color: '#3fbf9f', gm: 24, peak: 0.2,
    env: { a: 0.002, d: 0.4, s: 0.05, r: 0.12 }, kind: 'ring', short: 0.7,
    layers: [{ wave: 'sawtooth', gain: 0.7 }, { wave: 'triangle', gain: 0.5 }],
    filter: { type: 'lowpass', freq: 2000, sweepTo: 2.5, sweepMin: 700, sweepTime: 0.12 },
  },
  // --- Pads ---
  strings: {
    label: 'Cordes', family: 'pad', color: '#e08dff', gm: 48, peak: 0.06,
    env: { a: 0.32, d: 0.3, s: 0.8, r: 0.4 }, kind: 'held', short: 2, minSteps: 2,
    layers: [{ wave: 'sawtooth', detune: -7 }, { wave: 'sawtooth', detune: 7 }], filter: { type: 'lowpass', freq: 2500 },
  },
  softpad: {
    label: 'Pad doux', family: 'pad', color: '#a78bfa', gm: 88, peak: 0.12,
    env: { a: 0.5, d: 0.3, s: 0.9, r: 0.6 }, kind: 'held', short: 4, minSteps: 4,
    layers: [{ wave: 'triangle' }, { wave: 'triangle', detune: 5 }], filter: { type: 'lowpass', freq: 1500 },
  },
  // --- Bass ---
  bass: {
    label: 'Basse', family: 'bass', color: '#4d96ff', gm: 33, peak: 0.32,
    env: { a: 0.006, d: 0.36, s: 0.6, r: 0.15 }, kind: 'held', short: 1.8,
    layers: [{ wave: 'triangle' }, { wave: 'sine', ratio: 0.5 }],
  },
  wavebass: {
    label: 'Basse onde', family: 'bass', color: '#4dd2ff', gm: 38, peak: 0.3,
    env: { a: 0.005, d: 0.1, s: 0.9, r: 0.06 }, kind: 'held', short: 1.8,
    layers: [{ wave: 'wave4' }],
  },
  pickbass: {
    label: 'Basse pincée', family: 'bass', color: '#6b7bff', gm: 34, peak: 0.4,
    env: { a: 0.002, d: 0.2, s: 0.3, r: 0.08 }, kind: 'held', short: 1.4,
    layers: [{ wave: 'triangle' }], filter: { type: 'lowpass', freq: 800 },
  },
  pad: {
    label: 'Nappe synthé', family: 'pad', color: '#c77dff', gm: 89, peak: 0.07,
    env: { a: 0.12, d: 1.2, s: 0.8, r: 1.05 }, kind: 'held', short: 4, minSteps: 4,
    layers: [{ wave: 'sawtooth', detune: -8 }, { wave: 'sawtooth', detune: 8 }], filter: { type: 'lowpass', freq: 1400 },
  },
} satisfies Record<string, InstrumentDef>;

export const FAMILIES: { id: InstrumentFamily, label: string }[] = [
  { id: 'melody', label: 'Mélodie' },
  { id: 'harmony', label: 'Harmonie et arpèges' },
  { id: 'pad', label: 'Nappes' },
  { id: 'bass', label: 'Basses' },
];
