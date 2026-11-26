import { Service } from "@angular/core";
import { KeyCode } from "../../../../core/shared/model/PressedKey";
import { PlayerDirection } from "../model/ScenePlayer";
import * as THREE from "three";
import { SceneEvent, SceneEventHelper } from "../model/SceneEvent";
import { VecBox3 } from "../model/SceneUtils";
import { MathService } from "./math.service";
import { MapHelper } from "../model/MapHelper";
import { SceneBuilding } from "../model/SceneBuilding";
import { SceneChunk } from "../model/SceneMap";
import { conditionsFit, EventContext } from "../model/ObjectEvent";
import {
  ActionZone,
  inZone,
  isWholeObject,
  zoneFacing,
} from "../model/action-zone";
import { findModel } from "../model/Zone";

/** An event found for the player, with its object. */
export interface FoundEvent {
  evt: SceneEvent;
  building: SceneBuilding;
  chunk: SceneChunk;
}

@Service()
export class EventService {
  /** The event the keys start now (the nearest object's first one that fits), if any. */
  public static checkEvents(
    mapHelper: MapHelper,
    playerMesh: THREE.Object3D,
    ctx: EventContext,
    pressedCodes: KeyCode[],
    holdedCodes: KeyCode[] = []
  ): FoundEvent | null {
    return EventService.nearest(
      mapHelper,
      playerMesh,
      ctx,
      (evt, building) =>
        !evt.conditions.trigger &&
        EventService.checkPressedKeys(
          EventService.keysOf(evt, building, mapHelper),
          evt.conditions.held ? [...pressedCodes, ...holdedCodes] : pressedCodes
        )
    );
  }

  /**
   * What the action key would do right now (the touch action button, the computer's prompt): the nearest event
   * waiting for it whose place, direction and conditions fit, and its object. Events that happen by walking are left out.
   */
  public static actionAt(
    mapHelper: MapHelper,
    playerMesh: THREE.Object3D,
    ctx: EventContext
  ): FoundEvent | null {
    return EventService.nearest(
      mapHelper,
      playerMesh,
      ctx,
      (evt) =>
        !evt.conditions.trigger &&
        !!evt.conditions.pressedKeys?.includes(KeyCode.confirm)
    );
  }

  /**
   * The events that start on their own and could play now: stepping into an object ('enter', visible chunks) or
   * as soon as their conditions are true ('auto', the whole map). Of one object, only the first that fits.
   */
  public static armed(
    mapHelper: MapHelper,
    playerMesh: THREE.Object3D,
    ctx: EventContext
  ): FoundEvent[] {
    const found: FoundEvent[] = [];
    mapHelper.sceneMap.chunks.forEach((chunk) => {
      chunk.buildings.forEach((building) => {
        const evt = building.events.find((evt) => {
          const trigger = evt.conditions.trigger;
          if (
            !trigger ||
            (trigger === "enter" && !chunk.visible) ||
            !conditionsFit(evt.conditions, ctx)
          ) {
            return false;
          }
          if (trigger === "auto") {
            return true;
          }
          return EventService.fitsPlace(
            evt,
            chunk,
            building,
            mapHelper,
            playerMesh
          );
        });
        if (evt) {
          found.push({ evt, building, chunk });
        }
      });
    });
    return found;
  }

  /** The nearest event of the visible objects whose direction, place and conditions fit, among those `keep` accepts. */
  private static nearest(
    mapHelper: MapHelper,
    playerMesh: THREE.Object3D,
    ctx: EventContext,
    keep: (evt: SceneEvent, building: SceneBuilding) => boolean
  ): FoundEvent | null {
    const found: (SceneEventHelper & FoundEvent)[] = [];
    mapHelper.sceneMap.chunks.forEach((chunk) => {
      if (chunk.visible) {
        chunk.buildings.forEach((building) => {
          const buildingKey = chunk.id + "-" + building.id;
          // (of one object, the first event that fits)
          const evt = building.events.find(
            (evt) =>
              keep(evt, building) &&
              EventService.fitsPlace(
                evt,
                chunk,
                building,
                mapHelper,
                playerMesh
              ) &&
              conditionsFit(evt.conditions, ctx)
          );
          const buildingMesh = mapHelper.meshes[buildingKey];
          if (evt && buildingMesh) {
            found.push({ evt, buildingMesh, building, chunk });
          }
        });
      }
    });
    if (found.length === 0) {
      return null;
    }
    const best =
      found.length === 1
        ? found[0]
        : found.sort((eh1, eh2) => {
            const d1 = MathService.getDist(
              playerMesh.position,
              eh1.buildingMesh.position
            );
            const d2 = MathService.getDist(
              playerMesh.position,
              eh2.buildingMesh.position
            );
            return d1 > d2 ? 1 : -1;
          })[0];
    return { evt: best.evt, building: best.building, chunk: best.chunk };
  }

  /** The action zone an event uses: its own, else its object's, else its model's (null: the whole object). */
  static zoneOf(evt: SceneEvent, building: SceneBuilding): ActionZone | null {
    const zone =
      evt.conditions.zone ?? building.zone ?? findModel(building.modelId)?.zone;
    return zone && !isWholeObject(zone) ? zone : null;
  }

  /**
   * Is the player where the event waits for them: the place around the object (its bounds), and for a door facing it;
   * with an action zone, its cells and side instead (see action-zone.ts).
   */
  private static fitsPlace(
    evt: SceneEvent,
    chunk: SceneChunk,
    building: SceneBuilding,
    mapHelper: MapHelper,
    playerMesh: THREE.Object3D
  ): boolean {
    const place = evt.conditions.bounds;
    const zone = place ? EventService.zoneOf(evt, building) : null;
    if (!place || !zone) {
      return (
        EventService.checkDirection(evt.conditions.direction, mapHelper) &&
        EventService.checkBounds(
          place,
          mapHelper.getBounds(chunk.id + "-" + building.id),
          playerMesh
        )
      );
    }
    const bounds = mapHelper.buildingBounds(chunk, building);
    if (!bounds) {
      return false;
    }
    const reach = Math.max(place.max.x, place.max.z, place.min.x, place.min.z);
    const rot = building.rot ?? 0;
    if (!inZone(zone, bounds, rot, playerMesh.position, reach, reach === 0)) {
      return false;
    }
    // (a door: facing the object, from the zone's side)
    return (
      evt.conditions.direction === undefined ||
      mapHelper.scenePlayer.dir ===
        EventService.facing(zone, rot, bounds, playerMesh)
    );
  }

  /** Where the player faces to act: towards the object from the zone's side (every side: towards its centre). */
  private static facing(
    zone: ActionZone,
    rot: number,
    bounds: THREE.Box3,
    playerMesh: THREE.Object3D
  ): PlayerDirection {
    const dir = zoneFacing(zone, rot);
    if (dir !== undefined) {
      return dir;
    }
    const dx = (bounds.min.x + bounds.max.x) / 2 - playerMesh.position.x;
    const dz = (bounds.min.z + bounds.max.z) / 2 - playerMesh.position.z;
    if (Math.abs(dx) > Math.abs(dz)) {
      return dx > 0 ? PlayerDirection.RIGHT : PlayerDirection.LEFT;
    }
    return dz > 0 ? PlayerDirection.DOWN : PlayerDirection.UP;
  }

  /** The keys an event waits for; a door with a zone: the action key or walking into it from the zone's side. */
  private static keysOf(
    evt: SceneEvent,
    building: SceneBuilding,
    mapHelper: MapHelper
  ): KeyCode[] | undefined {
    const keys = evt.conditions.pressedKeys;
    const zone = EventService.zoneOf(evt, building);
    if (evt.conditions.direction === undefined || !zone || !keys) {
      return keys;
    }
    const walkKeys: Record<PlayerDirection, KeyCode> = {
      [PlayerDirection.UP]: KeyCode.up,
      [PlayerDirection.DOWN]: KeyCode.down,
      [PlayerDirection.LEFT]: KeyCode.left,
      [PlayerDirection.RIGHT]: KeyCode.right,
    };
    // (the player faces the door already: fitsPlace checked it)
    return [KeyCode.confirm, walkKeys[mapHelper.scenePlayer.dir]];
  }

  private static checkDirection(
    dir: PlayerDirection | undefined,
    mh: MapHelper
  ): boolean {
    if (dir === undefined || !PlayerDirection[dir]) {
      return true;
    }
    return dir === mh.scenePlayer.dir;
  }

  private static checkPressedKeys(
    keys: KeyCode[] | undefined,
    pressedCodes: KeyCode[]
  ): boolean {
    if (!keys || keys.length === 0) {
      return true;
    }
    return keys.some((key) => {
      return pressedCodes.includes(key);
    });
  }

  private static checkBounds(
    bounds: VecBox3 | undefined,
    buildingBounds: THREE.Box3 | null,
    playerMesh: THREE.Object3D
  ): boolean {
    if (!bounds) {
      return true;
    }
    return (
      !!buildingBounds &&
      playerMesh.position.x >= buildingBounds.min.x - bounds.min.x &&
      playerMesh.position.y >= buildingBounds.min.y - bounds.min.y &&
      playerMesh.position.z >= buildingBounds.min.z - bounds.min.z &&
      playerMesh.position.x <= buildingBounds.max.x + bounds.max.x &&
      playerMesh.position.y <= buildingBounds.max.y + bounds.max.y &&
      playerMesh.position.z <= buildingBounds.max.z + bounds.max.z
    );
  }
}
