import {
  Channel,
  CHANNELS,
  degreeMidi,
  DrumId,
  InstrumentId,
  lofiOf,
  LofiSettings,
  noteLength,
  Song,
  songLength,
  volumeOf,
} from "./song";
import { INSTRUMENT_DEFS, InstrumentDef, Wave } from "./instruments";
import {
  lfsrNoise,
  pulseWave,
  roomImpulse,
  wave4Bit,
  whiteNoise,
} from "./synth";

/** Pulse waves: the part of the period up (the others: 0.75). */
const PULSE_WIDTHS: Partial<Record<Wave, number>> = {
  pulse12: 0.125,
  pulse25: 0.25,
};

/** The sequencer looks this far ahead (s) and wakes up this often (ms): steady tempo even when the page is busy. */
const LOOKAHEAD = 0.12;
const TICK = 25;
/** Flutter: a delay line whose length moves a little (the pitch floats like a worn tape). */
const WOW_DELAY = 0.008;
const WOW_DEPTH = 0.0035;
/** Loudness of the whole music at full volume. */
const MASTER = 0.55;
/** Most notes sounding at once (drums apart): beyond, the oldest one is cut short (voice stealing). */
const MAX_VOICES = 16;

interface Voice {
  gain: GainNode;
  sources: AudioScheduledSourceNode[];
  /** When it is silent (end of its release). */
  until: number;
}

const midiFreq = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

/**
 * Plays the songs of the music editor, every sound synthesized live (Web Audio, no sample files):
 * - the instruments are sheets of instruments.ts (layers, ADSR, filter, FM, delayed vibrato, breath), played by
 *   `voice`; at most MAX_VOICES at once (the oldest is cut short);
 * - drums: kick (sine falling in pitch), snare (15-bit LFSR noise through a band-pass, a short tone), hi-hat (7-bit
 *   LFSR noise: metallic, high-pass).
 * Each channel has its volume (mix); all go through the lo-fi chain: flutter → grain → warmth (low-pass) → a light
 * reverb, with hiss and vinyl crackles added while playing. Swing delays every second sixteenth.
 * The song is read again at each step: edits are heard right away while it loops.
 */
export class MusicEngine {
  private ctx?: AudioContext;
  private master?: GainNode;
  private buses?: Record<Channel, GainNode>;
  /** Where the instrument being played goes (its channel's bus). */
  private target?: AudioNode;
  private warmth?: BiquadFilterNode;
  private crusher?: WaveShaperNode;
  private wowDepth?: GainNode;
  private hissGain?: GainNode;
  private vinylGain?: GainNode;
  private beds: AudioBufferSourceNode[] = [];
  private noise?: AudioBuffer;
  private snareNoise?: AudioBuffer;
  private hatNoise?: AudioBuffer;
  private reverbSend?: GainNode;
  private readonly waves = new Map<Wave, PeriodicWave>();
  private voices: Voice[] = [];
  private crackles?: AudioBuffer;
  private grain = -1;
  /** Overall volume 0..1 (the game's music volume). */
  private output = 1;
  private timer?: ReturnType<typeof setInterval>;
  private song?: Song;
  private nextStep = 0;
  private nextTime = 0;
  /** Steps scheduled with the time they are heard, to show the playhead at the right moment. */
  private readonly queue: { step: number; time: number }[] = [];

  get playing(): boolean {
    return this.timer !== undefined;
  }

  /** Starts the sound (needs a touch / click, browsers block it before). */
  private audio(): AudioContext {
    if (!this.ctx) {
      this.build();
    }
    const ctx = this.ctx!;
    if (ctx.state !== "running") {
      void ctx.resume().catch(() => undefined);
    }
    return ctx;
  }

  private build(): void {
    const ctx = new AudioContext();
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = MASTER * this.output;
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -8;
    limiter.ratio.value = 10;
    this.master.connect(limiter).connect(ctx.destination);

    // Lo-fi chain: buses → flutter → grain → warmth → master
    this.warmth = ctx.createBiquadFilter();
    this.warmth.type = "lowpass";
    this.warmth.Q.value = 0.5;
    this.warmth.connect(this.master);
    // Light reverb: a send from the end of the chain into a small room
    const room = ctx.createConvolver();
    room.buffer = roomImpulse(ctx);
    this.reverbSend = ctx.createGain();
    this.warmth.connect(this.reverbSend).connect(room).connect(this.master);
    this.crusher = ctx.createWaveShaper();
    this.crusher.connect(this.warmth);
    const wow = ctx.createDelay(0.05);
    wow.delayTime.value = WOW_DELAY;
    wow.connect(this.crusher);
    this.wowDepth = ctx.createGain();
    this.wowDepth.gain.value = 0;
    this.wowDepth.connect(wow.delayTime);
    for (const [freq, share] of [
      [0.55, 1],
      [4.5, 0.12],
    ]) {
      const lfo = ctx.createOscillator();
      lfo.frequency.value = freq;
      const amount = ctx.createGain();
      amount.gain.value = share;
      lfo.connect(amount).connect(this.wowDepth);
      lfo.start();
    }
    this.buses = Object.fromEntries(
      CHANNELS.map((c) => {
        const bus = ctx.createGain();
        bus.connect(wow);
        return [c.id, bus];
      })
    ) as Record<Channel, GainNode>;

    // Noises: white (hiss, breath), LFSR (snare: 15 bits, hi-hat: 7 bits), crackles (sparse clicks)
    const length = ctx.sampleRate * 2;
    this.noise = whiteNoise(ctx);
    this.snareNoise = lfsrNoise(ctx, 15, 16_000);
    this.hatNoise = lfsrNoise(ctx, 7, 24_000);
    this.crackles = ctx.createBuffer(1, length, ctx.sampleRate);
    const crackles = this.crackles.getChannelData(0);
    for (let i = 0; i < length; i++) {
      if (Math.random() < 0.0004) {
        const size = 0.3 + Math.random() * 0.7;
        for (let k = 0; k < 40 && i + k < length; k++) {
          crackles[i + k] += (Math.random() * 2 - 1) * size * Math.exp(-k / 6);
        }
      }
    }
    this.hissGain = ctx.createGain();
    this.hissGain.connect(this.master);
    this.vinylGain = ctx.createGain();
    this.vinylGain.connect(this.master);
  }

  /** Overall volume 0..1, reached in about `seconds` (a fade). */
  setOutput(volume: number, seconds = 0.05): void {
    this.output = Math.min(Math.max(volume, 0), 1);
    if (this.ctx && this.master) {
      this.master.gain.cancelScheduledValues(this.ctx.currentTime);
      this.master.gain.setTargetAtTime(
        MASTER * this.output,
        this.ctx.currentTime,
        Math.max(seconds, 0.01) / 3
      );
    }
  }

  /** Plays the song in a loop from `fromStep`; `setSong` keeps it up to date while it plays. */
  play(song: Song, fromStep = 0): void {
    const ctx = this.audio();
    this.stop();
    this.setSong(song);
    this.nextStep = fromStep % songLength(song);
    this.nextTime = ctx.currentTime + 0.05;
    this.startBeds();
    this.timer = setInterval(() => this.schedule(), TICK);
    this.schedule();
  }

  /** The song (and its mix / lo-fi settings) to play from now on. */
  setSong(song: Song): void {
    this.song = song;
    if (this.ctx) {
      this.applySettings(song);
    }
  }

  stop(): void {
    if (this.timer !== undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
    this.queue.length = 0;
    this.beds.forEach((bed) => bed.stop());
    this.beds = [];
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
    return this.queue[0] && this.queue[0].time <= now
      ? this.queue[0].step
      : null;
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

  /** One note, now (touching the grid, trying a scale), with the song's mix and lo-fi sound. */
  previewNote(
    song: Song,
    instrument: InstrumentId,
    degree: number,
    at = 0,
    steps = 1
  ): void {
    const ctx = this.audio();
    this.applySettings(song);
    this.note(
      instrument,
      degreeMidi(song, degree),
      ctx.currentTime + 0.01 + at,
      this.stepDuration(song),
      steps
    );
  }

  previewDrum(song: Song, drum: DrumId): void {
    const ctx = this.audio();
    this.applySettings(song);
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

  private applySettings(song: Song): void {
    const ctx = this.ctx!;
    const now = ctx.currentTime;
    const lofi = lofiOf(song);
    for (const channel of CHANNELS) {
      this.buses![channel.id].gain.setTargetAtTime(
        volumeOf(song, channel.id),
        now,
        0.02
      );
    }
    // Warmth: 20 kHz (open) down to 1.2 kHz
    this.warmth!.frequency.setTargetAtTime(
      20_000 * Math.pow(1200 / 20_000, lofi.warmth),
      now,
      0.03
    );
    this.wowDepth!.gain.setTargetAtTime(WOW_DEPTH * lofi.wobble, now, 0.05);
    this.hissGain!.gain.setTargetAtTime(0.05 * lofi.hiss, now, 0.05);
    this.vinylGain!.gain.setTargetAtTime(0.5 * lofi.vinyl, now, 0.05);
    this.reverbSend!.gain.setTargetAtTime(0.6 * lofi.reverb, now, 0.05);
    this.setGrain(lofi);
  }

  /** Grain: the wave rounded to fewer levels (from 2^14 down to 2^3); none at 0. */
  private setGrain(lofi: LofiSettings): void {
    const grain = Math.round(lofi.grain * 20) / 20;
    if (grain === this.grain) {
      return;
    }
    this.grain = grain;
    if (grain === 0) {
      this.crusher!.curve = null;
      return;
    }
    const levels = Math.pow(2, 14 - grain * 11);
    const size = 4096;
    const curve = new Float32Array(size);
    for (let i = 0; i < size; i++) {
      const x = (i / (size - 1)) * 2 - 1;
      curve[i] = Math.round(x * levels) / levels;
    }
    this.crusher!.curve = curve;
  }

  /** Hiss and crackles: loops playing under the music while it plays. */
  private startBeds(): void {
    const ctx = this.ctx!;
    const hiss = ctx.createBufferSource();
    hiss.buffer = this.noise!;
    hiss.loop = true;
    const hissFilter = ctx.createBiquadFilter();
    hissFilter.type = "bandpass";
    hissFilter.frequency.value = 5000;
    hissFilter.Q.value = 0.4;
    hiss.connect(hissFilter).connect(this.hissGain!);
    const vinyl = ctx.createBufferSource();
    vinyl.buffer = this.crackles!;
    vinyl.loop = true;
    const vinylFilter = ctx.createBiquadFilter();
    vinylFilter.type = "bandpass";
    vinylFilter.frequency.value = 2500;
    vinylFilter.Q.value = 0.6;
    vinyl.connect(vinylFilter).connect(this.vinylGain!);
    hiss.start();
    vinyl.start();
    this.beds = [hiss, vinyl];
  }

  private schedule(): void {
    const ctx = this.ctx;
    const song = this.song;
    if (!ctx || !song) {
      return;
    }
    const length = songLength(song);
    const swing = lofiOf(song).swing;
    while (this.nextTime < ctx.currentTime + LOOKAHEAD) {
      const step = this.nextStep % length;
      const duration = this.stepDuration(song);
      // Swing: every second sixteenth comes a little late
      const time =
        this.nextTime + (step % 2 === 1 ? swing * duration * 0.45 : 0);
      for (const note of song.notes) {
        if (note.step === step) {
          this.note(
            note.instrument,
            degreeMidi(song, note.degree),
            time,
            duration,
            noteLength(note)
          );
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

  /** A note held `steps` steps (`step`: one step's duration, s). */
  private note(
    instrument: InstrumentId,
    midi: number,
    time: number,
    step: number,
    steps = 1
  ): void {
    this.target = this.buses![instrument];
    this.voice(INSTRUMENT_DEFS[instrument], midiFreq(midi), time, step, steps);
  }

  /** The wave of a layer: a Web Audio one, or a computed one (pulses, 4-bit wave), made once. */
  private setWave(osc: OscillatorNode, wave: Wave): void {
    if (
      wave === "sine" ||
      wave === "triangle" ||
      wave === "sawtooth" ||
      wave === "square"
    ) {
      osc.type = wave;
      return;
    }
    let periodic = this.waves.get(wave);
    if (!periodic) {
      const ctx = this.ctx!;
      periodic =
        wave === "wave4"
          ? wave4Bit(ctx)
          : pulseWave(ctx, PULSE_WIDTHS[wave] ?? 0.75);
      this.waves.set(wave, periodic);
    }
    osc.setPeriodicWave(periodic);
  }

  /**
   * Plays one instrument sheet: its layers (through its filter), the envelope (attack, decay to the sustain, release
   * at the end), FM, delayed vibrato, breath. 'held' notes last their length; 'ring' ones decay by themselves, slower
   * when held longer.
   */
  private voice(
    def: InstrumentDef,
    freq: number,
    time: number,
    step: number,
    steps: number
  ): void {
    const ctx = this.ctx!;
    const held = steps * step;
    let end: number;
    let decay = def.env.d;
    if (def.kind === "ring") {
      const ring = Math.max(def.short, held);
      decay *= Math.max(1, ring / def.short);
      end = time + ring;
    } else {
      end =
        time +
        Math.max(
          steps > 1 ? held * 0.95 : step * def.short,
          (def.minSteps ?? 0) * step
        );
    }
    const stop = end + def.env.r * 1.6 + 0.1;
    this.stealVoice(time);

    const out = this.envelope(
      time,
      def.peak,
      def.env.a,
      decay / 3,
      def.env.s,
      end,
      def.env.r / 3
    );
    let into: AudioNode = out;
    if (def.filter) {
      const filter = this.lowpass(def.filter.freq, out, def.filter.q ?? 0.7);
      filter.type = def.filter.type;
      if (def.filter.sweepTo) {
        filter.frequency.setValueAtTime(def.filter.freq, time);
        filter.frequency.setTargetAtTime(
          Math.max(freq * def.filter.sweepTo, def.filter.sweepMin ?? 0),
          time,
          def.filter.sweepTime ?? 0.06
        );
      }
      into = filter;
    }
    const sources: AudioScheduledSourceNode[] = [];
    const oscs = def.layers.map((layer) => {
      const osc = ctx.createOscillator();
      this.setWave(osc, layer.wave);
      osc.frequency.value = freq * (layer.ratio ?? 1);
      osc.detune.value = layer.detune ?? 0;
      if (layer.gain !== undefined && layer.gain !== 1) {
        const gain = ctx.createGain();
        gain.gain.value = layer.gain;
        osc.connect(gain).connect(into);
      } else {
        osc.connect(into);
      }
      osc.start(time);
      osc.stop(stop);
      sources.push(osc);
      return osc;
    });
    if (def.fm) {
      // A sine at `ratio` × the frequency moves the first layer's pitch, less and less
      const depth = ctx.createGain();
      depth.gain.setValueAtTime(freq * def.fm.index, time);
      depth.gain.setTargetAtTime(0, time, def.fm.time);
      depth.connect(oscs[0].frequency);
      const modulator = this.osc(
        "sine",
        freq * def.fm.ratio,
        time,
        stop,
        depth
      );
      sources.push(modulator);
    }
    if (def.vibrato) {
      // Delayed vibrato: the LFO's depth rises after `delay`
      const depth = ctx.createGain();
      depth.gain.setValueAtTime(0, time);
      depth.gain.setValueAtTime(0, time + def.vibrato.delay);
      depth.gain.linearRampToValueAtTime(
        def.vibrato.cents,
        time + def.vibrato.delay + 0.2
      );
      oscs.forEach((osc) => depth.connect(osc.detune));
      sources.push(this.osc("sine", def.vibrato.rate, time, stop, depth));
    }
    if (def.breath) {
      const breath = ctx.createBufferSource();
      breath.buffer = this.noise!;
      const band = ctx.createBiquadFilter();
      band.type = "bandpass";
      band.frequency.value = def.breath.freq;
      band.Q.value = 0.8;
      const gain = ctx.createGain();
      gain.gain.value = def.breath.gain;
      breath.connect(band).connect(gain).connect(out);
      breath.start(time, Math.random() * 1.5);
      breath.stop(stop);
      sources.push(breath);
    }
    this.voices.push({ gain: out, sources, until: stop });
  }

  /** Too many notes at `time`: the oldest one still sounding is cut short (a quick fade, no click). */
  private stealVoice(time: number): void {
    this.voices = this.voices.filter((v) => v.until > time);
    while (this.voices.length >= MAX_VOICES) {
      const oldest = this.voices.shift()!;
      oldest.gain.gain.cancelScheduledValues(time);
      oldest.gain.gain.setTargetAtTime(0, time, 0.008);
      oldest.sources.forEach((source) => source.stop(time + 0.05));
    }
  }

  /** Volume envelope: attack, then down to `sustain` (time constant `decay`), released at `end`; into the current
   * channel's bus. */
  private envelope(
    time: number,
    peak: number,
    attack: number,
    decay: number,
    sustain: number,
    end: number,
    release: number
  ): GainNode {
    const ctx = this.ctx!;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(peak, time + attack);
    gain.gain.setTargetAtTime(peak * sustain, time + attack, decay);
    gain.gain.setTargetAtTime(0, end, release);
    gain.connect(this.target!);
    return gain;
  }

  private osc(
    type: OscillatorType,
    freq: number,
    time: number,
    stop: number,
    out: AudioNode
  ): OscillatorNode {
    const osc = this.ctx!.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(out);
    osc.start(time);
    osc.stop(stop);
    return osc;
  }

  private lowpass(freq: number, out: AudioNode, q = 0.7): BiquadFilterNode {
    const filter = this.ctx!.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = freq;
    filter.Q.value = q;
    filter.connect(out);
    return filter;
  }

  /** Drums: kick (sine 150 → 40 Hz), snare (15-bit LFSR noise, band-pass, a short tone), hi-hat (7-bit LFSR, high). */
  private drum(drum: DrumId, time: number): void {
    const ctx = this.ctx!;
    this.target = this.buses!.drums;
    if (drum === "kick") {
      const out = this.envelope(time, 0.9, 0.002, 0.05, 0, time + 0.06, 0.05);
      const osc = this.osc("sine", 150, time, time + 0.4, out);
      osc.frequency.setValueAtTime(150, time);
      osc.frequency.exponentialRampToValueAtTime(40, time + 0.1);
      return;
    }
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    if (drum === "snare") {
      source.buffer = this.snareNoise!;
      filter.type = "bandpass";
      filter.frequency.value = 2200;
      filter.Q.value = 0.7;
      source
        .connect(filter)
        .connect(this.envelope(time, 0.3, 0.001, 0.04, 0, time + 0.02, 0.04));
      this.osc(
        "triangle",
        185,
        time,
        time + 0.15,
        this.envelope(time, 0.14, 0.001, 0.03, 0, time + 0.02, 0.03)
      );
      source.start(time, Math.random() * 0.5, 0.35);
    } else {
      source.buffer = this.hatNoise!;
      filter.type = "highpass";
      filter.frequency.value = 6000;
      source
        .connect(filter)
        .connect(this.envelope(time, 0.1, 0.001, 0.014, 0, time + 0.01, 0.014));
      source.start(time, Math.random() * 0.5, 0.12);
    }
  }
}
