import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  OnInit,
  output,
  signal,
  viewChild,
} from "@angular/core";
import {
  LucideChevronDown,
  LucideChevronLeft,
  LucideCopy,
  LucideDynamicIcon,
  LucideIcon,
  LucideInfo,
  LucideMinus,
  LucideMonitor,
  LucidePause,
  LucidePlay,
  LucidePlus,
  LucideRedo2,
  LucideRotateCcw,
  LucideSkipBack,
  LucideSparkles,
  LucideSwords,
  LucideTrash,
  LucideUndo2,
  LucideUser,
  LucideVolume2,
  LucideZoomIn,
  LucideZoomOut,
} from "@lucide/angular";
import { EscapeService } from "../../../core/shared/service/escape.service";
import { playSound, SOUND_CHOICES } from "../../game/shared/services/sfx";
import { loadDatabase } from "../shared/database-storage";
import {
  drawFlowScene,
  FlowScene,
  SCENE,
  soundsBetween,
} from "../shared/flow-scene";
import { loadImage } from "../shared/load-image";
import { SkillAnim } from "../shared/skill-anim";
import {
  FLIGHT_TIME,
  FLOW_TRACKS,
  FlowBlock,
  flowBlockId,
  flowLength,
  flowPower,
  FlowTrack,
  INSTANT_TRACKS,
  sheetTiming,
  SkillFlow,
} from "../shared/skill-flow";
import { sheetLabel, SpriteSheet } from "../shared/sprite-sheet";

const TRACK_LOOKS: Record<FlowTrack, { icon: LucideIcon; color: string }> = {
  caster: { icon: LucideUser, color: "#5aa8ff" },
  effect: { icon: LucideSparkles, color: "#f08c32" },
  sound: { icon: LucideVolume2, color: "#6ec86e" },
  hit: { icon: LucideSwords, color: "#ffd34d" },
  screen: { icon: LucideMonitor, color: "#aa64dc" },
};
/** A block's moment and length are set by steps of this (s) when dragged; the counters step finer. */
const SNAP = 0.05;
const FINE = 0.01;
/** The timeline: the tracks' names column, the zoom's limits (px per second), the time shown after the end (s). */
const LABEL = 88;
const ZOOM = { min: 60, max: 600 };
const TAIL = 0.4;
const HISTORY = 60;

interface Fighter {
  id: string;
  name: string;
  sheet: SpriteSheet;
}

interface Drag {
  id: string | null;
  mode: "move" | "size" | "scrub";
  x: number;
  start: number;
  duration: number;
  moved: boolean;
}

const round = (value: number) => Math.round(value * 100) / 100;

/**
 * The flow of a skill or of a weapon's attack (design/database.pen, 21 and 22; docs/editeur/22-deroule.md): a small
 * scene replaying it (a caster and a target chosen among the fighters with a sheet, the effect picture, the hits'
 * numbers, the sounds), and its blocks on five tracks in time, dragged, stretched, set one by one. Every change
 * is given at once (`changed`); « Déroulé d'origine » goes back to the one the sheet gives.
 */
@Component({
  selector: "db-flow-editor",
  imports: [
    LucideDynamicIcon,
    LucideChevronDown,
    LucideChevronLeft,
    LucideCopy,
    LucideInfo,
    LucideMinus,
    LucidePause,
    LucidePlay,
    LucidePlus,
    LucideRedo2,
    LucideRotateCcw,
    LucideSkipBack,
    LucideTrash,
    LucideUndo2,
    LucideZoomIn,
    LucideZoomOut,
  ],
  templateUrl: "./flow-editor.component.html",
  styleUrls: ["./flow-editor.component.scss", "./flow-editor.blocks.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "(document:keydown)": "onKey($event)",
  },
})
export class FlowEditorComponent implements OnInit {
  readonly title = input.required<string>();
  /** The flow as it is now (the owner's own, else the one its sheet gives). */
  readonly value = input.required<SkillFlow>();
  /** The owner has its own flow (else `value` is the one its sheet gives). */
  readonly own = input(false);
  /** The effect picture of the skill or the weapon. */
  readonly picture = input<SkillAnim>();
  readonly melee = input(false);
  /** What a hit of 100 % shows in the preview, and whether it heals. */
  readonly power = input(50);
  readonly heals = input(false);
  /** A change: the new flow, or undefined to go back to the one the sheet gives. */
  readonly changed = output<SkillFlow | undefined>();
  readonly dismissed = output<void>();

  protected readonly tracks = FLOW_TRACKS.map((t) => ({
    ...t,
    ...TRACK_LOOKS[t.id],
  }));
  protected readonly label = LABEL;
  protected readonly sounds = SOUND_CHOICES.filter(
    (s) => s.group !== "step" && s.group !== "voice"
  );

  protected readonly blocks = signal<FlowBlock[]>([]);
  protected readonly selectedId = signal<string | null>(null);
  protected readonly selected = computed(
    () => this.blocks().find((b) => b.id === this.selectedId()) ?? null
  );
  protected readonly playhead = signal(0);
  protected readonly playing = signal(false);
  protected readonly zoom = signal(190);
  protected readonly adding = signal(false);
  /** The list open over the scene: who casts, who is hit. */
  protected readonly choosing = signal<"caster" | "target" | null>(null);
  private readonly past = signal<FlowBlock[][]>([]);
  private readonly future = signal<FlowBlock[][]>([]);
  protected readonly canUndo = computed(() => this.past().length > 0);
  protected readonly canRedo = computed(() => this.future().length > 0);

  protected readonly length = computed(() =>
    flowLength({ blocks: this.blocks() }, this.picture())
  );
  protected readonly totalPower = computed(() =>
    flowPower({ blocks: this.blocks() })
  );
  protected readonly hitCount = computed(
    () => this.blocks().filter((b) => b.track === "hit").length
  );
  /** The lane's width (px): the flow and a little after it. */
  protected readonly laneWidth = computed(() =>
    Math.round((this.length() + TAIL) * this.zoom())
  );
  /** The ruler's marks: every half second, or every tenth when zoomed in. */
  protected readonly ticks = computed(() => {
    const step = this.zoom() >= 260 ? 0.1 : 0.5;
    const marks: { x: number; label: string }[] = [];
    for (let s = 0; s <= this.length() + TAIL; s = round(s + step)) {
      marks.push({
        x: Math.round(s * this.zoom()),
        label: this.seconds(s, step < 0.5 ? 1 : 1),
      });
    }
    return marks;
  });

  // --- Who plays in the scene ---

  private readonly db = loadDatabase();
  protected readonly fighters: Fighter[] = [
    ...this.db.characters,
    ...this.db.enemies,
  ].flatMap((f) =>
    f.sheet ? [{ id: f.id, name: f.name, sheet: f.sheet }] : []
  );
  protected readonly casterId = signal(
    this.db.characters.find((c) => c.sheet)?.id ?? this.fighters[0]?.id ?? ""
  );
  protected readonly targetId = signal(
    this.db.enemies.find((e) => e.sheet)?.id ?? this.fighters[0]?.id ?? ""
  );
  protected readonly caster = computed(() =>
    this.fighters.find((f) => f.id === this.casterId())
  );
  protected readonly target = computed(() =>
    this.fighters.find((f) => f.id === this.targetId())
  );
  /** The caster's animations, for a caster block. */
  protected readonly casterAnims = computed(() =>
    (this.caster()?.sheet.anims ?? [])
      .filter((a) => !["idle", "walk", "hurt", "death"].includes(a.id))
      .map((a) => ({ id: a.id, label: sheetLabel(a.id) }))
  );
  private readonly images = new Map<string, HTMLImageElement>();
  private readonly loaded = signal(0);

  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>("scene");
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private drag: Drag | null = null;
  private frame = 0;
  private lastTick = 0;

  constructor() {
    inject(EscapeService).whileAlive(() => this.dismissed.emit());
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(this.frame));
    // The scene drawn again when the moment, the blocks or who plays change
    effect(() => {
      const canvas = this.canvas()?.nativeElement;
      const ctx = canvas?.getContext("2d");
      this.loaded();
      const picture = this.picture();
      const caster = this.caster();
      const target = this.target();
      const scene: FlowScene = {
        flow: { blocks: this.blocks() },
        picture,
        pictureImage: picture && this.image(picture.image),
        caster: this.withImage(caster),
        target: this.withImage(target),
        melee: this.melee(),
        power: this.power(),
        heals: this.heals(),
      };
      if (ctx) {
        drawFlowScene(ctx, scene, this.playhead());
      }
    });
  }

  ngOnInit(): void {
    this.blocks.set(structuredClone(this.value().blocks));
  }

  protected readonly sceneSize = SCENE;

  /** A picture, loaded once (the scene is drawn again when it is there). */
  private image(src: string): HTMLImageElement | undefined {
    const known = this.images.get(src);
    if (known) {
      return known.complete && known.naturalWidth ? known : undefined;
    }
    const pending = new Image();
    this.images.set(src, pending);
    void loadImage(src).then((img) => {
      this.images.set(src, img);
      this.loaded.update((n) => n + 1);
    });
    return undefined;
  }

  private withImage(fighter: Fighter | undefined) {
    const image = fighter && this.image(fighter.sheet.image);
    return fighter && image ? { sheet: fighter.sheet, image } : undefined;
  }

  protected pickFighter(id: string): void {
    if (this.choosing() === "caster") {
      this.casterId.set(id);
    } else {
      this.targetId.set(id);
    }
    this.choosing.set(null);
  }

  // --- Labels ---

  protected seconds(value: number, digits = 2): string {
    return value.toFixed(digits).replace(".", ",");
  }

  protected look(track: FlowTrack) {
    return TRACK_LOOKS[track];
  }

  protected trackLabel(track: FlowTrack): string {
    return FLOW_TRACKS.find((t) => t.id === track)?.label ?? track;
  }

  protected isInstant(block: FlowBlock): boolean {
    return INSTANT_TRACKS.includes(block.track);
  }

  protected soundLabel(id: string | undefined): string {
    return SOUND_CHOICES.find((s) => s.id === id)?.label ?? "Aucun";
  }

  /** What a block shows on the timeline. */
  protected blockLabel(block: FlowBlock): string {
    switch (block.track) {
      case "caster":
        return sheetLabel(block.anim ?? "attack");
      case "effect":
        return block.arrow ? "Flèche" : "Effet";
      case "sound":
        return this.soundLabel(block.sound);
      case "hit":
        return `${block.percent ?? 100} %`;
      default:
        return "Tremble";
    }
  }

  protected blocksOf(track: FlowTrack): FlowBlock[] {
    return this.blocks().filter((b) => b.track === track);
  }

  protected left(block: FlowBlock): number {
    return Math.round(block.start * this.zoom());
  }

  /** A block's width on the timeline (a moment: the room for its label; an effect with no flight: its picture's). */
  protected width(block: FlowBlock): number | null {
    if (this.isInstant(block)) {
      return null;
    }
    return Math.max(18, Math.round(block.duration * this.zoom()));
  }

  // --- Changes ---

  private snapshot(): void {
    this.past.update((p) =>
      [...p, structuredClone(this.blocks())].slice(-HISTORY)
    );
    this.future.set([]);
  }

  /** The blocks changed: kept in order of time, and given to the sheet. */
  private commit(blocks: FlowBlock[]): void {
    this.blocks.set([...blocks].sort((a, b) => a.start - b.start));
    this.changed.emit({ blocks: structuredClone(this.blocks()) });
  }

  protected undo(): void {
    const before = this.past().at(-1);
    if (before) {
      this.future.update((f) => [...f, structuredClone(this.blocks())]);
      this.past.update((p) => p.slice(0, -1));
      this.commit(before);
    }
  }

  protected redo(): void {
    const next = this.future().at(-1);
    if (next) {
      this.past.update((p) => [...p, structuredClone(this.blocks())]);
      this.future.update((f) => f.slice(0, -1));
      this.commit(next);
    }
  }

  protected patch(block: FlowBlock, change: Partial<FlowBlock>): void {
    this.snapshot();
    this.commit(
      this.blocks().map((b) => (b.id === block.id ? { ...b, ...change } : b))
    );
  }

  /** A counter's step: the value kept between two limits. */
  protected step(
    block: FlowBlock,
    field: "start" | "duration" | "percent" | "pitch",
    by: number,
    min: number,
    max: number
  ): void {
    const values = {
      start: block.start,
      duration: block.duration,
      percent: block.percent ?? 100,
      pitch: block.pitch ?? 1,
    };
    const now = values[field];
    this.patch(block, {
      [field]: Math.min(max, Math.max(min, round(now + by))),
    });
  }

  /** A new block at the playhead, with what its track usually needs. */
  protected add(track: FlowTrack): void {
    this.adding.set(false);
    const start = round(Math.round(this.playhead() / SNAP) * SNAP);
    const hits = this.blocksOf("hit");
    const flies = this.picture()?.mode === "projectile";
    const block: FlowBlock = { id: flowBlockId(), track, start, duration: 0 };
    switch (track) {
      case "caster": {
        const anim = this.casterAnims()[0]?.id ?? "attack";
        block.anim = anim;
        block.duration = sheetTiming(anim).length;

        break;
      }
      case "effect": {
        block.duration = flies ? FLIGHT_TIME : 0;
        if (!this.picture()) {
          block.arrow = true;
          block.duration = FLIGHT_TIME;
        }

        break;
      }
      case "sound": {
        block.sound = "slash";

        break;
      }
      case "hit": {
        block.percent = Math.max(10, 100 - this.totalPower());
        block.states = !hits.some((h) => h.states !== false);

        break;
      }
      default: {
        block.duration = 0.25;
      }
    }
    this.snapshot();
    this.commit([...this.blocks(), block]);
    this.selectedId.set(block.id);
  }

  protected duplicate(block: FlowBlock): void {
    const copy = {
      ...block,
      id: flowBlockId(),
      start: round(block.start + Math.max(0.1, block.duration)),
    };
    this.snapshot();
    this.commit([...this.blocks(), copy]);
    this.selectedId.set(copy.id);
  }

  protected remove(block: FlowBlock): void {
    this.snapshot();
    this.commit(this.blocks().filter((b) => b.id !== block.id));
    this.selectedId.set(null);
  }

  /** Back to the flow the sheet gives (the owner's own one is forgotten). */
  protected reset(): void {
    this.changed.emit(undefined);
    this.dismissed.emit();
  }

  protected hear(block: FlowBlock, sound = block.sound): void {
    playSound(sound ?? "", true, { pitch: block.pitch ?? 1 });
  }

  protected setSound(block: FlowBlock, sound: string): void {
    this.patch(block, { sound });
    this.hear(block, sound);
  }

  // --- Playing ---

  protected toStart(): void {
    this.stop();
    this.playhead.set(0);
  }

  protected togglePlay(): void {
    if (this.playing()) {
      this.stop();
      return;
    }
    if (this.playhead() >= this.length()) {
      this.playhead.set(0);
    }
    this.playing.set(true);
    this.lastTick = performance.now();
    const tick = () => {
      const now = performance.now();
      const from = this.playhead();
      const to = Math.min(this.length(), from + (now - this.lastTick) / 1000);
      this.lastTick = now;
      // (the sounds starting in this step, at the very start too)
      for (const block of soundsBetween(
        { blocks: this.blocks() },
        from === 0 ? -1 : from,
        to
      )) {
        this.hear(block);
      }
      this.playhead.set(to);
      if (to >= this.length()) {
        this.playing.set(false);
        return;
      }
      this.frame = requestAnimationFrame(tick);
    };
    this.frame = requestAnimationFrame(tick);
  }

  private stop(): void {
    cancelAnimationFrame(this.frame);
    this.playing.set(false);
  }

  protected zoomBy(factor: number): void {
    this.zoom.update((z) =>
      Math.min(ZOOM.max, Math.max(ZOOM.min, Math.round(z * factor)))
    );
  }

  // --- The timeline's pointer: a block dragged or stretched, the playhead moved ---

  protected grab(event: PointerEvent, block: FlowBlock, size = false): void {
    event.stopPropagation();
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
    this.selectedId.set(block.id);
    this.drag = {
      id: block.id,
      mode: size ? "size" : "move",
      x: event.clientX,
      start: block.start,
      duration: block.duration,
      moved: false,
    };
  }

  /** The ruler or an empty part of a lane pressed: the playhead goes there, and follows the pointer. */
  protected scrub(event: PointerEvent): void {
    const lane = event.currentTarget as HTMLElement;
    lane.setPointerCapture?.(event.pointerId);
    this.stop();
    this.drag = {
      id: null,
      mode: "scrub",
      x: lane.getBoundingClientRect().left,
      start: 0,
      duration: 0,
      moved: false,
    };
    this.pointerMoved(event);
  }

  protected pointerMoved(event: PointerEvent): void {
    const drag = this.drag;
    if (!drag) {
      return;
    }
    if (drag.mode === "scrub") {
      const at = (event.clientX - drag.x) / this.zoom();
      this.playhead.set(Math.min(this.length(), Math.max(0, round(at))));
      return;
    }
    const dx = event.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) < 4) {
      return;
    }
    if (!drag.moved) {
      drag.moved = true;
      this.snapshot();
    }
    const by = Math.round(dx / this.zoom() / SNAP) * SNAP;
    this.commit(
      this.blocks().map((b) => {
        if (b.id !== drag.id) {
          return b;
        }
        return drag.mode === "move"
          ? { ...b, start: Math.max(0, round(drag.start + by)) }
          : { ...b, duration: Math.max(0, round(drag.duration + by)) };
      })
    );
  }

  protected pointerUp(): void {
    this.drag = null;
  }

  protected onKey(event: KeyboardEvent): void {
    const typing = (event.target as HTMLElement | null)?.closest?.(
      "input, textarea"
    );
    if (typing) {
      return;
    }
    const block = this.selected();
    if (event.key === " ") {
      event.preventDefault();
      this.togglePlay();
    } else if ((event.key === "Delete" || event.key === "Backspace") && block) {
      event.preventDefault();
      this.remove(block);
    } else if (
      event.key.toLowerCase() === "z" &&
      (event.ctrlKey || event.metaKey)
    ) {
      event.preventDefault();
      if (event.shiftKey) {
        this.redo();
      } else {
        this.undo();
      }
    }
  }

  protected readonly fine = FINE;
  protected readonly snap = SNAP;
}
