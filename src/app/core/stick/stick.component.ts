import { Component, computed, inject } from '@angular/core';
import { TouchService } from '../shared/service/touch.service';

@Component({
  selector: 'core-stick',
  templateUrl: './stick.component.html',
  styleUrl: './stick.component.scss'
})
export class StickComponent {
  protected readonly stick = inject(TouchService).stick;

  protected readonly contentStyle = computed(() => {
    const stick = this.stick();
    return stick ? {
      width: (stick.radius * 2) + 'px',
      height: (stick.radius * 2) + 'px',
      left: (stick.begin.x - stick.radius) + 'px',
      top: (stick.begin.y - stick.radius - 10) + 'px'
    } : null;
  });

  protected readonly currentStyle = computed(() => {
    const stick = this.stick();
    return stick ? {
      left: (stick.current.x - stick.begin.x + stick.radius) + 'px',
      top: (stick.current.y - stick.begin.y + stick.radius) + 'px'
    } : null;
  });
}
