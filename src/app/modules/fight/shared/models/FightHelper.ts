import { Game } from "../../../game/shared/model/Game";
import * as THREE from "three";
import { Fighters } from "./Fighters";
import { SceneChunk } from "../../../game/shared/model/SceneMap";
import { BasicMeshService } from "../../../game/shared/services/basic-mesh.service";
import { convertVec3 } from "../../../game/shared/model/SceneUtils";
import { MODELS } from "../../../../../assets/models/models";

export interface FightHelperInit {
  originGame: Game;
  battleField: SceneChunk;
  fighters?: Fighters;
}

export class FightHelper {
  public originGame: Game;
  public meshes: Record<string, THREE.Object3D> = {};
  public battleField: SceneChunk;
  public fighters?: Fighters;

  constructor(o: FightHelperInit) {
    this.originGame = o.originGame;
    this.battleField = o.battleField;
    this.fighters = o.fighters;
  }

  buildBattlefield() {
    const chunk = this.battleField;
    const group = new THREE.Group();
    chunk.group = group;

    chunk.grounds.forEach(ground => {
      const key = chunk.id + '-g-' + ground.id;
      this.addMesh(
        key,
        BasicMeshService.makePlaneFromPoints(ground.link, ground.points),
        convertVec3(chunk.pos)
      );
      ground.mesh = this.meshes[key] as THREE.Mesh;
      group.add(ground.mesh);
      // ground.mesh.rotation.x = Math.PI / -2;
    });
    // return;


    // this.meshes[chunk.id].castShadow = true;
    // this.meshes[chunk.id].receiveShadow = true;

    chunk.buildings.forEach( building => {
      const key = chunk.id + '-' + building.id;
      const model = MODELS.find(m => m.id === building.modelId);
      if(model) {
        building.originModel = model;
        this.addMesh(key, BasicMeshService.makeModel(model));
        const buildingMesh = this.meshes[key];
        buildingMesh.position.x = chunk.pos.x + building.pos.x;
        buildingMesh.position.y = chunk.pos.y + building.pos.y;
        buildingMesh.position.z = chunk.pos.z + building.pos.z;
        group.add(buildingMesh);
      }
    });

    this.originGame.scene.add(group);
      chunk.buildings.forEach(building => {
        this.updateVisibleMesh(chunk.id + '-' + building.id);
      });
  }

  public addMesh(key: string, mesh: THREE.Object3D, position?: THREE.Vector3) {
    this.meshes[key] = mesh;
    const pos = position || new THREE.Vector3(0, 0, 0);
    mesh.position.x = pos.x;
    mesh.position.y = pos.y;
    mesh.position.z = pos.z;
  }


  public updateVisibleMesh(key: string) {
    const mesh = this.meshes[key];
    if(!mesh) { return; }

    const targets = mesh.children.length ? mesh.children : [mesh];
    targets.forEach(target => {
      if (target instanceof THREE.Mesh) {
        (target.material as THREE.Material).transparent = true;
      }
    });
  }
}
