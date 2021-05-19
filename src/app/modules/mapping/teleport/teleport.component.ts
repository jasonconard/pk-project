import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SceneHelper } from '../shared/model/SceneHelper';
import { InstructionTeleport } from '../shared/model/SceneEventInstruction';
import { Vec3 } from '../shared/model/SceneUtils';
import { FADE_ANIM } from '../../../core/shared/animations/FadeAnim';
import { SequenceService } from '../shared/services/sequence.service';

@Component({
  selector: 'core-teleport',
  templateUrl: './teleport.component.html',
  styleUrls: ['./teleport.component.scss'],
  animations: [FADE_ANIM]
})
export class TeleportComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  @Input() public sceneHelper: SceneHelper;
  public teleport: InstructionTeleport = null;

  constructor(private sequenceService: SequenceService) {
  }

  ngOnInit(): void {
    this.subs.push(this.sequenceService.teleportSub.subscribe((teleport: InstructionTeleport) => {
      if(!teleport || !this.sceneHelper) {
        this.sequenceService.teleportSub.next(null);
        this.sequenceService.nextSequence();
      } else {
        this.teleport = teleport;
        setTimeout( () => {
          const sprite = this.sceneHelper.getPlayerMesh();
          const diff: Vec3 = {
            x: teleport.pos.x - sprite.position.x,
            y: teleport.pos.y - sprite.position.y,
            z: teleport.pos.z - sprite.position.z,
          };

          const camera = this.sceneHelper.camera;
          camera.position.x += diff.x;
          // camera.position.y += diff.y;
          camera.position.z += diff.z;
          this.sceneHelper.updateCameraAim();
          if(sprite) {
            sprite.position.x += diff.x;
            // sprite.position.y += diff.y;
            sprite.position.z += diff.z;
          }
          this.sceneHelper.render();
          this.teleport = null;
          setTimeout( () => {
            this.sequenceService.nextSequence();
          }, 200);
        }, 300);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
    this.subs = [];
  }


}
