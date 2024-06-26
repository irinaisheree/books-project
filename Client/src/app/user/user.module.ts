import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';




@NgModule({
  declarations: [
  
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ProfileComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ProfileComponent
  ]
})
export class UserModule { }