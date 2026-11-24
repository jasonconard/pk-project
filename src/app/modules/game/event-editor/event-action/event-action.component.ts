import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import {
  LucideChevronDown,
  LucideImagePlus,
  LucidePlay,
  LucidePlus,
  LucideX,
} from "@lucide/angular";
import {
  ITEM_COUNT_MAX,
  MONEY_MAX,
} from "../../../database-editor/shared/party";
import {
  EventAction,
  MAX_CHOICE_OPTIONS,
  portraitCharacter,
} from "../../shared/model/ObjectEvent";
import { playSound, SOUND_CHOICES } from "../../shared/services/sfx";
import {
  counterValue,
  EventEditorData,
  fieldValue,
  weatherLabel,
  wholeNumber,
} from "../event-editor-data";

type ChoiceAction = Extract<EventAction, { type: "choice" }>;

/**
 * The fields of one action of an event (who talks and what, the answers of a choice, the variable changed, the map,
 * the weather, the sound…). Its branches and a condition's conditions are drawn by the event window. Gives back
 * what changed; the weather window is opened by the event window (over it).
 */
@Component({
  selector: "game-event-action",
  imports: [
    NgTemplateOutlet,
    LucideChevronDown,
    LucideImagePlus,
    LucidePlay,
    LucidePlus,
    LucideX,
  ],
  templateUrl: "./event-action.component.html",
  styleUrl: "./event-action.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventActionComponent {
  readonly action = input.required<EventAction>();
  readonly maps = input<{ id: string; name: string }[]>([]);
  readonly currentMap = input("");
  readonly changed = output<Partial<EventAction>>();
  readonly pickWeather = output<void>();

  protected readonly data = inject(EventEditorData);
  protected readonly sounds = SOUND_CHOICES;
  protected readonly portraitCharacter = portraitCharacter;
  protected readonly maxOptions = MAX_CHOICE_OPTIONS;
  protected readonly countMax = ITEM_COUNT_MAX;
  protected readonly moneyMax = MONEY_MAX;
  protected readonly value = fieldValue;
  protected readonly counterValue = counterValue;
  protected readonly weatherLabel = weatherLabel;

  protected set(patch: Partial<EventAction>): void {
    this.changed.emit(patch);
  }

  /** Another portrait; a character's also fills « Qui parle » when it is empty. */
  protected setPortrait(pic: string): void {
    const action = this.action();
    const portrait = this.data.portraits.find((p) => p.pic === pic);
    const name =
      portrait && action.type === "message" && !action.name?.trim()
        ? { name: portrait.label }
        : {};
    this.set({ pic: pic || undefined, ...name });
  }

  /** Another variable: its kind decides the change (a flag becomes true, a counter is set to 1). */
  protected setVariable(id: string): void {
    const variable = this.data.variable(id);
    if (variable) {
      this.set({
        type: "variable",
        id,
        op: "set",
        value: variable.kind === "flag" ? true : 1,
      });
    }
  }

  /** Given (+) or taken (−): the same amount. */
  protected setGiven(amount: number, take: boolean): void {
    this.set({ amount: (take ? -1 : 1) * Math.abs(amount) });
  }

  /** How many, given or taken as before. */
  protected setAmount(amount: number, raw: string, max: number): void {
    this.set({ amount: (amount < 0 ? -1 : 1) * wholeNumber(raw, 1, max) });
  }

  protected seconds(raw: string): number {
    const value = Math.round(Number(raw) * 10) / 10;
    return Number.isFinite(value) ? Math.min(60, Math.max(0.1, value)) : 1;
  }

  protected play(sound: string): void {
    playSound(sound, true);
  }

  // --- The answers of a choice (their actions are a branch each) ---

  private changeOptions(
    action: ChoiceAction,
    fn: (options: ChoiceAction["options"]) => void
  ): void {
    const options = structuredClone(action.options);
    fn(options);
    this.set({ options });
  }

  protected setOption(action: ChoiceAction, k: number, text: string): void {
    this.changeOptions(
      action,
      (options) => (options[k].text = text.trim() || `Réponse ${k + 1}`)
    );
  }

  protected addOption(action: ChoiceAction): void {
    if (action.options.length < MAX_CHOICE_OPTIONS) {
      this.changeOptions(action, (options) =>
        options.push({ text: `Réponse ${options.length + 1}`, actions: [] })
      );
    }
  }

  /** An answer goes, with its actions (two answers at least). */
  protected removeOption(action: ChoiceAction, k: number): void {
    if (action.options.length > 2) {
      this.changeOptions(action, (options) => options.splice(k, 1));
    }
  }
}
