import { Component, inject, input, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { InstructionTeleport } from "../shared/model/SceneEventInstruction";
import { SequenceService } from "../shared/services/sequence.service";
import { MapHelper } from "../shared/model/MapHelper";
import { GameMapService } from "../shared/services/game-map.service";

@Component({
  selector: "core-teleport",
  templateUrl: "./teleport.component.html",
  styleUrl: "./teleport.component.scss",
})
export class TeleportComponent {
  private readonly sequenceService = inject(SequenceService);
  private readonly gameMapService = inject(GameMapService);

  readonly mapHelper = input.required<MapHelper>();
  protected readonly teleport = signal<InstructionTeleport | null>(null);

  constructor() {
    this.sequenceService.teleport$
      .pipe(takeUntilDestroyed())
      .subscribe((teleport) => this.onTeleport(teleport));
  }

  private onTeleport(teleport: InstructionTeleport): void {
    const mapHelper = this.mapHelper();
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
