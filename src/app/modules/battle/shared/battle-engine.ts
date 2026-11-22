import {
  DbItem,
  DbSkill,
  GameDatabase,
  SkillEffect,
  SkillTarget,
  STATS,
} from "../../database-editor/shared/database";
import * as THREE from "three";
import { SheetDirection } from "../../database-editor/shared/sprite-sheet";
import { currentParty, giveItem } from "../../database-editor/shared/party";
import { BattleField, facing } from "./battle-field";
import {
  ATTACK_POWER,
  baseAmount,
  enemySkill,
  finalDamage,
  HEAVY_FACTOR,
  isMelee,
} from "./battle-rules";
import { trainedBy } from "./progress";
import {
  BattleResult,
  BattleView,
  Cast,
  Command,
  Fighter,
  GAUGE_COMMAND,
  GAUGE_DECIDE,
  Popup,
} from "./battle-types";

/** Gauge speed while waiting (per second): the slowest fighter, plus up to this for the quickest. */
const WAIT_SPEED = 0.1;
const WAIT_SPEED_SPREAD = 0.12;
/** A skill charges from the command mark to the end in its cast time (s, at least this). */
const MIN_CAST = 0.25;
/** Walking speed (world units per second) and the distance kept from the target when striking. */
const WALK_SPEED = 70;
const REACH = 15;
/** A number shown over a fighter (s), a defeated enemy fading out (s), the pause before the fight ends (s). */
const POPUP_TIME = 1;
/**
 * Interrupting (Grandia's critical hits): a heavy attack landing on a fighter charging its skill (between the command
 * mark and the end) or walking to its target cancels its action and sends it back to the decision mark (2/5);
 * landing earlier on the gauge, it pushes it back a little. A defending fighter is not interrupted. The token
 * flashes for KNOCK_TIME (s).
 */
const DELAY_BACK = 0.12;
const KNOCK_TIME = 0.6;
const FADE_TIME = 0.6;
const END_DELAY = 1.8;
/** An enemy's plain attack is a heavy one this often. */
const ENEMY_HEAVY_CHANCE = 0.2;

/**
 * After acting, a fighter moves to a free spot near where it stands (Grandia style: the field keeps moving): this
 * far from it (world units), at least SPOT_ROOM from the others, within FIELD_RADIUS of the field's middle.
 */
const SPOT_NEAR = { min: 10, max: 26 };
const SPOT_ROOM = 16;
const FIELD_RADIUS = 75;

interface Action {
  actor: Fighter;
  /** Who it walks to (melee), or faces. */
  focus: Fighter;
  melee: boolean;
  step: "go" | "strike" | "move";
  /** Where it goes after acting (its new place). */
  dest?: THREE.Vector3;
}

/** The most hurt first. */
function byHurt(list: Fighter[]): Fighter[] {
  return [...list].sort((a, b) => a.hp / a.hpMax - b.hp / b.hpMax);
}

function pickOne(list: Fighter[]): Fighter | undefined {
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * The fight's rules and timing, Grandia style. Each fighter's gauge fills with its agility. At 2/5 an enemy decides
 * its next action from its behaviour (a spell: it glows). At 4/5 (COM) its states act (poison, sleep…), then a team
 * member chooses what to do (time stops); a skill then charges up to the end in its cast time (the caster gathers
 * it), anything else goes straight to the end. At the end the fighter acts while the others' gauges go on (several
 * actions can play at once): a melee blow walks to the target, a spell or an item is used from where it stands; the
 * effects land on the animation's hit frame; then the fighter moves to a free spot nearby. A heavy attack on a
 * fighter charging or walking to its target cancels its action (back to 2/5). The fight ends when one side has
 * fallen.
 */
export class BattleEngine {
  phase: BattleView["phase"] = "run";
  actor: Fighter | null = null;
  /** Target phase: the command waiting for its target, and on which side it is looked for. */
  pending: Command | null = null;
  targetSide: Fighter["side"] = "foe";
  aim: string | null = null;
  popups: (Popup & { age: number })[] = [];
  /** The actions being played (several at once: the gauges don't wait for them). */
  private actions: Action[] = [];
  private result: BattleResult | null = null;
  private endTimer = 0;
  private endWait = 0;
  private popupId = 0;
  /** Hurt fighters going back to idle, defeated enemies fading out (time since). */
  private readonly hurt = new Set<Fighter>();
  private readonly fading = new Map<Fighter, number>();
  /** What each team member used (element / weapon type id → uses): their levels grow after a victory. */
  readonly uses = new Map<string, Record<string, number>>();
  /** Fighters just interrupted or pushed back (their token flashes), with the time since. */
  readonly knocked = new Map<string, number>();
  private readonly fastest: number;
  /** The middle of the field (the fighters stay around it). */
  private readonly middle: THREE.Vector3;

  constructor(
    readonly fighters: Fighter[],
    private readonly field: BattleField,
    private readonly db: GameDatabase,
    private readonly weather: string,
    private readonly canFlee: boolean,
    private readonly ended: (result: BattleResult) => void
  ) {
    this.fastest = Math.max(1, ...fighters.map((f) => f.stats.agi));
    this.middle = fighters
      .reduce((sum, f) => sum.add(f.home), new THREE.Vector3())
      .divideScalar(Math.max(1, fighters.length));
    // The enemies already past the decision mark decide now
    fighters
      .filter((f) => f.side === "foe" && f.gauge >= GAUGE_DECIDE)
      .forEach((f) => this.decide(f));
  }

  alive(side: Fighter["side"]): Fighter[] {
    return this.fighters.filter((f) => f.side === side && f.hp > 0);
  }

  skill(id: string | undefined): DbSkill | undefined {
    return this.db.skills.find((s) => s.id === id);
  }

  item(id: string | undefined): DbItem | undefined {
    return this.db.items.find((i) => i.id === id);
  }

  /** The spells being gathered, with how far along. */
  casts(): Omit<Cast, "x" | "y">[] {
    return this.fighters
      .filter(
        (f) =>
          f.hp > 0 && f.command?.kind === "skill" && f.gauge > GAUGE_COMMAND
      )
      .map((f) => ({
        id: f.id,
        name: this.skill(f.command?.id)?.name ?? "",
        progress: (f.gauge - GAUGE_COMMAND) / (1 - GAUGE_COMMAND),
      }));
  }

  /** Is the fighter walking to its target (a heavy attack would stop it)? */
  walkingTo(f: Fighter): boolean {
    return this.actions.some((a) => a.actor === f && a.step === "go");
  }

  /** Is the fighter playing an action now? */
  acting(f: Fighter): boolean {
    return this.actions.some((a) => a.actor === f);
  }

  update(dt: number): void {
    this.updateLooks(dt);
    switch (this.phase) {
      case "run": {
        this.runGauges(dt);
        this.stepActions(dt);
        break;
      }
      case "over": {
        // (the ones still acting finish, moving to their new place)
        this.stepActions(dt);
        this.endTimer += dt;
        if (this.endTimer >= this.endWait && this.result) {
          const result = this.result;
          this.result = null;
          this.ended(result);
        }

        break;
      }
      // No default
    }
  }

  // ---------- The team's choices ----------

  /** The team member whose turn it is: attack, heavy attack (then a target), defend, flee. */
  choose(kind: "attack" | "heavy" | "defend" | "flee"): void {
    if (this.phase !== "command" || !this.actor) {
      return;
    }
    if (kind === "flee") {
      if (this.canFlee) {
        this.over("flee", 0.3);
      }
      return;
    }
    if (kind === "attack" || kind === "heavy") {
      this.askTarget({ kind }, "foe");
      return;
    }
    this.commit({ kind });
  }

  /** A skill: its target asked when it aims at one fighter. */
  chooseSkill(id: string): void {
    const skill = this.skill(id);
    const actor = this.actor;
    if (this.phase !== "command" || !actor || !skill || actor.mp < skill.mp) {
      return;
    }
    this.chooseFor({ kind: "skill", id }, skill.target);
  }

  /** An item of the team's: its target asked when it aims at one fighter. */
  chooseItem(id: string): void {
    const item = this.item(id);
    if (this.phase !== "command" || !item || !(currentParty().items[id] > 0)) {
      return;
    }
    this.chooseFor({ kind: "item", id }, item.target ?? "ally");
  }

  aimAt(id: string): void {
    if (this.phase === "target") {
      this.aim = id;
    }
  }

  /** The next / previous one under the aim. */
  moveAim(step: number): void {
    const list = this.alive(this.targetSide);
    const at = list.findIndex((f) => f.id === this.aim);
    if (list.length > 0) {
      this.aim = list[(at + step + list.length) % list.length].id;
    }
  }

  confirmTarget(id = this.aim): void {
    if (this.phase === "target" && this.pending && id) {
      this.commit({ ...this.pending, target: id });
    }
  }

  /** Back from the target to the commands. */
  back(): void {
    if (this.phase === "target") {
      this.phase = "command";
      this.pending = null;
      this.aim = null;
    }
  }

  private chooseFor(command: Command, target: SkillTarget): void {
    if (target === "enemy") {
      this.askTarget(command, "foe");
    } else if (target === "ally") {
      this.askTarget(command, "team");
    } else {
      this.commit(command);
    }
  }

  private askTarget(command: Command, side: Fighter["side"]): void {
    this.phase = "target";
    this.pending = command;
    this.targetSide = side;
    // An ally: the most hurt first; an enemy: the first one
    const list = this.alive(side);
    this.aim = (side === "team" ? byHurt(list) : list)[0]?.id ?? null;
  }

  private commit(command: Command): void {
    const actor = this.actor;
    if (!actor) {
      return;
    }
    actor.command = command;
    this.phase = "run";
    this.actor = null;
    this.pending = null;
    this.aim = null;
    this.startCharge(actor);
  }

  /** The skill of a command (none: an attack, an item, defending). */
  private chargeTime(command: Command | null): number {
    return command?.kind === "skill" ? (this.skill(command.id)?.cast ?? 0) : 0;
  }

  /** From the command mark: a skill with a cast time charges (its caster gathers it); anything else acts at once. */
  private startCharge(f: Fighter): void {
    const skill = f.command?.kind === "skill" ? this.skill(f.command.id) : null;
    if (this.chargeTime(f.command) > 0) {
      if (skill && !isMelee(skill)) {
        this.field.play(f.id, "cast", this.restDir(f));
      }
      return;
    }
    f.gauge = 1;
    this.act(f);
  }

  /** An enemy at the decision mark chooses its next action; a spell makes it glow. */
  private decide(f: Fighter): void {
    f.command = this.enemyCommand(f);
    const skill = f.command.kind === "skill" ? this.skill(f.command.id) : null;
    this.field.glow(f.id, !!skill && !isMelee(skill));
  }

  // ---------- Time ----------

  private runGauges(dt: number): void {
    for (const f of this.fighters) {
      if (f.hp <= 0 || this.acting(f)) {
        continue;
      }
      if (f.gauge < GAUGE_COMMAND) {
        const agility = Math.max(1, f.stats.agi);
        const speed = WAIT_SPEED + (WAIT_SPEED_SPREAD * agility) / this.fastest;
        const before = f.gauge;
        f.gauge = Math.min(GAUGE_COMMAND, f.gauge + dt * speed);
        if (
          f.side === "foe" &&
          before < GAUGE_DECIDE &&
          f.gauge >= GAUGE_DECIDE
        ) {
          this.decide(f);
        }
        if (f.gauge >= GAUGE_COMMAND) {
          this.turn(f);
          if (this.phase !== "run") {
            return;
          }
        }
      } else if (f.command) {
        const cast = Math.max(MIN_CAST, this.chargeTime(f.command));
        f.gauge = Math.min(1, f.gauge + (dt * (1 - GAUGE_COMMAND)) / cast);
        if (f.gauge >= 1) {
          this.act(f);
        }
      }
    }
  }

  /** A fighter reaches the command mark: its states act, then the team chooses, an enemy decides. */
  private turn(f: Fighter): void {
    f.defending = false;
    if (!this.statesAct(f)) {
      return;
    }
    if (f.side === "team") {
      this.phase = "command";
      this.actor = f;
      return;
    }
    if (!f.command) {
      this.decide(f);
    }
    this.startCharge(f);
  }

  /** States and boosts at the start of a turn (true: it may act; false: it lost its turn or fell). */
  private statesAct(f: Fighter): boolean {
    let skip = false;
    for (const s of f.states) {
      const state = this.db.states.find((x) => x.id === s.id);
      if (!state) {
        continue;
      }
      let skipped = false;
      for (const e of state.effects) {
        if (e.kind === "hp" && e.percent) {
          this.changeHp(
            f,
            Math.round((f.hpMax * e.percent) / 100),
            0,
            state.color
          );
        } else if (e.kind === "mp" && e.percent) {
          const delta = Math.round((f.mpMax * e.percent) / 100);
          f.mp = Math.min(f.mpMax, Math.max(0, f.mp + delta));
        } else if (e.kind === "skip" && Math.random() * 100 < e.chance) {
          skipped = true;
        }
      }
      if (skipped) {
        skip = true;
        this.popup(f, state.name, "state", 1, state.color);
      }
      if (s.turns > 0) {
        s.turns--;
        if (s.turns === 0) {
          f.states = f.states.filter((x) => x !== s);
        }
      }
    }
    for (const b of f.boosts) {
      b.turns--;
    }
    f.boosts = f.boosts.filter((b) => b.turns > 0);
    if (f.hp <= 0) {
      return false;
    }
    if (skip) {
      f.gauge = 0;
      f.command = null;
      this.field.glow(f.id, false);
      return false;
    }
    return true;
  }

  private enemyCommand(f: Fighter): Command {
    const skill = enemySkill(f, this.weather, this.db);
    if (skill) {
      const helps = skill.target === "ally" || skill.target === "allies";
      const target = helps
        ? byHurt(this.alive("foe"))[0]
        : pickOne(this.alive("team"));
      return { kind: "skill", id: skill.id, target: target?.id };
    }
    return {
      kind: Math.random() < ENEMY_HEAVY_CHANCE ? "heavy" : "attack",
      target: pickOne(this.alive("team"))?.id,
    };
  }

  // ---------- Acting ----------

  /** A fighter reaches the action mark: it acts (the others wait). */
  private act(f: Fighter): void {
    this.field.glow(f.id, false);
    const command = f.command;
    if (!command || command.kind === "defend" || command.kind === "flee") {
      f.defending = command?.kind === "defend";
      if (f.defending) {
        this.popup(f, "Défense", "info");
      }
      this.done(f);
      return;
    }
    const skill = command.kind === "skill" ? this.skill(command.id) : undefined;
    const item = command.kind === "item" ? this.item(command.id) : undefined;
    if (skill && f.mp < skill.mp) {
      this.popup(f, "PM insuffisants", "info");
      this.done(f);
      return;
    }
    if (item && !(currentParty().items[item.id] > 0)) {
      this.popup(f, `Plus de ${item.name}`, "info");
      this.done(f);
      return;
    }
    const targets = this.targetsOf(f, command);
    if (targets.length === 0) {
      this.done(f);
      return;
    }
    if (f.side === "team") {
      this.recordUse(f, command, skill);
    }
    if (skill) {
      f.mp -= skill.mp;
      this.popup(f, skill.name, "info", 1.6);
    }
    if (item) {
      giveItem(item.id, -1);
      this.popup(f, item.name, "info", 1.6);
    }
    const melee =
      command.kind === "attack" ||
      command.kind === "heavy" ||
      (!!skill && isMelee(skill));
    const focus = targets[0];
    this.actions = [
      ...this.actions,
      { actor: f, focus, melee, step: melee ? "go" : "strike" },
    ];
    if (melee) {
      this.field.play(f.id, "walk", facing(f.pos, focus.pos));
    } else {
      const anim = item ? "attack" : "magic";
      this.field.play(f.id, anim, facing(f.pos, focus.pos), true);
    }
  }

  /** A team member's action trains its levels: a skill's, or its weapon type for the attacks. */
  private recordUse(f: Fighter, command: Command, skill?: DbSkill): void {
    let trained: string[] = [];
    if (skill) {
      trained = trainedBy(skill, this.db, f.weaponType);
    } else if (command.kind === "attack" || command.kind === "heavy") {
      trained = f.weaponType ? [f.weaponType] : [];
    }
    const used = this.uses.get(f.id) ?? {};
    for (const id of trained) {
      used[id] = (used[id] ?? 0) + 1;
    }
    this.uses.set(f.id, used);
  }

  /** What a command aims at (a skill's or an item's target setting; the attacks: one enemy). */
  private targetKind(command: Command): SkillTarget {
    if (command.kind === "skill") {
      return this.skill(command.id)?.target ?? "enemy";
    }
    if (command.kind === "item") {
      return this.item(command.id)?.target ?? "ally";
    }
    return "enemy";
  }

  /** Who a command lands on now (a single target fallen meanwhile: another one of its side). */
  private targetsOf(f: Fighter, command: Command): Fighter[] {
    const target = this.targetKind(command);
    const own = f.side;
    const other = own === "team" ? "foe" : "team";
    if (target === "self") {
      return [f];
    }
    if (target === "enemies") {
      return this.alive(other);
    }
    if (target === "allies") {
      return this.alive(own);
    }
    const side = target === "ally" ? own : other;
    const chosen = this.fighters.find((x) => x.id === command.target);
    if (chosen && chosen.hp > 0 && chosen.side === side) {
      return [chosen];
    }
    const other1 = pickOne(this.alive(side));
    return other1 ? [other1] : [];
  }

  private stepActions(dt: number): void {
    for (const a of this.actions) {
      this.stepAction(a, dt);
    }
  }

  /**
   * One action going on: walking to the target (melee), the blow or the spell (its effects on the hit frame),
   * moving to a free spot nearby. A fighter hit while walking stops for its « hit taken » animation.
   */
  private stepAction(a: Action, dt: number): void {
    const { actor } = a;
    if (this.hurt.has(actor) && a.step !== "strike") {
      return;
    }
    if (a.step === "go") {
      // Its target fell on the way: another one of that side, or back home
      if (a.focus.hp <= 0) {
        const next = pickOne(this.alive(a.focus.side));
        if (!next) {
          this.walkBack(a);
          return;
        }
        a.focus = next;
        if (actor.command) {
          actor.command = { ...actor.command, target: next.id };
        }
        this.field.play(actor.id, "walk", facing(actor.pos, next.pos));
      }
      // Up to the target, keeping a little distance (on its side facing the actor)
      const dest = a.focus.pos
        .clone()
        .add(actor.home.clone().sub(a.focus.pos).setY(0).setLength(REACH));
      if (this.walk(actor, dest, dt)) {
        a.step = "strike";
        const anim = actor.command?.kind === "attack" ? "attack" : "heavy";
        this.field.play(actor.id, anim, facing(actor.pos, a.focus.pos), true);
      }
    } else if (a.step === "strike") {
      if (this.field.consumeHit(actor.id)) {
        this.land(actor);
      }
      if (this.field.finished(actor.id)) {
        this.walkBack(a);
      }
    } else if (this.walk(actor, a.dest ?? actor.home, dt)) {
      // Its new place, from where it will start next time
      actor.home = actor.pos.clone();
      this.done(actor);
    }
  }

  /** The action played: off to a free spot nearby. */
  private walkBack(a: Action): void {
    a.step = "move";
    a.dest = this.freeSpot(a.actor);
    this.field.play(a.actor.id, "walk", facing(a.actor.pos, a.dest));
  }

  /** A random spot near the fighter, away from the others, inside the field (the best of a few tries). */
  private freeSpot(f: Fighter): THREE.Vector3 {
    const others = this.fighters.filter((x) => x !== f && x.hp > 0);
    let best = f.pos.clone();
    let bestRoom = -1;
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist =
        SPOT_NEAR.min + Math.random() * (SPOT_NEAR.max - SPOT_NEAR.min);
      const spot = f.pos
        .clone()
        .add(
          new THREE.Vector3(Math.cos(angle) * dist, 0, Math.sin(angle) * dist)
        );
      // Kept inside the field
      const off = spot.clone().sub(this.middle).setY(0);
      if (off.length() > FIELD_RADIUS) {
        spot.sub(off.setLength(off.length() - FIELD_RADIUS));
      }
      const room = Math.min(
        ...others.map((x) => {
          const there = this.actions.find((a) => a.actor === x)?.dest ?? x.pos;
          return Math.hypot(there.x - spot.x, there.z - spot.z);
        }),
        Infinity
      );
      if (room > bestRoom) {
        best = spot;
        bestRoom = room;
      }
      if (room >= SPOT_ROOM) {
        break;
      }
    }
    return best;
  }

  /** One step towards a point; true once there. */
  private walk(
    f: Fighter,
    dest: { x: number; z: number },
    dt: number
  ): boolean {
    const dx = dest.x - f.pos.x;
    const dz = dest.z - f.pos.z;
    const dist = Math.hypot(dx, dz);
    const step = WALK_SPEED * dt;
    if (dist <= step) {
      f.pos.x = dest.x;
      f.pos.z = dest.z;
      this.field.place(f);
      return true;
    }
    f.pos.x += (dx / dist) * step;
    f.pos.z += (dz / dist) * step;
    this.field.place(f);
    return false;
  }

  /** The hit frame: the command's effects on each of its targets. */
  private land(actor: Fighter): void {
    const command = actor.command;
    if (!command) {
      return;
    }
    for (const target of this.targetsOf(actor, command)) {
      if (command.kind === "attack" || command.kind === "heavy") {
        const amount =
          baseAmount(actor, target, "str", ATTACK_POWER, true, this.db) *
          (command.kind === "heavy" ? HEAVY_FACTOR : 1);
        this.hit(
          actor,
          target,
          amount,
          actor.attackElement,
          0,
          command.kind === "heavy"
        );
        continue;
      }
      const skill = this.skill(command.id);
      const effects = skill?.effects ?? this.item(command.id)?.effects ?? [];
      let line = 0;
      for (const e of effects) {
        line = this.applyEffect(actor, target, e, skill, line);
      }
    }
  }

  /** One effect of a skill or an item on a target; returns the next popup line. */
  private applyEffect(
    actor: Fighter,
    target: Fighter,
    e: SkillEffect,
    skill: DbSkill | undefined,
    line: number
  ): number {
    if (target.hp <= 0) {
      return line;
    }
    switch (e.kind) {
      case "damage": {
        const amount = baseAmount(
          actor,
          target,
          e.stat,
          e.power,
          true,
          this.db,
          skill?.formula
        );
        this.hit(actor, target, amount, skill?.element ?? "", line);
        return line + 1;
      }
      case "heal": {
        const amount = Math.round(
          baseAmount(
            actor,
            target,
            "mag",
            e.power,
            false,
            this.db,
            skill?.formula
          )
        );
        if (e.resource === "hp") {
          this.changeHp(target, amount, line);
        } else {
          target.mp = Math.min(target.mpMax, target.mp + amount);
          this.popup(target, `${amount} PM`, "heal", line);
        }
        return line + 1;
      }
      case "addState": {
        const state = this.db.states.find((s) => s.id === e.state);
        const has = target.states.some((s) => s.id === e.state);
        if (state && !has && Math.random() * 100 < e.chance) {
          target.states = [
            ...target.states,
            { id: state.id, turns: state.turns },
          ];
          this.popup(target, state.name, "state", line, state.color);
          return line + 1;
        }
        return line;
      }
      case "removeState": {
        if (target.states.some((s) => s.id === e.state)) {
          target.states = target.states.filter((s) => s.id !== e.state);
          this.popup(target, "Guéri", "heal", line);
          return line + 1;
        }
        return line;
      }
      case "stat": {
        target.boosts = [
          ...target.boosts,
          { stat: e.stat, percent: e.percent, turns: e.turns },
        ];
        const label = STATS.find((s) => s.id === e.stat)?.label ?? e.stat;
        const sign = e.percent > 0 ? "+" : "−";
        this.popup(
          target,
          `${label} ${sign}${Math.abs(e.percent)} %`,
          "info",
          line
        );
        return line + 1;
      }
      default:
        // (a stat raised for good, element experience: outside fights)
        return line;
    }
  }

  /** Damage of an element on a target: resistances, weather, defending; absorbed: it heals. */
  private hit(
    actor: Fighter,
    target: Fighter,
    amount: number,
    element: string,
    line: number,
    interrupts = false
  ): void {
    const damage = finalDamage(
      amount,
      actor,
      target,
      element,
      this.weather,
      this.db
    );
    if (damage === 0) {
      this.popup(target, "Sans effet", "info", line);
      return;
    }
    this.changeHp(target, -damage, line);
    if (damage < 0) {
      return;
    }
    // Hit: the states that end on a hit (sleep) end
    target.states = target.states.filter(
      (s) => !this.db.states.find((x) => x.id === s.id)?.endsOnHit
    );
    if (target.hp > 0) {
      // (a fighter in the middle of its own blow finishes it)
      const striking = this.actions.some(
        (a) => a.actor === target && a.step === "strike"
      );
      if (!striking) {
        this.field.play(target.id, "hurt", facing(target.pos, actor.pos), true);
        this.hurt.add(target);
      }
      if (interrupts && !target.defending) {
        this.interrupt(target, line + 1);
      }
    }
  }

  /** A heavy blow: the target's action cancelled (between command and action), else its turn pushed back. */
  private interrupt(target: Fighter, line: number): void {
    const command = target.command;
    const action = this.actions.find((a) => a.actor === target);
    const charging = !!command && !action && target.gauge > GAUGE_COMMAND;
    const walking = action?.step === "go";
    if (command && (charging || walking)) {
      const name =
        command.kind === "skill"
          ? (this.skill(command.id)?.name ?? "Action")
          : this.commandName(command);
      // Its action stops; it stays where it is, back at the decision mark
      this.actions = this.actions.filter((a) => a.actor !== target);
      target.home = target.pos.clone();
      target.command = null;
      target.gauge = GAUGE_DECIDE;
      this.field.glow(target.id, false);
      this.popup(target, `Interruption : ${name}`, "cancel", line);
      if (target.side === "foe") {
        this.decide(target);
      }
    } else if (!action && target.gauge < GAUGE_COMMAND) {
      target.gauge = Math.max(0, target.gauge - DELAY_BACK);
      this.popup(target, "Retardé", "info", line);
    } else {
      return;
    }
    this.knocked.set(target.id, 0);
  }

  private commandName(command: Command): string {
    if (command.kind === "item") {
      return this.item(command.id)?.name ?? "Objet";
    }
    return command.kind === "heavy" ? "Attaque forte" : "Attaque";
  }

  /** PV gained (+) or lost (−), shown; at 0 the fighter falls. */
  private changeHp(
    f: Fighter,
    delta: number,
    line: number,
    color?: string
  ): void {
    if (delta === 0 || f.hp <= 0) {
      return;
    }
    f.hp = Math.min(f.hpMax, Math.max(0, f.hp + delta));
    this.popup(
      f,
      String(Math.abs(delta)),
      delta > 0 ? "heal" : "damage",
      line,
      color
    );
    if (f.hp <= 0) {
      f.states = [];
      f.command = null;
      // Fallen while acting: its action stops there
      this.actions = this.actions.filter((a) => a.actor !== f);
      this.field.glow(f.id, false);
      this.field.play(f.id, "death", undefined, true);
      this.hurt.delete(f);
      if (f.side === "foe") {
        this.fading.set(f, 0);
      }
    }
  }

  /** The fighter's turn is over: its gauge starts again, back to its usual stance; one side down: the end. */
  private done(f: Fighter): void {
    this.actions = this.actions.filter((a) => a.actor !== f);
    f.gauge = 0;
    f.command = null;
    if (f.hp > 0) {
      this.field.play(f.id, "idle", this.restDir(f));
    }
    if (this.phase === "run") {
      this.checkEnd();
    }
  }

  private checkEnd(): void {
    if (this.alive("foe").length === 0) {
      this.over("win", END_DELAY);
    } else if (this.alive("team").length === 0) {
      this.over("lose", END_DELAY);
    }
  }

  /** The fight ends, `wait` seconds later (the event goes on with the result). */
  private over(result: BattleResult, wait: number): void {
    this.phase = "over";
    this.actor = null;
    this.result = result;
    this.endTimer = 0;
    this.endWait = wait;
  }

  /** The hit taken: back to walking (on its way), to its spell, or to idle. */
  private afterHurt(f: Fighter): void {
    const a = this.actions.find((x) => x.actor === f);
    if (a && a.step === "go") {
      this.field.play(f.id, "walk", facing(f.pos, a.focus.pos));
    } else if (a && a.step === "move") {
      this.field.play(f.id, "walk", facing(f.pos, a.dest ?? f.home));
    } else if (f.command?.kind === "skill" && f.gauge > GAUGE_COMMAND) {
      this.field.play(f.id, "cast", this.restDir(f));
    } else {
      this.field.play(f.id, "idle", this.restDir(f));
    }
  }

  /** At rest: facing the other side (the middle of its standing fighters). */
  private restDir(f: Fighter): SheetDirection {
    const other = this.alive(f.side === "team" ? "foe" : "team");
    if (other.length === 0) {
      return f.side === "team" ? "ne" : "sw";
    }
    const center = other
      .reduce((sum, x) => sum.add(x.pos), new THREE.Vector3())
      .divideScalar(other.length);
    return facing(f.pos, center);
  }

  /** Hurt fighters back to idle (or to their spell) once the hit is taken; the defeated fading out; the numbers. */
  private updateLooks(dt: number): void {
    for (const f of this.hurt) {
      if (this.field.finished(f.id)) {
        this.hurt.delete(f);
        this.afterHurt(f);
      }
    }
    for (const [f, t] of this.fading) {
      if (!this.field.finished(f.id)) {
        continue;
      }
      const next = t + dt;
      this.fading.set(f, next);
      this.field.fade(f.id, Math.max(0, 1 - next / FADE_TIME));
    }
    for (const p of this.popups) {
      p.age += dt;
    }
    for (const [id, age] of this.knocked) {
      if (age + dt >= KNOCK_TIME) {
        this.knocked.delete(id);
      } else {
        this.knocked.set(id, age + dt);
      }
    }
    this.popups = this.popups.filter((p) => p.age < POPUP_TIME);
    // A fighter fallen to a state (poison) between two actions: the end may come
    if (this.phase === "run") {
      this.checkEnd();
    }
  }

  private popup(
    f: Fighter,
    text: string,
    kind: Popup["kind"],
    line = 0,
    color?: string
  ): void {
    const at = this.field.screenPos(f.pos, 26);
    this.popups = [
      ...this.popups,
      {
        id: ++this.popupId,
        text,
        kind,
        color,
        x: at.x,
        y: at.y - line * 18,
        age: 0,
      },
    ];
  }
}
