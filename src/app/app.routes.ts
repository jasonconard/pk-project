import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // The models edited in the model editor (saved in the browser) replace the code's ones before the game is built
    loadComponent: async () => {
      const [{ GameComponent }, { applyBrowserModels }] = await Promise.all([
        import('./modules/game/game.component'),
        import('./modules/game/shared/model/browser-models'),
      ]);
      await applyBrowserModels();
      return GameComponent;
    },
  },
  {
    path: 'modeles',
    loadComponent: () => import('./modules/model-editor/model-editor.component').then(m => m.ModelEditorComponent),
  },
];
