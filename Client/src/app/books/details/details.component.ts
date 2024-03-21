import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsServiceService } from './details-service.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  book: Book | undefined;
  bookId: string | undefined;

  constructor(private route: ActivatedRoute, private bookService: DetailsServiceService) { }

  ngOnInit(): void {
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
          // Now you can safely access this.book here
          console.log(this.book);
        });
      } else {
        // Handle case where bookId is not present in the route
        console.error('bookId parameter is missing');
      }
    });
  }
}
