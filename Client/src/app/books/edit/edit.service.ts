import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Book } from 'src/app/types/book';

@Injectable({
  providedIn: 'root'
})
export class EditService {


  constructor(private http: HttpClient) { }

  getBookById(bookId: string, headers?: HttpHeaders): Observable<Book> {
    const requestOptions = {
      headers: headers ? headers : new HttpHeaders()
    };
  
    const { apiUrl } = environment;
    const url = `${apiUrl}/books/${bookId}/edit`;
  
    return this.http.get<Book>(url, requestOptions);
  }

  updateBook(bookId: string, updatedBookData: any): Observable<Book> {
    const { apiUrl } = environment;
    const url = `${apiUrl}/books/${bookId}/edit`;

    return this.http.post<Book>(url, updatedBookData); // Use PUT or PATCH based on your API
  }
}
