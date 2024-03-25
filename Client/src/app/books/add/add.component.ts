import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddService } from './add.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addBookForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private addService: AddService, private router: Router ) { }

  ngOnInit(): void {
    this.addBookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: [''],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addBookForm.invalid) {
      return;
    }

    // You can access the form values using this.addBookForm.value
    console.log('Form Submitted!', this.addBookForm.value);
    
    this.addService.add(
      this.addBookForm.value.title,
      this.addBookForm.value.author,
      this.addBookForm.value.price,
      this.addBookForm.value.imageUrl,
      this.addBookForm.value.description
    ).pipe(
      finalize(() => {
        console.log('Add Book Observable completed');
      })
    ).subscribe(
      (response) => {
        console.log('Book added successfully:', response);
        this.router.navigate(['/books']);
      },
      (error) => {
        console.error('Error submitting book:', error);
      }
    );
    // Here you can add the logic to send the form data to your backend or handle it as needed
  }
}
