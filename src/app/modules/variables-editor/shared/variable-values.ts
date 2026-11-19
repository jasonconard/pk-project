import { loadVariables } from './variable-storage';
import { GameVariable } from './variables';

/**
 * The variables' values in the game being played (the variables editor gives their value at the start). Kept in the
 * browser so they survive a reload; a saved game keeps a copy (game-saves.ts). A variable with no value yet (created
 * after the game started) has its starting value.
 */
const STORAGE_KEY = 'pk-variable-values';

export type VariableValue = boolean | number;
export type VariableValues = Record<string, VariableValue>;

function readValues(): VariableValues {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const values = raw ? JSON.parse(raw) : null;
    return values && typeof values === 'object' ? values : {};
  } catch {
    return {};
  }
}

function writeValues(values: VariableValues): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  } catch {
    // No room: the values live until the page closes
  }
}

/** The value of a variable now: the game's if it has the right type, else the starting value. */
function valueOf(variable: GameVariable, values: VariableValues): VariableValue {
  const value = values[variable.id];
  return variable.kind === 'flag'
    ? (typeof value === 'boolean' ? value : variable.initial)
    : (typeof value === 'number' ? value : variable.initial);
}

/** Every variable of the game with its value now (id → value). */
export function currentVariableValues(): VariableValues {
  const values = readValues();
  return Object.fromEntries(loadVariables().map(v => [v.id, valueOf(v, values)]));
}

/** A saved game's values replace the current ones (the variables it doesn't know get their starting value). */
export function restoreVariableValues(values: VariableValues): void {
  writeValues({ ...values });
}
