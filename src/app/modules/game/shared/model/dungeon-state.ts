import {
  cachedFromStorage,
  readJson,
  writeJson,
} from "../../../../core/shared/local-store";
import { currentVariableValues } from "../../../variables-editor/shared/variable-values";
import { PartyState } from "../../../database-editor/shared/party";
import { SceneBuilding } from "./SceneBuilding";
import { Vec3 } from "./SceneUtils";
import { dungeonKindOf } from "./dungeon-object";

/**
 * The dungeons in the game being played (kept in the browser like the team, copied in a saved game): the chests
 * opened and the doors unlocked on the maps made by hand, and the dungeon the team is in (its floor, the rooms of a
 * generated floor and what was put in them).
 */
export const DUNGEON_KEY = "pk-dungeon";

/** A room of a generated floor: a « Salle » map, and what the game put in it. */
export interface RunRoom {
  map: string;
  /** Room door id → where it leads (a room and its door); missing: the door stays shut. */
  doors: Record<string, { room: number; door: string }>;
  /** What the game put in it: enemies, chests, the stairs down (the last room). */
  placed: SceneBuilding[];
}

/** The dungeon the team is in. */
export interface DungeonRun {
  dungeon: string;
  /** Floor number (0 first). */
  floor: number;
  /** Where the team came in from (the way out). */
  entrance: { map: string; pos: Vec3 };
  /** The weather outside, given back on the way out. */
  weatherBefore?: string;
  /** A try with a team made for it (Menu → Essayer un donjon): the real team, given back on the way out. */
  partyBefore?: PartyState;
  /** A generated floor: its rooms and the room the team is in. */
  rooms?: RunRoom[];
  room?: number;
  /** A floor made by hand: what the game put on it (enemies). */
  placed?: SceneBuilding[];
  /** Keys of the chests opened and the enemies beaten on this floor (this visit). */
  done: string[];
}

export interface DungeonState {
  /** `<map>/<object>` of the chests opened and doors unlocked on maps made by hand. */
  opened: string[];
  run?: DungeonRun;
}

function readState(): DungeonState {
  const state = readJson<DungeonState>(DUNGEON_KEY);
  return state && Array.isArray(state.opened) ? state : { opened: [] };
}

export const currentDungeonState = cachedFromStorage([DUNGEON_KEY], readState);

export function writeDungeonState(state: DungeonState): void {
  writeJson(DUNGEON_KEY, state);
}

/** A saved game's dungeons put back (null: a new game). */
export function restoreDungeonState(state: DungeonState | null | undefined) {
  writeDungeonState(
    state && Array.isArray(state.opened)
      ? structuredClone(state)
      : { opened: [] }
  );
}

export function currentRun(): DungeonRun | undefined {
  return currentDungeonState().run;
}

/**
 * The key of an object of the map being played: on a generated floor, in its room (the same « Salle » map may be
 * two rooms), else on its map.
 */
export function objectKey(mapId: string, building: SceneBuilding): string {
  const run = currentRun();
  if (run?.rooms && run.room !== undefined) {
    return `room${run.room}/${building.id}`;
  }
  return `${mapId}/${building.id}`;
}

/** Was this object opened (a chest, a door unlocked)? */
export function isOpened(mapId: string, building: SceneBuilding): boolean {
  const key = objectKey(mapId, building);
  const state = currentDungeonState();
  return state.opened.includes(key) || !!state.run?.done.includes(key) || false;
}

/** A chest opened, a door unlocked: for good on a map made by hand, for this visit in a generated room or for placed objects. */
export function markOpened(mapId: string, building: SceneBuilding): void {
  const state = structuredClone(currentDungeonState());
  const key = objectKey(mapId, building);
  if (building.generated || key.startsWith("room")) {
    state.run?.done.push(key);
  } else if (!state.opened.includes(key)) {
    state.opened.push(key);
  }
  writeDungeonState(state);
}

/** Traps found (shown) on this map, until the map is left. */
const foundTraps = new Set<string>();

export function markTrapFound(key: string): void {
  foundTraps.add(key);
}

export function forgetFoundTraps(): void {
  foundTraps.clear();
}

/** How a dungeon object is drawn now: opened / turned on, hidden (a trap not found, an open door). */
export function dungeonLook(
  mapId: string,
  building: SceneBuilding,
  editing: boolean
): { on?: boolean; hidden?: boolean; gone?: boolean } {
  const info = dungeonKindOf(building.modelId);
  const settings = building.dungeon;
  if (!info || editing) {
    return {};
  }
  const values = currentVariableValues();
  switch (info.kind) {
    case "chest":
      return { on: isOpened(mapId, building) };
    case "switch":
      return { on: !!(settings?.variable && values[settings.variable]) };
    case "door":
      return {
        gone:
          isOpened(mapId, building) ||
          !!(settings?.variable && values[settings.variable]),
      };
    case "room-door": {
      // In a generated floor, the doors leading nowhere are not there (out of a dungeon: all shown)
      const run = currentDungeonState().run;
      const room = run?.rooms?.[run.room ?? -1];
      return { gone: !!room && !room.doors[building.id] };
    }
    case "trap":
      return {
        hidden:
          !!settings?.hidden && !foundTraps.has(objectKey(mapId, building)),
      };
    default:
      return {};
  }
}
