import { Injectable } from '@angular/core';
import { KeyCode } from '../model/key';

@Injectable({
  providedIn: 'root'
})
export class GamepadService {

  constructor() {
  }

  public static isGamepadAvailable(): boolean {
    return !!navigator.getGamepads()[0];
  }

  public static getPressedKeys(): KeyCode[] {
    const keySet = new Set<KeyCode>();
    const gamepad = navigator.getGamepads()[0];

    if(gamepad) {
      if(gamepad.buttons[0].pressed) { keySet.add(KeyCode.confirm); }
      if(gamepad.buttons[1].pressed) { keySet.add(KeyCode.cancel); }
      if(gamepad.buttons[12].pressed) { keySet.add(KeyCode.up); }
      if(gamepad.buttons[13].pressed) { keySet.add(KeyCode.down); }
      if(gamepad.buttons[14].pressed) { keySet.add(KeyCode.left); }
      if(gamepad.buttons[15].pressed) { keySet.add(KeyCode.right); }

      const axes = [...gamepad.axes];
      let xDir: KeyCode = null;
      let zDir: KeyCode = null;
      if(axes[0] < -0.2) { xDir = KeyCode.left; }
      if(axes[0] > 0.2) { xDir = KeyCode.right; }
      if(axes[1] < -0.2) { zDir = KeyCode.up; }
      if(axes[1] > 0.2) { zDir = KeyCode.down; }
      if(xDir != null && zDir != null) {
        keySet.add(Math.abs(axes[0]) > Math.abs(axes[1]) ? xDir : zDir);
      } else if(xDir != null) {
        keySet.add(xDir);
      } else if(zDir != null) {
        keySet.add(zDir);
      }

    }

    return Array.from(keySet);
  }


}
