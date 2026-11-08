import * as THREE from 'three';
import { DrawCallGroup } from './DrawCallBreakdown';

/** One second of measures, shown by the diagnostic console (hidden menu of the temperature / fps tile). */
export interface DiagnosticsReport {
  fps: number;
  /** Average and worst time between two frames (ms): the worst one is the stutter you feel. */
  frameAvg: number;
  frameMax: number;
  /** Main thread time per second (ms) spent in the moves / inputs, the weather update, the render submission. */
  input: number;
  weather: number;
  render: number;
  /** Per frame: draw calls and triangles (all passes: shadows, scene, post effects). */
  calls: number;
  triangles: number;
  /** Canvas size in real pixels, pixel ratio, shadow size (0 = none), particles share. */
  width: number;
  height: number;
  pixelRatio: number;
  shadowMapSize: number;
  detail: number;
  /** GPU memory: geometries and textures alive. */
  geometries: number;
  textures: number;
  /** Where the main pass draw calls come from (biggest first). */
  breakdown: DrawCallGroup[];
}

/**
 * Collects the measures over one second (only while the console is open: no cost otherwise). The render
 * info is accumulated by hand over all the passes of a frame (three.js resets it at each render call).
 */
export class Diagnostics {
  enabled = false;
  report: DiagnosticsReport | null = null;
  private input = 0;
  private weather = 0;
  private render = 0;
  private frames = 0;
  private frameMax = 0;
  private lastFrame = 0;
  private calls = 0;
  private triangles = 0;

  /** Times a piece of work (ms added to `key`), only while enabled. */
  measure<T>(key: 'input' | 'weather' | 'render', work: () => T): T {
    if (!this.enabled) {
      return work();
    }
    const start = performance.now();
    const result = work();
    this[key] += performance.now() - start;
    return result;
  }

  /** At the start of a frame: frame interval, render counters reset. */
  frameStart(renderer: THREE.WebGLRenderer) {
    if (!this.enabled) {
      return;
    }
    const now = performance.now();
    if (this.lastFrame) {
      this.frameMax = Math.max(this.frameMax, now - this.lastFrame);
    }
    this.lastFrame = now;
    this.frames++;
    renderer.info.autoReset = false;
    renderer.info.reset();
  }

  /** At the end of a frame: render counters of all its passes. */
  frameEnd(renderer: THREE.WebGLRenderer) {
    if (!this.enabled) {
      return;
    }
    this.calls += renderer.info.render.calls;
    this.triangles += renderer.info.render.triangles;
  }

  /** Every second: the report of the second that ended, counters back to 0. */
  flush(renderer: THREE.WebGLRenderer, state: { pixelRatio: number, shadowMapSize: number, detail: number },
        breakdown: () => DrawCallGroup[]) {
    if (!this.enabled) {
      this.report = null;
      renderer.info.autoReset = true;
      return;
    }
    const frames = Math.max(this.frames, 1);
    const size = renderer.getDrawingBufferSize(new THREE.Vector2());
    this.report = {
      fps: this.frames,
      frameAvg: this.frames ? 1000 / this.frames : 0,
      frameMax: this.frameMax,
      input: this.input,
      weather: this.weather,
      render: this.render,
      calls: Math.round(this.calls / frames),
      triangles: Math.round(this.triangles / frames),
      width: size.x,
      height: size.y,
      ...state,
      geometries: renderer.info.memory.geometries,
      textures: renderer.info.memory.textures,
      breakdown: breakdown(),
    };
    this.input = this.weather = this.render = this.frames = this.frameMax = this.calls = this.triangles = 0;
  }
}
