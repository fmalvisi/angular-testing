import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DateDiffPipe } from 'src/app/modules/shared/pipes/date-diff.pipe';

import { ColorCardComponent } from './color-card.component';

describe('ColorCardComponent', () => {
  let component: ColorCardComponent;
  let fixture: ComponentFixture<ColorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ ColorCardComponent, DateDiffPipe ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should editColor', () => {
    spyOn(component['router'], "navigate");
    const id = 24;
    component.color = {id: id, color: "#ffff00", pantone_value: "00-0000", name: "test Color", year: 2021}
    component.editColor();
    expect(component['router'].navigate).toHaveBeenCalled();
    expect(component['router'].navigate).toHaveBeenCalledTimes(1);
    expect(component['router'].navigate).toHaveBeenCalledWith(['/color', id]);
  });

  it('should navigate invalid color', () => {
    spyOn(component['router'], "navigate");
    component.color = undefined;
    component.editColor();

    expect(component['router'].navigate).not.toHaveBeenCalled();
  });
});
