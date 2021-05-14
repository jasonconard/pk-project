import * as THREE from 'three';
import { MathService } from '../services/math.service';
import { SceneMap } from './SceneMap';
import { BasicMeshService } from '../services/basic-mesh.service';
import { MODELS } from '../data/models/models';
import { ScenePlayer } from './ScenePlayer';
import { convertVec2, convertVec3 } from './SceneUtils';
import { SceneBuilding } from './SceneBuilding';

// export const CAMERA_LOOK = new THREE.Vector3(0, 2, 160);
export const CAMERA_LOOK = new THREE.Vector3(0, 140, 160);
export const TOO_CLOSE_LIMIT = 40;
export const TOO_FAR_LIMIT = 480;
//export const TOO_FAR_LIMIT = 300;
export const SHADE_OFFSET = 32;

export class SceneHelper {
  scene: THREE.Scene;
  elem: Element;
  camera: THREE.PerspectiveCamera;
  light: THREE.AmbientLight;
  renderer: THREE.WebGLRenderer;
  meshes: { [key: string]: (THREE.Mesh | THREE.Group) };
  sceneMap: SceneMap;
  scenePlayer: ScenePlayer;

  constructor(o: any) {
    this.scene = o.scene;
    this.elem = o.elem;
    this.camera = o.camera;
    this.light = o.light;
    this.renderer = o.renderer;
    this.meshes = o.meshes;
    this.sceneMap = o.sceneMap;
    this.scenePlayer = o.scenePlayer;
  }

  public refreshRenderer() {
    const rect = this.elem.getBoundingClientRect();
    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( rect.width, rect.height );
  }

  public getPlayerScreenCoords(): THREE.Vector2 {
    const vector = new THREE.Vector3();

    const player = this.getPlayerMesh();
    if(!player) { return null; }

    const widthHalf = this.elem.clientWidth / 2;
    const heightHalf = this.elem.clientHeight / 2;

    player.updateMatrixWorld();
    vector.setFromMatrixPosition(player.matrixWorld);
    vector.project(this.camera);

    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;

    return new THREE.Vector2(vector.x, vector.y);
  }

  public buildPlayer() {
    const p = this.scenePlayer;
    if(!p) { return; }
    this.addMesh(p.id, BasicMeshService.makePlane(p.tex.link, convertVec2(p.tex.size), true));
    this.meshes[p.id].position.y = 21/2;
    this.meshes[p.id].lookAt(this.camera.position);
  }

  public getPlayerMesh(): THREE.Mesh {
    return this.meshes[this.scenePlayer.id];
  }

  public buildMeshes() {
    this.sceneMap.parcels.forEach(parcel => {
      this.addMesh(
        parcel.id,
        BasicMeshService.makePlane(parcel.groundLink, convertVec2(parcel.size)),
        convertVec3(parcel.pos)
      );
      this.meshes[parcel.id].rotation.x = Math.PI / -2;

      // this.meshes[parcel.id].castShadow = true;
      // this.meshes[parcel.id].receiveShadow = true;

      parcel.buildings.forEach( building => {
        const key = parcel.id + '-' + building.id;
        const model = MODELS.find(m => m.id === building.modelId);
        if(model) {
          building.originModel = model;
          this.addMesh(key, BasicMeshService.makeModel(model));
          const buildingMesh = this.meshes[key];
          buildingMesh.position.x = parcel.pos.x + building.pos.x;
          buildingMesh.position.y = parcel.pos.y + building.pos.y;
          buildingMesh.position.z = parcel.pos.z + building.pos.z;
        }
      });
    });

  }

  private flowersCount = 0;
  public addFlowersToCoords(v: THREE.Vector3) {
    const parcel = this.sceneMap.parcels[0];
    const key = 'custom-flowers-' + (this.flowersCount++);
    const model = MODELS.find(m => m.id === 'flowers');
    const building: SceneBuilding = {
      id: key,
      modelId: 'flowers',
      pos: {x: v.x, y: v.y, z: v.z},
      passable: true,
      canHide: false,
      originModel: model,
      events: []
    }
    parcel.buildings.push(building);

    if(model) {
      this.addMesh(parcel.id + '-' + key, BasicMeshService.makeModel(model));
      const buildingMesh = this.meshes[parcel.id + '-' + key];
      buildingMesh.position.x = parcel.pos.x + building.pos.x;
      buildingMesh.position.y = parcel.pos.y + building.pos.y;
      buildingMesh.position.z = parcel.pos.z + building.pos.z;
    }

    console.log(parcel.buildings);
  }

  public updateCameraAim() {
    this.camera.lookAt(
      this.camera.position.x - CAMERA_LOOK.x,
      this.camera.position.y - CAMERA_LOOK.y,
      this.camera.position.z - CAMERA_LOOK.z
    );
  }

  public addMesh(key: string, mesh: THREE.Mesh, position?: THREE.Vector3) {
    this.meshes[key] = mesh;
    const pos = position || new THREE.Vector3(0, 0, 0);
    mesh.position.x = pos.x;
    mesh.position.y = pos.y;
    mesh.position.z = pos.z;
    this.scene.add(this.meshes[key]);
  }

  public getBounds(key: string): THREE.Box3 {
    const mesh = this.meshes[key];
    if(!mesh) { return; }
    return new THREE.Box3().setFromObject(mesh);
  }

  public updateVisibleMesh(key: string, playerPos: THREE.Vector3, canHide: boolean) {
    const mesh = this.meshes[key];
    if(!mesh) { return; }

    const opacity = this.getOpacity(mesh, playerPos, canHide);

    if(mesh.children) {
      mesh.children.forEach( child => SceneHelper.updateMeshOpacity(child, opacity));
    } else {
      SceneHelper.updateMeshOpacity(mesh, opacity);
    }
  }

  private getOpacity(mesh: THREE.mesh, playerPos: THREE.Vector3, canHide: boolean): number {
    let opacity = 1;

    const bounds = new THREE.Box3().setFromObject(mesh);

    // HIDE IF TOO CLOSE TO CAMERA
    const cameraZ = this.camera.position.z - TOO_CLOSE_LIMIT;
    if((this.camera.position.z - TOO_CLOSE_LIMIT) < bounds.max.z) {
      opacity = Math.max(0, 1 - (bounds.max.z - cameraZ) / SHADE_OFFSET);
      return opacity;
    }

    // HIDE IF TOO FAR FOR CAMERA
    const dist = MathService.getDist(mesh.position, this.camera.position);
    if(dist > TOO_FAR_LIMIT) {
      opacity = Math.max(0, 1 - (dist - TOO_FAR_LIMIT) / SHADE_OFFSET);
      return opacity;
    }

    if(bounds.min.x < playerPos.x && bounds.max.x > playerPos.x && playerPos.z < bounds.min.z) {
      const borderDist = Math.min(Math.abs(playerPos.x - bounds.min.x), Math.abs(playerPos.x - bounds.max.x));
      const behindDist = Math.abs(playerPos.z - bounds.min.z);
      const height = (bounds.max.y - bounds.min.y + SHADE_OFFSET);
      if(behindDist < height) {
        const opacityOffsetX = borderDist > SHADE_OFFSET ? 0 : (1 - borderDist/SHADE_OFFSET);
        const opacityOffsetZ = behindDist > height ? 0 : (behindDist/height);
        const opacityOffset = Math.max(opacityOffsetX, opacityOffsetZ);
        opacity = 0.7 + (0.3 * opacityOffset);
      }
    }

    if(!canHide) {
      return opacity > 0 ? 1 : 0;
    } else {
      return opacity;
    }
  }

  private static updateMeshOpacity(mesh: THREE.mesh, opacity: number) {
    mesh.material.transparent = true;
    if(opacity < 1) {
      // mesh.material.transparent = true;
      mesh.material.opacity = opacity;
      mesh.visible = opacity > 0;
    } else {
      // mesh.material.transparent = false;
      mesh.material.opacity = 1;
      mesh.visible = true;
    }
  }
}
