import * as THREE from "three";

/** Dawn and dusk hours: the light goes from night to day (dawn) and back (dusk) between these hours. */
export const DAWN: readonly [number, number] = [6, 8];
export const DUSK: readonly [number, number] = [18, 20];

/** Hour set when choosing a day-only weather at night / a night-only weather by day. */
export const DAY_ONLY_HOUR = 12;
export const NIGHT_ONLY_HOUR = 22;
/** Morning mist: hour it jumps to when chosen while the mist isn't there (no mist out of the early morning). */
export const MORNING_MIST_HOUR = 6;

/**
 * Morning mist strength at an hour, 0..1: builds up in the second half of the night, thick from 3:00 to 7:00,
 * then burns off as the sun climbs, gone at 10:00.
 */
export function mistAt(hour: number): number {
  const h = ((hour % 24) + 24) % 24;
  if (h < 3) {
    return THREE.MathUtils.smoothstep(h, 0, 3);
  }
  if (h < 7) {
    return 1;
  }
  return 1 - THREE.MathUtils.smoothstep(h, 7, 10);
}

/** Daylight at an hour (0..24): 0 = night, 1 = day, in between at dawn / dusk. */
export function daylightAt(hour: number): number {
  const h = ((hour % 24) + 24) % 24;
  if (h < DAWN[0] || h >= DUSK[1]) {
    return 0;
  }
  if (h < DAWN[1]) {
    return THREE.MathUtils.smoothstep(h, DAWN[0], DAWN[1]);
  }
  if (h < DUSK[0]) {
    return 1;
  }
  return 1 - THREE.MathUtils.smoothstep(h, DUSK[0], DUSK[1]);
}

/** Dawn / dusk colors strength at an hour, 0..1 (peaks in the middle of dawn and dusk), and which one. */
export function twilightAt(hour: number): { amount: number; dusk: boolean } {
  const h = ((hour % 24) + 24) % 24;
  const bell = (from: number, to: number) =>
    h > from && h < to ? Math.sin((Math.PI * (h - from)) / (to - from)) : 0;
  const dawn = bell(DAWN[0] - 0.5, DAWN[1] + 0.5);
  const dusk = bell(DUSK[0] - 0.5, DUSK[1] + 0.5);
  return dusk > dawn
    ? { amount: dusk, dusk: true }
    : { amount: dawn, dusk: false };
}

/** Night for the weather choices (night-only / day-only weathers): darker than half daylight. */
export function isNightHour(hour: number): boolean {
  return daylightAt(hour) < 0.5;
}

export type TimeOfDay = "night" | "dawn" | "day" | "dusk";

export function timeOfDayAt(hour: number): TimeOfDay {
  const h = ((hour % 24) + 24) % 24;
  if (h >= DAWN[0] && h < DAWN[1]) {
    return "dawn";
  }
  if (h >= DUSK[0] && h < DUSK[1]) {
    return "dusk";
  }
  return h >= DAWN[1] && h < DUSK[0] ? "day" : "night";
}

export const TIME_OF_DAY_LABELS: Record<TimeOfDay, { label: string }> = {
  night: { label: "Nuit" },
  dawn: { label: "Aube" },
  day: { label: "Jour" },
  dusk: { label: "Crépuscule" },
};

/** "07:30" */
export function formatHour(hour: number): string {
  const minutes = Math.round((((hour % 24) + 24) % 24) * 60) % (24 * 60);
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

/** Light colors of the dawn (pink, peach) and the dusk (orange, purple shadows), mixed into the weather colors. */
export interface TwilightTint {
  sunColor: THREE.Color;
  ambientColor: THREE.Color;
  unlitTint: THREE.Color;
  fogColor: THREE.Color;
}

export const DAWN_TINT: TwilightTint = {
  sunColor: new THREE.Color(0xff_a0_70),
  ambientColor: new THREE.Color(0xe0_b0_c0),
  unlitTint: new THREE.Color(0xff_c8_b8),
  fogColor: new THREE.Color(0xff_c0_b0),
};

export const DUSK_TINT: TwilightTint = {
  sunColor: new THREE.Color(0xff_7a_28),
  ambientColor: new THREE.Color(0xd0_90_7a),
  unlitTint: new THREE.Color(0xff_b8_90),
  fogColor: new THREE.Color(0xf0_a0_70),
};
