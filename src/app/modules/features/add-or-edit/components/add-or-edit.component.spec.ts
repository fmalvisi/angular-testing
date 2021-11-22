import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AddOrEditComponent } from './add-or-edit.component';

describe('AddOrEditComponent', () => {
  let component: AddOrEditComponent;
  let fixture: ComponentFixture<AddOrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ AddOrEditComponent ],
    
      providers: [{ provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({colorId: 1})) }}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log("Created Add or Edit Component")
    expect(component).toBeTruthy();
  });
});
