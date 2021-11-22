import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ColorsService } from 'src/app/modules/core/services/colors.service';
import { Color } from 'src/app/modules/shared/model/color';

import { AddOrEditComponent } from './add-or-edit.component';

class MockColorsService {
  colors = [
    {
      "id": 1,
      "name": "cerulean",
      "year": 2000,
      "color": "#98B2D1",
      "pantone_value": "15-4020",
      "loaded": "2011-02-005 14:02:13"
    }
  ]
  getColor(id: number): Promise<Color> {
    const _promise = new Promise<Color>((resolve, reject) => {
      if (id == 1) {
        resolve(this.colors[0]);
      } else {
        reject("Errore");
      }
    });
    return _promise;
  }

  editColor(color: Color) {}
  addColor(color: Color) {}
}

describe('AddOrEditComponent - EDIT', () => {
  let component: AddOrEditComponent;
  let fixture: ComponentFixture<AddOrEditComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule
      ],
      declarations: [ AddOrEditComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({colorId: 1})) }},
        { provide: ColorsService, useClass: MockColorsService},
      ]
    })
    .compileComponents();
  });

  beforeEach(async() => {
    httpMock = TestBed.inject(HttpTestingController);
    fixture = await TestBed.createComponent(AddOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
    expect(component.dataLoaded).toBeTrue();
    spyOn(component['colorService'], "editColor").and.callFake(()=>{return of(null);});
    spyOn(component['colorService'], "addColor").and.callFake(()=>{return of(null);});

    fixture.detectChanges();

    const nameInput: HTMLInputElement = fixture.nativeElement.querySelector('#name');
    nameInput.value = 'test';
    fixture.detectChanges();
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(1000);

    expect(component.selectedColor.edited_by).toEqual("You");

    component.submit();

    expect(component['colorService'].addColor).not.toHaveBeenCalled();
    expect(component['colorService'].editColor).toHaveBeenCalled();
    expect(component['colorService'].editColor).toHaveBeenCalledTimes(1);
    expect(component['colorService'].editColor).toHaveBeenCalledWith(component.selectedColor);
  }));

  it('should goback', () => {

    spyOn(component['router'], "navigate");
    component.goBack();

    expect(component['router'].navigate).toHaveBeenCalled();
    expect(component['router'].navigate).toHaveBeenCalledTimes(1);
    expect(component['router'].navigate).toHaveBeenCalledOnceWith(["/"]);
  });
});

describe('AddOrEditComponent - ADD', () => {
  let component: AddOrEditComponent;
  let fixture: ComponentFixture<AddOrEditComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule
      ],
      declarations: [ AddOrEditComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({})) }},
        { provide: ColorsService, useClass: MockColorsService},
      ]
    })
    .compileComponents();
  });

  beforeEach(async() => {
    httpMock = TestBed.inject(HttpTestingController);
    fixture = await TestBed.createComponent(AddOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.dataLoaded).toBeTrue();
    spyOn(component['colorService'], "editColor").and.callFake(()=>{return of(null);});
    spyOn(component['colorService'], "addColor").and.callFake(()=>{return of(null);});

    component.submit();

    expect(component['colorService'].editColor).not.toHaveBeenCalled();
    expect(component['colorService'].addColor).toHaveBeenCalled();
    expect(component['colorService'].addColor).toHaveBeenCalledTimes(1);
    expect(component['colorService'].addColor).toHaveBeenCalledWith(component.selectedColor);
  });

  it('should handle error', () => {
    expect(component).toBeTruthy();
    expect(component.dataLoaded).toBeTrue();
    const editError = new Error("Errore in Edit");
    const addError = new Error("Errore in Add");
    spyOn(component['colorService'], "editColor").and.throwError(editError);
    spyOn(component['colorService'], "addColor").and.throwError(addError);
    expect(()=>{component.submit()}).toThrow(addError);
  });
});

describe('AddOrEditComponent - FAULT', () => {
  let component: AddOrEditComponent;
  let fixture: ComponentFixture<AddOrEditComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule
      ],
      declarations: [ AddOrEditComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({colorId: 2})) }},
        { provide: ColorsService, useClass: MockColorsService},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', async() => {
    spyOn(window, 'alert');
    fixture = TestBed.createComponent(AddOrEditComponent);
    component = fixture.componentInstance;

    spyOn(component['router'], "navigate");
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component).toBeTruthy();
    expect(component.dataLoaded).toBeFalsy();
    expect(window.alert).toHaveBeenCalledWith('Errore in chiamata API, torno indietro');

    expect(component['router'].navigate).toHaveBeenCalled();
    expect(component['router'].navigate).toHaveBeenCalledTimes(1);
    expect(component['router'].navigate).toHaveBeenCalledOnceWith(["/"]);
  });
})
