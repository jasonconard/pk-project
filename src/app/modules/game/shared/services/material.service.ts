import { Service } from '@angular/core';
import * as THREE from 'three';

@Service()
export class MaterialService {

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
    return new THREE.MeshBasicMaterial({
      map: MaterialService.loadTexture(link),
      transparent: !!transparent
    });
  }

  public static getSpriteMaterialFromLink(link: string): THREE.SpriteMaterial {
    return new THREE.SpriteMaterial({
      map: MaterialService.loadTexture(link)
    });
  }

  public static getPhongMaterialFromLink(link: string, transparent?: boolean): THREE.MeshPhongMaterial {
    return new THREE.MeshPhongMaterial({
      map: MaterialService.loadTexture(link),
      transparent: !!transparent
    });
  }
}
