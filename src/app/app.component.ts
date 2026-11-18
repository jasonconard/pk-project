import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideMaximize, LucideMinimize } from '@lucide/angular';
import { CoreService } from './core/shared/service/core.service';
import { UpdatePromptComponent } from './core/update-prompt/update-prompt.component';
import { initTapHaptics } from './core/shared/haptics';
import { EscapeService } from './core/shared/service/escape.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UpdatePromptComponent, LucideMaximize, LucideMinimize],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly coreService = inject(CoreService);

  protected readonly debugMode = signal(true);
  protected readonly fullScreened = this.coreService.fullScreened;
  protected readonly logs = this.coreService.logs;
  protected readonly fullScreenButtonHidden = this.coreService.fullScreenButtonHidden;

  constructor() {
    // Escape listens before anything else (closes the last thing opened)
    inject(EscapeService);
    initTapHaptics();
  }

  protected toggleFullscreen(): void {
    this.coreService.toggleFullScreen();
  }
}
