import { SceneEventInstruction } from './SceneEventInstruction';

export class SceneEventSequence {
  public currentIndex: number = -1;
  public instructions: SceneEventInstruction[];

  constructor(instructions: SceneEventInstruction[]) {
    this.currentIndex = -1;
    this.instructions = instructions || [];
  }

  public current(): SceneEventInstruction {
    return this.instructions[this.currentIndex];
  }

  public next(val?: string): SceneEventInstruction {
    const instruction = this.current();
    this.currentIndex++;
    ((instruction && instruction.subInstructions) || []).forEach(subIns => {
      if(!subIns.condition || subIns.condition === val) {
        subIns.instructions.forEach((instruction, index) => {
          this.instructions.splice(this.currentIndex + index + 1, 0, { ... instruction });
        });
      }
    });
    const current = this.current();
    if(!current) {
      this.currentIndex = -1;
      this.instructions = [];
    }
    console.log(current);
    return current;
  }
}
