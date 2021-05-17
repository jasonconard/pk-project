import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  public static me = null;

  public logs: string = '';
  private logsSubject = new BehaviorSubject<string>(this.logs);
  public logsState = this.logsSubject.asObservable();

  public resumed = true;
  private resumedSubject = new BehaviorSubject<boolean>(this.resumed);
  public resumedState = this.resumedSubject.asObservable();

  public fullScreened = false;
  // public canFullscreen: boolean = document.documentElement.requestFullscreen || document.documentElement['webkitRequestFullScreen'] || document.documentElement['mozRequestFullScreen'] || document.documentElement['msRequestFullscreen'];

  private fullScreenedSubject = new BehaviorSubject<boolean>(this.fullScreened);
  public fullScreenedState = this.fullScreenedSubject.asObservable();

  constructor() {
    CoreService.me = this;
    this.initResume();

    fromEvent(document, 'fullscreenchange').subscribe((ev) => {
      this.fullScreened = !!document.fullscreenElement;
      this.fullScreenedSubject.next(this.fullScreened);
      ev.preventDefault();
    });
    fromEvent(document, 'contextmenu').subscribe((ev) => {
      // ev.preventDefault();
    });
  }

  public toggleFullScreen() {
    if(this.fullScreened) {
      const rfs = document.exitFullscreen || document['webkitCancelFullScreen'] || document['mozCancelFullScreen'] || document['msExitFullscreen'];
      rfs.call(document);
    } else {
      const el = document.documentElement;
      const rfs = el.requestFullscreen || el['webkitRequestFullScreen'] || el['mozRequestFullScreen'] || el['msRequestFullscreen'];
      rfs.call(el);
    }
  }


  /**
   * Get the value of visibilityChange event which check of current tab is in background or not on web browser
   **/
  getCurrentBrowserHiddenValues(): { visibilityChange: string, hidden: string } {
    let visibilityChange: string;
    let hidden: string;
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
      visibilityChange = "visibilitychange";
      hidden = 'hidden';
    } else if (typeof document['mozHidden'] !== "undefined") {
      visibilityChange = "mozvisibilitychange";
      hidden = 'mozHidden';
    } else if (typeof document['msHidden'] !== "undefined") {
      visibilityChange = "msvisibilitychange";
      hidden = 'msHidden';
    } else if (typeof document['webkitHidden'] !== "undefined") {
      visibilityChange = "webkitvisibilitychange";
      hidden = 'webkitHidden';
    }
    return {
      visibilityChange,
      hidden
    };
  }

  initResume(): void {
    const values = this.getCurrentBrowserHiddenValues();
    this.resumed = !document[values.hidden];
    this.resumedSubject.next(this.resumed);
    fromEvent(document, values.visibilityChange).subscribe((evt) => {
      this.resumed = !document[values.hidden];
      this.resumedSubject.next(this.resumed);
    });

    fromEvent(window, 'blur').subscribe((ev) => {
      this.setResume(false);
    });

    fromEvent(window, 'focus').subscribe((ev) => {
      this.setResume(true);
    });
  }

  private setResume(resumed: boolean) {
    this.resumed = resumed;
    this.resumedSubject.next(resumed);
  }

  public setLogs(logs: string) {
    this.logs = logs;
    this.logsSubject.next(logs);
  }
}
