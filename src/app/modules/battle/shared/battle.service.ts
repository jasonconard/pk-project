import { Service, signal } from "@angular/core";
import * as THREE from "three";
import { Game } from "../../game/shared/model/Game";
import { loadDatabase } from "../../database-editor/shared/database-storage";
import { statAt } from "../../database-editor/shared/database";
import { currentParty } from "../../database-editor/shared/party";
import { BattleField } from "./battle-field";
import {
  BattleResult,
  BattleView,
  Fighter,
  GAUGE_COMMAND,
} from "./battle-types";

/**
 * The Grandia-like fight (docs/idees.md, point 9), played on the map where it starts. For now (step 1): the field
 * with the team and the group's enemies animated from their sprite sheets, their place on the action gauge, and
 * the fight's end chosen by the player (the commands come next).
 */
@Service()
export class BattleService {
  private game: Game | null = null;
  private field: BattleField | null = null;
  private onEnd: ((result: BattleResult) => void) | null = null;
  private readonly viewState = signal<BattleView | null>(null);
  /** The fight shown (null: no fight). */
  readonly view = this.viewState.asReadonly();

  /** The game the fights are drawn in (given by the game service). */
  attach(game: Game): void {
    this.game = game;
  }

  get running(): boolean {
    return this.field !== null;
  }

  /** Starts a fight against a group; `onEnd` is called with how it ended. */
  start(groupId: string, onEnd: (result: BattleResult) => void): void {
    const game = this.game;
    const db = loadDatabase();
    const group = db.groups.find((g) => g.id === groupId);
    if (!game || !group || this.field) {
      onEnd("win");
      return;
    }
    const team: Fighter[] = currentParty()
      .team.map((id) => db.characters.find((c) => c.id === id))
      .filter((c) => !!c)
      .slice(0, 4)
      .map((c) => {
        const level = c.levelStart;
        const hp = statAt(c, "hp", level);
        const mp = statAt(c, "mp", level);
        return {
          id: c.id,
          side: "team",
          name: c.name,
          level,
          icon: c.icon,
          portrait: c.portrait,
          sheet: c.sheet,
          hp,
          hpMax: hp,
          mp,
          mpMax: mp,
          agility: statAt(c, "agi", level),
          gauge: 0,
          spot: { x: 0.5, y: 1 },
          pos: new THREE.Vector3(),
        };
      });
    const foes: Fighter[] = group.members.flatMap((m, i) => {
      const e = db.enemies.find((x) => x.id === m.enemy);
      return e
        ? [
            {
              id: `${e.id}#${i}`,
              side: "foe" as const,
              name: e.name,
              level: e.level,
              icon: e.icon,
              sheet: e.sheet,
              hp: e.stats.hp,
              hpMax: e.stats.hp,
              mp: e.stats.mp,
              mpMax: e.stats.mp,
              agility: e.stats.agi,
              gauge: 0,
              spot: { x: m.x, y: m.y },
              pos: new THREE.Vector3(),
            },
          ]
        : [];
    });
    const fighters = [...team, ...foes];
    // Where each one starts on the gauge: the quickest further, a little luck; a surprise attack puts the enemies
    // ahead (the team caught from behind)
    const fastest = Math.max(1, ...fighters.map((f) => f.agility));
    for (const f of fighters) {
      const ahead = group.surprise && f.side === "foe" ? 0.25 : 0;
      f.gauge = Math.min(
        GAUGE_COMMAND - 0.05,
        (f.agility / fastest) * 0.35 + Math.random() * 0.2 + ahead
      );
    }
    this.onEnd = onEnd;
    this.field = new BattleField(game, fighters);
    this.viewState.set({
      groupName: group.name,
      canFlee: group.canFlee,
      fighters,
    });
  }

  /** The fight ends: the field is taken down, the map comes back, the event goes on with the result. */
  end(result: BattleResult): void {
    const onEnd = this.onEnd;
    this.field?.dispose();
    this.field = null;
    this.onEnd = null;
    this.viewState.set(null);
    onEnd?.(result);
  }

  /** Takes the fight down without going on with the event (the event was stopped). */
  cancel(): void {
    this.onEnd = null;
    this.end("lose");
  }

  /** Every frame (the game's render loop): the sprites' animations. */
  update(dt: number): void {
    this.field?.update(dt);
  }
}
