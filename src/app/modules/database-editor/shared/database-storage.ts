import { CODE_DATABASE } from "../../../../assets/database/database";
import { DbTable, GameDatabase } from "./database";
import {
  readJson,
  removeKey,
  writeJson,
} from "../../../core/shared/local-store";

/** Where the database editor keeps the database in the browser: { database }. */
export const DATABASE_KEY = "pk-database";

export interface StoredDatabase {
  database: GameDatabase;
}

/** Every table there (a table added by a later version is taken from the code). */
function complete(database: Partial<GameDatabase>): GameDatabase {
  const code = structuredClone(CODE_DATABASE);
  const tables = Object.keys(code) as DbTable[];
  return Object.fromEntries(
    tables.map((t) => [t, Array.isArray(database[t]) ? database[t] : code[t]])
  ) as unknown as GameDatabase;
}

function readStored(): StoredDatabase | null {
  const stored = readJson<StoredDatabase>(DATABASE_KEY);
  return stored?.database && typeof stored.database === "object"
    ? stored
    : null;
}

/** The database saved in the browser, null if none (for the project file). */
export function storedDatabaseData(): StoredDatabase | null {
  return readStored();
}

/** The game's database: the browser's, else the code's. */
export function loadDatabase(): GameDatabase {
  const stored = readStored();
  return stored ? complete(stored.database) : structuredClone(CODE_DATABASE);
}

/** False if the browser refused (no room). */
export function saveDatabase(database: GameDatabase): boolean {
  return writeJson(DATABASE_KEY, { database } satisfies StoredDatabase);
}

/** Replaces the database saved in the browser (project file import); null forgets it (the code's comes back). */
export function replaceStoredDatabase(
  stored: StoredDatabase | null | undefined
): void {
  if (stored?.database && typeof stored.database === "object") {
    saveDatabase(complete(stored.database));
  } else {
    removeKey(DATABASE_KEY);
  }
}
