import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { KeyService } from '../../core/shared/service/key.service';
import { Game } from './shared/model/Game';
import { FADE_ANIM, FADE_ONLEAVE_ANIM } from '../../core/shared/animations/FadeAnim';
import { GameService } from "./shared/services/game.service";

@Component({
  selector: 'game-main',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [FADE_ANIM, FADE_ONLEAVE_ANIM]
})
export class GameComponent implements AfterViewInit, OnInit, OnDestroy {

  public game: Game = null;

  @ViewChild('canvas', { static: false }) canvasRef: ElementRef;

  constructor(private keyService: KeyService,
              private gameService: GameService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
    setTimeout(() => { this.initGame(); });
  }

  private initGame() {
    this.game = this.gameService.init(this.canvasRef.nativeElement);
  }

  public togglePaused() {
    this.gameService.togglePaused();
  }

  public updateModelChoice(val: string) {
    console.log(val);
    this.game.drawModelId = val;
    this.game.drawModelOpen = false;
  }
}

