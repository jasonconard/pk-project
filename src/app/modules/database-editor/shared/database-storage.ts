import { CODE_DATABASE } from '../../../../assets/database/database';
import { GameDatabase } from './database';

/** Where the database editor keeps the database in the browser: { database }. */
export const DATABASE_KEY = 'pk-database';

export interface StoredDatabase {
  database: GameDatabase;
}

/** Every table there (a table added by a later version is taken from the code). */
function complete(database: Partial<GameDatabase>): GameDatabase {
  const code = structuredClone(CODE_DATABASE);
  return {
    elements: Array.isArray(database.elements) ? database.elements : code.elements,
    weapons: Array.isArray(database.weapons) ? database.weapons : code.weapons,
    states: Array.isArray(database.states) ? database.states : code.states,
    skills: Array.isArray(database.skills) ? database.skills : code.skills,
  };
}

function readStored(): StoredDatabase | null {
  try {
    const raw = localStorage.getItem(DATABASE_KEY);
    const stored = raw ? JSON.parse(raw) as StoredDatabase : null;
    return stored?.database && typeof stored.database === 'object' ? stored : null;
  } catch {
    return null; // unreadable
  }
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
  try {
    localStorage.setItem(DATABASE_KEY, JSON.stringify({ database } satisfies StoredDatabase));
    return true;
  } catch {
    return false;
  }
}

/** Replaces the database saved in the browser (project file import); null forgets it (the code's comes back). */
export function replaceStoredDatabase(stored: StoredDatabase | null | undefined): void {
  if (stored?.database && typeof stored.database === 'object') {
    saveDatabase(complete(stored.database));
  } else {
    try {
      localStorage.removeItem(DATABASE_KEY);
    } catch {
      // Nothing to forget
    }
  }
}
