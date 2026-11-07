import * as THREE from 'three';

/** Glow strength at full night. */
const BLOOM_STRENGTH = 1.6;
/** Resolution of the bright-pass buffer (relative to the screen). */
const BRIGHT_RESOLUTION = 0.5;
/**
 * Brightest color channel from which a pixel glows (linear). At night the lit windows are by far
 * the brightest pixels (~0.6-1), walls and ground stay under ~0.35.
 */
const BLOOM_THRESHOLD = 0.5;
/** Soft transition above the threshold (avoids hard edges in the glow). */
const BLOOM_KNEE = 0.2;
/** Resolution of the blur buffers (relative to the screen): lower = wider and cheaper glow. */
const BLUR_RESOLUTION = 0.25;
/** Blur iterations (each one = horizontal + vertical), with a growing radius. */
const BLUR_RADII = [1, 2, 3];

const FULLSCREEN_VERTEX = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

// Keeps only the bright pixels (the lit windows at night)
const BRIGHT_FRAGMENT = /* glsl */`
uniform sampler2D tScene;
uniform float uThreshold;
uniform float uKnee;
varying vec2 vUv;
void main() {
  vec3 c = texture2D(tScene, vUv).rgb;
  float brightest = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + uKnee, brightest), 1.0);
}
`;

// 9-tap separable gaussian (linear sampling)
const BLUR_FRAGMENT = /* glsl */`
uniform sampler2D tInput;
uniform vec2 uStep;
varying vec2 vUv;
void main() {
  vec3 c = texture2D(tInput, vUv).rgb * 0.2270270270;
  c += (texture2D(tInput, vUv + uStep * 1.3846153846).rgb + texture2D(tInput, vUv - uStep * 1.3846153846).rgb) * 0.3162162162;
  c += (texture2D(tInput, vUv + uStep * 3.2307692308).rgb + texture2D(tInput, vUv - uStep * 3.2307692308).rgb) * 0.0702702703;
  gl_FragColor = vec4(c, 1.0);
}
`;

const COMPOSITE_FRAGMENT = /* glsl */`
uniform sampler2D tScene;
uniform sampler2D tBloom;
uniform float uStrength;
varying vec2 vUv;
void main() {
  vec3 scene = texture2D(tScene, vUv).rgb;
  vec3 bloom = texture2D(tBloom, vUv).rgb;
  gl_FragColor = vec4(scene + bloom * uStrength, 1.0);
  #include <colorspace_fragment>
}
`;

/**
 * Night bloom: the brightest pixels (the lit windows) glow.
 * 1. scene -> texture, 2. bright pass at reduced resolution, 3. blur, 4. composite on screen.
 * The scene is rendered only once. Only used while windows are lit: otherwise the game renders
 * the scene directly (no extra cost).
 */
export class BloomPass {
  private readonly sceneTarget = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType });
  private readonly brightTarget = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, depthBuffer: false });
  private readonly blurTargets = [
    new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, depthBuffer: false }),
    new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, depthBuffer: false }),
  ];
  private readonly brightMaterial: THREE.ShaderMaterial;
  private readonly blurMaterial: THREE.ShaderMaterial;
  private readonly compositeMaterial: THREE.ShaderMaterial;
  private readonly quad: THREE.Mesh;
  private readonly quadScene = new THREE.Scene();
  private readonly quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private readonly size = new THREE.Vector2();

  constructor() {
    this.brightMaterial = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERTEX,
      fragmentShader: BRIGHT_FRAGMENT,
      uniforms: {
        tScene: { value: this.sceneTarget.texture },
        uThreshold: { value: BLOOM_THRESHOLD },
        uKnee: { value: BLOOM_KNEE },
      },
      depthTest: false,
      depthWrite: false,
    });
    this.blurMaterial = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERTEX,
      fragmentShader: BLUR_FRAGMENT,
      uniforms: { tInput: { value: null }, uStep: { value: new THREE.Vector2() } },
      depthTest: false,
      depthWrite: false,
    });
    this.compositeMaterial = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERTEX,
      fragmentShader: COMPOSITE_FRAGMENT,
      uniforms: {
        tScene: { value: this.sceneTarget.texture },
        tBloom: { value: this.blurTargets[1].texture },
        uStrength: { value: 0 },
      },
      depthTest: false,
      depthWrite: false,
    });
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.compositeMaterial);
    this.quad.frustumCulled = false;
    this.quadScene.add(this.quad);
  }

  /** Renders the scene with the window glow on screen (or into `output`, for a following effect). */
  render(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera, intensity: number,
         output: THREE.WebGLRenderTarget | null = null) {
    this.resize(renderer);

    // 1. Normal scene
    renderer.setRenderTarget(this.sceneTarget);
    renderer.render(scene, camera);

    // 2. Bright pass
    this.quad.material = this.brightMaterial;
    renderer.setRenderTarget(this.brightTarget);
    renderer.render(this.quadScene, this.quadCamera);

    // 3. Blur (ping-pong between the two blur buffers)
    this.quad.material = this.blurMaterial;
    const u = this.blurMaterial.uniforms;
    const texel = new THREE.Vector2(1 / this.blurTargets[0].width, 1 / this.blurTargets[0].height);
    let input: THREE.Texture = this.brightTarget.texture;
    for (const radius of BLUR_RADII) {
      u['tInput'].value = input;
      u['uStep'].value.set(texel.x * radius, 0);
      renderer.setRenderTarget(this.blurTargets[0]);
      renderer.render(this.quadScene, this.quadCamera);

      u['tInput'].value = this.blurTargets[0].texture;
      u['uStep'].value.set(0, texel.y * radius);
      renderer.setRenderTarget(this.blurTargets[1]);
      renderer.render(this.quadScene, this.quadCamera);
      input = this.blurTargets[1].texture;
    }

    // 4. Composite on screen
    this.quad.material = this.compositeMaterial;
    this.compositeMaterial.uniforms['uStrength'].value = intensity * BLOOM_STRENGTH;
    renderer.setRenderTarget(output);
    renderer.render(this.quadScene, this.quadCamera);
    renderer.setRenderTarget(null);
  }

  private resize(renderer: THREE.WebGLRenderer) {
    renderer.getDrawingBufferSize(this.size);
    const { x, y } = this.size;
    if (this.sceneTarget.width === x && this.sceneTarget.height === y) {
      return;
    }
    const scaled = (ratio: number) => [Math.max(1, Math.round(x * ratio)), Math.max(1, Math.round(y * ratio))] as const;
    this.sceneTarget.setSize(x, y);
    this.brightTarget.setSize(...scaled(BRIGHT_RESOLUTION));
    this.blurTargets.forEach(t => t.setSize(...scaled(BLUR_RESOLUTION)));
  }
}
