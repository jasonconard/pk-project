import { Service } from '@angular/core';
import { KeyCode } from '../../../../core/shared/model/PressedKey';
import { PlayerDirection } from '../model/ScenePlayer';
import * as THREE from 'three';
import { SceneEvent, SceneEventHelper } from '../model/SceneEvent';
import { VecBox3 } from '../model/SceneUtils';
import { MathService } from './math.service';
import { MapHelper } from "../model/MapHelper";

@Service()
export class EventService {

  public static checkEvents(mapHelper: MapHelper, playerMesh: THREE.Object3D, pressedCodes: KeyCode[]): SceneEvent | null {
    const eventsHelper: SceneEventHelper[] = [];
    mapHelper.sceneMap.chunks.forEach(chunk => {
      if(chunk.visible) {
        chunk.buildings.forEach(building => {
          building.events.forEach(evt => {
            const dirCond = EventService.checkDirection(evt.conditions.direction, mapHelper);
            if(!dirCond) { return; }
            const keyCond = EventService.checkPressedKeys(evt.conditions.pressedKeys, pressedCodes);
            if(!keyCond) { return; }
            const buildingKey = chunk.id + '-' + building.id;
            const bounds = mapHelper.getBounds(chunk.id + '-' + building.id);
            const boundsCond = EventService.checkBounds(evt.conditions.bounds, bounds, playerMesh);
            if(!boundsCond) { return; }
            const buildingMesh = mapHelper.meshes[buildingKey];
            if (buildingMesh) {
              eventsHelper.push({ evt, buildingMesh });
            }
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
        const d1 = MathService.getDist(playerMesh.position, eh1.buildingMesh.position);
        const d2 = MathService.getDist(playerMesh.position, eh2.buildingMesh.position);
        return d1 > d2 ? 1 : -1;
      })[0].evt;
    }
  }

  private static checkDirection(dir: PlayerDirection | undefined, mh: MapHelper): boolean {
    if(dir === undefined || !PlayerDirection[dir]) { return true; }
    return dir === mh.scenePlayer.dir;
  }

  private static checkPressedKeys(keys: KeyCode[] | undefined, pressedCodes: KeyCode[]): boolean {
    if(!keys || !keys.length) { return true; }
    return keys.findIndex( key => {
      return pressedCodes.indexOf(key) >= 0;
    }) >= 0;
  }

  private static checkBounds(bounds: VecBox3 | undefined, buildingBounds: THREE.Box3 | null, playerMesh: THREE.Object3D): boolean {
    if(!bounds) { return true; }
    return !!buildingBounds &&
      playerMesh.position.x >= (buildingBounds.min.x - bounds.min.x) &&
      playerMesh.position.y >= (buildingBounds.min.y - bounds.min.y) &&
      playerMesh.position.z >= (buildingBounds.min.z - bounds.min.z) &&
      playerMesh.position.x <= (buildingBounds.max.x + bounds.max.x) &&
      playerMesh.position.y <= (buildingBounds.max.y + bounds.max.y) &&
      playerMesh.position.z <= (buildingBounds.max.z + bounds.max.z);

  }



}
