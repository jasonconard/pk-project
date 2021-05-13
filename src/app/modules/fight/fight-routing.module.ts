import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FightComponent } from './fight.component';

const receptionRoutes: Routes = [
  {
    path: '', component: FightComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(receptionRoutes)],
  exports: [RouterModule]
})
export class FightRoutingModule {
}
