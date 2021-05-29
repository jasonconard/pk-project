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

export const FADE_ANIM_DELAYED =
  trigger('fadeAnimDelayed', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('200ms 200ms', style( { opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1, }),
      animate('200ms', style({ opacity: 0 }))
    ])
  ])

export const FADE_ONLEAVE_ANIM =
  trigger('fadeOnLeaveAnim', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('0ms', style( { opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1, }),
      animate('200ms', style({ opacity: 0 }))
    ])
  ])

export const LOADING_ANIM =
  trigger('loadingAnim', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('200ms', style( { opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1, }),
      animate('400ms 200ms', style({ opacity: 0 }))
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

export const MESSAGE_CHOICE_FADE_ANIM =
  trigger('messageChoiceFadeAnim', [
    transition(':enter', [
      style({ opacity: 0, right: '{{rightOffset}}px' }),
      animate('200ms {{delay}}ms', style( { opacity: 1, right: '{{rightOffsetEnd}}px' }))
    ]),
    transition(':leave', [
      style({ opacity: 1, right: '{{rightOffsetEnd}}px' }),
      animate('200ms', style({ opacity: 0, right: '{{rightOffset}}px' }))
    ])
  ])

export const FIGHT_MENU_ANIM =
  trigger('fightMenuAnim', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(400px)' }),
      animate('200ms', style( { opacity: 1, transform: 'translateX(0)' }))
    ]),
    transition(':leave', [
      style({ opacity: 1, transform: 'translateX(0)' }),
      animate('200ms', style({ opacity: 0, transform: 'translateX(400px)' }))
    ])
  ])
