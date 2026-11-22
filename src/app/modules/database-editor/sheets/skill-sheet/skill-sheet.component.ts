import {
  LucideChevronDown,
  LucideImageUp,
  LucidePlus,
  LucideSigma,
  LucideTrash,
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
import {
  ANIM_FRAME_MAX,
  ANIM_MS_MAX,
  ANIM_MS_MIN,
  newSkillAnim,
  SKILL_ANIM_MODES,
  SkillAnim,
  SkillAnimMode,
  withFrames,
} from "../../shared/skill-anim";
import { SkillAnimPreviewComponent } from "./skill-anim-preview.component";

/** The sheet of a row of the « skill » table. */
@Component({
  selector: "db-skill-sheet",
  imports: [
    StepperComponent,
    EffectsEditorComponent,
    SkillAnimPreviewComponent,
    LucideChevronDown,
    LucideImageUp,
    LucideTrash,
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

  protected readonly animModes = SKILL_ANIM_MODES;

  protected readonly animFrameMax = ANIM_FRAME_MAX;

  protected readonly animMsMin = ANIM_MS_MIN;

  protected readonly animMsMax = ANIM_MS_MAX;

  /** A PNG for its effect animation: frames cut and counted (a first one: played on the target). */
  protected async importAnim(skill: DbSkill, event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file) {
      return;
    }
    const image = await readDataUrl(file);
    const img = await loadImage(image);
    const mode = skill.anim?.mode ?? "target";
    const anim = skill.anim
      ? withFrames(
          img,
          { ...skill.anim, image },
          skill.anim.frame.w,
          skill.anim.frame.h
        )
      : newSkillAnim(img, image, mode);
    this.setAnim(skill, anim);
  }

  protected removeAnim(skill: DbSkill): void {
    this.edit(skill.id, (s) => {
      const next = { ...s } as DbSkill;
      delete next.anim;
      return next;
    });
  }

  /** Another way to play it: a projectile reads its second row (the frames are counted again). */
  protected async setAnimMode(skill: DbSkill, mode: string): Promise<void> {
    const anim = skill.anim;
    if (!anim) {
      return;
    }
    const img = await loadImage(anim.image);
    const next = { ...anim, mode: mode as SkillAnimMode };
    const fresh = anim.mode !== "projectile" && mode === "projectile";
    this.setAnim(
      skill,
      fresh
        ? newSkillAnim(img, anim.image, "projectile")
        : withFrames(img, next, anim.frame.w, anim.frame.h)
    );
  }

  /** Another frame size: the frames are counted again. */
  protected async setAnimFrame(
    skill: DbSkill,
    change: Partial<SkillAnim["frame"]>
  ): Promise<void> {
    const anim = skill.anim;
    if (!anim) {
      return;
    }
    const img = await loadImage(anim.image);
    const w = clampSize(change.w ?? anim.frame.w);
    const h = clampSize(change.h ?? anim.frame.h);
    this.setAnim(skill, withFrames(img, anim, w, h));
  }

  protected setAnimTiming(
    skill: DbSkill,
    change: Partial<Pick<SkillAnim, "ms" | "hit">>
  ): void {
    const anim = skill.anim;
    if (anim) {
      this.setAnim(skill, { ...anim, ...change });
    }
  }

  private setAnim(skill: DbSkill, anim: SkillAnim): void {
    this.edit(skill.id, (s) => ({ ...s, anim }));
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

function clampSize(n: number): number {
  return Math.min(ANIM_FRAME_MAX, Math.max(8, Math.round(n)));
}

function readDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
