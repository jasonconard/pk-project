import { SCENE_PLAYER } from "../../../../../assets/characters/player";
import { cachedFromStorage } from "../../../../core/shared/local-store";
import {
  DATABASE_KEY,
  loadDatabase,
} from "../../../database-editor/shared/database-storage";
import { WALK_CELL } from "../../../database-editor/shared/database";
import { currentParty, PARTY_KEY } from "../../../database-editor/shared/party";
import { PlayerTex } from "./ScenePlayer";

/** The first player sprite (14×22, from the first prototype): while the leader has no walking sheet. */
const OLD_LOOK: PlayerTex = { ...SCENE_PLAYER.tex };

/** How the player is drawn on the map: the team leader's walking sheet (database), else the first sprite. */
export const playerLook = cachedFromStorage(
  [DATABASE_KEY, PARTY_KEY],
  (): PlayerTex => {
    const leader = currentParty().team[0];
    const walk = loadDatabase().characters.find((c) => c.id === leader)?.walk;
    return walk
      ? { link: walk, size: { x: WALK_CELL.w, y: WALK_CELL.h }, walk: true }
      : OLD_LOOK;
  }
);
