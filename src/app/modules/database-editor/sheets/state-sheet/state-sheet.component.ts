import { LucidePlus, LucideX } from "@lucide/angular";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import {
  DbState,
  StatId,
  StateEffect,
  StateEffectKind,
  TURNS_MAX,
  clampInt,
  newStateEffect,
} from "../../shared/database";
import { DbSheet } from "../../shared/db-sheet";
import { StepperComponent } from "../../stepper/stepper.component";

/** The sheet of a row of the « state » table. */
@Component({
  selector: "db-state-sheet",
  imports: [StepperComponent, LucidePlus, LucideX],
  templateUrl: "./state-sheet.component.html",
  styleUrl: "./state-sheet.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StateSheetComponent extends DbSheet {
  readonly state = input.required<DbState>();

  protected setTurns(state: DbState, turns: number): void {
    this.edit(state.id, (s) => ({
      ...s,
      turns: clampInt(turns, 0, TURNS_MAX),
    }));
  }

  protected setFlag(
    state: DbState,
    flag: "staysAfterFight" | "endsOnHit",
    value: boolean
  ): void {
    this.edit(state.id, (s) => ({ ...s, [flag]: value }));
  }

  protected addEffect(state: DbState, kind: StateEffectKind): void {
    this.edit(state.id, (s) => ({
      ...s,
      effects: [...(s as DbState).effects, newStateEffect(kind)],
    }));
  }

  protected setEffect(
    state: DbState,
    index: number,
    change: Partial<StateEffect>
  ): void {
    this.edit(state.id, (s) => ({
      ...s,
      effects: (s as DbState).effects.map((e, i) =>
        i === index ? ({ ...e, ...change } as StateEffect) : e
      ),
    }));
  }

  protected setEffectStat(state: DbState, index: number, stat: string): void {
    this.setEffect(state, index, { stat: stat as StatId });
  }

  protected removeEffect(state: DbState, index: number): void {
    this.edit(state.id, (s) => ({
      ...s,
      effects: (s as DbState).effects.filter((_, i) => i !== index),
    }));
  }
}
