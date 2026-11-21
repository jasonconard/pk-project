import {
  DbItem,
  DbSkill,
  GameDatabase,
  SkillEffect,
  SkillTarget,
  STATS,
} from "../../database-editor/shared/database";
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
  CommandKind,
  Fighter,
  GAUGE_COMMAND,
  Popup,
} from "./battle-types";

/** Gauge speed while waiting (per second): the slowest fighter, plus up to this for the quickest. */
const WAIT_SPEED = 0.1;
const WAIT_SPEED_SPREAD = 0.12;
/** Gauge speed from the command to the action (per second); a skill: its cast time (s) over that stretch. */
const COMMAND_SPEED: Record<CommandKind, number> = {
  attack: 0.6,
  heavy: 0.22,
  skill: 1,
  item: 1,
  defend: 3,
  flee: 1,
};
const MIN_CAST = 0.25;
/** Walking speed (world units per second) and the distance kept from the target when striking. */
const WALK_SPEED = 70;
const REACH = 15;
/** A number shown over a fighter (s), a defeated enemy fading out (s), the pause before the fight ends (s). */
const POPUP_TIME = 1;
/**
 * Interrupting (Grandia's critical hits): a heavy attack landing between the command and the action marks cancels
 * the target's action and throws it back this far on the gauge; landing earlier, it only pushes it back a little.
 * A defending fighter is not interrupted. The token flashes for KNOCK_TIME (s).
 */
const CANCEL_BACK = 0.45;
const DELAY_BACK = 0.12;
const KNOCK_TIME = 0.6;
const FADE_TIME = 0.6;
const END_DELAY = 1.8;
/** An enemy's plain attack is a heavy one this often. */
const ENEMY_HEAVY_CHANCE = 0.2;

interface Action {
  actor: Fighter;
  /** Who it walks to (melee), or faces. */
  focus: Fighter;
  melee: boolean;
  step: "go" | "strike" | "back";
}

/** The most hurt first. */
function byHurt(list: Fighter[]): Fighter[] {
  return [...list].sort((a, b) => a.hp / a.hpMax - b.hp / b.hpMax);
}

function pickOne(list: Fighter[]): Fighter | undefined {
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * The fight's rules and timing, Grandia style. Each fighter's gauge fills with its agility; at the command mark its
 * states act (poison, sleep…), then a team member chooses what to do (time stops) or an enemy decides from its
 * behaviour; the command fills up to the action mark (a heavy attack, a long spell more slowly: the caster gathers
 * it) and the fighter acts, alone while the others' gauges stop: a melee blow walks to the target and back, a spell
 * or an item is used from where it stands; the effects land on the animation's hit frame. The fight ends when one
 * side has fallen.
 */
export class BattleEngine {
  phase: BattleView["phase"] = "run";
  actor: Fighter | null = null;
  /** Target phase: the command waiting for its target, and on which side it is looked for. */
  pending: Command | null = null;
  targetSide: Fighter["side"] = "foe";
  aim: string | null = null;
  popups: (Popup & { age: number })[] = [];
  private action: Action | null = null;
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

  constructor(
    readonly fighters: Fighter[],
    private readonly field: BattleField,
    private readonly db: GameDatabase,
    private readonly weather: string,
    private readonly canFlee: boolean,
    private readonly ended: (result: BattleResult) => void
  ) {
    this.fastest = Math.max(1, ...fighters.map((f) => f.stats.agi));
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

  update(dt: number): void {
    this.updateLooks(dt);
    switch (this.phase) {
      case "run": {
        this.runGauges(dt);

        break;
      }
      case "act": {
        this.stepAction(dt);

        break;
      }
      case "over": {
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
    this.gather(actor);
    this.phase = "run";
    this.actor = null;
    this.pending = null;
    this.aim = null;
  }

  /** A spell with a cast time: the caster gathers it (incantation) until it acts. */
  private gather(f: Fighter): void {
    const skill = f.command?.kind === "skill" ? this.skill(f.command.id) : null;
    if (skill && skill.cast > 0 && !isMelee(skill)) {
      this.field.play(f.id, "cast", this.restDir(f));
    }
  }

  // ---------- Time ----------

  private runGauges(dt: number): void {
    for (const f of this.fighters) {
      if (f.hp <= 0) {
        continue;
      }
      if (f.gauge < GAUGE_COMMAND) {
        const agility = Math.max(1, f.stats.agi);
        const speed = WAIT_SPEED + (WAIT_SPEED_SPREAD * agility) / this.fastest;
        f.gauge = Math.min(GAUGE_COMMAND, f.gauge + dt * speed);
        if (f.gauge >= GAUGE_COMMAND) {
          this.turn(f);
          return;
        }
      } else if (f.command) {
        f.gauge = Math.min(1, f.gauge + dt * this.commandSpeed(f.command));
        if (f.gauge >= 1) {
          this.act(f);
          return;
        }
      }
    }
  }

  private commandSpeed(command: Command): number {
    if (command.kind === "skill") {
      const cast = this.skill(command.id)?.cast ?? 0;
      return (1 - GAUGE_COMMAND) / Math.max(MIN_CAST, cast);
    }
    return COMMAND_SPEED[command.kind];
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
    f.command = this.enemyCommand(f);
    this.gather(f);
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
    this.phase = "act";
    this.actor = f;
    this.action = { actor: f, focus, melee, step: melee ? "go" : "strike" };
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

  private stepAction(dt: number): void {
    const a = this.action;
    if (!a) {
      this.phase = "run";
      return;
    }
    const { actor, focus } = a;
    if (a.step === "go") {
      // Up to the target, keeping a little distance (on its side facing the actor)
      const dest = focus.pos
        .clone()
        .add(actor.home.clone().sub(focus.pos).setY(0).setLength(REACH));
      if (this.walk(actor, dest, dt)) {
        a.step = "strike";
        const anim = actor.command?.kind === "attack" ? "attack" : "heavy";
        this.field.play(actor.id, anim, facing(actor.pos, focus.pos), true);
      }
    } else if (a.step === "strike") {
      if (this.field.consumeHit(actor.id)) {
        this.land(actor);
      }
      if (this.field.finished(actor.id)) {
        if (a.melee) {
          a.step = "back";
          this.field.play(actor.id, "walk", facing(actor.pos, actor.home));
        } else {
          this.action = null;
          this.done(actor);
        }
      }
    } else if (this.walk(actor, actor.home, dt)) {
      this.action = null;
      this.done(actor);
    }
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
      this.field.play(target.id, "hurt", facing(target.pos, actor.pos), true);
      this.hurt.add(target);
      if (interrupts && !target.defending) {
        this.interrupt(target, line + 1);
      }
    }
  }

  /** A heavy blow: the target's action cancelled (between command and action), else its turn pushed back. */
  private interrupt(target: Fighter, line: number): void {
    const command = target.command;
    if (command && target.gauge > GAUGE_COMMAND) {
      const name =
        command.kind === "skill"
          ? (this.skill(command.id)?.name ?? "Action")
          : this.commandName(command);
      target.command = null;
      target.gauge = Math.max(0, target.gauge - CANCEL_BACK);
      this.popup(target, `Interruption : ${name}`, "cancel", line);
    } else if (target.gauge < GAUGE_COMMAND) {
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
      this.field.play(f.id, "death", undefined, true);
      this.hurt.delete(f);
      if (f.side === "foe") {
        this.fading.set(f, 0);
      }
    }
  }

  /** The fighter's turn is over: its gauge starts again, back to its usual stance; one side down: the end. */
  private done(f: Fighter): void {
    f.gauge = 0;
    f.command = null;
    if (f.hp > 0) {
      this.field.play(f.id, "idle", this.restDir(f));
    }
    this.phase = "run";
    this.actor = null;
    this.checkEnd();
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

  private restDir(f: Fighter): SheetDirection {
    return f.side === "team" ? "ne" : "sw";
  }

  /** Hurt fighters back to idle (or to their spell) once the hit is taken; the defeated fading out; the numbers. */
  private updateLooks(dt: number): void {
    for (const f of this.hurt) {
      if (this.field.finished(f.id)) {
        this.hurt.delete(f);
        const casting = f.command?.kind === "skill" && f.gauge > GAUGE_COMMAND;
        this.field.play(f.id, casting ? "cast" : "idle", this.restDir(f));
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
