import { ModelLight } from "./light";
import { ActionZone } from "./action-zone";
import { PartMotion } from "./model-motion";
import { Vec2, Vec3, VecBox2, VecBox3 } from "./SceneUtils";
import { ObjSide } from "./SceneMap";

export interface SceneModel {
  id: string;
  tex: SceneModelTex;
  boxes: SceneModelBox[];
  planes: SceneModelPlane[];
  hitBox: VecBox3;
  /** 0..1: how much the model bends in the wind (vegetation). Omitted = rigid. The base never moves. */
  sway?: number;
  /** Rectangle of the texture shown as the model's thumbnail in the map editor (pixels, min = top left). */
  thumb?: VecBox2;
  /** Where the player acts on the objects of this model (a house's door; see action-zone.ts). Omitted: the whole object. */
  zone?: ActionZone;
  /** Light points (a lamp's glass, a window): every object of the model lights (see light.ts). */
  lights?: ModelLight[];
}

export interface SceneModelTex {
  link: string;
  size: Vec2;
  /** Grayscale map, same layout as `link`: white = shiny in the sun, black = matte. Replaces the parts' `shininess`. */
  specular?: string;
  /** Grayscale map, same layout: what lights up at night. Omitted = the window glass is found in the colors. */
  night?: string;
  /** Color of what lights up at night (hex, e.g. a crystal's blue). Omitted = the warm light of windows. */
  glow?: string;
  /** Grayscale map, same layout: relief (white = raised). */
  bump?: string;
  /** Strength of the relief (default 1). */
  bumpScale?: number;
}

export interface SceneModelObj {
  size: Vec3;
  pos: Vec3;
  rot: Vec3;
  depthWrite?: boolean;
  depthTest?: boolean;
  side?: ObjSide;
  /** 0..1: strength of the sun reflections on this part (sunny weather). Omitted = matte. */
  shininess?: number;
  /** Its movement (turns, slides, blinks, swings: see model-motion.ts). Omitted = still. */
  motion?: PartMotion;
}

export interface SceneModelBox extends SceneModelObj {
  uvs: {
    front: VecBox2;
    back: VecBox2;
    left: VecBox2;
    right: VecBox2;
    top: VecBox2;
    bottom: VecBox2;
  };
}

export interface SceneModelPlane extends SceneModelObj {
  uvs: {
    front: VecBox2;
    back: VecBox2;
  };
}
