import {
  LucideDoorOpen,
  LucideLocateFixed,
  LucideMap,
  LucideMinus,
  LucidePlus,
  LucideX,
} from "@lucide/angular";
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from "@angular/core";
import { EscapeService } from "../../../core/shared/service/escape.service";
import { loadDatabase } from "../../database-editor/shared/database-storage";
import { drawMapPlan, MapPlan } from "../shared/model/map-plan";
import { MapHelper } from "../shared/model/MapHelper";
import { MapKind } from "../shared/model/SceneMap";
import { listMaps } from "../shared/services/map-storage";

const KIND_LABELS: Record<MapKind, string> = {
  world: "Extérieur",
  town: "Ville",
  interior: "Intérieur",
  dungeon: "Donjon",
  room: "Salle de donjon",
  arena: "Arène",
};
/** Screen pixels per plan pixel: whole numbers keep the pixels sharp; the smallest shows the whole map. */
const ZOOM_MAX = 6;
const ZOOM_START = 2;
/** A teleport to a dungeon: `dungeon:<id>`. */
const DUNGEON = "dungeon:";

/**
 * Menu → Carte (design/main-view.pen, Carte): the plan of the map the player is on (see map-plan.ts), drawn once when
 * the window opens. Over it: the player (an orange dot), a number on each passage to another map, listed under the
 * plan. The plan is dragged, zoomed with + / − (or the wheel), the target button comes back to the player. Closed by
 * the ✕, the backdrop or Escape.
 */
@Component({
  selector: "game-map-plan",
  imports: [
    LucideDoorOpen,
    LucideLocateFixed,
    LucideMap,
    LucideMinus,
    LucidePlus,
    LucideX,
  ],
  templateUrl: "./map-plan.component.html",
  styleUrl: "./map-plan.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPlanComponent {
  readonly mapHelper = input.required<MapHelper>();
  readonly closed = output<void>();

  private readonly view =
    viewChild.required<ElementRef<HTMLCanvasElement>>("view");
  private plan: MapPlan | null = null;
  protected readonly ready = signal(false);
  /** The view's size on the screen (css px). */
  private readonly size = signal({ w: 0, h: 0 });
  /** Screen pixels per plan pixel, and the plan point at the view's center. */
  protected readonly zoom = signal(ZOOM_START);
  private readonly center = signal({ x: 0, y: 0 });
  /** The smallest zoom: the whole map in the view (1 at most). */
  private readonly zoomMin = signal(1);
  private drag: { id: number; x: number; y: number } | null = null;

  protected readonly title = computed(() => this.mapHelper().sceneMap.name);
  protected readonly kind = computed(
    () => KIND_LABELS[this.mapHelper().sceneMap.kind]
  );
  /** The player on the plan (plan px). */
  private readonly player = signal({ x: 0, y: 0 });
  /** The passages to other maps: their number, where they lead, where they are (plan px). */
  protected readonly passages = signal<
    { n: number; name: string; kind: string; x: number; y: number }[]
  >([]);
  /** Where the player and the passages are in the view (css px), and whether they show. */
  protected readonly marks = computed(() => {
    const at = (p: { x: number; y: number }) => {
      const { w, h } = this.size();
      const x = (p.x - this.center().x) * this.zoom() + w / 2;
      const y = (p.y - this.center().y) * this.zoom() + h / 2;
      return { x, y, seen: x >= 0 && x <= w && y >= 0 && y <= h };
    };
    return {
      player: at(this.player()),
      passages: this.passages().map((p) => ({ n: p.n, ...at(p) })),
    };
  });
  protected readonly canZoomIn = computed(() => this.zoom() < ZOOM_MAX);
  protected readonly canZoomOut = computed(() => this.zoom() > this.zoomMin());

  constructor() {
    inject(EscapeService).whileAlive(() => this.closed.emit());
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const canvas = this.view().nativeElement;
      const observer = new ResizeObserver(() => this.resize());
      observer.observe(canvas);
      destroyRef.onDestroy(() => observer.disconnect());
      void this.load();
    });
  }

  /** Draws the map's plan, places the player and the passages, and shows the player's surroundings. */
  private async load(): Promise<void> {
    const helper = this.mapHelper();
    const plan = await drawMapPlan(helper.sceneMap);
    this.plan = plan;
    const onPlan = (x: number, z: number) => ({
      x: (x - plan.origin.x) * plan.scale,
      y: (z - plan.origin.z) * plan.scale,
    });
    const pos = helper.scenePlayer.mesh?.position;
    this.player.set(onPlan(pos?.x ?? 0, pos?.z ?? 0));
    const maps = listMaps();
    const dungeons = loadDatabase().dungeons;
    this.passages.set(
      plan.passages.map((p, i) => {
        const dungeon = p.map.startsWith(DUNGEON)
          ? dungeons.find((d) => d.id === p.map.slice(DUNGEON.length))
          : undefined;
        const map = maps.find((m) => m.id === p.map);
        const mapKind = map ? KIND_LABELS[map.kind] : "";
        return {
          n: i + 1,
          name: dungeon?.name ?? map?.name ?? "Lieu inconnu",
          kind: dungeon ? "Donjon" : mapKind,
          ...onPlan(p.x, p.z),
        };
      })
    );
    this.ready.set(true);
    this.resize();
    this.recenter();
  }

  /** The view's size changed (or is known at last): its canvas follows, the smallest zoom too. */
  private resize(): void {
    const canvas = this.view().nativeElement;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) {
      return;
    }
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * ratio);
    canvas.height = Math.round(h * ratio);
    this.size.set({ w, h });
    if (this.plan) {
      const fit = Math.min(
        w / this.plan.canvas.width,
        h / this.plan.canvas.height
      );
      this.zoomMin.set(Math.min(1, fit));
      this.zoom.update((z) => Math.max(z, this.zoomMin()));
    }
    this.draw();
  }

  /** Keeps the view over the plan (a plan smaller than the view stays centered), then draws it. */
  private moveTo(x: number, y: number): void {
    const plan = this.plan;
    if (!plan) {
      return;
    }
    const { w, h } = this.size();
    const halfW = w / this.zoom() / 2;
    const halfH = h / this.zoom() / 2;
    const clamp = (v: number, half: number, total: number) =>
      total <= half * 2 ? total / 2 : Math.min(total - half, Math.max(half, v));
    this.center.set({
      x: clamp(x, halfW, plan.canvas.width),
      y: clamp(y, halfH, plan.canvas.height),
    });
    this.draw();
  }

  private draw(): void {
    const plan = this.plan;
    const canvas = this.view().nativeElement;
    const ctx = canvas.getContext("2d");
    if (!plan || !ctx) {
      return;
    }
    const ratio = canvas.width / (this.size().w || 1);
    const zoom = this.zoom() * ratio;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = this.zoom() < 1;
    ctx.drawImage(
      plan.canvas,
      Math.round(canvas.width / 2 - this.center().x * zoom),
      Math.round(canvas.height / 2 - this.center().y * zoom),
      plan.canvas.width * zoom,
      plan.canvas.height * zoom
    );
  }

  protected recenter(): void {
    this.moveTo(this.player().x, this.player().y);
  }

  /** One step closer or farther: whole zooms, then the whole map. */
  protected zoomBy(step: number): void {
    const min = this.zoomMin();
    const now = this.zoom();
    let next = step > 0 ? Math.floor(now) + 1 : Math.ceil(now) - 1;
    if (next < 1) {
      next = min;
    }
    this.zoom.set(Math.min(ZOOM_MAX, Math.max(min, next)));
    this.moveTo(this.center().x, this.center().y);
  }

  protected wheel(event: WheelEvent): void {
    event.preventDefault();
    this.zoomBy(event.deltaY < 0 ? 1 : -1);
  }

  /** A passage of the list touched: the plan goes to it. */
  protected show(passage: { x: number; y: number }): void {
    this.moveTo(passage.x, passage.y);
  }

  protected dragStart(event: PointerEvent): void {
    this.drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  }

  protected dragMove(event: PointerEvent): void {
    const drag = this.drag;
    if (drag?.id !== event.pointerId) {
      return;
    }
    const zoom = this.zoom();
    this.moveTo(
      this.center().x - (event.clientX - drag.x) / zoom,
      this.center().y - (event.clientY - drag.y) / zoom
    );
    drag.x = event.clientX;
    drag.y = event.clientY;
  }

  protected dragEnd(event: PointerEvent): void {
    if (this.drag?.id === event.pointerId) {
      this.drag = null;
    }
  }
}
