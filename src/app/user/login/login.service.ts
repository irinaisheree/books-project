import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "src/app/types/user";
import { environment } from 'src/app/environments/environment';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  

  constructor(private http: HttpClient, private authService: AuthService) { }

  login(email: string, password: string): Observable<any> {
    const { apiUrl } = environment;
    return this.http.post<User>(`${apiUrl}/auth/login`, { email, password }).pipe(
      tap(() => {
        this.authService.updateAuthStatus(true);
      })
    );
  }
}