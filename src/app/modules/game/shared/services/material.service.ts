import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor() {
  }

  public static getMaterialFromLink(link: string, transparent?: boolean): THREE.MeshBasicMaterial {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(link);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;

    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: !!transparent
    });
  }

  public static getSpriteMaterialFromLink(link: string): THREE.SpriteMaterial {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(link);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;

    return new THREE.SpriteMaterial({
      map: texture
    });
  }

  public static getPhongMaterialFromLink(link: string, transparent?: boolean): THREE.MeshPhongMaterial {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(link);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;

    return new THREE.MeshPhongMaterial({
      map: texture,
      transparent: !!transparent
    });
  }
}
