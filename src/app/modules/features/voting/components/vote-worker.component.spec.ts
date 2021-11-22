import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteWorkerComponent } from './vote-worker.component';

describe('VoteWorkerComponent', () => {
  let component: VoteWorkerComponent;
  let fixture: ComponentFixture<VoteWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteWorkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should vote true', () => {
    spyOn(component.voted, "emit");
    const voteCast = true;
    component.vote(voteCast);
    //fixture.debugElement.nativeElement.querySelector('.vote-yes').click();

    expect(component.voted.emit).toHaveBeenCalledOnceWith(voteCast);
    expect(component.didVote).toBeTrue();
  });

  it('should vote false', () => {
    spyOn(component.voted, "emit");
    const voteCast = false;
    component.vote(voteCast);
    //fixture.debugElement.nativeElement.querySelector('.vote-yes').click();

    expect(component.voted.emit).toHaveBeenCalledOnceWith(voteCast);
    expect(component.didVote).toBeTrue();
  });

  it('should highlight false', () => {
    component.highlight(false);
    
    expect(component.received).toBeTrue();
    expect(component.highlighted).toBeFalse();
  });

  it('should highlight true', () => {
    component.highlight(true);
    
    expect(component.received).toBeTrue();
    expect(component.highlighted).toBeTrue();
  });
});
