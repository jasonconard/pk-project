import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game.component';

const receptionRoutes: Routes = [
  {
    path: '', component: GameComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(receptionRoutes)],
  exports: [RouterModule]
})
export class GameRoutingModule {
}
