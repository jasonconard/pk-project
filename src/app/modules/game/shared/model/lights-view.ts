import * as THREE from "three";
import { currentParty } from "../../../database-editor/shared/party";
import { WEATHER_UNIFORMS } from "../weather/weather-shader";
import {
  isLightObject,
  isLightOn,
  LANTERN,
  LANTERN_KEY,
  LightSpec,
  lightKey,
} from "./light";
import { MapHelper } from "./MapHelper";
import { RENDER_DETAIL } from "./Quality";
import { TILE_SIZE } from "./Terrain";
import { findModel } from "./Zone";

/** The light sources are looked for again this often (frames of the game's steps): objects move, events switch. */
const COLLECT_EVERY = 20;
/** By day a light that isn't « night only » still shows a little. */
const DAY_SHARE = 0.3;
/** Pool brightness for strength 1, at full night. */
const POOL_STRENGTH = 0.2;
/** A real light's intensity for strength 1 (decay 1: divided by the distance). */
const REAL_INTENSITY = 45;
/** A source also lit by a real light keeps this share of its pool (no double light). */
const POOL_WITH_REAL = 0.6;
/** The lantern's height above the player's feet. */
const LANTERN_HEIGHT = 12;

interface Source {
  spec: LightSpec;
  key: string;
  /** Where it shines from; its pool lies on the ground at `ground`. */
  pos: THREE.Vector3;
  ground: number;
  /** A different flicker for each light. */
  seed: number;
  /** Follows the player (the lantern). */
  lantern?: boolean;
}

/** The pool's picture: white in the middle fading out in a few rings (pixel-art banding), shared by all pools. */
function poolTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const data = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const d = Math.hypot(x + 0.5 - size / 2, y + 0.5 - size / 2) / (size / 2);
      const k = d < 1 ? Math.round((1 - d * d) ** 2 * 6) / 6 : 0;
      const i = (y * size + x) * 4;
      data.data[i] = 255;
      data.data[i + 1] = 255;
      data.data[i + 2] = 255;
      data.data[i + 3] = Math.round(k * 255);
    }
  }
  ctx.putImageData(data, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

const poolGeometry = new THREE.PlaneGeometry(2, 2).rotateX(-Math.PI / 2);

/**
 * The lights of the map being played (docs/editeur/19-lumieres.md): each light lays a soft pool of its colour on
 * the ground, brighter as the night falls (the windows' glow), flickering for a flame; with a high graphics quality
 * the nearest ones (RENDER_DETAIL.realLights) are also real three.js lights. A fixed set of real lights (unused ones at
 * 0) so the materials are not compiled again when the player walks.
 */
export class LightsView {
  private readonly group = new THREE.Group();
  private readonly pools: THREE.Mesh[] = [];
  private readonly reals: THREE.PointLight[] = [];
  private texture?: THREE.Texture;
  private sources: Source[] = [];
  private tick = 0;
  private readonly color = new THREE.Color();
  private readonly world = new THREE.Vector3();

  constructor() {
    this.group.name = "lights";
  }

  /** Each step of the game: the sources looked for now and then, the pools and real lights set. */
  update(mapHelper: MapHelper, player: THREE.Object3D): void {
    const scene = mapHelper.originGame.scene;
    if (this.group.parent !== scene) {
      scene.add(this.group);
      this.sources = [];
      this.tick = 0;
    }
    if (this.tick++ % COLLECT_EVERY === 0) {
      this.sources = this.collect(mapHelper);
    }
    this.syncReals(scene);
    const glow = Math.min(1, WEATHER_UNIFORMS.uWindowGlow.value);
    const time = performance.now() / 1000;
    const lit: { source: Source; power: number }[] = [];
    for (const source of this.sources) {
      if (!isLightOn(source.spec, source.key)) {
        continue;
      }
      const night = source.spec.nightOnly ? glow : Math.max(glow, DAY_SHARE);
      if (night <= 0.02) {
        continue;
      }
      const flicker = source.spec.flicker
        ? 1 +
          0.12 * Math.sin(time * 13 + source.seed) +
          0.07 * Math.sin(time * 29 + source.seed * 3)
        : 1;
      if (source.lantern) {
        source.pos.set(
          player.position.x,
          player.position.y + LANTERN_HEIGHT,
          player.position.z
        );
        source.ground = player.position.y;
      }
      lit.push({ source, power: source.spec.strength * night * flicker });
    }
    // The real lights: the nearest to the player
    const nearest = lit
      .map((l) => ({
        ...l,
        distance: l.source.pos.distanceToSquared(player.position),
      }))
      .sort((a, b) => a.distance - b.distance);
    const withReal = new Set(
      nearest.slice(0, this.reals.length).map((l) => l.source)
    );
    this.reals.forEach((real, i) => {
      const l = nearest[i];
      if (!l) {
        real.intensity = 0;
        return;
      }
      real.position.copy(l.source.pos);
      real.color.set(l.source.spec.color);
      real.distance = l.source.spec.range * TILE_SIZE * 1.5;
      real.intensity = REAL_INTENSITY * l.power;
    });
    // The pools
    lit.forEach(({ source, power }, i) => {
      const pool = this.pool(i);
      const radius = source.spec.range * TILE_SIZE;
      pool.visible = true;
      pool.position.set(source.pos.x, source.ground + 0.3, source.pos.z);
      pool.scale.set(radius, 1, radius);
      (pool.material as THREE.MeshBasicMaterial).color
        .set(source.spec.color)
        .multiplyScalar(
          power * POOL_STRENGTH * (withReal.has(source) ? POOL_WITH_REAL : 1)
        );
    });
    for (let i = lit.length; i < this.pools.length; i++) {
      this.pools[i].visible = false;
    }
  }

  private pool(index: number): THREE.Mesh {
    let pool = this.pools[index];
    if (!pool) {
      this.texture ??= poolTexture();
      pool = new THREE.Mesh(
        poolGeometry,
        new THREE.MeshBasicMaterial({
          map: this.texture,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          color: this.color,
        })
      );
      pool.renderOrder = 1;
      this.pools.push(pool);
      this.group.add(pool);
    }
    return pool;
  }

  /** As many real lights as the quality allows (made again only when it changes). */
  private syncReals(scene: THREE.Scene): void {
    const wanted = RENDER_DETAIL.realLights;
    if (wanted === this.reals.length) {
      return;
    }
    for (const real of this.reals) {
      scene.remove(real);
      real.dispose();
    }
    this.reals.length = 0;
    for (let i = 0; i < wanted; i++) {
      const real = new THREE.PointLight(0xff_ff_ff, 0, 1, 1);
      this.reals.push(real);
      scene.add(real);
    }
  }

  /** The lights of the visible chunks: light objects, models' light points, the lantern. */
  private collect(mapHelper: MapHelper): Source[] {
    const map = mapHelper.sceneMap;
    const sources: Source[] = [];
    let seed = 0;
    for (const chunk of map.chunks) {
      if (!chunk.visible) {
        continue;
      }
      for (const building of chunk.buildings) {
        const key = lightKey(map.id, building.id);
        const base = mapHelper.buildingWorldPos(chunk, building);
        if (isLightObject(building)) {
          if (building.light) {
            sources.push({
              spec: building.light,
              key,
              pos: base.clone().setY(base.y + 8),
              ground: base.y,
              seed: seed++,
            });
          }
          continue;
        }
        const lights = findModel(building.modelId)?.lights;
        if (!lights?.length) {
          continue;
        }
        const mesh = mapHelper.meshes[chunk.id + "-" + building.id];
        for (const light of lights) {
          const pos = mesh
            ? mesh.localToWorld(
                this.world.set(light.pos.x, light.pos.y, light.pos.z)
              )
            : this.world
                .set(light.pos.x, light.pos.y, light.pos.z)
                .applyAxisAngle(
                  new THREE.Vector3(0, 1, 0),
                  (-(building.rot ?? 0) * Math.PI) / 2
                )
                .add(base);
          sources.push({
            spec: light,
            key,
            pos: pos.clone(),
            ground: base.y,
            seed: seed++,
          });
        }
      }
    }
    if (currentParty().lights?.[LANTERN_KEY]) {
      sources.push({
        spec: LANTERN,
        key: LANTERN_KEY,
        pos: new THREE.Vector3(),
        ground: 0,
        seed: seed++,
        lantern: true,
      });
    }
    return sources;
  }
}
