import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RgbDirective } from './rgb.directive';
@Component({
  template: `<div>
  <input rgbDirective [hexvalue]="'#ff0000'" id="color" type="text" value="#ff0000">
</div>`
})
class TestComponent {}

describe('RgbDirective', () => {
  let fixture : ComponentFixture<TestComponent>;
  let des : DebugElement[];
  let hint: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ RgbDirective, TestComponent ]
    })
    .createComponent(TestComponent);
  
    fixture.detectChanges();
    
    des = fixture.debugElement.queryAll(By.directive(RgbDirective));
    hint = fixture.debugElement.queryAll(By.css('#rgbHint'));
  
  });

  it('should create an instance', () => {
    expect(hint).toBeTruthy();
    expect(hint.length).toEqual(1);
    expect(hint[0].nativeElement.textContent).toEqual("rgb: 255, 0, 0");
  });
});

@Component({
  template: `<div>
    <div id="rgbHint">TESTTEST</div>
  <input rgbDirective [hexvalue]="'#ffffff'" id="color" type="text" value="#ff0000">
</div>`
})
class InitializedComponent {}

describe('RgbDirective', () => {
  let fixture : ComponentFixture<InitializedComponent>;
  let des : DebugElement[];
  let hint: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ RgbDirective, InitializedComponent ]
    })
    .createComponent(InitializedComponent);
  
    fixture.detectChanges();
    
    des = fixture.debugElement.queryAll(By.directive(RgbDirective));
    hint = fixture.debugElement.queryAll(By.css('#rgbHint'));
  
  });

  it('should create an instance', () => {
    expect(hint).toBeTruthy();
    expect(hint.length).toEqual(1);
    expect(hint[0].nativeElement.textContent).toEqual("rgb: 255, 255, 255");
  });
});

@Component({
  template: `
  <div>
    <input rgbDirective [hexvalue]="'abctest'" id="color" type="text" value="abctest">
  </div>
  `
})
class TestKOComponent { }

describe('RgbDirective', () => {
  let fixture : ComponentFixture<TestKOComponent>;
  let des : DebugElement[];
  let hint: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ RgbDirective, TestKOComponent ]
    })
    .createComponent(TestKOComponent);
  
    fixture.detectChanges();

    des = fixture.debugElement.queryAll(By.directive(RgbDirective));
    hint = fixture.debugElement.queryAll(By.css('#rgbHint'));
  
  });


  it('should not create an instance (invalid hex)', () => {
    expect(hint).toBeTruthy();
    expect(hint.length).toEqual(0);
  });
});

