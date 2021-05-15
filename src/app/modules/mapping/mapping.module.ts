import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MappingRoutingModule } from './mapping-routing.module';
import { MappingComponent } from './mapping.component';
import { CoreModule } from '../../core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CoreModule,
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
