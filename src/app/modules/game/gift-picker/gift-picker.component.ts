import { LucideGift, LucideX } from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from "@angular/core";
import { EscapeService } from "../../../core/shared/service/escape.service";
import { loadDatabase } from "../../database-editor/shared/database-storage";
import { currentParty } from "../../database-editor/shared/party";
import { giveGift, LinkGain } from "../../database-editor/shared/links";
import { GameService } from "../shared/services/game.service";

/**
 * « Offrir un cadeau à Bernard » (the Offrir action of an event): the gifts carried (items of the kind « Cadeau »);
 * one is given (its link goes up, once a day) or none. Closed by « Ne rien offrir », the backdrop or Escape.
 */
@Component({
  selector: "game-gift-picker",
  imports: [LucideGift, LucideX],
  template: `
    <div
      class="backdrop"
      (click)="done.emit(null)"></div>
    <section
      class="dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gift-title">
      <header>
        <h2 id="gift-title">Offrir à {{ npcName() }}</h2>
        <button
          type="button"
          class="close"
          aria-label="Ne rien offrir"
          (click)="done.emit(null)">
          <svg lucideX></svg>
        </button>
      </header>
      <div class="list">
        @for (g of gifts(); track g.id) {
          <button
            type="button"
            class="gift"
            (click)="give(g.id)">
            @if (g.icon) {
              <img
                [src]="g.icon"
                alt="" />
            } @else {
              <svg lucideGift></svg>
            }
            <span>{{ g.name }}</span>
            <small>×{{ g.count }}</small>
          </button>
        } @empty {
          <p class="empty">
            Pas de cadeau dans le sac (les objets de la sorte « Cadeau »).
          </p>
        }
        @if (message()) {
          <p class="empty">{{ message() }}</p>
        }
      </div>
      <footer>
        <button
          type="button"
          (click)="done.emit(null)">
          Ne rien offrir
        </button>
      </footer>
    </section>
  `,
  styleUrl: "./gift-picker.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiftPickerComponent {
  /** The NPC (database id). */
  readonly npc = input.required<string>();
  /** The gift given (its link's gain, null: none or no points). */
  readonly done = output<LinkGain | null>();

  private readonly gameService = inject(GameService);
  private readonly db = loadDatabase();
  protected readonly message = signal("");
  protected readonly npcName = computed(
    () => this.db.npcs.find((n) => n.id === this.npc())?.name ?? "?"
  );
  protected readonly gifts = computed(() => {
    const items = currentParty().items;
    return this.db.items
      .filter((i) => i.kind === "gift" && (items[i.id] ?? 0) > 0)
      .map((i) => ({
        id: i.id,
        name: i.name,
        icon: i.icon,
        count: items[i.id],
      }));
  });

  constructor() {
    inject(EscapeService).whileAlive(() => this.done.emit(null));
  }

  protected give(item: string): void {
    const result = giveGift(this.npc(), item, this.gameService.day(), this.db);
    if (result === "already") {
      this.message.set(`${this.npcName()} a déjà reçu un cadeau aujourd'hui.`);
      setTimeout(() => this.done.emit(null), 1400);
      return;
    }
    this.done.emit(result);
  }
}
