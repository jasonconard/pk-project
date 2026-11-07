import * as THREE from 'three';
import { BEAM_GLSL, WEATHER_UNIFORMS } from './weather-shader';

/** Ray-march samples per pixel (cost grows linearly). */
const STEPS = 24;
/** Rays buffer resolution, relative to the screen (0.5 = half width and height = 1/4 of the pixels). */
const RAYS_RESOLUTION = 0.5;
/** Max air distance marched from the camera (world units). */
const MAX_DISTANCE = 600;
/** Peak brightness added by the rays. */
const RAYS_STRENGTH = 0.5;
/** Warm sunlight color of the rays. */
const RAYS_COLOR = new THREE.Color(1.0, 0.9, 0.65);

const FULLSCREEN_VERTEX = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

/**
 * For each pixel, walk along the view ray (camera -> visible surface) and sum the light scattered by the air.
 * Each sample checks the sun shadow map: air inside a building's shadow does not glow, which "blocks" the beams.
 * The beams themselves come from a noise constant along the sun direction (=> shafts parallel to the sunlight).
 */
const RAYS_FRAGMENT = /* glsl */`
uniform sampler2D tDepth;
uniform sampler2DShadow tShadow;
uniform mat4 uShadowMatrix;
uniform mat4 uProjInv;
uniform mat4 uCamWorld;
uniform vec3 uCamPos;
uniform vec3 uSunDir;
uniform float uTime;
varying vec2 vUv;

// Interleaved gradient noise: per-pixel jitter of the march start, hides banding
float ign(vec2 p) { return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }
` + BEAM_GLSL + /* glsl */`
void main() {
  // World position of the visible surface, rebuilt from the depth buffer
  float depth = texture(tDepth, vUv).r;
  vec4 view = uProjInv * vec4(vUv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
  view /= view.w;
  vec3 world = (uCamWorld * view).xyz;

  vec3 ray = world - uCamPos;
  float len = min(length(ray), ${MAX_DISTANCE.toFixed(1)});
  vec3 dir = normalize(ray);

  float stepLen = len / ${STEPS}.0;
  float t = stepLen * ign(gl_FragCoord.xy);
  float acc = 0.0;
  for (int i = 0; i < ${STEPS}; i++) {
    vec3 p = uCamPos + dir * t;

    vec4 sc = uShadowMatrix * vec4(p, 1.0);
    sc.xyz /= sc.w;
    float lit = 1.0;
    if (all(greaterThan(sc.xyz, vec3(0.0))) && all(lessThan(sc.xyz, vec3(1.0)))) {
      lit = texture(tShadow, vec3(sc.xy, sc.z - 0.001));
    }

    // Only the beams glow (no uniform haze, which washed out the whole scene)
    acc += lit * beamPattern(p, uSunDir, uTime);
    t += stepLen;
  }

  gl_FragColor = vec4(vec3(acc / ${STEPS}.0), 1.0);
}
`;

const COMPOSITE_FRAGMENT = /* glsl */`
uniform sampler2D tScene;
uniform sampler2D tRays;
uniform vec3 uColor;
uniform float uIntensity;
varying vec2 vUv;
void main() {
  vec3 scene = texture2D(tScene, vUv).rgb;
  float rays = texture2D(tRays, vUv).r;
  // Screen blend: lights dark areas, barely touches bright ones (no washed-out look)
  vec3 light = uColor * rays * uIntensity;
  gl_FragColor = vec4(scene + light * (1.0 - clamp(scene, 0.0, 1.0)), 1.0);
  #include <colorspace_fragment>
}
`;

/**
 * Volumetric sun rays blocked by buildings, done in 3 passes:
 * 1. scene -> texture (+ depth), 2. ray-march at reduced resolution, 3. composite on screen.
 * Only used while rays are visible: otherwise the game renders the scene directly (no extra cost).
 */
export class GodRaysPass {
  private readonly sceneTarget: THREE.WebGLRenderTarget;
  private readonly raysTarget: THREE.WebGLRenderTarget;
  private readonly raysMaterial: THREE.ShaderMaterial;
  private readonly compositeMaterial: THREE.ShaderMaterial;
  private readonly quad: THREE.Mesh;
  private readonly quadScene = new THREE.Scene();
  private readonly quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private readonly size = new THREE.Vector2();

  constructor() {
    this.sceneTarget = new THREE.WebGLRenderTarget(1, 1, {
      type: THREE.HalfFloatType, // linear colors: avoids banding in dark tones
      depthTexture: new THREE.DepthTexture(1, 1),
    });
    this.raysTarget = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType });

    this.raysMaterial = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERTEX,
      fragmentShader: RAYS_FRAGMENT,
      uniforms: {
        tDepth: { value: null },
        tShadow: { value: null },
        uShadowMatrix: { value: new THREE.Matrix4() },
        uProjInv: { value: new THREE.Matrix4() },
        uCamWorld: { value: new THREE.Matrix4() },
        uCamPos: { value: new THREE.Vector3() },
        uSunDir: { value: new THREE.Vector3(0, 1, 0) },
        uTime: { value: 0 },
      },
      depthTest: false,
      depthWrite: false,
    });

    this.compositeMaterial = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERTEX,
      fragmentShader: COMPOSITE_FRAGMENT,
      uniforms: {
        tScene: { value: this.sceneTarget.texture },
        tRays: { value: this.raysTarget.texture },
        uColor: { value: RAYS_COLOR },
        uIntensity: { value: 0 },
      },
      depthTest: false,
      depthWrite: false,
    });

    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.raysMaterial);
    this.quad.frustumCulled = false;
    this.quadScene.add(this.quad);
  }

  /**
   * Renders the scene with the rays on screen (or into `output`, for a following effect).
   * @returns false if the rays could not be rendered (no shadow map yet): render the scene normally then.
   */
  render(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    sun: THREE.DirectionalLight,
    sunDir: THREE.Vector3,
    intensity: number,
    output: THREE.WebGLRenderTarget | null = null,
  ): boolean {
    const shadowDepth = sun.shadow.map?.depthTexture;
    if (!shadowDepth) {
      return false;
    }
    this.resize(renderer);

    // 1. Scene (also updates the shadow map and its matrix)
    renderer.setRenderTarget(this.sceneTarget);
    renderer.render(scene, camera);

    // 2. Ray-march
    const u = this.raysMaterial.uniforms;
    u['tDepth'].value = this.sceneTarget.depthTexture;
    u['tShadow'].value = shadowDepth;
    u['uShadowMatrix'].value.copy(sun.shadow.matrix);
    u['uProjInv'].value.copy(camera.projectionMatrixInverse);
    u['uCamWorld'].value.copy(camera.matrixWorld);
    u['uCamPos'].value.setFromMatrixPosition(camera.matrixWorld);
    u['uSunDir'].value.copy(sunDir);
    u['uTime'].value = WEATHER_UNIFORMS.uBeamTime.value;
    this.quad.material = this.raysMaterial;
    renderer.setRenderTarget(this.raysTarget);
    renderer.render(this.quadScene, this.quadCamera);

    // 3. Composite on screen
    this.compositeMaterial.uniforms['uIntensity'].value = intensity * RAYS_STRENGTH;
    this.quad.material = this.compositeMaterial;
    renderer.setRenderTarget(output);
    renderer.render(this.quadScene, this.quadCamera);
    renderer.setRenderTarget(null);
    return true;
  }

  private resize(renderer: THREE.WebGLRenderer) {
    renderer.getDrawingBufferSize(this.size);
    const { x, y } = this.size;
    if (this.sceneTarget.width !== x || this.sceneTarget.height !== y) {
      this.sceneTarget.setSize(x, y);
      this.raysTarget.setSize(Math.max(1, Math.round(x * RAYS_RESOLUTION)), Math.max(1, Math.round(y * RAYS_RESOLUTION)));
    }
  }
}
