import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { LucideMinus, LucidePlus } from '@lucide/angular';
import { clampInt } from '../shared/database';

/** − value + : a whole number between min and max, typed or stepped; signed shows « +25 ». */
@Component({
  selector: 'db-stepper',
  imports: [LucideMinus, LucidePlus],
  template: `
    <button type="button" aria-label="Moins" [disabled]="value() <= min()" (click)="set(value() - step())"><svg lucideMinus></svg></button>
    <label>
      <input type="text" inputmode="numeric" [attr.aria-label]="label()" [value]="shown()"
             (change)="set(+$any($event.target).value.replace('+', '').replace(',', '.')); $any($event.target).value = shown()" />
      @if (suffix()) { <span>{{ suffix() }}</span> }
    </label>
    <button type="button" aria-label="Plus" [disabled]="value() >= max()" (click)="set(value() + step())"><svg lucidePlus></svg></button>
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      height: 36px;
      border-radius: 9px;
      background: var(--field);
      flex-shrink: 0;
    }
    button {
      width: 32px;
      height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font: inherit;
      color: inherit;
      border: none;
      background: none;
      cursor: pointer;
      padding: 0;
      font-size: 15px;
      &:disabled { opacity: 0.3; cursor: default; }
    }
    label {
      display: inline-flex;
      align-items: baseline;
      gap: 2px;
      font-weight: 700;
      color: var(--stepper-color, inherit);
    }
    input {
      width: 3.2ch;
      padding: 0;
      border: none;
      background: none;
      font: inherit;
      color: inherit;
      text-align: right;
      &:focus { outline: none; }
    }
    span { font-size: 12px; font-weight: 600; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
  readonly value = input.required<number>();
  readonly min = input(0);
  readonly max = input(100);
  readonly step = input(1);
  readonly suffix = input('');
  readonly signed = input(false);
  readonly label = input('Valeur');
  readonly changed = output<number>();

  protected readonly shown = computed(() => this.signed() && this.value() > 0 ? `+${this.value()}` : `${this.value()}`);

  protected set(value: number): void {
    const next = clampInt(value, this.min(), this.max());
    if (next !== this.value()) {
      this.changed.emit(next);
    }
  }
}
