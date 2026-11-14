import { afterNextRender, ChangeDetectionStrategy, Component, computed, DestroyRef, effect, ElementRef, inject, input, output, signal, viewChild } from '@angular/core';
import { FaceTexture, LayerName, layerRgba } from '../shared/EditableModel';
import { Px } from '../shared/pixel-tools';

/** Width the face is fitted in (px), before the zoom buttons. */
const FIT_WIDTH = 264;
const FIT_HEIGHT = 220;
/** Grid lines between the pixels from this zoom on. */
const GRID_MIN_SCALE = 6;

/**
 * Zoomed view of a face's pixels, drawn on: checkerboard under the transparent pixels, grid, and the pixel
 * under the pointer. Sends the pointer as pixel coordinates (press, drag, release); the editor applies the tool.
 */
@Component({
  selector: 'app-pixel-canvas',
  template: `
    <div class="zoom">
      <button type="button" class="btn" title="Dézoomer" aria-label="Dézoomer" (click)="zoomBy(-1)">−</button>
      <span>× {{ scale() }}</span>
      <button type="button" class="btn" title="Zoomer" aria-label="Zoomer" (click)="zoomBy(1)">+</button>
      @if (hover(); as p) {
        <span class="coords">{{ p.x }}, {{ p.y }}</span>
      }
    </div>
    <div class="scroll" #scroll>
      <canvas #canvas (pointerdown)="down($event)" (pointermove)="move($event)" (pointerup)="up($event)"
              (pointercancel)="up($event)" (pointerleave)="hover.set(null)"></canvas>
    </div>
  `,
  styleUrl: './pixel-canvas.component.scss',
  host: { '[class.fill]': 'fill()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PixelCanvasComponent {
  readonly texture = input.required<FaceTexture>();
  /** Layer shown and drawn on (a grayscale layer is shown in gray). */
  readonly layer = input<LayerName>('color');
  /** Changes when the texture's pixels changed (redraw). */
  readonly version = input(0);
  /** Fits the face in all the room the component is given (big view), instead of the panel's width. */
  readonly fill = input(false);
  readonly strokeStart = output<Px>();
  readonly strokeMove = output<Px>();
  readonly strokeEnd = output<void>();

  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly scroll = viewChild.required<ElementRef<HTMLElement>>('scroll');
  /** Room to fit the face in (px). */
  private readonly room = signal({ w: FIT_WIDTH, h: FIT_HEIGHT });
  private readonly zoom = signal(0);
  protected readonly hover = signal<Px | null>(null);
  private drawing = false;

  protected readonly scale = computed(() => {
    const tex = this.texture();
    const room = this.fill() ? this.room() : { w: FIT_WIDTH, h: FIT_HEIGHT };
    const fit = Math.max(1, Math.floor(Math.min(room.w / tex.w, room.h / tex.h)));
    return Math.max(1, fit + this.zoom());
  });

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const el = this.scroll().nativeElement;
      const observer = new ResizeObserver(() => {
        if (el.clientWidth > 0 && el.clientHeight > 0) { // not laid out yet: keep the last room
          this.room.set({ w: el.clientWidth - 2, h: el.clientHeight - 2 });
        }
      });
      observer.observe(el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
    // A new face: back to the fitting zoom
    effect(() => {
      this.texture();
      this.zoom.set(0);
    });
    effect(() => {
      this.version();
      this.draw(this.texture(), this.layer(), this.scale(), this.hover());
    });
  }

  protected zoomBy(step: number) {
    this.zoom.update(z => Math.max(1 - this.scale() + z, z + step));
  }

  protected down(event: PointerEvent) {
    if (event.button !== 0) {
      return;
    }
    this.drawing = true;
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    this.strokeStart.emit(this.pixelAt(event));
  }

  protected move(event: PointerEvent) {
    const p = this.pixelAt(event);
    const hover = this.hover();
    if (hover?.x !== p.x || hover?.y !== p.y) {
      this.hover.set(p);
      if (this.drawing) {
        this.strokeMove.emit(p);
      }
    }
  }

  protected up(event: PointerEvent) {
    if (this.drawing) {
      this.drawing = false;
      (event.target as HTMLElement).releasePointerCapture(event.pointerId);
      this.strokeEnd.emit();
    }
  }

  private pixelAt(event: PointerEvent): Px {
    const tex = this.texture();
    const rect = this.canvas().nativeElement.getBoundingClientRect();
    return {
      x: Math.min(tex.w - 1, Math.max(0, Math.floor((event.clientX - rect.left) / rect.width * tex.w))),
      y: Math.min(tex.h - 1, Math.max(0, Math.floor((event.clientY - rect.top) / rect.height * tex.h))),
    };
  }

  private draw(tex: FaceTexture, layer: LayerName, scale: number, hover: Px | null) {
    const canvas = this.canvas().nativeElement;
    canvas.width = tex.w * scale;
    canvas.height = tex.h * scale;
    const ctx = canvas.getContext('2d')!;
    // Checkerboard (transparent pixels): 2 squares per pixel when zoomed in
    const cell = Math.max(2, Math.floor(scale / 2));
    for (let y = 0; y < canvas.height; y += cell) {
      for (let x = 0; x < canvas.width; x += cell) {
        ctx.fillStyle = ((x + y) / cell) % 2 ? '#4a4a52' : '#5c5c66';
        ctx.fillRect(x, y, cell, cell);
      }
    }
    const pixels = document.createElement('canvas');
    pixels.width = tex.w;
    pixels.height = tex.h;
    pixels.getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(layerRgba(tex, layer)), tex.w, tex.h), 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(pixels, 0, 0, canvas.width, canvas.height);

    if (scale >= GRID_MIN_SCALE) {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.18)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 1; x < tex.w; x++) {
        ctx.moveTo(x * scale + 0.5, 0);
        ctx.lineTo(x * scale + 0.5, canvas.height);
      }
      for (let y = 1; y < tex.h; y++) {
        ctx.moveTo(0, y * scale + 0.5);
        ctx.lineTo(canvas.width, y * scale + 0.5);
      }
      ctx.stroke();
    }
    if (hover) {
      ctx.strokeStyle = '#ffd34d';
      ctx.lineWidth = 1;
      ctx.strokeRect(hover.x * scale + 0.5, hover.y * scale + 0.5, scale - 1, scale - 1);
    }
  }
}
