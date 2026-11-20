import { loadDatabase } from './database-storage';

/**
 * The team in the game being played: who is in it, the items carried and the money. Kept in the browser so it
 * survives a reload, like the variables' values; a saved game keeps a copy (game-saves.ts). Changed by the events
 * (give an item, money, a character joins…) and read by their conditions. A new game starts with the characters
 * marked « Dans l'équipe au début », no item and no money.
 */
const STORAGE_KEY = 'pk-party';
export const MONEY_MAX = 9999999;
export const ITEM_COUNT_MAX = 99;

export interface PartyState {
  /** Character ids, in order. */
  team: string[];
  /** Item id → how many. */
  items: Record<string, number>;
  money: number;
}

/** The team when a new game starts. */
export function startParty(): PartyState {
  return { team: loadDatabase().characters.filter(c => c.team && c.startsInTeam).map(c => c.id), items: {}, money: 0 };
}

function readParty(): PartyState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const party = raw ? JSON.parse(raw) as PartyState : null;
    return party && Array.isArray(party.team) && party.items && typeof party.money === 'number' ? party : null;
  } catch {
    return null;
  }
}

function writeParty(party: PartyState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(party));
  } catch {
    // No room: the team lives until the page closes
  }
  cache = null;
}

/** Last answer of currentParty, with what it was read from (the conditions ask many times a second). */
let cache: { raw: string, party: PartyState } | null = null;

/** The team now. Don't change the object returned. */
export function currentParty(): PartyState {
  let raw = '';
  try {
    raw = localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    // (no storage: read every time)
  }
  if (cache && raw && cache.raw === raw) {
    return cache.party;
  }
  const party = readParty() ?? startParty();
  cache = raw ? { raw, party } : null;
  return party;
}

/** Items given (amount > 0) or taken (< 0, never below 0). */
export function giveItem(id: string, amount: number): void {
  const party = structuredClone(currentParty());
  const count = Math.min(ITEM_COUNT_MAX, Math.max(0, (party.items[id] ?? 0) + amount));
  if (count) {
    party.items[id] = count;
  } else {
    delete party.items[id];
  }
  writeParty(party);
}

export function giveMoney(amount: number): void {
  const party = structuredClone(currentParty());
  party.money = Math.min(MONEY_MAX, Math.max(0, party.money + amount));
  writeParty(party);
}

/** A character joins the team (at the end) or leaves it. */
export function setInTeam(id: string, inTeam: boolean): void {
  const party = structuredClone(currentParty());
  party.team = party.team.filter(c => c !== id);
  if (inTeam) {
    party.team.push(id);
  }
  writeParty(party);
}

/** A saved game's team replaces the current one. */
export function restoreParty(party: PartyState | undefined): void {
  writeParty(party && Array.isArray(party.team) ? structuredClone(party) : startParty());
}

/** Back to a new game's team. */
export function resetParty(): void {
  writeParty(startParty());
}
