/**
 * Small building blocks of the music synthesizer (Web Audio, nothing loaded), in the spirit of the Game Boy Advance:
 * pulse waves of any duty cycle, the 4-bit "wave" channel, LFSR noise, a short reverb.
 */

/** Pulse wave of duty cycle `duty` (0.125, 0.25, 0.5, 0.75): Fourier series of the pulse (64 harmonics). */
export function pulseWave(ctx: BaseAudioContext, duty: number): PeriodicWave {
  const harmonics = 64;
  const real = new Float32Array(harmonics + 1);
  const imag = new Float32Array(harmonics + 1);
  for (let n = 1; n <= harmonics; n++) {
    real[n] = (2 / (n * Math.PI)) * Math.sin(n * Math.PI * duty);
  }
  return ctx.createPeriodicWave(real, imag);
}

/**
 * The "wave" channel: a 32-sample table on 16 levels (4 bits), here a triangle — round and soft, with the little
 * steps of the GBA. Turned into a periodic wave (its 16 harmonics keep the steps).
 */
export function wave4Bit(ctx: BaseAudioContext): PeriodicWave {
  const size = 32;
  const table = Array.from({ length: size }, (_, i) => {
    const triangle = i < size / 2 ? i / (size / 2) : 2 - i / (size / 2);
    return Math.round(triangle * 15) / 15 * 2 - 1;
  });
  const real = new Float32Array(size / 2 + 1);
  const imag = new Float32Array(size / 2 + 1);
  for (let k = 1; k <= size / 2; k++) {
    for (let i = 0; i < size; i++) {
      real[k] += table[i] * Math.cos((2 * Math.PI * k * i) / size) * 2 / size;
      imag[k] += table[i] * Math.sin((2 * Math.PI * k * i) / size) * 2 / size;
    }
  }
  return ctx.createPeriodicWave(real, imag);
}

/**
 * LFSR noise of the Game Boy: a 15-bit register (a hiss) or 7-bit (a short loop: metallic), shifted `clock` times per
 * second. One second of it, to loop.
 */
export function lfsrNoise(ctx: BaseAudioContext, bits: 7 | 15, clock: number): AudioBuffer {
  const length = ctx.sampleRate;
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lfsr = 0x7fff;
  let phase = 0;
  const step = clock / ctx.sampleRate;
  for (let i = 0; i < length; i++) {
    phase += step;
    while (phase >= 1) {
      phase -= 1;
      const bit = (lfsr ^ (lfsr >> 1)) & 1;
      lfsr = (lfsr >> 1) | (bit << 14);
      if (bits === 7) {
        lfsr = (lfsr & ~0x40) | (bit << 6);
      }
    }
    data[i] = lfsr & 1 ? -0.8 : 0.8;
  }
  return buffer;
}

/** White noise (breath of the flute), two seconds to loop. */
export function whiteNoise(ctx: BaseAudioContext): AudioBuffer {
  const length = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

/** A small room: stereo noise fading out over `seconds` (impulse response of a light reverb). */
export function roomImpulse(ctx: BaseAudioContext, seconds = 1.1): AudioBuffer {
  const length = Math.round(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3);
    }
  }
  return buffer;
}
