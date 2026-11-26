import {
  cachedFromStorage,
  readJson,
  writeJson,
} from "../../../../core/shared/local-store";

/**
 * The cutscenes « Une seule fois » already seen in the game being played (`<map>/<cutscene>`), kept in the browser
 * and in a saved game.
 */
export const CUTSCENES_SEEN_KEY = "pk-cutscenes-seen";

export const seenCutscenes = cachedFromStorage(
  [CUTSCENES_SEEN_KEY],
  (): string[] => {
    const seen = readJson<unknown>(CUTSCENES_SEEN_KEY);
    return Array.isArray(seen)
      ? seen.filter((s): s is string => typeof s === "string")
      : [];
  }
);

export function cutsceneKey(mapId: string, cutsceneId: string): string {
  return `${mapId}/${cutsceneId}`;
}

export function markCutsceneSeen(key: string): void {
  if (!seenCutscenes().includes(key)) {
    writeJson(CUTSCENES_SEEN_KEY, [...seenCutscenes(), key]);
  }
}

/** A saved game's cutscenes seen put back (null: a new game). */
export function restoreCutscenesSeen(seen: string[] | null | undefined): void {
  writeJson(CUTSCENES_SEEN_KEY, Array.isArray(seen) ? seen : []);
}
