import { Service, signal } from '@angular/core';
import * as THREE from 'three';
import { fromEvent } from 'rxjs';
import { Stick, STICK_RADIUS } from '../model/Stick';

const isTouchDevice = (): boolean => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

/** Non-standard property set by iOS Safari on pinch gestures. */
interface ScalableTouchEvent extends TouchEvent {
  scale?: number;
}

@Service()
export class TouchService {
  private readonly isTouchDeviceState = signal(isTouchDevice());
  readonly isTouchDevice = this.isTouchDeviceState.asReadonly();

  private readonly stickState = signal<Stick | null>(null);
  readonly stick = this.stickState.asReadonly();

  /** Game controls on touch screens (stick, buttons): off in the map editor, where touches edit the map. */
  private readonly gameControlsState = signal(true);
  readonly gameControls = this.gameControlsState.asReadonly();

  private directionTouch: Touch | null = null;

  constructor() {
    fromEvent(window, 'resize').subscribe(() => this.isTouchDeviceState.set(isTouchDevice()));
  }

  setGameControls(enabled: boolean): void {
    this.gameControlsState.set(enabled);
    if (!enabled) {
      this.directionTouch = null;
      this.updateStick(null);
    }
  }

  private updateStick(stick: Stick | null): void {
    this.stickState.set(stick);
  }

  bindTouching(canvas: HTMLElement): void {
    canvas.addEventListener('touchstart', (e: TouchEvent) => {
      if (!this.gameControls()) { return; }
      const touch = e.touches[e.touches.length - 1];
      const canvasWidth = canvas.getBoundingClientRect().width;
      if (touch.clientX < canvasWidth / 2) {
        this.updateStick({
          begin: { x: touch.clientX, y: touch.clientY },
          current: { x: touch.clientX, y: touch.clientY },
          radius: STICK_RADIUS
        });
        this.directionTouch ??= touch;
      }
    }, false);

    canvas.addEventListener('touchend', (e: TouchEvent) => {
      this.updateStick(null);
      const releasedTouch = e.changedTouches[0];
      if (this.directionTouch && releasedTouch.identifier === this.directionTouch.identifier) {
        this.directionTouch = null;
      }
    }, false);

    canvas.addEventListener('touchmove', (e: ScalableTouchEvent) => {
      if (e.scale !== undefined && e.scale !== 1) { e.preventDefault(); }
      const movedTouch = e.changedTouches[0];
      const directionTouch = this.directionTouch;
      const stick = this.stick();
      if (!directionTouch || !stick || movedTouch.identifier !== directionTouch.identifier) {
        return;
      }

      const diffX = movedTouch.clientX - directionTouch.clientX;
      const diffY = movedTouch.clientY - directionTouch.clientY;
      let computedAngle = Math.asin(diffY / Math.sqrt((diffX * diffX) + (diffY * diffY))) * 180 / Math.PI;
      computedAngle = diffX > 0 ? 180 - computedAngle : (360 + computedAngle) % 360;

      const dist = Math.hypot(stick.begin.x - movedTouch.clientX, stick.begin.y - movedTouch.clientY);
      if (dist > stick.radius - 10) {
        const x = Math.cos(THREE.MathUtils.degToRad(computedAngle)) * (-stick.radius + 10);
        const y = Math.sin(THREE.MathUtils.degToRad(computedAngle)) * (stick.radius - 10);
        this.updateStick({ ...stick, current: { x: x + stick.begin.x, y: y + stick.begin.y } });
      } else {
        this.updateStick({ ...stick, current: { x: movedTouch.clientX, y: movedTouch.clientY } });
      }
    }, { passive: false });
  }
}
