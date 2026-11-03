import { Component, computed, inject, linkedSignal } from '@angular/core';
import { FightMenu } from '../shared/models/FightMenu';
import { FightMenuService } from '../shared/services/fight-menu.service';
import { FightSequenceService } from '../shared/services/fight-sequence.service';

@Component({
  selector: 'fight-ui',
  templateUrl: './fight-ui.component.html',
  styleUrl: './fight-ui.component.scss',
  host: {
    '(window:keydown)': 'onKeyDown($event)',
  },
})
export class FightUiComponent {
  private readonly fightSequenceService = inject(FightSequenceService);

  protected readonly menuItems = inject(FightMenuService).menu;
  /** Reset to the first entry each time a new menu is opened. */
  protected readonly currentMenu = linkedSignal<FightMenu | undefined>(() => this.menuItems()[0]);
  protected readonly selectedMenu = linkedSignal<FightMenu[], FightMenu | null>({
    source: this.menuItems,
    computation: () => null,
  });
  protected readonly currentSubMenu = linkedSignal(() => this.selectedMenu()?.subMenus[0]);
  protected readonly subMenus = computed(() => this.selectedMenu()?.subMenus ?? []);
  protected readonly description = computed(() => (this.currentSubMenu() ?? this.currentMenu())?.desc ?? '');

  protected onKeyDown(event: KeyboardEvent): void {
    if (this.selectedMenu()) {
      this.bindSubMenuCode(event.code);
    } else {
      this.bindMenuCode(event.code);
    }
  }

  private bindMenuCode(code: string): void {
    const currentMenu = this.currentMenu();
    if (!currentMenu) {
      return;
    }
    if (code === 'ArrowDown' || code === 'ArrowUp') {
      this.currentMenu.set(FightUiComponent.moveInList(this.menuItems(), currentMenu, code));
    } else if (code === 'Enter' || code === 'ArrowRight') {
      if (currentMenu.subMenus.length) {
        this.selectedMenu.set(currentMenu);
      } else if (currentMenu.enabled) {
        this.fightSequenceService.afterChoice(currentMenu);
      }
    }
  }

  private bindSubMenuCode(code: string): void {
    const currentSubMenu = this.currentSubMenu();
    if (!currentSubMenu) {
      return;
    }
    if (code === 'ArrowDown' || code === 'ArrowUp') {
      this.currentSubMenu.set(FightUiComponent.moveInList(this.subMenus(), currentSubMenu, code));
    } else if (code === 'Enter' || code === 'ArrowRight') {
      if (currentSubMenu.enabled) {
        this.fightSequenceService.afterChoice(currentSubMenu);
      }
    } else if (code === 'Space' || code === 'ArrowLeft') {
      this.selectedMenu.set(null);
    }
  }

  private static moveInList(list: FightMenu[], current: FightMenu, code: 'ArrowDown' | 'ArrowUp'): FightMenu {
    const i = list.indexOf(current);
    const next = code === 'ArrowDown' ? Math.min(list.length - 1, i + 1) : Math.max(0, i - 1);
    return list[next];
  }
}
