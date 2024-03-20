
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { RegisterService } from './register.service';
import { EMAIL_DOMAINS } from 'src/app/constants';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/types/user';
import { environment } from 'src/app/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm!: FormGroup; // Initialize registerForm

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repeatPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      // Check if passwords match
      const password = this.registerForm.get('password')!.value;
      const repeatPassword = this.registerForm.get('repeatPassword')!.value;
      if (password !== repeatPassword) {
        console.error('Passwords do not match');
        return;
      }

 
        if (this.registerForm.valid) {
          console.log(this.registerForm.value)
          this.registerService.registerUser(this.registerForm.value).subscribe(
      
            (response) => {
              console.log(response)
              console.log('user registered successfully!', response.valueOf);
              this.router.navigate(['auth/login']);
            },
            (error) => {
              console.error('Error submitting user:', error);
            }
          );
        }
      
      ;
    }
  }
}