import { signal } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";

/**
 * Small vibrations on the actions (buttons, game controls, painting…):
 * - Android app: the phone's haptic engine (@capacitor/haptics);
 * - browser / installed site on Android: `navigator.vibrate`;
 * - iPhone (Safari has no vibration): the tick of a switch input (iOS 18+), only during a touch.
 * Can be turned off in the quality menu (remembered on this device).
 */
export type HapticKind =
  "tick" | "light" | "medium" | "heavy" | "success" | "warning";

const STORAGE_KEY = "pk-haptics";
/** Vibration lengths (ms) for `navigator.vibrate`. */
const VIBRATIONS: Record<HapticKind, number | number[]> = {
  tick: 8,
  light: 12,
  medium: 20,
  heavy: 35,
  success: [12, 70, 18],
  warning: [25, 90, 25],
};
/** Two vibrations closer than this: the second one is dropped (a burst would feel like a buzz). */
const MIN_GAP = 40;

const native = Capacitor.isNativePlatform();
const canVibrate = typeof navigator.vibrate === "function";
const isIos =
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

/** The device can give haptic feedback (the setting is shown only then). */
export const hapticsSupported = native || canVibrate || isIos;

function loadEnabled(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

const enabledState = signal(loadEnabled());
export const hapticsEnabled = enabledState.asReadonly();

export function setHapticsEnabled(enabled: boolean): void {
  enabledState.set(enabled);
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
  } catch {
    // private browsing: only for this session
  }
  if (enabled) {
    haptic("medium"); // feel it right away
  }
}

let last = 0;

export function haptic(kind: HapticKind = "tick"): void {
  const now = performance.now();
  if (!enabledState() || now - last < MIN_GAP) {
    return;
  }
  last = now;
  if (native) {
    switch (kind) {
      case "success":
        void Haptics.notification({ type: NotificationType.Success }).catch(
          () => undefined
        );
        return;
      case "warning":
        void Haptics.notification({ type: NotificationType.Warning }).catch(
          () => undefined
        );
        return;
      default:
        void Haptics.impact({ style: IMPACT[kind] }).catch(() => undefined);
        return;
    }
  }
  if (canVibrate) {
    try {
      navigator.vibrate(VIBRATIONS[kind]);
    } catch {
      // not allowed before the first touch
    }
  } else if (isIos) {
    iosTick();
  }
}

const IMPACT: Record<"tick" | "light" | "medium" | "heavy", ImpactStyle> = {
  tick: ImpactStyle.Light,
  light: ImpactStyle.Light,
  medium: ImpactStyle.Medium,
  heavy: ImpactStyle.Heavy,
};

// iPhone: toggling a switch input through its label gives a light tick (iOS 18+), only inside a touch / click
let iosSwitch: HTMLLabelElement | null = null;
let iosTicking = false;

function iosTick(): void {
  if (!iosSwitch) {
    iosSwitch = document.createElement("label");
    iosSwitch.setAttribute("aria-hidden", "true");
    iosSwitch.style.cssText =
      "position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;overflow:hidden;";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.setAttribute("switch", "");
    input.tabIndex = -1;
    iosSwitch.append(input);
    document.body.append(iosSwitch);
  }
  iosTicking = true;
  iosSwitch.click();
  iosTicking = false;
}

/** The clicks made by the iPhone tick itself (not a user action). */
export function isHapticClick(event: Event): boolean {
  return (
    iosTicking || (!!iosSwitch && iosSwitch.contains(event.target as Node))
  );
}

/**
 * Touch screens: a tick on every tap of a button (and the like). An element can choose another vibration with
 * `data-haptic="success"` (on it or an ancestor), or none with `data-haptic="none"`.
 */
export function initTapHaptics(): void {
  const coarse = matchMedia("(pointer: coarse)");
  document.addEventListener(
    "click",
    (event) => {
      if (!coarse.matches || isHapticClick(event)) {
        return;
      }
      const target = event.target as HTMLElement | null;
      const control = target?.closest<HTMLElement>(
        'button, a[href], [role="button"], [role="tab"], [role="radio"], [role="option"], [role="switch"], label, select'
      );
      if (!control || (control as HTMLButtonElement).disabled) {
        return;
      }
      const kind =
        control.closest<HTMLElement>("[data-haptic]")?.dataset["haptic"];
      if (kind !== "none") {
        haptic((kind as HapticKind | undefined) ?? "tick");
      }
    },
    { capture: true, passive: true }
  );
}
