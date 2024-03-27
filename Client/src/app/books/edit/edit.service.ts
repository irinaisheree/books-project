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
    // Optional headers parameter is passed, if available
    const requestOptions = {
      headers: headers ? headers : new HttpHeaders()
    };

    const { apiUrl } = environment;
    const url = `${apiUrl}/books/${bookId}/edit`; 

    return this.http.get<Book>(url, requestOptions);
  }

  updateBook(bookId: string, updatedBookData: any): Observable<Book> {
    // Assuming your backend expects a PUT or PATCH request to update the book
    // Adjust the URL and request method based on your backend API
    const { apiUrl } = environment;
    const url = `${apiUrl}/books/${bookId}/edit`; // Adjust the URL to your API endpoint
    return this.http.post<Book>(url, updatedBookData); // Use PUT or PATCH based on your API
  }
}
