import * as THREE from "three";
import { currentParty } from "../../../database-editor/shared/party";
import { SceneModel } from "./SceneModel";
import { SceneBuilding } from "./SceneBuilding";
import { Vec3 } from "./SceneUtils";

/**
 * A light (docs/editeur/19-lumieres.md; design/main-view.pen, Lumières): a light point of a model (a lamp's glass,
 * a window), an invisible « Lumière » object of the map (a campfire, a magic glow) or the player's lantern. At night
 * it paints a soft pool of its colour on the ground (cheap, every light); with a high graphics quality the nearest
 * ones are also real lights. Events switch them on or off (kept with the game, in the team's state).
 */
export interface LightSpec {
  /** « #ff9a3c ». */
  color: string;
  /** How far it lights, in map cells. */
  range: number;
  /** 0.6 soft, 1 medium, 1.5 strong. */
  strength: number;
  /** It flickers like a flame. */
  flicker?: boolean;
  /** On only in the evening and at night (when the windows light up). */
  nightOnly?: boolean;
  /** Off until an event switches it on. */
  off?: boolean;
}

/** A light point of a model, around its centre (like its parts). */
export interface ModelLight extends LightSpec {
  pos: Vec3;
  name?: string;
}

export const LIGHT_COLORS = [
  "#ff9a3c",
  "#ffd98a",
  "#fff6e0",
  "#8fc8ff",
  "#9cff8a",
  "#c58af0",
  "#ff6a5a",
];
export const LIGHT_STRENGTHS = [
  { value: 0.6, label: "Douce" },
  { value: 1, label: "Moyenne" },
  { value: 1.5, label: "Forte" },
];
export const LIGHT_RANGE = { min: 1, max: 8 };

export function defaultLight(): LightSpec {
  return { color: LIGHT_COLORS[0], range: 3, strength: 1 };
}

/** The player's lantern. */
export const LANTERN: LightSpec = {
  color: "#ffb860",
  range: 3,
  strength: 1,
  flicker: true,
};
export const LANTERN_KEY = "lantern";

/** The invisible light object of the map editor (tab Zones). */
export const LIGHT_ID = "light";

export const MD_LIGHT: SceneModel = {
  id: LIGHT_ID,
  tex: { link: "", size: { x: 1, y: 1 } },
  boxes: [],
  planes: [],
  hitBox: { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } },
};

export function isLightObject(
  item: Pick<SceneBuilding, "modelId"> | Pick<SceneModel, "id">
): boolean {
  return ("modelId" in item ? item.modelId : item.id) === LIGHT_ID;
}

/** An object's lights switched by events: `<map>/<object>`. */
export function lightKey(map: string, object: string): string {
  return `${map}/${object}`;
}

/** Is it on (an event's switch, else its own setting; the lantern: off until an event lights it)? */
export function isLightOn(spec: LightSpec, key: string): boolean {
  const switched = currentParty().lights?.[key];
  if (switched !== undefined) {
    return switched;
  }
  return key === LANTERN_KEY ? false : !spec.off;
}

/** « Forte · 3 cases ». */
export function lightSummary(spec: LightSpec): string {
  const strength =
    LIGHT_STRENGTHS.find((s) => s.value === spec.strength)?.label ?? "";
  return `${strength} · ${spec.range} case${spec.range > 1 ? "s" : ""}${spec.nightOnly ? " · la nuit" : ""}`;
}

/** The marker of a light object in the editor: a small glowing ball on the editor's layer (not seen in the game). */
const markerGeometry = new THREE.SphereGeometry(3, 12, 8).translate(0, 6, 0);

export function makeLightMarker(spec: LightSpec, layer: number): THREE.Group {
  const mesh = new THREE.Mesh(
    markerGeometry,
    new THREE.MeshBasicMaterial({ color: spec.color })
  );
  mesh.layers.set(layer);
  const group = new THREE.Group();
  group.add(mesh);
  return group;
}
