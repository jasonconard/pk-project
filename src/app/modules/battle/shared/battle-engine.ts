import { SheetDirection } from "../../database-editor/shared/sprite-sheet";
import { BattleField, facing } from "./battle-field";
import {
  BattleResult,
  BattleView,
  CommandKind,
  Fighter,
  GAUGE_COMMAND,
  Popup,
} from "./battle-types";

/** Gauge speed while waiting (per second): the slowest fighter, plus up to this for the quickest. */
const WAIT_SPEED = 0.1;
const WAIT_SPEED_SPREAD = 0.12;
/** Gauge speed from the command to the action (per second): a heavy attack takes longer to come. */
const COMMAND_SPEED: Record<CommandKind, number> = {
  attack: 0.6,
  heavy: 0.22,
  defend: 3,
  flee: 1,
};
/** Walking speed (world units per second) and the distance kept from the target when striking. */
const WALK_SPEED = 70;
const REACH = 15;
/** A heavy attack's damage, compared to an attack. */
const HEAVY_FACTOR = 1.6;
/** A number shown over a fighter (s), a defeated enemy fading out (s), the pause before the fight ends (s: the
last one's fall seen). */
const POPUP_TIME = 1;
const FADE_TIME = 0.6;
const END_DELAY = 1.8;

interface Action {
  actor: Fighter;
  target: Fighter;
  step: "go" | "strike" | "back";
}

/**
 * The fight's rules and timing, Grandia style. Each fighter's gauge fills with its agility; at the command mark a
 * team member chooses what to do (time stops), an enemy decides alone; the command then fills up to the action
 * mark (a heavy attack more slowly) and the fighter acts, alone while the others' gauges stop: it walks to its
 * target, the blow lands on its animation's hit frame, it walks back. The fight ends when one side has fallen.
 */
export class BattleEngine {
  phase: BattleView["phase"] = "run";
  actor: Fighter | null = null;
  pending: CommandKind | null = null;
  aim: string | null = null;
  popups: (Popup & { age: number })[] = [];
  private action: Action | null = null;
  private result: BattleResult | null = null;
  private endTimer = 0;
  private endWait = 0;
  private popupId = 0;
  /** Hurt fighters going back to idle, defeated ones fading out (time since). */
  private readonly hurt = new Set<Fighter>();
  private readonly fading = new Map<Fighter, number>();
  private readonly fastest: number;

  constructor(
    readonly fighters: Fighter[],
    private readonly field: BattleField,
    private readonly canFlee: boolean,
    private readonly ended: (result: BattleResult) => void
  ) {
    this.fastest = Math.max(1, ...fighters.map((f) => f.agility));
  }

  alive(side: Fighter["side"]): Fighter[] {
    return this.fighters.filter((f) => f.side === side && f.hp > 0);
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

  /** The team member whose turn it is chooses a command. */
  choose(kind: CommandKind): void {
    const actor = this.actor;
    if (this.phase !== "command" || !actor) {
      return;
    }
    if (kind === "flee") {
      if (this.canFlee) {
        this.over("flee", 0.3);
      }
      return;
    }
    if (kind === "attack" || kind === "heavy") {
      this.phase = "target";
      this.pending = kind;
      this.aim = this.alive("foe")[0]?.id ?? null;
      return;
    }
    actor.command = { kind };
    this.resume();
  }

  /** Target phase: the enemy under the aim (arrow keys, a hovered name). */
  aimAt(id: string): void {
    if (this.phase === "target") {
      this.aim = id;
    }
  }

  /** The next / previous enemy under the aim. */
  moveAim(step: number): void {
    const foes = this.alive("foe");
    const at = foes.findIndex((f) => f.id === this.aim);
    if (foes.length > 0) {
      this.aim = foes[(at + step + foes.length) % foes.length].id;
    }
  }

  /** The attack goes to the enemy under the aim (or the one given). */
  confirmTarget(id = this.aim): void {
    const actor = this.actor;
    if (this.phase !== "target" || !actor || !this.pending || !id) {
      return;
    }
    actor.command = { kind: this.pending, target: id };
    this.resume();
  }

  /** Back from the target to the commands. */
  back(): void {
    if (this.phase === "target") {
      this.phase = "command";
      this.pending = null;
      this.aim = null;
    }
  }

  private resume(): void {
    this.phase = "run";
    this.actor = null;
    this.pending = null;
    this.aim = null;
  }

  private runGauges(dt: number): void {
    for (const f of this.fighters) {
      if (f.hp <= 0) {
        continue;
      }
      if (f.gauge < GAUGE_COMMAND) {
        const speed =
          WAIT_SPEED + (WAIT_SPEED_SPREAD * f.agility) / this.fastest;
        f.gauge = Math.min(GAUGE_COMMAND, f.gauge + dt * speed);
        if (f.gauge >= GAUGE_COMMAND) {
          this.turn(f);
          return;
        }
      } else if (f.command) {
        f.gauge = Math.min(1, f.gauge + dt * COMMAND_SPEED[f.command.kind]);
        if (f.gauge >= 1) {
          this.act(f);
          return;
        }
      }
    }
  }

  /** A fighter reaches the command mark: the team chooses, an enemy decides. */
  private turn(f: Fighter): void {
    f.defending = false;
    if (f.side === "team") {
      this.phase = "command";
      this.actor = f;
      return;
    }
    const targets = this.alive("team");
    const target = targets[Math.floor(Math.random() * targets.length)];
    f.command = target
      ? { kind: Math.random() < 0.25 ? "heavy" : "attack", target: target.id }
      : { kind: "defend" };
  }

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
    // The target fell meanwhile: another one of its side
    let target = this.fighters.find((x) => x.id === command.target);
    if (!target || target.hp <= 0) {
      const others = this.alive(f.side === "team" ? "foe" : "team");
      target = others[Math.floor(Math.random() * others.length)];
    }
    if (!target) {
      this.done(f);
      return;
    }
    this.phase = "act";
    this.actor = f;
    this.action = { actor: f, target, step: "go" };
    this.field.play(f.id, "walk", facing(f.pos, target.pos));
  }

  private stepAction(dt: number): void {
    const a = this.action;
    if (!a) {
      this.phase = "run";
      return;
    }
    const { actor, target } = a;
    if (a.step === "go") {
      // Up to the target, keeping a little distance (on its side facing the actor)
      const dest = target.pos
        .clone()
        .add(actor.home.clone().sub(target.pos).setY(0).setLength(REACH));
      if (this.walk(actor, dest, dt)) {
        a.step = "strike";
        const kind = actor.command?.kind === "heavy" ? "heavy" : "attack";
        this.field.play(actor.id, kind, facing(actor.pos, target.pos), true);
      }
    } else if (a.step === "strike") {
      if (this.field.consumeHit(actor.id)) {
        this.strike(actor, target);
      }
      if (this.field.finished(actor.id)) {
        a.step = "back";
        this.field.play(actor.id, "walk", facing(actor.pos, actor.home));
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

  private strike(actor: Fighter, target: Fighter): void {
    if (target.hp <= 0) {
      return;
    }
    const heavy = actor.command?.kind === "heavy";
    let damage =
      Math.max(1, actor.strength * 2 - target.endurance) *
      (heavy ? HEAVY_FACTOR : 1) *
      (0.9 + Math.random() * 0.2);
    if (target.defending) {
      damage /= 2;
    }
    const hit = Math.max(1, Math.round(damage));
    target.hp = Math.max(0, target.hp - hit);
    this.popup(target, String(hit), "damage");
    const dir = facing(target.pos, actor.pos);
    if (target.hp <= 0) {
      this.field.play(target.id, "death", dir, true);
      this.fading.set(target, 0);
      this.hurt.delete(target);
    } else {
      this.field.play(target.id, "hurt", dir, true);
      this.hurt.add(target);
    }
  }

  /** The fighter's turn is over: its gauge starts again, back to its usual stance; one side down: the end. */
  private done(f: Fighter): void {
    f.gauge = 0;
    f.command = null;
    this.field.play(f.id, "idle", this.restDir(f));
    this.phase = "run";
    this.actor = null;
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

  /** Hurt fighters back to idle once the hit is taken; the defeated fading out; the numbers rising. */
  private updateLooks(dt: number): void {
    for (const f of this.hurt) {
      if (this.field.finished(f.id)) {
        this.hurt.delete(f);
        this.field.play(f.id, "idle", this.restDir(f));
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
    this.popups = this.popups.filter((p) => p.age < POPUP_TIME);
  }

  private popup(f: Fighter, text: string, kind: Popup["kind"]): void {
    const at = this.field.screenPos(f.pos, 26);
    this.popups = [
      ...this.popups,
      { id: ++this.popupId, text, kind, x: at.x, y: at.y, age: 0 },
    ];
  }
}
