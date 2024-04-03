import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsServiceService } from './details-service.service';
import { Book } from 'src/app/types/book';
import { Observable, Subject, of } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { takeUntil, switchMap } from 'rxjs/operators';
import { LikeService } from './like.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  book: Book | undefined;
  isLoggedIn$: Observable<boolean>;
  isOwner$: Observable<boolean> | undefined;
  private destroy$ = new Subject<void>();
  bookIsLiked$: Observable<boolean> = of(false);
  userId: string = ''; // Current user's ID

  constructor(
    private route: ActivatedRoute,
    private bookService: DetailsServiceService,
    private authService: AuthService,
    private router: Router,
    private likeService: LikeService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.isOwner$ = undefined;
  }

  ngOnInit(): void {
    this.authService.getUser().pipe(
      takeUntil(this.destroy$)
    ).subscribe(user => {
      if (user) {
        this.userId = user._id;
      }
    });

    this.route.paramMap.pipe(
      switchMap(params => {
        const bookIdParam = params.get('bookId');
        if (bookIdParam) {
          return this.bookService.getOneBook(bookIdParam);
        } else {
          throw new Error('Book ID parameter is missing');
        }
      }),
      switchMap((book: Book) => {
        this.book = book;
        this.isOwner$ = this.isOwnerCheck();

        // Fetch initial liked state of the book for the current user
        this.bookIsLiked$ = this.likeService.isBookLikedByUser(this.userId, this.book?._id || '');

        return this.bookIsLiked$;
      }),
      takeUntil(this.destroy$)
    ).subscribe(
      (isLiked: boolean) => {
        // This subscription is optional depending on your use case
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
      switchMap((user): Observable<boolean> => {
        if (!this.book || !this.book.creator || !user) {
          console.log('Book, Creator, or User not available');
          return of(false);
        }

        const creatorId = this.book.creator?.toString();
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
    if (confirmDelete && this.book && this.book._id) {
      this.bookService.deleteBook(this.book._id).subscribe(
        () => {
          console.log('Book deleted successfully');
          this.router.navigate(['/books']);
        },
        (error) => {
          console.error('Error deleting book:', error);
        }
      );
    } else {
      console.error('Book ID is undefined or null');
    }
  }

  onLike(): void {
    if (this.book && this.book._id && this.userId) {
      this.likeService.toggleLike(this.userId, this.book._id);
      this.bookIsLiked$ = this.likeService.isBookLikedByUser(this.userId, this.book?._id || '');
    }
  }
}
