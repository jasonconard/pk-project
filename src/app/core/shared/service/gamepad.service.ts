import { Injectable } from '@angular/core';
import { getKeyFromAxes, KeyCode } from '../model/PressedKey';

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
      if(gamepad.buttons[3].pressed) { keySet.add(KeyCode.y); }
      if(gamepad.buttons[2].pressed) { keySet.add(KeyCode.x); }
      if(gamepad.buttons[9].pressed) { keySet.add(KeyCode.pause); } // PAUSE
      if(gamepad.buttons[8].pressed) { keySet.add(KeyCode.select); } // SELECT
      if(gamepad.buttons[12].pressed) { keySet.add(KeyCode.up); }
      if(gamepad.buttons[13].pressed) { keySet.add(KeyCode.down); }
      if(gamepad.buttons[14].pressed) { keySet.add(KeyCode.left); }
      if(gamepad.buttons[15].pressed) { keySet.add(KeyCode.right); }

      const axes = [...gamepad.axes];
      const key = getKeyFromAxes({ x: axes[0], y: axes[1] });
      if(key) {
        keySet.add(key);
      }

    }

    return Array.from(keySet);
  }


}
