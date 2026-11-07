import * as THREE from 'three';

/** Max image offset of the shimmer (fraction of the screen height) at full heat. */
const SHIMMER_AMPLITUDE = 0.0022;
/** Size of the shimmer waves (higher = smaller waves) and their rising speed. */
const SHIMMER_SCALE = new THREE.Vector2(26, 60);
const SHIMMER_RISE_SPEED = 1.8;
/** Color washing at full `wash` (heatwave): desaturation and warm tint. */
const DESATURATION = 0.3;
const WARM_TINT = new THREE.Color(1.06, 1.0, 0.88);

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
uniform float uTime;
uniform float uAspect;
uniform vec2 uScale;
uniform vec3 uTint;
varying vec2 vUv;

float hhHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
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
  vec3 c = texture2D(tScene, vUv + offset).rgb;

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
   * @param heat shimmer strength, 0..1
   * @param wash washed-out warm colors, 0..1
   */
  render(renderer: THREE.WebGLRenderer, drawFrame: (target: THREE.WebGLRenderTarget) => void, heat: number, wash: number, time: number, invert = 0) {
    renderer.getDrawingBufferSize(this.size);
    if (this.sceneTarget.width !== this.size.x || this.sceneTarget.height !== this.size.y) {
      this.sceneTarget.setSize(this.size.x, this.size.y);
    }
    drawFrame(this.sceneTarget);

    const u = this.material.uniforms;
    u['uHeat'].value = heat;
    u['uWash'].value = wash;
    u['uInvert'].value = invert;
    u['uTime'].value = time;
    u['uAspect'].value = this.size.x / this.size.y;
    renderer.setRenderTarget(null);
    renderer.render(this.quadScene, this.quadCamera);
  }
}
