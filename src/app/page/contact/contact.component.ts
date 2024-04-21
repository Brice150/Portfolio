import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      subject: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
      ],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500),
        ],
      ],
    });
  }

  onSubmit(): void {
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
            this.toastr.success('Message sent', 'Message', {
              positionClass: 'toast-bottom-center',
            });
          },
          error: () => {
            this.clearForm();
            this.toastr.error('Error message not sent', 'Message', {
              positionClass: 'toast-bottom-center',
            });
          },
        });
    }
  }

  clearForm(): void {
    this.contactForm.reset();
    this.contactForm.get('name')?.setErrors(null);
    this.contactForm.get('email')?.setErrors(null);
    this.contactForm.get('subject')?.setErrors(null);
    this.contactForm.get('message')?.setErrors(null);
    this.contactForm.markAsPristine();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'delete your account',
    });

    dialogRef
      .afterClosed()
      .pipe(filter((res: boolean) => res))
      .subscribe(() => {
        this.clearForm();
      });
  }
}
