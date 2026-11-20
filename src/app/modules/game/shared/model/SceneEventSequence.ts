import { SceneEventInstruction } from "./SceneEventInstruction";

export class SceneEventSequence {
  private currentIndex = -1;

  constructor(private instructions: SceneEventInstruction[] = []) {}

  current(): SceneEventInstruction | undefined {
    return this.instructions[this.currentIndex];
  }

  /**
   * The next instruction. The one just played may have sub-instructions (a branch, a choice's answers, a fight's
   * outcomes): those of the branch taken (`val`) come first, before the instructions after it.
   */
  next(val?: string): SceneEventInstruction | undefined {
    const instruction = this.current();
    this.currentIndex++;
    let at = this.currentIndex;
    (instruction?.subInstructions ?? []).forEach((subIns) => {
      if (!subIns.condition || subIns.condition === val) {
        subIns.instructions.forEach((subInstruction) =>
          this.instructions.splice(at++, 0, { ...subInstruction })
        );
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
