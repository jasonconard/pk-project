import { ARENA_HERE, arenaMaps } from "../../game/shared/model/arena";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from "@angular/core";
import { LucideSwords, LucideX } from "@lucide/angular";
import { EscapeService } from "../../../core/shared/service/escape.service";
import { readJson, writeJson } from "../../../core/shared/local-store";
import { loadDatabase } from "../../database-editor/shared/database-storage";
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
import {
  savedTeam,
  TeamSetupComponent,
} from "../team-setup/team-setup.component";

/** The last simulation's choices (kept for the next one). */
const STORAGE_KEY = "pk-battle-sim";
/** « Ici » in the places: where the player stands. */
const HERE = "";

/** « Celle du groupe ou du lieu » in the arenas: the game chooses, as in a real fight. */
const ARENA_AUTO = "";

interface SimSetup {
  group: string;
  place: string;
  /** "": the group's or the place's, "none": on the spot, else an arena map's id. */
  arena?: string;
  team: SimMember[];
}

/**
 * Simulate a fight (menu → Simuler un combat): an enemy group, a map (its arrival point, or here), a team of up to 4
 * with each one's level and its levels in the elements; Lancer plays the fight there, then the player comes back.
 * Nothing the fight changes is kept (BattleService.simulateNext). Closed by the ✕, the backdrop or Escape.
 */
@Component({
  selector: "battle-sim",
  imports: [LucideSwords, LucideX, TeamSetupComponent],
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

  protected readonly group = signal("");
  protected readonly place = signal(HERE);
  protected readonly arenas = arenaMaps();
  protected readonly arenaHere = ARENA_HERE;
  protected readonly arena = signal(ARENA_AUTO);
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
    this.arena.set(
      saved?.arena === ARENA_HERE
        ? ARENA_HERE
        : (this.arenas.find((a) => a.id === saved?.arena)?.id ?? ARENA_AUTO)
    );
    // (first time: the characters starting in the team, at their starting levels)
    this.team.set(savedTeam(saved?.team, this.db));
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
      arena: this.arena(),
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
    this.battle.simulateNext(setup.team, setup.arena || undefined);
    this.closed.emit();
    this.sequence.launchSequence({ conditions: {}, instructions });
  }
}
