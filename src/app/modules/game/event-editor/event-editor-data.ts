import { Injectable } from "@angular/core";
import { loadDatabase } from "../../database-editor/shared/database-storage";
import { DbGroup, newCalendar } from "../../database-editor/shared/database";
import { loadVariables } from "../../variables-editor/shared/variable-storage";
import {
  clampCounter,
  GameVariable,
} from "../../variables-editor/shared/variables";
import {
  EventConditions,
  portraitOf,
  portraitRef,
} from "../shared/model/ObjectEvent";
import { VariableTest } from "../shared/model/SceneEvent";
import { WEATHER_CHOICES } from "../shared/weather/Weather";

/**
 * What the event window and its parts (conditions, actions) choose from: the variables and the database, read once
 * when the window opens. Provided by the event editor.
 */
@Injectable()
export class EventEditorData {
  readonly variables: GameVariable[] = loadVariables();
  /** The database: items, characters (of the team), groups of enemies. */
  readonly db = loadDatabase();
  readonly teamCharacters = this.db.characters;
  /** The game's calendar (days of the week, months, special days: the date conditions). */
  readonly calendar = this.db.calendar[0] ?? newCalendar();
  /** The portraits a message may show: the characters' and the NPCs' drawn in their sheet. */
  readonly portraits = [
    ...this.db.characters.map((c) => ({ row: c, owner: "character" as const })),
    ...this.db.npcs.map((n) => ({ row: n, owner: "npc" as const })),
  ]
    .filter(({ row }) => row.portrait)
    .map(({ row, owner }) => ({
      pic: portraitOf(owner, row.id),
      label: row.name,
      src: row.portrait as string,
      npc: owner === "npc",
    }));

  /** The portraits by table (the team's, the NPCs'), the empty ones left out. */
  readonly portraitGroups = [
    { label: "Équipe", portraits: this.portraits.filter((p) => !p.npc) },
    { label: "PNJ", portraits: this.portraits.filter((p) => p.npc) },
  ].filter((g) => g.portraits.length > 0);

  /** Is there a portrait drawn for this reference (`character:<id>`, `npc:<id>`)? */
  hasPortrait(ref: string | undefined): boolean {
    return this.portraits.some((p) => p.pic === ref);
  }

  /** The picture of a message's portrait (a character's or an NPC's, else the image path). */
  portraitSrc(pic: string | undefined): string | undefined {
    const ref = portraitRef(pic);
    return this.portraits.find((p) => p.pic === ref)?.src ?? pic;
  }

  variable(id: string): GameVariable | undefined {
    return this.variables.find((v) => v.id === id);
  }

  itemName(id: string): string | undefined {
    return this.db.items.find((i) => i.id === id)?.name;
  }

  characterName(id: string): string | undefined {
    return this.db.characters.find((c) => c.id === id)?.name;
  }

  group(id: string): DbGroup | undefined {
    return this.db.groups.find((g) => g.id === id);
  }

  /** « Gluant ×2 · Chauve-souris » */
  groupMembers(id: string): string {
    const group = this.group(id);
    if (!group) {
      return "";
    }
    const counts = new Map<string, number>();
    for (const m of group.members) {
      counts.set(m.enemy, (counts.get(m.enemy) ?? 0) + 1);
    }
    return [...counts]
      .map(([e, n]) => {
        const name = this.db.enemies.find((en) => en.id === e)?.name ?? "?";
        return n > 1 ? `${name} ×${n}` : name;
      })
      .join(" · ");
  }
}

// --- Small helpers of the fields (shared by the window, its conditions and its actions) ---

/** A new test of a variable: a flag is true, a counter is at least 1. */
export function defaultTest(variable: GameVariable): VariableTest {
  return variable.kind === "flag"
    ? { id: variable.id, op: "is", value: true }
    : { id: variable.id, op: "gte", value: 1 };
}

/** How many conditions must be true. */
export function countConditions(c: EventConditions): number {
  return (
    c.variables.length +
    (c.hours ? 1 : 0) +
    (c.weathers ? 1 : 0) +
    (c.items?.length ?? 0) +
    (c.money ? 1 : 0) +
    (c.members?.length ?? 0) +
    (c.weekdays ? 1 : 0) +
    (c.dates ? 1 : 0) +
    (c.moments ? 1 : 0) +
    (c.specials ? 1 : 0)
  );
}

export function weatherLabel(type: string): string {
  const choice = WEATHER_CHOICES.find((w) => w.type === type);
  return choice ? `${choice.icon} ${choice.label}` : type;
}

export function plural(n: number, word: string): string {
  return `${n} ${word}${n > 1 ? "s" : ""}`;
}

/** The text of a field. */
export function fieldValue(event: Event): string {
  return (
    event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ).value;
}

export function fieldChecked(event: Event): boolean {
  return (event.target as HTMLInputElement).checked;
}

/** A whole number between min and max (min when it is not a number). */
export function wholeNumber(raw: string, min: number, max: number): number {
  const n = Math.round(Number(raw));
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min;
}

export function counterValue(raw: string): number {
  return clampCounter(Number(raw));
}
