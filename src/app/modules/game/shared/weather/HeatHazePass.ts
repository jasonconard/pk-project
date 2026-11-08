import * as THREE from 'three';

/** Max image offset of the shimmer (fraction of the screen height) at full heat. */
const SHIMMER_AMPLITUDE = 0.0022;
/** Size of the shimmer waves (higher = smaller waves) and their rising speed. */
const SHIMMER_SCALE = new THREE.Vector2(26, 60);
const SHIMMER_RISE_SPEED = 1.8;
/** Color washing at full `wash` (heatwave): desaturation and warm tint. */
const DESATURATION = 0.3;
const WARM_TINT = new THREE.Color(1.06, 1.0, 0.88);

/** Old film: frames per second of the film (grain, scratches and flicker change at this rate). */
const FILM_FPS = 18;
/** Moonless night: lantern light radius (share of the screen height): full light inside, dark beyond. */
const LANTERN_INNER = 0.05;
const LANTERN_OUTER = 0.2;
/** Values of the post effects for one frame (0..1 strengths). */
export interface PostEffects {
  heat: number;
  wash: number;
  time: number;
  invert?: number;
  film?: number;
  mirage?: number;
  /** Moonless night: lantern strength, and where the player is on screen (uv). */
  lantern?: number;
  lanternAt?: THREE.Vector2;
}

const FULLSCREEN_VERTEX = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const HEAT_FRAGMENT = /* glsl */`
uniform sampler2D tScene;
uniform float uHeat;
uniform float uWash;
uniform float uInvert;
uniform float uFilm;
uniform float uMirage;
uniform float uLantern;
uniform vec2 uLanternAt;
uniform float uTime;
uniform float uAspect;
uniform vec2 uScale;
uniform vec3 uTint;
varying vec2 vUv;

// Hash without sine: precise on phone GPUs too (see wbHash in weather-shader.ts)
float hhHash(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float hhNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hhHash(i), hhHash(i + vec2(1.0, 0.0)), f.x),
             mix(hhHash(i + vec2(0.0, 1.0)), hhHash(i + vec2(1.0, 1.0)), f.x), f.y);
}

void main() {
  // Rising wavy distortion, stronger far away (top of the screen) where the air layer looks thicker
  vec2 p = vec2(vUv.x * uAspect, vUv.y) * uScale - vec2(0.0, uTime * ${SHIMMER_RISE_SPEED.toFixed(2)});
  vec2 wave = vec2(hhNoise(p), hhNoise(p + vec2(17.3, 5.1))) - 0.5;
  float strength = uHeat * mix(0.35, 1.0, vUv.y);
  vec2 offset = wave * ${SHIMMER_AMPLITUDE.toFixed(4)} * 2.0 * strength * vec2(1.0 / uAspect, 1.0);
  // Old film: the frame number, and the picture jumping a little in the projector gate
  float frame = floor(uTime * ${FILM_FPS.toFixed(1)});
  offset.y += uFilm * (hhHash(vec2(frame, 9.0)) - 0.5) * 0.003;
  vec3 c = texture2D(tScene, vUv + offset).rgb;
  // Mirage: the whole picture doubles a little, the copy slowly drifting (the fake water is on the ground, see
  // the surface shader)
  if (uMirage > 0.0) {
    vec2 ghost = vec2(sin(uTime * 0.7), sin(uTime * 0.5 + 1.0)) * vec2(0.006, 0.003);
    c = mix(c, texture2D(tScene, vUv + offset + ghost).rgb, 0.25 * uMirage);
  }

  // Washed-out, warm colors
  float luma = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c = mix(c, vec3(luma), ${DESATURATION.toFixed(2)} * uWash);
  c *= mix(vec3(1.0), uTint, uWash);

  // Inverted world: photographic negative, done in display (gamma) space so mid greys stay mid greys
  if (uInvert > 0.0) {
    vec3 shown = pow(max(c, 0.0), vec3(1.0 / 2.2));
    vec3 negative = pow(clamp(1.0 - shown, 0.0, 1.0), vec3(2.2));
    c = mix(c, negative, uInvert);
  }

  // Moonless night: pitch dark except a warm flickering lantern light around the player (an ellipse: the circle on
  // the ground seen in perspective). Very bright pixels (lit windows, glowing eyes) keep shining in the dark.
  if (uLantern > 0.0) {
    vec2 ld = (vUv - uLanternAt) * vec2(uAspect, 1.4);
    float flick = 1.0 + 0.05 * sin(uTime * 13.0) + 0.03 * sin(uTime * 29.0 + 1.0);
    float lit = 1.0 - smoothstep(${LANTERN_INNER.toFixed(3)}, ${LANTERN_OUTER.toFixed(3)} * flick, length(ld));
    float luma = dot(c, vec3(0.2126, 0.7152, 0.0722));
    float keep = smoothstep(0.25, 0.7, luma);
    vec3 dark = c * mix(0.035, 1.0, keep);
    vec3 lantern = c * vec3(1.5, 1.15, 0.75) * 1.6;
    c = mix(c, mix(dark, lantern, lit), uLantern);
  }
  // Old film: black and white with a hint of sepia, grain, flicker, scratches, dust specks and a vignette.
  // Done in display (gamma) space, like a real print.
  if (uFilm > 0.0) {
    float s = pow(max(dot(c, vec3(0.2126, 0.7152, 0.0722)), 0.0), 1.0 / 2.2);
    s = smoothstep(0.04, 0.96, s);
    s *= 0.9 + 0.1 * hhHash(vec2(frame, 3.1));
    s += (hhHash(gl_FragCoord.xy + frame * 17.0) - 0.5) * 0.14;
    for (int i = 0; i < 2; i++) {
      float fi = float(i);
      float sx = hhHash(vec2(frame, fi * 7.0 + 2.0));
      float on = step(0.55, hhHash(vec2(frame, fi * 13.0 + 1.0)));
      s += on * 0.22 * (1.0 - smoothstep(0.0, 0.0012, abs(vUv.x - sx)));
    }
    float speck = step(0.9993, hhHash(floor(vUv * vec2(uAspect, 1.0) * 220.0) + frame * 3.7));
    s -= speck * 0.5;
    vec2 d = vUv - 0.5;
    s *= 1.0 - dot(d, d) * 1.4;
    vec3 film = pow(clamp(s * vec3(1.06, 1.0, 0.88), 0.0, 1.0), vec3(2.2));
    c = mix(c, film, uFilm);
  }
  gl_FragColor = vec4(c, 1.0);
  #include <colorspace_fragment>
}
`;

/**
 * Heatwave: the frame is rendered to a texture (scene alone, or through another effect like the sun rays),
 * then drawn on screen through a rising shimmer and slightly washed-out warm colors.
 * Only used while it's hot (no cost otherwise).
 */
export class HeatHazePass {
  private readonly sceneTarget = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType });
  private readonly material: THREE.ShaderMaterial;
  private readonly quadScene = new THREE.Scene();
  private readonly quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private readonly size = new THREE.Vector2();

  constructor() {
    this.material = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERTEX,
      fragmentShader: HEAT_FRAGMENT,
      uniforms: {
        tScene: { value: this.sceneTarget.texture },
        uHeat: { value: 0 },
        uWash: { value: 0 },
        uInvert: { value: 0 },
        uFilm: { value: 0 },
        uMirage: { value: 0 },
        uLantern: { value: 0 },
        uLanternAt: { value: new THREE.Vector2(0.5, 0.5) },
        uTime: { value: 0 },
        uAspect: { value: 1 },
        uScale: { value: SHIMMER_SCALE },
        uTint: { value: new THREE.Vector3(WARM_TINT.r, WARM_TINT.g, WARM_TINT.b) },
      },
      depthTest: false,
      depthWrite: false,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);
    quad.frustumCulled = false;
    this.quadScene.add(quad);
  }

  /**
   * @param drawFrame renders the frame into the given target (the effect input)
   * @param fx strengths of the effects (heat shimmer, warm wash, negative, old film, mirage, lantern)
   */
  render(renderer: THREE.WebGLRenderer, drawFrame: (target: THREE.WebGLRenderTarget) => void, fx: PostEffects) {
    renderer.getDrawingBufferSize(this.size);
    if (this.sceneTarget.width !== this.size.x || this.sceneTarget.height !== this.size.y) {
      this.sceneTarget.setSize(this.size.x, this.size.y);
    }
    drawFrame(this.sceneTarget);

    const u = this.material.uniforms;
    u['uHeat'].value = fx.heat;
    u['uWash'].value = fx.wash;
    u['uInvert'].value = fx.invert ?? 0;
    u['uFilm'].value = fx.film ?? 0;
    u['uMirage'].value = fx.mirage ?? 0;
    u['uLantern'].value = fx.lantern ?? 0;
    if (fx.lanternAt) {
      u['uLanternAt'].value.copy(fx.lanternAt);
    }
    u['uTime'].value = fx.time;
    u['uAspect'].value = this.size.x / this.size.y;
    renderer.setRenderTarget(null);
    renderer.render(this.quadScene, this.quadCamera);
  }
}
