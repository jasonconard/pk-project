import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from "rxjs";
import { FADE_ANIM, FIGHT_MENU_ANIM } from "../../../core/shared/animations/FadeAnim";
import { FightMenu } from "../shared/models/FightMenu";
import { FightMenuService } from "../shared/services/fight-menu.service";
import { FightService } from "../shared/services/fight.service";
import { FightSequenceService } from "../shared/services/fight-sequence.service";

@Component({
  selector: 'fight-ui',
  templateUrl: './fight-ui.component.html',
  styleUrls: ['./fight-ui.component.scss'],
  animations: [FIGHT_MENU_ANIM, FADE_ANIM]
})
export class FightUiComponent implements OnInit, OnDestroy {

  public subs: Subscription[] = [];

  public description: string = '';
  public currentMenu: FightMenu = null;
  public selectedMenu: FightMenu = null;
  public currentSubMenu: FightMenu = null;
  public menuItems: FightMenu[] = [];

  constructor(private fightSequenceService: FightSequenceService,
              private fightMenuService: FightMenuService) {
  }

  ngOnInit(): void {
    this.subs.push(fromEvent(window, 'keydown').subscribe( (key: KeyboardEvent) => {
      if(!this.selectedMenu) {
        this.bindMenuCode(key.code);
      } else {
        this.bindSubMenuCode(key.code);
      }
    }));

    this.subs.push(this.fightMenuService.menuState.subscribe( menu => {
      this.menuItems = menu;
      this.currentMenu = this.menuItems[0];
      this.selectedMenu = null;
      this.currentSubMenu = null;
      this.updateDescription();
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
    this.subs = [];
  }

  bindMenuCode(code: string) {
    const i = this.menuItems.indexOf(this.currentMenu);
    if(code === 'ArrowDown') {
      if(i < (this.menuItems.length - 1)) {
        this.currentMenu = this.menuItems[i+1];
      }
    } else if(code === 'ArrowUp') {
      if(i > 0) {
        this.currentMenu = this.menuItems[i-1];
      }
    } else if(code === 'Enter' || code === 'ArrowRight') {
      if(!this.currentMenu.subMenus.length) {
        if(this.currentMenu.enabled) {
          this.fightSequenceService.afterChoice(this.currentMenu);
        }
      } else {
        this.selectedMenu = this.currentMenu;
        this.currentSubMenu = this.selectedMenu.subMenus[0];
      }
    }

    this.updateDescription();
  }

  bindSubMenuCode(code: string) {
    const subMenus = this.selectedMenu.subMenus;
    const i = this.selectedMenu.subMenus.indexOf(this.currentSubMenu);
    if(code === 'ArrowDown') {
      if(i < (subMenus.length - 1)) {
        this.currentSubMenu = subMenus[i+1];
      }
    } else if(code === 'ArrowUp') {
      if(i > 0) {
        this.currentSubMenu = subMenus[i-1];
      }
    } else if(code === 'Enter' || code === 'ArrowRight') {
      if(this.currentSubMenu.enabled) {
        this.fightSequenceService.afterChoice(this.currentSubMenu);
      }
    } else if(code === 'Space' || code === 'ArrowLeft') {
      this.selectedMenu = null;
    }
  }

  updateDescription() {
    if(this.currentSubMenu) {
      this.description = this.currentSubMenu.desc || '';
    } else if(this.currentMenu) {
      this.description = this.currentMenu.desc || '';
    } else {
      this.description = '';
    }
  }

}
