import { AudioKit } from "./audio-kit";
import {
  BANG_GAIN,
  BUBBLE_GAIN,
  CRACKLE_GAIN,
  GEYSER_BURST_GAIN,
  HORN_GAIN,
  ROCKET_GAIN,
  SCURRY_GAIN,
  rand,
} from "./mix";

// One-shot sound effects: city horns and sirens, hail ticks, bubbles, embers crackling, geysers, fireworks, the player's hops and falls, scurrying, water drops.

/** A car horn far away: one or two short honks, two notes together, muffled by the distance. */
export function horn(kit: AudioKit, level: number) {
  const ctx = kit.ctx;
  const out = kit.panned(rand(-0.9, 0.9));
  const base = rand(330, 440);
  let at = ctx.currentTime;
  for (let i = 0; i < (Math.random() < 0.5 ? 1 : 2); i++) {
    const length = rand(0.15, 0.4);
    for (const mult of [1, 1.26]) {
      const osc = ctx.createOscillator();
      osc.type = "square";
      osc.frequency.value = base * mult;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, at);
      g.gain.linearRampToValueAtTime(HORN_GAIN * level, at + 0.02);
      g.gain.setValueAtTime(HORN_GAIN * level, at + length - 0.03);
      g.gain.linearRampToValueAtTime(0, at + length);
      osc.connect(kit.lowpass(900)).connect(g).connect(out);
      osc.start(at);
      osc.stop(at + length + 0.02);
    }
    at += length + rand(0.08, 0.15);
  }
}

/** A siren far away: a tone slowly sweeping up and down a few times, very muffled. */
export function siren(kit: AudioKit, level: number) {
  const ctx = kit.ctx;
  const at = ctx.currentTime;
  const length = rand(4, 7);
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  const sweep = ctx.createOscillator();
  sweep.frequency.value = rand(0.4, 0.7);
  const depth = ctx.createGain();
  depth.gain.value = 160;
  osc.frequency.value = 720;
  sweep.connect(depth).connect(osc.frequency);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, at);
  g.gain.linearRampToValueAtTime(HORN_GAIN * 0.7 * level, at + length * 0.4);
  g.gain.linearRampToValueAtTime(0, at + length);
  osc
    .connect(kit.lowpass(1100))
    .connect(g)
    .connect(kit.panned(rand(-0.8, 0.8)));
  osc.start(at);
  sweep.start(at);
  osc.stop(at + length + 0.05);
  sweep.stop(at + length + 0.05);
}

/**
 * One pellet impact: a tiny hard click plus a very short "knock" of the pellet itself. The knock keeps
 * a fixed pitch and mixes two inharmonic tones (a hard little object), unlike a water drop whose pure tone slides.
 */
export function hailTick(
  kit: AudioKit,
  at: number,
  freq: number,
  level: number,
  roof: boolean,
  out: AudioNode
) {
  const ctx = kit.ctx;
  // Click
  const src = ctx.createBufferSource();
  src.buffer = kit.noise;
  const click = ctx.createGain();
  click.gain.setValueAtTime(level * 0.6, at);
  click.gain.exponentialRampToValueAtTime(0.001, at + 0.005);
  src
    .connect(kit.highpass(roof ? 1000 : 1800))
    .connect(kit.lowpass(7000))
    .connect(click)
    .connect(out);
  src.start(at, Math.random() * 3, 0.01);
  // Knock: two inharmonic partials, fixed pitch, dying very fast
  const length = roof ? rand(0.02, 0.035) : rand(0.008, 0.016);
  for (const [mult, amount] of [
    [1, 0.25],
    [2.37, 0.15],
  ] as const) {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = freq * mult;
    const g = ctx.createGain();
    g.gain.setValueAtTime(level * amount, at);
    g.gain.exponentialRampToValueAtTime(0.001, at + length);
    osc.connect(g).connect(out);
    osc.start(at);
    osc.stop(at + length + 0.01);
  }
}

/** Toxic bubbles: one big "blop", or a gurgling burst of smaller ones. */
export function bubbles(kit: AudioKit, amount: number) {
  const ctx = kit.ctx;
  const gurgle = Math.random() < 0.35;
  const count = gurgle ? 3 + Math.floor(Math.random() * 5) : 1;
  let at = ctx.currentTime + Math.random() * 0.05;
  for (let i = 0; i < count; i++) {
    const big = !gurgle && Math.random() < 0.6;
    blop(
      kit,
      at,
      big ? rand(110, 200) : rand(220, 520),
      big ? rand(0.12, 0.2) : rand(0.05, 0.1),
      BUBBLE_GAIN * amount * (big ? 1 : rand(0.4, 0.8)),
      rand(-0.7, 0.7)
    );
    at += rand(0.04, 0.14);
  }
}

/** One thick bubble popping: a muffled tone sliding up, a tiny "plop" at the end. */
export function blop(
  kit: AudioKit,
  at: number,
  freq: number,
  length: number,
  level: number,
  side: number
) {
  const ctx = kit.ctx;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, at);
  osc.frequency.exponentialRampToValueAtTime(freq * rand(2, 3.2), at + length);
  const lowpass = kit.lowpass(1200);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, at);
  gain.gain.linearRampToValueAtTime(level, at + length * 0.25);
  gain.gain.exponentialRampToValueAtTime(0.001, at + length);
  const pan = ctx.createStereoPanner();
  pan.pan.value = side;
  osc.connect(lowpass).connect(gain).connect(pan).connect(kit.master);
  osc.start(at);
  osc.stop(at + length + 0.02);
}

/** Ember crackle: one or a few tiny clicks of bright noise (sometimes a deeper pop). */
export function crackle(kit: AudioKit, amount: number) {
  const ctx = kit.ctx;
  const clicks = 1 + Math.floor(Math.random() * Math.random() * 5);
  let at = ctx.currentTime;
  for (let i = 0; i < clicks; i++) {
    const pop = Math.random() < 0.2;
    const length = pop
      ? 0.03 + Math.random() * 0.03
      : 0.006 + Math.random() * 0.014;
    const src = ctx.createBufferSource();
    src.buffer = kit.noise;
    const band = kit.bandpass(
      pop ? 600 + Math.random() * 600 : 2000 + Math.random() * 4000,
      pop ? 2 : 1
    );
    const gain = ctx.createGain();
    const level =
      CRACKLE_GAIN * amount * (pop ? 1.3 : 0.4 + 0.6 * Math.random());
    gain.gain.setValueAtTime(level, at);
    gain.gain.exponentialRampToValueAtTime(0.001, at + length);
    src.connect(band).connect(gain).connect(kit.master);
    src.start(at, Math.random() * 3, length + 0.02);
    at += 0.02 + Math.random() * 0.07;
  }
}

/**
 * A geyser erupting: a gurgle of bubbles, then a whoosh as the jet bursts out (louder when close).
 * @param closeness 0..1
 */
export function geyserBurst(kit: AudioKit, closeness: number, side: number) {
  const ctx = kit.ctx;
  if (ctx.state !== "running" || closeness <= 0) {
    return;
  }
  bubbles(kit, closeness);
  const at = ctx.currentTime + 0.25;
  const src = ctx.createBufferSource();
  src.buffer = kit.noise;
  const band = kit.bandpass(600, 0.8);
  band.frequency.setValueAtTime(400, at);
  band.frequency.exponentialRampToValueAtTime(2500, at + 0.6);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, at);
  g.gain.linearRampToValueAtTime(GEYSER_BURST_GAIN * closeness, at + 0.15);
  g.gain.exponentialRampToValueAtTime(0.001, at + 1.6);
  src
    .connect(band)
    .connect(g)
    .connect(kit.panned(side * 0.8));
  src.start(at, Math.random() * 2, 1.7);
}

/** A rocket climbing: a thin whistle rising in pitch for the climb time. */
export function rocketWhistle(kit: AudioKit, climb: number, side: number) {
  const ctx = kit.ctx;
  if (ctx.state !== "running") {
    return;
  }
  const at = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.frequency.setValueAtTime(rand(500, 700), at);
  osc.frequency.exponentialRampToValueAtTime(rand(1800, 2600), at + climb);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, at);
  g.gain.linearRampToValueAtTime(ROCKET_GAIN, at + 0.1);
  g.gain.linearRampToValueAtTime(ROCKET_GAIN * 0.4, at + climb);
  g.gain.linearRampToValueAtTime(0, at + climb + 0.05);
  osc.connect(g).connect(kit.panned(side * 0.8));
  osc.start(at);
  osc.stop(at + climb + 0.1);
}

/**
 * A burst: a deep bang (heard a little after the light: sound is slower), its echo, then the sparks crackling.
 * @param closeness 0..1 (louder and sooner when close)
 */
export function fireworkBang(kit: AudioKit, closeness: number, side: number) {
  const ctx = kit.ctx;
  if (ctx.state !== "running") {
    return;
  }
  const at = ctx.currentTime + 0.15 + (1 - closeness) * 0.5;
  const out = kit.panned(side * 0.8);
  // Bang: a short low noise burst + a falling low tone
  const src = ctx.createBufferSource();
  src.buffer = kit.noise;
  const g = ctx.createGain();
  const level = BANG_GAIN * (0.4 + 0.6 * closeness);
  g.gain.setValueAtTime(level, at);
  g.gain.exponentialRampToValueAtTime(0.001, at + 0.5);
  src.connect(kit.lowpass(700)).connect(g).connect(out);
  src.start(at, Math.random() * 3, 0.55);
  const osc = ctx.createOscillator();
  osc.frequency.setValueAtTime(90, at);
  osc.frequency.exponentialRampToValueAtTime(35, at + 0.4);
  const og = ctx.createGain();
  og.gain.setValueAtTime(level * 0.8, at);
  og.gain.exponentialRampToValueAtTime(0.001, at + 0.45);
  osc.connect(og).connect(out);
  osc.start(at);
  osc.stop(at + 0.5);
  // Echo off the buildings
  const echo = ctx.createDelay(1);
  echo.delayTime.value = rand(0.25, 0.4);
  const eg = ctx.createGain();
  eg.gain.value = 0.25;
  g.connect(echo).connect(eg).connect(out);
  // Crackling sparks a moment later
  if (Math.random() < 0.6) {
    let t = at + 0.3;
    for (let i = 0; i < 14; i++) {
      const c = ctx.createBufferSource();
      c.buffer = kit.noise;
      const cg = ctx.createGain();
      cg.gain.setValueAtTime(level * 0.15 * rand(0.4, 1), t);
      cg.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
      c.connect(kit.bandpass(rand(2500, 5000), 3))
        .connect(cg)
        .connect(out);
      c.start(t, Math.random() * 3, 0.03);
      t += rand(0.03, 0.12);
    }
  }
}

/** Ledge hop: a short airy whoosh falling in pitch (the player drops). */
export function ledgeHop(kit: AudioKit) {
  const ctx = kit.ctx;
  if (ctx.state !== "running") {
    return;
  }
  const at = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = kit.noise;
  const band = kit.bandpass(1400, 1.2);
  band.frequency.setValueAtTime(1400, at);
  band.frequency.exponentialRampToValueAtTime(300, at + 0.3);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(0.12, at + 0.06);
  g.gain.exponentialRampToValueAtTime(0.0001, at + 0.32);
  src.connect(band).connect(g).connect(kit.master);
  src.start(at, Math.random() * 2, 0.35);
}

/** The player falling back on the ground: a dull thud. */
export function thud(kit: AudioKit) {
  const ctx = kit.ctx;
  if (ctx.state !== "running") {
    return;
  }
  const at = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.frequency.setValueAtTime(110, at);
  osc.frequency.exponentialRampToValueAtTime(40, at + 0.18);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, at);
  g.gain.linearRampToValueAtTime(0.6, at + 0.008);
  g.gain.exponentialRampToValueAtTime(0.001, at + 0.25);
  osc.connect(g).connect(kit.master);
  osc.start(at);
  osc.stop(at + 0.3);
  // Dust: a short muffled noise burst
  const src = ctx.createBufferSource();
  src.buffer = kit.noise;
  const dust = ctx.createGain();
  dust.gain.setValueAtTime(0.2, at);
  dust.gain.exponentialRampToValueAtTime(0.001, at + 0.2);
  src.connect(kit.lowpass(900)).connect(dust).connect(kit.master);
  src.start(at, Math.random() * 3, 0.25);
}

/**
 * Moonless night: something runs away in the dark: a quick rustle of leaves (noise bursts in a band-pass,
 * irregular like small steps), from its side.
 */
export function scurry(kit: AudioKit, side: number) {
  const ctx = kit.ctx;
  if (ctx.state !== "running") {
    return;
  }
  const out = kit.panned(side);
  const at = ctx.currentTime;
  const steps = 4 + Math.floor(Math.random() * 5);
  let t = 0;
  for (let k = 0; k < steps; k++) {
    const src = ctx.createBufferSource();
    src.buffer = kit.noise;
    const g = ctx.createGain();
    const level = SCURRY_GAIN * rand(0.5, 1) * (1 - (k / steps) * 0.6);
    g.gain.setValueAtTime(level, at + t);
    g.gain.exponentialRampToValueAtTime(0.0001, at + t + 0.07);
    src
      .connect(kit.bandpass(rand(1800, 3500), 1.2))
      .connect(g)
      .connect(out);
    src.start(at + t, Math.random() * 2, 0.08);
    t += rand(0.05, 0.12);
  }
}

/** One water drop: a sine rising in pitch, very short. */
export function plink(kit: AudioKit, at: number, level: number) {
  const ctx = kit.ctx;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  const f0 = 700 + Math.random() * 900;
  const length = 0.04 + Math.random() * 0.05;
  osc.frequency.setValueAtTime(f0, at);
  osc.frequency.exponentialRampToValueAtTime(
    f0 * (1.8 + Math.random() * 1.2),
    at + length
  );
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, at);
  gain.gain.linearRampToValueAtTime(level, at + 0.003);
  gain.gain.exponentialRampToValueAtTime(0.001, at + length);
  osc.connect(gain).connect(kit.master);
  osc.start(at);
  osc.stop(at + length + 0.02);
}
