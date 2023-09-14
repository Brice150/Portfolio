import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnDestroy {
  submitSubscription!: Subscription;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnDestroy() {
    this.submitSubscription && this.submitSubscription.unsubscribe();
  }

  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      const email = contactForm.value;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.submitSubscription = this.http
        .post(
          'https://formspree.io/f/mbjbjwpk',
          {
            name: email.name,
            replyto: email.email,
            subject: email.subject,
            message: email.message,
          },
          { headers: headers }
        )
        .subscribe({
          next: (response: any) => {
            contactForm.resetForm();
            this.toastr.info('Message sent', 'Message', {
              positionClass: 'toast-bottom-center',
            });
          },
          error: (error: any) => {
            contactForm.resetForm();
            this.toastr.error('Error message not sent', 'Message', {
              positionClass: 'toast-bottom-center',
            });
          },
        });
    }
  }
}
