import * as THREE from 'three';

/** Curse wisps following the player: how many, orbit radius and height (world units), orbit speed (rad / s). */
const WISPS = 6;
const ORBIT_RADIUS = [26, 48] as const;
const ORBIT_HEIGHT = [8, 18] as const;
const ORBIT_SPEED = [0.25, 0.6] as const;
/** Glow size (world units) and colors (additive, above 1 to bloom at night). */
const CORE_SIZE = 5;
const HALO_SIZE = 20;
const CORE_COLOR = new THREE.Color(0.9, 0.6, 1.4);
const HALO_COLOR = new THREE.Color(0.45, 0.15, 0.8);
/** How fast the wisps catch up with the player (higher = tighter follow). */
const FOLLOW = 1.2;

function makeGlowTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.3, 'rgba(255,255,255,0.45)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Curse: a few violet will-o'-the-wisps slowly circling around the player, flickering, following them. */
export class WispHelper {
  private readonly mesh: THREE.InstancedMesh;
  private readonly wisps = Array.from({ length: WISPS }, () => ({
    angle: Math.random() * Math.PI * 2,
    speed: THREE.MathUtils.randFloat(ORBIT_SPEED[0], ORBIT_SPEED[1]) * (Math.random() < 0.5 ? -1 : 1),
    radius: THREE.MathUtils.randFloat(ORBIT_RADIUS[0], ORBIT_RADIUS[1]),
    height: THREE.MathUtils.randFloat(ORBIT_HEIGHT[0], ORBIT_HEIGHT[1]),
    phase: Math.random() * 10,
  }));
  /** Lagging center: the wisps drift after the player instead of being glued to them. */
  private readonly center = new THREE.Vector3(NaN, 0, 0);
  private time = 0;
  private readonly matrix = new THREE.Matrix4();
  private readonly position = new THREE.Vector3();
  private readonly scale = new THREE.Vector3();
  private readonly color = new THREE.Color();

  constructor(scene: THREE.Scene) {
    const material = new THREE.MeshBasicMaterial({
      map: makeGlowTexture(), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
    });
    this.mesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), material, WISPS * 2);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.setColorAt(0, this.color.set(0));
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 12;
    this.mesh.visible = false;
    this.mesh.raycast = () => {};
    scene.add(this.mesh);
  }

  /** @param intensity 0..1 */
  update(dt: number, player: THREE.Vector3, intensity: number, camera: THREE.Camera) {
    if (intensity <= 0.01) {
      this.mesh.visible = false;
      this.center.set(NaN, 0, 0);
      return;
    }
    this.time += dt;
    if (isNaN(this.center.x)) {
      this.center.copy(player);
    }
    this.center.lerp(player, 1 - Math.exp(-dt * FOLLOW));
    this.wisps.forEach((w, i) => {
      w.angle += w.speed * dt;
      const t = this.time + w.phase;
      const r = w.radius * (0.85 + 0.15 * Math.sin(t * 0.5));
      this.position.set(
        this.center.x + Math.cos(w.angle) * r,
        this.center.y + w.height + Math.sin(t * 1.3) * 2.5,
        this.center.z + Math.sin(w.angle) * r * 0.75,
      );
      // Uneven flicker, sometimes nearly going out
      const flicker = (0.65 + 0.35 * Math.sin(t * 7.3) * Math.sin(t * 2.1)) * (0.6 + 0.4 * Math.sin(t * 0.4));
      const k = intensity * Math.max(flicker, 0.1);
      this.matrix.compose(this.position, camera.quaternion, this.scale.setScalar(HALO_SIZE));
      this.mesh.setMatrixAt(i * 2, this.matrix);
      this.mesh.setColorAt(i * 2, this.color.copy(HALO_COLOR).multiplyScalar(k));
      this.matrix.compose(this.position, camera.quaternion, this.scale.setScalar(CORE_SIZE));
      this.mesh.setMatrixAt(i * 2 + 1, this.matrix);
      this.mesh.setColorAt(i * 2 + 1, this.color.copy(CORE_COLOR).multiplyScalar(k));
    });
    this.mesh.count = WISPS * 2;
    this.mesh.visible = true;
    this.mesh.instanceMatrix.needsUpdate = true;
    this.mesh.instanceColor!.needsUpdate = true;
  }
}
