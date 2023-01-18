import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      const email = contactForm.value;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('https://formspree.io/f/mbjbjwpk',
        { name: email.name, replyto: email.email, subject: email.subject, message: email.message },
        { 'headers': headers }).subscribe(
          (response: any) => {
            contactForm.resetForm();
            this.snackBar.open("Message sent", "Dismiss", {duration: 2000});
          }
        );
    }
  }
}
