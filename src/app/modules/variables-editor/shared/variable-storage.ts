import { CODE_VARIABLES } from "../../../../assets/variables/variables";
import { GameVariable } from "./variables";
import {
  readJson,
  removeKey,
  writeJson,
} from "../../../core/shared/local-store";

/** The variables, saved in the browser: { variables }. */
/** Where the variables editor keeps the variables in the browser. */
export const VARIABLES_KEY = "pk-variables";
const STORAGE_KEY = VARIABLES_KEY;

export interface StoredVariables {
  variables: GameVariable[];
}

function readStored(): StoredVariables | null {
  const stored = readJson<StoredVariables>(STORAGE_KEY);
  return Array.isArray(stored?.variables) ? stored : null;
}

/** The variables saved in the browser, null if none (for the project file). */
export function storedVariablesData(): StoredVariables | null {
  return readStored();
}

/** The game's variables: the browser's, else the code's. */
export function loadVariables(): GameVariable[] {
  return readStored()?.variables ?? structuredClone(CODE_VARIABLES);
}

/** False if the browser refused (no room). */
export function saveVariables(variables: GameVariable[]): boolean {
  return writeJson(STORAGE_KEY, { variables } satisfies StoredVariables);
}

/** Replaces the variables saved in the browser (project file import); null forgets them (the code's come back). */
export function replaceStoredVariables(
  stored: StoredVariables | null | undefined
): void {
  if (stored && Array.isArray(stored.variables)) {
    saveVariables(stored.variables);
  } else {
    removeKey(STORAGE_KEY);
  }
}
