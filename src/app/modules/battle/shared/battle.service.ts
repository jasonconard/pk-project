import { Service, signal } from "@angular/core";
import * as THREE from "three";
import { Game } from "../../game/shared/model/Game";
import { loadDatabase } from "../../database-editor/shared/database-storage";
import {
  DbCharacter,
  DbEnemy,
  GameDatabase,
  characterStats,
  ResistLevel,
  wornItems,
} from "../../database-editor/shared/database";
import {
  currentParty,
  giveItem,
  giveMoney,
  MemberProgress,
  memberProgress,
  saveProgress,
} from "../../database-editor/shared/party";
import { BattleField } from "./battle-field";
import { BattleEngine } from "./battle-engine";
import {
  ActionChoice,
  BattleOutcome,
  BattleResult,
  BattleView,
  Fighter,
  GAUGE_COMMAND,
  MemberOutcome,
} from "./battle-types";
import { gainGrowth, gainXp, knownSkills } from "./progress";

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

/** A team member as it stands in the game: its level, PV / PM and states kept, its equipment, the skills it knows. */
function teamFighter(
  c: DbCharacter,
  p: MemberProgress,
  db: GameDatabase
): Fighter {
  const stats = characterStats(c, p.level, db);
  const resists: Record<string, ResistLevel> = {};
  const worn = wornItems(c, db);
  for (const item of worn) {
    item.resists?.forEach((r) => (resists[r.element] = r.level));
  }
  const weapon = worn.find((i) => i.slot === "weapon");
  return {
    ...fresh(),
    id: c.id,
    side: "team",
    name: c.name,
    level: p.level,
    icon: c.icon,
    portrait: c.portrait,
    sheet: c.sheet,
    hp: Math.min(stats.hp, Math.max(1, p.hp)),
    hpMax: stats.hp,
    mp: Math.min(stats.mp, Math.max(0, p.mp)),
    mpMax: stats.mp,
    stats,
    resists,
    attackElement: weapon?.attackElement ?? physicalId(db),
    weaponType: weapon?.weapon,
    states: p.states
      .map((id) => db.states.find((s) => s.id === id))
      .filter((s) => !!s)
      .map((s) => ({ id: s.id, turns: s.turns })),
    skills: knownSkills(c, p, db)
      .filter((s) => s.use !== "field")
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
 * rules and timing (BattleEngine), what the interface shows (`view`, refreshed every frame of the fight), and the
 * end (the victory's experience, levels and loot, saved in the team's progress; the defeat).
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
  /** The team members' characters and progress in this fight. */
  private characters = new Map<string, DbCharacter>();
  private progress = new Map<string, MemberProgress>();
  private outcome: BattleOutcome | null = null;
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
    const members = currentParty()
      .team.map((id) => db.characters.find((c) => c.id === id))
      .filter((c) => !!c)
      .slice(0, 4);
    this.characters = new Map(members.map((c) => [c.id, c]));
    this.progress = new Map(members.map((c) => [c.id, memberProgress(c)]));
    const team = members.map((c) =>
      teamFighter(c, this.progress.get(c.id)!, db)
    );
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
    this.outcome = null;
    this.groupName = group.name;
    this.canFlee = group.canFlee;
    this.field = new BattleField(game, fighters);
    this.engine = new BattleEngine(
      fighters,
      this.field,
      db,
      weather,
      group.canFlee,
      (r) => this.finish(r)
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

  /** The end window was read: the fight closes. */
  closeOutcome(): void {
    if (this.outcome) {
      this.end(this.outcome.result);
    }
  }

  /** The fight ends: the field is taken down, the map comes back, the event goes on with the result. */
  end(result: BattleResult): void {
    const onEnd = this.onEnd;
    this.field?.dispose();
    this.field = null;
    this.engine = null;
    this.outcome = null;
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

  /**
   * The engine says the fight is over. Fleeing: it closes. Victory: the experience, the levels in the elements and
   * weapons used, the money and the items found, shown in the end window; defeat: its window. The team's PV, PM
   * and lasting states are kept either way (the fallen get back up with 1 PV).
   */
  private finish(result: BattleResult): void {
    const engine = this.engine;
    const db = this.db;
    if (!engine || !db || result === "flee") {
      this.end(result);
      return;
    }
    const foes = engine.fighters.filter((f) => f.side === "foe");
    const enemies = foes
      .map((f) => db.enemies.find((e) => f.id.startsWith(`${e.id}#`)))
      .filter((e) => !!e);
    const win = result === "win";
    const xp = win ? enemies.reduce((n, e) => n + e.xp, 0) : 0;
    const money = win ? enemies.reduce((n, e) => n + e.money, 0) : 0;
    const found = new Map<string, number>();
    if (win) {
      for (const e of enemies) {
        e.drops.forEach((d) => {
          if (Math.random() * 100 < d.chance) {
            found.set(d.item, (found.get(d.item) ?? 0) + 1);
          }
        });
      }
      if (money) {
        giveMoney(money);
      }
      found.forEach((n, id) => giveItem(id, n));
    }
    const members: MemberOutcome[] = [];
    for (const f of engine.fighters.filter((x) => x.side === "team")) {
      const c = this.characters.get(f.id);
      const p = this.progress.get(f.id);
      if (!c || !p) {
        continue;
      }
      members.push(this.grow(c, p, f, win ? xp : 0, engine, db));
    }
    saveProgress(Object.fromEntries(this.progress));
    this.outcome = {
      result: win ? "win" : "lose",
      xp,
      money,
      items: [...found].map(([id, count]) => {
        const item = db.items.find((i) => i.id === id);
        return { name: item?.name ?? "?", icon: item?.icon, count };
      }),
      members,
    };
    this.refresh();
  }

  /** A member after the fight: PV / PM / states kept, its experience and the levels of what it used. */
  private grow(
    c: DbCharacter,
    p: MemberProgress,
    f: Fighter,
    xp: number,
    engine: BattleEngine,
    db: GameDatabase
  ): MemberOutcome {
    const fallen = f.hp <= 0;
    const levelFrom = p.level;
    const before = new Set(knownSkills(c, p, db).map((s) => s.id));
    p.hp = fallen ? 1 : f.hp;
    p.mp = f.mp;
    p.states = f.states
      .filter((s) => db.states.find((x) => x.id === s.id)?.staysAfterFight)
      .map((s) => s.id);
    const gains: MemberOutcome["gains"] = [];
    if (xp > 0 && !fallen) {
      const maxBefore = characterStats(c, p.level, db);
      gainXp(c, p, xp);
      const maxAfter = characterStats(c, p.level, db);
      // A level up adds its new PV / PM
      p.hp = Math.min(maxAfter.hp, p.hp + maxAfter.hp - maxBefore.hp);
      p.mp = Math.min(maxAfter.mp, p.mp + maxAfter.mp - maxBefore.mp);
      const bonus = (id: string) =>
        wornItems(c, db).reduce(
          (n, i) => n + (i.growth?.find((g) => g.id === id)?.percent ?? 0),
          0
        );
      for (const [id, uses] of Object.entries(engine.uses.get(f.id) ?? {})) {
        const gained = gainGrowth(c, p, id, uses, bonus(id));
        const row =
          db.elements.find((e) => e.id === id) ??
          db.weapons.find((w) => w.id === id);
        if (gained.points > 0) {
          gains.push({
            id,
            name: row?.name ?? id,
            icon: row?.icon,
            points: gained.points,
            level: gained.levels > 0 ? p.growth[id].level : null,
          });
        }
      }
    }
    return {
      id: c.id,
      name: c.name,
      portrait: c.portrait,
      levelFrom,
      levelTo: p.level,
      fallen,
      gains,
      skills: knownSkills(c, p, db)
        .filter((s) => !before.has(s.id))
        .map((s) => s.name),
    };
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
      phase: this.outcome ? "result" : engine.phase,
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
              busy: !!f.command && f.gauge > GAUGE_COMMAND,
            }))
          : [],
      aim: engine.aim,
      aimScreen: aimed ? field.screenPos(aimed.pos, 34) : null,
      casts: engine.casts().map((c) => {
        const f = engine.fighters.find((x) => x.id === c.id);
        return { ...c, ...field.screenPos(f?.pos ?? new THREE.Vector3(), 40) };
      }),
      popups: engine.popups,
      knocked: [...engine.knocked.keys()],
      outcome: this.outcome,
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
