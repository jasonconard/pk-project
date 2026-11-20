import { loadVariables, VARIABLES_KEY } from './variable-storage';
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

/** Last answer of currentVariableValues, with what it was read from (the game asks many times a second). */
let cache: { raw: string, values: VariableValues } | null = null;

/** Every variable of the game with its value now (id → value). Don't change the object returned. */
export function currentVariableValues(): VariableValues {
  let raw = '';
  try {
    raw = `${localStorage.getItem(STORAGE_KEY)}|${localStorage.getItem(VARIABLES_KEY)}`;
  } catch {
    // (no storage: read every time)
  }
  if (cache && raw && cache.raw === raw) {
    return cache.values;
  }
  const values = readValues();
  const current = Object.fromEntries(loadVariables().map(v => [v.id, valueOf(v, values)]));
  cache = { raw, values: current };
  return current;
}

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
