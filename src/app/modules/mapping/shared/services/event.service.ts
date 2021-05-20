import { Injectable } from '@angular/core';
import { SceneHelper } from '../model/SceneHelper';
import { KeyCode } from '../../../../core/shared/model/PressedKey';
import { PlayerDirection } from '../model/ScenePlayer';
import * as THREE from 'three';
import { SceneEvent, SceneEventHelper } from '../model/SceneEvent';
import { VecBox3 } from '../model/SceneUtils';
import { MathService } from './math.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() {
  }

  public static checkEvents(sceneHelper: SceneHelper, playerMesh: THREE.Mesh, pressedCodes: KeyCode[]): SceneEvent {
    let eventsHelper: SceneEventHelper[] = [];
    sceneHelper.sceneMap.chunks.forEach(chunk => {
      if(chunk.visible) {
        chunk.buildings.forEach(building => {
          building.events.forEach(evt => {
            const dirCond = EventService.checkDirection(evt.conditions.direction, sceneHelper);
            if(!dirCond) { return; }
            const keyCond = EventService.checkPressedKeys(evt.conditions.pressedKeys, pressedCodes);
            if(!keyCond) { return; }
            const buildingKey = chunk.id + '-' + building.id;
            const bounds = sceneHelper.getBounds(chunk.id + '-' + building.id);
            const boundsCond = EventService.checkBounds(evt.conditions.bounds, bounds, playerMesh);
            if(!boundsCond) { return; }
            eventsHelper.push({ evt, buildingMesh: sceneHelper.meshes[buildingKey] });
          });
        });
      }
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

  private static checkPressedKeys(keys: KeyCode[], pressedCodes: KeyCode[]): boolean {
    if(!keys || !keys.length) { return true; }
    return keys.findIndex( key => {
      return pressedCodes.indexOf(key) >= 0;
    }) >= 0;
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
