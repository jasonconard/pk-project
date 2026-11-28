/**
 * The browser's storage (localStorage), never throwing: private browsing, a full or blocked storage make a read
 * give nothing and a write give false (what was changed then lives until the page closes).
 */

export function readText(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** False if the browser refused (no room, blocked). */
export function writeText(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function removeKey(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // Nothing to forget
  }
}

/** Empties the whole storage (« Tout remettre à zéro »). Returns false if it failed. */
export function clearStore(): boolean {
  try {
    localStorage.clear();
    return true;
  } catch {
    return false;
  }
}

/** The JSON value saved under the key, null if there is none or it can't be read. */
export function readJson<T>(key: string): T | null {
  const raw = readText(key);
  if (raw === null) {
    return null;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/** False if the browser refused (no room, blocked). */
export function writeJson(key: string, value: unknown): boolean {
  return writeText(key, JSON.stringify(value));
}

/**
 * A value worked out from what is saved under these keys, worked out again only when their text changes (for what
 * the game asks many times a second: the variables' values, the team). Without storage: worked out every time.
 */
export function cachedFromStorage<T>(
  keys: string[],
  compute: () => T
): () => T {
  let cache: { raw: string; value: T } | null = null;
  return () => {
    let raw: string;
    try {
      raw = keys.map((key) => localStorage.getItem(key)).join("\u0000");
    } catch {
      return compute();
    }
    if (cache?.raw !== raw) {
      cache = { raw, value: compute() };
    }
    return cache.value;
  };
}
