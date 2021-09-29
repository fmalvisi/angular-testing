import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrEditComponent } from './components/add-or-edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddOrEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    AddOrEditComponent
  ]
})
export class AddOrEditModule { }