import { LucideMinus, LucidePlus } from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";
import {
  LIGHT_COLORS,
  LIGHT_RANGE,
  LIGHT_STRENGTHS,
  LightSpec,
} from "../shared/model/light";

/**
 * A light's settings (design/main-view.pen, Lumières · Objet Lumière; model-editor-mobile.pen screen 12): its colour,
 * range, strength, flicker, night only, on at the start. Shared by the map editor (a « Lumière » object) and the model
 * editor (a light point). Gives back a changed copy.
 */
@Component({
  selector: "game-light-fields",
  imports: [LucideMinus, LucidePlus],
  template: `
    @let l = light();
    <span class="label">Couleur</span>
    <div
      class="colors"
      role="radiogroup"
      aria-label="Couleur">
      @for (c of colors; track c) {
        <button
          type="button"
          role="radio"
          class="color"
          [style.background]="c"
          [attr.aria-checked]="l.color === c"
          [attr.aria-label]="c"
          (click)="set({ color: c })"></button>
      }
      <input
        type="color"
        aria-label="Autre couleur"
        [value]="l.color"
        (change)="set({ color: $any($event.target).value })" />
    </div>
    <div class="rows">
      <div class="row">
        <span>Portée</span>
        <button
          type="button"
          aria-label="Moins loin"
          [disabled]="l.range <= range.min"
          (click)="set({ range: l.range - 1 })">
          <svg lucideMinus></svg>
        </button>
        <b>{{ l.range }} case{{ l.range > 1 ? "s" : "" }}</b>
        <button
          type="button"
          aria-label="Plus loin"
          [disabled]="l.range >= range.max"
          (click)="set({ range: l.range + 1 })">
          <svg lucidePlus></svg>
        </button>
      </div>
      <div
        class="row strengths"
        role="radiogroup"
        aria-label="Force">
        <span>Force</span>
        @for (s of strengths; track s.value) {
          <button
            type="button"
            role="radio"
            class="strength"
            [attr.aria-checked]="l.strength === s.value"
            (click)="set({ strength: s.value })">
            {{ s.label }}
          </button>
        }
      </div>
    </div>
    <div class="rows">
      <label class="row">
        <span>Vacille comme une flamme</span>
        <input
          type="checkbox"
          role="switch"
          [checked]="!!l.flicker"
          (change)="set({ flicker: $any($event.target).checked })" />
      </label>
      <label class="row">
        <span>Seulement le soir et la nuit</span>
        <input
          type="checkbox"
          role="switch"
          [checked]="!!l.nightOnly"
          (change)="set({ nightOnly: $any($event.target).checked })" />
      </label>
      <label class="row">
        <span>Allumée au départ</span>
        <input
          type="checkbox"
          role="switch"
          [checked]="!l.off"
          (change)="set({ off: !$any($event.target).checked })" />
      </label>
    </div>
  `,
  styleUrl: "./light-fields.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightFieldsComponent {
  readonly light = input.required<LightSpec>();
  readonly changed = output<LightSpec>();

  protected readonly colors = LIGHT_COLORS;
  protected readonly strengths = LIGHT_STRENGTHS;
  protected readonly range = LIGHT_RANGE;

  protected set(patch: Partial<LightSpec>): void {
    const next: LightSpec = { ...this.light(), ...patch };
    for (const key of ["flicker", "nightOnly", "off"] as const) {
      if (!next[key]) {
        delete next[key];
      }
    }
    this.changed.emit(next);
  }
}
