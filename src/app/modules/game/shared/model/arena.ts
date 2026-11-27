import {
  DbGroup,
  GameDatabase,
} from "../../../database-editor/shared/database";
import { listMaps } from "../services/map-storage";
import { currentDungeonState } from "./dungeon-state";
import { SceneMap } from "./SceneMap";

/**
 * The fights' arenas (docs/editeur/21-arenes.md): a map of the « Arène » kind shown in place of the map during a
 * fight (MapHelper.showArena), its arrival point being the middle of the fight. An arena can be chosen for an
 * enemy group, a map, a dungeon and the whole game (the settings); the first one set wins, in that order.
 */

/** The choice « Sur place »: no arena, the fight is played where the team stands. */
export const ARENA_HERE = "none";

/** The size of a fight around its middle (world units), for the fighters' places and the editor's guide. */
export const FIGHT_AREA = {
  /** Where the enemies stand: a rectangle ahead of the middle (towards the north). */
  foes: { width: 90, depth: 40, ahead: 52 },
  /** The team's line: behind the middle (towards the camera), this far between two members. */
  teamBack: 14,
  teamSpacing: 26,
  /** How far from the fighters' middle one can walk. */
  radius: 75,
};

/** The arena maps, for the lists. */
export function arenaMaps(): { id: string; name: string }[] {
  return listMaps()
    .filter((m) => m.kind === "arena")
    .map(({ id, name }) => ({ id, name }));
}

/** The arena map's id of a fight against a group on a map, undefined when it is played on the spot. */
export function arenaFor(
  group: DbGroup | undefined,
  map: SceneMap,
  db: GameDatabase
): string | undefined {
  const run = currentDungeonState().run;
  const dungeon = run && db.dungeons.find((d) => d.id === run.dungeon);
  const choice =
    group?.arena ?? map.arena ?? dungeon?.arena ?? db.settings[0]?.arena;
  return choice && choice !== ARENA_HERE ? choice : undefined;
}
