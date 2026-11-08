/** Graphics quality: 'auto' adapts the resolution (then the shadows) to keep the game smooth. */
export type QualityMode = 'auto' | 'high' | 'medium' | 'low';

export interface QualityPreset {
  /** Max render pixel ratio (the screen density is used up to this: a pixel art game doesn't need more). */
  maxPixelRatio: number;
  /** Shadow texture size (px). */
  shadowMapSize: number;
}

export const QUALITY_PRESETS: Record<Exclude<QualityMode, 'auto'>, QualityPreset> = {
  high: { maxPixelRatio: 2, shadowMapSize: 4096 },
  medium: { maxPixelRatio: 1.5, shadowMapSize: 2048 },
  low: { maxPixelRatio: 1, shadowMapSize: 1024 },
};

export const QUALITY_CHOICES: { mode: QualityMode, label: string, hint: string }[] = [
  { mode: 'auto', label: 'Auto', hint: 'S\'adapte pour rester fluide' },
  { mode: 'high', label: 'Haute', hint: 'Résolution max ×2, ombres fines' },
  { mode: 'medium', label: 'Moyenne', hint: 'Résolution ×1.5, ombres moyennes' },
  { mode: 'low', label: 'Économie', hint: 'Résolution ×1, ombres simples' },
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
