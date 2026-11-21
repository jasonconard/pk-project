import * as THREE from "three";
import {
  CAMERA_LOOK,
  Game,
  SHADE_OFFSET,
  TOO_CLOSE_LIMIT,
  TOO_FAR_LIMIT,
} from "./Game";
import { MathService } from "../services/math.service";

// The map's objects fading out: too close to the camera (out of view at the bottom), too far, or see-through while
// the player walks behind them.

/** Opacity of a mesh: hidden too close to the camera / too far, see-through with the player behind it. */
export function meshOpacity(
  game: Game,
  mesh: THREE.Object3D,
  bounds: THREE.Box3,
  playerPos: THREE.Vector3,
  canHide: boolean
): number {
  let opacity = 1;

  const camera = game.camera;

  // HIDE IF TOO CLOSE TO CAMERA (out of view at the bottom of the screen). The camera looks down at an angle:
  // a point h high is seen along the same line of sight as the ground h × CAMERA_LOOK.z / CAMERA_LOOK.y further
  // ahead, so a tall building (the lab, a tower) is still on screen when its base already left it.
  const cameraZ = camera.position.z - TOO_CLOSE_LIMIT;
  const visibleZ =
    bounds.max.z -
    ((bounds.max.y - bounds.min.y) * CAMERA_LOOK.z) / CAMERA_LOOK.y;
  if (cameraZ < visibleZ) {
    opacity = Math.max(0, 1 - (visibleZ - cameraZ) / SHADE_OFFSET);
    return opacity;
  }

  // HIDE IF TOO FAR FOR CAMERA
  // (farther when the editor zooms out)
  const farLimit = TOO_FAR_LIMIT * Math.max(1, game.cameraZoom);
  const dist = MathService.getDist(mesh.position, camera.position);
  if (dist > farLimit) {
    opacity = Math.max(0, 1 - (dist - farLimit) / SHADE_OFFSET);
    return opacity;
  }

  if (
    bounds.min.x < playerPos.x &&
    bounds.max.x > playerPos.x &&
    playerPos.z < bounds.min.z
  ) {
    const borderDist = Math.min(
      Math.abs(playerPos.x - bounds.min.x),
      Math.abs(playerPos.x - bounds.max.x)
    );
    const behindDist = Math.abs(playerPos.z - bounds.min.z);
    const height = bounds.max.y - bounds.min.y + SHADE_OFFSET;
    if (behindDist < height) {
      const opacityOffsetX =
        borderDist > SHADE_OFFSET ? 0 : 1 - borderDist / SHADE_OFFSET;
      const opacityOffsetZ = behindDist > height ? 0 : behindDist / height;
      const opacityOffset = Math.max(opacityOffsetX, opacityOffsetZ);
      opacity = 0.7 + 0.3 * opacityOffset;
    }
  }

  if (canHide) {
    return opacity;
  } else {
    return opacity > 0 ? 1 : 0;
  }
}

/**
 * A hidden mesh (too close to the camera / too far) is not drawn but, while `castsShadow`, stays in the scene:
 * it still casts its shadow, which would otherwise vanish at once from the visible ground (e.g. the lab's long
 * shadow when walking past it). Hidden = no color and no depth written. Once its shadow can't reach the view
 * anymore, it is removed (`visible = false`: no more drawing, shadow or weather effects on it).
 */
export function applyMeshOpacity(
  mesh: THREE.Object3D,
  opacity: number,
  castsShadow: boolean
) {
  if (!(mesh instanceof THREE.Mesh)) {
    return;
  }
  const material = mesh.material as THREE.Material;
  // Transparent only while fading: a transparent double sided material is drawn in two passes (back faces,
  // then front faces), twice the draw calls; the cut-out texels are handled by the alphaTest anyway.
  // One pass even while fading (the few overlapping faces of a fading building don't need the second one).
  // Parts drawn without the depth test (a sign's text over its posts) stay in the transparent list: drawn from
  // the farthest to the nearest, their order is right (the opaque list draws the nearest first).
  material.transparent = (opacity > 0 && opacity < 1) || !material.depthTest;
  material.forceSinglePass = true;
  mesh.visible = opacity > 0 || castsShadow;
  if (material.userData["depthWrite"] === undefined) {
    material.userData["depthWrite"] = material.depthWrite;
  }
  const hidden = opacity <= 0;
  material.colorWrite = !hidden;
  material.depthWrite = hidden ? false : material.userData["depthWrite"];
  material.opacity = Math.min(opacity, 1);
}
