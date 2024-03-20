import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { User } from 'src/app/types/user';
import { AuthService } from '../auth.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  

  constructor(private http: HttpClient, private authService: AuthService) {}

  registerUser(userData: any): Observable<any> {
    const { apiUrl } = environment;
    console.log(userData)
    return this.http.post<User>(`${apiUrl}/auth/register`, userData).pipe(
      tap(() => {
        this.authService.updateAuthStatus(true);
      })
    );
  }
}