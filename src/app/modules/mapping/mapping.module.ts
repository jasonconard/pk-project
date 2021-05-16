import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MappingRoutingModule } from './mapping-routing.module';
import { MappingComponent } from './mapping.component';
import { CoreModule } from '../../core/core.module';
import { ModelChoiceComponent } from './model-choice/model-choice.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    MappingRoutingModule
  ],
  declarations: [
    MappingComponent,
    ModelChoiceComponent
  ],
  exports: [
    MappingComponent
  ]
})
export class MappingModule { }
