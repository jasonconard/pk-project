import { afterNextRender, ChangeDetectionStrategy, Component, computed, DestroyRef, effect, ElementRef, inject, input, output, signal, viewChild } from '@angular/core';
import { FaceTexture, LayerName, layerRgba } from '../shared/EditableModel';
import { Px } from '../shared/pixel-tools';
import { LucideMaximize, LucideZoomIn, LucideZoomOut } from '@lucide/angular';

/** Width the face is fitted in (px), before the zoom buttons. */
const FIT_WIDTH = 264;
const FIT_HEIGHT = 220;
/** Grid lines between the pixels from this zoom on. */
const GRID_MIN_SCALE = 6;
/** Biggest canvas side (px): browsers fail on huge canvases. */
const MAX_CANVAS = 8192;

/** Two fingers on the face: pinch to zoom, move to pan. */
interface Gesture {
  dist: number;
  scale: number;
  mid: { x: number; y: number };
}

/**
 * Zoomed view of a face's pixels, drawn on: checkerboard under the transparent pixels, grid, and the pixel
 * under the pointer. Sends the pointer as pixel coordinates (press, drag, release); the editor applies the tool.
 * Two fingers zoom (pinch) and move the view; the stroke the first finger started is cancelled (strokeCancel).
 * Ctrl + wheel (or a trackpad pinch) zooms too.
 */
@Component({
  selector: 'app-pixel-canvas',
  template: `
    <div class="zoom">
      <button type="button" class="btn" title="Dézoomer" aria-label="Dézoomer" (click)="zoomBy(-1)"><svg lucideZoomOut></svg></button>
      <span>× {{ scale() }}</span>
      <button type="button" class="btn" title="Zoomer" aria-label="Zoomer" (click)="zoomBy(1)"><svg lucideZoomIn></svg></button>
      @if (zoom() !== 0) {
        <button type="button" class="btn fit" title="Toute la face" aria-label="Toute la face" (click)="zoom.set(0)"><svg lucideMaximize></svg></button>
      }
      @if (hover(); as p) {
        <span class="coords">{{ p.x }}, {{ p.y }}</span>
      }
    </div>
    <div class="scroll" #scroll (wheel)="wheel($event)" (pointerdown)="down($event)" (pointermove)="move($event)"
         (pointerup)="up($event)" (pointercancel)="up($event)" (pointerleave)="hover.set(null)">
      <canvas #canvas></canvas>
    </div>
  `,
  imports: [LucideZoomIn, LucideZoomOut, LucideMaximize],
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
  /** The face shown: the zoom goes back to fitting when it changes (not when its pixels change, e.g. undo). */
  readonly faceKey = input('');
  /** Fits the face in all the room the component is given (big view), instead of the panel's width. */
  readonly fill = input(false);
  readonly strokeStart = output<Px>();
  readonly strokeMove = output<Px>();
  readonly strokeEnd = output<void>();
  /** A second finger came during a stroke: undo it. */
  readonly strokeCancel = output<void>();

  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly scroll = viewChild.required<ElementRef<HTMLElement>>('scroll');
  /** Room to fit the face in (px). */
  private readonly room = signal({ w: FIT_WIDTH, h: FIT_HEIGHT });
  protected readonly zoom = signal(0);
  protected readonly hover = signal<Px | null>(null);
  private drawing = false;
  /** Fingers / pointers down on the canvas. */
  private readonly pointers = new Map<number, { x: number; y: number }>();
  private gesture: Gesture | null = null;
  /** After a two-finger gesture, the last finger does not draw until all are up. */
  private gestureDone = false;
  /** Point to keep under the fingers / cursor at the next draw (zoom around it): face pixel + screen point. */
  private anchor: { u: number; v: number; x: number; y: number } | null = null;

  protected readonly scale = computed(() => {
    const tex = this.texture();
    const room = this.fill() ? this.room() : { w: FIT_WIDTH, h: FIT_HEIGHT };
    return Math.min(this.maxScale(tex), Math.max(1, this.fitScale(tex, room) + this.zoom()));
  });

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const el = this.scroll().nativeElement;
      const observer = new ResizeObserver(() => {
        if (el.clientWidth > 0 && el.clientHeight > 0) { // not laid out yet: keep the last room
          const style = getComputedStyle(el);
          const padX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
          const padY = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
          this.room.set({ w: el.clientWidth - padX - 2, h: el.clientHeight - padY - 2 });
        }
      });
      observer.observe(el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
    // A new face: back to the fitting zoom
    effect(() => {
      this.faceKey();
      this.zoom.set(0);
    });
    effect(() => {
      this.version();
      this.draw(this.texture(), this.layer(), this.scale(), this.hover());
    });
  }

  protected zoomBy(step: number) {
    this.setScale(this.scale() + step);
  }

  /** Zoom to this scale (clamped), keeping the face pixel under (x, y) in place if given. */
  private setScale(scale: number, at?: { x: number; y: number }) {
    const tex = this.texture();
    const target = Math.min(this.maxScale(tex), Math.max(1, Math.round(scale)));
    const current = this.scale();
    if (target === current) {
      return;
    }
    if (at) {
      // From the canvas as shown (it may not be redrawn at the last scale yet)
      const rect = this.canvas().nativeElement.getBoundingClientRect();
      this.anchor = { u: (at.x - rect.left) / rect.width * tex.w, v: (at.y - rect.top) / rect.height * tex.h, x: at.x, y: at.y };
    }
    this.zoom.update(z => z + target - current);
  }

  protected wheel(event: WheelEvent) {
    if (!event.ctrlKey) { // plain wheel: scroll the zoomed face
      return;
    }
    event.preventDefault();
    const scale = this.scale();
    this.setScale(scale * Math.exp(-event.deltaY / 100), { x: event.clientX, y: event.clientY });
    if (this.scale() === scale && Math.abs(event.deltaY) > 0) { // small steps: at least one level
      this.setScale(scale - Math.sign(event.deltaY), { x: event.clientX, y: event.clientY });
    }
  }

  protected down(event: PointerEvent) {
    if (event.button !== 0) {
      return;
    }
    this.scroll().nativeElement.setPointerCapture(event.pointerId);
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (this.pointers.size === 2) {
      if (this.drawing) {
        this.drawing = false;
        this.strokeCancel.emit();
      }
      this.startGesture();
      return;
    }
    // Beside the face (room around it in the big view): only for two-finger gestures
    if (this.pointers.size > 2 || this.gestureDone || event.target !== this.canvas().nativeElement) {
      return;
    }
    this.drawing = true;
    this.strokeStart.emit(this.pixelAt(event));
  }

  protected move(event: PointerEvent) {
    if (this.pointers.has(event.pointerId)) {
      this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (this.gesture) {
        this.moveGesture();
        return;
      }
    }
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
    if (!this.pointers.delete(event.pointerId)) {
      return;
    }
    this.scroll().nativeElement.releasePointerCapture(event.pointerId);
    if (this.gesture && this.pointers.size < 2) {
      this.gesture = null;
      this.gestureDone = true;
    }
    if (this.pointers.size === 0) {
      this.gestureDone = false;
    }
    if (this.drawing) {
      this.drawing = false;
      this.strokeEnd.emit();
    }
  }

  private startGesture() {
    const [a, b] = [...this.pointers.values()];
    this.gesture = { dist: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)), scale: this.scale(), mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } };
    this.hover.set(null);
  }

  private moveGesture() {
    const gesture = this.gesture!;
    const [a, b] = [...this.pointers.values()];
    const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    // Pan: the face follows the fingers
    const scroll = this.scroll().nativeElement;
    scroll.scrollLeft -= mid.x - gesture.mid.x;
    scroll.scrollTop -= mid.y - gesture.mid.y;
    gesture.mid = mid;
    // Pinch: zoom around the fingers
    this.setScale(gesture.scale * Math.hypot(a.x - b.x, a.y - b.y) / gesture.dist, mid);
  }

  private fitScale(tex: FaceTexture, room: { w: number; h: number }) {
    return Math.max(1, Math.floor(Math.min(room.w / tex.w, room.h / tex.h)));
  }

  private maxScale(tex: FaceTexture) {
    return Math.max(1, Math.floor(MAX_CANVAS / Math.max(tex.w, tex.h)));
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
    if (this.anchor) { // zoomed around a point: scroll so that its pixel stays under it
      const { u, v, x, y } = this.anchor;
      this.anchor = null;
      const scroll = this.scroll().nativeElement;
      const rect = canvas.getBoundingClientRect();
      scroll.scrollLeft += rect.left + u * scale - x;
      scroll.scrollTop += rect.top + v * scale - y;
    }
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
