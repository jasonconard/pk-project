import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MappingComponent } from './mapping.component';

const receptionRoutes: Routes = [
  {
    path: '', component: MappingComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(receptionRoutes)],
  exports: [RouterModule]
})
export class MappingRoutingModule {
}
