import * as THREE from 'three';

export interface Vec2 { x: number, y: number }
export interface Vec3 { x: number, y: number, z: number }
export interface VecBox2 { min: Vec2, max: Vec2 }
export interface VecBox3 { min: Vec3, max: Vec3 }

export function convertVec2(v: Vec2): THREE.Vector2 {
  return new THREE.Vector2(v.x, v.y);
}

export function convertVecBox2(v: VecBox2): THREE.Box2 {
  return new THREE.Box2(convertVec2(v.min), convertVec2(v.max));
}

export function convertVec3(v: Vec3): THREE.Vector3 {
  return new THREE.Vector3(v.x, v.y, v.z);
}

export function convertVecBox3(v: VecBox3): THREE.Box3 {
  return new THREE.Box3(convertVec3(v.min), convertVec3(v.max));
}
