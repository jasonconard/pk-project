import { attackFlow, skillFlow, SkillFlow } from "./skill-flow";
import { computed, Injectable, signal } from "@angular/core";
import {
  DbCalendar,
  skillRange,
  DbSettings,
  DbCharacter,
  DbNpc,
  DbElement,
  DbEnemy,
  DbGroup,
  DbItem,
  DbShop,
  DbCrop,
  CROP_STAGES,
  DbSkill,
  DbState,
  DbTable,
  DbWeapon,
  GameDatabase,
  PICTURE_SIZES,
  WALK_CELL,
  WALK_DIRS,
  learnChoices,
  partsLabel,
} from "./database";
import { loadDatabase, saveDatabase } from "./database-storage";
import { SpriteSheet } from "./sprite-sheet";
import { WalkCell, walkFrame } from "./walk-sheet";
import { WeatherType } from "../../game/shared/weather/Weather";

export type Row =
  | DbElement
  | DbWeapon
  | DbState
  | DbSkill
  | DbItem
  | DbCharacter
  | DbCalendar
  | DbSettings
  | DbNpc
  | DbEnemy
  | DbGroup
  | DbShop
  | DbCrop;
/** A picture drawn in the pixel editor (icon: the small face of a character or an enemy). */
export type PictureField = keyof typeof PICTURE_SIZES;

export interface IconEdit {
  id: string;
  field: PictureField;
  title: string;
  value?: string;
  w: number;
  h: number;
  /** One picture of the walking sheet (the rest of the sheet is kept). */
  cell?: WalkCell;
  /** A crop's growth stage (its picture in `stages`). */
  stage?: number;
}

/** The combat sprite sheet being edited: whose, the window's title, the sheet. */
export interface SheetEdit {
  id: string;
  title: string;
  value?: SpriteSheet;
}

/** The flow being edited: a skill's, or a weapon type's attack or heavy blow. */
export interface FlowEdit {
  table: "skills" | "weapons";
  id: string;
  field: "flow" | "flowHeavy";
}

export interface WeatherPick {
  id: string;
  strong?: boolean;
  for: "element" | "enemy" | "condition" | "dungeon" | "shop" | "crop";
  index?: number;
}

/**
 * The database being edited, shared by the editor and its sheets (one per editor, provided by it): the database
 * and its saving, the table shown, the windows over it (pixel editor, weathers) and the lookups the sheets share.
 */
@Injectable()
export class DatabaseStore {
  readonly db = signal<GameDatabase>(loadDatabase());
  readonly table = signal<DbTable>("characters");
  readonly saveFailed = signal(false);
  readonly message = signal("");
  /** The picture being drawn: whose, which one (icon, or a portrait / sprite), its title and size. */
  readonly iconEdit = signal<IconEdit | null>(null);
  /** The combat sprite sheet being edited (a character's, an enemy's). */
  readonly sheetEdit = signal<SheetEdit | null>(null);
  /** The flow being edited (a skill's, a weapon's attack), and what its window needs. */
  readonly flowEdit = signal<FlowEdit | null>(null);
  readonly flowView = computed(() => {
    const edit = this.flowEdit();
    const db = this.db();
    if (edit?.table === "skills") {
      const skill = db.skills.find((s) => s.id === edit.id);
      if (!skill) {
        return null;
      }
      const power = (kind: "damage" | "heal") =>
        skill.effects.reduce(
          (sum, e) => sum + (e.kind === kind ? e.power : 0),
          0
        );
      return {
        title: skill.name,
        value: skillFlow(skill),
        own: !!skill.flow?.blocks.length,
        picture: skill.anim,
        melee: skillRange(skill) === "contact",
        power: power("damage") || power("heal") || 50,
        heals: power("damage") === 0 && power("heal") > 0,
      };
    }
    const weapon = edit && db.weapons.find((w) => w.id === edit.id);
    if (!edit || !weapon) {
      return null;
    }
    const heavy = edit.field === "flowHeavy";
    return {
      title: `${weapon.name} · ${heavy ? "attaque forte" : "attaque"}`,
      value: attackFlow(weapon, heavy, !!weapon.ranged),
      own: !!(heavy ? weapon.flowHeavy : weapon.flow)?.blocks.length,
      picture: weapon.anim,
      melee: !weapon.ranged,
      power: heavy ? 75 : 50,
      heals: false,
    };
  });

  /** The flow window's change: the owner's new flow (none: back to the one its sheet gives). */
  flowDone(flow: SkillFlow | undefined): void {
    const edit = this.flowEdit();
    if (!edit) {
      return;
    }
    const set = <T extends object>(row: T): T => {
      const next = { ...row } as Record<string, unknown>;
      if (flow?.blocks.length) {
        next[edit.field] = flow;
      } else {
        delete next[edit.field];
      }
      return next as T;
    };
    const db = this.db();
    this.commit(
      edit.table === "skills"
        ? {
            ...db,
            skills: db.skills.map((s) => (s.id === edit.id ? set(s) : s)),
          }
        : {
            ...db,
            weapons: db.weapons.map((w) => (w.id === edit.id ? set(w) : w)),
          }
    );
  }

  /** The weathers window: for an element (stronger / weaker), an enemy, or an enemy's skill condition. */
  readonly weatherPick = signal<WeatherPick | null>(null);
  /** What a skill can be learned with: the simple elements, the weapon types. */
  readonly learnChoices = computed(() => learnChoices(this.db()));

  edit(id: string, change: (row: Row) => Row): void {
    const table = this.table();
    this.commit({
      ...this.db(),
      [table]: (this.db()[table] as Row[]).map((r) =>
        r.id === id ? change(r) : r
      ),
    });
  }

  commit(db: GameDatabase): void {
    this.db.set(db);
    this.saveFailed.set(!saveDatabase(db));
    this.message.set("");
  }

  editPicture(row: Row, field: PictureField, title?: string): void {
    const name = row.name.trim() || "sans nom";
    const titles = {
      icon: `Icône de ${name}`,
      portrait: `Portrait de ${name}`,
      sprite: `Image fixe de ${name}`,
      walk: `Planche de marche de ${name}`,
      crop: `Image de ${name}`,
    };
    const size = PICTURE_SIZES[field];
    this.iconEdit.set({
      id: row.id,
      field,
      title: title ?? titles[field],
      value: (row as unknown as Record<string, string | undefined>)[field],
      ...size,
    });
  }

  /** Draws one growth stage of a crop. */
  editCropStage(row: DbCrop, stage: number): void {
    const name = row.name.trim() || "sans nom";
    this.iconEdit.set({
      id: row.id,
      field: "crop",
      title: `${name} · ${CROP_STAGES[stage]?.toLowerCase() ?? stage + 1}`,
      value: row.stages[stage]?.pic,
      ...PICTURE_SIZES.crop,
      stage,
    });
  }

  /** Draws one picture of a character's or an NPC's walking sheet. */
  async editWalkFrame(row: DbCharacter | DbNpc, cell: WalkCell): Promise<void> {
    const name = row.name.trim() || "sans nom";
    const dir = WALK_DIRS[cell.row].label.toLowerCase();
    this.iconEdit.set({
      id: row.id,
      field: "walk",
      title: `${name} · ${dir} · image ${cell.col + 1}`,
      value: await walkFrame(row.walk, cell),
      w: WALK_CELL.w,
      h: WALK_CELL.h,
      cell,
    });
  }

  editSheet(row: DbCharacter | DbEnemy): void {
    this.sheetEdit.set({
      id: row.id,
      title: `Planche de ${row.name.trim() || "sans nom"}`,
      value: row.sheet,
    });
  }

  /** The sheet window's OK: the sheet (none: removed); its still picture becomes the still one if there is none. */
  sheetDone(sheet: SpriteSheet | undefined, still: string | undefined): void {
    const target = this.sheetEdit();
    this.sheetEdit.set(null);
    if (!target) {
      return;
    }
    this.edit(target.id, (r) => {
      const next = { ...r, sheet } as DbCharacter;
      if (!sheet) {
        delete next.sheet;
      }
      if (still && !next.sprite) {
        next.sprite = still;
      }
      return next;
    });
  }

  pickWeather(weather: string): void {
    const pick = this.weatherPick();
    this.weatherPick.set(null);
    switch (pick?.for) {
      case "dungeon": {
        this.edit(pick.id, (d) => ({ ...d, weather: weather as WeatherType }));

        break;
      }
      case "crop": {
        this.edit(pick.id, (row) => {
          const crop = row as DbCrop;
          return {
            ...crop,
            weathers: [
              ...crop.weathers,
              { weather: weather as WeatherType, days: 1 },
            ],
          };
        });
        break;
      }
      case "shop": {
        // (an item of the shop: a weather added to its conditions)
        this.edit(pick.id, (row) => {
          const shop = row as DbShop;
          return {
            ...shop,
            items: shop.items.map((it, i) =>
              i === pick.index
                ? {
                    ...it,
                    conditions: {
                      variables: [],
                      ...it.conditions,
                      weathers: [...(it.conditions?.weathers ?? []), weather],
                    },
                  }
                : it
            ),
          };
        });
        break;
      }
      case "enemy": {
        this.edit(pick.id, (e) => ({
          ...e,
          weathers: [
            ...(e as DbEnemy).weathers,
            { weather: weather as WeatherType, effect: "appears" },
          ],
        }));

        break;
      }
      case "condition": {
        this.edit(pick.id, (e) => ({
          ...e,
          actions: (e as DbEnemy).actions.map((a, i) =>
            i === pick.index
              ? {
                  ...a,
                  condition: {
                    kind: "weather",
                    weather: weather as WeatherType,
                  },
                }
              : a
          ),
        }));

        break;
      }
      default:
        if (pick) {
          this.edit(pick.id, (e) => ({
            ...e,
            weathers: [
              ...(e as DbElement).weathers,
              {
                weather: weather as WeatherType,
                percent: pick.strong ? 25 : -25,
              },
            ],
          }));
        }
    }
  }

  partsLabel(element: DbElement): string {
    return partsLabel(element, this.db().elements);
  }

  elementOf(id: string): DbElement | undefined {
    return this.db().elements.find((e) => e.id === id);
  }

  rowName(table: "elements" | "weapons" | "states", id: string): string {
    return (
      (this.db()[table] as Row[]).find((r) => r.id === id)?.name ?? "(supprimé)"
    );
  }

  /** « Feu 2 + Vent 3 » */
  learnLabel(skill: DbSkill): string {
    const db = this.db();
    return skill.learn
      .map(
        (l) =>
          `${[...db.elements, ...db.weapons].find((r) => r.id === l.id)?.name ?? "?"} ${l.level}`
      )
      .join(" + ");
  }

  isLearnChoice(id: string): boolean {
    return this.learnChoices().some((c) => c.id === id);
  }

  hasState(id: string): boolean {
    return this.db().states.some((st) => st.id === id);
  }

  isSkill(id: string): boolean {
    return this.db().skills.some((sk) => sk.id === id);
  }

  skillName(id: string): string {
    return this.db().skills.find((sk) => sk.id === id)?.name ?? "(supprimée)";
  }

  enemyOf(id: string): DbEnemy | undefined {
    return this.db().enemies.find((e) => e.id === id);
  }

  learnName(id: string): string {
    const db = this.db();
    return (
      [...db.elements, ...db.weapons].find((r) => r.id === id)?.name ?? "?"
    );
  }
}
