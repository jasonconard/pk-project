// The weather sounds' levels, rates and intervals (before the master volume): the mixing desk.

export const rand = (min: number, max: number) =>
  min + Math.random() * (max - min);

export const RAIN_GAIN = 0.2;
/** The rain gets quieter while it thunders (share of its volume at the loudest of the thunder). */
export const THUNDER_DUCKING = 0.45;
export const DRIZZLE_GAIN = 0.16;
export const WIND_GAIN = 0.22;
export const SAND_GAIN = 0.12;
export const THUNDER_GAIN = 1.3;
export const THUNDER_CRACK_GAIN = 0.8;
/** Wet layer: splash noise in a puddle, and the water drop "plinks" (lighter on wet ground). */
export const SPLASH_GAIN = 0.22;
/** Volcanic: deep rumble loudness, crackles per second and their loudness. */
export const RUMBLE_GAIN = 0.5;
export const CRACKLE_RATE = 7;
export const CRACKLE_GAIN = 0.16;
/** Poison: bubble bursts per second, bubble loudness, low bubbling bed loudness. */
export const BUBBLE_RATE = 3.5;
export const BUBBLE_GAIN = 0.28;
export const SWAMP_GAIN = 0.12;
/** Blizzard howl: loudness, and the whistles (base pitch Hz, how far they glide, resonance sharpness). */
export const HOWL_GAIN = 0.8;
/** Darkness: drone, breathing and distant sounds loudness; seconds between two distant sounds. */
/** Electric arcs: zap loudness, buzzing hum loudness (follows the nearby activity), max zaps per second. */
export const ZAP_GAIN = 0.3;
export const HUM_GAIN = 0.1;
export const MAX_ZAPS_PER_SECOND = 14;
/** Hail: ticks per second at hail = 1 and their loudness. */
export const HAIL_TICKS = 14;
export const HAIL_GAIN = 0.13;
/** Sea: waves loudness (a slow swell every WAVE_PERIOD s), gulls loudness and seconds between two. */
export const WAVE_GAIN = 0.3;
export const WAVE_PERIOD = 8;
export const GULL_GAIN = 0.1;
export const GULL_INTERVAL = [4, 12] as const;
/** Chimes per second (at 1) and loudness; radio static loudness; seconds between whispers. */
export const CHIME_RATE = 1.6;
export const CHIME_GAIN = 0.07;
export const CHIME_NOTES = [
  1047, 1175, 1319, 1568, 1760, 2093, 2349, 2637, 3136,
];
export const STATIC_GAIN = 0.12;
export const WHISPER_INTERVAL = [4, 10] as const;
/** Ice cracks per second at 1, moan loudness / seconds between two, tornado roar loudness. */
export const CRACK_RATE = 2.5;
/** Ash fall: crackles per second and their loudness (share of the volcanic crackles). */
export const ASH_CRACKLE_RATE = 3;
export const ASH_CRACKLE_LEVEL = 0.45;
/** Petal whirlwind: swirling wind loudness at the closest. */
export const WHIRL_GAIN = 0.35;
export const CRACK_GAIN = 0.12;
export const MOAN_GAIN = 0.16;
export const MOAN_INTERVAL = [5, 12] as const;
export const ROAR_GAIN = 0.7;
/** Earthquake: rumble loudness and rattles per second at full strength. */
export const QUAKE_GAIN = 0.8;
/** Geysers: steam hiss loudness, eruption burst loudness. */
export const STEAM_GAIN = 0.3;
/** Time warp: slowed clock tick loudness and period (s), drone loudness. */
export const TICK_GAIN = 0.25;
/** Inverted world: backwards sounds loudness and seconds between two. */
export const REVERSE_GAIN = 0.18;
export const REVERSE_INTERVAL = [2, 5] as const;
export const TICK_PERIOD = 1.6;
export const WARP_DRONE_GAIN = 0.12;
/** Reversed gravity: rising whoosh loudness, sweeps per second, and its filter sweep (Hz, center ± depth). */
export const FLOAT_GAIN = 0.1;
/** Old film: projector whirr loudness, shutter rate (Hz), crackles per second and their loudness. */
export const PROJECTOR_GAIN = 0.07;
/** Moonless night: loudness of something running away in the dark. */
export const SCURRY_GAIN = 0.12;
/** Deep freeze: ice cracks per second and their loudness. */
export const ICE_CRACK_RATE = 0.3;
export const ICE_CRACK_GAIN = 0.1;
/** Mirage: loudness of the high shimmering tone. */
export const MIRAGE_GAIN = 0.018;
export const SHUTTER_RATE = 18;
export const FILM_CRACKLE_RATE = 7;
export const FILM_CRACKLE_GAIN = 0.12;
export const FLOAT_SWEEP_RATE = 0.22;
export const FLOAT_SWEEP = [1300, 900] as const;
export const GEYSER_BURST_GAIN = 0.5;
export const RATTLE_RATE = 18;
/** Blood moon: drone loudness, seconds between two heartbeat bouts / two howls, howl loudness. */
export const BLOOD_DRONE_GAIN = 0.2;
export const BLOOD_HEART_INTERVAL = [9, 18] as const;
export const BLOOD_HOWL_INTERVAL = [14, 28] as const;
export const HOWL_CALL_GAIN = 0.1;
/** Frogs: croak loudness, seconds between two croaks of a frog. */
export const FROG_GAIN = 0.09;
export const FROG_INTERVAL = [0.8, 3.5] as const;
/** Distant city: traffic rumble loudness, seconds between two horns, chance that the event is a siren. */
export const TRAFFIC_GAIN = 0.16;
export const HORN_GAIN = 0.05;
export const HORN_INTERVAL = [4, 11] as const;
export const SIREN_CHANCE = 0.15;
/** Fireworks: whistle and bang loudness. */
export const ROCKET_GAIN = 0.035;
export const BANG_GAIN = 0.55;
/** Acid rain: sizzling loudness. */
export const SIZZLE_GAIN = 0.09;
export const DRONE_GAIN = 0.22;
export const BREATH_GAIN = 0.16;
export const DREAD_GAIN = 0.35;
export const DREAD_INTERVAL = [6, 16] as const;
/** Forest: leaves rustle loudness, birds / owl loudness and seconds between two songs, crickets loudness. */
export const RUSTLE_GAIN = 0.14;
export const BIRD_GAIN = 0.12;
export const BIRD_INTERVAL = [0.8, 4] as const;
export const CRICKET_GAIN = 0.035;
export const OWL_GAIN = 0.2;
export const OWL_INTERVAL = [12, 28] as const;
export const HOWL_VOICES = [
  { freq: 520, glide: 0.35, q: 18, speed: 0.23 },
  { freq: 780, glide: 0.3, q: 22, speed: 0.31 },
  { freq: 340, glide: 0.25, q: 12, speed: 0.17 },
] as const;
export const PLINK_GAIN = 0.12;
export const WET_GROUND_LAYER = 0.35;
/** How fast the ambiences follow the weather (s, time constant). */
export const AMBIENCE_SMOOTHING = 0.4;
