import {
  LucideChevronRight,
  LucideClapperboard,
  LucideInfo,
} from "@lucide/angular";
import { attackFlow, SkillFlow } from "../../shared/skill-flow";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { DbWeapon } from "../../shared/database";
import { DbSheet } from "../../shared/db-sheet";
import { SkillAnim, SkillAnimMode } from "../../shared/skill-anim";
import { AnimFieldComponent } from "../../anim-field/anim-field.component";

/** The sheet of a row of the « weapon » table. */
@Component({
  selector: "db-weapon-sheet",
  imports: [
    AnimFieldComponent,
    LucideChevronRight,
    LucideClapperboard,
    LucideInfo,
  ],
  templateUrl: "./weapon-sheet.component.html",
  styleUrl: "./weapon-sheet.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeaponSheetComponent extends DbSheet {
  readonly weapon = input.required<DbWeapon>();

  /** A weapon's animation plays on its target, or flies to it (never on a zone). */
  protected readonly animModes: SkillAnimMode[] = ["projectile", "target"];

  /** Its attacks' animation changed (undefined: removed). */
  protected setAnim(wp: DbWeapon, anim: SkillAnim | undefined): void {
    this.edit(wp.id, (r) => {
      const next = { ...r, anim } as DbWeapon;
      if (!anim) {
        delete next.anim;
      }
      return next;
    });
  }

  protected setRanged(wp: DbWeapon, ranged: boolean): void {
    this.edit(wp.id, (r) => {
      const next = { ...r, ranged } as DbWeapon;
      if (!ranged) {
        delete next.ranged;
      }
      return next;
    });
  }

  protected readonly flows = [
    { field: "flow", label: "Attaque" },
    { field: "flowHeavy", label: "Attaque forte" },
  ] as const;

  /** A weapon type's flow as it plays now (its own, else the one its sheet gives). */
  protected flowOf(weapon: DbWeapon, field: "flow" | "flowHeavy"): SkillFlow {
    return attackFlow(weapon, field === "flowHeavy", !!weapon.ranged);
  }
}
