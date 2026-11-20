/** A copy of the object without these keys (instead of `const { key: _, ...rest } = obj`). */
export function omit<T extends object, K extends keyof T>(
  object: T,
  ...keys: K[]
): Omit<T, K> {
  const copy = { ...object };
  for (const key of keys) {
    delete copy[key];
  }
  return copy;
}
