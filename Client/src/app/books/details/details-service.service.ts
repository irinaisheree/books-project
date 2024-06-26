import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/app/environments/environments.development';
import { Book } from 'src/app/types/book';

@Injectable({
  providedIn: 'root'
})
export class DetailsServiceService implements OnDestroy{

  private unsubscribe$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getBooks(){
    const {apiUrl} = environment
    return this.http.get<Book[]>(`${apiUrl}/books`)
  }

  getOneBook(id: string): Observable<Book> {
    const {apiUrl} = environment
    return this.http.get<Book>(`${apiUrl}/books/${id}`)
      .pipe(
        takeUntil(this.unsubscribe$)
      );
  }

  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/books/${id}/delete`)
      .pipe(
        takeUntil(this.unsubscribe$)
      );
  }

  likeBook(id:string): Observable<Book>{ 
    const {apiUrl} = environment
    return this.http.post<Book>(`${apiUrl}/books/${id}/like`, {}).pipe(
      takeUntil(this.unsubscribe$)
    )
  }

  unlikeBook(id:string): Observable<Book>{ 
    const {apiUrl} = environment
    return this.http.post<Book>(`${apiUrl}/books/${id}/unlike`, {}).pipe(
      takeUntil(this.unsubscribe$)
    )
  }

  isBookLikedByUser(id: string): Observable<boolean> {
    const { apiUrl } = environment;
    return this.http.get<boolean>(`${apiUrl}/books/${id}/liked`).pipe(
      takeUntil(this.unsubscribe$)
    );
  }
}

