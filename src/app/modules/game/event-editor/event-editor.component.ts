import { loadMap } from "../shared/services/map-storage";
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
  LucideArrowDown,
  LucideScan,
  LucideFlaskConical,
  LucideArrowUp,
  LucideBackpack,
  LucideChevronDown,
  LucideChevronRight,
  LucideCloudSun,
  LucideCoins,
  LucideCopy,
  LucideDoorOpen,
  LucideDynamicIcon,
  LucideEllipsisVertical,
  LucideGitBranch,
  LucideHourglass,
  LucideIcon,
  LucideListChecks,
  LucideMessageSquareText,
  LucideOctagonX,
  LucidePlus,
  LucideMove3d,
  LucideClapperboard,
  LucideSwords,
  LucideTrash,
  LucideUsers,
  LucideHeartPulse,
  LucideHeartHandshake,
  LucideGift,
  LucideFootprints,
  LucideStore,
  LucideCirclePause,
  LucideVariable,
  LucideVolume2,
  LucideX,
} from "@lucide/angular";
import { EscapeService } from "../../../core/shared/service/escape.service";
import {
  EventAction,
  EventActionType,
  EventConditions,
  EventTrigger,
  MAX_BRANCH_DEPTH,
  ObjectEvent,
} from "../shared/model/ObjectEvent";
import { WeatherPickerComponent } from "../weather-picker/weather-picker.component";
import { EventActionComponent } from "./event-action/event-action.component";
import { EventConditionsComponent } from "./event-conditions/event-conditions.component";
import {
  countConditions,
  defaultTest,
  EventEditorData,
  fieldChecked,
  plural,
} from "./event-editor-data";

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
  { type: "team", label: "L'équipe suit / se cache", icon: LucideFootprints },
  { type: "heal", label: "Soigner l'équipe", icon: LucideHeartPulse },
  { type: "link", label: "Lien", icon: LucideHeartHandshake },
  { type: "gift", label: "Offrir un cadeau", icon: LucideGift },
  { type: "shop", label: "Ouvrir la boutique", icon: LucideStore },
  { type: "time", label: "Faire passer le temps", icon: LucideHourglass },
  {
    type: "timeFlow",
    label: "Arrêter / reprendre le temps",
    icon: LucideCirclePause,
  },
  { type: "animate", label: "Animer l'objet", icon: LucideMove3d },
  {
    type: "cutscene",
    label: "Jouer la cinématique",
    icon: LucideClapperboard,
  },
  { type: "fight", label: "Combat", icon: LucideSwords, branches: true },
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

/** A branch drawn under its action: its list, its key, its name, its colour. */
interface Branch {
  b: BranchKey;
  list: EventAction[];
  label: string;
  /** For « Ajouter dans « … » ». */
  name: string;
  color: "orange" | "blue" | "red";
}

/**
 * The event window of the map editor (an object's event): what starts it, the conditions that must be true, the
 * actions played one after the other. Choices and conditions hold branches, each its own list of actions (a tree, as
 * in RPG Maker). Works on a copy, given back when the window closes (✕, Terminé, Escape, the backdrop): one undo step
 * in the editor.
 */
import { ZoneEditorComponent } from "../zone-editor/zone-editor.component";
import { ActionZone, zoneSummary } from "../shared/model/action-zone";
@Component({
  selector: "game-event-editor",
  imports: [
    NgTemplateOutlet,
    ZoneEditorComponent,
    LucideDynamicIcon,
    LucideArrowDown,
    LucideFlaskConical,
    LucideScan,
    LucideArrowUp,
    LucideChevronDown,
    LucideChevronRight,
    LucideCopy,
    LucideEllipsisVertical,
    LucidePlus,
    LucideTrash,
    LucideX,
    EventActionComponent,
    EventConditionsComponent,
    WeatherPickerComponent,
  ],
  templateUrl: "./event-editor.component.html",
  styleUrl: "./event-editor.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EventEditorData],
})
export class EventEditorComponent {
  readonly event = input.required<ObjectEvent>();
  /** Its place in the object's list (from 1). */
  readonly number = input(1);
  readonly objectName = input("");
  readonly maps = input<{ id: string; name: string }[]>([]);
  readonly currentMap = input("");
  /** The object's action zone (its own or its model's; null: the whole object) and its grid. */
  readonly objectZone = input<ActionZone | null>(null);
  readonly zoneGrid = input<{ cols: number; rows: number }>({
    cols: 1,
    rows: 1,
  });
  protected readonly zoneSummary = zoneSummary;
  /** Closed: the event as edited. */
  readonly closed = output<ObjectEvent>();
  readonly removed = output<void>();
  /** Tester (design/main-view.pen, Mode test): the event as edited, tried in a test. */
  readonly test = output<ObjectEvent>();

  protected readonly draft = linkedSignal(() => structuredClone(this.event()));
  protected readonly triggers = TRIGGERS;
  protected readonly actionTypes = ACTIONS;
  protected readonly root: ListPath = [];
  protected readonly checked = fieldChecked;
  private readonly data = inject(EventEditorData);

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
    const n = countConditions(e.conditions);
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

  /** Its own action zone (starting as the object's), or the object's again. */
  protected setOwnZone(own: boolean): void {
    this.change((e) => {
      if (!own) {
        delete e.zone;
        return;
      }
      const base = this.objectZone();
      const grid = this.zoneGrid();
      const fits =
        base?.grid.cols === grid.cols && base?.grid.rows === grid.rows;
      e.zone = {
        grid,
        cells: fits ? [...base.cells] : [],
        side: base?.side ?? "front",
      };
    });
  }

  protected setZone(zone: ActionZone): void {
    this.change((e) => (e.zone = zone));
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
          conditions: this.data.variables[0]
            ? { variables: [defaultTest(this.data.variables[0])] }
            : { variables: [], hours: { from: 8, to: 18 } },
          then: [],
          else: [],
        };
      case "variable": {
        const first = this.data.variables[0];
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
      case "heal":
        return { type };
      case "time":
        return { type, mode: "until", hours: 2, moment: "evening" };
      case "timeFlow":
        return { type, stop: true };
      case "team":
        return { type, follow: false };
      case "animate":
        return { type, object: "", mode: "play", wait: true };
      case "cutscene": {
        const first = loadMap(this.currentMap())?.cutscenes?.[0];
        return { type, cutscene: first?.id ?? "" };
      }
      case "link": {
        const first = this.data.linkTargets[0];
        return first ? { type, target: first.id, points: 3 } : null;
      }
      case "gift": {
        const first = this.data.npcs[0];
        return first ? { type, target: first.id } : null;
      }
      case "shop": {
        const first = this.data.db.shops[0];
        return first ? { type, shop: first.id } : null;
      }
      case "item":
        return this.data.db.items[0]
          ? { type, item: this.data.db.items[0].id, amount: 1 }
          : null;
      case "money":
        return { type, amount: 100 };
      case "party":
        return this.data.teamCharacters[0]
          ? { type, character: this.data.teamCharacters[0].id, join: true }
          : null;
      case "fight":
        return this.data.db.groups[0]
          ? {
              type,
              group: this.data.db.groups[0].id,
              win: [],
              lose: [],
              flee: [],
            }
          : null;
    }
  }

  /** Can this action be added (the database has what it needs)? */
  protected canAdd(type: EventActionType): boolean {
    switch (type) {
      case "variable":
        return this.data.variables.length > 0;
      case "item":
        return this.data.db.items.length > 0;
      case "party":
        return this.data.teamCharacters.length > 0;
      case "fight":
        return this.data.db.groups.length > 0;
      case "teleport":
        return this.maps().length > 0;
      default:
        return true;
    }
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

  /** The branches drawn under an action (a choice's answers, a condition's Alors / Sinon, a fight's ends). */
  protected branches(action: EventAction): Branch[] {
    switch (action.type) {
      case "choice":
        return action.options.map((o, k) => ({
          b: `o${k}`,
          list: o.actions,
          label: `Si « ${o.text} »`,
          name: o.text,
          color: "orange",
        }));
      case "if":
        return [
          {
            b: "then",
            list: action.then,
            label: "Alors",
            name: "Alors",
            color: "blue",
          },
          {
            b: "else",
            list: action.else,
            label: "Sinon",
            name: "Sinon",
            color: "blue",
          },
        ];
      case "fight": {
        const fight: [BranchKey, EventAction[], string][] = [
          ["win", action.win, "Victoire"],
          ["lose", action.lose, "Défaite"],
        ];
        // (no flight from a group that forbids it)
        if (this.data.group(action.group)?.canFlee ?? true) {
          fight.push(["flee", action.flee, "Fuite"]);
        }
        return fight.map(([b, list, label]) => ({
          b,
          list,
          label,
          name: label,
          color: "red",
        }));
      }
      default:
        return [];
    }
  }

  // --- Conditions (the event's, or a condition action's) ---

  /** The event's own conditions (null), or those of the condition action i of a list. */
  private changeConds(
    target: CondTarget,
    fn: (c: EventConditions) => EventConditions
  ): void {
    this.change((e) => {
      if (!target) {
        e.conditions = fn(e.conditions);
        return;
      }
      const action = listAt(e, target.path)[target.i];
      if (action?.type === "if") {
        action.conditions = fn(action.conditions);
      }
    });
  }

  protected setConditions(
    target: CondTarget,
    conditions: EventConditions
  ): void {
    this.changeConds(target, () => conditions);
  }

  protected condTarget(path: ListPath, i: number): CondTarget {
    return { path, i };
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

  private addWeather(target: CondTarget, type: string): void {
    if (type) {
      this.changeConds(target, (c) => ({
        ...c,
        weathers: [...new Set([...(c.weathers ?? []), type])],
      }));
    }
  }
}
