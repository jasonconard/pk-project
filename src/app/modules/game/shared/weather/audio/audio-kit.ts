/**
 * What the weather's one-shot sounds are made with: the audio context, the master output, white and brown noise
 * (4 s loops), the rain bus (lowered while it thunders), and small node makers. Made by WeatherAudio when the sound
 * starts.
 */
export class AudioKit {
  constructor(
    readonly ctx: AudioContext,
    readonly master: GainNode,
    readonly noise: AudioBuffer,
    readonly brownNoise: AudioBuffer,
    readonly rainBus: GainNode
  ) {}

  /** A stereo panner (-1 left .. 1 right) into the master. */
  panned(side: number): StereoPannerNode {
    const pan = this.ctx.createStereoPanner();
    pan.pan.value = side;
    pan.connect(this.master);
    return pan;
  }

  highpass(freq: number) {
    const f = this.ctx.createBiquadFilter();
    f.type = "highpass";
    f.frequency.value = freq;
    return f;
  }

  lowpass(freq: number) {
    const f = this.ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = freq;
    return f;
  }

  bandpass(freq: number, q: number) {
    const f = this.ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = freq;
    f.Q.value = q;
    return f;
  }
}
