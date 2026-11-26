import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  signal,
} from "@angular/core";
import {
  LucideChevronDown,
  LucideClapperboard,
  LucidePlay,
  LucideRedo2,
  LucideUndo2,
  LucideX,
} from "@lucide/angular";
import { isGameCovered } from "../../../core/shared/app-visibility";
import { EscapeService } from "../../../core/shared/service/escape.service";
import { CutsceneAddSheetComponent } from "./cutscene-add-sheet/cutscene-add-sheet.component";
import { CutsceneBlockSheetComponent } from "./cutscene-block-sheet/cutscene-block-sheet.component";
import { CutsceneEditorStore } from "./cutscene-editor.store";
import { CutsceneHost } from "./cutscene-host";
import { CutsceneListSheetComponent } from "./cutscene-list-sheet/cutscene-list-sheet.component";
import { CutsceneTimelineComponent } from "./cutscene-timeline/cutscene-timeline.component";

type Layout = "portrait" | "landscape" | "desktop";
// (the same as the map editor's)
const DESKTOP_QUERY = "(min-width: 1000px) and (min-height: 601px)";
const LANDSCAPE_QUERY = "(orientation: landscape) and (max-height: 600px)";

const typing = (target: EventTarget | null): boolean =>
  target instanceof HTMLInputElement ||
  target instanceof HTMLTextAreaElement ||
  target instanceof HTMLSelectElement ||
  (target instanceof HTMLElement && target.isContentEditable);

/**
 * The cutscene editor (design/main-view.pen, Cinématiques), shown over the game in edit mode: the map stays seen
 * and moved through the middle of the screen. A timeline (one track per actor, blocks placed in time), the selected
 * block's sheet, adding a block, the map's cutscenes. What it needs of the game is the host (CutsceneHost).
 */
@Component({
  selector: "game-cutscene-editor",
  imports: [
    LucideChevronDown,
    LucideClapperboard,
    LucidePlay,
    LucideRedo2,
    LucideUndo2,
    LucideX,
    CutsceneTimelineComponent,
    CutsceneBlockSheetComponent,
    CutsceneAddSheetComponent,
    CutsceneListSheetComponent,
  ],
  templateUrl: "./cutscene-editor.component.html",
  styleUrl: "./cutscene-editor.component.scss",
  providers: [CutsceneEditorStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[attr.data-layout]": "layout()",
  },
})
export class GameCutsceneEditorComponent implements OnInit {
  readonly host = input.required<CutsceneHost>();
  readonly closed = output<void>();

  protected readonly store = inject(CutsceneEditorStore);
  protected readonly layout = signal<Layout>("portrait");
  protected readonly wide = computed(() => this.layout() !== "portrait");
  protected readonly cut = this.store.cut;
  protected readonly selection = this.store.selection;
  protected readonly sheet = this.store.sheet;
  protected readonly picking = this.store.picking;

  /** The help shown under the bar while a point is chosen on the map. */
  protected readonly pickHint = computed(() => {
    const s = this.selection();
    if (!s || !this.store.pickTarget()) {
      return null;
    }
    if (s.block.kind === "cam-goto") {
      return "Toucher la carte : où la caméra va";
    }
    return `Toucher la carte : où ${this.store.actorName(s.track.actor)} va`;
  });

  /**
   * Phone held upright: the block's sheet takes the timeline's place. On a phone, both are put away while a point
   * is chosen on the map.
   */
  protected readonly showTimeline = computed(() => {
    if (this.layout() === "desktop") {
      return true;
    }
    return !this.picking() && (this.wide() || !this.selection());
  });
  protected readonly showBlock = computed(
    () => !!this.selection() && (this.layout() === "desktop" || !this.picking())
  );

  constructor() {
    const escape = inject(EscapeService);
    escape.whileAlive(() => this.close());
    escape.track(
      () => this.store.selectedId(),
      () => this.store.select(null)
    );
    escape.track(
      () => this.store.sheet(),
      () => this.store.sheet.set(null)
    );
    escape.track(
      () => this.store.picking(),
      () => this.store.picking.set(false)
    );

    const desktop = matchMedia(DESKTOP_QUERY);
    const landscape = matchMedia(LANDSCAPE_QUERY);
    const onLayout = () => {
      let layout: Layout = "portrait";
      if (desktop.matches) {
        layout = "desktop";
      } else if (landscape.matches) {
        layout = "landscape";
      }
      this.layout.set(layout);
    };
    onLayout();
    desktop.addEventListener("change", onLayout);
    landscape.addEventListener("change", onLayout);

    const onKeyDown = (ev: KeyboardEvent) => this.onKeyDown(ev);
    window.addEventListener("keydown", onKeyDown, true);
    inject(DestroyRef).onDestroy(() => {
      desktop.removeEventListener("change", onLayout);
      landscape.removeEventListener("change", onLayout);
      window.removeEventListener("keydown", onKeyDown, true);
      this.store.close();
    });
  }

  ngOnInit(): void {
    this.store.init(this.host());
  }

  protected close(): void {
    this.store.close();
    this.closed.emit();
  }

  protected toggleList(): void {
    this.store.sheet.update((s) => (s === "list" ? null : "list"));
  }

  /** Space: play / pause; Delete: the block out; Ctrl+D: a copy; Ctrl+Z: undo (Ctrl+Shift+Z, Ctrl+Y: redo). */
  private onKeyDown(ev: KeyboardEvent): void {
    if (typing(ev.target) || isGameCovered() || !this.cut()) {
      return;
    }
    const ctrl = ev.ctrlKey || ev.metaKey;
    const key = ev.key.toLowerCase();
    let done = true;
    if (ev.key === " " && !ctrl) {
      this.store.togglePlay();
    } else if (
      (ev.key === "Delete" || ev.key === "Backspace") &&
      this.selection()
    ) {
      this.store.removeSelected();
    } else if (ctrl && key === "d" && this.selection()) {
      this.store.duplicateSelected();
    } else if (ctrl && ((key === "z" && ev.shiftKey) || key === "y")) {
      this.store.redo();
    } else if (ctrl && key === "z") {
      this.store.undo();
    } else {
      done = false;
    }
    if (done) {
      ev.preventDefault();
      // (the map editor's keys must not act as well)
      ev.stopImmediatePropagation();
    }
  }
}
