import {
  LucideActivity,
  LucideBackpack,
  LucideChevronLeft,
  LucideChevronRight,
  LucideCopy,
  LucideDownload,
  LucideDynamicIcon,
  LucideFlame,
  LucideIcon,
  LucidePencil,
  LucidePlus,
  LucideRotateCcw,
  LucideSearch,
  LucideSkull,
  LucideSparkles,
  LucideSword,
  LucideSwords,
  LucideTrash,
  LucideUsers,
} from "@lucide/angular";
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
  DbCharacter,
  DbElement,
  DbEnemy,
  DbGroup,
  DbItem,
  DbSkill,
  DbState,
  DbTable,
  DbWeapon,
  EQUIP_SLOTS,
  ItemKind,
  STATS,
  StateEffect,
  castLabel,
  groupLabel,
  newCharacter,
  newElement,
  newEnemy,
  newGroup,
  newId,
  newItem,
  newSkill,
  newState,
  newWeapon,
  statAt,
  withItemKind,
  withoutRow,
} from "./shared/database";
import { DatabaseStore, Row } from "./shared/database-store";
import { CODE_DATABASE } from "../../../assets/database/database";
import { DbSheet } from "./shared/db-sheet";
import { downloadFile } from "../game/shared/util/ts-source";
import { PixelEditorComponent } from "./pixel-editor/pixel-editor.component";
import { SheetEditorComponent } from "./sheet-editor/sheet-editor.component";
import { WeatherPickerComponent } from "../game/weather-picker/weather-picker.component";
import { ElementSheetComponent } from "./sheets/element-sheet/element-sheet.component";
import { WeaponSheetComponent } from "./sheets/weapon-sheet/weapon-sheet.component";
import { StateSheetComponent } from "./sheets/state-sheet/state-sheet.component";
import { SkillSheetComponent } from "./sheets/skill-sheet/skill-sheet.component";
import { ItemSheetComponent } from "./sheets/item-sheet/item-sheet.component";
import { CharacterSheetComponent } from "./sheets/character-sheet/character-sheet.component";
import { EnemySheetComponent } from "./sheets/enemy-sheet/enemy-sheet.component";
import { GroupSheetComponent } from "./sheets/group-sheet/group-sheet.component";
import { searchKey } from "../../core/shared/text";

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
    LucideChevronLeft,
    LucideChevronRight,
    LucideCopy,
    LucideDownload,
    LucideDynamicIcon,
    LucidePencil,
    LucidePlus,
    LucideRotateCcw,
    LucideSearch,
    LucideTrash,
    NgTemplateOutlet,
    PixelEditorComponent,
    SheetEditorComponent,
    WeatherPickerComponent,
    ElementSheetComponent,
    WeaponSheetComponent,
    StateSheetComponent,
    SkillSheetComponent,
    ItemSheetComponent,
    CharacterSheetComponent,
    EnemySheetComponent,
    GroupSheetComponent,
  ],
  templateUrl: "./database-editor.component.html",
  styleUrl: "./database-editor.component.scss",
  providers: [DatabaseStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "(document:keydown)": "keydown($event)" },
})
export class DatabaseEditorComponent extends DbSheet {
  protected readonly saveFailed = this.store.saveFailed;
  protected readonly iconEdit = this.store.iconEdit;
  protected readonly sheetEdit = this.store.sheetEdit;

  /** Opened over the game (Jeu closes the panel instead of going to the game's page). */
  readonly embedded = input(false);

  readonly closed = output<void>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly tables = TABLES;

  /** Items list: only one kind (null: all). */
  protected readonly itemFilter = signal<ItemKind | null>(null);

  protected readonly selectedId = signal<string | null>(null);

  protected readonly search = signal("");

  /** The row whose Supprimer was pressed once (pressed again within 3 s: deleted). */
  protected readonly deleting = signal<string | null>(null);
  /** The row asked to take the game's version back (a second touch does it). */
  protected readonly restoring = signal<string | null>(null);
  private restoreTimer?: ReturnType<typeof setTimeout>;

  /**
   * The open row as the game has it (the database in the code), when it is not the same any more: what « Reprendre
   * la version du jeu » puts back. A row the game does not have (made in the editor): none.
   */
  protected readonly gameVersion = computed(() => {
    const row = this.current();
    if (!row) {
      return null;
    }
    const code = (CODE_DATABASE[this.table()] as Row[]).find(
      (r) => r.id === row.id
    );
    return code && JSON.stringify(code) !== JSON.stringify(row) ? code : null;
  });

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
    const q = searchKey(this.search());
    const kind = this.table() === "items" ? this.itemFilter() : null;
    return this.rows().filter(
      (r) =>
        (!q || searchKey(r.name).includes(q)) &&
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

  protected readonly character = computed(() =>
    this.table() === "characters"
      ? (this.current() as DbCharacter | null)
      : null
  );

  constructor() {
    super();
    const onMedia = () => this.sideBySide.set(this.media.matches);
    this.media.addEventListener("change", onMedia);
    inject(DestroyRef).onDestroy(() => {
      clearTimeout(this.deleteTimer);
      this.media.removeEventListener("change", onMedia);
    });
  }

  protected backToGame(event: Event): void {
    event.preventDefault();
    if (this.embedded()) {
      this.closed.emit();
    } else {
      location.hash = "#/";
    }
  }

  /** The back button, Escape: the picture or sprite sheet being edited, then the sheet (phone), then the editor closes. */
  requestClose(): void {
    if (this.iconEdit()) {
      this.iconEdit.set(null);
    } else if (this.sheetEdit()) {
      this.sheetEdit.set(null);
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
    this.deleting.set(null);
    this.restoring.set(null);
    this.host.nativeElement.querySelector(".sheet-pane")?.scrollTo({ top: 0 });
  }

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
    const names = new Set(this.rows().map((r) => searchKey(r.name)));
    let name = base;
    for (let i = 2; names.has(searchKey(name)); i++) {
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
    this.store.commit({ ...this.db(), [table]: [...this.rows(), row] });
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
    this.store.commit({
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
    this.store.commit(withoutRow(this.db(), this.table(), row.id));
    const next = this.rows()[Math.min(index, this.rows().length - 1)];
    this.selectedId.set(this.sideBySide() ? (next?.id ?? null) : null);
  }

  /** The open row back to the game's version (its changes in the editor forgotten); a second touch confirms. */
  protected restore(row: Row): void {
    clearTimeout(this.restoreTimer);
    const code = this.gameVersion();
    if (!code) {
      return;
    }
    if (this.restoring() !== row.id) {
      this.restoring.set(row.id);
      this.restoreTimer = setTimeout(() => this.restoring.set(null), 3000);
      return;
    }
    this.restoring.set(null);
    this.edit(row.id, () => structuredClone(code));
  }

  protected rename(row: Row, name: string): void {
    this.edit(row.id, (r) => ({ ...r, name }));
  }

  protected setColor(row: DbElement | DbState, color: string): void {
    this.edit(row.id, (r) => ({ ...r, color }));
  }

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

  /** The dot shown without an icon: the row's color, or its element's. */
  protected rowColor(row: Row): string | null {
    return (
      (row as DbElement).color ??
      this.elementOf((row as DbSkill).element)?.color ??
      null
    );
  }

  /** « 50 pièces », « ne se vend pas » ('' for a key item: no price). */
  private priceLabel(item: DbItem): string {
    if (item.kind === "key") {
      return "";
    }
    return item.price ? `${item.price} pièces` : "ne se vend pas";
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
}
