import { inject, Service, signal } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { CoreService } from "../../../../core/shared/service/core.service";
import { SceneEvent } from "../model/SceneEvent";
import { SceneEventSequence } from "../model/SceneEventSequence";
import {
  InstructionLog,
  InstructionMessage,
  InstructionTeleport,
  InstructionType,
  InstructionVariable,
  InstructionWait,
} from "../model/SceneEventInstruction";
import {
  currentVariableValues,
  setVariableValue,
} from "../../../variables-editor/shared/variable-values";
import { clampCounter } from "../../../variables-editor/shared/variables";
import { playSound } from "./sfx";
import { conditionsFit, EventContext } from "../model/ObjectEvent";
import { KeyService } from "../../../../core/shared/service/key.service";
import {
  giveItem,
  giveMoney,
  setInTeam,
} from "../../../database-editor/shared/party";
import { loadDatabase } from "../../../database-editor/shared/database-storage";

@Service()
export class SequenceService {
  private readonly coreService = inject(CoreService);
  private readonly keyService = inject(KeyService);

  private sequence: SceneEventSequence | null = null;

  private readonly messageState = signal<InstructionMessage | null>(null);
  /** Message currently displayed to the player, if any. */
  readonly message = this.messageState.asReadonly();

  private readonly teleportSubject = new Subject<InstructionTeleport>();
  /** Emits each teleport instruction; the listener must call `nextSequence()` once done. */
  readonly teleport$: Observable<InstructionTeleport> =
    this.teleportSubject.asObservable();

  private readonly weatherSubject = new Subject<string>();
  /** Emits each weather change asked by an event (WeatherType); the game applies it. */
  readonly weather$: Observable<string> = this.weatherSubject.asObservable();

  /** What the branches of the event being played check (hour, weather, variables now), given by the game. */
  private context: (() => EventContext) | null = null;

  /**
   * The fight being played. The combat doesn't exist yet (docs/idees.md, point 9): the player chooses how it ends,
   * to try the event's branches; a victory gives the loot (shown in a message, then the 'win' branch).
   */
  private fight: { group: string; result?: string } | null = null;

  /** `true` while an event sequence is being played (player inputs are frozen). */
  get isRunning(): boolean {
    return this.sequence !== null;
  }

  launchSequence(event: SceneEvent, context?: () => EventContext): void {
    this.context = context ?? null;
    this.keyService.clearKeys();
    this.sequence = new SceneEventSequence(
      event.instructions.map((i) => ({ ...i }))
    );
    this.nextSequence();
  }

  /** Stops the event being played (opening the map editor): its message closes, the rest is not played. */
  stop(): void {
    this.sequence = null;
    this.fight = null;
    this.messageState.set(null);
  }

  /** Closes the current message and resumes the sequence with the (optional) chosen answer. */
  closeMessage(choiceKey?: string): void {
    this.messageState.set(null);
    const fight = this.fight;
    if (fight) {
      // The loot message closed: the 'win' branch
      if (fight.result) {
        this.fight = null;
        this.nextSequence(fight.result);
        return;
      }
      if (choiceKey === "win") {
        const loot = this.giveLoot(fight.group);
        if (loot) {
          fight.result = "win";
          this.messageState.set({ text: loot });
          return;
        }
      }
      this.fight = null;
    }
    this.nextSequence(choiceKey);
  }

  nextSequence(val?: string): void {
    const sequence = this.sequence;
    if (!sequence) {
      return;
    }
    const instruction = sequence.next(val);
    if (!instruction) {
      this.sequence = null;
      return;
    }
    switch (instruction.type) {
      case InstructionType.LOG:
        this.setLogs(instruction.log);
        break;
      case InstructionType.MESSAGE:
        this.setMessage(instruction.message);
        break;
      case InstructionType.WAIT:
        this.setWait(instruction.wait);
        break;
      case InstructionType.TELEPORT:
        this.setTeleport(instruction.teleport);
        break;
      case InstructionType.VARIABLE:
        this.setVariable(instruction.variable);
        break;
      case InstructionType.WEATHER:
        if (instruction.weather) {
          this.weatherSubject.next(instruction.weather.type);
        }
        this.nextSequence();
        break;
      case InstructionType.SOUND:
        if (instruction.sound) {
          playSound(instruction.sound.id);
        }
        this.nextSequence();
        break;
      case InstructionType.BRANCH: {
        // (the sub-instructions 'then' or 'else' come next)
        const ctx = this.context?.();
        const fits =
          !!ctx &&
          conditionsFit(instruction.branch ?? {}, {
            ...ctx,
            values: currentVariableValues(),
          });
        this.nextSequence(fits ? "then" : "else");
        break;
      }
      case InstructionType.STOP:
        this.sequence = null;
        break;
      case InstructionType.ITEM:
        if (instruction.item) {
          giveItem(instruction.item.id, instruction.item.amount);
        }
        this.nextSequence();
        break;
      case InstructionType.MONEY:
        if (instruction.money) {
          giveMoney(instruction.money.amount);
        }
        this.nextSequence();
        break;
      case InstructionType.PARTY:
        if (instruction.party) {
          setInTeam(instruction.party.id, instruction.party.join);
        }
        this.nextSequence();
        break;
      case InstructionType.FIGHT:
        this.startFight(instruction.fight?.group ?? "");
        break;
      default:
        this.nextSequence();
    }
  }

  /** For now: asks how the fight ends (Victoire, Défaite, and Fuite when the group allows it). */
  private startFight(groupId: string): void {
    const group = loadDatabase().groups.find((g) => g.id === groupId);
    this.fight = { group: groupId };
    this.messageState.set({
      name: "Combat",
      text: `${group?.name ?? "Des ennemis"} ! (Le combat arrive bientôt : choisis comment il se termine.)`,
      choices: [
        { key: "win", text: "Victoire" },
        { key: "lose", text: "Défaite" },
        ...((group?.canFlee ?? true) ? [{ key: "flee", text: "Fuite" }] : []),
      ],
    });
  }

  /** A victory's loot: the enemies' money, and their items by chance. « Victoire ! 16 pièces, Potion. » (null: nothing). */
  private giveLoot(groupId: string): string | null {
    const db = loadDatabase();
    const group = db.groups.find((g) => g.id === groupId);
    if (!group) {
      return null;
    }
    let money = 0;
    const items = new Map<string, number>();
    for (const member of group.members) {
      const enemy = db.enemies.find((e) => e.id === member.enemy);
      money += enemy?.money ?? 0;
      enemy?.drops.forEach((drop) => {
        if (Math.random() * 100 < drop.chance) {
          items.set(drop.item, (items.get(drop.item) ?? 0) + 1);
        }
      });
    }
    if (money) {
      giveMoney(money);
    }
    items.forEach((n, id) => giveItem(id, n));
    const parts = [
      ...(money ? [`${money} pièce${money > 1 ? "s" : ""}`] : []),
      ...[...items].map(
        ([id, n]) =>
          `${db.items.find((i) => i.id === id)?.name ?? "?"}${n > 1 ? ` ×${n}` : ""}`
      ),
    ];
    return parts.length > 0 ? `Victoire ! ${parts.join(", ")}.` : null;
  }

  private setLogs(log: InstructionLog | undefined): void {
    if (log) {
      this.coreService.setLogs(log.text);
    }
    this.nextSequence();
  }

  /** A story variable changes (a counter stays within its bounds; a variable deleted since: nothing). */
  private setVariable(change: InstructionVariable | undefined): void {
    const current = change ? currentVariableValues()[change.id] : undefined;
    if (change && current !== undefined) {
      if (typeof current === "boolean") {
        setVariableValue(change.id, !!change.value);
      } else {
        const value = Number(change.value) || 0;
        setVariableValue(
          change.id,
          clampCounter(change.op === "add" ? current + value : value)
        );
      }
    }
    this.nextSequence();
  }

  private setMessage(msg: InstructionMessage | undefined): void {
    if (!msg) {
      return this.nextSequence();
    }
    this.messageState.set(msg);
  }

  private setWait(wait: InstructionWait | undefined): void {
    if (!wait) {
      return this.nextSequence();
    }
    setTimeout(() => this.nextSequence(), wait.time);
  }

  private setTeleport(teleport: InstructionTeleport | undefined): void {
    if (!teleport) {
      return this.nextSequence();
    }
    this.teleportSubject.next(teleport);
  }
}
