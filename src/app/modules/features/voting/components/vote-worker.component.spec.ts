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
});
