import { signal } from "@angular/core";
import { readText, writeText } from "../../../../core/shared/local-store";

/** Saved choice (per device): play the sound even when the phone / tablet is in silent mode. */
const STORAGE_KEY = "pk-ignore-silent-mode";

interface AudioSessionNavigator {
  audioSession?: { type: string };
}

const session = () =>
  (navigator as Navigator & AudioSessionNavigator).audioSession;

/**
 * Safari (iPhone, iPad) mutes web pages in silent mode: their sound is "ambient" by default. Declared as
 * "playback" (Audio Session API, Safari 16.4+), the game is heard like a music or video app, silent mode or not.
 * Only offered where the API exists (other browsers don't mute pages in silent mode).
 */
export const SILENT_MODE_BYPASS_SUPPORTED =
  typeof navigator !== "undefined" && !!session();

function load(): boolean {
  return readText(STORAGE_KEY) === "1";
}

export const ignoreSilentMode = signal(SILENT_MODE_BYPASS_SUPPORTED && load());

/** Applies the saved choice (at launch) or a new one. */
export function applySilentMode(ignore = ignoreSilentMode()) {
  ignoreSilentMode.set(ignore);
  const audioSession = session();
  if (!audioSession) {
    return;
  }
  audioSession.type = ignore ? "playback" : "auto";
  // (private browsing: applied, not remembered)
  writeText(STORAGE_KEY, ignore ? "1" : "0");
}
