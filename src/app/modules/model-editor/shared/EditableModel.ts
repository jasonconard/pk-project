import { ObjSide } from '../../game/shared/model/SceneMap';
import { Vec3, VecBox3 } from '../../game/shared/model/SceneUtils';
import { BOX_FACES, BoxFace, boxFaceSize } from '../../game/shared/model/model-uv';

/** Painted layers of a face: the color (RGBA), and grayscale maps (1 byte per pixel, filled in a later step). */
export type LayerName = 'color' | 'specular' | 'night' | 'bump';

/**
 * Pixels of one face, as big as the face (1 unit = 1 pixel). Rows go down (row 0 = top of the face),
 * columns go right (column 0 = left of the face, seen from outside).
 */
export interface FaceTexture {
  w: number;
  h: number;
  /** RGBA, w * h * 4 bytes. */
  color: Uint8ClampedArray;
  specular?: Uint8ClampedArray;
  night?: Uint8ClampedArray;
  bump?: Uint8ClampedArray;
}

export interface EditablePart {
  kind: 'box' | 'plane';
  size: Vec3;
  pos: Vec3;
  rot: Vec3;
  side?: ObjSide;
  depthWrite?: boolean;
  depthTest?: boolean;
  shininess?: number;
  /** Texture of each face (id in EditableModel.textures). Faces sharing an id are linked: same pixels. A plane only has 'front'. */
  faces: Partial<Record<BoxFace, string>>;
}

/** A model while it is edited: shapes, and one pixel grid per face instead of an atlas. */
export interface EditableModel {
  id: string;
  sway?: number;
  bumpScale?: number;
  hitBox: VecBox3;
  parts: EditablePart[];
  textures: Record<string, FaceTexture>;
}

/** Faces of a part: the 6 faces of a box, the only face of a plane (its back shows the same pixels). */
export function partFaces(part: EditablePart): BoxFace[] {
  return part.kind === 'box' ? BOX_FACES : ['front'];
}

/** Size in pixels of a part's face (whole pixels, at least 1). */
export function partFaceSize(part: EditablePart, face: BoxFace): { w: number, h: number } {
  const size = part.kind === 'box' ? boxFaceSize(part.size, face) : { x: part.size.x, y: part.size.y };
  return { w: Math.max(1, Math.round(size.x)), h: Math.max(1, Math.round(size.y)) };
}

export function emptyFaceTexture(w: number, h: number): FaceTexture {
  return { w, h, color: new Uint8ClampedArray(w * h * 4) };
}
