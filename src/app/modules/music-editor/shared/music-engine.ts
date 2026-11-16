import { degreeMidi, DrumId, InstrumentId, Song, songLength } from './song';

/** The sequencer looks this far ahead (s) and wakes up this often (ms): steady tempo even when the page is busy. */
const LOOKAHEAD = 0.12;
const TICK = 25;

const midiFreq = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

/**
 * Plays the songs of the music editor, every sound synthesized live (Web Audio, no sample files):
 * - lead: square wave (Game Boy like); bell: FM (two sines); pluck: sawtooth with a closing filter (a plucked
 *   string); bass: triangle with a sine an octave below; pad: two detuned sawtooths, soft filter, slow attack;
 * - drums: kick (sine falling in pitch), snare (filtered noise and a short tone), hi-hat (high noise).
 * The song is read again at each step: edits are heard right away while it loops.
 */
export class MusicEngine {
  private ctx?: AudioContext;
  private master?: GainNode;
  private noise?: AudioBuffer;
  private timer?: ReturnType<typeof setInterval>;
  private song?: Song;
  private nextStep = 0;
  private nextTime = 0;
  /** Steps scheduled with the time they are heard, to show the playhead at the right moment. */
  private readonly queue: { step: number, time: number }[] = [];

  get playing(): boolean {
    return this.timer !== undefined;
  }

  /** Starts the sound (needs a touch / click, browsers block it before). */
  private audio(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.55;
      const limiter = this.ctx.createDynamicsCompressor();
      limiter.threshold.value = -8;
      limiter.ratio.value = 10;
      this.master.connect(limiter).connect(this.ctx.destination);
      const length = this.ctx.sampleRate;
      this.noise = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
      const data = this.noise.getChannelData(0);
      for (let i = 0; i < length; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    }
    if (this.ctx.state !== 'running') {
      void this.ctx.resume().catch(() => undefined);
    }
    return this.ctx;
  }

  /** Plays the song in a loop from `fromStep`; `setSong` keeps it up to date while it plays. */
  play(song: Song, fromStep = 0): void {
    const ctx = this.audio();
    this.stop();
    this.song = song;
    this.nextStep = fromStep % songLength(song);
    this.nextTime = ctx.currentTime + 0.05;
    this.timer = setInterval(() => this.schedule(), TICK);
    this.schedule();
  }

  setSong(song: Song): void {
    this.song = song;
  }

  stop(): void {
    if (this.timer !== undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
    this.queue.length = 0;
  }

  /** Step heard now (for the playhead), or null when stopped. */
  currentStep(): number | null {
    if (!this.ctx || !this.playing) {
      return null;
    }
    const now = this.ctx.currentTime;
    while (this.queue.length > 1 && this.queue[1].time <= now) {
      this.queue.shift();
    }
    return this.queue[0] && this.queue[0].time <= now ? this.queue[0].step : null;
  }

  /** Pause in the background (and resume on return). */
  setSuspended(suspended: boolean): void {
    if (!this.ctx) {
      return;
    }
    if (suspended) {
      this.stop();
      void this.ctx.suspend().catch(() => undefined);
    } else {
      void this.ctx.resume().catch(() => undefined);
    }
  }

  /** One note, now (touching the grid, trying a scale). */
  previewNote(song: Song, instrument: InstrumentId, degree: number, at = 0): void {
    const ctx = this.audio();
    this.note(instrument, degreeMidi(song, degree), ctx.currentTime + 0.01 + at, this.stepDuration(song));
  }

  previewDrum(drum: DrumId): void {
    const ctx = this.audio();
    this.drum(drum, ctx.currentTime + 0.01);
  }

  dispose(): void {
    this.stop();
    void this.ctx?.close().catch(() => undefined);
    this.ctx = undefined;
  }

  private stepDuration(song: Song): number {
    return 60 / song.bpm / 4;
  }

  private schedule(): void {
    const ctx = this.ctx;
    const song = this.song;
    if (!ctx || !song) {
      return;
    }
    const length = songLength(song);
    while (this.nextTime < ctx.currentTime + LOOKAHEAD) {
      const step = this.nextStep % length;
      const time = this.nextTime;
      const duration = this.stepDuration(song);
      for (const note of song.notes) {
        if (note.step === step) {
          this.note(note.instrument, degreeMidi(song, note.degree), time, duration);
        }
      }
      for (const hit of song.drums) {
        if (hit.step === step) {
          this.drum(hit.drum, time);
        }
      }
      this.queue.push({ step, time });
      this.nextTime += duration;
      this.nextStep = (step + 1) % length;
    }
  }

  // --- Instruments ---

  private note(instrument: InstrumentId, midi: number, time: number, step: number): void {
    const freq = midiFreq(midi);
    switch (instrument) {
      case 'lead': return this.lead(freq, time, step * 1.6);
      case 'bell': return this.bell(freq, time);
      case 'pluck': return this.pluck(freq, time);
      case 'bass': return this.bass(freq, time, step * 1.8);
      case 'pad': return this.pad(freq, time, step * 4);
    }
  }

  /** Volume envelope: attack, then down to `sustain`, released at `end`. */
  private envelope(time: number, peak: number, attack: number, decay: number, sustain: number, end: number, release: number): GainNode {
    const ctx = this.ctx!;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(peak, time + attack);
    gain.gain.setTargetAtTime(peak * sustain, time + attack, decay);
    gain.gain.setTargetAtTime(0, end, release);
    gain.connect(this.master!);
    return gain;
  }

  private osc(type: OscillatorType, freq: number, time: number, stop: number, out: AudioNode, detune = 0): OscillatorNode {
    const osc = this.ctx!.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    osc.detune.value = detune;
    osc.connect(out);
    osc.start(time);
    osc.stop(stop);
    return osc;
  }

  private lowpass(freq: number, out: AudioNode, q = 0.7): BiquadFilterNode {
    const filter = this.ctx!.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = freq;
    filter.Q.value = q;
    filter.connect(out);
    return filter;
  }

  private lead(freq: number, time: number, length: number): void {
    const out = this.envelope(time, 0.13, 0.005, 0.08, 0.55, time + length, 0.04);
    this.osc('square', freq, time, time + length + 0.3, this.lowpass(3200, out));
  }

  private bell(freq: number, time: number): void {
    const ctx = this.ctx!;
    const out = this.envelope(time, 0.22, 0.003, 0.5, 0, time + 1.6, 0.3);
    const carrier = this.osc('sine', freq, time, time + 2.5, out);
    // FM: a sine at 3.5 × the frequency moves the carrier's pitch, less and less (metallic attack, pure tail)
    const depth = ctx.createGain();
    depth.gain.setValueAtTime(freq * 2.2, time);
    depth.gain.setTargetAtTime(0, time, 0.25);
    depth.connect(carrier.frequency);
    this.osc('sine', freq * 3.5, time, time + 2.5, depth);
  }

  private pluck(freq: number, time: number): void {
    const out = this.envelope(time, 0.2, 0.002, 0.18, 0, time + 0.9, 0.1);
    const filter = this.lowpass(5000, out, 1.5);
    filter.frequency.setValueAtTime(5000, time);
    filter.frequency.setTargetAtTime(Math.max(freq * 1.5, 300), time, 0.06);
    this.osc('sawtooth', freq, time, time + 1.2, filter);
  }

  private bass(freq: number, time: number, length: number): void {
    const out = this.envelope(time, 0.32, 0.006, 0.12, 0.6, time + length, 0.05);
    this.osc('triangle', freq, time, time + length + 0.4, out);
    this.osc('sine', freq / 2, time, time + length + 0.4, out);
  }

  private pad(freq: number, time: number, length: number): void {
    const out = this.envelope(time, 0.07, 0.12, 0.4, 0.8, time + length, 0.35);
    const filter = this.lowpass(1400, out);
    this.osc('sawtooth', freq, time, time + length + 1.5, filter, -8);
    this.osc('sawtooth', freq, time, time + length + 1.5, filter, 8);
  }

  private drum(drum: DrumId, time: number): void {
    const ctx = this.ctx!;
    if (drum === 'kick') {
      const out = this.envelope(time, 0.9, 0.002, 0.08, 0, time + 0.05, 0.06);
      const osc = this.osc('sine', 150, time, time + 0.4, out);
      osc.frequency.setValueAtTime(150, time);
      osc.frequency.exponentialRampToValueAtTime(42, time + 0.12);
      return;
    }
    const source = ctx.createBufferSource();
    source.buffer = this.noise!;
    const filter = ctx.createBiquadFilter();
    if (drum === 'snare') {
      filter.type = 'highpass';
      filter.frequency.value = 1200;
      source.connect(filter).connect(this.envelope(time, 0.32, 0.001, 0.05, 0, time + 0.02, 0.05));
      this.osc('triangle', 185, time, time + 0.15, this.envelope(time, 0.18, 0.001, 0.03, 0, time + 0.02, 0.03));
      source.start(time, Math.random() * 0.5, 0.3);
    } else {
      filter.type = 'highpass';
      filter.frequency.value = 7500;
      source.connect(filter).connect(this.envelope(time, 0.12, 0.001, 0.015, 0, time + 0.01, 0.015));
      source.start(time, Math.random() * 0.5, 0.1);
    }
  }
}
