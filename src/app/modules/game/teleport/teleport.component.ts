import { Component, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InstructionTeleport } from '../shared/model/SceneEventInstruction';
import { SequenceService } from '../shared/services/sequence.service';
import { MapHelper } from '../shared/model/MapHelper';

@Component({
  selector: 'core-teleport',
  templateUrl: './teleport.component.html',
  styleUrl: './teleport.component.scss'
})
export class TeleportComponent {
  private readonly sequenceService = inject(SequenceService);

  readonly mapHelper = input.required<MapHelper>();
  protected readonly teleport = signal<InstructionTeleport | null>(null);

  constructor() {
    this.sequenceService.teleport$
      .pipe(takeUntilDestroyed())
      .subscribe(teleport => this.onTeleport(teleport));
  }

  private onTeleport(teleport: InstructionTeleport): void {
    const mapHelper = this.mapHelper();
    this.teleport.set(teleport);
    setTimeout(() => {
      const sprite = mapHelper.scenePlayer.mesh;
      if (sprite) {
        const diff = {
          x: teleport.pos.x - sprite.position.x,
          z: teleport.pos.z - sprite.position.z,
        };
        const camera = mapHelper.originGame.camera;
        camera.position.x += diff.x;
        camera.position.z += diff.z;
        mapHelper.updateCameraAim();
        sprite.position.x += diff.x;
        sprite.position.z += diff.z;
        mapHelper.originGame.render();
      }
      this.teleport.set(null);
      setTimeout(() => this.sequenceService.nextSequence(), 200);
    }, 300);
  }
}
