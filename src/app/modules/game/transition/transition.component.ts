import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  viewChild,
} from "@angular/core";
import { drawTransition, TRANSITION_PIXEL } from "../shared/model/transition";
import { TransitionService } from "../shared/services/transition.service";

/** The screen transitions' picture, over the game and its windows (TransitionService.view). */
@Component({
  selector: "game-transition",
  template: `@if (transitions.view()) {
    <canvas #canvas></canvas>
  }`,
  styles: `
    canvas {
      position: fixed;
      inset: 0;
      z-index: 2500;
      width: 100%;
      height: 100%;
      image-rendering: pixelated;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransitionComponent {
  protected readonly transitions = inject(TransitionService);
  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>("canvas");

  constructor() {
    effect(() => {
      const view = this.transitions.view();
      const canvas = this.canvas()?.nativeElement;
      if (!view || !canvas) {
        return;
      }
      const w = Math.ceil(window.innerWidth / TRANSITION_PIXEL);
      const h = Math.ceil(window.innerHeight / TRANSITION_PIXEL);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      const ctx = canvas.getContext("2d");
      if (ctx) {
        drawTransition(ctx, view.kind, view.covered, view.revealing);
      }
    });
  }
}
