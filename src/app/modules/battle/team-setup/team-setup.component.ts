import { ChangeDetectionStrategy, Component, model } from "@angular/core";
import { LucideMinus, LucidePlus } from "@lucide/angular";
import {
  DbCharacter,
  GameDatabase,
} from "../../database-editor/shared/database";
import { loadDatabase } from "../../database-editor/shared/database-storage";
import { SimMember } from "../shared/battle.service";
import { GROWTH_LEVEL_MAX } from "../shared/progress";

export const TEAM_MAX = 4;

/** The elements a character grows in (simple ones, not the physical one; affinity « jamais »: left out). */
function elementsOf(c: DbCharacter, db: GameDatabase) {
  return db.elements.filter(
    (e) => !e.physical && !e.parts && c.growth[e.id]?.affinity !== "never"
  );
}

/** A character as it starts: its starting level and levels in the elements. */
export function startMember(c: DbCharacter, db: GameDatabase): SimMember {
  return {
    id: c.id,
    level: c.levelStart,
    growth: Object.fromEntries(
      elementsOf(c, db).map((e) => [e.id, c.growth[e.id]?.level ?? 0])
    ),
  };
}

/** A team kept from the last time (its characters still there), else the characters starting in the team. */
export function savedTeam(
  saved: SimMember[] | undefined,
  db: GameDatabase
): SimMember[] {
  return Array.isArray(saved)
    ? saved
        .filter((m) => db.characters.some((c) => c.id === m.id))
        .slice(0, TEAM_MAX)
    : db.characters
        .filter((c) => c.startsInTeam)
        .slice(0, TEAM_MAX)
        .map((c) => startMember(c, db));
}

/**
 * A team made for a try (Simuler un combat, Essayer un donjon): up to 4 characters, each one's level and its levels
 * in the elements.
 */
@Component({
  selector: "battle-team-setup",
  imports: [LucideMinus, LucidePlus],
  templateUrl: "./team-setup.component.html",
  styleUrl: "./team-setup.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamSetupComponent {
  readonly team = model.required<SimMember[]>();

  private readonly db = loadDatabase();
  protected readonly characters = this.db.characters;
  protected readonly levelMax = GROWTH_LEVEL_MAX;
  protected readonly teamMax = TEAM_MAX;

  protected member(id: string): SimMember | undefined {
    return this.team().find((m) => m.id === id);
  }

  protected elementsOf(c: DbCharacter) {
    return elementsOf(c, this.db);
  }

  protected toggle(c: DbCharacter): void {
    this.team.update((team) => {
      if (team.some((m) => m.id === c.id)) {
        return team.filter((m) => m.id !== c.id);
      }
      return team.length < TEAM_MAX ? [...team, startMember(c, this.db)] : team;
    });
  }

  protected setLevel(c: DbCharacter, level: number): void {
    const value = Math.min(c.levelMax, Math.max(1, Math.round(level) || 1));
    this.change(c.id, (m) => ({ ...m, level: value }));
  }

  protected setGrowth(id: string, element: string, level: number): void {
    const value = Math.min(
      GROWTH_LEVEL_MAX,
      Math.max(0, Math.round(level) || 0)
    );
    this.change(id, (m) => ({
      ...m,
      growth: { ...m.growth, [element]: value },
    }));
  }

  private change(id: string, edit: (m: SimMember) => SimMember): void {
    this.team.update((team) => team.map((m) => (m.id === id ? edit(m) : m)));
  }
}
