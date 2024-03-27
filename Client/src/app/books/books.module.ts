import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { RouterModule } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    BookListComponent,
    DetailsComponent,
    EditComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    BookListComponent,
    DetailsComponent,
    EditComponent,
    AddComponent
  ]
})
export class BooksModule { }
