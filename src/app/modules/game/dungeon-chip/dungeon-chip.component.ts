import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from "@angular/core";
import { LucideCastle, LucideClock, LucideSkull } from "@lucide/angular";
import { DungeonService } from "../shared/services/dungeon.service";

/**
 * The chip of the dungeon the team is in (design/main-view.pen, Donjons · Jeu · Étage en exploration): its name and
 * floor, when it closes, the enemies left on the floor. Only while playing.
 */
@Component({
  selector: "game-dungeon-chip",
  imports: [LucideCastle, LucideClock, LucideSkull],
  template: `
    @if (playing() && dungeon.chip(); as c) {
      <div
        class="chip"
        role="status"
        animate.enter="anim-fade-in"
        animate.leave="anim-fade-out">
        <p class="name">
          <svg lucideCastle></svg>{{ c.name }} · <b>{{ c.floor }}</b>
        </p>
        <p class="info">
          <svg lucideClock></svg>{{ c.closes }} <svg lucideSkull></svg
          >{{ c.foes }}
          {{ c.foes > 1 ? "ennemis" : "ennemi" }}
        </p>
      </div>
    }
  `,
  styles: `
    :host {
      position: absolute;
      left: calc(10px + var(--safe-left, 0px));
      top: calc(74px + var(--safe-top, 0px));
      z-index: 40;
      pointer-events: none;
    }
    .chip {
      padding: 6px 12px;
      border-radius: 10px;
      background: #140f1ecc;
      color: #f3eefc;
      font:
        13px/1.35 Roboto,
        sans-serif;
      border: 1px solid #c58af066;
    }
    p {
      display: flex;
      align-items: center;
      gap: 5px;
      margin: 0;
    }
    .info {
      color: #c9bfdc;
      font-size: 12px;
    }
    svg {
      width: 13px;
      height: 13px;
      color: #c58af0;
    }
    .info svg:last-of-type {
      margin-left: 6px;
      color: #e8895a;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DungeonChipComponent {
  readonly playing = input(false);
  protected readonly dungeon = inject(DungeonService);
}
