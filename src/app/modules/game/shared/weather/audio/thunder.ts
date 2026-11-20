import { AudioKit } from "./audio-kit";
import { THUNDER_CRACK_GAIN, THUNDER_DUCKING, THUNDER_GAIN, rand } from "./mix";
import type { ThunderBolt } from "../WeatherAudio";

// Thunder: the crack of a close bolt and the long rumble, played a little after each lightning flash.

/** The thunder of a strike's bolts: a crack for the close ones, then the rumble, each at its time and side. */
export function thunder(kit: AudioKit, bolts: ThunderBolt[]) {
  const ctx = kit.ctx;
  if (ctx.state !== "running") {
    return;
  }
  for (const bolt of bolts) {
    const near = 1 - bolt.distance;
    const delay = bolt.at + 0.05 + bolt.distance * 5 + Math.random() * 0.6;
    const start = ctx.currentTime + delay;
    const pan = ctx.createStereoPanner();
    pan.pan.value = bolt.pan;
    pan.connect(kit.master);
    if (bolt.distance < 0.35) {
      thunderCrack(kit, start, near, pan);
    }
    thunderRumble(kit, start, bolt.distance, pan);
  }
}

/**
 * Close strike: a loud sharp clap (like a huge whip crack / a tree splitting), with one or two
 * smaller echoes right after. Full-band but not too bright, smooth envelopes (no buzzing).
 */
export function thunderCrack(
  kit: AudioKit,
  start: number,
  near: number,
  out: AudioNode
) {
  const ctx = kit.ctx;
  const clap = (at: number, level: number, length: number) => {
    const src = ctx.createBufferSource();
    src.buffer = kit.noise;
    const lowpass = kit.lowpass(rand(2200, 3500));
    const highpass = kit.highpass(120);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(level, at + 0.006);
    gain.gain.exponentialRampToValueAtTime(level * 0.25, at + length * 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, at + length);
    src.connect(highpass).connect(lowpass).connect(gain).connect(out);
    src.start(at, Math.random() * 3, length + 0.05);
  };
  const level = THUNDER_CRACK_GAIN * near;
  clap(start, level, rand(0.4, 0.7));
  const echoes = Math.floor(rand(0, 3));
  let t = start;
  for (let i = 0; i < echoes; i++) {
    t += rand(0.08, 0.25);
    clap(t, level * rand(0.3, 0.6), rand(0.3, 0.5));
  }
}

/** The boom and its rolling echoes. */
export function thunderRumble(
  kit: AudioKit,
  start: number,
  distance: number,
  out: AudioNode
) {
  const ctx = kit.ctx;
  const near = 1 - distance;
  const duration = 2.5 + distance * 4 + Math.random() * 2.5;
  const src = ctx.createBufferSource();
  src.buffer = kit.brownNoise;
  src.playbackRate.value = rand(0.7, 1);
  const lowpass = ctx.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.setValueAtTime(
    550 + 1800 * near * near + Math.random() * 300,
    start
  );
  lowpass.frequency.exponentialRampToValueAtTime(
    160 + 80 * Math.random(),
    start + duration
  );
  const gain = ctx.createGain();
  const peak = THUNDER_GAIN * (0.55 + 0.45 * near);
  gain.gain.setValueAtTime(0, start);
  // Close: immediate boom; far: slow swelling rumble
  gain.gain.linearRampToValueAtTime(
    peak,
    start + rand(0.03, 0.08) + distance * 0.6
  );
  // Rolling: swells getting weaker, more and slower when far
  let t = start + 0.3 + distance * 0.5;
  let level = 1;
  while (t < start + duration - 0.5) {
    level *= rand(0.85, 1);
    gain.gain.linearRampToValueAtTime(peak * level * rand(0.45, 0.95), t);
    t += rand(0.2, 0.5) + distance * rand(0.2, 0.7);
  }
  gain.gain.linearRampToValueAtTime(0, start + duration);
  src.connect(lowpass).connect(gain).connect(out);

  // The rain steps back while it thunders (more for the close, loud ones)
  const duck = kit.rainBus.gain;
  const low = 1 - (1 - THUNDER_DUCKING) * (0.5 + 0.5 * near);
  duck.cancelScheduledValues(start);
  duck.setTargetAtTime(low, start, 0.08);
  duck.setTargetAtTime(1, start + duration * 0.6, duration * 0.25);
  // Looped: a long rumble would otherwise run past the end of the 4 s buffer and stop dead (a click)
  src.loop = true;
  src.start(start, Math.random() * 2, duration + 0.1);
}
