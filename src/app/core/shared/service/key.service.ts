import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { getKeyFromAxes, KeyCode, PressedKey } from '../model/PressedKey';
import { GamepadService } from './gamepad.service';
import { TouchService } from './touch.service';
import { Stick, STICK_RADIUS } from '../model/Stick';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  private gamepadKeys: KeyCode[] = [];
  private stickKeys: KeyCode[] = [];

  private pressedKeys: PressedKey[] = [];

  private pressedSubject = new BehaviorSubject<PressedKey[]>(this.pressedKeys);
  public pressedState = this.pressedSubject.asObservable();

  private holdedKeys: PressedKey[] = [];

  private holdedSubject = new BehaviorSubject<PressedKey[]>(this.holdedKeys);
  public holdedState = this.holdedSubject.asObservable();

  constructor(private coreService: CoreService,
              private touchService: TouchService) {
    fromEvent(document, 'keydown').subscribe((ev: KeyboardEvent) => {
      const code: KeyCode = KeyService.getKeyCodeFromKeyboard(ev);
      this.setKeyDown(code)
    });
    fromEvent(document, 'keyup').subscribe((ev: KeyboardEvent) => {
      const code: KeyCode = KeyService.getKeyCodeFromKeyboard(ev);
      this.setKeyUp(code);
    });
    this.touchService.stickState.subscribe(stick => {
      this.updateStick(stick);
    });
    this.coreService.resumedState.subscribe( resumed => {
      this.clearKeys();
    });
  }

  public clearKeys() {
    this.pressedKeys = [];
    this.pressedSubject.next(this.pressedKeys);
    this.holdedKeys = [];
    this.holdedSubject.next(this.holdedKeys);
  }

  public initTouch(e: HTMLElement) {
    this.touchService.bindTouching(e);
  }

  public updateStick(stick: Stick) {
    const activeKeys = [];
    if(stick) {
      const axes = {
        x: (stick.begin.x - stick.current.x) / -(STICK_RADIUS-10),
        y: (stick.begin.y - stick.current.y) / -(STICK_RADIUS-10)
      };

      const key = getKeyFromAxes(axes);
      if(key) {
        activeKeys.push(key);
      }
    }

    this.stickKeys.forEach(key => {
      if(activeKeys.indexOf(key) < 0) {
        this.setKeyUp(key);
      }
    });

    activeKeys.forEach(key => {
      if(this.stickKeys.indexOf(key) < 0) {
        this.setKeyDown(key);
      }
    });

    this.stickKeys = activeKeys;
  }

  public updateGamePadKeys() {
    const activeKeys = GamepadService.getPressedKeys();

    this.gamepadKeys.forEach(key => {
      if(activeKeys.indexOf(key) < 0) {
        this.setKeyUp(key);
      }
    });

    activeKeys.forEach(key => {
      if(this.gamepadKeys.indexOf(key) < 0) {
        this.setKeyDown(key);
      }
    });

    this.gamepadKeys = activeKeys;
  }

  public clearPressedKey() {
    this.pressedKeys = [];
    this.pressedSubject.next(this.pressedKeys);
  }

  public setKeyDown(code: KeyCode) {
    if(KeyCode[code]) {
      const codeExists = this.holdedKeys.find(pressedKey => pressedKey.code === code);
      if(!codeExists) {
        const pressedTime = new Date().getTime();
        this.pressedKeys.unshift({ code, pressedTime });
        this.pressedSubject.next(this.pressedKeys);
        this.holdedKeys.unshift({ code, pressedTime });
        this.holdedSubject.next(this.holdedKeys);
      }
    }
  }

  public setKeyUp(code: KeyCode) {
    if(KeyCode[code]) {
      const codeIndex = this.holdedKeys.findIndex(pressedKey => pressedKey.code === code);
      if(codeIndex >= 0) {
        this.holdedKeys.splice(codeIndex, 1);
        this.holdedSubject.next(this.holdedKeys);
      }
    }
  }

  private static getKeyCodeFromKeyboard(ev: KeyboardEvent): KeyCode {
    switch (ev.key) {
      case 'Enter': return KeyCode.confirm;
      case 'Escape': return KeyCode.cancel;
      case 'ArrowDown': return KeyCode.down;
      case 'ArrowUp': return KeyCode.up;
      case 'ArrowLeft': return KeyCode.left;
      case 'ArrowRight': return KeyCode.right;
      case 's': return KeyCode.down;
      case 'z': return KeyCode.up;
      case 'q': return KeyCode.left;
      case 'd': return KeyCode.right;
      case 'a': return KeyCode.cancel;
      case 'e': return KeyCode.confirm;
      case ' ': return KeyCode.confirm;
      case 'r': return KeyCode.x;
      case 'f': return KeyCode.y;
      case 'p': return KeyCode.pause;
      case 'o': return KeyCode.select;
    }
    return null;
  }

  public static showKeyPressedList(list: PressedKey[]): string {
    return list.map(key => KeyCode[key.code]).join(' ');
  }

}
