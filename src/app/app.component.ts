import { Component, OnInit } from '@angular/core';
import { CoreService } from './shared/service/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public deviceFullscreenEnabled: boolean = false;
  public canFullscreen: boolean = document.documentElement.requestFullscreen || document.documentElement['webkitRequestFullScreen'] || document.documentElement['mozRequestFullScreen'] || document.documentElement['msRequestFullscreen'];

  public forcedFullscreen: boolean = false;

  constructor(private coreService: CoreService) {
  }

  ngOnInit() {
    this.forcedFullscreen = this.coreService.forcedFullscreen;

    this.coreService.forcedFullscreenState.subscribe(forced => {
      this.forcedFullscreen = forced;
    });
  }

  toggleFullscreen() {
    if(this.deviceFullscreenEnabled) {
      const rfs = document.exitFullscreen || document['webkitCancelFullScreen'] || document['mozCancelFullScreen'] || document['msExitFullscreen'];
      rfs.call(document);
      this.deviceFullscreenEnabled = false;
    } else {
      const el = document.documentElement;
      const rfs = el.requestFullscreen || el['webkitRequestFullScreen'] || el['mozRequestFullScreen'] || el['msRequestFullscreen'];
      rfs.call(el);
      this.deviceFullscreenEnabled = true;
    }
  }
}
