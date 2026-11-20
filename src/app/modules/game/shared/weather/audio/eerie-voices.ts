import { AudioKit } from "./audio-kit";
import { CHIME_GAIN, CHIME_NOTES, DREAD_GAIN, MOAN_GAIN, rand } from "./mix";

// Eerie sounds: ghost moans, crystal chimes, far knocks, creaks, whispers, heartbeats.

/** A ghostly "oooooh": a wavering voice-like tone sliding down, with a soft echo. */
export function ghostMoan(kit: AudioKit, level: number) {
  const ctx = kit.ctx;
  const side = rand(-0.9, 0.9);
  const pitch = rand(230, 320);
  const length = rand(1.6, 3);
  for (const [delay, gain] of [
    [0, 1],
    [0.35, 0.35],
  ] as const) {
    const at = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(pitch * 1.1, at);
    osc.frequency.linearRampToValueAtTime(pitch * 1.2, at + length * 0.3);
    osc.frequency.exponentialRampToValueAtTime(pitch * 0.7, at + length);
    const vibrato = ctx.createOscillator();
    vibrato.frequency.value = rand(4, 6);
    const depth = ctx.createGain();
    depth.gain.value = pitch * 0.025;
    vibrato.connect(depth).connect(osc.frequency);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(
      MOAN_GAIN * level * gain,
      at + length * 0.35
    );
    g.gain.linearRampToValueAtTime(0, at + length);
    osc
      .connect(kit.lowpass(900))
      .connect(g)
      .connect(kit.panned(side * (delay ? -0.5 : 1)));
    osc.start(at);
    vibrato.start(at);
    osc.stop(at + length + 0.05);
    vibrato.stop(at + length + 0.05);
  }
}

/** One crystal bell note (with its inharmonic overtone), ringing out. */
export function chime(kit: AudioKit, level: number) {
  const ctx = kit.ctx;
  const out = kit.panned(rand(-0.8, 0.8));
  const at = ctx.currentTime;
  const f = CHIME_NOTES[Math.floor(Math.random() * CHIME_NOTES.length)];
  const length = rand(1.2, 2.5);
  for (const [mult, amount] of [
    [1, 1],
    [2.76, 0.3],
    [5.4, 0.1],
  ] as const) {
    const osc = ctx.createOscillator();
    osc.frequency.value = f * mult;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(CHIME_GAIN * level * amount, at + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0005, at + length / mult);
    osc.connect(g).connect(out);
    osc.start(at);
    osc.stop(at + length + 0.05);
  }
}

/** 1 to 3 dull knocks far away (a door? something walking?). */
export function knocks(kit: AudioKit, level: number, side: number) {
  const ctx = kit.ctx;
  const out = kit.panned(side);
  const count = 1 + Math.floor(Math.random() * 3);
  let at = ctx.currentTime;
  for (let i = 0; i < count; i++) {
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(rand(70, 95), at);
    osc.frequency.exponentialRampToValueAtTime(45, at + 0.25);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(DREAD_GAIN * level, at + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, at + 0.35);
    osc.connect(gain).connect(kit.lowpass(300)).connect(out);
    osc.start(at);
    osc.stop(at + 0.4);
    at += rand(0.35, 0.8);
  }
}

/** A slow creak (old wood / metal under weight): a buzzing tone whose pitch wavers, far away. */
export function creak(kit: AudioKit, level: number, side: number) {
  const ctx = kit.ctx;
  const at = ctx.currentTime;
  const length = rand(0.8, 1.8);
  const osc = ctx.createOscillator();
  osc.type = "sawtooth";
  const f = rand(90, 160);
  osc.frequency.setValueAtTime(f, at);
  osc.frequency.linearRampToValueAtTime(f * rand(0.7, 1.4), at + length * 0.5);
  osc.frequency.linearRampToValueAtTime(f * rand(0.8, 1.2), at + length);
  const band = kit.bandpass(rand(700, 1300), 6);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, at);
  gain.gain.linearRampToValueAtTime(
    DREAD_GAIN * 0.35 * level,
    at + length * 0.3
  );
  gain.gain.linearRampToValueAtTime(0, at + length);
  osc
    .connect(band)
    .connect(gain)
    .connect(kit.lowpass(2500))
    .connect(kit.panned(side));
  osc.start(at);
  osc.stop(at + length + 0.05);
}

/** An unintelligible whisper: breathy noise through moving "vowel" resonances, in short syllables. */
export function whisper(kit: AudioKit, level: number, side: number) {
  const ctx = kit.ctx;
  const start = ctx.currentTime;
  const out = kit.panned(side);
  const syllables = 3 + Math.floor(Math.random() * 5);
  let at = start;
  for (let i = 0; i < syllables; i++) {
    const length = rand(0.12, 0.3);
    const src = ctx.createBufferSource();
    src.buffer = kit.noise;
    const f1 = kit.bandpass(rand(600, 1100), 5);
    const f2 = kit.bandpass(rand(1600, 2800), 7);
    f2.frequency.linearRampToValueAtTime(rand(1400, 3000), at + length);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(
      DREAD_GAIN * 0.5 * level * rand(0.5, 1),
      at + length * 0.3
    );
    gain.gain.linearRampToValueAtTime(0, at + length);
    src.connect(f1).connect(gain);
    src.connect(f2).connect(gain);
    gain.connect(out);
    src.start(at, Math.random() * 3, length + 0.05);
    at += length + rand(0.02, 0.15);
  }
}

/** A slow heartbeat (lub-dub), getting slightly louder then fading. */
export function heartbeat(kit: AudioKit, level: number) {
  const ctx = kit.ctx;
  const out = kit.panned(0);
  const beats = 5 + Math.floor(Math.random() * 5);
  const period = rand(0.9, 1.15);
  for (let i = 0; i < beats; i++) {
    const at = ctx.currentTime + i * period;
    const swell = Math.sin((Math.PI * (i + 0.5)) / beats);
    for (const [delay, strength] of [
      [0, 1],
      [0.18, 0.7],
    ] as const) {
      const osc = ctx.createOscillator();
      osc.frequency.setValueAtTime(60, at + delay);
      osc.frequency.exponentialRampToValueAtTime(38, at + delay + 0.12);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, at + delay);
      gain.gain.linearRampToValueAtTime(
        DREAD_GAIN * 1.2 * level * strength * swell,
        at + delay + 0.015
      );
      gain.gain.exponentialRampToValueAtTime(0.001, at + delay + 0.16);
      osc.connect(gain).connect(out);
      osc.start(at + delay);
      osc.stop(at + delay + 0.2);
    }
  }
}
