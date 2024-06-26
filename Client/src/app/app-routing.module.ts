import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BookListComponent } from './books/book-list/book-list.component'
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './user/login/login.component';
import { DetailsComponent } from './books/details/details.component';
import { RegisterComponent } from './user/register/register.component';
import { AddComponent } from './books/add/add.component';
import { LogoutComponent } from './user/logout/logout.component';
import { EditComponent } from './books/edit/edit.component';
import { AuthGuardService } from './authGuardService';
import { ProfileComponent } from './user/profile/profile.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactComponent},
  { path: 'auth/login', component: LoginComponent},
  { path: 'books/:bookId', component: DetailsComponent},
  { path: 'books', component: BookListComponent},
  { path: 'auth/register', component: RegisterComponent},
  { path: 'add', component: AddComponent, canActivate: [AuthGuardService] },
  { path: 'logout', component: LogoutComponent },
  { path: 'books/:bookId/edit', component: EditComponent },
  { path: 'auth/profile', component: ProfileComponent},
  { path: '**', component: ErrorComponent } // Wildcard route
  ];
  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
