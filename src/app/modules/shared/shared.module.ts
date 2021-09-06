import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateDiffPipe } from './pipes/date-diff.pipe';
import { RgbDirective } from './directives/rgb.directive';



@NgModule({
  declarations: [
    DateDiffPipe,
    RgbDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateDiffPipe,
    RgbDirective
  ]
})
export class SharedModule { }
