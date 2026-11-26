import { LucideSprout, LucideX } from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from "@angular/core";
import { EscapeService } from "../../../core/shared/service/escape.service";
import { loadDatabase } from "../../database-editor/shared/database-storage";
import { daysToRipe } from "../../database-editor/shared/database";
import { currentParty } from "../../database-editor/shared/party";
import { inSeason } from "../shared/model/farm";
import { gameCalendar } from "../shared/model/game-calendar";

/**
 * « Planter quoi ? » (design/main-view.pen, Cultures · Planter): the seeds of the bag (the items a crop of the
 * database is planted with), when each one will be ripe; a seed out of season is greyed. Closed by the ✕, the
 * backdrop or Escape (nothing planted).
 */
@Component({
  selector: "game-seed-picker",
  imports: [LucideSprout, LucideX],
  template: `
    <div
      class="backdrop"
      (click)="done.emit(null)"></div>
    <section
      class="dialog sheet"
      role="dialog"
      aria-modal="true"
      aria-labelledby="seed-title">
      <div class="grip"></div>
      <header>
        <h2 id="seed-title"><svg lucideSprout></svg> Planter quoi ?</h2>
        <button
          type="button"
          class="close"
          aria-label="Ne rien planter"
          (click)="done.emit(null)">
          <svg lucideX></svg>
        </button>
      </header>
      <div class="list">
        @for (s of seeds(); track s.id) {
          <button
            type="button"
            class="seed"
            [class.off]="!s.season"
            [disabled]="!s.season"
            (click)="done.emit(s.id)">
            <span class="icon">
              @if (s.icon) {
                <img
                  [src]="s.icon"
                  alt="" />
              } @else {
                <svg lucideSprout></svg>
              }
            </span>
            <span class="texts">
              <b>{{ s.name }}</b>
              <small [class.warn]="!s.season">{{ s.sub }}</small>
            </span>
            <span class="count">×{{ s.count }}</span>
          </button>
        } @empty {
          <p class="empty">
            Pas de graine dans le sac. Les boutiques en vendent peut-être.
          </p>
        }
      </div>
      <p class="foot">
        Arrosez chaque jour, sauf quand il pleut : un jour sans eau, rien ne
        pousse.
      </p>
    </section>
  `,
  styleUrl: "./seed-picker.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedPickerComponent {
  /** The day of the game (seasons). */
  readonly day = input.required<number>();
  /** The seed chosen (null: none). */
  readonly done = output<string | null>();

  private readonly db = loadDatabase();

  protected readonly seeds = computed(() => {
    const items = currentParty().items;
    const months = gameCalendar().months;
    return this.db.crops.flatMap((crop) => {
      const item = this.db.items.find((i) => i.id === crop.seed);
      const count = item ? (items[item.id] ?? 0) : 0;
      if (!item || count < 1) {
        return [];
      }
      const season = inSeason(crop, this.day());
      const days = daysToRipe(crop);
      const when = crop.months
        .map((m) => months[m]?.name.toLowerCase())
        .filter(Boolean)
        .join(", ");
      return [
        {
          id: item.id,
          name: item.name,
          icon: item.icon,
          count,
          season,
          sub: season
            ? `${crop.name} : mûre en ${days} jour${days > 1 ? "s" : ""} arrosé${days > 1 ? "s" : ""}${crop.regrow === undefined ? "" : " · repousse"}`
            : `Hors saison : se plante en ${when}`,
        },
      ];
    });
  });

  constructor() {
    inject(EscapeService).whileAlive(() => this.done.emit(null));
  }
}
