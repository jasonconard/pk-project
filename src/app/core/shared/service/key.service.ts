import { effect, inject, Service } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { getKeyFromAxes, KeyCode, PressedKey } from '../model/PressedKey';
import { GamepadService } from './gamepad.service';
import { TouchService } from './touch.service';
import { Stick, STICK_RADIUS } from '../model/Stick';
import { CoreService } from './core.service';

const KEYBOARD_MAPPING: Readonly<Record<string, KeyCode>> = {
  Enter: KeyCode.confirm,
  Escape: KeyCode.cancel,
  ArrowDown: KeyCode.down,
  ArrowUp: KeyCode.up,
  ArrowLeft: KeyCode.left,
  ArrowRight: KeyCode.right,
  s: KeyCode.down,
  z: KeyCode.up,
  q: KeyCode.left,
  d: KeyCode.right,
  a: KeyCode.cancel,
  e: KeyCode.confirm,
  ' ': KeyCode.confirm,
  r: KeyCode.x,
  f: KeyCode.y,
  p: KeyCode.pause,
  o: KeyCode.select,
};

/**
 * Input bus shared by the game loop (polling `pressedCodes` / `holdedCodes` at 120 Hz)
 * and the UI (reacting to `pressedState` events).
 */
@Service()
export class KeyService {
  private readonly coreService = inject(CoreService);
  private readonly touchService = inject(TouchService);

  private gamepadKeys: KeyCode[] = [];
  private stickKeys: KeyCode[] = [];

  pressedKeys: PressedKey[] = [];
  pressedCodes: KeyCode[] = [];
  private readonly pressedSubject = new BehaviorSubject<PressedKey[]>(this.pressedKeys);
  /** Emits every time a key is pressed (or the pressed keys are cleared). */
  readonly pressedState = this.pressedSubject.asObservable();

  holdedKeys: PressedKey[] = [];
  holdedCodes: KeyCode[] = [];

  constructor() {
    fromEvent<KeyboardEvent>(document, 'keydown').subscribe(ev => this.setKeyDown(KeyService.getKeyCodeFromKeyboard(ev)));
    fromEvent<KeyboardEvent>(document, 'keyup').subscribe(ev => this.setKeyUp(KeyService.getKeyCodeFromKeyboard(ev)));

    effect(() => this.updateStick(this.touchService.stick()));
    effect(() => {
      this.coreService.resumed();
      this.clearKeys();
    });
  }

  clearKeys(): void {
    this.clearPressedKey();
    this.holdedKeys = [];
    this.holdedCodes = [];
  }

  initTouch(e: HTMLElement): void {
    this.touchService.bindTouching(e);
  }

  private updateStick(stick: Stick | null): void {
    const activeKeys: KeyCode[] = [];
    if (stick) {
      const key = getKeyFromAxes({
        x: (stick.begin.x - stick.current.x) / -(STICK_RADIUS - 10),
        y: (stick.begin.y - stick.current.y) / -(STICK_RADIUS - 10)
      });
      if (key !== null) {
        activeKeys.push(key);
      }
    }
    this.syncKeys(this.stickKeys, activeKeys);
    this.stickKeys = activeKeys;
  }

  updateGamePadKeys(): void {
    const activeKeys = GamepadService.getPressedKeys();
    this.syncKeys(this.gamepadKeys, activeKeys);
    this.gamepadKeys = activeKeys;
  }

  private syncKeys(previousKeys: KeyCode[], activeKeys: KeyCode[]): void {
    previousKeys.filter(key => !activeKeys.includes(key)).forEach(key => this.setKeyUp(key));
    activeKeys.filter(key => !previousKeys.includes(key)).forEach(key => this.setKeyDown(key));
  }

  clearPressedKey(): void {
    this.pressedKeys = [];
    this.pressedCodes = [];
    this.pressedSubject.next(this.pressedKeys);
  }

  setKeyDown(code: KeyCode | null): void {
    if (code === null || this.holdedCodes.includes(code)) {
      return;
    }
    const pressedTime = Date.now();
    this.pressedKeys.unshift({ code, pressedTime });
    this.pressedCodes.unshift(code);
    this.pressedSubject.next(this.pressedKeys);
    this.holdedKeys.unshift({ code, pressedTime });
    this.holdedCodes.unshift(code);
  }

  setKeyUp(code: KeyCode | null): void {
    if (code === null) {
      return;
    }
    const codeIndex = this.holdedCodes.indexOf(code);
    if (codeIndex >= 0) {
      this.holdedKeys.splice(codeIndex, 1);
      this.holdedCodes.splice(codeIndex, 1);
    }
  }

  private static getKeyCodeFromKeyboard(ev: KeyboardEvent): KeyCode | null {
    return KEYBOARD_MAPPING[ev.key] ?? null;
  }
}
