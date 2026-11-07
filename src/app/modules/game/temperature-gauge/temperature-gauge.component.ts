import { Component, computed, input } from '@angular/core';

/** Range of the thermometer scale (°C) and its graduations. */
const MIN = -20;
const MAX = 50;
const TICKS = [50, 40, 30, 20, 10, 0, -10, -20];
/** Liquid color along the scale: icy blue when cold, green when mild, orange / red when hot. */
const COLOR_STOPS: [number, [number, number, number]][] = [
  [-20, [90, 140, 255]],
  [0, [110, 210, 255]],
  [15, [120, 220, 120]],
  [25, [255, 210, 70]],
  [35, [255, 140, 40]],
  [50, [235, 40, 30]],
];

function colorAt(t: number): string {
  const i = COLOR_STOPS.findIndex(([at]) => at >= t);
  if (i <= 0) {
    return `rgb(${COLOR_STOPS[i < 0 ? COLOR_STOPS.length - 1 : 0][1].join(',')})`;
  }
  const [a, ca] = COLOR_STOPS[i - 1];
  const [b, cb] = COLOR_STOPS[i];
  const k = (t - a) / (b - a);
  return `rgb(${ca.map((c, j) => Math.round(c + (cb[j] - c) * k)).join(',')})`;
}

/** Vertical thermometer on the left of the screen, following the weather temperature. */
@Component({
  selector: 'game-temperature-gauge',
  templateUrl: './temperature-gauge.component.html',
  styleUrl: './temperature-gauge.component.scss',
  host: {
    '[style.--liquid]': 'color()',
  },
})
export class TemperatureGaugeComponent {
  /** °C */
  readonly temperature = input.required<number>();

  protected readonly ticks = TICKS.map(value => ({ value, position: this.toPercent(value) }));
  /** Liquid height, % of the tube. */
  protected readonly level = computed(() => this.toPercent(this.temperature()));
  protected readonly color = computed(() => colorAt(this.temperature()));
  protected readonly label = computed(() => Math.round(this.temperature()));

  private toPercent(t: number): number {
    return 100 * (Math.min(Math.max(t, MIN), MAX) - MIN) / (MAX - MIN);
  }
}
