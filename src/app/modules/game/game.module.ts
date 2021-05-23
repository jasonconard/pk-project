import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { CoreModule } from '../../core/core.module';
import { ModelChoiceComponent } from './model-choice/model-choice.component';
import { TeleportComponent } from './teleport/teleport.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    GameRoutingModule
  ],
  declarations: [
    GameComponent,
    TeleportComponent,
    ModelChoiceComponent
  ],
  exports: [
    GameComponent
  ]
})
export class GameModule { }
