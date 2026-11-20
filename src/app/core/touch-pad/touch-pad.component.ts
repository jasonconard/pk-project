import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  signal,
} from "@angular/core";
import { TouchService } from "../shared/service/touch.service";
import { KeyService } from "../shared/service/key.service";
import { TOUCH_KEYS, TouchKey, TouchKeyType } from "../shared/model/TouchKey";
import { CoreService } from "../shared/service/core.service";
import { SequenceService } from "../../modules/game/shared/services/sequence.service";
import { haptic } from "../shared/haptics";

@Component({
  selector: "core-touch-pad",
  templateUrl: "./touch-pad.component.html",
  styleUrl: "./touch-pad.component.scss",
})
export class TouchPadComponent {
  private readonly keyService = inject(KeyService);
  private readonly coreService = inject(CoreService);
  private readonly sequenceService = inject(SequenceService);

  /** The buttons are shown (the fights; on the map: the Courir and action buttons instead). */
  readonly visible = input(true);

  private readonly pushedBtns = signal<string[]>([]);
  /** Fingers on each button: it is released when its last finger lifts (or the system cancels the touch). */
  private readonly btnTouches = new Map<string, Set<number>>();

  protected readonly btns: TouchKey[] = TOUCH_KEYS;
  private readonly touchService = inject(TouchService);
  protected readonly isTouchDevice = this.touchService.isTouchDevice;
  protected readonly gameControls = this.touchService.gameControls;
  protected readonly hasMessage = computed(
    () => !!this.sequenceService.message()
  );

  constructor() {
    // Release every button when a message pops up or when the window loses / regains focus.
    effect(() => {
      this.hasMessage();
      this.coreService.resumed();
      this.btnTouches.clear();
      this.pushedBtns.set([]);
    });
    // Safety net: no finger left on the screen, no button can stay held (a lost touchend, a cancelled touch)
    const releaseAll = (e: TouchEvent) =>
      e.touches.length === 0 && this.releaseAll();
    window.addEventListener("touchend", releaseAll, {
      capture: true,
      passive: true,
    });
    window.addEventListener("touchcancel", releaseAll, {
      capture: true,
      passive: true,
    });
    inject(DestroyRef).onDestroy(() => {
      window.removeEventListener("touchend", releaseAll, { capture: true });
      window.removeEventListener("touchcancel", releaseAll, { capture: true });
    });
  }

  protected getBtnStyle(
    btn: TouchKey,
    isContainer: boolean
  ): Record<string, string | null> {
    // Touch area a little bigger than the button
    const fullHeight = btn.size.y + (btn.type === TouchKeyType.RECT ? 10 : 14);
    const fullWidth = btn.size.x + (btn.type === TouchKeyType.RECT ? 20 : 14);

    if (isContainer) {
      return {
        right: `calc(${btn.position.x}px + var(--safe-right, 0px))`,
        bottom: `calc(${btn.position.y}px + var(--safe-bottom, 0px))`,
        width: fullWidth + "px",
        height: fullHeight + "px",
      };
    }

    const pushed = this.isBtnPushed(btn);
    return {
      "font-size": btn.type === TouchKeyType.RECT ? "12px" : null,
      "border-radius": btn.type === TouchKeyType.RECT ? "4px" : "50%",
      height: (pushed ? fullHeight : btn.size.y) + "px",
      width: (pushed ? fullWidth : btn.size.x) + "px",
      background: "rgba(255,255,255," + (pushed ? 0.6 : 0.3) + ")",
    };
  }

  private isBtnPushed(btn: TouchKey): boolean {
    return this.pushedBtns().includes(btn.label);
  }

  protected touchStart(btn: TouchKey, event: TouchEvent): void {
    const touches = this.btnTouches.get(btn.label) ?? new Set<number>();
    const wasUp = touches.size === 0;
    [...event.changedTouches].forEach((t) => touches.add(t.identifier));
    this.btnTouches.set(btn.label, touches);
    if (wasUp) {
      haptic("light");
      this.pushedBtns.update((btns) =>
        btns.includes(btn.label) ? btns : [...btns, btn.label]
      );
      this.keyService.setKeyDown(btn.code);
    }
  }

  protected touchEnd(btn: TouchKey, event: TouchEvent): void {
    const touches = this.btnTouches.get(btn.label);
    [...event.changedTouches].forEach((t) => touches?.delete(t.identifier));
    if (!touches?.size) {
      this.release(btn);
    }
  }

  private release(btn: TouchKey): void {
    this.btnTouches.delete(btn.label);
    if (this.isBtnPushed(btn)) {
      this.pushedBtns.update((btns) =>
        btns.filter((label) => label !== btn.label)
      );
      this.keyService.setKeyUp(btn.code);
    }
  }

  private releaseAll(): void {
    this.btns.forEach((btn) => this.release(btn));
  }
}
