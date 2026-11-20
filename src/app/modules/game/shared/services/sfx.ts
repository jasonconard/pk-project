import { isGameAsleep } from '../../../../core/shared/app-visibility';

/**
 * Short sound effects made on the fly (no file), in the lo-fi spirit of the music: what an event's « Jouer un son »
 * action plays. Each sound is a few notes of a simple wave with a quick envelope.
 */
export type SoundId = 'bip' | 'coin' | 'item' | 'success' | 'error' | 'door' | 'chest' | 'bell' | 'magic' | 'jump' | 'hit' | 'step';

export const SOUND_CHOICES: { id: SoundId, label: string }[] = [
  { id: 'bip', label: 'Bip' },
  { id: 'coin', label: 'Pièce' },
  { id: 'item', label: 'Objet trouvé' },
  { id: 'success', label: 'Réussite' },
  { id: 'error', label: 'Erreur' },
  { id: 'door', label: 'Porte' },
  { id: 'chest', label: 'Coffre' },
  { id: 'bell', label: 'Cloche' },
  { id: 'magic', label: 'Magie' },
  { id: 'jump', label: 'Saut' },
  { id: 'hit', label: 'Coup' },
  { id: 'step', label: 'Pas' },
];

/** One note: start (s), length (s), frequency (Hz; a second value slides to it), wave, loudness. */
interface Note {
  at: number;
  len: number;
  freq: number;
  to?: number;
  wave?: OscillatorType | 'noise';
  gain?: number;
}

const SOUNDS: Record<SoundId, Note[]> = {
  bip: [{ at: 0, len: 0.08, freq: 880, wave: 'square', gain: 0.5 }],
  coin: [{ at: 0, len: 0.07, freq: 988, wave: 'square', gain: 0.5 }, { at: 0.07, len: 0.25, freq: 1319, wave: 'square', gain: 0.5 }],
  item: [
    { at: 0, len: 0.1, freq: 523, wave: 'triangle' }, { at: 0.1, len: 0.1, freq: 659, wave: 'triangle' },
    { at: 0.2, len: 0.1, freq: 784, wave: 'triangle' }, { at: 0.3, len: 0.35, freq: 1047, wave: 'triangle' },
  ],
  success: [
    { at: 0, len: 0.12, freq: 659, wave: 'square', gain: 0.4 }, { at: 0.12, len: 0.12, freq: 784, wave: 'square', gain: 0.4 },
    { at: 0.24, len: 0.4, freq: 1047, wave: 'square', gain: 0.4 },
  ],
  error: [{ at: 0, len: 0.15, freq: 220, wave: 'sawtooth', gain: 0.4 }, { at: 0.17, len: 0.25, freq: 165, wave: 'sawtooth', gain: 0.4 }],
  door: [{ at: 0, len: 0.25, freq: 140, to: 90, wave: 'sawtooth', gain: 0.35 }, { at: 0.22, len: 0.08, freq: 600, wave: 'noise', gain: 0.5 }],
  chest: [
    { at: 0, len: 0.18, freq: 200, to: 320, wave: 'triangle' }, { at: 0.2, len: 0.12, freq: 784, wave: 'square', gain: 0.35 },
    { at: 0.32, len: 0.3, freq: 1175, wave: 'square', gain: 0.35 },
  ],
  bell: [{ at: 0, len: 1.2, freq: 1568, wave: 'sine', gain: 0.6 }, { at: 0, len: 0.8, freq: 3136, wave: 'sine', gain: 0.2 }],
  magic: [{ at: 0, len: 0.6, freq: 600, to: 2400, wave: 'triangle', gain: 0.5 }, { at: 0.1, len: 0.5, freq: 900, to: 3000, wave: 'sine', gain: 0.3 }],
  jump: [{ at: 0, len: 0.18, freq: 300, to: 700, wave: 'square', gain: 0.4 }],
  hit: [{ at: 0, len: 0.12, freq: 1000, wave: 'noise', gain: 0.8 }, { at: 0, len: 0.12, freq: 160, to: 60, wave: 'square', gain: 0.4 }],
  step: [{ at: 0, len: 0.06, freq: 400, wave: 'noise', gain: 0.5 }],
};

let context: AudioContext | null = null;
let volume = 0.6;
let muted = false;

/** The game's sound settings (menu): the effects follow them. */
export function setSfxVolume(v: number, m: boolean): void {
  volume = v;
  muted = m;
}

export function isSoundId(id: string): id is SoundId {
  return id in SOUNDS;
}

/** Plays a sound effect now (`preview`: heard even in the editor, where the game sleeps). */
export function playSound(id: string, preview = false): void {
  if (!isSoundId(id) || muted || volume <= 0 || (!preview && isGameAsleep())) {
    return;
  }
  try {
    context ??= new AudioContext();
    if (context.state === 'suspended') {
      void context.resume();
    }
  } catch {
    return;
  }
  const ctx = context;
  const master = ctx.createGain();
  master.gain.value = 0.25 * volume;
  // A soft low-pass: the lo-fi colour of the music
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 3500;
  master.connect(filter).connect(ctx.destination);
  const now = ctx.currentTime + 0.01;
  let end = 0;
  SOUNDS[id].forEach(note => {
    const start = now + note.at;
    const stop = start + note.len;
    end = Math.max(end, note.at + note.len);
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, start);
    env.gain.linearRampToValueAtTime(note.gain ?? 0.5, start + 0.005);
    env.gain.exponentialRampToValueAtTime(0.001, stop);
    env.connect(master);
    if (note.wave === 'noise') {
      const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * note.len), ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const band = ctx.createBiquadFilter();
      band.type = 'bandpass';
      band.frequency.value = note.freq;
      source.connect(band).connect(env);
      source.start(start);
      source.stop(stop);
    } else {
      const osc = ctx.createOscillator();
      osc.type = note.wave ?? 'square';
      osc.frequency.setValueAtTime(note.freq, start);
      if (note.to) {
        osc.frequency.exponentialRampToValueAtTime(note.to, stop);
      }
      osc.connect(env);
      osc.start(start);
      osc.stop(stop + 0.02);
    }
  });
  setTimeout(() => master.disconnect(), (end + 0.3) * 1000);
}
