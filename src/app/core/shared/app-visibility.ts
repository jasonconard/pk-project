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
    listeners.forEach(listener => listener(value));
  }
}

document.addEventListener('visibilitychange', () => setHidden(document.hidden));
for (const target of [document, window]) {
  target.addEventListener('pause', () => setHidden(true));
  target.addEventListener('resume', () => setHidden(document.hidden));
}

export function isAppHidden(): boolean {
  return hidden;
}

/** Called when the app goes to the background (true) or comes back (false). Returns the function to stop listening. */
export function onAppVisibility(listener: (hidden: boolean) => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
