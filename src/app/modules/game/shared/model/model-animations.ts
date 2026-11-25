import {
  cachedFromStorage,
  readJson,
  writeJson,
} from "../../../../core/shared/local-store";
import { MotionDrive } from "./model-motion";

/**
 * What the events asked of the objects' movements « Par un événement » (action Animer l'objet), kept in the browser
 * and in a saved game: `<map>/<object>` → play, loop, rest (back), hold (stopped). Missing: at rest.
 */
export const ANIMATIONS_KEY = "pk-animations";

export type AnimationStates = Record<string, MotionDrive>;

export const currentAnimations = cachedFromStorage(
  [ANIMATIONS_KEY],
  (): AnimationStates => readJson<AnimationStates>(ANIMATIONS_KEY) ?? {}
);

export function animationKey(mapId: string, objectId: string): string {
  return `${mapId}/${objectId}`;
}

export function setAnimation(key: string, drive: MotionDrive): void {
  const states = { ...currentAnimations() };
  if (drive === "rest") {
    delete states[key];
  } else {
    states[key] = drive;
  }
  writeJson(ANIMATIONS_KEY, states);
}

/** A saved game's movements put back (null: a new game). */
export function restoreAnimations(states: AnimationStates | null | undefined) {
  writeJson(ANIMATIONS_KEY, states && typeof states === "object" ? states : {});
}
