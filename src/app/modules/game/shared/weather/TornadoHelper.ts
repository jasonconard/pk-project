import * as THREE from 'three';
import { LEAF_PALETTES, makeLeafTexture } from './LeafHelper';
import { registerUnlitMaterial } from './weather-shader';

/** Funnel: dust puffs, height, radius at the bottom / top (world units), turning speed (rad / s). */
const PUFFS = 650;
const HEIGHT = 260;
const RADIUS = [7, 70] as const;
const SPIN = 2.2;
/** Puff size at the bottom / top, colors (dusty grey-brown). */
const PUFF_SIZE = [10, 46] as const;
const PUFF_COLORS = [0xd8d0c4, 0xc0b8ac, 0xece4d8, 0xa8a094];
/** Debris (leaves, bits) whirling around the base: count, orbit radius, max height. */
const DEBRIS = 160;
const DEBRIS_RADIUS = [10, 45] as const;
const DEBRIS_HEIGHT = 90;
/** Base dust ring. */
const RING_PUFFS = 60;
/**
 * The tornado travels on the map (world positions): it appears some distance from the player, wanders
 * (speed in world units / s, turning speed in rad / s), and is pulled back when it goes too far from the player.
 */
const APPEAR_DISTANCE = [110, 200] as const;
const TRAVEL_SPEED = 16;
const TURN_SPEED = 0.5;
const LEASH = 240;
/** Further than this from the player (teleport...), it vanishes and appears again near them. */
const LOST_DISTANCE = 600;

function makePuffTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,0.9)');
  g.addColorStop(0.5, 'rgba(255,255,255,0.45)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Tornado: a funnel of dust turning fast (narrow at the ground, wide at the top), a dust ring at its base,
 * leaves and debris sucked in and whirling around. It travels slowly across the area.
 */
export class TornadoHelper {
  private readonly funnel: THREE.InstancedMesh;
  private readonly debris: THREE.InstancedMesh;
  private readonly puffs = Array.from({ length: PUFFS + RING_PUFFS }, (_, i) => ({
    h: i < PUFFS ? Math.pow(Math.random(), 0.8) : 0,
    angle: Math.random() * Math.PI * 2,
    jitter: Math.random(),
    ring: i >= PUFFS,
  }));
  private heading = Math.random() * Math.PI * 2;
  private placed = false;
  private readonly bits = Array.from({ length: DEBRIS }, () => ({
    angle: Math.random() * Math.PI * 2,
    radius: THREE.MathUtils.randFloat(DEBRIS_RADIUS[0], DEBRIS_RADIUS[1]),
    h: Math.random(),
    climb: THREE.MathUtils.randFloat(0.08, 0.25),
    tumble: Math.random() * 10,
    size: THREE.MathUtils.randFloat(2.5, 4.5),
  }));
  private time = Math.random() * 100;
  private presence = 0;
  /** Tornado position (world), public for the wind / sound. */
  readonly position = new THREE.Vector3();
  private readonly matrix = new THREE.Matrix4();
  private readonly pos = new THREE.Vector3();
  private readonly scale = new THREE.Vector3();
  private readonly quaternion = new THREE.Quaternion();
  private readonly euler = new THREE.Euler();
  private readonly color = new THREE.Color();

  constructor(scene: THREE.Scene) {
    const puffMaterial = registerUnlitMaterial(new THREE.MeshBasicMaterial({
      map: makePuffTexture(), transparent: true, opacity: 0.6, depthWrite: false,
    }));
    this.funnel = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), puffMaterial, PUFFS + RING_PUFFS);
    this.funnel.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.puffs.forEach((_, i) => this.funnel.setColorAt(i, this.color.set(PUFF_COLORS[i % PUFF_COLORS.length])));
    const debrisMaterial = registerUnlitMaterial(new THREE.MeshBasicMaterial({
      map: makeLeafTexture('autumn'), alphaTest: 0.5, side: THREE.DoubleSide,
    }));
    this.debris = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), debrisMaterial, DEBRIS);
    this.debris.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const palette = LEAF_PALETTES.autumn;
    this.bits.forEach((_, i) => this.debris.setColorAt(i, this.color.set(palette[i % palette.length])));
    for (const mesh of [this.funnel, this.debris]) {
      mesh.frustumCulled = false;
      mesh.visible = false;
      mesh.raycast = () => {};
      mesh.renderOrder = 11;
      scene.add(mesh);
    }
  }

  /** How strong the tornado is (0 = gone): appears / vanishes progressively. */
  get strength(): number {
    return this.presence;
  }

  /**
   * @param player where the player is (the tornado wanders around them)
   * @param groundY ground height under the tornado
   */
  update(dt: number, player: THREE.Vector3, intensity: number, camera: THREE.Camera, windX: number) {
    const lost = this.placed && Math.hypot(this.position.x - player.x, this.position.z - player.z) > LOST_DISTANCE;
    this.presence = THREE.MathUtils.clamp(this.presence + (intensity > 0.5 && !lost ? dt : -dt) * 0.25, 0, 1);
    if (this.presence <= 0) {
      this.funnel.visible = this.debris.visible = false;
      this.placed = false;
      return;
    }
    this.time += dt;
    const t = this.time;
    this.move(dt, player, windX);
    const p = this.presence;
    // Funnel: puffs spiralling, the column slightly bending and swaying
    this.puffs.forEach((puff, i) => {
      let x: number;
      let y: number;
      let z: number;
      let size: number;
      if (puff.ring) {
        const angle = puff.angle + t * SPIN * 0.8;
        const r = RADIUS[0] * 2.5 + puff.jitter * 18;
        x = Math.cos(angle) * r;
        z = Math.sin(angle) * r * 0.7;
        y = 2 + puff.jitter * 6;
        size = 14 + puff.jitter * 10;
      } else {
        const h = puff.h;
        const r = (RADIUS[0] + (RADIUS[1] - RADIUS[0]) * Math.pow(h, 1.6)) * (0.8 + 0.4 * puff.jitter);
        const angle = puff.angle + t * SPIN * (1.3 - 0.6 * h);
        const bend = Math.sin(t * 0.4 + h * 2.5) * 25 * h;
        x = Math.cos(angle) * r + bend;
        z = Math.sin(angle) * r * 0.7 + Math.cos(t * 0.3 + h * 2) * 12 * h;
        y = h * HEIGHT;
        size = THREE.MathUtils.lerp(PUFF_SIZE[0], PUFF_SIZE[1], h);
      }
      this.pos.set(this.position.x + x, this.position.y + y, this.position.z + z);
      this.scale.setScalar(size * p);
      this.matrix.compose(this.pos, camera.quaternion, this.scale);
      this.funnel.setMatrixAt(i, this.matrix);
    });
    // Debris: orbiting fast around the base, climbing then falling back in
    this.bits.forEach((b, i) => {
      const h = (b.h + t * b.climb) % 1;
      // Integrated: the speed depends on the height, which changes (multiplying the time by it would accelerate)
      b.angle += dt * SPIN * 1.4 * (1.2 - h * 0.5);
      const angle = b.angle;
      const r = b.radius * (1 - 0.5 * h);
      this.pos.set(
        this.position.x + Math.cos(angle) * r,
        this.position.y + 1 + Math.sin(Math.PI * h) * DEBRIS_HEIGHT,
        this.position.z + Math.sin(angle) * r * 0.7,
      );
      const tt = t * 5 + b.tumble;
      this.euler.set(tt, tt * 0.7, tt * 1.3);
      this.quaternion.setFromEuler(this.euler);
      this.scale.setScalar(b.size * p);
      this.matrix.compose(this.pos, this.quaternion, this.scale);
      this.debris.setMatrixAt(i, this.matrix);
    });
    this.funnel.visible = this.debris.visible = true;
    this.funnel.instanceMatrix.needsUpdate = true;
    this.debris.instanceMatrix.needsUpdate = true;
  }

  /** Wanders on the map, pushed a bit by the wind, kept within LEASH of the player. */
  private move(dt: number, player: THREE.Vector3, windX: number) {
    if (!this.placed) {
      const angle = THREE.MathUtils.randFloat(-Math.PI, 0); // ahead of the player (north) or on the sides
      const dist = THREE.MathUtils.randFloat(APPEAR_DISTANCE[0], APPEAR_DISTANCE[1]);
      this.position.set(player.x + Math.cos(angle) * dist, player.y, player.z + Math.sin(angle) * dist * 0.8);
      this.heading = Math.random() * Math.PI * 2;
      this.placed = true;
    }
    // Wandering: the heading slowly turns one way then the other
    this.heading += Math.sin(this.time * 0.23) * Math.sin(this.time * 0.11 + 2) * TURN_SPEED * 2 * dt;
    // Too far from the player: steer back towards them
    const dx = player.x - this.position.x;
    const dz = player.z - this.position.z;
    if (Math.hypot(dx, dz) > LEASH) {
      const back = Math.atan2(dz, dx);
      const diff = Math.atan2(Math.sin(back - this.heading), Math.cos(back - this.heading));
      this.heading += THREE.MathUtils.clamp(diff, -TURN_SPEED * dt, TURN_SPEED * dt);
    }
    this.position.x += (Math.cos(this.heading) * TRAVEL_SPEED + windX * 8) * dt;
    this.position.z += Math.sin(this.heading) * TRAVEL_SPEED * dt;
    this.position.y += (player.y - this.position.y) * Math.min(1, dt * 2);
  }
}
