import { AudioKit } from "./audio-kit";
import {
  BIRD_GAIN,
  CRICKET_GAIN,
  FROG_GAIN,
  GULL_GAIN,
  HOWL_CALL_GAIN,
  OWL_GAIN,
  rand,
} from "./mix";

// Animals: birds, crickets, an owl, gulls, frogs, wolves.

/** A random bird: trill, two-note whistle, a few chirps, rarely a far cuckoo or a woodpecker. */
export function bird(kit: AudioKit, level: number) {
  const ctx = kit.ctx;
  const out = kit.panned(rand(-0.9, 0.9));
  const far = rand(0.4, 1);
  const at0 = ctx.currentTime;
  const note = (
    at: number,
    from: number,
    to: number,
    length: number,
    gain: number
  ) => {
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(from, at);
    osc.frequency.exponentialRampToValueAtTime(to, at + length);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(
      BIRD_GAIN * level * far * gain,
      at + Math.min(0.01, length * 0.3)
    );
    g.gain.linearRampToValueAtTime(0, at + length);
    osc.connect(g).connect(out);
    osc.start(at);
    osc.stop(at + length + 0.02);
  };
  const r = Math.random();
  if (r < 0.35) {
    // Trill: fast repeated notes
    const base = rand(3500, 5500);
    const n = 6 + Math.floor(Math.random() * 10);
    for (let i = 0; i < n; i++) {
      note(at0 + i * 0.055, base * 1.15, base * 0.9, 0.04, 0.8);
    }
  } else if (r < 0.65) {
    // Whistle: two or three sliding notes
    const base = rand(2200, 3400);
    let at = at0;
    for (let i = 0; i < 2 + Math.floor(Math.random() * 2); i++) {
      const length = rand(0.12, 0.3);
      note(at, base * rand(0.9, 1.3), base * rand(0.75, 1.2), length, 1);
      at += length + rand(0.05, 0.12);
    }
  } else if (r < 0.88) {
    // Chirps: a few short quick notes going up
    const base = rand(3000, 6000);
    for (let i = 0; i < 2 + Math.floor(Math.random() * 4); i++) {
      note(at0 + i * rand(0.1, 0.18), base * 0.8, base * 1.3, 0.05, 0.9);
    }
  } else if (r < 0.95) {
    // Cuckoo, far away: two soft low notes, repeated
    for (let k = 0; k < 2; k++) {
      const at = at0 + k * 0.9;
      note(at, 680, 660, 0.25, 0.7);
      note(at + 0.32, 545, 530, 0.35, 0.7);
    }
  } else {
    // Woodpecker: a fast burst of dry knocks, slowing down
    let at = at0;
    for (let i = 0; i < 12 + Math.floor(Math.random() * 8); i++) {
      const src = ctx.createBufferSource();
      src.buffer = kit.noise;
      const g = ctx.createGain();
      g.gain.setValueAtTime(BIRD_GAIN * 2 * level * far * (1 - i * 0.03), at);
      g.gain.exponentialRampToValueAtTime(0.001, at + 0.03);
      src.connect(kit.bandpass(1300, 4)).connect(g).connect(out);
      src.start(at, Math.random() * 3, 0.04);
      at += 0.05 + i * 0.002;
    }
  }
}

/** One cricket chirp: 3 very short high pulses. */
export function cricket(
  kit: AudioKit,
  freq: number,
  side: number,
  level: number
) {
  const ctx = kit.ctx;
  const out = kit.panned(side);
  for (let i = 0; i < 3; i++) {
    const at = ctx.currentTime + i * 0.035;
    const osc = ctx.createOscillator();
    osc.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(CRICKET_GAIN * level, at + 0.004);
    g.gain.linearRampToValueAtTime(0, at + 0.022);
    osc.connect(g).connect(out);
    osc.start(at);
    osc.stop(at + 0.03);
  }
}

/**
 * An owl far away: "rrrou... rrrrou". Each hoot starts with a throaty roll (fast tremolo, the "rrr")
 * melting into a round, breathy "ou" whose pitch rises a little then falls.
 */
export function owl(kit: AudioKit, level: number) {
  const ctx = kit.ctx;
  const out = kit.panned(rand(-0.8, 0.8));
  const pitch = rand(320, 370);
  let at = ctx.currentTime;
  const hoots = Math.random() < 0.6 ? [0.7, 1.1] : [0.6];
  for (const length of hoots) {
    hoot(kit, at, length, pitch * rand(0.97, 1.03), OWL_GAIN * level, out);
    at += length + rand(0.35, 0.7);
  }
}

export function hoot(
  kit: AudioKit,
  at: number,
  length: number,
  pitch: number,
  level: number,
  out: AudioNode
) {
  const ctx = kit.ctx;
  const roll = Math.min(length * 0.2, 0.18);
  // Voice: round tone + its first overtones (a clear "ou", not muffled)
  const voice = ctx.createGain();
  for (const [mult, amount] of [
    [1, 1],
    [2, 0.32],
    [3, 0.1],
  ] as const) {
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(pitch * mult * 0.9, at);
    osc.frequency.linearRampToValueAtTime(pitch * mult, at + length * 0.3);
    osc.frequency.linearRampToValueAtTime(pitch * mult * 0.88, at + length);
    const g = ctx.createGain();
    g.gain.value = amount;
    osc.connect(g).connect(voice);
    osc.start(at);
    osc.stop(at + length + 0.05);
  }
  // Breath: a little filtered noise around the voice
  const breath = ctx.createBufferSource();
  breath.buffer = kit.noise;
  const breathGain = ctx.createGain();
  breathGain.gain.value = 0.08;
  breath
    .connect(kit.bandpass(pitch * 3, 2))
    .connect(breathGain)
    .connect(voice);
  breath.start(at, Math.random() * 3, length + 0.05);

  // The "rrr": a fast tremolo (throat roll), fading out into the pure "ou"
  const tremolo = ctx.createGain();
  tremolo.gain.setValueAtTime(0.5, at);
  tremolo.gain.setValueAtTime(0.5, at + roll * 0.6);
  tremolo.gain.linearRampToValueAtTime(1, at + roll);
  const lfo = ctx.createOscillator();
  lfo.frequency.value = rand(24, 32);
  const depth = ctx.createGain();
  depth.gain.setValueAtTime(0.5, at);
  depth.gain.setValueAtTime(0.5, at + roll * 0.6);
  depth.gain.linearRampToValueAtTime(0, at + roll);
  lfo.connect(depth).connect(tremolo.gain);
  lfo.start(at);
  lfo.stop(at + roll + 0.05);

  // Envelope: soft start, swell, long fade
  const env = ctx.createGain();
  env.gain.setValueAtTime(0, at);
  env.gain.linearRampToValueAtTime(level * 0.7, at + 0.06);
  env.gain.linearRampToValueAtTime(level, at + length * 0.4);
  env.gain.linearRampToValueAtTime(0, at + length);
  voice.connect(tremolo).connect(kit.lowpass(2000)).connect(env).connect(out);
}

/** A gull far away: 2 to 4 harsh "kiaa" cries falling in pitch. */
export function gull(kit: AudioKit, level: number) {
  const ctx = kit.ctx;
  const out = kit.panned(rand(-0.9, 0.9));
  const pitch = rand(1100, 1500);
  let at = ctx.currentTime;
  for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) {
    const length = rand(0.25, 0.45);
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(pitch * 1.1, at);
    osc.frequency.linearRampToValueAtTime(pitch * 1.25, at + length * 0.2);
    osc.frequency.exponentialRampToValueAtTime(pitch * 0.7, at + length);
    const vibrato = ctx.createOscillator();
    vibrato.frequency.value = rand(8, 12);
    const vibratoDepth = ctx.createGain();
    vibratoDepth.gain.value = pitch * 0.03;
    vibrato.connect(vibratoDepth).connect(osc.frequency);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(GULL_GAIN * level, at + 0.04);
    g.gain.linearRampToValueAtTime(0, at + length);
    osc
      .connect(kit.bandpass(pitch * 1.4, 2))
      .connect(kit.lowpass(3500))
      .connect(g)
      .connect(out);
    osc.start(at);
    vibrato.start(at);
    osc.stop(at + length + 0.02);
    vibrato.stop(at + length + 0.02);
    at += length + rand(0.08, 0.2);
  }
}

/** "Croâ": a buzzy low tone chopped into 2-3 quick pulses (the vocal sac), through a nasal band. */
export function croak(
  kit: AudioKit,
  pitch: number,
  side: number,
  level: number
) {
  const ctx = kit.ctx;
  const out = kit.panned(side);
  let at = ctx.currentTime;
  const pulses = 2 + Math.floor(Math.random() * 2);
  for (let i = 0; i < pulses; i++) {
    const length = rand(0.05, 0.08);
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(pitch * 0.9, at);
    osc.frequency.linearRampToValueAtTime(pitch * 1.1, at + length);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(FROG_GAIN * level, at + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, at + length);
    osc
      .connect(kit.bandpass(pitch * 3.5, 4))
      .connect(kit.lowpass(2200))
      .connect(g)
      .connect(out);
    osc.start(at);
    osc.stop(at + length + 0.02);
    at += length + rand(0.03, 0.06);
  }
}

/** A wolf howling far away: rises slowly, holds with a wavering voice, falls; sometimes a second one answers. */
export function wolfHowl(kit: AudioKit, level: number) {
  const ctx = kit.ctx;
  const wolves = Math.random() < 0.4 ? 2 : 1;
  for (let w = 0; w < wolves; w++) {
    const at = ctx.currentTime + w * rand(0.8, 1.6);
    const length = rand(2.2, 3.5);
    const base = rand(380, 460) * (w ? rand(1.08, 1.2) : 1);
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(base * 0.7, at);
    osc.frequency.linearRampToValueAtTime(base * 1.25, at + length * 0.3);
    osc.frequency.linearRampToValueAtTime(base * 1.2, at + length * 0.7);
    osc.frequency.linearRampToValueAtTime(base * 0.8, at + length);
    const vibrato = ctx.createOscillator();
    vibrato.frequency.value = rand(5, 6.5);
    const depth = ctx.createGain();
    depth.gain.setValueAtTime(0, at);
    depth.gain.linearRampToValueAtTime(base * 0.02, at + length * 0.5);
    vibrato.connect(depth).connect(osc.frequency);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(HOWL_CALL_GAIN * level, at + length * 0.25);
    g.gain.setValueAtTime(HOWL_CALL_GAIN * level, at + length * 0.7);
    g.gain.linearRampToValueAtTime(0, at + length);
    // Far away: muffled, a soft echo
    const out = kit.panned(rand(-0.9, 0.9));
    const muffle = kit.lowpass(1400);
    osc.connect(muffle).connect(g).connect(out);
    const echo = ctx.createDelay(1);
    echo.delayTime.value = 0.35;
    const echoGain = ctx.createGain();
    echoGain.gain.value = 0.3;
    g.connect(echo).connect(echoGain).connect(out);
    osc.start(at);
    vibrato.start(at);
    osc.stop(at + length + 0.05);
    vibrato.stop(at + length + 0.05);
  }
}
