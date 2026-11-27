import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  output,
  signal,
  viewChild,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import {
  LucideArrowLeftRight,
  LucideArrowUpDown,
  LucideBox,
  LucideBrush,
  LucideChevronDown,
  LucideChevronLeft,
  LucideCloudCheck,
  LucideClipboardCopy,
  LucideCopy,
  LucideDownload,
  LucideDynamicIcon,
  LucideFootprints,
  LucideHand,
  LucideHouse,
  LucideLink,
  LucideLock,
  LucideMaximize2,
  LucideMinus,
  LucideMoon,
  LucideMousePointerClick,
  LucidePackage,
  LucidePause,
  LucidePlay,
  LucidePalette,
  LucidePlus,
  LucideLightbulb,
  LucideRectangleHorizontal,
  LucideRedo2,
  LucideRotateCcw,
  LucideRotateCw,
  LucideScan,
  LucideSettings2,
  LucideShapes,
  LucideSquare,
  LucideSquareDashed,
  LucideSun,
  LucideTrash,
  LucideUndo2,
  LucideUpload,
  LucideX,
} from "@lucide/angular";
import { ActivatedRoute } from "@angular/router";
import { EscapeService } from "../../core/shared/service/escape.service";
import { CODE_MODELS } from "../game/shared/model/browser-models";
import { ObjSide } from "../game/shared/model/SceneMap";
import { Vec3 } from "../game/shared/model/SceneUtils";
import { BoxFace } from "../game/shared/model/model-uv";
import { downloadFile } from "../game/shared/util/ts-source";
import {
  EditableModel,
  EditablePart,
  LayerName,
  layerGrid,
} from "./shared/EditableModel";
import {
  importModel,
  loadImagePixels,
  loadModelMaps,
} from "./shared/model-import";
import { atlasToPng, exportModel } from "./shared/model-export";
import {
  ModelEditorScene,
  PREVIEW_MARGIN,
  PREVIEW_SIZE,
} from "./shared/model-editor-scene";
import {
  addPart,
  copyFace,
  duplicatePart,
  flipTexture,
  linkFace,
  modelFootprint,
  newModel,
  removePart,
  resizePart,
  unlinkFace,
} from "./shared/model-ops";
import { ModelHistory } from "./shared/model-history";
import { ZoneEditorComponent } from "../game/zone-editor/zone-editor.component";
import { LightFieldsComponent } from "../game/light-fields/light-fields.component";
import {
  defaultLight,
  LightSpec,
  lightSummary,
} from "../game/shared/model/light";
import {
  ActionZone,
  isWholeObject,
  zoneGrid,
  zoneSummary,
} from "../game/shared/model/action-zone";
import { ModelSaver } from "./shared/model-saver";
import {
  forgetStoredModel,
  loadImportedPalette,
  loadRecentColors,
  loadStoredModel,
  saveImportedPalette,
  saveRecentColors,
  StoredPalette,
  storedModelIds,
} from "./shared/model-storage";
import { modelColors } from "./shared/palette";
import {
  nearestColor,
  PALETTE_FILE_TYPES,
  readPaletteFile,
} from "./shared/palette-import";
import {
  hexToRgba,
  PaintStroke,
  Px,
  rgbaToHex,
  Tool,
} from "./shared/pixel-tools";
import { PixelCanvasComponent } from "./pixel-canvas/pixel-canvas.component";
import { haptic } from "../../core/shared/haptics";
import { writeJson } from "../../core/shared/local-store";
import {
  FACE_LABELS,
  Selection,
  Axis,
  CLICK_TOLERANCE,
  NEW_MODEL_ID,
  Mode,
  TOOLS,
  LAYERS,
  Sheet,
  VecKind,
  VECS,
  NUDGES,
  PHONE_QUERY,
  TRAY_COLORS,
  GRAYS,
  PanelSection,
  SECTIONS_KEY,
  BIG_VIEW_KEY,
  loadJson,
  RECENT_COLORS,
  CONFIRM_TIME,
  PendingFaceAction,
  ActiveStroke,
  MOTION_TRIGGER_CHOICES,
  motionStep,
  MotionPreview,
} from "./model-editor.options";
import {
  MOTION_KINDS,
  MOTION_PIVOTS,
  MOTION_TRIGGERS,
  MotionKind,
  MotionTrigger,
  motionSentence,
  newMotion,
  PartMotion,
} from "../game/shared/model/model-motion";

/**
 * 3D model editor (/modeles): opens a model of the game or a new one, adds / removes / duplicates / moves its
 * boxes and planes (their pixel grids follow their size), selects a face, and exports the model back to the
 * game's format (md-<id>.ts + atlas PNG).
 */
@Component({
  selector: "app-model-editor",
  templateUrl: "./model-editor.component.html",
  styleUrls: [
    "./model-editor.component.scss",
    "./model-editor.panel.scss",
    "./model-editor.phone.scss",
    "./model-editor.motion.scss",
    "./model-editor.part-motion.scss",
    "./model-editor.zone.scss",
    "./model-editor.lights.scss",
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PixelCanvasComponent,
    ZoneEditorComponent,
    LightFieldsComponent,
    NgTemplateOutlet,
    LucideArrowLeftRight,
    LucideArrowUpDown,
    LucideBox,
    LucideBrush,
    LucideChevronDown,
    LucideChevronLeft,
    LucideCloudCheck,
    LucideClipboardCopy,
    LucideCopy,
    LucideDownload,
    LucideDynamicIcon,
    LucideFootprints,
    LucideHand,
    LucideHouse,
    LucideLink,
    LucideLock,
    LucideMaximize2,
    LucideMinus,
    LucideMoon,
    LucideMousePointerClick,
    LucidePackage,
    LucidePause,
    LucidePlay,
    LucidePalette,
    LucidePlus,
    LucideLightbulb,
    LucideRectangleHorizontal,
    LucideRedo2,
    LucideRotateCcw,
    LucideRotateCw,
    LucideScan,
    LucideSettings2,
    LucideShapes,
    LucideSquare,
    LucideSquareDashed,
    LucideSun,
    LucideTrash,
    LucideUndo2,
    LucideUpload,
    LucideX,
  ],
})
export class ModelEditorComponent implements AfterViewInit, OnDestroy {
  private readonly viewport =
    viewChild.required<ElementRef<HTMLElement>>("viewport");
  /** Opened over the game (a full screen panel): Jeu closes it instead of loading the game page. */
  readonly embedded = input(false);
  /** Over the game: the model to open (the map editor's selected object). */
  readonly modelId = input<string | null>(null);
  /** Jeu, when opened over the game. */
  readonly closed = output<void>();
  /** `/modeles?id=house` (its own page): the model to open. */
  private readonly routeId =
    inject(ActivatedRoute).snapshot.queryParamMap.get("id");
  private scene: ModelEditorScene | null = null;
  private pressAt: { x: number; y: number } | null = null;
  private active: ActiveStroke | null = null;
  /** Fingers on the 3D view (pointer id → last position), to tell a pinch from a stroke or a tap. */
  private readonly touches = new Map<number, { x: number; y: number }>();
  /** A second finger touched the 3D view: the press is a pinch (zoom / pan), not a tap nor a stroke. */
  private multiTouch = false;
  private readonly history = new ModelHistory();
  private confirmTimer: ReturnType<typeof setTimeout> | null = null;
  /** Saves the model in the browser a little after each change. */
  private readonly saver = new ModelSaver(
    () => this.model(),
    async (ok) => {
      if (!ok) {
        this.status.set(
          "Enregistrement impossible dans le navigateur : pense à exporter."
        );
      }
      await this.refreshStoredIds();
    }
  );

  protected readonly modelIds = CODE_MODELS.map((m) => m.id);
  /** Models saved in the browser (edited models of the game, and new ones). */
  protected readonly storedIds = signal<string[]>([]);
  protected readonly newIds = computed(() =>
    this.storedIds().filter((id) => !this.modelIds.includes(id))
  );
  /** The open model is the browser's version of a model of the game. */
  /** The action zone's grid: the model's footprint (not turned) in map cells, as the game measures it. */
  protected readonly zoneGrid = computed(() => {
    const model = this.model();
    if (!model) {
      return { cols: 1, rows: 1 };
    }
    const { width, depth } = modelFootprint(model);
    return zoneGrid(width, depth);
  });
  protected readonly zoneSummary = computed(() =>
    zoneSummary(this.model()?.zone)
  );
  protected readonly isEditedGameModel = computed(() => {
    const id = this.model()?.id;
    return !!id && this.modelIds.includes(id) && this.storedIds().includes(id);
  });
  protected readonly confirmRevert = signal(false);
  protected readonly canUndo = signal(false);
  protected readonly canRedo = signal(false);
  protected readonly pending = signal<PendingFaceAction | null>(null);
  protected readonly mirrorH = signal(false);
  protected readonly mirrorV = signal(false);
  protected readonly recentColors = signal(loadRecentColors());
  protected readonly paletteFileTypes = PALETTE_FILE_TYPES;
  /** Palette imported from a file (Aseprite, Lospec…); `locked`: drawing only with its colors. */
  protected readonly importedPalette = signal<StoredPalette | null>(
    loadImportedPalette()
  );
  /** Changes at the end of each stroke (the model's colors are counted again). */
  private readonly paletteVersion = signal(0);
  protected readonly palette = computed(() => {
    this.paletteVersion();
    const model = this.model();
    return model ? modelColors(model) : [];
  });
  protected readonly axes: Axis[] = ["x", "y", "z"];
  protected readonly sides = [
    { value: ObjSide.FRONT, label: "Devant" },
    { value: ObjSide.BOTH, label: "Deux côtés" },
    { value: ObjSide.BACK, label: "Derrière" },
  ];
  protected readonly vecs = VECS;
  protected readonly nudges = NUDGES;
  protected readonly motionKinds = MOTION_KINDS;
  protected readonly motionPivots = MOTION_PIVOTS;
  protected readonly motionTriggers = MOTION_TRIGGER_CHOICES;
  protected readonly motionStep = motionStep;
  protected readonly motionSentence = motionSentence;
  protected readonly kindLabel = (kind: MotionKind) =>
    MOTION_KINDS.find((k) => k.id === kind)?.label;
  /** 0.6 → « 0,6 ». */
  protected readonly seconds = (value: number) =>
    String(value).replace(".", ",");
  protected readonly triggerLabel = (trigger: MotionTrigger) =>
    MOTION_TRIGGERS.find((t) => t.id === trigger)?.label;
  /** « Voir le mouvement »: the model's movements played in the 3D view (null: at rest). */
  protected readonly motionPreview = signal<MotionPreview | null>(null);
  /** The movement the preview card tells: the selected part's, else the first moving part's. */
  protected readonly previewedMotion = computed(() => {
    const parts = this.model()?.parts ?? [];
    const sel = this.selection()?.partIndex;
    const index =
      sel !== undefined && parts[sel]?.motion
        ? sel
        : parts.findIndex((p) => p.motion);
    return index === -1
      ? null
      : { name: this.parts()[index], motion: parts[index].motion! };
  });
  /** Phone layout: bottom bars and sheets. */
  protected readonly phone = signal(false);
  private readonly phoneQuery = matchMedia(PHONE_QUERY);
  private readonly onPhoneChange = (e: MediaQueryListEvent) =>
    this.phone.set(e.matches);
  /** Bottom sheet open on a phone. */
  protected readonly sheet = signal<Sheet | null>(null);
  protected readonly sheetTitles: Record<Sheet, string> = {
    model: "Modèle",
    shapes: "Formes",
    add: "Ajouter une forme",
    layer: "Calque",
    face: "Face",
    palette: "Palette",
  };
  /** How far the sheet is slid down (px), while its top is dragged. */
  protected readonly sheetDrag = signal(0);
  private sheetDragFrom: { id: number; y: number; grip: boolean } | null = null;
  private readonly sheetInner =
    viewChild<ElementRef<HTMLElement>>("sheetInner");
  /** The open sheet's content height: set on the sheet so that it grows / shrinks with a transition. */
  protected readonly sheetHeight = signal<number | null>(null);
  protected readonly trayColors = computed(() =>
    this.recentColors().slice(0, TRAY_COLORS)
  );
  protected readonly layerInfo = computed(() =>
    LAYERS.find((l) => l.id === this.layer())!
  );
  /** Faces of the selected part, to pick one without aiming at it in 3D. */
  protected readonly partFaces = computed(() => {
    const part = this.selectedPart();
    if (!part) {
      return [];
    }
    const faces: BoxFace[] =
      part.kind === "box"
        ? ["front", "back", "top", "left", "right", "bottom"]
        : ["front"];
    return faces.map((face) => ({
      face,
      label: part.kind === "box" ? FACE_LABELS[face] : "Face",
    }));
  });
  protected readonly model = signal<EditableModel | null>(null);
  protected readonly selection = signal<Selection | null>(null);
  protected readonly status = signal("");
  protected readonly atlasPreview = signal<string | null>(null);
  protected readonly tools = TOOLS;
  protected readonly mode = signal<Mode>("select");
  protected readonly tool = signal<Tool>("pencil");
  protected readonly color = signal("#e04040");
  protected readonly rectFilled = signal(false);
  protected readonly layers = LAYERS;
  protected readonly grays = GRAYS;
  /** Layer painted (and shown in 3D when it is a grayscale one). */
  protected readonly layer = signal<LayerName>("color");
  protected readonly layerHint = computed(
    () => LAYERS.find((l) => l.id === this.layer())!.hint
  );
  /** Value painted on the grayscale layers. */
  protected readonly gray = signal(255);
  /** 3D view by night (the night layer lights up). */
  protected readonly night = signal(false);
  /** Preview inset (shown with a grayscale layer) by night: on with the night layer, by day with the others. */
  protected readonly previewNight = signal(false);
  protected readonly previewSize = PREVIEW_SIZE;
  /** Folded / unfolded sections of the panel (remembered). */
  protected readonly sections = signal<Record<PanelSection, boolean>>({
    model: true,
    parts: true,
    part: true,
    layer: true,
    drawing: true,
    color: true,
    face: true,
    ...loadJson<Partial<Record<PanelSection, boolean>>>(SECTIONS_KEY, {}), // sections added later: open
  });
  /** Big 2D view of the selected face, over the left of the 3D view (remembered). */
  protected readonly bigView = signal(loadJson(BIG_VIEW_KEY, { on: false }).on);
  protected readonly previewMargin = PREVIEW_MARGIN;
  /** Changes when face pixels changed (2D view redraw). */
  protected readonly paintVersion = signal(0);

  /** Texture of the selected face. */
  protected readonly faceTexture = computed(() => {
    const sel = this.selection();
    const texId = sel?.face ? this.selectedPart()?.faces[sel.face] : undefined;
    const tex = texId ? this.model()?.textures[texId] : undefined;
    return texId && tex ? { texId, tex } : null;
  });

  protected readonly parts = computed(() => {
    const counts = { box: 0, plane: 0 };
    return (this.model()?.parts ?? []).map(
      (part) =>
        `${part.kind === "box" ? "Box" : "Plane"} ${++counts[part.kind]}`
    );
  });

  protected readonly selectedPart = computed<EditablePart | null>(() => {
    const sel = this.selection();
    return sel ? (this.model()?.parts[sel.partIndex] ?? null) : null;
  });

  protected readonly faceInfo = computed(() => {
    const model = this.model();
    const sel = this.selection();
    const part = this.selectedPart();
    if (!model || !sel?.face || !part) {
      return null;
    }
    const texId = part.faces[sel.face]!;
    const tex = model.textures[texId];
    const linked =
      model.parts.reduce(
        (n, p) =>
          n + Object.values(p.faces).filter((id) => id === texId).length,
        0
      ) - 1;
    return {
      face: part.kind === "box" ? FACE_LABELS[sel.face] : "Face",
      size: `${tex.w} × ${tex.h} px`,
      linked,
    };
  });

  constructor() {
    // The open section sheet (its ✕): closed by Escape and by the back button, before the editor
    inject(EscapeService).track(
      () => this.sheet(),
      () => this.sheet.set(null)
    );
    inject(EscapeService).track(
      () => this.motionPreview(),
      () => this.stopMotionPreview()
    );
    // The light points drawn over the model (the selected one bigger)
    effect(() => {
      this.model();
      this.lightIndex();
      this.syncLights();
    });
    inject(EscapeService).track(
      () => this.placingLight(),
      () => this.placingLight.set(false)
    );
    effect((onCleanup) => {
      const inner = this.sheetInner()?.nativeElement;
      if (!inner) {
        this.sheetHeight.set(null);
        return;
      }
      const observer = new ResizeObserver(() =>
        this.sheetHeight.set(inner.offsetHeight)
      );
      observer.observe(inner);
      onCleanup(() => observer.disconnect());
    });
    this.phone.set(this.phoneQuery.matches);
    this.phoneQuery.addEventListener("change", this.onPhoneChange);
  }

  async ngAfterViewInit() {
    this.scene = new ModelEditorScene(this.viewport().nativeElement);
    this.scene.onPartMoved = (partIndex, pos) =>
      this.edit((model) => (model.parts[partIndex].pos = pos));
    this.syncLights();
    // Capture phase: decides before the camera controls whether a press paints the model or turns the camera
    const viewport = this.viewport().nativeElement;
    viewport.addEventListener("pointerdown", (e) => this.paint3dDown(e), {
      capture: true,
    });
    viewport.addEventListener("pointermove", (e) => this.paint3dMove(e));
    viewport.addEventListener("pointermove", (e) => this.trackTouch(e), {
      capture: true,
    });
    viewport.addEventListener("pointerup", (e) => this.untrackTouch(e), {
      capture: true,
    });
    viewport.addEventListener("pointercancel", (e) => this.untrackTouch(e), {
      capture: true,
    });
    await this.refreshStoredIds();
    const id = this.modelId() ?? this.routeId;
    this.open(
      id && (this.modelIds.includes(id) || this.storedIds().includes(id))
        ? id
        : this.modelIds[0]
    );
  }

  ngOnDestroy() {
    this.phoneQuery.removeEventListener("change", this.onPhoneChange);
    this.saver.flush();
    if (this.confirmTimer) {
      clearTimeout(this.confirmTimer);
    }
    this.scene?.dispose();
  }

  // --- Model ---

  /** Opens the browser's version of a model if there is one, else the game's. */
  protected async open(id: string, fromGame = false) {
    await this.saver.flush();
    const stored = fromGame ? null : await loadStoredModel(id);
    if (stored) {
      this.show(stored, id);
      this.status.set(
        this.modelIds.includes(id)
          ? "Version modifiée, enregistrée dans le navigateur : c'est elle que le jeu utilise."
          : ""
      );
      return;
    }
    const source = CODE_MODELS.find((m) => m.id === id);
    if (!source) {
      return;
    }
    this.status.set("Chargement…");
    try {
      const [atlas, maps] = await Promise.all([
        loadImagePixels(source.tex.link),
        loadModelMaps(source),
      ]);
      this.show(importModel(source, atlas, maps), null);
      this.status.set("");
    } catch (e) {
      this.status.set((e as Error).message);
    }
  }

  protected create() {
    this.show(newModel(this.freeId(NEW_MODEL_ID)), null);
    this.saver.save();
    this.select({ partIndex: 0, face: null });
  }

  protected rename(value: string) {
    const wanted =
      value
        .trim()
        .toLowerCase()
        .replace(/[^\da-z]+/g, "-")
        .replace(/^-+|-+$/g, "") || NEW_MODEL_ID;
    const id = wanted === this.model()?.id ? wanted : this.freeId(wanted);
    this.edit((model) => (model.id = id), false);
  }

  /** Forgets the browser's version: back to the model of the game (click twice). */
  protected async revert() {
    const id = this.model()?.id;
    if (!id) {
      return;
    }
    if (!this.confirmRevert()) {
      this.confirmRevert.set(true);
      this.confirmTimer = setTimeout(
        () => this.confirmRevert.set(false),
        CONFIRM_TIME
      );
      return;
    }
    this.confirmRevert.set(false);
    await this.saver.flush();
    await forgetStoredModel(id);
    await this.refreshStoredIds();
    this.open(id, true);
  }

  protected undo() {
    const model = this.model();
    const previous = model && this.history.undo(model);
    if (previous) {
      this.restore(previous);
    }
  }

  protected redo() {
    const model = this.model();
    const next = model && this.history.redo(model);
    if (next) {
      this.restore(next);
    }
  }

  protected setSway(value: number) {
    value = Math.round(value * 10) / 10; // the − / + steps add up without float noise
    this.edit(
      (model) => (model.sway = value > 0 ? Math.min(1, value) : undefined),
      false
    );
  }

  /** The color of what lights up at night (null: the warm light of windows). */
  protected setGlow(color: string | null) {
    this.edit((model) => (model.glow = color ?? undefined), true);
  }

  // --- Light points (design/model-editor-mobile.pen screen 12) ---

  /** The light point shown in the sheet (its index), and whether the next tap on the model places it. */
  protected readonly lightIndex = signal<number | null>(null);
  protected readonly placingLight = signal(false);
  protected readonly lightSummary = lightSummary;

  private syncLights(): void {
    this.scene?.setLights(this.model()?.lights ?? [], this.lightIndex());
  }

  protected addLight(): void {
    const model = this.model();
    const count = model?.lights?.length ?? 0;
    this.edit(
      (m) =>
        (m.lights = [
          ...(m.lights ?? []),
          {
            ...defaultLight(),
            name: `Lumière ${count + 1}`,
            // (above the model's middle until it is placed)
            pos: { x: 0, y: Math.round(m.hitBox.max.y || 8), z: 0 },
          },
        ]),
      false
    );
    this.lightIndex.set(count);
    this.placingLight.set(true);
  }

  protected setLight(index: number, spec: LightSpec): void {
    this.edit(
      (m) =>
        (m.lights = (m.lights ?? []).map((l, i) =>
          i === index
            ? { ...spec, pos: l.pos, ...(l.name ? { name: l.name } : {}) }
            : l
        )),
      false
    );
  }

  protected removeLight(index: number): void {
    this.edit((m) => {
      const left = (m.lights ?? []).filter((_, i) => i !== index);
      m.lights = left.length > 0 ? left : undefined;
    }, false);
    this.lightIndex.set(null);
    this.placingLight.set(false);
  }

  /** A tap on the model while placing: the light point goes there. */
  private placeLight(event: PointerEvent): boolean {
    const index = this.lightIndex();
    if (!this.placingLight() || index === null || !this.scene) {
      return false;
    }
    const point = this.scene.pickPoint(event.clientX, event.clientY);
    if (point) {
      this.edit(
        (m) =>
          (m.lights = (m.lights ?? []).map((l, i) =>
            i === index ? { ...l, pos: point } : l
          )),
        false
      );
      this.placingLight.set(false);
    }
    return true;
  }

  /** The model's action zone (the whole object: none kept). */
  protected setZone(zone: ActionZone) {
    this.edit(
      (model) =>
        (model.zone = isWholeObject(zone) ? undefined : structuredClone(zone)),
      false
    );
  }

  protected async export() {
    const model = this.model();
    if (!model) {
      return;
    }
    const result = exportModel(model);
    const png = await atlasToPng(result.atlas);
    downloadFile(`md-${model.id}.ts`, result.source);
    downloadFile(`${model.id}.png`, png);
    const maps = Object.entries(result.maps);
    for (const [layer, map] of maps) {
      downloadFile(`${model.id}-${layer}.png`, await atlasToPng(map));
    }
    const previous = this.atlasPreview();
    if (previous) {
      URL.revokeObjectURL(previous);
    }
    this.atlasPreview.set(URL.createObjectURL(png));
    const isNew = !this.modelIds.includes(model.id);
    const pngs = [model.id, ...maps.map(([layer]) => `${model.id}-${layer}`)]
      .map((name) => `${name}.png`)
      .join(", ");
    this.status.set(
      `Exporté : md-${model.id}.ts (→ src/assets/models/) et ${pngs} (→ src/assets/tex/), atlas ${result.atlas.width} × ${result.atlas.height}.` +
        (isNew
          ? ` Nouveau modèle : ajoute ${result.constName} dans src/assets/models/models.ts, { model: ${result.constName} } dans` +
            ` MODEL_CHOICES (ModelChoice.ts) pour la palette de la carte, et son nom dans MODEL_LABELS (ModelChoice.ts).`
          : "")
    );
  }

  // --- Parts ---

  protected add(kind: EditablePart["kind"]) {
    let index = 0;
    this.edit((model) => (index = addPart(model, kind)));
    this.select({ partIndex: index, face: null });
  }

  protected duplicate() {
    const sel = this.selection();
    if (!sel) {
      return;
    }
    let index = 0;
    this.edit((model) => (index = duplicatePart(model, sel.partIndex)));
    this.select({ partIndex: index, face: null });
  }

  protected remove() {
    const sel = this.selection();
    if (!sel) {
      return;
    }
    this.select(null);
    this.edit((model) => removePart(model, sel.partIndex));
  }

  protected selectPart(partIndex: number) {
    this.select({ partIndex, face: null });
  }

  /** Size in whole units (at least 1); a plane has no depth. */
  protected setSize(axis: Axis, value: number) {
    const sel = this.selection();
    const part = this.selectedPart();
    if (!sel || !part || !Number.isFinite(value)) {
      return;
    }
    const size: Vec3 = { ...part.size, [axis]: Math.max(1, Math.round(value)) };
    this.edit((model) => resizePart(model, sel.partIndex, size));
  }

  protected setPos(axis: Axis, value: number) {
    this.editPart(
      (part) => (part.pos = { ...part.pos, [axis]: value }),
      Number.isFinite(value)
    );
  }

  /** Rotation typed in degrees, kept in radians. */
  protected setRot(axis: Axis, degrees: number) {
    this.editPart(
      (part) => (part.rot = { ...part.rot, [axis]: (degrees * Math.PI) / 180 }),
      Number.isFinite(degrees)
    );
  }

  protected degrees(radians: number): number {
    return Math.round(((radians * 180) / Math.PI) * 100) / 100;
  }

  protected vecValue(part: EditablePart, kind: VecKind, axis: Axis): number {
    if (kind === "size") {
      return part.size[axis];
    }
    return kind === "pos" ? part.pos[axis] : this.degrees(part.rot[axis]);
  }

  protected setVec(kind: VecKind, axis: Axis, value: number) {
    if (kind === "size") {
      this.setSize(axis, value);
    } else if (kind === "pos") {
      this.setPos(axis, value);
    } else {
      this.setRot(axis, value);
    }
  }

  /** − / + of a number of the selected part. */
  protected stepVec(kind: VecKind, axis: Axis, steps: number) {
    const part = this.selectedPart();
    if (part) {
      this.setVec(
        kind,
        axis,
        this.vecValue(part, kind, axis) +
          steps * VECS.find((v) => v.kind === kind)!.step
      );
    }
  }

  /** Moves the selected part by one unit (the arrows of the phone layout). */
  protected nudge(axis: Axis, delta: number) {
    this.stepVec("pos", axis, delta);
  }

  /** Quarter turn of the selected part around the vertical axis. */
  protected turn() {
    this.stepVec("rot", "y", 6);
  }

  protected setSide(value: string) {
    this.editPart((part) => (part.side = Number(value) as ObjSide));
  }

  protected setFlag(flag: "depthWrite" | "depthTest", value: boolean) {
    this.editPart((part) => (part[flag] = value));
  }

  // --- Movement ---

  /** Aucun (null: the part stays still), or a kind of movement with its usual settings. */
  protected setMotionKind(kind: MotionKind | null) {
    if (kind === (this.selectedPart()?.motion?.kind ?? null)) {
      return;
    }
    this.editPart((part) => {
      if (kind) {
        part.motion = newMotion(kind);
      } else {
        delete part.motion;
      }
    });
  }

  protected setMotion<K extends keyof PartMotion>(
    key: K,
    value: PartMotion[K]
  ) {
    const motion = this.selectedPart()?.motion;
    if (motion && motion[key] !== value) {
      this.editPart((part) => (part.motion = { ...motion, [key]: value }));
    }
  }

  /** The angle / distance or the duration typed (seconds: steps of 0.1, at least 0.1). */
  protected setMotionNumber(key: "amount" | "duration", value: number) {
    if (!Number.isFinite(value)) {
      return;
    }
    this.setMotion(
      key,
      key === "duration"
        ? Math.max(0.1, Math.round(value * 10) / 10)
        : Math.round(value * 100) / 100
    );
  }

  protected stepMotion(key: "amount" | "duration", steps: number) {
    const motion = this.selectedPart()?.motion;
    if (motion) {
      this.setMotionNumber(
        key,
        motion[key] + steps * motionStep(motion.kind, key)
      );
    }
  }

  /** « Voir le mouvement »: plays the model's movements in the 3D view, the player near. */
  protected previewMotion() {
    if (!this.scene || !this.previewedMotion()) {
      return;
    }
    this.sheet.set(null);
    this.motionPreview.set({ paused: false, near: true });
    this.scene.motionPaused = false;
    this.scene.motionDrive = () =>
      this.motionPreview()?.near ? "play" : "rest";
    this.scene.gizmoEnabled = false;
    this.scene.playMotions(true);
  }

  protected stopMotionPreview() {
    if (!this.motionPreview()) {
      return;
    }
    this.motionPreview.set(null);
    if (this.scene) {
      this.scene.motionPaused = false;
      this.scene.playMotions(false);
      this.scene.gizmoEnabled = this.mode() === "select";
    }
  }

  protected pauseMotion(paused: boolean) {
    this.motionPreview.update((p) => p && { ...p, paused });
    if (this.scene) {
      this.scene.motionPaused = paused;
    }
  }

  /** « Le joueur arrive »: the triggered movements play (on) or go back to rest (off). */
  protected setPlayerNear(near: boolean) {
    this.motionPreview.update((p) => p && { ...p, near });
  }

  /** « Rejouer »: from rest again. */
  protected replayMotion() {
    this.pauseMotion(false);
    this.scene?.replayMotions();
  }

  // --- Layers ---

  protected setLayer(layer: LayerName) {
    this.layer.set(layer);
    this.setPreviewNight(layer === "night");
    this.scene?.setView({ layer, night: this.night() });
    this.paintVersion.update((v) => v + 1);
  }

  protected setNight(night: boolean) {
    this.night.set(night);
    this.scene?.setView({ layer: this.layer(), night });
  }

  protected setPreviewNight(night: boolean) {
    this.previewNight.set(night);
    this.scene?.setPreviewNight(night);
  }

  protected setBumpScale(value: number) {
    value = Math.round(value * 10) / 10;
    if (Number.isFinite(value) && value > 0) {
      this.edit((model) => (model.bumpScale = value));
    }
  }

  // --- Painting ---

  protected setMode(mode: Mode) {
    this.stopMotionPreview();
    this.mode.set(mode);
    if (this.scene) {
      this.scene.gizmoEnabled = mode === "select";
    }
  }

  protected pickTool(tool: Tool) {
    this.tool.set(tool);
    this.setMode("paint");
  }

  /** Press on the 2D view of the selected face (it is a drawing surface: the painting mode is on). */
  protected strokeStart(px: Px) {
    const face = this.faceTexture();
    if (face) {
      this.setMode("paint");
      this.startStroke(face.texId, px, false);
    }
  }

  protected strokeMove(px: Px) {
    if (this.active && !this.active.in3d) {
      this.applyStroke(px);
    }
  }

  protected strokeEnd() {
    this.endStroke();
  }

  /** The stroke turned out to be a two-finger gesture (zoom, pan): undo what it painted. */
  protected cancelStroke() {
    const tool = this.tool();
    this.active = null;
    const before = tool === "picker" ? null : this.history.drop();
    if (before) {
      this.restore(before);
    }
  }

  private startStroke(texId: string, px: Px, in3d: boolean) {
    const model = this.model()!;
    if (this.tool() !== "picker") {
      this.record(model);
    }
    const layer = this.layer();
    const grid = layerGrid(model.textures[texId], layer);
    const value =
      layer === "color" ? hexToRgba(this.snap(this.color())) : [this.gray()];
    const stroke = new PaintStroke(
      grid,
      this.tool(),
      value,
      this.rectFilled(),
      (picked) => {
        // Like most pixel art tools: pick a color, then draw with it
        if (layer !== "color") {
          this.gray.set(picked[0]);
          this.tool.set("pencil");
        } else if (picked[3] > 0) {
          this.setColor(rgbaToHex(picked));
          this.tool.set("pencil");
        }
      }
    );
    this.active = { texId, stroke, in3d };
    this.applyStroke(px);
  }

  private applyStroke(px: Px) {
    if (this.active?.stroke.apply(px)) {
      this.scene?.updateTexture(this.active.texId);
      this.paintVersion.update((v) => v + 1);
    }
  }

  private endStroke() {
    const tool = this.tool();
    if (this.active && tool !== "picker") {
      if (tool !== "eraser" && this.layer() === "color") {
        this.useColor(this.color());
      }
      this.paletteVersion.update((v) => v + 1);
      this.saver.schedule();
    }
    this.active = null;
    if (this.scene) {
      this.scene.orbitEnabled = true;
    }
  }

  /** Painting mode: a press on the model paints it (the camera does not turn), elsewhere the camera turns. */
  private paint3dDown(event: PointerEvent) {
    if (!event.isTrusted) {
      // the finger handed to the camera controls (cancelStroke3d)
      return;
    }
    if (event.pointerType === "touch") {
      this.touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (this.touches.size > 1) {
        this.multiTouch = true;
        this.pressAt = null;
        if (this.active?.in3d) {
          this.cancelStroke3d(event.pointerId);
        }
        return;
      }
    }
    if (
      this.fromPreview(event) ||
      this.mode() !== "paint" ||
      event.button !== 0 ||
      !this.scene ||
      this.pending()
    ) {
      return;
    }
    const pick = this.scene.pick(event.clientX, event.clientY, true);
    const texId = pick && this.model()?.parts[pick.partIndex].faces[pick.face];
    if (!pick || !texId) {
      return;
    }
    this.scene.orbitEnabled = false;
    this.pressAt = null;
    this.viewport().nativeElement.setPointerCapture(event.pointerId);
    this.select({ partIndex: pick.partIndex, face: pick.face });
    if (event.pointerType === "touch") {
      haptic("tick");
    }
    this.startStroke(texId, pick.px, true);
  }

  /**
   * A second finger came while the first one was painting the model: it is a pinch. The stroke is undone and
   * the first finger is handed to the camera controls (they were off when it touched), so both fingers zoom.
   */
  private cancelStroke3d(secondId: number) {
    this.cancelStroke();
    if (!this.scene) {
      return;
    }
    this.scene.orbitEnabled = true;
    const canvas = this.viewport().nativeElement.querySelector("canvas");
    this.touches.forEach((pos, pointerId) => {
      if (pointerId !== secondId) {
        canvas?.dispatchEvent(
          new PointerEvent("pointerdown", {
            pointerId,
            pointerType: "touch",
            isPrimary: true,
            button: 0,
            buttons: 1,
            clientX: pos.x,
            clientY: pos.y,
            bubbles: true,
          })
        );
      }
    });
  }

  private trackTouch(event: PointerEvent) {
    if (this.touches.has(event.pointerId)) {
      this.touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
    }
  }

  private untrackTouch(event: PointerEvent) {
    this.touches.delete(event.pointerId);
    if (this.touches.size === 0) {
      this.multiTouch = false;
    }
  }

  /** Drag while painting on the model: follows the pointer on the faces showing the same texture. */
  private paint3dMove(event: PointerEvent) {
    if (!this.active?.in3d || !this.scene) {
      return;
    }
    const pick = this.scene.pick(event.clientX, event.clientY, true);
    if (
      pick &&
      this.model()?.parts[pick.partIndex].faces[pick.face] === this.active.texId
    ) {
      this.applyStroke(pick.px);
    }
  }

  protected async importPalette(input: HTMLInputElement) {
    const file = input.files?.[0];
    input.value = ""; // the same file can be chosen again
    if (!file) {
      return;
    }
    try {
      const { name, colors } = await readPaletteFile(file);
      this.updatePalette({
        name,
        colors,
        locked: this.importedPalette()?.locked ?? false,
      });
      this.status.set(`Palette « ${name} » : ${colors.length} couleurs.`);
    } catch (e) {
      this.status.set((e as Error).message);
    }
  }

  protected removePalette() {
    this.updatePalette(null);
  }

  protected setPaletteLocked(locked: boolean) {
    const palette = this.importedPalette();
    if (palette) {
      this.updatePalette({ ...palette, locked });
    }
  }

  private updatePalette(palette: StoredPalette | null) {
    this.importedPalette.set(palette);
    saveImportedPalette(palette);
    this.color.set(this.snap(this.color()));
  }

  /** With a locked palette: its color closest to `color`. */
  private snap(color: string): string {
    const palette = this.importedPalette();
    return palette?.locked ? nearestColor(color, palette.colors) : color;
  }

  // --- Panel ---

  protected toggleSection(section: PanelSection, open: boolean) {
    if (this.sections()[section] !== open) {
      this.sections.update((s) => ({ ...s, [section]: open }));
      writeJson(SECTIONS_KEY, this.sections());
    }
  }

  /** Modeling (parts) or painting (faces): the bars and sheets shown follow it. */
  protected setEditorMode(mode: Mode) {
    this.setMode(mode);
    this.sheet.set(null);
  }

  protected toggleSheet(sheet: Sheet) {
    this.sheet.update((open) => (open === sheet ? null : sheet));
  }

  /** Slide the sheet down by its top to close it (not from its buttons: they are tapped). */
  protected sheetDragStart(event: PointerEvent) {
    if (
      (event.target as HTMLElement).closest("button, label, input") ||
      this.sheetDragFrom
    ) {
      return;
    }
    this.sheetDragFrom = {
      id: event.pointerId,
      y: event.clientY,
      grip: (event.target as HTMLElement).classList.contains("grip"),
    };
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  protected sheetDragMove(event: PointerEvent) {
    if (this.sheetDragFrom?.id === event.pointerId) {
      this.sheetDrag.set(Math.max(0, event.clientY - this.sheetDragFrom.y));
    }
  }

  protected sheetDragEnd(event: PointerEvent) {
    const from = this.sheetDragFrom;
    if (from?.id !== event.pointerId) {
      return;
    }
    this.sheetDragFrom = null;
    // Down far enough, or a tap on the grip: close
    if (
      this.sheetDrag() > 60 ||
      (from.grip && event.type === "pointerup" && this.sheetDrag() < 4)
    ) {
      this.sheet.set(null);
    }
    this.sheetDrag.set(0);
  }

  protected cancelFaceAction() {
    this.pending.set(null);
    this.status.set("");
  }

  protected setBigView(on: boolean) {
    this.bigView.set(on);
    writeJson(BIG_VIEW_KEY, { on });
  }

  // --- Pointer / keyboard ---

  /** Pointer on the preview inset (not on the model of the big view). */
  private fromPreview(event: PointerEvent): boolean {
    return !!(event.target as HTMLElement).closest(".preview");
  }

  protected onPointerDown(event: PointerEvent) {
    if (!event.isTrusted || this.multiTouch) {
      return;
    }
    const busy = this.fromPreview(event) || this.scene?.onGizmo || this.active;
    this.pressAt = busy ? null : { x: event.clientX, y: event.clientY };
  }

  protected onPointerUp(event: PointerEvent) {
    if (this.active?.in3d) {
      this.endStroke();
      return;
    }
    const press = this.pressAt;
    this.pressAt = null;
    if (
      !press ||
      Math.hypot(event.clientX - press.x, event.clientY - press.y) >
        CLICK_TOLERANCE
    ) {
      return;
    }
    if (this.placeLight(event)) {
      return;
    }
    const pick = this.scene?.pick(
      event.clientX,
      event.clientY,
      !!this.pending()
    );
    if (this.pending()) {
      if (pick) {
        this.applyFaceAction(pick.partIndex, pick.face);
      }
      return;
    }
    this.select(pick ? { partIndex: pick.partIndex, face: pick.face } : null);
  }

  // --- Faces ---

  /** Selects a face of the selected part (face buttons: no need to aim at it in 3D). */
  protected selectFace(face: BoxFace) {
    const sel = this.selection();
    if (sel) {
      this.select({ partIndex: sel.partIndex, face });
    }
  }

  protected unlink() {
    const sel = this.selection();
    if (sel?.face) {
      this.edit((model) => unlinkFace(model, sel.partIndex, sel.face!));
    }
  }

  /** Mirrors the selected face's pixels (and the faces linked to it). */
  protected flip(horizontal: boolean) {
    const face = this.faceTexture();
    if (face) {
      this.edit((model) =>
        flipTexture(model.textures[face.texId], horizontal, !horizontal)
      );
      this.paintVersion.update((v) => v + 1);
    }
  }

  /** Next click on a face: link it to the selected face, or copy the selected face on it. */
  protected startFaceAction(kind: PendingFaceAction["kind"]) {
    const face = this.faceTexture();
    if (!face) {
      return;
    }
    this.pending.set({ kind, texId: face.texId });
    this.sheet.set(null);
    if (this.phone()) {
      this.setBigView(false); // the target face is touched in 3D
    }
    this.status.set(
      kind === "link"
        ? "Touche la face à lier (même taille)."
        : "Touche la face où copier."
    );
  }

  private applyFaceAction(partIndex: number, face: BoxFace) {
    const action = this.pending()!;
    this.pending.set(null);
    let linked = true;
    if (action.kind === "link") {
      this.edit(
        (model) => (linked = linkFace(model, action.texId, partIndex, face))
      );
    } else {
      this.edit((model) =>
        copyFace(
          model,
          action.texId,
          partIndex,
          face,
          this.mirrorH(),
          this.mirrorV()
        )
      );
    }
    this.status.set(
      linked ? "" : "Pas lié : les deux faces doivent avoir la même taille."
    );
    this.select({ partIndex, face });
    this.paintVersion.update((v) => v + 1);
  }

  // --- Colors ---

  /** Current color; with a locked palette, its closest color. */
  protected setColor(color: string) {
    this.color.set(this.snap(color));
  }

  /** Color used by the tools (stored in the recent ones). */
  protected useColor(color: string) {
    color = this.snap(color);
    this.color.set(color);
    const recent = [
      color,
      ...this.recentColors().filter((c) => c !== color),
    ].slice(0, RECENT_COLORS);
    this.recentColors.set(recent);
    saveRecentColors(recent);
  }

  @HostListener("document:keydown", ["$event"])
  protected onKey(event: KeyboardEvent) {
    if ((event.target as HTMLElement).closest("input, select, textarea")) {
      return;
    }
    const ctrl = event.ctrlKey || event.metaKey;
    if (ctrl && (event.key === "z" || event.key === "Z")) {
      event.preventDefault();
      if (event.shiftKey) {
        this.redo();
      } else {
        this.undo();
      }
    } else if (ctrl && event.key === "y") {
      event.preventDefault();
      this.redo();
    } else if (
      (event.key === "Delete" || event.key === "Backspace") &&
      this.mode() === "select"
    ) {
      this.remove();
    } else if (event.key === "Escape") {
      if (this.sheet()) {
        this.sheet.set(null);
      } else if (this.pending()) {
        this.pending.set(null);
        this.status.set("");
      } else {
        this.select(null);
      }
    } else if (event.key === "d" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      this.duplicate();
    } else if (!event.ctrlKey && !event.metaKey && !event.altKey) {
      const tool = TOOLS.find((t) => t.key === event.key);
      if (tool) {
        this.pickTool(tool.id);
      } else if (event.key === "v") {
        this.setMode("select");
      } else if (event.key === "g") {
        this.setBigView(!this.bigView());
      }
    }
  }

  // --- Helpers ---

  private show(model: EditableModel, storedAs: string | null) {
    this.stopMotionPreview();
    this.saver.flush();
    this.saver.storedAs = storedAs;
    this.history.clear();
    this.updateHistory();
    this.pending.set(null);
    this.model.set(model);
    this.atlasPreview.set(null);
    this.scene?.setModel(model);
    this.select(null);
    this.paletteVersion.update((v) => v + 1);
  }

  /** Back to a copy of the model from the history. */
  private restore(model: EditableModel) {
    this.updateHistory();
    this.model.set(model);
    this.scene?.refresh(model);
    const sel = this.selection();
    this.select(sel && model.parts[sel.partIndex] ? sel : null);
    this.stopPreviewIfStill();
    this.paintVersion.update((v) => v + 1);
    this.paletteVersion.update((v) => v + 1);
    this.saver.schedule();
  }

  private record(model: EditableModel) {
    this.history.record(model);
    this.updateHistory();
  }

  private updateHistory() {
    this.canUndo.set(this.history.canUndo);
    this.canRedo.set(this.history.canRedo);
  }

  private async refreshStoredIds() {
    this.storedIds.set(await storedModelIds());
  }

  /**
   * Back to the game, which then uses the models saved here: over the game, the panel closes (the game draws the
   * models again); on its own page, the game page is loaded.
   */
  protected async backToGame(event: Event) {
    event.preventDefault();
    if (this.embedded()) {
      await this.requestClose();
      return;
    }
    await this.saver.flush();
    const url = new URL(location.href);
    url.hash = "#/";
    location.assign(url);
    location.reload();
  }

  /** Over the game (Jeu, the back button): the model is saved, then the panel closes (the game reads it). */
  async requestClose(): Promise<void> {
    await this.saver.flush();
    this.closed.emit();
  }

  /** `id`, or `id-2`, `id-3`… if a model already has it. */
  private freeId(id: string): string {
    const taken = new Set([...this.modelIds, ...this.storedIds()]);
    let free = id;
    for (let i = 2; taken.has(free); i++) {
      free = `${id}-${i}`;
    }
    return free;
  }

  /** Changes the model, then shows it again (keeping the selection). */
  private edit(change: (model: EditableModel) => void, rebuild = true) {
    const model = this.model();
    if (!model) {
      return;
    }
    this.record(model);
    change(model);
    this.model.set({ ...model });
    this.saver.schedule();
    if (rebuild) {
      this.scene?.refresh(this.model()!);
      const sel = this.selection();
      this.scene?.highlight(sel?.partIndex ?? null, sel?.face ?? null);
    }
    this.stopPreviewIfStill();
  }

  /** No part moves any more: the preview stops. */
  private stopPreviewIfStill() {
    if (this.motionPreview() && !this.previewedMotion()) {
      this.stopMotionPreview();
    }
  }

  private editPart(change: (part: EditablePart) => void, valid = true) {
    const sel = this.selection();
    if (sel && valid) {
      this.edit((model) => change(model.parts[sel.partIndex]));
    }
  }

  private select(selection: Selection | null) {
    this.selection.set(selection);
    this.scene?.highlight(
      selection?.partIndex ?? null,
      selection?.face ?? null
    );
  }
}
