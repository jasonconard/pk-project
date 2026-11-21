import { Service, signal } from "@angular/core";
import * as THREE from "three";
import { Game } from "../../game/shared/model/Game";
import { loadDatabase } from "../../database-editor/shared/database-storage";
import {
  DbCharacter,
  DbEnemy,
  GameDatabase,
  learnState,
  ResistLevel,
  STATS,
  StatId,
  statAt,
} from "../../database-editor/shared/database";
import { currentParty } from "../../database-editor/shared/party";
import { BattleField } from "./battle-field";
import { BattleEngine } from "./battle-engine";
import {
  ActionChoice,
  BattleResult,
  BattleView,
  Fighter,
  GAUGE_COMMAND,
} from "./battle-types";

/** A fighter's parts every fighter starts the same. */
function fresh() {
  return {
    gauge: 0,
    command: null,
    defending: false,
    states: [],
    boosts: [],
    home: new THREE.Vector3(),
    pos: new THREE.Vector3(),
  };
}

/** The physical element (plain attacks without a weapon element). */
function physicalId(db: GameDatabase): string {
  return db.elements.find((e) => e.physical)?.id ?? "";
}

/** A team member at its level, with its equipment's bonuses and resistances, and the skills it knows. */
function teamFighter(c: DbCharacter, db: GameDatabase): Fighter {
  const level = c.levelStart;
  const worn = Object.values(c.equipment)
    .map((id) => db.items.find((i) => i.id === id))
    .filter((i) => !!i);
  const stats = Object.fromEntries(
    STATS.map((s) => [s.id, statAt(c, s.id, level)])
  ) as Record<StatId, number>;
  const resists: Record<string, ResistLevel> = {};
  for (const item of worn) {
    item.bonuses?.forEach((b) => (stats[b.stat] += b.amount));
    item.resists?.forEach((r) => (resists[r.element] = r.level));
  }
  const weapon = worn.find((i) => i.slot === "weapon");
  return {
    ...fresh(),
    id: c.id,
    side: "team",
    name: c.name,
    level,
    icon: c.icon,
    portrait: c.portrait,
    sheet: c.sheet,
    hp: stats.hp,
    hpMax: stats.hp,
    mp: stats.mp,
    mpMax: stats.mp,
    stats,
    resists,
    attackElement: weapon?.attackElement ?? physicalId(db),
    skills: db.skills
      .filter((s) => s.use !== "field" && learnState(c, s) === "start")
      .map((s) => s.id),
    actions: [],
    stronger: false,
    spot: { x: 0.5, y: 1 },
  };
}

function foeFighter(
  e: DbEnemy,
  index: number,
  spot: { x: number; y: number },
  weather: string,
  db: GameDatabase
): Fighter {
  return {
    ...fresh(),
    id: `${e.id}#${index}`,
    side: "foe",
    name: e.name,
    level: e.level,
    icon: e.icon,
    sheet: e.sheet,
    hp: e.stats.hp,
    hpMax: e.stats.hp,
    mp: e.stats.mp,
    mpMax: e.stats.mp,
    stats: { ...e.stats },
    resists: { ...e.resists },
    attackElement: physicalId(db),
    skills: [],
    actions: e.actions,
    stronger: e.weathers.some(
      (w) => w.effect === "stronger" && w.weather === weather
    ),
    spot,
  };
}

/**
 * The Grandia-like fight (docs/idees.md, point 9), played on the map where it starts: the field (BattleField), the
 * rules and timing (BattleEngine), and what the interface shows (`view`, refreshed every frame of the fight).
 */
@Service()
export class BattleService {
  private game: Game | null = null;
  private field: BattleField | null = null;
  private engine: BattleEngine | null = null;
  private db: GameDatabase | null = null;
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
    const weather = game.weather.type;
    const team = currentParty()
      .team.map((id) => db.characters.find((c) => c.id === id))
      .filter((c) => !!c)
      .slice(0, 4)
      .map((c) => teamFighter(c, db));
    const foes = group.members.flatMap((m, i) => {
      const e = db.enemies.find((x) => x.id === m.enemy);
      return e ? [foeFighter(e, i, { x: m.x, y: m.y }, weather, db)] : [];
    });
    const fighters = [...team, ...foes];
    // Where each one starts on the gauge: the quickest further, a little luck; a surprise attack puts the enemies
    // ahead (the team caught from behind)
    const fastest = Math.max(1, ...fighters.map((f) => f.stats.agi));
    for (const f of fighters) {
      const ahead = group.surprise && f.side === "foe" ? 0.25 : 0;
      f.gauge = Math.min(
        GAUGE_COMMAND - 0.05,
        (f.stats.agi / fastest) * 0.35 + Math.random() * 0.2 + ahead
      );
    }
    this.db = db;
    this.onEnd = onEnd;
    this.groupName = group.name;
    this.canFlee = group.canFlee;
    this.field = new BattleField(game, fighters);
    this.engine = new BattleEngine(
      fighters,
      this.field,
      db,
      weather,
      group.canFlee,
      (r) => this.end(r)
    );
    this.refresh();
  }

  choose(kind: "attack" | "heavy" | "defend" | "flee"): void {
    this.engine?.choose(kind);
    this.refresh();
  }

  chooseSkill(id: string): void {
    this.engine?.chooseSkill(id);
    this.refresh();
  }

  chooseItem(id: string): void {
    this.engine?.chooseItem(id);
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
    const db = this.db;
    if (!engine || !field || !db) {
      return;
    }
    const actor = engine.actor;
    const aimed = engine.fighters.find((f) => f.id === engine.aim);
    const choosing = engine.phase === "command" || engine.phase === "target";
    const pending = engine.pending;
    const pendingLabel = (() => {
      if (pending?.kind === "skill") {
        return engine.skill(pending.id)?.name ?? "";
      }
      if (pending?.kind === "item") {
        return engine.item(pending.id)?.name ?? "";
      }
      return pending?.kind === "heavy" ? "Attaque forte" : "Attaque";
    })();
    this.viewState.set({
      groupName: this.groupName,
      canFlee: this.canFlee,
      fighters: engine.fighters,
      phase: engine.phase,
      actor: actor?.id ?? null,
      actorScreen: actor ? field.screenPos(actor.pos, 14) : null,
      skills: choosing && actor ? this.skillChoices(actor, db) : [],
      items: choosing ? this.itemChoices(db) : [],
      pendingLabel,
      targets:
        engine.phase === "target"
          ? engine.alive(engine.targetSide).map((f) => ({
              id: f.id,
              name: f.name,
              icon: f.icon,
              hp: f.hp,
              hpMax: f.hpMax,
            }))
          : [],
      aim: engine.aim,
      aimScreen: aimed ? field.screenPos(aimed.pos, 34) : null,
      casts: engine.casts().map((c) => {
        const f = engine.fighters.find((x) => x.id === c.id);
        return { ...c, ...field.screenPos(f?.pos ?? new THREE.Vector3(), 40) };
      }),
      popups: engine.popups,
      stateLooks: Object.fromEntries(
        db.states.map((s) => [s.id, { name: s.name, color: s.color }])
      ),
    });
  }

  private skillChoices(actor: Fighter, db: GameDatabase): ActionChoice[] {
    return actor.skills
      .map((id) => db.skills.find((s) => s.id === id))
      .filter((s) => !!s)
      .map((s) => ({
        id: s.id,
        name: s.name,
        icon: s.icon,
        detail: s.mp ? `${s.mp} PM` : "",
        usable: actor.mp >= s.mp,
      }));
  }

  /** The team's items usable in a fight. */
  private itemChoices(db: GameDatabase): ActionChoice[] {
    const owned = currentParty().items;
    return db.items
      .filter(
        (i) =>
          i.kind === "consumable" && i.use !== "field" && (owned[i.id] ?? 0) > 0
      )
      .map((i) => ({
        id: i.id,
        name: i.name,
        icon: i.icon,
        detail: `×${owned[i.id]}`,
        usable: true,
      }));
  }
}
