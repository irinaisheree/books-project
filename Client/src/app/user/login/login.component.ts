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
    setTimeout(() => {
      this.showLoginMessage = false;
    }, 5000);
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
          if (userId) { // Check if userId is not null
            // Set the user object in AuthService
            const user: UserForAuth = {
              _id: userId,
              email: this.loginForm.value.email,
              password: '', // You might not need to set this
              token: token || '' // Ensure token is not null
            };
            this.authService.setUser(user);
            console.log('set user: ', user)
            // Update authentication status
            this.authService.updateAuthStatus(true);
  
            // Redirect after successful login
            this.router.navigate(['']);
          } else {
            console.error('Error: Unable to extract user ID from token');
          }
        },
        (error) => {
          console.error('Error submitting user. Please try again', error);
          this.errorMessage = 'Error submitting user: ' + error.message; // Set errorMessage
        }
      );
  }
  
}