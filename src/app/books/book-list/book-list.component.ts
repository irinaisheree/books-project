import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../types/book';
import { DetailsServiceService } from '../details/details-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
// import { DetailsServiceService } from '../details/details-service.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  private booksSubscription: Subscription | undefined;

  constructor(private detailsService: DetailsServiceService, private router: Router) {}

  ngOnInit(): void {
    this.booksSubscription = this.detailsService.getBooks().subscribe((books) => {
      console.log(books);
      console.log(typeof books);
      this.books = books;
    });
  }

  showBookDetails(bookId: string): void {
    this.booksSubscription = this.detailsService.getOneBook(bookId).subscribe((bookId) => {
     console.log(bookId)
    })
    this.router.navigate(['/books', bookId]);
  }

  ngOnDestroy(): void {
    // Unsubscribe from the observable to prevent memory leaks
    if (this.booksSubscription) {
      this.booksSubscription.unsubscribe();
    }
  }
}
