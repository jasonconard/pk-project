import { SceneModel, SceneModelObj } from "../../game/shared/model/SceneModel";
import { VecBox2 } from "../../game/shared/model/SceneUtils";
import { BOX_FACES, BoxFace } from "../../game/shared/model/model-uv";
import {
  MIN_WINDOW_PIXELS,
  windowGlow,
} from "../../game/shared/model/window-glow";
import {
  EditableModel,
  EditablePart,
  FaceTexture,
  GRAY_LAYERS,
  GrayLayer,
  partFaceSize,
} from "./EditableModel";

/** Grayscale maps of a model (images in the same layout as its atlas). */
export type ModelMaps = Partial<Record<GrayLayer, ImageData>>;

/** Loads the grayscale maps a model has (specular, night, bump). */
export async function loadModelMaps(model: SceneModel): Promise<ModelMaps> {
  const maps: ModelMaps = {};
  await Promise.all(
    GRAY_LAYERS.map(async (layer) => {
      const link = model.tex[layer];
      if (link) {
        maps[layer] = await loadImagePixels(link);
      }
    })
  );
  return maps;
}

/** Red channel of RGBA pixels (grayscale maps). */
function grayOf(rgba: Uint8ClampedArray): Uint8ClampedArray {
  const out = new Uint8ClampedArray(rgba.length / 4);
  for (let i = 0; i < out.length; i++) {
    out[i] = rgba[i * 4];
  }
  return out;
}

/** Pixels of an image (the model's atlas). */
export function loadImagePixels(link: string): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
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
function sampleRect(
  atlas: ImageData,
  rect: VecBox2,
  w: number,
  h: number
): Uint8ClampedArray {
  const out = new Uint8ClampedArray(w * h * 4);
  const clamp = (v: number, max: number) => Math.min(max - 1, Math.max(0, v));
  for (let r = 0; r < h; r++) {
    const y = clamp(
      Math.floor(rect.max.y + ((r + 0.5) / h) * (rect.min.y - rect.max.y)),
      atlas.height
    );
    for (let c = 0; c < w; c++) {
      const x = clamp(
        Math.floor(rect.min.x + ((c + 0.5) / w) * (rect.max.x - rect.min.x)),
        atlas.width
      );
      const from = (y * atlas.width + x) * 4;
      out.set(atlas.data.subarray(from, from + 4), (r * w + c) * 4);
    }
  }
  return out;
}

function toPart(kind: EditablePart["kind"], obj: SceneModelObj): EditablePart {
  return {
    kind,
    size: { ...obj.size },
    pos: { ...obj.pos },
    rot: { ...obj.rot },
    side: obj.side,
    depthWrite: obj.depthWrite,
    depthTest: obj.depthTest,
    motion: obj.motion ? { ...obj.motion } : undefined,
    faces: {},
  };
}

/**
 * A model of the game, ready to be edited: its atlas (and its maps) cut into one pixel grid per face. The old
 * per-part `shininess` becomes the specular layer of the part's faces; without a night map, the window glass the
 * game lights up at night becomes the night layer.
 */
export function importModel(
  model: SceneModel,
  atlas: ImageData,
  maps: ModelMaps = {}
): EditableModel {
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
      const tex: FaceTexture = { w, h, color: sampleRect(atlas, rect, w, h) };
      GRAY_LAYERS.forEach((layer) => {
        const map = maps[layer];
        if (map) {
          tex[layer] = grayOf(sampleRect(map, rect, w, h));
        }
      });
      textures[texId] = tex;
    }
    part.faces[face] = texId;
  };

  const parts: EditablePart[] = [];
  const shininessOf = new Map<EditablePart, number>();
  model.boxes.forEach((box) => {
    const part = toPart("box", box);
    BOX_FACES.forEach((face) => assign(part, face, box.uvs[face]));
    parts.push(part);
    shininessOf.set(part, box.shininess ?? 0);
  });
  model.planes.forEach((plane) => {
    const part = toPart("plane", plane);
    // A PlaneGeometry has one face: only `uvs.front` is shown (on both sides)
    assign(part, "front", plane.uvs.front);
    parts.push(part);
    shininessOf.set(part, plane.shininess ?? 0);
  });

  if (!maps.specular) {
    shininessOf.forEach((shininess, part) => {
      if (shininess > 0) {
        Object.values(part.faces).forEach((texId) => {
          const tex = textures[texId!];
          tex.specular = new Uint8ClampedArray(tex.w * tex.h).fill(
            Math.round(Math.min(1, shininess) * 255)
          );
        });
      }
    });
  }
  if (!maps.night) {
    const glows = new Map<FaceTexture, Uint8ClampedArray>();
    let glassCount = 0;
    Object.values(textures).forEach((tex) => {
      const glow = new Uint8ClampedArray(tex.w * tex.h);
      for (let i = 0; i < glow.length; i++) {
        glow[i] = windowGlow(
          tex.color[i * 4],
          tex.color[i * 4 + 1],
          tex.color[i * 4 + 2],
          tex.color[i * 4 + 3]
        );
        glassCount += glow[i] ? 1 : 0;
      }
      glows.set(tex, glow);
    });
    if (glassCount >= MIN_WINDOW_PIXELS) {
      glows.forEach(
        (glow, tex) => glow.some((v) => v > 0) && (tex.night = glow)
      );
    }
  }

  return {
    id: model.id,
    sway: model.sway,
    zone: model.zone && structuredClone(model.zone),
    lights: model.lights?.length ? structuredClone(model.lights) : undefined,
    bumpScale: model.tex.bumpScale,
    hitBox: structuredClone(model.hitBox),
    parts,
    textures,
  };
}
