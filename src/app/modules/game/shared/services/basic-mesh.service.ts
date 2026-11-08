import { Service } from '@angular/core';
import * as THREE from 'three';
import { MaterialService } from './material.service';
import { ObjSide } from '../model/SceneMap';
import { SceneModel } from '../model/SceneModel';
import { Square3 } from '../model/SceneUtils';
import { RAIN_STOP_KEY } from '../weather/SurfaceHeights';
import { getSwayDepthMaterial, SWAY_ATTRIBUTE } from '../weather/weather-shader';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

@Service()
export class BasicMeshService {

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

  public static makeSprite(link: string, size: THREE.Vector2): THREE.Group {
    const spMat = MaterialService.getSpriteMaterialFromLink(link);
    spMat.depthTest = true;
    spMat.depthWrite = true;
    spMat.side = THREE.DoubleSide;
    const sprite = new THREE.Sprite( spMat );
    sprite.scale.set(size.x, size.y, 1);
    sprite.position.y = size.y / 2;
    const group = new THREE.Group();
    group.add(sprite);
    return group;
  }

  public static makePlane(link: string, size: THREE.Vector2, transparent?: boolean): THREE.Mesh {
    const planeMaterial = MaterialService.getMaterialFromLink(link, transparent);
    planeMaterial.depthTest = true;
    planeMaterial.depthWrite = true;
    planeMaterial.side = THREE.DoubleSide;
    const geometry = new THREE.PlaneGeometry( size.x, size.y );
    return new THREE.Mesh( geometry, planeMaterial );
  }

  /** Used for grounds: lit material so it receives the buildings' shadows. */
  public static makePlaneFromPoints(link: string, points: Square3, transparent?: boolean): THREE.Mesh {
    const planeMaterial = MaterialService.getLambertMaterialFromLink(link, transparent);
    planeMaterial.depthTest = true;
    planeMaterial.depthWrite = true;
    planeMaterial.side = THREE.DoubleSide;

    let geometry = new THREE.BufferGeometry();
    // Both triangles must share the same winding, otherwise their normals cancel out and lighting breaks.
    // Winding chosen so the normal points up (towards the sky) for a, b, c, d given clockwise seen from above.
    const ab = new THREE.Vector3(points.b.x - points.a.x, points.b.y - points.a.y, points.b.z - points.a.z);
    const ac = new THREE.Vector3(points.c.x - points.a.x, points.c.y - points.a.y, points.c.z - points.a.z);
    const facesUp = ac.clone().cross(ab).y >= 0;
    geometry.setIndex(facesUp ? [0, 3, 2, 0, 2, 1] : [0, 2, 3, 0, 1, 2]);
    geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array([
      points.a.x, points.a.y, points.a.z,
      points.b.x, points.b.y, points.b.z,
      points.c.x, points.c.y, points.c.z,
      points.d.x, points.d.y, points.d.z
    ]), 3 ));

    const uvs = [
      0, 1,
      1, 1,
      1, 0,
      0, 0
    ]

    geometry.setAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );
    geometry.computeVertexNormals(); // required by lit materials
    const mesh = new THREE.Mesh( geometry, planeMaterial );
    mesh.receiveShadow = true;
    mesh.userData[RAIN_STOP_KEY] = true;
    return mesh;

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
      const boxMat = MaterialService.getModelMaterialFromLink(model.tex.link, box.shininess);
      const geo = new THREE.BoxGeometry(box.size.x, box.size.y, box.size.z);
      const uvAtt = geo.getAttribute('uv');
      const uv = new THREE.Vector2();
      for(let i = 0; i < uvAtt.count; i++) {
        uv.fromBufferAttribute( uvAtt as THREE.BufferAttribute, i );
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
      boxMat.alphaTest = 0.5;

      const mesh = new THREE.Mesh( geo, boxMat );
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData[RAIN_STOP_KEY] = true;
      mesh.position.x = box.pos.x;
      mesh.position.y = box.pos.y;
      mesh.position.z = box.pos.z;
      mesh.rotation.x = box.rot.x;
      mesh.rotation.y = box.rot.y;
      mesh.rotation.z = box.rot.z;
      group.add(mesh);
    });

    model.planes.forEach(plane => {
      const mat = MaterialService.getModelMaterialFromLink(model.tex.link, plane.shininess);
      const geo = new THREE.PlaneGeometry(plane.size.x, plane.size.y);
      const uvAtt = geo.getAttribute('uv');
      const uv = new THREE.Vector2();
      // console.log(uvAtt.count);
      for(let i = 0; i < uvAtt.count; i++) {
        uv.fromBufferAttribute( uvAtt as THREE.BufferAttribute, i );
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
      // Since three r152 opaque materials force alpha=1: discard transparent texels instead of drawing them black
      mat.alphaTest = 0.5;

      const mesh = new THREE.Mesh( geo, mat );
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData[RAIN_STOP_KEY] = true;
      mesh.position.x = plane.pos.x;
      mesh.position.y = plane.pos.y;
      mesh.position.z = plane.pos.z;
      mesh.rotation.x = plane.rot.x;
      mesh.rotation.y = plane.rot.y;
      mesh.rotation.z = plane.rot.z;
      group.add(mesh);
    });

    if (model.sway) {
      BasicMeshService.addSwayAttribute(group, model.sway);
    }
    BasicMeshService.mergeParts(group);

    return group;
  }

  /**
   * One mesh per set of identical render settings instead of one per box / plane: a model is made of up to ~10
   * parts sharing its texture, each part was a draw call (twice with the shadows). The parts are baked into
   * the model's space (their position / rotation applied to their vertices) and merged; the sway attribute
   * (vegetation) and the shadow material follow. A tree goes from ~8 draw calls to 1 or 2. Parts without the
   * depth test stay as they are (their look depends on the order they are drawn in).
   */
  private static mergeParts(group: THREE.Group) {
    const sets = new Map<string, THREE.Mesh[]>();
    for (const child of group.children) {
      const mesh = child as THREE.Mesh;
      const material = mesh.material as THREE.MeshLambertMaterial | THREE.MeshPhongMaterial;
      // Parts drawn without the depth test rely on the drawing order (a sign's text over its posts): kept apart
      if (!material.depthTest) {
        continue;
      }
      const shininess = (material as THREE.MeshPhongMaterial).isMeshPhongMaterial ? (material as THREE.MeshPhongMaterial).specular.r : -1;
      const key = [material.type, shininess, material.side, material.depthWrite, material.depthTest].join('|');
      sets.set(key, [...(sets.get(key) ?? []), mesh]);
    }
    for (const meshes of sets.values()) {
      if (meshes.length < 2) {
        continue;
      }
      const geometries = meshes.map(mesh => {
        mesh.updateMatrix();
        return mesh.geometry.clone().applyMatrix4(mesh.matrix);
      });
      const merged = mergeGeometries(geometries);
      geometries.forEach(g => g.dispose());
      if (!merged) {
        continue; // parts with different attributes: kept as they are
      }
      const first = meshes[0];
      const mesh = new THREE.Mesh(merged, first.material);
      mesh.castShadow = first.castShadow;
      mesh.receiveShadow = first.receiveShadow;
      mesh.userData = { ...first.userData };
      if (first.customDepthMaterial) {
        mesh.customDepthMaterial = first.customDepthMaterial;
      }
      meshes.forEach(part => {
        group.remove(part);
        part.geometry.dispose();
        if (part !== first) {
          (part.material as THREE.Material).dispose();
        }
      });
      group.add(mesh);
    }
  }

  /**
   * Per-vertex wind flexibility: 0 at the base of the model, `sway` at its top (bends like a plant).
   * Read by the weather shader (see SWAY_ATTRIBUTE).
   */
  private static addSwayAttribute(group: THREE.Group, sway: number) {
    const meshes = group.children.filter((c): c is THREE.Mesh => c instanceof THREE.Mesh);
    const v = new THREE.Vector3();
    let top = 0;
    meshes.forEach(mesh => {
      mesh.updateMatrix();
      const pos = mesh.geometry.getAttribute('position');
      for (let i = 0; i < pos.count; i++) {
        top = Math.max(top, v.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrix).y);
      }
    });
    if (top <= 0) {
      return;
    }
    meshes.forEach(mesh => {
      const pos = mesh.geometry.getAttribute('position');
      const flex = new Float32Array(pos.count);
      for (let i = 0; i < pos.count; i++) {
        const height = THREE.MathUtils.clamp(v.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrix).y / top, 0, 1);
        flex[i] = sway * Math.pow(height, 1.5); // the top bends much more than the middle
      }
      mesh.geometry.setAttribute(SWAY_ATTRIBUTE, new THREE.BufferAttribute(flex, 1));
      // Its shadow bends the same way
      mesh.customDepthMaterial = getSwayDepthMaterial();
    });
  }
}
