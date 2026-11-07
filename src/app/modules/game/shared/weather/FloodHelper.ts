import * as THREE from 'three';

/** Water plane size (world units, follows the camera target), max level above the ground, rising / receding speed. */
const PLANE_SIZE = 1400;
const MAX_LEVEL = 4;
const RISE_SPEED = 0.12;
const RECEDE_SPEED = 0.2;
const WATER_COLOR = 0x3d6f8e;
const WATER_OPACITY = 0.62;

/** Small ripples normal map (tileable noise of bumps), drawn on a canvas. */
function makeRippleTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = 'rgb(128,128,255)';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 4 + Math.random() * 12;
    for (const [dx, dy] of [[0, 0], [size, 0], [-size, 0], [0, size], [0, -size]]) {
      const g = ctx.createRadialGradient(x + dx - r * 0.3, y + dy - r * 0.3, 0, x + dx, y + dy, r);
      g.addColorStop(0, 'rgba(170,170,255,0.5)');
      g.addColorStop(1, 'rgba(90,90,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(x + dx - r, y + dy - r, r * 2, r * 2);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(PLANE_SIZE / 40, PLANE_SIZE / 40);
  return texture;
}

/**
 * Flood: a water surface rising slowly above the ground (and receding afterwards), rippling, reflecting the sun.
 * Low areas get submerged; buildings stand in the water.
 */
export class FloodHelper {
  private readonly mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshPhongMaterial>;
  private readonly ripples: THREE.CanvasTexture;
  /** Current water height above the ground (world units). */
  level = 0;
  private groundY = NaN;
  private time = 0;

  constructor(scene: THREE.Scene) {
    this.ripples = makeRippleTexture();
    const material = new THREE.MeshPhongMaterial({
      color: WATER_COLOR, transparent: true, opacity: WATER_OPACITY, shininess: 90,
      specular: 0x9ab4c8, normalMap: this.ripples, normalScale: new THREE.Vector2(0.6, 0.6), depthWrite: false,
    });
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(PLANE_SIZE, PLANE_SIZE), material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;
    // Drawn first among the transparent objects: the sprites (player...) stand in front of it
    this.mesh.renderOrder = -1;
    this.mesh.visible = false;
    this.mesh.raycast = () => {};
    scene.add(this.mesh);
  }

  /** Share of the max level reached, 0..1. */
  get depth(): number {
    return this.level / MAX_LEVEL;
  }

  /**
   * @param flood 0..1 wanted water level (share of MAX_LEVEL)
   * @param groundY ground height at the camera target (taken when the water starts rising)
   */
  update(dt: number, target: THREE.Vector3, flood: number, groundY: number, windX: number) {
    const wanted = MAX_LEVEL * THREE.MathUtils.clamp(flood, 0, 1);
    this.level = this.level < wanted
      ? Math.min(wanted, this.level + dt * RISE_SPEED)
      : Math.max(wanted, this.level - dt * RECEDE_SPEED);
    if (this.level <= 0.01) {
      this.mesh.visible = false;
      this.groundY = NaN;
      return;
    }
    if (isNaN(this.groundY)) {
      this.groundY = groundY;
    }
    this.time += dt;
    this.mesh.visible = true;
    // Follows the camera target in whole ripple tiles (the ripples don't slide with the camera)
    const tile = 40;
    this.mesh.position.set(Math.round(target.x / tile) * tile, this.groundY + this.level, Math.round(target.z / tile) * tile);
    this.ripples.offset.set(this.time * (0.004 + 0.01 * windX), this.time * 0.006);
  }
}
