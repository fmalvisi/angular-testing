import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteWrapperComponent } from './vote-wrapper.component';

describe('VoteWrapperComponent', () => {
  let component: VoteWrapperComponent;
  let fixture: ComponentFixture<VoteWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteWrapperComponent ]
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
});
