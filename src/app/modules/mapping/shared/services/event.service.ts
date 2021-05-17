import { Injectable } from '@angular/core';
import { SceneHelper } from '../model/SceneHelper';
import { KeyCode } from '../../../../core/shared/model/PressedKey';
import { PlayerDirection } from '../model/ScenePlayer';
import { CoreService } from '../../../../core/shared/service/core.service';
import * as THREE from 'three';
import { SceneEvent, SceneEventHelper } from '../model/SceneEvent';
import { VecBox3 } from '../model/SceneUtils';
import { MathService } from './math.service';
import { InstructionType } from '../model/SceneEventInstruction';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private coreService: CoreService) {
  }

  public launchSequence(event: SceneEvent) {
    if (event) {
      event.sequence.forEach(instruction => {
        if (instruction.type === InstructionType.LOG && instruction.log) {
          this.coreService.setLogs(instruction.log.text);
        }
        if (instruction.type === InstructionType.MESSAGE && instruction.message) {
          this.coreService.setLogs(instruction.message.name + ' : ' + instruction.message.text);
        }
      });
    }
  }

  public static checkEvents(sceneHelper: SceneHelper, playerMesh: THREE.Mesh, pressedCodes: KeyCode[]): SceneEvent {
    let eventsHelper: SceneEventHelper[] = [];
    sceneHelper.sceneMap.parcels.forEach(parcel => {
      parcel.buildings.forEach(building => {
        building.events.forEach(evt => {
          const dirCond = EventService.checkDirection(evt.conditions.direction, sceneHelper);
          if(!dirCond) { return; }
          const keyCond = EventService.checkPressedKey(evt.conditions.pressedKey, pressedCodes);
          if(!keyCond) { return; }
          const buildingKey = parcel.id + '-' + building.id;
          const bounds = sceneHelper.getBounds(parcel.id + '-' + building.id);
          const boundsCond = EventService.checkBounds(evt.conditions.bounds, bounds, playerMesh);
          if(!boundsCond) { return; }
          eventsHelper.push({ evt, buildingMesh: sceneHelper.meshes[buildingKey] });
        });
      });
    });
    if(!eventsHelper.length) {
      return null;
    } else if(eventsHelper.length === 1) {
      return eventsHelper[0].evt;
    } else {
      return eventsHelper.sort( (eh1, eh2) => {
        const d1 = MathService.getDist(playerMesh, eh1.buildingMesh);
        const d2 = MathService.getDist(playerMesh, eh2.buildingMesh);
        return d1 > d2 ? 1 : -1;
      })[0].evt;
    }
  }

  private static checkDirection(dir: PlayerDirection, sh: SceneHelper): boolean {
    if(!PlayerDirection[dir]) { return true; }
    return dir === sh.scenePlayer.dir;
  }

  private static checkPressedKey(key: KeyCode, pressedCodes: KeyCode[]): boolean {
    if(!KeyCode[key]) { return true; }
    return pressedCodes.indexOf(key) >= 0;
  }

  private static checkBounds(bounds: VecBox3, buildingBounds: THREE.Box3, playerMesh: THREE.Mesh): boolean {
    if(!bounds) { return true; }
    return buildingBounds &&
      playerMesh.position.x >= (buildingBounds.min.x - bounds.min.x) &&
      playerMesh.position.y >= (buildingBounds.min.y - bounds.min.y) &&
      playerMesh.position.z >= (buildingBounds.min.z - bounds.min.z) &&
      playerMesh.position.x <= (buildingBounds.max.x + bounds.max.x) &&
      playerMesh.position.y <= (buildingBounds.max.y + bounds.max.y) &&
      playerMesh.position.z <= (buildingBounds.max.z + bounds.max.z);

  }



}
