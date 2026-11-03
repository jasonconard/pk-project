import * as THREE from 'three';
import { SceneChunk, SceneMap } from './SceneMap';
import { ScenePlayer } from './ScenePlayer';
import { CAMERA_LOOK, Game, SHADE_OFFSET, TOO_CLOSE_LIMIT, TOO_FAR_LIMIT } from "./Game";
import { BasicMeshService } from "../services/basic-mesh.service";
import { convertVec2, convertVec3 } from "./SceneUtils";
import { MODELS } from "../../../../../assets/models/models";
import { SceneBuilding } from "./SceneBuilding";
import { MathService } from "../services/math.service";

export interface MapHelperInit {
  originGame: Game;
  sceneMap: SceneMap;
  scenePlayer: ScenePlayer;
}

export class MapHelper {
  originGame: Game;
  meshes: Record<string, THREE.Object3D> = {};
  sceneMap: SceneMap;
  scenePlayer: ScenePlayer;

  constructor(o: MapHelperInit) {
    this.originGame = o.originGame;
    this.sceneMap = o.sceneMap;
    this.scenePlayer = o.scenePlayer;
  }


  public getPlayerScreenCoords(game: Game): THREE.Vector2 | null {
    const vector = new THREE.Vector3();

    const player = this.scenePlayer.mesh;
    if(!player) { return null; }

    const widthHalf = game.canvas.clientWidth / 2;
    const heightHalf = game.canvas.clientHeight / 2;

    player.updateMatrixWorld();
    vector.setFromMatrixPosition(player.matrixWorld);
    vector.project(game.camera);

    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;

    return new THREE.Vector2(vector.x, vector.y);
  }

  public buildPlayer() {
    const p = this.scenePlayer;
    const spriteGroup = new THREE.Group();
    const spritePlane = BasicMeshService.makePlane(p.tex.link, convertVec2(p.tex.size), true);
    const mat = spritePlane.material as THREE.Material;
    mat.depthTest = true;
    mat.depthWrite = true;
    mat.side = THREE.DoubleSide;

    spritePlane.position.x = 0;
    spritePlane.position.y = p.tex.size.y / 2;
    spritePlane.position.z = 0;
    spriteGroup.add(spritePlane);

    const camera = this.originGame.camera;
    const scene = this.originGame.scene;

    this.addMesh(p.id, spriteGroup);
    camera.position.x = spritePlane.position.x;
    spriteGroup.lookAt(camera.position);
    scene.add(spriteGroup);

    this.scenePlayer.mesh = spriteGroup;

    this.updateVisibleChunks();
  }

  public updateVisibleChunks() {
    const chunks = this.sceneMap.chunks;
    const player = this.scenePlayer.mesh;
    if (!player) { return; }
    const comparePos = new THREE.Vector3(player.position.x, player.position.y, this.originGame.camera.position.z);
    chunks.forEach(chunk => {
      chunk.visible = MapHelper.isChunkVisible(chunk, comparePos);
      if (chunk.group) {
        chunk.group.visible = chunk.visible;
      }
    });
  }

  private static isChunkVisible(chunk: SceneChunk, comparePos: THREE.Vector3): boolean {
    return !(
      // HIDE BEHIND CAMERA
      (chunk.pos.z - chunk.size.y / 2) > comparePos.z ||
      // HIDE TOO FAR
      (chunk.pos.z + (chunk.size.y * 1.4)) < comparePos.z ||
      // HIDE TOO FAR LEFT
      (chunk.pos.x + (chunk.size.x * 1.2)) < comparePos.x ||
      // HIDE TOO FAR RIGHT
      (chunk.pos.x - (chunk.size.x * 1.2)) > comparePos.x ||
      // HIDE TOO FAR HEIGHT
      Math.abs(chunk.pos.y - comparePos.y) > (TOO_FAR_LIMIT + SHADE_OFFSET)
    );
  }

  public buildChunks() {
    this.sceneMap.chunks.forEach(chunk => {
      const group = new THREE.Group();
      chunk.group = group;

      chunk.grounds.forEach(ground => {
        const key = chunk.id + '-g-' + ground.id;
        const groundMesh = BasicMeshService.makePlaneFromPoints(ground.link, ground.points);
        this.addMesh(key, groundMesh, convertVec3(chunk.pos));
        ground.mesh = groundMesh;
        group.add(groundMesh);
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
          const buildingMesh = BasicMeshService.makeModel(model);
          this.addMesh(key, buildingMesh, convertVec3(chunk.pos).add(convertVec3(building.pos)));
          group.add(buildingMesh);
        }
      });

      this.originGame.scene.add(group);
    });

  }

  private modelCount = 0;
  public addModelToCoords(modelId: string, v: THREE.Vector3) {
    const chunk = this.sceneMap.chunks[0];
    const key = 'custom-model-' + (this.modelCount++);
    const model = MODELS.find(m => m.id === modelId);
    const building: SceneBuilding = {
      id: key,
      modelId,
      pos: {x: v.x, y: v.y, z: v.z},
      passable: true,
      canHide: false,
      originModel: model,
      events: []
    }
    chunk.buildings.push(building);

    if(model && chunk.group) {
      const buildingMesh = BasicMeshService.makeModel(model);
      this.addMesh(chunk.id + '-' + key, buildingMesh, convertVec3(chunk.pos).add(convertVec3(building.pos)));
      chunk.group.add(buildingMesh);
    }

  }

  public updateCameraAim() {
    const camera = this.originGame.camera;
    camera.lookAt(
      camera.position.x - CAMERA_LOOK.x,
      camera.position.y - CAMERA_LOOK.y,
      camera.position.z - CAMERA_LOOK.z
    );
    this.updateVisibleChunks();
  }

  public addMesh(key: string, mesh: THREE.Object3D, position?: THREE.Vector3) {
    this.meshes[key] = mesh;
    const pos = position || new THREE.Vector3(0, 0, 0);
    mesh.position.x = pos.x;
    mesh.position.y = pos.y;
    mesh.position.z = pos.z;
  }

  public getBounds(key: string): THREE.Box3 | null {
    const mesh = this.meshes[key];
    if(!mesh) { return null; }
    return new THREE.Box3().setFromObject(mesh);
  }

  public updateVisibleMesh(key: string, playerPos: THREE.Vector3, canHide: boolean) {
    const mesh = this.meshes[key];
    if(!mesh) { return; }

    const opacity = this.getOpacity(mesh, playerPos, canHide);

    mesh.children.forEach(child => MapHelper.updateMeshOpacity(child, opacity));
  }

  private getOpacity(mesh: THREE.Object3D, playerPos: THREE.Vector3, canHide: boolean): number {
    let opacity = 1;

    const bounds = new THREE.Box3().setFromObject(mesh);
    const camera = this.originGame.camera;

    // HIDE IF TOO CLOSE TO CAMERA
    const cameraZ = camera.position.z - TOO_CLOSE_LIMIT;
    if((camera.position.z - TOO_CLOSE_LIMIT) < bounds.max.z) {
      opacity = Math.max(0, 1 - (bounds.max.z - cameraZ) / SHADE_OFFSET);
      return opacity;
    }

    // HIDE IF TOO FAR FOR CAMERA
    const dist = MathService.getDist(mesh.position, camera.position);
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

  private static updateMeshOpacity(mesh: THREE.Object3D, opacity: number) {
    if (!(mesh instanceof THREE.Mesh)) { return; }
    const material = mesh.material as THREE.Material;
    material.transparent = true;
    if(opacity < 1) {
      // mesh.material.transparent = true;
      material.opacity = opacity;
      mesh.visible = opacity > 0;
    } else {
      // mesh.material.transparent = false;
      material.opacity = 1;
      mesh.visible = true;
    }
  }

}
