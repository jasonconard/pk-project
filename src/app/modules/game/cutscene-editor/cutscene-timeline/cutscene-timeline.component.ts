import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  signal,
  untracked,
  viewChild,
} from "@angular/core";
import {
  LucideDynamicIcon,
  LucidePause,
  LucidePlay,
  LucidePlus,
  LucideSkipBack,
  LucideTrash,
  LucideUserPlus,
  LucideZoomIn,
  LucideZoomOut,
} from "@lucide/angular";
import { EscapeService } from "../../../../core/shared/service/escape.service";
import { CutBlock } from "../../shared/model/cutscene";
import {
  CutsceneEditorStore,
  snap,
  TimelineRow,
} from "../cutscene-editor.store";
import {
  kindIcon,
  seconds,
  shortSeconds,
  TRACK_ICONS,
} from "../cutscene-labels";

/** The track names' column (px) and the room before 0 s. */
const LABEL = 88;
const PAD = 8;
/** Below this width a block shows its icon only. */
const NARROW = 46;

interface Drag {
  mode: "move" | "size" | "scrub" | "tap";
  pointer: number;
  x0: number;
  id?: string;
  start0: number;
  duration0: number;
  moved: boolean;
}

/**
 * The cutscene's timeline: the transport (start, play, the time, zoom, « + Bloc »), the ruler, one row per track
 * with its blocks (touched: selected; dragged: moved; their right edge: their duration), the playhead (the ruler or
 * an empty lane touched or dragged), adding / taking out a character's track.
 */
@Component({
  selector: "cutscene-timeline",
  imports: [
    LucideDynamicIcon,
    LucidePause,
    LucidePlay,
    LucidePlus,
    LucideSkipBack,
    LucideTrash,
    LucideUserPlus,
    LucideZoomIn,
    LucideZoomOut,
  ],
  templateUrl: "./cutscene-timeline.component.html",
  styleUrl: "./cutscene-timeline.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CutsceneTimelineComponent {
  protected readonly store = inject(CutsceneEditorStore);
  protected readonly seconds = seconds;
  protected readonly trackIcons = TRACK_ICONS;
  protected readonly kindIcon = kindIcon;
  protected readonly LABEL = LABEL;
  protected readonly PAD = PAD;
  protected readonly NARROW = NARROW;

  private readonly scroller =
    viewChild.required<ElementRef<HTMLElement>>("scroller");
  private readonly content =
    viewChild.required<ElementRef<HTMLElement>>("content");
  /** The visible width of the lanes (px). */
  private readonly width = signal(0);
  private drag: Drag | null = null;

  /** The character track whose small menu is open, or « Ajouter un personnage »'s. */
  protected readonly menu = signal<string | null>(null);
  protected readonly confirmRemove = signal(false);

  protected readonly pps = this.store.zoom;
  protected readonly contentWidth = computed(() => {
    const shown = Math.max(0, this.width() - LABEL - PAD);
    return (
      LABEL + PAD + Math.max(shown, (this.store.length() + 3) * this.pps())
    );
  });

  /** The ruler's marks: every 0.5, 1, 2, 5, 10 or 30 s, at least 44 px apart. */
  protected readonly ticks = computed(() => {
    const pps = this.pps();
    const step = [0.5, 1, 2, 5, 10, 30].find((s) => s * pps >= 44) ?? 60;
    const end = (this.contentWidth() - LABEL - PAD) / pps;
    const marks: { t: number; label: string }[] = [];
    for (let t = 0; t <= end; t += step) {
      marks.push({ t, label: shortSeconds(t) });
    }
    return marks;
  });

  constructor() {
    const observer = new ResizeObserver(() =>
      this.width.set(this.scroller().nativeElement.clientWidth)
    );
    effect(() => observer.observe(this.scroller().nativeElement));
    inject(DestroyRef).onDestroy(() => observer.disconnect());

    // A cutscene opened: all of it in view
    let fitted: string | null = null;
    effect(() => {
      const id = this.store.currentId();
      const width = this.width();
      if (!id || width <= 0 || fitted === id) {
        return;
      }
      fitted = id;
      const length = untracked(() => this.store.length());
      const pps = (width - LABEL - PAD - 16) / (length + 1);
      this.store.zoom.set(Math.min(120, Math.max(10, pps)));
    });

    // Playing: the playhead kept in view
    effect(() => {
      const t = this.store.playhead();
      if (!this.store.playing()) {
        return;
      }
      const el = this.scroller().nativeElement;
      const x = PAD + t * this.pps();
      const shown = el.clientWidth - LABEL;
      if (x < el.scrollLeft || x > el.scrollLeft + shown - 20) {
        el.scrollLeft = Math.max(0, x - shown / 3);
      }
    });

    inject(EscapeService).track(
      () => this.menu(),
      () => this.menu.set(null)
    );
  }

  /** A bubble's emote on a small block. */
  protected glyph(emote: string | undefined): string {
    if (emote === "question") {
      return "?";
    }
    return emote === "exclaim" ? "!" : "…";
  }

  protected left(block: CutBlock): number {
    return PAD + block.start * this.pps();
  }

  protected blockWidth(block: CutBlock): number {
    return Math.max(16, block.duration * this.pps());
  }

  // ---------- Pointer ----------

  /** The time under the pointer. */
  private timeAt(ev: PointerEvent): number {
    const rect = this.content().nativeElement.getBoundingClientRect();
    return snap(
      Math.max(0, (ev.clientX - rect.left - LABEL - PAD) / this.pps())
    );
  }

  protected blockDown(
    ev: PointerEvent,
    block: CutBlock,
    mode: "move" | "size"
  ): void {
    ev.stopPropagation();
    if (ev.button !== 0) {
      return;
    }
    (ev.currentTarget as Element).setPointerCapture(ev.pointerId);
    this.drag = {
      mode,
      pointer: ev.pointerId,
      x0: ev.clientX,
      id: block.id,
      start0: block.start,
      duration0: block.duration,
      moved: false,
    };
  }

  /** The ruler: the playhead follows the pointer. */
  protected rulerDown(ev: PointerEvent): void {
    if (ev.button !== 0) {
      return;
    }
    (ev.currentTarget as Element).setPointerCapture(ev.pointerId);
    this.drag = this.scrub(ev);
    this.store.setPlayhead(this.timeAt(ev));
  }

  /** An empty lane: the mouse moves the playhead; a finger too, unless it scrolls the timeline. */
  protected laneDown(ev: PointerEvent): void {
    if (ev.button !== 0) {
      return;
    }
    if (ev.pointerType === "mouse") {
      this.rulerDown(ev);
      return;
    }
    this.drag = { ...this.scrub(ev), mode: "tap" };
  }

  private scrub(ev: PointerEvent): Drag {
    return {
      mode: "scrub",
      pointer: ev.pointerId,
      x0: ev.clientX,
      start0: 0,
      duration0: 0,
      moved: false,
    };
  }

  protected pointerMove(ev: PointerEvent): void {
    const drag = this.drag;
    if (drag?.pointer !== ev.pointerId) {
      return;
    }
    const dx = ev.clientX - drag.x0;
    if (drag.mode === "scrub") {
      this.store.setPlayhead(this.timeAt(ev));
      return;
    }
    if (drag.mode === "tap" || !drag.id) {
      drag.moved ||= Math.abs(dx) > 6;
      return;
    }
    if (!drag.moved) {
      if (Math.abs(dx) < 5) {
        return;
      }
      drag.moved = true;
      this.store.snapshot();
      this.store.select(drag.id);
    }
    const dt = dx / this.pps();
    if (drag.mode === "move") {
      this.store.updateBlock(
        drag.id,
        { start: Math.max(0, snap(drag.start0 + dt)) },
        false
      );
    } else {
      this.store.updateBlock(
        drag.id,
        { duration: Math.max(0.2, snap(drag.duration0 + dt)) },
        false
      );
    }
  }

  protected pointerUp(ev: PointerEvent): void {
    const drag = this.drag;
    if (drag?.pointer !== ev.pointerId) {
      return;
    }
    this.drag = null;
    if (drag.mode === "tap" && !drag.moved) {
      this.store.setPlayhead(this.timeAt(ev));
    } else if (drag.id && !drag.moved) {
      this.store.select(drag.id);
    }
  }

  protected pointerCancel(): void {
    this.drag = null;
  }

  // ---------- Tracks ----------

  protected labelClick(row: TimelineRow): void {
    if (row.track) {
      this.store.trackId.set(row.track.id);
    }
    if (row.actor && row.track) {
      this.confirmRemove.set(false);
      this.menu.update((m) => (m === row.track!.id ? null : row.track!.id));
    }
  }

  protected removeTrack(row: TimelineRow): void {
    if (!row.track) {
      return;
    }
    if (row.track.blocks.length > 0 && !this.confirmRemove()) {
      this.confirmRemove.set(true);
      return;
    }
    this.store.removeTrack(row.track.id);
    this.menu.set(null);
  }

  protected addCharacter(actor: string): void {
    this.store.addCharacter(actor);
    this.menu.set(null);
  }
}
