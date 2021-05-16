import { Component, OnInit } from '@angular/core';
import { CoreService } from './core/shared/service/core.service';
import { auditTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public logs: string = '';
  public debugMode: boolean = true;
  public fullScreened: boolean = false;

  constructor(private coreService: CoreService) {
  }

  ngOnInit() {
    this.coreService.fullScreenedState.subscribe(forced => {
      this.fullScreened = forced;
    });
    this.coreService.logsState.pipe(auditTime(1)).subscribe(logs => {
      this.logs = logs;
    });
  }

  toggleFullscreen() {
    this.coreService.toggleFullScreen();
  }
}
