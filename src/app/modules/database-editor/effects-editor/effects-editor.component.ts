import {
  LucideArrowDown,
  LucideArrowUp,
  LucidePlus,
  LucideX,
} from "@lucide/angular";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import {
  SkillEffect,
  SkillEffectKind,
  newSkillEffect,
} from "../shared/database";
import { DbSheet, HasEffects } from "../shared/db-sheet";
import { StepperComponent } from "../stepper/stepper.component";
import { LearnSelectComponent } from "../learn-select/learn-select.component";

/** The effects of a skill or a consumable item, in order: add, change, move, remove. */
@Component({
  selector: "db-effects-editor",
  imports: [
    StepperComponent,
    LearnSelectComponent,
    LucideArrowDown,
    LucideArrowUp,
    LucidePlus,
    LucideX,
  ],
  templateUrl: "./effects-editor.component.html",
  styleUrl: "./effects-editor.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EffectsEditorComponent extends DbSheet {
  /** The skill or the item. */
  readonly owner = input.required<HasEffects>();
  /** The sorts of effect it may have. */
  readonly kindList = input.required<SkillEffectKind[]>();

  protected addSkillEffect(row: HasEffects, kind: SkillEffectKind): void {
    this.edit(row.id, (s) => ({
      ...s,
      effects: [
        ...((s as HasEffects).effects ?? []),
        newSkillEffect(kind, this.db()),
      ],
    }));
  }

  protected setSkillEffect(
    row: HasEffects,
    index: number,
    change: Partial<SkillEffect> | Record<string, unknown>
  ): void {
    this.edit(row.id, (s) => ({
      ...s,
      effects: ((s as HasEffects).effects ?? []).map((e, i) =>
        i === index ? ({ ...e, ...change } as SkillEffect) : e
      ),
    }));
  }

  protected removeSkillEffect(row: HasEffects, index: number): void {
    this.edit(row.id, (s) => ({
      ...s,
      effects: ((s as HasEffects).effects ?? []).filter((_, i) => i !== index),
    }));
  }

  protected moveSkillEffect(row: HasEffects, index: number, by: -1 | 1): void {
    this.edit(row.id, (s) => {
      const effects = [...((s as HasEffects).effects ?? [])];
      const to = index + by;
      if (to < 0 || to >= effects.length) {
        return s;
      }
      [effects[index], effects[to]] = [effects[to], effects[index]];
      return { ...s, effects };
    });
  }
}
