import { EditableModel } from './EditableModel';
import { rgbaToHex } from './pixel-tools';

/** Colors shown from the model. */
const MAX_MODEL_COLORS = 40;

/** Opaque colors used by the model, the most used first. */
export function modelColors(model: EditableModel): string[] {
  const counts = new Map<number, number>();
  Object.values(model.textures).forEach(tex => {
    for (let i = 0; i < tex.color.length; i += 4) {
      if (tex.color[i + 3] >= 128) {
        const key = (tex.color[i] << 16) | (tex.color[i + 1] << 8) | tex.color[i + 2];
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }
  });
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_MODEL_COLORS)
    .map(([key]) => rgbaToHex([(key >> 16) & 255, (key >> 8) & 255, key & 255, 255]));
}
