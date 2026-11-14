import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/game/game.component').then(m => m.GameComponent),
  },
  {
    path: 'modeles',
    loadComponent: () => import('./modules/model-editor/model-editor.component').then(m => m.ModelEditorComponent),
  },
];
