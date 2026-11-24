import { Directive, inject } from "@angular/core";
import {
  AFFINITIES,
  BONUS_MAX,
  CAST_MAX,
  DAY_TIMES,
  DbCharacter,
  DbNpc,
  DbElement,
  DbEnemy,
  DbGroup,
  DbItem,
  DbSkill,
  DbWeapon,
  ELEMENT_COLORS,
  EQUIP_SLOTS,
  ITEM_KINDS,
  ItemKind,
  LEARN_MAX,
  LEVEL_MAX,
  MP_MAX,
  PERCENT_MAX,
  PICTURE_SIZES,
  POWER_MAX,
  PRICE_MAX,
  RESIST_LEVELS,
  SKILL_RANGES,
  SKILL_TARGETS,
  SKILL_USES,
  ZONE_MARKS,
  ZONE_MAX,
  ZONE_MIN,
  STATS,
  SkillEffectKind,
  StateEffectKind,
  TURNS_MAX,
  WEIGHTS,
  XP_CURVES,
  XP_MAX,
  castLabel,
} from "./database";
import { DatabaseStore, PictureField, Row } from "./database-store";
import {
  WEATHER_CHOICES,
  WeatherType,
} from "../../game/shared/weather/Weather";
import {
  weatherImageError,
  weatherScreenshot,
} from "../../game/shared/weather/weather-catalog";
import { MODEL_CHOICES, modelLabel } from "../../game/shared/model/ModelChoice";

/** What has effects: skills and items. */
export type HasEffects = DbSkill | DbItem;

export const SKILL_EFFECT_LABELS: Record<SkillEffectKind, string> = {
  damage: "Dégâts",
  heal: "Soin",
  addState: "Donner un état",
  removeState: "Guérir un état",
  stat: "Stat",
  statUp: "Stat pour toujours",
  xp: "Expérience",
};

export const EFFECT_LABELS: Record<StateEffectKind, string> = {
  hp: "PV par tour",
  mp: "PM par tour",
  stat: "Stat",
  skip: "Passe son tour",
};

/**
 * What every sheet of the database editor shares (and the editor itself): the store, the constants the templates
 * show, and the lookups (names of elements, skills, weathers…).
 */
@Directive()
export abstract class DbSheet {
  protected readonly store = inject(DatabaseStore);
  protected readonly db = this.store.db;
  protected readonly table = this.store.table;
  protected readonly message = this.store.message;
  protected readonly weatherPick = this.store.weatherPick;
  protected readonly learnChoices = this.store.learnChoices;
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

  protected readonly ranges = SKILL_RANGES;

  protected readonly zoneMarks = ZONE_MARKS;

  protected readonly zoneMin = ZONE_MIN;

  protected readonly zoneMax = ZONE_MAX;

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

  protected setNote(
    row: DbWeapon | DbSkill | DbItem | DbCharacter | DbNpc | DbEnemy | DbGroup,
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

  protected weatherLabel(type: string): string {
    return WEATHER_CHOICES.find((w) => w.type === type)?.label ?? type;
  }

  protected weatherImage(type: string): string {
    return weatherScreenshot(type as WeatherType, false);
  }

  /** Some weathers only have a night picture. */
  protected weatherImageMissing(ev: Event, type: string): void {
    weatherImageError(ev, type as WeatherType);
  }

  protected modelName(id: string): string {
    return modelLabel(id);
  }

  protected turnsLabel(turns: number): string {
    return turns ? `${turns} tour${turns > 1 ? "s" : ""}` : "Tout le combat";
  }

  protected effectLabel(kind: string): string {
    return SKILL_EFFECT_LABELS[kind as SkillEffectKind] ?? kind;
  }

  protected itemKindLabel(kind: ItemKind): string {
    return ITEM_KINDS.find((k) => k.id === kind)?.label ?? kind;
  }

  /** Changes a row of the table shown (given its copy), saved. */
  protected edit(id: string, change: (row: Row) => Row): void {
    this.store.edit(id, change);
  }

  protected editPicture(row: Row, field: PictureField, title?: string): void {
    this.store.editPicture(row, field, title);
  }

  protected editSheet(row: DbCharacter | DbEnemy): void {
    this.store.editSheet(row);
  }

  protected partsLabel(element: DbElement): string {
    return this.store.partsLabel(element);
  }

  protected elementOf(id: string): DbElement | undefined {
    return this.store.elementOf(id);
  }

  protected rowName(
    table: "elements" | "weapons" | "states",
    id: string
  ): string {
    return this.store.rowName(table, id);
  }

  protected learnLabel(skill: DbSkill): string {
    return this.store.learnLabel(skill);
  }

  protected isLearnChoice(id: string): boolean {
    return this.store.isLearnChoice(id);
  }

  protected hasState(id: string): boolean {
    return this.store.hasState(id);
  }

  protected isSkill(id: string): boolean {
    return this.store.isSkill(id);
  }

  protected skillName(id: string): string {
    return this.store.skillName(id);
  }

  protected enemyOf(id: string): DbEnemy | undefined {
    return this.store.enemyOf(id);
  }

  protected learnName(id: string): string {
    return this.store.learnName(id);
  }
}
