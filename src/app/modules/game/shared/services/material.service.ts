import { Service } from '@angular/core';
import * as THREE from 'three';
import { applyWeatherShader, registerUnlitMaterial } from '../weather/weather-shader';

/** Warm light color of the windows at night. */
const WINDOW_LIGHT_COLOR = new THREE.Color(0xffc56b);
/** Below this many glass pixels a texture is considered to have no window (avoids stray pixels). */
const MIN_WINDOW_PIXELS = 50;

/** Texels more transparent than this are discarded (no depth written). Low: fading opacities still work. */
const TRANSPARENT_ALPHA_TEST = 0.1;

@Service()
export class MaterialService {

  private static readonly windowMasks = new Map<string, THREE.Texture>();

  /** Window glass = saturated light blue in the pixel-art textures (walls, roofs and outlines are excluded). */
  private static isWindowGlass(r: number, g: number, b: number, a: number): boolean {
    return a > 0 && b >= 200 && b - r >= 60;
  }

  /**
   * Emissive mask of the windows of a texture: glass pixels in grayscale (keeps the glass shading), the rest black.
   * Built once per texture, filled when the image is loaded.
   */
  private static getWindowMask(link: string): THREE.Texture {
    const cached = MaterialService.windowMasks.get(link);
    if (cached) {
      return cached;
    }
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const mask = new THREE.CanvasTexture(canvas);
    mask.colorSpace = THREE.SRGBColorSpace;
    mask.magFilter = THREE.NearestFilter;
    mask.minFilter = THREE.LinearMipmapLinearFilter;
    MaterialService.windowMasks.set(link, mask);

    const img = new Image();
    img.addEventListener('load', () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, img.width, img.height);
      const px = data.data;
      let glassCount = 0;
      for (let i = 0; i < px.length; i += 4) {
        const glass = MaterialService.isWindowGlass(px[i], px[i + 1], px[i + 2], px[i + 3]);
        const v = glass ? Math.round(140 + 115 * px[i + 1] / 255) : 0;
        glassCount += glass ? 1 : 0;
        px[i] = px[i + 1] = px[i + 2] = v;
        px[i + 3] = 255;
      }
      if (glassCount < MIN_WINDOW_PIXELS) {
        px.fill(0);
        for (let i = 3; i < px.length; i += 4) { px[i] = 255; }
      }
      ctx.putImageData(data, 0, 0);
      // The GPU texture may already exist at the placeholder 1x1 size (fixed-size storage):
      // free it so it is re-allocated at the real size, otherwise the upload silently fails.
      mask.dispose();
      mask.needsUpdate = true;
    }, { once: true });
    img.src = link;
    return mask;
  }

  /** Windows light up at night (strength driven by the weather, see uWindowGlow). */
  private static addWindowLights<T extends THREE.MeshLambertMaterial | THREE.MeshPhongMaterial>(mat: T, link: string): T {
    mat.emissiveMap = MaterialService.getWindowMask(link);
    mat.emissive = WINDOW_LIGHT_COLOR;
    return mat;
  }

  private static loadTexture(link: string): THREE.Texture {
    const texture = new THREE.TextureLoader().load(link);
    // Since three r152 the renderer outputs sRGB: color textures must be flagged as sRGB
    // to keep the same rendering as before (pixel-art colors unchanged).
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    return texture;
  }

  public static getMaterialFromLink(link: string, transparent?: boolean): THREE.MeshBasicMaterial {
    const mat = new THREE.MeshBasicMaterial({
      map: MaterialService.loadTexture(link),
      transparent: !!transparent,
      // Empty texels don't write the depth: otherwise the whole quad (e.g. the player sprite) hides
      // the transparent effects drawn after it (particles, glows) as a rectangle
      alphaTest: transparent ? TRANSPARENT_ALPHA_TEST : 0,
    });
    registerUnlitMaterial(mat);
    return mat;
  }

  /** Material reacting to lights: needed to receive shadows. */
  public static getLambertMaterialFromLink(link: string, transparent?: boolean): THREE.MeshLambertMaterial {
    return applyWeatherShader(new THREE.MeshLambertMaterial({
      map: MaterialService.loadTexture(link),
      transparent: !!transparent
    }));
  }

  public static getSpriteMaterialFromLink(link: string): THREE.SpriteMaterial {
    const mat = new THREE.SpriteMaterial({
      map: MaterialService.loadTexture(link),
      alphaTest: TRANSPARENT_ALPHA_TEST,
    });
    registerUnlitMaterial(mat);
    return mat;
  }

  /**
   * Material with sun reflections.
   * @param shininess 0..1 strength of the reflections
   */
  public static getPhongMaterialFromLink(link: string, transparent?: boolean, shininess = 0.5): THREE.MeshPhongMaterial {
    return applyWeatherShader(new THREE.MeshPhongMaterial({
      map: MaterialService.loadTexture(link),
      transparent: !!transparent,
      specular: new THREE.Color().setScalar(shininess),
      shininess: 20 // low exponent = wide, visible sun reflections
    }));
  }

  /** Lit material for models: shiny (sun reflections) when `shininess` > 0, windows lit at night. */
  public static getModelMaterialFromLink(link: string, shininess?: number): THREE.MeshLambertMaterial | THREE.MeshPhongMaterial {
    const mat = shininess ? MaterialService.getPhongMaterialFromLink(link, false, shininess) : MaterialService.getLambertMaterialFromLink(link);
    return MaterialService.addWindowLights(mat, link);
  }
}
