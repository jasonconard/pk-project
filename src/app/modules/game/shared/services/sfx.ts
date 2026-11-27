import { isGameAsleep } from "../../../../core/shared/app-visibility";

/**
 * Short sound effects made on the fly (no file), in the lo-fi spirit of the music: what an event's « Jouer un son »
 * action plays. Each sound is a few notes of a simple wave with a quick envelope.
 */
export type SoundId =
  | "bip"
  | "coin"
  | "item"
  | "success"
  | "error"
  | "door"
  | "chest"
  | "bell"
  | "magic"
  | "jump"
  | "hit"
  | "explosion"
  | "step"
  // Fights
  | "slash"
  | "heavy"
  | "arrow"
  | "guard"
  | "miss"
  | "heal"
  | "boost"
  | "fire"
  | "ice"
  | "thunder"
  | "wind"
  | "earth"
  | "light"
  | "dark"
  | "poison"
  | "defeat"
  | "boss-fall"
  // Steps
  | "stomp"
  | "squelch"
  | "scuttle"
  | "flap"
  | "drift"
  // Creatures' voices
  | "growl"
  | "roar"
  | "squeak"
  | "hiss"
  | "chitter"
  | "gurgle"
  | "moan"
  | "chime"
  | "screech"
  | "rumble";

/** What a sound is for: the lists offer the right ones (an enemy's voice, its steps). */
export type SoundGroup = "game" | "fight" | "step" | "voice";

export const SOUND_CHOICES: {
  id: SoundId;
  label: string;
  group?: SoundGroup;
}[] = [
  { id: "bip", label: "Bip" },
  { id: "coin", label: "Pièce" },
  { id: "item", label: "Objet trouvé" },
  { id: "success", label: "Réussite" },
  { id: "error", label: "Erreur" },
  { id: "door", label: "Porte" },
  { id: "chest", label: "Coffre" },
  { id: "bell", label: "Cloche" },
  { id: "magic", label: "Magie" },
  { id: "jump", label: "Saut" },
  { id: "hit", label: "Coup" },
  { id: "explosion", label: "Explosion" },
  { id: "step", label: "Pas", group: "step" },
  { id: "slash", label: "Coup d'épée", group: "fight" },
  { id: "heavy", label: "Coup lourd", group: "fight" },
  { id: "arrow", label: "Flèche", group: "fight" },
  { id: "guard", label: "Coup paré", group: "fight" },
  { id: "miss", label: "Sans effet", group: "fight" },
  { id: "heal", label: "Soin", group: "fight" },
  { id: "boost", label: "Renfort", group: "fight" },
  { id: "fire", label: "Feu", group: "fight" },
  { id: "ice", label: "Glace", group: "fight" },
  { id: "thunder", label: "Foudre", group: "fight" },
  { id: "wind", label: "Vent", group: "fight" },
  { id: "earth", label: "Terre", group: "fight" },
  { id: "light", label: "Lumière", group: "fight" },
  { id: "dark", label: "Ténèbres", group: "fight" },
  { id: "poison", label: "Poison", group: "fight" },
  { id: "defeat", label: "Ennemi vaincu", group: "fight" },
  { id: "boss-fall", label: "Chute d'un boss", group: "fight" },
  { id: "stomp", label: "Pas lourd", group: "step" },
  { id: "squelch", label: "Gluant qui rebondit", group: "step" },
  { id: "scuttle", label: "Petites pattes", group: "step" },
  { id: "flap", label: "Battement d'ailes", group: "step" },
  { id: "drift", label: "Souffle qui flotte", group: "step" },
  { id: "growl", label: "Grognement", group: "voice" },
  { id: "roar", label: "Rugissement", group: "voice" },
  { id: "squeak", label: "Couinement", group: "voice" },
  { id: "hiss", label: "Sifflement", group: "voice" },
  { id: "chitter", label: "Cliquetis", group: "voice" },
  { id: "gurgle", label: "Gargouillis", group: "voice" },
  { id: "moan", label: "Plainte", group: "voice" },
  { id: "chime", label: "Tintement", group: "voice" },
  { id: "screech", label: "Cri aigu", group: "voice" },
  { id: "rumble", label: "Grondement de pierre", group: "voice" },
];

export function soundsOf(group: SoundGroup) {
  return SOUND_CHOICES.filter((s) => s.group === group);
}

/** One note: start (s), length (s), frequency (Hz; a second value slides to it), wave, loudness. */
interface Note {
  at: number;
  len: number;
  freq: number;
  to?: number;
  wave?: OscillatorType | "noise";
  gain?: number;
}

const SOUNDS: Record<SoundId, Note[]> = {
  bip: [{ at: 0, len: 0.08, freq: 880, wave: "square", gain: 0.5 }],
  coin: [
    { at: 0, len: 0.07, freq: 988, wave: "square", gain: 0.5 },
    { at: 0.07, len: 0.25, freq: 1319, wave: "square", gain: 0.5 },
  ],
  item: [
    { at: 0, len: 0.1, freq: 523, wave: "triangle" },
    { at: 0.1, len: 0.1, freq: 659, wave: "triangle" },
    { at: 0.2, len: 0.1, freq: 784, wave: "triangle" },
    { at: 0.3, len: 0.35, freq: 1047, wave: "triangle" },
  ],
  success: [
    { at: 0, len: 0.12, freq: 659, wave: "square", gain: 0.4 },
    { at: 0.12, len: 0.12, freq: 784, wave: "square", gain: 0.4 },
    { at: 0.24, len: 0.4, freq: 1047, wave: "square", gain: 0.4 },
  ],
  error: [
    { at: 0, len: 0.15, freq: 220, wave: "sawtooth", gain: 0.4 },
    { at: 0.17, len: 0.25, freq: 165, wave: "sawtooth", gain: 0.4 },
  ],
  door: [
    { at: 0, len: 0.25, freq: 140, to: 90, wave: "sawtooth", gain: 0.35 },
    { at: 0.22, len: 0.08, freq: 600, wave: "noise", gain: 0.5 },
  ],
  chest: [
    { at: 0, len: 0.18, freq: 200, to: 320, wave: "triangle" },
    { at: 0.2, len: 0.12, freq: 784, wave: "square", gain: 0.35 },
    { at: 0.32, len: 0.3, freq: 1175, wave: "square", gain: 0.35 },
  ],
  bell: [
    { at: 0, len: 1.2, freq: 1568, wave: "sine", gain: 0.6 },
    { at: 0, len: 0.8, freq: 3136, wave: "sine", gain: 0.2 },
  ],
  magic: [
    { at: 0, len: 0.6, freq: 600, to: 2400, wave: "triangle", gain: 0.5 },
    { at: 0.1, len: 0.5, freq: 900, to: 3000, wave: "sine", gain: 0.3 },
  ],
  jump: [{ at: 0, len: 0.18, freq: 300, to: 700, wave: "square", gain: 0.4 }],
  hit: [
    { at: 0, len: 0.12, freq: 1000, wave: "noise", gain: 0.8 },
    { at: 0, len: 0.12, freq: 160, to: 60, wave: "square", gain: 0.4 },
  ],
  // A deep thump, a roar of noise falling away, a crackle on top
  explosion: [
    { at: 0, len: 0.45, freq: 120, to: 32, wave: "square", gain: 0.7 },
    { at: 0, len: 0.7, freq: 300, wave: "noise", gain: 1 },
    { at: 0, len: 0.5, freq: 700, wave: "noise", gain: 0.7 },
    { at: 0.03, len: 0.35, freq: 1800, wave: "noise", gain: 0.4 },
    { at: 0.1, len: 0.6, freq: 160, wave: "noise", gain: 0.8 },
  ],
  step: [{ at: 0, len: 0.06, freq: 400, wave: "noise", gain: 0.5 }],

  // --- Fights ---
  // A blade through the air, then the bite
  slash: [
    { at: 0, len: 0.1, freq: 2600, wave: "noise", gain: 0.6 },
    { at: 0.05, len: 0.1, freq: 900, to: 300, wave: "sawtooth", gain: 0.3 },
    { at: 0.07, len: 0.09, freq: 1200, wave: "noise", gain: 0.7 },
  ],
  heavy: [
    { at: 0, len: 0.16, freq: 1800, wave: "noise", gain: 0.6 },
    { at: 0.1, len: 0.22, freq: 150, to: 45, wave: "square", gain: 0.6 },
    { at: 0.1, len: 0.2, freq: 500, wave: "noise", gain: 0.9 },
  ],
  arrow: [
    { at: 0, len: 0.14, freq: 3000, wave: "noise", gain: 0.4 },
    { at: 0, len: 0.14, freq: 1400, to: 700, wave: "sine", gain: 0.25 },
    { at: 0.14, len: 0.06, freq: 300, wave: "noise", gain: 0.7 },
  ],
  guard: [
    { at: 0, len: 0.05, freq: 2400, wave: "noise", gain: 0.6 },
    { at: 0, len: 0.25, freq: 1100, wave: "triangle", gain: 0.4 },
    { at: 0, len: 0.2, freq: 1650, wave: "sine", gain: 0.25 },
  ],
  miss: [{ at: 0, len: 0.16, freq: 500, to: 260, wave: "sine", gain: 0.35 }],
  heal: [
    { at: 0, len: 0.18, freq: 784, wave: "sine", gain: 0.45 },
    { at: 0.1, len: 0.18, freq: 988, wave: "sine", gain: 0.45 },
    { at: 0.2, len: 0.4, freq: 1319, wave: "sine", gain: 0.45 },
    { at: 0.2, len: 0.4, freq: 2637, wave: "sine", gain: 0.12 },
  ],
  boost: [
    { at: 0, len: 0.3, freq: 330, to: 660, wave: "triangle", gain: 0.45 },
    { at: 0.15, len: 0.3, freq: 495, to: 990, wave: "triangle", gain: 0.35 },
  ],
  fire: [
    { at: 0, len: 0.5, freq: 500, wave: "noise", gain: 0.8 },
    { at: 0, len: 0.4, freq: 1500, wave: "noise", gain: 0.5 },
    { at: 0.02, len: 0.4, freq: 180, to: 70, wave: "sawtooth", gain: 0.35 },
  ],
  ice: [
    { at: 0, len: 0.07, freq: 3200, wave: "noise", gain: 0.5 },
    { at: 0.02, len: 0.3, freq: 2093, wave: "sine", gain: 0.35 },
    { at: 0.08, len: 0.3, freq: 2637, wave: "sine", gain: 0.3 },
    { at: 0.14, len: 0.35, freq: 3136, wave: "sine", gain: 0.25 },
  ],
  thunder: [
    { at: 0, len: 0.06, freq: 3000, wave: "noise", gain: 0.9 },
    { at: 0.03, len: 0.5, freq: 110, to: 40, wave: "sawtooth", gain: 0.6 },
    { at: 0.03, len: 0.55, freq: 250, wave: "noise", gain: 0.8 },
  ],
  wind: [
    { at: 0, len: 0.5, freq: 900, wave: "noise", gain: 0.5 },
    { at: 0, len: 0.5, freq: 600, to: 1500, wave: "sine", gain: 0.2 },
    { at: 0.2, len: 0.35, freq: 2200, wave: "noise", gain: 0.35 },
  ],
  earth: [
    { at: 0, len: 0.35, freq: 90, to: 45, wave: "square", gain: 0.6 },
    { at: 0, len: 0.3, freq: 220, wave: "noise", gain: 0.9 },
    { at: 0.12, len: 0.25, freq: 900, wave: "noise", gain: 0.4 },
  ],
  light: [
    { at: 0, len: 0.5, freq: 1047, to: 2093, wave: "sine", gain: 0.4 },
    { at: 0.05, len: 0.5, freq: 1568, to: 3136, wave: "sine", gain: 0.25 },
    { at: 0.3, len: 0.3, freq: 3000, wave: "noise", gain: 0.15 },
  ],
  dark: [
    { at: 0, len: 0.6, freq: 220, to: 73, wave: "sawtooth", gain: 0.45 },
    { at: 0, len: 0.6, freq: 233, to: 78, wave: "sawtooth", gain: 0.35 },
    { at: 0.1, len: 0.45, freq: 300, wave: "noise", gain: 0.3 },
  ],
  poison: [
    { at: 0, len: 0.12, freq: 300, to: 480, wave: "sine", gain: 0.4 },
    { at: 0.12, len: 0.12, freq: 260, to: 420, wave: "sine", gain: 0.4 },
    { at: 0.24, len: 0.18, freq: 220, to: 380, wave: "sine", gain: 0.4 },
  ],
  defeat: [
    { at: 0, len: 0.35, freq: 520, to: 90, wave: "square", gain: 0.4 },
    { at: 0.05, len: 0.3, freq: 800, wave: "noise", gain: 0.4 },
  ],
  // A long fall: the ground shakes, something huge cracks and gives way
  "boss-fall": [
    { at: 0, len: 1.6, freq: 70, to: 28, wave: "square", gain: 0.7 },
    { at: 0, len: 1.6, freq: 140, wave: "noise", gain: 0.9 },
    { at: 0.25, len: 0.3, freq: 900, wave: "noise", gain: 0.6 },
    { at: 0.7, len: 0.3, freq: 600, wave: "noise", gain: 0.7 },
    { at: 1.15, len: 0.5, freq: 350, wave: "noise", gain: 0.8 },
    { at: 0.2, len: 1.2, freq: 330, to: 55, wave: "sawtooth", gain: 0.35 },
  ],

  // --- Steps ---
  stomp: [
    { at: 0, len: 0.14, freq: 80, to: 45, wave: "square", gain: 0.6 },
    { at: 0, len: 0.1, freq: 200, wave: "noise", gain: 0.7 },
  ],
  squelch: [
    { at: 0, len: 0.09, freq: 260, to: 520, wave: "sine", gain: 0.5 },
    { at: 0.03, len: 0.08, freq: 700, wave: "noise", gain: 0.3 },
  ],
  scuttle: [
    { at: 0, len: 0.02, freq: 2600, wave: "noise", gain: 0.5 },
    { at: 0.04, len: 0.02, freq: 3000, wave: "noise", gain: 0.45 },
    { at: 0.08, len: 0.02, freq: 2400, wave: "noise", gain: 0.4 },
  ],
  flap: [
    { at: 0, len: 0.09, freq: 500, wave: "noise", gain: 0.5 },
    { at: 0.11, len: 0.07, freq: 700, wave: "noise", gain: 0.35 },
  ],
  drift: [{ at: 0, len: 0.3, freq: 1300, wave: "noise", gain: 0.2 }],

  // --- Creatures' voices ---
  growl: [
    { at: 0, len: 0.45, freq: 95, to: 70, wave: "sawtooth", gain: 0.6 },
    { at: 0, len: 0.45, freq: 101, to: 74, wave: "sawtooth", gain: 0.5 },
    { at: 0, len: 0.4, freq: 300, wave: "noise", gain: 0.3 },
  ],
  roar: [
    { at: 0, len: 0.9, freq: 160, to: 60, wave: "sawtooth", gain: 0.7 },
    { at: 0, len: 0.9, freq: 171, to: 66, wave: "sawtooth", gain: 0.6 },
    { at: 0.05, len: 0.8, freq: 500, wave: "noise", gain: 0.6 },
    { at: 0.1, len: 0.6, freq: 1100, wave: "noise", gain: 0.3 },
  ],
  squeak: [
    { at: 0, len: 0.08, freq: 1500, to: 2300, wave: "square", gain: 0.3 },
    { at: 0.1, len: 0.1, freq: 1700, to: 1200, wave: "square", gain: 0.3 },
  ],
  hiss: [
    { at: 0, len: 0.5, freq: 3200, wave: "noise", gain: 0.5 },
    { at: 0, len: 0.45, freq: 2200, wave: "noise", gain: 0.3 },
  ],
  chitter: [
    { at: 0, len: 0.03, freq: 1900, wave: "square", gain: 0.3 },
    { at: 0.05, len: 0.03, freq: 2300, wave: "square", gain: 0.3 },
    { at: 0.1, len: 0.03, freq: 1700, wave: "square", gain: 0.3 },
    { at: 0.15, len: 0.03, freq: 2500, wave: "square", gain: 0.3 },
    { at: 0.2, len: 0.05, freq: 2000, wave: "square", gain: 0.3 },
  ],
  gurgle: [
    { at: 0, len: 0.12, freq: 180, to: 340, wave: "sine", gain: 0.55 },
    { at: 0.1, len: 0.12, freq: 240, to: 150, wave: "sine", gain: 0.55 },
    { at: 0.2, len: 0.16, freq: 200, to: 420, wave: "sine", gain: 0.55 },
  ],
  moan: [
    { at: 0, len: 1.1, freq: 330, to: 220, wave: "sine", gain: 0.45 },
    { at: 0.05, len: 1.05, freq: 337, to: 226, wave: "sine", gain: 0.35 },
    { at: 0, len: 1, freq: 900, wave: "noise", gain: 0.12 },
  ],
  chime: [
    { at: 0, len: 0.5, freq: 1760, wave: "sine", gain: 0.4 },
    { at: 0.09, len: 0.5, freq: 2217, wave: "sine", gain: 0.35 },
    { at: 0.18, len: 0.7, freq: 2637, wave: "sine", gain: 0.3 },
  ],
  screech: [
    { at: 0, len: 0.3, freq: 2400, to: 3400, wave: "sawtooth", gain: 0.3 },
    { at: 0, len: 0.3, freq: 3000, wave: "noise", gain: 0.3 },
  ],
  rumble: [
    { at: 0, len: 0.8, freq: 60, to: 42, wave: "square", gain: 0.7 },
    { at: 0, len: 0.8, freq: 180, wave: "noise", gain: 0.8 },
    { at: 0.3, len: 0.2, freq: 700, wave: "noise", gain: 0.35 },
  ],
};

/** Sounds louder than the others (a factor on their volume): an explosion has to boom. */
const LOUDER: Partial<Record<SoundId, number>> = {
  explosion: 2.5,
  "boss-fall": 2.5,
  roar: 1.6,
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

/** How a sound is played: higher or lower (1: as it is), louder or softer (1: as it is). */
export interface SoundTone {
  pitch?: number;
  gain?: number;
}

/**
 * Plays a sound effect now (`preview`: heard even in the editor, where the game sleeps). `tone` changes its pitch
 * and loudness: the same voice makes a small creature and a big one.
 */
export function playSound(
  id: string,
  preview = false,
  tone: SoundTone = {}
): void {
  if (!isSoundId(id) || muted || volume <= 0 || (!preview && isGameAsleep())) {
    return;
  }
  try {
    context ??= new AudioContext();
    if (context.state === "suspended") {
      void context.resume();
    }
  } catch {
    return;
  }
  const ctx = context;
  const master = ctx.createGain();
  const pitch = Math.min(4, Math.max(0.25, tone.pitch ?? 1));
  master.gain.value =
    0.25 * volume * (LOUDER[id] ?? 1) * Math.max(0, tone.gain ?? 1);
  // A soft low-pass: the lo-fi colour of the music
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 3500;
  master.connect(filter).connect(ctx.destination);
  const now = ctx.currentTime + 0.01;
  let end = 0;
  SOUNDS[id].forEach((note) => {
    const start = now + note.at;
    const stop = start + note.len;
    end = Math.max(end, note.at + note.len);
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, start);
    env.gain.linearRampToValueAtTime(note.gain ?? 0.5, start + 0.005);
    env.gain.exponentialRampToValueAtTime(0.001, stop);
    env.connect(master);
    if (note.wave === "noise") {
      const buffer = ctx.createBuffer(
        1,
        Math.ceil(ctx.sampleRate * note.len),
        ctx.sampleRate
      );
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const band = ctx.createBiquadFilter();
      band.type = "bandpass";
      band.frequency.value = note.freq * pitch;
      source.connect(band).connect(env);
      source.start(start);
      source.stop(stop);
    } else {
      const osc = ctx.createOscillator();
      osc.type = note.wave ?? "square";
      osc.frequency.setValueAtTime(note.freq * pitch, start);
      if (note.to) {
        osc.frequency.exponentialRampToValueAtTime(note.to * pitch, stop);
      }
      osc.connect(env);
      osc.start(start);
      osc.stop(stop + 0.02);
    }
  });
  setTimeout(() => master.disconnect(), (end + 0.3) * 1000);
}
