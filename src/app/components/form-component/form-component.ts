

import {ChangeDetectionStrategy, Component, EventEmitter, Output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';


/** @title Form field with hints */
@Component({
  selector: 'form-component',
  templateUrl: 'form-component.html',
  styleUrls: ['form-component.css'],
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormField{
  @Output() prayerAdded = new EventEmitter<void>();
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage = signal('');
  

  // Define a full reactive form
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    region: new FormControl('USA', Validators.required),
    request: new FormControl('', [Validators.required, Validators.maxLength(180)]),
    date: new FormControl(''),
    urgency: new FormControl('low', Validators.required),
  });

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('Please enter a your Email');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
// http://localhost:4000/api/prayers
   submitForm() {
    if (this.form.valid) {
      this.http.post('https://global-prayer-dashboard.onrender.com/api/prayers', this.form.value).subscribe({
        next: (res) => {
          // console.log('✅ Prayer submitted:', res)
          this.snackBar.open('Your prayer has been submitted.', 'Close', {
          duration: 4000,
          panelClass: ['snackbar-success']
          });
          this.form.reset({
            name: '',
            email: '',
            region: 'USA',
            request: '',
            date: '',
            urgency: 'low',
          }); 
          this.prayerAdded.emit();
        },
         error: (err) => {
          this.snackBar.open('Submission failed. Please try again.', 'Close', {
          duration: 4000,
          panelClass: ['snackbar-error']
        });
      },      });
    } else {
      this.snackBar.open('Please fill out all required fields.', 'Close', {
      duration: 4000,
      panelClass: ['snackbar-warning']
    });
    }
  }
}
 

 
