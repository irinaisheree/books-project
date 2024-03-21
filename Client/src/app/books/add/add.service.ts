import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Book } from 'src/app/types/book';
import { AuthService } from 'src/app/user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddService {



  constructor(private http: HttpClient, private authService: AuthService) { }

  add(title: string, author: string, price: number, imageUrl: string, description: string): Observable<any> {
    const { apiUrl } = environment;
    return this.http.post<Book>(`${apiUrl}/add`, { title, author, price, imageUrl, description }).pipe(
      tap(() => {
        this.authService.updateAuthStatus(true);
      })
    );
  }
}
