/**
 * Whether the app is in the background: tab hidden, app sent to the background (home screen, other app),
 * screen locked. The game and the sounds pause meanwhile.
 *
 * The Android app also gets `pause` / `resume` events: listened to as well, in case the page is not told that
 * it is hidden.
 */
let hidden = document.hidden;
const listeners = new Set<(hidden: boolean) => void>();

function setHidden(value: boolean) {
  if (value !== hidden) {
    hidden = value;
    listeners.forEach((listener) => listener(value));
  }
}

document.addEventListener("visibilitychange", () => setHidden(document.hidden));
for (const target of [document, window]) {
  target.addEventListener("pause", () => setHidden(true));
  target.addEventListener("resume", () => setHidden(document.hidden));
}

export function isAppHidden(): boolean {
  return hidden;
}

/** Called when the app goes to the background (true) or comes back (false). Returns the function to stop listening. */
export function onAppVisibility(
  listener: (hidden: boolean) => void
): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * The game asleep: the app in the background, or the game covered by a full screen editor (music, models) opened
 * over it. The game's loops, its sounds and its music stop meanwhile; the editor itself keeps going (it listens to
 * onAppVisibility only).
 */
let covered = false;
const asleepListeners = new Set<(asleep: boolean) => void>();
let wasAsleep = hidden;

function notifyAsleep() {
  const asleep = hidden || covered;
  if (asleep !== wasAsleep) {
    wasAsleep = asleep;
    asleepListeners.forEach((listener) => listener(asleep));
  }
}

listeners.add(notifyAsleep);

/** A full screen editor covers the game (true) or is closed (false). */
export function setGameCovered(value: boolean): void {
  covered = value;
  notifyAsleep();
}

export function isGameCovered(): boolean {
  return covered;
}

export function isGameAsleep(): boolean {
  return hidden || covered;
}

/** Called when the game falls asleep (true) or wakes up (false). Returns the function to stop listening. */
export function onGameAsleep(listener: (asleep: boolean) => void): () => void {
  asleepListeners.add(listener);
  return () => asleepListeners.delete(listener);
}
