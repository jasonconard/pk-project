import { VecBox2 } from "./SceneUtils";
import { SceneModel } from "./SceneModel";
import { MD_LABO } from "../../../../../assets/models/md-labo";
import { MD_BARRIER } from "../../../../../assets/models/md-barrier";
import { MD_PANNEL } from "../../../../../assets/models/md-pannel";
import { MD_FLOWERS } from "../../../../../assets/models/md-flowers";
import { MD_TREE } from "../../../../../assets/models/md-tree";
import { MD_HOUSE } from "../../../../../assets/models/md-house";
import { MD_WOOD_PANNEL } from "../../../../../assets/models/md-wood-pannel";
import { MD_LETTER_BOX } from "../../../../../assets/models/md-letter-box";
import { MD_ROCK } from "../../../../../assets/models/md-rock";
import { MD_WINDMILL } from "../../../../../assets/models/md-windmill";
import { MD_LAMP } from "../../../../../assets/models/md-lamp";
import { MD_CAMPFIRE } from "../../../../../assets/models/md-campfire";
import { MODELS } from "../../../../../assets/models/models";
import { isNpc, npcOf } from "./npc-sprite";
import { dungeonKindOf } from "./dungeon-object";

export interface ModelChoice {
  /** Crop of the texture for the thumbnail (min = top left). Not needed when the model has a `thumb` (exported by the model editor). */
  texPos?: VecBox2;
  model: SceneModel;
  croppedPic?: string;
}

/** The models of the cave decor, taken from the models list (no crop to give: they have a `thumb`). */
const CAVE_MODEL_IDS = new Set([
  "crystal-shard-blue",
  "crystal-shard-violet",
  "crystal-shard-green",
  "crystal-cluster-blue",
  "crystal-cluster-violet",
  "crystal-cluster-green",
  "crystal-spire-blue",
  "crystal-spire-violet",
  "crystal-spire-green",
  "crystal-geode-blue",
  "crystal-geode-violet",
  "crystal-geode-green",
  "crystal-wall-blue",
  "crystal-wall-violet",
  "crystal-wall-green",
  "cave-rock-small",
  "cave-rock-large",
  "cave-boulder",
  "stalagmite",
  "stalagmite-group",
  "rubble",
  "cave-entrance",
  "pickaxe",
  "mine-cart",
  "mine-lantern",
  "mine-support",
  "crate",
  "barrel",
  "mine-sign",
  "ore-pile",
  "rope-coil",
  "mine-rail-end",
]);

export const MODEL_CHOICES: ModelChoice[] = [
  {
    model: MD_ROCK,
    texPos: {
      min: { x: 0, y: 0 },
      max: { x: 16, y: 16 },
    },
  },
  {
    model: MD_LABO,
    texPos: {
      min: { x: 185, y: 125 },
      max: { x: 297, y: 197 },
    },
  },
  {
    model: MD_BARRIER,
    texPos: {
      min: { x: 24, y: 11 },
      max: { x: 32, y: 22 },
    },
  },
  {
    model: MD_PANNEL,
    texPos: {
      min: { x: 34, y: 35 },
      max: { x: 50, y: 50 },
    },
  },
  {
    model: MD_FLOWERS,
    texPos: {
      min: { x: 25, y: 25 },
      max: { x: 39, y: 40 },
    },
  },
  {
    model: MD_TREE,
    texPos: {
      min: { x: 65, y: 79 },
      max: { x: 95, y: 120 },
    },
  },
  {
    model: MD_HOUSE,
    texPos: {
      min: { x: 218, y: 120 },
      max: { x: 298, y: 192 },
    },
  },
  {
    model: MD_WOOD_PANNEL,
    texPos: {
      min: { x: 26, y: 25 },
      max: { x: 40, y: 40 },
    },
  },
  {
    model: MD_LETTER_BOX,
    texPos: {
      min: { x: 28, y: 19 },
      max: { x: 40, y: 40 },
    },
  },
  { model: MD_WINDMILL },
  { model: MD_LAMP },
  { model: MD_CAMPFIRE },
  // The cave decor (crystals, rocks, the old mine): every one has its thumbnail
  ...MODELS.filter((model) => CAVE_MODEL_IDS.has(model.id)).map((model) => ({
    model,
  })),
];

/**
 * Thumbnail of a model (the model's `thumb` crop of the texture, else the choice's `texPos`, else the whole
 * texture), as a data URL; cached on the choice.
 */
export function loadModelThumb(choice: ModelChoice): Promise<string> {
  if (choice.croppedPic) {
    return Promise.resolve(choice.croppedPic);
  }
  const { tex } = choice.model;
  const crop = choice.model.thumb ??
    choice.texPos ?? {
      min: { x: 0, y: 0 },
      max: { x: tex.size.x, y: tex.size.y },
    };
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = crop.max.x - crop.min.x;
    canvas.height = crop.max.y - crop.min.y;
    const img = document.createElement("img");
    img.addEventListener(
      "load",
      () => {
        canvas
          .getContext("2d")
          ?.drawImage(
            img,
            crop.min.x,
            crop.min.y,
            canvas.width,
            canvas.height,
            0,
            0,
            canvas.width,
            canvas.height
          );
        choice.croppedPic = canvas.toDataURL();
        resolve(choice.croppedPic);
      },
      { once: true }
    );
    img.src = choice.model.tex.link;
  });
}

/** French names of the models (editor palette, the action prompt « Entrer au Labo »). */
const MODEL_LABELS: Record<string, string> = {
  labo: "Labo",
  house: "Maison",
  tree: "Arbre",
  flowers: "Fleurs",
  barrier: "Barrière",
  pannel: "Panneau",
  "wood-pannel": "Pancarte",
  "letter-box": "Boîte aux lettres",
  rock: "Rocher",
  windmill: "Moulin",
  lamp: "Lampadaire",
  campfire: "Feu de camp",
  "crystal-shard-blue": "Éclat de cristal bleu",
  "crystal-shard-violet": "Éclat de cristal violet",
  "crystal-shard-green": "Éclat de cristal vert",
  "crystal-cluster-blue": "Amas de cristaux bleus",
  "crystal-cluster-violet": "Amas de cristaux violets",
  "crystal-cluster-green": "Amas de cristaux verts",
  "crystal-spire-blue": "Aiguille de cristal bleue",
  "crystal-spire-violet": "Aiguille de cristal violette",
  "crystal-spire-green": "Aiguille de cristal verte",
  "crystal-geode-blue": "Géode bleue",
  "crystal-geode-violet": "Géode violette",
  "crystal-geode-green": "Géode verte",
  "crystal-wall-blue": "Veine de cristal bleue",
  "crystal-wall-violet": "Veine de cristal violette",
  "crystal-wall-green": "Veine de cristal verte",
  "cave-rock-small": "Petit rocher de grotte",
  "cave-rock-large": "Grand rocher de grotte",
  "cave-boulder": "Gros rocher rond",
  stalagmite: "Stalagmite",
  "stalagmite-group": "Groupe de stalagmites",
  rubble: "Éboulis",
  "cave-entrance": "Entrée de grotte",
  pickaxe: "Pioche",
  "mine-cart": "Wagonnet",
  "mine-lantern": "Lanterne de mineur",
  "mine-support": "Étai de mine",
  crate: "Caisse",
  barrel: "Tonneau",
  "mine-sign": "Panneau de danger",
  "ore-pile": "Tas de minerai",
  "rope-coil": "Rouleau de corde",
  "mine-rail-end": "Butoir de rail",
  zone: "Zone invisible",
  light: "Lumière",
};

export function modelLabel(modelId: string): string {
  if (isNpc({ modelId })) {
    return npcOf(modelId)?.name ?? "PNJ retiré de la base";
  }
  return dungeonKindOf(modelId)?.label ?? MODEL_LABELS[modelId] ?? modelId;
}
