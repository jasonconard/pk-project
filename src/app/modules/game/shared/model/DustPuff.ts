import * as THREE from 'three';
import { makeSmokeTexture } from '../weather/GlowParticles';
import { registerUnlitMaterial } from '../weather/weather-shader';

/** Puffs per landing, their life (s), how far they spread and how big they get (world units). */
const PUFFS = 7;
const LIFE = 0.45;
const SPREAD = 9;
const SIZE = [3, 8] as const;

interface Puff {
  sprite: THREE.Sprite;
  dir: THREE.Vector2;
}

/**
 * Landing dust: a few smoke puffs bursting sideways at the player's feet, growing and fading out
 * (eased: fast at first, then slowing down).
 */
export class DustPuff {
  private readonly puffs: Puff[] = [];
  private readonly origin = new THREE.Vector3();
  /** Start time of the current burst (ms, -1 = none): real time, the input loop rate varies. */
  private start = -1;

  constructor(scene: THREE.Scene) {
    const texture = makeSmokeTexture();
    for (let i = 0; i < PUFFS; i++) {
      // Tinted by the scene light like the other sprites (dim at night)
      const material = registerUnlitMaterial(new THREE.SpriteMaterial({
        map: texture, color: 0xe8dcc8, transparent: true, depthWrite: false,
      }));
      const sprite = new THREE.Sprite(material);
      sprite.visible = false;
      sprite.renderOrder = 11;
      scene.add(sprite);
      const angle = (i / PUFFS) * Math.PI * 2 + Math.random() * 0.4;
      this.puffs.push({ sprite, dir: new THREE.Vector2(Math.cos(angle), Math.sin(angle) * 0.6) });
    }
  }

  /** A new burst at the feet (world position). */
  spawn(at: THREE.Vector3) {
    this.origin.copy(at);
    this.start = performance.now();
  }

  update() {
    if (this.start < 0) {
      return;
    }
    const t = (performance.now() - this.start) / 1000 / LIFE;
    const done = t >= 1;
    const ease = 1 - (1 - Math.min(t, 1)) ** 2;
    for (const { sprite, dir } of this.puffs) {
      sprite.visible = !done;
      if (done) {
        continue;
      }
      sprite.position.set(
        this.origin.x + dir.x * SPREAD * ease,
        this.origin.y + 2 + 3 * ease,
        this.origin.z + dir.y * SPREAD * ease);
      const size = SIZE[0] + (SIZE[1] - SIZE[0]) * ease;
      sprite.scale.set(size, size, 1);
      (sprite.material as THREE.SpriteMaterial).opacity = 0.75 * (1 - t);
    }
    if (done) {
      this.start = -1;
    }
  }
}
