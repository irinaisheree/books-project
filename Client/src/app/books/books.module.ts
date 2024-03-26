import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DetailsComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule
  ]
})
export class BooksModule { }