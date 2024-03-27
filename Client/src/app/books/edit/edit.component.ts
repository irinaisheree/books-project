import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditService } from './edit.service';
import { Book } from 'src/app/types/book';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editBookForm!: FormGroup;
  book: Book | undefined;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private editService: EditService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('EditComponent initialized');
    this.editBookForm = this.formBuilder.group({
      imageUrl: ['', Validators.required],
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });

    const bookId = this.route.snapshot.params['bookId'] || '';

    const authToken = localStorage.getItem('token');

    if (!authToken) {
      console.error('Authorization token not found.');
      // Handle the case where token is not found (redirect to login?)
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    this.editService.getBookById(bookId, headers).subscribe(
      (book: Book) => {
        console.log('Fetched Book:', book);
        this.book = book;
        this.patchFormWithBookData();
      },
      (error) => {
        console.error('Error fetching book:', error);
        // Handle error if needed
      }
    );
  }

  private patchFormWithBookData(): void {
    if (this.book) {
      this.editBookForm.patchValue({
        imageUrl: this.book.imageUrl,
        title: this.book.title,
        author: this.book.author,
        price: this.book.price,
        description: this.book.description
      });
    }
  }

  onSubmit(): void {
    if (this.editBookForm.valid && this.book) {
      const updatedBookData = this.editBookForm.value;
      console.log(updatedBookData)
      this.editService.updateBook(this.book._id, updatedBookData).subscribe(
        (updatedBook: Book) => {
          console.log('Book updated:', updatedBook);
          this.router.navigate(['/books', updatedBook._id]);
        },
        (error) => {
          console.error('Error updating book:', error);
        }
      );
    }
  }
}
