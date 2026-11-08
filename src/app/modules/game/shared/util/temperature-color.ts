/** Temperature color: icy blue when cold, green when mild, orange / red when hot. */
const COLOR_STOPS: [number, [number, number, number]][] = [
  [-20, [90, 140, 255]],
  [0, [110, 210, 255]],
  [15, [120, 220, 120]],
  [25, [255, 210, 70]],
  [35, [255, 140, 40]],
  [50, [235, 40, 30]],
];

export function temperatureColor(t: number): string {
  const i = COLOR_STOPS.findIndex(([at]) => at >= t);
  if (i <= 0) {
    return `rgb(${COLOR_STOPS[i < 0 ? COLOR_STOPS.length - 1 : 0][1].join(',')})`;
  }
  const [a, ca] = COLOR_STOPS[i - 1];
  const [b, cb] = COLOR_STOPS[i];
  const k = (t - a) / (b - a);
  return `rgb(${ca.map((c, j) => Math.round(c + (cb[j] - c) * k)).join(',')})`;
}
