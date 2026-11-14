import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ObjSide } from '../../game/shared/model/SceneMap';
import { BOX_FACES, BoxFace } from '../../game/shared/model/model-uv';
import { EditableModel, FaceTexture } from './EditableModel';

/** A face of the model under the pointer. */
export interface FacePick {
  partIndex: number;
  face: BoxFace;
  /** Pixel of the face under the pointer (column, row from the top left). */
  px: { x: number, y: number };
}

const BACKGROUND = 0x2a2b33;
const HIGHLIGHT = new THREE.Color(0x3a6ea5);

/**
 * 3D view of the edited model: camera turning around it (OrbitControls), 1-unit grid on the ground, simple
 * lights. Each face gets its own material showing its pixel grid (CanvasTexture), so it can be highlighted alone.
 */
export class ModelEditorScene {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(40, 1, 0.5, 5000);
  private readonly controls: OrbitControls;
  private readonly resizeObserver: ResizeObserver;
  private model: EditableModel | null = null;
  private group = new THREE.Group();
  /** One canvas texture per face texture (linked faces show the same one). */
  private readonly textures = new Map<string, THREE.CanvasTexture>();
  private highlighted: THREE.MeshLambertMaterial | null = null;
  private readonly raycaster = new THREE.Raycaster();

  constructor(private readonly host: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(this.renderer.domElement);

    this.scene.background = new THREE.Color(BACKGROUND);
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x666677, 1.6));
    const sun = new THREE.DirectionalLight(0xffffff, 1.6);
    sun.position.set(60, 120, 90);
    this.scene.add(sun);
    const grid = new THREE.GridHelper(160, 160, 0x55576a, 0x3a3c48);
    this.scene.add(grid, this.group);

    this.camera.position.set(80, 70, 110);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(host);
    this.resize();
    this.renderer.setAnimationLoop(() => {
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    });
  }

  get canvas(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  setModel(model: EditableModel) {
    this.clear();
    this.model = model;
    Object.entries(model.textures).forEach(([id, tex]) => this.textures.set(id, this.makeTexture(tex)));

    model.parts.forEach((part, partIndex) => {
      const materialOf = (face: BoxFace) => {
        const texId = part.faces[face];
        const mat = new THREE.MeshLambertMaterial({
          map: texId ? this.textures.get(texId) : null,
          side: part.side === ObjSide.BOTH ? THREE.DoubleSide : part.side === ObjSide.BACK ? THREE.BackSide : THREE.FrontSide,
          depthWrite: !!part.depthWrite,
          depthTest: !!part.depthTest,
          alphaTest: 0.5,
        });
        return mat;
      };
      const mesh = part.kind === 'box'
        ? new THREE.Mesh(new THREE.BoxGeometry(part.size.x, part.size.y, part.size.z), BOX_FACES.map(materialOf))
        : new THREE.Mesh(new THREE.PlaneGeometry(part.size.x, part.size.y), [materialOf('front')]);
      if (part.kind === 'plane') {
        mesh.geometry.addGroup(0, Infinity, 0);
      }
      mesh.position.set(part.pos.x, part.pos.y, part.pos.z);
      mesh.rotation.set(part.rot.x, part.rot.y, part.rot.z);
      mesh.userData['partIndex'] = partIndex;
      this.group.add(mesh);
    });
    this.frame();
  }

  /** Face (and pixel) at a point of the screen. */
  pick(clientX: number, clientY: number): FacePick | null {
    if (!this.model) {
      return null;
    }
    const rect = this.canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2((clientX - rect.left) / rect.width * 2 - 1, -(clientY - rect.top) / rect.height * 2 + 1);
    this.raycaster.setFromCamera(ndc, this.camera);
    for (const hit of this.raycaster.intersectObjects(this.group.children, false)) {
      const mesh = hit.object as THREE.Mesh;
      const partIndex = mesh.userData['partIndex'] as number;
      const part = this.model.parts[partIndex];
      const face = part.kind === 'box' ? BOX_FACES[hit.face!.materialIndex] : 'front';
      const texId = part.faces[face];
      const tex = texId ? this.model.textures[texId] : null;
      // Transparent pixels (cut-out leaves, flowers) let the pointer through, as they do not show
      if (!tex || !hit.uv) {
        continue;
      }
      const x = Math.min(tex.w - 1, Math.floor(hit.uv.x * tex.w));
      const y = Math.min(tex.h - 1, Math.floor((1 - hit.uv.y) * tex.h));
      if (tex.color[(y * tex.w + x) * 4 + 3] < 128) {
        continue;
      }
      return { partIndex, face, px: { x, y } };
    }
    return null;
  }

  /** Lights up one face (null: none). */
  highlight(partIndex: number | null, face: BoxFace | null) {
    this.highlighted?.emissive.setHex(0x000000);
    this.highlighted = null;
    if (partIndex === null || !face || !this.model) {
      return;
    }
    const mesh = this.group.children.find(c => c.userData['partIndex'] === partIndex) as THREE.Mesh | undefined;
    const part = this.model.parts[partIndex];
    const materials = mesh?.material as THREE.MeshLambertMaterial[] | undefined;
    const mat = materials?.[part.kind === 'box' ? BOX_FACES.indexOf(face) : 0];
    if (mat) {
      mat.emissive.copy(HIGHLIGHT);
      this.highlighted = mat;
    }
  }

  dispose() {
    this.renderer.setAnimationLoop(null);
    this.resizeObserver.disconnect();
    this.clear();
    this.controls.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private makeTexture(tex: FaceTexture): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = tex.w;
    canvas.height = tex.h;
    canvas.getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(tex.color), tex.w, tex.h), 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;
    return texture;
  }

  /** Camera looking at the whole model. */
  private frame() {
    const box = new THREE.Box3().setFromObject(this.group);
    if (box.isEmpty()) {
      return;
    }
    const center = box.getCenter(new THREE.Vector3());
    const radius = box.getSize(new THREE.Vector3()).length() / 2;
    const distance = radius / Math.sin(THREE.MathUtils.degToRad(this.camera.fov / 2)) * 1.1;
    const direction = new THREE.Vector3(0.55, 0.45, 0.85).normalize();
    this.controls.target.copy(center);
    this.camera.position.copy(center).addScaledVector(direction, distance);
    this.controls.update();
  }

  private clear() {
    this.highlighted = null;
    this.group.children.forEach(child => {
      const mesh = child as THREE.Mesh;
      mesh.geometry.dispose();
      (mesh.material as THREE.Material[]).forEach(m => m.dispose());
    });
    this.group.clear();
    this.textures.forEach(t => t.dispose());
    this.textures.clear();
    this.model = null;
  }

  private resize() {
    const { clientWidth: w, clientHeight: h } = this.host;
    if (!w || !h) {
      return;
    }
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }
}
