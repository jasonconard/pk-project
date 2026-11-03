import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreService } from './core/shared/service/core.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly coreService = inject(CoreService);

  protected readonly debugMode = signal(true);
  protected readonly fullScreened = this.coreService.fullScreened;
  protected readonly logs = this.coreService.logs;

  protected toggleFullscreen(): void {
    this.coreService.toggleFullScreen();
  }
}
