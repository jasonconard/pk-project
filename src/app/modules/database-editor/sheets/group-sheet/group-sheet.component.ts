import {
  LucideCopy,
  LucideEighthNotes,
  LucidePlus,
  LucideTrash,
} from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  signal,
} from "@angular/core";
import { DbGroup, freeSpot } from "../../shared/database";
import { DbSheet } from "../../shared/db-sheet";
import { loadSongs } from "../../../music-editor/shared/song-storage";
import { StepperComponent } from "../../stepper/stepper.component";

/** The sheet of a row of the « group » table. */
@Component({
  selector: "db-group-sheet",
  imports: [
    StepperComponent,
    LucideCopy,
    LucideEighthNotes,
    LucidePlus,
    LucideTrash,
  ],
  templateUrl: "./group-sheet.component.html",
  styleUrl: "./group-sheet.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupSheetComponent extends DbSheet {
  readonly group = input.required<DbGroup>();

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

  /** (forgotten for another group only: each change makes a new row, which runs this again) */
  protected readonly memberChosen = linkedSignal<string, number | null>({
    source: () => this.group().id,
    computation: (id, previous) =>
      previous && previous.source === id ? previous.value : null,
  });

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
}
