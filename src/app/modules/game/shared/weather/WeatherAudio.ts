import { AudioKit } from "./audio/audio-kit";
import {
  bird,
  cricket,
  croak,
  gull,
  owl,
  wolfHowl,
} from "./audio/animal-voices";
import {
  chime,
  creak,
  ghostMoan,
  heartbeat,
  knocks,
  whisper,
} from "./audio/eerie-voices";
import {
  bubbles,
  crackle,
  fireworkBang,
  geyserBurst,
  hailTick,
  horn,
  ledgeHop,
  plink,
  rocketWhistle,
  scurry,
  siren,
  thud,
} from "./audio/sound-effects";
import { thunder } from "./audio/thunder";
import {
  AMBIENCE_SMOOTHING,
  ASH_CRACKLE_LEVEL,
  ASH_CRACKLE_RATE,
  BIRD_INTERVAL,
  BLOOD_DRONE_GAIN,
  BLOOD_HEART_INTERVAL,
  BLOOD_HOWL_INTERVAL,
  BREATH_GAIN,
  BUBBLE_RATE,
  CHIME_NOTES,
  CHIME_RATE,
  CRACKLE_RATE,
  CRACK_GAIN,
  CRACK_RATE,
  DREAD_INTERVAL,
  DRIZZLE_GAIN,
  DRONE_GAIN,
  FILM_CRACKLE_GAIN,
  FILM_CRACKLE_RATE,
  FLOAT_GAIN,
  FLOAT_SWEEP,
  FLOAT_SWEEP_RATE,
  FROG_INTERVAL,
  GULL_INTERVAL,
  HAIL_GAIN,
  HAIL_TICKS,
  HORN_INTERVAL,
  HOWL_GAIN,
  HOWL_VOICES,
  HUM_GAIN,
  ICE_CRACK_GAIN,
  ICE_CRACK_RATE,
  MAX_ZAPS_PER_SECOND,
  MIRAGE_GAIN,
  MOAN_INTERVAL,
  OWL_INTERVAL,
  PLINK_GAIN,
  PROJECTOR_GAIN,
  QUAKE_GAIN,
  RAIN_GAIN,
  RATTLE_RATE,
  REVERSE_GAIN,
  REVERSE_INTERVAL,
  ROAR_GAIN,
  RUMBLE_GAIN,
  RUSTLE_GAIN,
  SAND_GAIN,
  SHUTTER_RATE,
  SIREN_CHANCE,
  SIZZLE_GAIN,
  SPLASH_GAIN,
  STATIC_GAIN,
  STEAM_GAIN,
  SWAMP_GAIN,
  TICK_GAIN,
  TICK_PERIOD,
  TRAFFIC_GAIN,
  WARP_DRONE_GAIN,
  WAVE_GAIN,
  WAVE_PERIOD,
  WET_GROUND_LAYER,
  WHIRL_GAIN,
  WHISPER_INTERVAL,
  WIND_GAIN,
  ZAP_GAIN,
  rand,
} from "./audio/mix";
import { applySilentMode } from "./silent-mode";
import {
  isGameAsleep,
  onGameAsleep,
} from "../../../../core/shared/app-visibility";

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

export type StepSurface = "ground" | "snow" | "water";

/** One lightning bolt of a strike: start (s after the strike), distance 0 (overhead) .. 1 (far), side -1 .. 1. */
export interface ThunderBolt {
  at: number;
  distance: number;
  pan: number;
}

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
  /** Mirage: high shimmering tone. */
  mirage: number;
  /** Deep freeze: ice cracking. */
  deepFreeze: number;
  /** Frogs croaking (monsoon). */
  frogs: number;
  /** Crickets without the forest (starry night). */
  crickets: number;
  /** Distant city (smog). */
  city: number;
  /** Acid rain sizzling. */
  sizzle: number;
}

type SampledSurface = Exclude<StepSurface, "water">;
const STEP_FILES: Record<SampledSurface, string[]> = {
  ground: [1, 2, 3, 4, 5, 6].map((i) => `assets/sounds/steps/ground-${i}.m4a`),
  snow: [1, 2, 3, 4, 5, 6].map((i) => `assets/sounds/steps/snow-${i}.m4a`),
};
/** Loudness of each sound family (before the master volume). */
const STEP_GAIN: Record<StepSurface, number> = {
  ground: 0.35,
  snow: 0.5,
  water: 0.3,
};

export class WeatherAudio {
  private ctx?: AudioContext;
  private master?: GainNode;
  /** Rain and drizzle go through this bus, lowered while it thunders. */
  private rainBus?: GainNode;
  /** The context, master, noise and node makers the one-shot sounds use (made at start). */
  private kit?: AudioKit;
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
  private readonly howls: { gain: GainNode; filter: BiquadFilterNode }[] = [];
  private droneGain?: GainNode;
  private breathGain?: GainNode;
  private breathFilter?: BiquadFilterNode;
  private dreadTimer = 4;
  private sizzleGain?: GainNode;
  private trafficGain?: GainNode;
  private trafficFilter?: BiquadFilterNode;
  private hornTimer = 3;
  /** Each frog: time until its next croak, its pitch and side. */
  private readonly frogsState = [0, 1, 2, 3].map(() => ({
    timer: Math.random() * 2,
    pitch: rand(170, 340),
    side: rand(-0.9, 0.9),
  }));
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
  private mirageGain?: GainNode;
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
  private readonly crickets = [0, 1, 2].map(() => ({
    timer: Math.random(),
    period: rand(0.55, 0.95),
    freq: rand(4200, 5200),
    side: rand(-0.8, 0.8),
  }));
  private readonly steps: Partial<Record<SampledSurface, AudioBuffer[]>> = {};
  private volume = 0.7;
  private muted = false;
  private time = 0;

  constructor() {
    // Silent mode bypass chosen on this device (iPhone, iPad): before the first sound
    applySilentMode();
    // Browsers only let the sound start during a user gesture. Safari (iPhone, iPad) doesn't count a touch's
    // pointerdown as one, only its end (pointerup / touchend): the sound would stay suspended. The sound can
    // also be stopped later (iOS suspends it when the app goes to the background, a call...): every gesture
    // starts it again if needed.
    const start = () => {
      if (this.ctx?.state !== "running" && !isGameAsleep()) {
        this.start();
      }
    };
    for (const event of [
      "keydown",
      "pointerdown",
      "pointerup",
      "touchend",
      "click",
    ]) {
      window.addEventListener(event, start, { capture: true, passive: true });
    }
    // In the background (home screen, other app, screen locked): silent, back on return
    onGameAsleep((hidden) => {
      if (!this.ctx) {
        return;
      }
      if (hidden) {
        void this.ctx.suspend().catch(() => undefined);
      } else if (this.ctx.state !== "running") {
        void this.ctx.resume().catch(() => undefined);
      }
    });
  }

  /** Master volume 0..1, and mute. */
  setVolume(volume: number, muted: boolean) {
    this.volume = Math.min(Math.max(volume, 0), 1);
    this.muted = muted;
    if (this.ctx && this.master) {
      this.master.gain.setTargetAtTime(
        this.muted ? 0 : this.volume,
        this.ctx.currentTime,
        0.05
      );
    }
  }

  /** Follows the weather: call every frame. */
  update(dt: number, levels: AmbienceLevels) {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== "running") {
      return;
    }
    this.time += dt;
    const now = ctx.currentTime;
    const set = (node: GainNode | undefined, value: number) =>
      node?.gain.setTargetAtTime(value, now, AMBIENCE_SMOOTHING);

    // Rain: steady hiss + louder, darker with heavy rain; crackling drops on top
    set(this.rainGain, RAIN_GAIN * Math.pow(levels.rain, 0.8));
    this.rainFilter?.frequency.setTargetAtTime(
      2500 + 3500 * (1 - levels.rain),
      now,
      AMBIENCE_SMOOTHING
    );
    // Drops: random flicker of a brighter band (sounds like individual drops hitting)
    const drops = levels.rain * (0.6 + 0.4 * Math.random());
    this.dropsGain?.gain.setTargetAtTime(RAIN_GAIN * 0.5 * drops, now, 0.02);
    set(this.drizzleGain, DRIZZLE_GAIN * levels.drizzle);

    // Wind: band of noise whose pitch and loudness rise with the wind, slowly breathing
    const wind = Math.min(levels.wind, 1.3);
    const breathe =
      0.8 + 0.2 * Math.sin(this.time * 0.7) * Math.sin(this.time * 0.23);
    set(this.windGain, WIND_GAIN * Math.pow(wind, 1.6) * breathe);
    this.windFilter?.frequency.setTargetAtTime(
      250 + 650 * wind * breathe,
      now,
      AMBIENCE_SMOOTHING
    );
    set(this.sandGain, SAND_GAIN * levels.sand * Math.min(wind, 1));

    // Volcanic: deep rumble slowly swelling (several slow waves, never in sync), random crackles
    const swell =
      0.6 +
      0.25 * Math.sin(this.time * 0.31) +
      0.15 * Math.sin(this.time * 0.83 + 1.7);
    set(this.rumbleGain, RUMBLE_GAIN * levels.lava * swell);
    this.rumbleFilter?.frequency.setTargetAtTime(
      70 + 50 * swell,
      now,
      AMBIENCE_SMOOTHING
    );
    if (levels.lava > 0.05 && Math.random() < CRACKLE_RATE * levels.lava * dt) {
      crackle(this.kit!, levels.lava);
    }

    // Poison: a low wobbling bubbling bed, and bubbles popping here and there
    const ooze =
      0.7 + 0.3 * Math.sin(this.time * 0.9 + Math.sin(this.time * 2.3));
    set(this.swampGain, SWAMP_GAIN * levels.poison * ooze);
    this.swampFilter?.frequency.setTargetAtTime(220 + 160 * ooze, now, 0.2);
    if (
      levels.poison > 0.05 &&
      Math.random() < BUBBLE_RATE * levels.poison * dt
    ) {
      bubbles(this.kit!, levels.poison);
    }

    this.updateDarkness(dt, levels.darkness, now);
    this.updateBloodMoon(dt, levels.bloodMoon, now);
    this.updateFrogs(dt, levels.frogs);
    this.updateCity(dt, levels.city, now);
    this.updateTimeWarp(dt, levels.timeWarp, now);
    this.updateInverted(dt, levels.inverted);
    this.floatGain?.gain.setTargetAtTime(
      FLOAT_GAIN * levels.antigravity,
      now,
      0.5
    );
    this.projectorGain?.gain.setTargetAtTime(
      PROJECTOR_GAIN * levels.oldFilm,
      now,
      0.5
    );
    this.updateIceCracks(dt, levels.deepFreeze);
    this.mirageGain?.gain.setTargetAtTime(
      MIRAGE_GAIN * levels.mirage * (0.7 + 0.3 * Math.sin(this.time * 0.9)),
      now,
      0.3
    );
    this.updateFilmCrackle(dt, levels.oldFilm);
    this.updateHail(dt, levels.hail);
    this.lapping = levels.lapping;
    this.updateSea(dt, levels.sea, now);
    this.updateMagic(dt, levels, now);
    this.updateEerie(dt, levels, now);
    // Electric hum: follows the arcs crackling nearby, fades quickly once they stop
    this.electricNear = Math.max(0, this.electricNear - dt * 2.5);
    this.zapBudget = Math.min(
      MAX_ZAPS_PER_SECOND,
      this.zapBudget + dt * MAX_ZAPS_PER_SECOND
    );
    this.humGain?.gain.setTargetAtTime(
      HUM_GAIN * Math.min(this.electricNear, 1),
      now,
      0.08
    );
    this.updateForest(dt, levels, now);

    // Blizzard: each whistle slowly moans up and down and swells on its own rhythm; louder and higher in the gusts
    const gust = Math.max(levels.wind - 0.9, 0);
    this.howls.forEach(({ gain, filter }, i) => {
      const v = HOWL_VOICES[i];
      const t = this.time * v.speed + i * 2.1;
      const moan = Math.sin(t) * 0.6 + Math.sin(t * 2.7 + 1.3) * 0.4;
      filter.frequency.setTargetAtTime(
        v.freq * (1 + v.glide * moan + 0.4 * gust),
        now,
        0.15
      );
      const swell = Math.max(0, 0.55 + 0.45 * Math.sin(t * 1.6 + 0.7));
      gain.gain.setTargetAtTime(
        HOWL_GAIN * levels.howl * swell * (1 + gust),
        now,
        0.25
      );
    });
  }

  /** Forest: rustling leaves (following the wind), birds by day, crickets and owl at night. */
  private updateForest(dt: number, levels: AmbienceLevels, now: number) {
    const f = levels.forest;
    const t = this.time;
    const flutter =
      0.55 + 0.25 * Math.sin(t * 1.3) + 0.2 * Math.sin(t * 2.9 + 1.1);
    const wind = Math.min(levels.wind, 1.2);
    this.rustleGain?.gain.setTargetAtTime(
      RUSTLE_GAIN * f * (0.2 + 0.8 * wind) * flutter,
      now,
      0.15
    );
    this.rustleFilter?.frequency.setTargetAtTime(
      2500 + 2500 * flutter,
      now,
      0.15
    );
    const day = levels.daylight;
    // Birds: in the forest or a sunny weather, by day
    const birds = Math.max(f, levels.birds);
    if (birds >= 0.3) {
      this.birdTimer -= dt * day;
      if (this.birdTimer <= 0) {
        this.birdTimer = rand(BIRD_INTERVAL[0], BIRD_INTERVAL[1]);
        bird(this.kit!, birds * day);
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
          cricket(this.kit!, c.freq, c.side, crickets * night);
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
        owl(this.kit!, f * night);
      }
    }
  }

  /**
   * An electric arc nearby: a sharp snap, then a short buzzing crackle (a burst of tiny sparks).
   * @param closeness 0 (far) .. 1 (right next to the player)
   * @param side -1 (left) .. 1 (right)
   * @param life arc duration (s): longer arcs buzz longer
   */
  zap(closeness: number, side: number, life: number) {
    const ctx = this.ctx;
    if (!ctx || !this.master || !this.noise || ctx.state !== "running") {
      return;
    }
    this.electricNear = Math.min(this.electricNear + closeness * 0.5, 1.5);
    if (this.zapBudget < 1) {
      return;
    }
    this.zapBudget--;
    const out = this.kit!.panned(side);
    const at = ctx.currentTime;
    const level = ZAP_GAIN * closeness * rand(0.6, 1);
    // Snap
    const snap = ctx.createBufferSource();
    snap.buffer = this.noise;
    const snapGain = ctx.createGain();
    snapGain.gain.setValueAtTime(level, at);
    snapGain.gain.exponentialRampToValueAtTime(0.001, at + 0.03);
    snap.connect(this.kit!.highpass(2500)).connect(snapGain).connect(out);
    snap.start(at, Math.random() * 3, 0.04);
    // Crackle: noise chopped into tiny irregular sparks, with a buzzing tone under it
    const length = Math.max(0.06, life * rand(0.6, 1));
    const crackle = ctx.createBufferSource();
    crackle.buffer = this.noise;
    const crackleGain = ctx.createGain();
    crackleGain.gain.setValueAtTime(0, at);
    let t = at + 0.01;
    while (t < at + length) {
      crackleGain.gain.linearRampToValueAtTime(
        level * rand(0.3, 0.8),
        t + 0.002
      );
      crackleGain.gain.linearRampToValueAtTime(
        level * 0.05,
        t + rand(0.006, 0.018)
      );
      t += rand(0.01, 0.03);
    }
    crackleGain.gain.linearRampToValueAtTime(0, t + 0.01);
    crackle
      .connect(this.kit!.bandpass(rand(3000, 6000), 1.2))
      .connect(crackleGain)
      .connect(out);
    crackle.start(at, Math.random() * 3, length + 0.05);
    const buzz = ctx.createOscillator();
    buzz.type = "sawtooth";
    buzz.frequency.value = rand(110, 180);
    const buzzGain = ctx.createGain();
    buzzGain.gain.setValueAtTime(0, at);
    buzzGain.gain.linearRampToValueAtTime(level * 0.25, at + 0.01);
    buzzGain.gain.linearRampToValueAtTime(0, at + length);
    buzz
      .connect(this.kit!.bandpass(rand(900, 1600), 2))
      .connect(buzzGain)
      .connect(out);
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
      const out = this.kit!.panned(rand(-1, 1));
      let at = ctx.currentTime + Math.random() * dt;
      let level = HAIL_GAIN * hail * rand(0.3, 1);
      const bounces =
        Math.random() < 0.6 ? 1 + Math.floor(Math.random() * 2) : 0;
      for (let k = 0; k <= bounces; k++) {
        hailTick(this.kit!, at, freq * (1 + k * 0.06), level, roof, out);
        at += rand(0.04, 0.09) / (k + 1);
        level *= rand(0.3, 0.5);
      }
    }
  }

  /** Sea: waves slowly breaking (a low swell then the hiss of the wash), gulls crying far away. */
  private updateSea(dt: number, sea: number, now: number) {
    const phase = (this.time / WAVE_PERIOD) % 1;
    const swell = Math.pow(Math.sin(Math.PI * phase), 2);
    // The wash follows the breaking wave, a bit later
    const wash = Math.pow(
      Math.max(0, Math.sin(Math.PI * ((phase + 0.75) % 1))),
      3
    );
    const waves = Math.max(sea, this.lapping);
    this.waveGain?.gain.setTargetAtTime(
      WAVE_GAIN * waves * (0.25 + 0.75 * swell),
      now,
      0.3
    );
    this.waveFilter?.frequency.setTargetAtTime(250 + 450 * swell, now, 0.3);
    this.washGain?.gain.setTargetAtTime(
      WAVE_GAIN * 0.4 * waves * wash,
      now,
      0.3
    );
    if (sea < 0.3) {
      return;
    }
    this.gullTimer -= dt;
    if (this.gullTimer <= 0) {
      this.gullTimer = rand(GULL_INTERVAL[0], GULL_INTERVAL[1]);
      gull(this.kit!, sea);
    }
  }

  /** Chimes, radio static, curse whispers. */
  private updateMagic(dt: number, levels: AmbienceLevels, now: number) {
    // Crystal chimes: random high bell notes, sparse
    if (
      levels.chimes > 0.05 &&
      Math.random() < CHIME_RATE * levels.chimes * dt
    ) {
      chime(this.kit!, levels.chimes);
    }
    // Radio static: a faint crackling bed, with bursts now and then
    this.staticBurst = Math.max(0, this.staticBurst - dt * 2);
    if (levels.static > 0.05 && Math.random() < 0.4 * dt * levels.static) {
      this.staticBurst = rand(0.6, 1);
    }
    const crackle = Math.random() < 0.3 ? 1 : 0.4;
    this.staticGain?.gain.setTargetAtTime(
      STATIC_GAIN * levels.static * (0.15 + 0.85 * this.staticBurst) * crackle,
      now,
      0.01
    );
    this.staticFilter?.frequency.setTargetAtTime(rand(1200, 3500), now, 0.02);
    // Acid rain sizzling: a bright hiss crackling irregularly, like something frying
    const fry = Math.random() < 0.45 ? rand(0.6, 1) : rand(0.15, 0.35);
    this.sizzleGain?.gain.setTargetAtTime(
      SIZZLE_GAIN * levels.sizzle * fry,
      now,
      0.015
    );
    // Curse whispers
    if (levels.whispers > 0.3) {
      this.whisperTimer -= dt;
      if (this.whisperTimer <= 0) {
        this.whisperTimer = rand(WHISPER_INTERVAL[0], WHISPER_INTERVAL[1]);
        whisper(this.kit!, levels.whispers * 0.8, rand(-0.9, 0.9));
      }
    }
  }

  /** Ice cracking (frost), ghostly moans (haunted mist), tornado roar. */
  private updateEerie(dt: number, levels: AmbienceLevels, now: number) {
    const ctx = this.ctx!;
    if (
      levels.crackle > 0.05 &&
      Math.random() < CRACK_RATE * levels.crackle * dt
    ) {
      // A tiny sharp crack, sometimes a short creaking series
      let at = ctx.currentTime;
      const out = this.kit!.panned(rand(-0.9, 0.9));
      for (
        let i = 0;
        i < 1 + Math.floor(Math.random() * Math.random() * 4);
        i++
      ) {
        const src = ctx.createBufferSource();
        src.buffer = this.noise!;
        const g = ctx.createGain();
        g.gain.setValueAtTime(CRACK_GAIN * levels.crackle * rand(0.4, 1), at);
        g.gain.exponentialRampToValueAtTime(0.001, at + rand(0.01, 0.04));
        src
          .connect(this.kit!.bandpass(rand(2500, 7000), rand(3, 8)))
          .connect(g)
          .connect(out);
        src.start(at, Math.random() * 3, 0.06);
        at += rand(0.02, 0.09);
      }
    }
    if (
      levels.ashCrackle > 0.05 &&
      Math.random() < ASH_CRACKLE_RATE * levels.ashCrackle * dt
    ) {
      crackle(this.kit!, ASH_CRACKLE_LEVEL * levels.ashCrackle);
    }
    if (levels.moan > 0.05) {
      this.moanTimer -= dt;
      if (this.moanTimer <= 0) {
        this.moanTimer = rand(MOAN_INTERVAL[0], MOAN_INTERVAL[1]);
        ghostMoan(this.kit!, levels.moan);
      }
    }
    // Petal whirlwind: a whooshing gust whose pitch swirls up and down quickly (the air turning)
    const w = levels.whirl;
    const swirl =
      Math.sin(this.time * 4.2) * 0.6 + Math.sin(this.time * 6.9 + 1) * 0.4;
    this.whirlGain?.gain.setTargetAtTime(
      WHIRL_GAIN * w * w * (0.75 + 0.25 * swirl),
      now,
      0.12
    );
    this.whirlFilter?.frequency.setTargetAtTime(
      500 + 500 * w + 350 * swirl,
      now,
      0.06
    );
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
      src
        .connect(this.kit!.bandpass(rand(400, 1800), rand(3, 7)))
        .connect(g)
        .connect(this.kit!.panned(rand(-1, 1)));
      src.start(at, Math.random() * 3, 0.08);
    }
    // Geysers: steam hissing (a broad high hiss, fluttering)
    this.steamGain?.gain.setTargetAtTime(
      STEAM_GAIN * levels.steam * (0.85 + 0.15 * Math.sin(this.time * 23)),
      now,
      0.1
    );
    const r = levels.roar;
    this.roarGain?.gain.setTargetAtTime(
      ROAR_GAIN * r * r * (0.85 + 0.15 * Math.sin(this.time * 1.7)),
      now,
      0.3
    );
    this.roarFilter?.frequency.setTargetAtTime(150 + 600 * r, now, 0.3);
  }

  /**
   * Blood moon: a deep dissonant drone throbbing slowly like the red light (same rhythm as its breathing),
   * bouts of heartbeats, and now and then a wolf howling far away.
   */
  private updateBloodMoon(dt: number, level: number, now: number) {
    const t = this.time;
    const pulse = 0.7 * Math.sin(t * 0.8) + 0.3 * Math.sin(t * 2.3);
    this.bloodDroneGain?.gain.setTargetAtTime(
      BLOOD_DRONE_GAIN * level * (0.65 + 0.35 * pulse),
      now,
      0.3
    );
    this.bloodDroneFilter?.frequency.setTargetAtTime(
      160 + 90 * (pulse + 1),
      now,
      0.3
    );
    if (level < 0.3) {
      return;
    }
    this.bloodHeartTimer -= dt;
    if (this.bloodHeartTimer <= 0) {
      this.bloodHeartTimer = rand(
        BLOOD_HEART_INTERVAL[0],
        BLOOD_HEART_INTERVAL[1]
      );
      heartbeat(this.kit!, level * 0.8);
    }
    this.bloodHowlTimer -= dt;
    if (this.bloodHowlTimer <= 0) {
      this.bloodHowlTimer = rand(
        BLOOD_HOWL_INTERVAL[0],
        BLOOD_HOWL_INTERVAL[1]
      );
      wolfHowl(this.kit!, level);
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
    src
      .connect(this.kit!.highpass(1500))
      .connect(g)
      .connect(this.kit!.panned(rand(-0.5, 0.5)));
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
    const out = this.kit!.panned(rand(-0.8, 0.8));
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
      const band = this.kit!.bandpass(800, 0.7);
      band.frequency.setValueAtTime(800, at);
      band.frequency.exponentialRampToValueAtTime(6000, at + length);
      src.connect(band).connect(g);
      src.start(at, Math.random() * 2, length + 0.05);
    } else {
      // Reversed bell: the inharmonic partials of a bell, growing instead of dying
      const f = CHIME_NOTES[Math.floor(Math.random() * CHIME_NOTES.length)] / 2;
      for (const [mult, amount] of [
        [1, 1],
        [2.76, 0.35],
        [5.4, 0.12],
      ] as const) {
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
    this.warpDroneGain?.gain.setTargetAtTime(
      WARP_DRONE_GAIN * level * (0.8 + 0.2 * Math.sin(this.time * 0.4)),
      now,
      0.5
    );
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
    const out = this.kit!.panned(this.tock ? 0.3 : -0.3);
    // The tick: a short knock, low and stretched (as if slowed down)
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(this.tock ? 220 : 260, at);
    osc.frequency.exponentialRampToValueAtTime(
      this.tock ? 150 : 180,
      at + 0.25
    );
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(TICK_GAIN * level, at + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, at + 0.35);
    osc
      .connect(this.kit!.bandpass(this.tock ? 400 : 480, 3))
      .connect(g)
      .connect(out);
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
    this.trafficGain?.gain.setTargetAtTime(
      TRAFFIC_GAIN * level * swell,
      now,
      0.5
    );
    this.trafficFilter?.frequency.setTargetAtTime(220 + 120 * swell, now, 0.5);
    if (level < 0.3) {
      return;
    }
    this.hornTimer -= dt;
    if (this.hornTimer <= 0) {
      this.hornTimer = rand(HORN_INTERVAL[0], HORN_INTERVAL[1]);
      if (Math.random() < SIREN_CHANCE) {
        siren(this.kit!, level);
      } else {
        horn(this.kit!, level);
      }
    }
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
        croak(this.kit!, frog.pitch, frog.side, level * rand(0.5, 1));
      }
    }
  }

  /** Darkness: deep drone (slowly beating, its unsettling high overtone swells), breathing, distant sounds. */
  private updateDarkness(dt: number, level: number, now: number) {
    const t = this.time;
    const unease = 0.6 + 0.4 * Math.sin(t * 0.13) * Math.sin(t * 0.07 + 1);
    this.droneGain?.gain.setTargetAtTime(DRONE_GAIN * level * unease, now, 0.8);
    // Breathing: in 3 s, out 4 s, irregular
    const breath = Math.max(
      0,
      Math.sin((t * 2 * Math.PI) / 7 + Math.sin(t * 0.3))
    );
    this.breathGain?.gain.setTargetAtTime(
      BREATH_GAIN * level * breath,
      now,
      0.6
    );
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
        knocks(this.kit!, level, side);
      } else if (r < 0.55) {
        creak(this.kit!, level, side);
      } else if (r < 0.8) {
        whisper(this.kit!, level, side);
      } else {
        heartbeat(this.kit!, level);
      }
    }
  }

  /**
   * A geyser erupting: a gurgle of bubbles, then a whoosh as the jet bursts out (louder when close).
   * @param closeness 0..1
   */
  geyserBurst(closeness: number, side: number) {
    if (this.kit) {
      geyserBurst(this.kit, closeness, side);
    }
  }

  /** A rocket climbing: a thin whistle rising in pitch for the climb time. */
  rocketWhistle(climb: number, side: number) {
    if (this.kit) {
      rocketWhistle(this.kit, climb, side);
    }
  }

  /**
   * A burst: a deep bang (heard a little after the light: sound is slower), its echo, then the sparks crackling.
   * @param closeness 0..1 (louder and sooner when close)
   */
  fireworkBang(closeness: number, side: number) {
    if (this.kit) {
      fireworkBang(this.kit, closeness, side);
    }
  }

  /** Ledge hop: a short airy whoosh falling in pitch (the player drops). */
  ledgeHop() {
    if (this.kit) {
      ledgeHop(this.kit);
    }
  }

  /** The player falling back on the ground: a dull thud. */
  thud() {
    if (this.kit) {
      thud(this.kit);
    }
  }

  /**
   * Thunder of a lightning strike: each bolt is heard after the light, the later the farther (sound is slow).
   * - close: sharp tearing crack right away, then a heavy boom;
   * - mid: a boom with a few rolling swells;
   * - far: a long, low, soft rolling rumble.
   * Every rumble is random (speed, swells, length, side): no two sound the same.
   */
  /**
   * Deep freeze: the ice cracking under the cold. A sharp snap, then the strange "pew" of a frozen lake: a tone
   * falling fast from high to low (the crack travels through the ice, high frequencies arriving first).
   */
  private updateIceCracks(dt: number, level: number) {
    if (level < 0.3 || Math.random() > ICE_CRACK_RATE * level * dt) {
      return;
    }
    const ctx = this.ctx!;
    const at = ctx.currentTime;
    const out = this.kit!.panned(rand(-0.9, 0.9));
    const loud = ICE_CRACK_GAIN * level * rand(0.4, 1);
    const snap = ctx.createBufferSource();
    snap.buffer = this.noise!;
    const sg = ctx.createGain();
    sg.gain.setValueAtTime(loud, at);
    sg.gain.exponentialRampToValueAtTime(0.0001, at + 0.04);
    snap.connect(this.kit!.highpass(2000)).connect(sg).connect(out);
    snap.start(at, Math.random() * 2, 0.05);
    const osc = ctx.createOscillator();
    const f = rand(1800, 3200);
    const length = rand(0.25, 0.5);
    osc.frequency.setValueAtTime(f, at);
    osc.frequency.exponentialRampToValueAtTime(f * 0.12, at + length);
    const og = ctx.createGain();
    og.gain.setValueAtTime(loud * 0.5, at);
    og.gain.exponentialRampToValueAtTime(0.0001, at + length);
    osc.connect(og).connect(out);
    osc.start(at);
    osc.stop(at + length + 0.02);
  }

  /**
   * Moonless night: something runs away in the dark: a quick rustle of leaves (noise bursts in a band-pass,
   * irregular like small steps), from its side.
   */
  scurry(side: number) {
    if (this.kit) {
      scurry(this.kit, side);
    }
  }

  /** The thunder of a strike's bolts (each at its time, distance and side). */
  thunder(bolts: ThunderBolt[]) {
    if (this.kit) {
      thunder(this.kit, bolts);
    }
  }

  /** One footstep on a surface (a random sample, slightly varied); `splash`: stepping in a puddle. */
  footstep(surface: StepSurface, splash: boolean, running: boolean) {
    const ctx = this.ctx;
    // Wet steps: the ground steps, muffled, with a wet layer on top
    const buffers = this.steps[surface === "water" ? "ground" : surface];
    if (!ctx || !this.master || !buffers?.length || ctx.state !== "running") {
      return;
    }
    const src = ctx.createBufferSource();
    src.buffer = buffers[Math.floor(Math.random() * buffers.length)];
    src.playbackRate.value =
      (running ? 1.08 : 1) * (0.92 + Math.random() * 0.16);
    const gain = ctx.createGain();
    gain.gain.value =
      STEP_GAIN[surface] * (running ? 1.15 : 1) * (0.8 + Math.random() * 0.4);
    if (surface === "water") {
      src.connect(this.kit!.lowpass(2200)).connect(gain).connect(this.master);
    } else {
      src.connect(gain).connect(this.master);
    }
    src.start();
    if (surface === "water" || splash) {
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
    noise
      .connect(this.kit!.highpass(1800))
      .connect(this.kit!.lowpass(7500))
      .connect(noiseGain)
      .connect(this.master!);
    noise.start(now, Math.random() * 3, length + 0.05);

    // Drops: puddle 3-5, wet ground 0-2
    const drops =
      amount >= 1
        ? 3 + Math.floor(Math.random() * 3)
        : Math.floor(Math.random() * 3);
    for (let i = 0; i < drops; i++) {
      plink(
        this.kit!,
        now + 0.02 + Math.random() * (0.08 + 0.12 * amount),
        PLINK_GAIN * level * (0.5 + 0.5 * Math.random())
      );
    }
  }

  private start() {
    if (this.ctx) {
      void this.ctx.resume().catch(() => undefined);
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
    this.rainFilter.type = "lowpass";
    this.rainBus = ctx.createGain();
    this.rainBus.connect(this.master);
    this.kit = new AudioKit(
      ctx,
      this.master,
      this.noise,
      this.brownNoise,
      this.rainBus
    );
    this.rainGain = this.loop(
      this.noise,
      [this.kit!.highpass(400), this.rainFilter],
      this.rainBus
    );
    this.dropsGain = this.loop(
      this.noise,
      [this.kit!.bandpass(4500, 0.9)],
      this.rainBus
    );
    // Drizzle: soft, high, airy
    this.drizzleGain = this.loop(
      this.noise,
      [this.kit!.highpass(2500), this.kit!.lowpass(9000)],
      this.rainBus
    );
    // Wind: resonant band of brown noise
    this.windFilter = this.kit!.bandpass(400, 0.9);
    this.windGain = this.loop(this.brownNoise, [this.windFilter]);
    // Sand: thin high hiss riding the wind
    this.sandGain = this.loop(this.noise, [this.kit!.bandpass(6000, 0.7)]);
    // Volcanic rumble: very low brown noise
    this.rumbleFilter = this.kit!.lowpass(100);
    this.rumbleGain = this.loop(this.brownNoise, [
      this.rumbleFilter,
      this.kit!.lowpass(160),
    ]);
    // Electric hum: mains-like buzz (100 Hz sawtooth, muffled), heard while arcs crackle nearby
    this.humGain = ctx.createGain();
    this.humGain.gain.value = 0;
    const hum = ctx.createOscillator();
    hum.type = "sawtooth";
    hum.frequency.value = 100;
    hum
      .connect(this.kit!.lowpass(700))
      .connect(this.humGain)
      .connect(this.master);
    hum.start();
    // Sea: low swell of brown noise + the hiss of the wash
    this.waveFilter = this.kit!.lowpass(400);
    this.waveGain = this.loop(this.brownNoise, [this.waveFilter]);
    this.washGain = this.loop(this.noise, [
      this.kit!.highpass(1200),
      this.kit!.lowpass(6000),
    ]);
    // Solar storm radio static: narrow band of noise, its pitch jumping
    this.staticFilter = this.kit!.bandpass(2000, 1.5);
    this.staticGain = this.loop(this.noise, [this.staticFilter]);
    // Petal whirlwind: band of noise, its pitch swirling
    this.whirlFilter = this.kit!.bandpass(800, 1.4);
    this.whirlGain = this.loop(this.noise, [this.whirlFilter]);
    // Geyser steam hiss: broad band of white noise
    this.steamGain = this.loop(this.noise, [
      this.kit!.highpass(1500),
      this.kit!.lowpass(7000),
    ]);
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
    const sweep = this.kit!.bandpass(FLOAT_SWEEP[0], 1.4);
    const lfo = ctx.createOscillator();
    lfo.type = "sawtooth";
    lfo.frequency.value = FLOAT_SWEEP_RATE;
    const depth = ctx.createGain();
    depth.gain.value = FLOAT_SWEEP[1];
    lfo.connect(depth).connect(sweep.frequency);
    lfo.start();
    this.floatGain = this.loop(this.noise, [sweep]);
    // Mirage: two close high tones beating (3 per second), like the ringing of the heat in the ears
    this.mirageGain = ctx.createGain();
    this.mirageGain.gain.value = 0;
    this.mirageGain.connect(this.master);
    for (const freq of [2900, 2903, 4350]) {
      const osc = ctx.createOscillator();
      osc.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = freq > 4000 ? 0.25 : 0.5;
      osc.connect(g).connect(this.mirageGain);
      osc.start();
    }
    // Old film projector: a mid whirr chopped by the shutter (square wave on its volume, 18 times per second)
    const shutter = ctx.createGain();
    shutter.gain.value = 0.6;
    const shutterLfo = ctx.createOscillator();
    shutterLfo.type = "square";
    shutterLfo.frequency.value = SHUTTER_RATE;
    const shutterDepth = ctx.createGain();
    shutterDepth.gain.value = 0.4;
    shutterLfo.connect(shutterDepth).connect(shutter.gain);
    shutterLfo.start();
    this.projectorGain = this.loop(this.noise, [
      this.kit!.bandpass(1600, 1.5),
      shutter,
    ]);
    // Earthquake rumble: very deep brown noise
    this.quakeGain = this.loop(this.brownNoise, [this.kit!.lowpass(110)]);
    // Tornado roar: deep rumbling brown noise, brighter when close
    this.roarFilter = this.kit!.lowpass(300);
    this.roarGain = this.loop(this.brownNoise, [this.roarFilter]);
    // Blood moon drone: low sawtooth tones a semitone apart (grating), muffled
    this.bloodDroneGain = ctx.createGain();
    this.bloodDroneGain.gain.value = 0;
    this.bloodDroneFilter = this.kit!.lowpass(220);
    this.bloodDroneFilter.connect(this.bloodDroneGain).connect(this.master);
    for (const [freq, amount] of [
      [41.2, 1],
      [43.65, 0.7],
      [61.7, 0.35],
    ] as const) {
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = amount * 0.35;
      osc.connect(g).connect(this.bloodDroneFilter);
      osc.start();
    }
    // Smog: distant traffic rumble (low brown noise)
    this.trafficFilter = this.kit!.lowpass(280);
    this.trafficGain = this.loop(this.brownNoise, [this.trafficFilter]);
    // Acid rain sizzling: high band of white noise, its level flickering (see updateMagic)
    this.sizzleGain = this.loop(this.noise, [
      this.kit!.highpass(3500),
      this.kit!.lowpass(9000),
    ]);
    // Darkness drone: low tones slightly out of tune (slow beating) + a faint tritone above, all muffled
    this.droneGain = ctx.createGain();
    this.droneGain.gain.value = 0;
    const droneFilter = this.kit!.lowpass(400);
    droneFilter.connect(this.droneGain).connect(this.master);
    for (const [freq, level] of [
      [55, 1],
      [55.6, 0.8],
      [41.2, 0.7],
      [77.8, 0.25],
    ] as const) {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = level * 0.4;
      osc.connect(g).connect(droneFilter);
      osc.start();
    }
    // Forest: rustling leaves (bright band of noise, flickering)
    this.rustleFilter = this.kit!.bandpass(4000, 0.7);
    this.rustleGain = this.loop(this.noise, [
      this.kit!.highpass(1500),
      this.rustleFilter,
    ]);
    // Darkness breathing: low brown noise swelling slowly
    this.breathFilter = this.kit!.lowpass(250);
    this.breathGain = this.loop(this.brownNoise, [this.breathFilter]);

    // Blizzard: narrow resonances on the noise = whistling, howling wind
    for (const v of HOWL_VOICES) {
      const filter = this.kit!.bandpass(v.freq, v.q);
      this.howls.push({ gain: this.loop(this.noise, [filter]), filter });
    }
    // Poison: low bubbling bed (resonant band of brown noise, its pitch wobbling)
    this.swampFilter = this.kit!.bandpass(300, 3);
    this.swampGain = this.loop(this.brownNoise, [this.swampFilter]);

    (Object.keys(STEP_FILES) as SampledSurface[]).forEach((surface) => {
      Promise.all(
        STEP_FILES[surface].map((url) =>
          fetch(url)
            .then((r) => r.arrayBuffer())
            .then((data) => ctx.decodeAudioData(data))
        )
      )
        .then((buffers) => (this.steps[surface] = buffers))
        .catch((err) =>
          console.warn(`Footstep sounds "${surface}" not loaded`, err)
        );
    });
  }

  /** Looping noise source through filters into a gain (starts silent), connected to the master. */
  private loop(
    buffer: AudioBuffer,
    filters: AudioNode[],
    output: AudioNode = this.master!
  ): GainNode {
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
      const drift = (data.at(-1) ?? 0) - data[0];
      for (let i = 0; i < data.length; i++) {
        data[i] -= (drift * i) / (data.length - 1);
      }
    }
    return buffer;
  }
}
