import { PICTURE_SIZES, WALK_CELL } from "./database";
import { loadImage } from "./load-image";

/** One picture of a walking sheet: its column (WALK_FRAMES) and row (WALK_DIRS). */
export interface WalkCell {
  col: number;
  row: number;
}

function canvas(w: number, h: number): CanvasRenderingContext2D {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c.getContext("2d")!;
}

/** Nothing drawn (every pixel transparent). */
function isEmpty(ctx: CanvasRenderingContext2D): boolean {
  const { data } = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] > 0) {
      return false;
    }
  }
  return true;
}

/** One picture cut from the sheet (undefined: no sheet, or nothing drawn there). */
export async function walkFrame(
  sheet: string | undefined,
  cell: WalkCell
): Promise<string | undefined> {
  if (!sheet) {
    return undefined;
  }
  const { w, h } = WALK_CELL;
  const ctx = canvas(w, h);
  ctx.drawImage(await loadImage(sheet), -cell.col * w, -cell.row * h);
  return isEmpty(ctx) ? undefined : ctx.canvas.toDataURL("image/png");
}

/** The sheet with one picture replaced (undefined: erased); undefined when nothing is left. */
export async function withWalkFrame(
  sheet: string | undefined,
  cell: WalkCell,
  frame: string | undefined
): Promise<string | undefined> {
  const { w, h } = WALK_CELL;
  const ctx = canvas(PICTURE_SIZES.walk.w, PICTURE_SIZES.walk.h);
  if (sheet) {
    ctx.drawImage(await loadImage(sheet), 0, 0);
  }
  ctx.clearRect(cell.col * w, cell.row * h, w, h);
  if (frame) {
    ctx.drawImage(await loadImage(frame), cell.col * w, cell.row * h);
  }
  return isEmpty(ctx) ? undefined : ctx.canvas.toDataURL("image/png");
}
