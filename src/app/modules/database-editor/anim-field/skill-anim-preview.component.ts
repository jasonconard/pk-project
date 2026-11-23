import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  input,
  viewChild,
} from "@angular/core";
import { animFrame, SkillAnim } from "../shared/skill-anim";

/** The preview's size (CSS px), how long a projectile flies across it (ms), the pause before playing again (ms). */
const WIDTH = 240;
const HEIGHT = 120;
const FLIGHT = 700;
const PAUSE = 500;

/**
 * A skill's effect animation playing in a loop, as in a fight: its projectile flying from the left (a projectile),
 * then its effect, its hit frame marked.
 */
@Component({
  selector: "db-skill-anim-preview",
  template: `<canvas
    #canvas
    [width]="width"
    [height]="height"
    aria-label="Aperçu de l'animation"></canvas>`,
  styles: `
    :host {
      display: block;
    }
    canvas {
      display: block;
      width: 100%;
      max-width: 240px;
      border-radius: 10px;
      background: #2a3a2e;
      image-rendering: pixelated;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillAnimPreviewComponent {
  readonly anim = input.required<SkillAnim>();
  protected readonly width = WIDTH;
  protected readonly height = HEIGHT;
  private readonly canvas =
    viewChild.required<ElementRef<HTMLCanvasElement>>("canvas");
  private img: HTMLImageElement | null = null;
  private start = performance.now();
  private raf = 0;

  constructor() {
    effect(() => {
      const anim = this.anim();
      const img = new Image();
      img.onload = () => {
        this.img = img;
        this.start = performance.now();
      };
      img.src = anim.image;
    });
    const loop = (now: number): void => {
      this.draw(now);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(this.raf));
  }

  private draw(now: number): void {
    const ctx = this.canvas().nativeElement.getContext("2d");
    const img = this.img;
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    // The ground line the effects stand on
    ctx.fillStyle = "#ffffff22";
    ctx.fillRect(0, HEIGHT - 12, WIDTH, 1);
    if (!img) {
      return;
    }
    const anim = this.anim();
    const { w, h } = anim.frame;
    const scale = Math.max(1, Math.min(3, Math.floor((HEIGHT - 16) / h)));
    const flies = anim.mode === "projectile" && !!anim.flyFrames;
    const flight = flies ? FLIGHT : 0;
    const effect = anim.frames * anim.ms;
    const t = (now - this.start) % (flight + effect + PAUSE);
    ctx.imageSmoothingEnabled = false;
    const at = (x: number, row: number, frame: number): void => {
      ctx.drawImage(
        img,
        frame * w,
        row * h,
        w,
        h,
        Math.round(x - anim.anchor.x * scale),
        Math.round(HEIGHT - 12 - anim.anchor.y * scale),
        w * scale,
        h * scale
      );
    };
    const end = WIDTH * (flies ? 0.7 : 0.5);
    if (t < flight) {
      const k = t / flight;
      at(
        WIDTH * 0.15 + (end - WIDTH * 0.15) * k,
        1,
        animFrame(anim.flyFrames ?? 1, t, anim.ms, true)
      );
      return;
    }
    if (t < flight + effect) {
      const frame = animFrame(anim.frames, t - flight, anim.ms, false);
      at(end, 0, frame);
      if (frame === anim.hit) {
        // Its hit frame: where the effects land
        ctx.fillStyle = "#ffb04a";
        ctx.font = "bold 11px sans-serif";
        ctx.fillText("coup", 8, 16);
      }
    }
  }
}
