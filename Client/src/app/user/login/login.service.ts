import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from "src/app/types/user";
import { environment } from 'src/app/environments/environment';
import { AuthService } from '../../auth.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  

  constructor(private http: HttpClient, private authService: AuthService) { }


  login(email: string, password: string): Observable<any> {
    const { apiUrl } = environment;
    return this.http.post<User>(`${apiUrl}/auth/login`, { email, password }).pipe(
      catchError(error => {
        console.error('HTTP POST request error:', error);
        return of(error); // Emit the error and complete
      })
    );
  }
}