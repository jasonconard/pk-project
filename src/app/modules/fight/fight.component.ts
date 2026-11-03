import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
import { animationFrameScheduler, interval } from 'rxjs';
import { KeyService } from '../../core/shared/service/key.service';
import { ElementType, getElementTable } from '../../core/shared/model/pokemon/PkElement';
import { KeyCode, PressedKey } from '../../core/shared/model/PressedKey';

@Component({
  selector: 'fight-main',
  imports: [DecimalPipe],
  templateUrl: './fight.component.html',
  styleUrl: './fight.component.scss'
})
export class FightComponent {
  private readonly keyService = inject(KeyService);

  protected readonly pos = signal(0);
  private readonly speed = 230;
  private limited = true;
  private frozen = false;
  private recovering = false;
  private pressedKeys: PressedKey[] = [];

  protected readonly ElementType = ElementType;
  protected readonly elementTable = getElementTable();

  constructor() {
    this.keyService.pressedState
      .pipe(takeUntilDestroyed())
      .subscribe(keys => this.pressedKeys = keys);

    interval(0, animationFrameScheduler)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.tick());
  }

  private isPressed(code: KeyCode): boolean {
    return this.pressedKeys.some(pressedKey => pressedKey.code === code);
  }

  private tick(): void {
    this.updatePlayerPosition();

    this.frozen = this.isPressed(KeyCode.down);

    if (!this.recovering && this.isPressed(KeyCode.up)) {
      this.recovering = true;
      setTimeout(() => this.recovering = false, 1000);
      const pos = this.pos();
      const nextPos = Math.max(0, pos - 45);
      if (pos > 80 && nextPos < 80) {
        this.limited = true;
      }
      this.pos.set(nextPos);
    }
  }

  private updatePlayerPosition(): void {
    if (this.frozen) {
      return;
    }
    if (this.pos() < 80 && this.limited) {
      this.pos.update(pos => Math.min(80, pos + (this.speed / 1000)));
    }
    if (this.pos() === 80 && this.limited && this.isPressed(KeyCode.confirm)) {
      this.limited = false;
    }
    if (this.pos() >= 80 && !this.limited) {
      this.pos.update(pos => Math.min(100, pos + (this.speed / 2000)));
    }
    if (this.pos() === 100 && !this.limited && this.isPressed(KeyCode.confirm)) {
      this.limited = true;
      this.pos.set(0);
    }
  }
}
