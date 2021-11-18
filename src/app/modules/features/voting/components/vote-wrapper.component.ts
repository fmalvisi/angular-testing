import { Component, ViewChild } from '@angular/core';
import { VoteWorkerComponent } from './vote-worker.component';

@Component({
  selector: 'app-vote-wrapper',
  templateUrl: './vote-wrapper.component.html',
  styleUrls: ['./vote-wrapper.component.scss']
})
export class VoteWrapperComponent {
  
  @ViewChild(VoteWorkerComponent) voteWorker!: VoteWorkerComponent;
  
  voteObtained = false;
  constructor() { }

  onVoted(liked: boolean) {
    this.voteObtained = true;
    this.voteWorker.highlight(liked);
  }

}
