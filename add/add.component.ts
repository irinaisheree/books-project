import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddService } from './add.service';
import { Router } from '@angular/router';

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
      imageUrl: [''],
      author: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addBookForm.invalid) {
      return;
    }

    // You can access the form values using this.addBookForm.value
    console.log('Form Submitted!', this.addBookForm.value);
    
this.addService.add(this.addBookForm.value.title, this.addBookForm.value.author, this.addBookForm.value.price, this.addBookForm.value.description, this.addBookForm.value.imageUrl).subscribe(
  (response) => {
    console.log(response);
    console.log('User logged in successfully!', response.valueOf());
    this.router.navigate(['/books']);
  },
  (error) => {
    console.error('Error submitting user:', error);
  }
);
}

    // Here you can add the logic to send the form data to your backend or handle it as needed
  }
