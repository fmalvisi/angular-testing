import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrEditComponent } from './components/add-or-edit.component';



@NgModule({
  declarations: [
    AddOrEditComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AddOrEditComponent
  ]
})
export class AddOrEditModule { }