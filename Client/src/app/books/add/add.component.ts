import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddService } from './add.service';
import { Router } from '@angular/router';
import { Book } from 'src/app/types/book';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addBookForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private addService: AddService, 
    private router: Router,
    private authService: AuthService
  ) { 
    this.addBookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', [Validators.required]],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe({
      next:(user) => {
        console.log('User from AuthService:', user)
      }
    })
  }

  onSubmit(): void {
    if (this.addBookForm.valid) {
      this.addService.add(this.addBookForm.value).subscribe(
        (addedBook: Book) =>{
          console.log('Book submitted successfully:', addedBook );
          // Navigate to the book details page for the newly added book
          this.router.navigate(['/books', addedBook._id]);
        },
        (error) => {
          console.error('Error adding book:', error);
        }
      );
    }
  }
}
