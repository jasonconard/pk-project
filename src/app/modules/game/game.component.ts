import { afterNextRender, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GameMode } from './shared/model/Game';
import { GameService } from './shared/services/game.service';
import { StickComponent } from '../../core/stick/stick.component';
import { TouchPadComponent } from '../../core/touch-pad/touch-pad.component';
import { MessageComponent } from '../../core/message/message.component';
import { TeleportComponent } from './teleport/teleport.component';
import { ModelChoiceComponent } from './model-choice/model-choice.component';
import { FightUiComponent } from '../fight/fight-ui/fight-ui.component';
import { TemperatureGaugeComponent } from './temperature-gauge/temperature-gauge.component';
import { SoundSetting, WeatherPanelComponent, WindSetting } from './weather-panel/weather-panel.component';
import { FireflyColor, LeafMode, WeatherType } from './shared/weather/Weather';

@Component({
  selector: 'game-main',
  imports: [StickComponent, TouchPadComponent, MessageComponent, TeleportComponent, ModelChoiceComponent, FightUiComponent, WeatherPanelComponent, TemperatureGaugeComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  private readonly gameService = inject(GameService);
  private readonly canvasRef = viewChild.required<ElementRef<HTMLElement>>('canvas');

  protected readonly hud = this.gameService.hud;
  protected readonly weather = this.gameService.weather;
  protected readonly night = this.gameService.night;
  protected readonly hour = this.gameService.hour;
  protected readonly timeFlow = this.gameService.timeFlow;
  protected readonly windStrength = this.gameService.windStrength;
  protected readonly windDirection = this.gameService.windDirection;
  protected readonly fireflyColor = this.gameService.fireflyColor;
  protected readonly leafMode = this.gameService.leafMode;
  protected readonly gusts = this.gameService.gusts;
  protected readonly cloudDensity = this.gameService.cloudDensity;
  protected readonly soundVolume = this.gameService.soundVolume;
  protected readonly soundMuted = this.gameService.soundMuted;
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

  protected setWeather(type: WeatherType): void {
    this.gameService.setWeather(type);
  }

  protected setWind(wind: WindSetting): void {
    this.gameService.setWind(wind.strength, wind.direction);
  }

  protected setFireflyColor(color: FireflyColor): void {
    this.gameService.setFireflyColor(color);
  }

  protected setSound(sound: SoundSetting): void {
    this.gameService.setSound(sound.volume, sound.muted);
  }

  protected setCloudDensity(density: number): void {
    this.gameService.setCloudDensity(density);
  }

  protected setGusts(enabled: boolean): void {
    this.gameService.setGusts(enabled);
  }

  protected setLeafMode(mode: LeafMode): void {
    this.gameService.setLeafMode(mode);
  }

  protected setHour(hour: number): void {
    this.gameService.setHour(hour);
  }

  protected setTimeFlow(flowing: boolean): void {
    this.gameService.setTimeFlow(flowing);
  }

  protected toggleGameMode(): void {
    this.gameService.switchGameMode(this.hud()?.mode === GameMode.MAP ? GameMode.FIGHT : GameMode.MAP);
  }
}
