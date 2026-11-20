import { inject, Service, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CoreService } from '../../../../core/shared/service/core.service';
import { SceneEvent } from '../model/SceneEvent';
import { SceneEventSequence } from '../model/SceneEventSequence';
import {
  InstructionLog, InstructionMessage, InstructionTeleport, InstructionType, InstructionVariable, InstructionWait,
} from '../model/SceneEventInstruction';
import { currentVariableValues, setVariableValue } from '../../../variables-editor/shared/variable-values';
import { clampCounter } from '../../../variables-editor/shared/variables';
import { playSound } from './sfx';
import { conditionsFit, EventContext } from '../model/ObjectEvent';
import { KeyService } from '../../../../core/shared/service/key.service';

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
  readonly teleport$: Observable<InstructionTeleport> = this.teleportSubject.asObservable();

  private readonly weatherSubject = new Subject<string>();
  /** Emits each weather change asked by an event (WeatherType); the game applies it. */
  readonly weather$: Observable<string> = this.weatherSubject.asObservable();

  /** What the branches of the event being played check (hour, weather, variables now), given by the game. */
  private context: (() => EventContext) | null = null;

  /** `true` while an event sequence is being played (player inputs are frozen). */
  get isRunning(): boolean {
    return this.sequence !== null;
  }

  launchSequence(event: SceneEvent, context?: () => EventContext): void {
    this.context = context ?? null;
    this.keyService.clearKeys();
    this.sequence = new SceneEventSequence(event.instructions.map(i => ({ ...i })));
    this.nextSequence();
  }

  /** Stops the event being played (opening the map editor): its message closes, the rest is not played. */
  stop(): void {
    this.sequence = null;
    this.messageState.set(null);
  }

  /** Closes the current message and resumes the sequence with the (optional) chosen answer. */
  closeMessage(choiceKey?: string): void {
    this.messageState.set(null);
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
      case InstructionType.LOG: this.setLogs(instruction.log); break;
      case InstructionType.MESSAGE: this.setMessage(instruction.message); break;
      case InstructionType.WAIT: this.setWait(instruction.wait); break;
      case InstructionType.TELEPORT: this.setTeleport(instruction.teleport); break;
      case InstructionType.VARIABLE: this.setVariable(instruction.variable); break;
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
        const fits = !!ctx && conditionsFit(instruction.branch ?? {}, { ...ctx, values: currentVariableValues() });
        this.nextSequence(fits ? 'then' : 'else');
        break;
      }
      case InstructionType.STOP:
        this.sequence = null;
        break;
      default: this.nextSequence();
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
      if (typeof current === 'boolean') {
        setVariableValue(change.id, !!change.value);
      } else {
        const value = Number(change.value) || 0;
        setVariableValue(change.id, clampCounter(change.op === 'add' ? current + value : value));
      }
    }
    this.nextSequence();
  }

  private setMessage(msg: InstructionMessage | undefined): void {
    if (!msg) { return this.nextSequence(); }
    this.messageState.set(msg);
  }

  private setWait(wait: InstructionWait | undefined): void {
    if (!wait) { return this.nextSequence(); }
    setTimeout(() => this.nextSequence(), wait.time);
  }

  private setTeleport(teleport: InstructionTeleport | undefined): void {
    if (!teleport) { return this.nextSequence(); }
    this.teleportSubject.next(teleport);
  }
}
