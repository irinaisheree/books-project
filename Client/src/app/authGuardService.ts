import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.userId$.pipe(
      map(userId => {
        if (!!userId) {
          return true; // User is authenticated, allow access
        } else {
          this.router.navigate(['/auth/login']); // Redirect to login if userId is not available
          return false;
        }
      })
    );
  }
}
