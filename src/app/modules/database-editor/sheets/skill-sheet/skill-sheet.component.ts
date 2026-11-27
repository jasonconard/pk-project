import { skillFlow, SkillFlow } from "../../shared/skill-flow";
import {
  LucideChevronDown,
  LucideChevronRight,
  LucideClapperboard,
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
  SkillRange,
  SkillTarget,
  SkillUse,
  defaultLearn,
  formulaProblem,
  ZONE_MAX,
  ZONE_MIN,
  skillRange,
  skillZone,
} from "../../shared/database";

/** The sheet's two choices behind a skill's target: the side it aims at, then how much of it. */
type SkillCamp = "enemy" | "ally" | "self";
type SkillArea = "single" | "around" | "all";
/** A side's target field: one of it (alone or with the area around), or all of it. */
const AIMS: Record<SkillCamp, [SkillTarget, SkillTarget]> = {
  enemy: ["enemy", "enemies"],
  ally: ["ally", "allies"],
  self: ["self", "self"],
};
import { DbSheet } from "../../shared/db-sheet";
import { StepperComponent } from "../../stepper/stepper.component";
import { EffectsEditorComponent } from "../../effects-editor/effects-editor.component";
import { SkillAnim } from "../../shared/skill-anim";
import { AnimFieldComponent } from "../../anim-field/anim-field.component";

/** The sheet of a row of the « skill » table. */
@Component({
  selector: "db-skill-sheet",
  imports: [
    StepperComponent,
    EffectsEditorComponent,
    AnimFieldComponent,
    LucideChevronDown,
    LucideChevronRight,
    LucideClapperboard,
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

  /** The formula block is unfolded (always when there is one); folded again for another skill only. */
  protected readonly formulaOpen = linkedSignal<string, boolean>({
    source: () => this.skill().id,
    computation: (id, previous) =>
      previous && previous.source === id ? previous.value : false,
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

  /** Which side a skill aims at (its target field keeps the side and « all of it »). */
  protected campOf(skill: DbSkill): SkillCamp {
    if (skill.target === "self") {
      return "self";
    }
    return skill.target === "ally" || skill.target === "allies"
      ? "ally"
      : "enemy";
  }

  /** One target, the area around it, or the whole side. */
  protected areaOf(skill: DbSkill): SkillArea {
    if (skill.target === "enemies" || skill.target === "allies") {
      return "all";
    }
    return skillZone(skill) > 0 ? "around" : "single";
  }

  protected setCamp(skill: DbSkill, camp: string): void {
    this.setAim(skill, camp as SkillCamp, this.areaOf(skill));
  }

  protected setArea(skill: DbSkill, area: string): void {
    this.setAim(skill, this.campOf(skill), area as SkillArea);
  }

  /** Its zone's radius (0: none). */
  protected zoneOf(skill: DbSkill): number {
    return skillZone(skill);
  }

  /** The zone's radius, by steps of 2 between its limits. */
  protected setZone(skill: DbSkill, radius: number): void {
    const zone = Math.min(
      ZONE_MAX,
      Math.max(ZONE_MIN, Math.round(radius / 2) * 2)
    );
    this.edit(skill.id, (s) => ({ ...s, zone }));
  }

  /** Where a radius stands on the zone slider (%), for its marks. */
  protected zoneAt(radius: number): number {
    return ((radius - ZONE_MIN) / (ZONE_MAX - ZONE_MIN)) * 100;
  }

  /** Its effect animation changed (undefined: removed). */
  /** A skill's flow as it plays now (its own, else the one its sheet gives). */
  protected flowOf(skill: DbSkill): SkillFlow {
    return skillFlow(skill);
  }

  protected setAnim(skill: DbSkill, anim: SkillAnim | undefined): void {
    this.edit(skill.id, (s) => {
      const next = { ...s, anim } as DbSkill;
      if (!anim) {
        delete next.anim;
      }
      return next;
    });
  }

  /** Its range (or the one it has by default). */
  protected rangeOf(skill: DbSkill): SkillRange {
    return skillRange(skill);
  }

  protected setRange(skill: DbSkill, range: string): void {
    this.edit(skill.id, (s) => ({ ...s, range: range as SkillRange }));
  }

  /** The side and the area written back as its target (and its zone, kept only around one target). */
  private setAim(skill: DbSkill, camp: SkillCamp, area: SkillArea): void {
    this.edit(skill.id, (s) => {
      const next = { ...s } as DbSkill;
      next.target = AIMS[camp][area === "all" ? 1 : 0];
      if (camp !== "self" && area === "around") {
        next.zone = skillZone(next) || 32;
      } else {
        delete next.zone;
      }
      return next;
    });
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
