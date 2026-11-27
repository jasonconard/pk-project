import {
  LucideBox,
  LucideCoins,
  LucideGitBranch,
  LucideImagePlus,
  LucidePencil,
  LucidePlus,
  LucideStar,
  LucideX,
} from "@lucide/angular";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import {
  BehaviorCondition,
  DAY_TIMES,
  DayTime,
  DbEnemy,
  MAP_WALK_DIRS,
  MapWalk,
  ResistLevel,
  StatId,
  clampInt,
} from "../../shared/database";
import { DbSheet } from "../../shared/db-sheet";
import { omit } from "../../../../core/shared/omit";
import { StepperComponent } from "../../stepper/stepper.component";

/** The sheet of a row of the « enemy » table. */
import { SheetTileComponent } from "../../sheet-editor/sheet-tile.component";
@Component({
  selector: "db-enemy-sheet",
  imports: [
    SheetTileComponent,
    StepperComponent,
    LucideBox,
    LucideCoins,
    LucideGitBranch,
    LucideImagePlus,
    LucidePencil,
    LucidePlus,
    LucideStar,
    LucideX,
  ],
  templateUrl: "./enemy-sheet.component.html",
  styleUrl: "./enemy-sheet.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnemySheetComponent extends DbSheet {
  readonly enemy = input.required<DbEnemy>();

  protected setEnemy(
    enemy: DbEnemy,
    change: Partial<
      Pick<DbEnemy, "level" | "xp" | "money" | "model" | "stunMs">
    >
  ): void {
    this.edit(enemy.id, (e) => {
      const next = { ...e, ...change } as DbEnemy;
      if (!next.model) {
        delete next.model;
      }
      if (!next.stunMs) {
        delete next.stunMs;
      }
      return next;
    });
  }

  /** The walking sheet's settings changed (null: no sheet any more). */
  protected setWalk(enemy: DbEnemy, change: Partial<MapWalk> | null): void {
    this.edit(enemy.id, (e) => {
      const next = { ...(e as DbEnemy) };
      if (change && next.walk) {
        next.walk = { ...next.walk, ...change };
      } else {
        delete next.walk;
      }
      return next;
    });
  }

  /** A walking sheet chosen from a file: its cells guessed from its size (8 rows, 4 steps or square cells). */
  protected pickWalk(enemy: DbEnemy, input: HTMLInputElement): void {
    const file = input.files?.[0];
    input.value = "";
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const image = String(reader.result);
      const img = new Image();
      img.addEventListener("load", () => {
        const h = Math.max(1, Math.round(img.height / MAP_WALK_DIRS.length));
        const frames = enemy.walk?.frames ?? 4;
        const w = Math.max(1, Math.round(img.width / frames));
        this.edit(enemy.id, (e) => ({ ...e, walk: { image, w, h, frames } }));
      });
      img.src = image;
    });
    reader.readAsDataURL(file);
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
}
