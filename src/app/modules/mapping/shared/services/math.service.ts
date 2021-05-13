import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  constructor() {
  }

  public static getDist(a: THREE.Vector3, b: THREE.Vector3): number {
    const pX = Math.pow(a.x - b.x, 2);
    const pY = Math.pow(a.y - b.y, 2);
    const pZ = Math.pow(a.z - b.z, 2);
    return Math.sqrt(pX + pY + pZ);
  }
}
