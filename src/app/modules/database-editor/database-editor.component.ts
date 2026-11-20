import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from "@angular/core";
import {
  LucideActivity,
  LucideBackpack,
  LucideBan,
  LucideSkull,
  LucideSwords,
  LucideEighthNotes,
  LucideCoins,
  LucideStar,
  LucideGitBranch,
  LucideBox,
  LucideRotateCcw,
  LucideCheck,
  LucideLock,
  LucideSparkles,
  LucideUsers,
  LucideChevronDown,
  LucideChevronLeft,
  LucideChevronRight,
  LucideCopy,
  LucideDownload,
  LucideFlame,
  LucideIcon,
  LucideInfo,
  LucidePencil,
  LucidePlus,
  LucideSearch,
  LucideSword,
  LucideTrash,
  LucideX,
  LucideDynamicIcon,
  LucideArrowUp,
  LucideArrowDown,
  LucideSigma,
} from "@lucide/angular";
import { downloadFile } from "../game/shared/util/ts-source";
import { WEATHER_CHOICES, WeatherType } from "../game/shared/weather/Weather";
import { weatherScreenshot } from "../game/shared/weather/weather-catalog";
import {
  AFFINITIES,
  Affinity,
  BehaviorCondition,
  DAY_TIMES,
  DayTime,
  DbEnemy,
  DbGroup,
  ENEMY_SPRITE_SIZE,
  freeSpot,
  groupLabel,
  newEnemy,
  newGroup,
  WEIGHTS,
  BONUS_MAX,
  CAST_MAX,
  CharacterStat,
  DbCharacter,
  growthOf,
  learnState,
  newCharacter,
  PICTURE_SIZES,
  STAT_CURVES,
  statAt,
  XP_CURVES,
  XpCurve,
  castLabel,
  clampInt,
  composableElements,
  DbElement,
  DbItem,
  DbSkill,
  DbState,
  DbTable,
  DbWeapon,
  defaultLearn,
  ELEMENT_COLORS,
  EQUIP_SLOTS,
  EquipSlot,
  ITEM_KINDS,
  ItemKind,
  newItem,
  PRICE_MAX,
  RESIST_LEVELS,
  ResistLevel,
  withItemKind,
  XP_MAX,
  formulaProblem,
  GameDatabase,
  LEARN_MAX,
  learnChoices,
  LEVEL_MAX,
  MP_MAX,
  newElement,
  newId,
  newSkill,
  newSkillEffect,
  newState,
  newStateEffect,
  newWeapon,
  partsLabel,
  PERCENT_MAX,
  POWER_MAX,
  SKILL_TARGETS,
  SKILL_USES,
  SkillEffect,
  SkillEffectKind,
  SkillTarget,
  SkillUse,
  StateEffect,
  StateEffectKind,
  StatId,
  STATS,
  TURNS_MAX,
  withoutRow,
} from "./shared/database";
import { loadDatabase, saveDatabase } from "./shared/database-storage";
import { PixelEditorComponent } from "./pixel-editor/pixel-editor.component";
import { StepperComponent } from "./stepper/stepper.component";
import { WeatherPickerComponent } from "../game/weather-picker/weather-picker.component";
import { MODEL_CHOICES, modelLabel } from "../game/shared/model/ModelChoice";
import { loadSongs } from "../music-editor/shared/song-storage";
import { omit } from "../../core/shared/omit";

type Row =
  | DbElement
  | DbWeapon
  | DbState
  | DbSkill
  | DbItem
  | DbCharacter
  | DbEnemy
  | DbGroup;
/** A character's picture drawn in the pixel editor (icon: the small face). */
type PictureField = keyof typeof PICTURE_SIZES;
/** What has effects: skills and items. */
type HasEffects = DbSkill | DbItem;

/** In the mockup's order. */
const TABLES: { id: DbTable; label: string; one: string; icon: LucideIcon }[] =
  [
    {
      id: "characters",
      label: "Personnages",
      one: "Personnage",
      icon: LucideUsers,
    },
    { id: "enemies", label: "Ennemis", one: "Ennemi", icon: LucideSkull },
    { id: "groups", label: "Groupes", one: "Groupe", icon: LucideSwords },
    {
      id: "skills",
      label: "Compétences",
      one: "Compétence",
      icon: LucideSparkles,
    },
    { id: "items", label: "Objets", one: "Objet", icon: LucideBackpack },
    { id: "states", label: "États", one: "État", icon: LucideActivity },
    { id: "elements", label: "Éléments", one: "Élément", icon: LucideFlame },
    { id: "weapons", label: "Armes", one: "Type d'arme", icon: LucideSword },
  ];

const SKILL_EFFECT_LABELS: Record<SkillEffectKind, string> = {
  damage: "Dégâts",
  heal: "Soin",
  addState: "Donner un état",
  removeState: "Guérir un état",
  stat: "Stat",
  statUp: "Stat pour toujours",
  xp: "Expérience",
};

const EFFECT_LABELS: Record<StateEffectKind, string> = {
  hp: "PV par tour",
  mp: "PM par tour",
  stat: "Stat",
  skip: "Passe son tour",
};

/** Wide enough for the list and the sheet side by side. */
const SIDE_BY_SIDE = "(min-width: 760px)";

/**
 * Database editor (docs/idees.md, point 5): one tab per table, the list then the row's sheet (side by side on wide
 * screens). Saved in the browser at every change; Exporter writes the game's file (src/assets/database/database.ts).
 * Tables: characters (looks, levels, stats, element and weapon levels, equipment), skills (cost, cast time, effects, the levels they are learned with), items (consumables, equipment,
 * key items, gifts), states, elements (with their weathers, simple or composed), weapon types.
 */
@Component({
  selector: "app-database-editor",
  imports: [
    LucideBan,
    LucideCoins,
    LucideStar,
    LucideGitBranch,
    LucideEighthNotes,
    LucideBox,
    LucideCheck,
    LucideLock,
    LucideRotateCcw,
    LucideChevronDown,
    LucideChevronLeft,
    LucideChevronRight,
    LucideCopy,
    LucideDownload,
    LucideDynamicIcon,
    LucideInfo,
    LucidePencil,
    LucidePlus,
    LucideSearch,
    LucideTrash,
    LucideX,
    LucideArrowUp,
    LucideArrowDown,
    LucideSigma,
    NgTemplateOutlet,
    PixelEditorComponent,
    StepperComponent,
    WeatherPickerComponent,
  ],
  templateUrl: "./database-editor.component.html",
  styleUrl: "./database-editor.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "(document:keydown)": "keydown($event)" },
})
export class DatabaseEditorComponent {
  /** Opened over the game (Jeu closes the panel instead of going to the game's page). */
  readonly embedded = input(false);
  readonly closed = output<void>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly tables = TABLES;
  protected readonly stats = STATS;
  protected readonly colors = ELEMENT_COLORS;
  protected readonly effectKinds: StateEffectKind[] = [
    "hp",
    "mp",
    "stat",
    "skip",
  ];
  protected readonly effectLabels = EFFECT_LABELS;
  protected readonly turnsMax = TURNS_MAX;
  protected readonly percentMax = PERCENT_MAX;
  protected readonly mpMax = MP_MAX;
  protected readonly powerMax = POWER_MAX;
  protected readonly levelMax = LEVEL_MAX;
  protected readonly castMax = CAST_MAX;
  protected readonly learnMax = LEARN_MAX;
  protected readonly targets = SKILL_TARGETS;
  protected readonly uses = SKILL_USES;
  protected readonly skillEffectKinds: SkillEffectKind[] = [
    "damage",
    "heal",
    "addState",
    "removeState",
    "stat",
  ];
  protected readonly castLabel = castLabel;
  protected readonly itemEffectKinds: SkillEffectKind[] = [
    "heal",
    "addState",
    "removeState",
    "stat",
    "statUp",
    "xp",
  ];
  protected readonly itemKinds = ITEM_KINDS;
  protected readonly slots = EQUIP_SLOTS;
  protected readonly resistLevels = RESIST_LEVELS;
  protected readonly priceMax = PRICE_MAX;
  protected readonly bonusMax = BONUS_MAX;
  protected readonly xpMax = XP_MAX;
  protected readonly affinities = AFFINITIES;
  protected readonly xpCurves = XP_CURVES;
  protected readonly models = MODEL_CHOICES.map((c) => ({
    id: c.model.id,
    label: modelLabel(c.model.id),
  }));
  protected readonly sizes = PICTURE_SIZES;
  protected readonly dayTimes = DAY_TIMES;
  protected readonly weights = WEIGHTS;
  protected readonly resistChoices = [
    { id: "weak", label: "Faible" },
    { id: "normal", label: "Normal" },
    { id: "resist", label: "Résiste" },
    { id: "null", label: "Annule" },
    { id: "absorb", label: "Absorbe" },
  ];
  /** The music editor's songs (a group's music). */
  protected readonly songs = (() => {
    try {
      return loadSongs().songs.map((sg) => ({ id: sg.id, name: sg.name }));
    } catch {
      return [];
    }
  })();
  /** The group's enemy being moved (its place follows the finger, saved when let go), and the one chosen. */
  protected readonly drag = signal<{
    index: number;
    x: number;
    y: number;
  } | null>(null);
  protected readonly memberChosen = signal<number | null>(null);
  /** The character sheet's tab. */
  protected readonly charTab = signal<"general" | "growth">("general");
  /** Items list: only one kind (null: all). */
  protected readonly itemFilter = signal<ItemKind | null>(null);

  protected readonly db = signal<GameDatabase>(loadDatabase());
  protected readonly table = signal<DbTable>("characters");
  protected readonly selectedId = signal<string | null>(null);
  protected readonly search = signal("");
  protected readonly saveFailed = signal(false);
  protected readonly message = signal("");
  /** The row whose Supprimer was pressed once (pressed again within 3 s: deleted). */
  protected readonly deleting = signal<string | null>(null);
  /** The picture being drawn: whose, which one (icon, or a character's portrait / sprite), its title and size. */
  protected readonly iconEdit = signal<{
    id: string;
    field: PictureField;
    title: string;
    value?: string;
    w: number;
    h: number;
  } | null>(null);
  /** The weather window: for which element, on which side (stronger / weaker). */
  protected readonly weatherPick = signal<{
    id: string;
    strong?: boolean;
    for: "element" | "enemy" | "condition";
    index?: number;
  } | null>(null);
  /** The weathers the element already has (not offered again). */
  protected readonly pickExclude = computed(() => {
    const pick = this.weatherPick();
    if (pick?.for === "element") {
      return (
        this.db()
          .elements.find((e) => e.id === pick.id)
          ?.weathers.map((w) => w.weather) ?? []
      );
    }
    return pick?.for === "enemy"
      ? (this.db()
          .enemies.find((e) => e.id === pick.id)
          ?.weathers.map((w) => w.weather) ?? [])
      : [];
  });
  protected readonly pickTitle = computed(() => {
    const pick = this.weatherPick();
    if (pick?.for === "element") {
      return pick.strong ? "Plus fort par" : "Plus faible par";
    }
    return pick?.for === "enemy" ? "Météo de l'ennemi" : "Pendant la météo";
  });

  private readonly media = matchMedia(SIDE_BY_SIDE);
  protected readonly sideBySide = signal(this.media.matches);
  private deleteTimer?: ReturnType<typeof setTimeout>;

  protected readonly tableInfo = computed(() =>
    TABLES.find((t) => t.id === this.table())!
  );
  protected readonly rows = computed<Row[]>(() => this.db()[this.table()]);
  protected readonly shownRows = computed(() => {
    const q = norm(this.search());
    const kind = this.table() === "items" ? this.itemFilter() : null;
    return this.rows().filter(
      (r) =>
        (!q || norm(r.name).includes(q)) &&
        (!kind || (r as DbItem).kind === kind)
    );
  });
  /** The open sheet: the chosen row; side by side, the first one when none is chosen. */
  protected readonly current = computed<Row | null>(() => {
    const rows = this.rows();
    const chosen = rows.find((r) => r.id === this.selectedId());
    return chosen ?? (this.sideBySide() ? (rows[0] ?? null) : null);
  });
  protected readonly element = computed(() =>
    this.table() === "elements" ? (this.current() as DbElement | null) : null
  );
  protected readonly weapon = computed(() =>
    this.table() === "weapons" ? (this.current() as DbWeapon | null) : null
  );
  protected readonly state = computed(() =>
    this.table() === "states" ? (this.current() as DbState | null) : null
  );
  protected readonly skill = computed(() =>
    this.table() === "skills" ? (this.current() as DbSkill | null) : null
  );
  protected readonly item = computed(() =>
    this.table() === "items" ? (this.current() as DbItem | null) : null
  );
  protected readonly enemy = computed(() =>
    this.table() === "enemies" ? (this.current() as DbEnemy | null) : null
  );
  protected readonly group = computed(() =>
    this.table() === "groups" ? (this.current() as DbGroup | null) : null
  );
  /** The open group's enemies, with how many of each. */
  protected readonly groupCounts = computed(() => {
    const g = this.group();
    if (!g) {
      return [];
    }
    const counts = new Map<string, number>();
    g.members.forEach((m) =>
      counts.set(m.enemy, (counts.get(m.enemy) ?? 0) + 1)
    );
    return [...counts].map(([id, count]) => ({
      enemy: this.db().enemies.find((e) => e.id === id),
      id,
      count,
    }));
  });
  protected readonly character = computed(() =>
    this.table() === "characters"
      ? (this.current() as DbCharacter | null)
      : null
  );
  protected readonly teamCharacters = computed(() =>
    this.db().characters.filter((c) => c.team)
  );
  /** The character sheet's element and weapon rows: simple elements, composed ones (they follow their parts), weapon types. */
  protected readonly growthRows = computed(() => {
    const db = this.db();
    return {
      elements: db.elements.filter((e) => !e.physical),
      weapons: db.weapons,
    };
  });
  /** The skills the open character knows from the start, will learn, or never. */
  protected readonly learnables = computed(() => {
    const ch = this.character();
    if (!ch) {
      return [];
    }
    const order = { start: 0, later: 1, never: 2, excluded: 3 };
    return this.db()
      .skills.filter((s) => s.learn.length)
      .map((skill) => ({
        skill,
        state: learnState(ch, skill),
        progress: skill.learn
          .map(
            (l) =>
              `${this.learnName(l.id)} ${growthOf(ch, l.id).level}/${l.level}`
          )
          .join(" · "),
      }))
      .sort((a, b) => order[a.state] - order[b.state]);
  });
  protected readonly learnChoices = computed(() => learnChoices(this.db()));
  /** The formula's problem, if any (shown under it). */
  protected readonly formulaProblem = computed(() =>
    formulaProblem(this.skill()?.formula ?? "")
  );
  /** The formula block is unfolded (always when there is one). */
  protected readonly formulaOpen = signal(false);
  protected readonly composable = computed(() =>
    composableElements(this.db().elements, this.element()?.id)
  );

  constructor() {
    const onMedia = () => this.sideBySide.set(this.media.matches);
    this.media.addEventListener("change", onMedia);
    inject(DestroyRef).onDestroy(() => {
      clearTimeout(this.deleteTimer);
      this.media.removeEventListener("change", onMedia);
    });
  }

  // --- Navigation ---

  protected backToGame(event: Event): void {
    event.preventDefault();
    if (this.embedded()) {
      this.closed.emit();
    } else {
      location.hash = "#/";
    }
  }

  /** The back button, Escape: the icon being drawn, then the sheet (phone), then the editor closes. */
  requestClose(): void {
    if (this.iconEdit()) {
      this.iconEdit.set(null);
    } else if (this.weatherPick()) {
      this.weatherPick.set(null);
    } else if (!this.sideBySide() && this.current()) {
      this.selectedId.set(null);
    } else {
      this.closed.emit();
    }
  }

  protected keydown(ev: KeyboardEvent): void {
    if (ev.key !== "Escape") {
      return;
    }
    const target = ev.target as HTMLElement;
    if (target.matches("input, textarea, select")) {
      target.blur();
    } else {
      this.requestClose();
    }
    ev.preventDefault();
    ev.stopPropagation();
  }

  protected openTable(table: DbTable): void {
    this.table.set(table);
    this.selectedId.set(null);
    this.itemFilter.set(null);
    this.search.set("");
    this.message.set("");
  }

  protected select(id: string): void {
    this.selectedId.set(id);
    this.formulaOpen.set(false);
    this.charTab.set("general");
    this.memberChosen.set(null);
    this.deleting.set(null);
    this.host.nativeElement.querySelector(".sheet-pane")?.scrollTo({ top: 0 });
  }

  // --- Rows ---

  protected add(): void {
    const table = this.table();
    const base = {
      elements: "Nouvel élément",
      weapons: "Nouveau type d'arme",
      states: "Nouvel état",
      skills: "Nouvelle compétence",
      items: "Nouvel objet",
      characters: "Nouveau personnage",
      enemies: "Nouvel ennemi",
      groups: "Nouveau groupe",
    }[table];
    const names = new Set(this.rows().map((r) => norm(r.name)));
    let name = base;
    for (let i = 2; names.has(norm(name)); i++) {
      name = `${base} ${i}`;
    }
    const makers: Record<DbTable, () => Row> = {
      elements: () => newElement(name),
      weapons: () => newWeapon(name),
      states: () => newState(name),
      skills: () => newSkill(name, this.db()),
      items: () =>
        withItemKind(newItem(name), this.itemFilter() ?? "consumable"),
      characters: () => newCharacter(name),
      enemies: () => newEnemy(name),
      groups: () => newGroup(name, this.db()),
    };
    const row = makers[table]();
    this.commit({ ...this.db(), [table]: [...this.rows(), row] });
    this.search.set("");
    this.selectedId.set(row.id);
    setTimeout(() => {
      const field =
        this.host.nativeElement.querySelector<HTMLInputElement>(
          ".sheet-pane .name"
        );
      field?.focus();
      field?.select();
    });
  }

  protected duplicate(row: Row): void {
    const copy = {
      ...structuredClone(row),
      id: newId(row.id.split("-")[0]),
      name: `${row.name} (copie)`,
    } as Row;
    delete (copy as DbElement).physical;
    const rows = this.rows();
    const at = rows.findIndex((r) => r.id === row.id) + 1;
    this.commit({
      ...this.db(),
      [this.table()]: [...rows.slice(0, at), copy, ...rows.slice(at)],
    });
    this.selectedId.set(copy.id);
  }

  protected remove(row: Row): void {
    clearTimeout(this.deleteTimer);
    if (this.deleting() !== row.id) {
      this.deleting.set(row.id);
      this.deleteTimer = setTimeout(() => this.deleting.set(null), 3000);
      return;
    }
    this.deleting.set(null);
    const rows = this.rows();
    const index = rows.findIndex((r) => r.id === row.id);
    this.commit(withoutRow(this.db(), this.table(), row.id));
    const next = this.rows()[Math.min(index, this.rows().length - 1)];
    this.selectedId.set(this.sideBySide() ? (next?.id ?? null) : null);
  }

  protected rename(row: Row, name: string): void {
    this.edit(row.id, (r) => ({ ...r, name }));
  }

  protected setColor(row: DbElement | DbState, color: string): void {
    this.edit(row.id, (r) => ({ ...r, color }));
  }

  protected setNote(
    row: DbWeapon | DbSkill | DbItem | DbCharacter | DbEnemy | DbGroup,
    note: string
  ): void {
    this.edit(row.id, (r) => {
      const next = { ...r, note: note.trim() ? note : undefined } as DbWeapon;
      if (!next.note) {
        delete next.note;
      }
      return next;
    });
  }

  // --- Icons ---

  protected editIcon(row: Row): void {
    const name = row.name.trim() || "sans nom";
    this.editPicture(
      row,
      "icon",
      this.table() === "characters" || this.table() === "enemies"
        ? `Petite image de ${name} (jauge)`
        : `Icône de ${name}`
    );
  }

  protected editPicture(row: Row, field: PictureField, title?: string): void {
    const name = row.name.trim() || "sans nom";
    const titles = {
      icon: `Icône de ${name}`,
      portrait: `Portrait de ${name}`,
      sprite: `${name} en combat`,
    };
    const size =
      this.table() === "enemies" && field === "sprite"
        ? ENEMY_SPRITE_SIZE
        : PICTURE_SIZES[field];
    this.iconEdit.set({
      id: row.id,
      field,
      title: title ?? titles[field],
      value: (row as DbCharacter)[field],
      ...size,
    });
  }

  protected iconDone(picture: string | undefined): void {
    const target = this.iconEdit();
    this.iconEdit.set(null);
    if (target) {
      this.edit(target.id, (r) => {
        const next = { ...r, [target.field]: picture } as Row;
        if (!picture) {
          delete (next as DbCharacter)[target.field];
        }
        return next;
      });
    }
  }

  // --- Elements ---

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

  protected partsLabel(element: DbElement): string {
    return partsLabel(element, this.db().elements);
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

  protected pickWeather(weather: string): void {
    const pick = this.weatherPick();
    this.weatherPick.set(null);
    if (pick?.for === "enemy") {
      this.edit(pick.id, (e) => ({
        ...e,
        weathers: [
          ...(e as DbEnemy).weathers,
          { weather: weather as WeatherType, effect: "appears" },
        ],
      }));
    } else if (pick?.for === "condition") {
      this.edit(pick.id, (e) => ({
        ...e,
        actions: (e as DbEnemy).actions.map((a, i) =>
          i === pick.index
            ? {
                ...a,
                condition: { kind: "weather", weather: weather as WeatherType },
              }
            : a
        ),
      }));
    } else if (pick) {
      this.edit(pick.id, (e) => ({
        ...e,
        weathers: [
          ...(e as DbElement).weathers,
          { weather: weather as WeatherType, percent: pick.strong ? 25 : -25 },
        ],
      }));
    }
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

  protected weatherLabel(type: string): string {
    return WEATHER_CHOICES.find((w) => w.type === type)?.label ?? type;
  }

  protected weatherImage(type: string): string {
    return weatherScreenshot(type as WeatherType, false);
  }

  /** Some weathers only have a night picture. */
  protected weatherImageMissing(ev: Event, type: string): void {
    const img = ev.target as HTMLImageElement;
    const night = weatherScreenshot(type as WeatherType, true);
    if (img.src.endsWith(night)) {
      img.style.visibility = "hidden";
    } else {
      img.src = night;
    }
  }

  // --- States ---

  protected setTurns(state: DbState, turns: number): void {
    this.edit(state.id, (s) => ({
      ...s,
      turns: clampInt(turns, 0, TURNS_MAX),
    }));
  }

  protected setFlag(
    state: DbState,
    flag: "staysAfterFight" | "endsOnHit",
    value: boolean
  ): void {
    this.edit(state.id, (s) => ({ ...s, [flag]: value }));
  }

  protected addEffect(state: DbState, kind: StateEffectKind): void {
    this.edit(state.id, (s) => ({
      ...s,
      effects: [...(s as DbState).effects, newStateEffect(kind)],
    }));
  }

  protected setEffect(
    state: DbState,
    index: number,
    change: Partial<StateEffect>
  ): void {
    this.edit(state.id, (s) => ({
      ...s,
      effects: (s as DbState).effects.map((e, i) =>
        i === index ? ({ ...e, ...change } as StateEffect) : e
      ),
    }));
  }

  protected setEffectStat(state: DbState, index: number, stat: string): void {
    this.setEffect(state, index, { stat: stat as StatId });
  }

  protected removeEffect(state: DbState, index: number): void {
    this.edit(state.id, (s) => ({
      ...s,
      effects: (s as DbState).effects.filter((_, i) => i !== index),
    }));
  }

  // --- Skills ---

  /** Another element: the levels it is learned with follow, when none were chosen yet. */
  protected setSkillElement(skill: DbSkill, element: string): void {
    this.edit(skill.id, (s) => {
      const next = { ...s, element } as DbSkill;
      if (next.learn.length === 0) {
        next.learn = defaultLearn(element, this.db());
      }
      return next;
    });
  }

  protected setSkill(
    skill: DbSkill,
    change: Partial<Pick<DbSkill, "mp" | "cast" | "target" | "use">>
  ): void {
    this.edit(skill.id, (s) => ({ ...s, ...change }));
  }

  protected setTarget(skill: DbSkill, target: string): void {
    this.setSkill(skill, { target: target as SkillTarget });
  }

  protected setUse(skill: DbSkill, use: SkillUse): void {
    this.setSkill(skill, { use });
  }

  protected setCast(skill: DbSkill, cast: number): void {
    this.setSkill(skill, {
      cast: Math.min(CAST_MAX, Math.max(0, Math.round(cast * 2) / 2)),
    });
  }

  /** Where the cast ends on the gauge preview (%): waiting, then casting, then the action. */
  protected castEnd(cast: number): number {
    return 70 + (cast / CAST_MAX) * 22;
  }

  protected addSkillEffect(row: HasEffects, kind: SkillEffectKind): void {
    this.edit(row.id, (s) => ({
      ...s,
      effects: [
        ...((s as HasEffects).effects ?? []),
        newSkillEffect(kind, this.db()),
      ],
    }));
  }

  protected setSkillEffect(
    row: HasEffects,
    index: number,
    change: Partial<SkillEffect> | Record<string, unknown>
  ): void {
    this.edit(row.id, (s) => ({
      ...s,
      effects: ((s as HasEffects).effects ?? []).map((e, i) =>
        i === index ? ({ ...e, ...change } as SkillEffect) : e
      ),
    }));
  }

  /** For the « Expérience » effect's element or weapon select. */
  protected xpPicker(row: HasEffects, index: number): (id: string) => void {
    return (id) => this.setSkillEffect(row, index, { id });
  }

  protected removeSkillEffect(row: HasEffects, index: number): void {
    this.edit(row.id, (s) => ({
      ...s,
      effects: ((s as HasEffects).effects ?? []).filter((_, i) => i !== index),
    }));
  }

  protected moveSkillEffect(row: HasEffects, index: number, by: -1 | 1): void {
    this.edit(row.id, (s) => {
      const effects = [...((s as HasEffects).effects ?? [])];
      const to = index + by;
      if (to < 0 || to >= effects.length) {
        return s;
      }
      [effects[index], effects[to]] = [effects[to], effects[index]];
      return { ...s, effects };
    });
  }

  protected setFormula(skill: DbSkill, formula: string): void {
    this.edit(skill.id, (s) => {
      const next = { ...s, formula } as DbSkill;
      if (!formula.trim()) {
        delete next.formula;
      }
      return next;
    });
  }

  protected addLearn(skill: DbSkill): void {
    const used = new Set(skill.learn.map((l) => l.id));
    const proposed =
      defaultLearn(skill.element, this.db()).find((l) => !used.has(l.id)) ??
      this.learnChoices()
        .map((c) => ({ id: c.id, level: 1 }))
        .find((l) => !used.has(l.id));
    if (proposed && skill.learn.length < LEARN_MAX) {
      this.edit(skill.id, (s) => ({
        ...s,
        learn: [...(s as DbSkill).learn, proposed],
      }));
    }
  }

  protected setLearn(
    skill: DbSkill,
    index: number,
    change: Partial<{ id: string; level: number }>
  ): void {
    this.edit(skill.id, (s) => ({
      ...s,
      learn: (s as DbSkill).learn.map((l, i) =>
        i === index ? { ...l, ...change } : l
      ),
    }));
  }

  protected removeLearn(skill: DbSkill, index: number): void {
    this.edit(skill.id, (s) => ({
      ...s,
      learn: (s as DbSkill).learn.filter((_, i) => i !== index),
    }));
  }

  /** The dot shown without an icon: the row's color, or its element's. */
  protected rowColor(row: Row): string | null {
    return (
      (row as DbElement).color ??
      this.elementOf((row as DbSkill).element)?.color ??
      null
    );
  }

  protected isLearnChoice(id: string): boolean {
    return this.learnChoices().some((c) => c.id === id);
  }

  protected hasState(id: string): boolean {
    return this.db().states.some((st) => st.id === id);
  }

  protected elementOf(id: string): DbElement | undefined {
    return this.db().elements.find((e) => e.id === id);
  }

  protected rowName(
    table: "elements" | "weapons" | "states",
    id: string
  ): string {
    return (
      (this.db()[table] as Row[]).find((r) => r.id === id)?.name ?? "(supprimé)"
    );
  }

  /** « Feu 2 + Vent 3 » */
  protected learnLabel(skill: DbSkill): string {
    const db = this.db();
    return skill.learn
      .map(
        (l) =>
          `${[...db.elements, ...db.weapons].find((r) => r.id === l.id)?.name ?? "?"} ${l.level}`
      )
      .join(" + ");
  }

  // --- Items ---

  protected setItemKind(item: DbItem, kind: ItemKind): void {
    this.edit(item.id, (i) => withItemKind(i as DbItem, kind));
  }

  protected setItem(item: DbItem, change: Partial<DbItem>): void {
    this.edit(item.id, (i) => {
      const next = { ...i, ...change } as DbItem;
      for (const key of ["weapon", "attackElement"] as const) {
        if (!next[key]) {
          delete next[key];
        }
      }
      return next;
    });
  }

  protected setSlot(item: DbItem, slot: EquipSlot): void {
    this.edit(item.id, (i) => {
      const next = { ...i, slot } as DbItem;
      if (slot !== "weapon") {
        delete next.weapon;
        delete next.attackElement;
      }
      return next;
    });
  }

  protected setItemUse(item: DbItem, use: string): void {
    this.setItem(item, { use: use as SkillUse });
  }

  protected setItemTarget(item: DbItem, target: string): void {
    this.setItem(item, { target: target as SkillTarget });
  }

  /** Equipment lists: stat bonuses, resistances, faster growth. */
  protected addTo(item: DbItem, list: "bonuses" | "resists" | "growth"): void {
    const db = this.db();
    const used = new Set(
      (item[list] ?? []).map((e) => {
        if ("stat" in e) {
          return e.stat;
        }
        return "element" in e ? e.element : e.id;
      })
    );
    const values = {
      bonuses: () => ({
        stat: STATS.find((st) => !used.has(st.id))?.id ?? "str",
        amount: 5,
      }),
      resists: () => ({
        element: db.elements.find((e) => !used.has(e.id))?.id ?? "",
        level: "resist" as ResistLevel,
      }),
      growth: () => ({
        id: this.learnChoices().find((c) => !used.has(c.id))?.id ?? "",
        percent: 50,
      }),
    };
    const value = values[list]();
    this.edit(item.id, (i) => ({
      ...i,
      [list]: [...((i as DbItem)[list] ?? []), value],
    }));
  }

  protected setIn(
    item: DbItem,
    list: "bonuses" | "resists" | "growth",
    index: number,
    change: Record<string, unknown>
  ): void {
    this.edit(item.id, (i) => ({
      ...i,
      [list]: ((i as DbItem)[list] ?? []).map((e, k) =>
        k === index ? { ...e, ...change } : e
      ),
    }));
  }

  protected removeFrom(
    item: DbItem,
    list: "bonuses" | "resists" | "growth",
    index: number
  ): void {
    this.edit(item.id, (i) => ({
      ...i,
      [list]: ((i as DbItem)[list] ?? []).filter((_, k) => k !== index),
    }));
  }

  protected growthPicker(item: DbItem, index: number): (id: string) => void {
    return (id) => this.setIn(item, "growth", index, { id });
  }

  /** « 50 pièces », « ne se vend pas » ('' for a key item: no price). */
  private priceLabel(item: DbItem): string {
    if (item.kind === "key") {
      return "";
    }
    return item.price ? `${item.price} pièces` : "ne se vend pas";
  }

  protected effectLabel(kind: string): string {
    return SKILL_EFFECT_LABELS[kind as SkillEffectKind] ?? kind;
  }

  protected itemKindLabel(kind: ItemKind): string {
    return ITEM_KINDS.find((k) => k.id === kind)?.label ?? kind;
  }

  // --- Characters ---

  protected setCharacter(
    ch: DbCharacter,
    change: Partial<
      Pick<DbCharacter, "team" | "xpCurve" | "model" | "startsInTeam">
    >
  ): void {
    this.edit(ch.id, (c) => {
      const next = { ...c, ...change } as DbCharacter;
      if (!next.model) {
        delete next.model;
      }
      if (!next.startsInTeam) {
        delete next.startsInTeam;
      }
      return next;
    });
  }

  protected setXpCurve(ch: DbCharacter, curve: XpCurve): void {
    this.setCharacter(ch, { xpCurve: curve });
  }

  /** First and last level (the first one never above the last). */
  protected setLevels(
    ch: DbCharacter,
    change: { levelStart?: number; levelMax?: number }
  ): void {
    this.edit(ch.id, (c) => {
      const next = { ...c, ...change } as DbCharacter;
      next.levelMax = clampInt(next.levelMax, 1, LEVEL_MAX);
      next.levelStart = clampInt(next.levelStart, 1, next.levelMax);
      return next;
    });
  }

  protected setStat(
    ch: DbCharacter,
    stat: StatId,
    change: Partial<CharacterStat>
  ): void {
    this.edit(ch.id, (c) => {
      const stats = { ...(c as DbCharacter).stats };
      const next = { ...stats[stat], ...change };
      next.start = clampInt(next.start, 0, 9999);
      next.max = clampInt(next.max, 0, 9999);
      stats[stat] = next;
      return { ...c, stats };
    });
  }

  /** Tapping the curve: evenly → mostly early → mostly late. */
  protected cycleCurve(ch: DbCharacter, stat: StatId): void {
    const order = STAT_CURVES.map((c) => c.id);
    this.setStat(ch, stat, {
      curve: order[(order.indexOf(ch.stats[stat].curve) + 1) % order.length],
    });
  }

  protected curveLabel(ch: DbCharacter, stat: StatId): string {
    return STAT_CURVES.find((c) => c.id === ch.stats[stat].curve)?.label ?? "";
  }

  /** The curve's preview: 8 bars from the first level to the last (0 to 1). */
  protected curveBars(ch: DbCharacter, stat: StatId): number[] {
    const { start, max } = ch.stats[stat];
    return Array.from({ length: 8 }, (_, i) => {
      const level = 1 + ((ch.levelMax - 1) * (i + 1)) / 8;
      const value = statAt(ch, stat, level);
      return max > start
        ? Math.max(0.08, ((value - start) / (max - start)) * 0.92 + 0.08)
        : 1;
    });
  }

  protected growth(
    ch: DbCharacter,
    id: string
  ): { level: number; affinity: Affinity } {
    return growthOf(ch, id);
  }

  protected setGrowth(
    ch: DbCharacter,
    id: string,
    change: Partial<{ level: number; affinity: Affinity }>
  ): void {
    this.edit(ch.id, (c) => {
      const next = { ...growthOf(c as DbCharacter, id), ...change };
      next.level = clampInt(next.level, 0, LEVEL_MAX);
      return { ...c, growth: { ...(c as DbCharacter).growth, [id]: next } };
    });
  }

  protected setAffinity(ch: DbCharacter, id: string, affinity: string): void {
    this.setGrowth(ch, id, { affinity: affinity as Affinity });
  }

  protected modelName(id: string): string {
    return modelLabel(id);
  }

  protected affinityLabel(affinity: Affinity): string {
    return AFFINITIES.find((a) => a.id === affinity)?.label ?? affinity;
  }

  /** The equipment of a slot this character can wear. */
  protected equipChoices(ch: DbCharacter, slot: EquipSlot): DbItem[] {
    return this.db().items.filter(
      (it) =>
        it.kind === "equipment" &&
        it.slot === slot &&
        (!it.wearers?.length || it.wearers.includes(ch.id))
    );
  }

  protected setEquip(ch: DbCharacter, slot: EquipSlot, itemId: string): void {
    this.edit(ch.id, (c) => {
      const equipment = { ...(c as DbCharacter).equipment };
      if (itemId) {
        equipment[slot] = itemId;
      } else {
        delete equipment[slot];
      }
      return { ...c, equipment };
    });
  }

  protected toggleWearer(item: DbItem, chId: string): void {
    this.edit(item.id, (i) => {
      const wearers = (i as DbItem).wearers ?? [];
      const next = {
        ...i,
        wearers: wearers.includes(chId)
          ? wearers.filter((w) => w !== chId)
          : [...wearers, chId],
      } as DbItem;
      if (next.wearers!.length === 0) {
        delete next.wearers;
      }
      return next;
    });
  }

  /** A skill kept for other characters: this one never learns it (or learns it again). */
  protected toggleExcluded(ch: DbCharacter, skillId: string): void {
    this.edit(ch.id, (c) => {
      const excluded = (c as DbCharacter).excludedSkills ?? [];
      const next = {
        ...c,
        excludedSkills: excluded.includes(skillId)
          ? excluded.filter((s) => s !== skillId)
          : [...excluded, skillId],
      } as DbCharacter;
      if (next.excludedSkills!.length === 0) {
        delete next.excludedSkills;
      }
      return next;
    });
  }

  private learnName(id: string): string {
    const db = this.db();
    return (
      [...db.elements, ...db.weapons].find((r) => r.id === id)?.name ?? "?"
    );
  }

  // --- Enemies ---

  protected setEnemy(
    enemy: DbEnemy,
    change: Partial<Pick<DbEnemy, "level" | "xp" | "money" | "model">>
  ): void {
    this.edit(enemy.id, (e) => {
      const next = { ...e, ...change } as DbEnemy;
      if (!next.model) {
        delete next.model;
      }
      return next;
    });
  }

  protected setEnemyStat(enemy: DbEnemy, stat: StatId, value: number): void {
    this.edit(enemy.id, (e) => ({
      ...e,
      stats: { ...(e as DbEnemy).stats, [stat]: clampInt(value, 0, 99_999) },
    }));
  }

  protected resistOf(enemy: DbEnemy, element: string): string {
    return enemy.resists[element] ?? "normal";
  }

  protected setResist(enemy: DbEnemy, element: string, level: string): void {
    this.edit(enemy.id, (e) => {
      const resists = { ...(e as DbEnemy).resists };
      if (level === "normal") {
        delete resists[element];
      } else {
        resists[element] = level as ResistLevel;
      }
      return { ...e, resists };
    });
  }

  protected addDrop(enemy: DbEnemy): void {
    const used = new Set(enemy.drops.map((d) => d.item));
    const item =
      this.db().items.find((i) => !used.has(i.id) && i.kind !== "key") ??
      this.db().items[0];
    if (item) {
      this.edit(enemy.id, (e) => ({
        ...e,
        drops: [...(e as DbEnemy).drops, { item: item.id, chance: 20 }],
      }));
    }
  }

  protected setDrop(
    enemy: DbEnemy,
    index: number,
    change: Partial<{ item: string; chance: number }>
  ): void {
    this.edit(enemy.id, (e) => ({
      ...e,
      drops: (e as DbEnemy).drops.map((d, i) =>
        i === index ? { ...d, ...change } : d
      ),
    }));
  }

  protected removeDrop(enemy: DbEnemy, index: number): void {
    this.edit(enemy.id, (e) => ({
      ...e,
      drops: (e as DbEnemy).drops.filter((_, i) => i !== index),
    }));
  }

  protected addAction(enemy: DbEnemy): void {
    const used = new Set(enemy.actions.map((a) => a.skill));
    const skill =
      this.db().skills.find((sk) => !used.has(sk.id)) ?? this.db().skills[0];
    if (skill) {
      this.edit(enemy.id, (e) => ({
        ...e,
        actions: [...(e as DbEnemy).actions, { skill: skill.id, weight: 2 }],
      }));
    }
  }

  protected setAction(
    enemy: DbEnemy,
    index: number,
    change: Partial<{ skill: string; weight: number }>
  ): void {
    this.edit(enemy.id, (e) => ({
      ...e,
      actions: (e as DbEnemy).actions.map((a, i) =>
        i === index ? { ...a, ...change } : a
      ),
    }));
  }

  protected setConditionKind(
    enemy: DbEnemy,
    index: number,
    kind: string
  ): void {
    if (kind === "weather") {
      this.weatherPick.set({ id: enemy.id, for: "condition", index });
      return;
    }
    this.edit(enemy.id, (e) => ({
      ...e,
      actions: (e as DbEnemy).actions.map((a, i) => {
        if (i !== index) {
          return a;
        }
        const rest = omit(a, "condition");
        return kind === "hpBelow"
          ? {
              ...rest,
              condition: { kind: "hpBelow", percent: 50 } as BehaviorCondition,
            }
          : rest;
      }),
    }));
  }

  protected setConditionPercent(
    enemy: DbEnemy,
    index: number,
    percent: number
  ): void {
    this.edit(enemy.id, (e) => ({
      ...e,
      actions: (e as DbEnemy).actions.map((a, i) =>
        i === index
          ? {
              ...a,
              condition: { kind: "hpBelow", percent } as BehaviorCondition,
            }
          : a
      ),
    }));
  }

  protected removeAction(enemy: DbEnemy, index: number): void {
    this.edit(enemy.id, (e) => ({
      ...e,
      actions: (e as DbEnemy).actions.filter((_, i) => i !== index),
    }));
  }

  protected openEnemyWeather(enemy: DbEnemy): void {
    this.weatherPick.set({ id: enemy.id, for: "enemy" });
  }

  protected openConditionWeather(enemy: DbEnemy, index: number): void {
    this.weatherPick.set({ id: enemy.id, for: "condition", index });
  }

  protected setWeatherEffect(
    enemy: DbEnemy,
    weather: string,
    effect: "appears" | "stronger"
  ): void {
    this.edit(enemy.id, (e) => ({
      ...e,
      weathers: (e as DbEnemy).weathers.map((w) =>
        w.weather === weather ? { ...w, effect } : w
      ),
    }));
  }

  protected removeEnemyWeather(enemy: DbEnemy, weather: string): void {
    this.edit(enemy.id, (e) => ({
      ...e,
      weathers: (e as DbEnemy).weathers.filter((w) => w.weather !== weather),
    }));
  }

  protected toggleTime(enemy: DbEnemy, time: DayTime): void {
    this.edit(enemy.id, (e) => {
      const times = (e as DbEnemy).times;
      return {
        ...e,
        times: times.includes(time)
          ? times.filter((t) => t !== time)
          : DAY_TIMES.map((d) => d.id).filter(
              (d) => d === time || times.includes(d)
            ),
      };
    });
  }

  protected isSkill(id: string): boolean {
    return this.db().skills.some((sk) => sk.id === id);
  }

  protected skillName(id: string): string {
    return this.db().skills.find((sk) => sk.id === id)?.name ?? "(supprimée)";
  }

  // --- Groups ---

  protected setGroup(
    group: DbGroup,
    change: Partial<Pick<DbGroup, "music" | "canFlee" | "surprise">>
  ): void {
    this.edit(group.id, (g) => {
      const next = { ...g, ...change } as DbGroup;
      if (!next.music) {
        delete next.music;
      }
      return next;
    });
  }

  protected addMember(group: DbGroup, enemy: string): void {
    if (!enemy || group.members.length >= 8) {
      return;
    }
    this.edit(group.id, (g) => ({
      ...g,
      members: [
        ...(g as DbGroup).members,
        { enemy, ...freeSpot(g as DbGroup) },
      ],
    }));
  }

  /** −: the last one of this enemy goes. */
  protected removeOne(group: DbGroup, enemy: string): void {
    const index = group.members.map((m) => m.enemy).lastIndexOf(enemy);
    if (index >= 0) {
      this.removeMember(group, index);
    }
  }

  protected removeMember(group: DbGroup, index: number): void {
    this.memberChosen.set(null);
    this.edit(group.id, (g) => ({
      ...g,
      members: (g as DbGroup).members.filter((_, i) => i !== index),
    }));
  }

  protected duplicateMember(group: DbGroup, index: number): void {
    this.addMember(group, group.members[index].enemy);
  }

  /** Where a member is drawn (its place while moved). */
  protected memberPos(
    index: number,
    member: { x: number; y: number }
  ): { x: number; y: number } {
    const drag = this.drag();
    return drag?.index === index ? drag : member;
  }

  protected memberDown(
    ev: PointerEvent,
    index: number,
    member: { x: number; y: number }
  ): void {
    ev.preventDefault();
    ev.stopPropagation();
    (ev.currentTarget as HTMLElement).setPointerCapture(ev.pointerId);
    this.memberChosen.set(index);
    this.drag.set({ index, ...member });
  }

  protected memberMove(ev: PointerEvent): void {
    const drag = this.drag();
    if (!drag) {
      return;
    }
    const zone = (ev.currentTarget as HTMLElement)
      .closest(".battlefield")
      ?.querySelector(".enemy-zone");
    if (!zone) {
      return;
    }
    const rect = zone.getBoundingClientRect();
    const clamp = (v: number) =>
      Math.round(Math.min(1, Math.max(0, v)) * 100) / 100;
    this.drag.set({
      index: drag.index,
      x: clamp((ev.clientX - rect.left) / rect.width),
      y: clamp((ev.clientY - rect.top) / rect.height),
    });
  }

  protected memberUp(group: DbGroup): void {
    const drag = this.drag();
    this.drag.set(null);
    if (drag) {
      this.edit(group.id, (g) => ({
        ...g,
        members: (g as DbGroup).members.map((m, i) =>
          i === drag.index ? { ...m, x: drag.x, y: drag.y } : m
        ),
      }));
    }
  }

  protected enemyOf(id: string): DbEnemy | undefined {
    return this.db().enemies.find((e) => e.id === id);
  }

  /** The list's picture: the icon, else the sprite, else (a group) its first enemy's. */
  protected rowIcon(row: Row): string | undefined {
    if (row.icon) {
      return row.icon;
    }
    if ("sprite" in row && row.sprite) {
      return row.sprite;
    }
    if ("members" in row) {
      const first = this.enemyOf(row.members[0]?.enemy ?? "");
      return first?.icon ?? first?.sprite;
    }
    return undefined;
  }

  // --- List texts ---

  protected rowMeta(row: Row): string {
    switch (this.table()) {
      case "elements": {
        const e = row as DbElement;
        if (e.physical) {
          return "Dégâts et résistances";
        }
        const weathers =
          e.weathers.length > 0
            ? ` · ${e.weathers.length} météo${e.weathers.length > 1 ? "s" : ""}`
            : "";
        return (e.parts ? this.partsLabel(e) : "Simple") + weathers;
      }
      case "weapons":
        return (row as DbWeapon).note || "Type d'arme";
      case "enemies": {
        const en = row as DbEnemy;
        const weak = Object.entries(en.resists)
          .filter(([, l]) => l === "weak")
          .map(([id]) => this.elementOf(id)?.name)
          .filter(Boolean);
        return [
          `Niv. ${en.level}`,
          weak.length > 0 ? `faible : ${weak.join(", ")}` : "",
        ]
          .filter(Boolean)
          .join(" · ");
      }
      case "groups":
        return groupLabel(row as DbGroup, this.db().enemies) || "Vide";
      case "characters": {
        const ch = row as DbCharacter;
        return ch.team
          ? `Équipe · niv. ${ch.levelStart} · PV ${statAt(ch, "hp", ch.levelStart)}`
          : "Habitant";
      }
      case "items": {
        const it = row as DbItem;
        const kind =
          it.kind === "equipment"
            ? (EQUIP_SLOTS.find((sl) => sl.id === it.slot)?.label ??
              "Équipement")
            : this.itemKindLabel(it.kind);
        const bonuses = (it.bonuses ?? [])
          .map(
            (b) =>
              `${STATS.find((st) => st.id === b.stat)?.label} ${b.amount > 0 ? "+" : ""}${b.amount}`
          )
          .join(", ");
        return [kind, bonuses, this.priceLabel(it)].filter(Boolean).join(" · ");
      }
      case "skills": {
        const s = row as DbSkill;
        return [
          this.elementOf(s.element)?.name ?? "?",
          `${s.mp} PM`,
          castLabel(s.cast),
          this.learnLabel(s),
        ]
          .filter(Boolean)
          .join(" · ");
      }
      case "states": {
        const s = row as DbState;
        const effects = s.effects.map((e) => this.effectSummary(e)).join(", ");
        return [this.turnsLabel(s.turns), effects].filter(Boolean).join(" · ");
      }
    }
  }

  protected turnsLabel(turns: number): string {
    return turns ? `${turns} tour${turns > 1 ? "s" : ""}` : "Tout le combat";
  }

  private effectSummary(effect: StateEffect): string {
    const signed = (n: number) => `${n > 0 ? "+" : ""}${n} %`;
    switch (effect.kind) {
      case "hp":
        return `PV ${signed(effect.percent)}`;
      case "mp":
        return `PM ${signed(effect.percent)}`;
      case "stat":
        return `${STATS.find((s) => s.id === effect.stat)?.label} ${signed(effect.percent)}`;
      case "skip":
        return `passe son tour ${effect.chance} %`;
    }
  }

  // --- Export ---

  /** The database as the game's file (src/assets/database/database.ts) for the repository. */
  protected exportDatabase(): void {
    const source = `import { GameDatabase } from '../../app/modules/database-editor/shared/database';

/**
 * The game's database (elements, weapon types, states, skills, items, characters, enemies, groups). Written by the database editor's export (editor →
 * Éditeurs → Base de données → Exporter); the database saved in the browser replaces this one.
 */
export const CODE_DATABASE: GameDatabase = ${JSON.stringify(this.db(), null, 2)};
`;
    downloadFile("database.ts", source);
    this.message.set(
      "database.ts téléchargé : à mettre dans src/assets/database/."
    );
  }

  private edit(id: string, change: (row: Row) => Row): void {
    const table = this.table();
    this.commit({
      ...this.db(),
      [table]: (this.db()[table] as Row[]).map((r) =>
        r.id === id ? change(r) : r
      ),
    });
  }

  private commit(db: GameDatabase): void {
    this.db.set(db);
    this.saveFailed.set(!saveDatabase(db));
    this.message.set("");
  }
}

function norm(name: string): string {
  return name
    .trim()
    .toLocaleLowerCase("fr-FR")
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}
