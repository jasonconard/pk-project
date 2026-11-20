import { LucideInfo } from "@lucide/angular";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { DbWeapon } from "../../shared/database";
import { DbSheet } from "../../shared/db-sheet";

/** The sheet of a row of the « weapon » table. */
@Component({
  selector: "db-weapon-sheet",
  imports: [LucideInfo],
  templateUrl: "./weapon-sheet.component.html",
  styleUrl: "./weapon-sheet.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeaponSheetComponent extends DbSheet {
  readonly weapon = input.required<DbWeapon>();
}
