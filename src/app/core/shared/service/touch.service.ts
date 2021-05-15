import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { Stick, STICK_RADIUS } from '../model/Stick';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TouchService {


  public isTouchDevice: boolean = false;
  private isTouchDeviceSubject = new BehaviorSubject<boolean>(this.isTouchDevice);
  public isTouchDeviceState = this.isTouchDeviceSubject.asObservable();

  public stick: Stick = null;
  private stickSubject = new Subject<Stick>();
  public stickState = this.stickSubject.asObservable();

  private directionTouches = null;

  constructor() {
    this.updateIsTouchDevice();
    fromEvent(window, 'resize').subscribe(
      (event) => {
        this.updateIsTouchDevice();
      })
  }

  public updateIsTouchDevice() {
    this.isTouchDevice = (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
    this.isTouchDeviceSubject.next(this.isTouchDevice);
  }

  public updateStick(stick: Stick) {
    this.stick = stick;
    this.stickSubject.next(stick);
  }

  public bindTouching(canvas: HTMLElement) {

    canvas.addEventListener("touchstart", (e) => {
      const touches = e.touches[e.touches.length - 1];
      const canvasWidth = canvas.getBoundingClientRect().width;
      if(touches.clientX < canvasWidth / 2) {
        this.updateStick({
          begin: { x: touches.clientX, y: touches.clientY },
          current: { x: touches.clientX, y: touches.clientY },
          radius: STICK_RADIUS
        });

        if(!this.directionTouches){
          this.directionTouches = touches;
        }
      }
    }, false);


    canvas.addEventListener("touchend", (e) => {
      this.updateStick(null)
      const currentFingerReleased = e.changedTouches[0];
      if(this.directionTouches && currentFingerReleased.identifier === this.directionTouches.identifier){
        this.directionTouches = null;
      }
    }, false);

    canvas.addEventListener("touchmove", (e) => {
      if (e['scale'] !== 1) { e.preventDefault(); }
      const currentFingerMoved = e.changedTouches[0];
      if(this.directionTouches && currentFingerMoved.identifier === this.directionTouches.identifier){

        const diffX = currentFingerMoved.clientX - this.directionTouches.clientX;
        const diffY = currentFingerMoved.clientY - this.directionTouches.clientY;
        let computedAngle = Math.asin( diffY / Math.sqrt((diffX*diffX)+(diffY*diffY))) * 180 / Math.PI;


        if(diffX > 0) {
          computedAngle = 180 - computedAngle;
        } else {
          computedAngle = (360 + computedAngle) % 360;
        }


        if(this.stick) {
          const dist = Math.sqrt( Math.pow(this.stick.begin.x - currentFingerMoved.clientX, 2) + Math.pow(this.stick.begin.y - currentFingerMoved.clientY, 2));
          if(dist > this.stick.radius -10) {
            const x = Math.cos(THREE.MathUtils.degToRad(computedAngle)) * (-this.stick.radius+10);
            const y = Math.sin(THREE.MathUtils.degToRad(computedAngle)) * (this.stick.radius-10);
            this.updateStick({
              ...this.stick,
              current: { x: x + this.stick.begin.x, y: y + this.stick.begin.y }
            });
          } else {
            this.updateStick({
              ...this.stick,
              current: { x: currentFingerMoved.clientX, y: currentFingerMoved.clientY }
            });
          }
        }

      }
    }, { passive: false });
  }
}
