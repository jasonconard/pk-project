import { loadVariables, VARIABLES_KEY } from "./variable-storage";
import { GameVariable } from "./variables";
import {
  cachedFromStorage,
  readJson,
  writeJson,
} from "../../../core/shared/local-store";

/**
 * The variables' values in the game being played (the variables editor gives their value at the start). Kept in the
 * browser so they survive a reload; a saved game keeps a copy (game-saves.ts). A variable with no value yet (created
 * after the game started) has its starting value.
 */
const STORAGE_KEY = "pk-variable-values";

export type VariableValue = boolean | number;
export type VariableValues = Record<string, VariableValue>;

function readValues(): VariableValues {
  const values = readJson<VariableValues>(STORAGE_KEY);
  return values && typeof values === "object" ? values : {};
}

function writeValues(values: VariableValues): void {
  // (no room: the values live until the page closes)
  writeJson(STORAGE_KEY, values);
}

/** The value of a variable now: the game's if it has the right type, else the starting value. */
function valueOf(
  variable: GameVariable,
  values: VariableValues
): VariableValue {
  const value = values[variable.id];
  if (variable.kind === "flag") {
    return typeof value === "boolean" ? value : variable.initial;
  }
  return typeof value === "number" ? value : variable.initial;
}

/** Every variable of the game with its value now (id → value). Don't change the object returned. */
export const currentVariableValues = cachedFromStorage(
  [STORAGE_KEY, VARIABLES_KEY],
  (): VariableValues => {
    const values = readValues();
    return Object.fromEntries(
      loadVariables().map((v) => [v.id, valueOf(v, values)])
    );
  }
);

/** A saved game's values replace the current ones (the variables it doesn't know get their starting value). */
export function restoreVariableValues(values: VariableValues): void {
  writeValues({ ...values });
}

/** Changes one variable's value now (the variables test panel; the events, later). */
export function setVariableValue(id: string, value: VariableValue): void {
  writeValues({ ...readValues(), [id]: value });
}

/** Every variable back to its starting value (a new game). */
export function resetVariableValues(): void {
  writeValues({});
}
