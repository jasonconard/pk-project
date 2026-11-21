// The model editor's options: tools, layers, the part's rows of numbers, the phone's nudges, saved view settings.
import {
  LucideArrowDown,
  LucideArrowDownLeft,
  LucideArrowLeft,
  LucideArrowRight,
  LucideArrowUp,
  LucideArrowUpRight,
  LucideEraser,
  LucideMoon,
  LucideMountain,
  LucidePaintBucket,
  LucidePalette,
  LucidePencil,
  LucidePipette,
  LucideSlash,
  LucideSparkles,
  LucideSquare,
  LucideIcon,
} from "@lucide/angular";
import { readJson } from "../../core/shared/local-store";
import { BoxFace } from "../game/shared/model/model-uv";
import { LayerName } from "./shared/EditableModel";
import { PaintStroke, Tool } from "./shared/pixel-tools";

export const FACE_LABELS: Record<BoxFace, string> = {
  front: "Avant",
  back: "Arrière",
  left: "Gauche",
  right: "Droite",
  top: "Dessus",
  bottom: "Dessous",
};

/** Selected part, and one of its faces (null: the whole part). */
export interface Selection {
  partIndex: number;
  face: BoxFace | null;
}

export type Axis = "x" | "y" | "z";

/** Pointer moves below this (px) between press and release: a click (select), not a camera drag. */
export const CLICK_TOLERANCE = 4;
export const NEW_MODEL_ID = "nouveau-modele";

/** Selection: click a face, move the part with the arrows. Painting: the tool draws on the faces in 3D too. */
export type Mode = "select" | "paint";

export const TOOLS: {
  id: Tool;
  icon: LucideIcon;
  label: string;
  short: string;
  key: string;
}[] = [
  {
    id: "pencil",
    icon: LucidePencil,
    label: "Crayon",
    short: "Crayon",
    key: "p",
  },
  {
    id: "eraser",
    icon: LucideEraser,
    label: "Gomme (transparent)",
    short: "Gomme",
    key: "e",
  },
  {
    id: "picker",
    icon: LucidePipette,
    label: "Pipette",
    short: "Pipette",
    key: "i",
  },
  {
    id: "fill",
    icon: LucidePaintBucket,
    label: "Pot de peinture",
    short: "Pot",
    key: "f",
  },
  { id: "line", icon: LucideSlash, label: "Ligne", short: "Ligne", key: "l" },
  {
    id: "rect",
    icon: LucideSquare,
    label: "Rectangle",
    short: "Rectangle",
    key: "r",
  },
];

export const LAYERS: {
  id: LayerName;
  label: string;
  icon: LucideIcon;
  short: string;
  hint: string;
}[] = [
  {
    id: "color",
    label: "Couleur",
    icon: LucidePalette,
    short: "Pixels",
    hint: "Les couleurs des pixels.",
  },
  {
    id: "specular",
    label: "Brillance",
    icon: LucideSparkles,
    short: "Reflets",
    hint: "Blanc : reflets du soleil · Noir : mat",
  },
  {
    id: "night",
    label: "Nuit",
    icon: LucideMoon,
    short: "Lumières",
    hint: "Ce qui s'allume la nuit (lumière chaude) · Noir : éteint",
  },
  {
    id: "bump",
    label: "Relief",
    icon: LucideMountain,
    short: "Bosses",
    hint: "Blanc : en relief · Noir : en creux (seules les différences comptent)",
  },
];

/** Bottom sheets of the phone layout (one open at a time). */
export type Sheet = "model" | "shapes" | "add" | "layer" | "face" | "palette";

/** Rows of numbers of the selected part, changed with − / + (step) or typed. */
export type VecKind = "size" | "pos" | "rot";
export const VECS: { kind: VecKind; label: string; step: number }[] = [
  { kind: "size", label: "Taille", step: 1 },
  { kind: "pos", label: "Position", step: 1 },
  { kind: "rot", label: "Rotation °", step: 15 },
];

/** Arrows moving the selected part on a phone (no keyboard). */
export const NUDGES: {
  axis: "x" | "y" | "z";
  delta: number;
  icon: LucideIcon;
  label: string;
}[] = [
  { axis: "x", delta: -1, icon: LucideArrowLeft, label: "x −" },
  { axis: "x", delta: 1, icon: LucideArrowRight, label: "x +" },
  { axis: "y", delta: 1, icon: LucideArrowUp, label: "y +" },
  { axis: "y", delta: -1, icon: LucideArrowDown, label: "y −" },
  { axis: "z", delta: -1, icon: LucideArrowUpRight, label: "z −" },
  { axis: "z", delta: 1, icon: LucideArrowDownLeft, label: "z +" },
];

/** Width below which the editor uses the phone layout (bottom bars and sheets instead of the side panel). */
export const PHONE_QUERY = "(max-width: 700px)";
/** Recent colors shown in the phone's tool bar. */
export const TRAY_COLORS = 7;

/** Shades of the grayscale layers' palette. */
export const GRAYS = [0, 32, 64, 96, 128, 160, 192, 224, 255];

/** Sections of the panel that can be folded. */
export type PanelSection =
  "model" | "parts" | "part" | "layer" | "drawing" | "color" | "face";
export const SECTIONS_KEY = "pk-model-editor-sections";
export const BIG_VIEW_KEY = "pk-model-editor-big-view";

/** A saved view setting, completed with the defaults (what it misses, or all when unreadable). */
export function loadJson<T>(key: string, fallback: T): T {
  return { ...fallback, ...readJson<Partial<T>>(key) };
}

export const RECENT_COLORS = 12;
/** Time to confirm going back to the game's version (ms). */
export const CONFIRM_TIME = 3000;

/** Waiting for a click on the target face: link it to the selected face, or copy the selected face's pixels on it. */
export interface PendingFaceAction {
  kind: "link" | "copy";
  texId: string;
}

/** A stroke in progress, on one face texture. */
export interface ActiveStroke {
  texId: string;
  stroke: PaintStroke;
  /** Started on the 3D view (the pointer is followed there). */
  in3d: boolean;
}
