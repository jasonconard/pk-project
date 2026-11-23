import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from "@angular/core";
import {
  LucideMinus,
  LucidePlus,
  LucideSwords,
  LucideX,
} from "@lucide/angular";
import { EscapeService } from "../../../core/shared/service/escape.service";
import { readJson, writeJson } from "../../../core/shared/local-store";
import { loadDatabase } from "../../database-editor/shared/database-storage";
import { DbCharacter } from "../../database-editor/shared/database";
import {
  currentMapId,
  listMaps,
  loadMap,
} from "../../game/shared/services/map-storage";
import { MapHelper } from "../../game/shared/model/MapHelper";
import { SequenceService } from "../../game/shared/services/sequence.service";
import {
  InstructionType,
  SceneEventInstruction,
} from "../../game/shared/model/SceneEventInstruction";
import { BattleService, SimMember } from "../shared/battle.service";
import { GROWTH_LEVEL_MAX } from "../shared/progress";

/** The last simulation's choices (kept for the next one). */
const STORAGE_KEY = "pk-battle-sim";
/** « Ici » in the places: where the player stands. */
const HERE = "";
const TEAM_MAX = 4;

interface SimSetup {
  group: string;
  place: string;
  team: SimMember[];
}

/**
 * Simulate a fight (menu → Simuler un combat): an enemy group, a map (its arrival point, or here), a team of up to 4
 * with each one's level and its levels in the elements; Lancer plays the fight there, then the player comes back.
 * Nothing the fight changes is kept (BattleService.simulateNext). Closed by the ✕, the backdrop or Escape.
 */
@Component({
  selector: "battle-sim",
  imports: [LucideMinus, LucidePlus, LucideSwords, LucideX],
  templateUrl: "./battle-sim.component.html",
  styleUrl: "./battle-sim.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleSimComponent {
  private readonly battle = inject(BattleService);
  private readonly sequence = inject(SequenceService);

  readonly mapHelper = input.required<MapHelper>();
  readonly closed = output<void>();

  private readonly db = loadDatabase();
  protected readonly groups = this.db.groups;
  protected readonly maps = listMaps();
  protected readonly characters = this.db.characters.filter((c) => c.team);
  /** The elements a character grows in (simple, not the physical one). */
  private readonly elements = this.db.elements.filter(
    (e) => !e.physical && !e.parts
  );
  protected readonly levelMax = GROWTH_LEVEL_MAX;
  protected readonly teamMax = TEAM_MAX;

  protected readonly group = signal("");
  protected readonly place = signal(HERE);
  protected readonly team = signal<SimMember[]>([]);

  protected readonly groupMembers = computed(() => {
    const group = this.groups.find((g) => g.id === this.group());
    const counts = new Map<string, number>();
    for (const m of group?.members ?? []) {
      const name = this.db.enemies.find((e) => e.id === m.enemy)?.name ?? "?";
      counts.set(name, (counts.get(name) ?? 0) + 1);
    }
    return [...counts]
      .map(([name, n]) => (n > 1 ? `${name} ×${n}` : name))
      .join(", ");
  });

  protected readonly canLaunch = computed(
    () =>
      this.groups.some((g) => g.id === this.group()) && this.team().length > 0
  );

  constructor() {
    inject(EscapeService).whileAlive(() => this.closed.emit());
    const saved = readJson<SimSetup>(STORAGE_KEY);
    this.group.set(
      this.groups.find((g) => g.id === saved?.group)?.id ??
        this.groups[0]?.id ??
        ""
    );
    this.place.set(this.maps.find((m) => m.id === saved?.place)?.id ?? HERE);
    const team = (saved?.team ?? [])
      .filter((m) => this.characters.some((c) => c.id === m.id))
      .slice(0, TEAM_MAX);
    // (first time: the characters starting in the team, at their starting levels)
    this.team.set(
      Array.isArray(saved?.team)
        ? team
        : this.characters
            .filter((c) => c.startsInTeam)
            .slice(0, TEAM_MAX)
            .map((c) => this.startMember(c))
    );
  }

  protected member(id: string): SimMember | undefined {
    return this.team().find((m) => m.id === id);
  }

  /** The elements this character can grow in (affinity « jamais »: not shown). */
  protected elementsOf(c: DbCharacter) {
    return this.elements.filter((e) => c.growth[e.id]?.affinity !== "never");
  }

  protected toggle(c: DbCharacter): void {
    this.team.update((team) => {
      if (team.some((m) => m.id === c.id)) {
        return team.filter((m) => m.id !== c.id);
      }
      return team.length < TEAM_MAX ? [...team, this.startMember(c)] : team;
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

  /** Plays the fight: to the map chosen (its arrival point), the fight, then back where the player was. */
  protected launch(): void {
    const player = this.mapHelper().scenePlayer.mesh;
    if (!this.canLaunch() || !player) {
      return;
    }
    const setup: SimSetup = {
      group: this.group(),
      place: this.place(),
      team: this.team(),
    };
    writeJson(STORAGE_KEY, setup);
    const instructions: SceneEventInstruction[] = [];
    const map = setup.place === HERE ? null : loadMap(setup.place);
    if (map) {
      const { x, y, z } = player.position;
      const back = { map: currentMapId(), pos: { x, y, z } };
      instructions.push(
        {
          type: InstructionType.TELEPORT,
          teleport: { map: map.id, pos: map.spawn ?? { x: 0, y: 0, z: 0 } },
        },
        { type: InstructionType.FIGHT, fight: { group: setup.group } },
        { type: InstructionType.TELEPORT, teleport: back }
      );
    } else {
      instructions.push({
        type: InstructionType.FIGHT,
        fight: { group: setup.group },
      });
    }
    this.battle.simulateNext(setup.team);
    this.closed.emit();
    this.sequence.launchSequence({ conditions: {}, instructions });
  }

  private startMember(c: DbCharacter): SimMember {
    return {
      id: c.id,
      level: c.levelStart,
      growth: Object.fromEntries(
        this.elementsOf(c).map((e) => [e.id, c.growth[e.id]?.level ?? 0])
      ),
    };
  }

  private change(id: string, edit: (m: SimMember) => SimMember): void {
    this.team.update((team) => team.map((m) => (m.id === id ? edit(m) : m)));
  }
}
