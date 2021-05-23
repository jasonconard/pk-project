import { Component, OnDestroy, OnInit } from '@angular/core';
import { TouchService } from '../shared/service/touch.service';
import { KeyCode } from '../shared/model/PressedKey';
import { KeyService } from '../shared/service/key.service';
import { Subscription } from 'rxjs';
import { TOUCH_KEYS, TouchKey, TouchKeyType } from '../shared/model/TouchKey';
import { CoreService } from '../shared/service/core.service';
import { FADE_ANIM_DELAYED } from '../shared/animations/FadeAnim';
import { SequenceService } from "../../modules/game/shared/services/sequence.service";

@Component({
  selector: 'core-touch-pad',
  templateUrl: './touch-pad.component.html',
  styleUrls: ['./touch-pad.component.scss'],
  animations: [FADE_ANIM_DELAYED]
})
export class TouchPadComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  private pushedBtns: string[] = [];
  public isTouchDevice = false;

  public btns: TouchKey[] = TOUCH_KEYS;

  public hasMessage: boolean = false;

  constructor(private keyService: KeyService,
              private coreService: CoreService,
              private touchService: TouchService,
              private sequenceService: SequenceService) {
  }

  ngOnInit(): void {
    this.subs.push(this.touchService.isTouchDeviceState.subscribe(isTouchDevice => {
      this.isTouchDevice = isTouchDevice;
    }));

    this.subs.push(this.sequenceService.messageSub.subscribe(message => {
      this.hasMessage = !!message;
      if(this.hasMessage) {
        this.pushedBtns = [];
      }
    }));

    this.subs.push(this.coreService.resumedState.subscribe(() => {
      this.pushedBtns = [];
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
    this.subs = [];
  }

  public getBtnStyle(btn: TouchKey, isContainer: boolean) {
    const fullHeight = btn.size.y + (btn.type === TouchKeyType.RECT ? 10 : 30);
    const fullWidth = btn.size.x + (btn.type === TouchKeyType.RECT ? 20 : 30);

    if(isContainer) {
      return {
        right: btn.position.x + 'px',
        bottom: btn.position.y + 'px',
        width: fullWidth + 'px',
        height: fullHeight + 'px',
      }
    } else {
      const pushed = this.isBtnPushed(btn);

      return {
        'font-size': btn.type === TouchKeyType.RECT ? '12px' : null,
        'border-radius': btn.type === TouchKeyType.RECT ? '4px' : '50%',
        height: (pushed ? fullHeight : btn.size.y )+ 'px',
        width: (pushed ? fullWidth : btn.size.x) + 'px',
        background: 'rgba(255,255,255,' + (pushed ? 0.6 : 0.3) + ')'
      }
    }
  }

  public isBtnPushed(btn: TouchKey): boolean {
    return this.pushedBtns.indexOf(btn.label) >= 0;
  }

  public touchBtn(btn: TouchKey, action: string): void {
    let key = btn && btn.code;
    if(!KeyCode[key]) { return; }

    const btnId = this.pushedBtns.indexOf(btn.label);
    if(action === 'up') {
      this.pushedBtns.splice(btnId, 1);
      this.keyService.setKeyUp(key);
    } else if (action === 'down'){
      if(btnId < 0) { this.pushedBtns.push(btn.label); }
      this.keyService.setKeyDown(key);
    }
  }

}
