import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { KeyService } from '../../shared/service/key.service';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';
import { KeyCode, PressedKey } from '../../shared/model/key';
import { ElementType, getElementTable } from '../../shared/model/pokemon/pkElement';

@Component({
  selector: 'fight-main',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss']
})
export class FightComponent implements OnInit {

  private subs: Subscription[] = [];

  public pos: number = 0;
  public speed: number = 230;
  public limited: boolean = true;
  public frozen: boolean = false;
  public recovering: boolean = false;

  private pressedKeys: PressedKey[] = [];

  public ElementType = ElementType;
  public elementTable = getElementTable();

  constructor(private keyService: KeyService) {
  }

  ngOnInit() {

    console.log(this.elementTable);

    this.subs.push(this.keyService.pressedState.subscribe(keys => {
      this.pressedKeys = keys
    }));

    interval(0, animationFrame).subscribe( () => {
      this.updatePlayerPosition();

      this.frozen = !!this.pressedKeys.find( pressedKey => pressedKey.code === KeyCode.down);

      if(!this.recovering) {
        const shot = !!this.pressedKeys.find( pressedKey => pressedKey.code === KeyCode.up);
        if(shot) {
          this.recovering = true;
          setTimeout( () => this.recovering = false, 1000);
          const nextPos = Math.max(0, this.pos - 45);
          if(this.pos > 80 && nextPos < 80) {
            this.limited = true;
            console.log('cancelled');
          }
          this.pos = nextPos;
        }
      }
      //console.log(this.pos);
    });
  }

  updatePlayerPosition() {
    if(this.frozen) {
      return false;
    }
    if(this.pos < 80 && this.limited) {
      this.pos = Math.min(80, this.pos + (this.speed/1000));
    }
    if(this.pos === 80 && this.limited) {
      const confirmed = !!this.pressedKeys.find( pressedKey => pressedKey.code === KeyCode.confirm);
      if(confirmed) {
        this.limited = false;
      }
    }
    if(this.pos >= 80 && !this.limited) {
      this.pos = Math.min(100, this.pos + (this.speed/2000));
    }
    if(this.pos === 100 && !this.limited) {
      const confirmed = !!this.pressedKeys.find( pressedKey => pressedKey.code === KeyCode.confirm);
      if(confirmed) {
        this.limited = true;
        this.pos = 0;
      }
    }
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
    this.subs = [];
  }

}
