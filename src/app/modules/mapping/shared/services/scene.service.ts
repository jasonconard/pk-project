import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { CAMERA_LOOK, SceneHelper, SHADE_OFFSET, TOO_FAR_LIMIT } from '../model/SceneHelper';
import { SceneMap } from '../model/SceneMap';
import { PlayerDirection, ScenePlayer } from '../model/ScenePlayer';
import { KeyCode } from '../../../../core/shared/model/PressedKey';

@Injectable({
  providedIn: 'root'
})
export class SceneService {

  constructor() {
  }

  public static makeScene(element: Element, sceneMap: SceneMap, scenePlayer: ScenePlayer): SceneHelper {
    const rect = element.getBoundingClientRect();
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize( rect.width, rect.height );
    element.appendChild( renderer.domElement );

    const camera = new THREE.PerspectiveCamera( 45, rect.width / rect.height, 1, TOO_FAR_LIMIT + SHADE_OFFSET );
    camera.position.set(CAMERA_LOOK.x, CAMERA_LOOK.y, CAMERA_LOOK.z);
    camera.lookAt( 0, 0, 0 );

    const scene = new THREE.Scene();

    // const light = new THREE.AmbientLight( 0x101010 ); // soft white light
    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add(light);

    // const light = new THREE.DirectionalLight( 0x111111, 0.5 );
    // scene.add( light );

    // const color = 0xFFFFFF;
    // const intensity = 0.8;
    // const dlight = new THREE.DirectionalLight(color, intensity);
    // dlight.position.set(0, 10, 0);
    // dlight.target.position.set(0, 0, 0);
    // scene.add(dlight);
    // scene.add(dlight.target);

    // dlight.shadow.mapSize.width = 512; // default
    // dlight.shadow.mapSize.height = 512; // default
    // dlight.shadow.camera.near = 0.5; // default
    // dlight.shadow.camera.far = 500; // default

    // const skyColor = 0xB1E1FF;  // light blue
    // const groundColor = 0xB97A20;  // brownish orange
    // const intensity = 1;
    // const hlight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    // scene.add(hlight);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.render( scene, camera );

    const meshes = {};
    const elem = element;

    return new SceneHelper({ scene, elem, camera, light, renderer, meshes, sceneMap, scenePlayer });
  }

  public static checkCollisions(sceneHelper: SceneHelper, playerMesh: THREE.Mesh, move: THREE.Vector3) {
    const nextPosition = new THREE.Vector3(
      playerMesh.position.x + move.x,
      playerMesh.position.y + move.y,
      playerMesh.position.z + move.z
    );

    const spriteSize = new THREE.Vector3();
    new THREE.Box3().setFromObject(playerMesh).getSize(spriteSize);

    const parcel = sceneHelper.sceneMap.parcels[0];
    const limitX = parcel.pos.x + (parcel.size.x / 2) - (spriteSize.x / 2);
    const limitZ = parcel.pos.z + (parcel.size.y / 2);

    if(nextPosition.x < -limitX) { move.x = 0; }
    if(nextPosition.x > limitX) { move.x = 0; }
    if(nextPosition.z < -limitZ) { move.z = 0; }
    if(nextPosition.z > limitZ) { move.z = 0; }


    sceneHelper.sceneMap.parcels.forEach(parcel => {
      parcel.buildings.forEach(building => {
        if(!building.originModel) {
          return;
        }
        if(building.passable) {
          return;
        }
        const bounds = sceneHelper.getBounds(parcel.id + '-' + building.id);
        const hb = building.originModel.hitBox;
        const spx = (spriteSize.x / 2);
        const bMinX = bounds.min.x - spx - hb.min.x;
        const bMaxX = bounds.max.x + spx - hb.max.x;
        const npx = nextPosition.x;
        const npz = nextPosition.z;


        if(npx >= bMinX && npx <= bMaxX) {
          if(npz >= bounds.min.z - hb.min.z && npz < bounds.max.z + hb.max.z) {
            move.z = 0;
            move.x = 0;
          }
        }
      });
    });
  }

  public static getMove(sceneHelper: SceneHelper, holdedCodes: KeyCode[]): { move: THREE.Vector3, speed: number } {
    const move = new THREE.Vector3(0, 0, 0);

    let speed = holdedCodes.indexOf(KeyCode.confirm) >= 0 ? 4 : 2;

    let playerSpeed = 0;

    let direction = sceneHelper.scenePlayer.dir;
    for(let i = 0; i < holdedCodes.length; i++) {
      const key = holdedCodes[i];
      switch (key) {
        case KeyCode.up: move.z = -speed; direction = PlayerDirection.UP; holdedCodes = []; playerSpeed = speed; break;
        case KeyCode.left: move.x = -speed; direction = PlayerDirection.LEFT; holdedCodes = []; playerSpeed = speed; break;
        case KeyCode.down: move.z = speed; direction = PlayerDirection.DOWN; holdedCodes = []; playerSpeed = speed; break;
        case KeyCode.right: move.x = speed; direction = PlayerDirection.RIGHT; holdedCodes = []; playerSpeed = speed; break;
      }
    }

    sceneHelper.scenePlayer.dir = direction;

    return { move, speed: playerSpeed };
  }
}
