import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VoteWorkerComponent } from './vote-worker.component';
import { VoteWrapperComponent } from './vote-wrapper.component';

describe('VoteWrapperComponent', () => {
  let component: VoteWrapperComponent;
  let fixture: ComponentFixture<VoteWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteWrapperComponent, VoteWorkerComponent],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteWrapperComponent);
    component = fixture.componentInstance;    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive vote', () => {
    expect(component.voteObtained).toBeFalsy();
    component.voteWorker.voted.emit(true);
    fixture.detectChanges();

    expect(component.voteObtained).toBeTrue();
    expect(component.voteWorker.highlighted).toBeTrue();
  });

});
