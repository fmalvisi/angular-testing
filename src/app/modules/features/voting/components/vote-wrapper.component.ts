import { Component, OnInit, ViewChild } from '@angular/core';
import { VoteWorkerComponent } from './vote-worker.component';

@Component({
  selector: 'app-vote-wrapper',
  templateUrl: './vote-wrapper.component.html',
  styleUrls: ['./vote-wrapper.component.scss']
})
export class VoteWrapperComponent {
  
  @ViewChild(VoteWorkerComponent) voteWorker!: VoteWorkerComponent;
  
  liked = 0;
  disliked = 0;
  voteObtained = false;
  constructor() { }

  onVoted(agreed: boolean) {
    agreed ? this.liked++ : this.disliked++;
    this.voteObtained = true;
    this.voteWorker.highlight(agreed);
    console.log("call from parent");
  }

}
