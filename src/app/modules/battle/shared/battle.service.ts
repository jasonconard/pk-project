import { inject, Service, signal } from "@angular/core";
import { TransitionService } from "../../game/shared/services/transition.service";
import { TransitionKind } from "../../game/shared/model/transition";
import { ARENA_HERE, arenaFor } from "../../game/shared/model/arena";
import { loadMap } from "../../game/shared/services/map-storage";
import * as THREE from "three";
import { Game } from "../../game/shared/model/Game";
import { loadDatabase } from "../../database-editor/shared/database-storage";
import {
  DbCharacter,
  DbGroup,
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
  PartyState,
  restoreParty,
  saveProgress,
} from "../../database-editor/shared/party";
import { BattleField } from "./battle-field";
import { BattleEngine } from "./battle-engine";
import {
  ActionChoice,
  BattleOutcome,
  BattleOpening,
  BattleResult,
  BattleView,
  Fighter,
  GAUGE_COMMAND,
  MemberOutcome,
} from "./battle-types";
import { gainGrowth, gainXp, knownSkills } from "./progress";

/**
 * A member of a simulated fight's team (menu → Simuler un combat): its level and its levels in the elements (the
 * others as the character starts).
 */
export interface SimMember {
  id: string;
  level: number;
  growth: Record<string, number>;
}

/** A simulated member's progress: at the level chosen, PV / PM full, no state. */
export function simProgress(
  c: DbCharacter,
  m: SimMember,
  db: GameDatabase
): MemberProgress {
  const level = Math.min(c.levelMax, Math.max(1, Math.round(m.level)));
  const stats = characterStats(c, level, db);
  const growth: MemberProgress["growth"] = {};
  for (const [id, g] of Object.entries(c.growth)) {
    growth[id] = { level: g.level, points: 0 };
  }
  for (const [id, level] of Object.entries(m.growth)) {
    growth[id] = { level: Math.max(0, Math.round(level)), points: 0 };
  }
  return { level, xp: 0, hp: stats.hp, mp: stats.mp, states: [], growth };
}

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
  // The social link's bonuses reached: stats in %, skills learned (the element / weapon experience is given once)
  const bonuses = memberLinkBonuses(c, linkState(c.id, db).level);
  const percent: Partial<Record<StatId, number>> = {};
  for (const b of bonuses) {
    if (b.kind === "stat") {
      percent[b.stat] = (percent[b.stat] ?? 0) + b.percent;
    }
  }
  for (const [stat, pc] of Object.entries(percent) as [StatId, number][]) {
    stats[stat] = Math.round(stats[stat] * (1 + pc / 100));
  }
  const linkSkills = bonuses.flatMap((b) =>
    b.kind === "skill" ? [b.skill] : []
  );
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
    ranged: !!db.weapons.find((w) => w.id === weapon?.weapon)?.ranged,
    stun: (c.stunMs ?? 0) / 1000,
    states: p.states
      .map((id) => db.states.find((s) => s.id === id))
      .filter((s) => !!s)
      .map((s) => ({ id: s.id, turns: s.turns })),
    skills: [
      ...new Set([...knownSkills(c, p, db).map((s) => s.id), ...linkSkills]),
    ].filter((id) => db.skills.find((s) => s.id === id)?.use !== "field"),
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
    stun: (e.stunMs ?? 0) / 1000,
    voice: e.voice,
    voicePitch: e.voicePitch,
    step: e.step,
    boss: e.boss,
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
import {
  linkState,
  memberLinkBonuses,
} from "../../database-editor/shared/links";
import { StatId } from "../../database-editor/shared/database";
/** How long « Attaque surprise ! » / « Embuscade ! » stays (ms). */
const OPENING_SHOWN_MS = 2200;

@Service()
export class BattleService {
  private game: Game | null = null;
  private field: BattleField | null = null;
  private engine: BattleEngine | null = null;
  private db: GameDatabase | null = null;
  private onEnd: ((result: BattleResult) => void) | null = null;
  private groupName = "";
  /** How the fight started (shown for a moment). */
  private opening: BattleView["opening"] = null;
  private openingUntil = 0;
  private canFlee = true;
  /** The team members' characters and progress in this fight. */
  private characters = new Map<string, DbCharacter>();
  private progress = new Map<string, MemberProgress>();
  private outcome: BattleOutcome | null = null;
  /** The next fight is a simulation with this team. */
  private simTeam: SimMember[] | null = null;
  /** A simulation is played: the team as it was before, put back at the end. */
  private savedParty: PartyState | null = null;
  /** The transition into the fight is played (the fight is set up behind it), the one out of it. */
  private starting = false;
  private ending = false;
  /** The fight is played in an arena: where the player stood on the map, to put it back there. */
  private arenaBack: THREE.Vector3 | null = null;
  /** The next fight's arena, chosen by « Simuler un combat » (a map's id, "none": on the spot). */
  private simArena?: string;
  /** The transition out of the fight being played, when its group has its own. */
  private outKind?: TransitionKind;
  private readonly transitions = inject(TransitionService);
  private readonly viewState = signal<BattleView | null>(null);
  /** The fight shown (null: no fight). */
  readonly view = this.viewState.asReadonly();

  /** The game the fights are drawn in (given by the game service). */
  attach(game: Game): void {
    this.game = game;
  }

  get running(): boolean {
    return this.field !== null || this.starting;
  }

  /**
   * The next fight is a simulation (menu → Simuler un combat) played by this team: nothing it changes is kept (the
   * team's progress, its items and money are put back as they were when it ends).
   */
  simulateNext(team: SimMember[], arena?: string): void {
    this.simTeam = team;
    this.simArena = arena;
  }

  /**
   * Starts a fight against a group, behind the transition chosen in the database (Réglages → Entrée en combat);
   * `onEnd` is called with how it ended.
   */
  start(
    groupId: string,
    onEnd: (result: BattleResult) => void,
    opening?: BattleOpening
  ): void {
    if (this.running) {
      onEnd("win");
      return;
    }
    this.starting = true;
    // (the group's own transitions, else the settings' ones)
    const group = loadDatabase().groups.find((g) => g.id === groupId);
    this.outKind = group?.transitionOut;
    const kind = group?.transitionIn ?? this.transitions.kindFor("fightIn");
    this.transitions.through(kind, () => {
      this.starting = false;
      this.begin(groupId, onEnd, opening);
    });
  }

  private begin(
    groupId: string,
    onEnd: (result: BattleResult) => void,
    opening?: BattleOpening
  ): void {
    const game = this.game;
    const db = loadDatabase();
    const group = db.groups.find((g) => g.id === groupId);
    const sim = this.simTeam;
    const simArena = this.simArena;
    this.simTeam = null;
    this.simArena = undefined;
    if (!game || !group || this.field) {
      onEnd("win");
      return;
    }
    const weather = game.weather.type;
    const members = (sim ? sim.map((m) => m.id) : currentParty().team)
      .map((id) => db.characters.find((c) => c.id === id))
      .filter((c) => !!c)
      .slice(0, 4);
    this.savedParty = sim ? structuredClone(currentParty()) : null;
    this.characters = new Map(members.map((c) => [c.id, c]));
    this.progress = new Map(
      members.map((c) => {
        const m = sim?.find((x) => x.id === c.id);
        return [c.id, m ? simProgress(c, m, db) : memberProgress(c)];
      })
    );
    const team = members.map((c) =>
      teamFighter(c, this.progress.get(c.id)!, db)
    );
    const foes = group.members.flatMap((m, i) => {
      const e = db.enemies.find((x) => x.id === m.enemy);
      return e ? [foeFighter(e, i, { x: m.x, y: m.y }, weather, db)] : [];
    });
    const fighters = [...team, ...foes];
    // Where each one starts on the gauge: the quickest further, a little luck; a surprise attack puts the enemies
    // ahead (the team caught from behind: an event's fight when the group may attack first, a dungeon's enemy coming
    // from behind), the team hitting first puts the team ahead
    const fastest = Math.max(1, ...fighters.map((f) => f.stats.agi));
    const ambush = group.surprise && (opening ?? "ambush") === "ambush";
    let aheadSide: Fighter["side"] | null = ambush ? "foe" : null;
    this.opening = null;
    if (opening === "advantage") {
      aheadSide = "team";
      this.opening = {
        title: "Attaque surprise !",
        text: "Vos jauges partent en avance",
      };
    } else if (opening === "ambush" && ambush) {
      this.opening = {
        title: "Embuscade !",
        text: "Les ennemis partent en avance",
      };
    }
    this.openingUntil = performance.now() + OPENING_SHOWN_MS;
    for (const f of fighters) {
      const ahead = f.side === aheadSide ? 0.25 : 0;
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
    this.enterArena(game, group, simArena);
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

  /**
   * The fight ends, behind the transition chosen in the database (Réglages → Sortie de combat): the field is taken
   * down, the map comes back, the event goes on with the result.
   */
  end(result: BattleResult): void {
    if (this.ending) {
      return;
    }
    if (!this.field) {
      this.close(result);
      return;
    }
    this.ending = true;
    const kind = this.outKind ?? this.transitions.kindFor("fightOut");
    this.transitions.through(kind, () => {
      this.ending = false;
      this.close(result);
    });
  }

  /**
   * The fight's arena, if it has one (the group's, the map's, the dungeon's, the settings': arenaFor), shown in
   * place of the map; the player's sprite, which is the middle of the fight, is put on its arrival point.
   */
  private enterArena(game: Game, group: DbGroup, chosen?: string): void {
    const mapHelper = game.mapHelper;
    const player = mapHelper?.meshes["player"];
    const id =
      chosen === undefined
        ? arenaFor(group, mapHelper!.sceneMap, loadDatabase())
        : chosen;
    const arena = id && id !== ARENA_HERE ? loadMap(id) : null;
    if (!mapHelper || !player || !arena) {
      return;
    }
    this.arenaBack = player.position.clone();
    player.position.copy(mapHelper.showArena(arena));
    // (its shaders and pictures made ready behind the transition: no stutter when it is uncovered)
    game.warmUp();
  }

  /** Back from the arena: the map is seen again, the player where it stood. */
  private leaveArena(): void {
    const mapHelper = this.game?.mapHelper;
    if (!this.arenaBack || !mapHelper) {
      return;
    }
    mapHelper.hideArena();
    mapHelper.meshes["player"]?.position.copy(this.arenaBack);
    this.arenaBack = null;
    mapHelper.updateCameraAim();
  }

  private close(result: BattleResult): void {
    const onEnd = this.onEnd;
    this.field?.dispose();
    this.leaveArena();
    this.field = null;
    this.engine = null;
    this.outcome = null;
    this.onEnd = null;
    this.viewState.set(null);
    if (this.savedParty) {
      restoreParty(this.savedParty);
      this.savedParty = null;
    }
    onEnd?.(result);
  }

  /** Takes the fight down without going on with the event (the event was stopped). */
  cancel(): void {
    this.onEnd = null;
    this.ending = false;
    this.close("lose");
  }

  /** Every frame (the game's render loop): the fight goes on, the sprites animate. */
  update(dt: number): void {
    if (!this.engine || !this.field) {
      return;
    }
    this.engine.update(dt);
    // A team member choosing: the whole fight waits (the gauges, and the actions going on with their animations)
    const choosing =
      this.engine.phase === "command" || this.engine.phase === "target";
    // A skill shown off: only its caster moves
    this.field?.update(choosing ? 0 : dt, this.engine.shown()?.actor);
    this.field?.tick(dt);
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
    field.setAim(engine.phase === "target" ? (aimed ?? null) : null);
    // Aiming a skill with a zone: its circle around the aimed one, the others caught in it
    const radius =
      engine.phase === "target" && aimed
        ? engine.zoneRadius(engine.pending)
        : 0;
    field.setZone(
      radius > 0 ? (aimed?.pos ?? null) : null,
      radius,
      radius > 0 && aimed
        ? engine.caughtWith(engine.pending, aimed).map((f) => f.id)
        : []
    );
    const shown = engine.shown();
    field.setShowcase(shown?.look ?? null, shown?.wide);
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
              level: f.level,
              screen: field.screenPos(f.pos, 14),
              states: f.states.map((s) => s.id),
              plan: this.planOf(f, engine),
              busy:
                !!f.command && (f.gauge > GAUGE_COMMAND || engine.walkingTo(f)),
              resists:
                f.side === "foe"
                  ? Object.entries(f.resists).map(([id, level]) => {
                      const el = db.elements.find((e) => e.id === id);
                      return { name: el?.name ?? id, icon: el?.icon, level };
                    })
                  : [],
            }))
          : [],
      aim: engine.aim,
      aimScreen: aimed ? field.screenPos(aimed.pos, 34) : null,
      // (over their fighter, wherever the camera goes)
      popups: engine.popups.map(({ id, text, kind, color, fighter, line }) => {
        const at = field.screenPos(fighter.pos, 26);
        return { id, text, kind, color, x: at.x, y: at.y - line * 18 };
      }),
      opening:
        this.opening && performance.now() < this.openingUntil
          ? this.opening
          : null,
      showcase: shown?.name ?? null,
      knocked: [...engine.knocked.keys()],
      recovering: engine.recovering(),
      outcome: this.outcome,
      stateLooks: Object.fromEntries(
        db.states.map((s) => [s.id, { name: s.name, color: s.color }])
      ),
    });
  }

  /** A fighter's next action, when decided: « Venin », « Attaque forte »… */
  private planOf(f: Fighter, engine: BattleEngine): string | null {
    const c = f.command;
    if (!c) {
      return null;
    }
    switch (c.kind) {
      case "skill":
        return engine.skill(c.id)?.name ?? null;
      case "item":
        return engine.item(c.id)?.name ?? null;
      case "heavy":
        return "Attaque forte";
      case "defend":
        return "Défense";
      default:
        return "Attaque";
    }
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
