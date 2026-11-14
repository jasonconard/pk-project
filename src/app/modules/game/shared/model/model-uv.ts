import * as THREE from 'three';
import { Vec2, Vec3, VecBox2 } from './SceneUtils';

/** Faces of a box, in the order of THREE.BoxGeometry (+x, -x, +y, -y, +z, -z). */
export type BoxFace = 'right' | 'left' | 'top' | 'bottom' | 'front' | 'back';
export const BOX_FACES: BoxFace[] = ['right', 'left', 'top', 'bottom', 'front', 'back'];

/** Size of a box face (1 unit = 1 texture pixel): width along the face's horizontal axis, height along its vertical one. */
export function boxFaceSize(size: Vec3, face: BoxFace): Vec2 {
  switch (face) {
    case 'right': case 'left': return { x: size.z, y: size.y };
    case 'top': case 'bottom': return { x: size.x, y: size.z };
    default: return { x: size.x, y: size.y };
  }
}

/**
 * Maps each face (4 vertices) of a BoxGeometry / PlaneGeometry on a rectangle of the texture, in pixels.
 * Texture rows go down: `max.y` is the row at the top of the face, `min.y` the one at its bottom; `min.x` is its left.
 */
export function applyFaceUvs(geo: THREE.BufferGeometry, faceUvs: (VecBox2 | undefined)[], texSize: Vec2) {
  const uvAtt = geo.getAttribute('uv') as THREE.BufferAttribute;
  for (let i = 0; i < uvAtt.count; i++) {
    const faceUv = faceUvs[Math.floor(i / 4)];
    if (!faceUv) {
      continue;
    }
    const ax = faceUv.min.x / texSize.x;
    const bx = faceUv.max.x / texSize.x;
    const ay = (texSize.y - faceUv.min.y) / texSize.y;
    const by = (texSize.y - faceUv.max.y) / texSize.y;
    switch (i % 4) {
      case 0: uvAtt.setXY(i, ax, by); break; // top left
      case 1: uvAtt.setXY(i, bx, by); break; // top right
      case 2: uvAtt.setXY(i, ax, ay); break; // bottom left
      case 3: uvAtt.setXY(i, bx, ay); break; // bottom right
    }
  }
  uvAtt.needsUpdate = true;
}
