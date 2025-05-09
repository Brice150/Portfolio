import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  http = inject(HttpClient);
  toastr = inject(ToastrService);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      subject: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(500),
        ],
      ],
    });
  }

  submitForm(): void {
    if (this.contactForm.valid) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http
        .post(
          'https://formspree.io/f/mbjbjwpk',
          {
            name: this.contactForm.value.name,
            replyto: this.contactForm.value.email,
            subject: this.contactForm.value.subject,
            message: this.contactForm.value.message,
          },
          { headers: headers }
        )
        .subscribe({
          next: () => {
            this.clearForm();
            this.toastr.info('Message sent', 'Message', {
              positionClass: 'toast-bottom-center',
              toastClass: 'ngx-toastr custom info',
            });
          },
          error: () => {
            this.clearForm();
            this.toastr.error('Message not sent', 'Message', {
              positionClass: 'toast-bottom-center',
              toastClass: 'ngx-toastr custom',
            });
          },
        });
    }
  }

  clearForm(): void {
    this.contactForm.reset({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    this.contactForm.markAsPristine();
    this.contactForm.markAsUntouched();
  }
}
