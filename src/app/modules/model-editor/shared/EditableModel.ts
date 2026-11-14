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

export type GrayLayer = Exclude<LayerName, 'color'>;
export const GRAY_LAYERS: GrayLayer[] = ['specular', 'night', 'bump'];

/** Pixels of a layer of a face, to draw on (a grayscale layer is created, black, the first time). */
export function layerGrid(tex: FaceTexture, layer: LayerName): { w: number, h: number, data: Uint8ClampedArray, channels: 1 | 4 } {
  if (layer === 'color') {
    return { w: tex.w, h: tex.h, data: tex.color, channels: 4 };
  }
  tex[layer] ??= new Uint8ClampedArray(tex.w * tex.h);
  return { w: tex.w, h: tex.h, data: tex[layer]!, channels: 1 };
}

/** A layer as RGBA pixels to show: gray (v, v, v), transparent where the colors are. */
export function layerRgba(tex: FaceTexture, layer: LayerName): Uint8ClampedArray {
  if (layer === 'color') {
    return tex.color;
  }
  const gray = tex[layer];
  const out = new Uint8ClampedArray(tex.w * tex.h * 4);
  for (let i = 0; i < tex.w * tex.h; i++) {
    const v = gray ? gray[i] : 0;
    out[i * 4] = out[i * 4 + 1] = out[i * 4 + 2] = v;
    out[i * 4 + 3] = tex.color[i * 4 + 3];
  }
  return out;
}

export function emptyFaceTexture(w: number, h: number): FaceTexture {
  return { w, h, color: new Uint8ClampedArray(w * h * 4) };
}
