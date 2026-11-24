import { LucideInfo, LucidePencil } from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
} from "@angular/core";
import {
  DbCharacter,
  DbNpc,
  WALK_CELL,
  WALK_DIRS,
  WALK_FRAMES,
  WALK_STAND,
} from "../shared/database";
import { DbSheet } from "../shared/db-sheet";

/** The preview's steps: left foot, standing, right foot, standing. */
const STEPS = [0, WALK_STAND, 2, WALK_STAND];
const STEP_MS = 180;
/** Steps before the preview turns (down, left, up, right: it walks around). */
const TURN_EVERY = 8;
const TURNS = [0, 1, 3, 2];

/**
 * A character's or an NPC's walking sheet (design/database.pen, 12 · Fiche PNJ): its pictures, one row per
 * direction (a touch draws one), a preview walking around, and the whole sheet to draw or import (a PNG).
 */
@Component({
  selector: "db-walk-field",
  imports: [LucideInfo, LucidePencil],
  templateUrl: "./walk-field.component.html",
  styleUrl: "./walk-field.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalkFieldComponent extends DbSheet {
  readonly owner = input.required<DbCharacter | DbNpc>();

  protected readonly dirs = WALK_DIRS;
  protected readonly frames = Array.from({ length: WALK_FRAMES }, (_, i) => i);
  protected readonly cell = WALK_CELL;
  protected readonly stand = WALK_STAND;

  private readonly tick = signal(0);
  protected readonly previewCol = () => STEPS[this.tick() % STEPS.length];
  protected readonly previewRow = () =>
    TURNS[Math.floor(this.tick() / TURN_EVERY) % TURNS.length];

  constructor() {
    super();
    const timer = setInterval(() => this.tick.update((t) => t + 1), STEP_MS);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }

  /** The CSS position of a picture in the sheet (shown by a background). */
  protected position(col: number, row: number): string {
    const x = (col / (WALK_FRAMES - 1)) * 100;
    const y = (row / (WALK_DIRS.length - 1)) * 100;
    return `${x}% ${y}%`;
  }

  protected drawFrame(col: number, row: number): void {
    void this.store.editWalkFrame(this.owner(), { col, row });
  }
}
