import * as THREE from "three";
import { CAMERA_FOV, CAMERA_LOOK, Game } from "./Game";

/**
 * Pixel-sharp sprites, after "Recreating the 2.5D effect from Pokémon Black & White" (M. Jakeman): a sprite pixel
 * covers a whole number of screen pixels (3, 4, 5… depending on the screen) and its edges fall on the screen's pixel
 * grid, so the player and the NPCs never have uneven columns or rows, nor shimmer while walking.
 *
 * - The camera's distance (its zoom) is chosen for a whole number of screen pixels per map unit at the point it
 *   looks at (the player's feet), never farther than the usual distance (no more of the map to build).
 * - The sprites are drawn facing the camera (all their rows at the same distance, so of the same size) but keep the
 *   depth of an upright sprite: their head doesn't go into a wall standing just behind them (see facingSprite).
 */

/** The zoom (CAMERA_LOOK scale) for a whole number of drawing pixels per map unit at the camera's target. */
export function pixelZoom(game: Game): number {
  const height = game.renderer.getDrawingBufferSize(new THREE.Vector2()).y;
  const tanHalf = Math.tan(THREE.MathUtils.degToRad(game.camera.fov / 2));
  const distance = CAMERA_LOOK.length();
  // Pixels per unit at the usual distance, rounded up: the camera comes a little closer. Retro rendering: one
  // picture pixel per map unit (its height is chosen for it, see retroScale: the distance stays about the same)
  const perUnit = game.retro
    ? 1
    : Math.max(1, Math.ceil(height / (2 * distance * tanHalf)));
  return height / (2 * perUnit * tanHalf) / distance;
}

/**
 * How many screen pixels a retro picture pixel covers, for a screen `height` device pixels high.
 * Retro rendering: the picture is computed small, one pixel per map unit (like the sprites' and the models'
 * pixels: about 176 rows at the usual camera distance, a handheld console's screen), and enlarged a whole number
 * of times with crisp pixels.
 */
export function retroScale(height: number): number {
  // (computed here, not at load: Game.ts imports this file)
  const retroHeight =
    2 *
    CAMERA_LOOK.length() *
    Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV / 2));
  return Math.max(1, Math.round(height / retroHeight));
}

const bufferSize = new THREE.Vector2();

/**
 * In the game (each frame, cheap): the camera at the pixel-sharp zoom (unless something else set its own zoom: a
 * fight, the editor), and moved half a pixel on a screen of odd size so the centre is a pixel border.
 */
export function fitPixelCamera(game: Game): void {
  const camera = game.camera;
  const size = game.renderer.getDrawingBufferSize(bufferSize);
  const shiftX = size.x % 2 ? 1 / size.x : 0;
  const shiftY = size.y % 2 ? 1 / size.y : 0;
  const e = camera.projectionMatrix.elements;
  if (e[8] !== shiftX || e[9] !== shiftY) {
    e[8] = shiftX;
    e[9] = shiftY;
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
  }
  const zoom = pixelZoom(game);
  if (game.cameraZoom === zoom || game.cameraZoom !== game.fittedZoom) {
    return;
  }
  const target = game.getCameraTarget();
  game.cameraZoom = zoom;
  game.fittedZoom = zoom;
  camera.position.copy(target).add(game.cameraOffset());
}

/**
 * A sprite plane (centred PlaneGeometry `height` high, upright, scaled up by the camera stretch) drawn facing the
 * camera from its feet, at its unstretched size, with the depth of the upright plane.
 */
export function facingSprite(material: THREE.Material, height: number): void {
  const previous = material.onBeforeCompile.bind(material);
  const previousKey = material.customProgramCacheKey.bind(material);
  material.onBeforeCompile = (shader, renderer) => {
    previous(shader, renderer);
    shader.uniforms["spriteHalfHeight"] = { value: height / 2 };
    shader.vertexShader = shader.vertexShader
      .replace(
        "void main() {",
        "uniform float spriteHalfHeight;\nvoid main() {"
      )
      .replace(
        "#include <project_vertex>",
        /* glsl */ `#include <project_vertex>
  // Facing the camera from the feet: up in view space, as many units as the picture's pixels
  vec4 spriteFeet = modelViewMatrix * vec4(transformed.x, -spriteHalfHeight, 0.0, 1.0);
  vec4 spriteFacing = projectionMatrix * (spriteFeet + vec4(0.0, transformed.y + spriteHalfHeight, 0.0, 0.0));
  // ...with the depth of the upright plane (walls behind it stay behind)
  spriteFacing.z = gl_Position.z / gl_Position.w * spriteFacing.w;
  gl_Position = spriteFacing;`
      );
  };
  material.customProgramCacheKey = () => previousKey() + "-facing-sprite";
}
