/**
 * MIDI ↔ songs of the music editor: a song exported as a .mid file (one track per instrument, the drums on channel
 * 10), and a .mid file made elsewhere turned into a song (its tracks chosen and given an instrument, a window of 1 to
 * 8 bars, the notes put on the sixteenth grid and on the degrees of a scale).
 */

import { INSTRUMENT_DEFS } from "./instruments";
import { DRUM_CHANNEL, MidiFile, MidiTrack, writeMidi } from "./midi-file";
import {
  DEFAULT_STAMPS,
  degreeCount,
  degreeMidi,
  DrumHit,
  DrumId,
  InstrumentId,
  MAX_BARS,
  MAX_BPM,
  MAX_STAMPS,
  MIN_BPM,
  ModeId,
  MODES,
  newSong,
  noteLength,
  Song,
  SongNote,
  STEPS_PER_BAR,
} from "./song";

/** Ticks per quarter note of the exported files: a sixteenth is 24 ticks. */
const PPQ = 96;
const DRUM_NOTES: Record<DrumId, number> = { kick: 36, snare: 38, hat: 42 };

/** General MIDI families (8 programs each), in simple French. */
const GM_FAMILIES = [
  "Piano",
  "Percussion chromatique",
  "Orgue",
  "Guitare",
  "Basse",
  "Cordes",
  "Ensemble",
  "Cuivres",
  "Anches",
  "Flûte",
  "Synthé solo",
  "Nappe synthé",
  "Effets synthé",
  "Instrument du monde",
  "Percussion",
  "Effets sonores",
];

/** « Flûte (GM 74) » (programs counted from 1, as in the General MIDI list). */
export function gmLabel(program: number): string {
  return `${GM_FAMILIES[program >> 3]} (GM ${program + 1})`;
}

// --- Export ---

/** The song as a .mid file: its tempo, one track per instrument used, the drums on channel 10, the loop once. */
export function songToMidi(song: Song): Uint8Array<ArrayBuffer> {
  const step = PPQ / 4;
  const used = [...new Set(song.notes.map((n) => n.instrument))];
  const tracks: MidiTrack[] = used.map((instrument, index) => ({
    name: INSTRUMENT_DEFS[instrument].label,
    // Channels 1 to 16 without the drums' 10 (more instruments than that share the last one)
    channel: Math.min(index < DRUM_CHANNEL ? index : index + 1, 15),
    program: INSTRUMENT_DEFS[instrument].gm,
    notes: song.notes
      .filter((n) => n.instrument === instrument)
      .map((n) => ({
        tick: n.step * step,
        duration: noteLength(n) * step,
        pitch: degreeMidi(song, n.degree),
        velocity: 96,
      })),
  }));
  if (song.drums.length > 0) {
    tracks.push({
      name: "Batterie",
      channel: DRUM_CHANNEL,
      program: 0,
      notes: song.drums.map((d) => ({
        tick: d.step * step,
        duration: step / 2,
        pitch: DRUM_NOTES[d.drum],
        velocity: d.drum === "hat" ? 72 : 100,
      })),
    });
  }
  return writeMidi({
    name: song.name,
    ppq: PPQ,
    bpm: song.bpm,
    meter: [4, 4],
    tracks,
  });
}

// --- Import ---

/** The editor's instrument for a General MIDI program: the same one, else one of its family, else by kind. */
export function instrumentForProgram(
  program: number,
  averagePitch = 60
): InstrumentId {
  const ids = Object.keys(INSTRUMENT_DEFS) as InstrumentId[];
  const same = ids.find((id) => INSTRUMENT_DEFS[id].gm === program);
  if (same) {
    return same;
  }
  const family = program >> 3;
  const near = ids.find((id) => INSTRUMENT_DEFS[id].gm >> 3 === family);
  if (near) {
    return near;
  }
  // (a low part without its own program: most often a bass line)
  if (averagePitch < 45) {
    return "bass";
  }
  const byFamily: InstrumentId[] = [
    "pad", // piano
    "bell",
    "softpad", // organ
    "pluck",
    "bass",
    "strings",
    "strings",
    "lead", // brass
    "flute", // reeds
    "flute",
    "lead",
    "softpad",
    "pad",
    "pluck", // ethnic
    "bell",
    "bell",
  ];
  return byFamily[family] ?? "lead";
}

/** A track of the file, as shown in the import window. */
export interface ImportTrack {
  index: number;
  name: string;
  drums: boolean;
  program: number;
  noteCount: number;
  /** The default instrument (`null`: the drums). */
  instrument: InstrumentId | null;
  /** A tiny preview of its notes (an SVG path in a 100 × 20 box). */
  preview: string;
}

/** The file's tracks with notes, its length in bars (16 sixteenths). */
export function describeMidi(file: MidiFile): {
  tracks: ImportTrack[];
  bars: number;
} {
  const barTicks = file.ppq * 4;
  const end = Math.max(
    1,
    ...file.tracks.flatMap((t) => t.notes.map((n) => n.tick + n.duration))
  );
  const tracks = file.tracks.map((track, index) => {
    const drums = track.channel === DRUM_CHANNEL;
    const pitches = track.notes.map((n) => n.pitch);
    const low = Math.min(...pitches);
    const high = Math.max(...pitches);
    const average = pitches.reduce((a, b) => a + b, 0) / pitches.length;
    const preview = track.notes
      .slice(0, 400)
      .map((n) => {
        const x = (n.tick / end) * 100;
        const y = high > low ? 18 - ((n.pitch - low) / (high - low)) * 16 : 9;
        const w = Math.max(0.8, (n.duration / end) * 100);
        return `M${x.toFixed(1)} ${y.toFixed(1)}h${w.toFixed(1)}v2h-${w.toFixed(1)}z`;
      })
      .join("");
    return {
      index,
      name: track.name || `Piste ${index + 1}`,
      drums,
      program: track.program,
      noteCount: track.notes.length,
      instrument: drums ? null : instrumentForProgram(track.program, average),
      preview,
    };
  });
  return { tracks, bars: Math.max(1, Math.ceil(end / barTicks - 0.01)) };
}

export interface ImportChoices {
  /** Track index → its instrument (melodic tracks) or "drums"; tracks left out are not kept. */
  kept: Map<number, InstrumentId | "drums">;
  /** First bar kept (0-based). */
  startBar: number;
  tonic: number;
  mode: ModeId;
}

/** The notes of the kept melodic tracks inside the kept bars (for the scale guess). */
function windowNotes(
  file: MidiFile,
  choices: Omit<ImportChoices, "tonic" | "mode">
) {
  const barTicks = file.ppq * 4;
  const from = choices.startBar * barTicks;
  const to = from + MAX_BARS * barTicks;
  return [...choices.kept]
    .filter(([, use]) => use !== "drums")
    .flatMap(([index]) => file.tracks[index]?.notes ?? [])
    .filter((n) => n.tick >= from - file.ppq / 8 && n.tick < to);
}

/** The scale fitting most of the kept notes (weighted by their length); ties: the tonic heard most. */
export function guessScale(
  file: MidiFile,
  choices: Omit<ImportChoices, "tonic" | "mode">
): { tonic: number; mode: ModeId } {
  const weight = Array.from({ length: 12 }, () => 0);
  for (const note of windowNotes(file, choices)) {
    weight[note.pitch % 12] +=
      Math.min(note.duration, file.ppq * 4) + file.ppq / 4;
  }
  let best = { tonic: 9, mode: "minor" as ModeId, score: -1 };
  for (const mode of MODES) {
    for (let tonic = 0; tonic < 12; tonic++) {
      const fit = mode.intervals.reduce(
        (sum, interval) => sum + weight[(tonic + interval) % 12],
        0
      );
      // (the fit counts most; then how much the tonic itself is heard)
      const score = fit * 1000 + weight[tonic];
      if (score > best.score) {
        best = { tonic, mode: mode.id, score };
      }
    }
  }
  return { tonic: best.tonic, mode: best.mode };
}

const DRUM_MAP: Record<number, DrumId> = {
  35: "kick",
  36: "kick",
  37: "snare",
  38: "snare",
  39: "snare",
  40: "snare",
  42: "hat",
  44: "hat",
  46: "hat",
  49: "hat",
  51: "hat",
  52: "hat",
  53: "hat",
  55: "hat",
  57: "hat",
  59: "hat",
};

/** A new song made from the file with the choices of the import window. */
export function midiToSong(
  file: MidiFile,
  name: string,
  choices: ImportChoices
): Song {
  const song = newSong(name);
  song.bpm = Math.round(Math.min(MAX_BPM, Math.max(MIN_BPM, file.bpm)));
  song.tonic = choices.tonic;
  song.mode = choices.mode;
  const total = describeMidi(file).bars;
  song.bars = Math.max(1, Math.min(MAX_BARS, total - choices.startBar));
  const stepTicks = file.ppq / 4;
  const offset = choices.startBar * STEPS_PER_BAR;
  const length = song.bars * STEPS_PER_BAR;
  const toStep = (tick: number) => Math.round(tick / stepTicks) - offset;

  const notes: SongNote[] = [];
  const drums = new Map<string, DrumHit>();
  for (const [index, use] of choices.kept) {
    const track = file.tracks[index];
    if (!track) {
      continue;
    }
    if (use === "drums") {
      for (const note of track.notes) {
        const step = toStep(note.tick);
        const drum = DRUM_MAP[note.pitch];
        if (drum && step >= 0 && step < length) {
          drums.set(`${step}:${drum}`, { step, drum });
        }
      }
      continue;
    }
    const inWindow = track.notes.filter((n) => {
      const step = toStep(n.tick);
      return step >= 0 && step < length;
    });
    const degrees = trackDegrees(
      song,
      inWindow.map((n) => n.pitch)
    );
    inWindow.forEach((note, i) => {
      const step = toStep(note.tick);
      const steps = Math.max(1, Math.round(note.duration / stepTicks));
      notes.push({
        step,
        degree: degrees[i],
        instrument: use,
        length: Math.min(steps, length - step),
      });
    });
  }
  song.notes = withoutOverlaps(notes);
  song.drums = [...drums.values()].sort((a, b) => a.step - b.step);
  const used = [...new Set(song.notes.map((n) => n.instrument))];
  const stamps = used.slice(0, MAX_STAMPS);
  for (const id of DEFAULT_STAMPS) {
    if (stamps.length < DEFAULT_STAMPS.length && !stamps.includes(id)) {
      stamps.push(id);
    }
  }
  song.stamps = stamps;
  return song;
}

/**
 * The grid's degrees of a track's pitches: the nearest note of the scale, the whole track moved by octaves so that
 * most of it fits the grid (the shape of the melody kept), the notes still out folded in by octaves.
 */
function trackDegrees(song: Song, pitches: number[]): number[] {
  const size = MODES.find((m) => m.id === song.mode)!.intervals.length;
  const count = degreeCount(song);
  // Every degree over a wide range (−5 .. +5 octaves around the grid) and its pitch
  const scale: { degree: number; pitch: number }[] = [];
  for (let degree = -5 * size; degree < 7 * size; degree++) {
    const octave = Math.floor(degree / size);
    const inOctave = degree - octave * size;
    scale.push({
      degree,
      pitch: degreeMidi(song, inOctave) + 12 * octave,
    });
  }
  const nearest = pitches.map((pitch) => {
    let best = scale[0];
    for (const item of scale) {
      if (Math.abs(item.pitch - pitch) < Math.abs(best.pitch - pitch)) {
        best = item;
      }
    }
    return best.degree;
  });
  let shift = 0;
  let bestFit = -1;
  for (const octaves of [0, -1, 1, -2, 2, -3, 3, -4, 4, -5, 5]) {
    const fit = nearest.filter((d) => {
      const moved = d + octaves * size;
      return moved >= 0 && moved < count;
    }).length;
    if (fit > bestFit) {
      bestFit = fit;
      shift = octaves;
    }
  }
  return nearest.map((d) => {
    let degree = d + shift * size;
    while (degree >= count) {
      degree -= size;
    }
    while (degree < 0) {
      degree += size;
    }
    return degree;
  });
}

/** One note per cell of the grid: a note starting where another one of its row still sounds cuts it short. */
function withoutOverlaps(notes: SongNote[]): SongNote[] {
  const sorted = [...notes].sort(
    (a, b) => a.degree - b.degree || a.step - b.step
  );
  const kept: SongNote[] = [];
  for (const note of sorted) {
    const previous = kept.at(-1);
    if (previous?.degree === note.degree) {
      if (previous.step === note.step) {
        continue;
      }
      if (previous.step + noteLength(previous) > note.step) {
        previous.length = note.step - previous.step;
      }
    }
    kept.push(note);
  }
  for (const note of kept) {
    if (note.length === 1) {
      delete note.length;
    }
  }
  return kept.sort((a, b) => a.step - b.step || a.degree - b.degree);
}
