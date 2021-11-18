import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteWrapperComponent } from './components/vote-wrapper.component';
import { VoteWorkerComponent } from './components/vote-worker.component';



@NgModule({
  declarations: [
    VoteWrapperComponent,
    VoteWorkerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VoteWrapperComponent,
    VoteWorkerComponent
  ]
})
export class VotingModule { }