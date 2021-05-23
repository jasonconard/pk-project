import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameModule } from './modules/game/game.module';

const routes: Routes = [{
  path: '',
  loadChildren: () => GameModule
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
