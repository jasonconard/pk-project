import { Component, computed, effect, inject, signal } from '@angular/core';
import { TouchService } from '../shared/service/touch.service';
import { KeyService } from '../shared/service/key.service';
import { TOUCH_KEYS, TouchKey, TouchKeyType } from '../shared/model/TouchKey';
import { CoreService } from '../shared/service/core.service';
import { SequenceService } from '../../modules/game/shared/services/sequence.service';

@Component({
  selector: 'core-touch-pad',
  templateUrl: './touch-pad.component.html',
  styleUrl: './touch-pad.component.scss'
})
export class TouchPadComponent {
  private readonly keyService = inject(KeyService);
  private readonly coreService = inject(CoreService);
  private readonly sequenceService = inject(SequenceService);

  private readonly pushedBtns = signal<string[]>([]);

  protected readonly btns: TouchKey[] = TOUCH_KEYS;
  protected readonly isTouchDevice = inject(TouchService).isTouchDevice;
  protected readonly hasMessage = computed(() => !!this.sequenceService.message());

  constructor() {
    // Release every button when a message pops up or when the window loses / regains focus.
    effect(() => {
      this.hasMessage();
      this.coreService.resumed();
      this.pushedBtns.set([]);
    });
  }

  protected getBtnStyle(btn: TouchKey, isContainer: boolean): Record<string, string | null> {
    const fullHeight = btn.size.y + (btn.type === TouchKeyType.RECT ? 10 : 30);
    const fullWidth = btn.size.x + (btn.type === TouchKeyType.RECT ? 20 : 30);

    if (isContainer) {
      return {
        right: btn.position.x + 'px',
        bottom: btn.position.y + 'px',
        width: fullWidth + 'px',
        height: fullHeight + 'px',
      };
    }

    const pushed = this.isBtnPushed(btn);
    return {
      'font-size': btn.type === TouchKeyType.RECT ? '12px' : null,
      'border-radius': btn.type === TouchKeyType.RECT ? '4px' : '50%',
      height: (pushed ? fullHeight : btn.size.y) + 'px',
      width: (pushed ? fullWidth : btn.size.x) + 'px',
      background: 'rgba(255,255,255,' + (pushed ? 0.6 : 0.3) + ')'
    };
  }

  private isBtnPushed(btn: TouchKey): boolean {
    return this.pushedBtns().includes(btn.label);
  }

  protected touchBtn(btn: TouchKey, action: 'up' | 'down'): void {
    if (action === 'up') {
      this.pushedBtns.update(btns => btns.filter(label => label !== btn.label));
      this.keyService.setKeyUp(btn.code);
    } else {
      this.pushedBtns.update(btns => btns.includes(btn.label) ? btns : [...btns, btn.label]);
      this.keyService.setKeyDown(btn.code);
    }
  }
}
