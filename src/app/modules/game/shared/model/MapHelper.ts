import * as THREE from 'three';
import { SceneMap } from './SceneMap';
import { ScenePlayer } from './ScenePlayer';
import { CAMERA_LOOK, Game, SHADE_OFFSET, TOO_CLOSE_LIMIT, TOO_FAR_LIMIT } from "./Game";
import { BasicMeshService } from "../services/basic-mesh.service";
import { convertVec2, convertVec3 } from "./SceneUtils";
import { MODELS } from "../../../../../assets/models/models";
import { SceneBuilding } from "./SceneBuilding";
import { MathService } from "../services/math.service";

export class MapHelper {
  originGame: Game;
  meshes: { [key: string]: (THREE.Mesh | THREE.Group) };
  sceneMap: SceneMap;
  scenePlayer: ScenePlayer;

  constructor(o: any) {
    this.originGame = o.originGame;
    this.meshes = o.meshes;
    this.sceneMap = o.sceneMap;
    this.scenePlayer = o.scenePlayer;
  }


  public getPlayerScreenCoords(game: Game): THREE.Vector2 {
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
    if(!p) { return; }
    const spriteGroup = new THREE.Group();
    const spritePlane = BasicMeshService.makePlane(p.tex.link, convertVec2(p.tex.size), true);
    const mat = spritePlane.material;
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
    this.meshes[p.id].lookAt(camera.position);
    scene.add(this.meshes[p.id]);

    this.scenePlayer.mesh = spriteGroup;

    this.updateVisibleChunks();
  }

  public updateVisibleChunks() {
    const chunks = this.sceneMap.chunks;
    const player = this.scenePlayer.mesh;
    const comparePos = new THREE.Vector3(player.position.x, player.position.y, this.originGame.camera.position.z);
    chunks.forEach(chunk => {
      // HIDE BEHIND CAMERA
      if( (chunk.pos.z - chunk.size.y / 2) > comparePos.z) {
        chunk.group.visible = false;
        return chunk.visible = false;
      }

      // HIDE TOO FAR
      if( (chunk.pos.z + (chunk.size.y * 1.4)) < comparePos.z) {
        chunk.group.visible = false;
        return chunk.visible = false;
      }

      // HIDE TOO FAR LEFT
      if( (chunk.pos.x + (chunk.size.x * 1.2)) < comparePos.x) {
        chunk.group.visible = false;
        return chunk.visible = false;
      }

      // HIDE TOO FAR RIGHT
      if( (chunk.pos.x - (chunk.size.x * 1.2)) > comparePos.x) {
        chunk.group.visible = false;
        return chunk.visible = false;
      }

      // HIDE TOO FAR HEIGHT
      if(Math.abs(chunk.pos.y - comparePos.y) > (TOO_FAR_LIMIT + SHADE_OFFSET) ) {
        chunk.group.visible = false;
        return chunk.visible = false;
      }


      chunk.group.visible = true;
      return chunk.visible = true;

      // const dist = MathService.getDist(convertVec3(chunk.pos), comparePos);
      // if(min === -1 || min > dist) { min = dist; }
      // return dist < 512;
    });

  }

  public buildChunks() {
    this.sceneMap.chunks.forEach(chunk => {
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
      this.addMesh(chunk.id + '-' + key, BasicMeshService.makeModel(model));
      const buildingMesh = this.meshes[chunk.id + '-' + key];
      buildingMesh.position.x = chunk.pos.x + building.pos.x;
      buildingMesh.position.y = chunk.pos.y + building.pos.y;
      buildingMesh.position.z = chunk.pos.z + building.pos.z;

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

  public addMesh(key: string, mesh: THREE.Mesh, position?: THREE.Vector3) {
    this.meshes[key] = mesh;
    const pos = position || new THREE.Vector3(0, 0, 0);
    mesh.position.x = pos.x;
    mesh.position.y = pos.y;
    mesh.position.z = pos.z;
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
      mesh.children.forEach( child => MapHelper.updateMeshOpacity(child, opacity));
    } else {
      MapHelper.updateMeshOpacity(mesh, opacity);
    }
  }

  private getOpacity(mesh: THREE.mesh, playerPos: THREE.Vector3, canHide: boolean): number {
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
