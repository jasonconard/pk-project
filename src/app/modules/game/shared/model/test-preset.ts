import { readJson, writeJson } from "../../../../core/shared/local-store";
import {
  DayTime,
  GameDatabase,
  linkLevelOf,
  linkStep,
  newId,
  statAt,
} from "../../../database-editor/shared/database";
import { loadDatabase } from "../../../database-editor/shared/database-storage";
import {
  currentParty,
  memberProgress,
  MemberProgress,
  PartyState,
  restoreParty,
} from "../../../database-editor/shared/party";
import { linkTarget } from "../../../database-editor/shared/links";
import { loadVariables } from "../../../variables-editor/shared/variable-storage";
import {
  currentVariableValues,
  restoreVariableValues,
  VariableValues,
} from "../../../variables-editor/shared/variable-values";
import { WeatherType } from "../weather/Weather";
import { restoreCutscenesSeen, seenCutscenes } from "./cutscene-seen";
import { restoreDungeonState } from "./dungeon-state";
import { restoreAnimations } from "./model-animations";

/**
 * The mode test (design/main-view.pen, Mode test): a named test keeps where it starts and the state of the game to try a
 * scene with (the day, the moment, the weather, the variables, the team, the bag, the links, the cutscenes seen). It
 * is a creation (kept in the browser, `pk-tests`, and in the project file), not the player's progress.
 */
export const TESTS_KEY = "pk-tests";

export interface TestPreset {
  id: string;
  name: string;
  /** Where it starts from the menu (from the editor: the point touched; from an event: next to its object). */
  map: string;
  pos: { x: number; z: number };
  /** The game's date (a day number, see game-calendar.ts). */
  day: number;
  moment: DayTime;
  weather: WeatherType;
  /** Every variable's value (the ones missing take their starting value). */
  variables: VariableValues;
  /** Character ids in the team, in order. */
  team: string[];
  /** Character id → its level. */
  levels: Record<string, number>;
  /** Item id → how many. */
  items: Record<string, number>;
  money: number;
  /** Character or NPC id → its link's level. */
  links: Record<string, number>;
  /** The cutscenes « Une seule fois » already seen (see cutscene-seen.ts). */
  cutscenesSeen: string[];
}

/** Where a test starts. */
export interface TestSpot {
  map: string;
  pos: { x: number; z: number };
}

/** The time of the day and the weather a test starts with. */
export interface TestTime {
  day: number;
  moment: DayTime;
  weather: WeatherType;
}

export function loadTests(): TestPreset[] {
  const list = readJson<unknown>(TESTS_KEY);
  return Array.isArray(list) ? list.filter(isTest) : [];
}

/** False if the browser refused (no room). */
export function saveTests(tests: TestPreset[]): boolean {
  return writeJson(TESTS_KEY, tests);
}

function isTest(value: unknown): value is TestPreset {
  const t = value as TestPreset | null;
  return (
    !!t &&
    typeof t.id === "string" &&
    typeof t.map === "string" &&
    !!t.pos &&
    typeof t.day === "number" &&
    Array.isArray(t.team)
  );
}

/** A new test: the game as it is now, starting there. */
export function testFromGame(
  name: string,
  spot: TestSpot,
  time: TestTime
): TestPreset {
  const party = currentParty();
  const db = loadDatabase();
  return {
    id: newId("test"),
    name,
    map: spot.map,
    pos: { x: spot.pos.x, z: spot.pos.z },
    ...time,
    variables: { ...currentVariableValues() },
    team: [...party.team],
    levels: Object.fromEntries(
      db.characters.map((c) => [c.id, memberProgress(c).level])
    ),
    items: { ...party.items },
    money: party.money,
    links: Object.fromEntries(
      Object.entries(party.links ?? {})
        .map(([id, points]) => [id, levelOfPoints(id, points, db)] as const)
        .filter(([, level]) => level > 0)
    ),
    cutscenesSeen: [...seenCutscenes()],
  };
}

function levelOfPoints(id: string, points: number, db: GameDatabase): number {
  return linkLevelOf(points, linkTarget(id, db)?.pace).level;
}

/** The points that reach a link's level (its start). */
export function linkPointsAt(id: string, level: number, db: GameDatabase) {
  const pace = linkTarget(id, db)?.pace;
  let points = 0;
  for (let l = 0; l < level; l++) {
    points += linkStep(l, pace);
  }
  return points;
}

/**
 * The game takes a test's state: its variables, its team (levels, full health), bag, money and links, the cutscenes
 * it has seen; no dungeon run, the objects moved by events back to their place. (Where and when: the game's.)
 */
export function applyTest(test: TestPreset): void {
  const db = loadDatabase();
  const starting = Object.fromEntries(
    loadVariables().map((v) => [v.id, v.initial])
  );
  restoreVariableValues({ ...starting, ...test.variables });
  const members: Record<string, MemberProgress> = {};
  for (const c of db.characters) {
    const level = Math.min(
      c.levelMax,
      Math.max(1, test.levels[c.id] ?? c.levelStart)
    );
    members[c.id] = {
      ...memberProgress(c),
      level,
      xp: 0,
      hp: statAt(c, "hp", level),
      mp: statAt(c, "mp", level),
      states: [],
    };
  }
  const party: PartyState = {
    team: test.team.filter((id) => db.characters.some((c) => c.id === id)),
    members,
    items: { ...test.items },
    money: test.money,
    links: Object.fromEntries(
      Object.entries(test.links).map(([id, level]) => [
        id,
        linkPointsAt(id, level, db),
      ])
    ),
  };
  restoreParty(party);
  restoreCutscenesSeen(test.cutscenesSeen);
  restoreDungeonState(null);
  restoreAnimations(null);
}

/** « Test 2 »: a name not taken yet. */
export function freeTestName(tests: TestPreset[]): string {
  let n = tests.length + 1;
  while (tests.some((t) => t.name === `Test ${n}`)) {
    n++;
  }
  return `Test ${n}`;
}
