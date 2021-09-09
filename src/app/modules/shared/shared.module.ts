import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateDiffPipe } from './pipes/date-diff.pipe';
import { RgbDirective } from './directives/rgb.directive';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    DateDiffPipe,
    RgbDirective,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateDiffPipe,
    RgbDirective,
    HeaderComponent
  ]
})
export class SharedModule { }
