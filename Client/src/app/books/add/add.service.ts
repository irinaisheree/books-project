import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`  // Corrected format
    });

    return this.http.post<Book>(`${apiUrl}/add`, bookData, { headers });
  }

}
