import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { CAMERA_LOOK, SceneHelper, SHADE_OFFSET, TOO_FAR_LIMIT } from '../model/SceneHelper';
import { SceneMap } from '../model/SceneMap';
import { ScenePlayer } from '../model/ScenePlayer';

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
}
