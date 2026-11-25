import { LucideInfo, LucidePencil } from "@lucide/angular";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { DbNpc } from "../../shared/database";
import { DbSheet } from "../../shared/db-sheet";
import { WalkFieldComponent } from "../../walk-field/walk-field.component";
import { ScheduleFieldComponent } from "../../schedule-field/schedule-field.component";

/** The sheet of a row of the « NPC » table: its looks (design/database.pen, 12 · Fiche PNJ). */
@Component({
  selector: "db-npc-sheet",
  imports: [
    LucideInfo,
    LucidePencil,
    WalkFieldComponent,
    ScheduleFieldComponent,
  ],
  templateUrl: "./npc-sheet.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NpcSheetComponent extends DbSheet {
  readonly npc = input.required<DbNpc>();
}
