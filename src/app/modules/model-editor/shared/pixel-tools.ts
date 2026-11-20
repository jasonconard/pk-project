export type Tool = "pencil" | "eraser" | "picker" | "fill" | "line" | "rect";
export type Rgba = [number, number, number, number];
export interface Px {
  x: number;
  y: number;
}

/** Pixels drawn on: a face's colors (4 values per pixel, RGBA) or one of its grayscale layers (1 value). */
export interface Grid {
  w: number;
  h: number;
  data: Uint8ClampedArray;
  channels: 1 | 4;
}

/** The pixel's values (RGBA, or [gray]). */
export function getPixel(grid: Grid, p: Px): number[] {
  const i = (p.y * grid.w + p.x) * grid.channels;
  return [...grid.data.subarray(i, i + grid.channels)];
}

export function setPixel(grid: Grid, p: Px, value: number[]) {
  if (p.x >= 0 && p.y >= 0 && p.x < grid.w && p.y < grid.h) {
    grid.data.set(value, (p.y * grid.w + p.x) * grid.channels);
  }
}

/** Pixels of a straight line (Bresenham), ends included. */
export function linePixels(a: Px, b: Px): Px[] {
  const out: Px[] = [];
  const dx = Math.abs(b.x - a.x),
    dy = -Math.abs(b.y - a.y);
  const sx = a.x < b.x ? 1 : -1,
    sy = a.y < b.y ? 1 : -1;
  let err = dx + dy,
    x = a.x,
    y = a.y;
  for (;;) {
    out.push({ x, y });
    if (x === b.x && y === b.y) {
      return out;
    }
    const e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      x += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y += sy;
    }
  }
}

/** Pixels of a rectangle between two corners: its outline, or all of it. */
export function rectPixels(a: Px, b: Px, filled: boolean): Px[] {
  const out: Px[] = [];
  const [x0, x1] = [Math.min(a.x, b.x), Math.max(a.x, b.x)];
  const [y0, y1] = [Math.min(a.y, b.y), Math.max(a.y, b.y)];
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      if (filled || x === x0 || x === x1 || y === y0 || y === y1) {
        out.push({ x, y });
      }
    }
  }
  return out;
}

/** Fills the area of the same color as the start pixel (4 neighbors). */
export function floodFill(tex: Grid, start: Px, rgba: number[]) {
  const target = getPixel(tex, start).join();
  if (target === rgba.join()) {
    return;
  }
  const stack: Px[] = [start];
  while (stack.length > 0) {
    const p = stack.pop()!;
    if (
      p.x < 0 ||
      p.y < 0 ||
      p.x >= tex.w ||
      p.y >= tex.h ||
      getPixel(tex, p).join() !== target
    ) {
      continue;
    }
    setPixel(tex, p, rgba);
    stack.push(
      { x: p.x + 1, y: p.y },
      { x: p.x - 1, y: p.y },
      { x: p.x, y: p.y + 1 },
      { x: p.x, y: p.y - 1 }
    );
  }
}

/**
 * One press-drag-release of a tool on a face texture (colors or a grayscale layer). The eraser makes the colors
 * transparent, and a grayscale layer black. The pencil and the eraser draw along the pointer (no gaps
 * between moves); the line and the rectangle are redrawn from the texture as it was at the press, until the release.
 */
export class PaintStroke {
  private readonly snapshot: Uint8ClampedArray | null;
  private start: Px | null = null;
  private last: Px | null = null;

  constructor(
    private readonly tex: Grid,
    private readonly tool: Tool,
    /** RGBA, or [gray]. */
    private readonly rgba: number[],
    private readonly filled = false,
    /** Called with the value under the pointer (picker). */
    private readonly onPick: (value: number[]) => void = () => {}
  ) {
    this.snapshot =
      tool === "line" || tool === "rect"
        ? new Uint8ClampedArray(tex.data)
        : null;
  }

  /** Applies the tool at a pixel. Returns true if the texture changed. */
  apply(p: Px): boolean {
    const first = !this.start;
    this.start ??= p;
    const last = this.last;
    this.last = p;
    switch (this.tool) {
      case "picker":
        this.onPick(getPixel(this.tex, p));
        return false;
      case "fill":
        if (first) {
          floodFill(this.tex, p, this.rgba);
        }
        return first;
      case "pencil":
      case "eraser": {
        const color =
          this.tool === "eraser"
            ? Array.from({ length: this.tex.channels }, () => 0)
            : this.rgba;
        linePixels(last ?? p, p).forEach((px) => setPixel(this.tex, px, color));
        return true;
      }
      case "line":
      case "rect":
        this.tex.data.set(this.snapshot!);
        (this.tool === "line"
          ? linePixels(this.start, p)
          : rectPixels(this.start, p, this.filled)
        ).forEach((px) => setPixel(this.tex, px, this.rgba));
        return true;
    }
  }
}

export function hexToRgba(hex: string): Rgba {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 255];
}

export function rgbaToHex(rgba: number[]): string {
  return (
    "#" +
    rgba
      .slice(0, 3)
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
  );
}
