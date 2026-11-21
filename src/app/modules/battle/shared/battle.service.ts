import { Service, signal } from "@angular/core";
import * as THREE from "three";
import { Game } from "../../game/shared/model/Game";
import { loadDatabase } from "../../database-editor/shared/database-storage";
import { statAt } from "../../database-editor/shared/database";
import { currentParty } from "../../database-editor/shared/party";
import { BattleField } from "./battle-field";
import { BattleEngine } from "./battle-engine";
import {
  BattleResult,
  BattleView,
  CommandKind,
  Fighter,
  GAUGE_COMMAND,
} from "./battle-types";

/**
 * The Grandia-like fight (docs/idees.md, point 9), played on the map where it starts: the field (BattleField), the
 * rules and timing (BattleEngine), and what the interface shows (`view`, refreshed every frame of the fight).
 */
@Service()
export class BattleService {
  private game: Game | null = null;
  private field: BattleField | null = null;
  private engine: BattleEngine | null = null;
  private onEnd: ((result: BattleResult) => void) | null = null;
  private groupName = "";
  private canFlee = true;
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
    const fresh = () => ({
      gauge: 0,
      command: null,
      defending: false,
      home: new THREE.Vector3(),
      pos: new THREE.Vector3(),
    });
    const team: Fighter[] = currentParty()
      .team.map((id) => db.characters.find((c) => c.id === id))
      .filter((c) => !!c)
      .slice(0, 4)
      .map((c) => {
        const level = c.levelStart;
        const hp = statAt(c, "hp", level);
        const mp = statAt(c, "mp", level);
        return {
          ...fresh(),
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
          strength: statAt(c, "str", level),
          endurance: statAt(c, "end", level),
          agility: statAt(c, "agi", level),
          spot: { x: 0.5, y: 1 },
        };
      });
    const foes: Fighter[] = group.members.flatMap((m, i) => {
      const e = db.enemies.find((x) => x.id === m.enemy);
      return e
        ? [
            {
              ...fresh(),
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
              strength: e.stats.str,
              endurance: e.stats.end,
              agility: e.stats.agi,
              spot: { x: m.x, y: m.y },
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
    this.groupName = group.name;
    this.canFlee = group.canFlee;
    this.field = new BattleField(game, fighters);
    this.engine = new BattleEngine(fighters, this.field, group.canFlee, (r) =>
      this.end(r)
    );
    this.refresh();
  }

  /** The team member whose turn it is: its command; an attack then asks for its target. */
  choose(kind: CommandKind): void {
    this.engine?.choose(kind);
    this.refresh();
  }

  aimAt(id: string): void {
    this.engine?.aimAt(id);
    this.refresh();
  }

  moveAim(step: number): void {
    this.engine?.moveAim(step);
    this.refresh();
  }

  confirmTarget(id?: string): void {
    this.engine?.confirmTarget(id);
    this.refresh();
  }

  back(): void {
    this.engine?.back();
    this.refresh();
  }

  /** The fight ends: the field is taken down, the map comes back, the event goes on with the result. */
  end(result: BattleResult): void {
    const onEnd = this.onEnd;
    this.field?.dispose();
    this.field = null;
    this.engine = null;
    this.onEnd = null;
    this.viewState.set(null);
    onEnd?.(result);
  }

  /** Takes the fight down without going on with the event (the event was stopped). */
  cancel(): void {
    this.onEnd = null;
    this.end("lose");
  }

  /** Every frame (the game's render loop): the fight goes on, the sprites animate. */
  update(dt: number): void {
    if (!this.engine || !this.field) {
      return;
    }
    this.engine.update(dt);
    this.field?.update(dt);
    this.refresh();
  }

  private refresh(): void {
    const engine = this.engine;
    const field = this.field;
    if (!engine || !field) {
      return;
    }
    const actor = engine.actor;
    const aimed = engine.fighters.find((f) => f.id === engine.aim);
    this.viewState.set({
      groupName: this.groupName,
      canFlee: this.canFlee,
      fighters: engine.fighters,
      phase: engine.phase,
      actor: actor?.id ?? null,
      actorScreen: actor ? field.screenPos(actor.pos, 14) : null,
      pending: engine.pending,
      aim: engine.aim,
      aimScreen: aimed ? field.screenPos(aimed.pos, 34) : null,
      popups: engine.popups,
    });
  }
}
