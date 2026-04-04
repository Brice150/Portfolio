import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SeoService } from '../core/services/seo.service';

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
    MatProgressSpinner,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  http = inject(HttpClient);
  toastr = inject(ToastrService);
  fb = inject(FormBuilder);
  seoService = inject(SeoService);
  isMessageSent = false;
  loading = false;

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Contact - Brice Lecomte',
      description:
        'Contactez Brice Lecomte pour vos projets de développement web et SaaS.',
      url: 'https://portfolio-brice.web.app/contact',
    });

    this.contactForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      subject: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
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
      this.loading = true;
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
          { headers: headers },
        )
        .subscribe({
          next: () => {
            this.clearForm();
            this.isMessageSent = true;
            this.loading = false;
          },
          error: () => {
            this.clearForm();
            this.loading = false;
            this.toastr.error(
              'Impossible d’envoyer votre message, veuillez réessayer ultérieurement ou envoyer un email',
              'Erreur',
              {
                positionClass: 'toast-bottom-center',
                toastClass: 'ngx-toastr custom error',
              },
            );
          },
        });
    } else {
      this.contactForm.markAllAsTouched();
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
