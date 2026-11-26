import {
  LucideCloudSun,
  LucideInfo,
  LucidePencil,
  LucideSnowflake,
  LucideX,
} from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import {
  CROP_LIMITS,
  CROP_STAGES,
  daysToRipe,
  DbCrop,
} from "../../shared/database";
import { DbSheet } from "../../shared/db-sheet";
import { StepperComponent } from "../../stepper/stepper.component";

/**
 * The sheet of a crop (design/database.pen, 20 · Culture): its seed, its 4 growth stages (a 16 × 24 picture and
 * the watered days of each), its harvest (item, how many, grows back or not), its months, the frost and the weathers
 * that make it grow faster.
 */
@Component({
  selector: "db-crop-sheet",
  imports: [
    StepperComponent,
    LucideCloudSun,
    LucideInfo,
    LucidePencil,
    LucideSnowflake,
    LucideX,
  ],
  templateUrl: "./crop-sheet.component.html",
  styleUrl: "./crop-sheet.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CropSheetComponent extends DbSheet {
  readonly crop = input.required<DbCrop>();

  protected readonly limits = CROP_LIMITS;
  protected readonly stageNames = CROP_STAGES;

  protected readonly ripeIn = computed(() => daysToRipe(this.crop()));

  /** The items a crop can use: all but the key items. */
  protected readonly items = computed(() =>
    this.db().items.filter((i) => i.kind !== "key")
  );

  protected readonly months = computed(
    () => this.db().calendar[0]?.months.map((m) => m.name) ?? []
  );

  private change(edit: (crop: DbCrop) => DbCrop): void {
    this.edit(this.crop().id, (row) => edit(row as DbCrop));
  }

  protected set(patch: Partial<DbCrop>): void {
    this.change((cr) => ({ ...cr, ...patch }));
  }

  protected drawStage(stage: number): void {
    this.store.editCropStage(this.crop(), stage);
  }

  protected setDays(stage: number, days: number): void {
    this.change((cr) => ({
      ...cr,
      stages: cr.stages.map((st, i) => (i === stage ? { ...st, days } : st)),
    }));
  }

  /** Harvest numbers kept with min ≤ max. */
  protected setHarvest(which: "min" | "max", value: number): void {
    this.change((cr) => {
      const min = which === "min" ? value : Math.min(cr.harvestMin, value);
      const max = which === "max" ? value : Math.max(cr.harvestMax, value);
      return { ...cr, harvestMin: min, harvestMax: max };
    });
  }

  protected setRegrow(days: number | null): void {
    this.change((cr) => {
      const next: DbCrop = { ...cr, regrow: days ?? 0 };
      if (days === null) {
        delete next.regrow;
      }
      return next;
    });
  }

  protected toggleMonth(index: number): void {
    this.change((cr) => ({
      ...cr,
      months: cr.months.includes(index)
        ? cr.months.filter((m) => m !== index)
        : this.months()
            .map((_, i) => i)
            .filter((i) => i === index || cr.months.includes(i)),
    }));
  }

  protected setBonus(index: number, days: number): void {
    this.change((cr) => ({
      ...cr,
      weathers: cr.weathers.map((w, i) => (i === index ? { ...w, days } : w)),
    }));
  }

  protected removeWeather(index: number): void {
    this.change((cr) => ({
      ...cr,
      weathers: cr.weathers.filter((_, i) => i !== index),
    }));
  }

  protected addWeather(): void {
    this.weatherPick.set({ id: this.crop().id, for: "crop" });
  }
}
