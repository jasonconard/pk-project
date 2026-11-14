import { SceneModel, SceneModelObj } from '../../game/shared/model/SceneModel';
import { VecBox2 } from '../../game/shared/model/SceneUtils';
import { BOX_FACES, BoxFace } from '../../game/shared/model/model-uv';
import { EditableModel, EditablePart, FaceTexture, partFaceSize } from './EditableModel';

/** Pixels of an image (the model's atlas). */
export function loadImagePixels(link: string): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0);
      resolve(ctx.getImageData(0, 0, img.width, img.height));
    };
    img.onerror = () => reject(new Error(`Image introuvable : ${link}`));
    img.src = link;
  });
}

/**
 * Pixels of a w × h face cut from the atlas rectangle `rect`, sampled like the GPU does (nearest texel at the
 * center of each face pixel). Handles the hand-written rectangles that are flipped, or 0 wide / high, or not
 * as big as the face (the face then gets the stretched pixels it shows in the game).
 */
function sampleRect(atlas: ImageData, rect: VecBox2, w: number, h: number): Uint8ClampedArray {
  const out = new Uint8ClampedArray(w * h * 4);
  const clamp = (v: number, max: number) => Math.min(max - 1, Math.max(0, v));
  for (let r = 0; r < h; r++) {
    const y = clamp(Math.floor(rect.max.y + (r + 0.5) / h * (rect.min.y - rect.max.y)), atlas.height);
    for (let c = 0; c < w; c++) {
      const x = clamp(Math.floor(rect.min.x + (c + 0.5) / w * (rect.max.x - rect.min.x)), atlas.width);
      const from = (y * atlas.width + x) * 4;
      out.set(atlas.data.subarray(from, from + 4), (r * w + c) * 4);
    }
  }
  return out;
}

function toPart(kind: EditablePart['kind'], obj: SceneModelObj): EditablePart {
  return {
    kind,
    size: { ...obj.size }, pos: { ...obj.pos }, rot: { ...obj.rot },
    side: obj.side, depthWrite: obj.depthWrite, depthTest: obj.depthTest, shininess: obj.shininess,
    faces: {},
  };
}

/** A model of the game, ready to be edited: its atlas is cut into one pixel grid per face. */
export function importModel(model: SceneModel, atlas: ImageData): EditableModel {
  const textures: Record<string, FaceTexture> = {};
  /** Faces showing the same rectangle at the same size share their texture (linked faces). */
  const byRect = new Map<string, string>();
  const assign = (part: EditablePart, face: BoxFace, rect: VecBox2) => {
    const { w, h } = partFaceSize(part, face);
    const key = `${rect.min.x},${rect.min.y},${rect.max.x},${rect.max.y}:${w}x${h}`;
    let texId = byRect.get(key);
    if (!texId) {
      texId = `t${byRect.size}`;
      byRect.set(key, texId);
      textures[texId] = { w, h, color: sampleRect(atlas, rect, w, h) };
    }
    part.faces[face] = texId;
  };

  const parts: EditablePart[] = [];
  model.boxes.forEach(box => {
    const part = toPart('box', box);
    BOX_FACES.forEach(face => assign(part, face, box.uvs[face]));
    parts.push(part);
  });
  model.planes.forEach(plane => {
    const part = toPart('plane', plane);
    // A PlaneGeometry has one face: only `uvs.front` is shown (on both sides)
    assign(part, 'front', plane.uvs.front);
    parts.push(part);
  });

  return {
    id: model.id,
    sway: model.sway,
    hitBox: structuredClone(model.hitBox),
    parts,
    textures,
  };
}
