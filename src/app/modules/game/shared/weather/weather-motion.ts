import * as THREE from "three";
import type { Game } from "../model/Game";
import type { GeyserHelper } from "./GeyserHelper";
import type { TornadoHelper } from "./TornadoHelper";
import type { WeatherAudio } from "./WeatherAudio";

/** Tornado: catches the player within this distance of its axis (world units); flight duration (s), height
 * (world units), spin speed (rad / s), and the delay before being caught again (s). */
const TORNADO_CATCH = 16;
const FLIGHT_TIME = 3.2;
const FLIGHT_HEIGHT = 50;
const FLIGHT_SPIN = 16;
const FLIGHT_COOLDOWN = 5;
/** Share of the flight height the camera follows (1 = the player stays still on screen). */
const FLIGHT_CAMERA_FOLLOW = 0.8;
/** Geysers: an erupting one throws the player within this distance (world units). */
const GEYSER_CATCH = 10;
/** Reversed gravity: player float height, bobbing amplitude (world units), bobbing speed (rad / s), sway (rad). */
const FLOAT_HEIGHT = 8;
const FLOAT_BOB = 2.5;
const FLOAT_SPEED = 1.6;
const FLOAT_SWAY = 0.08;
/** Earthquake: seconds between two quakes, quake length (s), camera shake amplitude (world units). */
const QUAKE_INTERVAL = [7, 18] as const;
const QUAKE_LENGTH = [2, 4.5] as const;
const SHAKE_AMPLITUDE = 2.2;
/** Imminent eruption: the big quake's length and strength. */
const ERUPTION_QUAKE_LENGTH = 7;
const ERUPTION_QUAKE_POWER = 1.4;
/** Thunder rain: camera jolt when a strike lands closer than this distance (world units), and its length (s). */
const STRIKE_JOLT_DISTANCE = 70;
const STRIKE_JOLT_LENGTH = 0.7;

/** Where the player stands (the camera target if there is none, e.g. in a fight). */
export function playerPosition(game: Game): THREE.Vector3 {
  return game.mapHelper?.scenePlayer?.mesh?.position ?? game.getCameraTarget();
}

/**
 * How the weather moves the player and the camera: thrown up by a tornado or an erupting geyser (spinning, then
 * falling back where they were), floating in reversed gravity, the camera shaking in an earthquake or jolted by a
 * close thunder strike. Only the sprite inside the player group moves (the game logic position stays on its tile).
 */
export class WeatherMotion {
  /** Reversed gravity: current float height added to the player, and its bobbing clock. */
  private floatOffset = 0;
  private floatTime = 0;
  /** Earthquake: time until the next quake, current quake age (-1 = calm), length, power, and the camera
   * offset applied this frame (removed before the next one). */
  private quakeTimer = 3;
  private quakeAge = -1;
  private quakeLength = 0;
  private quakePower = 0;
  private readonly shakeOffset = new THREE.Vector3();
  /** Imminent eruption: builds from 0 to 1 (the weather raises it), the next quake is then the big one. */
  eruptionTension = 0;
  /** Player caught by the tornado: flight time (-1 = on the ground), cooldown before being caught again,
   * the sprite resting height and the spin angle. */
  private flightTime = -1;
  private flightCooldown = 0;
  private flightBaseY = 0;
  private flightSpin = 0;
  /** Height the camera was raised by to follow the flying player (removed again on landing). */
  private cameraLift = 0;

  constructor(
    private readonly game: Game,
    private readonly audio: WeatherAudio,
    private readonly tornado: TornadoHelper,
    private readonly geysers: GeyserHelper
  ) {}

  /** True while a tornado or a geyser carries the player away (the game freezes their moves). */
  get flying(): boolean {
    return this.flightTime >= 0;
  }

  /** The earthquake shake of the last frame removed (first thing each frame: the camera target must not shake). */
  removeShake(): void {
    this.game.camera.position.sub(this.shakeOffset);
    this.shakeOffset.set(0, 0, 0);
  }

  /** A thunder strike landed this far from the player: right next to them, a short sharp shake. */
  strikeJolt(distance: number): void {
    if (distance < STRIKE_JOLT_DISTANCE && this.quakeAge < 0) {
      this.quakeAge = 0;
      this.quakeLength = STRIKE_JOLT_LENGTH;
      this.quakePower = 0.4 + 0.6 * (1 - distance / STRIKE_JOLT_DISTANCE);
    }
  }

  /**
   * Reversed gravity: the player floats above the ground, slowly bobbing and swaying. Relative offset (the previous
   * one is removed first) so it never drifts, and left out while thrown in the air by a tornado / geyser.
   */
  updateFloat(dt: number, level: number) {
    const plane = this.game.mapHelper?.scenePlayer?.mesh?.children[0];
    if (!plane) {
      return;
    }
    plane.position.y -= this.floatOffset;
    this.floatOffset = 0;
    if (level < 0.01 || this.flightTime >= 0) {
      plane.rotation.z = 0;
      return;
    }
    this.floatTime += dt;
    this.floatOffset =
      level *
      (FLOAT_HEIGHT + FLOAT_BOB * Math.sin(this.floatTime * FLOAT_SPEED));
    plane.position.y += this.floatOffset;
    plane.rotation.z =
      level * FLOAT_SWAY * Math.sin(this.floatTime * FLOAT_SPEED * 0.7);
  }

  /** Tornado / geyser: a player walking into it is lifted, spinning on themselves, then falls back down. */
  updateFlight(dt: number) {
    const plane = this.game.mapHelper?.scenePlayer?.mesh?.children[0];
    if (!plane) {
      return;
    }
    this.flightCooldown = Math.max(0, this.flightCooldown - dt);
    if (this.flightTime < 0) {
      const player = playerPosition(this.game);
      const dist = Math.hypot(
        this.tornado.position.x - player.x,
        this.tornado.position.z - player.z
      );
      // Thrown by an erupting geyser too
      const geyser = this.geysers.nearestErupting(player.x, player.z);
      const onGeyser = !!geyser && geyser.distance < GEYSER_CATCH;
      if (
        ((this.tornado.strength > 0.8 && dist < TORNADO_CATCH) || onGeyser) &&
        !this.flightCooldown
      ) {
        this.flightTime = 0;
        this.flightBaseY = plane.position.y;
        this.flightSpin = 0;
      }
      return;
    }
    this.flightTime += dt;
    const t = this.flightTime / FLIGHT_TIME;
    if (t >= 1) {
      plane.position.y = this.flightBaseY;
      plane.rotation.y = 0;
      this.liftCamera(0);
      this.flightTime = -1;
      this.flightCooldown = FLIGHT_COOLDOWN;
      this.audio.thud();
      return;
    }
    // Up fast and slowing (60% of the time), then falling faster and faster, a little bounce at the end
    const up = 0.6;
    const lift =
      t < up
        ? 1 - Math.pow(1 - t / up, 2)
        : 1 - Math.pow((t - up) / (1 - up), 2);
    const bounce =
      t > 0.93 ? Math.sin(((t - 0.93) / 0.07) * Math.PI) * 0.05 : 0;
    plane.position.y =
      this.flightBaseY + FLIGHT_HEIGHT * Math.max(lift, bounce);
    // The camera follows the player up (a bit less, so the rise is still felt on screen)
    this.liftCamera(FLIGHT_HEIGHT * lift * FLIGHT_CAMERA_FOLLOW);
    // Spinning on themselves: fast in the air, slowing to land facing the camera again
    const speed = FLIGHT_SPIN * Math.sin(Math.PI * Math.min(t / 0.9, 1));
    this.flightSpin += speed * dt;
    plane.rotation.y =
      t < 0.9
        ? this.flightSpin
        : (this.flightSpin * (1 - (t - 0.9) / 0.1)) % (Math.PI * 2);
  }

  /**
   * Earthquake: now and then a quake of a few seconds (rising, then dying out); the camera shakes by an
   * irregular offset (sum of fast sines of unrelated frequencies). @returns the current quake strength 0..1
   */
  updateQuake(dt: number, quake: number): number {
    if (quake < 0.05 && this.quakeAge < 0) {
      return 0;
    }
    if (this.quakeAge < 0) {
      this.quakeTimer -= dt * quake;
      if (this.quakeTimer > 0) {
        return 0;
      }
      this.quakeTimer = THREE.MathUtils.randFloat(
        QUAKE_INTERVAL[0],
        QUAKE_INTERVAL[1]
      );
      this.quakeAge = 0;
      this.quakeLength = THREE.MathUtils.randFloat(
        QUAKE_LENGTH[0],
        QUAKE_LENGTH[1]
      );
      this.quakePower = THREE.MathUtils.randFloat(0.5, 1);
      if (this.eruptionTension >= 1) {
        // The big one: longer, stronger, then the tension starts building again
        this.quakeLength = ERUPTION_QUAKE_LENGTH;
        this.quakePower = ERUPTION_QUAKE_POWER;
        this.eruptionTension = 0;
      }
    }
    this.quakeAge += dt;
    const t = this.quakeAge / this.quakeLength;
    if (t >= 1) {
      this.quakeAge = -1;
      return 0;
    }
    // Quick rise, long tail, with jolts
    const envelope =
      Math.pow(Math.sin(Math.PI * Math.pow(t, 0.6)), 0.8) * this.quakePower;
    const jolt =
      0.75 +
      0.25 * Math.sin(this.quakeAge * 7.3) * Math.sin(this.quakeAge * 2.1);
    const s = envelope * jolt;
    const a = this.quakeAge;
    this.shakeOffset.set(
      (Math.sin(a * 31) * 0.6 + Math.sin(a * 53 + 1) * 0.4) *
        SHAKE_AMPLITUDE *
        s,
      (Math.sin(a * 41 + 2) * 0.5 + Math.sin(a * 67) * 0.5) *
        SHAKE_AMPLITUDE *
        0.5 *
        s,
      (Math.sin(a * 37 + 3) * 0.6 + Math.sin(a * 59 + 2) * 0.4) *
        SHAKE_AMPLITUDE *
        s
    );
    this.game.camera.position.add(this.shakeOffset);
    return s;
  }

  /** Raises the camera by `height` above its normal position (relative: the game keeps moving it on the ground). */
  private liftCamera(height: number) {
    const camera = this.game.camera;
    camera.position.y += height - this.cameraLift;
    this.cameraLift = height;
    this.game.mapHelper?.updateCameraAim();
  }
}
