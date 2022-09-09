import { animate, style, transition, trigger } from '@angular/animations';

export const cardsAnimations={ // cardsAnimations is an Object 
    FadeIn:trigger('fade',[     // FadeIn is property of cardsAnimations  
        transition('void => *',[  // move from void to default state 
          style({opacity:0}),
          animate(2000)          // 2000 means after 2 second cards will shown on screen ,and till 2 seconds animation will work 
        ])
      ])
}
