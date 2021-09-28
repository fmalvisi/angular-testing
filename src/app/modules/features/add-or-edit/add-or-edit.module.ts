import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrEditComponent } from './components/add-or-edit.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    AddOrEditComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [
    AddOrEditComponent
  ]
})
export class AddOrEditModule { }