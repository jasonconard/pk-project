import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  signal,
} from "@angular/core";
import {
  LucideChevronLeft,
  LucideDoorOpen,
  LucideInfo,
  LucideMinus,
  LucidePlay,
  LucidePlus,
  LucideUsers,
  LucideX,
} from "@lucide/angular";
import { readJson, writeJson } from "../../../core/shared/local-store";
import { SimMember } from "../../battle/shared/battle.service";
import { GROWTH_LEVEL_MAX } from "../../battle/shared/progress";
import {
  savedTeam,
  TeamSetupComponent,
} from "../../battle/team-setup/team-setup.component";
import { EscapeService } from "../../../core/shared/service/escape.service";
import {
  DbDungeon,
  floorAt,
  floorCount,
  GameDatabase,
} from "../../database-editor/shared/database";
import { loadDatabase } from "../../database-editor/shared/database-storage";
import { DungeonService } from "../shared/services/dungeon.service";

/** The last try's choices (kept for the next one). */
const STORAGE_KEY = "pk-dungeon-try";

interface TrySetup {
  /** A team made for the try (else the game's team). */
  own: boolean;
  team: SimMember[];
}

interface TryFloor {
  /** Floor number (0 first). */
  floor: number;
  label: string;
  /** « Fait à la main » or « 3 à 5 salles ». */
  detail: string;
}

/**
 * Menu → Essayer un donjon: the database's dungeons, each floor with Lancer. The team goes straight into that floor,
 * whatever the opening hours, with its rooms linked and its enemies placed like in the game; the way out leads back
 * to where the player was. « Équipe de test »: a team made for the try (characters, levels), the real one given back
 * on the way out.
 */
@Component({
  selector: "game-dungeon-try",
  imports: [
    LucideChevronLeft,
    LucideDoorOpen,
    LucideInfo,
    LucideMinus,
    LucidePlay,
    LucidePlus,
    LucideUsers,
    LucideX,
    TeamSetupComponent,
  ],
  templateUrl: "./dungeon-try.component.html",
  styleUrl: "./dungeon-try.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DungeonTryComponent {
  readonly closed = output<void>();
  /** « Menu »: back to the game menu. */
  readonly back = output<void>();

  private readonly dungeon = inject(DungeonService);
  private readonly db = loadDatabase();
  protected readonly dungeons = this.db.dungeons.map((d) => ({
    id: d.id,
    name: d.name,
    floors: floorsOf(d),
    levels: enemyLevels(d, this.db),
  }));

  /** « Équipe de test »: a team made for the try. */
  protected readonly own = signal(false);
  protected readonly team = signal<SimMember[]>([]);
  /** The level « Tous au niveau » gives. */
  protected readonly level = signal(1);

  constructor() {
    inject(EscapeService).whileAlive(() => this.closed.emit());
    const saved = readJson<TrySetup>(STORAGE_KEY);
    this.own.set(!!saved?.own);
    this.team.set(savedTeam(saved?.team, this.db));
    // (first time: the level of the first dungeon's strongest enemy)
    this.level.set(
      saved
        ? Math.max(1, ...this.team().map((m) => m.level))
        : (this.dungeons[0]?.levels?.max ?? 1)
    );
  }

  protected setLevel(level: number): void {
    this.level.set(Math.min(99, Math.max(1, Math.round(level) || 1)));
  }

  /** Every member at the level chosen, its elements at half of it (never under what it has). */
  protected levelAll(): void {
    const level = this.level();
    const elements = Math.min(GROWTH_LEVEL_MAX, Math.round(level / 2));
    this.team.update((team) =>
      team.map((m) => {
        const c = this.db.characters.find((x) => x.id === m.id);
        return {
          ...m,
          level: Math.min(c?.levelMax ?? level, level),
          growth: Object.fromEntries(
            Object.entries(m.growth).map(([id, l]) => [
              id,
              Math.max(l, elements),
            ])
          ),
        };
      })
    );
  }

  protected launch(id: string, floor: number): void {
    const setup: TrySetup = { own: this.own(), team: this.team() };
    writeJson(STORAGE_KEY, setup);
    this.closed.emit();
    this.dungeon.tryOut(
      id,
      floor,
      setup.own && setup.team.length > 0 ? setup.team : undefined
    );
  }
}

/** The lowest and highest level of the enemies walking in a dungeon. */
function enemyLevels(
  dungeon: DbDungeon,
  db: GameDatabase
): { min: number; max: number } | null {
  const groups = new Set(dungeon.floors.flatMap((f) => f.groups));
  const levels = db.groups
    .filter((g) => groups.has(g.id))
    .flatMap((g) => g.members)
    .map((m) => db.enemies.find((e) => e.id === m.enemy)?.level)
    .filter((l) => l !== undefined);
  return levels.length > 0
    ? { min: Math.min(...levels), max: Math.max(...levels) }
    : null;
}

function floorsOf(dungeon: DbDungeon): TryFloor[] {
  const floors: TryFloor[] = [];
  for (let n = 0; n < floorCount(dungeon); n++) {
    const line = floorAt(dungeon, n);
    if (line) {
      const { floor } = line;
      const rooms =
        floor.roomsMin === floor.roomsMax
          ? `${floor.roomsMin} salle${floor.roomsMin > 1 ? "s" : ""}`
          : `${floor.roomsMin} à ${floor.roomsMax} salles`;
      floors.push({
        floor: n,
        label: `Étage ${n + 1} · ${floor.name}`,
        detail: floor.map ? "Fait à la main" : `${rooms} tirées au hasard`,
      });
    }
  }
  return floors;
}
