import { Component, computed, inject, linkedSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyService } from '../shared/service/key.service';
import { KeyCode, PressedKey } from '../shared/model/PressedKey';
import { SequenceService } from '../../modules/game/shared/services/sequence.service';

@Component({
  selector: 'core-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  private readonly sequenceService = inject(SequenceService);
  private readonly keyService = inject(KeyService);

  protected readonly message = this.sequenceService.message;
  protected readonly text = computed(() => this.message()?.text ?? '');
  protected readonly choices = computed(() => this.message()?.choices ?? []);
  protected readonly choiceId = linkedSignal<number>(() => this.choices().length ? 0 : -1);

  constructor() {
    this.keyService.pressedState
      .pipe(takeUntilDestroyed())
      .subscribe(keys => this.onKeysPressed(keys));
  }

  private onKeysPressed(keys: PressedKey[]): void {
    if (!keys.length || !this.message()) {
      return;
    }
    const choices = this.choices();
    if (!choices.length) {
      this.keyService.clearPressedKey();
      this.closeMessage();
      return;
    }

    const codes = this.keyService.pressedCodes;
    if (codes.includes(KeyCode.confirm)) {
      this.setChoice(choices[this.choiceId()].key);
    } else if (codes.includes(KeyCode.up) && this.choiceId() > 0) {
      this.choiceId.update(id => id - 1);
    } else if (codes.includes(KeyCode.down) && this.choiceId() < choices.length - 1) {
      this.choiceId.update(id => id + 1);
    }
    this.keyService.clearPressedKey();
  }

  protected selectChoice(event: Event, index: number): void {
    event.stopPropagation();
    this.choiceId.set(index);
  }

  protected confirmChoice(event: Event, key: string): void {
    event.stopPropagation();
    this.setChoice(key);
  }

  private setChoice(key: string): void {
    this.sequenceService.closeMessage(key);
  }

  protected closeMessage(): void {
    if (this.message() && this.choices().length) {
      return;
    }
    this.sequenceService.closeMessage();
  }
}
