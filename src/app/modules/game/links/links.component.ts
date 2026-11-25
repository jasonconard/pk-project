import { LucideHeart, LucideX } from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from "@angular/core";
import { EscapeService } from "../../../core/shared/service/escape.service";
import { loadDatabase } from "../../database-editor/shared/database-storage";
import {
  linkState,
  linkSummary,
  linkTargets,
} from "../../database-editor/shared/links";

/**
 * Menu → Liens (design/main-view.pen, Liens · Jeu · Menu Liens): each social link met (level 1 or more), its level,
 * its points to the next one and what it brings now. Closed by the ✕, the backdrop or Escape.
 */
@Component({
  selector: "game-links",
  imports: [LucideHeart, LucideX],
  template: `
    <div
      class="backdrop"
      (click)="closed.emit()"></div>
    <section
      class="dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="links-title">
      <header>
        <h2 id="links-title">Liens</h2>
        <button
          type="button"
          class="close"
          aria-label="Fermer"
          title="Fermer (Échap)"
          (click)="closed.emit()">
          <svg lucideX></svg>
        </button>
      </header>
      <div class="list">
        <p class="intro">
          Passer du temps avec quelqu'un fait monter votre lien. À chaque
          niveau, une scène et un bonus.
        </p>
        @for (l of links; track l.id) {
          <article>
            @if (l.portrait) {
              <img
                [src]="l.portrait"
                alt="" />
            } @else {
              <span class="no-face"></span>
            }
            <div class="texts">
              <div class="top">
                <b>{{ l.name }}</b>
                <span class="level"
                  ><svg lucideHeart></svg> Niv. {{ l.level }}</span
                >
              </div>
              <small>{{ l.role }}</small>
              <div class="bar">
                <i [style.width.%]="l.next ? (100 * l.into) / l.next : 100"></i>
              </div>
              <div class="bottom">
                <small>{{ l.summary }}</small>
                <small>{{ l.next ? l.into + " / " + l.next : "max" }}</small>
              </div>
            </div>
          </article>
        } @empty {
          <p class="intro">
            Aucun lien pour l'instant : parlez aux habitants, passez du temps
            avec l'équipe.
          </p>
        }
      </div>
    </section>
  `,
  styleUrl: "./links.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksComponent {
  readonly closed = output<void>();

  private readonly db = loadDatabase();
  protected readonly links = linkTargets(this.db)
    .map((t) => {
      const state = linkState(t.id, this.db);
      return {
        ...t,
        ...state,
        summary: linkSummary(t.id, state.level, this.db),
      };
    })
    .filter((l) => l.level > 0)
    .sort((a, b) => b.level - a.level || b.points - a.points);

  constructor() {
    inject(EscapeService).whileAlive(() => this.closed.emit());
  }
}
