import {
  LucideBan,
  LucideBox,
  LucideCheck,
  LucideInfo,
  LucideLock,
  LucidePencil,
  LucideRotateCcw,
} from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
} from "@angular/core";
import {
  AFFINITIES,
  Affinity,
  CharacterStat,
  DbCharacter,
  DbItem,
  EquipSlot,
  LEVEL_MAX,
  STAT_CURVES,
  StatId,
  XpCurve,
  clampInt,
  growthOf,
  learnState,
  statAt,
} from "../../shared/database";
import { DbSheet } from "../../shared/db-sheet";
import { StepperComponent } from "../../stepper/stepper.component";

/** The sheet of a row of the « character » table. */
import { SheetTileComponent } from "../../sheet-editor/sheet-tile.component";
@Component({
  selector: "db-character-sheet",
  imports: [
    SheetTileComponent,
    StepperComponent,
    LucideBan,
    LucideBox,
    LucideCheck,
    LucideInfo,
    LucideLock,
    LucidePencil,
    LucideRotateCcw,
  ],
  templateUrl: "./character-sheet.component.html",
  styleUrl: "./character-sheet.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSheetComponent extends DbSheet {
  readonly character = input.required<DbCharacter>();

  /**
   * The character sheet's tab: back to « Général » for another character only (each change makes a new row, which
   * runs this again: the same character keeps its tab).
   */
  protected readonly charTab = linkedSignal<string, "general" | "growth">({
    source: () => this.character().id,
    computation: (id, previous) =>
      previous && previous.source === id ? previous.value : "general",
  });

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

  protected setCharacter(
    ch: DbCharacter,
    change: Partial<
      Pick<
        DbCharacter,
        "team" | "xpCurve" | "model" | "startsInTeam" | "stunMs"
      >
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
      if (!next.stunMs) {
        delete next.stunMs;
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
}
