import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MappingRoutingModule } from './mapping-routing.module';
import { MappingComponent } from './mapping.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MappingRoutingModule
  ],
  declarations: [
    MappingComponent
  ],
  exports: [
    MappingComponent
  ]
})
export class MappingModule { }
