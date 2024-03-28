import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteBookService {

  constructor(private http: HttpClient) { }

  deleteBook(bookId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/books/${bookId}/delete`);
  }
}