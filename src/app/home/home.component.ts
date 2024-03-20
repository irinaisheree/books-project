import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Book } from '../types/book';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    books: Book[] | null = []
    constructor(private api: ApiService){}
  ngOnInit(): void {
    this.api.getBooks().subscribe((books)=> {
      this.books = books
      console.log(books)
    })
    
  }
  }


