import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MappingModule } from './modules/mapping/mapping.module';

const routes: Routes = [{
  path: '',
  loadChildren: () => MappingModule
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
