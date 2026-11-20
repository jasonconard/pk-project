import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  output,
  signal,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import {
  LucideChevronDown,
  LucideChevronRight,
  LucideClock,
  LucideCloudSun,
  LucideCopy,
  LucideDoorOpen,
  LucideDynamicIcon,
  LucideEllipsisVertical,
  LucideGitBranch,
  LucideHourglass,
  LucideIcon,
  LucideImagePlus,
  LucideListChecks,
  LucideMessageSquareText,
  LucideOctagonX,
  LucidePlay,
  LucidePlus,
  LucideTrash,
  LucideVariable,
  LucideVolume2,
  LucideX,
  LucideArrowUp,
  LucideArrowDown,
  LucideBackpack,
  LucideCoins,
  LucideUsers,
  LucideSwords,
} from "@lucide/angular";
import { loadDatabase } from "../../database-editor/shared/database-storage";
import { ITEM_COUNT_MAX, MONEY_MAX } from "../../database-editor/shared/party";
import { EscapeService } from "../../../core/shared/service/escape.service";
import {
  EventAction,
  EventActionType,
  EventConditions,
  EventTrigger,
  MAX_BRANCH_DEPTH,
  MAX_CHOICE_OPTIONS,
  ObjectEvent,
  PORTRAITS,
} from "../shared/model/ObjectEvent";
import { VariableTest } from "../shared/model/SceneEvent";
import { WEATHER_CHOICES } from "../shared/weather/Weather";
import { WeatherPickerComponent } from "../weather-picker/weather-picker.component";
import { playSound, SOUND_CHOICES } from "../shared/services/sfx";
import { loadVariables } from "../../variables-editor/shared/variable-storage";
import {
  clampCounter,
  GameVariable,
} from "../../variables-editor/shared/variables";

const TRIGGERS: { id: EventTrigger; label: string; help: string }[] = [
  {
    id: "action",
    label: "Parler",
    help: "Le joueur appuie sur la touche d'action à côté de l'objet.",
  },
  {
    id: "enter",
    label: "Entrer dessus",
    help: "Le joueur marche sur l'objet (une zone invisible, un tapis…). Rejoué seulement après en être sorti.",
  },
  {
    id: "auto",
    label: "Automatique",
    help: "Dès que les conditions deviennent vraies, où que soit le joueur sur la carte. Rejoué seulement après qu'elles sont redevenues fausses.",
  },
];

/** The sorts of action, in the add sheet's order. Choix, Condition, Combat: branches (not deeper than MAX_BRANCH_DEPTH). */
const ACTIONS: {
  type: EventActionType;
  label: string;
  icon: LucideIcon;
  branches?: boolean;
}[] = [
  { type: "message", label: "Message", icon: LucideMessageSquareText },
  { type: "choice", label: "Choix", icon: LucideListChecks, branches: true },
  { type: "if", label: "Condition", icon: LucideGitBranch, branches: true },
  { type: "variable", label: "Variable", icon: LucideVariable },
  { type: "teleport", label: "Téléporter", icon: LucideDoorOpen },
  { type: "weather", label: "Météo", icon: LucideCloudSun },
  { type: "sound", label: "Son", icon: LucideVolume2 },
  { type: "wait", label: "Attendre", icon: LucideHourglass },
  { type: "stop", label: "Arrêter", icon: LucideOctagonX },
  { type: "item", label: "Objet", icon: LucideBackpack },
  { type: "money", label: "Argent", icon: LucideCoins },
  { type: "party", label: "Équipe", icon: LucideUsers },
  { type: "fight", label: "Combat", icon: LucideSwords, branches: true },
];

const COUNTER_TESTS: { op: VariableTest["op"]; label: string }[] = [
  { op: "eq", label: "=" },
  { op: "ne", label: "≠" },
  { op: "gte", label: "≥" },
  { op: "lte", label: "≤" },
];

/** A branch of a choice (answer k: 'o0', 'o1'…) or of a condition. */
export type BranchKey = string;
/** Where a list of actions is in the tree: from the event's list, the action i of each list and the branch taken. */
export type ListPath = { i: number; b: BranchKey }[];
/** The event's own conditions (null), or those of a condition action. */
type CondTarget = { path: ListPath; i: number } | null;
/** The weather window: for a « Météo » action, or for conditions. */
type WeatherPick =
  | { kind: "action"; path: ListPath; i: number; current: string }
  | { kind: "cond"; target: CondTarget; exclude: string[] };

/** The list of actions of a branch of an action (null: it has no such branch). */
function branchList(action: EventAction, b: BranchKey): EventAction[] | null {
  if (action.type === "choice" && b.startsWith("o")) {
    return action.options[Number(b.slice(1))]?.actions ?? null;
  }
  if (action.type === "if" && (b === "then" || b === "else")) {
    return action[b];
  }
  if (
    action.type === "fight" &&
    (b === "win" || b === "lose" || b === "flee")
  ) {
    return action[b];
  }
  return null;
}

/** The branches of an action (none for a simple action). */
function branchesOf(action: EventAction): EventAction[][] {
  switch (action.type) {
    case "choice":
      return action.options.map((o) => o.actions);
    case "if":
      return [action.then, action.else];
    case "fight":
      return [action.win, action.lose, action.flee];
    default:
      return [];
  }
}

function listAt(event: ObjectEvent, path: ListPath): EventAction[] {
  let list = event.actions;
  for (const step of path) {
    const next = list[step.i] && branchList(list[step.i], step.b);
    if (!next) {
      return [];
    }
    list = next;
  }
  return list;
}

/** Actions of a list, those of its branches counted. */
function countActions(list: EventAction[]): number {
  return list.reduce(
    (n, a) =>
      n + 1 + branchesOf(a).reduce((m, branch) => m + countActions(branch), 0),
    0
  );
}

function plural(n: number, word: string): string {
  return `${n} ${word}${n > 1 ? "s" : ""}`;
}

/**
 * The event window of the map editor (an object's event): what starts it, the conditions that must be true, the
 * actions played one after the other. Choices and conditions hold branches, each its own list of actions (a tree, as
 * in RPG Maker). Works on a copy, given back when the window closes (✕, Terminé, Escape, the backdrop): one undo step
 * in the editor.
 */
@Component({
  selector: "game-event-editor",
  imports: [
    NgTemplateOutlet,
    LucideDynamicIcon,
    LucideChevronDown,
    LucideChevronRight,
    LucideClock,
    LucideCloudSun,
    LucideCopy,
    LucideEllipsisVertical,
    LucideImagePlus,
    LucidePlay,
    LucidePlus,
    LucideTrash,
    LucideVariable,
    LucideX,
    LucideArrowUp,
    LucideArrowDown,
    LucideBackpack,
    LucideCoins,
    LucideUsers,
    WeatherPickerComponent,
  ],
  templateUrl: "./event-editor.component.html",
  styleUrl: "./event-editor.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventEditorComponent {
  readonly event = input.required<ObjectEvent>();
  /** Its place in the object's list (from 1). */
  readonly number = input(1);
  readonly objectName = input("");
  readonly maps = input<{ id: string; name: string }[]>([]);
  readonly currentMap = input("");
  /** Closed: the event as edited. */
  readonly closed = output<ObjectEvent>();
  readonly removed = output<void>();

  protected readonly draft = linkedSignal(() => structuredClone(this.event()));
  protected readonly triggers = TRIGGERS;
  protected readonly actionTypes = ACTIONS;
  protected readonly counterTests = COUNTER_TESTS;
  protected readonly variables: GameVariable[] = loadVariables();
  protected readonly sounds = SOUND_CHOICES;
  protected readonly portraits = PORTRAITS;
  protected readonly hourList = Array.from({ length: 24 }, (_, h) => h);
  protected readonly maxOptions = MAX_CHOICE_OPTIONS;
  protected readonly root: ListPath = [];
  /** The database: items, characters (of the team), groups of enemies. */
  protected readonly db = loadDatabase();
  protected readonly teamCharacters = this.db.characters.filter((c) => c.team);
  protected readonly countMax = ITEM_COUNT_MAX;
  protected readonly moneyMax = MONEY_MAX;

  /** The trigger and conditions unfolded (folded into one line once the event has actions: room for the tree). */
  protected readonly headOpen = linkedSignal(() => {
    const actions = this.event().actions;
    return (
      actions.length === 0 ||
      (actions.length === 1 &&
        actions[0].type === "message" &&
        !actions[0].text)
    );
  });
  /** Folded actions and branches (keys, see foldKey). */
  protected readonly folded = signal(new Set<string>());
  /** The action whose ⋮ menu is open (key). */
  protected readonly menuOpen = signal<string | null>(null);
  /** The add sheet: the list it adds to, and its name. */
  protected readonly adding = signal<{ path: ListPath; label: string } | null>(
    null
  );

  protected readonly headSummary = computed(() => {
    const e = this.draft();
    const parts = [TRIGGERS.find((t) => t.id === e.trigger)?.label ?? ""];
    if (e.face && e.trigger === "action") {
      parts.push("se tourne vers le joueur");
    }
    const c = e.conditions;
    const n =
      c.variables.length +
      (c.hours ? 1 : 0) +
      (c.weathers ? 1 : 0) +
      (c.items?.length ?? 0) +
      (c.money ? 1 : 0) +
      (c.members?.length ?? 0);
    parts.push(n ? plural(n, "condition") : "sans condition");
    return parts.join(" · ");
  });

  constructor() {
    // Escape: the add sheet or the ⋮ menu first, then the window
    inject(EscapeService).whileAlive(() => {
      if (this.adding()) {
        this.adding.set(null);
      } else if (this.menuOpen()) {
        this.menuOpen.set(null);
      } else {
        this.close();
      }
    });
  }

  protected close(): void {
    this.closed.emit(this.draft());
  }

  /** Changes the copy (given a fresh clone to change). */
  private change(fn: (event: ObjectEvent) => void): void {
    this.draft.update((event) => {
      const copy = structuredClone(event);
      fn(copy);
      return copy;
    });
  }

  protected setTrigger(trigger: EventTrigger): void {
    this.change((e) => (e.trigger = trigger));
  }

  protected triggerHelp(): string {
    return TRIGGERS.find((t) => t.id === this.draft().trigger)?.help ?? "";
  }

  protected setFace(face: boolean): void {
    this.change((e) => (e.face = face));
  }

  // --- Tree ---

  /** The path of a branch of the action i of a list. */
  protected sub(path: ListPath, i: number, b: BranchKey): ListPath {
    return [...path, { i, b }];
  }

  protected foldKey(path: ListPath, i: number, b = ""): string {
    return path.map((s) => `${s.i}${s.b}`).join("/") + `/${i}${b}`;
  }

  protected isFolded(key: string): boolean {
    return this.folded().has(key);
  }

  protected toggleFold(key: string): void {
    this.folded.update((set) => {
      const copy = new Set(set);
      if (copy.has(key)) {
        copy.delete(key);
      } else {
        copy.add(key);
      }
      return copy;
    });
  }

  protected canBranch(path: ListPath): boolean {
    return path.length < MAX_BRANCH_DEPTH;
  }

  protected info(type: EventActionType) {
    return ACTIONS.find((a) => a.type === type)!;
  }

  protected openAdd(path: ListPath, label: string): void {
    this.menuOpen.set(null);
    this.adding.set({ path, label });
  }

  protected addAction(type: EventActionType): void {
    const target = this.adding();
    const action = target && this.newAction(type, target.path);
    this.adding.set(null);
    if (target && action) {
      this.change((e) => listAt(e, target.path).push(action));
    }
  }

  private newAction(type: EventActionType, path: ListPath): EventAction | null {
    switch (type) {
      case "message": {
        // (said by the same one, with the same face, as the last message of the list)
        const last = [...listAt(this.draft(), path)]
          .reverse()
          .find((a) => a.type === "message");
        return last?.type === "message"
          ? {
              type,
              ...(last.name ? { name: last.name } : {}),
              ...(last.pic ? { pic: last.pic } : {}),
              text: "",
            }
          : { type, text: "" };
      }
      case "choice":
        return {
          type,
          options: [
            { text: "Oui", actions: [] },
            { text: "Non", actions: [] },
          ],
        };
      case "if":
        return {
          type,
          conditions: this.variables[0]
            ? { variables: [this.defaultTest(this.variables[0])] }
            : { variables: [], hours: { from: 8, to: 18 } },
          then: [],
          else: [],
        };
      case "variable": {
        const first = this.variables[0];
        return first
          ? {
              type,
              id: first.id,
              op: "set",
              value: first.kind === "flag" ? true : 1,
            }
          : null;
      }
      case "teleport": {
        const map =
          this.maps().find((m) => m.id !== this.currentMap()) ?? this.maps()[0];
        return map ? { type, map: map.id } : null;
      }
      case "weather":
        return { type, weather: "rainy" };
      case "sound":
        return { type, sound: "bip" };
      case "wait":
        return { type, seconds: 1 };
      case "stop":
        return { type };
      case "item":
        return this.db.items[0]
          ? { type, item: this.db.items[0].id, amount: 1 }
          : null;
      case "money":
        return { type, amount: 100 };
      case "party":
        return this.teamCharacters[0]
          ? { type, character: this.teamCharacters[0].id, join: true }
          : null;
      case "fight":
        return this.db.groups[0]
          ? { type, group: this.db.groups[0].id, win: [], lose: [], flee: [] }
          : null;
    }
  }

  /** Can this action be added (the database has what it needs)? */
  protected canAdd(type: EventActionType): boolean {
    switch (type) {
      case "variable":
        return this.variables.length > 0;
      case "item":
        return this.db.items.length > 0;
      case "party":
        return this.teamCharacters.length > 0;
      case "fight":
        return this.db.groups.length > 0;
      default:
        return true;
    }
  }

  protected itemName(id: string): string | undefined {
    return this.db.items.find((i) => i.id === id)?.name;
  }

  protected characterName(id: string): string | undefined {
    return this.db.characters.find((c) => c.id === id)?.name;
  }

  protected group(id: string) {
    return this.db.groups.find((g) => g.id === id);
  }

  /** « Gluant ×2 · Chauve-souris » */
  protected groupMembers(id: string): string {
    const group = this.group(id);
    if (!group) {
      return "";
    }
    const counts = new Map<string, number>();
    group.members.forEach((m) =>
      counts.set(m.enemy, (counts.get(m.enemy) ?? 0) + 1)
    );
    return [...counts]
      .map(
        ([e, n]) =>
          `${this.db.enemies.find((en) => en.id === e)?.name ?? "?"}${n > 1 ? ` ×${n}` : ""}`
      )
      .join(" · ");
  }

  /** The same amount, given (+) or taken (−). */
  protected signed(amount: number, take: boolean): number {
    return (take ? -1 : 1) * Math.abs(amount);
  }

  protected wholeNumber(raw: string, min: number, max: number): number {
    const n = Math.round(Number(raw));
    return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min;
  }

  protected setAction(
    path: ListPath,
    i: number,
    patch: Partial<EventAction>
  ): void {
    this.change((e) => {
      const list = listAt(e, path);
      list[i] = { ...list[i], ...patch } as EventAction;
    });
  }

  protected moveAction(path: ListPath, i: number, by: -1 | 1): void {
    this.menuOpen.set(null);
    this.change((e) => {
      const list = listAt(e, path);
      const [action] = list.splice(i, 1);
      list.splice(i + by, 0, action);
    });
  }

  protected duplicateAction(path: ListPath, i: number): void {
    this.menuOpen.set(null);
    this.change((e) => {
      const list = listAt(e, path);
      list.splice(i + 1, 0, structuredClone(list[i]));
    });
  }

  protected removeAction(path: ListPath, i: number): void {
    this.menuOpen.set(null);
    this.change((e) => listAt(e, path).splice(i, 1));
  }

  /** « « Oui » · 2 actions · « Non » · 1 action » (a folded choice), « Alors : 1 action · Sinon : 0 action ». */
  protected foldedSummary(action: EventAction): string {
    if (action.type === "choice") {
      return action.options
        .map(
          (o) => `« ${o.text} » · ${plural(countActions(o.actions), "action")}`
        )
        .join(" · ");
    }
    if (action.type === "if") {
      return `Alors : ${plural(countActions(action.then), "action")} · Sinon : ${plural(countActions(action.else), "action")}`;
    }
    if (action.type === "fight") {
      return `Victoire : ${countActions(action.win)} · Défaite : ${countActions(action.lose)} · Fuite : ${countActions(action.flee)}`;
    }
    return "";
  }

  protected count(list: EventAction[]): string {
    return plural(countActions(list), "action");
  }

  // --- Choices ---

  protected setOption(
    path: ListPath,
    i: number,
    k: number,
    text: string
  ): void {
    this.change((e) => {
      const action = listAt(e, path)[i];
      if (action.type === "choice") {
        action.options[k].text = text.trim() || `Réponse ${k + 1}`;
      }
    });
  }

  protected addOption(path: ListPath, i: number): void {
    this.change((e) => {
      const action = listAt(e, path)[i];
      if (
        action.type === "choice" &&
        action.options.length < MAX_CHOICE_OPTIONS
      ) {
        action.options.push({
          text: `Réponse ${action.options.length + 1}`,
          actions: [],
        });
      }
    });
  }

  /** An answer goes, with its actions (two answers at least). */
  protected removeOption(path: ListPath, i: number, k: number): void {
    this.change((e) => {
      const action = listAt(e, path)[i];
      if (action.type === "choice" && action.options.length > 2) {
        action.options.splice(k, 1);
      }
    });
  }

  // --- Conditions (the event's, or a condition action's) ---

  private changeConds(
    target: CondTarget,
    fn: (c: EventConditions) => void
  ): void {
    this.change((e) => {
      if (!target) {
        fn(e.conditions);
        return;
      }
      const action = listAt(e, target.path)[target.i];
      if (action?.type === "if") {
        fn(action.conditions);
      }
    });
  }

  protected condTarget(path: ListPath, i: number): CondTarget {
    return { path, i };
  }

  protected variable(id: string): GameVariable | undefined {
    return this.variables.find((v) => v.id === id);
  }

  private defaultTest(variable: GameVariable): VariableTest {
    return variable.kind === "flag"
      ? { id: variable.id, op: "is", value: true }
      : { id: variable.id, op: "gte", value: 1 };
  }

  protected addVariableTest(target: CondTarget): void {
    const first = this.variables[0];
    if (first) {
      this.changeConds(target, (c) =>
        c.variables.push(this.defaultTest(first))
      );
    }
  }

  protected setTestVariable(
    target: CondTarget,
    index: number,
    id: string
  ): void {
    const variable = this.variable(id);
    if (variable) {
      this.changeConds(
        target,
        (c) => (c.variables[index] = this.defaultTest(variable))
      );
    }
  }

  protected setTest(
    target: CondTarget,
    index: number,
    test: Partial<VariableTest>
  ): void {
    this.changeConds(
      target,
      (c) => (c.variables[index] = { ...c.variables[index], ...test })
    );
  }

  protected removeTest(target: CondTarget, index: number): void {
    this.changeConds(target, (c) => c.variables.splice(index, 1));
  }

  protected setHours(
    target: CondTarget,
    hours: { from: number; to: number } | undefined
  ): void {
    this.changeConds(target, (c) => {
      if (hours) {
        c.hours = hours;
      } else {
        delete c.hours;
      }
    });
  }

  // The team: items carried, money, members

  protected addItemTest(target: CondTarget): void {
    const first = this.db.items[0];
    if (first) {
      this.changeConds(
        target,
        (c) => (c.items = [...(c.items ?? []), { id: first.id, count: 1 }])
      );
    }
  }

  protected setItemTest(
    target: CondTarget,
    index: number,
    change: Partial<{ id: string; count: number }>
  ): void {
    this.changeConds(
      target,
      (c) => (c.items![index] = { ...c.items![index], ...change })
    );
  }

  protected removeItemTest(target: CondTarget, index: number): void {
    this.changeConds(target, (c) => {
      c.items!.splice(index, 1);
      if (c.items!.length === 0) {
        delete c.items;
      }
    });
  }

  protected setMoneyTest(target: CondTarget, money: number | undefined): void {
    this.changeConds(target, (c) => {
      if (money) {
        c.money = money;
      } else {
        delete c.money;
      }
    });
  }

  protected addMemberTest(target: CondTarget): void {
    const first = this.teamCharacters[0];
    if (first) {
      this.changeConds(
        target,
        (c) => (c.members = [...(c.members ?? []), first.id])
      );
    }
  }

  protected setMemberTest(target: CondTarget, index: number, id: string): void {
    this.changeConds(target, (c) => (c.members![index] = id));
  }

  protected removeMemberTest(target: CondTarget, index: number): void {
    this.changeConds(target, (c) => {
      c.members!.splice(index, 1);
      if (c.members!.length === 0) {
        delete c.members;
      }
    });
  }

  protected readonly weatherPick = signal<WeatherPick | null>(null);

  protected openWeatherPick(pick: WeatherPick): void {
    this.weatherPick.set(pick);
  }

  protected weatherPicked(type: string): void {
    const pick = this.weatherPick();
    if (pick?.kind === "action") {
      this.setAction(pick.path, pick.i, { weather: type });
    } else if (pick) {
      this.addWeather(pick.target, type);
    }
  }

  protected addWeather(target: CondTarget, type: string): void {
    if (type) {
      this.changeConds(
        target,
        (c) => (c.weathers = [...new Set([...(c.weathers ?? []), type])])
      );
    }
  }

  protected removeWeather(target: CondTarget, type: string): void {
    this.changeConds(target, (c) => {
      c.weathers = (c.weathers ?? []).filter((w) => w !== type);
      if (c.weathers.length === 0) {
        delete c.weathers;
      }
    });
  }

  protected weatherLabel(type: string): string {
    const choice = WEATHER_CHOICES.find((w) => w.type === type);
    return choice ? `${choice.icon} ${choice.label}` : type;
  }

  // --- Fields ---

  /** Another variable: its kind decides the change (a flag becomes true, a counter is set to 1). */
  protected setActionVariable(path: ListPath, i: number, id: string): void {
    const variable = this.variable(id);
    if (variable) {
      this.setAction(path, i, {
        type: "variable",
        id,
        op: "set",
        value: variable.kind === "flag" ? true : 1,
      });
    }
  }

  protected counterValue(raw: string): number {
    return clampCounter(Number(raw));
  }

  protected play(sound: string): void {
    playSound(sound, true);
  }

  protected seconds(raw: string): number {
    const value = Math.round(Number(raw) * 10) / 10;
    return Number.isFinite(value) ? Math.min(60, Math.max(0.1, value)) : 1;
  }

  protected value(event: Event): string {
    return (
      event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    ).value;
  }

  protected checked(event: Event): boolean {
    return (event.target as HTMLInputElement).checked;
  }
}
