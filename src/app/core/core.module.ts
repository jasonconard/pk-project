import { NgModule } from '@angular/core';
import { TouchPadComponent } from './touch-pad/touch-pad.component';
import { StickComponent } from './stick/stick.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
      CommonModule
    ],
    exports: [
      StickComponent,
      TouchPadComponent
    ],
    declarations: [
      StickComponent,
      TouchPadComponent
    ]
})
export class CoreModule { }
