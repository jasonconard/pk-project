import { Game, SHADE_OFFSET, TOO_FAR_LIMIT } from "../../../game/shared/model/Game";
import * as THREE from "three";
import { Fighters } from "./Fighters";
import { SceneChunk } from "../../../game/shared/model/SceneMap";
import { BasicMeshService } from "../../../game/shared/services/basic-mesh.service";
import { convertVec3 } from "../../../game/shared/model/SceneUtils";
import { MODELS } from "../../../../../assets/models/models";

export class FightHelper {
  public originGame: Game;
  public meshes: { [key: string]: THREE.Mesh };
  public battleField: SceneChunk;
  public fighters: Fighters;

  constructor(o: any) {
    this.originGame = o.originGame;
    this.meshes = o.meshes;
    this.battleField = o.battleField;
    this.fighters = o.fighters;
  }

  buildBattlefield() {
    const chunk = this.battleField;
    chunk.group = new THREE.Group();

    chunk.grounds.forEach(ground => {
      const key = chunk.id + '-g-' + ground.id;
      this.addMesh(
        key,
        BasicMeshService.makePlaneFromPoints(ground.link, ground.points),
        convertVec3(chunk.pos)
      );
      ground.mesh = this.meshes[key];
      chunk.group.add(ground.mesh);
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
        chunk.group.add(buildingMesh);
      }
    });

    this.originGame.scene.add(chunk.group);
      chunk.buildings.forEach(building => {
        this.updateVisibleMesh(chunk.id + '-' + building.id);
      });
  }

  public addMesh(key: string, mesh: THREE.Mesh, position?: THREE.Vector3) {
    this.meshes[key] = mesh;
    const pos = position || new THREE.Vector3(0, 0, 0);
    mesh.position.x = pos.x;
    mesh.position.y = pos.y;
    mesh.position.z = pos.z;
  }


  public updateVisibleMesh(key: string) {
    const mesh = this.meshes[key];
    if(!mesh) { return; }

    if(mesh.children) {
      mesh.children.forEach( child => child.material.transparent = true );
    } else {
      mesh.material.transparent = true;
    }
  }
}
