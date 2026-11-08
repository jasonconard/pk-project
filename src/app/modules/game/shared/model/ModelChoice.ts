import { VecBox2 } from './SceneUtils';
import { SceneModel } from './SceneModel';
import { MD_LABO } from '../../../../../assets/models/md-labo';
import { MD_BARRIER } from '../../../../../assets/models/md-barrier';
import { MD_PANNEL } from '../../../../../assets/models/md-pannel';
import { MD_FLOWERS } from '../../../../../assets/models/md-flowers';
import { MD_TREE } from '../../../../../assets/models/md-tree';
import { MD_HOUSE } from '../../../../../assets/models/md-house';
import { MD_WOOD_PANNEL } from '../../../../../assets/models/md-wood-pannel';
import { MD_LETTER_BOX } from '../../../../../assets/models/md-letter-box';
import { MD_ROCK } from '../../../../../assets/models/md-rock';

export interface ModelChoice {
  texPos: VecBox2,
  model: SceneModel,
  croppedPic?: string
}

export const MODEL_CHOICES: ModelChoice[] = [
    {
      model: MD_ROCK,
      texPos: {
        min: { x: 0, y: 0},
        max: { x: 16, y: 16}
      }
    },
    {
      model: MD_LABO,
      texPos: {
        min: { x: 185, y: 125},
        max: { x: 297, y: 197}
      }
    },
    {
      model: MD_BARRIER,
      texPos: {
        min: { x: 24, y: 11},
        max: { x: 32, y: 22}
      }
    },
    {
      model: MD_PANNEL,
      texPos: {
        min: { x: 34, y: 35},
        max: { x: 50 , y: 50}
      }
    },
    {
      model: MD_FLOWERS,
      texPos: {
        min: { x: 25, y: 25},
        max: { x: 39, y: 40}
      }
    },
    {
      model: MD_TREE,
      texPos: {
        min: { x: 65, y: 79},
        max: { x: 95, y: 120}
      }
    },
    {
      model: MD_HOUSE,
      texPos: {
        min: { x: 218, y: 120},
        max: { x: 298, y: 192}
      }
    },
    {
      model: MD_WOOD_PANNEL,
      texPos: {
        min: { x: 26, y: 25},
        max: { x: 40 , y: 40}
      }
    },
    {
      model: MD_LETTER_BOX,
      texPos: {
        min: { x: 28, y: 19},
        max: { x: 40, y: 40}
      }
    }
]

/** Thumbnail of a model (its `texPos` crop of the texture), as a data URL; cached on the choice. */
export function loadModelThumb(choice: ModelChoice): Promise<string> {
  if (choice.croppedPic) {
    return Promise.resolve(choice.croppedPic);
  }
  return new Promise(resolve => {
    const canvas = document.createElement('canvas');
    canvas.width = choice.texPos.max.x - choice.texPos.min.x;
    canvas.height = choice.texPos.max.y - choice.texPos.min.y;
    const img = document.createElement('img');
    img.addEventListener('load', () => {
      canvas.getContext('2d')?.drawImage(img, choice.texPos.min.x, choice.texPos.min.y, canvas.width, canvas.height,
        0, 0, canvas.width, canvas.height);
      choice.croppedPic = canvas.toDataURL();
      resolve(choice.croppedPic);
    }, { once: true });
    img.src = choice.model.tex.link;
  });
}
