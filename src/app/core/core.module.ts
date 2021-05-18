import { NgModule } from '@angular/core';
import { TouchPadComponent } from './touch-pad/touch-pad.component';
import { StickComponent } from './stick/stick.component';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';

@NgModule({
    imports: [
      CommonModule
    ],
    exports: [
      StickComponent,
      TouchPadComponent,
      MessageComponent
    ],
    declarations: [
      StickComponent,
      TouchPadComponent,
      MessageComponent
    ]
})
export class CoreModule { }
