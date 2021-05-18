import { Injectable } from '@angular/core';
import { CoreService } from '../../../../core/shared/service/core.service';
import { SceneEvent } from '../model/SceneEvent';
import { SceneEventSequence } from '../model/SceneEventSequence';
import { InstructionLog, InstructionMessage, InstructionType, InstructionWait } from '../model/SceneEventInstruction';
import { SubjectHelper } from '../../../../core/shared/model/SubjectHelper';
import { KeyService } from '../../../../core/shared/service/key.service';

@Injectable({
  providedIn: 'root'
})
export class SequenceService {

  public sequenceSub = new SubjectHelper<SceneEventSequence>();
  public messageSub = new SubjectHelper<InstructionMessage>();

  constructor(private coreService: CoreService,
              private keyService: KeyService) {

  }

  public launchSequence(event: SceneEvent) {
    this.keyService.clearKeys();
    this.sequenceSub.next(new SceneEventSequence(event.instructions.map(i => { return { ... i } })));
    this.nextSequence();
  }

  public nextSequence(val?: string) {
    const sequence = this.sequenceSub.get();
    if(sequence) {
      const instruction = sequence.next(val);
      if(instruction) {
        switch (instruction.type) {
          case InstructionType.LOG: this.setLogs(instruction.log); break;
          case InstructionType.MESSAGE: this.setMessage(instruction.message); break;
          case InstructionType.WAIT: this.setWait(instruction.wait); break;
        }
      } else {
        this.sequenceSub.next(null);
      }
    }
  }

  private setLogs(log: InstructionLog) {
    if(!log) { return this.nextSequence(); }
    this.coreService.setLogs(log.text);
    this.nextSequence();
  }

  private setMessage(msg: InstructionMessage) {
    if(!msg) { return this.nextSequence(); }
    this.messageSub.next(msg);
  }

  private setWait(wait: InstructionWait) {
    if(!wait) { return this.nextSequence(); }
    setTimeout( () => {
      this.nextSequence();
    }, wait.time);
  }
}
