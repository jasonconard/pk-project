import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, output, signal } from '@angular/core';
import { LucideFlag, LucideHash, LucideMinus, LucidePlus, LucideRotateCcw, LucideX } from '@lucide/angular';
import { EscapeService } from '../../../core/shared/service/escape.service';
import { loadVariables } from '../../variables-editor/shared/variable-storage';
import { clampCounter } from '../../variables-editor/shared/variables';
import {
  currentVariableValues, resetVariableValues, setVariableValue, VariableValue,
} from '../../variables-editor/shared/variable-values';

/**
 * Variables test (menu → Test des variables): every variable with its value in the game being played, to change by
 * hand and try what depends on it; Tout remettre au début = a new game for the variables (pressed twice). Closed
 * by the ✕, the backdrop or Escape.
 */
@Component({
  selector: 'game-variables-test',
  imports: [LucideFlag, LucideHash, LucideMinus, LucidePlus, LucideRotateCcw, LucideX],
  templateUrl: './variables-test.component.html',
  styleUrl: './variables-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariablesTestComponent {
  readonly closed = output<void>();

  protected readonly variables = loadVariables();
  protected readonly values = signal(currentVariableValues());
  /** Variables whose value isn't the starting one. */
  protected readonly changedCount = computed(() => this.variables.filter(v => this.values()[v.id] !== v.initial).length);
  protected readonly resetArmed = signal(false);
  private resetTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(EscapeService).whileAlive(() => this.closed.emit());
    inject(DestroyRef).onDestroy(() => clearTimeout(this.resetTimer));
  }

  protected set(id: string, value: VariableValue): void {
    setVariableValue(id, typeof value === 'number' ? clampCounter(value) : value);
    this.values.set(currentVariableValues());
  }

  protected counter(id: string): number {
    return this.values()[id] as number;
  }

  protected reset(): void {
    clearTimeout(this.resetTimer);
    if (!this.resetArmed()) {
      this.resetArmed.set(true);
      this.resetTimer = setTimeout(() => this.resetArmed.set(false), 3000);
      return;
    }
    this.resetArmed.set(false);
    resetVariableValues();
    this.values.set(currentVariableValues());
  }
}
