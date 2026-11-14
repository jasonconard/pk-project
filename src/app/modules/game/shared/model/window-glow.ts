/** Below this many glass pixels a texture is considered to have no window (avoids stray pixels). */
export const MIN_WINDOW_PIXELS = 50;

/**
 * Night light of a pixel of a model texture when it has no night map: window glass (saturated light blue in the
 * pixel-art textures; walls, roofs and outlines excluded) glows, keeping its shading (0..255); the rest stays dark (0).
 */
export function windowGlow(r: number, g: number, b: number, a: number): number {
  return a > 0 && b >= 200 && b - r >= 60 ? Math.round(140 + 115 * g / 255) : 0;
}
