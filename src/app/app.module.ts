
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AboutComponent } from './about/about.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { BookListComponent } from './books/book-list/book-list.component';

//new
import { RouterOutlet, provideRouter } from '@angular/router';
import {  routes} from './app-routing.module';
import { ContactComponent } from './contact/contact.component';
import { BooksModule } from './books/books.module';
import { UserModule } from './user/user.module';



// const routes: Routes = [
//   { path: '', redirectTo: '/', pathMatch: 'full' },
//   { path: 'about', component: AboutComponent },
  
  
// ]

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BookListComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), 
    RouterOutlet,
    HttpClientModule,
    BooksModule,
    UserModule

    
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent]
})
export class AppModule { }