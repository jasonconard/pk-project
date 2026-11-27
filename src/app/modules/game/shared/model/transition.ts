/**
 * The screen transitions (docs/editeur/20-transitions.md): the picture is covered, what must change changes behind
 * (the map, the fight set up or taken down), then the picture is uncovered. Drawn on a small canvas over the game,
 * stretched with sharp pixels. Which one is played in each case is chosen in the database (Réglages du jeu).
 */
export type TransitionKind =
  "none" | "fade" | "iris" | "wipe" | "pixels" | "stripes" | "shards";

export interface TransitionInfo {
  id: TransitionKind;
  label: string;
  note: string;
  /** How long covering and uncovering take (ms). */
  cover: number;
  reveal: number;
}

export const TRANSITIONS: TransitionInfo[] = [
  {
    id: "none",
    label: "Aucune",
    note: "Changement direct",
    cover: 0,
    reveal: 0,
  },
  {
    id: "fade",
    label: "Fondu au noir",
    note: "Simple",
    cover: 260,
    reveal: 260,
  },
  { id: "iris", label: "Cercle", note: "Simple", cover: 420, reveal: 420 },
  { id: "wipe", label: "Volet", note: "Simple", cover: 340, reveal: 340 },
  { id: "pixels", label: "Mosaïque", note: "Stylée", cover: 520, reveal: 520 },
  {
    id: "stripes",
    label: "Éclair et bandes",
    note: "Stylée",
    cover: 820,
    reveal: 380,
  },
  {
    id: "shards",
    label: "Éclats de cristal",
    note: "Stylée",
    cover: 620,
    reveal: 620,
  },
];

export function transitionInfo(
  kind: TransitionKind | undefined
): TransitionInfo {
  return TRANSITIONS.find((t) => t.id === kind) ?? TRANSITIONS[0];
}

/** Screen pixels per pixel of the transition's canvas. */
export const TRANSITION_PIXEL = 4;

/** The cases a transition is played in, each with its own choice. */
export const TRANSITION_CASES = [
  { id: "map", label: "Changement de carte" },
  { id: "fightIn", label: "Entrée en combat" },
  { id: "fightOut", label: "Sortie de combat" },
] as const;
export type TransitionCase = (typeof TRANSITION_CASES)[number]["id"];

/** A number between 0 and 1 that is always the same for a cell (no flicker from one picture to the next). */
function chance(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43_758.5453;
  return n - Math.floor(n);
}

const ease = (t: number) => t * t * (3 - 2 * t);

/**
 * One picture of a transition.
 * @param covered how much of the screen is covered: 0 nothing, 1 everything
 * @param revealing the picture is being uncovered (some transitions go on the same way instead of going back)
 */
export function drawTransition(
  ctx: CanvasRenderingContext2D,
  kind: TransitionKind,
  covered: number,
  revealing: boolean
): void {
  const { width: w, height: h } = ctx.canvas;
  const p = Math.min(1, Math.max(0, covered));
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#000";
  if (p <= 0 || kind === "none") {
    return;
  }
  switch (kind) {
    case "fade": {
      // (a few steps, like a palette fading)
      ctx.globalAlpha = Math.round(p * 8) / 8;
      ctx.fillRect(0, 0, w, h);
      break;
    }
    case "iris": {
      // A circle closing on the middle of the screen, where the player is
      const cx = w / 2;
      const cy = h * 0.46;
      const far = Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy));
      ctx.fillRect(0, 0, w, h);
      const radius = far * (1 - ease(p));
      if (radius > 0.5) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case "wipe": {
      // A slanted shutter coming from the left; uncovering, it leaves by the right
      const slant = h * 0.35;
      const edge = (w + slant) * ease(revealing ? 1 - p : p);
      ctx.beginPath();
      if (revealing) {
        ctx.moveTo(edge, 0);
        ctx.lineTo(w, 0);
        ctx.lineTo(w, h);
        ctx.lineTo(edge - slant, h);
      } else {
        ctx.moveTo(0, 0);
        ctx.lineTo(edge, 0);
        ctx.lineTo(edge - slant, h);
        ctx.lineTo(0, h);
      }
      ctx.fill();
      break;
    }
    case "pixels": {
      // Big pixels turning black one after the other, at random
      const size = 8;
      for (let y = 0; y * size < h; y++) {
        for (let x = 0; x * size < w; x++) {
          if (p >= 1 || chance(x + 1, y + 1) < p) {
            ctx.fillRect(x * size, y * size, size, size);
          }
        }
      }
      break;
    }
    case "stripes": {
      // Two white flashes, then bands closing from both sides in turn; uncovering, the bands go back
      const flashes = 0.3;
      if (!revealing && p < flashes) {
        ctx.fillStyle = "#fff";
        ctx.globalAlpha =
          Math.round(Math.abs(Math.sin((p / flashes) * Math.PI * 2)) * 4) / 5;
        ctx.fillRect(0, 0, w, h);
        break;
      }
      const closed = ease(revealing ? p : (p - flashes) / (1 - flashes));
      const bands = 9;
      const band = Math.ceil(h / bands);
      for (let i = 0; i < bands; i++) {
        const length = Math.ceil(w * closed);
        ctx.fillRect(i % 2 ? w - length : 0, i * band, length, band);
      }
      break;
    }
    case "shards": {
      // Triangles like crystal shards, spreading from the middle; uncovering, the middle clears first
      const size = 14;
      const cx = w / 2;
      const cy = h * 0.46;
      const far = Math.hypot(cx, Math.max(cy, h - cy));
      const amount = revealing ? 1 - p : p;
      for (let y = 0; y * size < h; y++) {
        for (let x = 0; x * size < w; x++) {
          const x0 = x * size;
          const y0 = y * size;
          const corners = [
            [x0, y0],
            [x0 + size, y0],
            [x0 + size, y0 + size],
            [x0, y0 + size],
          ];
          // (the diagonal changes from a cell to the next: no rows of the same triangles)
          const flip = (x + y) % 2 === 0;
          const halves = flip
            ? [
                [0, 1, 2],
                [0, 2, 3],
              ]
            : [
                [0, 1, 3],
                [1, 2, 3],
              ];
          halves.forEach((half, k) => {
            const mx =
              (corners[half[0]][0] +
                corners[half[1]][0] +
                corners[half[2]][0]) /
              3;
            const my =
              (corners[half[0]][1] +
                corners[half[1]][1] +
                corners[half[2]][1]) /
              3;
            const when =
              (Math.hypot(mx - cx, my - cy) / far) * 0.7 +
              chance(x * 2 + k + 3, y + 7) * 0.3;
            const black = revealing ? when >= amount : when < amount;
            if (p >= 1 || black) {
              ctx.beginPath();
              ctx.moveTo(corners[half[0]][0], corners[half[0]][1]);
              ctx.lineTo(corners[half[1]][0], corners[half[1]][1]);
              ctx.lineTo(corners[half[2]][0], corners[half[2]][1]);
              ctx.fill();
            }
          });
        }
      }
      break;
    }
  }
}
