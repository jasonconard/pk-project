import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, OnInit, output, signal, viewChild } from '@angular/core';
import { EscapeService } from '../../../core/shared/service/escape.service';
import {
  LucideEraser, LucideFlipHorizontal2, LucideImageUp, LucidePaintBucket, LucidePencil, LucidePipette, LucidePlus, LucideTrash, LucideUndo2,
  LucideZoomIn, LucideZoomOut,
} from '@lucide/angular';

const SIZE = 16;
const ZOOM_MIN = 1;
const ZOOM_MAX = 4;
type Tool = 'pencil' | 'eraser' | 'fill' | 'pick';

const PALETTE = ['#14121c', '#f0f0e8', '#bec3d2', '#6e7387', '#d64040', '#8c1e28', '#f08c32', '#ffd650', '#c89628',
  '#6ec86e', '#327840', '#8fd8ff', '#50a0f0', '#28509f', '#aa64dc', '#643296', '#facdaa', '#d29678', '#966438', '#5a3c28'];

/** '' = transparent, else #rrggbb. */
type Pixels = string[];

/**
 * Draws a 16×16 pixel art icon (elements, weapon types, states…), or imports a PNG (shrunk to 16×16). Gives back a
 * PNG data URL, or undefined when everything was erased. Zoom: − / +, two fingers (pinch, and move), Ctrl + wheel.
 */
@Component({
  selector: 'db-pixel-editor',
  imports: [
    LucideEraser, LucideFlipHorizontal2, LucideImageUp, LucidePaintBucket, LucidePencil, LucidePipette, LucidePlus, LucideTrash, LucideUndo2,
    LucideZoomIn, LucideZoomOut,
  ],
  templateUrl: './pixel-editor.component.html',
  styleUrl: './pixel-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PixelEditorComponent implements OnInit {
  readonly title = input('Icône');
  readonly value = input<string | undefined>(undefined);
  readonly done = output<string | undefined>();
  readonly cancel = output<void>();

  protected readonly size = SIZE;
  protected readonly cells = Array.from({ length: SIZE * SIZE }, (_, i) => i);
  protected readonly pixels = signal<Pixels>(Array(SIZE * SIZE).fill(''));
  protected readonly tool = signal<Tool>('pencil');
  protected readonly color = signal(PALETTE[6]);
  private readonly history = signal<Pixels[]>([]);
  protected readonly canUndo = computed(() => this.history().length > 0);
  protected readonly message = signal('');
  /** The palette, then the icon's other colors (to pick them again). */
  protected readonly palette = computed(() => {
    const used = this.pixels().filter(c => c && !PALETTE.includes(c));
    return [...PALETTE, ...new Set(used)];
  });
  protected readonly tools: { id: Tool, label: string }[] = [
    { id: 'pencil', label: 'Crayon' }, { id: 'eraser', label: 'Gomme' },
    { id: 'fill', label: 'Remplir' }, { id: 'pick', label: 'Pipette' },
  ];
  private drawing = false;
  protected readonly zoom = signal(ZOOM_MIN);
  protected readonly zoomMin = ZOOM_MIN;
  protected readonly zoomMax = ZOOM_MAX;
  private readonly wrap = viewChild.required<ElementRef<HTMLElement>>('wrap');
  /** The fingers (or mouse) on the grid. */
  private readonly pointers = new Map<number, { x: number, y: number }>();
  /** This gesture changed the pixels with its first finger (undone if a second finger comes: it was a pinch). */
  private gestureEdited = false;
  private pinch: { dist: number, zoom: number, mid: { x: number, y: number } } | null = null;

  constructor() {
    // Escape and the back button close it first (the latest layer)
    inject(EscapeService).whileAlive(() => this.cancel.emit());
  }

  ngOnInit(): void {
    const value = this.value();
    if (value) {
      void loadImage(value).then(img => this.pixels.set(imageToPixels(img)));
    }
  }

  protected setTool(tool: Tool): void {
    this.tool.set(tool);
  }

  protected setColor(color: string): void {
    this.color.set(color);
    if (this.tool() === 'eraser' || this.tool() === 'pick') {
      this.tool.set('pencil');
    }
  }

  protected down(ev: PointerEvent): void {
    ev.preventDefault();
    (ev.currentTarget as HTMLElement).setPointerCapture(ev.pointerId);
    this.pointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
    if (this.pointers.size === 2) {
      // Two fingers: a zoom / move, not a drawing
      if (this.gestureEdited) {
        this.undo();
      }
      this.drawing = false;
      this.gestureEdited = false;
      this.startPinch();
      return;
    }
    if (this.pointers.size > 2) {
      return;
    }
    const cell = this.cellAt(ev);
    if (cell < 0) {
      return;
    }
    const tool = this.tool();
    if (tool === 'pick') {
      const picked = this.pixels()[cell];
      if (picked) {
        this.color.set(picked);
        this.tool.set('pencil');
      }
      return;
    }
    this.remember();
    this.gestureEdited = true;
    if (tool === 'fill') {
      this.pixels.set(flood(this.pixels(), cell, this.color()));
      return;
    }
    this.drawing = true;
    this.paint(cell);
  }

  protected move(ev: PointerEvent): void {
    if (this.pointers.has(ev.pointerId)) {
      this.pointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
    }
    if (this.pinch) {
      this.movePinch();
      return;
    }
    if (this.drawing) {
      const cell = this.cellAt(ev);
      if (cell >= 0) {
        this.paint(cell);
      }
    }
  }

  protected up(ev: PointerEvent): void {
    this.pointers.delete(ev.pointerId);
    this.drawing = false;
    if (this.pointers.size < 2) {
      this.pinch = null;
    }
    if (!this.pointers.size) {
      this.gestureEdited = false;
    }
  }

  /** Ctrl + wheel (and the trackpad pinch): zoom around the mouse. */
  protected wheel(ev: WheelEvent): void {
    if (!ev.ctrlKey) {
      return;
    }
    ev.preventDefault();
    this.zoomAt(this.zoom() * Math.exp(-ev.deltaY / 200), ev.clientX, ev.clientY);
  }

  protected zoomBy(factor: number): void {
    const rect = this.wrap().nativeElement.getBoundingClientRect();
    this.zoomAt(this.zoom() * factor, rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  protected zoomLabel(): string {
    return `×${Math.round(this.zoom() * 10) / 10}`.replace('.', ',');
  }

  private startPinch(): void {
    const [a, b] = [...this.pointers.values()];
    this.pinch = { dist: Math.hypot(a.x - b.x, a.y - b.y) || 1, zoom: this.zoom(), mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } };
  }

  private movePinch(): void {
    const pinch = this.pinch!;
    const [a, b] = [...this.pointers.values()];
    const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    const wrap = this.wrap().nativeElement;
    // The fingers moving together move the grid
    wrap.scrollLeft -= mid.x - pinch.mid.x;
    wrap.scrollTop -= mid.y - pinch.mid.y;
    pinch.mid = mid;
    this.zoomAt(pinch.zoom * Math.hypot(a.x - b.x, a.y - b.y) / pinch.dist, mid.x, mid.y);
  }

  /** New zoom, the point under (x, y) staying under it. */
  private zoomAt(zoom: number, x: number, y: number): void {
    const next = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, zoom));
    const old = this.zoom();
    if (Math.abs(next - old) < 0.001) {
      return;
    }
    const wrap = this.wrap().nativeElement;
    const rect = wrap.getBoundingClientRect();
    const px = x - rect.left + wrap.scrollLeft;
    const py = y - rect.top + wrap.scrollTop;
    this.zoom.set(next);
    // (the grid's new size is applied before scrolling)
    wrap.querySelector<HTMLElement>('.grid')!.style.width = `${next * 100}%`;
    wrap.scrollLeft = px * next / old - (x - rect.left);
    wrap.scrollTop = py * next / old - (y - rect.top);
  }

  protected undo(): void {
    const history = this.history();
    if (history.length) {
      this.pixels.set(history[history.length - 1]);
      this.history.set(history.slice(0, -1));
    }
  }

  protected flip(): void {
    this.remember();
    const p = this.pixels();
    this.pixels.set(p.map((_, i) => p[Math.floor(i / SIZE) * SIZE + SIZE - 1 - i % SIZE]));
  }

  protected clear(): void {
    this.remember();
    this.pixels.set(Array(SIZE * SIZE).fill(''));
  }

  protected async importPng(ev: Event): Promise<void> {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) {
      return;
    }
    const url = URL.createObjectURL(file);
    try {
      const img = await loadImage(url);
      this.remember();
      this.pixels.set(imageToPixels(img));
      this.message.set(img.width > SIZE || img.height > SIZE ? `Image réduite à ${SIZE} × ${SIZE} pixels.` : '');
    } catch {
      this.message.set('Cette image n\'a pas pu être lue.');
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  protected ok(): void {
    const pixels = this.pixels();
    this.done.emit(pixels.some(c => c) ? pixelsToDataUrl(pixels) : undefined);
  }

  private paint(cell: number): void {
    const color = this.tool() === 'eraser' ? '' : this.color();
    if (this.pixels()[cell] !== color) {
      this.pixels.update(p => p.map((c, i) => i === cell ? color : c));
    }
  }

  private remember(): void {
    this.history.update(h => [...h.slice(-49), this.pixels()]);
  }

  private cellAt(ev: PointerEvent): number {
    const rect = (ev.currentTarget as HTMLElement).getBoundingClientRect();
    const x = Math.floor((ev.clientX - rect.left) / rect.width * SIZE);
    const y = Math.floor((ev.clientY - rect.top) / rect.height * SIZE);
    return x < 0 || y < 0 || x >= SIZE || y >= SIZE ? -1 : y * SIZE + x;
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** The image shrunk to fit 16×16 (centered, no smoothing); half transparent pixels become transparent. */
function imageToPixels(img: HTMLImageElement): Pixels {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = SIZE;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  const scale = Math.min(SIZE / img.width, SIZE / img.height, 1);
  const w = Math.max(1, Math.round(img.width * scale));
  const h = Math.max(1, Math.round(img.height * scale));
  ctx.drawImage(img, Math.floor((SIZE - w) / 2), Math.floor((SIZE - h) / 2), w, h);
  const data = ctx.getImageData(0, 0, SIZE, SIZE).data;
  return Array.from({ length: SIZE * SIZE }, (_, i) => data[i * 4 + 3] < 128 ? ''
    : '#' + [0, 1, 2].map(k => data[i * 4 + k].toString(16).padStart(2, '0')).join(''));
}

function pixelsToDataUrl(pixels: Pixels): string {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = SIZE;
  const ctx = canvas.getContext('2d')!;
  pixels.forEach((c, i) => {
    if (c) {
      ctx.fillStyle = c;
      ctx.fillRect(i % SIZE, Math.floor(i / SIZE), 1, 1);
    }
  });
  return canvas.toDataURL('image/png');
}

/** Paint bucket: the touching cells of the same color take the new one. */
function flood(pixels: Pixels, start: number, color: string): Pixels {
  const from = pixels[start];
  if (from === color) {
    return pixels;
  }
  const next = [...pixels];
  const stack = [start];
  while (stack.length) {
    const i = stack.pop()!;
    if (next[i] !== from) {
      continue;
    }
    next[i] = color;
    const x = i % SIZE;
    if (x > 0) stack.push(i - 1);
    if (x < SIZE - 1) stack.push(i + 1);
    if (i >= SIZE) stack.push(i - SIZE);
    if (i < SIZE * (SIZE - 1)) stack.push(i + SIZE);
  }
  return next;
}
