import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { MaterialService } from './material.service';
import { ObjSide } from '../model/SceneMap';
import { SceneModel } from '../model/SceneModel';

@Injectable({
  providedIn: 'root'
})
export class BasicMeshService {

  constructor() {
  }

  public static makeCube(link: string, size: number): THREE.Mesh {
    const cubeMaterial = MaterialService.getMaterialFromLink(link);
    const geometry = new THREE.BoxGeometry(size, size, size);
    return new THREE.Mesh( geometry, cubeMaterial );
  }

  public static makeBox(link: string, size: THREE.Vector3): THREE.Mesh {
    const cubeMaterial = MaterialService.getMaterialFromLink(link);
    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    return new THREE.Mesh( geometry, cubeMaterial );
  }

  public static makePlane(link: string, size: THREE.Vector2, transparent?: boolean): THREE.Mesh {
    const planeMaterial = MaterialService.getMaterialFromLink(link, transparent);
    planeMaterial.depthTest = true;
    planeMaterial.depthWrite = true;
    planeMaterial.side = THREE.DoubleSide;
    const geometry = new THREE.PlaneGeometry( size.x, size.y );
    return new THREE.Mesh( geometry, planeMaterial );
  }

  public static makePhongPlane(link: string, size: THREE.Vector2, transparent?: boolean): THREE.Mesh {
    const planeMaterial = MaterialService.getPhongMaterialFromLink(link, transparent);
    const geometry = new THREE.PlaneGeometry( size.x, size.y );
    return new THREE.Mesh( geometry, planeMaterial );
  }

  public static makeModel(model: SceneModel): THREE.Group {
    const group = new THREE.Group();

    // mat.transparent = true;

    model.boxes.forEach(box => {
      const boxMat = MaterialService.getMaterialFromLink(model.tex.link);
      const geo = new THREE.BoxGeometry(box.size.x, box.size.y, box.size.z);
      const uvAtt = geo.getAttribute('uv');
      const uv = new THREE.Vector2();
      for(let i = 0; i < uvAtt.count; i++) {
        uv.fromBufferAttribute( uvAtt, i );
        const face = Math.floor(i/4);
        let faceUv = null;
        switch (face) {
          case 0: faceUv = box.uvs.right; break;
          case 1: faceUv = box.uvs.left; break;
          case 2: faceUv = box.uvs.top; break;
          case 3: faceUv = box.uvs.bottom; break;
          case 4: faceUv = box.uvs.front; break;
          case 5: faceUv = box.uvs.back; break;
        }
        if(faceUv) {
          const ax = (faceUv.min.x) / model.tex.size.x;
          const bx = (faceUv.max.x) / model.tex.size.x;
          const ay = (model.tex.size.y - faceUv.min.y) / model.tex.size.y;
          const by = (model.tex.size.y - faceUv.max.y) / model.tex.size.y;
          if( i%4 === 0 ) { uvAtt.setXY( i, ax, by ) } // 0, 1
          if( i%4 === 1 ) { uvAtt.setXY( i, bx, by ) } // 1, 1
          if( i%4 === 2 ) { uvAtt.setXY( i, ax, ay ) } // 0, 0
          if( i%4 === 3 ) { uvAtt.setXY( i, bx, ay ) } // 1, 0
        }
      }


      switch (box.side) {
        case ObjSide.FRONT: boxMat.side = THREE.FrontSide; break;
        case ObjSide.BACK: boxMat.side = THREE.BackSide; break;
        case ObjSide.BOTH: boxMat.side = THREE.DoubleSide; break;
        default: boxMat.side = THREE.FrontSide; break;
      }
      boxMat.depthWrite = !!box.depthWrite;
      boxMat.depthTest = !!box.depthTest;

      const mesh = new THREE.Mesh( geo, boxMat );
      // mesh.castShadow = true;
      // mesh.receiveShadow = true;
      mesh.position.x = box.pos.x;
      mesh.position.y = box.pos.y;
      mesh.position.z = box.pos.z;
      mesh.rotation.x = box.rot.x;
      mesh.rotation.y = box.rot.y;
      mesh.rotation.z = box.rot.z;
      group.add(mesh);
    });

    model.planes.forEach(plane => {
      const mat = MaterialService.getMaterialFromLink(model.tex.link);
      const geo = new THREE.PlaneGeometry(plane.size.x, plane.size.y);
      const uvAtt = geo.getAttribute('uv');
      const uv = new THREE.Vector2();
      for(let i = 0; i < uvAtt.count; i++) {
        uv.fromBufferAttribute( uvAtt, i );
        const face = Math.floor(i/4);
        let faceUv = null;
        switch (face) {
          case 0: faceUv = plane.uvs.front; break;
          case 1: faceUv = plane.uvs.back; break;
        }
        if(faceUv) {
          const ax = (faceUv.min.x) / model.tex.size.x;
          const bx = (faceUv.max.x) / model.tex.size.x;
          const ay = (model.tex.size.y - faceUv.min.y) / model.tex.size.y;
          const by = (model.tex.size.y - faceUv.max.y) / model.tex.size.y;
          if( i%4 === 0 ) { uvAtt.setXY( i, ax, by ) } // 0, 1
          if( i%4 === 1 ) { uvAtt.setXY( i, bx, by ) } // 1, 1
          if( i%4 === 2 ) { uvAtt.setXY( i, ax, ay ) } // 0, 0
          if( i%4 === 3 ) { uvAtt.setXY( i, bx, ay ) } // 1, 0
        }
      }

      switch (plane.side) {
        case ObjSide.FRONT: mat.side = THREE.FrontSide; break;
        case ObjSide.BACK: mat.side = THREE.BackSide; break;
        case ObjSide.BOTH: mat.side = THREE.DoubleSide; break;
        default: mat.side = THREE.FrontSide; break;
      }
      mat.depthWrite = !!plane.depthWrite;
      mat.depthTest = !!plane.depthTest;

      const mesh = new THREE.Mesh( geo, mat );
      mesh.position.x = plane.pos.x;
      mesh.position.y = plane.pos.y;
      mesh.position.z = plane.pos.z;
      mesh.rotation.x = plane.rot.x;
      mesh.rotation.y = plane.rot.y;
      mesh.rotation.z = plane.rot.z;
      group.add(mesh);
    });

    return group;
  }
}
