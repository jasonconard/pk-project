import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";
import { DbSheet } from "../shared/db-sheet";

/** A simple element or a weapon type (what a skill is learned with, what grows). */
@Component({
  selector: "db-learn-select",
  templateUrl: "./learn-select.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: "display: contents" },
})
export class LearnSelectComponent extends DbSheet {
  /** The element's or weapon type's id. */
  readonly value = input.required<string>();
  readonly picked = output<string>();
}
