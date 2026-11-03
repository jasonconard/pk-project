import { Component, DestroyRef, inject, input, linkedSignal, output, signal } from '@angular/core';
import { MODEL_CHOICES, ModelChoice } from '../shared/model/ModelChoice';

@Component({
  selector: 'mapping-model-choice',
  templateUrl: './model-choice.component.html',
  styleUrl: './model-choice.component.scss'
})
export class ModelChoiceComponent {
  readonly selectedModel = input('');
  readonly modelSelected = output<string>();

  protected readonly currentModel = linkedSignal(() => this.selectedModel());
  protected readonly filteredChoices = signal<ModelChoice[]>([]);
  protected readonly croppedPics = signal<Record<string, string>>({});

  constructor() {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    inject(DestroyRef).onDestroy(() => timeouts.forEach(clearTimeout));

    timeouts.push(setTimeout(() => {
      const sortedChoices = [...MODEL_CHOICES].sort((c1, c2) => c1.model.id > c2.model.id ? 1 : -1);

      sortedChoices.forEach((choice, index) => {
        timeouts.push(setTimeout(() => this.filteredChoices.update(list => [...list, choice]), index * 80));
        this.cropPicture(choice);
      });
    }, 200));
  }

  private cropPicture(choice: ModelChoice): void {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    const img = document.createElement('img');
    canvas.width = choice.texPos.max.x - choice.texPos.min.x;
    canvas.height = choice.texPos.max.y - choice.texPos.min.y;

    img.addEventListener('load', () => {
      ctx.drawImage(img, choice.texPos.min.x, choice.texPos.min.y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
      const croppedPic = canvas.toDataURL();
      choice.croppedPic = croppedPic;
      this.croppedPics.update(pics => ({ ...pics, [choice.model.id]: croppedPic }));
    }, { once: true });
    img.src = choice.model.tex.link;
  }

  protected selectModel(choice: ModelChoice): void {
    const modelKey = choice.model.id;
    this.currentModel.set(modelKey);
    setTimeout(() => this.modelSelected.emit(modelKey), 200);
  }
}
