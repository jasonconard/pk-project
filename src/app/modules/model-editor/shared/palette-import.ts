import { hexToRgba, rgbaToHex } from './pixel-tools';

/** A palette loaded from a file (Aseprite, Lospec, GIMP…). */
export interface ImportedPalette {
  name: string;
  colors: string[];
}

/** Colors kept from a file (Aseprite palettes have up to 256). */
const MAX_COLORS = 256;

/** Formats read: GIMP (.gpl), JASC (.pal), hex list (.hex, .txt), image (.png: each different color). */
export const PALETTE_FILE_TYPES = '.gpl,.pal,.hex,.txt,.png';

function rgbToHex(r: number, g: number, b: number): string {
  return rgbaToHex([r, g, b, 255]);
}

function unique(colors: string[]): string[] {
  return [...new Set(colors)].slice(0, MAX_COLORS);
}

/** GIMP palette: "GIMP Palette", "Name: …", "Columns: …", "# comments", then "R G B name" lines. */
function parseGpl(text: string): { name?: string, colors: string[] } {
  const name = /^Name:\s*(.+)$/m.exec(text)?.[1].trim();
  const colors = text.split(/\r?\n/)
    .map(line => /^\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})/.exec(line))
    .filter((m): m is RegExpExecArray => !!m)
    .map(m => rgbToHex(+m[1], +m[2], +m[3]));
  return { name, colors };
}

/** JASC palette (Paint Shop Pro, Aseprite .pal): "JASC-PAL", "0100", count, then "R G B" lines. */
function parseJasc(text: string): string[] {
  return text.split(/\r?\n/).slice(3)
    .map(line => /^\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s*$/.exec(line))
    .filter((m): m is RegExpExecArray => !!m)
    .map(m => rgbToHex(+m[1], +m[2], +m[3]));
}

/** One "rrggbb" (or "#rrggbb", or paint.net "aarrggbb") per line; ";" comments. */
function parseHex(text: string): string[] {
  return text.split(/\r?\n/)
    .map(line => line.trim().replace(/^#/, ''))
    .filter(line => /^([0-9a-f]{2})?[0-9a-f]{6}$/i.test(line))
    .map(line => '#' + line.slice(-6).toLowerCase());
}

/** Each different opaque color of the image, read left to right, top to bottom. */
async function parseImage(file: File): Promise<string[]> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const colors: string[] = [];
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] >= 128) {
      colors.push(rgbToHex(data[i], data[i + 1], data[i + 2]));
    }
  }
  return colors;
}

/** Reads a palette file. Throws if no color was found in it. */
export async function readPaletteFile(file: File): Promise<ImportedPalette> {
  const ext = file.name.toLowerCase().split('.').pop() ?? '';
  const baseName = file.name.replace(/\.[^.]+$/, '');
  let name: string | undefined;
  let colors: string[];
  if (ext === 'png') {
    colors = await parseImage(file);
  } else {
    const text = await file.text();
    if (/^GIMP Palette/.test(text)) {
      ({ name, colors } = parseGpl(text));
    } else if (/^JASC-PAL/.test(text)) {
      colors = parseJasc(text);
    } else {
      colors = parseHex(text);
    }
  }
  colors = unique(colors);
  if (!colors.length) {
    throw new Error(`Aucune couleur trouvée dans ${file.name}`);
  }
  return { name: name || baseName, colors };
}

/** Color of the palette closest to `hex` (distance in RGB, weighted like the eye: green counts most). */
export function nearestColor(hex: string, palette: string[]): string {
  const [r, g, b] = hexToRgba(hex);
  let best = palette[0], bestDistance = Infinity;
  palette.forEach(color => {
    const [pr, pg, pb] = hexToRgba(color);
    const d = 2 * (pr - r) ** 2 + 4 * (pg - g) ** 2 + 3 * (pb - b) ** 2;
    if (d < bestDistance) {
      best = color;
      bestDistance = d;
    }
  });
  return best;
}
