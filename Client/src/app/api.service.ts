import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environments/environment'
// import { Theme } from './types/theme';


import { Book } from './types/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getBooks(){
    const url = 'http://localhost:3000/books'
    return this.http.get<Book[]>(`${url}`)
  }


}

