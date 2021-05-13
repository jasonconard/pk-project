import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FightComponent } from './fight.component';
import { FightRoutingModule } from './fight-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FightRoutingModule
  ],
  declarations: [
    FightComponent
  ],
  exports: [
    FightComponent
  ]
})
export class FightModule { }
