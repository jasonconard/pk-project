import { CODE_DATABASE } from "../../../../assets/database/database";
import { DbCharacter, DbNpc, DbTable, GameDatabase } from "./database";
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
  return withVillagersAsNpcs(
    Object.fromEntries(
      tables.map((t) => [t, Array.isArray(database[t]) ? database[t] : code[t]])
    ) as unknown as GameDatabase
  );
}

/** A character of the first versions: `team` false was a villager. */
type OldCharacter = DbCharacter & { team?: boolean };

/** The villagers of the first versions (characters out of the team) become NPCs, with their name and pictures. */
function withVillagersAsNpcs(db: GameDatabase): GameDatabase {
  const characters = db.characters as OldCharacter[];
  if (!characters.some((c) => "team" in c)) {
    return db;
  }
  const villagers: DbNpc[] = characters
    .filter((c) => c.team === false)
    .map(({ id, name, note, icon, portrait }) => ({
      id,
      name,
      ...(note ? { note } : {}),
      ...(icon ? { icon } : {}),
      ...(portrait ? { portrait } : {}),
    }));
  return {
    ...db,
    characters: characters
      .filter((c) => c.team !== false)
      .map((c) => {
        const character: OldCharacter = { ...c };
        delete character.team;
        return character;
      }),
    npcs: [...db.npcs, ...villagers],
  };
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
