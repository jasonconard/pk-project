import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MappingRoutingModule } from './mapping-routing.module';
import { MappingComponent } from './mapping.component';
import { StickComponent } from './stick/stick.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MappingRoutingModule
  ],
  declarations: [
    MappingComponent,
    StickComponent
  ],
  exports: [
    MappingComponent
  ]
})
export class MappingModule { }
