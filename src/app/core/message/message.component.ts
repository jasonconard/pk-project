import { Component, OnDestroy, OnInit } from '@angular/core';
import { KeyService } from '../shared/service/key.service';
import { Subscription } from 'rxjs';
import { FADE_ANIM, MESSAGE_CHOICE_FADE_ANIM } from '../shared/animations/FadeAnim';
import { KeyCode } from '../shared/model/PressedKey';
import { InstructionMessage, InstructionMessageChoice } from "../../modules/game/shared/model/SceneEventInstruction";
import { SequenceService } from "../../modules/game/shared/services/sequence.service";

@Component({
  selector: 'core-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [FADE_ANIM, MESSAGE_CHOICE_FADE_ANIM]
})
export class MessageComponent implements OnInit, OnDestroy {

  public message: InstructionMessage = null;

  public subs: Subscription[] = [];

  public text: string = "";

  public choiceId: number = -1;
  public timeouts: number[] = [];

  public choices: InstructionMessageChoice[] = [];

  constructor(private sequenceService: SequenceService,
              private keyService: KeyService) {
  }

  ngOnInit(): void {
    this.subs.push(this.sequenceService.messageSub.subscribe(message => {
      this.choices = (message && message.choices) || [];
      this.timeouts = [];
      this.text = '';
      if(message) {
        this.text = message.text;
        // for(let i = 0; i < message.text.length; i++) {
        //   this.timeouts.push(setTimeout( () => {
        //     this.text += message.text.charAt(i);
        //   }, i*3));
        // }
      }
      this.choiceId = message && message.choices && message.choices[0] ? 0 : -1;
      this.message = message;
    }));

    this.subs.push(this.keyService.pressedState.subscribe( keys => {
      if(keys.length && this.message) {
        if(!this.choices || !this.choices.length) {
          this.keyService.clearPressedKey();
          this.closeMessage();
        } else {
          const codes = this.keyService.pressedCodes;
          if(codes.indexOf(KeyCode.confirm) >= 0) {
            this.setChoice(this.choices[this.choiceId].key);
          } else {
            if(codes.indexOf(KeyCode.up) >= 0 && this.choiceId > 0) {
              this.choiceId--;
            } else if(codes.indexOf(KeyCode.down) >= 0 && this.choiceId < this.choices.length - 1) {
              this.choiceId++;
            }
          }
          this.keyService.clearPressedKey();
        }
      }
    }));
  }

  ngOnDestroy(): void {
    this.clearTimeouts();
    this.subs.forEach(sub => sub.unsubscribe());
    this.subs = [];
  }

  clearTimeouts(): void {
    this.text = '';
    this.timeouts.forEach(to => {
      clearTimeout(to);
    });
  }

  setChoice(key: string) {
    this.clearTimeouts();
    this.choices = [];
    this.sequenceService.messageSub.next(null);
    this.sequenceService.nextSequence(key);
  }

  closeMessage() {
    if(this.message && this.choices && this.choices.length) {
      return;
    }
    this.clearTimeouts();
    this.sequenceService.messageSub.next(null);
    this.sequenceService.nextSequence();
  }

  getChoiceAnim(i: number) {
    return {
      value: ':leave, :enter',
      params: {
        rightOffset: -20,
        rightOffsetEnd: (this.choiceId === i ? 30 : 0),
        delay: (i+2) * 100
      }
    }
  }

}
