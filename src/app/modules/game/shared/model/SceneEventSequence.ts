import { SceneEventInstruction } from './SceneEventInstruction';

export class SceneEventSequence {
  private currentIndex = -1;

  constructor(private instructions: SceneEventInstruction[] = []) {}

  current(): SceneEventInstruction | undefined {
    return this.instructions[this.currentIndex];
  }

  next(val?: string): SceneEventInstruction | undefined {
    const instruction = this.current();
    this.currentIndex++;
    (instruction?.subInstructions ?? []).forEach(subIns => {
      if (!subIns.condition || subIns.condition === val) {
        subIns.instructions.forEach((subInstruction, index) => {
          this.instructions.splice(this.currentIndex + index + 1, 0, { ...subInstruction });
        });
      }
    });
    const current = this.current();
    if (!current) {
      this.currentIndex = -1;
      this.instructions = [];
    }
    return current;
  }
}
