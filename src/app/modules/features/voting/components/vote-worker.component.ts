import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-vote-worker',
  templateUrl: './vote-worker.component.html',
  styleUrls: ['./vote-worker.component.scss']
})
export class VoteWorkerComponent {

  @Output() voted = new EventEmitter<boolean>();
  didVote = false;
  highlighted = false;
  received = false;

  constructor() { }

  vote(liked: boolean) {
    this.voted.emit(liked);
    this.didVote = true;
  }

  highlight(liked: boolean) {
    console.log("called");
    this.received = true;
    this.highlighted = liked;
  }

}
