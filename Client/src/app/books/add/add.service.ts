import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/app/environments/environment';
import { Book } from 'src/app/types/book';

@Injectable({
  providedIn: 'root'
})
export class AddService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  add(bookData: Book): Observable<Book> {
    const { apiUrl } = environment;
    const token = localStorage.getItem('token');

    if (!token) {
      // Handle case when token is not available
      return throwError('No token available');
    }

    const userId = this.authService.getUserIdFromToken(token);
    if (!userId) {
      // Handle case when userId is not available
      return throwError('No user ID in token');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Book>(`${apiUrl}/add`, bookData, { headers });
  }

}
