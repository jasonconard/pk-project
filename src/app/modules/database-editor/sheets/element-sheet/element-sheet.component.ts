import { LucideInfo, LucidePlus, LucideX } from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import { DbElement, composableElements } from "../../shared/database";
import { DbSheet } from "../../shared/db-sheet";
import { omit } from "../../../../core/shared/omit";
import { StepperComponent } from "../../stepper/stepper.component";

/** The sheet of a row of the « element » table. */
@Component({
  selector: "db-element-sheet",
  imports: [StepperComponent, LucideInfo, LucidePlus, LucideX],
  templateUrl: "./element-sheet.component.html",
  styleUrl: "./element-sheet.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementSheetComponent extends DbSheet {
  readonly element = input.required<DbElement>();

  protected readonly composable = computed(() =>
    composableElements(this.db().elements, this.element()?.id)
  );

  protected setComposed(element: DbElement, composed: boolean): void {
    if (composed === !!element.parts) {
      return;
    }
    if (composed) {
      const choices = this.composable();
      if (choices.length < 2) {
        this.message.set(
          "Il faut au moins deux éléments simples (pas le Physique) pour en composer un."
        );
        return;
      }
      this.edit(element.id, (e) => ({
        ...e,
        parts: [choices[0].id, choices[1].id],
      }));
    } else {
      this.edit(element.id, (e) => {
        return omit(e as DbElement, "parts");
      });
    }
  }

  protected setPart(element: DbElement, index: 0 | 1, id: string): void {
    this.edit(element.id, (e) => {
      const parts = [...(e as DbElement).parts!] as [string, string];
      parts[index] = id;
      return { ...e, parts };
    });
  }

  protected strong(element: DbElement) {
    return element.weathers.filter((w) => w.percent > 0);
  }

  protected weak(element: DbElement) {
    return element.weathers.filter((w) => w.percent < 0);
  }

  protected openWeatherPick(element: DbElement, strong: boolean): void {
    this.weatherPick.set({ id: element.id, strong, for: "element" });
  }

  protected setWeatherPercent(
    element: DbElement,
    weather: string,
    magnitude: number,
    strong: boolean
  ): void {
    this.edit(element.id, (e) => ({
      ...e,
      weathers: (e as DbElement).weathers.map((w) =>
        w.weather === weather
          ? { ...w, percent: strong ? magnitude : -magnitude }
          : w
      ),
    }));
  }

  protected removeWeather(element: DbElement, weather: string): void {
    this.edit(element.id, (e) => ({
      ...e,
      weathers: (e as DbElement).weathers.filter((w) => w.weather !== weather),
    }));
  }
}
