import {
  LucideChevronDown,
  LucidePlus,
  LucideSigma,
  LucideX,
} from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
} from "@angular/core";
import {
  CAST_MAX,
  DbSkill,
  LEARN_MAX,
  SkillTarget,
  SkillUse,
  defaultLearn,
  formulaProblem,
} from "../../shared/database";
import { DbSheet } from "../../shared/db-sheet";
import { StepperComponent } from "../../stepper/stepper.component";
import { EffectsEditorComponent } from "../../effects-editor/effects-editor.component";

/** The sheet of a row of the « skill » table. */
@Component({
  selector: "db-skill-sheet",
  imports: [
    StepperComponent,
    EffectsEditorComponent,
    LucideChevronDown,
    LucidePlus,
    LucideSigma,
    LucideX,
  ],
  templateUrl: "./skill-sheet.component.html",
  styleUrl: "./skill-sheet.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillSheetComponent extends DbSheet {
  readonly skill = input.required<DbSkill>();

  /** The formula's problem, if any (shown under it). */
  protected readonly formulaProblem = computed(() =>
    formulaProblem(this.skill()?.formula ?? "")
  );

  /** The formula block is unfolded (always when there is one). */
  protected readonly formulaOpen = linkedSignal<string, boolean>({
    source: () => this.skill().id,
    computation: () => false,
  });

  /** Another element: the levels it is learned with follow, when none were chosen yet. */
  protected setSkillElement(skill: DbSkill, element: string): void {
    this.edit(skill.id, (s) => {
      const next = { ...s, element } as DbSkill;
      if (next.learn.length === 0) {
        next.learn = defaultLearn(element, this.db());
      }
      return next;
    });
  }

  protected setSkill(
    skill: DbSkill,
    change: Partial<Pick<DbSkill, "mp" | "cast" | "target" | "use">>
  ): void {
    this.edit(skill.id, (s) => ({ ...s, ...change }));
  }

  protected setTarget(skill: DbSkill, target: string): void {
    this.setSkill(skill, { target: target as SkillTarget });
  }

  protected setUse(skill: DbSkill, use: SkillUse): void {
    this.setSkill(skill, { use });
  }

  protected setCast(skill: DbSkill, cast: number): void {
    this.setSkill(skill, {
      cast: Math.min(CAST_MAX, Math.max(0, Math.round(cast * 2) / 2)),
    });
  }

  /** Where the cast ends on the gauge preview (%): waiting, then casting, then the action. */
  protected castEnd(cast: number): number {
    return 70 + (cast / CAST_MAX) * 22;
  }

  protected setFormula(skill: DbSkill, formula: string): void {
    this.edit(skill.id, (s) => {
      const next = { ...s, formula } as DbSkill;
      if (!formula.trim()) {
        delete next.formula;
      }
      return next;
    });
  }

  protected addLearn(skill: DbSkill): void {
    const used = new Set(skill.learn.map((l) => l.id));
    const proposed =
      defaultLearn(skill.element, this.db()).find((l) => !used.has(l.id)) ??
      this.learnChoices()
        .map((c) => ({ id: c.id, level: 1 }))
        .find((l) => !used.has(l.id));
    if (proposed && skill.learn.length < LEARN_MAX) {
      this.edit(skill.id, (s) => ({
        ...s,
        learn: [...(s as DbSkill).learn, proposed],
      }));
    }
  }

  protected setLearn(
    skill: DbSkill,
    index: number,
    change: Partial<{ id: string; level: number }>
  ): void {
    this.edit(skill.id, (s) => ({
      ...s,
      learn: (s as DbSkill).learn.map((l, i) =>
        i === index ? { ...l, ...change } : l
      ),
    }));
  }

  protected removeLearn(skill: DbSkill, index: number): void {
    this.edit(skill.id, (s) => ({
      ...s,
      learn: (s as DbSkill).learn.filter((_, i) => i !== index),
    }));
  }
}
