import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsServiceService } from './details-service.service';
import { Book } from 'src/app/types/book';
import { Observable, Subject, of } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { takeUntil, switchMap, tap, map, filter } from 'rxjs/operators';
import { UserForAuth } from 'src/app/types/user';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  book: Book | undefined;
  isLoggedIn$: Observable<boolean>;
  isOwner$: Observable<boolean> | undefined
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private bookService: DetailsServiceService,
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.isOwner$ = undefined; 
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const bookIdParam = params.get('bookId');
        if (bookIdParam) {
          return this.bookService.getOneBook(bookIdParam);
        } else {
          throw new Error('Book ID parameter is missing');
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe(
      (book: Book) => {
        this.book = book;
        this.isOwner$ = this.isOwnerCheck();
      },
      error => {
        console.error('Error fetching book:', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isOwnerCheck(): Observable<boolean> {
    return this.authService.getUser().pipe(
      takeUntil(this.destroy$),
      filter((user): user is UserForAuth => !!user), // Filter out null or undefined user
      switchMap((user: UserForAuth) => {
        if (!this.book || !this.book.creator || !user) {
          console.log('Book, Creator, or User not available');
          return of(false);
        }
  
        console.log(this.book.creator)
        const creatorId = this.book.creator.toString(); // Optional chaining operator added here
        if (!creatorId) {
          console.log('Creator ID not available');
          return of(false);
        }
  
        const isOwner = user._id === creatorId;
        console.log('Is Owner:', isOwner);
        return of(isOwner);
      })
    );
  }

  onDelete(): void {
    const confirmDelete = confirm("Are you sure you want to delete this book?");
    if (confirmDelete && this.book) {
      this.bookService.deleteBook(this.book._id).subscribe(() => {
        this.router.navigate(['/books']);
      }, error => {
        console.error('Error deleting book:', error);
      });
    }
  }
}
