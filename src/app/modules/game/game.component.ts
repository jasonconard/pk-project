import { afterNextRender, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GameMode } from './shared/model/Game';
import { GameService } from './shared/services/game.service';
import { StickComponent } from '../../core/stick/stick.component';
import { TouchPadComponent } from '../../core/touch-pad/touch-pad.component';
import { MessageComponent } from '../../core/message/message.component';
import { TeleportComponent } from './teleport/teleport.component';
import { ModelChoiceComponent } from './model-choice/model-choice.component';
import { FightUiComponent } from '../fight/fight-ui/fight-ui.component';

@Component({
  selector: 'game-main',
  imports: [StickComponent, TouchPadComponent, MessageComponent, TeleportComponent, ModelChoiceComponent, FightUiComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  private readonly gameService = inject(GameService);
  private readonly canvasRef = viewChild.required<ElementRef<HTMLElement>>('canvas');

  protected readonly hud = this.gameService.hud;
  protected readonly GameMode = GameMode;

  constructor() {
    afterNextRender(() => this.gameService.init(this.canvasRef().nativeElement));
  }

  protected togglePaused(): void {
    this.gameService.togglePaused();
  }

  protected updateModelChoice(modelId: string): void {
    this.gameService.selectDrawModel(modelId);
  }

  protected toggleGameMode(): void {
    this.gameService.switchGameMode(this.hud()?.mode === GameMode.MAP ? GameMode.FIGHT : GameMode.MAP);
  }
}
