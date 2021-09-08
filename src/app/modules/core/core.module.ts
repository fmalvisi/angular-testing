import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ColorCardComponent } from './components/color-card/color-card.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';



@NgModule({
  declarations: [
    HomeComponent,
    ColorCardComponent
  ],
  imports: [
    CommonModule,
    IvyCarouselModule
  ]
})
export class CoreModule { }
