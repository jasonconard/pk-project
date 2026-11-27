import { ARENA_HERE, arenaMaps } from "../../../game/shared/model/arena";
import { loadSongs } from "../../../music-editor/shared/song-storage";
import {
  LucideArrowDown,
  LucideArrowUp,
  LucideCloudSun,
  LucideInfo,
  LucidePlus,
  LucideTrash,
  LucideX,
} from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import {
  clampInt,
  DayTime,
  DbDungeon,
  DbFloor,
  DbSpecialDay,
  DUNGEON_LIMITS,
  groupLabel,
  newFloor,
  specialDayLabel,
} from "../../shared/database";
import { DbSheet } from "../../shared/db-sheet";
import { StepperComponent } from "../../stepper/stepper.component";
import { listMaps } from "../../../game/shared/services/map-storage";

/** A pair of numbers of a floor kept with min ≤ max. */
type FloorRange = "rooms" | "enemies" | "chests";

/**
 * The sheet of a dungeon (design/database.pen, 17 · Donjon): when it is open (moments, special days), its own
 * weather, its floors (a map made by hand, or generated from « Salle » maps), their enemies and chests.
 */
@Component({
  selector: "db-dungeon-sheet",
  imports: [
    StepperComponent,
    LucideArrowDown,
    LucideArrowUp,
    LucideCloudSun,
    LucideInfo,
    LucidePlus,
    LucideTrash,
    LucideX,
  ],
  templateUrl: "./dungeon-sheet.component.html",
  styleUrl: "./dungeon-sheet.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DungeonSheetComponent extends DbSheet {
  readonly dungeon = input.required<DbDungeon>();

  protected readonly limits = DUNGEON_LIMITS;

  /** The maps, read when the sheet opens: the dungeon maps first (made by hand), the rooms. */
  private readonly maps = (() => {
    try {
      return listMaps();
    } catch {
      return [];
    }
  })();
  protected readonly handMaps = [
    ...this.maps.filter((m) => m.kind === "dungeon"),
    ...this.maps.filter(
      (m) => m.kind !== "dungeon" && m.kind !== "room" && m.kind !== "arena"
    ),
  ];
  protected readonly roomMaps = this.maps.filter((m) => m.kind === "room");

  protected readonly specials = computed(
    () => this.db().calendar[0]?.special ?? []
  );

  /** The floor numbers of each line (« 1 », « 2–3 »). */
  protected readonly numbers = computed(() => {
    let next = 1;
    return this.dungeon().floors.map((f) => {
      const count = f.map ? 1 : Math.max(1, f.repeat);
      const label = count > 1 ? `${next}–${next + count - 1}` : `${next}`;
      next += count;
      return label;
    });
  });

  private change(edit: (dungeon: DbDungeon) => DbDungeon): void {
    this.edit(this.dungeon().id, (row) => edit(row as DbDungeon));
  }

  // --- Opening ---

  protected toggleMoment(time: DayTime): void {
    this.change((d) => ({
      ...d,
      moments: d.moments.includes(time)
        ? d.moments.filter((t) => t !== time)
        : this.dayTimes
            .map((t) => t.id)
            .filter((t) => t === time || d.moments.includes(t)),
    }));
  }

  protected toggleSpecial(id: string): void {
    this.change((d) => ({
      ...d,
      specials: d.specials.includes(id)
        ? d.specials.filter((s) => s !== id)
        : [...d.specials, id],
    }));
  }

  protected specialTitle(sd: DbSpecialDay): string {
    const calendar = this.db().calendar[0];
    return calendar ? specialDayLabel(sd, calendar) : sd.name;
  }

  protected openWeather(): void {
    this.weatherPick.set({ id: this.dungeon().id, for: "dungeon" });
  }

  /** The songs of the music editor (read when the sheet opens). */
  protected readonly songs = loadSongs().songs.map((s) => ({
    id: s.id,
    name: s.name,
  }));

  /** Its own song (empty: the music settings' Donjon moment). */
  protected readonly arenas = arenaMaps();
  protected readonly arenaHere = ARENA_HERE;

  protected setArena(id: string): void {
    this.change((d) => {
      const next = { ...d };
      if (id) {
        next.arena = id;
      } else {
        delete next.arena;
      }
      return next;
    });
  }

  protected setMusic(id: string): void {
    this.change((d) => {
      const next = { ...d };
      if (id) {
        next.music = id;
      } else {
        delete next.music;
      }
      return next;
    });
  }

  /** Back to the weather outside. */
  protected clearWeather(): void {
    this.change((d) => {
      const next = { ...d };
      delete next.weather;
      return next;
    });
  }

  // --- Floors ---

  private changeFloor(index: number, edit: (floor: DbFloor) => DbFloor): void {
    this.change((d) => ({
      ...d,
      floors: d.floors.map((f, i) => (i === index ? edit(f) : f)),
    }));
  }

  protected setFloor(index: number, patch: Partial<DbFloor>): void {
    this.changeFloor(index, (f) => ({ ...f, ...patch }));
  }

  /** A min or a max; the other one follows to keep min ≤ max. */
  protected setRange(
    index: number,
    range: FloorRange,
    end: "Min" | "Max",
    value: number
  ): void {
    const max = range === "rooms" ? this.limits.rooms : this.limits[range];
    const low = range === "rooms" ? 1 : 0;
    const v = clampInt(value, low, max);
    this.changeFloor(index, (f) => {
      const next = { ...f, [`${range}${end}`]: v };
      if (end === "Min" && next[`${range}Max`] < v) {
        next[`${range}Max`] = v;
      }
      if (end === "Max" && next[`${range}Min`] > v) {
        next[`${range}Min`] = v;
      }
      return next;
    });
  }

  /** Made by hand (on a map: the dungeon maps first) or generated from rooms. */
  protected setHandMade(index: number, hand: boolean): void {
    this.changeFloor(index, (f) => {
      const next = { ...f };
      if (hand) {
        next.map = f.map ?? this.handMaps[0]?.id;
      } else {
        delete next.map;
      }
      return next;
    });
  }

  protected toggleIn(index: number, list: "rooms" | "groups", id: string) {
    this.changeFloor(index, (f) => ({
      ...f,
      [list]: f[list].includes(id)
        ? f[list].filter((x) => x !== id)
        : [...f[list], id],
    }));
  }

  protected addFloor(): void {
    this.change((d) => ({
      ...d,
      floors: [...d.floors, newFloor(`Étage ${d.floors.length + 1}`)],
    }));
  }

  protected removeFloor(index: number): void {
    this.change((d) => ({
      ...d,
      floors: d.floors.filter((_, i) => i !== index),
    }));
  }

  protected moveFloor(index: number, by: -1 | 1): void {
    const to = index + by;
    this.change((d) => {
      if (to < 0 || to >= d.floors.length) {
        return d;
      }
      const floors = [...d.floors];
      [floors[index], floors[to]] = [floors[to], floors[index]];
      return { ...d, floors };
    });
  }

  // --- Loot ---

  protected addLoot(index: number, item: string): void {
    if (!item) {
      return;
    }
    this.changeFloor(index, (f) => ({
      ...f,
      loot: [...f.loot, { item, chance: 50 }],
    }));
  }

  protected setLoot(
    index: number,
    at: number,
    patch: Partial<DbFloor["loot"][number]>
  ): void {
    this.changeFloor(index, (f) => ({
      ...f,
      loot: f.loot.map((l, i) => (i === at ? { ...l, ...patch } : l)),
    }));
  }

  protected removeLoot(index: number, at: number): void {
    this.changeFloor(index, (f) => ({
      ...f,
      loot: f.loot.filter((_, i) => i !== at),
    }));
  }

  protected groupName(id: string): string {
    const group = this.db().groups.find((g) => g.id === id);
    if (!group) {
      return "?";
    }
    return groupLabel(group, this.db().enemies) || group.name;
  }

  protected isHandMap(id: string): boolean {
    return this.handMaps.some((m) => m.id === id);
  }

  protected mapName(id: string | undefined): string {
    return this.maps.find((m) => m.id === id)?.name ?? "(carte inconnue)";
  }
}
