import { ObjSide } from "../../game/shared/model/SceneMap";
import { Vec3 } from "../../game/shared/model/SceneUtils";
import { BoxFace } from "../../game/shared/model/model-uv";
import {
  EditableModel,
  EditablePart,
  FaceTexture,
  partFaces,
  partFaceSize,
} from "./EditableModel";

/** Color of the faces of a new shape (light gray), so it can be seen before it is painted. */
const NEW_FACE_COLOR = [200, 200, 205, 255];

/** A w × h texture filled with one color. */
function filledTexture(
  w: number,
  h: number,
  rgba = NEW_FACE_COLOR
): FaceTexture {
  const color = new Uint8ClampedArray(w * h * 4);
  for (let i = 0; i < color.length; i += 4) {
    color.set(rgba, i);
  }
  return { w, h, color };
}

function newTexId(model: EditableModel): string {
  let i = Object.keys(model.textures).length;
  while (`t${i}` in model.textures) {
    i++;
  }
  return `t${i}`;
}

function addTexture(model: EditableModel, tex: FaceTexture): string {
  const id = newTexId(model);
  model.textures[id] = tex;
  return id;
}

function copyTexture(tex: FaceTexture): FaceTexture {
  return {
    w: tex.w,
    h: tex.h,
    color: new Uint8ClampedArray(tex.color),
    specular: tex.specular?.slice(),
    night: tex.night?.slice(),
    bump: tex.bump?.slice(),
  };
}

/** Each face of the part gets its own new texture, filled with the default color. */
function paintNewFaces(model: EditableModel, part: EditablePart) {
  partFaces(part).forEach((face) => {
    const { w, h } = partFaceSize(part, face);
    part.faces[face] = addTexture(model, filledTexture(w, h));
  });
}

/** An empty model: one 16-unit box standing on the ground. */
export function newModel(id: string): EditableModel {
  const model: EditableModel = {
    id,
    hitBox: { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } },
    parts: [],
    textures: {},
  };
  addPart(model, "box");
  return model;
}

/** Place for a new 16-unit part: on the ground, right of the model (not hidden inside it). */
function freeSpot(model: EditableModel): Vec3 {
  if (model.parts.length === 0) {
    return { x: 0, y: 8, z: 0 };
  }
  const right = Math.max(
    ...model.parts.map((p) => p.pos.x + Math.max(p.size.x, p.size.z) / 2)
  );
  return { x: Math.ceil(right) + 10, y: 8, z: 0 };
}

/** Adds a box (16 × 16 × 16) or a plane (16 × 16) standing on the ground, next to the model. Returns its index. */
export function addPart(
  model: EditableModel,
  kind: EditablePart["kind"],
  at: Vec3 = freeSpot(model)
): number {
  const part: EditablePart = {
    kind,
    size: { x: 16, y: 16, z: kind === "box" ? 16 : 0 },
    pos: { ...at },
    rot: { x: 0, y: 0, z: 0 },
    side: kind === "box" ? ObjSide.FRONT : ObjSide.BOTH,
    depthWrite: true,
    depthTest: true,
    faces: {},
  };
  paintNewFaces(model, part);
  model.parts.push(part);
  return model.parts.length - 1;
}

/** Copy of a part next to it, with its own copy of the textures (faces linked inside the part stay linked). Returns its index. */
export function duplicatePart(model: EditableModel, index: number): number {
  const source = model.parts[index];
  const part: EditablePart = structuredClone({ ...source, faces: {} });
  part.pos.x += Math.max(1, Math.round(source.size.x));
  const copies = new Map<string, string>();
  (Object.entries(source.faces) as [BoxFace, string][]).forEach(
    ([face, texId]) => {
      if (!copies.has(texId)) {
        copies.set(
          texId,
          addTexture(model, copyTexture(model.textures[texId]))
        );
      }
      part.faces[face] = copies.get(texId);
    }
  );
  model.parts.splice(index + 1, 0, part);
  return index + 1;
}

export function removePart(model: EditableModel, index: number) {
  model.parts.splice(index, 1);
  removeUnusedTextures(model);
}

/**
 * Copy of a texture at another size, anchored at the bottom left (the bottom of a wall stays on the ground);
 * the added pixels are transparent.
 */
export function resizeTexture(
  tex: FaceTexture,
  w: number,
  h: number
): FaceTexture {
  const out: FaceTexture = { w, h, color: new Uint8ClampedArray(w * h * 4) };
  const layers = (["specular", "night", "bump"] as const).filter(
    (layer) => tex[layer]
  );
  layers.forEach((layer) => (out[layer] = new Uint8ClampedArray(w * h)));
  const dy = h - tex.h; // rows go down: the bottom row keeps its place
  for (let r = 0; r < h; r++) {
    const or = r - dy;
    if (or < 0 || or >= tex.h) {
      continue;
    }
    for (let c = 0; c < Math.min(w, tex.w); c++) {
      const from = or * tex.w + c,
        to = r * w + c;
      out.color.set(tex.color.subarray(from * 4, from * 4 + 4), to * 4);
      layers.forEach((layer) => (out[layer]![to] = tex[layer]![from]));
    }
  }
  return out;
}

/**
 * New size of a part: the pixel grids of its faces follow. A texture shared with faces of other parts (or with
 * faces of this part now of another size) is copied for the faces that change: they stop being linked.
 */
export function resizePart(model: EditableModel, index: number, size: Vec3) {
  const part = model.parts[index];
  part.size = { ...size };
  const resized = new Map<string, string>();
  (Object.entries(part.faces) as [BoxFace, string][]).forEach(
    ([face, texId]) => {
      const tex = model.textures[texId];
      const { w, h } = partFaceSize(part, face);
      if (tex.w === w && tex.h === h) {
        return;
      }
      const key = `${texId}:${w}x${h}`;
      if (!resized.has(key)) {
        resized.set(key, addTexture(model, resizeTexture(tex, w, h)));
      }
      part.faces[face] = resized.get(key);
    }
  );
  removeUnusedTextures(model);
}

function removeUnusedTextures(model: EditableModel) {
  const used = new Set(model.parts.flatMap((p) => Object.values(p.faces)));
  Object.keys(model.textures)
    .filter((id) => !used.has(id))
    .forEach((id) => delete model.textures[id]);
}

// --- Faces ---

/** The face gets its own copy of its texture: painting it no longer changes the faces it was linked to. */
export function unlinkFace(
  model: EditableModel,
  partIndex: number,
  face: BoxFace
) {
  const part = model.parts[partIndex];
  const texId = part.faces[face];
  if (texId) {
    part.faces[face] = addTexture(model, copyTexture(model.textures[texId]));
  }
}

/**
 * The target face shows the texture `texId` (linked: same pixels). Only between faces of the same size.
 * Returns false if the sizes differ.
 */
export function linkFace(
  model: EditableModel,
  texId: string,
  partIndex: number,
  face: BoxFace
): boolean {
  const part = model.parts[partIndex];
  const tex = model.textures[texId];
  const { w, h } = partFaceSize(part, face);
  if (tex.w !== w || tex.h !== h) {
    return false;
  }
  part.faces[face] = texId;
  removeUnusedTextures(model);
  return true;
}

/** Mirrors a texture in place: left ↔ right (horizontal) and / or top ↔ bottom (vertical). */
export function flipTexture(
  tex: FaceTexture,
  horizontal: boolean,
  vertical: boolean
) {
  const flipped = sampledCopy(tex, tex.w, tex.h, horizontal, vertical);
  tex.color.set(flipped.color);
  (["specular", "night", "bump"] as const).forEach(
    (layer) => flipped[layer] && tex[layer]!.set(flipped[layer]!)
  );
}

/**
 * Copies the pixels of a texture onto the target face (its own texture, and the faces linked to it), mirrored if
 * asked. A face of another size gets the pixels stretched (nearest pixel).
 */
export function copyFace(
  model: EditableModel,
  fromTexId: string,
  partIndex: number,
  face: BoxFace,
  horizontal = false,
  vertical = false
) {
  const targetId = model.parts[partIndex].faces[face];
  if (!targetId) {
    return;
  }
  const target = model.textures[targetId];
  model.textures[targetId] = sampledCopy(
    model.textures[fromTexId],
    target.w,
    target.h,
    horizontal,
    vertical
  );
}

/** w × h copy of a texture, taking the nearest pixel, mirrored if asked. */
function sampledCopy(
  tex: FaceTexture,
  w: number,
  h: number,
  horizontal: boolean,
  vertical: boolean
): FaceTexture {
  const out: FaceTexture = { w, h, color: new Uint8ClampedArray(w * h * 4) };
  const layers = (["specular", "night", "bump"] as const).filter(
    (layer) => tex[layer]
  );
  layers.forEach((layer) => (out[layer] = new Uint8ClampedArray(w * h)));
  for (let r = 0; r < h; r++) {
    const sr = Math.floor(((vertical ? h - 1 - r : r) * tex.h) / h);
    for (let c = 0; c < w; c++) {
      const sc = Math.floor(((horizontal ? w - 1 - c : c) * tex.w) / w);
      const from = sr * tex.w + sc,
        to = r * w + c;
      out.color.set(tex.color.subarray(from * 4, from * 4 + 4), to * 4);
      layers.forEach((layer) => (out[layer]![to] = tex[layer]![from]));
    }
  }
  return out;
}
