import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// No browser zoom: Ctrl + wheel / trackpad pinch, Ctrl + / - / 0, iOS Safari pinch gestures (it ignores the
// viewport meta). The game's own wheel (map editor zoom) still works.
document.addEventListener('wheel', ev => {
  if (ev.ctrlKey) {
    ev.preventDefault();
  }
}, { passive: false });
document.addEventListener('keydown', ev => {
  if ((ev.ctrlKey || ev.metaKey) && ['+', '-', '=', '0'].includes(ev.key)) {
    ev.preventDefault();
  }
});
for (const gesture of ['gesturestart', 'gesturechange', 'gestureend']) {
  document.addEventListener(gesture, ev => ev.preventDefault(), { passive: false });
}

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
