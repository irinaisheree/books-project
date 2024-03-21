import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DetailsComponent,
    AddComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule
  ]
})
export class BooksModule { }