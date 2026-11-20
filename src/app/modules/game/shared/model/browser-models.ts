import { MODELS } from "../../../../../assets/models/models";
import { SceneModel } from "./SceneModel";
import { MODEL_CHOICES } from "./ModelChoice";
import { loadStoredModels } from "../../../model-editor/shared/model-storage";
import {
  atlasToPng,
  exportModel,
} from "../../../model-editor/shared/model-export";
import { GRAY_LAYERS } from "../../../model-editor/shared/EditableModel";

/** The models of the code, before the browser's versions replace some of them (the model editor starts from these). */
export const CODE_MODELS: readonly SceneModel[] = [...MODELS];

let applied: Promise<string[]> | null = null;

/**
 * The game uses the models edited in the model editor (saved in the browser) without exporting them: each one is
 * turned into the game's format (atlas and maps as in-memory images) and replaces the model of the code with the
 * same id, or is added (new model, also in the map editor's palette). Done once, before the game is built.
 * Returns the ids of the models taken from the browser.
 */
export function applyBrowserModels(): Promise<string[]> {
  applied ??= readBrowserModels();
  return applied;
}

/**
 * Back from the model editor (opened over the game): the browser's models are read again. Those no longer in the
 * browser come back to the code's version (or leave, if they were new). Returns every model id that may have changed
 * (the game draws them again).
 */
export async function reloadBrowserModels(): Promise<string[]> {
  const before = await (applied ?? Promise.resolve([]));
  const now = await (applied = readBrowserModels());
  for (const id of before.filter((id) => !now.includes(id))) {
    const code = CODE_MODELS.find((m) => m.id === id);
    const index = MODELS.findIndex((m) => m.id === id);
    const choice = MODEL_CHOICES.findIndex((c) => c.model.id === id);
    if (code) {
      MODELS[index] = code;
      if (choice >= 0) {
        MODEL_CHOICES[choice].model = code;
        MODEL_CHOICES[choice].croppedPic = undefined;
      }
    } else {
      if (index >= 0) {
        MODELS.splice(index, 1);
      }
      if (choice >= 0) {
        MODEL_CHOICES.splice(choice, 1);
      }
    }
  }
  return [...new Set([...before, ...now])];
}

/** Turns the browser's models into the game's and puts them in place of the code's (or adds them). */
async function readBrowserModels(): Promise<string[]> {
  const ids: string[] = [];
  for (const edited of await loadStoredModels()) {
    try {
      const model = await toGameModel(edited.id, exportModel(edited));
      const index = MODELS.findIndex((m) => m.id === model.id);
      if (index >= 0) {
        MODELS[index] = model;
      } else {
        MODELS.push(model);
      }
      const choice = MODEL_CHOICES.find((c) => c.model.id === model.id);
      if (choice) {
        choice.model = model;
        choice.croppedPic = undefined;
      } else {
        MODEL_CHOICES.push({ model });
      }
      ids.push(model.id);
    } catch (e) {
      console.warn(`Modèle « ${edited.id} » du navigateur ignoré`, e);
    }
  }
  return ids;
}

/** The exported model with its images as blob: URLs (read by the texture loader like files). */
async function toGameModel(
  id: string,
  exported: ReturnType<typeof exportModel>
): Promise<SceneModel> {
  const url = async (image: ImageData) =>
    URL.createObjectURL(await atlasToPng(image));
  const tex = { ...exported.model.tex, link: await url(exported.atlas) };
  for (const layer of GRAY_LAYERS) {
    const map = exported.maps[layer];
    if (map) {
      tex[layer] = await url(map);
    }
  }
  return { ...exported.model, id, tex };
}
