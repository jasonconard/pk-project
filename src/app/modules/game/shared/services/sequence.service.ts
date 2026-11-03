import { inject, Service, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CoreService } from '../../../../core/shared/service/core.service';
import { SceneEvent } from '../model/SceneEvent';
import { SceneEventSequence } from '../model/SceneEventSequence';
import { InstructionLog, InstructionMessage, InstructionTeleport, InstructionType, InstructionWait } from '../model/SceneEventInstruction';
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

  /** `true` while an event sequence is being played (player inputs are frozen). */
  get isRunning(): boolean {
    return this.sequence !== null;
  }

  launchSequence(event: SceneEvent): void {
    this.keyService.clearKeys();
    this.sequence = new SceneEventSequence(event.instructions.map(i => ({ ...i })));
    this.nextSequence();
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
    }
  }

  private setLogs(log: InstructionLog | undefined): void {
    if (log) {
      this.coreService.setLogs(log.text);
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
