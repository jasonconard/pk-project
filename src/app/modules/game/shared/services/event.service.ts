import { Service } from '@angular/core';
import { KeyCode } from '../../../../core/shared/model/PressedKey';
import { PlayerDirection } from '../model/ScenePlayer';
import * as THREE from 'three';
import { SceneEvent, SceneEventHelper } from '../model/SceneEvent';
import { VecBox3 } from '../model/SceneUtils';
import { MathService } from './math.service';
import { MapHelper } from "../model/MapHelper";
import { SceneBuilding } from "../model/SceneBuilding";

@Service()
export class EventService {

  public static checkEvents(mapHelper: MapHelper, playerMesh: THREE.Object3D, pressedCodes: KeyCode[], holdedCodes: KeyCode[] = []): SceneEvent | null {
    return EventService.nearest(mapHelper, playerMesh, evt => EventService.checkPressedKeys(evt.conditions.pressedKeys,
      evt.conditions.held ? [...pressedCodes, ...holdedCodes] : pressedCodes))?.evt ?? null;
  }

  /**
   * What the action key would do right now (the touch action button, the computer's prompt): the nearest event
   * waiting for it whose place and direction fit, and its object. Events that happen by walking are left out.
   */
  public static actionAt(mapHelper: MapHelper, playerMesh: THREE.Object3D): { evt: SceneEvent, building: SceneBuilding } | null {
    return EventService.nearest(mapHelper, playerMesh, evt => !!evt.conditions.pressedKeys?.includes(KeyCode.confirm));
  }

  /** The nearest event of the visible objects whose direction and place fit, among those `keep` accepts. */
  private static nearest(mapHelper: MapHelper, playerMesh: THREE.Object3D, keep: (evt: SceneEvent) => boolean): { evt: SceneEvent, building: SceneBuilding } | null {
    const found: (SceneEventHelper & { building: SceneBuilding })[] = [];
    mapHelper.sceneMap.chunks.forEach(chunk => {
      if(chunk.visible) {
        chunk.buildings.forEach(building => {
          building.events.forEach(evt => {
            if(!EventService.checkDirection(evt.conditions.direction, mapHelper) || !keep(evt)) { return; }
            const buildingKey = chunk.id + '-' + building.id;
            const bounds = mapHelper.getBounds(buildingKey);
            if(!EventService.checkBounds(evt.conditions.bounds, bounds, playerMesh)) { return; }
            const buildingMesh = mapHelper.meshes[buildingKey];
            if (buildingMesh) {
              found.push({ evt, buildingMesh, building });
            }
          });
        });
      }
    });
    if(!found.length) {
      return null;
    }
    const best = found.length === 1 ? found[0] : found.sort((eh1, eh2) => {
      const d1 = MathService.getDist(playerMesh.position, eh1.buildingMesh.position);
      const d2 = MathService.getDist(playerMesh.position, eh2.buildingMesh.position);
      return d1 > d2 ? 1 : -1;
    })[0];
    return { evt: best.evt, building: best.building };
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
