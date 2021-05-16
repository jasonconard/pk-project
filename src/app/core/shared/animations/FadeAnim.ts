import { animate, style, transition, trigger } from '@angular/animations';

export const FADE_ANIM =
  trigger('fadeAnim', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('200ms', style( { opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1, }),
      animate('200ms', style({ opacity: 0 }))
    ])
  ])

export const MODEL_CHOICE_FADE_ANIM =
  trigger('modelChoiceFadeAnim', [
    transition(':enter', [
      style({ opacity: 0, left: '{{leftOffset}}px' }),
      animate('200ms', style( { opacity: 1, left: 0 }))
    ]),
    transition(':leave', [
      style({ opacity: 1, left: 0 }),
      animate('200ms', style({ opacity: 0, left: '{{leftOffset}}px' }))
    ])
  ])
