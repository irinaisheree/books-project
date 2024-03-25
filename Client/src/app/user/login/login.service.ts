import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/app/environments/environment';
import { UserForAuth } from 'src/app/types/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  login(email: string, password: string): Observable<UserForAuth> { 
    const { apiUrl } = environment;
    return this.http.post<UserForAuth>(`${apiUrl}/auth/login`, { email, password }).pipe( 
      tap(response => {
        if (response && response.token) {
          // Update the authentication status
          this.authService.updateAuthStatus(true);
          // Set the user in the AuthService
          this.authService.setUser(response); 
        } else {
          // if user or token are missing
          throw new Error('Invalid login response');
        }
      })
    );
  }
}