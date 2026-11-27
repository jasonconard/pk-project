import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import { Vec3 } from "../../game/shared/model/SceneUtils";
import { ObjSide } from "../../game/shared/model/SceneMap";
import { BOX_FACES, BoxFace } from "../../game/shared/model/model-uv";
import {
  applyMotions,
  MOTION_KEY,
  MotionDrive,
  MotionState,
  MotionTrigger,
  newMotionState,
  pivotPoint,
} from "../../game/shared/model/model-motion";
import {
  EditableModel,
  FaceTexture,
  LayerName,
  layerRgba,
} from "./EditableModel";

/** A face of the model under the pointer. */
export interface FacePick {
  partIndex: number;
  face: BoxFace;
  /** Pixel of the face under the pointer (column, row from the top left). */
  px: { x: number; y: number };
}

/** What the 3D view shows: the model as in the game (by day or by night), or one of its layers in gray. */
export interface SceneView {
  layer: LayerName;
  night: boolean;
}

const BACKGROUND = 0x2a_2b_33;
/** A part's faces drawn (front only when missing). */
const SIDES: Partial<Record<ObjSide, THREE.Side>> = {
  [ObjSide.BOTH]: THREE.DoubleSide,
  [ObjSide.BACK]: THREE.BackSide,
};
const NIGHT_BACKGROUND = 0x11_13_1c;
/** Same warm light as the game's windows (MaterialService). */
const NIGHT_LIGHT_COLOR = new THREE.Color(0xff_c5_6b);
const LAYERS: LayerName[] = ["color", "specular", "night", "bump"];
/** Size of the preview inset (share of the view's width and height) and its margin (px), bottom right. */
export const PREVIEW_SIZE = 0.32;
export const PREVIEW_MARGIN = 12;

/**
 * The model's movements played in the view: one pivot group per moving part, as the game makes them
 * (BasicMeshService.makeModel), each holding a stand-in placed where the part rests; the part's mesh copies where
 * its stand-in goes.
 */
interface MotionPlay {
  state: MotionState;
  pivots: THREE.Group;
  moving: { mesh: THREE.Mesh; standIn: THREE.Object3D }[];
}

/**
 * Textures of a face texture. The shininess and relief maps are values for the game's material (no color space),
 * and colors to look at when shown alone (`…View`, same canvas).
 */
type FaceTextures = Record<
  LayerName | "specularView" | "bumpView",
  THREE.CanvasTexture
>;
/** Outline of the selected face (its colors stay true while painting). */
const OUTLINE_MATERIAL = new THREE.LineBasicMaterial({
  color: 0xff_d3_4d,
  depthTest: false,
  transparent: true,
});
/** Edges of the selected part. */
const EDGES_MATERIAL = new THREE.LineBasicMaterial({
  color: 0x6f_b0_ff,
  depthTest: false,
  transparent: true,
});

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
  /** The model's light points (see light.ts): a coloured ball each, the selected one bigger. */
  private readonly lightMarks = new THREE.Group();
  /** Canvas textures of each face texture, one per layer (linked faces show the same ones). */
  private readonly textures = new Map<string, FaceTextures>();
  /** Inset showing the model as in the game while a grayscale layer is shown, by day or by night. */
  private previewNight = false;
  private readonly size = new THREE.Vector2();
  private outline: THREE.Line | null = null;
  private view: SceneView = { layer: "color", night: false };
  private readonly hemi = new THREE.HemisphereLight(
    0xff_ff_ff,
    0x66_66_77,
    1.6
  );
  private readonly sun = new THREE.DirectionalLight(0xff_ff_ff, 1.6);
  /** Arrows moving the selected part (1-unit steps). */
  private readonly gizmo: TransformControls;
  /** Called when the selected part was moved with the arrows (new position). */
  onPartMoved: ((partIndex: number, pos: Vec3) => void) | null = null;
  private readonly raycaster = new THREE.Raycaster();
  /** Movements played (null: the parts at rest). */
  private motions: MotionPlay | null = null;
  private lastFrame = 0;
  /** What the movements' triggers ask (loops always play), while they are played. */
  motionDrive: (trigger: MotionTrigger) => MotionDrive = () => "rest";
  /** Movements paused where they are. */
  motionPaused = false;

  constructor(private readonly host: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(this.renderer.domElement);

    this.scene.background = new THREE.Color(BACKGROUND);
    this.sun.position.set(60, 120, 90);
    this.scene.add(this.hemi, this.sun);
    const grid = new THREE.GridHelper(160, 160, 0x55_57_6a, 0x3a_3c_48);
    this.scene.add(grid, this.group, this.lightMarks);

    this.camera.position.set(80, 70, 110);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    this.gizmo = new TransformControls(this.camera, this.renderer.domElement);
    this.gizmo.setTranslationSnap(1);
    this.gizmo.setSize(0.8);
    this.gizmo.addEventListener("dragging-changed", (event) => {
      this.controls.enabled = !event.value;
      const mesh = this.gizmo.object;
      if (!event.value && mesh) {
        this.onPartMoved?.(mesh.userData["partIndex"], {
          x: mesh.position.x,
          y: mesh.position.y,
          z: mesh.position.z,
        });
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
    const now = performance.now();
    const dt = Math.min(0.1, (now - this.lastFrame) / 1000);
    this.lastFrame = now;
    if (this.motions && !this.motionPaused) {
      this.stepMotions(dt);
    }
    const { x: w, y: h } = this.renderer.getSize(this.size);
    this.renderer.setScissorTest(false);
    this.renderer.setViewport(0, 0, w, h);
    this.light(this.view.night && this.view.layer === "color");
    this.renderer.render(this.scene, this.camera);
    if (this.view.layer === "color") {
      return;
    }
    // The inset: same camera (same proportions), the game's materials, without the selection marks
    const pw = Math.round(w * PREVIEW_SIZE),
      ph = Math.round(h * PREVIEW_SIZE);
    const x = w - pw - PREVIEW_MARGIN,
      y = PREVIEW_MARGIN;
    this.renderer.setScissorTest(true);
    this.renderer.setScissor(x, y, pw, ph);
    this.renderer.setViewport(x, y, pw, ph);
    const swap = (key: "preview" | "main") =>
      this.group.children.forEach(
        (c) => ((c as THREE.Mesh).material = c.userData[key])
      );
    swap("preview");
    const helper = this.gizmo.getHelper(),
      helperVisible = helper.visible;
    helper.visible = false;
    if (this.outline) {
      this.outline.visible = false;
    }
    this.light(this.previewNight);
    this.renderer.render(this.scene, this.camera);
    swap("main");
    helper.visible = helperVisible;
    if (this.outline) {
      this.outline.visible = true;
    }
    this.renderer.setScissorTest(false);
  }

  /** Lights and background by day or by night. */
  private light(night: boolean) {
    (this.scene.background as THREE.Color).setHex(
      night ? NIGHT_BACKGROUND : BACKGROUND
    );
    this.hemi.intensity = night ? 0.35 : 1.6;
    this.sun.intensity = night ? 0.15 : 1.6;
  }

  /** Preview inset (shown with a grayscale layer) by day or by night. */
  setPreviewNight(night: boolean) {
    this.previewNight = night;
    this.group.children.forEach((c) =>
      (c.userData["preview"] as THREE.MeshPhongMaterial[]).forEach(
        (m) => (m.emissiveIntensity = night ? 1 : 0)
      )
    );
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

  /** The light points drawn over the model (the selected one bigger, with a ring). */
  setLights(lights: { pos: Vec3; color: string }[], selected: number | null) {
    for (const child of this.lightMarks.children) {
      const mesh = child as THREE.Mesh;
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
      this.lightMarks.remove(mesh);
    }
    lights.forEach((light, i) => {
      const mark = new THREE.Mesh(
        new THREE.SphereGeometry(i === selected ? 2.2 : 1.4, 14, 10),
        new THREE.MeshBasicMaterial({
          color: light.color,
          depthTest: false,
          transparent: true,
          opacity: i === selected ? 1 : 0.75,
        })
      );
      mark.renderOrder = 10;
      mark.position.set(light.pos.x, light.pos.y, light.pos.z);
      this.lightMarks.add(mark);
    });
  }

  /** The point of the model under the pointer (its coordinates, like the parts'), null: nothing there. */
  pickPoint(clientX: number, clientY: number): Vec3 | null {
    const rect = this.canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      (-(clientY - rect.top) / rect.height) * 2 + 1
    );
    this.raycaster.setFromCamera(ndc, this.camera);
    const hit = this.raycaster.intersectObjects(this.group.children, false)[0];
    if (!hit) {
      return null;
    }
    const p = this.group.worldToLocal(hit.point.clone());
    // (a little in front of the face, rounded to a pixel)
    const n = hit.face?.normal
      .clone()
      .transformDirection(hit.object.matrixWorld);
    if (n) {
      p.addScaledVector(n, 1);
    }
    return { x: Math.round(p.x), y: Math.round(p.y), z: Math.round(p.z) };
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
    Object.entries(model.textures).forEach(([id, tex]) =>
      this.textures.set(id, this.makeTextures(tex))
    );

    model.parts.forEach((part, partIndex) => {
      const materialOf = (face: BoxFace, preview = false): THREE.Material => {
        const textures = this.textures.get(part.faces[face] ?? "");
        const common = {
          side: SIDES[part.side ?? ObjSide.FRONT] ?? THREE.FrontSide,
          depthWrite: !!part.depthWrite,
          depthTest: !!part.depthTest,
          alphaTest: 0.5,
        };
        const layer = this.view.layer;
        if (layer !== "color" && !preview) {
          // The layer alone, in its true grays
          const views = {
            specular: "specularView",
            bump: "bumpView",
            night: "night",
          } as const;
          const key = views[layer];
          return new THREE.MeshBasicMaterial({
            ...common,
            map: textures?.[key] ?? null,
          });
        }
        const night = preview ? this.previewNight : this.view.night;
        // As in the game (MaterialService.getModelMaterial)
        return new THREE.MeshPhongMaterial({
          ...common,
          map: textures?.color ?? null,
          specular: 0xff_ff_ff,
          specularMap: textures?.specular ?? null,
          shininess: 20,
          emissive: NIGHT_LIGHT_COLOR,
          emissiveMap: textures?.night ?? null,
          emissiveIntensity: night ? 1 : 0,
          bumpMap: textures?.bump ?? null,
          bumpScale: model.bumpScale ?? 1,
        });
      };
      const mesh =
        part.kind === "box"
          ? new THREE.Mesh(
              new THREE.BoxGeometry(part.size.x, part.size.y, part.size.z),
              BOX_FACES.map((face) => materialOf(face))
            )
          : new THREE.Mesh(new THREE.PlaneGeometry(part.size.x, part.size.y), [
              materialOf("front"),
            ]);
      if (part.kind === "plane") {
        mesh.geometry.addGroup(0, Infinity, 0);
      }
      mesh.userData["main"] = mesh.material;
      mesh.userData["preview"] =
        this.view.layer === "color"
          ? []
          : (part.kind === "box" ? BOX_FACES : ["front" as BoxFace]).map((f) =>
              materialOf(f, true)
            );
      mesh.position.set(part.pos.x, part.pos.y, part.pos.z);
      mesh.rotation.set(part.rot.x, part.rot.y, part.rot.z);
      mesh.userData["partIndex"] = partIndex;
      this.group.add(mesh);
    });
    if (this.motions) {
      this.motions = this.motionPlay(model);
    }
  }

  /** Plays the model's movements from rest (true), or stops them and puts the parts back at rest (false). */
  playMotions(on: boolean) {
    this.motions = on && this.model ? this.motionPlay(this.model) : null;
    if (!on && this.model) {
      this.restParts(this.model);
    }
  }

  /** The movements again, from rest. */
  replayMotions() {
    if (this.motions && this.model) {
      this.restParts(this.model);
      this.motions = this.motionPlay(this.model);
    }
  }

  private motionPlay(model: EditableModel): MotionPlay {
    const pivots = new THREE.Group();
    const moving: MotionPlay["moving"] = [];
    model.parts.forEach((part, partIndex) => {
      const mesh = this.meshOf(partIndex);
      if (!part.motion || !mesh) {
        return;
      }
      const pivot = new THREE.Group();
      pivot.position.copy(pivotPoint(part, part.motion.pivot));
      pivot.userData[MOTION_KEY] = part.motion;
      pivot.userData["base"] = {
        pos: pivot.position.clone(),
        quat: pivot.quaternion.clone(),
      };
      const standIn = new THREE.Object3D();
      standIn.position
        .set(part.pos.x, part.pos.y, part.pos.z)
        .sub(pivot.position);
      standIn.rotation.set(part.rot.x, part.rot.y, part.rot.z);
      pivot.add(standIn);
      pivots.add(pivot);
      moving.push({ mesh, standIn });
    });
    return { state: newMotionState(), pivots, moving };
  }

  private stepMotions(dt: number) {
    const { state, pivots, moving } = this.motions!;
    applyMotions(pivots, state, dt, this.motionDrive);
    pivots.updateMatrixWorld(true);
    const scale = new THREE.Vector3();
    for (const { mesh, standIn } of moving) {
      standIn.matrixWorld.decompose(mesh.position, mesh.quaternion, scale);
      mesh.visible = standIn.parent!.visible;
    }
  }

  private restParts(model: EditableModel) {
    model.parts.forEach((part, partIndex) => {
      const mesh = this.meshOf(partIndex);
      if (mesh) {
        mesh.position.set(part.pos.x, part.pos.y, part.pos.z);
        mesh.rotation.set(part.rot.x, part.rot.y, part.rot.z);
        mesh.visible = true;
      }
    });
  }

  private meshOf(partIndex: number): THREE.Mesh | undefined {
    return this.group.children.find(
      (c) => c.userData["partIndex"] === partIndex
    ) as THREE.Mesh | undefined;
  }

  /**
   * Face (and pixel) at a point of the screen. Transparent pixels let the pointer through, unless nothing
   * opaque is behind them and `orTransparent` is set (painting on an empty face).
   */
  pick(
    clientX: number,
    clientY: number,
    orTransparent = false
  ): FacePick | null {
    if (!this.model) {
      return null;
    }
    const rect = this.canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      (-(clientY - rect.top) / rect.height) * 2 + 1
    );
    this.raycaster.setFromCamera(ndc, this.camera);
    let firstTransparent: FacePick | null = null;
    for (const hit of this.raycaster.intersectObjects(
      this.group.children,
      false
    )) {
      const mesh = hit.object as THREE.Mesh;
      const partIndex = mesh.userData["partIndex"] as number;
      const part = this.model.parts[partIndex];
      const face =
        part.kind === "box" ? BOX_FACES[hit.face!.materialIndex] : "front";
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
      LAYERS.forEach((layer) => {
        (textures[layer].image as HTMLCanvasElement)
          .getContext("2d")!
          .putImageData(
            new ImageData(
              new Uint8ClampedArray(layerRgba(tex, layer)),
              tex.w,
              tex.h
            ),
            0,
            0
          );
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
    const mesh = this.group.children.find(
      (c) => c.userData["partIndex"] === partIndex
    ) as THREE.Mesh | undefined;
    if (!mesh) {
      return;
    }
    const part = this.model.parts[partIndex];
    if (face) {
      // The 4 corners of the face in the geometry (4 vertices per face, in the order of BOX_FACES)
      const first = part.kind === "box" ? BOX_FACES.indexOf(face) * 4 : 0;
      const pos = mesh.geometry.getAttribute("position");
      const corners = [0, 1, 3, 2].map((i) =>
        new THREE.Vector3().fromBufferAttribute(pos, first + i)
      );
      this.outline = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(corners),
        OUTLINE_MATERIAL
      );
      this.outline.renderOrder = 10;
      mesh.add(this.outline);
    } else {
      this.outline = new THREE.LineSegments(
        new THREE.EdgesGeometry(mesh.geometry),
        EDGES_MATERIAL
      );
      this.outline.renderOrder = 10;
      mesh.add(this.outline);
    }
    this.gizmo.attach(mesh);
    this.gizmo.getHelper().visible = this.gizmo.enabled;
  }

  dispose() {
    this.motions = null;
    this.renderer.setAnimationLoop(null);
    this.resizeObserver.disconnect();
    this.clear();
    this.gizmo.dispose();
    this.controls.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private makeTextures(tex: FaceTexture): FaceTextures {
    const canvases = Object.fromEntries(
      LAYERS.map((layer) => {
        const canvas = document.createElement("canvas");
        canvas.width = tex.w;
        canvas.height = tex.h;
        canvas
          .getContext("2d")!
          .putImageData(
            new ImageData(
              new Uint8ClampedArray(layerRgba(tex, layer)),
              tex.w,
              tex.h
            ),
            0,
            0
          );
        return [layer, canvas];
      })
    ) as Record<LayerName, HTMLCanvasElement>;
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

  private makeTexture(
    canvas: HTMLCanvasElement,
    srgb: boolean
  ): THREE.CanvasTexture {
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
    const distance =
      (radius / Math.sin(THREE.MathUtils.degToRad(this.camera.fov / 2))) * 1.1;
    const direction = new THREE.Vector3(0.55, 0.45, 0.85).normalize();
    this.controls.target.copy(center);
    this.camera.position.copy(center).addScaledVector(direction, distance);
    this.controls.update();
  }

  private clear() {
    this.outline?.geometry.dispose();
    this.outline = null;
    this.group.children.forEach((child) => {
      const mesh = child as THREE.Mesh;
      mesh.geometry.dispose();
      (mesh.material as THREE.Material[]).forEach((m) => m.dispose());
      (mesh.userData["preview"] as THREE.Material[]).forEach((m) =>
        m.dispose()
      );
    });
    this.group.clear();
    this.textures.forEach((layers) =>
      Object.values(layers).forEach((t) => t.dispose())
    );
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
