import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { KeyCode, PressedKey } from '../model/key';

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  private pressedKeys: PressedKey[] = [];

  private pressedSubject = new BehaviorSubject<PressedKey[]>(this.pressedKeys);
  public pressedState = this.pressedSubject.asObservable();

  constructor() {
    fromEvent(document, 'keydown').subscribe((ev: KeyboardEvent) => {
      const code: KeyCode = KeyService.getKeyCodeFromKeyboard(ev);
      if(KeyCode[code]) {
        const codeExists = this.pressedKeys.find(pressedKey => pressedKey.code === code);
        if(!codeExists) {
          this.pressedKeys.unshift({ code, pressedTime: new Date().getTime() });
          this.pressedSubject.next(this.pressedKeys);
        }
      }
    });
    fromEvent(document, 'keyup').subscribe((ev: KeyboardEvent) => {
      const code: KeyCode = KeyService.getKeyCodeFromKeyboard(ev);
      if(KeyCode[code]) {
        const codeIndex = this.pressedKeys.findIndex(pressedKey => pressedKey.code === code);
        if(codeIndex >= 0) {
          this.pressedKeys.splice(codeIndex, 1);
          this.pressedSubject.next(this.pressedKeys);
        }
      }
    });
  }

  private static getKeyCodeFromKeyboard(ev: KeyboardEvent): KeyCode {
    switch (ev.key) {
      case 'Enter': return KeyCode.confirm;
      case 'Escape': return KeyCode.cancel;
      case 'ArrowDown': return KeyCode.down;
      case 'ArrowUp': return KeyCode.up;
      case 'ArrowLeft': return KeyCode.left;
      case 'ArrowRight': return KeyCode.right;
    }
    return null;
  }

  public static showKeyPressedList(list: PressedKey[]): string {
    return list.map(key => KeyCode[key.code]).join(' ');
  }

}
