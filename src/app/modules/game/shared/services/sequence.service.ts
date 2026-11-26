import { inject, Service, signal } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { CoreService } from "../../../../core/shared/service/core.service";
import { SceneEvent } from "../model/SceneEvent";
import { SceneEventSequence } from "../model/SceneEventSequence";
import {
  InstructionAnimate,
  InstructionLog,
  SceneEventInstruction,
  InstructionMessage,
  InstructionTeleport,
  InstructionTime,
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
import { conditionsFit, EventContext, portraitSrc } from "../model/ObjectEvent";
import { KeyService } from "../../../../core/shared/service/key.service";
import {
  giveItem,
  giveMoney,
  healTeam,
  setInTeam,
  setTeamHidden,
} from "../../../database-editor/shared/party";
import { BattleService } from "../../../battle/shared/battle.service";
import {
  BattleOpening,
  BattleResult,
} from "../../../battle/shared/battle-types";

import { animationKey, setAnimation } from "../model/model-animations";
import { gainLink, LinkGain } from "../../../database-editor/shared/links";
import { loadDatabase } from "../../../database-editor/shared/database-storage";
/** A time action of an event: the time passes, or stops / goes on again. */
export interface TimeRequest {
  pass?: InstructionTime;
  stop?: boolean;
}

/** Where an event comes from: its map and object, and how long an object's movements last (s). */
export interface EventOrigin {
  map: string;
  object: string;
  durationOf: (objectId: string) => number;
}

/** A teleport's map id leading to a dungeon: `dungeon:<id>`. */
export const DUNGEON_TARGET = "dungeon:";

/** How long the fade to black of a « time passes » lasts (ms). */
export const TIME_FADE_MS = 1100;

@Service()
export class SequenceService {
  private readonly coreService = inject(CoreService);
  private readonly keyService = inject(KeyService);
  private readonly battleService = inject(BattleService);

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

  private readonly timeSubject = new Subject<TimeRequest>();
  /** Emits each time action of an event (time passing, stopped, going on); the game applies it. */
  readonly time$: Observable<TimeRequest> = this.timeSubject.asObservable();

  private readonly linkSubject = new Subject<LinkGain>();
  /** A social link went up (an event): the game shows it. */
  readonly link$: Observable<LinkGain> = this.linkSubject.asObservable();
  /** The player shows a gift to give (an NPC id); the game calls `giftDone` once chosen or not. */
  private readonly giftSubject = new Subject<string>();
  readonly gift$: Observable<string> = this.giftSubject.asObservable();
  /** A shop to open (its id); the game calls `nextSequence()` once the player closes it. */
  private readonly shopSubject = new Subject<string>();
  readonly shop$: Observable<string> = this.shopSubject.asObservable();

  private readonly dungeonSubject = new Subject<SceneEventInstruction>();
  /**
   * A dungeon action (DUNGEON, or a teleport to `dungeon:<id>`): the dungeon puts what follows in the instruction's
   * sub-instructions, then calls `nextSequence()`.
   */
  readonly dungeon$: Observable<SceneEventInstruction> =
    this.dungeonSubject.asObservable();

  private readonly cutsceneSubject = new Subject<string>();
  /** A cutscene of the current map to play (its id); the game calls `nextSequence()` once it ends. */
  readonly cutscene$: Observable<string> = this.cutsceneSubject.asObservable();

  /** A message shown by a cutscene: closing it calls this instead of going on with the event. */
  private messageDone: (() => void) | null = null;

  /** Shows a message outside the event (a cutscene's): `done` once the player closes it. */
  showMessage(msg: InstructionMessage, done: () => void): void {
    this.messageDone = done;
    this.messageState.set(
      msg.pic ? { ...msg, pic: portraitSrc(msg.pic) } : msg
    );
  }

  /** Closes a cutscene's message without going on (the cutscene is skipped). */
  dismissMessage(): void {
    if (this.messageDone) {
      this.messageDone = null;
      this.messageState.set(null);
    }
  }

  /** The gift was given (its link's gain shown) or not: the event goes on. */
  giftDone(gain: LinkGain | null): void {
    if (gain) {
      this.linkSubject.next(gain);
    }
    this.nextSequence();
  }

  /** What the branches of the event being played check (hour, weather, variables now), given by the game. */
  private context: (() => EventContext) | null = null;

  /** Where the event being played comes from (its map and object), for Animer l'objet. */
  private origin: EventOrigin | null = null;

  /** A fight is being played (BattleService: it shows and gives the victory's loot itself). */
  private fight = false;

  /** `true` while an event sequence is being played (player inputs are frozen). */
  get isRunning(): boolean {
    return this.sequence !== null;
  }

  launchSequence(
    event: SceneEvent,
    context?: () => EventContext,
    origin?: EventOrigin
  ): void {
    this.context = context ?? null;
    this.origin = origin ?? null;
    this.keyService.clearKeys();
    this.sequence = new SceneEventSequence(
      event.instructions.map((i) => ({ ...i }))
    );
    this.nextSequence();
  }

  /** Stops the event being played (opening the map editor): its message closes, the rest is not played. */
  stop(): void {
    this.sequence = null;
    this.fight = false;
    this.battleService.cancel();
    this.messageDone = null;
    this.messageState.set(null);
  }

  /** Closes the current message and resumes the sequence with the (optional) chosen answer. */
  closeMessage(choiceKey?: string): void {
    this.messageState.set(null);
    const done = this.messageDone;
    if (done) {
      this.messageDone = null;
      done();
      return;
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
      case InstructionType.HEAL:
        healTeam();
        this.nextSequence();
        break;
      case InstructionType.TIME:
        if (instruction.time) {
          this.timeSubject.next({ pass: instruction.time });
          // (the fade to black and back)
          setTimeout(() => this.nextSequence(), TIME_FADE_MS);
        } else {
          this.nextSequence();
        }
        break;
      case InstructionType.LINK:
        if (instruction.link) {
          const gain = gainLink(
            instruction.link.id,
            instruction.link.points,
            loadDatabase()
          );
          if (gain) {
            this.linkSubject.next(gain);
          }
        }
        this.nextSequence();
        break;
      case InstructionType.GIFT:
        // (the game shows the bag's gifts; giftDone goes on)
        this.giftSubject.next(instruction.gift?.npc ?? "");
        break;
      case InstructionType.SHOP:
        if (instruction.shop?.id) {
          this.shopSubject.next(instruction.shop.id);
        } else {
          this.nextSequence();
        }
        break;
      case InstructionType.TEAM:
        setTeamHidden(instruction.team?.follow === false);
        this.nextSequence();
        break;
      case InstructionType.PLANT:
        // (the seeds window is open: FarmService goes on once one is chosen or none)
        break;
      case InstructionType.TIME_FLOW:
        this.timeSubject.next({ stop: !!instruction.timeFlow?.stop });
        this.nextSequence();
        break;
      case InstructionType.FIGHT:
        this.startFight(
          instruction.fight?.group ?? "",
          instruction.fight?.opening
        );
        break;
      case InstructionType.DUNGEON:
        this.dungeonSubject.next(instruction);
        break;
      case InstructionType.ANIMATE:
        this.animate(instruction.animate);
        break;
      case InstructionType.CUTSCENE:
        if (instruction.cutscene?.id) {
          this.cutsceneSubject.next(instruction.cutscene.id);
        } else {
          this.nextSequence();
        }
        break;
      default:
        this.nextSequence();
    }
  }

  /** The fight against a group; then the event's branch for how it ended (Victoire, Défaite, Fuite). */
  private startFight(groupId: string, opening?: BattleOpening): void {
    this.fight = true;
    this.battleService.start(
      groupId,
      (result) => this.fightEnded(result),
      opening
    );
  }

  private fightEnded(result: BattleResult): void {
    if (!this.fight) {
      return;
    }
    this.fight = false;
    this.nextSequence(result);
  }

  /** An object's movements « Par un événement » played, sent back, looped or stopped (kept: see model-animations). */
  private animate(animate: InstructionAnimate | undefined): void {
    const origin = this.origin;
    const object = animate?.object || origin?.object;
    if (!animate || !origin || !object) {
      this.nextSequence();
      return;
    }
    const drive = (
      { play: "play", back: "rest", loop: "loop", stop: "hold" } as const
    )[animate.mode];
    setAnimation(animationKey(origin.map, object), drive);
    const wait =
      animate.wait && (animate.mode === "play" || animate.mode === "back")
        ? origin.durationOf(object)
        : 0;
    if (wait > 0) {
      setTimeout(() => this.nextSequence(), wait * 1000);
    } else {
      this.nextSequence();
    }
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
    this.messageState.set(
      msg.pic ? { ...msg, pic: portraitSrc(msg.pic) } : msg
    );
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
    // (a passage to a dungeon: its first floor, if it is open)
    if (teleport.map?.startsWith(DUNGEON_TARGET)) {
      this.dungeonSubject.next(this.sequence!.current()!);
      return;
    }
    this.teleportSubject.next(teleport);
  }
}
