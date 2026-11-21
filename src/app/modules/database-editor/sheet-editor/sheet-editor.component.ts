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
  LucideArrowDownLeft,
  LucideArrowDownRight,
  LucideArrowUpLeft,
  LucideArrowUpRight,
  LucideChevronLeft,
  LucideChevronRight,
  LucideCircleCheck,
  LucideFlipHorizontal2,
  LucideImageUp,
  LucidePause,
  LucidePlay,
  LucideRepeat,
  LucideTrash,
  LucideTriangleAlert,
  LucideZap,
} from "@lucide/angular";
import { EscapeService } from "../../../core/shared/service/escape.service";
import { StepperComponent } from "../stepper/stepper.component";
import { loadImage } from "../shared/load-image";
import {
  defaultAnchor,
  detectFrames,
  frameAt,
  isFlipped,
  newSheet,
  rowsPerAnim,
  SHEET_ANIMS,
  SheetAnim,
  SheetDirection,
  sheetLabel,
  sheetProblems,
  sheetRow,
  sheetStill,
  SpriteSheet,
} from "../shared/sprite-sheet";

/** What the window gives back: the sheet (undefined: removed) and its still picture (the idle's first frame). */
export interface SheetResult {
  sheet?: SpriteSheet;
  still?: string;
}

type Tab = "anims" | "cut";

/** Preview stage, in canvas pixels. */
const STAGE_W = 352;
const STAGE_H = 260;
/** Size of a frame in the animation's row of frames (css px). */
const THUMB = 50;

/**
 * A fighter's combat sprite sheet. Always shown: the animated preview (the 4 directions in its corners) and the
 * animations' buttons; then the « Animations » tab (the chosen animation: its frames from the sheet, the hit
 * frame, speed, loop) or the « Découpage » tab (frame size, feet, mirror, the sheet, import / remove).
 * Format: docs/editeur/11-planches.md.
 */
@Component({
  selector: "db-sheet-editor",
  imports: [
    LucideArrowDownLeft,
    LucideArrowDownRight,
    LucideArrowUpLeft,
    LucideArrowUpRight,
    LucideChevronLeft,
    LucideChevronRight,
    LucideCircleCheck,
    LucideFlipHorizontal2,
    LucideImageUp,
    LucidePause,
    LucidePlay,
    LucideRepeat,
    LucideTrash,
    LucideTriangleAlert,
    LucideZap,
    StepperComponent,
  ],
  templateUrl: "./sheet-editor.component.html",
  styleUrl: "./sheet-editor.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SheetEditorComponent implements OnInit {
  readonly title = input("Planche de combat");
  readonly value = input<SpriteSheet | undefined>(undefined);
  readonly done = output<SheetResult>();
  readonly dismissed = output<void>();

  protected readonly sheet = signal<SpriteSheet | undefined>(undefined);
  protected readonly image = signal<HTMLImageElement | null>(null);
  protected readonly message = signal("");
  protected readonly tab = signal<Tab>("anims");
  /** The animation and direction previewed. */
  protected readonly anim = signal(0);
  protected readonly dir = signal<SheetDirection>("se");
  protected readonly playing = signal(true);
  /** The frame shown in the preview (follows the time while playing). */
  protected readonly frame = signal(0);

  /** The 4 directions, in the preview's corners. */
  protected readonly directions: {
    id: SheetDirection;
    label: string;
    corner: string;
  }[] = [
    { id: "nw", label: "NO", corner: "top-left" },
    { id: "ne", label: "NE", corner: "top-right" },
    { id: "sw", label: "SO", corner: "bottom-left" },
    { id: "se", label: "SE", corner: "bottom-right" },
  ];
  protected readonly label = sheetLabel;
  protected readonly notes = Object.fromEntries(
    SHEET_ANIMS.map((a) => [a.id, a.note])
  );
  protected readonly problems = computed(() => {
    const sheet = this.sheet();
    const img = this.image();
    return sheet && img
      ? sheetProblems(sheet, { w: img.width, h: img.height })
      : [];
  });
  /** « 16 lignes · 8 animations trouvées · 384 × 768 » */
  protected readonly summary = computed(() => {
    const sheet = this.sheet();
    const img = this.image();
    if (!sheet || !img) {
      return "";
    }
    const found = sheet.anims.filter((a) => a.frames > 0).length;
    return `${sheet.anims.length * rowsPerAnim(sheet)} lignes · ${found} animations trouvées · ${img.width} × ${img.height}`;
  });
  /** Frames in a row of the picture (the most an animation can have). */
  protected readonly columns = computed(() => {
    const sheet = this.sheet();
    const img = this.image();
    return sheet && img
      ? Math.max(1, Math.floor(img.width / sheet.frame.w))
      : 1;
  });
  protected readonly current = computed(
    () => this.sheet()?.anims[this.anim()] as SheetAnim | undefined
  );
  protected readonly flipped = computed(() => {
    const sheet = this.sheet();
    return !!sheet && isFlipped(sheet, this.dir());
  });
  /** The chosen animation's frames, cut from the sheet (seen from the chosen direction). */
  protected readonly thumbs = computed(() => {
    const sheet = this.sheet();
    const img = this.image();
    const anim = this.current();
    if (!sheet || !img || !anim) {
      return [];
    }
    const { w, h } = sheet.frame;
    const k = THUMB / Math.max(w, h);
    const row = sheetRow(sheet, this.anim(), this.dir());
    return Array.from({ length: anim.frames }, (_, i) => ({
      index: i,
      width: w * k,
      height: h * k,
      image: `url(${sheet.image})`,
      size: `${img.width * k}px ${img.height * k}px`,
      position: `${-i * w * k}px ${-row * h * k}px`,
    }));
  });

  private readonly stage = viewChild<ElementRef<HTMLCanvasElement>>("stage");
  private readonly sheetCanvas =
    viewChild<ElementRef<HTMLCanvasElement>>("sheetView");
  private time = 0;
  private last = 0;
  private raf = 0;

  constructor() {
    inject(EscapeService).whileAlive(() => this.dismissed.emit());
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(this.raf));
    // The sheet view: redrawn when the sheet or the frame previewed change
    effect(() => this.drawSheet());
  }

  ngOnInit(): void {
    const value = this.value();
    if (value) {
      this.sheet.set(value);
      loadImage(value.image).then((img) => this.image.set(img));
    }
    this.last = performance.now();
    this.raf = requestAnimationFrame((t) => this.tick(t));
  }

  protected async importPng(ev: Event): Promise<void> {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file) {
      return;
    }
    try {
      const url = await readDataUrl(file);
      const img = await loadImage(url);
      const old = this.sheet();
      // A new picture keeps the settings (frame size, mirror, feet, timings); its frames are counted again
      const sheet = old ? { ...old, image: url } : newSheet(url);
      this.image.set(img);
      this.sheet.set({ ...sheet, anims: detectFrames(img, sheet) });
      this.message.set("");
      this.restart();
    } catch {
      this.message.set("Cette image n'a pas pu être lue.");
    }
  }

  protected remove(): void {
    this.sheet.set(undefined);
    this.image.set(null);
    this.tab.set("anims");
  }

  /** A new frame size or mirror: the frames are counted again. */
  protected setLayout(
    change: Partial<Pick<SpriteSheet, "frame" | "mirror">>
  ): void {
    const sheet = this.sheet();
    const img = this.image();
    if (!sheet) {
      return;
    }
    const next = { ...sheet, ...change };
    if (change.frame) {
      next.anchor = defaultAnchor(change.frame.w, change.frame.h);
    }
    this.sheet.set(img ? { ...next, anims: detectFrames(img, next) } : next);
  }

  protected setAnchor(axis: "x" | "y", value: number): void {
    this.sheet.update(
      (s) => s && { ...s, anchor: { ...s.anchor, [axis]: value } }
    );
  }

  protected setAnim(index: number, change: Partial<SheetAnim>): void {
    this.sheet.update(
      (s) =>
        s && {
          ...s,
          anims: s.anims.map((a, i) => {
            if (i !== index) {
              return a;
            }
            const next = { ...a, ...change };
            if (next.hit !== undefined && next.hit >= next.frames) {
              next.hit = Math.max(0, next.frames - 1);
            }
            if (next.hit === undefined) {
              delete next.hit;
            }
            return next;
          }),
        }
    );
    const frames = this.current()?.frames ?? 0;
    if (this.frame() >= frames) {
      this.frame.set(Math.max(0, frames - 1));
    }
  }

  /** The frame shown becomes the hit frame (or stops being it). */
  protected toggleHit(): void {
    const anim = this.current();
    if (anim) {
      this.setAnim(this.anim(), {
        hit: anim.hit === this.frame() ? undefined : this.frame(),
      });
    }
  }

  /** A frame of the row: shown, paused. */
  protected pickFrame(index: number): void {
    const anim = this.current();
    this.playing.set(false);
    this.frame.set(index);
    this.time = index * (anim?.ms ?? 0);
  }

  protected show(index: number): void {
    this.anim.set(index);
    this.restart();
  }

  protected togglePlay(): void {
    this.playing.update((p) => !p);
  }

  /** Paused: the previous / next frame. */
  protected step(delta: number): void {
    const anim = this.current();
    if (!anim || anim.frames === 0) {
      return;
    }
    this.pickFrame((this.frame() + delta + anim.frames) % anim.frames);
  }

  protected ok(): void {
    const sheet = this.sheet();
    const img = this.image();
    this.done.emit(
      sheet && img ? { sheet, still: sheetStill(img, sheet) } : {}
    );
  }

  private restart(): void {
    this.time = 0;
    this.frame.set(0);
  }

  private tick(now: number): void {
    const dt = Math.min(100, now - this.last);
    this.last = now;
    const anim = this.current();
    if (anim && this.playing()) {
      this.time += dt;
      const total = anim.frames * anim.ms;
      // Played once: its last frame stays a moment, then again
      if (!anim.loop && this.time > total + 700) {
        this.time = 0;
      }
      this.frame.set(frameAt(anim, this.time));
    }
    this.drawStage();
    this.raf = requestAnimationFrame((t) => this.tick(t));
  }

  private drawStage(): void {
    const canvas = this.stage()?.nativeElement;
    const sheet = this.sheet();
    const img = this.image();
    const anim = this.current();
    if (!canvas || !sheet || !img || !anim) {
      return;
    }
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "#3d6b42";
    ctx.fillRect(0, 0, STAGE_W, STAGE_H);
    const { w, h } = sheet.frame;
    const scale = Math.max(
      1,
      Math.floor(Math.min((STAGE_W - 40) / w, (STAGE_H - 70) / h))
    );
    const groundX = Math.round(STAGE_W / 2);
    const groundY = STAGE_H - 52;
    const left = groundX - sheet.anchor.x * scale;
    const top = groundY - sheet.anchor.y * scale;
    // The round shadow (the game draws it)
    ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
    ctx.beginPath();
    ctx.ellipse(
      groundX,
      groundY,
      w * scale * 0.24,
      w * scale * 0.07,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
    if (anim.frames > 0) {
      const row = sheetRow(sheet, this.anim(), this.dir());
      ctx.save();
      ctx.translate(groundX, groundY);
      if (this.flipped()) {
        ctx.scale(-1, 1);
      }
      ctx.drawImage(
        img,
        this.frame() * w,
        row * h,
        w,
        h,
        -sheet.anchor.x * scale,
        -sheet.anchor.y * scale,
        w * scale,
        h * scale
      );
      ctx.restore();
    }
    // Cutting: the frame's edges and the feet
    if (this.tab() === "cut") {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 1;
      ctx.strokeRect(left + 0.5, top + 0.5, w * scale - 1, h * scale - 1);
      ctx.fillStyle = "#ffb84d";
      ctx.fillRect(groundX - 12, groundY - 1, 24, 2);
      ctx.fillRect(groundX - 1, groundY - 12, 2, 24);
    }
  }

  private drawSheet(): void {
    const canvas = this.sheetCanvas()?.nativeElement;
    const sheet = this.sheet();
    const img = this.image();
    const frame = this.frame();
    if (!canvas || !sheet || !img) {
      return;
    }
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    const { w, h } = sheet.frame;
    for (let y = 0; y < img.height; y += h) {
      for (let x = 0; x < img.width; x += w) {
        ctx.fillStyle = (x / w + y / h) % 2 ? "#2a2b33" : "#31323b";
        ctx.fillRect(x, y, w, h);
      }
    }
    ctx.drawImage(img, 0, 0);
    if (this.current()?.frames) {
      const row = sheetRow(sheet, this.anim(), this.dir());
      ctx.strokeStyle = "#ffb04a";
      ctx.lineWidth = 2;
      ctx.strokeRect(frame * w + 1, row * h + 1, w - 2, h - 2);
    }
  }
}

function readDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
