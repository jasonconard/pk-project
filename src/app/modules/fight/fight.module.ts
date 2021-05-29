import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FightComponent } from './fight.component';
import { FightRoutingModule } from './fight-routing.module';
import { FightUiComponent } from "./fight-ui/fight-ui.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FightRoutingModule
  ],
  declarations: [
    FightComponent,
    FightUiComponent
  ],
  exports: [
    FightComponent,
    FightUiComponent
  ]
})
export class FightModule { }
