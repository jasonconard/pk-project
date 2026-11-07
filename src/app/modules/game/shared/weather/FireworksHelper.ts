import * as THREE from 'three';

/**
 * Where bursts happen on screen (normalized device coordinates, -1..1): the camera looks down at the ground,
 * there is no sky, so the burst point is picked on screen and placed along that view ray at the burst height.
 */
const SCREEN_X = [-0.75, 0.75] as const;
const SCREEN_Y = [0.1, 0.7] as const;
/** Half width of the area, for the sound side. */
const SIDE_RANGE = 150;
/** Seconds between two launches at fireworks = 1, rocket climb time (s) and burst height above the ground. */
const LAUNCH_INTERVAL = [0.6, 2.2] as const;
const CLIMB_TIME = [1.1, 1.7] as const;
const BURST_HEIGHT = [40, 75] as const;
/** Sparks of a burst, their speed (world units / s), life (s), gravity and air drag. */
const SPARKS = [70, 130] as const;
const SPARK_SPEED = [42, 64] as const;
const SPARK_LIFE = [1.4, 2.4] as const;
const GRAVITY = 18;
const DRAG = 1.1;
const MAX_SPARKS = 1400;
/** Sizes (world units) and colors (additive, above 1 to bloom). */
const SPARK_SIZE = 2.6;
const ROCKET_SIZE = 2.6;
const COLORS = [0xff4040, 0x40ff70, 0x4aa0ff, 0xffd040, 0xc060ff, 0xffffff, 0xff70d0, 0x40f0ff];
const INTENSITY = 2.4;

function makeGlowTexture(): THREE.CanvasTexture {
  const size = 32;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.3, 'rgba(255,255,255,0.6)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

interface Rocket {
  from: THREE.Vector3;
  to: THREE.Vector3;
  age: number;
  climb: number;
}

interface Spark {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  color: THREE.Color;
  age: number;
  life: number;
  /** Twinkling sparks (crackling bursts) blink while fading. */
  twinkle: boolean;
}

/**
 * Fireworks: rockets climbing from the ground in front of the player, bursting into a sphere of colored
 * sparks that slow down in the air, fall and fade. Each burst lights the scene briefly (flash / flashColor)
 * and the callbacks let the sound follow (whistle on launch, bang on burst).
 */
export class FireworksHelper {
  private readonly mesh: THREE.InstancedMesh;
  private readonly rockets: Rocket[] = [];
  private readonly sparks: Spark[] = [];
  private timer = 0.5;
  /** Light of the latest bursts, 0..1, and its color. */
  flash = 0;
  readonly flashColor = new THREE.Color();
  /** Sound hooks: a rocket leaves (climb time, side -1..1), a burst (closeness 0..1, side). */
  onLaunch?: (climb: number, side: number) => void;
  onBurst?: (closeness: number, side: number) => void;

  private readonly matrix = new THREE.Matrix4();
  private readonly scale = new THREE.Vector3();
  private readonly color = new THREE.Color();

  constructor(scene: THREE.Scene) {
    const material = new THREE.MeshBasicMaterial({
      map: makeGlowTexture(), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
    });
    this.mesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), material, MAX_SPARKS);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.setColorAt(0, this.color.set(0));
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 12;
    this.mesh.visible = false;
    this.mesh.raycast = () => {};
    scene.add(this.mesh);
  }

  /** @param intensity 0..1, how often rockets are launched */
  update(dt: number, target: THREE.Vector3, intensity: number, camera: THREE.Camera) {
    this.flash = Math.max(0, this.flash - dt * 2.2);
    if (intensity > 0.05) {
      this.timer -= dt * intensity;
      if (this.timer <= 0) {
        this.timer = THREE.MathUtils.randFloat(LAUNCH_INTERVAL[0], LAUNCH_INTERVAL[1]);
        this.launch(target, camera);
      }
    }
    if (!this.rockets.length && !this.sparks.length) {
      this.mesh.visible = false;
      return;
    }

    let n = 0;
    // Rockets: climbing fast then slowing near the top (ease-out), a bright dot
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      r.age += dt;
      const t = Math.min(r.age / r.climb, 1);
      const eased = 1 - (1 - t) * (1 - t);
      const pos = this.matrix.identity();
      const x = r.from.x + (r.to.x - r.from.x) * t;
      const y = r.from.y + (r.to.y - r.from.y) * eased;
      const z = r.from.z + (r.to.z - r.from.z) * t;
      if (t >= 1) {
        this.burst(r.to, target);
        this.rockets.splice(i, 1);
        continue;
      }
      pos.compose(new THREE.Vector3(x, y, z), camera.quaternion, this.scale.setScalar(ROCKET_SIZE));
      this.mesh.setMatrixAt(n, pos);
      this.mesh.setColorAt(n++, this.color.setRGB(1.6, 1.3, 0.9));
    }
    // Sparks: velocity slowed by the air drag, pulled down by gravity, fading out
    const drag = Math.exp(-DRAG * dt);
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const s = this.sparks[i];
      s.age += dt;
      if (s.age >= s.life) {
        this.sparks.splice(i, 1);
        continue;
      }
      s.vel.multiplyScalar(drag);
      s.vel.y -= GRAVITY * dt;
      s.pos.addScaledVector(s.vel, dt);
      if (n >= MAX_SPARKS) {
        continue;
      }
      const k = 1 - s.age / s.life;
      const blink = s.twinkle && k < 0.6 ? (Math.random() < 0.5 ? 1 : 0.15) : 1;
      this.matrix.compose(s.pos, camera.quaternion, this.scale.setScalar(SPARK_SIZE * (0.5 + 0.5 * k)));
      this.mesh.setMatrixAt(n, this.matrix);
      this.mesh.setColorAt(n++, this.color.copy(s.color).multiplyScalar(INTENSITY * k * k * blink));
    }
    this.mesh.count = n;
    this.mesh.visible = n > 0;
    this.mesh.instanceMatrix.needsUpdate = true;
    this.mesh.instanceColor!.needsUpdate = true;
  }

  /**
   * A rocket towards a burst point that will be in view: a random point on screen, then along the camera ray
   * through it, the point at the burst height (ray: camera + d·dir, solve camera.y + d·dir.y = height).
   */
  private launch(target: THREE.Vector3, camera: THREE.Camera) {
    const height = target.y + THREE.MathUtils.randFloat(BURST_HEIGHT[0], BURST_HEIGHT[1]);
    const dir = new THREE.Vector3(
      THREE.MathUtils.randFloat(SCREEN_X[0], SCREEN_X[1]),
      THREE.MathUtils.randFloat(SCREEN_Y[0], SCREEN_Y[1]),
      0.5,
    ).unproject(camera).sub(camera.position).normalize();
    if (dir.y > -0.01) {
      return; // looking up: no ground under this point
    }
    const d = (height - camera.position.y) / dir.y;
    const to = camera.position.clone().addScaledVector(dir, d);
    const from = new THREE.Vector3(to.x + THREE.MathUtils.randFloatSpread(20), target.y, to.z + THREE.MathUtils.randFloatSpread(10));
    const climb = THREE.MathUtils.randFloat(CLIMB_TIME[0], CLIMB_TIME[1]);
    this.rockets.push({ from, to, age: 0, climb });
    this.onLaunch?.(climb, THREE.MathUtils.clamp((to.x - target.x) / SIDE_RANGE, -1, 1));
  }

  /** A sphere of sparks (random directions on the sphere), one or two colors, sometimes crackling. */
  private burst(at: THREE.Vector3, target: THREE.Vector3) {
    const count = THREE.MathUtils.randInt(SPARKS[0], SPARKS[1]);
    const c1 = new THREE.Color(COLORS[Math.floor(Math.random() * COLORS.length)]);
    const c2 = Math.random() < 0.4 ? new THREE.Color(COLORS[Math.floor(Math.random() * COLORS.length)]) : c1;
    const speed = THREE.MathUtils.randFloat(SPARK_SPEED[0], SPARK_SPEED[1]);
    const twinkle = Math.random() < 0.35;
    for (let i = 0; i < count && this.sparks.length < MAX_SPARKS; i++) {
      // Uniform direction on the sphere: z uniform in [-1, 1], angle uniform
      const u = Math.random() * 2 - 1;
      const a = Math.random() * Math.PI * 2;
      const r = Math.sqrt(1 - u * u);
      const dir = new THREE.Vector3(r * Math.cos(a), u, r * Math.sin(a));
      this.sparks.push({
        pos: at.clone(),
        vel: dir.multiplyScalar(speed * THREE.MathUtils.randFloat(0.85, 1.05)),
        color: i % 2 ? c2 : c1,
        age: 0,
        life: THREE.MathUtils.randFloat(SPARK_LIFE[0], SPARK_LIFE[1]),
        twinkle,
      });
    }
    // Light of the burst: the scene takes its color for a moment
    this.flashColor.copy(c1).lerp(c2, 0.5);
    this.flash = 1;
    const dist = Math.hypot(at.x - target.x, at.z - target.z);
    this.onBurst?.(THREE.MathUtils.clamp(1 - dist / 300, 0.2, 1), THREE.MathUtils.clamp((at.x - target.x) / SIDE_RANGE, -1, 1));
  }
}
