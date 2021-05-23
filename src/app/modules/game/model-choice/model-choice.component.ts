import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { MODEL_CHOICES, ModelChoice } from '../shared/model/ModelChoice';
import { FADE_ANIM, MODEL_CHOICE_FADE_ANIM } from '../../../core/shared/animations/FadeAnim';

@Component({
  selector: 'mapping-model-choice',
  templateUrl: './model-choice.component.html',
  styleUrls: ['./model-choice.component.scss'],
  animations: [FADE_ANIM, MODEL_CHOICE_FADE_ANIM]
})
export class ModelChoiceComponent implements OnInit, OnDestroy {

  @Input() selectedModel: string = '';
  @Output() onModelChange = new EventEmitter<string>();

  private modelChoices: ModelChoice[] = MODEL_CHOICES;

  public filteredChoices: ModelChoice[] = [];



  constructor() {
  }

  ngOnInit(): void {
    setTimeout( () => {
      this.filteredChoices = [];
      const sortedChoices = this.modelChoices.sort( (c1, c2) => {
        return c1.model.id > c2.model.id ? 1 : -1;
      });

      sortedChoices.forEach( (c, index) => {
        const canvas : any =  document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = document.createElement('img');
        img.src = c.model.tex.link;

        canvas.width = c.texPos.max.x - c.texPos.min.x;
        canvas.height = c.texPos.max.y - c.texPos.min.y;

        setTimeout( () => {
          this.filteredChoices.push(c);
        }, index * 80);

        fromEvent(img, 'load').subscribe( () => {
          ctx.drawImage(img, c.texPos.min.x, c.texPos.min.y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
          c.croppedPic = canvas.toDataURL();
        });


      });
    }, 200);
  }

  ngOnDestroy(): void {
  }

  selectModel(choice: ModelChoice) {
    const modelKey = choice.model.id;
    this.selectedModel = modelKey;
    setTimeout( () => {
      this.onModelChange.emit(modelKey);
    }, 200);
  }


  isSelectedModel(choice: ModelChoice): boolean {
    const modelKey = choice.model.id;
    return modelKey === this.selectedModel;
  }
}
