import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from "@angular/core";
import { LucideArrowDown, LucideMaximize } from "@lucide/angular";
import {
  ActionZone,
  toggleCell,
  ZONE_SIDES,
  ZoneSide,
} from "../shared/model/action-zone";

/**
 * An action zone's settings (design/main-view.pen, Zones d'action): the object seen from above as a grid of cells
 * (touch one: in or out of the zone), the side the player acts from, and « Tout l'objet » (no cell, every side). Used
 * by the model editor, the map editor's object sheet and the event window. It gives back the changed zone.
 */
@Component({
  selector: "game-zone-editor",
  imports: [LucideArrowDown, LucideMaximize],
  templateUrl: "./zone-editor.component.html",
  styleUrl: "./zone-editor.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZoneEditorComponent {
  /** The zone now (null: none yet, the whole object). */
  readonly zone = input<ActionZone | null>(null);
  /** The object's grid (its footprint in map cells): a zone drawn on another grid starts again. */
  readonly grid = input.required<{ cols: number; rows: number }>();
  readonly zoneChange = output<ActionZone>();

  protected readonly sides = ZONE_SIDES;
  /** The zone on this grid (its cells kept if it was drawn on the same one). */
  protected readonly current = computed<ActionZone>(() => {
    const zone = this.zone();
    const grid = this.grid();
    const same = zone?.grid.cols === grid.cols && zone?.grid.rows === grid.rows;
    return {
      grid,
      cells: same ? zone.cells : [],
      side: zone?.side ?? "all",
    };
  });
  protected readonly rows = computed(() =>
    Array.from({ length: this.grid().rows }, (_, r) => r)
  );
  protected readonly cols = computed(() =>
    Array.from({ length: this.grid().cols }, (_, c) => c)
  );
  /** Cell size (px): the grid fits in about 240 × 160. */
  protected readonly cellSize = computed(() => {
    const { cols, rows } = this.grid();
    return Math.max(
      16,
      Math.min(40, Math.floor(Math.min(240 / cols, 160 / rows)))
    );
  });

  protected isOn(c: number, r: number): boolean {
    return this.current().cells.some((cell) => cell.c === c && cell.r === r);
  }

  protected toggle(c: number, r: number): void {
    this.zoneChange.emit(toggleCell(this.current(), c, r));
  }

  protected setSide(side: ZoneSide): void {
    this.zoneChange.emit({ ...this.current(), side });
  }

  protected whole(): void {
    this.zoneChange.emit({ grid: this.grid(), cells: [], side: "all" });
  }
}
