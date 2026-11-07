/**
 * Weather sounds, with the Web Audio API:
 * - rain, drizzle, wind (and sand hiss): synthesized from noise, following the weather live;
 * - thunder: synthesized rumble played a little after each lightning flash;
 * - volcanic: deep synthesized ground rumble, and random crackles / pops (embers);
 * - blizzard: howling wind (whistling resonances gliding up and down, like wind in the gaps);
 * - darkness: oppressive ambience: deep beating drone, slow "breathing", now and then a far knock, a creak,
 *   a whisper or a heartbeat;
 * - forest: leaves rustling with the wind; by day birds (trills, whistles, chirps, a far cuckoo, a woodpecker),
 *   at night crickets and an owl;
 * - electric field: crackling zaps of the arcs near the player, and a buzzing hum while they are close;
 * - hail: dense random ticks of pellets on the roofs; sea mist: waves breathing and gulls far away;
 * - magic snow / star dust: crystal chimes; solar storm: radio static bursts;
 *   curse: whispers;
 * - frost: ice cracking; haunted mist: ghostly moans; flood: water lapping; tornado: roar (by distance);
 * - blood moon: a deep dissonant drone throbbing with the red light, heartbeats, wolves howling far away;
 * - monsoon: a chorus of frogs croaking, each on its own rhythm;
 * - smog: the city far away (traffic rumble, horns, a siren now and then);
 * - fireworks: the rockets whistling up, the bursts banging and crackling;
 * - acid rain: sizzling (the ground being eaten);
 * - earthquake: deep rumble and things rattling, following the quake strength;
 * - geysers: gurgling then a burst when one erupts, steam hissing (by closeness);
 * - time warp: a slowed-down clock ticking with long echoes over a deep wavering drone;
 * - inverted world: sounds played backwards (swells cut short, bells rising to a sudden stop);
 * - poison: thick toxic bubbles popping (alone or in gurgling bursts) over a low bubbling bed;
 * - footsteps: CC0 samples (src/assets/sounds) on dry ground / snow; on wet ground and in the puddles the ground
 *   steps get a synthesized wet layer (splash noise + water drop "plinks").
 *
 * Browsers only allow sound after a user gesture: the audio starts at the first key press / click.
 */

export type StepSurface = 'ground' | 'snow' | 'water';

/** One lightning bolt of a strike: start (s after the strike), distance 0 (overhead) .. 1 (far), side -1 .. 1. */
export interface ThunderBolt {
  at: number;
  distance: number;
  pan: number;
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/** Live weather values driving the ambiences (0..1, wind can go a bit above 1 in a gust). */
export interface AmbienceLevels {
  rain: number;
  drizzle: number;
  wind: number;
  sand: number;
  /** Volcanic weather: rumble and crackles. */
  lava: number;
  /** Poisoned climate: toxic bubbles. */
  poison: number;
  /** Blizzard: howling wind. */
  howl: number;
  /** Darkness: oppressive ambience. */
  darkness: number;
  /** Forest sounds, and the daylight 0 (night) .. 1 (day): birds by day, crickets / owl at night. */
  forest: number;
  daylight: number;
  /** Hail ticking, sea (waves, gulls), birds singing (without the forest). */
  hail: number;
  sea: number;
  birds: number;
  /** Crystal chimes, radio static, whispers. */
  chimes: number;
  static: number;
  whispers: number;
  /** Ice cracking, ghostly moans, water lapping (waves without gulls), tornado roar (by closeness). */
  crackle: number;
  moan: number;
  lapping: number;
  roar: number;
  /** Ash fall: soft distant crackling (the fire far away). */
  ashCrackle: number;
  /** Closeness of a petal whirlwind: swirling gust of wind. */
  whirl: number;
  /** Blood moon oppressive ambience. */
  bloodMoon: number;
  /** Current earthquake strength 0..1. */
  quake: number;
  /** Steam hissing (geysers, by closeness and eruption). */
  steam: number;
  /** Time warp: slow clock and drone. */
  timeWarp: number;
  /** Inverted world: backwards sounds. */
  inverted: number;
  /** Reversed gravity: endlessly rising airy whoosh. */
  antigravity: number;
  /** Old film: projector whirr and crackles. */
  oldFilm: number;
  /** Frogs croaking (monsoon). */
  frogs: number;
  /** Crickets without the forest (starry night). */
  crickets: number;
  /** Distant city (smog). */
  city: number;
  /** Acid rain sizzling. */
  sizzle: number;
}

type SampledSurface = Exclude<StepSurface, 'water'>;
const STEP_FILES: Record<SampledSurface, string[]> = {
  ground: [1, 2, 3, 4, 5, 6].map(i => `assets/sounds/steps/ground-${i}.m4a`),
  snow: [1, 2, 3, 4, 5, 6].map(i => `assets/sounds/steps/snow-${i}.m4a`),
};
/** Loudness of each sound family (before the master volume). */
const STEP_GAIN: Record<StepSurface, number> = { ground: 0.35, snow: 0.5, water: 0.3 };
const RAIN_GAIN = 0.2;
/** The rain gets quieter while it thunders (share of its volume at the loudest of the thunder). */
const THUNDER_DUCKING = 0.45;
const DRIZZLE_GAIN = 0.16;
const WIND_GAIN = 0.22;
const SAND_GAIN = 0.12;
const THUNDER_GAIN = 1.3;
const THUNDER_CRACK_GAIN = 0.8;
/** Wet layer: splash noise in a puddle, and the water drop "plinks" (lighter on wet ground). */
const SPLASH_GAIN = 0.22;
/** Volcanic: deep rumble loudness, crackles per second and their loudness. */
const RUMBLE_GAIN = 0.5;
const CRACKLE_RATE = 7;
const CRACKLE_GAIN = 0.16;
/** Poison: bubble bursts per second, bubble loudness, low bubbling bed loudness. */
const BUBBLE_RATE = 3.5;
const BUBBLE_GAIN = 0.28;
const SWAMP_GAIN = 0.12;
/** Blizzard howl: loudness, and the whistles (base pitch Hz, how far they glide, resonance sharpness). */
const HOWL_GAIN = 0.8;
/** Darkness: drone, breathing and distant sounds loudness; seconds between two distant sounds. */
/** Electric arcs: zap loudness, buzzing hum loudness (follows the nearby activity), max zaps per second. */
const ZAP_GAIN = 0.3;
const HUM_GAIN = 0.1;
const MAX_ZAPS_PER_SECOND = 14;
/** Hail: ticks per second at hail = 1 and their loudness. */
const HAIL_TICKS = 14;
const HAIL_GAIN = 0.13;
/** Sea: waves loudness (a slow swell every WAVE_PERIOD s), gulls loudness and seconds between two. */
const WAVE_GAIN = 0.3;
const WAVE_PERIOD = 8;
const GULL_GAIN = 0.1;
const GULL_INTERVAL = [4, 12] as const;
/** Chimes per second (at 1) and loudness; radio static loudness; seconds between whispers. */
const CHIME_RATE = 1.6;
const CHIME_GAIN = 0.07;
const CHIME_NOTES = [1047, 1175, 1319, 1568, 1760, 2093, 2349, 2637, 3136];
const STATIC_GAIN = 0.12;
const WHISPER_INTERVAL = [4, 10] as const;
/** Ice cracks per second at 1, moan loudness / seconds between two, tornado roar loudness. */
const CRACK_RATE = 2.5;
/** Ash fall: crackles per second and their loudness (share of the volcanic crackles). */
const ASH_CRACKLE_RATE = 3;
const ASH_CRACKLE_LEVEL = 0.45;
/** Petal whirlwind: swirling wind loudness at the closest. */
const WHIRL_GAIN = 0.35;
const CRACK_GAIN = 0.12;
const MOAN_GAIN = 0.16;
const MOAN_INTERVAL = [5, 12] as const;
const ROAR_GAIN = 0.7;
/** Earthquake: rumble loudness and rattles per second at full strength. */
const QUAKE_GAIN = 0.8;
/** Geysers: steam hiss loudness, eruption burst loudness. */
const STEAM_GAIN = 0.3;
/** Time warp: slowed clock tick loudness and period (s), drone loudness. */
const TICK_GAIN = 0.25;
/** Inverted world: backwards sounds loudness and seconds between two. */
const REVERSE_GAIN = 0.18;
const REVERSE_INTERVAL = [2, 5] as const;
const TICK_PERIOD = 1.6;
const WARP_DRONE_GAIN = 0.12;
/** Reversed gravity: rising whoosh loudness, sweeps per second, and its filter sweep (Hz, center ± depth). */
const FLOAT_GAIN = 0.1;
/** Old film: projector whirr loudness, shutter rate (Hz), crackles per second and their loudness. */
const PROJECTOR_GAIN = 0.07;
const SHUTTER_RATE = 18;
const FILM_CRACKLE_RATE = 7;
const FILM_CRACKLE_GAIN = 0.12;
const FLOAT_SWEEP_RATE = 0.22;
const FLOAT_SWEEP = [1300, 900] as const;
const GEYSER_BURST_GAIN = 0.5;
const RATTLE_RATE = 18;
/** Blood moon: drone loudness, seconds between two heartbeat bouts / two howls, howl loudness. */
const BLOOD_DRONE_GAIN = 0.2;
const BLOOD_HEART_INTERVAL = [9, 18] as const;
const BLOOD_HOWL_INTERVAL = [14, 28] as const;
const HOWL_CALL_GAIN = 0.1;
/** Frogs: croak loudness, seconds between two croaks of a frog. */
const FROG_GAIN = 0.09;
const FROG_INTERVAL = [0.8, 3.5] as const;
/** Distant city: traffic rumble loudness, seconds between two horns, chance that the event is a siren. */
const TRAFFIC_GAIN = 0.16;
const HORN_GAIN = 0.05;
const HORN_INTERVAL = [4, 11] as const;
const SIREN_CHANCE = 0.15;
/** Fireworks: whistle and bang loudness. */
const ROCKET_GAIN = 0.035;
const BANG_GAIN = 0.55;
/** Acid rain: sizzling loudness. */
const SIZZLE_GAIN = 0.09;
const DRONE_GAIN = 0.22;
const BREATH_GAIN = 0.16;
const DREAD_GAIN = 0.35;
const DREAD_INTERVAL = [6, 16] as const;
/** Forest: leaves rustle loudness, birds / owl loudness and seconds between two songs, crickets loudness. */
const RUSTLE_GAIN = 0.14;
const BIRD_GAIN = 0.12;
const BIRD_INTERVAL = [0.8, 4] as const;
const CRICKET_GAIN = 0.035;
const OWL_GAIN = 0.2;
const OWL_INTERVAL = [12, 28] as const;
const HOWL_VOICES = [
  { freq: 520, glide: 0.35, q: 18, speed: 0.23 },
  { freq: 780, glide: 0.3, q: 22, speed: 0.31 },
  { freq: 340, glide: 0.25, q: 12, speed: 0.17 },
] as const;
const PLINK_GAIN = 0.12;
const WET_GROUND_LAYER = 0.35;
/** How fast the ambiences follow the weather (s, time constant). */
const AMBIENCE_SMOOTHING = 0.4;

export class WeatherAudio {
  private ctx?: AudioContext;
  private master?: GainNode;
  /** Rain and drizzle go through this bus, lowered while it thunders. */
  private rainBus?: GainNode;
  private noise?: AudioBuffer;
  private brownNoise?: AudioBuffer;
  private rainGain?: GainNode;
  private rainFilter?: BiquadFilterNode;
  private dropsGain?: GainNode;
  private drizzleGain?: GainNode;
  private windGain?: GainNode;
  private windFilter?: BiquadFilterNode;
  private sandGain?: GainNode;
  private rumbleGain?: GainNode;
  private rumbleFilter?: BiquadFilterNode;
  private swampGain?: GainNode;
  private swampFilter?: BiquadFilterNode;
  private readonly howls: { gain: GainNode, filter: BiquadFilterNode }[] = [];
  private droneGain?: GainNode;
  private breathGain?: GainNode;
  private breathFilter?: BiquadFilterNode;
  private dreadTimer = 4;
  private sizzleGain?: GainNode;
  private trafficGain?: GainNode;
  private trafficFilter?: BiquadFilterNode;
  private hornTimer = 3;
  /** Each frog: time until its next croak, its pitch and side. */
  private readonly frogsState = [0, 1, 2, 3].map(() => ({ timer: Math.random() * 2, pitch: rand(170, 340), side: rand(-0.9, 0.9) }));
  private bloodDroneGain?: GainNode;
  private bloodDroneFilter?: BiquadFilterNode;
  private bloodHeartTimer = 5;
  private bloodHowlTimer = 8;
  private waveGain?: GainNode;
  private waveFilter?: BiquadFilterNode;
  private washGain?: GainNode;
  private gullTimer = 3;
  /** Flood water lapping (the waves without the gulls). */
  private lapping = 0;
  private staticGain?: GainNode;
  private staticFilter?: BiquadFilterNode;
  private staticBurst = 0;
  private whisperTimer = 3;
  private moanTimer = 3;
  private roarGain?: GainNode;
  private roarFilter?: BiquadFilterNode;
  private quakeGain?: GainNode;
  private steamGain?: GainNode;
  private warpDroneGain?: GainNode;
  private floatGain?: GainNode;
  private projectorGain?: GainNode;
  private tickTimer = 0;
  private tock = false;
  private reverseTimer = 1;
  private whirlGain?: GainNode;
  private whirlFilter?: BiquadFilterNode;
  private humGain?: GainNode;
  /** Recent electric activity near the player (drives the hum), and the zaps budget (rate limit). */
  private electricNear = 0;
  private zapBudget = MAX_ZAPS_PER_SECOND;
  private rustleGain?: GainNode;
  private rustleFilter?: BiquadFilterNode;
  private birdTimer = 1;
  private owlTimer = 5;
  /** Each cricket chirps on its own rhythm: time until its next chirp, its period and pitch. */
  private readonly crickets = [0, 1, 2].map(() => ({ timer: Math.random(), period: rand(0.55, 0.95), freq: rand(4200, 5200), side: rand(-0.8, 0.8) }));
  private readonly steps: Partial<Record<SampledSurface, AudioBuffer[]>> = {};
  private volume = 0.7;
  private muted = false;
  private time = 0;

  constructor() {
    const start = () => {
      this.start();
      window.removeEventListener('keydown', start);
      window.removeEventListener('pointerdown', start);
    };
    window.addEventListener('keydown', start);
    window.addEventListener('pointerdown', start);
  }

  /** Master volume 0..1, and mute. */
  setVolume(volume: number, muted: boolean) {
    this.volume = Math.min(Math.max(volume, 0), 1);
    this.muted = muted;
    if (this.ctx && this.master) {
      this.master.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
  }

  /** Follows the weather: call every frame. */
  update(dt: number, levels: AmbienceLevels) {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== 'running') {
      return;
    }
    this.time += dt;
    const now = ctx.currentTime;
    const set = (node: GainNode | undefined, value: number) => node?.gain.setTargetAtTime(value, now, AMBIENCE_SMOOTHING);

    // Rain: steady hiss + louder, darker with heavy rain; crackling drops on top
    set(this.rainGain, RAIN_GAIN * Math.pow(levels.rain, 0.8));
    this.rainFilter?.frequency.setTargetAtTime(2500 + 3500 * (1 - levels.rain), now, AMBIENCE_SMOOTHING);
    // Drops: random flicker of a brighter band (sounds like individual drops hitting)
    const drops = levels.rain * (0.6 + 0.4 * Math.random());
    this.dropsGain?.gain.setTargetAtTime(RAIN_GAIN * 0.5 * drops, now, 0.02);
    set(this.drizzleGain, DRIZZLE_GAIN * levels.drizzle);

    // Wind: band of noise whose pitch and loudness rise with the wind, slowly breathing
    const wind = Math.min(levels.wind, 1.3);
    const breathe = 0.8 + 0.2 * Math.sin(this.time * 0.7) * Math.sin(this.time * 0.23);
    set(this.windGain, WIND_GAIN * Math.pow(wind, 1.6) * breathe);
    this.windFilter?.frequency.setTargetAtTime(250 + 650 * wind * breathe, now, AMBIENCE_SMOOTHING);
    set(this.sandGain, SAND_GAIN * levels.sand * Math.min(wind, 1));

    // Volcanic: deep rumble slowly swelling (several slow waves, never in sync), random crackles
    const swell = 0.6 + 0.25 * Math.sin(this.time * 0.31) + 0.15 * Math.sin(this.time * 0.83 + 1.7);
    set(this.rumbleGain, RUMBLE_GAIN * levels.lava * swell);
    this.rumbleFilter?.frequency.setTargetAtTime(70 + 50 * swell, now, AMBIENCE_SMOOTHING);
    if (levels.lava > 0.05 && Math.random() < CRACKLE_RATE * levels.lava * dt) {
      this.crackle(levels.lava);
    }

    // Poison: a low wobbling bubbling bed, and bubbles popping here and there
    const ooze = 0.7 + 0.3 * Math.sin(this.time * 0.9 + Math.sin(this.time * 2.3));
    set(this.swampGain, SWAMP_GAIN * levels.poison * ooze);
    this.swampFilter?.frequency.setTargetAtTime(220 + 160 * ooze, now, 0.2);
    if (levels.poison > 0.05 && Math.random() < BUBBLE_RATE * levels.poison * dt) {
      this.bubbles(levels.poison);
    }

    this.updateDarkness(dt, levels.darkness, now);
    this.updateBloodMoon(dt, levels.bloodMoon, now);
    this.updateFrogs(dt, levels.frogs);
    this.updateCity(dt, levels.city, now);
    this.updateTimeWarp(dt, levels.timeWarp, now);
    this.updateInverted(dt, levels.inverted);
    this.floatGain?.gain.setTargetAtTime(FLOAT_GAIN * levels.antigravity, now, 0.5);
    this.projectorGain?.gain.setTargetAtTime(PROJECTOR_GAIN * levels.oldFilm, now, 0.5);
    this.updateFilmCrackle(dt, levels.oldFilm);
    this.updateHail(dt, levels.hail);
    this.lapping = levels.lapping;
    this.updateSea(dt, levels.sea, now);
    this.updateMagic(dt, levels, now);
    this.updateEerie(dt, levels, now);
    // Electric hum: follows the arcs crackling nearby, fades quickly once they stop
    this.electricNear = Math.max(0, this.electricNear - dt * 2.5);
    this.zapBudget = Math.min(MAX_ZAPS_PER_SECOND, this.zapBudget + dt * MAX_ZAPS_PER_SECOND);
    this.humGain?.gain.setTargetAtTime(HUM_GAIN * Math.min(this.electricNear, 1), now, 0.08);
    this.updateForest(dt, levels, now);

    // Blizzard: each whistle slowly moans up and down and swells on its own rhythm; louder and higher in the gusts
    const gust = Math.max(levels.wind - 0.9, 0);
    this.howls.forEach(({ gain, filter }, i) => {
      const v = HOWL_VOICES[i];
      const t = this.time * v.speed + i * 2.1;
      const moan = Math.sin(t) * 0.6 + Math.sin(t * 2.7 + 1.3) * 0.4;
      filter.frequency.setTargetAtTime(v.freq * (1 + v.glide * moan + 0.4 * gust), now, 0.15);
      const swell = Math.max(0, 0.55 + 0.45 * Math.sin(t * 1.6 + 0.7));
      gain.gain.setTargetAtTime(HOWL_GAIN * levels.howl * swell * (1 + gust), now, 0.25);
    });
  }

  /** Forest: rustling leaves (following the wind), birds by day, crickets and owl at night. */
  private updateForest(dt: number, levels: AmbienceLevels, now: number) {
    const f = levels.forest;
    const t = this.time;
    const flutter = 0.55 + 0.25 * Math.sin(t * 1.3) + 0.2 * Math.sin(t * 2.9 + 1.1);
    const wind = Math.min(levels.wind, 1.2);
    this.rustleGain?.gain.setTargetAtTime(RUSTLE_GAIN * f * (0.2 + 0.8 * wind) * flutter, now, 0.15);
    this.rustleFilter?.frequency.setTargetAtTime(2500 + 2500 * flutter, now, 0.15);
    const day = levels.daylight;
    // Birds: in the forest or a sunny weather, by day
    const birds = Math.max(f, levels.birds);
    if (birds >= 0.3) {
      this.birdTimer -= dt * day;
      if (this.birdTimer <= 0) {
        this.birdTimer = rand(BIRD_INTERVAL[0], BIRD_INTERVAL[1]);
        this.bird(birds * day);
      }
    }
    // Night: crickets (forest or starry night), an owl now and then in the forest
    const night = 1 - day;
    const crickets = Math.max(f, levels.crickets);
    if (crickets >= 0.3 && night > 0.2) {
      for (const c of this.crickets) {
        c.timer -= dt;
        if (c.timer <= 0) {
          c.timer = c.period * rand(0.9, 1.1);
          this.cricket(c.freq, c.side, crickets * night);
        }
      }
    }
    if (f < 0.3) {
      return;
    }
    if (night > 0.2) {
      this.owlTimer -= dt * night;
      if (this.owlTimer <= 0) {
        this.owlTimer = rand(OWL_INTERVAL[0], OWL_INTERVAL[1]);
        this.owl(f * night);
      }
    }
  }

  /** A random bird: trill, two-note whistle, a few chirps, rarely a far cuckoo or a woodpecker. */
  private bird(level: number) {
    const ctx = this.ctx!;
    const out = this.panned(rand(-0.9, 0.9));
    const far = rand(0.4, 1);
    const at0 = ctx.currentTime;
    const note = (at: number, from: number, to: number, length: number, gain: number) => {
      const osc = ctx.createOscillator();
      osc.frequency.setValueAtTime(from, at);
      osc.frequency.exponentialRampToValueAtTime(to, at + length);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, at);
      g.gain.linearRampToValueAtTime(BIRD_GAIN * level * far * gain, at + Math.min(0.01, length * 0.3));
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
        src.buffer = this.noise!;
        const g = ctx.createGain();
        g.gain.setValueAtTime(BIRD_GAIN * 2 * level * far * (1 - i * 0.03), at);
        g.gain.exponentialRampToValueAtTime(0.001, at + 0.03);
        src.connect(this.bandpass(1300, 4)).connect(g).connect(out);
        src.start(at, Math.random() * 3, 0.04);
        at += 0.05 + i * 0.002;
      }
    }
  }

  /** One cricket chirp: 3 very short high pulses. */
  private cricket(freq: number, side: number, level: number) {
    const ctx = this.ctx!;
    const out = this.panned(side);
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
  private owl(level: number) {
    const ctx = this.ctx!;
    const out = this.panned(rand(-0.8, 0.8));
    const pitch = rand(320, 370);
    let at = ctx.currentTime;
    const hoots = Math.random() < 0.6 ? [0.7, 1.1] : [0.6];
    for (const length of hoots) {
      this.hoot(at, length, pitch * rand(0.97, 1.03), OWL_GAIN * level, out);
      at += length + rand(0.35, 0.7);
    }
  }

  private hoot(at: number, length: number, pitch: number, level: number, out: AudioNode) {
    const ctx = this.ctx!;
    const roll = Math.min(length * 0.2, 0.18);
    // Voice: round tone + its first overtones (a clear "ou", not muffled)
    const voice = ctx.createGain();
    for (const [mult, amount] of [[1, 1], [2, 0.32], [3, 0.1]] as const) {
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
    breath.buffer = this.noise!;
    const breathGain = ctx.createGain();
    breathGain.gain.value = 0.08;
    breath.connect(this.bandpass(pitch * 3, 2)).connect(breathGain).connect(voice);
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
    voice.connect(tremolo).connect(this.lowpass(2000)).connect(env).connect(out);
  }

  /**
   * An electric arc nearby: a sharp snap, then a short buzzing crackle (a burst of tiny sparks).
   * @param closeness 0 (far) .. 1 (right next to the player)
   * @param side -1 (left) .. 1 (right)
   * @param life arc duration (s): longer arcs buzz longer
   */
  zap(closeness: number, side: number, life: number) {
    const ctx = this.ctx;
    if (!ctx || !this.master || !this.noise || ctx.state !== 'running') {
      return;
    }
    this.electricNear = Math.min(this.electricNear + closeness * 0.5, 1.5);
    if (this.zapBudget < 1) {
      return;
    }
    this.zapBudget--;
    const out = this.panned(side);
    const at = ctx.currentTime;
    const level = ZAP_GAIN * closeness * rand(0.6, 1);
    // Snap
    const snap = ctx.createBufferSource();
    snap.buffer = this.noise;
    const snapGain = ctx.createGain();
    snapGain.gain.setValueAtTime(level, at);
    snapGain.gain.exponentialRampToValueAtTime(0.001, at + 0.03);
    snap.connect(this.highpass(2500)).connect(snapGain).connect(out);
    snap.start(at, Math.random() * 3, 0.04);
    // Crackle: noise chopped into tiny irregular sparks, with a buzzing tone under it
    const length = Math.max(0.06, life * rand(0.6, 1));
    const crackle = ctx.createBufferSource();
    crackle.buffer = this.noise;
    const crackleGain = ctx.createGain();
    crackleGain.gain.setValueAtTime(0, at);
    let t = at + 0.01;
    while (t < at + length) {
      crackleGain.gain.linearRampToValueAtTime(level * rand(0.3, 0.8), t + 0.002);
      crackleGain.gain.linearRampToValueAtTime(level * 0.05, t + rand(0.006, 0.018));
      t += rand(0.01, 0.03);
    }
    crackleGain.gain.linearRampToValueAtTime(0, t + 0.01);
    crackle.connect(this.bandpass(rand(3000, 6000), 1.2)).connect(crackleGain).connect(out);
    crackle.start(at, Math.random() * 3, length + 0.05);
    const buzz = ctx.createOscillator();
    buzz.type = 'sawtooth';
    buzz.frequency.value = rand(110, 180);
    const buzzGain = ctx.createGain();
    buzzGain.gain.setValueAtTime(0, at);
    buzzGain.gain.linearRampToValueAtTime(level * 0.25, at + 0.01);
    buzzGain.gain.linearRampToValueAtTime(0, at + length);
    buzz.connect(this.bandpass(rand(900, 1600), 2)).connect(buzzGain).connect(out);
    buzz.start(at);
    buzz.stop(at + length + 0.02);
  }

  /**
   * Hail: a beaded patter of hard little pellets. Each impact is a short pitched "tic" (a ringing resonance,
   * not a hiss), higher on the ground, lower and hollower ("toc") on the roofs, often followed by
   * one or two quick smaller bounces.
   */
  private updateHail(dt: number, hail: number) {
    if (hail < 0.05) {
      return;
    }
    const ctx = this.ctx!;
    let ticks = HAIL_TICKS * hail * dt;
    while (ticks > 0) {
      if (ticks < 1 && Math.random() > ticks) {
        break;
      }
      ticks--;
      const roof = Math.random() < 0.3;
      const freq = roof ? rand(650, 1250) : rand(1700, 3300);
      const out = this.panned(rand(-1, 1));
      let at = ctx.currentTime + Math.random() * dt;
      let level = HAIL_GAIN * hail * rand(0.3, 1);
      const bounces = Math.random() < 0.6 ? 1 + Math.floor(Math.random() * 2) : 0;
      for (let k = 0; k <= bounces; k++) {
        this.hailTick(at, freq * (1 + k * 0.06), level, roof, out);
        at += rand(0.04, 0.09) / (k + 1);
        level *= rand(0.3, 0.5);
      }
    }
  }

  /**
   * One pellet impact: a tiny hard click plus a very short "knock" of the pellet itself. The knock keeps
   * a fixed pitch and mixes two inharmonic tones (a hard little object), unlike a water drop whose pure tone slides.
   */
  private hailTick(at: number, freq: number, level: number, roof: boolean, out: AudioNode) {
    const ctx = this.ctx!;
    // Click
    const src = ctx.createBufferSource();
    src.buffer = this.noise!;
    const click = ctx.createGain();
    click.gain.setValueAtTime(level * 0.6, at);
    click.gain.exponentialRampToValueAtTime(0.001, at + 0.005);
    src.connect(this.highpass(roof ? 1000 : 1800)).connect(this.lowpass(7000)).connect(click).connect(out);
    src.start(at, Math.random() * 3, 0.01);
    // Knock: two inharmonic partials, fixed pitch, dying very fast
    const length = roof ? rand(0.02, 0.035) : rand(0.008, 0.016);
    for (const [mult, amount] of [[1, 0.25], [2.37, 0.15]] as const) {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = freq * mult;
      const g = ctx.createGain();
      g.gain.setValueAtTime(level * amount, at);
      g.gain.exponentialRampToValueAtTime(0.001, at + length);
      osc.connect(g).connect(out);
      osc.start(at);
      osc.stop(at + length + 0.01);
    }
  }

  /** Sea: waves slowly breaking (a low swell then the hiss of the wash), gulls crying far away. */
  private updateSea(dt: number, sea: number, now: number) {
    const phase = (this.time / WAVE_PERIOD) % 1;
    const swell = Math.pow(Math.sin(Math.PI * phase), 2);
    // The wash follows the breaking wave, a bit later
    const wash = Math.pow(Math.max(0, Math.sin(Math.PI * ((phase + 0.75) % 1))), 3);
    const waves = Math.max(sea, this.lapping);
    this.waveGain?.gain.setTargetAtTime(WAVE_GAIN * waves * (0.25 + 0.75 * swell), now, 0.3);
    this.waveFilter?.frequency.setTargetAtTime(250 + 450 * swell, now, 0.3);
    this.washGain?.gain.setTargetAtTime(WAVE_GAIN * 0.4 * waves * wash, now, 0.3);
    if (sea < 0.3) {
      return;
    }
    this.gullTimer -= dt;
    if (this.gullTimer <= 0) {
      this.gullTimer = rand(GULL_INTERVAL[0], GULL_INTERVAL[1]);
      this.gull(sea);
    }
  }

  /** A gull far away: 2 to 4 harsh "kiaa" cries falling in pitch. */
  private gull(level: number) {
    const ctx = this.ctx!;
    const out = this.panned(rand(-0.9, 0.9));
    const pitch = rand(1100, 1500);
    let at = ctx.currentTime;
    for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) {
      const length = rand(0.25, 0.45);
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
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
      osc.connect(this.bandpass(pitch * 1.4, 2)).connect(this.lowpass(3500)).connect(g).connect(out);
      osc.start(at);
      vibrato.start(at);
      osc.stop(at + length + 0.02);
      vibrato.stop(at + length + 0.02);
      at += length + rand(0.08, 0.2);
    }
  }

  /** Chimes, radio static, curse whispers. */
  private updateMagic(dt: number, levels: AmbienceLevels, now: number) {
    // Crystal chimes: random high bell notes, sparse
    if (levels.chimes > 0.05 && Math.random() < CHIME_RATE * levels.chimes * dt) {
      this.chime(levels.chimes);
    }
    // Radio static: a faint crackling bed, with bursts now and then
    this.staticBurst = Math.max(0, this.staticBurst - dt * 2);
    if (levels.static > 0.05 && Math.random() < 0.4 * dt * levels.static) {
      this.staticBurst = rand(0.6, 1);
    }
    const crackle = Math.random() < 0.3 ? 1 : 0.4;
    this.staticGain?.gain.setTargetAtTime(STATIC_GAIN * levels.static * (0.15 + 0.85 * this.staticBurst) * crackle, now, 0.01);
    this.staticFilter?.frequency.setTargetAtTime(rand(1200, 3500), now, 0.02);
    // Acid rain sizzling: a bright hiss crackling irregularly, like something frying
    const fry = Math.random() < 0.45 ? rand(0.6, 1) : rand(0.15, 0.35);
    this.sizzleGain?.gain.setTargetAtTime(SIZZLE_GAIN * levels.sizzle * fry, now, 0.015);
    // Curse whispers
    if (levels.whispers > 0.3) {
      this.whisperTimer -= dt;
      if (this.whisperTimer <= 0) {
        this.whisperTimer = rand(WHISPER_INTERVAL[0], WHISPER_INTERVAL[1]);
        this.whisper(levels.whispers * 0.8, rand(-0.9, 0.9));
      }
    }
  }

  /** Ice cracking (frost), ghostly moans (haunted mist), tornado roar. */
  private updateEerie(dt: number, levels: AmbienceLevels, now: number) {
    const ctx = this.ctx!;
    if (levels.crackle > 0.05 && Math.random() < CRACK_RATE * levels.crackle * dt) {
      // A tiny sharp crack, sometimes a short creaking series
      let at = ctx.currentTime;
      const out = this.panned(rand(-0.9, 0.9));
      for (let i = 0; i < 1 + Math.floor(Math.random() * Math.random() * 4); i++) {
        const src = ctx.createBufferSource();
        src.buffer = this.noise!;
        const g = ctx.createGain();
        g.gain.setValueAtTime(CRACK_GAIN * levels.crackle * rand(0.4, 1), at);
        g.gain.exponentialRampToValueAtTime(0.001, at + rand(0.01, 0.04));
        src.connect(this.bandpass(rand(2500, 7000), rand(3, 8))).connect(g).connect(out);
        src.start(at, Math.random() * 3, 0.06);
        at += rand(0.02, 0.09);
      }
    }
    if (levels.ashCrackle > 0.05 && Math.random() < ASH_CRACKLE_RATE * levels.ashCrackle * dt) {
      this.crackle(ASH_CRACKLE_LEVEL * levels.ashCrackle);
    }
    if (levels.moan > 0.05) {
      this.moanTimer -= dt;
      if (this.moanTimer <= 0) {
        this.moanTimer = rand(MOAN_INTERVAL[0], MOAN_INTERVAL[1]);
        this.ghostMoan(levels.moan);
      }
    }
    // Petal whirlwind: a whooshing gust whose pitch swirls up and down quickly (the air turning)
    const w = levels.whirl;
    const swirl = Math.sin(this.time * 4.2) * 0.6 + Math.sin(this.time * 6.9 + 1) * 0.4;
    this.whirlGain?.gain.setTargetAtTime(WHIRL_GAIN * w * w * (0.75 + 0.25 * swirl), now, 0.12);
    this.whirlFilter?.frequency.setTargetAtTime(500 + 500 * w + 350 * swirl, now, 0.06);
    // Earthquake: a deep rumble following the shake, and things rattling (short dry knocks)
    const q = levels.quake;
    this.quakeGain?.gain.setTargetAtTime(QUAKE_GAIN * q, now, 0.08);
    if (q > 0.1 && Math.random() < RATTLE_RATE * q * dt) {
      const at = ctx.currentTime;
      const src = ctx.createBufferSource();
      src.buffer = this.noise!;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.12 * q * rand(0.4, 1), at);
      g.gain.exponentialRampToValueAtTime(0.001, at + rand(0.02, 0.06));
      src.connect(this.bandpass(rand(400, 1800), rand(3, 7))).connect(g).connect(this.panned(rand(-1, 1)));
      src.start(at, Math.random() * 3, 0.08);
    }
    // Geysers: steam hissing (a broad high hiss, fluttering)
    this.steamGain?.gain.setTargetAtTime(STEAM_GAIN * levels.steam * (0.85 + 0.15 * Math.sin(this.time * 23)), now, 0.1);
    const r = levels.roar;
    this.roarGain?.gain.setTargetAtTime(ROAR_GAIN * r * r * (0.85 + 0.15 * Math.sin(this.time * 1.7)), now, 0.3);
    this.roarFilter?.frequency.setTargetAtTime(150 + 600 * r, now, 0.3);
  }

  /** A ghostly "oooooh": a wavering voice-like tone sliding down, with a soft echo. */
  private ghostMoan(level: number) {
    const ctx = this.ctx!;
    const side = rand(-0.9, 0.9);
    const pitch = rand(230, 320);
    const length = rand(1.6, 3);
    for (const [delay, gain] of [[0, 1], [0.35, 0.35]] as const) {
      const at = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
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
      g.gain.linearRampToValueAtTime(MOAN_GAIN * level * gain, at + length * 0.35);
      g.gain.linearRampToValueAtTime(0, at + length);
      osc.connect(this.lowpass(900)).connect(g).connect(this.panned(side * (delay ? -0.5 : 1)));
      osc.start(at);
      vibrato.start(at);
      osc.stop(at + length + 0.05);
      vibrato.stop(at + length + 0.05);
    }
  }

  /** One crystal bell note (with its inharmonic overtone), ringing out. */
  private chime(level: number) {
    const ctx = this.ctx!;
    const out = this.panned(rand(-0.8, 0.8));
    const at = ctx.currentTime;
    const f = CHIME_NOTES[Math.floor(Math.random() * CHIME_NOTES.length)];
    const length = rand(1.2, 2.5);
    for (const [mult, amount] of [[1, 1], [2.76, 0.3], [5.4, 0.1]] as const) {
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

  /**
   * Blood moon: a deep dissonant drone throbbing slowly like the red light (same rhythm as its breathing),
   * bouts of heartbeats, and now and then a wolf howling far away.
   */
  private updateBloodMoon(dt: number, level: number, now: number) {
    const t = this.time;
    const pulse = 0.7 * Math.sin(t * 0.8) + 0.3 * Math.sin(t * 2.3);
    this.bloodDroneGain?.gain.setTargetAtTime(BLOOD_DRONE_GAIN * level * (0.65 + 0.35 * pulse), now, 0.3);
    this.bloodDroneFilter?.frequency.setTargetAtTime(160 + 90 * (pulse + 1), now, 0.3);
    if (level < 0.3) {
      return;
    }
    this.bloodHeartTimer -= dt;
    if (this.bloodHeartTimer <= 0) {
      this.bloodHeartTimer = rand(BLOOD_HEART_INTERVAL[0], BLOOD_HEART_INTERVAL[1]);
      this.heartbeat(level * 0.8);
    }
    this.bloodHowlTimer -= dt;
    if (this.bloodHowlTimer <= 0) {
      this.bloodHowlTimer = rand(BLOOD_HOWL_INTERVAL[0], BLOOD_HOWL_INTERVAL[1]);
      this.wolfHowl(level);
    }
  }

  /** Old film: random tiny clicks, like dust on the film / a worn optical soundtrack. */
  private updateFilmCrackle(dt: number, level: number) {
    if (level < 0.05 || Math.random() > FILM_CRACKLE_RATE * level * dt) {
      return;
    }
    const ctx = this.ctx!;
    const at = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = this.noise!;
    const g = ctx.createGain();
    g.gain.setValueAtTime(FILM_CRACKLE_GAIN * level * rand(0.3, 1), at);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.006);
    src.connect(this.highpass(1500)).connect(g).connect(this.panned(rand(-0.5, 0.5)));
    src.start(at, Math.random() * 2, 0.01);
  }

  /**
   * Inverted world: sounds heard backwards. A sound played backwards starts silent, swells up and stops dead
   * (the natural attack becomes the end): reversed whooshes, reversed bells, reversed echoes.
   */
  private updateInverted(dt: number, level: number) {
    if (level < 0.3) {
      return;
    }
    this.reverseTimer -= dt;
    if (this.reverseTimer > 0) {
      return;
    }
    this.reverseTimer = rand(REVERSE_INTERVAL[0], REVERSE_INTERVAL[1]);
    const ctx = this.ctx!;
    const at = ctx.currentTime;
    const length = rand(1, 2.2);
    const out = this.panned(rand(-0.8, 0.8));
    const g = ctx.createGain();
    // Backwards envelope: slow exponential rise, sudden cut
    g.gain.setValueAtTime(0.0005, at);
    g.gain.exponentialRampToValueAtTime(REVERSE_GAIN * level, at + length);
    g.gain.setValueAtTime(0, at + length + 0.01);
    g.connect(out);
    if (Math.random() < 0.5) {
      // Reversed cymbal / whoosh: noise getting brighter
      const src = ctx.createBufferSource();
      src.buffer = this.noise!;
      const band = this.bandpass(800, 0.7);
      band.frequency.setValueAtTime(800, at);
      band.frequency.exponentialRampToValueAtTime(6000, at + length);
      src.connect(band).connect(g);
      src.start(at, Math.random() * 2, length + 0.05);
    } else {
      // Reversed bell: the inharmonic partials of a bell, growing instead of dying
      const f = CHIME_NOTES[Math.floor(Math.random() * CHIME_NOTES.length)] / 2;
      for (const [mult, amount] of [[1, 1], [2.76, 0.35], [5.4, 0.12]] as const) {
        const osc = ctx.createOscillator();
        osc.frequency.value = f * mult;
        const pg = ctx.createGain();
        pg.gain.value = amount * 0.5;
        osc.connect(pg).connect(g);
        osc.start(at);
        osc.stop(at + length + 0.05);
      }
    }
  }

  /** Time warp: a deep drone wavering slowly, and a clock ticking slowly (tick / tock) with long echoes. */
  private updateTimeWarp(dt: number, level: number, now: number) {
    this.warpDroneGain?.gain.setTargetAtTime(WARP_DRONE_GAIN * level * (0.8 + 0.2 * Math.sin(this.time * 0.4)), now, 0.5);
    if (level < 0.3) {
      return;
    }
    this.tickTimer -= dt;
    if (this.tickTimer > 0) {
      return;
    }
    this.tickTimer = TICK_PERIOD;
    this.tock = !this.tock;
    const ctx = this.ctx!;
    const at = ctx.currentTime;
    const out = this.panned(this.tock ? 0.3 : -0.3);
    // The tick: a short knock, low and stretched (as if slowed down)
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(this.tock ? 220 : 260, at);
    osc.frequency.exponentialRampToValueAtTime(this.tock ? 150 : 180, at + 0.25);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(TICK_GAIN * level, at + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, at + 0.35);
    osc.connect(this.bandpass(this.tock ? 400 : 480, 3)).connect(g).connect(out);
    osc.start(at);
    osc.stop(at + 0.4);
    // Long echo: the tick repeats fainter and fainter (delay line with feedback)
    const delay = ctx.createDelay(1);
    delay.delayTime.value = 0.42;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.45;
    g.connect(delay).connect(feedback).connect(delay);
    feedback.connect(out);
    // A feedback loop never stops by itself: cut it once the echo has died out (else the nodes pile up)
    setTimeout(() => {
      feedback.disconnect();
      delay.disconnect();
    }, 4000);
  }

  /** Smog: the city far away. A low traffic rumble that swells irregularly, horns, sometimes a siren. */
  private updateCity(dt: number, level: number, now: number) {
    const t = this.time;
    const swell = 0.7 + 0.2 * Math.sin(t * 0.21) + 0.1 * Math.sin(t * 0.67 + 2);
    this.trafficGain?.gain.setTargetAtTime(TRAFFIC_GAIN * level * swell, now, 0.5);
    this.trafficFilter?.frequency.setTargetAtTime(220 + 120 * swell, now, 0.5);
    if (level < 0.3) {
      return;
    }
    this.hornTimer -= dt;
    if (this.hornTimer <= 0) {
      this.hornTimer = rand(HORN_INTERVAL[0], HORN_INTERVAL[1]);
      if (Math.random() < SIREN_CHANCE) {
        this.siren(level);
      } else {
        this.horn(level);
      }
    }
  }

  /** A car horn far away: one or two short honks, two notes together, muffled by the distance. */
  private horn(level: number) {
    const ctx = this.ctx!;
    const out = this.panned(rand(-0.9, 0.9));
    const base = rand(330, 440);
    let at = ctx.currentTime;
    for (let i = 0; i < (Math.random() < 0.5 ? 1 : 2); i++) {
      const length = rand(0.15, 0.4);
      for (const mult of [1, 1.26]) {
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.value = base * mult;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, at);
        g.gain.linearRampToValueAtTime(HORN_GAIN * level, at + 0.02);
        g.gain.setValueAtTime(HORN_GAIN * level, at + length - 0.03);
        g.gain.linearRampToValueAtTime(0, at + length);
        osc.connect(this.lowpass(900)).connect(g).connect(out);
        osc.start(at);
        osc.stop(at + length + 0.02);
      }
      at += length + rand(0.08, 0.15);
    }
  }

  /** A siren far away: a tone slowly sweeping up and down a few times, very muffled. */
  private siren(level: number) {
    const ctx = this.ctx!;
    const at = ctx.currentTime;
    const length = rand(4, 7);
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
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
    osc.connect(this.lowpass(1100)).connect(g).connect(this.panned(rand(-0.8, 0.8)));
    osc.start(at);
    sweep.start(at);
    osc.stop(at + length + 0.05);
    sweep.stop(at + length + 0.05);
  }

  /** Monsoon frogs: each one croaks now and then on its own rhythm (sometimes twice in a row). */
  private updateFrogs(dt: number, level: number) {
    if (level < 0.05) {
      return;
    }
    for (const frog of this.frogsState) {
      frog.timer -= dt;
      if (frog.timer <= 0) {
        frog.timer = rand(FROG_INTERVAL[0], FROG_INTERVAL[1]);
        this.croak(frog.pitch, frog.side, level * rand(0.5, 1));
      }
    }
  }

  /** "Croâ": a buzzy low tone chopped into 2-3 quick pulses (the vocal sac), through a nasal band. */
  private croak(pitch: number, side: number, level: number) {
    const ctx = this.ctx!;
    const out = this.panned(side);
    let at = ctx.currentTime;
    const pulses = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < pulses; i++) {
      const length = rand(0.05, 0.08);
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(pitch * 0.9, at);
      osc.frequency.linearRampToValueAtTime(pitch * 1.1, at + length);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, at);
      g.gain.linearRampToValueAtTime(FROG_GAIN * level, at + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, at + length);
      osc.connect(this.bandpass(pitch * 3.5, 4)).connect(this.lowpass(2200)).connect(g).connect(out);
      osc.start(at);
      osc.stop(at + length + 0.02);
      at += length + rand(0.03, 0.06);
    }
  }

  /** A wolf howling far away: rises slowly, holds with a wavering voice, falls; sometimes a second one answers. */
  private wolfHowl(level: number) {
    const ctx = this.ctx!;
    const wolves = Math.random() < 0.4 ? 2 : 1;
    for (let w = 0; w < wolves; w++) {
      const at = ctx.currentTime + w * rand(0.8, 1.6);
      const length = rand(2.2, 3.5);
      const base = rand(380, 460) * (w ? rand(1.08, 1.2) : 1);
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
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
      const out = this.panned(rand(-0.9, 0.9));
      const muffle = this.lowpass(1400);
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

  /** Darkness: deep drone (slowly beating, its unsettling high overtone swells), breathing, distant sounds. */
  private updateDarkness(dt: number, level: number, now: number) {
    const t = this.time;
    const unease = 0.6 + 0.4 * Math.sin(t * 0.13) * Math.sin(t * 0.07 + 1);
    this.droneGain?.gain.setTargetAtTime(DRONE_GAIN * level * unease, now, 0.8);
    // Breathing: in 3 s, out 4 s, irregular
    const breath = Math.max(0, Math.sin(t * 2 * Math.PI / 7 + Math.sin(t * 0.3)));
    this.breathGain?.gain.setTargetAtTime(BREATH_GAIN * level * breath, now, 0.6);
    this.breathFilter?.frequency.setTargetAtTime(180 + 220 * breath, now, 0.6);
    if (level < 0.3) {
      return;
    }
    this.dreadTimer -= dt;
    if (this.dreadTimer <= 0) {
      this.dreadTimer = rand(DREAD_INTERVAL[0], DREAD_INTERVAL[1]);
      const r = Math.random();
      const side = rand(-0.9, 0.9);
      if (r < 0.3) {
        this.knocks(level, side);
      } else if (r < 0.55) {
        this.creak(level, side);
      } else if (r < 0.8) {
        this.whisper(level, side);
      } else {
        this.heartbeat(level);
      }
    }
  }

  private panned(side: number): StereoPannerNode {
    const pan = this.ctx!.createStereoPanner();
    pan.pan.value = side;
    pan.connect(this.master!);
    return pan;
  }

  /** 1 to 3 dull knocks far away (a door? something walking?). */
  private knocks(level: number, side: number) {
    const ctx = this.ctx!;
    const out = this.panned(side);
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
      osc.connect(gain).connect(this.lowpass(300)).connect(out);
      osc.start(at);
      osc.stop(at + 0.4);
      at += rand(0.35, 0.8);
    }
  }

  /** A slow creak (old wood / metal under weight): a buzzing tone whose pitch wavers, far away. */
  private creak(level: number, side: number) {
    const ctx = this.ctx!;
    const at = ctx.currentTime;
    const length = rand(0.8, 1.8);
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    const f = rand(90, 160);
    osc.frequency.setValueAtTime(f, at);
    osc.frequency.linearRampToValueAtTime(f * rand(0.7, 1.4), at + length * 0.5);
    osc.frequency.linearRampToValueAtTime(f * rand(0.8, 1.2), at + length);
    const band = this.bandpass(rand(700, 1300), 6);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(DREAD_GAIN * 0.35 * level, at + length * 0.3);
    gain.gain.linearRampToValueAtTime(0, at + length);
    osc.connect(band).connect(gain).connect(this.lowpass(2500)).connect(this.panned(side));
    osc.start(at);
    osc.stop(at + length + 0.05);
  }

  /** An unintelligible whisper: breathy noise through moving "vowel" resonances, in short syllables. */
  private whisper(level: number, side: number) {
    const ctx = this.ctx!;
    const start = ctx.currentTime;
    const out = this.panned(side);
    const syllables = 3 + Math.floor(Math.random() * 5);
    let at = start;
    for (let i = 0; i < syllables; i++) {
      const length = rand(0.12, 0.3);
      const src = ctx.createBufferSource();
      src.buffer = this.noise!;
      const f1 = this.bandpass(rand(600, 1100), 5);
      const f2 = this.bandpass(rand(1600, 2800), 7);
      f2.frequency.linearRampToValueAtTime(rand(1400, 3000), at + length);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, at);
      gain.gain.linearRampToValueAtTime(DREAD_GAIN * 0.5 * level * rand(0.5, 1), at + length * 0.3);
      gain.gain.linearRampToValueAtTime(0, at + length);
      src.connect(f1).connect(gain);
      src.connect(f2).connect(gain);
      gain.connect(out);
      src.start(at, Math.random() * 3, length + 0.05);
      at += length + rand(0.02, 0.15);
    }
  }

  /** A slow heartbeat (lub-dub), getting slightly louder then fading. */
  private heartbeat(level: number) {
    const ctx = this.ctx!;
    const out = this.panned(0);
    const beats = 5 + Math.floor(Math.random() * 5);
    const period = rand(0.9, 1.15);
    for (let i = 0; i < beats; i++) {
      const at = ctx.currentTime + i * period;
      const swell = Math.sin(Math.PI * (i + 0.5) / beats);
      for (const [delay, strength] of [[0, 1], [0.18, 0.7]] as const) {
        const osc = ctx.createOscillator();
        osc.frequency.setValueAtTime(60, at + delay);
        osc.frequency.exponentialRampToValueAtTime(38, at + delay + 0.12);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, at + delay);
        gain.gain.linearRampToValueAtTime(DREAD_GAIN * 1.2 * level * strength * swell, at + delay + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, at + delay + 0.16);
        osc.connect(gain).connect(out);
        osc.start(at + delay);
        osc.stop(at + delay + 0.2);
      }
    }
  }

  /** Toxic bubbles: one big "blop", or a gurgling burst of smaller ones. */
  private bubbles(amount: number) {
    const ctx = this.ctx!;
    const gurgle = Math.random() < 0.35;
    const count = gurgle ? 3 + Math.floor(Math.random() * 5) : 1;
    let at = ctx.currentTime + Math.random() * 0.05;
    for (let i = 0; i < count; i++) {
      const big = !gurgle && Math.random() < 0.6;
      this.blop(at, big ? rand(110, 200) : rand(220, 520), big ? rand(0.12, 0.2) : rand(0.05, 0.1),
        BUBBLE_GAIN * amount * (big ? 1 : rand(0.4, 0.8)), rand(-0.7, 0.7));
      at += rand(0.04, 0.14);
    }
  }

  /** One thick bubble popping: a muffled tone sliding up, a tiny "plop" at the end. */
  private blop(at: number, freq: number, length: number, level: number, side: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, at);
    osc.frequency.exponentialRampToValueAtTime(freq * rand(2, 3.2), at + length);
    const lowpass = this.lowpass(1200);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(level, at + length * 0.25);
    gain.gain.exponentialRampToValueAtTime(0.001, at + length);
    const pan = ctx.createStereoPanner();
    pan.pan.value = side;
    osc.connect(lowpass).connect(gain).connect(pan).connect(this.master!);
    osc.start(at);
    osc.stop(at + length + 0.02);
  }

  /** Ember crackle: one or a few tiny clicks of bright noise (sometimes a deeper pop). */
  private crackle(amount: number) {
    const ctx = this.ctx!;
    const clicks = 1 + Math.floor(Math.random() * Math.random() * 5);
    let at = ctx.currentTime;
    for (let i = 0; i < clicks; i++) {
      const pop = Math.random() < 0.2;
      const length = pop ? 0.03 + Math.random() * 0.03 : 0.006 + Math.random() * 0.014;
      const src = ctx.createBufferSource();
      src.buffer = this.noise!;
      const band = this.bandpass(pop ? 600 + Math.random() * 600 : 2000 + Math.random() * 4000, pop ? 2 : 1);
      const gain = ctx.createGain();
      const level = CRACKLE_GAIN * amount * (pop ? 1.3 : 0.4 + 0.6 * Math.random());
      gain.gain.setValueAtTime(level, at);
      gain.gain.exponentialRampToValueAtTime(0.001, at + length);
      src.connect(band).connect(gain).connect(this.master!);
      src.start(at, Math.random() * 3, length + 0.02);
      at += 0.02 + Math.random() * 0.07;
    }
  }

  /**
   * A geyser erupting: a gurgle of bubbles, then a whoosh as the jet bursts out (louder when close).
   * @param closeness 0..1
   */
  geyserBurst(closeness: number, side: number) {
    const ctx = this.ctx;
    if (!ctx || !this.master || !this.noise || ctx.state !== 'running' || closeness <= 0) {
      return;
    }
    this.bubbles(closeness);
    const at = ctx.currentTime + 0.25;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const band = this.bandpass(600, 0.8);
    band.frequency.setValueAtTime(400, at);
    band.frequency.exponentialRampToValueAtTime(2500, at + 0.6);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(GEYSER_BURST_GAIN * closeness, at + 0.15);
    g.gain.exponentialRampToValueAtTime(0.001, at + 1.6);
    src.connect(band).connect(g).connect(this.panned(side * 0.8));
    src.start(at, Math.random() * 2, 1.7);
  }

  /** A rocket climbing: a thin whistle rising in pitch for the climb time. */
  rocketWhistle(climb: number, side: number) {
    const ctx = this.ctx;
    if (!ctx || !this.master || ctx.state !== 'running') {
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
    osc.connect(g).connect(this.panned(side * 0.8));
    osc.start(at);
    osc.stop(at + climb + 0.1);
  }

  /**
   * A burst: a deep bang (heard a little after the light: sound is slower), its echo, then the sparks crackling.
   * @param closeness 0..1 (louder and sooner when close)
   */
  fireworkBang(closeness: number, side: number) {
    const ctx = this.ctx;
    if (!ctx || !this.master || !this.noise || ctx.state !== 'running') {
      return;
    }
    const at = ctx.currentTime + 0.15 + (1 - closeness) * 0.5;
    const out = this.panned(side * 0.8);
    // Bang: a short low noise burst + a falling low tone
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const g = ctx.createGain();
    const level = BANG_GAIN * (0.4 + 0.6 * closeness);
    g.gain.setValueAtTime(level, at);
    g.gain.exponentialRampToValueAtTime(0.001, at + 0.5);
    src.connect(this.lowpass(700)).connect(g).connect(out);
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
        c.buffer = this.noise;
        const cg = ctx.createGain();
        cg.gain.setValueAtTime(level * 0.15 * rand(0.4, 1), t);
        cg.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
        c.connect(this.bandpass(rand(2500, 5000), 3)).connect(cg).connect(out);
        c.start(t, Math.random() * 3, 0.03);
        t += rand(0.03, 0.12);
      }
    }
  }

  /** The player falling back on the ground: a dull thud. */
  thud() {
    const ctx = this.ctx;
    if (!ctx || !this.master || ctx.state !== 'running') {
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
    osc.connect(g).connect(this.master);
    osc.start(at);
    osc.stop(at + 0.3);
    // Dust: a short muffled noise burst
    const src = ctx.createBufferSource();
    src.buffer = this.noise!;
    const dust = ctx.createGain();
    dust.gain.setValueAtTime(0.2, at);
    dust.gain.exponentialRampToValueAtTime(0.001, at + 0.2);
    src.connect(this.lowpass(900)).connect(dust).connect(this.master);
    src.start(at, Math.random() * 3, 0.25);
  }

  /**
   * Thunder of a lightning strike: each bolt is heard after the light, the later the farther (sound is slow).
   * - close: sharp tearing crack right away, then a heavy boom;
   * - mid: a boom with a few rolling swells;
   * - far: a long, low, soft rolling rumble.
   * Every rumble is random (speed, swells, length, side): no two sound the same.
   */
  thunder(bolts: ThunderBolt[]) {
    const ctx = this.ctx;
    if (!ctx || !this.master || !this.brownNoise || ctx.state !== 'running') {
      return;
    }
    for (const bolt of bolts) {
      const near = 1 - bolt.distance;
      const delay = bolt.at + 0.05 + bolt.distance * 5 + Math.random() * 0.6;
      const start = ctx.currentTime + delay;
      const pan = ctx.createStereoPanner();
      pan.pan.value = bolt.pan;
      pan.connect(this.master);
      if (bolt.distance < 0.35) {
        this.thunderCrack(start, near, pan);
      }
      this.thunderRumble(start, bolt.distance, pan);
    }
  }

  /**
   * Close strike: a loud sharp clap (like a huge whip crack / a tree splitting), with one or two
   * smaller echoes right after. Full-band but not too bright, smooth envelopes (no buzzing).
   */
  private thunderCrack(start: number, near: number, out: AudioNode) {
    const ctx = this.ctx!;
    const clap = (at: number, level: number, length: number) => {
      const src = ctx.createBufferSource();
      src.buffer = this.noise!;
      const lowpass = this.lowpass(rand(2200, 3500));
      const highpass = this.highpass(120);
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
  private thunderRumble(start: number, distance: number, out: AudioNode) {
    const ctx = this.ctx!;
    const near = 1 - distance;
    const duration = 2.5 + distance * 4 + Math.random() * 2.5;
    const src = ctx.createBufferSource();
    src.buffer = this.brownNoise!;
    src.playbackRate.value = rand(0.7, 1);
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(550 + 1800 * near * near + Math.random() * 300, start);
    lowpass.frequency.exponentialRampToValueAtTime(160 + 80 * Math.random(), start + duration);
    const gain = ctx.createGain();
    const peak = THUNDER_GAIN * (0.55 + 0.45 * near);
    gain.gain.setValueAtTime(0, start);
    // Close: immediate boom; far: slow swelling rumble
    gain.gain.linearRampToValueAtTime(peak, start + rand(0.03, 0.08) + distance * 0.6);
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
    const duck = this.rainBus!.gain;
    const low = 1 - (1 - THUNDER_DUCKING) * (0.5 + 0.5 * near);
    duck.cancelScheduledValues(start);
    duck.setTargetAtTime(low, start, 0.08);
    duck.setTargetAtTime(1, start + duration * 0.6, duration * 0.25);
    // Looped: a long rumble would otherwise run past the end of the 4 s buffer and stop dead (a click)
    src.loop = true;
    src.start(start, Math.random() * 2, duration + 0.1);
  }

  /** One footstep on a surface (a random sample, slightly varied); `splash`: stepping in a puddle. */
  footstep(surface: StepSurface, splash: boolean, running: boolean) {
    const ctx = this.ctx;
    // Wet steps: the ground steps, muffled, with a wet layer on top
    const buffers = this.steps[surface === 'water' ? 'ground' : surface];
    if (!ctx || !this.master || !buffers?.length || ctx.state !== 'running') {
      return;
    }
    const src = ctx.createBufferSource();
    src.buffer = buffers[Math.floor(Math.random() * buffers.length)];
    src.playbackRate.value = (running ? 1.08 : 1) * (0.92 + Math.random() * 0.16);
    const gain = ctx.createGain();
    gain.gain.value = STEP_GAIN[surface] * (running ? 1.15 : 1) * (0.8 + Math.random() * 0.4);
    if (surface === 'water') {
      src.connect(this.lowpass(2200)).connect(gain).connect(this.master);
    } else {
      src.connect(gain).connect(this.master);
    }
    src.start();
    if (surface === 'water' || splash) {
      this.wetLayer(splash ? 1 : WET_GROUND_LAYER, running);
    }
  }

  /**
   * Water sounds of a step: a short bright splash (filtered noise) and a few drop "plinks"
   * (a sine whose pitch quickly rises: the sound of a small air bubble in water).
   * @param amount 1 in a puddle, less on wet ground
   */
  private wetLayer(amount: number, running: boolean) {
    const ctx = this.ctx!;
    const now = ctx.currentTime;
    const level = amount * (running ? 1.25 : 1);

    // Splash: soft attack, bright, short
    const noise = ctx.createBufferSource();
    noise.buffer = this.noise!;
    const length = 0.12 + 0.08 * amount + (running ? 0.05 : 0);
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(SPLASH_GAIN * level, now + 0.012);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + length);
    noise.connect(this.highpass(1800)).connect(this.lowpass(7500)).connect(noiseGain).connect(this.master!);
    noise.start(now, Math.random() * 3, length + 0.05);

    // Drops: puddle 3-5, wet ground 0-2
    const drops = amount >= 1 ? 3 + Math.floor(Math.random() * 3) : Math.floor(Math.random() * 3);
    for (let i = 0; i < drops; i++) {
      this.plink(now + 0.02 + Math.random() * (0.08 + 0.12 * amount), PLINK_GAIN * level * (0.5 + 0.5 * Math.random()));
    }
  }

  /** One water drop: a sine rising in pitch, very short. */
  private plink(at: number, level: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    const f0 = 700 + Math.random() * 900;
    const length = 0.04 + Math.random() * 0.05;
    osc.frequency.setValueAtTime(f0, at);
    osc.frequency.exponentialRampToValueAtTime(f0 * (1.8 + Math.random() * 1.2), at + length);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(level, at + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.001, at + length);
    osc.connect(gain).connect(this.master!);
    osc.start(at);
    osc.stop(at + length + 0.02);
  }

  private start() {
    if (this.ctx) {
      void this.ctx.resume();
      return;
    }
    const ctx = new AudioContext();
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = this.muted ? 0 : this.volume;
    // Limiter: loud close thunder over the rain never clips
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -6;
    limiter.knee.value = 6;
    limiter.ratio.value = 12;
    limiter.attack.value = 0.003;
    limiter.release.value = 0.25;
    this.master.connect(limiter).connect(ctx.destination);
    this.noise = this.makeNoise(false);
    this.brownNoise = this.makeNoise(true);

    // Rain: highpassed noise (hiss) + a flickering brighter band (drops)
    this.rainFilter = ctx.createBiquadFilter();
    this.rainFilter.type = 'lowpass';
    this.rainBus = ctx.createGain();
    this.rainBus.connect(this.master);
    this.rainGain = this.loop(this.noise, [this.highpass(400), this.rainFilter], this.rainBus);
    this.dropsGain = this.loop(this.noise, [this.bandpass(4500, 0.9)], this.rainBus);
    // Drizzle: soft, high, airy
    this.drizzleGain = this.loop(this.noise, [this.highpass(2500), this.lowpass(9000)], this.rainBus);
    // Wind: resonant band of brown noise
    this.windFilter = this.bandpass(400, 0.9);
    this.windGain = this.loop(this.brownNoise, [this.windFilter]);
    // Sand: thin high hiss riding the wind
    this.sandGain = this.loop(this.noise, [this.bandpass(6000, 0.7)]);
    // Volcanic rumble: very low brown noise
    this.rumbleFilter = this.lowpass(100);
    this.rumbleGain = this.loop(this.brownNoise, [this.rumbleFilter, this.lowpass(160)]);
    // Electric hum: mains-like buzz (100 Hz sawtooth, muffled), heard while arcs crackle nearby
    this.humGain = ctx.createGain();
    this.humGain.gain.value = 0;
    const hum = ctx.createOscillator();
    hum.type = 'sawtooth';
    hum.frequency.value = 100;
    hum.connect(this.lowpass(700)).connect(this.humGain).connect(this.master);
    hum.start();
    // Sea: low swell of brown noise + the hiss of the wash
    this.waveFilter = this.lowpass(400);
    this.waveGain = this.loop(this.brownNoise, [this.waveFilter]);
    this.washGain = this.loop(this.noise, [this.highpass(1200), this.lowpass(6000)]);
    // Solar storm radio static: narrow band of noise, its pitch jumping
    this.staticFilter = this.bandpass(2000, 1.5);
    this.staticGain = this.loop(this.noise, [this.staticFilter]);
    // Petal whirlwind: band of noise, its pitch swirling
    this.whirlFilter = this.bandpass(800, 1.4);
    this.whirlGain = this.loop(this.noise, [this.whirlFilter]);
    // Geyser steam hiss: broad band of white noise
    this.steamGain = this.loop(this.noise, [this.highpass(1500), this.lowpass(7000)]);
    // Time warp drone: two low tones a little apart, beating slowly
    this.warpDroneGain = ctx.createGain();
    this.warpDroneGain.gain.value = 0;
    this.warpDroneGain.connect(this.master);
    for (const freq of [73, 74.5, 110]) {
      const osc = ctx.createOscillator();
      osc.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = freq > 100 ? 0.3 : 0.5;
      osc.connect(g).connect(this.warpDroneGain);
      osc.start();
    }
    // Reversed gravity: noise through a band-pass whose frequency is driven by a sawtooth: it rises slowly, drops back
    // at once and rises again, an endless upward whoosh
    const sweep = this.bandpass(FLOAT_SWEEP[0], 1.4);
    const lfo = ctx.createOscillator();
    lfo.type = 'sawtooth';
    lfo.frequency.value = FLOAT_SWEEP_RATE;
    const depth = ctx.createGain();
    depth.gain.value = FLOAT_SWEEP[1];
    lfo.connect(depth).connect(sweep.frequency);
    lfo.start();
    this.floatGain = this.loop(this.noise, [sweep]);
    // Old film projector: a mid whirr chopped by the shutter (square wave on its volume, 18 times per second)
    const shutter = ctx.createGain();
    shutter.gain.value = 0.6;
    const shutterLfo = ctx.createOscillator();
    shutterLfo.type = 'square';
    shutterLfo.frequency.value = SHUTTER_RATE;
    const shutterDepth = ctx.createGain();
    shutterDepth.gain.value = 0.4;
    shutterLfo.connect(shutterDepth).connect(shutter.gain);
    shutterLfo.start();
    this.projectorGain = this.loop(this.noise, [this.bandpass(1600, 1.5), shutter]);
    // Earthquake rumble: very deep brown noise
    this.quakeGain = this.loop(this.brownNoise, [this.lowpass(110)]);
    // Tornado roar: deep rumbling brown noise, brighter when close
    this.roarFilter = this.lowpass(300);
    this.roarGain = this.loop(this.brownNoise, [this.roarFilter]);
    // Blood moon drone: low sawtooth tones a semitone apart (grating), muffled
    this.bloodDroneGain = ctx.createGain();
    this.bloodDroneGain.gain.value = 0;
    this.bloodDroneFilter = this.lowpass(220);
    this.bloodDroneFilter.connect(this.bloodDroneGain).connect(this.master);
    for (const [freq, amount] of [[41.2, 1], [43.65, 0.7], [61.7, 0.35]] as const) {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = amount * 0.35;
      osc.connect(g).connect(this.bloodDroneFilter);
      osc.start();
    }
    // Smog: distant traffic rumble (low brown noise)
    this.trafficFilter = this.lowpass(280);
    this.trafficGain = this.loop(this.brownNoise, [this.trafficFilter]);
    // Acid rain sizzling: high band of white noise, its level flickering (see updateMagic)
    this.sizzleGain = this.loop(this.noise, [this.highpass(3500), this.lowpass(9000)]);
    // Darkness drone: low tones slightly out of tune (slow beating) + a faint tritone above, all muffled
    this.droneGain = ctx.createGain();
    this.droneGain.gain.value = 0;
    const droneFilter = this.lowpass(400);
    droneFilter.connect(this.droneGain).connect(this.master);
    for (const [freq, level] of [[55, 1], [55.6, 0.8], [41.2, 0.7], [77.8, 0.25]] as const) {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = level * 0.4;
      osc.connect(g).connect(droneFilter);
      osc.start();
    }
    // Forest: rustling leaves (bright band of noise, flickering)
    this.rustleFilter = this.bandpass(4000, 0.7);
    this.rustleGain = this.loop(this.noise, [this.highpass(1500), this.rustleFilter]);
    // Darkness breathing: low brown noise swelling slowly
    this.breathFilter = this.lowpass(250);
    this.breathGain = this.loop(this.brownNoise, [this.breathFilter]);

    // Blizzard: narrow resonances on the noise = whistling, howling wind
    for (const v of HOWL_VOICES) {
      const filter = this.bandpass(v.freq, v.q);
      this.howls.push({ gain: this.loop(this.noise, [filter]), filter });
    }
    // Poison: low bubbling bed (resonant band of brown noise, its pitch wobbling)
    this.swampFilter = this.bandpass(300, 3);
    this.swampGain = this.loop(this.brownNoise, [this.swampFilter]);

    (Object.keys(STEP_FILES) as SampledSurface[]).forEach(surface => {
      Promise.all(STEP_FILES[surface].map(url => fetch(url)
        .then(r => r.arrayBuffer())
        .then(data => ctx.decodeAudioData(data))))
        .then(buffers => this.steps[surface] = buffers)
        .catch(err => console.warn(`Footstep sounds "${surface}" not loaded`, err));
    });
  }

  /** Looping noise source through filters into a gain (starts silent), connected to the master. */
  private loop(buffer: AudioBuffer, filters: AudioNode[], output: AudioNode = this.master!): GainNode {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    let node: AudioNode = src;
    for (const f of filters) {
      node = node.connect(f);
    }
    node.connect(gain).connect(output);
    // Random start so the loops of the same buffer don't play in phase
    src.start(0, Math.random() * buffer.duration);
    return gain;
  }

  private highpass(freq: number) {
    const f = this.ctx!.createBiquadFilter();
    f.type = 'highpass';
    f.frequency.value = freq;
    return f;
  }

  private lowpass(freq: number) {
    const f = this.ctx!.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = freq;
    return f;
  }

  private bandpass(freq: number, q: number) {
    const f = this.ctx!.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = freq;
    f.Q.value = q;
    return f;
  }

  /** 4 s of white noise, or brown noise (deep rumble) for the wind and thunder. */
  private makeNoise(brown: boolean): AudioBuffer {
    const ctx = this.ctx!;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1;
      if (brown) {
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.5;
      } else {
        data[i] = white;
      }
    }
    if (brown) {
      // The random walk ends away from where it started: remove that drift so the loop joins without a jump
      // (otherwise the looped wind / rumble clicks every 4 s)
      const drift = data[data.length - 1] - data[0];
      for (let i = 0; i < data.length; i++) {
        data[i] -= drift * i / (data.length - 1);
      }
    }
    return buffer;
  }
}
