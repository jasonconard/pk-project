/** Last version of the game started on this device: the "what's new" dialog opens once after an update. */
const LAST_SEEN_KEY = "pk-last-seen-version";

/**
 * True the first time a new version starts on this device (then remembered: once per version).
 * Not for a new player (nothing to compare with): a device without the key but with the game's other saved data
 * (`pk-…`) had an older version, from before this dialog existed.
 */
export function isFirstStartOfNewVersion(current: string): boolean {
  try {
    const seen = localStorage.getItem(LAST_SEEN_KEY);
    localStorage.setItem(LAST_SEEN_KEY, current);
    if (seen !== null) {
      return seen !== current;
    }
    return Object.keys(localStorage).some(
      (key) => key.startsWith("pk-") && key !== LAST_SEEN_KEY
    );
  } catch {
    return false; // private browsing: no dialog
  }
}
