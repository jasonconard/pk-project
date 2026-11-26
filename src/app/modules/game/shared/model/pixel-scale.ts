import * as THREE from "three";
import { CAMERA_FOV, CAMERA_LOOK, Game } from "./Game";

/** The team following the player (team-followers.ts): its group in the scene, moved like the player while drawing. */
export const FOLLOWERS_NAME = "team-followers";

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

/** The camera's lag behind a walking player: how far it would have walked in this time (s). */
const FOLLOW_LAG_TIME = 0.15;
/** How fast the lag follows the player's speed (s): smooth starts and stops. */
const FOLLOW_EASE_TIME = 0.12;
/** The player is shown where it was this many steps ago (between two steps: they run in uneven bursts). */
const SHOW_DELAY_STEPS = 2.5;
/** How fast the shown place, moving at the walking speed, comes back to the in-between place (s). */
const SHOWN_EASE_TIME = 0.05;
/** A move this long in one step is a jump (teleport, another map, back from a fight): no smoothing. */
const FOLLOW_JUMP = 32;
/** The player changes screen pixel only past this share of a pixel (no flicker between two pixels). */
const SNAP_MARGIN = 0.75;

/**
 * Smooth moves on screen. The player moves in fixed steps (120 per second) that reach the screen at an uneven pace
 * (1, 2 or 3 between two frames): drawn as they are, the whole map jerked. While a frame is drawn (and only then:
 * the rest of the game sees the real positions):
 * - the player is shown where it was a moment ago (2.5 steps), in between the two steps around that time (the usual
 *   fixed time step interpolation): an even walk whatever the bursts of steps, never past where it stops;
 * - the camera follows that shown place, with a lag behind a walking player that it catches up when it stops
 *   (like in Pokémon; « Caméra glissante » in Menu → Qualité graphique, else no lag);
 * - the player's sprite (not the camera: the map would shake) is moved by the fraction of a pixel that puts its
 *   feet on a pixel border, so it stays pixel-sharp.
 */
export class CameraFollow {
  private readonly lag = new THREE.Vector3();
  private lastTime = 0;
  /** While a frame is drawn: the camera's offset, the player's real place. */
  private readonly cameraShift = new THREE.Vector3();
  private readonly realPlayer = new THREE.Vector3();
  private shifted: THREE.Object3D | null = null;
  /** The team walking behind (team-followers.ts), moved like the player while a frame is drawn. */
  private followers: THREE.Object3D | null = null;
  private readonly followersShift = new THREE.Vector3();
  /** The screen pixel the player's feet were put on last frame. */
  private snapped: { x: number; y: number } | null = null;
  private readonly shown = new THREE.Vector3();
  /** Where the player is shown (moving at the walking speed), null: not yet. */
  private display: THREE.Vector3 | null = null;
  private readonly between = new THREE.Vector3();
  private readonly velocity = new THREE.Vector3();
  private readonly point = new THREE.Vector3();
  private readonly target = new THREE.Vector3();
  private readonly right = new THREE.Vector3();
  private readonly up = new THREE.Vector3();
  private readonly size = new THREE.Vector2();

  /** Before drawing a frame. */
  apply(game: Game): void {
    const camera = game.camera;
    const now = performance.now();
    const dt = this.lastTime ? Math.min(now - this.lastTime, 100) / 1000 : 0;
    this.lastTime = now;
    const player = game.mapHelper?.scenePlayer.mesh;
    // The editor and the fights move the camera themselves (a zoom of their own)
    if (
      !player ||
      game.editMode ||
      game.cutscene ||
      game.cameraZoom !== game.fittedZoom
    ) {
      this.lag.set(0, 0, 0);
      this.display = null;
      this.snapped = null;
      return;
    }
    const real = player.position;
    const steps = game.steps;
    // The places at the start of the last steps, and the real one at the end of the last step
    const history = steps.player;
    const last = history.at(-1);
    const shownAt = now - SHOW_DELAY_STEPS * steps.length;
    this.velocity.set(0, 0, 0);
    if (!last || this.point.copy(real).sub(last.pos).length() > FOLLOW_JUMP) {
      this.shown.copy(real);
      this.display = null;
      this.lag.set(0, 0, 0);
    } else {
      const end = last.time + steps.length;
      if (shownAt >= end) {
        this.between.copy(real);
      } else {
        // The two places around that time
        let from = history[0];
        let to: { time: number; pos: THREE.Vector3 } = { time: end, pos: real };
        for (let i = 0; i < history.length; i++) {
          const next = history[i + 1] ?? { time: end, pos: real };
          if (history[i].time <= shownAt && shownAt <= next.time) {
            from = history[i];
            to = next;
            break;
          }
        }
        const span = to.time - from.time;
        const t =
          span > 0
            ? THREE.MathUtils.clamp((shownAt - from.time) / span, 0, 1)
            : 1;
        if (this.point.copy(to.pos).sub(from.pos).length() > FOLLOW_JUMP) {
          this.between.copy(to.pos);
        } else {
          this.between.copy(from.pos).lerp(to.pos, t);
        }
      }
      // The walking speed over all the steps kept (one step's move is 0 or 1 unit: too uneven for the lag)
      const first = history[0];
      const kept = end - first.time;
      if (
        kept > 0 &&
        this.point.copy(real).sub(first.pos).length() < FOLLOW_JUMP
      ) {
        this.velocity.copy(this.point).divideScalar(kept / 1000);
      }
      // Shown moving at the walking speed (an even move: one step's move is 0 or 1 unit), coming back to the
      // in-between place, and never past the real place in the walking direction (no step back when stopping)
      if (this.display) {
        this.target.copy(this.display);
        this.display
          .addScaledVector(this.velocity, dt)
          .lerp(this.between, 1 - Math.exp(-dt / SHOWN_EASE_TIME));
        for (const axis of ["x", "y", "z"] as const) {
          const way = Math.sign(this.velocity[axis]);
          if (!way) {
            continue;
          }
          // (never backwards, never past the real place)
          if ((this.display[axis] - this.target[axis]) * way < 0) {
            this.display[axis] = this.target[axis];
          }
          if ((this.display[axis] - real[axis]) * way > 0) {
            this.display[axis] = real[axis];
          }
        }
      } else {
        this.display = this.between.clone();
      }
      this.shown.copy(this.display);
      // The lag: the walking speed, eased
      this.target
        .copy(this.velocity)
        .setY(0)
        .multiplyScalar(game.smoothCamera ? -FOLLOW_LAG_TIME : 0);
      this.lag.lerp(this.target, 1 - Math.exp(-dt / FOLLOW_EASE_TIME));
      if (this.lag.lengthSq() < 1e-6) {
        this.lag.set(0, 0, 0);
      }
    }

    // The camera: locked on the shown player, with its lag
    this.cameraShift.copy(this.shown).sub(real).add(this.lag);
    camera.position.add(this.cameraShift);
    camera.updateMatrixWorld();
    // The player at its shown place, its feet on a pixel border
    this.realPlayer.copy(real);
    this.shifted = player;
    player.position.copy(this.shown);
    const size = game.renderer.getDrawingBufferSize(this.size);
    const feet = this.point.copy(player.position).project(camera);
    const px = ((feet.x + 1) / 2) * size.x;
    const py = ((1 - feet.y) / 2) * size.y;
    this.right.set(1, 0, 0).applyQuaternion(camera.quaternion);
    this.up.set(0, 1, 0).applyQuaternion(camera.quaternion);
    const beside = this.point
      .copy(player.position)
      .add(this.right)
      .project(camera);
    const perUnit = ((beside.x + 1) / 2) * size.x - px;
    if (perUnit > 0) {
      const keep = (value: number, previous: number | undefined) =>
        previous !== undefined && Math.abs(value - previous) < SNAP_MARGIN
          ? previous
          : Math.round(value);
      const x = keep(px, this.snapped?.x);
      const y = keep(py, this.snapped?.y);
      this.snapped = { x, y };
      player.position
        .addScaledVector(this.right, (x - px) / perUnit)
        .addScaledVector(this.up, (py - y) / perUnit);
    }
    player.updateMatrixWorld();
    // The followers stand on the leader's real steps: the same shift keeps them as smooth and sharp as the player
    this.followers = game.scene.getObjectByName(FOLLOWERS_NAME) ?? null;
    if (this.followers) {
      this.followersShift.copy(player.position).sub(this.realPlayer);
      this.followers.position.add(this.followersShift);
      this.followers.updateMatrixWorld();
    }
  }

  /** After drawing: the camera and the player at their real places again. */
  restore(game: Game): void {
    game.camera.position.sub(this.cameraShift);
    game.camera.updateMatrixWorld();
    this.cameraShift.set(0, 0, 0);
    if (this.followers) {
      this.followers.position.sub(this.followersShift);
      this.followers.updateMatrixWorld();
      this.followers = null;
    }
    if (this.shifted) {
      this.shifted.position.copy(this.realPlayer);
      this.shifted.updateMatrixWorld();
      this.shifted = null;
    }
  }
}
