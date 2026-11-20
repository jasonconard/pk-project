import { Service, signal } from "@angular/core";
import * as THREE from "three";
import { fromEvent } from "rxjs";
import { Stick, STICK_RADIUS } from "../model/Stick";
import { haptic } from "../haptics";

const isTouchDevice = (): boolean =>
  "ontouchstart" in window || navigator.maxTouchPoints > 0;

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

  /** The finger holding the stick: its id and where it started (copied, the browser may reuse Touch objects). */
  private directionTouch: { id: number; x: number; y: number } | null = null;

  constructor() {
    fromEvent(window, "resize").subscribe(() =>
      this.isTouchDeviceState.set(isTouchDevice())
    );
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
    // A finger on the left half takes the stick (if no finger holds it yet)
    canvas.addEventListener(
      "touchstart",
      (e: TouchEvent) => {
        if (!this.gameControls() || this.directionTouch) {
          return;
        }
        const half = canvas.getBoundingClientRect().width / 2;
        const touch = [...e.changedTouches].find((t) => t.clientX < half);
        if (touch) {
          haptic("tick");
          this.directionTouch = {
            id: touch.identifier,
            x: touch.clientX,
            y: touch.clientY,
          };
          this.updateStick({
            begin: { x: touch.clientX, y: touch.clientY },
            current: { x: touch.clientX, y: touch.clientY },
            radius: STICK_RADIUS,
          });
        }
      },
      false
    );

    // Only the stick's own finger releases it: another finger lifted (or the system cancelling a touch) does not
    const release = (e: TouchEvent) => {
      const id = this.directionTouch?.id;
      if (
        id !== undefined &&
        [...e.changedTouches].some((t) => t.identifier === id)
      ) {
        this.releaseStick();
      }
    };
    canvas.addEventListener("touchend", release, false);
    canvas.addEventListener("touchcancel", release, false);
    // Safety net: no finger left on the screen, nothing can stay held
    for (const type of ["touchend", "touchcancel"]) {
      window.addEventListener(
        type,
        (e) => (e as TouchEvent).touches.length === 0 && this.releaseStick(),
        { capture: true, passive: true }
      );
    }

    canvas.addEventListener(
      "touchmove",
      (e: ScalableTouchEvent) => {
        if (e.scale !== undefined && e.scale !== 1) {
          e.preventDefault();
        }
        const directionTouch = this.directionTouch;
        const stick = this.stick();
        // The stick's finger among the fingers that moved (not only the first one)
        const movedTouch =
          directionTouch &&
          [...e.changedTouches].find((t) => t.identifier === directionTouch.id);
        if (!directionTouch || !stick || !movedTouch) {
          return;
        }

        const diffX = movedTouch.clientX - directionTouch.x;
        const diffY = movedTouch.clientY - directionTouch.y;
        let computedAngle =
          (Math.asin(diffY / Math.hypot(diffX, diffY)) * 180) / Math.PI;
        computedAngle =
          diffX > 0 ? 180 - computedAngle : (360 + computedAngle) % 360;

        const dist = Math.hypot(
          stick.begin.x - movedTouch.clientX,
          stick.begin.y - movedTouch.clientY
        );
        if (dist > stick.radius - 10) {
          const x =
            Math.cos(THREE.MathUtils.degToRad(computedAngle)) *
            (-stick.radius + 10);
          const y =
            Math.sin(THREE.MathUtils.degToRad(computedAngle)) *
            (stick.radius - 10);
          this.updateStick({
            ...stick,
            current: { x: x + stick.begin.x, y: y + stick.begin.y },
          });
        } else {
          this.updateStick({
            ...stick,
            current: { x: movedTouch.clientX, y: movedTouch.clientY },
          });
        }
      },
      { passive: false }
    );
  }

  private releaseStick(): void {
    this.directionTouch = null;
    if (this.stick()) {
      this.updateStick(null);
    }
  }
}
