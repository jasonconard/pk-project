// A combat sprite sheet (Grandia-like combat): one picture cut in frames of the same size, one row per animation
// and per drawn direction, plus its description. Format: docs/editeur/11-planches.md.

/** The 4 diagonal directions a fighter faces (south-east: towards the camera, to the right). */
export type SheetDirection = "se" | "ne" | "sw" | "nw";

/** One animation: its frames (the row's first ones), the time each frame is shown, played once or in a loop. */
export interface SheetAnim {
  id: string;
  frames: number;
  ms: number;
  loop: boolean;
  /** The frame the blow lands on / the spell leaves (0 = the first). */
  hit?: number;
}

export interface SpriteSheet {
  /** The picture (PNG data URL). */
  image: string;
  frame: { w: number; h: number };
  /** The feet in a frame: the point put on the ground (the round shadow is drawn by the game). */
  anchor: { x: number; y: number };
  /** South-west and north-west drawn by flipping south-east and north-east (else 4 rows per animation). */
  mirror: boolean;
  /** In the rows' order. */
  anims: SheetAnim[];
}

/** The animations every fighter has, in the rows' order, with their default timing (a boss's own come after). */
export const SHEET_ANIMS: (SheetAnim & { label: string; note: string })[] = [
  {
    id: "idle",
    label: "Attente",
    note: "en boucle, entre deux actions",
    frames: 6,
    ms: 160,
    loop: true,
  },
  {
    id: "walk",
    label: "Marche",
    note: "en boucle, sur place : le jeu le déplace",
    frames: 8,
    ms: 100,
    loop: true,
  },
  {
    id: "attack",
    label: "Attaque",
    note: "le coup touche sur l'image du coup",
    frames: 6,
    ms: 90,
    loop: false,
    hit: 3,
  },
  {
    id: "heavy",
    label: "Attaque forte",
    note: "le coup touche sur l'image du coup",
    frames: 8,
    ms: 100,
    loop: false,
    hit: 6,
  },
  {
    id: "cast",
    label: "Incantation",
    note: "en boucle, pendant qu'il concentre sa magie",
    frames: 6,
    ms: 140,
    loop: true,
  },
  {
    id: "magic",
    label: "Magie",
    note: "le sort part sur l'image du coup",
    frames: 6,
    ms: 100,
    loop: false,
    hit: 3,
  },
  {
    id: "hurt",
    label: "Coup reçu",
    note: "une fois",
    frames: 4,
    ms: 90,
    loop: false,
  },
  {
    id: "death",
    label: "Mort",
    note: "la dernière image reste, puis il disparaît et laisse son butin",
    frames: 7,
    ms: 130,
    loop: false,
  },
];

/** Drawn directions, in each animation's rows: south-east and north-east, then (without mirror) the other two. */
export const SHEET_DIRECTIONS: SheetDirection[] = ["se", "ne", "sw", "nw"];

export const DIRECTION_LABELS: Record<SheetDirection, string> = {
  se: "Sud-est",
  ne: "Nord-est",
  sw: "Sud-ouest",
  nw: "Nord-ouest",
};

/** Frame size of a new sheet (characters and monsters; a boss: bigger). */
export const SHEET_FRAME = 48;

export function sheetLabel(id: string): string {
  return SHEET_ANIMS.find((a) => a.id === id)?.label ?? id;
}

/** Rows per animation: 2 with the mirror, else 4. */
export function rowsPerAnim(sheet: Pick<SpriteSheet, "mirror">): number {
  return sheet.mirror ? 2 : 4;
}

/** Flipped when drawn: the west directions of a mirrored sheet. */
export function isFlipped(sheet: SpriteSheet, dir: SheetDirection): boolean {
  return sheet.mirror && (dir === "sw" || dir === "nw");
}

/** The row of an animation seen from a direction. */
export function sheetRow(
  sheet: SpriteSheet,
  anim: number,
  dir: SheetDirection
): number {
  const drawn = sheet.mirror
    ? { se: 0, ne: 1, sw: 0, nw: 1 }[dir]
    : SHEET_DIRECTIONS.indexOf(dir);
  return anim * rowsPerAnim(sheet) + drawn;
}

/** The frame shown after `ms` of an animation (a played once one stays on its last frame). */
export function frameAt(anim: SheetAnim, ms: number): number {
  if (anim.frames <= 0) {
    return 0;
  }
  const i = Math.floor(ms / anim.ms);
  return anim.loop ? i % anim.frames : Math.min(i, anim.frames - 1);
}

/** A new sheet's description for a picture: default animations, the feet at the bottom middle. */
export function newSheet(
  image: string,
  w = SHEET_FRAME,
  h = SHEET_FRAME
): SpriteSheet {
  return {
    image,
    frame: { w, h },
    anchor: defaultAnchor(w, h),
    mirror: true,
    anims: SHEET_ANIMS.map(({ id, frames, ms, loop, hit }) => ({
      id,
      frames,
      ms,
      loop,
      ...(hit === undefined ? {} : { hit }),
    })),
  };
}

export function defaultAnchor(w: number, h: number): { x: number; y: number } {
  return { x: Math.floor(w / 2), y: h - 3 };
}

/** Is any pixel of the frame (col, row) visible? */
export function frameUsed(
  data: ImageData,
  x0: number,
  y0: number,
  w: number,
  h: number
): boolean {
  for (let y = y0; y < y0 + h && y < data.height; y++) {
    for (let x = x0; x < x0 + w && x < data.width; x++) {
      if (data.data[(y * data.width + x) * 4 + 3] > 0) {
        return true;
      }
    }
  }
  return false;
}

/**
 * The frames found in each animation's first drawn row: up to the last frame with something drawn in it
 * (0: the row is missing or empty). The hit frame stays inside the animation.
 */
export function detectFrames(
  img: HTMLImageElement,
  sheet: SpriteSheet
): SheetAnim[] {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, img.width, img.height);
  const { w, h } = sheet.frame;
  const cols = Math.floor(img.width / w);
  return sheet.anims.map((anim, i) => {
    const row = i * rowsPerAnim(sheet);
    let frames = 0;
    for (let col = 0; col < cols; col++) {
      if (
        (row + 1) * h <= img.height &&
        frameUsed(data, col * w, row * h, w, h)
      ) {
        frames = col + 1;
      }
    }
    const next: SheetAnim = { ...anim, frames };
    if (next.hit !== undefined && next.hit >= frames) {
      next.hit = Math.max(0, frames - 1);
    }
    return next;
  });
}

/** What does not fit in a sheet's picture (empty: everything is fine). */
export function sheetProblems(
  sheet: SpriteSheet,
  size: { w: number; h: number }
): string[] {
  const { w, h } = sheet.frame;
  const problems: string[] = [];
  if (size.w % w || size.h % h) {
    problems.push(
      `L'image (${size.w} × ${size.h}) ne se découpe pas en cases de ${w} × ${h}.`
    );
  }
  const rows = Math.floor(size.h / h);
  const needed = sheet.anims.length * rowsPerAnim(sheet);
  if (rows < needed) {
    problems.push(
      `${rows} lignes dans l'image, il en faut ${needed} (${sheet.anims.length} animations × ${rowsPerAnim(sheet)} directions).`
    );
  }
  const empty = sheet.anims
    .filter((a) => a.frames === 0)
    .map((a) => sheetLabel(a.id));
  if (empty.length > 0) {
    problems.push(`Sans image : ${empty.join(", ")}.`);
  }
  return problems;
}

/** The still picture of a sheet (the first frame of its idle animation, seen from the south-east), trimmed. */
export function sheetStill(
  img: HTMLImageElement,
  sheet: SpriteSheet
): string | undefined {
  const { w, h } = sheet.frame;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, w, h, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h);
  let x0 = w;
  let y0 = h;
  let x1 = -1;
  let y1 = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data.data[(y * w + x) * 4 + 3] > 0) {
        x0 = Math.min(x0, x);
        y0 = Math.min(y0, y);
        x1 = Math.max(x1, x);
        y1 = Math.max(y1, y);
      }
    }
  }
  if (x1 < 0) {
    return undefined;
  }
  const out = document.createElement("canvas");
  out.width = x1 - x0 + 1;
  out.height = y1 - y0 + 1;
  out
    .getContext("2d")!
    .drawImage(
      canvas,
      x0,
      y0,
      out.width,
      out.height,
      0,
      0,
      out.width,
      out.height
    );
  return out.toDataURL("image/png");
}
