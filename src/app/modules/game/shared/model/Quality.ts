/** Graphics quality: 'auto' adapts the resolution, then the shadows, then the effects, to keep the game smooth. */
export type QualityMode = 'auto' | 'high' | 'medium' | 'low';

export interface QualityPreset {
  /** Max render pixel ratio (the screen density is used up to this: a pixel art game doesn't need more). */
  maxPixelRatio: number;
  /** Shadow texture size (px), 0 = no shadows. */
  shadowMapSize: number;
  /** Share of the weather particles drawn (rain drops, embers, smoke...). */
  detail: number;
  /** Full screen effects (window bloom, sun rays). */
  postEffects: boolean;
}

export const QUALITY_PRESETS: Record<Exclude<QualityMode, 'auto'>, QualityPreset> = {
  high: { maxPixelRatio: 2, shadowMapSize: 4096, detail: 1, postEffects: true },
  medium: { maxPixelRatio: 1.5, shadowMapSize: 2048, detail: 0.6, postEffects: true },
  // (below 1: the picture is computed smaller and enlarged with crisp pixels, see Game.applyQuality)
  low: { maxPixelRatio: 0.75, shadowMapSize: 0, detail: 0.35, postEffects: false },
};

/**
 * Current rendering detail, read by the weather (particle counts, full screen effects). Set by the game
 * quality (Game.setQuality / adaptQuality).
 */
export const RENDER_DETAIL = { particles: 1, postEffects: true };

export const QUALITY_CHOICES: { mode: QualityMode, label: string, hint: string }[] = [
  { mode: 'auto', label: 'Auto', hint: 'S\'adapte pour rester fluide' },
  { mode: 'high', label: 'Haute', hint: 'Résolution max ×2, ombres fines, tous les effets' },
  { mode: 'medium', label: 'Moyenne', hint: 'Résolution ×1.5, moins de particules' },
  { mode: 'low', label: 'Économie', hint: 'Résolution ×0.75, sans ombres ni halos, moins de particules' },
];

/** Auto mode: below LOW_FPS for LOW_SECONDS → one step down; above HIGH_FPS for HIGH_SECONDS → one step up. */
export const AUTO_LOW_FPS = 45;
export const AUTO_LOW_SECONDS = 3;
export const AUTO_HIGH_FPS = 58;
export const AUTO_HIGH_SECONDS = 8;
/** Auto mode: pixel ratio change per step, its lowest value. */
export const AUTO_RATIO_STEP = 0.25;
export const AUTO_MIN_RATIO = 1;

/** Touch screen (phone, tablet): the auto mode starts from the medium preset instead of the high one. */
export function isTouchDevice(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;
}
