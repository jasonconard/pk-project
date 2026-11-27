import { Component, inject, input, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { InstructionTeleport } from "../shared/model/SceneEventInstruction";
import { SequenceService } from "../shared/services/sequence.service";
import { MapHelper } from "../shared/model/MapHelper";
import { GameMapService } from "../shared/services/game-map.service";
import { TransitionService } from "../shared/services/transition.service";
import { loadMap } from "../shared/services/map-storage";

@Component({
  selector: "core-teleport",
  templateUrl: "./teleport.component.html",
  styleUrl: "./teleport.component.scss",
})
export class TeleportComponent {
  private readonly sequenceService = inject(SequenceService);
  private readonly gameMapService = inject(GameMapService);
  private readonly transitions = inject(TransitionService);

  readonly mapHelper = input.required<MapHelper>();
  protected readonly teleport = signal<InstructionTeleport | null>(null);

  constructor() {
    this.sequenceService.teleport$
      .pipe(takeUntilDestroyed())
      .subscribe((teleport) => this.onTeleport(teleport));
  }

  private onTeleport(teleport: InstructionTeleport): void {
    const mapHelper = this.mapHelper();
    // Another map (or this one built again): the transition chosen in the database, if any
    const kind =
      teleport.map &&
      (teleport.rebuild || teleport.map !== mapHelper.sceneMap.id)
        ? (loadMap(teleport.map)?.transition ?? this.transitions.kindFor("map"))
        : "none";
    if (kind !== "none") {
      this.transitions.through(
        kind,
        () =>
          this.gameMapService.travel(
            mapHelper.originGame,
            teleport,
            !!teleport.rebuild
          ),
        () => this.sequenceService.nextSequence()
      );
      return;
    }
    this.teleport.set(teleport);
    setTimeout(() => {
      this.gameMapService.travel(
        mapHelper.originGame,
        teleport,
        !!teleport.rebuild
      );
      this.teleport.set(null);
      setTimeout(() => this.sequenceService.nextSequence(), 200);
    }, 300);
  }
}
