import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        // Successful logout, navigate to home or any other desired page
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Error logging out:', error);
        // Handle error if necessary
      }
    );
  }
}
