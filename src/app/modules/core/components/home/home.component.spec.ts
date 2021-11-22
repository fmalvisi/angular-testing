import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CarouselComponent } from 'angular-responsive-carousel';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ HomeComponent, CarouselComponent ],
      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate', () => {
    spyOn(component['router'], "navigate");
    component.addColor();
    expect(component['router'].navigate).toHaveBeenCalledOnceWith(["/color", '']);

  })
  it ('should work with low resolution', () => {
    spyOnProperty(window, "innerWidth").and.returnValue(760);
    const cardsToDisplay = component.elementsToDisplay();
    expect(cardsToDisplay).toEqual(1);
  })
  it ('should work with med resolution', () => {
    spyOnProperty(window, "innerWidth").and.returnValue(1080);
    const cardsToDisplay = component.elementsToDisplay();
    expect(cardsToDisplay).toEqual(2);
  })
  it ('should work with med resolution', () => {
    spyOnProperty(window, "innerWidth").and.callFake(() => {
      return 1280;
    });
    const cardsToDisplay = component.elementsToDisplay();
    expect(cardsToDisplay).toEqual(3);
  })
});
