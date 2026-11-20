/** Two names are the same one when this is equal: spaces around and capitals don't count. */
export function nameKey(name: string): string {
  return name.trim().toLocaleLowerCase("fr-FR");
}

/** What a search compares: like nameKey, and the accents don't count either (« ete » finds « Été »). */
export function searchKey(text: string): string {
  return nameKey(text).normalize("NFD").replaceAll(/\p{M}/gu, "");
}
