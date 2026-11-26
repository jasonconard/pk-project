import { DungeonState } from "../model/dungeon-state";
import { AnimationStates } from "../model/model-animations";
import { WeatherType } from "../weather/Weather";
import { Vec3 } from "../model/SceneUtils";
import { VariableValues } from "../../../variables-editor/shared/variable-values";
import { PartyState } from "../../../database-editor/shared/party";
import { readJson, writeJson } from "../../../../core/shared/local-store";

/**
 * The saved games: a few slots, in the browser of this device (they are the player's progress, not creations: not
 * in the game project file). A slot keeps where the player is, the time and the weather, the variables' values and
 * the team (members, items, money).
 */
const STORAGE_KEY = "pk-saves";
export const SAVE_SLOTS = 3;

export interface GameSave {
  /** ISO date. */
  savedAt: string;
  /** Version of the app that saved it. */
  appVersion: string;
  map: string;
  /** Name of the map when saved (shown in the slot). */
  mapName: string;
  pos: Vec3;
  /** 0 ≤ hour < 24, with the minutes (14.5 = 14:30). */
  hour: number;
  /** The game's date (a day number, see game-calendar.ts); missing in the saves made before the calendar. */
  day?: number;
  weather: WeatherType;
  variables: VariableValues;
  /** Missing in the saves made before the database. */
  party?: PartyState;
  /** The dungeons (chests opened, the dungeon the team is in); missing in the saves made before them. */
  dungeon?: DungeonState;
  /** The objects moved by events (see model-animations.ts). */
  animations?: AnimationStates;
  /** The cutscenes « Une seule fois » already seen (see cutscene-seen.ts). */
  cutscenesSeen?: string[];
}

/** The slots (null: empty), always SAVE_SLOTS of them. */
export function loadSaves(): (GameSave | null)[] {
  const saves = readJson<unknown>(STORAGE_KEY);
  const list = Array.isArray(saves) ? saves : [];
  return Array.from({ length: SAVE_SLOTS }, (_, i) =>
    isSave(list[i]) ? list[i] : null
  );
}

/** False if the browser refused (no room). */
export function writeSave(slot: number, save: GameSave | null): boolean {
  const saves = loadSaves();
  saves[slot] = save;
  return writeJson(STORAGE_KEY, saves);
}

function isSave(value: unknown): value is GameSave {
  const save = value as GameSave | null;
  return (
    !!save &&
    typeof save.map === "string" &&
    typeof save.hour === "number" &&
    !!save.pos &&
    typeof save.pos.x === "number" &&
    typeof save.pos.z === "number"
  );
}
