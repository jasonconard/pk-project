import { SceneModel, SceneModelBox, SceneModelObj, SceneModelPlane } from '../../game/shared/model/SceneModel';
import { ObjSide } from '../../game/shared/model/SceneMap';
import { VecBox2 } from '../../game/shared/model/SceneUtils';
import { BOX_FACES } from '../../game/shared/model/model-uv';
import { toSource } from '../../game/shared/util/ts-source';
import { EditableModel, EditablePart, FaceTexture } from './EditableModel';

/** Transparent border around each face in the atlas, filled with the face's edge pixels (no bleeding at a distance). */
const PADDING = 1;

export interface ExportedModel {
  model: SceneModel;
  /** Atlas of the face textures. */
  atlas: ImageData;
  /** Content of md-<id>.ts. */
  source: string;
}

interface Slot {
  tex: FaceTexture;
  x: number;
  y: number;
}

/** Textures with the same size and pixels end up once in the atlas. */
function dedupe(model: EditableModel, used: Set<string>): Map<string, FaceTexture> {
  const unique: FaceTexture[] = [];
  const result = new Map<string, FaceTexture>();
  used.forEach(texId => {
    const tex = model.textures[texId];
    const same = unique.find(u => u.w === tex.w && u.h === tex.h && u.color.every((v, i) => v === tex.color[i]));
    if (!same) {
      unique.push(tex);
    }
    result.set(texId, same ?? tex);
  });
  return result;
}

/** Shelf packing: the tallest faces first, rows filled left to right. */
function pack(textures: FaceTexture[]): { slots: Map<FaceTexture, Slot>, width: number, height: number } {
  const sorted = [...textures].sort((a, b) => b.h - a.h || b.w - a.w);
  const area = sorted.reduce((sum, t) => sum + (t.w + 2 * PADDING) * (t.h + 2 * PADDING), 0);
  const width = Math.max(...sorted.map(t => t.w + 2 * PADDING), Math.ceil(Math.sqrt(area) * 1.1));
  const slots = new Map<FaceTexture, Slot>();
  let x = 0, y = 0, rowHeight = 0, usedWidth = 0;
  sorted.forEach(tex => {
    const w = tex.w + 2 * PADDING, h = tex.h + 2 * PADDING;
    if (x + w > width) {
      x = 0;
      y += rowHeight;
      rowHeight = 0;
    }
    slots.set(tex, { tex, x: x + PADDING, y: y + PADDING });
    x += w;
    usedWidth = Math.max(usedWidth, x);
    rowHeight = Math.max(rowHeight, h);
  });
  return { slots, width: usedWidth, height: y + rowHeight };
}

function drawAtlas(slots: Iterable<Slot>, width: number, height: number): ImageData {
  const atlas = new ImageData(width, height);
  for (const { tex, x, y } of slots) {
    // Each pixel of the slot (face + padding) takes the nearest pixel of the face: the padding repeats the edges
    for (let r = -PADDING; r < tex.h + PADDING; r++) {
      const fr = Math.min(tex.h - 1, Math.max(0, r));
      for (let c = -PADDING; c < tex.w + PADDING; c++) {
        const fc = Math.min(tex.w - 1, Math.max(0, c));
        const from = (fr * tex.w + fc) * 4;
        atlas.data.set(tex.color.subarray(from, from + 4), ((y + r) * width + x + c) * 4);
      }
    }
  }
  return atlas;
}

/** UV rectangle of a slot, in the format of SceneModel: min = bottom left, max = top right (rows go down). */
function slotRect(slot: Slot): VecBox2 {
  return { min: { x: slot.x, y: slot.y + slot.tex.h }, max: { x: slot.x + slot.tex.w, y: slot.y } };
}

function objData(part: EditablePart): SceneModelObj {
  return {
    size: { ...part.size }, pos: { ...part.pos }, rot: { ...part.rot },
    depthWrite: part.depthWrite, depthTest: part.depthTest, shininess: part.shininess, side: part.side,
  };
}

/** Name of the exported constant: 'wood-pannel' → MD_WOOD_PANNEL. */
export function modelConstName(id: string): string {
  return 'MD_' + id.toUpperCase().replace(/[^A-Z0-9]+/g, '_');
}

/** The model in the game's format: an atlas packed from the faces, the UVs computed, and its source file. */
export function exportModel(model: EditableModel): ExportedModel {
  const used = new Set(model.parts.flatMap(p => Object.values(p.faces)).filter((id): id is string => !!id));
  const unique = dedupe(model, used);
  const { slots, width, height } = pack([...new Set(unique.values())]);
  const rectOf = (texId: string | undefined): VecBox2 => texId ? slotRect(slots.get(unique.get(texId)!)!) : { min: { x: 0, y: 0 }, max: { x: 0, y: 0 } };

  const boxes: SceneModelBox[] = model.parts.filter(p => p.kind === 'box').map(part => ({
    ...objData(part),
    uvs: Object.fromEntries(BOX_FACES.map(face => [face, rectOf(part.faces[face])])) as SceneModelBox['uvs'],
  }));
  const planes: SceneModelPlane[] = model.parts.filter(p => p.kind === 'plane').map(part => {
    const rect = rectOf(part.faces.front);
    return { ...objData(part), uvs: { front: rect, back: rect } };
  });

  const result: SceneModel = {
    id: model.id,
    tex: { link: `assets/tex/${model.id}.png`, size: { x: width, y: height } },
    sway: model.sway,
    hitBox: structuredClone(model.hitBox),
    boxes,
    planes,
  };
  const source = [
    `import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';`,
    `import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';`,
    '',
    '// Generated by the model editor (/modeles). Edit the model there, then export again.',
    '',
    `export const ${modelConstName(model.id)}: SceneModel = ${toSource(result, '', undefined, { enums: { side: ['ObjSide', ObjSide] }, inlineMax: 110 })};`,
    '',
  ].join('\n');

  return { model: result, atlas: drawAtlas(slots.values(), width, height), source };
}

/** The atlas as a PNG file. */
export function atlasToPng(atlas: ImageData): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = atlas.width;
  canvas.height = atlas.height;
  canvas.getContext('2d')!.putImageData(atlas, 0, 0);
  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('PNG impossible')), 'image/png'));
}
