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
}
