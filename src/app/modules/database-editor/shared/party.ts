import { loadDatabase } from "./database-storage";
import { characterStats, DbCharacter, statAt } from "./database";
import {
  cachedFromStorage,
  readJson,
  writeJson,
} from "../../../core/shared/local-store";

/**
 * The team in the game being played: who is in it, the items carried and the money. Kept in the browser so it
 * survives a reload, like the variables' values; a saved game keeps a copy (game-saves.ts). Changed by the events
 * (give an item, money, a character joins…) and read by their conditions. A new game starts with the characters
 * marked « Dans l'équipe au début », no item and no money.
 */
export const PARTY_KEY = "pk-party";
export const MONEY_MAX = 9_999_999;
export const ITEM_COUNT_MAX = 99;

/**
 * A team member's progress in the game being played (from the fights): its level and experience, its PV / PM and the
 * states it keeps between fights, its level and points in each element and weapon type. Missing: as in the database
 * (its starting level, full PV / PM).
 */
export interface MemberProgress {
  level: number;
  xp: number;
  hp: number;
  mp: number;
  states: string[];
  growth: Record<string, { level: number; points: number }>;
}

export interface PartyState {
  /** Character ids, in order. */
  team: string[];
  /** Character id → its progress (once it has fought). */
  members?: Record<string, MemberProgress>;
  /** Item id → how many. */
  items: Record<string, number>;
  money: number;
  /** Social links: character or NPC id → its points (see linkLevelOf). */
  links?: Record<string, number>;
  /** NPC id → the day (game date) it was last given a gift (one a day). */
  gifts?: Record<string, number>;
}

/** The team when a new game starts. */
export function startParty(): PartyState {
  return {
    team: loadDatabase()
      .characters.filter((c) => c.startsInTeam)
      .map((c) => c.id),
    items: {},
    money: 0,
  };
}

function readParty(): PartyState | null {
  const party = readJson<PartyState>(PARTY_KEY);
  return party &&
    Array.isArray(party.team) &&
    party.items &&
    typeof party.money === "number"
    ? party
    : null;
}

function writeParty(party: PartyState): void {
  // (no room: the team lives until the page closes)
  writeJson(PARTY_KEY, party);
}

/** The team now. Don't change the object returned. */
export const currentParty = cachedFromStorage(
  [PARTY_KEY],
  (): PartyState => readParty() ?? startParty()
);

/** Items given (amount > 0) or taken (< 0, never below 0). */
export function giveItem(id: string, amount: number): void {
  const party = structuredClone(currentParty());
  const count = Math.min(
    ITEM_COUNT_MAX,
    Math.max(0, (party.items[id] ?? 0) + amount)
  );
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

/** A link's points (0: not met). */
export function linkPoints(id: string): number {
  return currentParty().links?.[id] ?? 0;
}

/** Points added to a link (never below 0). */
export function addLinkPoints(id: string, points: number): void {
  const party = structuredClone(currentParty());
  party.links = {
    ...party.links,
    [id]: Math.max(0, (party.links?.[id] ?? 0) + points),
  };
  writeParty(party);
}

/** The day an NPC was last given a gift (undefined: never). */
export function lastGiftDay(id: string): number | undefined {
  return currentParty().gifts?.[id];
}

export function markGift(id: string, day: number): void {
  const party = structuredClone(currentParty());
  party.gifts = { ...party.gifts, [id]: day };
  writeParty(party);
}

/** A character joins the team (at the end) or leaves it. */
export function setInTeam(id: string, inTeam: boolean): void {
  const party = structuredClone(currentParty());
  party.team = party.team.filter((c) => c !== id);
  if (inTeam) {
    party.team.push(id);
  }
  writeParty(party);
}

/** A member's progress (its starting one when it has not fought yet). */
export function memberProgress(c: DbCharacter): MemberProgress {
  const saved = currentParty().members?.[c.id];
  if (saved) {
    return structuredClone(saved);
  }
  return {
    level: c.levelStart,
    xp: 0,
    hp: statAt(c, "hp", c.levelStart),
    mp: statAt(c, "mp", c.levelStart),
    states: [],
    growth: Object.fromEntries(
      Object.entries(c.growth).map(([id, g]) => [
        id,
        { level: g.level, points: 0 },
      ])
    ),
  };
}

/** Members' progress after a fight. */
export function saveProgress(progress: Record<string, MemberProgress>): void {
  const party = structuredClone(currentParty());
  party.members = { ...party.members, ...progress };
  writeParty(party);
}

/** The team healed (an inn, a fountain…): every member's PV and PM full, its states gone. */
export function healTeam(): void {
  const db = loadDatabase();
  const healed: Record<string, MemberProgress> = {};
  for (const id of currentParty().team) {
    const c = db.characters.find((x) => x.id === id);
    if (!c) {
      continue;
    }
    const p = memberProgress(c);
    const stats = characterStats(c, p.level, db);
    healed[id] = { ...p, hp: stats.hp, mp: stats.mp, states: [] };
  }
  saveProgress(healed);
}

/** A saved game's team replaces the current one. */
export function restoreParty(party: PartyState | undefined): void {
  writeParty(
    party && Array.isArray(party.team) ? structuredClone(party) : startParty()
  );
}

/** Back to a new game's team. */
export function resetParty(): void {
  writeParty(startParty());
}
