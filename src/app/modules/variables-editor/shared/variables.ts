/**
 * The game's variables: what the story remembers. A flag is yes / no (« a parlé au maire »), a counter a whole
 * number (« pièces trouvées »). Events and dialogues (to come, docs/idees.md) will read and change them; a saved
 * game will keep their values. The id never changes (what refers to a variable keeps working when it is renamed).
 */
export type GameVariable = {
  id: string;
  /** Shown in the editors, in French (« A parlé au maire »). */
  name: string;
  /** What it is for, optional. */
  note?: string;
} & ({ kind: 'flag', initial: boolean } | { kind: 'counter', initial: number });

export type VariableKind = GameVariable['kind'];

export const COUNTER_MIN = -9999;
export const COUNTER_MAX = 9999;

export function newVariable(kind: VariableKind, name: string): GameVariable {
  const id = `v-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  return kind === 'flag' ? { id, name, kind, initial: false } : { id, name, kind, initial: 0 };
}

export function clampCounter(value: number): number {
  return Math.min(COUNTER_MAX, Math.max(COUNTER_MIN, Math.round(Number.isFinite(value) ? value : 0)));
}
