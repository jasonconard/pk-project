import * as THREE from 'three';
import { registerUnlitMaterial, UNLIT_MATERIALS } from './weather-shader';

/** Ghosts at once, how far from the player they appear (world units), and how close the player can get. */
const MAX_GHOSTS = 4;
const SPAWN_DISTANCE = [70, 150] as const;
const VANISH_DISTANCE = 50;
/** Life (s), fade in / out speed (per s), height and size (world units). */
const LIFE = [8, 18] as const;
const FADE_IN = 0.35;
const FADE_OUT = 1.5;
const HEIGHT = 4;
const SIZE = [24, 34] as const;
const OPACITY = 0.7;

/** A vague human silhouette made of mist (head, shoulders, a body fading into a trail). */
function makeGhostTexture(): THREE.CanvasTexture {
  const w = 64;
  const h = 128;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  ctx.filter = 'blur(5px)';
  const body = ctx.createLinearGradient(0, 30, 0, h);
  body.addColorStop(0, 'rgba(255,255,255,0.95)');
  body.addColorStop(0.6, 'rgba(255,255,255,0.6)');
  body.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.moveTo(w * 0.22, 42);
  ctx.quadraticCurveTo(w * 0.5, 30, w * 0.78, 42);
  ctx.quadraticCurveTo(w * 0.86, 80, w * 0.62, h - 6);
  ctx.quadraticCurveTo(w * 0.5, h - 20, w * 0.38, h - 6);
  ctx.quadraticCurveTo(w * 0.14, 80, w * 0.22, 42);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.beginPath();
  ctx.ellipse(w * 0.5, 24, 11, 13, 0, 0, Math.PI * 2);
  ctx.fill();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

interface Ghost {
  sprite: THREE.Sprite;
  age: number;
  life: number;
  alpha: number;
  phase: number;
  vanishing: boolean;
}

/**
 * Haunted mist: misty silhouettes standing in the fog at some distance, swaying, that dissolve
 * when the player comes close (or after a while), then form again somewhere else.
 */
export class GhostHelper {
  private readonly ghosts: Ghost[] = [];
  private readonly texture = makeGhostTexture();
  private spawnTimer = 1;
  private time = 0;
  /** Closeness of the nearest visible ghost, 0..1 (sounds). */
  nearest = 0;

  constructor(private readonly scene: THREE.Scene) {
  }

  update(dt: number, player: THREE.Vector3, intensity: number) {
    this.time += dt;
    this.nearest = 0;
    if (intensity > 0.5) {
      this.spawnTimer -= dt;
      if (this.spawnTimer <= 0 && this.ghosts.length < MAX_GHOSTS) {
        this.spawnTimer = THREE.MathUtils.randFloat(2, 6);
        this.ghosts.push(this.newGhost(player));
      }
    }
    for (let i = this.ghosts.length - 1; i >= 0; i--) {
      const g = this.ghosts[i];
      g.age += dt;
      const dist = Math.hypot(g.sprite.position.x - player.x, g.sprite.position.z - player.z);
      if (dist < VANISH_DISTANCE || g.age > g.life || intensity <= 0.5) {
        g.vanishing = true;
      }
      g.alpha = g.vanishing ? g.alpha - dt * FADE_OUT : Math.min(1, g.alpha + dt * FADE_IN);
      if (g.alpha <= 0) {
        this.scene.remove(g.sprite);
        UNLIT_MATERIALS.delete(g.sprite.material);
        g.sprite.material.dispose();
        this.ghosts.splice(i, 1);
        continue;
      }
      const t = this.time + g.phase;
      g.sprite.material.opacity = OPACITY * g.alpha * (0.8 + 0.2 * Math.sin(t * 1.3));
      g.sprite.position.x += Math.sin(t * 0.4) * 1.5 * dt;
      g.sprite.material.rotation = Math.sin(t * 0.6) * 0.06;
      // Dissolving: stretches up and thins out
      const stretch = g.vanishing ? 1 + (1 - g.alpha) * 0.6 : 1;
      const base = g.sprite.userData['size'] as number;
      g.sprite.scale.set(base * 0.5 / stretch, base * stretch, 1);
      this.nearest = Math.max(this.nearest, g.alpha * Math.max(0, 1 - dist / 160));
    }
  }

  private newGhost(player: THREE.Vector3): Ghost {
    const material = registerUnlitMaterial(new THREE.SpriteMaterial({
      map: this.texture, transparent: true, opacity: 0, depthWrite: false, color: 0xffffff, fog: false,
    }));
    const sprite = new THREE.Sprite(material);
    // In view (the camera looks north, -z): on the sides or ahead, rarely behind
    const angle = THREE.MathUtils.randFloat(-Math.PI * 1.1, Math.PI * 0.1);
    const dist = THREE.MathUtils.randFloat(SPAWN_DISTANCE[0], SPAWN_DISTANCE[1]);
    const size = THREE.MathUtils.randFloat(SIZE[0], SIZE[1]);
    sprite.userData['size'] = size;
    sprite.center.set(0.5, 0);
    sprite.position.set(player.x + Math.cos(angle) * dist, player.y + HEIGHT, player.z + Math.sin(angle) * dist * 0.7);
    sprite.renderOrder = 11;
    sprite.raycast = () => {};
    this.scene.add(sprite);
    return {
      sprite, age: 0, alpha: 0, phase: Math.random() * 10, vanishing: false,
      life: THREE.MathUtils.randFloat(LIFE[0], LIFE[1]),
    };
  }
}
