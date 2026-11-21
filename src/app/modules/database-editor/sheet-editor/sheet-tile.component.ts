import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from "@angular/core";
import { LucideFilm, LucidePencil } from "@lucide/angular";
import { SpriteSheet } from "../shared/sprite-sheet";

/** The sheet's tile in a character's / an enemy's « Apparence »: the idle's first frame, opens the sheet window. */
@Component({
  selector: "db-sheet-tile",
  imports: [LucideFilm, LucidePencil],
  template: `
    <button
      type="button"
      class="tile"
      title="Planche de combat : les animations"
      (click)="opened.emit()">
      <span class="tile-box">
        @if (sheet(); as s) {
          <span
            class="frame"
            [style.width.px]="s.frame.w"
            [style.height.px]="s.frame.h"
            [style.background-image]="'url(' + s.image + ')'"
            [style.scale]="scale()"></span>
        } @else {
          <svg
            lucideFilm
            class="model-icon"></svg>
        }
        <span
          class="pen"
          aria-hidden="true">
          <svg lucidePencil></svg>
        </span>
      </span>
      <small>{{ caption() }}</small>
    </button>
  `,
  styles: `
    :host {
      display: contents;
    }
    .frame {
      flex-shrink: 0;
      background-repeat: no-repeat;
      background-position: 0 0;
      image-rendering: pixelated;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SheetTileComponent {
  readonly sheet = input<SpriteSheet | undefined>(undefined);
  readonly opened = output<void>();

  protected readonly scale = computed(() => {
    const s = this.sheet();
    return s ? Math.min(2, 88 / Math.max(s.frame.w, s.frame.h)) : 1;
  });
  protected readonly caption = computed(() => {
    const s = this.sheet();
    return s
      ? `Planche · ${s.anims.filter((a) => a.frames > 0).length} animations`
      : "Planche de combat";
  });
}
