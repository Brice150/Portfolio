import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnDestroy, OnInit {
  submitSubscription!: Subscription;
  contactForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeVanillaTilt();
    this.contactForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      subject: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(300),
        ],
      ],
    });
  }

  ngOnDestroy() {
    this.submitSubscription && this.submitSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.submitSubscription = this.http
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
          next: (response: any) => {
            this.contactForm.reset();
            this.toastr.success('Message sent', 'Message', {
              positionClass: 'toast-bottom-center',
            });
          },
          error: (error: any) => {
            this.contactForm.reset();
            this.toastr.error('Error message not sent', 'Message', {
              positionClass: 'toast-bottom-center',
            });
          },
        });
    } else {
      this.toastr.error(this.getFormError(), 'Message', {
        positionClass: 'toast-bottom-center',
      });
    }
  }

  getFormError(): string {
    let error: string = 'Invalid';
    if (this.contactForm.get('name')?.status === 'INVALID') {
      error += '%name';
    }
    if (this.contactForm.get('email')?.status === 'INVALID') {
      error += '%email';
    }
    if (this.contactForm.get('subject')?.status === 'INVALID') {
      error += '%subject';
    }
    if (this.contactForm.get('message')?.status === 'INVALID') {
      error += '%message';
    }

    let count = 0;
    for (let i = 0; i < error.length; i++) {
      if (error.charAt(i) === '%') {
        count++;
      }
    }
    if (count === 0) {
      return '';
    } else {
      let firstReplaced = false;
      return error.replace(/%/g, (match) => {
        if (!firstReplaced) {
          firstReplaced = true;
          return ' ';
        } else {
          return ', ';
        }
      });
    }
  }

  initializeVanillaTilt() {
    if (window.innerWidth >= 900) {
      VanillaTilt.init(document.getElementById('contact') as any);
    }
  }
}
