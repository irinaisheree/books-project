import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsServiceService } from './details-service.service';
import { Book } from 'src/app/types/book';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  book: Book | undefined;
  bookId: string | undefined;

  isLoggedIn$!: Observable<boolean>;

  constructor(private route: ActivatedRoute, private bookService: DetailsServiceService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    // Get the 'bookId' parameter from the route as a string
    this.route.paramMap.subscribe(params => {
      const bookIdParam = params.get('bookId');
      console.log(bookIdParam);
      if (bookIdParam !== null) {
        this.bookId = bookIdParam;
      
        // Fetch book details using the service
        this.bookService.getOneBook(this.bookId).subscribe((book) => {
          // Assign the fetched book details to this.book
          this.book = book;

          console.log(this.book);
        });
      } else {
        // Handle case where bookId is not present in the route
        console.error('bookId parameter is missing');
      }
    });
  }
}
