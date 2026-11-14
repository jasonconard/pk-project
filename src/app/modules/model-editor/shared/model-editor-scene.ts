import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { Vec3 } from '../../game/shared/model/SceneUtils';
import { ObjSide } from '../../game/shared/model/SceneMap';
import { BOX_FACES, BoxFace } from '../../game/shared/model/model-uv';
import { EditableModel, FaceTexture, LayerName, layerRgba } from './EditableModel';

/** A face of the model under the pointer. */
export interface FacePick {
  partIndex: number;
  face: BoxFace;
  /** Pixel of the face under the pointer (column, row from the top left). */
  px: { x: number, y: number };
}

/** What the 3D view shows: the model as in the game (by day or by night), or one of its layers in gray. */
export interface SceneView {
  layer: LayerName;
  night: boolean;
}

const BACKGROUND = 0x2a2b33;
const NIGHT_BACKGROUND = 0x11131c;
/** Same warm light as the game's windows (MaterialService). */
const NIGHT_LIGHT_COLOR = new THREE.Color(0xffc56b);
const LAYERS: LayerName[] = ['color', 'specular', 'night', 'bump'];
/** Size of the preview inset (share of the view's width and height) and its margin (px), bottom right. */
export const PREVIEW_SIZE = 0.32;
export const PREVIEW_MARGIN = 12;

/**
 * Textures of a face texture. The shininess and relief maps are values for the game's material (no color space),
 * and colors to look at when shown alone (`…View`, same canvas).
 */
type FaceTextures = Record<LayerName | 'specularView' | 'bumpView', THREE.CanvasTexture>;
/** Outline of the selected face (its colors stay true while painting). */
const OUTLINE_MATERIAL = new THREE.LineBasicMaterial({ color: 0xffd34d, depthTest: false, transparent: true });
/** Edges of the selected part. */
const EDGES_MATERIAL = new THREE.LineBasicMaterial({ color: 0x6fb0ff, depthTest: false, transparent: true });

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
  /** Canvas textures of each face texture, one per layer (linked faces show the same ones). */
  private readonly textures = new Map<string, FaceTextures>();
  /** Inset showing the model as in the game while a grayscale layer is shown, by day or by night. */
  private previewNight = false;
  private readonly size = new THREE.Vector2();
  private outline: THREE.Line | null = null;
  private view: SceneView = { layer: 'color', night: false };
  private readonly hemi = new THREE.HemisphereLight(0xffffff, 0x666677, 1.6);
  private readonly sun = new THREE.DirectionalLight(0xffffff, 1.6);
  /** Arrows moving the selected part (1-unit steps). */
  private readonly gizmo: TransformControls;
  /** Called when the selected part was moved with the arrows (new position). */
  onPartMoved: ((partIndex: number, pos: Vec3) => void) | null = null;
  private readonly raycaster = new THREE.Raycaster();

  constructor(private readonly host: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(this.renderer.domElement);

    this.scene.background = new THREE.Color(BACKGROUND);
    this.sun.position.set(60, 120, 90);
    this.scene.add(this.hemi, this.sun);
    const grid = new THREE.GridHelper(160, 160, 0x55576a, 0x3a3c48);
    this.scene.add(grid, this.group);

    this.camera.position.set(80, 70, 110);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    this.gizmo = new TransformControls(this.camera, this.renderer.domElement);
    this.gizmo.setTranslationSnap(1);
    this.gizmo.setSize(0.8);
    this.gizmo.addEventListener('dragging-changed', event => {
      this.controls.enabled = !event.value;
      const mesh = this.gizmo.object;
      if (!event.value && mesh) {
        this.onPartMoved?.(mesh.userData['partIndex'], { x: mesh.position.x, y: mesh.position.y, z: mesh.position.z });
      }
    });
    this.scene.add(this.gizmo.getHelper());

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(host);
    this.resize();
    this.renderer.setAnimationLoop(() => this.render());
  }

  private render() {
    this.controls.update();
    const { x: w, y: h } = this.renderer.getSize(this.size);
    this.renderer.setScissorTest(false);
    this.renderer.setViewport(0, 0, w, h);
    this.light(this.view.night && this.view.layer === 'color');
    this.renderer.render(this.scene, this.camera);
    if (this.view.layer === 'color') {
      return;
    }
    // The inset: same camera (same proportions), the game's materials, without the selection marks
    const pw = Math.round(w * PREVIEW_SIZE), ph = Math.round(h * PREVIEW_SIZE);
    const x = w - pw - PREVIEW_MARGIN, y = PREVIEW_MARGIN;
    this.renderer.setScissorTest(true);
    this.renderer.setScissor(x, y, pw, ph);
    this.renderer.setViewport(x, y, pw, ph);
    const swap = (key: 'preview' | 'main') => this.group.children.forEach(c => (c as THREE.Mesh).material = c.userData[key]);
    swap('preview');
    const helper = this.gizmo.getHelper(), helperVisible = helper.visible;
    helper.visible = false;
    if (this.outline) {
      this.outline.visible = false;
    }
    this.light(this.previewNight);
    this.renderer.render(this.scene, this.camera);
    swap('main');
    helper.visible = helperVisible;
    if (this.outline) {
      this.outline.visible = true;
    }
    this.renderer.setScissorTest(false);
  }

  /** Lights and background by day or by night. */
  private light(night: boolean) {
    (this.scene.background as THREE.Color).setHex(night ? NIGHT_BACKGROUND : BACKGROUND);
    this.hemi.intensity = night ? 0.35 : 1.6;
    this.sun.intensity = night ? 0.15 : 1.6;
  }

  /** Preview inset (shown with a grayscale layer) by day or by night. */
  setPreviewNight(night: boolean) {
    this.previewNight = night;
    this.group.children.forEach(c => (c.userData['preview'] as THREE.MeshPhongMaterial[]).forEach(m => m.emissiveIntensity = night ? 1 : 0));
  }

  get canvas(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  /** True while the pointer is on the arrows (a click there is not a selection). */
  get onGizmo(): boolean {
    return this.gizmo.axis !== null;
  }

  /** Layer shown, day or night: the materials are made again. */
  setView(view: SceneView) {
    this.view = view;
    if (this.model) {
      this.refresh(this.model);
    }
  }

  /** Shows a model and frames the camera on it. */
  setModel(model: EditableModel) {
    this.refresh(model);
    this.frame();
  }

  /** Shows the model again after a change (the camera does not move). */
  refresh(model: EditableModel) {
    this.gizmo.detach();
    this.clear();
    this.model = model;
    Object.entries(model.textures).forEach(([id, tex]) => this.textures.set(id, this.makeTextures(tex)));

    model.parts.forEach((part, partIndex) => {
      const materialOf = (face: BoxFace, preview = false): THREE.Material => {
        const textures = this.textures.get(part.faces[face] ?? '');
        const common = {
          side: part.side === ObjSide.BOTH ? THREE.DoubleSide : part.side === ObjSide.BACK ? THREE.BackSide : THREE.FrontSide,
          depthWrite: !!part.depthWrite,
          depthTest: !!part.depthTest,
          alphaTest: 0.5,
        };
        const layer = this.view.layer;
        if (layer !== 'color' && !preview) {
          // The layer alone, in its true grays
          const key = layer === 'specular' ? 'specularView' : layer === 'bump' ? 'bumpView' : layer;
          return new THREE.MeshBasicMaterial({ ...common, map: textures?.[key] ?? null });
        }
        const night = preview ? this.previewNight : this.view.night;
        // As in the game (MaterialService.getModelMaterial)
        return new THREE.MeshPhongMaterial({
          ...common,
          map: textures?.color ?? null,
          specular: 0xffffff,
          specularMap: textures?.specular ?? null,
          shininess: 20,
          emissive: NIGHT_LIGHT_COLOR,
          emissiveMap: textures?.night ?? null,
          emissiveIntensity: night ? 1 : 0,
          bumpMap: textures?.bump ?? null,
          bumpScale: model.bumpScale ?? 1,
        });
      };
      const mesh = part.kind === 'box'
        ? new THREE.Mesh(new THREE.BoxGeometry(part.size.x, part.size.y, part.size.z), BOX_FACES.map(face => materialOf(face)))
        : new THREE.Mesh(new THREE.PlaneGeometry(part.size.x, part.size.y), [materialOf('front')]);
      if (part.kind === 'plane') {
        mesh.geometry.addGroup(0, Infinity, 0);
      }
      mesh.userData['main'] = mesh.material;
      mesh.userData['preview'] = this.view.layer === 'color' ? [] : (part.kind === 'box' ? BOX_FACES : ['front' as BoxFace]).map(f => materialOf(f, true));
      mesh.position.set(part.pos.x, part.pos.y, part.pos.z);
      mesh.rotation.set(part.rot.x, part.rot.y, part.rot.z);
      mesh.userData['partIndex'] = partIndex;
      this.group.add(mesh);
    });
  }

  /**
   * Face (and pixel) at a point of the screen. Transparent pixels let the pointer through, unless nothing
   * opaque is behind them and `orTransparent` is set (painting on an empty face).
   */
  pick(clientX: number, clientY: number, orTransparent = false): FacePick | null {
    if (!this.model) {
      return null;
    }
    const rect = this.canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2((clientX - rect.left) / rect.width * 2 - 1, -(clientY - rect.top) / rect.height * 2 + 1);
    this.raycaster.setFromCamera(ndc, this.camera);
    let firstTransparent: FacePick | null = null;
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
        firstTransparent ??= { partIndex, face, px: { x, y } };
        continue;
      }
      return { partIndex, face, px: { x, y } };
    }
    return orTransparent ? firstTransparent : null;
  }

  /** Shows the new pixels of a face texture, all its layers (on all the faces linked to it). */
  updateTexture(texId: string) {
    const textures = this.textures.get(texId);
    const tex = this.model?.textures[texId];
    if (textures && tex) {
      LAYERS.forEach(layer => {
        (textures[layer].image as HTMLCanvasElement).getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(layerRgba(tex, layer)), tex.w, tex.h), 0, 0);
        textures[layer].needsUpdate = true;
      });
      textures.specularView.needsUpdate = true;
      textures.bumpView.needsUpdate = true;
    }
  }

  /** Camera turning with the pointer (off while painting on the model). */
  set orbitEnabled(enabled: boolean) {
    this.controls.enabled = enabled;
  }

  /** Arrows moving the selected part (hidden while painting). */
  set gizmoEnabled(enabled: boolean) {
    this.gizmo.enabled = enabled;
    this.gizmo.getHelper().visible = enabled;
  }

  /** Outlines a face, or the edges of the part when `face` is null; puts the arrows on the part. */
  highlight(partIndex: number | null, face: BoxFace | null) {
    this.outline?.removeFromParent();
    this.outline?.geometry.dispose();
    this.outline = null;
    this.gizmo.detach();
    if (partIndex === null || !this.model) {
      return;
    }
    const mesh = this.group.children.find(c => c.userData['partIndex'] === partIndex) as THREE.Mesh | undefined;
    if (!mesh) {
      return;
    }
    const part = this.model.parts[partIndex];
    if (face) {
      // The 4 corners of the face in the geometry (4 vertices per face, in the order of BOX_FACES)
      const first = part.kind === 'box' ? BOX_FACES.indexOf(face) * 4 : 0;
      const pos = mesh.geometry.getAttribute('position');
      const corners = [0, 1, 3, 2].map(i => new THREE.Vector3().fromBufferAttribute(pos, first + i));
      this.outline = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(corners), OUTLINE_MATERIAL);
      this.outline.renderOrder = 10;
      mesh.add(this.outline);
    } else {
      this.outline = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), EDGES_MATERIAL);
      this.outline.renderOrder = 10;
      mesh.add(this.outline);
    }
    this.gizmo.attach(mesh);
    this.gizmo.getHelper().visible = this.gizmo.enabled;
  }

  dispose() {
    this.renderer.setAnimationLoop(null);
    this.resizeObserver.disconnect();
    this.clear();
    this.gizmo.dispose();
    this.controls.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private makeTextures(tex: FaceTexture): FaceTextures {
    const canvases = Object.fromEntries(LAYERS.map(layer => {
      const canvas = document.createElement('canvas');
      canvas.width = tex.w;
      canvas.height = tex.h;
      canvas.getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(layerRgba(tex, layer)), tex.w, tex.h), 0, 0);
      return [layer, canvas];
    })) as Record<LayerName, HTMLCanvasElement>;
    // Colors (and the night light, like the game) are sRGB; the shininess and relief values are used as they are
    return {
      color: this.makeTexture(canvases.color, true),
      night: this.makeTexture(canvases.night, true),
      specular: this.makeTexture(canvases.specular, false),
      bump: this.makeTexture(canvases.bump, false),
      specularView: this.makeTexture(canvases.specular, true),
      bumpView: this.makeTexture(canvases.bump, true),
    };
  }

  private makeTexture(canvas: HTMLCanvasElement, srgb: boolean): THREE.CanvasTexture {
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
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
    this.outline?.geometry.dispose();
    this.outline = null;
    this.group.children.forEach(child => {
      const mesh = child as THREE.Mesh;
      mesh.geometry.dispose();
      (mesh.material as THREE.Material[]).forEach(m => m.dispose());
      (mesh.userData['preview'] as THREE.Material[]).forEach(m => m.dispose());
    });
    this.group.clear();
    this.textures.forEach(layers => Object.values(layers).forEach(t => t.dispose()));
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
