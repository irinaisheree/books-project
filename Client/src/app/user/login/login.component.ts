import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { UserForAuth } from 'src/app/types/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoggedIn$: Observable<boolean>;
  errorMessage: string = ''; 
  showLoginMessage = true;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
  
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (response) => {
          const token = response?.token;
          localStorage.setItem("token", token)

          // Set user email in AuthService
          this.authService.setUserEmail(this.loginForm.value.email);
  
          // Extract user ID from token and set it in AuthService
          const userId = this.authService.getUserIdFromToken(token);
          console.log(userId)
          if (userId) { 
            const user: UserForAuth = {
              _id: userId,
              email: this.loginForm.value.email,
              password: '', 
              token: token || '' 
            };
            this.authService.setUser(user);
            console.log('set user: ', user)
            // Update authentication status
            this.authService.updateAuthStatus(true);
  
            this.router.navigate(['']);
          } else {
            console.error('Error: Unable to extract user ID from token');
            this.errorMessage = 'Invalid userData';
          }
        },
        (error) => {
          console.error('Error logging user:', error);
          if (error.error && error.error === 'Invalid email or password') {
            this.errorMessage = 'Invalid email or password';
          } else {
            this.errorMessage = 'An error occurred. Please try again.';
          }
        }
      );
  }
}